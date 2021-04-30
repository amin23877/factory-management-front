import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportPdf = async (input: HTMLElement) => {
    let ResBlob: { blobPDF: any; blobUrl: string } = { blobPDF: {}, blobUrl: "" };
    try {
        const canvas = await html2canvas(input);
        let pdf = new jsPDF("p", "pt", "letter");
        //! This is all just html2canvas stuff
        let sX = 0;
        let sY = 0; // start 980 pixels down for every new page
        let sWidth = 900;
        let sHeight = 980;
        let dX = 0;
        let dY = 0;
        let dWidth = 900;
        let dHeight = 980;
        let scaleX = 600 / canvas.width;
        let scaleY = 1034 / canvas.height;
        let cWidth = canvas.width;
        let cHeight = canvas.height;
        //we need to scale the canvas but we dont have the element :|
        // const ctx1 = canvas.getContext('2d');
        // ctx1?.scale(scaleX, scaleY);
        // canvas.width = canvas.width * scaleX;
        // canvas.height = canvas.height * scaleY;
        let srcImg = canvas;
        for (let i = 0; i <= input.clientHeight / 980; i++) {
            sY = 980 * i; // start 980 pixels down for every new page

            const onePageCanvas = document.createElement("canvas");
            onePageCanvas.setAttribute("width", String(sWidth));
            onePageCanvas.setAttribute("height", String(sHeight));
            const ctx = onePageCanvas.getContext("2d");
            // details on this usage of this function:
            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
            ctx?.drawImage(srcImg, sX, sY, cWidth, cHeight, dX, dY, dWidth, dHeight);
            ctx?.scale(scaleX, scaleY);

            const canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

            const width = onePageCanvas.width;
            const height = onePageCanvas.height;
            const cwidth = canvas.width;
            const cheight = canvas.height;
            //! If we're on anything other than the first page,
            // add another page
            if (i > 0) {
                pdf.addPage([612, 700]);
            }
            //! now we declare that we're working on that page
            pdf.setPage(i + 1);
            //! now we add content to that page!
            // pdf.addImage(canvasDataURL, "PNG", 20, 40, width * 0.62, height * 0.62);
            // pdf.addImage(canvasDataURL, "PNG", 40, 30, (input.clientWidth * 1.12), (input.clientHeight * 0.62));
            pdf.addImage(canvasDataURL, "PNG", 40, 30, (width*0.62), (height));
            console.log(onePageCanvas);
            console.log(height * 0.62);
            console.log(height);
            console.log(width * 0.62);
            console.log(width);
            console.log(canvas);
            console.log(input.clientHeight);
            console.log(input.clientWidth);
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
