(this["webpackJsonpspotify-u"]=this["webpackJsonpspotify-u"]||[]).push([[0],{28:function(e,t,a){},34:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},68:function(e,t,a){e.exports=a(91)},73:function(e,t,a){},91:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(17),c=a.n(i),l=(a(73),a(11)),o=a(8),s=a(61),u=a(31),m=a.n(u),d=a(60),f=a(14),h=Object(f.a)(),g=new d.a,p=function(){v()},v=function(){var e=g.get("access_token");if(void 0!==e)return Promise.resolve(e);var t,a=function(){var e=m.a.parse(window.location.search),t=e.access_token,a=e.refresh_token,n=e.expires_in,r=Object(s.a)(e,["access_token","refresh_token","expires_in"]);return function(e){window.history.replaceState(null,"",window.location.href.replace(window.location.search,(""!==e?"?":"")+e))}(m.a.stringify(r)),window.location.hash=window.location.hash.replace("_=_",""),{access_token:t,expires_in:n,refresh_token:a}}();return e=a.access_token,void 0!==(t=e)&&null!==t&&""!==t?(k(e,a.refresh_token),Promise.resolve(e)):(b(),null)},E=function(){if(void 0===g.get("recently_refreshed_access_token")){var e=g.get("refresh_token");void 0!==e&&(console.log("Refreshing access token..."),fetch("https://spotify-u-backend.herokuapp.com/refresh_token?refresh_token="+e).then((function(e){return e.json()})).then((function(t){console.log("Refreshed access token"),k(t.access_token,e)})))}};function b(){h.push("/loading"),window.location.replace("https://spotify-u-backend.herokuapp.com/login")}function k(e,t){g.set("access_token",e,{path:"/",maxAge:3600}),g.set("refresh_token",t,{path:"/",maxAge:3600}),g.set("recently_refreshed_access_token","",{path:"/",maxAge:900})}var y=function(e){return function e(t,a,n){return O("playlists/".concat(t.id,"/tracks"),{limit:100,offset:a}).then((function(r){return r?(n=n.concat(r.items),r.next?e(t,a+100,n):Promise.resolve(n)):null}))}(e,0,[])};var j=function(e){return function e(t,a){var n,r="",i=[],c=0,o=Object(l.a)(a);try{for(o.s();!(n=o.n()).done;){var s=n.value;c<50?(0!==r.length&&(r+=","),r+=s.track.id):i.push(s),c++}}catch(u){o.e(u)}finally{o.f()}return O("me/tracks/contains",{ids:r}).then((function(a){return a?(t=t.concat(a),0===i.length?Promise.resolve(t):e(t,i)):null}))}([],e)};function O(e,t){var a=v();return null===a?Promise.resolve(null):a.then((function(a){return fetch("https://api.spotify.com/v1/"+e+(t?"?"+m.a.stringify(t):""),{headers:{Authorization:"Bearer "+a}})})).then(w)}function w(e){var t=e.status;if(204===t)return Promise.resolve(null);var a=e.json();return Promise.all([t,a]).then((function(e){var t=Object(o.a)(e,2),a=t[0],n=t[1];return 401===a?(g.remove("access_token"),b(),null):200===a?n:null}))}var N=a(34),x=a.n(N),I=(a(28),a(125)),C=a(118),S=a(120),_=a(134),P=a(117),L=a(59),T=a(131),W=function(e){var t=Object(n.useState)(!0),a=Object(o.a)(t,2),i=a[0],c=a[1];return Object(n.useEffect)((function(){var t=setTimeout((function(){c(!1)}),e.wait);return function(){clearTimeout(t)}}),[e.wait]),i?null:r.a.createElement(r.a.Fragment,null,e.children)},R=a(116);function z(e){return r.a.createElement(W,{wait:e.wait?e.wait:500},r.a.createElement(R.a,{size:e.size,className:e.className}))}function A(e){var t,a=e.index,n=e.style,i=e.data.items[a],c=!e.data.isItemLoaded||e.data.isItemLoaded(a);return t=!!e.data.isLoading&&e.data.isLoading?r.a.createElement(_.a,{style:{height:56},key:a},r.a.createElement(T.a,{justifyContent:"center",width:"100%",display:"flex"},r.a.createElement(z,null))):c?r.a.createElement(_.a,{button:!0,key:a,selected:e.data.selectedIndex===a,onClick:function(){e.data.onItemClick&&i&&e.data.onItemClick(i,a)}},r.a.createElement(P.a,{primaryTypographyProps:{noWrap:!0},primary:e.data.getText(i)})):null,r.a.createElement("div",{style:n},t)}var D=function(e){var t=Object(n.useState)(null),a=Object(o.a)(t,2),i=a[0],c=a[1],l={selectedIndex:i,onItemClick:function(t,a){var n=a===i;c(a),e.onItemClick&&e.onItemClick(t,a),!n&&e.onItemSelected&&e.onItemSelected(t,a)},items:e.items,getText:e.getText,isLoading:e.isLoading,isItemLoaded:e.isItemLoaded};return r.a.createElement("div",null,r.a.createElement(L.a,{itemData:l,height:e.height,width:"100%",itemSize:e.itemSize,itemCount:e.itemCount?e.itemCount:l.items.length,onItemsRendered:e.onItemsRendered,ref:e.reff},A))},M=a(56);var B=function(e){var t=e.hasNextPage?e.items.length+1:e.items.length,a=e.isNextPageLoading?function(){return Promise.resolve()}:e.loadNextPage,n=function(t){return!e.hasNextPage||t<e.items.length};function i(t){return e.getText(t)}return r.a.createElement(M.a,{isItemLoaded:n,itemCount:t,loadMoreItems:a},(function(a){var c=a.onItemsRendered,l=a.ref;return r.a.createElement(D,{isLoading:e.isNextPageLoading,isItemLoaded:n,onItemsRendered:c,reff:l,height:e.height,itemSize:e.itemSize,items:e.items,itemCount:t,getText:i,onItemSelected:e.onItemSelected,onItemClick:e.onItemClick})}))},F=a(119),J=Object(C.a)((function(e){return{root:{minWidth:e.spacing(22),margin:e.spacing(3),backgroundColor:e.palette.grey[900]},header:{color:e.palette.primary.main,display:"flex",alignItems:"center",paddingLeft:e.spacing(2),height:e.spacing(6)}}})),Y=function(e){var t=J(),a=Object(n.useState)([]),i=Object(o.a)(a,2),c=i[0],l=i[1],s=Object(n.useState)(0),u=Object(o.a)(s,2),m=u[0],d=u[1],f=Object(n.useState)(null),h=Object(o.a)(f,2),g=h[0],p=h[1],v=Object(n.useState)(!1),E=Object(o.a)(v,2),b=E[0],k=E[1],y=Object(n.useState)(!0),j=Object(o.a)(y,2),w=j[0],N=j[1];Object(n.useEffect)((function(){O("me").then((function(e){return e?e.id:null})).then((function(e){x(e,0),p(e)}))}),[]);var x=function(e,t){if(!e)return Promise.resolve();k(!0);var a,n;return(a=40,n=t+m,O("me/playlists",{limit:a,offset:n}).then((function(e){return e||null}))).then((function(t){if(k(!1),t){t.items.length<40&&N(!1);var a=t.items.filter((function(t){return t.owner.id===e}));d(m+t.items.length-a.length),l((function(e){return e.concat(a)}))}else N(!1)}))};return r.a.createElement(F.a,{elevation:3,className:t.root},r.a.createElement("div",{className:t.header},r.a.createElement("h2",null,"Playlists")),r.a.createElement(S.a,null),r.a.createElement(B,{hasNextPage:w,isNextPageLoading:b,height:784,itemSize:46,items:c,getText:function(e){return e.name},loadNextPage:function(e){return x(g,e)},onItemSelected:e.onPlaylistSelected}))},$=a(57);function q(e,t){var a={sensitivity:"base"};return 2*e.track.artists[0].name.localeCompare(t.track.artists[0].name,"en",a)+1*e.track.name.localeCompare(t.track.name,"en",a)}var G=a(48),H=a(133),K=a(41),Q=a(123),U=a(124),V=a(126),X=function(e){return new Date(Date.parse(e.added_at))},Z=a(121),ee=a(122),te=a(132),ae=Object(C.a)((function(e){return Object(H.a)({root:{width:"100%"}})}));function ne(e){var t=ae();return r.a.createElement(Z.a,{className:t.root},e.items.map((function(t,a){var n="checkbox-list-label-".concat(a);return r.a.createElement(_.a,{key:a,role:void 0,dense:!0,button:!0,divider:!0,className:e.listItemClassName&&e.listItemClassName(a),onClick:function(){return e.handleToggle(a)}},r.a.createElement(ee.a,null,r.a.createElement(te.a,{edge:"start",checked:e.isChecked(a),tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":n}})),e.getContent(t))})))}var re=Object(C.a)((function(e){return Object(H.a)({root:{backgroundColor:e.palette.background.default},header:{color:e.palette.primary.main,display:"flex",alignItems:"center",paddingLeft:e.spacing(2),height:e.spacing(6)},button:{margin:e.spacing(1),marginBottom:e.spacing(10)},list:{position:"relative",width:"100%"},listItem:{width:"100%",display:"flex",alignItems:"center"},checkedListItem:{backgroundColor:e.palette.secondary.main+"08"},liked:{width:"3%",display:"flex",alignItems:"center",minWidth:e.spacing(5),paddingRight:e.spacing(2)},title:{width:"37%",minWidth:e.spacing(20),paddingRight:e.spacing(2)},artist:{width:"25%",minWidth:e.spacing(15),paddingRight:e.spacing(2)},album:{width:"20%",minWidth:e.spacing(15),paddingRight:e.spacing(2)},addedAt:{width:"10%",minWidth:e.spacing(13),paddingRight:e.spacing(2)},duration:{width:"5%",minWidth:e.spacing(5),display:"flex",justifyContent:"flex-end"}})}));var ie=function(e){var t=re(),a=Object(n.useState)([]),i=Object(o.a)(a,2),c=i[0],s=i[1],u=Object(n.useState)([]),m=Object(o.a)(u,2),d=m[0],f=m[1];Object(n.useEffect)((function(){s(function(e){var t,a=[],n=Object(l.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;a.push.apply(a,Object(G.a)(r))}}catch(i){n.e(i)}finally{n.f()}return a}(e.duplicates)),f(function(e){var t,a=[],n=0,r=Object(l.a)(e);try{for(r.s();!(t=r.n()).done;){var i,c=t.value,o=-1,s=Date.now(),u=Object(l.a)(c);try{for(u.s();!(i=u.n()).done;){var m=i.value,d=X(m).getTime();o<0?(o=n,s=d):d<s?(a.push(o),o=n,s=d):a.push(n),n++}}catch(f){u.e(f)}finally{u.f()}}}catch(f){r.e(f)}finally{r.f()}return a}(e.duplicates))}),[e.duplicates]);var h=function(e){return-1!==d.indexOf(e)};return r.a.createElement("div",{className:t.root},r.a.createElement("div",{className:t.header},r.a.createElement("h2",null,"Found ",e.duplicates.length," songs with duplicates:")),r.a.createElement(S.a,null),r.a.createElement("div",{className:t.list},r.a.createElement(ne,{items:c,isChecked:function(e){return h(e)},handleToggle:function(e){var t=d.indexOf(e),a=Object(G.a)(d);-1===t?a.push(e):a.splice(t,1),f(a)},listItemClassName:function(e){return h(e)?t.checkedListItem:""},getContent:function(e){return r.a.createElement("div",{className:t.listItem},r.a.createElement("div",{className:t.liked},e.liked?r.a.createElement(Q.a,{fontSize:"small"}):r.a.createElement(U.a,{fontSize:"small"})),r.a.createElement("div",{className:t.title},r.a.createElement(K.a,{noWrap:!0},e.track.name)),r.a.createElement("div",{className:t.artist},r.a.createElement(K.a,{noWrap:!0},function(e){var t,a="",n=Object(l.a)(e.track.artists);try{for(n.s();!(t=n.n()).done;){var r=t.value;0!==a.length&&(a+=", "),a+=r.name}}catch(i){n.e(i)}finally{n.f()}return a}(e))),r.a.createElement("div",{className:t.album},r.a.createElement(K.a,{noWrap:!0},e.track.album.name)),r.a.createElement("div",{className:t.addedAt},r.a.createElement(K.a,{noWrap:!0},function(e){var t=(Date.now()-e.getTime())/6e4,a=Math.round(t);if(1===a)return"a minute ago";if(a<60)return a+" minutes ago";var n=Math.round(t/60);return 1===n?"an hour ago":n<24?n+" hours ago":e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2)}(X(e)))),r.a.createElement("div",{className:t.duration},r.a.createElement(K.a,{noWrap:!0},function(e){var t=Math.round(e/1e3),a=Math.floor(t/3600),n=Math.floor((t-3600*a)/60),r=t-3600*a-60*n;return(a>0?a+":":"")+((a>0&&n<10?"0":"")+n)+":"+((r<10?"0":"")+r)}(e.track.duration_ms))))}})),r.a.createElement("div",null,r.a.createElement(I.a,{color:"secondary",variant:"contained",className:t.button,startIcon:r.a.createElement(V.a,null),onClick:function(){return function(){for(var e=[],t=0;t<c.length;t++){var a=c[t];h(t)||e.push(a),f([]),s(e)}var n,r=Object(l.a)(d);try{for(r.s();!(n=r.n()).done;){var i=n.value;console.log("Delete "+c[i].track.name)}}catch(o){r.e(o)}finally{r.f()}}()}},"Delete (",d.length,")")))},ce=Object(C.a)((function(e){return{root:{display:"flex"},app:{width:"100%",justifyContent:"center"},header:{width:"100%",justifyContent:"center",paddingTop:e.spacing(3)},content:{paddingTop:e.spacing(3)},sideBar:{width:"100%",maxWidth:e.spacing(40)},buttonProgress:{position:"absolute"},button:{margin:e.spacing(1)}}})),le=function(){var e=ce(),t=Object(n.useState)(null),a=Object(o.a)(t,2),i=a[0],c=a[1],s=Object(n.useState)(null),u=Object(o.a)(s,2),m=u[0],d=u[1],f=Object(n.useState)(null),h=Object(o.a)(f,2),g=h[0],p=h[1],v=Object(n.useState)(!1),E=Object(o.a)(v,2),b=E[0],k=E[1];Object(n.useEffect)((function(){w()}),[]);var w=function(){O("me/player/currently-playing").then((function(e){return e&&e.item?e.item.name:null})).then((function(e){c(e)}))};return r.a.createElement("div",{className:e.root},r.a.createElement("div",{className:e.sideBar},r.a.createElement(Y,{onPlaylistSelected:function(e,t){d(e),p(null)}})),r.a.createElement("div",{className:e.app},m?r.a.createElement("div",null,r.a.createElement("div",{className:e.header},m?r.a.createElement("div",null,r.a.createElement("img",{height:300,src:m.images[0].url,alt:"Playlist Cover"}),r.a.createElement("h1",null,m.name)):r.a.createElement("img",{src:x.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null)),r.a.createElement(S.a,{variant:"middle"}),r.a.createElement("div",{className:e.content},r.a.createElement(I.a,{color:"primary",variant:"outlined",className:e.button,onClick:w},"Show Current Song"),r.a.createElement(I.a,{color:"primary",variant:"contained",disabled:b,className:e.button,onClick:function(){m&&(k(!0),y(m).then((function(e){if(e){var t,a=function(e){for(var t,a,n=e.slice().sort(q),r=[],i=0;i<n.length;i++){var c=n[i];if(c){for(var l=c.track.name,o=c.track.artists[0].name,s=[],u=!0,m=i+1;m<n.length;m++){var d=n[m];if(d){if(d.track.artists[0].name!==o)break;t=d.track.name,a=l,Object($.compareTwoStrings)(t,a)>=.8&&(u&&(u=!1,s.push(c)),s.push(d),n[m]=null)}}s.length>0&&r.push(s)}}return r}(e),n=[],r=Object(l.a)(a);try{for(r.s();!(t=r.n()).done;){var i,c=t.value,o=Object(l.a)(c);try{for(o.s();!(i=o.n()).done;){var s=i.value;n.push(s)}}catch(u){o.e(u)}finally{o.f()}}}catch(u){r.e(u)}finally{r.f()}j(n).then((function(e){if(k(!1),e){for(var t=0;t<e.length;t++)n[t].liked=e[t];p(a)}}))}else k(!1)})))}},"Find Duplicate Songs",b&&r.a.createElement(z,{className:e.buttonProgress,size:24,wait:300})),r.a.createElement(I.a,{color:"primary",variant:"outlined",className:e.button,onClick:function(){return console.log(m)}},"Print Playlist"),r.a.createElement(I.a,{color:"primary",variant:"outlined",className:e.button,onClick:function(){return y(m).then((function(e){return console.log(e)}))}},"Print Tracks"),r.a.createElement("h1",null,i||"-No song is currently playing-"),r.a.createElement("div",null,g?r.a.createElement(ie,{duplicates:g}):null))):r.a.createElement("div",{className:e.header},r.a.createElement("h1",null,"Select a playlist"))),r.a.createElement("div",{className:e.sideBar}))},oe=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("img",{src:x.a,className:"App-logo",alt:"logo"}),r.a.createElement("h1",null,"Loading..."))},se=a(130),ue=a(129),me=a(128),de=a(58),fe=a(127),he=a(40),ge=Object(de.a)({palette:{type:"dark",background:{default:"#181818"},primary:fe.a,secondary:he.a,grey:{800:"#282828",900:"#121212"}}});var pe=function(){return p(),E(),window.setInterval((function(){E()}),6e4),r.a.createElement("div",{className:"outerWrap"},r.a.createElement(me.a,{theme:ge},r.a.createElement(ue.a,null),r.a.createElement(se.b,{history:h},r.a.createElement("div",{className:"App"},r.a.createElement(se.c,null,r.a.createElement(se.a,{path:"/",exact:!0,component:le}),r.a.createElement(se.a,{path:"/loading",exact:!0,component:oe}),r.a.createElement(se.a,{path:"/auth",exact:!0,component:function(){return p(),null}}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(pe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[68,1,2]]]);
//# sourceMappingURL=main.2c23c978.chunk.js.map