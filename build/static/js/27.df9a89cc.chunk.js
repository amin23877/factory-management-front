(this.webpackJsonpphocus=this.webpackJsonpphocus||[]).push([[27],{1398:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return q}));var c=n(31),a=n.n(c),i=n(65),r=n(15),o=n(2),u=n(0),l=n(979),s=n(157),d=n(238),b=n(531),j=n(420),f=n(159),O=n(414),m=n(183),h=n(604),v=function(e){var t=e.open,n=e.onClose,c=e.data,l=e.onDone,d=Object(u.useState)(null===c||void 0===c?void 0:c.name),b=Object(r.a)(d,2),j=b[0],v=b[1];Object(u.useEffect)((function(){v(null===c||void 0===c?void 0:c.name)}),[c]);var p=function(){var e=Object(i.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!c){e.next=6;break}return e.next=4,Object(h.b)(c.id);case 4:l(),n();case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(i.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!c){e.next=9;break}return e.next=5,Object(h.d)(c.id,{name:j});case 5:l(),n(),e.next=13;break;case 9:return e.next=11,Object(h.a)(j);case 11:l(),n();case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(1),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(t){return e.apply(this,arguments)}}();return Object(o.jsx)(m.a,{open:t,onClose:n,maxWidth:"xs",fullWidth:!0,title:c?"Edit project":"Add new project",children:Object(o.jsx)("form",{onSubmit:x,children:Object(o.jsxs)(s.a,{m:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[Object(o.jsx)(f.c,{label:"name",style:{flex:1,width:"100%",marginBottom:"13px"},fullWidth:!0,value:j,onChange:function(e){return v(e.target.value)}}),Object(o.jsxs)(s.a,{style:{width:"100%",display:"flex"},children:[c&&Object(o.jsx)(O.a,{style:{marginLeft:"40%",marginRight:"30px"},onClick:p,kind:"delete",children:"Delete"}),Object(o.jsx)(O.a,{kind:"add",type:"submit",style:{flexGrow:1,marginRight:"3px"},children:"save"})]})]})})})},p=n(87),x=n(80),y=n(384),g=n(408),w=n(422),C=n(536),k=n(526),S=n(164),F=n(593),I=n(20),T=x.c().shape({name:x.d().required()});function B(e){var t=e.open,n=e.onClose,c=e.activity,r=function(){var e=Object(i.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setSubmitting,console.log(t);case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(o.jsx)(m.a,{open:t,onClose:n,title:"Activity overview",children:Object(o.jsx)(s.a,{p:2,children:Object(o.jsx)(p.b,{initialValues:c,validationSchema:T,onSubmit:r,children:function(e){var t=e.values,n=e.errors,c=e.touched,a=e.handleChange,i=e.handleBlur;return Object(o.jsxs)(p.a,{children:[Object(o.jsxs)(s.a,{display:"grid",gridTemplateColumns:"auto auto auto",gridColumnGap:10,gridRowGap:5,children:[Object(o.jsx)(f.c,{error:Boolean(n.name&&c.name),name:"name",label:"name",value:t.name,onChange:a,onBlur:i}),Object(o.jsx)(f.c,{name:"subject",label:"subject",value:t.subject,onChange:a,onBlur:i}),Object(o.jsx)(f.c,{name:"location",label:"location",value:t.location,onChange:a,onBlur:i}),Object(o.jsx)(f.c,{name:"notes",label:"notes",value:t.notes,onChange:a,onBlur:i}),Object(o.jsx)(f.c,{type:"date",name:"startTime",label:"Start time",value:t.startTime,onChange:a,onBlur:i}),Object(o.jsx)(f.c,{type:"date",name:"endTime",label:"End time",value:t.endTime,onChange:a,onBlur:i}),Object(o.jsx)(w.c,{request:C.d,itemTitleField:"name",itemValueField:"id",label:"Client",name:"ClientId",value:t.ClientId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(w.c,{label:"Contact",name:"ContactId",request:k.d,itemTitleField:"lastName",itemValueField:"id",value:t.ContactId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(w.c,{label:"ActivityPriorityId",name:"ActivityPriorityId",request:function(){return Object(I.c)("/activitypriority")},itemTitleField:"name",itemValueField:"id",value:t.ActivityPriorityId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(w.c,{label:"Project",name:"ProjectId",request:h.c,itemTitleField:"name",itemValueField:"id",value:t.ProjectId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(w.c,{label:"Employee",name:"EmployeeId",request:S.e,itemTitleField:"username",itemValueField:"id",value:t.EmployeeId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(w.c,{label:"Quote",name:"QuoteId",request:F.e,itemTitleField:"number",itemValueField:"id",value:t.QuoteId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(w.c,{label:"ActivityCategoryId",name:"ActivityCategoryId",request:function(){return Object(I.c)("/activitycategory")},itemTitleField:"name",itemValueField:"id",value:t.ActivityCategoryId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(w.c,{label:"ActivityStatusId",name:"ActivityStatusId",request:function(){return Object(I.c)("/activitystatus")},itemTitleField:"name",itemValueField:"id",value:t.ActivityStatusId,onChange:a,onBlur:i,style:{width:"100%"}})]}),Object(o.jsxs)(s.a,{mt:1,display:"grid",gridTemplateColumns:"auto auto auto",gridColumnGap:10,children:[Object(o.jsx)(y.a,{name:"allDayActivity",control:Object(o.jsx)(g.a,{}),label:"All dat activity",checked:t.allDayActivity,onChange:a,onBlur:i}),Object(o.jsx)(y.a,{name:"notifyOnDay",control:Object(o.jsx)(g.a,{}),label:"Notify on day",checked:t.notifyOnDay,onChange:a,onBlur:i}),Object(o.jsx)(y.a,{name:"recurring",control:Object(o.jsx)(g.a,{}),label:"Recurring",checked:t.recurring,onChange:a,onBlur:i}),Object(o.jsx)(y.a,{name:"notifyNow",control:Object(o.jsx)(g.a,{}),label:"Notify now",checked:t.notifyNow,onChange:a,onBlur:i}),Object(o.jsx)(y.a,{name:"doNotShowOnCalendar",control:Object(o.jsx)(g.a,{}),label:"Do not show on calendar",checked:t.doNotShowOnCalendar,onChange:a,onBlur:i})]})]})}})})})}var A=n(894);function q(){var e=Object(u.useState)(0),t=Object(r.a)(e,2),n=t[0],c=t[1],f=Object(u.useState)(),O=Object(r.a)(f,2),m=O[0],p=O[1],x=Object(u.useState)([]),y=Object(r.a)(x,2),g=y[0],w=y[1],C=Object(u.useState)([]),k=Object(r.a)(C,2),S=k[0],F=k[1],I=Object(u.useState)(),T=Object(r.a)(I,2),q=T[0],V=T[1],R=Object(u.useState)(!1),D=Object(r.a)(R,2),E=D[0],G=D[1],N=Object(u.useState)(!1),L=Object(r.a)(N,2),P=L[0],M=L[1],z=Object(u.useCallback)(Object(i.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(h.c)();case 3:t=e.sent,w(t),p(null),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[w,p]),H=Object(u.useCallback)(Object(i.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!m){e.next=6;break}return e.next=4,Object(A.d)(m.id);case 4:t=e.sent,F(t);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[m,F]);Object(u.useEffect)((function(){z()}),[z]),Object(u.useEffect)((function(){1===n&&H()}),[n,H]);return Object(o.jsxs)(l.a,{children:[Object(o.jsx)(v,{open:E,onClose:function(){return G(!1)},onDone:z,data:m}),q&&Object(o.jsx)(B,{open:P,onClose:function(){return M(!1)},activity:q}),Object(o.jsxs)(s.a,{my:2,display:"flex",alignItems:"center",children:[Object(o.jsx)(d.a,{onClick:function(){G(!0),p(void 0)},children:"Add new Project"}),Object(o.jsx)(d.a,{onClick:function(){return G(!0)},disabled:!m,children:"Edit project"}),Object(o.jsx)("div",{style:{flexGrow:1}}),Object(o.jsxs)(b.b,{value:n,onChange:function(e,t){return c(t)},children:[Object(o.jsx)(b.a,{label:"Overview"}),Object(o.jsx)(b.a,{label:"Details"})]})]}),Object(o.jsxs)(s.a,{children:[0===n&&Object(o.jsx)(j.b,{cols:[{field:"name"}],onRowSelected:function(e){p(e),c(1)},rows:g}),1===n&&Object(o.jsxs)(s.a,{children:[Object(o.jsx)("h4",{children:"Activities"}),Object(o.jsx)(j.b,{cols:[{field:"name"},{field:"subject"},{field:"location"},{field:"startTime",width:180},{field:"endTime",width:180},{field:"ActivityPriority",valueGetter:function(e){var t;return null===(t=e.row.ActivityPriority)||void 0===t?void 0:t.name},width:180},{field:"ActivityStatus",valueGetter:function(e){var t;return null===(t=e.row.ActivityStatus)||void 0===t?void 0:t.name},width:180},{field:"notes"}],rows:S,onRowSelected:function(e){V(e),M(!0)}})]})]})]})}},414:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var c=n(18),a=n(3),i=n(2),r=(n(0),n(354)),o=n(238),u=n(1376),l=n(616),s=n(617),d=n(81);function b(e){var t=e.kind,n=Object(a.a)(e,["kind"]),b=Object(r.a)({btnStyle:{background:t?"add"===t?d.a.success:"edit"===t?d.a.warning:d.a.error:"default"}}),j={add:Object(i.jsx)(u.a,{}),edit:Object(i.jsx)(l.a,{}),delete:Object(i.jsx)(s.a,{})},f=b();return Object(i.jsx)(o.a,Object(c.a)(Object(c.a)({className:f.btnStyle,startIcon:t?j[t]:n.startIcon,variant:t?"contained":n.variant,color:t?"primary":n.color},n),{},{children:n.children}))}},420:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return u}));var c=n(2),a=(n(0),n(354)),i=n(456),r=Object(a.a)({root:{backgroundColor:"#f9f9f9",border:"none","& .MuiDataGrid-columnsContainer":{backgroundColor:"#202731",color:"#fff"},"& .MuiDataGrid-iconSeparator":{display:"none",width:0,height:0,opacity:0},"& .Mui-selected":{boxShadow:" rgba(149, 157, 165, 0.2) 0px 8px 24px",backgroundColor:"#fff !important"},"& .MuiDataGrid-sortIcon":{fill:"white"}}});function o(e){var t=e.onRowSelected,n=e.rows,a=e.cols,o=e.height,u=r();return Object(c.jsx)("div",{style:{flexGrow:1,height:o||450},children:Object(c.jsx)(i.a,{density:"compact",components:{Toolbar:i.b},className:u.root,onRowSelected:function(e){t&&t(e.data)},columns:a,rows:n})})}var u=function(e){var t=e.onRowSelected,n=e.rows,a=e.cols,o=(e.height,r());return Object(c.jsx)(i.a,{density:"compact",components:{Toolbar:i.b},className:o.root,onRowSelected:function(e){t&&t(e.data)},columns:a,rows:n})}},422:function(e,t,n){"use strict";n.d(t,"d",(function(){return d})),n.d(t,"c",(function(){return j})),n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return O}));var c=n(18),a=n(15),i=n(3),r=n(2),o=n(0),u=n(241),l=n(1369),s=n(1397),d=function(e){var t=e.request,n=e.limit,l=e.getOptionLabel,d=e.getOptionValue,b=e.onChange,j=e.value,f=Object(i.a)(e,["request","limit","getOptionLabel","getOptionValue","onChange","value"]),O=Object(o.useState)([]),m=Object(a.a)(O,2),h=m[0],v=m[1],p=Object(o.useState)(),x=Object(a.a)(p,2),y=x[0],g=x[1];return Object(o.useEffect)((function(){var e=h.find((function(e){return d(e)===j}));g(e)}),[j,h,d]),Object(o.useEffect)((function(){t().then((function(e){v(n&&n>0?e.slice(0,n):e)})).catch((function(e){return console.log(e)}))}),[n,t]),Object(r.jsx)(s.a,{style:f.style,getOptionLabel:l,options:h,onChange:b,onBlur:f.onBlur,value:y,renderInput:function(e){return Object(r.jsx)(u.a,Object(c.a)(Object(c.a)({},e),{},{label:null===f||void 0===f?void 0:f.label,error:f.error,placeholder:f.placeholder,size:"small",variant:"outlined"}))}})},b=function(e){e.inputStyle;var t=e.items,n=e.itemTitleField,a=e.itemValueField,o=e.keyField,s=Object(i.a)(e,["inputStyle","items","itemTitleField","itemValueField","keyField"]);return Object(r.jsxs)(u.a,Object(c.a)(Object(c.a)({},s),{},{variant:"outlined",size:"small",select:!0,children:[Object(r.jsx)(l.a,{value:void 0,children:"None"}),t&&t.length>=0&&t.map((function(e,t){return Object(r.jsx)(l.a,{value:e[a],children:e[n]},o?e[o]:t)}))]}))},j=function(e){e.keyField;var t=e.request,n=e.itemValueField,u=e.itemTitleField,l=e.limit,s=e.getOptionList,d=Object(i.a)(e,["keyField","request","itemValueField","itemTitleField","limit","getOptionList"]),j=Object(o.useState)([]),f=Object(a.a)(j,2),O=f[0],m=f[1];return Object(o.useEffect)((function(){t().then((function(e){if(l&&l>0){var t=s?s(e):e.slice(0,l);m(t)}else{var n=s?s(e):e;m(n)}})).catch((function(e){return console.log(e)}))}),[s,l,t]),Object(r.jsx)(b,Object(c.a)(Object(c.a)({},d),{},{itemTitleField:u,itemValueField:n,items:O}))},f=function(e){var t=e.items,n=Object(i.a)(e,["items"]);return Object(r.jsx)(b,Object(c.a)({itemTitleField:"item",itemValueField:"item",items:t?t.map((function(e){return{item:e}})):[]},n))},O=function(e){return Object(r.jsx)(u.a,Object(c.a)(Object(c.a)({},e),{},{variant:"outlined",size:"small",select:!0,children:e.children}))}},526:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r})),n.d(t,"e",(function(){return o})),n.d(t,"b",(function(){return u}));var c=n(20),a=function(){return Object(c.d)("/contact")},i=function(e,t){return Object(c.d)("/contact/".concat(e,"/").concat(t))},r=function(e,t,n){return Object(c.g)("/contact/".concat(e,"/").concat(t),n)},o=function(e,t){return Object(c.f)("/contact/".concat(e),t)},u=function(e){return Object(c.b)("/contact/".concat(e))}},531:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return s}));var c=n(18),a=n(2),i=(n(0),n(7)),r=n(1394),o=n(248),u=n(1377),l=Object(i.a)({root:{minHeight:"45px",border:"1px solid #848484",borderRadius:"0.5em"},indicator:{backgroundColor:"#ccc",height:0}})(r.a),s=Object(i.a)((function(e){return Object(o.a)({root:{textTransform:"none",minWidth:"2em",minHeight:"45px","&:hover":{color:"#aaa",opacity:1},"&$selected":{backgroundColor:"#1a73e8",borderRadius:"0.5em",color:"#fff"},"&:active":{borderRadius:"0.5em",color:"#aaa"},"&:focus":{borderRadius:"0.5em",color:"#fff"}},selected:{}})}))((function(e){return Object(a.jsx)(u.a,Object(c.a)({disableRipple:!0},e))}))},536:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o}));var c=n(20),a=function(){return Object(c.d)("/customer")},i=function(e){return Object(c.g)("/customer",e)},r=function(e){return Object(c.b)("/customer/".concat(e))},o=function(e,t){return Object(c.f)("/customer/".concat(e),t)}},593:function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"f",(function(){return u})),n.d(t,"c",(function(){return l}));var c=n(20),a=function(){return Object(c.d)("/quote")},i=function(e){return Object(c.d)("/quote/".concat(e))},r=function(e){return Object(c.g)("/quote",e)},o=function(e){return Object(c.g)("/quote",e)},u=function(e,t){return Object(c.f)("/quote/".concat(e),t)},l=function(e){return Object(c.b)("/quote/".concat(e))}},604:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"d",(function(){return r})),n.d(t,"b",(function(){return o}));var c=n(20),a=function(){return Object(c.d)("/project")},i=function(e){return Object(c.g)("/project",{name:e})},r=function(e,t){return Object(c.f)("/project/".concat(e),t)},o=function(e){return Object(c.b)("/project/".concat(e))}},616:function(e,t,n){"use strict";var c=n(0),a=n.n(c),i=n(21);t.a=Object(i.a)(a.a.createElement("path",{d:"M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"EditRounded")},617:function(e,t,n){"use strict";var c=n(0),a=n.n(c),i=n(21);t.a=Object(i.a)(a.a.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"}),"DeleteRounded")},894:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return r})),n.d(t,"e",(function(){return o})),n.d(t,"b",(function(){return u}));var c=n(20),a=function(){return Object(c.d)("/activity")},i=function(e){return Object(c.d)("/activity/project/".concat(e))},r=function(e){return Object(c.g)("/activity",e)},o=function(e,t){return Object(c.f)("/activity/".concat(e),t)},u=function(e){return Object(c.b)("/activity/".concat(e))}}}]);
//# sourceMappingURL=27.df9a89cc.chunk.js.map