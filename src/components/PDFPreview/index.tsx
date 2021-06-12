import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFPreview({ file }: { file: string }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    return (
        <div>
            {/* Dosen't works :( */}
            <Document
                file={file}
                options={{
                    cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                    cMapPacked: true,
                }}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                <Page onLoadError={(e) => console.log(e)} pageNumber={pageNumber} />
            </Document>
            <button>next</button>
            <button>previous</button>
            <Typography>
                Page {pageNumber} of {numPages}
            </Typography>
        </div>
    );
}
