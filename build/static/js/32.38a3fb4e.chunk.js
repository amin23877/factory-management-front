(this.webpackJsonpphocus=this.webpackJsonpphocus||[]).push([[32],{1344:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return b}));var o=n(15),r=n(2),a=n(0),i=n(156),c=n(1392),u=n(1375),d=n(181),l=n(420),s=n(422),f=n(423);function b(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),n=t[0],b=t[1],j=Object(a.useState)(),m=Object(o.a)(j,2),v=m[0],p=m[1],h=Object(d.b)("/unit?fru=true").data,w=[{field:"number",headerName:"FRU Number",width:150,valueFormatter:function(e){var t,n;return null===(t=e.row)||void 0===t||null===(n=t.ItemId)||void 0===n?void 0:n.no}},{field:"name",headerName:"FRU Name",width:200,valueFormatter:function(e){var t,n;return null===(t=e.row)||void 0===t||null===(n=t.ItemId)||void 0===n?void 0:n.name}},{field:"description",headerName:"FRU Description",flex:1,valueFormatter:function(e){var t,n;return null===(t=e.row)||void 0===t||null===(n=t.ItemId)||void 0===n?void 0:n.description}},{field:"Lead Time",valueFormatter:function(e){var t,n;return Object(f.a)(null===(t=e.row)||void 0===t||null===(n=t.ItemId)||void 0===n?void 0:n.lead)},width:120},{field:"price",headerName:"Price",width:110,valueFormatter:function(e){var t,n;return null===(t=e.row)||void 0===t||null===(n=t.LineItemRecordId)||void 0===n?void 0:n.price}}];return Object(r.jsx)(i.a,{children:Object(r.jsxs)(s.a,{children:[Object(r.jsxs)(c.a,{value:n,textColor:"primary",onChange:function(e,t){return b(t)},style:{marginBottom:10},children:[Object(r.jsx)(u.a,{label:"List"}),Object(r.jsx)(u.a,{label:"Details",disabled:!v})]}),0===n&&h&&Object(r.jsx)(l.b,{rows:h.result||[],cols:w,onRowSelected:function(e){p(e),b(1)}})]})})}},420:function(e,t,n){"use strict";n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return u}));var o=n(2),r=(n(0),n(353)),a=n(455),i=Object(r.a)({root:{backgroundColor:"#f9f9f9",border:"none","& .MuiDataGrid-columnsContainer":{backgroundColor:"#202731",color:"#fff"},"& .MuiDataGrid-iconSeparator":{display:"none",width:0,height:0,opacity:0},"& .Mui-selected":{boxShadow:" rgba(149, 157, 165, 0.2) 0px 8px 24px",backgroundColor:"#fff !important"},"& .MuiDataGrid-sortIcon":{fill:"white"}}});function c(e){var t=e.onRowSelected,n=e.rows,r=e.cols,c=e.height,u=i();return Object(o.jsx)("div",{style:{flexGrow:1,height:c||450},children:Object(o.jsx)(a.a,{density:"compact",components:{Toolbar:a.b},className:u.root,onRowSelected:function(e){t&&t(e.data)},columns:r,rows:n})})}var u=function(e){var t=e.onRowSelected,n=e.rows,r=e.cols,c=(e.height,i());return Object(o.jsx)(a.a,{density:"compact",components:{Toolbar:a.b},className:c.root,onRowSelected:function(e){t&&t(e.data)},columns:r,rows:n})}},422:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return u}));var o=n(18),r=n(2),a=(n(0),n(7)),i=n(179),c=Object(a.a)((function(e){return{root:{borderRadius:20,padding:"1em",boxShadow:"rgba(0, 0, 0, 0.08) 0px 4px 12px"}}}))((function(e){return Object(r.jsx)(i.a,Object(o.a)({},e))})),u=Object(a.a)((function(e){return{root:{borderRadius:10,padding:e.spacing(4),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",color:"#fff"}}}))((function(e){return Object(r.jsx)(i.a,Object(o.a)(Object(o.a)({},e),{},{elevation:5}))}))},423:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n(232),r=function(e){return e?Object(o.a)(e,"MM/dd/yyyy"):""}}}]);
//# sourceMappingURL=32.38a3fb4e.chunk.js.map