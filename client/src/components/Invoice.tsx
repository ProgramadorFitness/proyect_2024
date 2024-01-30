// TablaPDF.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface TablaPDFProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datos: any[]; // Reemplaza 'any' con el tipo de tus datos
}

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: { 
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',

      }, 
      tableRow: { 
        margin: 'auto', 
        flexDirection: 'row',
        
      }, 
      tableCol: { 
        width: "16%", 
        borderStyle: "solid", 
        border: 1
      }, 
      tableCell: { 
        width: "auto",
        margin: 5,
        borderStyle: 'solid',
        maxWidth: '16%',
        fontSize:'10'
      },
      column: {
        width: '16%', // Ajusta el ancho de la columna según tus necesidades
      },
      header: {

      }
  });
  
// Función para generar la factura y convertirla a PDF
const TablaPDF: React.FC<TablaPDFProps> = ({ datos }) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.header]}>ID</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.header]}>PAY</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.header]}>DATE PAY</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.header]}>OBBSERVATION</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.header]}>OUT BALANCE</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.header]}>STATE PAY</Text>
                    </View>
                </View>
              {datos.map((fila, index) => (
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.column]}>{fila.id}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.column]}>{fila.pay}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.column]}>{fila.datePay}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.column]}>{fila.observation}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.column]}>{fila.outBalance}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.column]}>{fila.statePay}</Text>
                    </View>
                </View>
            ))}
          </View>
          </View>
        </Page>
      </Document>
    );
  };
  
  export default TablaPDF;