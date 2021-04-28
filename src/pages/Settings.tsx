import React, { useRef, useState } from "react";
import Container from "@material-ui/core/Container";
import UnderDev from "../app/UnderDevelopment";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@material-ui/core";

const ExportPdf = () => {
    const sampleData = {
        ContactId: 1,
        requester: 2,
        status: "shipped",
        VendorId: 3,
        lines: [
            { ItemId: 1, description: "1 lcd", quantity: "5", price: "120", tax: true },
            { ItemId: 2, description: "1 meter", quantity: "10", price: "15", tax: true },
            { ItemId: 5, description: "1 inverter", quantity: "20", price: "200", tax: true },
            { ItemId: 13, description: "Sync card", quantity: "15", price: "60", tax: true },
            { ItemId: 23, description: "another lcd", quantity: "30", price: "80", tax: true },
        ],
    };

    const divToPrint = useRef<HTMLElement | null>();
    const [BlobUrl, setBlobUrl] = useState<string>();
    // const pxToMm = (px) => {
    //     return Math.floor(px / document.getElementById('myMm').offsetHeight);
    // };

    // const mmToPx = (mm) => {
    //     return document.getElementById('myMm').offsetHeight * mm;
    // };
    // const range = (start, end) => {
    //     return Array(end - start).join(0).split(0).map(function (val, id) { return id + start });
    // };
    const exportPdf = () => {
        // const input = document.getElementById("divToPrint");
        const input = divToPrint.current;

        input &&
            html2canvas(input)
                .then((canvas) => {
                    var pdf = new jsPDF("p", "pt", "letter");
                    for (var i = 0; i <= input.clientHeight / 980; i++) {
                        //! This is all just html2canvas stuff
                        var srcImg = canvas;
                        var sX = 0;
                        var sY = 980 * i; // start 980 pixels down for every new page
                        var sWidth = 900;
                        var sHeight = 980;
                        var dX = 0;
                        var dY = 0;
                        var dWidth = 900;
                        var dHeight = 980;

                        const onePageCanvas = document.createElement("canvas");
                        onePageCanvas.setAttribute("width", "900");
                        onePageCanvas.setAttribute("height", "980");
                        var ctx = onePageCanvas.getContext("2d");
                        // details on this usage of this function:
                        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                        ctx?.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

                        // document.body.appendChild(canvas);
                        var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                        var width = onePageCanvas.width;
                        var height = onePageCanvas.clientHeight;

                        //! If we're on anything other than the first page,
                        // add another page
                        if (i > 0) {
                            pdf.addPage([612, 791]);
                        }
                        //! now we declare that we're working on that page
                        pdf.setPage(i + 1);
                        //! now we add content to that page!
                        pdf.addImage(canvasDataURL, "PNG", 20, 40, width * 0.62, height * 0.62);
                    }
                    //! after the for loop is finished running, we save the pdf.
                    pdf.save("Test.pdf");
                    var blobPDF = pdf.output("blob");
                    var blobUrl = URL.createObjectURL(blobPDF);
                    setBlobUrl(blobUrl);

                    console.log({ blobPDF, blobUrl });
                })
                .catch((e) => console.log(e));
    };

    return (
        <div>
            <embed src={BlobUrl} width="500px" height="500px" />
            <div id="myMm" style={{ height: "1mm" }} />
            <div>
                <Button onClick={exportPdf}>Print</Button>
            </div>
            <div
                id="divToPrint"
                ref={(e) => (divToPrint.current = e)}
                style={{
                    backgroundColor: "#fff",
                    color: "black",
                    width: "550px",
                    minHeight: "910px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <h3>Contact: {sampleData.ContactId}</h3>
                <h3>Vendot: {sampleData.VendorId}</h3>
                <h3>Requester: {sampleData.requester}</h3>
                <h3>Status: {sampleData.status}</h3>
                <ul>
                    {sampleData.lines.map((l, i) => (
                        <li key={i}>
                            <span style={{ margin: 5 }}>{l.ItemId}</span>
                            <span style={{ margin: 5 }}>{l.description}</span>
                            <span style={{ margin: 5 }}>{l.price}</span>
                            <span style={{ margin: 5 }}>{l.quantity}</span>
                            <span style={{ margin: 5 }}>{l.tax}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExportPdf;
