(this.webpackJsonpphocus=this.webpackJsonpphocus||[]).push([[27],{1398:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return A}));var c=n(31),a=n.n(c),i=n(65),r=n(15),o=n(2),u=n(0),l=n(157),s=n(238),d=n(531),b=n(420),j=n(159),f=n(414),O=n(183),m=n(604),h=function(e){var t=e.open,n=e.onClose,c=e.data,s=e.onDone,d=Object(u.useState)(null===c||void 0===c?void 0:c.name),b=Object(r.a)(d,2),h=b[0],v=b[1];Object(u.useEffect)((function(){v(null===c||void 0===c?void 0:c.name)}),[c]);var p=function(){var e=Object(i.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!c){e.next=6;break}return e.next=4,Object(m.b)(c.id);case 4:s(),n();case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(i.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!c){e.next=9;break}return e.next=5,Object(m.d)(c.id,{name:h});case 5:s(),n(),e.next=13;break;case 9:return e.next=11,Object(m.a)(h);case 11:s(),n();case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(1),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(t){return e.apply(this,arguments)}}();return Object(o.jsx)(O.a,{open:t,onClose:n,maxWidth:"xs",fullWidth:!0,title:c?"Edit project":"Add new project",children:Object(o.jsx)("form",{onSubmit:x,children:Object(o.jsxs)(l.a,{m:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[Object(o.jsx)(j.c,{label:"name",style:{flex:1,width:"100%",marginBottom:"13px"},fullWidth:!0,value:h,onChange:function(e){return v(e.target.value)}}),Object(o.jsxs)(l.a,{style:{width:"100%",display:"flex"},children:[c&&Object(o.jsx)(f.a,{style:{marginLeft:"40%",marginRight:"30px"},onClick:p,kind:"delete",children:"Delete"}),Object(o.jsx)(f.a,{kind:"add",type:"submit",style:{flexGrow:1,marginRight:"3px"},children:"save"})]})]})})})},v=n(87),p=n(80),x=n(384),y=n(408),g=n(422),w=n(536),C=n(526),k=n(164),S=n(593),F=n(20),I=p.c().shape({name:p.d().required()});function T(e){var t=e.open,n=e.onClose,c=e.activity,r=function(){var e=Object(i.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setSubmitting,console.log(t);case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(o.jsx)(O.a,{open:t,onClose:n,title:"Activity overview",children:Object(o.jsx)(l.a,{p:2,children:Object(o.jsx)(v.b,{initialValues:c,validationSchema:I,onSubmit:r,children:function(e){var t=e.values,n=e.errors,c=e.touched,a=e.handleChange,i=e.handleBlur;return Object(o.jsxs)(v.a,{children:[Object(o.jsxs)(l.a,{display:"grid",gridTemplateColumns:"auto auto auto",gridColumnGap:10,gridRowGap:5,children:[Object(o.jsx)(j.c,{error:Boolean(n.name&&c.name),name:"name",label:"name",value:t.name,onChange:a,onBlur:i}),Object(o.jsx)(j.c,{name:"subject",label:"subject",value:t.subject,onChange:a,onBlur:i}),Object(o.jsx)(j.c,{name:"location",label:"location",value:t.location,onChange:a,onBlur:i}),Object(o.jsx)(j.c,{name:"notes",label:"notes",value:t.notes,onChange:a,onBlur:i}),Object(o.jsx)(j.c,{type:"date",name:"startTime",label:"Start time",value:t.startTime,onChange:a,onBlur:i}),Object(o.jsx)(j.c,{type:"date",name:"endTime",label:"End time",value:t.endTime,onChange:a,onBlur:i}),Object(o.jsx)(g.c,{request:w.d,itemTitleField:"name",itemValueField:"id",label:"Client",name:"ClientId",value:t.ClientId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(g.c,{label:"Contact",name:"ContactId",request:C.d,itemTitleField:"lastName",itemValueField:"id",value:t.ContactId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(g.c,{label:"ActivityPriorityId",name:"ActivityPriorityId",request:function(){return Object(F.c)("/activitypriority")},itemTitleField:"name",itemValueField:"id",value:t.ActivityPriorityId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(g.c,{label:"Project",name:"ProjectId",request:m.c,itemTitleField:"name",itemValueField:"id",value:t.ProjectId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(g.c,{label:"Employee",name:"EmployeeId",request:k.e,itemTitleField:"username",itemValueField:"id",value:t.EmployeeId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(g.c,{label:"Quote",name:"QuoteId",request:S.e,itemTitleField:"number",itemValueField:"id",value:t.QuoteId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(g.c,{label:"ActivityCategoryId",name:"ActivityCategoryId",request:function(){return Object(F.c)("/activitycategory")},itemTitleField:"name",itemValueField:"id",value:t.ActivityCategoryId,onChange:a,onBlur:i,style:{width:"100%"}}),Object(o.jsx)(g.c,{label:"ActivityStatusId",name:"ActivityStatusId",request:function(){return Object(F.c)("/activitystatus")},itemTitleField:"name",itemValueField:"id",value:t.ActivityStatusId,onChange:a,onBlur:i,style:{width:"100%"}})]}),Object(o.jsxs)(l.a,{mt:1,display:"grid",gridTemplateColumns:"auto auto auto",gridColumnGap:10,children:[Object(o.jsx)(x.a,{name:"allDayActivity",control:Object(o.jsx)(y.a,{}),label:"All dat activity",checked:t.allDayActivity,onChange:a,onBlur:i}),Object(o.jsx)(x.a,{name:"notifyOnDay",control:Object(o.jsx)(y.a,{}),label:"Notify on day",checked:t.notifyOnDay,onChange:a,onBlur:i}),Object(o.jsx)(x.a,{name:"recurring",control:Object(o.jsx)(y.a,{}),label:"Recurring",checked:t.recurring,onChange:a,onBlur:i}),Object(o.jsx)(x.a,{name:"notifyNow",control:Object(o.jsx)(y.a,{}),label:"Notify now",checked:t.notifyNow,onChange:a,onBlur:i}),Object(o.jsx)(x.a,{name:"doNotShowOnCalendar",control:Object(o.jsx)(y.a,{}),label:"Do not show on calendar",checked:t.doNotShowOnCalendar,onChange:a,onBlur:i})]})]})}})})})}var B=n(894);function A(){var e=Object(u.useState)(0),t=Object(r.a)(e,2),n=t[0],c=t[1],j=Object(u.useState)(),f=Object(r.a)(j,2),O=f[0],v=f[1],p=Object(u.useState)([]),x=Object(r.a)(p,2),y=x[0],g=x[1],w=Object(u.useState)([]),C=Object(r.a)(w,2),k=C[0],S=C[1],F=Object(u.useState)(),I=Object(r.a)(F,2),A=I[0],q=I[1],V=Object(u.useState)(!1),R=Object(r.a)(V,2),D=R[0],E=R[1],G=Object(u.useState)(!1),N=Object(r.a)(G,2),L=N[0],P=N[1],M=Object(u.useCallback)(Object(i.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(m.c)();case 3:t=e.sent,g(t),v(null),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[g,v]),z=Object(u.useCallback)(Object(i.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!O){e.next=6;break}return e.next=4,Object(B.d)(O.id);case 4:t=e.sent,S(t);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[O,S]);Object(u.useEffect)((function(){M()}),[M]),Object(u.useEffect)((function(){1===n&&z()}),[n,z]);return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(h,{open:D,onClose:function(){return E(!1)},onDone:M,data:O}),A&&Object(o.jsx)(T,{open:L,onClose:function(){return P(!1)},activity:A}),Object(o.jsxs)(l.a,{my:2,display:"flex",alignItems:"center",children:[Object(o.jsx)(s.a,{onClick:function(){E(!0),v(void 0)},children:"Add new Project"}),Object(o.jsx)(s.a,{onClick:function(){return E(!0)},disabled:!O,children:"Edit project"}),Object(o.jsx)("div",{style:{flexGrow:1}}),Object(o.jsxs)(d.b,{value:n,onChange:function(e,t){return c(t)},children:[Object(o.jsx)(d.a,{label:"Overview"}),Object(o.jsx)(d.a,{label:"Details"})]})]}),Object(o.jsxs)(l.a,{children:[0===n&&Object(o.jsx)(b.b,{cols:[{field:"name"}],onRowSelected:function(e){v(e),c(1)},rows:y}),1===n&&Object(o.jsxs)(l.a,{children:[Object(o.jsx)("h4",{children:"Activities"}),Object(o.jsx)(b.b,{cols:[{field:"name"},{field:"subject"},{field:"location"},{field:"startTime",width:180},{field:"endTime",width:180},{field:"ActivityPriority",valueGetter:function(e){var t;return null===(t=e.row.ActivityPriority)||void 0===t?void 0:t.name},width:180},{field:"ActivityStatus",valueGetter:function(e){var t;return null===(t=e.row.ActivityStatus)||void 0===t?void 0:t.name},width:180},{field:"notes"}],rows:k,onRowSelected:function(e){q(e),P(!0)}})]})]})]})}},414:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var c=n(18),a=n(3),i=n(2),r=(n(0),n(354)),o=n(238),u=n(1376),l=n(616),s=n(617),d=n(81);function b(e){var t=e.kind,n=Object(a.a)(e,["kind"]),b=Object(r.a)({btnStyle:{background:t?"add"===t?d.a.success:"edit"===t?d.a.warning:d.a.error:"default"}}),j={add:Object(i.jsx)(u.a,{}),edit:Object(i.jsx)(l.a,{}),delete:Object(i.jsx)(s.a,{})},f=b();return Object(i.jsx)(o.a,Object(c.a)(Object(c.a)({className:f.btnStyle,startIcon:t?j[t]:n.startIcon,variant:t?"contained":n.variant,color:t?"primary":n.color},n),{},{children:n.children}))}},420:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return u}));var c=n(2),a=(n(0),n(354)),i=n(456),r=Object(a.a)({root:{backgroundColor:"#f9f9f9",border:"none","& .MuiDataGrid-columnsContainer":{backgroundColor:"#202731",color:"#fff"},"& .MuiDataGrid-iconSeparator":{display:"none",width:0,height:0,opacity:0},"& .Mui-selected":{boxShadow:" rgba(149, 157, 165, 0.2) 0px 8px 24px",backgroundColor:"#fff !important"},"& .MuiDataGrid-sortIcon":{fill:"white"}}});function o(e){var t=e.onRowSelected,n=e.rows,a=e.cols,o=e.height,u=r();return Object(c.jsx)("div",{style:{flexGrow:1,height:o||450},children:Object(c.jsx)(i.a,{density:"compact",components:{Toolbar:i.b},className:u.root,onRowSelected:function(e){t&&t(e.data)},columns:a,rows:n})})}var u=function(e){var t=e.onRowSelected,n=e.rows,a=e.cols,o=(e.height,r());return Object(c.jsx)(i.a,{density:"compact",components:{Toolbar:i.b},className:o.root,onRowSelected:function(e){t&&t(e.data)},columns:a,rows:n})}},422:function(e,t,n){"use strict";n.d(t,"d",(function(){return d})),n.d(t,"c",(function(){return j})),n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return O}));var c=n(18),a=n(15),i=n(3),r=n(2),o=n(0),u=n(241),l=n(1369),s=n(1397),d=function(e){var t=e.request,n=e.limit,l=e.getOptionLabel,d=e.getOptionValue,b=e.onChange,j=e.value,f=Object(i.a)(e,["request","limit","getOptionLabel","getOptionValue","onChange","value"]),O=Object(o.useState)([]),m=Object(a.a)(O,2),h=m[0],v=m[1],p=Object(o.useState)(),x=Object(a.a)(p,2),y=x[0],g=x[1];return Object(o.useEffect)((function(){var e=h.find((function(e){return d(e)===j}));g(e)}),[j,h,d]),Object(o.useEffect)((function(){t().then((function(e){v(n&&n>0?e.slice(0,n):e)})).catch((function(e){return console.log(e)}))}),[n,t]),Object(r.jsx)(s.a,{style:f.style,getOptionLabel:l,options:h,onChange:b,onBlur:f.onBlur,value:y,renderInput:function(e){return Object(r.jsx)(u.a,Object(c.a)(Object(c.a)({},e),{},{label:null===f||void 0===f?void 0:f.label,error:f.error,placeholder:f.placeholder,size:"small",variant:"outlined"}))}})},b=function(e){e.inputStyle;var t=e.items,n=e.itemTitleField,a=e.itemValueField,o=e.keyField,s=Object(i.a)(e,["inputStyle","items","itemTitleField","itemValueField","keyField"]);return Object(r.jsxs)(u.a,Object(c.a)(Object(c.a)({},s),{},{variant:"outlined",size:"small",select:!0,children:[Object(r.jsx)(l.a,{value:void 0,children:"None"}),t&&t.length>=0&&t.map((function(e,t){return Object(r.jsx)(l.a,{value:e[a],children:e[n]},o?e[o]:t)}))]}))},j=function(e){e.keyField;var t=e.request,n=e.itemValueField,u=e.itemTitleField,l=e.limit,s=e.getOptionList,d=Object(i.a)(e,["keyField","request","itemValueField","itemTitleField","limit","getOptionList"]),j=Object(o.useState)([]),f=Object(a.a)(j,2),O=f[0],m=f[1];return Object(o.useEffect)((function(){t().then((function(e){if(l&&l>0){var t=s?s(e):e.slice(0,l);m(t)}else{var n=s?s(e):e;m(n)}})).catch((function(e){return console.log(e)}))}),[s,l,t]),Object(r.jsx)(b,Object(c.a)(Object(c.a)({},d),{},{itemTitleField:u,itemValueField:n,items:O}))},f=function(e){var t=e.items,n=Object(i.a)(e,["items"]);return Object(r.jsx)(b,Object(c.a)({itemTitleField:"item",itemValueField:"item",items:t?t.map((function(e){return{item:e}})):[]},n))},O=function(e){return Object(r.jsx)(u.a,Object(c.a)(Object(c.a)({},e),{},{variant:"outlined",size:"small",select:!0,children:e.children}))}},526:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r})),n.d(t,"e",(function(){return o})),n.d(t,"b",(function(){return u}));var c=n(20),a=function(){return Object(c.d)("/contact")},i=function(e,t){return Object(c.d)("/contact/".concat(e,"/").concat(t))},r=function(e,t,n){return Object(c.g)("/contact/".concat(e,"/").concat(t),n)},o=function(e,t){return Object(c.f)("/contact/".concat(e),t)},u=function(e){return Object(c.b)("/contact/".concat(e))}},531:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return s}));var c=n(18),a=n(2),i=(n(0),n(7)),r=n(1394),o=n(248),u=n(1377),l=Object(i.a)({root:{minHeight:"45px",border:"1px solid #848484",borderRadius:"0.5em"},indicator:{backgroundColor:"#ccc",height:0}})(r.a),s=Object(i.a)((function(e){return Object(o.a)({root:{textTransform:"none",minWidth:"2em",minHeight:"45px","&:hover":{color:"#aaa",opacity:1},"&$selected":{backgroundColor:"#1a73e8",borderRadius:"0.5em",color:"#fff"},"&:active":{borderRadius:"0.5em",color:"#aaa"},"&:focus":{borderRadius:"0.5em",color:"#fff"}},selected:{}})}))((function(e){return Object(a.jsx)(u.a,Object(c.a)({disableRipple:!0},e))}))},536:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o}));var c=n(20),a=function(){return Object(c.d)("/customer")},i=function(e){return Object(c.g)("/customer",e)},r=function(e){return Object(c.b)("/customer/".concat(e))},o=function(e,t){return Object(c.f)("/customer/".concat(e),t)}},593:function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"f",(function(){return u})),n.d(t,"c",(function(){return l}));var c=n(20),a=function(){return Object(c.d)("/quote")},i=function(e){return Object(c.d)("/quote/".concat(e))},r=function(e){return Object(c.g)("/quote",e)},o=function(e){return Object(c.g)("/quote",e)},u=function(e,t){return Object(c.f)("/quote/".concat(e),t)},l=function(e){return Object(c.b)("/quote/".concat(e))}},604:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"d",(function(){return r})),n.d(t,"b",(function(){return o}));var c=n(20),a=function(){return Object(c.d)("/project")},i=function(e){return Object(c.g)("/project",{name:e})},r=function(e,t){return Object(c.f)("/project/".concat(e),t)},o=function(e){return Object(c.b)("/project/".concat(e))}},616:function(e,t,n){"use strict";var c=n(0),a=n.n(c),i=n(21);t.a=Object(i.a)(a.a.createElement("path",{d:"M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"EditRounded")},617:function(e,t,n){"use strict";var c=n(0),a=n.n(c),i=n(21);t.a=Object(i.a)(a.a.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"}),"DeleteRounded")},894:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return r})),n.d(t,"e",(function(){return o})),n.d(t,"b",(function(){return u}));var c=n(20),a=function(){return Object(c.d)("/activity")},i=function(e){return Object(c.d)("/activity/project/".concat(e))},r=function(e){return Object(c.g)("/activity",e)},o=function(e,t){return Object(c.f)("/activity/".concat(e),t)},u=function(e){return Object(c.b)("/activity/".concat(e))}}}]);
//# sourceMappingURL=27.33bcad08.chunk.js.map