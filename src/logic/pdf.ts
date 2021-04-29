import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const pxToMm = (px:any) => {
    return Math.floor(px / (document.getElementById("myMm") as any).offsetHeight);
};

const mmToPx = (mm:any) => {
    return (document.getElementById("myMm") as any).offsetHeight * mm;
};
const range = (start:any, end:any) => {
    return Array(end - start)
        .join('0')
        .split('0')
        .map(function (val, id) {
            return id + start;
        });
};

export const exportPdf = async (input: HTMLElement) => {
    let ResBlob: { blobPDF: any; blobUrl: string } = { blobPDF: {}, blobUrl: "" };
    try {
        const canvas = await html2canvas(input);
        let pdf = new jsPDF("p", "pt", "letter");
        //! This is all just html2canvas stuff
        let srcImg = canvas;
        let sX = 0;
        let sY = 0; // start 980 pixels down for every new page
        let sWidth = 900;
        let sHeight = 980;
        let dX = 0;
        let dY = 0;
        let dWidth = 900;
        let dHeight = 980;

        for (let i = 0; i <= input.clientHeight / 980; i++) {
            sY = 980 * i; // start 980 pixels down for every new page

            const onePageCanvas = document.createElement("canvas");
            onePageCanvas.setAttribute("width", String(sWidth));
            onePageCanvas.setAttribute("height", String(sHeight));
            const ctx = onePageCanvas.getContext("2d");
            // details on this usage of this function:
            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
            ctx?.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

            // document.body.appendChild(canvas);
            const canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

            const width = onePageCanvas.width;
            const height = onePageCanvas.clientHeight;

            //! If we're on anything other than the first page,
            // add another page
            if (i > 0) {
                pdf.addPage([612, 791]);
            }
            //! now we declare that we're working on that page
            pdf.setPage(i + 1);
            //! now we add content to that page!
            // pdf.addImage(canvasDataURL, "PNG", 20, 40, width * 0.62, height * 0.62);
            pdf.addImage(canvasDataURL, "PNG", 40,30, 650 , height*0.62 );
        }
        //! after the for loop is finished running, we save the pdf.
        pdf.save("Test.pdf");
        const blobPDF = pdf.output("blob");
        const blobUrl = URL.createObjectURL(blobPDF);

        ResBlob = { blobPDF, blobUrl };
        return ResBlob;
    } catch (error) {
        throw error;
    }
};
