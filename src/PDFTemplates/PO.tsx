import React from "react";

export default function POTemplate() {
    return (
        <div>
            <div id="myMm" style={{ height: "1mm" }} />
            <div
                id="divToPrint"
                // ref={(e) => (divToPrint.current = e)}
                style={{
                    backgroundColor: "#fff",
                    color: "black",
                    width: "550px",
                    minHeight: "910px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h1>DSPM</h1>
                    <div>
                        <h3>Digital Signal Power Manufacturer, Inc.</h3>
                        <h6>439 S. Stoddard Ave</h6>
                        <h6>San Bernardino, CA 92401</h6>
                        <p>(909) 930-3353 • FAX (909) 930-3335</p>
                    </div>
                    <div>
                        <h1>Purchase Order</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
