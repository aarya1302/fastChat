(this["webpackJsonpchat-app"]=this["webpackJsonpchat-app"]||[]).push([[0],{128:function(e,t){},153:function(e,t,s){},154:function(e,t,s){},156:function(e,t,s){"use strict";s.r(t);var c=s(0),n=s.n(c),a=s(13),r=s.n(a),i=(s(78),s(70)),l=s.n(i),o=s(160),d=s(159),j=s(161),b=s(1);function m(e){let{children:t}=e;return Object(c.useEffect)((()=>{document.title="Fast Chat"})),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(o.a,{bg:"light",expand:"lg",children:Object(b.jsxs)(d.a,{children:[Object(b.jsx)(o.a.Brand,{href:"#home",className:"text-primary",children:"Fast Chat"}),Object(b.jsx)(o.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(b.jsx)(o.a.Collapse,{id:"basic-navbar-nav",children:Object(b.jsx)(j.a,{className:"me-auto",children:Object(b.jsx)(j.a.Link,{children:Object(b.jsx)("button",{className:"btn text-dark",onClick:async()=>{"redirect"===(await l.a.get("/signout")).data.message&&(window.location="/login")},children:"logout"})})})})]})}),window.innerWidth<900?Object(b.jsx)("main",{children:t}):Object(b.jsx)("div",{className:"container-fluid mt-2",children:Object(b.jsx)("main",{children:t})})]})}function h(e,t,s){e.on("receive message",(e=>{t[e.from]?t[e.from].push(e.message):t[e.from]=[e.message],s(JSON.stringify(t))})),e.on("message threads",(e=>{s(JSON.stringify(e))}))}var u=s.p+"static/media/send.7d8ecc6d.svg",x=s.p+"static/media/chevron-left.c80cdd8e.svg";s.p;function g(e){let{messageThreadObj:t,currentExchangeTo:s,socket:n,setMessageThread:a,width:r,setCurrentExchangeTo:i}=e;Object(c.useEffect)((()=>{var e=document.getElementById("messages-thread-box");e.scrollTop=e.scrollHeight}));var l=Object.keys(t);if(s)if(-1!==l.indexOf(s))var o=l.map((e=>{if(e===s){var c=t[e].map((e=>e.self?Object(b.jsx)("div",{className:"mb-2 ",style:{display:"flex",justifyContent:"flex-end"},children:Object(b.jsx)("li",{className:"message-box own-text-bubble",children:e.text})}):Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsx)("li",{className:"message-box recepient-text-bubble",children:e.text})})));return Object(b.jsx)("div",{children:c})}}));else t[s]=[],a(JSON.stringify(t));return Object(b.jsx)("div",{className:"col-lg-9",style:{padding:0},children:Object(b.jsxs)("div",{className:"h-100 contain-messages",children:[Object(b.jsx)("div",{className:"p-1 exchangeUsername",children:Object(b.jsxs)("div",{style:{display:"flex",justifyContent:"center"},children:[r<950&&Object(b.jsx)("div",{style:{paddingRight:10},onClick:()=>{i(void 0)},children:Object(b.jsx)("img",{src:x})}),Object(b.jsx)("h4",{style:{paddingLeft:10},className:"text-muted text-center ",children:s})]})}),Object(b.jsxs)("div",{className:"messages-thread-container",id:"messages-thread-box",children:[0===l.length&&Object(b.jsxs)("div",{style:{position:"absolute",top:"45%",left:"47%"},children:[Object(b.jsx)("h4",{children:"Enter Username and Text Someone!"}),Object(b.jsx)("div",{style:{position:"relative",left:120},children:Object(b.jsx)("button",{className:"btn btn-primary",onClick:()=>{document.getElementById("username-search-box").select()},children:"New Message"})})]}),Object(b.jsx)("ul",{className:"",children:o})]}),Object(b.jsxs)("form",{className:"row message-form",children:[Object(b.jsx)("input",{type:"text",className:"col ml-1 input-style",id:"chat_box",placeholder:"message"}),Object(b.jsx)("div",{className:"col-2 ",children:Object(b.jsx)("button",{type:"submit",onClick:e=>{e.preventDefault();document.getElementById("messages-thread-box");var c=document.getElementById("chat_box").value;if(c&&s){n.emit("chat message",c,s);var r={text:c,self:!0};t[s]?t[s].push(r):(t[s]=[r],console.log(t)),a(JSON.stringify(t)),document.getElementById("chat_box").value=""}},className:"btn btn-light round-button col w-100",children:Object(b.jsx)("img",{src:u})})})]})]})})}var O=s.p+"static/media/arrow-return-left.abaa8f9a.svg";function v(e){let{setCurrentExchangeTo:t,messageThreadsObj:s,currentExchangeTo:c,width:n}=e;var a=Object.keys(s);!c&&n>900&&t(a[0]);var r=a.map((e=>{var s=e===c?" active ":"";return Object(b.jsx)("li",{id:e,className:"list-group-item"+s,onClick:s=>{c&&document.getElementById(c).classList.remove("active"),s.currentTarget.classList.add("active"),t(e)},children:Object(b.jsx)("div",{className:"",children:e})})}));return Object(b.jsxs)("div",{className:"task-bar col-lg-3",children:[Object(b.jsxs)("form",{className:"row container-fluid w-100",style:{justifyContent:"center"},children:[Object(b.jsx)("input",{type:"text",className:" mb-4 input-style username-search-input col-8",id:"username-search-box",placeholder:"username"}),Object(b.jsx)("button",{type:"submit",class:"col-3 btn btn-light enter-button",onClick:e=>{e.preventDefault();var s=document.getElementById("username-search-box").value;document.getElementById("chat_box")&&document.getElementById("chat_box").select(),t(s)},children:Object(b.jsx)("img",{src:O})})]}),0===a.length&&n<987&&Object(b.jsxs)("div",{className:"text-center",children:[Object(b.jsx)("h4",{children:"Enter Username and Text Someone!"}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{className:"btn btn-primary",onClick:()=>{document.getElementById("username-search-box").select()},children:"New Message"})})]}),Object(b.jsx)("ul",{class:"list-group",children:r})]})}function f(e){let{socket:t}=e;const[s,n]=Object(c.useState)(JSON.stringify({})),[a,r]=Object(c.useState)(void 0),[i,l]=Object(c.useState)(window.innerWidth);!function(e){e.on("users",(t=>{t.forEach((t=>{t.self=t.userID===e.id}))})),e.on("session",(t=>{var s={sessionID:t.passport.user,userID:t.userID,username:t.username};console.log(s,"session cookie to create");var c=JSON.parse(localStorage.getItem("sessionCookie"));console.log(c,"storedSessionCookie"),c?e.userID=c.userID:(localStorage.setItem("sessionCookie",JSON.stringify(s)),e.userID=t.userID)}))}(t);var o=JSON.parse(s);return h(t,o,n),Object(c.useEffect)((()=>{window.addEventListener("resize",(()=>{var e=window.innerWidth;l(e)}))})),Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(m,{children:i<990?Object(b.jsx)(b.Fragment,{children:a?Object(b.jsx)(g,{currentExchangeTo:a,messageThreadObj:o,socket:t,setMessageThread:n,width:i,setCurrentExchangeTo:r}):Object(b.jsx)(v,{width:i,currentExchangeTo:a,messageThreadsObj:o,setCurrentExchangeTo:r,width:i})}):Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("div",{className:"container-fluid w-100 row",children:[Object(b.jsx)(v,{width:i,currentExchangeTo:a,messageThreadsObj:o,setCurrentExchangeTo:r}),Object(b.jsx)(g,{currentExchangeTo:a,messageThreadObj:o,socket:t,setMessageThread:n,setCurrentExchangeTo:r,width:i})]})})})})}s(153),s(154);var p=s(72),y=(s(155),Object(p.a)());r.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(f,{socket:y})}),document.getElementById("root"))},95:function(e,t){},97:function(e,t){}},[[156,1,2]]]);
//# sourceMappingURL=main.8d18d0fa.chunk.js.map