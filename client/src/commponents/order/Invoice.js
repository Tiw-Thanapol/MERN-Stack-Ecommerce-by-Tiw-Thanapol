//rafce
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font
} from "@react-pdf/renderer";


import fontDev from "./THSarabun.ttf";
import moment from "moment/min/moment-with-locales";

// Register font
Font.register({ family: "Thesol", src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "Thesol",
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  summary:{
      textAlign:'right'
  }
});
const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>บริษัท เดอะ โซล เทรดดิ้ง จำกัด</Text>
          <Text>{moment(Date.now()).locale("th").format("ll")}</Text>

          <Text style={styles.summary}>ราคารวมสุทธิ : <b>{order.cartTotal}</b></Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;