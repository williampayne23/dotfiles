"use strict";var An=Object.create;var V=Object.defineProperty;var Nn=Object.getOwnPropertyDescriptor;var On=Object.getOwnPropertyNames;var Gn=Object.getPrototypeOf,kn=Object.prototype.hasOwnProperty;var l=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ln=(e,t)=>{for(var n in t)V(e,n,{get:t[n],enumerable:!0})},je=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of On(t))!kn.call(e,i)&&i!==n&&V(e,i,{get:()=>t[i],enumerable:!(r=Nn(t,i))||r.enumerable});return e};var E=(e,t,n)=>(n=e!=null?An(Gn(e)):{},je(t||!e||!e.__esModule?V(n,"default",{value:e,enumerable:!0}):n,e)),jn=e=>je(V({},"__esModule",{value:!0}),e);var qe=l((Ui,We)=>{We.exports=He;He.sync=Un;var Be=require("fs");function Bn(e,t){var n=t.pathExt!==void 0?t.pathExt:process.env.PATHEXT;if(!n||(n=n.split(";"),n.indexOf("")!==-1))return!0;for(var r=0;r<n.length;r++){var i=n[r].toLowerCase();if(i&&e.substr(-i.length).toLowerCase()===i)return!0}return!1}function Ue(e,t,n){return!e.isSymbolicLink()&&!e.isFile()?!1:Bn(t,n)}function He(e,t,n){Be.stat(e,function(r,i){n(r,r?!1:Ue(i,e,t))})}function Un(e,t){return Ue(Be.statSync(e),e,t)}});var Ve=l((Hi,Ke)=>{Ke.exports=_e;_e.sync=Hn;var Me=require("fs");function _e(e,t,n){Me.stat(e,function(r,i){n(r,r?!1:Xe(i,t))})}function Hn(e,t){return Xe(Me.statSync(e),t)}function Xe(e,t){return e.isFile()&&Wn(e,t)}function Wn(e,t){var n=e.mode,r=e.uid,i=e.gid,s=t.uid!==void 0?t.uid:process.getuid&&process.getuid(),o=t.gid!==void 0?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),p=parseInt("010",8),u=parseInt("001",8),m=a|p,S=n&u||n&p&&i===o||n&a&&r===s||n&m&&s===0;return S}});var Je=l((qi,ze)=>{var Wi=require("fs"),z;process.platform==="win32"||global.TESTING_WINDOWS?z=qe():z=Ve();ze.exports=pe;pe.sync=qn;function pe(e,t,n){if(typeof t=="function"&&(n=t,t={}),!n){if(typeof Promise!="function")throw new TypeError("callback not provided");return new Promise(function(r,i){pe(e,t||{},function(s,o){s?i(s):r(o)})})}z(e,t||{},function(r,i){r&&(r.code==="EACCES"||t&&t.ignoreErrors)&&(r=null,i=!1),n(r,i)})}function qn(e,t){try{return z.sync(e,t||{})}catch(n){if(t&&t.ignoreErrors||n.code==="EACCES")return!1;throw n}}});var rt=l((Mi,nt)=>{var $=process.platform==="win32"||process.env.OSTYPE==="cygwin"||process.env.OSTYPE==="msys",Ze=require("path"),Mn=$?";":":",Ye=Je(),Qe=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"}),et=(e,t)=>{let n=t.colon||Mn,r=e.match(/\//)||$&&e.match(/\\/)?[""]:[...$?[process.cwd()]:[],...(t.path||process.env.PATH||"").split(n)],i=$?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",s=$?i.split(n):[""];return $&&e.indexOf(".")!==-1&&s[0]!==""&&s.unshift(""),{pathEnv:r,pathExt:s,pathExtExe:i}},tt=(e,t,n)=>{typeof t=="function"&&(n=t,t={}),t||(t={});let{pathEnv:r,pathExt:i,pathExtExe:s}=et(e,t),o=[],a=u=>new Promise((m,S)=>{if(u===r.length)return t.all&&o.length?m(o):S(Qe(e));let g=r[u],P=/^".*"$/.test(g)?g.slice(1,-1):g,I=Ze.join(P,e),x=!P&&/^\.[\\\/]/.test(e)?e.slice(0,2)+I:I;m(p(x,u,0))}),p=(u,m,S)=>new Promise((g,P)=>{if(S===i.length)return g(a(m+1));let I=i[S];Ye(u+I,{pathExt:s},(x,R)=>{if(!x&&R)if(t.all)o.push(u+I);else return g(u+I);return g(p(u,m,S+1))})});return n?a(0).then(u=>n(null,u),n):a(0)},_n=(e,t)=>{t=t||{};let{pathEnv:n,pathExt:r,pathExtExe:i}=et(e,t),s=[];for(let o=0;o<n.length;o++){let a=n[o],p=/^".*"$/.test(a)?a.slice(1,-1):a,u=Ze.join(p,e),m=!p&&/^\.[\\\/]/.test(e)?e.slice(0,2)+u:u;for(let S=0;S<r.length;S++){let g=m+r[S];try{if(Ye.sync(g,{pathExt:i}))if(t.all)s.push(g);else return g}catch{}}}if(t.all&&s.length)return s;if(t.nothrow)return null;throw Qe(e)};nt.exports=tt;tt.sync=_n});var ue=l((_i,de)=>{"use strict";var it=(e={})=>{let t=e.env||process.env;return(e.platform||process.platform)!=="win32"?"PATH":Object.keys(t).reverse().find(r=>r.toUpperCase()==="PATH")||"Path"};de.exports=it;de.exports.default=it});var ct=l((Xi,at)=>{"use strict";var st=require("path"),Xn=rt(),Kn=ue();function ot(e,t){let n=e.options.env||process.env,r=process.cwd(),i=e.options.cwd!=null,s=i&&process.chdir!==void 0&&!process.chdir.disabled;if(s)try{process.chdir(e.options.cwd)}catch{}let o;try{o=Xn.sync(e.command,{path:n[Kn({env:n})],pathExt:t?st.delimiter:void 0})}catch{}finally{s&&process.chdir(r)}return o&&(o=st.resolve(i?e.options.cwd:"",o)),o}function Vn(e){return ot(e)||ot(e,!0)}at.exports=Vn});var lt=l((Ki,me)=>{"use strict";var fe=/([()\][%!^"`<>&|;, *?])/g;function zn(e){return e=e.replace(fe,"^$1"),e}function Jn(e,t){return e=`${e}`,e=e.replace(/(\\*)"/g,'$1$1\\"'),e=e.replace(/(\\*)$/,"$1$1"),e=`"${e}"`,e=e.replace(fe,"^$1"),t&&(e=e.replace(fe,"^$1")),e}me.exports.command=zn;me.exports.argument=Jn});var dt=l((Vi,pt)=>{"use strict";pt.exports=/^#!(.*)/});var ft=l((zi,ut)=>{"use strict";var Zn=dt();ut.exports=(e="")=>{let t=e.match(Zn);if(!t)return null;let[n,r]=t[0].replace(/#! ?/,"").split(" "),i=n.split("/").pop();return i==="env"?r:r?`${i} ${r}`:i}});var ht=l((Ji,mt)=>{"use strict";var he=require("fs"),Yn=ft();function Qn(e){let n=Buffer.alloc(150),r;try{r=he.openSync(e,"r"),he.readSync(r,n,0,150,0),he.closeSync(r)}catch{}return Yn(n.toString())}mt.exports=Qn});var wt=l((Zi,yt)=>{"use strict";var er=require("path"),gt=ct(),St=lt(),tr=ht(),nr=process.platform==="win32",rr=/\.(?:com|exe)$/i,ir=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function sr(e){e.file=gt(e);let t=e.file&&tr(e.file);return t?(e.args.unshift(e.file),e.command=t,gt(e)):e.file}function or(e){if(!nr)return e;let t=sr(e),n=!rr.test(t);if(e.options.forceShell||n){let r=ir.test(t);e.command=er.normalize(e.command),e.command=St.command(e.command),e.args=e.args.map(s=>St.argument(s,r));let i=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${i}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}function ar(e,t,n){t&&!Array.isArray(t)&&(n=t,t=null),t=t?t.slice(0):[],n=Object.assign({},n);let r={command:e,args:t,options:n,file:void 0,original:{command:e,args:t}};return n.shell?r:or(r)}yt.exports=ar});var xt=l((Yi,It)=>{"use strict";var ge=process.platform==="win32";function Se(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function cr(e,t){if(!ge)return;let n=e.emit;e.emit=function(r,i){if(r==="exit"){let s=Pt(i,t,"spawn");if(s)return n.call(e,"error",s)}return n.apply(e,arguments)}}function Pt(e,t){return ge&&e===1&&!t.file?Se(t.original,"spawn"):null}function lr(e,t){return ge&&e===1&&!t.file?Se(t.original,"spawnSync"):null}It.exports={hookChildProcess:cr,verifyENOENT:Pt,verifyENOENTSync:lr,notFoundError:Se}});var Tt=l((Qi,A)=>{"use strict";var bt=require("child_process"),ye=wt(),we=xt();function vt(e,t,n){let r=ye(e,t,n),i=bt.spawn(r.command,r.args,r.options);return we.hookChildProcess(i,r),i}function pr(e,t,n){let r=ye(e,t,n),i=bt.spawnSync(r.command,r.args,r.options);return i.error=i.error||we.verifyENOENTSync(i.status,r),i}A.exports=vt;A.exports.spawn=vt;A.exports.sync=pr;A.exports._parse=ye;A.exports._enoent=we});var Ft=l((es,Dt)=>{"use strict";Dt.exports=e=>{let t=typeof e=="string"?`
`:`
`.charCodeAt(),n=typeof e=="string"?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===n&&(e=e.slice(0,e.length-1)),e}});var Et=l((ts,H)=>{"use strict";var U=require("path"),Ct=ue(),Rt=e=>{e={cwd:process.cwd(),path:process.env[Ct()],execPath:process.execPath,...e};let t,n=U.resolve(e.cwd),r=[];for(;t!==n;)r.push(U.join(n,"node_modules/.bin")),t=n,n=U.resolve(n,"..");let i=U.resolve(e.cwd,e.execPath,"..");return r.push(i),r.concat(e.path).join(U.delimiter)};H.exports=Rt;H.exports.default=Rt;H.exports.env=e=>{e={env:process.env,...e};let t={...e.env},n=Ct({env:t});return e.path=t[n],t[n]=H.exports(e),t}});var At=l((ns,Pe)=>{"use strict";var $t=(e,t)=>{for(let n of Reflect.ownKeys(t))Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e};Pe.exports=$t;Pe.exports.default=$t});var Ot=l((rs,Z)=>{"use strict";var dr=At(),J=new WeakMap,Nt=(e,t={})=>{if(typeof e!="function")throw new TypeError("Expected a function");let n,r=0,i=e.displayName||e.name||"<anonymous>",s=function(...o){if(J.set(s,++r),r===1)n=e.apply(this,o),e=null;else if(t.throw===!0)throw new Error(`Function \`${i}\` can only be called once`);return n};return dr(s,e),J.set(s,r),s};Z.exports=Nt;Z.exports.default=Nt;Z.exports.callCount=e=>{if(!J.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return J.get(e)}});var Gt=l(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.SIGNALS=void 0;var ur=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];Y.SIGNALS=ur});var Ie=l(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.SIGRTMAX=N.getRealtimeSignals=void 0;var fr=function(){let e=Lt-kt+1;return Array.from({length:e},mr)};N.getRealtimeSignals=fr;var mr=function(e,t){return{name:`SIGRT${t+1}`,number:kt+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},kt=34,Lt=64;N.SIGRTMAX=Lt});var jt=l(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.getSignals=void 0;var hr=require("os"),gr=Gt(),Sr=Ie(),yr=function(){let e=(0,Sr.getRealtimeSignals)();return[...gr.SIGNALS,...e].map(wr)};Q.getSignals=yr;var wr=function({name:e,number:t,description:n,action:r,forced:i=!1,standard:s}){let{signals:{[e]:o}}=hr.constants,a=o!==void 0;return{name:e,number:a?o:t,description:n,supported:a,action:r,forced:i,standard:s}}});var Ut=l(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});O.signalsByNumber=O.signalsByName=void 0;var Pr=require("os"),Bt=jt(),Ir=Ie(),xr=function(){return(0,Bt.getSignals)().reduce(br,{})},br=function(e,{name:t,number:n,description:r,supported:i,action:s,forced:o,standard:a}){return{...e,[t]:{name:t,number:n,description:r,supported:i,action:s,forced:o,standard:a}}},vr=xr();O.signalsByName=vr;var Tr=function(){let e=(0,Bt.getSignals)(),t=Ir.SIGRTMAX+1,n=Array.from({length:t},(r,i)=>Dr(i,e));return Object.assign({},...n)},Dr=function(e,t){let n=Fr(e,t);if(n===void 0)return{};let{name:r,description:i,supported:s,action:o,forced:a,standard:p}=n;return{[e]:{name:r,number:e,description:i,supported:s,action:o,forced:a,standard:p}}},Fr=function(e,t){let n=t.find(({name:r})=>Pr.constants.signals[r]===e);return n!==void 0?n:t.find(r=>r.number===e)},Cr=Tr();O.signalsByNumber=Cr});var Wt=l((cs,Ht)=>{"use strict";var{signalsByName:Rr}=Ut(),Er=({timedOut:e,timeout:t,errorCode:n,signal:r,signalDescription:i,exitCode:s,isCanceled:o})=>e?`timed out after ${t} milliseconds`:o?"was canceled":n!==void 0?`failed with ${n}`:r!==void 0?`was killed with ${r} (${i})`:s!==void 0?`failed with exit code ${s}`:"failed",$r=({stdout:e,stderr:t,all:n,error:r,signal:i,exitCode:s,command:o,escapedCommand:a,timedOut:p,isCanceled:u,killed:m,parsed:{options:{timeout:S}}})=>{s=s===null?void 0:s,i=i===null?void 0:i;let g=i===void 0?void 0:Rr[i].description,P=r&&r.code,x=`Command ${Er({timedOut:p,timeout:S,errorCode:P,signal:i,signalDescription:g,exitCode:s,isCanceled:u})}: ${o}`,R=Object.prototype.toString.call(r)==="[object Error]",X=R?`${x}
${r.message}`:x,K=[X,t,e].filter(Boolean).join(`
`);return R?(r.originalMessage=r.message,r.message=K):r=new Error(K),r.shortMessage=X,r.command=o,r.escapedCommand=a,r.exitCode=s,r.signal=i,r.signalDescription=g,r.stdout=e,r.stderr=t,n!==void 0&&(r.all=n),"bufferedData"in r&&delete r.bufferedData,r.failed=!0,r.timedOut=!!p,r.isCanceled=u,r.killed=m&&!p,r};Ht.exports=$r});var Mt=l((ls,xe)=>{"use strict";var ee=["stdin","stdout","stderr"],Ar=e=>ee.some(t=>e[t]!==void 0),qt=e=>{if(!e)return;let{stdio:t}=e;if(t===void 0)return ee.map(r=>e[r]);if(Ar(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${ee.map(r=>`\`${r}\``).join(", ")}`);if(typeof t=="string")return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let n=Math.max(t.length,ee.length);return Array.from({length:n},(r,i)=>t[i])};xe.exports=qt;xe.exports.node=e=>{let t=qt(e);return t==="ipc"?"ipc":t===void 0||typeof t=="string"?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]}});var _t=l((ps,te)=>{te.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"];process.platform!=="win32"&&te.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT");process.platform==="linux"&&te.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")});var Jt=l((ds,L)=>{var f=global.process,D=function(e){return e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function"};D(f)?(Xt=require("assert"),G=_t(),Kt=/^win/i.test(f.platform),W=require("events"),typeof W!="function"&&(W=W.EventEmitter),f.__signal_exit_emitter__?h=f.__signal_exit_emitter__:(h=f.__signal_exit_emitter__=new W,h.count=0,h.emitted={}),h.infinite||(h.setMaxListeners(1/0),h.infinite=!0),L.exports=function(e,t){if(!D(global.process))return function(){};Xt.equal(typeof e,"function","a callback must be provided for exit handler"),k===!1&&be();var n="exit";t&&t.alwaysLast&&(n="afterexit");var r=function(){h.removeListener(n,e),h.listeners("exit").length===0&&h.listeners("afterexit").length===0&&ne()};return h.on(n,e),r},ne=function(){!k||!D(global.process)||(k=!1,G.forEach(function(t){try{f.removeListener(t,re[t])}catch{}}),f.emit=ie,f.reallyExit=ve,h.count-=1)},L.exports.unload=ne,F=function(t,n,r){h.emitted[t]||(h.emitted[t]=!0,h.emit(t,n,r))},re={},G.forEach(function(e){re[e]=function(){if(D(global.process)){var n=f.listeners(e);n.length===h.count&&(ne(),F("exit",null,e),F("afterexit",null,e),Kt&&e==="SIGHUP"&&(e="SIGINT"),f.kill(f.pid,e))}}}),L.exports.signals=function(){return G},k=!1,be=function(){k||!D(global.process)||(k=!0,h.count+=1,G=G.filter(function(t){try{return f.on(t,re[t]),!0}catch{return!1}}),f.emit=zt,f.reallyExit=Vt)},L.exports.load=be,ve=f.reallyExit,Vt=function(t){D(global.process)&&(f.exitCode=t||0,F("exit",f.exitCode,null),F("afterexit",f.exitCode,null),ve.call(f,f.exitCode))},ie=f.emit,zt=function(t,n){if(t==="exit"&&D(global.process)){n!==void 0&&(f.exitCode=n);var r=ie.apply(this,arguments);return F("exit",f.exitCode,null),F("afterexit",f.exitCode,null),r}else return ie.apply(this,arguments)}):L.exports=function(){return function(){}};var Xt,G,Kt,W,h,ne,F,re,k,be,ve,Vt,ie,zt});var Yt=l((us,Zt)=>{"use strict";var Nr=require("os"),Or=Jt(),Gr=1e3*5,kr=(e,t="SIGTERM",n={})=>{let r=e(t);return Lr(e,t,n,r),r},Lr=(e,t,n,r)=>{if(!jr(t,n,r))return;let i=Ur(n),s=setTimeout(()=>{e("SIGKILL")},i);s.unref&&s.unref()},jr=(e,{forceKillAfterTimeout:t},n)=>Br(e)&&t!==!1&&n,Br=e=>e===Nr.constants.signals.SIGTERM||typeof e=="string"&&e.toUpperCase()==="SIGTERM",Ur=({forceKillAfterTimeout:e=!0})=>{if(e===!0)return Gr;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e},Hr=(e,t)=>{e.kill()&&(t.isCanceled=!0)},Wr=(e,t,n)=>{e.kill(t),n(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))},qr=(e,{timeout:t,killSignal:n="SIGTERM"},r)=>{if(t===0||t===void 0)return r;let i,s=new Promise((a,p)=>{i=setTimeout(()=>{Wr(e,n,p)},t)}),o=r.finally(()=>{clearTimeout(i)});return Promise.race([s,o])},Mr=({timeout:e})=>{if(e!==void 0&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)},_r=async(e,{cleanup:t,detached:n},r)=>{if(!t||n)return r;let i=Or(()=>{e.kill()});return r.finally(()=>{i()})};Zt.exports={spawnedKill:kr,spawnedCancel:Hr,setupTimeout:qr,validateTimeout:Mr,setExitHandler:_r}});var en=l((fs,Qt)=>{"use strict";var b=e=>e!==null&&typeof e=="object"&&typeof e.pipe=="function";b.writable=e=>b(e)&&e.writable!==!1&&typeof e._write=="function"&&typeof e._writableState=="object";b.readable=e=>b(e)&&e.readable!==!1&&typeof e._read=="function"&&typeof e._readableState=="object";b.duplex=e=>b.writable(e)&&b.readable(e);b.transform=e=>b.duplex(e)&&typeof e._transform=="function";Qt.exports=b});var nn=l((ms,tn)=>{"use strict";var{PassThrough:Xr}=require("stream");tn.exports=e=>{e={...e};let{array:t}=e,{encoding:n}=e,r=n==="buffer",i=!1;t?i=!(n||r):n=n||"utf8",r&&(n=null);let s=new Xr({objectMode:i});n&&s.setEncoding(n);let o=0,a=[];return s.on("data",p=>{a.push(p),i?o=a.length:o+=p.length}),s.getBufferedValue=()=>t?a:r?Buffer.concat(a,o):a.join(""),s.getBufferedLength=()=>o,s}});var rn=l((hs,q)=>{"use strict";var{constants:Kr}=require("buffer"),Vr=require("stream"),{promisify:zr}=require("util"),Jr=nn(),Zr=zr(Vr.pipeline),se=class extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}};async function Te(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};let{maxBuffer:n}=t,r=Jr(t);return await new Promise((i,s)=>{let o=a=>{a&&r.getBufferedLength()<=Kr.MAX_LENGTH&&(a.bufferedData=r.getBufferedValue()),s(a)};(async()=>{try{await Zr(e,r),i()}catch(a){o(a)}})(),r.on("data",()=>{r.getBufferedLength()>n&&o(new se)})}),r.getBufferedValue()}q.exports=Te;q.exports.buffer=(e,t)=>Te(e,{...t,encoding:"buffer"});q.exports.array=(e,t)=>Te(e,{...t,array:!0});q.exports.MaxBufferError=se});var on=l((gs,sn)=>{"use strict";var{PassThrough:Yr}=require("stream");sn.exports=function(){var e=[],t=new Yr({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=r,t.on("unpipe",i),Array.prototype.slice.call(arguments).forEach(n),t;function n(s){return Array.isArray(s)?(s.forEach(n),this):(e.push(s),s.once("end",i.bind(null,s)),s.once("error",t.emit.bind(t,"error")),s.pipe(t,{end:!1}),this)}function r(){return e.length==0}function i(s){e=e.filter(function(o){return o!==s}),!e.length&&t.readable&&t.end()}}});var pn=l((Ss,ln)=>{"use strict";var cn=en(),an=rn(),Qr=on(),ei=(e,t)=>{t===void 0||e.stdin===void 0||(cn(t)?t.pipe(e.stdin):e.stdin.end(t))},ti=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let n=Qr();return e.stdout&&n.add(e.stdout),e.stderr&&n.add(e.stderr),n},De=async(e,t)=>{if(e){e.destroy();try{return await t}catch(n){return n.bufferedData}}},Fe=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(!(!e||!n))return t?an(e,{encoding:t,maxBuffer:r}):an.buffer(e,{maxBuffer:r})},ni=async({stdout:e,stderr:t,all:n},{encoding:r,buffer:i,maxBuffer:s},o)=>{let a=Fe(e,{encoding:r,buffer:i,maxBuffer:s}),p=Fe(t,{encoding:r,buffer:i,maxBuffer:s}),u=Fe(n,{encoding:r,buffer:i,maxBuffer:s*2});try{return await Promise.all([o,a,p,u])}catch(m){return Promise.all([{error:m,signal:m.signal,timedOut:m.timedOut},De(e,a),De(t,p),De(n,u)])}},ri=({input:e})=>{if(cn(e))throw new TypeError("The `input` option cannot be a stream in sync mode")};ln.exports={handleInput:ei,makeAllStream:ti,getSpawnedResult:ni,validateInputSync:ri}});var un=l((ys,dn)=>{"use strict";var ii=(async()=>{})().constructor.prototype,si=["then","catch","finally"].map(e=>[e,Reflect.getOwnPropertyDescriptor(ii,e)]),oi=(e,t)=>{for(let[n,r]of si){let i=typeof t=="function"?(...s)=>Reflect.apply(r.value,t(),s):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:i})}return e},ai=e=>new Promise((t,n)=>{e.on("exit",(r,i)=>{t({exitCode:r,signal:i})}),e.on("error",r=>{n(r)}),e.stdin&&e.stdin.on("error",r=>{n(r)})});dn.exports={mergePromise:oi,getSpawnedPromise:ai}});var hn=l((ws,mn)=>{"use strict";var fn=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],ci=/^[\w.-]+$/,li=/"/g,pi=e=>typeof e!="string"||ci.test(e)?e:`"${e.replace(li,'\\"')}"`,di=(e,t)=>fn(e,t).join(" "),ui=(e,t)=>fn(e,t).map(n=>pi(n)).join(" "),fi=/ +/g,mi=e=>{let t=[];for(let n of e.trim().split(fi)){let r=t[t.length-1];r&&r.endsWith("\\")?t[t.length-1]=`${r.slice(0,-1)} ${n}`:t.push(n)}return t};mn.exports={joinCommand:di,getEscapedCommand:ui,parseCommand:mi}});var xn=l((Ps,j)=>{"use strict";var hi=require("path"),Ce=require("child_process"),gi=Tt(),Si=Ft(),yi=Et(),wi=Ot(),oe=Wt(),Sn=Mt(),{spawnedKill:Pi,spawnedCancel:Ii,setupTimeout:xi,validateTimeout:bi,setExitHandler:vi}=Yt(),{handleInput:Ti,getSpawnedResult:Di,makeAllStream:Fi,validateInputSync:Ci}=pn(),{mergePromise:gn,getSpawnedPromise:Ri}=un(),{joinCommand:yn,parseCommand:wn,getEscapedCommand:Pn}=hn(),Ei=1e3*1e3*100,$i=({env:e,extendEnv:t,preferLocal:n,localDir:r,execPath:i})=>{let s=t?{...process.env,...e}:e;return n?yi.env({env:s,cwd:r,execPath:i}):s},In=(e,t,n={})=>{let r=gi._parse(e,t,n);return e=r.command,t=r.args,n=r.options,n={maxBuffer:Ei,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:n.cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...n},n.env=$i(n),n.stdio=Sn(n),process.platform==="win32"&&hi.basename(e,".exe")==="cmd"&&t.unshift("/q"),{file:e,args:t,options:n,parsed:r}},M=(e,t,n)=>typeof t!="string"&&!Buffer.isBuffer(t)?n===void 0?void 0:"":e.stripFinalNewline?Si(t):t,ae=(e,t,n)=>{let r=In(e,t,n),i=yn(e,t),s=Pn(e,t);bi(r.options);let o;try{o=Ce.spawn(r.file,r.args,r.options)}catch(P){let I=new Ce.ChildProcess,x=Promise.reject(oe({error:P,stdout:"",stderr:"",all:"",command:i,escapedCommand:s,parsed:r,timedOut:!1,isCanceled:!1,killed:!1}));return gn(I,x)}let a=Ri(o),p=xi(o,r.options,a),u=vi(o,r.options,p),m={isCanceled:!1};o.kill=Pi.bind(null,o.kill.bind(o)),o.cancel=Ii.bind(null,o,m);let g=wi(async()=>{let[{error:P,exitCode:I,signal:x,timedOut:R},X,K,$n]=await Di(o,r.options,u),Oe=M(r.options,X),Ge=M(r.options,K),ke=M(r.options,$n);if(P||I!==0||x!==null){let Le=oe({error:P,exitCode:I,signal:x,stdout:Oe,stderr:Ge,all:ke,command:i,escapedCommand:s,parsed:r,timedOut:R,isCanceled:m.isCanceled,killed:o.killed});if(!r.options.reject)return Le;throw Le}return{command:i,escapedCommand:s,exitCode:0,stdout:Oe,stderr:Ge,all:ke,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}});return Ti(o,r.options.input),o.all=Fi(o,r.options),gn(o,g)};j.exports=ae;j.exports.sync=(e,t,n)=>{let r=In(e,t,n),i=yn(e,t),s=Pn(e,t);Ci(r.options);let o;try{o=Ce.spawnSync(r.file,r.args,r.options)}catch(u){throw oe({error:u,stdout:"",stderr:"",all:"",command:i,escapedCommand:s,parsed:r,timedOut:!1,isCanceled:!1,killed:!1})}let a=M(r.options,o.stdout,o.error),p=M(r.options,o.stderr,o.error);if(o.error||o.status!==0||o.signal!==null){let u=oe({stdout:a,stderr:p,error:o.error,signal:o.signal,exitCode:o.status,command:i,escapedCommand:s,parsed:r,timedOut:o.error&&o.error.code==="ETIMEDOUT",isCanceled:!1,killed:o.signal!==null});if(!r.options.reject)return u;throw u}return{command:i,escapedCommand:s,exitCode:0,stdout:a,stderr:p,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}};j.exports.command=(e,t)=>{let[n,...r]=wn(e);return ae(n,r,t)};j.exports.commandSync=(e,t)=>{let[n,...r]=wn(e);return ae.sync(n,r,t)};j.exports.node=(e,t,n={})=>{t&&!Array.isArray(t)&&typeof t=="object"&&(n=t,t=[]);let r=Sn.node(n),i=process.execArgv.filter(a=>!a.startsWith("--inspect")),{nodePath:s=process.execPath,nodeOptions:o=i}=n;return ae(s,[...o,e,...Array.isArray(t)?t:[]],{...n,stdin:void 0,stdout:void 0,stderr:void 0,stdio:r,shell:!1})}});var ji={};Ln(ji,{default:()=>En});module.exports=jn(ji);var w=require("@raycast/api");var T=require("child_process"),Ae=E(require("path"));var B=require("child_process"),v=E(require("fs")),y=E(require("os")),c=E(require("path"));var Re=E(require("node:process"),1),Ee=E(xn(),1);async function C(e,{humanReadableOutput:t=!0}={}){if(Re.default.platform!=="darwin")throw new Error("macOS only");let n=t?[]:["-ss"],{stdout:r}=await(0,Ee.default)("osascript",["-e",e,n]);return r}function _(e,{humanReadableOutput:t=!0}={}){if(Re.default.platform!=="darwin")throw new Error("macOS only");let n=t?[]:["-ss"],{stdout:r}=Ee.default.sync("osascript",["-e",e,...n]);return r}var d=require("@raycast/api");var bn=async()=>C(`use framework "AppKit"
      use framework "PDFKit"
      
      set pb to current application's NSPasteboard's generalPasteboard()
      set theItems to pb's readObjectsForClasses:({current application's NSURL, current application's NSImage, current application's NSAttributedString}) options:{}
      
      set theImages to {}
      repeat with i from 0 to ((theItems's |count|()) - 1)
        set theItem to (theItems's objectAtIndex:i)
        if (theItem's |class|()) is current application's NSImage then
          copy theItem to end of theImages
        else if (theItem's |class|()) is current application's NSURL then
          if (theItem's absoluteString() as text) ends with ".pdf" then
            set theImage to (current application's PDFDocument's alloc()'s initWithURL:theItem)
          else
            set theImage to (current application's NSImage's alloc()'s initWithContentsOfURL:theItem)
          end if
          if theImage is not missing value then
            copy theImage to end of theImages
          end if
        else if (theItem's |class|()) is current application's NSConcreteAttributedString then
          repeat with i from 0 to ((theItem's |length|()) - 1)
            set attrs to (theItem's attributesAtIndex:i longestEffectiveRange:(missing value) inRange:{i, (theItem's |length|()) - i})
            set theAttachment to (attrs's objectForKey:"NSAttachment")
            if theAttachment is not missing value then
              set cell to theAttachment's attachmentCell()
              set theImage to cell's image()
              copy theImage to end of theImages
            end if
          end repeat
        end if
      end repeat
      
      set tempDir to current application's NSTemporaryDirectory() as text
      set filePaths to {}
      repeat with i from 1 to count theImages
        set theImage to item i of theImages
        set theFile to tempDir & "clipboardImage_" & i
        if theImage's |class|() is current application's PDFDocument then
          set theFile to theFile & ".pdf"
          (theImage's writeToFile:theFile)
        else
          set theFile to theFile & ".png"
          set theTIFFData to theImage's TIFFRepresentation()
          set theBitmap to (current application's NSBitmapImageRep's alloc()'s initWithData:theTIFFData)
          set thePNGData to (theBitmap's representationUsingType:(current application's NSBitmapImageFileTypePNG) |properties|:(current application's NSDictionary's alloc()'s init()))
          (thePNGData's writeToFile:theFile atomically:false)
        end if
        copy theFile to end of filePaths
      end repeat
      
      return filePaths`),vn=async e=>{let t=Array.isArray(e)?e:[e];await C(`use framework "Foundation"
      use framework "PDFKit"
      use scripting additions
  
      set thePasteboard to current application's NSPasteboard's generalPasteboard()
      thePasteboard's clearContents()
      
      -- Handle PDFs separately
      set pdfPaths to {"${t.filter(n=>n.endsWith(".pdf")).join('", "')}"}
  
      set pdfItems to current application's NSMutableArray's alloc()'s init()
      repeat with pdfPath in pdfPaths
        if length of pdfPath is not 0 then
          set pdfItem to current application's NSPasteboardItem's alloc()'s init()
          set pdfData to current application's NSData's dataWithContentsOfFile:pdfPath
          pdfItem's setData:pdfData forType:(current application's NSPasteboardTypePDF)
          pdfItems's addObject:pdfItem
        end if
      end repeat
  
      if pdfItems's |count|() > 0 then
        thePasteboard's writeObjects:pdfItems
      end if
        
      -- Handle all other image types
      set theFiles to {"${t.join('", "')}"}
    
      set theImages to {}
      repeat with theFile in theFiles
        if length of theFile is not 0 then
          set theImage to (current application's NSImage's alloc()'s initWithContentsOfFile:theFile)
          if theImage is not missing value then
            copy theImage to end of theImages
          end if
        end if
      end repeat
      
      if (count theImages) > 0 then
        thePasteboard's writeObjects:theImages
      end if`)};var Ai=async()=>C(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

    tell application "Finder"
      set theSelection to selection
      if theSelection is {} then
        return
      else if (theSelection count) is equal to 1 then
        repeat with imageType in imageTypes
          if (kind of the first item of theSelection) contains imageType then
            return the POSIX path of (theSelection as alias)
            exit repeat
          end if
        end repeat
      else
        set thePaths to {}
        repeat with i from 1 to (theSelection count)
          repeat with imageType in imageTypes
            if (kind of (item i of theSelection)) contains imageType then
              copy (POSIX path of (item i of theSelection as alias)) to end of thePaths
              exit repeat
            end if
          end repeat
        end repeat
        return thePaths
      end if
    end tell`),Ni=async()=>C(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

    tell application "Path Finder"
      set theSelection to selection
      if theSelection is {} then
        return
      else if (theSelection count) is equal to 1 then
        repeat with imageType in imageTypes
          if (kind of the first item of theSelection) contains imageType then
            return the POSIX path of first item of theSelection
            exit repeat
          end if
        end repeat
      else
        set thePaths to {}
        repeat with i from 1 to (theSelection count)
          repeat with imageType in imageTypes
            if (kind of (item i of theSelection)) contains imageType then
              copy (POSIX path of (item i of theSelection)) to end of thePaths
              exit repeat
            end if
          end repeat
        end repeat
        return thePaths
      end if
    end tell`),Dn=async()=>{let t=(await d.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let n of t)v.existsSync(n)&&await v.promises.rm(n);await d.LocalStorage.removeItem("itemsToRemove")},Fn=async()=>{let e=[],n=(0,d.getPreferenceValues)().inputMethod,r=!1;if(n=="Clipboard")try{let o=(await bn()).split(", ");if(await d.LocalStorage.setItem("itemsToRemove",o.join(", ")),o.filter(a=>a.trim().length>0).length>0)return o}catch{console.error("Couldn't get images from clipboard"),r=!0}let i=n;try{i=(await(0,d.getFrontmostApplication)()).name}catch{console.error("Couldn't get frontmost application")}try{if(i=="Path Finder"&&n=="Path Finder")return(await Ni()).split(", ").forEach(a=>{e.includes(a)||e.push(a)}),e}catch{console.error("Couldn't get images from Path Finder"),r=!0}let s=(await Ai()).split(", ");return i=="Finder"||n=="Finder"||r?e.push(...s):s.forEach(o=>{o.split("/").at(-2)=="Desktop"&&!e.includes(o)&&e.push(o)}),e},$e=async e=>{let t=(0,d.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await vn(e),Tn(e)):t.imageResultHandling=="openInPreview"&&(console.log(e),await Gi(e),Tn(e))},ce=async(e,t)=>{let n=(0,d.getPreferenceValues)(),r=`${d.environment.supportPath}/tmp.png`,i=t;n.imageResultHandling=="saveToDownloads"?i=c.default.join(y.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(y.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(y.tmpdir(),c.default.basename(i)));let s=2;for(;v.existsSync(i)&&y.tmpdir()!=c.default.dirname(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${s})${c.default.extname(i)}`),s++;return(0,B.execSync)(`chmod +x ${d.environment.assetsPath}/webp/dwebp`),(0,B.execSync)(`chmod +x ${d.environment.assetsPath}/webp/cwebp`),(0,B.execSync)(`${d.environment.assetsPath}/webp/dwebp "${t}" -o "${r}" && ${e} "${r}" && ${d.environment.assetsPath}/webp/cwebp "${r}" -o "${i}" ; rm "${r}"`),i},le=async(e,t)=>{let n=(0,d.getPreferenceValues)(),r=`${d.environment.supportPath}/tmp.bmp`,i=t;n.imageResultHandling=="saveToDownloads"?i=c.default.join(y.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(y.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(y.tmpdir(),c.default.basename(i)));let s=2;for(;v.existsSync(i)&&y.tmpdir()!=c.default.dirname(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${s})${c.default.extname(i)}`),s++;return Oi("BMP",t,r),(0,B.execSync)(`chmod +x ${d.environment.assetsPath}/potrace/potrace`),(0,B.execSync)(`${e} "${r}" && ${d.environment.assetsPath}/potrace/potrace -s --tight -o "${i}" "${r}"; rm "${r}"`),i},Oi=(e,t,n)=>{_(`use framework "Foundation"
  use scripting additions

  -- Load SVG image from file
  set svgFilePath to "${t}"
  set svgData to current application's NSData's alloc()'s initWithContentsOfFile:svgFilePath
  
  -- Create image from SVG data
  set svgImage to current application's NSImage's alloc()'s initWithData:svgData
  
  -- Convert image to PNG data
  set tiffData to svgImage's TIFFRepresentation()
  set theBitmap to current application's NSBitmapImageRep's alloc()'s initWithData:tiffData
  set pngData to theBitmap's representationUsingType:(current application's NSBitmapImageFileType${e}) |properties|:(missing value)
  
  -- Save PNG data to file
  pngData's writeToFile:"${n}" atomically:false`)};var Gi=async e=>{let t=Array.isArray(e)?e:[e],n=t.some(r=>c.default.extname(r)==".svg");await C(`use framework "Foundation"
    use scripting additions
    set pageImages to {${t.map(r=>`current application's NSURL's fileURLWithPath:"${r}"`).join(", ")}}

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()

    ${n?`tell application "Finder"
            set safariPath to POSIX path of ((application file id "com.apple.Safari") as text)
            set safariURL to current application's NSURL's fileURLWithPath:safariPath
          end tell

          workspace's openURLs:pageImages withApplicationAtURL:safariURL configuration:config completionHandler:(missing value)
          
          tell application "Safari"
            set finished to false
            set iter to 0
            repeat while ((count of windows) = 0 or finished is not true) and iter < 10
              delay 0.5
              set iter to iter + 1

              set currentStatus to true
              repeat with doc in (path of documents as list)
                repeat with thePath in {"${t.map(r=>encodeURI(`file://${r}`)).join('", "')}"}
                  if thePath is not in doc then
                    set currentStatus to false
                  end if
                end repeat
              end repeat
              set finished to currentStatus
            end repeat
          end tell
          `:`tell application "Finder"
            set previewPath to POSIX path of ((application file id "com.apple.Preview") as text)
            set previewURL to current application's NSURL's fileURLWithPath:previewPath
          end tell

          workspace's openURLs:pageImages withApplicationAtURL:previewURL configuration:config completionHandler:(missing value)
          
          tell application "Preview"
            set finished to false
            set iter to 0
            repeat while ((count of windows) = 0 or finished is not true) and iter < 10
              delay 0.5
              set iter to iter + 1

              set currentStatus to true
              repeat with doc in (path of documents as list)
                repeat with thePath in {"${t.join('", "')}"}
                  if thePath is not in doc then
                    set currentStatus to false
                  end if
                end repeat
              end repeat
              set finished to currentStatus
            end repeat
          end tell`}`)},Tn=e=>{let t=Array.isArray(e)?e:[e];for(let n of t)v.unlinkSync(n)},ki=()=>_(`use framework "Foundation"
    use scripting additions
    set workspace to current application's NSWorkspace's sharedWorkspace()
    set runningApps to workspace's runningApplications()
    
    set targetApp to missing value
    repeat with theApp in runningApps
      if theApp's ownsMenuBar() then
        set targetApp to theApp
        exit repeat
      end if
    end repeat
    
    if targetApp is missing value then
      return "Finder"
    else
      return targetApp's localizedName() as text
    end if`),Li=()=>{let e="Finder";try{e=ki()}catch{console.error("Couldn't get frontmost application")}try{if(e=="Path Finder")return _(`tell application "Path Finder"
          if 1 \u2264 (count finder windows) then
            get POSIX path of (target of finder window 1)
          else
            get POSIX path of desktop
          end if
        end tell`)}catch{console.error("Couldn't get current directory of Path Finder")}return _(`tell application "Finder"
      if 1 <= (count Finder windows) then
        get POSIX path of (target of window 1 as alias)
      else
        get POSIX path of (desktop as alias)
      end if
    end tell`)},Cn=(e,t=!1)=>{let n=(0,d.getPreferenceValues)();return e.map(r=>{let i=r;if(n.imageResultHandling=="saveToDownloads"?i=c.default.join(y.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(y.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="saveInContainingFolder"||n.imageResultHandling=="replaceOriginal")&&(n.inputMethod=="Clipboard"||t)?i=c.default.join(Li(),c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(y.tmpdir(),c.default.basename(i))),n.imageResultHandling!="replaceOriginal"&&y.tmpdir()!=c.default.dirname(i)){let s=2;for(;v.existsSync(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${s})${c.default.extname(i)}`),s++}return i})},Rn=async(e,t,n)=>{console.error(t),n?(n.title=e,n.message=t.message,n.style=d.Toast.Style.Failure,n.primaryAction={title:"Copy Error",onAction:async()=>{await d.Clipboard.copy(t.message)}}):n=await(0,d.showToast)({title:e,message:t.message,style:d.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await d.Clipboard.copy(t.message)}}})};async function Ne(e,t,n){let r='"'+e.join('" "')+'"',i=Cn(e);if(r.toLocaleLowerCase().includes("webp")||r.toLocaleLowerCase().includes("svg")){let s=[];for(let o of e)if(o.toLowerCase().endsWith(".webp"))t!=-1&&n==-1?s.push(await ce(`sips --resampleWidth ${t}`,o)):t==-1&&n!=-1?s.push(await ce(`sips --resampleHeight ${n}`,o)):s.push(await ce(`sips --resampleHeightWidth ${n} ${t}`,o));else if(o.toLowerCase().endsWith(".svg"))t!=-1&&n==-1?s.push(await le(`sips --resampleWidth ${t}`,o)):t==-1&&n!=-1?s.push(await le(`sips --resampleHeight ${n}`,o)):s.push(await le(`sips --resampleHeightWidth ${n} ${t}`,o));else{let a=i[e.indexOf(o)];s.push(a),t!=-1&&n==-1?(0,T.execSync)(`sips --resampleWidth ${t} -o "${a}" "${o}"`):t==-1&&n!=-1?(0,T.execSync)(`sips --resampleHeight ${n} -o "${a}" "${o}"`):(0,T.execSync)(`sips --resampleHeightWidth ${n} -o "${a}" ${t} "${o}"`)}await $e(s)}else{let s=i.length==1?i[0]:Ae.default.join(Ae.default.dirname(i[0]),"resized");i.length>1&&(0,T.execSync)(`mkdir -p "${s}"`),t!=-1&&n==-1?(0,T.execSync)(`sips --resampleWidth ${t} -o "${s}" ${r}`):t==-1&&n!=-1?(0,T.execSync)(`sips --resampleHeight ${n} -o "${s}" ${r}`):(0,T.execSync)(`sips --resampleHeightWidth ${n} ${t} -o "${s}" ${r}`),await $e(i)}}async function En(e){let{width:t,height:n}=e.arguments;if(t==""&&n==""){await(0,w.showToast)({title:"Must specify either width or height",style:w.Toast.Style.Failure});return}let r=t==""?-1:parseInt(t),i=n==""?-1:parseInt(n);if(isNaN(r)){await(0,w.showToast)({title:"Width must be an integer",style:w.Toast.Style.Failure});return}else if(isNaN(i)){await(0,w.showToast)({title:"Height must be an integer",style:w.Toast.Style.Failure});return}let s=await Fn();if(s.length===0||s.length===1&&s[0]===""){await(0,w.showToast)({title:"No images selected",style:w.Toast.Style.Failure});return}let o=await(0,w.showToast)({title:"Resizing in progress...",style:w.Toast.Style.Animated});if(s){let a=`image${s.length===1?"":"s"}`;try{await Ne(s,r,i),o.title=`Resized ${s.length.toString()} ${a}`,o.style=w.Toast.Style.Success}catch(p){await Rn(`Failed to resize ${s.length.toString()} ${a}`,p,o)}finally{await Dn()}}}
