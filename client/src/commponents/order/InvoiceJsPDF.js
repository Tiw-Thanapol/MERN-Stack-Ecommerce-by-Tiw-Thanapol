import React from 'react'
import { jsPDF } from "jspdf";
import {font} from "./THSarabun-normal"
import moment from "moment/min/moment-with-locales";
import autoTable from 'jspdf-autotable'

const InvoiceJsPDF = ({order}) => {
   // console.log(order)
    const handlePDF = () => {
        const doc = new jsPDF();
// add the font to jsPDF
doc.addFileToVFS("MyFont.ttf", font);
doc.addFont("MyFont.ttf", "MyFont", "normal");
doc.setFont("MyFont");

let width = doc.internal.pageSize.getWidth();

doc.setFontSize(16);
doc.text("บริษัทเดอะ โซล เทรดดิ้งจำกัด ",width/2, 10, {align:'center'});

doc.setFontSize(14);
doc.text("49/913 หมู่ 4 ตำบลโคกขาม อำเภอเมือง จังหวัดสมุทรสาคร 74000 ",width/2, 15, {align:'center'});
doc.text("โทร.093-9526425  E-mail : thesoltrading@gmail.com ",width/2, 20, {align:'center'});
doc.text("เลขประจำตัวผู้เสียภาษี 0745565004041 ",width/2, 25, {align:'center'});

doc.setFontSize(28);
doc.text("ใบเสร็จ",width/2, 35, {align:'center'});

doc.setFontSize(14);
doc.text("วัน/เดือน/ปี: " + moment().locale("th").format("L"), width - 10, 40, { align: 'right' });
  
    let data = order.products.map((p, i) => [
            p.product.title,
            p.count,
            p.price
        ])

        let content = {
            startY: 45,
            head: [['สินค้า','จำนวน', 'ราคา' ]],
            body: data,
            styles: { font: 'MyFont' },
            // headStyles: { fillColor: [200, 200, 200] },
            // bodyStyles: { fillColor: [255, 255, 255] },
            // alternateRowStyles: { fillColor: [245, 245, 245] },
            //  columnStyles: {
            //      0: { cellWidth: 'auto' },
            //      1: { cellWidth: 30 },
            //      2: { cellWidth: 30 }
            // }      
        }
autoTable(doc, content);
doc.setFontSize(16);
doc.text("ยอดรวมสุทธิ: " + order.cartTotal, width - 10, doc.lastAutoTable.finalY + 10, { align: 'right' });
doc.save("order.pdf");
    }

  return (
    <div>
      <button 
      onClick={handlePDF}
      className='btn btn-info'>ดาวน์โหลดใบเสร็จ</button>
    </div>
  )
}

export default InvoiceJsPDF
