import React from "react";

import { IContact } from "../api/contact";
import { IVendor } from "../api/vendor";

export default function PurchasePO({
    contact,
    lines,
    sum,
    vendor,
}: {
    vendor: IVendor;
    contact: IContact;
    lines: any;
    sum: any;
}) {
    return (
        <div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    height: "150px",
                    backgroundColor: "#416364",
                    color: "white",
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: "x-large",
                            textAlign: "center",
                            marginBottom: "10px",
                            marginTop: "20px",
                        }}
                    >
                        Purchase Order
                    </div>
                </div>
            </div>
            <table
                style={{
                    width: "100.1%",
                    border: "2px solid #416364",
                    borderTop: "none",
                    minHeight: "150px",
                    borderBottom: "none",
                }}
            >
                <tr
                    style={{
                        backgroundColor: "#c4d69c",
                        width: "100%",
                        height: "26px",
                    }}
                >
                    <th>Purchase from: </th>
                    <th>Ship to: </th>
                </tr>
                <tr className="minHeight">
                    <td>{vendor?.name}</td>
                    <td>{`${contact?.firstName} ${contact?.lastName}`}</td>
                </tr>
            </table>
            <table
                style={{
                    width: "100.1%",
                    border: "2px solid #416364",
                    borderTop: "none",
                    minHeight: "100px",
                    borderBottom: "none",
                }}
            >
                <tr
                    style={{
                        backgroundColor: "#c4d69c",
                        width: "100%",
                        height: "26px",
                    }}
                >
                    {/* <th>Phone</th>
                            <th>Fax</th>
                            <th>RMA No.</th>
                            <th>Terms</th>
                            <th>Date</th>
                            <th>Ship via</th> */}
                    <th>Shipping Method</th>
                    <th>Payment Terms</th>
                    <th>Required By Date</th>
                </tr>
                <tr>
                    <td style={{ borderRight: "2px solid #416364 " }}></td>
                    <td style={{ borderRight: "2px solid #416364 ", width: "20%" }}></td>
                    <td style={{ width: "34%" }}></td>
                    {/* <td>123 456 789</td>
                            <td>123 456 789</td>
                            <td>123 456 789</td>
                            <td> </td>
                            <td>{createdPO?.date?.slice(0, 10)}</td>
                            <td> </td> */}
                </tr>
            </table>
            <table
                style={{
                    width: "100%",
                    border: "2px solid #416364",
                    borderTop: "none",
                    minHeight: "650px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px",
                }}
            >
                <tr
                    style={{
                        backgroundColor: "#c4d69c",
                        width: "100%",
                        height: "26px",
                        maxHeight: "26px",
                        display: "flex",
                        justifyContent: "space-evenly",
                    }}
                >
                    {/* <th style={{ borderRight: "1px solid black" }}>Item</th> */}
                    <th style={{ width: "46%" }}> Item Description</th>
                    <th style={{ width: "20%" }}>Qty</th>
                    <th style={{ width: "17%" }}>Price</th>
                    <th style={{ width: "17%" }}>Amount</th>
                </tr>
                {lines.map((l: any, i: any) => (
                    <tr
                        key={i}
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        {/* <td>{l.ItemId}</td> */}
                        <td style={{ width: "46%", borderRight: "2px solid #416364 ", verticalAlign: "top" }}>
                            {l.description}
                        </td>
                        <td style={{ width: "20%", borderRight: "2px solid #416364 ", verticalAlign: "top" }}>
                            {l.quantity}
                        </td>
                        <td style={{ width: "17%", borderRight: "2px solid #416364 ", verticalAlign: "top" }}>
                            {l.price}
                        </td>
                        <td style={{ width: "17%", verticalAlign: "top" }}> {l.quantity * l.price} </td>
                    </tr>
                ))}
                <tr style={{ width: "100%", display: "flex", justifyContent: "space-between", flexGrow: 1 }}>
                    {/* <td>{l.ItemId}</td> */}
                    <td style={{ width: "46%", borderRight: "2px solid #416364 ", verticalAlign: "top" }}></td>
                    <td style={{ width: "20%", borderRight: "2px solid #416364 ", verticalAlign: "top" }}></td>
                    <td style={{ width: "17%", borderRight: "2px solid #416364 ", verticalAlign: "top" }}></td>
                    <td style={{ width: "17%", verticalAlign: "top" }}></td>
                </tr>
            </table>
            <div
                style={{
                    width: "100%",
                    border: "2px solid #416364",
                    borderTop: "none",
                    minHeight: "150px",
                    padding: "10px 10px 10px 30px",
                }}
            >
                <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 3, display: "flex", flexDirection: "column", marginTop: "20px" }}>
                        <strong> Approved By:</strong>
                        <div style={{ display: "flex", marginTop: "20px", alignItems: "center" }}>
                            X{" "}
                            <div
                                style={{
                                    margin: "15px 10px 10px 10px ",
                                    borderBottom: "2px solid black ",
                                    width: "300px",
                                }}
                            ></div>
                        </div>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            padding: " 5px 20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                        }}
                    >
                        <div>Subtotal : {sum}$</div>
                        <div>Freight : {sum}$</div>
                        <div>Sales Tax : {sum}$</div>
                        <div style={{ fontWeight: "bold", width: "100%" }}>
                            Order Total :
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    height: "auto",
                                    fontWeight: "bold",
                                    backgroundColor: "#c4d69c",
                                    borderBottom: "1px solid black ",
                                    padding: "3px 10px",
                                }}
                            >
                                {sum}$
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
