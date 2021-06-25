import React from "react";

export default function PDFPreview({ pdf, height }: { pdf: string; height?: string }) {
    return (
        <object width="100%" height={height ? height : 400} data={pdf} type="application/pdf">
            <embed src={pdf} type="application/pdf" />
            Can"t load pdf :(, If you have IDM extention please desable it or download the file
        </object>
    );
}
