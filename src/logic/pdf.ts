import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const pxToMm = (px: any) => {
    return Math.floor(px / (document.getElementById("myMm") as any).offsetHeight);
};

const mmToPx = (mm: any) => {
    return (document.getElementById("myMm") as any).offsetHeight * mm;
};
const range = (start: any, end: any) => {
    return Array(end - start)
        .join("0")
        .split("0")
        .map(function (val, id) {
            return id + start;
        });
};

export const exportPdf = (input:HTMLElement) => {
    const doc = new jsPDF({unit:'px'});
    let res;
    doc.html(input, {
        callback: (doc) => {
            doc.save();
            res = doc.output('blob');
        },
        x: 15,
        y: 15,
        html2canvas: { scale: 0.5 },
    });

    if(res){
        return res;
    }
}

export const oldExportPdf = async (input: HTMLElement) => {
    let ResBlob: { blobPDF: any; blobUrl: string } = { blobPDF: {}, blobUrl: "" };
    try {
        const canvas = await html2canvas(input, { scale: 1.02 });
        console.log(canvas);
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
        var pheight = pdf.internal.pageSize.getHeight();
        // for (let i = 0; i <= (input.clientHeight) / 980; i++) {
        for (let i = 0; i <= (cHeight) / pheight; i++) {
            // sY = 980 * (i!=1 ? i*0.85 : 1)  ;
            switch (i) {
                case 0: {
                    sY = 980 * 0;
                    break;
                }
                case 1: {
                    sY = 980 * (i * 0.97);
                    break;
                }
                default: {
                    sY = sY + 980 * 0.98;
                }
            }
            // start 980 pixels down for every new page

            const onePageCanvas = document.createElement("canvas");
            onePageCanvas.setAttribute("width", String(sWidth));
            onePageCanvas.setAttribute("height", String(sHeight));
            const ctx = onePageCanvas.getContext("2d");
            // details on this usage of this function:
            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
            ctx?.drawImage(srcImg, sX, sY, cWidth, sHeight, dX, dY, dWidth, dHeight);
            ctx?.scale(scaleX, scaleY);

            const canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

            const width = onePageCanvas.width;
            const height = onePageCanvas.height;
            //! If we're on anything other than the first page,
            // add another page
            if (i > 0) {
                pdf.addPage([612, pheight]);
            }
            //! now we declare that we're working on that page
            pdf.setPage(i + 1);
            //! now we add content to that page!
            // pdf.addImage(canvasDataURL, "PNG", 20, 40, width * 0.62, height * 0.62);
            // pdf.addImage(canvasDataURL, "PNG", 40, 30, (input.clientWidth * 1.12), (input.clientHeight * 0.62));
            pdf.addImage(canvasDataURL, "PNG", 40, 30, width * 0.62, height * 0.8);
            console.log(onePageCanvas);
            console.log(height * 0.62);
            console.log(height);
            console.log(width * 0.62);
            console.log(width);
            console.log(canvas);
            console.log(input.clientHeight);
            console.log(input.clientWidth);
            console.log(canvas.height);
            console.log(canvas.width);
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
