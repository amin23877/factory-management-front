import React from "react";
import { Box, Typography, LinearProgress } from "@material-ui/core";

import SOAcc from "PDFTemplates/SOAcc";
import SOCus from "PDFTemplates/SOCus";
import SORep from "PDFTemplates/SORep";

import { ISOComplete } from "api/so";

export const DocumentForm = ({
  data,
  accRef,
  cusRef,
  repRef,
  status,
  progress,
}: {
  data: ISOComplete;
  accRef: React.MutableRefObject<HTMLElement | null>;
  repRef: React.MutableRefObject<HTMLElement | null>;
  cusRef: React.MutableRefObject<HTMLElement | null>;
  status: string;
  progress: number;
}) => {
  // const divToPrintAcc = useRef<HTMLElement | null>(null);
  // const divToPrintRep = useRef<HTMLElement | null>(null);
  // const divToPrintCus = useRef<HTMLElement | null>(null);

  // const classes = useStyles();
  // const [canSave, setCanSave] = useState(false);
  // const [isUploading, setIsUploading] = useState(false);

  // const handleSaveDocument = async () => {
  //   try {
  //     setIsUploading(true);
  //     if (divToPrintAcc.current && createdSO?.id) {
  //       const generatedAccPdf = await exportPdf(divToPrintAcc.current);
  //       await createAModelDocument({
  //         model: "so",
  //         id: createdSO.id,
  //         file: generatedAccPdf,
  //         description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
  //         name: `SO_ACC_${createdSO.number}.pdf`,
  //       });
  //     }
  //     if (divToPrintRep.current) {
  //       const generatedRepPdf = await exportPdf(divToPrintRep.current);
  //       await createAModelDocument({
  //         model: "so",
  //         id: createdSO.id,
  //         file: generatedRepPdf,
  //         description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
  //         name: `SO_REP_${createdSO.number}.pdf`,
  //       });
  //     }
  //     if (divToPrintCus.current) {
  //       const generatedCusPdf = await exportPdf(divToPrintCus.current);
  //       await createAModelDocument({
  //         model: "so",
  //         id: createdSO.id,
  //         file: generatedCusPdf,
  //         description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
  //         name: `SO_CUS_${createdSO.number}.pdf`,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsUploading(false);
  //     onDone();
  //   }
  // };

  return (
    <Box>
      <Typography>We made a pdf from your Sales Order, now you can save it</Typography>
      <div style={{ height: 400, overflowY: "auto" }}>
        <div id="myMm" style={{ height: "1mm" }} />
        <h1>Accounting doc :</h1>
        <div
          id="divToPrint"
          ref={(e) => (accRef.current = e)}
          style={{
            backgroundColor: "#fff",
            color: "black",
            width: "835px",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "1200px",
          }}
        >
          <SOAcc data={data} />
        </div>
        <h1>Representative doc :</h1>
        <div
          id="divToPrint1"
          ref={(e) => (repRef.current = e)}
          style={{
            backgroundColor: "#fff",
            color: "black",
            width: "835px",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "1200px",
          }}
        >
          <SORep data={data} />
        </div>
        <h1>Customer doc :</h1>
        <div
          id="divToPrint2"
          ref={(e) => (cusRef.current = e)}
          style={{
            backgroundColor: "#fff",
            color: "black",
            width: "835px",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "1200px",
          }}
        >
          <SOCus data={data} />
        </div>
      </div>

      <Box>
        <Typography style={{ textAlign: "center", margin: "0.5em 0" }}>{status}</Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  );
};
