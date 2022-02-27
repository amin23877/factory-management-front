import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { IQuoteComplete } from "../api/quote";

const useStyles = makeStyles({
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "7px",
  },
  pfe: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headContain: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    width: "30",
    fontWeight: "bold",
    textAlign: "right",
  },
  info: {
    width: "65%",
  },
  gray: {
    backgroundColor: "lightgray",
    textAlign: "center",
    fontSize: "large",
    fontWeight: "bold",
    padding: "5px 20px 20px 20px",
  },
  Qty: {
    width: "30%",
    display: "flex",
    justifyContent: "space-between",
  },
  lineItemName: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  item: {
    padding: "0px 3px 5px 3px",
    borderBottom: "2px solid black",
    fontWeight: "bold",
    marginBottom: "5px",
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
  table: {
    width: "100%",
  },
  td: {
    border: "0.5px solid black",
  },
  th: {
    border: "0.5px solid black",
  },
  span: {
    fontWeight: "bold",
    fontSize: "large",
    margin: "0px 5px",
  },
});
export default function QuotePDF({ createdQuote }: { createdQuote: IQuoteComplete }) {
  const classes = useStyles();
  let total = 0;
  createdQuote.lineItemRecords?.forEach((l) => {
    total = total + l.quantity * l.price;
  });
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
            <h1>Representative Quote</h1>
          </div>
          <div>
            <h3>{createdQuote?.number}</h3>
          </div>
          <div>
            DSPM is committed to provide the highest quality products possible through our highly skilled and dedicated
            employees. Utilizing state-of-the-art manufacturing processes and patented products to pursue an aggressive,
            on-going research and development program. Insuring DSPM’s future as a leader in Power Conversion products.
            DSPM provides the highest standards of service available through our highly trained representatives and
            customer service personnel. DSPM employees are expected to serve the customer with the highest level of
            technical knowledge in the industry.
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
      <div className={classes.onePage}>
        <div className={classes.header} style={{ marginBottom: "15px" }}>
          <div>LOGO</div>
          <div>
            <div>Quoted By :</div>
            <div>{createdQuote?.EmployeeId?.username} //check</div>
          </div>
          <div className={classes.pfe}>
            <div style={{ fontSize: "x-large", fontWeight: "bold", color: "teal" }}>Quote</div>
            <div>
              <span>phone: </span>
              <span> +989906055809</span>
            </div>
            <div>
              <span>fax: </span>
              <span> +989906055809</span>
            </div>
            <div>
              <span>email: </span>
              <span> akdjakhdkjhHA@GMAIL.com</span>
            </div>
          </div>
        </div>
        <div className={classes.header}>
          <div className={classes.headContain} style={{ marginTop: "auto" }}>
            <div className={classes.header}>
              <span className={classes.title}>Agency: </span>
              <span className={classes.info}>
                {createdQuote.repOrAgency?.id ? createdQuote.repOrAgency?.name : createdQuote.client?.name}
              </span>
            </div>
            <div className={classes.header}>
              <span className={classes.title}>Requested By: </span>
              <span className={classes.info}>{createdQuote.requesterName}</span>
            </div>
            <div className={classes.header}>
              <span className={classes.title}>Project: </span>
              <span className={classes.info}>{createdQuote.ProjectId?.name} </span>
            </div>
          </div>
          <div className={classes.headContain}>
            <div className={classes.header}>
              <span className={classes.title}>Quote # : </span>
              <span className={classes.info}>{createdQuote.number}</span>
            </div>
            <div className={classes.header}>
              <span className={classes.title}>Prepared On : </span>
              <span className={classes.info}>{createdQuote?.entryDate}</span>
            </div>
            <div className={classes.header}>
              <span className={classes.title}>Expires : </span>
              <span className={classes.info}>{createdQuote?.expireDate}</span>
            </div>
            <div className={classes.header}>
              <span className={classes.title}>Lead Time :</span>
              <span className={classes.info}>{createdQuote.leadTime}</span>
            </div>
            <div className={classes.header} style={{ marginTop: "15px" }}>
              <span className={classes.title}>Ship Via: </span>
              <span className={classes.info}></span>
            </div>
            <div className={classes.header}>
              <span className={classes.title}>Freight Terms: </span>
              <span className={classes.info}>{createdQuote.freightTerms}</span>
            </div>
            <div className={classes.header}>
              <span className={classes.title}>Payment Terms:</span>
              <span className={classes.info}>{createdQuote.paymentTerms}</span>
            </div>
          </div>
        </div>
        {createdQuote?.lines?.map((group: any) =>
          group.map((item: any, index: any) => (
            <Fragment key={index}>
              <hr />
              <div className={classes.gray} style={{ marginBottom: "15px" }}>
                {item?.ItemObject?.name || ""}
              </div>
              <div className={classes.header} style={{ marginBottom: "15px" }}>
                <div className={classes.lineItemName}>
                  <div className={classes.Qty} style={{ width: "50%" }}>
                    <div>
                      <div className={classes.item}>Line[group]</div>
                      <div style={{ textAlign: "center" }}>{index}</div>
                    </div>
                    <div>
                      <div className={classes.item}>Item No./Description</div>
                      <div style={{ textAlign: "center" }}> {item?.ItemObject?.no || ""} </div>
                    </div>
                  </div>
                  <div style={{ paddingRight: "10px" }}>{item?.ItemObject?.description || ""}</div>
                </div>
                <div className={classes.Qty}>
                  <div>
                    <div className={classes.item}>QTY</div>
                    <div style={{ textAlign: "center" }}>{item?.qty}</div>
                  </div>
                  <div>
                    <div className={classes.item}>Unit Price</div>
                    <div style={{ textAlign: "center" }}>{item?.price}</div>
                  </div>
                  <div>
                    <div className={classes.item}>Unit Total</div>
                    <div style={{ textAlign: "center" }}>{Number(item?.price) * Number(item?.qty)}</div>
                  </div>
                </div>
              </div>
            </Fragment>
          ))
        )}
      </div>
      <div className={classes.onePage}>
        <div className={classes.header} style={{ marginBottom: "15px" }}>
          <div>LOGO</div>
          <div>
            <div>Quoted By :</div>
            <div>{createdQuote?.EmployeeId?.username}</div>
          </div>
          <div className={classes.pfe}>
            <div style={{ fontSize: "x-large", fontWeight: "bold", color: "teal" }}>Quote</div>
            <div>
              <span>phone: </span>
              <span></span>
            </div>
            <div>
              <span>fax: </span>
              <span></span>
            </div>
            <div>
              <span>email: </span>
              <span>@gmail.com</span>
            </div>
          </div>
        </div>
        <hr />
        <div className={classes.header}>
          <div className={classes.lineItemName}>
            <div className={classes.Qty} style={{ width: "50%" }}>
              <div>
                <div className={classes.item}>Notes : </div>
              </div>
            </div>
            <div style={{ paddingRight: "10px", color: "red" }}>{createdQuote?.note}</div>
          </div>
          <div className={classes.Qty} style={{ justifyContent: "space-around" }}>
            <div>
              <div style={{ textAlign: "right" }}> Commission Rate : </div>
              <div style={{ textAlign: "right" }}> Commission Total : </div>
              <div style={{ textAlign: "right", marginBottom: "15px" }}> Subtotal : </div>
              <div style={{ textAlign: "right" }}> Sales Tax : </div>
              <div style={{ textAlign: "right" }}> Total Freight : </div>
              <br />
              <div style={{ textAlign: "right" }}> Quote Total : </div>
            </div>
            <div>
              <div style={{ textAlign: "left" }}> {createdQuote?.regularCommission} </div>
              <div style={{ textAlign: "left" }}> {createdQuote?.regularCommission * total} </div>
              <div style={{ textAlign: "left", marginBottom: "15px" }}> {total} </div>
              <div style={{ textAlign: "left" }}> 0.0$ </div>
              <div style={{ textAlign: "left" }}> 0.0$ </div>
              <br />
              <div style={{ textAlign: "left" }}> 25.265$ </div>
            </div>
          </div>
        </div>
        <h3>TERMS AND CONDITIONS:</h3>
        <h5>Acceptance</h5>
        <div>
          The terms of sale contained herein apply to all sales transactions including Quotations and Purchase Orders
          entered into by Seller directly with the Buyer for standard product. Custom product sales may be subject to
          additional terms and conditions. This acceptance is conditional upon Buyer's assent to the terms and
          conditions set out herein in lieu of those in Buyer's purchase orders. Modifications or additions to these
          terms of sale will be recognized only if accepted in writing by an officer of the Seller. Seller's failure to
          object to provisions contained in any communication from Buyer shall not be deemed a waiver of the provisions
          contained herein.
        </div>

        <h5>Prices</h5>
        <div>
          Quotations automatically expire 30 days from the date issued and are subject to withdrawal or extension by
          notice within that period. Seller's published prices are subject to change without notice. New pricing will
          not be applied to existing orders accepted by Seller. Prices quoted are for products only and do not include
          any other charges unless specifically covered in writing by Seller. Any discrepancies relating to price must
          be called to Seller's attention for resolution within 30 days of the billing date.
        </div>

        <h5>Taxes</h5>
        <div>
          Unless otherwise agreed upon in writing or required by law, all prices will be quoted and billed exclusive of
          federal, state and local excise sales and similar taxes. Such taxes, when applicable shall appear as
          additional terms on the invoice. If exemption from such taxes is claimed, buyer must provide, or have on file
          with Seller, a certificate of exemption at the time the Purchase Order is submitted to Seller.
        </div>
        <h5>Orders Acceptance</h5>
        <div>
          Buyer's Purchase Orders must be in writing and approved by an authorized representative of the Buyer. Seller
          shall determine order acceptance at its discretion, and may impose restrictions for quantity requirements in
          regard to total order value and product packaging minimums. Seller can also restrict time frames for scheduled
          deliveries and change order activity. Terms of acceptance will be mutually understood by both parties, and
          authorized in writing by Seller at the Buyer's request.
        </div>
        <h5>Terms of Payment</h5>
        <div>
          The Seller reserves the right to require payment in advance or C.O.D. and otherwise modify credit terms.
          Unless otherwise agreed, partial shipments can be made and payment shall become due in accordance with the
          designated terms upon submission of invoices. Each shipment shall be invoiced separately and Buyer shall pay
          for each shipment as invoiced. If shipments are delayed by Buyer without Seller's prior written consent,
          payments shall become due on the date when Seller is prepared to make shipment. Products held for the Buyer by
          the Seller shall be at the risk and expense of the Buyer. Seller reserves the right to add a monthly service
          charge as allowed by law.
        </div>
        <h5>Title and Delivery</h5>
        <div>
          Unless otherwise instructed in writing, Seller shall ship by the methods it deems most advantageous.
          Transportation shall be collect, or if prepaid, will be subsequently billed to the Buyer. Title shall pass to
          the Buyer, and Seller's liability as to delivery shall cease on delivery of products to carrier at Seller's
          facility, regardless of any provisions for payment of freight or insurance or the form of shipping documents.
          Risk of loss or damage in transit shall rest with the Buyer. All claims for loss or damage will be filed with
          the carrier. Claims against Seller for shortages occurring before delivery to carrier shall be waived unless
          made within thirty (30) days after delivery of shipment to the Buyer.
        </div>
        <h5>Contingencies</h5>
        <div>
          All shipping dates and quantities are approximate. Seller shall use reasonable efforts to fill all orders
          according to the agreed upon schedule and quantity. Seller shall not be responsible for any failure to perform
          resulting from unforeseen circumstances or causes beyond Seller's reasonable control. Such causes include, but
          are not limited to; strikes, floods, fires, labor disputes, accidents, inability to maintain materials or
          supplies, excessive demand for products over the available supply, custom duties or surcharges, and
          interruption for any reason in the manufacture of Seller's products by Seller's suppliers, any act of God, or
          the action of any government. In the event of any delay caused by such a contingency, the date of delivery
          shall, at the request of the Seller be deferred for period equal to the period of delay.
        </div>
        <h5>Patents</h5>
        <div>
          Buyer shall indemnify, defend and hold Seller harmless against all expenses, damages, costs, or losses
          resulting from any suit or proceeding brought for infringement of copyright, patent, trademarks, or other
          intellectual property rights or for unfair competition arising from compliance with Buyer's design
          specifications or instructions. With respect to products manufactured solely to Seller's design and
          specifications, Seller shall defend any suit or proceeding brought against Buyer so far as based on a claim
          that any such products of any parts there of furnished hereunder constitute an infringement of any United
          States patent or United States mask work rights, if notified promptly of such claim in writing and given
          authority, information and assistance in the defense of same, and Seller shall pay all damages and costs
          awarded therein against Buyer. Seller assumes no liability, consequential or otherwise for, and Buyer agrees
          to hold Seller harmless against infringement of patent claims covering completed equipment or any assembly,
          circuit, combination, method or process in which any products may be used. In no event shall Seller's total
          liability to Buyer under or as a result of compliance with provisions of this paragraph exceed the aggregate
          sum paid to Seller by Buyer for the purchase of allegedly infringing products or parts. The foregoing states
          the entire warranty by Seller and the exclusive remedy of the Buyer with respect to any alleged copyright,
          patent or other intellectual property right infringement by such products or parts. No costs or expenses under
          this paragraph shall in any event be incurred for the account of the Seller without its prior written consent.
          Sale of product or any part thereof does not convey to Buyer any license, express or by implication, estoppels
          or otherwise, under any patent claim with respect to which Seller can grant licenses covering complicated
          equipment, or any assembly, circuit, combination, method or process in which any such products are used as
          components (not withstanding) the fact that such products may have been designed for use in or may only be
          useful in any such patented equipment, assembly circuit, combination, method or process, and that such
          products may have been purchased and sold for such use). Seller expressly reserves all rights under such
          patent or patent claim.
        </div>
        <h5>Warranty and Sole Remedy</h5>
        <div>
          For the applicable warranty period specified below, Seller warrants that the products to be delivered
          hereunder will be free from defects in materials and workmanship under normal use and service. The obligations
          of the Seller under this warranty are limited to replacing, repairing or giving credit for, at its option, any
          of said products which shall, within the warranty period be returned as provided herein to the Seller,
          transportation charges prepaid and which are, after examination, disclosed to the satisfaction of the Seller
          to be thus defective. Buyer acknowledges and agrees that the provisions of this warranty constitute the sole
          and exclusive remedy available to it with regard to said defective products. No agent, employee, or
          representative of Seller has any authority to bind Seller to any affirmation, representation or warranty
          relating to the products other than as specifically provided herein. The warranty provided herein is subject
          to the following conditions:
          <br />
          <br />
          A. If products become defective during the warranty period, Buyer shall notify Seller promptly in writing of
          any such claims and provide information pertinent to delivery dates of the product and/or date code
          information.
          <br />
          <br />
          B. If Seller advises Buyer to return the product for repair or replacement, Buyer will follow Sellers Material
          Return Authorization procedures. Any order returned after 90 days from the time the order arrived on site,
          will not get credit for the batteries.
          <br />
          <br />
          C. If product alleged by Buyer to be defective or returned to Seller for repair as provided in this section is
          either (I) not under warranty, or (ii) determined not to be defective, or (iii) defective due to any cause not
          covered under the warranty provided herein, Buyer agrees to reimburse Seller for all reasonable expenses
          incurred in traveling and/or shipping, handling, and inspection of such product.
          <br />
          <br />
          D. Products will be accepted by Seller for warranty claim verification only when returned by Buyer in a
          condition which allows for suitable testing by Seller.
          <br />
          <br />
          E. Seller shall reimburse Buyer for shipping charges to the extent of the percent of the total return that are
          found by Seller to be defective as specified herein. Reimbursement will be in the form of a credit adjustment
          to Buyer's account unless otherwise agreed upon.
          <br />
          <br />
          F. In no event shall Seller be liable for any defective products if examination discloses that the defective
          condition of such products was caused by misuse, abuse or improper installation, application, maintenance or
          repair assembly by other than Seller, alteration, accident or negligence in use, storage, transportation or
          handling outside of specified environmental conditions.
          <br />
          <br />
          G. Seller assumes no risk or liability for the suitability or unsuitability or results of its products, used
          in combination with any electrical or electronic components, circuits, systems, assemblies, or any other
          material substances, or environments.
          <br />
          <br />
          H. Any returned products electrically or mechanically destroyed by Buyer or third parties will not be covered
          under this warranty, and will not be returned to Buyer, but will be scrapped by Seller.
          <br />
          <br />
          I. This warranty shall exist for a period of twelve (12) months after the date of shipment from the Seller and
          is considered null and void if components or subassemblies other than those supplied or approved by Seller are
          used in the assembly of Seller’s products, or if Sellers product is modified in any way without written
          authorization of Seller.
          <br />
          <br />
          J. Developmental products of Seller are warranted to be free from defects in materials and workmanship and to
          meet the applicable specifications only at the time of receipt of Buyer and for no longer period of time. All
          accepted deliveries are deemed to be free from defects as of the time of delivery.
          <br />
          <br />
          K. Product sold but not manufactured by the Seller will be warranted as to defects in material and workmanship
          consistent with the warranty policy of the original manufacturer of the product. The Seller's only obligation
          shall be to assign Buyer, to the extent possible, whatever warranty the Seller receives from said
          manufacturer. In no event shall the Seller be liable for loss, damage or expense directly or indirectly
          arising from the use of the units or from any other cause, except as expressly stated in this warranty. THERE
          ARE NO WARRANTIES, WHICH EXTEND BEYOND THE DESCRIPTION ON THE FACE HEREOF. THE SELLER DISCLAIMS ANY IMPLIED
          WARRANTY OF MERCHANTABILITY OF THE GOODS OR OF THE FITNESS OF THE GOODS FOR ANY INTENDED PURPOSE. The Seller
          is not liable for, and the Buyer waives any right of action it has or may have against the Seller for any
          consequential or special damages arising out of any breach of warranty and for any damages the Buyer may claim
          for damage to any property or injury or death to any person arising out of its purchase or the use, operation,
          or maintenance of the product. The Seller will not be liable for any labor subcontracted or performed by the
          Buyer for preparation of item under warranty for return to the Seller’s factory or for preparation work for
          field repair or replacement. Invoicing of the Seller for labor either performed or subcontracted by the Buyer
          will not be considered as a liability by the Seller. The Seller's obligations under this warranty are
          conditioned upon timely receipt of all payments in strict accordance with payment terms, time being of the
          essence in this regard. During the time while the Seller has not received any amount overdue, the Seller shall
          have no obligation under this warranty. The expiration date of the warranty shall not be extended upon payment
          of the overdue amount.
        </div>
        <h5>Product Discontinuance</h5>
        <div>
          Seller will give as much notification as possible in the event of discontinuing product, however, Seller
          reserves the right to discontinue production of any product at any time without notice except for that
          quantity of product for which Seller has received and acknowledged a Purchase Order from Buyer and has
          scheduled such product for shipment within six (6) months of the date of such acknowledgement.
        </div>
        <h5>Cancellation of Buyer</h5>
        <div>
          Orders for standard product may be cancelled on sixty (60) days prior to the scheduled ship date by written
          notice to Seller. Orders for products which are not listed in Seller’s current catalogue (including but not
          limited to, semi-custom application specific products, or other semi-custom product(s) which have special
          markings, or which have received special testing or which are specially programmed for Buyer) may not be
          cancelled or returned except under the provisions of a prior written agreement between Seller and Buyer which
          sets forth the cancellation charges to be paid by Buyer in the vent of such cancellation. If such an agreement
          is not in place, the charges shall be 100%. Any money paid in advance is refundable at DSPM discretion.
        </div>
        <h5>Property Rights</h5>
        <div>
          The design, development or manufacture by Seller of a product for Buyer shall not be deemed to produce a work
          made for hire and shall not give to Buyer any copyright interest in the product or any interest in all or any
          portion of the mask works relating to the product. All such rights remain with the property of the Seller
          including models, drawings, composites, patterns, dies molds, masks and any other tools made for or obtained
          for furnishing the products hereunder.
        </div>
        <h5>Special, Incidental, Consequential, or Indirect Damages</h5>
        <div>
          INDEPENDENTLY OF ANY OTHER LIMITATION HEREOF AND REGARDLESS OF WHETHER THE PURPOSE OF SUCH LIMITATION IS
          SERVED, IT IS AGREED THAT IN NO EVENT SHALL SELLER BE LIABLE FOR SPECIAL, INCIDENTAL, CONSEQUENTIAL OR
          INDIRECT DAMAGES.
        </div>
        <h5>Limitation of Actions</h5>
        <div>
          No action against Seller for breach hereof shall be commenced more than one (1) year after the accrual of the
          cause of action.
        </div>
        <h5>Assignment</h5>
        <div>
          The Buyer shall not assign this order or any interest therein or any rights there under without the prior
          written consent of Seller.
        </div>
        <h5>Local Currency</h5>
        <div>Any order placed hereunder is, and payment for such order will be in U.S. Dollars.</div>
        <h5>Confidential Information</h5>
        <div>
          Seller shall have no obligation to hold any information received from Buyer hereunder in confidence unless
          such information is covered by a separate negotiated Non-Disclosure Agreement, which is reduced to writing and
          signed by both parties.
        </div>
        <h5>Governing Law</h5>
        <div>
          SEVERABILITY. These terms and conditions of sale shall be governed by the laws of the state of California. Any
          provisions hereof which are prohibited or unenforceable in any jurisdiction shall, as to such jurisdictions,
          be ineffective to the extent of such prohibition or unenforceable without invalidating the remaining
          provisions hereof or affecting the validity or enforceability of such provisions in any other
        </div>
        <h5>Arbitration</h5>
        <div>
          If a disagreement or controversy of any kind arises between the Buyer and Seller, both parties shall meet to
          attempt to resolve such disagreement. If the disagreement cannot be resolved by the parties, an informal
          binding arbitration shall be held. The rules of the informal arbitration shall be agreed upon by the parties
          prior to the arbitration. To the extent that Buyer and Seller cannot agree on the rules of the arbitration,
          the rules and procedures of the American Arbitration Association shall apply. As a minimum set of rules, the
          parties agree as follows:
          <br />
          <br />
          A. The arbitration shall be held by a single arbitrator mutually acceptable to both parties. If the parties
          cannot agree on a single arbitrator, each party shall identify one independent individual who shall meet to
          appoint a single arbitrator.
          <br />
          <br />
          B. The decision of the arbitrator shall be considered as a final and binding resolution of the disagreement
          which may be entered as a judgment by any court of competent jurisdiction.
          <br />
          <br />
          C. The arbitration shall be held in Los Angeles County, California.
          <br />
          <br />
          D. Neither party shall sue the other except for enforcement of the arbitrator's decision. All disagreements or
          controversies of any kind whether claimed in tort, contract or otherwise, either concerning this agreement or
          any other matter whatsoever, shall be arbitrated according to the provisions of this paragraph and shall be
          brought within one (1) year after the accrual of the disagreement or controversy.
        </div>
        <h5>Modifications</h5>
        <div>
          No addition to or deletion from, nor any modifications of these terms and conditions of sale shall be binding
          upon the Seller unless acknowledged and accepted in writing by an officer of the Seller. Any change made by
          Seller will be deemed accepted by Buyer unless within ten (10) days from notice of such change. Buyer notifies
          Seller of Buyer's exception to such change. A waiver by Seller of any default or of any of the terms and
          conditions of sales shall not be deemed to be continuing waiver of any other default or of any other of these
          terms and conditions of sale, but shall apply solely to the instance to which the waiver is directed.
          <br />
          <br />
          Terms & Conditions of Sale subject to change without notice
          <br />
          <br />
          Effective date 12-12-2008 DSPM Copyright ©
          <br />
          079-0001-01
        </div>
      </div>
      <div style={{ marginBottom: "200px" }}>
        <div style={{ textAlign: "center" }}>
          <h1> Service Program Descriptions </h1>
        </div>
        <div>
          <h4>TOS - Equipment Turn On Service WITHOUT On Site Warranty</h4>
          <ul>
            <li>
              Equipment Turn on Service is for customer that would like to have start-up performed without adding
              additional coverage to the equipment warranty.
            </li>
            <li>This coverage can be performed as an On-Site Startup Service for any DSPM product.</li>
            <li>
              All parts and labor to repair if NOT covered under a current Warranty or Service Plan and will be billed
              at DSPM current rates unless covered by a current warranty or service plan.
            </li>
          </ul>
          <h4>CI - Certification Inspection Visit</h4>
          <ul>
            <li>
              The Certification/Inspection is a service provided to certify equipment capable is placed under a
              warranty/service plan.
            </li>
            <li>The Certification Inspection is complete when all repairs are completed.</li>
            <li>
              The Certification Inspection is billed at DSPM current hourly rates based on time of day and day of week
              service is performed.
            </li>
            <li>All parts needed to complete the repairs are billed at DSPM current list prices.</li>
          </ul>
          <h4>SW58 - Extended On-Site Warranty 8-5 Monday-Friday</h4>
          <ul>
            <li>
              This Extended Warranty Plan is to be purchased while the equipment is still under current warranty
              coverage, or after approval by DSPM and a Certification Inspection by DSPM.
            </li>
            <li>
              This plan covers all replacement pans and labor including travel time and expenses for all emergency calls
              to service the unit. All service calls will be made between 8:00 a.m. and 5:00 p.m. and will be limited to
              Monday through Friday with the exception of the DSPM's designated holidays.
            </li>
            <li>
              If the Customer requests remedial maintenance outside of the contracted coverage or preventive
              maintenance, DSPM will provide this service. This service will be charged to the Customer at DSPM's
              standard hourly rates in effect at the time of the service, and will be subject to an available field
              engineer.
            </li>
            <li>
              DSPM will provide all replacement parts for parts that are found defective during emergency service calls.
              If replaced parts are used from any Customer- spare parts kit, DSPM will replace them to the
              Customer-owned spare parts kit with no charges to the Customer.
            </li>
            <li>
              DSPM will include installation of any changes for safety reasons and at DSPM option, install any factory
              enhancements and upgrades, and reliability changes or improvements during the emergency service call.
              Uninterruptible Power Systems (UPS) and Emergency Lighting Inverter batteries are NOT warranted under this
              plan unless specified. DSPM will provide the maintenance and testing for the batteries at DSPM 's the
              hourly rates in effect for DSPM. DSPM, unless specified otherwise in contract, will NOT provide Battery
              replacements but will assist the customer in the replacement of the batteries through the battery
              manufacturer's warranty.
            </li>
          </ul>
          <h4>SW724 - Extended On-Site Warranty 24 hrs/day 7 days/week Except Holidays</h4>
          <ul>
            <li>
              This Extended Warranty Plan is to be purchased while the equipment is still under current warranty
              coverage, or after approval by DSPM and a Certification Inspection by DSPM.
            </li>
            <li>
              This plan covers all replacement pans and labor including travel time and expenses for all emergency calls
              to service the unit. All service calls will be made seven (7) days a week with the exception of the DSPM's
              designated holidays.
            </li>
            <li>
              If the Customer requests remedial maintenance outside of the contracted coverage or preventive
              maintenance, DSPM will provide this service. This service will be charged to the Customer at DSPM's
              standard hourly rates in effect at the time of the service, and will be subject to an available field
              engineer.
            </li>
            <li>
              DSPM will provide all replacement parts for parts that are found defective during emergency service calls.
              If replaced parts are used from any Customer- spare parts kit, DSPM will replace them to the
              Customer-owned spare parts kit with no charges to the Customer.
            </li>
            <li>
              DSPM will include installation of any changes for safety reasons and at DSPM option, install any factory
              enhancements and upgrades, and reliability changes or improvements during the emergency service call.
              Uninterruptible Power Systems (UPS) and Emergency Lighting Inverter batteries are NOT warranted under this
              plan unless specified. DSPM will provide the maintenance and testing for the batteries at DSPM 's the
              hourly rates in effect for DSPM. DSPM, unless specified otherwise in contract, will NOT provide Battery
              replacements but will assist the customer in the replacement of the batteries through the battery
              manufacturer's warranty.
            </li>
          </ul>
          <h4>SW36S - Extended On-Site Warranty 24 hrs/day 7 days/week Including Holidays</h4>
          <ul>
            <li>
              This Extended Warranty Plan is to be purchased while the equipment is still under current warranty
              coverage, or after approval by DSPM and a Certification Inspection by DSPM.
            </li>
            <li>
              This plan covers all replacement pans and labor including travel time and expenses for all emergency calls
              to service the unit. All service calls will be made seven (7) days a week including DSPM's designated
              holidays.
            </li>
            <li>
              This plan covers all replacement pans and labor including travel time and expenses for all emergency calls
              to service the unit. All service calls will be made seven (7) days a week including DSPM's designated
              holidays.
            </li>
            <li>
              DSPM will provide all replacement parts for parts that are found defective during emergency service calls.
              If replaced parts are used from any Customer- spare parts kit, DSPM will replace them to the
              Customer-owned spare parts kit with no charges to the Customer.
            </li>
            <li>
              DSPM will include installation of any changes for safety reasons and at DSPM option, install any factory
              enhancements and upgrades, and reliability changes or improvements during the emergency service call.
              Uninterruptible Power Systems (UPS) and Emergency Lighting Inverter batteries are NOT warranted under this
              plan unless specified. DSPM will provide the maintenance and testing for the batteries at DSPM 's the
              hourly rates in effect for DSPM. DSPM, unless specified otherwise in contract, will NOT provide Battery
              replacements but will assist the customer in the replacement of the batteries through the battery
              manufacturer's warranty.
            </li>
          </ul>
          <h4>SFS8-1 - Full Service Contract 8 a.m. - 5 p.m. Monday- Friday</h4>
          <ul>
            <li>
              This Full Service Plan is to be purchased while the equipment is still under current warranty coverage, or
              after approval by DSPM and a Certification Inspection by DSPM .
            </li>
            <li>
              This Full Service Plan covers all emergency calls to service the unit and one (1) Preventive Maintenance
              call per year. Additional Preventive Maintenance calls may be purchased and added to the plan.
            </li>
            <li>
              This plan covers all replacement parts and labor including travel time and expenses for all emergency
              calls and one (1) Preventive Maintenance call to service the unit. All service calls will be made between
              8:00 a.m. and 5:00 p.m. and are limited to Monday through Friday excluding DSPM's designated holidays.
            </li>
            <li>
              If the Customer requests remedial maintenance or preventive maintenance outside of the contracted
              coverage, DSPM will provide this service. This service will be charged to the Customer at DSPM's standard
              hourly rates in effect at the time of the service, and will be subject to an available field engineer.
            </li>
            <li>
              DSPM will provide all replacement parts for pans that are found defective during emergency service calls.
              If replaced parts are used from any Customer-owned spare parts kit, DSPM will replace them to the
              Customer-owned spare parts kit with no charges to the Customer.
            </li>
            <li>
              DSPM will include installation of any changes for safety reasons and at DSPM option, install any factory
              enhancements and upgrades, and reliability changes or improvements during the emergency service call.
              Uninterruptible Power Systems (UPS) and Emergency Lighting Inverter batteries are NOT warranted under this
              plan unless specified. DSPM will provide the maintenance and testing for the batteries at DSPM 's the
              hourly rates in effect for DSPM. DSPM, unless specified otherwise in contract, will NOT provide Battery
              replacements but will assist the customer in the replacement of the batteries through the battery
              manufacturer's warranty.
            </li>
          </ul>
          <h4>SF724-J - Full Service Contract 24 hrs/day 7 days/week Except Holidays</h4>
          <ul>
            <li>
              This Full Service Plan is to be purchased while the equipment is still under current warranty coverage, or
              after approval by DSPM and a Certification Inspection by DSPM .
            </li>
            <li>
              This Full Service Plan covers all emergency calls to service the unit and one (1) Preventive Maintenance
              call per year. Additional Preventive Maintenance calls may be purchased and added to the plan.
            </li>
            <li>
              This plan covers all replacement parts and labor including travel time and expenses for all emergency
              calls and one (1) Preventive Maintenance call to service the unit. All service calls will be made seven
              (7) days a week excluding DSPM's designated holidays.
            </li>
            <li>
              If the Customer requests remedial maintenance or preventive maintenance outside of the contracted
              coverage, DSPM will provide this service. This service will be charged to the Customer at DSPM's standard
              hourly rates in effect at the time of the service, and will be subject to an available field engineer.
            </li>
            <li>
              DSPM will provide all replacement parts for pans that are found defective during emergency service calls.
              If replaced parts are used from any Customer-owned spare parts kit, DSPM will replace them to the
              Customer-owned spare parts kit with no charges to the Customer.
            </li>
            <li>
              DSPM will include installation of any changes for safety reasons and at DSPM option, install any factory
              enhancements and upgrades, and reliability changes or improvements during the emergency service call.
              Uninterruptible Power Systems (UPS) and Emergency Lighting Inverter batteries are NOT warranted under this
              plan unless specified. DSPM will provide the maintenance and testing for the batteries at DSPM 's the
              hourly rates in effect for DSPM. DSPM, unless specified otherwise in contract, will NOT provide Battery
              replacements but will assist the customer in the replacement of the batteries through the battery
              manufacturer's warranty.
            </li>
          </ul>
          <h4>SF365-1 - Full Service Contract 24 hrs/day 7 days/week Including Holidays</h4>
          <ul>
            <li>
              This Full Service Plan is to be purchased while the equipment is still under current warranty coverage, or
              after approval by DSPM and a Certification Inspection by DSPM .
            </li>
            <li>
              This Full Service Plan covers all emergency calls to service the unit and one (1) Preventive Maintenance
              call per year. Additional Preventive Maintenance calls may be purchased and added to the plan.
            </li>
            <li>
              This plan covers all replacement parts and labor including travel time and expenses for all emergency
              calls and one (1) Preventive Maintenance call to service the unit. All service calls will be made seven
              (7) days a week including DSPM's designated holidays.
            </li>
            <li>
              If the Customer requests remedial maintenance or preventive maintenance outside of the contracted
              coverage, DSPM will provide this service. This service will be charged to the Customer at DSPM's standard
              hourly rates in effect at the time of the service, and will be subject to an available field engineer.
            </li>
            <li>
              DSPM will provide all replacement parts for pans that are found defective during emergency service calls.
              If replaced parts are used from any Customer-owned spare parts kit, DSPM will replace them to the
              Customer-owned spare parts kit with no charges to the Customer.
            </li>
            <li>
              DSPM will include installation of any changes for safety reasons and at DSPM option, install any factory
              enhancements and upgrades, and reliability changes or improvements during the emergency service call.
              Uninterruptible Power Systems (UPS) and Emergency Lighting Inverter batteries are NOT warranted under this
              plan unless specified. DSPM will provide the maintenance and testing for the batteries at DSPM 's the
              hourly rates in effect for DSPM. DSPM, unless specified otherwise in contract, will NOT provide Battery
              replacements but will assist the customer in the replacement of the batteries through the battery
              manufacturer's warranty.
            </li>
          </ul>
          <div style={{ textAlign: "center" }}>
            <h1>Comparison Chart</h1>
            <table className={classes.table}>
              <tr>
                <th className={classes.th}>plan Type</th>
                <th className={classes.th}>Coverage</th>
                <th className={classes.th}>Labor</th>
                <th className={classes.th}>Parts</th>
                <th className={classes.th}>Travel Expanses</th>
                <th className={classes.th}>Emergency Calls</th>
                <th className={classes.th}>Preventive Maintenance</th>
              </tr>
              <tr>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
              </tr>
              <tr>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
              </tr>
              <tr>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
              </tr>
              <tr>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
              </tr>
              <tr>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
              </tr>
              <tr>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
              </tr>
              <tr>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
              </tr>
              <tr>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
                <td className={classes.td}>x</td>
              </tr>
            </table>
          </div>
          <h3>Notes</h3>
          <table>
            <tr>
              <td>
                {" "}
                <span className={classes.span}>x</span>
              </td>
              <td>
                {" "}
                <span>Included with Plan Type</span>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <span className={classes.span}>x1</span>
              </td>
              <td>
                {" "}
                <span>
                  Included If Purchased During Warranty Period or With Unit Under a Service Contract. Coverage for parts
                  must be from other coverage such as an Extended Warranty or Service Contract.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <span className={classes.span}>-n</span>
              </td>
              <td>
                <span>Indicates the number of Preventive Maintenance Calls per year.</span>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <span className={classes.span}>*</span>
              </td>
              <td>
                <span>
                  Must be purchased during an active original factory warranty, during an active Extended Warranty,
                  during an active Service Contract, or After a CI with DSPM Management approval. Multiple Unit discount
                  for more than one unit at a single location only, and startups are all at the same time.
                </span>
              </td>
            </tr>
          </table>
        </div>
        <h3>
          Multiple Unit discount for more than one unit at a single location only, and startups are all at the same
          time.
        </h3>
        <table style={{ width: "400px", margin: "5px auto", textAlign: "center" }}>
          <tr>
            <th>QTY</th>
            <th>Multiplier</th>
          </tr>
          <tr>
            <td>2 to 5</td>
            <td>1.00</td>
          </tr>
          <tr>
            <td>6 to 10</td>
            <td>0.90</td>
          </tr>
          <tr>
            <td>11 to 15 </td>
            <td>0.82</td>
          </tr>
          <tr>
            <td>16 to 20 </td>
            <td>0.75</td>
          </tr>
          <tr>
            <td> 21 to 25 </td>
            <td>0.70</td>
          </tr>
          <tr>
            <td>26 to 30 </td>
            <td>0.65</td>
          </tr>
          <tr>
            <td>31 to 35</td>
            <td>0.60</td>
          </tr>
        </table>
        <div style={{ textAlign: "center" }}>
          <h1>CUSTOMER SERVICE RATES </h1>
        </div>
        <h4>Labor Rates:</h4>
        <h5>Repair Charges (Customer Site Time)</h5>
        <table style={{ width: "700px", margin: "5px auto", textAlign: "left" }}>
          <tr>
            <td>8 to 5 Monday thru Friday excluding holidays</td>
            <td>140.0$</td>
          </tr>
          <tr>
            <td>All other times excluding holidays</td>
            <td>210.0$</td>
          </tr>
          <tr>
            <td>Holidays</td>
            <td>280.0$</td>
          </tr>
        </table>
        <h5>Travel Charges (Round Trip)</h5>
        <table style={{ width: "700px", margin: "5px auto", textAlign: "left" }}>
          <tr>
            <td>All travel time excluding holidays</td>
            <td>140.0$</td>
          </tr>
          <tr>
            <td>Travel time for holidays</td>
            <td>210.0$</td>
          </tr>
        </table>
        <h4>Expenses:</h4>
        <div>
          Travel expenses for all services NOT covered under an EXTENDED WARRANTY PLAN or a SERVICE CONTRACT will be
          billed at actual cost.
        </div>
      </div>
    </div>
  );
}
