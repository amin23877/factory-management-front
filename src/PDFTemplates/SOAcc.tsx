import React from 'react';
import { makeStyles } from "@material-ui/core";
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

const useStyles = makeStyles({
    divider: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
    },
    logo: {
        width: '40%',
    },
    column: {
        width: '48%',
        display: 'flex',
        flexDirection: 'column',
    },
    topTableContainer: {
        width: '55%',
        display: 'flex',
        flexDirection: 'column',
    },
    topTable: {
        width: '100%',
        border: '1px solid black'
    },
    topTableHead: {
        padding: '10px 0px',
        width: '100%',
        backgroundColor: 'lightgray',
        border: '1px solid black'
    },
    th: {
        backgroundColor: 'lightgray',
        border: '1px solid black',
    },
    td: {
        border: '1px solid black',
        padding: '5px'
    },
    onePage: {
        width: "100%",
        minHeight: "1250px",
        marginBottom: "40px",
    },
    exact: {
        width: "100%",
        height: "1200px",
        marginBottom: "40px",
        position: "relative",
        display: "flex",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        width: "100%",
        height: "320px",
        marginTop: "140%",
    },
    right: {
        flex: 1,
        backgroundColor: "#4f81bc",
        height: "100%",
        border: "1px solid black",
        borderLeft: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "30px",
        color: "white",
    },
});



export default function SOCus({ data }: { data: any }) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.divider}>
                <div className={classes.logo}>LOGO</div>
                <div className={classes.topTableContainer}>
                    <th className={classes.topTableHead}>ACCOUNTING SALES COPY</th>
                    <table className={classes.topTable}>
                        <tr>
                            <td>Project Name</td>
                            <td>Alia Inverter</td>
                        </tr>
                        <tr>
                            <td>Customer PO#</td>
                            <td>S6650371-PHASE 5</td>
                        </tr>
                        <tr>
                            <td>Sales Order # </td>
                            <td>060921-1</td>
                        </tr>
                        <tr>
                            <td>PO Received Date</td>
                            <td>06-09-21</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className={classes.divider}>
                <div className={classes.column}>
                    <table style={{ minHeight: '100px' }}>
                        <th className={classes.th} style={{ width: '25%', padding: '20px 15px' }}>
                            Bill to
                        </th>
                        <td className={classes.td}>
                            OneSource Distributors, LLC 5045 Convey St
                            San Diego, CA 92111
                        </td>
                    </table>
                    <br />
                    <table>
                        <tr>
                            <td className={classes.td} style={{ width: '50%' }}>Material Cost</td>
                            <td className={classes.td}> </td>
                        </tr>
                        <tr>
                            <td className={classes.td} style={{ width: '50%' }}>Actual Ship Date</td>
                            <td className={classes.td}> </td>
                        </tr>
                    </table>
                    <br />
                    <table>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}> PO Received By</th>
                            <td className={classes.td}> Rose Corona</td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>SO Issued Date</th>
                            <td className={classes.td}> 06-09-21 </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>SO Issued By</th>
                            <td className={classes.td}>‌ </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>SO Processed By</th>
                            <td className={classes.td}> ‌</td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}> Sent to Shipping</th>
                            <td className={classes.td}> ‌</td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>
                                Approval - Sales
                            </th>
                            <td className={classes.td}>‌ </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>
                                Approval - Accounting
                            </th>
                            <td className={classes.td}>‌ </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>
                                Approval - Engineering
                            </th>
                            <td className={classes.td}>‌ </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>
                                Approval - Manufacturing
                            </th>
                            <td className={classes.td}>‌ </td>
                        </tr>
                    </table>
                </div>
                <div className={classes.column}>
                    <table style={{ minHeight: '100px' }}>
                        <th className={classes.th} style={{ width: '25%', padding: '20px 15px' }}>
                            Ship to
                        </th>
                        <td className={classes.td}>
                            BR36 ONESOURCE
                            5045 CONVOY STREET
                            San Diego, CA 92111
                        </td>
                    </table>
                    <br />
                    <div style={{ height: '65px' }}></div>
                    <br />
                    <table>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>Purchase Order Total</th>
                            <td className={classes.td}>  $4,492.00</td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>Sales Tax</th>
                            <td className={classes.td}>$0.00 </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>Shipping & Handling</th>
                            <td className={classes.td}>$450.00 </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>Product Cost</th>
                            <td className={classes.td}>$4,042.00 </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>Reg. Commission Rate</th>
                            <td className={classes.td}>   % 10</td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}> Total Commission Amt</th>
                            <td className={classes.td}> $404.20 </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>  Commission Name</th>
                            <td className={classes.td} style={{ fontSize: 'small', padding: '0px' }}> WESTERN Lighting and Controls </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>Warranty</th>
                            <td className={classes.td}>‌ </td>
                        </tr>
                        <tr>
                            <th className={classes.th} style={{ width: '50%' }}>Total Order</th>
                            <td className={classes.td}>$4,492.00 </td>
                        </tr>
                    </table>
                </div>
            </div>
            {/* for each line item */}
            <table style={{ width: '100%' }}>
                <tr>
                    <th> line item</th>
                    <th>qty</th>
                    <th> model number <br /> part number</th>
                    <th style={{ width: '40%' }}>Description</th>
                    <th>unit price</th>
                    <th>extended price</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>DMINIA-2KW-120-120-90</td>
                    <td>
                        DEFENDER MINI 2KW 120 volts input 120
                        volts output, 1-phase, 60 HZ
                    </td>
                    <td>$3,152.00</td>
                    <td style={{}}>$3,152.00</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <br />
                        * ONLINE Emergency Lighting Inverter<br />
                        * 90 minutes Battery Back up<br />
                        * Input/Output Terminal Blocks<br />
                        * Input/Output Transient Noise Filters<br />
                        * Input Main Circuit Breaker<br />
                        * Output Main Circuit Breaker<br />
                        * Internal Bypass Switch<br />
                        * LCD Monitoring / Control / Diagnostic /<br />
                        Communication Subsystem with RS232<br />
                        * Phone Assisted Startup, 8am to 5pm Monday<br />
                        to Friday, normal business hours PST<br />
                        * Enclosure - (1) each Inverter Cabinet: 24 W X<br />
                        26 H X 16 D<br />
                        * Battery jumper cables included.</td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <br />
            <br />
            <h1>
                Special Instruction
            </h1>
            <h3>
                Shipping Instruction
            </h3>
            <div style={{ marginBottom: '100px' }}>
                PLEASE MARK ALL PACKAGES WITH JOB NAME AND TYPE
                DELIVERY DOCK AROUND BACK OF BUILDING
            </div>
        </div>
    )
}