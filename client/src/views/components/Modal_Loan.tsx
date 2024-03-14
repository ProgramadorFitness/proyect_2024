import React, { useEffect, useState } from 'react';
import { Client } from '../../models/models';
import Api from '../../controllers/user.controller';
import { useAuth } from '../../controllers/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FaUndo } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
import { GiTakeMyMoney } from "react-icons/gi";

interface State {
  client: Client | null
  listClient: Client[]
}

interface Props {
  data: Client[]
}

interface State1 {
  wallet1: Wallet | null
  listWallet1: Wallet[]
}

const Modal_Loan = () => {

  const [showModal, setShowModal] = React.useState(false)
  const [valueInicial, setValueInicial] = useState("")
  const [valueEnd, setValueEnd] = useState("")
  const [interest, setInterest] = useState("")
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [lastName, setlastName] = useState("")
  const [address, setAddress] = useState("")
  const [genre, setGenre] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [neigt, setNeigt] = useState("")
  const [phone, setPhone] = useState("")
  const [phone2, setPhone2] = useState("")
  const [state1, setState1] = useState("activo")
  const [wallet, setWallet] = useState<string>("")
  const [id_wallet, set_Wallet] = useState("")
  const [collector, setCollector] = useState("")
  const [id_client, setIdClient] = useState("")
  const [paymentF, setPaymentF] = useState("")
  const [startDate, setStart] = useState("")
  const [finishDate, setFinish] = useState("")
  const [dues, setDues] = useState("")
  const [duesValue, setDuesValue] = useState("")
  const [loading, setLoading] = useState(false);
  const [stateW, setStateW] = useState<State1>({
    wallet1: null,
    listWallet1: []
  })

  const api = new Api();


  /*const auth = useAuth();
  const goTo = useNavigate();*/

  const [data, setData] = useState<Client[]>()

  const [state, setState] = useState<State>({
    client: null,
    listClient: []
  })



  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "value_initial") {
      setValueInicial(value);
    }
    if (name === "interest") {
      setInterest(value);
    }

    if (name === "identification") {
      setId(value)
    }

    if (name === "name") {
      setName(value)
    }

    if (name == "collector") {
      setCollector(value)
    }

    if (name == "startDate") {
      setStart(value)
    }

    if (name == "finishDate") {
      setFinish(value)
    }


    getClients();
    getWalletCollect(wallet)

  }

  async function getWallets() {
    const api = new Api()
    const response = (await api.getWallets()).data
    setStateW({ wallet1: null, listWallet1: response })

    setWallet(String(stateW.listWallet1?.map((item) => (item.id))))
    //console.log(wallet)

    getWalletCollect(wallet)
  }

  async function getWalletCollect(id: unknown) {
    const api = new Api()

    const response = (await api.walletsConsultUserName(String(id))).data
    console.log(response)

    setCollector(String(response[0]['name']) + ' ' + String(response[0]['lastName']))
    //console.log(wallet)

  }

  function calculate() {
    const a = +valueInicial;
    const b = +interest;

    const date1 = new Date(startDate)
    const date2 = new Date(finishDate)

    const diferencia = date1.getTime() - date2.getTime()
    const diasdif = (diferencia / 1000 / 60 / 60 / 24) * -1
    console.log(startDate)

    const interesreal = ((diasdif / 30) * +b)

    const result = ((interesreal * a) / 100) + a


    const domingos = diasdif / 30
    let diasefectivos = diasdif - (domingos * 4)
    const ve = Math.round(+result)

    console.log(diasefectivos)
    setValueEnd(ve.toString())

    if (paymentF == "diario") {
      diasefectivos = Math.round(diasefectivos)
      const dv = Math.round(ve / diasefectivos)
      setDuesValue(String(dv))
      setDues(String(diasefectivos))
    } else if (paymentF == "semanal") {
      diasefectivos = Math.round(diasefectivos / 6)
      const dv = Math.round(ve / diasefectivos)
      setDuesValue(String(dv))
      setDues(String(diasefectivos))
    } else if (paymentF == "quincenal") {
      diasefectivos = Math.round(diasefectivos / 13)
      const dv = Math.round(ve / diasefectivos)
      setDuesValue(String(dv))
      setDues(String(diasefectivos))
    } else {
      diasefectivos = Math.round(diasefectivos / 26)
      const dv = Math.round(ve / diasefectivos)
      setDuesValue(String(dv))
      setDues(String(diasefectivos))
    }

    getClients();
    getWalletCollect(wallet)

  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name == "wallet") {
      setWallet(value)
    }

    if (name == "paymentF") {
      setPaymentF(value)
    }

    getWalletCollect(wallet)

  }

  useEffect(() => {
    getWallets()
    getWalletCollect(wallet)
  }, []);


  async function getClients() {
    const api = new Api()
    const response = (await api.getClientsIdent(id)).data
    setState({ client: null, listClient: response })
    setData(state.listClient)

    console.log(String(data?.map((item) => (item.name))))

    setName(String(data?.map((item) => (item.name))))
    setlastName(String(data?.map((item) => (item.lastName))))
    setAddress(String(data?.map((item) => (item.address))))
    setGenre(String(data?.map((item) => (item.genre))))
    setCity(String(data?.map((item) => (item.city))))
    setNeigt(String(data?.map((item) => (item.neighborhood))))
    setPhone(String(data?.map((item) => (item.phone))))
    setPhone2(String(data?.map((item) => (item.phone2))))
    setEmail(String(data?.map((item) => (item.email))))
    setIdClient(String(data?.map((item) => (item.id))))

  }

  function addDaysToDate(dates: Date, dayss: number) {
    const res = new Date(dates);
    res.setDate(res.getDate() + dayss);
    return res;
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    getWalletCollect(wallet)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await (await (api.postLoans(
        id_client, valueInicial, valueEnd, interest, state1, wallet, startDate,
        finishDate, dues, duesValue, paymentF))).data['loans']
      const id_new_loan = response['id']

      if (!loading) {
        const id = toast.success('Successfully');
        setTimeout(() => {
          toast.dismiss(id);
          location.reload()
        }, 2000);


        if (response) {
          if (paymentF == "diario") {
            for (let index = 1; index <= +dues; index++) {
              //console.log(startDate)
              const tmpDate = new Date(startDate)
              const datePayments = addDaysToDate(tmpDate, index).toUTCString()
              //console.log(datePayments.toLocaleDateString())
              const statePayments = "up to date"
              const response2 = await (await (api.postPaymentsLoans(
                id_new_loan, String(index), datePayments, statePayments))).data
              console.log(response2)
            }
          } else if (paymentF == "semanal") {
            for (let index = 1; index <= +dues; index++) {
              const quin = 7 * index
              const tmpDate = new Date(startDate)
              const datePayments = addDaysToDate(tmpDate, quin).toUTCString()
              //console.log(datePayments.toLocaleDateString())
              const statePayments = "up to date";
              const response2 = await (await (api.postPaymentsLoans(
                id_new_loan, String(index), datePayments, statePayments))).data
              console.log(response2)
            }
          } else if (paymentF == "quicenal") {
            for (let index = 1; index <= +dues; index++) {
              const quin = 15 * index
              const tmpDate = new Date(startDate)
              const datePayments = addDaysToDate(tmpDate, quin).toUTCString()
              //console.log(datePayments.toLocaleDateString())
              const statePayments = "up to date"
              const response2 = await (await (api.postPaymentsLoans(
                id_new_loan, String(index), datePayments, statePayments))).data
              //console.log(id_new_loan, payment, String(index), datePayments, statePayments)
            }
          } else {
            for (let index = 1; index <= +dues; index++) {
              const quin = 30 * index
              const tmpDate = new Date(startDate)
              const datePayments = addDaysToDate(tmpDate, quin).toUTCString()
              //console.log(datePayments.toLocaleDateString())
              const statePayments = "up to date"
              const response2 = await (await (api.postPaymentsLoans(
                id_new_loan, String(index), datePayments, statePayments))).data
              //console.log(id_new_loan, payment, String(index), datePayments, statePayments)
            }
          }

        }
      }


    } catch (error) {
      console.log(error);
      toast.error('Failed connection')
    }
    finally {
      // Detiene la carga después de la simulación
      setLoading(false);
    }
  }




  return (
    <>
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
        onClick={() => setShowModal(true)}
      >
        <GiTakeMyMoney size={25} />

      </button>

      {showModal ? (
        <>

          <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center z-50 '>
            <div className='bg-slate-400  rounded flex flex-col items-center gap-5 '>
              <div className="p-8">
                {loading && (
                  <HashLoader loading={loading} size={50} color="red" />
                )}
                {!loading && (
                  <form onSubmit={handleSubmit}>
                    <div className="border-b  " >
                      <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900">Loan Information</h2>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Identification</label>
                        <input
                          onChange={handleChange}
                          value={id}
                          type="text"
                          name="identification"
                          id="identification"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                        <input
                          onChange={handleChange}
                          value={name}
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          disabled></input>
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                        <input disabled
                          onChange={handleChange}
                          value={lastName}
                          type="text"
                          name="last-name"
                          id="last-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <input disabled
                          onChange={handleChange}
                          value={email}
                          id="email"
                          name="email"
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Genre</label>
                        <select disabled
                          onChange={handleSelectChange}
                          id="genre"
                          name="genre"
                          value={genre}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                        <input disabled
                          onChange={handleChange}
                          value={address}
                          type="text"
                          name="street-address"
                          id="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
                        <input disabled
                          onChange={handleChange}
                          value={city}
                          type="text"
                          name="city"
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Neighborhood</label>
                        <input disabled
                          onChange={handleChange}
                          value={neigt}
                          type='text'
                          name="neighborhood"
                          id="neighborhood"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                        <input disabled
                          onChange={handleChange}
                          value={phone}
                          type="number"
                          name="phone"
                          id="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Phone #2</label>
                        <input disabled
                          onChange={handleChange}
                          value={phone2}
                          type="number"
                          name="phone2"
                          id="phone2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>

                    </div>
                    <div className=" border-t sm:col-span flex items-center " >
                      <div >
                        <label className="block text-sm font-medium leading-6 text-gray-900">Wallet</label>
                        <select
                          onChange={handleSelectChange}
                          id="wallet"
                          name="wallet"
                          value={wallet}
                          className="block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                          <option >Select</option>
                          {stateW.listWallet1?.map((item) => (<option value={item.id}>Cartera #{item.id} </option>))}
                        </select>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1 ps-8">
                        <label className=" block text-sm font-medium leading-6 text-gray-900">Collector</label>
                        <input disabled
                          onChange={handleChange}
                          value={collector}
                          type="text"
                          name="collector"
                          id="collector"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t">
                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Value Initial</label>
                        <input
                          type="number"
                          name="value_initial"
                          id="value_initial"
                          onChange={handleChange}
                          value={valueInicial}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Interest</label>
                        <input
                          type="number"
                          name="interest"
                          id="interest"
                          onChange={handleChange}
                          value={interest}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div >
                        <label className="block text-sm font-medium leading-6 text-gray-900">Payment Frequency</label>
                        <select id="paymentF"
                          value={paymentF}
                          name="paymentF"
                          onChange={handleSelectChange}
                          className=" rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                          <option value="diario">DIARIO</option>
                          <option value="semanal">SEMANAL</option>
                          <option value="quincenal">QUINCENAL</option>
                          <option value="mensual">MENSUAL</option>
                        </select>
                      </div>

                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Start Loan</label>
                        <input
                          type="date"
                          name="startDate"
                          id="startDate"
                          onChange={handleChange}
                          value={startDate}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Finish Loan</label>
                        <input
                          type="date"
                          name="finishDate"
                          id="finishDate"
                          onChange={handleChange}
                          value={finishDate}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Dues</label>
                        <input disabled
                          type="number"
                          name="dues"
                          id="dues"
                          onChange={handleChange}
                          value={dues}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Dues Value</label>
                        <input disabled
                          type="number"
                          name="duesValue"
                          id="duesValue"
                          onChange={handleChange}
                          value={duesValue}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div className="sm:col-span">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Value End</label>
                        <input disabled
                          type="string"
                          name="value_end"
                          id="value_end"
                          onChange={handleChange}
                          value={valueEnd}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div >
                    </div>
                    <div className='pt-6 sm:col-span-3 flex overflow-y-auto'>
                      <div className=''>
                        <button className="  px-8 block text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400" type="button"
                          onClick={calculate}
                        >Calculate</button>
                      </div>
                      <div className='px-8'>
                        <button className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400"
                        >Save</button>
                      </div>
                      <div className=''>
                        <button className="  px-8 block text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                          onClick={() => setShowModal(false)}
                        >Cancel</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <Toaster position="top-right" />
        </>
      ) : null}
    </>
  )
}

export default Modal_Loan