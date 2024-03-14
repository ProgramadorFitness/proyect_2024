"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create2 = exports.collectorPay = exports.clientPay = exports.payConsultId = exports.payJoin = exports.payJoinId = exports.createSql = exports.addBlackList = exports.statePay = exports.create = exports.list = void 0;
const connection_1 = require("../models/db/connection");
const payment_1 = __importDefault(require("../models/payment"));
const sequelize_1 = require("sequelize");
const loans_1 = __importDefault(require("../models/loans"));
const clients_1 = __importDefault(require("../models/clients"));
const resend_1 = require("resend");
const SPECIFIC_HOUR = 3;
const list = async (req, res) => {
    try {
        const payment = await payment_1.default.findAll();
        return res.status(200).json(payment);
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.list = list;
const create = async (req, res) => {
    try {
        await payment_1.default.create(Object.assign({}, req.body));
        return res.status(200).json({ "message": "Payment save" });
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.create = create;
async function sendEmail(email) {
    const resend = new resend_1.Resend('re_3jipKhkw_EvpJwd9yHyioN3VK7na6qGQo');
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recordatorio para el pago de su obligación</title>
    </head>
    <body style="font-family: Arial, sans-serif;">

        <table style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border-collapse: collapse;">
            <tr>
                <td style="background-color: #007bff; text-align: center; padding: 20px; color: #fff;">
                    <h1 style="margin: 0;">Invercréditos</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p>Estimado cliente,</p>
                    <p>Le recordamos que tiene una obligación pendiente de pago con Invercréditos.</p>
                    <p>Por favor, asegúrese de realizar el pago a la brevedad posible para evitar inconvenientes.</p>
                    <p>Gracias por su atención.</p>
                    <p>Atentamente,<br>Invercréditos</p>
                </td>
            </tr>
        </table>

    </body>
    </html>
  `;
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Recordatorio para el pago de su obligación',
            html: html,
        });
        if (error) {
            console.error({ error });
        }
        else {
            console.log({ data });
        }
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
}
const statePay = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const paymentsToUpdate = await payment_1.default.findAll({
            where: {
                date: {
                    [sequelize_1.Op.lt]: currentDate
                },
                state: {
                    [sequelize_1.Op.ne]: 'pay'
                }
            }
        });
        let updatedPayment = [''];
        const updateEmails = [];
        for (const payment of paymentsToUpdate) {
            updatedPayment = await payment.update({ state: 'expired pay' });
            const loan = await loans_1.default.findByPk(updatedPayment.id_loan);
            //sendEmail('juni191266@gmail.com')
            if (loan) {
                const client = await clients_1.default.findByPk(loan.id_client);
                if (client) {
                    updateEmails.push(client.email);
                }
                else {
                    console.error(`No se encontró el cliente con ID ${loan.id_client}`);
                }
            }
            else {
                console.error(`No se encontró el préstamo con ID ${updatedPayment.id_loan}`);
            }
        }
        if (updateEmails.length > 0) {
            updateEmails.forEach(ema => {
                sendEmail(ema);
            });
        }
        console.log(updateEmails.length + 'Se han actualizado los estados de los pagos correctamente.');
        res.status(200).send(updateEmails.length + 'Se han actualizado los estados de los pagos correctamente.');
    }
    catch (error) {
        console.error('Error al actualizar los estados de los pagos:', error);
        res.status(500).send('Error al actualizar los estados de los pagos');
    }
};
exports.statePay = statePay;
function addBlackList() {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE clients SET bl = "yes" WHERE id IN ( SELECT DISTINCT loans.id_client FROM payments INNER JOIN loans ON payments.id_loan = loans.id INNER JOIN clients ON loans.id_client = clients.id WHERE payments.state = "expired pay" GROUP BY loans.id_client HAVING COUNT(*) > 3)';
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
exports.addBlackList = addBlackList;
/*function getTimeUntilSpecificHour(hour: number): number {
  const now = new Date();
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0); // Hora específica de hoy
  if (now.getHours() >= hour) {
      // Si la hora actual es igual o posterior a la hora específica, avanzamos al día siguiente
      targetTime.setDate(targetTime.getDate() + 1);
  }
  return targetTime.getTime() - now.getTime(); // Devuelve el tiempo restante hasta la hora específica
}

function startDailyTimer() {
  const msUntilSpecificHour = getTimeUntilSpecificHour(SPECIFIC_HOUR);
  setTimeout(() => {
    const statePay: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const currentDate = new Date();
        const paymentsToUpdate = await Payment.findAll({
          where: {
            date: {
              [Op.lt]: currentDate
            },
            state: {
              [Op.ne]: 'pay'
            }
          }
        });
        let updatedPayment: any = ['']
        const updateEmails: string[] = [];
    
    
        for (const payment of paymentsToUpdate) {
          updatedPayment = await payment.update({ state: 'expired pay' });
          const loan = await Loan.findByPk(updatedPayment.id_loan)
          //sendEmail('juni191266@gmail.com')
          if (loan) {
            const client = await Client.findByPk(loan.id_client);
            if (client) {
                updateEmails.push(client.email);
            } else {
                console.error(`No se encontró el cliente con ID ${loan.id_client}`);
            }
        } else {
            console.error(`No se encontró el préstamo con ID ${updatedPayment.id_loan}`);
        }
    }
    
    if(updateEmails.length > 0){
      updateEmails.forEach(ema => {
        sendEmail(ema);
      });
    }
    
        console.log(updateEmails.length + 'Se han actualizado los estados de los pagos correctamente.');
        res.status(200).send(updateEmails.length +'Se han actualizado los estados de los pagos correctamente.');
      } catch (error) {
        console.error('Error al actualizar los estados de los pagos:', error);
        res.status(500).send('Error al actualizar los estados de los pagos');
      }
    };
      startDailyTimer();
  }, msUntilSpecificHour);
}*/
function createSql(id) {
    return new Promise((resolve, reject) => {
        const sql = `Insert into payments (id_loan) values (${id})`;
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
exports.createSql = createSql;
function payJoinId(id) {
    return new Promise((resolve, reject) => {
        const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id  where id_loan = ${id}`;
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
exports.payJoinId = payJoinId;
function payJoin() {
    return new Promise((resolve, reject) => {
        const sql = `Select clients.id as id_client, payments.id, loans.id as id_loan, clients.id_number as id_number, payments.state, paymentF, loans.dues as dues, payments.dues as duesPaid ,loans.duesValue,payments.outBalance, payments.payment as duesRealPay, payments.date as datePay, payments.realDate as realDatePay from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id `;
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
exports.payJoin = payJoin;
function payConsultId(id) {
    return new Promise((resolve, reject) => {
        const sql = `Select payments.id as id, id_wallet , loans.id as id_loan, clients.genre as genre, payments.dues as duesPaid, clients.id as id_client, clients.neighborhood, clients.name as name, clients.lastName,  clients.city, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF, payments.dues as duesPay from loans inner join clients inner join payments on loans.id_client = clients.id and payments.id_loan = loans.id and payments.id = ${id}`;
        //const sql = `Select * from payments  where id = ${id}`;
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results[0]);
            }
        });
    });
}
exports.payConsultId = payConsultId;
function clientPay(id) {
    return new Promise((resolve, reject) => {
        //const sql = `Select payments.id as id, id_wallet , loans.id as id_loan, clients.genre as genre, payments.dues as duesPaid, clients.id as id_client, clients.neighborhood, clients.name as name, clients.lastName,  clients.city, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF, payments.dues as duesPay from loans inner join clients inner join payments on loans.id_client = clients.id and payments.id_loan = loans.id and clients.id = ${id}`;
        const sql = `Select * from payments inner join loans inner join clients on payments.id_loan = loans.id and loans.id_client = clients.id and clients.id = ${id}`;
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
exports.clientPay = clientPay;
function collectorPay(id) {
    return new Promise((resolve, reject) => {
        //const sql = `Select payments.id as id, id_wallet , loans.id as id_loan, clients.genre as genre, payments.dues as duesPaid, clients.id as id_client, clients.neighborhood, clients.name as name, clients.lastName,  clients.city, clients.email, clients.id_number as id_number, clients.address, clients.phone, clients.phone2, clients.state, loans.value_initial, loans.value_end, loans.interest, loans.startLoan, loans.finishLoan, loans.dues, loans.duesValue, loans.paymentF, payments.dues as duesPay from loans inner join clients inner join payments on loans.id_client = clients.id and payments.id_loan = loans.id and clients.id = ${id}`;
        const sql = `Select * from payments inner join loans inner join clients inner join wallets on payments.id_loan = loans.id and loans.id_client = clients.id and loans.id_wallet = wallets.id and wallets.id = ${id}`;
        connection_1.connection1.query(sql, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
exports.collectorPay = collectorPay;
const create2 = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const payment = await payment_1.default.findByPk(id);
        if (payment) {
            await payment.update(body);
            return res.status(200).json({ "message": "payment complete" });
        }
        else {
            res.status(404).json({
                msg: "Not found payment"
            });
        }
    }
    catch (error) {
        return res.status(500).json({ "message": "Hubo un error", "error": error });
    }
};
exports.create2 = create2;
