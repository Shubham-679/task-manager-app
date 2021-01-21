(this["webpackJsonptask-manager-app"]=this["webpackJsonptask-manager-app"]||[]).push([[0],{54:function(e,t,a){},55:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(0),c=a.n(r),s=a(17),o=a.n(s),l=(a(54),a(55),a(56),a(4)),i=a(11),u=a(5),j=Object(u.b)((function(e){return{users:e.users}}))((function(e){var t=e.users;return Object(n.jsx)("div",{className:"container-fluid",style:{backgroundColor:"#2d4059"},children:Object(n.jsx)("nav",{className:"navbar sticky-top navbar-expand-sm navbar-dark",children:Object(n.jsxs)("div",{className:"container-fluid",children:[Object(n.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(n.jsx)("span",{className:"navbar-toggler-icon"})}),Object(n.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:Object(n.jsxs)("ul",{className:"navbar-nav",children:[!t.token&&Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsx)(i.b,{className:"navbar-brand",to:"/home",children:"Home"}),Object(n.jsx)(i.c,{className:"nav-link ",to:"/login",children:"Login"}),Object(n.jsx)(i.c,{className:"nav-link ",to:"/signup",children:"SignUp"})]}),t.token&&Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsx)(i.c,{className:"navbar-brand",to:"/tasks",children:"Home"}),Object(n.jsx)(i.c,{className:"nav-link",to:"/logout",children:"Logout"}),Object(n.jsx)(i.c,{className:"nav-link",to:"/profile",children:"Profile"}),Object(n.jsx)(i.c,{className:"nav-link",to:"/delete-account",children:"Delete Account"})]})]})})]})})})})),b=function(e){return Object(n.jsxs)("div",{className:"mt-5",children:[Object(n.jsx)("h1",{children:" Task Manager Application "}),Object(n.jsx)("h4",{children:" Single Destination To Manage Your Daily Routine Tasks."})]})},d=a(19),m=a(6),p=a(20),f=a(3),h=a.n(f),O=a(9),x=a(15),v=a.n(x),g=function(e,t){return function(){var a=Object(O.a)(h.a.mark((function a(n){var r,c;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,v.a.patch("/users/me",e,{headers:{"x-auth-token":t}});case 2:r=a.sent,c=r.data,n({type:"UPDATE_USER",payload:c});case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},N=function(e,t){return function(){var a=Object(O.a)(h.a.mark((function a(n){var r,c;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,v.a.delete("/tasks/"+e,{headers:{"x-auth-token":t}});case 2:r=a.sent,c=r.data,n({type:"REMOVE_TASK",payload:c});case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},y=a(12),k={email:"",password:""},w=function(e){var t=Object(r.useState)(k),a=Object(p.a)(t,2),c=a[0],s=a[1],o=Object(u.c)(),l=function(e){var t=e.target,a=t.name,n=t.value;s(Object(m.a)(Object(m.a)({},c),{},Object(d.a)({},a,n)))};return Object(n.jsxs)("div",{className:"container",style:{backgroundColor:"#ffcccc"},children:[Object(n.jsx)("h1",{className:"m-4",children:" Login Here.."}),Object(n.jsx)("div",{className:"d-flex justify-content-center",children:Object(n.jsxs)("form",{onSubmit:function(t){t.preventDefault(),o(function(e){return function(){var t=Object(O.a)(h.a.mark((function t(a){var n,r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.a.post("/users/login",e);case 2:return n=t.sent,r=n.data,a({type:"FIND_USER",payload:r}),t.abrupt("return",r);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(c)).then((function(t){y.b.success("Login Success"),e.history.replace("/tasks")})).catch((function(e){y.b.error("Email or Password Are Invalid !"),console.log(e)}))},children:[Object(n.jsxs)("div",{className:"mb-3",children:[Object(n.jsx)("label",{htmlFor:"email",className:"form-label float-left",children:"Email address"}),Object(n.jsx)("input",{value:c.email,onChange:l,name:"email",type:"email",placeholder:"Enter Your Email",className:"form-control"}),Object(n.jsx)("small",{id:"emailHelp",className:"form-text",children:"We'll never share your email with anyone else."})]}),Object(n.jsxs)("div",{className:"mb-3",children:[Object(n.jsx)("label",{htmlFor:"password",className:"form-label float-left",children:"Password"}),Object(n.jsx)("input",{value:c.password,onChange:l,name:"password",type:"password",placeholder:"Enter Your Password",className:"form-control"})]}),Object(n.jsx)("div",{className:"mb-3",children:Object(n.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Login"})})]})})]})},E={name:"",email:"",password:"",age:""},S=function(e){var t=Object(r.useState)(E),a=Object(p.a)(t,2),c=a[0],s=a[1],o=Object(u.c)(),l=function(e){var t=e.target,a=t.name,n=t.value;s(Object(m.a)(Object(m.a)({},c),{},Object(d.a)({},a,n)))};return Object(n.jsxs)("div",{style:{backgroundColor:"#ffcccc"},children:[Object(n.jsx)("h1",{className:"m-4",children:" New Registration"}),Object(n.jsx)("div",{className:"d-flex justify-content-center",children:Object(n.jsxs)("form",{onSubmit:function(t){t.preventDefault(),o(function(e){return function(){var t=Object(O.a)(h.a.mark((function t(a){var n,r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.a.post("/users",e);case 2:n=t.sent,r=n.data,a({type:"ADD_USER",payload:r});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(c)).then((function(){y.b.success("You Registered Succesfully, Now You Can Login"),e.history.replace("/login")})).catch((function(){y.b.error("Unexpected error"),e.history.replace("/signup")}))},children:[Object(n.jsxs)("div",{className:"mb-2",children:[Object(n.jsx)("label",{className:"form-label float-left",children:"Name"}),Object(n.jsx)("input",{value:c.name,onChange:l,name:"name",placeholder:"Enter Your Name",className:"form-control"})]}),Object(n.jsxs)("div",{className:"mb-2",children:[Object(n.jsx)("label",{className:"form-label float-left",children:"E-mail"}),Object(n.jsx)("input",{value:c.email,onChange:l,name:"email",type:"email",placeholder:"Enter Your Email",className:"form-control"})]}),Object(n.jsxs)("div",{className:"mb-2",children:[Object(n.jsx)("label",{className:"form-label float-left",children:"Password"}),Object(n.jsx)("input",{value:c.password,onChange:l,name:"password",type:"password",placeholder:"Enter Your Password",className:"form-control"})]}),Object(n.jsxs)("div",{className:"mb-2",children:[Object(n.jsx)("label",{className:"form-label float-left",children:"Age"}),Object(n.jsx)("input",{value:c.age,onChange:l,name:"age",placeholder:"Enter Your Age",className:"form-control"})]}),Object(n.jsx)("button",{className:"btn btn-primary m-2",type:"submit",children:"Submit"})]})})]})},A=Object(u.b)((function(e){return{users:e.users,tasks:e.tasks}}),(function(e){return{toggleTask:function(t,a){return e(function(e,t){return function(){var a=Object(O.a)(h.a.mark((function a(n){var r,c;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,v.a.put("/tasks/"+e,{headers:{"x-auth-token":t}});case 2:r=a.sent,c=r.data,n({type:"TOGGLE_TASK",taskToggle:c});case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(t,a))}}}))((function(e){var t=e.users,a=(e.toggleTask,e.tasks),s=Object(u.c)(),o=t.token;Object(r.useEffect)((function(){s(function(e){return function(){var t=Object(O.a)(h.a.mark((function t(a){var n,r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.a.get("/tasks",{headers:{"x-auth-token":e}});case 2:n=t.sent,r=n.data,a({type:"GET_TASKS",payload:r});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(o))}),[]);var i,j=c.a.createRef(),b=function(e){i=e.target.value},d=function(e){e.description=i,s(function(e,t){return function(){var a=Object(O.a)(h.a.mark((function a(n){return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,v.a.patch("/tasks/"+e._id,e,{headers:{"x-auth-token":t}});case 2:n({type:"UPDATE_TASKS",payload:e});case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(e,o))},m=function(){var e=Object(O.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s(N(t._id,o));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(n.jsxs)("div",{className:"container",children:[!o&&Object(n.jsx)(c.a.Fragment,{children:Object(n.jsx)(l.a,{to:"/not-found"})}),o&&Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsxs)("div",{className:"m-5",children:[Object(n.jsxs)("h1",{children:[" Welcome ",t.user.name,"..! "]}),Object(n.jsx)("h5",{children:" Now You Can Add Your Tasks... Here "})]}),Object(n.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=j.current.value;s(function(e,t){return function(){var a=Object(O.a)(h.a.mark((function a(n){var r,c,s;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r={description:e},a.next=3,v.a.post("/tasks",r,{headers:{"x-auth-token":t}});case 3:c=a.sent,s=c.data,n({type:"ADD_TASK",payload:s});case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(t,o))},children:[Object(n.jsx)("input",{type:"text",id:"add",ref:j,placeholder:"Add New Task...",className:"m-2"}),Object(n.jsx)("button",{className:"btn btn-primary m-2",children:"Add"})]}),Object(n.jsx)("div",{className:"container col-10",children:Object(n.jsx)("ul",{className:"list-group",children:a.map((function(e){return Object(n.jsxs)("li",{className:"list-group-item",children:[e.description,Object(n.jsxs)("div",{children:[Object(n.jsx)("input",{type:"text",id:"update",placeholder:"Update...",onChange:b,className:"float-right m-2"}),Object(n.jsx)("button",{className:"btn btn-warning btn-sm float-right m-2",onClick:function(){return d(e)},children:"Update"})]}),Object(n.jsx)("button",{className:"btn btn-danger btn-sm float-left m-2",onClick:function(){return m(e)},children:"Remove"})]},e._id)}))})})]})]})})),T=a(41),_=a(42),D=a(48),U=a(46),C=function(e){Object(D.a)(a,e);var t=Object(U.a)(a);function a(){var e;Object(T.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(_.a)(a,[{key:"render",value:function(){return Object(n.jsx)("h1",{children:"404 Not Found"})}}]),a}(r.Component),R=(a(81),Object(u.b)((function(e){return{token:e.users.token}}))((function(e){var t=e.token,a=Object(u.c)();return Object(r.useEffect)((function(){a(function(e){return function(){var t=Object(O.a)(h.a.mark((function t(a){var n,r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.a.get("/users/logout",{headers:{"x-auth-token":e}});case 2:n=t.sent,r=n.data,a({type:"LOGOUT_USER",payload:r});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t)),localStorage.clear(),window.location="/"})),null}))),F=Object(u.b)((function(e){return{users:e.users}}),{updateUser:g})((function(e){var t,a={name:e.users.user.name,email:e.users.user.email,password:"",age:e.users.user.age},s=Object(r.useState)(a),o=Object(p.a)(s,2),i=o[0],j=o[1],b=Object(u.c)(),f=function(e){var t=e.target,a=t.name,n=t.value;j(Object(m.a)(Object(m.a)({},i),{},Object(d.a)({},a,n)))};return Object(n.jsxs)("div",{className:"container mt-5",children:[Object(n.jsx)("div",{children:!e.users.token&&Object(n.jsx)(c.a.Fragment,{children:Object(n.jsx)(l.a,{to:"/not-found"})})}),e.users.token&&Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsxs)("div",{className:"row",children:[Object(n.jsx)("div",{className:"col-2",children:Object(n.jsx)("img",{className:"img-thumbnail",src:e.users.user.img,alt:""})}),Object(n.jsxs)("div",{className:"col-10",children:[Object(n.jsxs)("h1",{children:[" Name : ",e.users.user.name," "]}),Object(n.jsxs)("h1",{children:[" Email : ",e.users.user.email," "]}),Object(n.jsxs)("h1",{children:[" Age : ",e.users.user.age," "]})]})]}),Object(n.jsxs)("div",{className:"row",children:[Object(n.jsx)("div",{className:"col-6",children:Object(n.jsxs)("form",{method:"post",action:"#",id:"#",children:[Object(n.jsx)("label",{children:"Upload Your File "}),Object(n.jsx)("input",{type:"file",name:"file",className:"form-control",onChange:function(e){console.log(e.target.files[0]),t=e.target.files[0]}}),Object(n.jsx)("button",{type:"button",className:"btn btn-success btn-sm m-2",onClick:function(a){var n=new FormData;n.append("img",t),b(function(e,t){return function(){var a=Object(O.a)(h.a.mark((function a(n){var r,c;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,v.a.put("/users/me/profileImg",e,{headers:{"x-auth-token":t,"Content-Type":"multipart/form-data"}});case 2:return r=a.sent,c=r.data,n({type:"ADD_PHOTO",payload:c}),a.abrupt("return",c);case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(n,e.users.token))},children:"Upload"})]})}),Object(n.jsx)("div",{className:"col-6",children:Object(n.jsxs)("form",{onSubmit:function(t){t.preventDefault(),b(g(i,e.users.token)).then((function(){y.b.success("Profile Updated")})).catch((function(){y.b.error("Unexpected error")}))},children:[Object(n.jsxs)("div",{className:"mb-2",children:[Object(n.jsx)("label",{className:"form-label float-left",children:"Name"}),Object(n.jsx)("input",{value:i.name,onChange:f,name:"name",placeholder:"Enter Your Name",className:"form-control"})]}),Object(n.jsxs)("div",{className:"mb-2",children:[Object(n.jsx)("label",{className:"form-label float-left",children:"E-mail"}),Object(n.jsx)("input",{value:i.email,onChange:f,name:"email",type:"email",placeholder:"Enter Your Email",className:"form-control"})]}),Object(n.jsxs)("div",{className:"mb-2",children:[Object(n.jsx)("label",{className:"form-label float-left",children:"Password"}),Object(n.jsx)("input",{value:i.password,onChange:f,name:"password",type:"password",placeholder:"Enter Your Password",className:"form-control"})]}),Object(n.jsxs)("div",{className:"mb-2",children:[Object(n.jsx)("label",{className:"form-label float-left",children:"Age"}),Object(n.jsx)("input",{value:i.age,onChange:f,name:"age",placeholder:"Enter Your Age",className:"form-control"})]}),Object(n.jsx)("button",{className:"btn btn-primary m-2",type:"submit",children:"Update"})]})})]})]})]})})),P=Object(u.b)((function(e){return{token:e.users.token}}))((function(e){var t=e.token,a=Object(u.c)();return console.log(t),Object(r.useEffect)((function(){a(function(e){return function(){var t=Object(O.a)(h.a.mark((function t(a){var n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.a.delete("/users/me",{headers:{"x-auth-token":e}});case 2:return n=t.sent,a({type:"REMOVE_USER",payload:n}),t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t)).then((function(){y.b.success("Your Account Is Deleted Successfully"),window.location="/"}))}),[a,t]),null}));var Y=function(){return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)(y.a,{}),Object(n.jsx)(j,{}),Object(n.jsxs)(l.d,{children:[Object(n.jsx)(l.b,{path:"/home",component:b}),Object(n.jsx)(l.b,{path:"/login",component:w}),Object(n.jsx)(l.b,{path:"/signup",component:S}),Object(n.jsx)(l.b,{path:"/tasks",component:A}),Object(n.jsx)(l.b,{path:"/logout",component:R}),Object(n.jsx)(l.b,{path:"/profile",component:F}),Object(n.jsx)(l.b,{path:"/delete-account",component:P}),Object(n.jsx)(l.b,{path:"/not-found",component:C}),Object(n.jsx)(l.a,{from:"/",exact:!0,to:"/home"}),Object(n.jsx)(l.a,{to:"/not-found"})]})]})},L=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,87)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))},K=a(16),G=a(43),H=a(30),I=a(44),M=a.n(I),V=a(47),B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_TASK":return[].concat(Object(V.a)(e),[t.payload]);case"GET_TASKS":return t.payload;case"UPDATE_TASKS":return e.map((function(e){return e._id===t.payload._id?Object(m.a)(Object(m.a)({},e),{},{description:t.payload.description}):e}));case"REMOVE_TASK":return e.filter((function(e){return e._id!==t.payload._id}));case"TOGGLE_TASK":return e.map((function(e){return e.id===t._id?Object(m.a)(Object(m.a)({},e),{},{completed:!e.completed}):e}));default:return e}},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_USER":case"FIND_USER":return t.payload;case"LOGOUT_USER":return{};case"UPDATE_USER":case"ADD_PHOTO":return Object(m.a)(Object(m.a)({},e),{},{user:t.payload});case"REMOVE_USER":return[];default:return e}},W=Object(K.c)({users:J,tasks:B}),q={key:"users",storage:M.a,whitelist:["users"]},z=Object(H.a)(q,W),Q=Object(K.d)(z,Object(K.a)(G.a)),X=Object(H.b)(Q),Z=a(45);Q.subscribe((function(){return console.log(Q.getState())})),o.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(i.a,{children:Object(n.jsx)(u.a,{store:Q,children:Object(n.jsx)(Z.a,{loading:null,persistor:X,children:Object(n.jsx)(Y,{})})})})}),document.getElementById("root")),L()}},[[84,1,2]]]);
//# sourceMappingURL=main.20a2ba17.chunk.js.map