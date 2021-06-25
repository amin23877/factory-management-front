import React from 'react';
import '../styles/pdfs.css'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({

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
            <div className={classes.exact}>
                <div
                    style={{
                        width: "160px",
                        backgroundColor: "#8c8c8c",
                        height: "100%",
                        border: "1px solid black",
                    }}
                >
                    <div className={classes.grid}>
                        <div style={{ backgroundColor: "#37608c", border: "2px solid white" }}></div>
                        <div style={{ backgroundColor: "" }}></div>
                        <div style={{ backgroundColor: "#18375f", border: "2px solid white" }}></div>
                        <div style={{ backgroundColor: "#37608c", border: "2px solid white" }}></div>
                        <div style={{ backgroundColor: "#102540", border: "2px solid white" }}></div>
                        <div style={{ backgroundColor: "#18375f", border: "2px solid white" }}></div>
                        <div style={{ backgroundColor: "" }}></div>
                        <div style={{ backgroundColor: "#102540", border: "2px solid white" }}></div>
                    </div>
                </div>
                <div className={classes.right}>
                    <div style={{ marginLeft: "auto" }}>LOGO</div>
                    <div>
                        <h1>Customer Order
                            Acknowledgement</h1>
                    </div>
                    <div>
                        <h3>050621-3PE</h3>
                    </div>
                    <div>
                        DSPM is committed to provide the highest quality products possible through our highly skilled
                        and dedicated employees. Utilizing state-of-the-art manufacturing processes and patented
                        products to pursue an aggressive, on-going research and development program. Insuring DSPM’s
                        future as a leader in Power Conversion products. DSPM provides the highest standards of service
                        available through our highly trained representatives and customer service personnel. DSPM
                        employees are expected to serve the customer with the highest level of technical knowledge in
                        the industry.
                    </div>
                    <div style={{ marginLeft: "auto" }}> footer</div>
                </div>
                <div
                    style={{
                        position: "absolute",
                        left: "120px",
                        top: "0px",
                        width: "80px",
                        height: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#8c8c8c",
                        border: "1px solid black",
                        color: "white",
                    }}
                >
                    {" "}
                    2021{" "}
                </div>
            </div>
            <div>
                <p className="frst-txt1"><b>Sales Order#:</b> 060921-1</p>
                <p className="frst-txt2"><b>Customer PO#: S6650371-PHASE 5</b></p>
                <p className="frst-txt3"><b>PO Received Date:</b></p>
                <p className="frst-txt4"><b>Processed By:</b></p>
                <p className="frst-txt5"><b>Estimated Ship Date:</b>Week of 7/9/2021</p>
                <p className="frst-txt6"><b>Project Name: Alia Inverter</b></p>
                <p className="frst-txt7"><b>Project Location:</b> San Diego</p>
                <p className="frst-txt8"><b>Bill To:</b> OneSource Distributors, LLC<br />
                    5045 Convey St<br />
                    San Diego, CA 92111<br />
                    United States</p>
                <p className="frst-txt9"><b>Ship To:</b> CONVOY STREET<br />
                    San Diego, CA 92111<br />
                    Attn: BR36 ONESOURCE<br />
                    DISTRIBUTORS</p>

                <p className="frst-txt10"><b>Phone:</b> (858) 564-0233</p>
                <p className="frst-txt11"><b>Ship Via:</b> Best Way</p>
                <p className="frst-txt12"><b>Freight Terms </b>  Prepaid and Add</p>

            </div>


            <div className="box-blue">
                <h1 className="h1-1">DEFENDER MINI 2KW 120 volts input 120 volts output, 1-phase, 60 HZ</h1>
                <p className="p1-1">Group [1] Model DMINIA-2KW-120-120-90</p>
                <p className="p1-2">Serial No. 068896</p>
            </div>

            <div className="boxes">
                <h2>DEFENDER MINI 2KW 120 volts input 120 volts output, 1-phase, 60 HZ</h2>
                <p>Qty            Unit Price            Unit Total</p>
                <ul>
                    <li>ONLINE Emergency Lighting Inverter</li>
                    <li>90 minutes Battery Back up</li>
                    <li>Input/Output Terminal Blocks</li>
                    <li>Input/Output Transient Noise Filters</li>
                    <li>Input Main Circuit Breaker</li>
                    <li>Output Main Circuit Breaker</li>
                    <li>Internal Bypass Switch</li>
                    <li>LCD Monitoring / Control / Diagnostic / Communication Subsystem with RS232</li>
                    <li>Phone Assisted Startup, 8am to 5pm Monday to Friday, normal business hours PST</li>
                    <li>Enclosure - (1) each Inverter Cabinet: 24 W X 26 H X 16 D</li>
                    <li>Battery jumper cables included.</li>
                </ul>
            </div>

            <div className="boxes">
                <h2>Service Program Options for DMINIA-2KW-120-120-90</h2>
                <p>Qty            Unit Price            Unit Total</p>
                <ul>
                    <li>SW58-EWMINI1050-2KW 8-5 Mon-Fri, per year $ 661</li><br />
                    <li>SW725 7 days a week 24 hrs Except Holidays, per year $ 1125</li>
                    <li>SW365 7 days a week 24hrs Including Holidays, per year $ 1240</li>
                    <li>SF58-EWMINI1050-2KW 8-5 Mon-Fri One (1) Preventive Maintenance per year (1) $ 1130</li>
                    <li>SF724-EWMINI1050-2KW 7 days a week, 24hrs, Except Holidays, 1 Preventive maintenance per
                        year $ 1683</li>
                    <li>SF365-EWMINI1050-2KW 7 days a week, 24hrs, Including Holidays, 1 Preventive Maintenance per
                        year $ 1895</li>
                    <li>SW58-EWMINI1050-2KW 8-5 Mon-Fri, per year $ 661</li>
                    <li>SF58-EWMINI1050-2KW 8-5 Mon-Fri One (1) Preventive Maintenance per year (1) $ 1130</li>
                    <li>SF724-EWMINI1050-2KW 7 days a week, 24hrs, Except Holidays, 1 Preventive maintenance per
                        year $ 1683</li>
                    <li>SF365-EWMINI1050-2KW 7 days a week, 24hrs, Including Holidays, 1 Preventive Maintenance per
                        year $ 1895</li>

                </ul>
            </div>


            <div className="box-blue1">
                <h1 className="h1-1">This freight quote does not include special items such as lift gates, limited access charges,</h1>
                <p className="p1-1">Group [2] Model FREIGHT</p>
                <p className="p1-2">Serial No. 068898</p>

            </div>


            <div className="boxes-txt">
                <h2>Service Program Options for DMINIA-2KW-120-120-90</h2>
                <p>Qty            Unit Price            Unit Total</p>
                <p>

                    This freight quote does not include special items such as lift gates, limited access charges, and/or any<br />

                    other special handling charges.<br />

                    If extra charges occur, we will contact you to determine how to handle any additional shipping costs if<br />

                    not already disclosed at time of order.<br />


                </p>
            </div>


            <div className="erea">
                <h3 className="h3-3">Special Instructions</h3>
                <h1> Shipping Instructions:</h1>
                <p>

                    PLEASE MARK ALL PACKAGES WITH JOB NAME AND TYPE<br />

                    DELIVERY DOCK AROUND BACK OF BUILDING<br />

                    Special Instructions</p>
            </div>


            <div className="boxes" style={{ marginTop: '140px' }} />
            <h2>NOTES:</h2>
            <p>Qty            Unit Price            Unit Total</p>

            1. * This is the standard lead time; please consult the factory for others.<br />

            a. Expediting fees are due and nonrefundable upon release of purchase order to manufacture.<br />

            b. DSPM will put forth the best effort possible to comply with required dates but not guaranteed.<br />

            2. ** Unit and batteries ship separately, may not arrive same day.<br />

            3. For future reference, please provide ship to zip code for most accurate freight cost.<br />

            4. Line to neutral loads only; unless otherwise stated on purchase order from 3Kva to 21Kva.<br />

            5. Number of battery cabinets may vary; dependent on type of batteries available.<br />

            6. Battery manufacturer subject to change based on availability of batteries.<br />

            7. Customer is responsible for installing batteries into cabinet(s).<br />

            8. DSPM is bidding our standard product in lieu of specifications; please review carefully.<br />

            9. Freight is PREPAID AND ADD unless otherwise noted.<br />




            <div className="boxes-txt" style={{ fontSize: '15px' }}>
                <h2>Terms and Conditions</h2>
                <p>


                    <br />
                    <br />
                    Acceptance
                    The terms of sale contained herein apply to all sales transactions including Quotations and Purchase Orders entered into by
                    Seller directly with the Buyer for standard product. Custom product sales may be subject to additional terms and conditions.
                    This acceptance is conditional upon Buyer's assent to the terms and conditions set out herein in lieu of those in Buyer's
                    purchase orders. Modifications or additions to these terms of sale will be recognized only if accepted in writing by an officer
                    of the Seller. Seller's failure to object to provisions contained in any communication from Buyer shall not be deemed a
                    waiver of the provisions contained herein.
                    <br />
                    <br />

                    Prices
                    Quotations automatically expire 30 days from the date issued and are subject to withdrawal or extension by notice within
                    that period. Seller's published prices are subject to change without notice. New pricing will not be applied to existing orders
                    accepted by Seller. Prices quoted are for products only and do not include any other charges unless specifically covered in
                    writing by Seller. Any discrepancies relating to price must be called to Seller's attention for resolution within 30 days of the
                    billing date.
                    <br />
                    <br />

                    Taxes
                    Unless otherwise agreed upon in writing or required by law, all prices will be quoted and billed exclusive of federal, state
                    and local excise sales and similar taxes. Such taxes, when applicable shall appear as additional terms on the invoice. If
                    exemption from such taxes is claimed, buyer must provide, or have on file with Seller, a certificate of exemption at the time
                    the Purchase Order is submitted to Seller.

                    <br />
                    <br />
                    Orders Acceptance
                    Buyer's Purchase Orders must be in writing and approved by an authorized representative of the Buyer. Seller shall
                    determine order acceptance at its discretion, and may impose restrictions for quantity requirements in regard to total order
                    value and product packaging minimums. Seller can also restrict time frames for scheduled deliveries and change order
                    activity. Terms of acceptance will be mutually understood by both parties, and authorized in writing by Seller at the Buyer's
                    request.
                    <br />
                    <br />

                    Terms of Payment
                    The Seller reserves the right to require payment in advance or C.O.D. and otherwise modify credit terms. Unless otherwise
                    agreed, partial shipments can be made and payment shall become due in accordance with the designated terms upon
                    submission of invoices. Each shipment shall be invoiced separately and Buyer shall pay for each shipment as invoiced. If
                    shipments are delayed by Buyer without Seller's prior written consent, payments shall become due on the date when Seller
                    is prepared to make shipment. Products held for the Buyer by the Seller shall be at the risk and expense of the Buyer. Seller
                    reserves the right to add a monthly service charge as allowed by law.
                    <br />
                    <br />

                    Title and Delivery
                    Unless otherwise instructed in writing, Seller shall ship by the methods it deems most advantageous. Transportation shall
                    be collect, or if prepaid, will be subsequently billed to the Buyer. Title shall pass to the Buyer, and Seller's liability as to
                    delivery shall cease on delivery of products to carrier at Seller's facility, regardless of any provisions for payment of freight
                    or insurance or the form of shipping documents. Risk of loss or damage in transit shall rest with the Buyer. All claims for
                    loss or damage will be filed with the carrier. Claims against Seller for shortages occurring before delivery to carrier shall be
                    waived unless made within thirty (30) days after delivery of shipment to the Buyer.
                    <br />
                    <br />

                    Contingencies
                    All shipping dates and quantities are approximate. Seller shall use reasonable efforts to fill all orders according to the
                    agreed upon schedule and quantity. Seller shall not be responsible for any failure to perform resulting from unforeseen
                    circumstances or causes beyond Seller's reasonable control. Such causes include, but are not limited to; strikes, floods,
                    fires, labor disputes, accidents, inability to maintain materials or supplies, excessive demand for products over the available
                    supply, custom duties or surcharges, and interruption for any reason in the manufacture of Seller's products by Seller's
                    suppliers, any act of God, or the action of any government. In the event of any delay caused by such a contingency, the date
                    of delivery shall, at the request of the Seller be deferred for period equal to the period of delay.
                    <br />
                    <br />

                    Patents
                    Buyer shall indemnify, defend and hold Seller harmless against all expenses, damages, costs, or losses resulting from any
                    suit or proceeding brought for infringement of copyright, patent, trademarks, or other intellectual property rights or for
                    unfair competition arising from compliance with Buyer's design specifications or instructions. With respect to products
                    manufactured solely to Seller's design and specifications, Seller shall defend any suit or proceeding brought against Buyer
                    so far as based on a claim that any such products of any parts there of furnished hereunder constitute an infringement of
                    any United States patent or United States mask work rights, if notified promptly of such claim in writing and given
                    authority, information and assistance in the defense of same, and Seller shall pay all damages and costs awarded therein
                    against Buyer. Seller assumes no liability, consequential or otherwise for, and Buyer agrees to hold Seller harmless against
                    infringement of patent claims covering completed equipment or any assembly, circuit, combination, method or process in
                    which any products may be used. In no event shall Seller's total liability to Buyer under or as a result of compliance with
                    provisions of this paragraph exceed the aggregate sum paid to Seller by Buyer for the purchase of allegedly infringing
                    products or parts. The foregoing states the entire warranty by Seller and the exclusive remedy of the Buyer with respect to
                    any alleged copyright, patent or other intellectual property right infringement by such products or parts. No costs or
                    expenses under this paragraph shall in any event be incurred for the account of the Seller without its prior written consent.
                    Sale of product or any part thereof does not convey to Buyer any license, express or by implication, estoppels or otherwise,
                    under any patent claim with respect to which Seller can grant licenses covering complicated equipment, or any assembly,
                    circuit, combination, method or process in which any such products are used as components (not withstanding) the fact
                    that such products may have been designed for use in or may only be useful in any such patented equipment, assembly
                    circuit, combination, method or process, and that such products may have been purchased and sold for such use). Seller
                    expressly reserves all rights under such patent or patent claim.
                    <br />
                    <br />

                    Warranty and Sole Remedy
                    For the applicable warranty period specified below, Seller warrants that the products to be delivered hereunder will be free
                    from defects in materials and workmanship under normal use and service. The obligations of the Seller under this warranty
                    are limited to replacing, repairing or giving credit for, at its option, any of said products which shall, within the warranty
                    period be returned as provided herein to the Seller, transportation charges prepaid and which are, after examination,
                    disclosed to the satisfaction of the Seller to be thus defective. Buyer acknowledges and agrees that the provisions of this
                    warranty constitute the sole and exclusive remedy available to it with regard to said defective products. No agent,
                    employee, or representative of Seller has any authority to bind Seller to any affirmation, representation or warranty relating
                    to the products other than as specifically provided herein. The warranty provided herein is subject to the following
                    conditions:
                    <br />
                    <br />

                    A. If products become defective during the warranty period, Buyer shall notify Seller promptly in writing of any such claims
                    and provide information pertinent to delivery dates of the product and/or date code information.
                    <br />
                    <br />

                    B. If Seller advises Buyer to return the product for repair or replacement, Buyer will follow Sellers Material Return
                    Authorization procedures. Any order returned after 90 days from the time the order arrived on site, will not get credit for
                    the batteries.
                    <br />
                    <br />

                    C. If product alleged by Buyer to be defective or returned to Seller for repair as provided in this section is either (I) not
                    under warranty, or (ii) determined not to be defective, or (iii) defective due to any cause not covered under the warranty
                    <br />
                    <br />

                    provided herein, Buyer agrees to reimburse Seller for all reasonable expenses incurred in traveling and/or shipping,
                    handling, and inspection of such product.

                    <br />
                    <br />
                    D. Products will be accepted by Seller for warranty claim verification only when returned by Buyer in a condition which
                    allows for suitable testing by Seller.
                    <br />
                    <br />

                    E. Seller shall reimburse Buyer for shipping charges to the extent of the percent of the total return that are found by Seller
                    to be defective as specified herein. Reimbursement will be in the form of a credit adjustment to Buyer's account unless
                    otherwise agreed upon.

                    <br />
                    <br />
                    F. In no event shall Seller be liable for any defective products if examination discloses that the defective condition of such
                    products was caused by misuse, abuse or improper installation, application, maintenance or repair assembly by other than
                    Seller, alteration, accident or negligence in use, storage, transportation or handling outside of specified environmental
                    conditions.

                    <br />
                    <br />
                    G. Seller assumes no risk or liability for the suitability or unsuitability or results of its products, used in combination with
                    any electrical or electronic components, circuits, systems, assemblies, or any other material substances, or environments.
                    <br />
                    <br />

                    H. Any returned products electrically or mechanically destroyed by Buyer or third parties will not be covered under this
                    warranty, and will not be returned to Buyer, but will be scrapped by Seller.

                    <br />
                    <br />
                    I. This warranty shall exist for a period of twelve (12) months after the date of shipment from the Seller and is considered
                    null and void if components or subassemblies other than those supplied or approved by Seller are used in the assembly of
                    Seller’s products, or if Sellers product is modified in any way without written authorization of Seller.
                    <br />
                    <br />

                    J. Developmental products of Seller are warranted to be free from defects in materials and workmanship and to meet the
                    applicable specifications only at the time of receipt of Buyer and for no longer period of time. All accepted deliveries are
                    deemed to be free from defects as of the time of delivery.
                    <br />
                    <br />

                    K. Product sold but not manufactured by the Seller will be warranted as to defects in material and workmanship consistent
                    with the warranty policy of the original manufacturer of the product. The Seller's only obligation shall be to assign Buyer, to
                    the extent possible, whatever warranty the Seller receives from said manufacturer. In no event shall the Seller be liable for
                    loss, damage or expense directly or indirectly arising from the use of the units or from any other cause, except as expressly
                    stated in this warranty. THERE ARE NO WARRANTIES, WHICH EXTEND BEYOND THE DESCRIPTION ON THE FACE HEREOF.
                    THE SELLER DISCLAIMS ANY IMPLIED WARRANTY OF MERCHANTABILITY OF THE GOODS OR OF THE FITNESS OF THE
                    GOODS FOR ANY INTENDED PURPOSE. The Seller is not liable for, and the Buyer waives any right of action it has or may
                    have against the Seller for any consequential or special damages arising out of any breach of warranty and for any damages
                    the Buyer may claim for damage to any property or injury or death to any person arising out of its purchase or the use,
                    operation, or maintenance of the product. The Seller will not be liable for any labor subcontracted or performed by the
                    Buyer for preparation of item under warranty for return to the Seller’s factory or for preparation work for field repair or
                    replacement. Invoicing of the Seller for labor either performed or subcontracted by the Buyer will not be considered as a
                    liability by the Seller. The Seller's obligations under this warranty are conditioned upon timely receipt of all payments in
                    strict accordance with payment terms, time being of the essence in this regard. During the time while the Seller has not
                    received any amount overdue, the Seller shall have no obligation under this warranty. The expiration date of the warranty
                    shall not be extended upon payment of the overdue amount.
                    <br />
                    <br />

                    Product Discontinuance
                    Seller will give as much notification as possible in the event of discontinuing product, however, Seller reserves the right to
                    discontinue production of any product at any time without notice except for that quantity of product for which Seller has
                    received and acknowledged a Purchase Order from Buyer and has scheduled such product for shipment within six (6)
                    months of the date of such acknowledgement.

                    <br />
                    <br />
                    Cancellation of Buyer
                    Orders for standard product may be cancelled on sixty (60) days prior to the scheduled ship date by written notice to Seller.
                    Orders for products which are not listed in Seller’s current catalogue (including but not limited to, semi-custom application
                    specific products, or other semi-custom product(s) which have special markings, or which have received special testing or
                    which are specially programmed for Buyer) may not be cancelled or returned except under the provisions of a prior written
                    agreement between Seller and Buyer which sets forth the cancellation charges to be paid by Buyer in the vent of such
                    cancellation. If such an agreement is not in place, the charges shall be 100%. Any money paid in advance is refundable at
                    DSPM discretion.
                    <br />
                    <br />

                    Property Rights
                    The design, development or manufacture by Seller of a product for Buyer shall not be deemed to produce a work made for
                    hire and shall not give to Buyer any copyright interest in the product or any interest in all or any portion of the mask works
                    relating to the product. All such rights remain with the property of the Seller including models, drawings, composites,
                    patterns, dies molds, masks and any other tools made for or obtained for furnishing the products hereunder.
                    <br />
                    <br />

                    Special, Incidental, Consequential, or Indirect Damages
                    INDEPENDENTLY OF ANY OTHER LIMITATION HEREOF AND REGARDLESS OF WHETHER THE PURPOSE OF SUCH LIMITATION
                    IS SERVED, IT IS AGREED THAT IN NO EVENT SHALL SELLER BE LIABLE FOR SPECIAL, INCIDENTAL, CONSEQUENTIAL OR
                    INDIRECT DAMAGES.

                    <br />
                    <br />
                    Limitation of Actions
                    No action against Seller for breach hereof shall be commenced more than one (1) year after the accrual of the cause of
                    action.

                </p>
            </div>
        </div>
    )
}


