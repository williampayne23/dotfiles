"use strict";var An=Object.create;var K=Object.defineProperty;var Nn=Object.getOwnPropertyDescriptor;var $n=Object.getOwnPropertyNames;var On=Object.getPrototypeOf,Gn=Object.prototype.hasOwnProperty;var l=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),kn=(e,t)=>{for(var n in t)K(e,n,{get:t[n],enumerable:!0})},Oe=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of $n(t))!Gn.call(e,i)&&i!==n&&K(e,i,{get:()=>t[i],enumerable:!(r=Nn(t,i))||r.enumerable});return e};var j=(e,t,n)=>(n=e!=null?An(On(e)):{},Oe(t||!e||!e.__esModule?K(n,"default",{value:e,enumerable:!0}):n,e)),Ln=e=>Oe(K({},"__esModule",{value:!0}),e);var Be=l((Bi,je)=>{je.exports=Le;Le.sync=Bn;var Ge=require("fs");function jn(e,t){var n=t.pathExt!==void 0?t.pathExt:process.env.PATHEXT;if(!n||(n=n.split(";"),n.indexOf("")!==-1))return!0;for(var r=0;r<n.length;r++){var i=n[r].toLowerCase();if(i&&e.substr(-i.length).toLowerCase()===i)return!0}return!1}function ke(e,t,n){return!e.isSymbolicLink()&&!e.isFile()?!1:jn(t,n)}function Le(e,t,n){Ge.stat(e,function(r,i){n(r,r?!1:ke(i,e,t))})}function Bn(e,t){return ke(Ge.statSync(e),e,t)}});var We=l((Ui,Me)=>{Me.exports=qe;qe.sync=Un;var Ue=require("fs");function qe(e,t,n){Ue.stat(e,function(r,i){n(r,r?!1:He(i,t))})}function Un(e,t){return He(Ue.statSync(e),t)}function He(e,t){return e.isFile()&&qn(e,t)}function qn(e,t){var n=e.mode,r=e.uid,i=e.gid,s=t.uid!==void 0?t.uid:process.getuid&&process.getuid(),o=t.gid!==void 0?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),p=parseInt("010",8),u=parseInt("001",8),m=a|p,S=n&u||n&p&&i===o||n&a&&r===s||n&m&&s===0;return S}});var Xe=l((Hi,_e)=>{var qi=require("fs"),V;process.platform==="win32"||global.TESTING_WINDOWS?V=Be():V=We();_e.exports=ae;ae.sync=Hn;function ae(e,t,n){if(typeof t=="function"&&(n=t,t={}),!n){if(typeof Promise!="function")throw new TypeError("callback not provided");return new Promise(function(r,i){ae(e,t||{},function(s,o){s?i(s):r(o)})})}V(e,t||{},function(r,i){r&&(r.code==="EACCES"||t&&t.ignoreErrors)&&(r=null,i=!1),n(r,i)})}function Hn(e,t){try{return V.sync(e,t||{})}catch(n){if(t&&t.ignoreErrors||n.code==="EACCES")return!1;throw n}}});var Qe=l((Mi,Ye)=>{var R=process.platform==="win32"||process.env.OSTYPE==="cygwin"||process.env.OSTYPE==="msys",Ke=require("path"),Mn=R?";":":",Ve=Xe(),ze=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"}),Je=(e,t)=>{let n=t.colon||Mn,r=e.match(/\//)||R&&e.match(/\\/)?[""]:[...R?[process.cwd()]:[],...(t.path||process.env.PATH||"").split(n)],i=R?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",s=R?i.split(n):[""];return R&&e.indexOf(".")!==-1&&s[0]!==""&&s.unshift(""),{pathEnv:r,pathExt:s,pathExtExe:i}},Ze=(e,t,n)=>{typeof t=="function"&&(n=t,t={}),t||(t={});let{pathEnv:r,pathExt:i,pathExtExe:s}=Je(e,t),o=[],a=u=>new Promise((m,S)=>{if(u===r.length)return t.all&&o.length?m(o):S(ze(e));let g=r[u],w=/^".*"$/.test(g)?g.slice(1,-1):g,P=Ke.join(w,e),I=!w&&/^\.[\\\/]/.test(e)?e.slice(0,2)+P:P;m(p(I,u,0))}),p=(u,m,S)=>new Promise((g,w)=>{if(S===i.length)return g(a(m+1));let P=i[S];Ve(u+P,{pathExt:s},(I,C)=>{if(!I&&C)if(t.all)o.push(u+P);else return g(u+P);return g(p(u,m,S+1))})});return n?a(0).then(u=>n(null,u),n):a(0)},Wn=(e,t)=>{t=t||{};let{pathEnv:n,pathExt:r,pathExtExe:i}=Je(e,t),s=[];for(let o=0;o<n.length;o++){let a=n[o],p=/^".*"$/.test(a)?a.slice(1,-1):a,u=Ke.join(p,e),m=!p&&/^\.[\\\/]/.test(e)?e.slice(0,2)+u:u;for(let S=0;S<r.length;S++){let g=m+r[S];try{if(Ve.sync(g,{pathExt:i}))if(t.all)s.push(g);else return g}catch{}}}if(t.all&&s.length)return s;if(t.nothrow)return null;throw ze(e)};Ye.exports=Ze;Ze.sync=Wn});var le=l((Wi,ce)=>{"use strict";var et=(e={})=>{let t=e.env||process.env;return(e.platform||process.platform)!=="win32"?"PATH":Object.keys(t).reverse().find(r=>r.toUpperCase()==="PATH")||"Path"};ce.exports=et;ce.exports.default=et});var it=l((_i,rt)=>{"use strict";var tt=require("path"),_n=Qe(),Xn=le();function nt(e,t){let n=e.options.env||process.env,r=process.cwd(),i=e.options.cwd!=null,s=i&&process.chdir!==void 0&&!process.chdir.disabled;if(s)try{process.chdir(e.options.cwd)}catch{}let o;try{o=_n.sync(e.command,{path:n[Xn({env:n})],pathExt:t?tt.delimiter:void 0})}catch{}finally{s&&process.chdir(r)}return o&&(o=tt.resolve(i?e.options.cwd:"",o)),o}function Kn(e){return nt(e)||nt(e,!0)}rt.exports=Kn});var st=l((Xi,de)=>{"use strict";var pe=/([()\][%!^"`<>&|;, *?])/g;function Vn(e){return e=e.replace(pe,"^$1"),e}function zn(e,t){return e=`${e}`,e=e.replace(/(\\*)"/g,'$1$1\\"'),e=e.replace(/(\\*)$/,"$1$1"),e=`"${e}"`,e=e.replace(pe,"^$1"),t&&(e=e.replace(pe,"^$1")),e}de.exports.command=Vn;de.exports.argument=zn});var at=l((Ki,ot)=>{"use strict";ot.exports=/^#!(.*)/});var lt=l((Vi,ct)=>{"use strict";var Jn=at();ct.exports=(e="")=>{let t=e.match(Jn);if(!t)return null;let[n,r]=t[0].replace(/#! ?/,"").split(" "),i=n.split("/").pop();return i==="env"?r:r?`${i} ${r}`:i}});var dt=l((zi,pt)=>{"use strict";var ue=require("fs"),Zn=lt();function Yn(e){let n=Buffer.alloc(150),r;try{r=ue.openSync(e,"r"),ue.readSync(r,n,0,150,0),ue.closeSync(r)}catch{}return Zn(n.toString())}pt.exports=Yn});var ht=l((Ji,mt)=>{"use strict";var Qn=require("path"),ut=it(),ft=st(),er=dt(),tr=process.platform==="win32",nr=/\.(?:com|exe)$/i,rr=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function ir(e){e.file=ut(e);let t=e.file&&er(e.file);return t?(e.args.unshift(e.file),e.command=t,ut(e)):e.file}function sr(e){if(!tr)return e;let t=ir(e),n=!nr.test(t);if(e.options.forceShell||n){let r=rr.test(t);e.command=Qn.normalize(e.command),e.command=ft.command(e.command),e.args=e.args.map(s=>ft.argument(s,r));let i=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${i}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}function or(e,t,n){t&&!Array.isArray(t)&&(n=t,t=null),t=t?t.slice(0):[],n=Object.assign({},n);let r={command:e,args:t,options:n,file:void 0,original:{command:e,args:t}};return n.shell?r:sr(r)}mt.exports=or});var yt=l((Zi,St)=>{"use strict";var fe=process.platform==="win32";function me(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function ar(e,t){if(!fe)return;let n=e.emit;e.emit=function(r,i){if(r==="exit"){let s=gt(i,t,"spawn");if(s)return n.call(e,"error",s)}return n.apply(e,arguments)}}function gt(e,t){return fe&&e===1&&!t.file?me(t.original,"spawn"):null}function cr(e,t){return fe&&e===1&&!t.file?me(t.original,"spawnSync"):null}St.exports={hookChildProcess:ar,verifyENOENT:gt,verifyENOENTSync:cr,notFoundError:me}});var It=l((Yi,E)=>{"use strict";var wt=require("child_process"),he=ht(),ge=yt();function Pt(e,t,n){let r=he(e,t,n),i=wt.spawn(r.command,r.args,r.options);return ge.hookChildProcess(i,r),i}function lr(e,t,n){let r=he(e,t,n),i=wt.spawnSync(r.command,r.args,r.options);return i.error=i.error||ge.verifyENOENTSync(i.status,r),i}E.exports=Pt;E.exports.spawn=Pt;E.exports.sync=lr;E.exports._parse=he;E.exports._enoent=ge});var bt=l((Qi,xt)=>{"use strict";xt.exports=e=>{let t=typeof e=="string"?`
`:`
`.charCodeAt(),n=typeof e=="string"?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===n&&(e=e.slice(0,e.length-1)),e}});var Dt=l((es,U)=>{"use strict";var B=require("path"),vt=le(),Tt=e=>{e={cwd:process.cwd(),path:process.env[vt()],execPath:process.execPath,...e};let t,n=B.resolve(e.cwd),r=[];for(;t!==n;)r.push(B.join(n,"node_modules/.bin")),t=n,n=B.resolve(n,"..");let i=B.resolve(e.cwd,e.execPath,"..");return r.push(i),r.concat(e.path).join(B.delimiter)};U.exports=Tt;U.exports.default=Tt;U.exports.env=e=>{e={env:process.env,...e};let t={...e.env},n=vt({env:t});return e.path=t[n],t[n]=U.exports(e),t}});var Ct=l((ts,Se)=>{"use strict";var Ft=(e,t)=>{for(let n of Reflect.ownKeys(t))Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e};Se.exports=Ft;Se.exports.default=Ft});var Et=l((ns,J)=>{"use strict";var pr=Ct(),z=new WeakMap,Rt=(e,t={})=>{if(typeof e!="function")throw new TypeError("Expected a function");let n,r=0,i=e.displayName||e.name||"<anonymous>",s=function(...o){if(z.set(s,++r),r===1)n=e.apply(this,o),e=null;else if(t.throw===!0)throw new Error(`Function \`${i}\` can only be called once`);return n};return pr(s,e),z.set(s,r),s};J.exports=Rt;J.exports.default=Rt;J.exports.callCount=e=>{if(!z.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return z.get(e)}});var At=l(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.SIGNALS=void 0;var dr=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];Z.SIGNALS=dr});var ye=l(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.SIGRTMAX=A.getRealtimeSignals=void 0;var ur=function(){let e=$t-Nt+1;return Array.from({length:e},fr)};A.getRealtimeSignals=ur;var fr=function(e,t){return{name:`SIGRT${t+1}`,number:Nt+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},Nt=34,$t=64;A.SIGRTMAX=$t});var Ot=l(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.getSignals=void 0;var mr=require("os"),hr=At(),gr=ye(),Sr=function(){let e=(0,gr.getRealtimeSignals)();return[...hr.SIGNALS,...e].map(yr)};Y.getSignals=Sr;var yr=function({name:e,number:t,description:n,action:r,forced:i=!1,standard:s}){let{signals:{[e]:o}}=mr.constants,a=o!==void 0;return{name:e,number:a?o:t,description:n,supported:a,action:r,forced:i,standard:s}}});var kt=l(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.signalsByNumber=N.signalsByName=void 0;var wr=require("os"),Gt=Ot(),Pr=ye(),Ir=function(){return(0,Gt.getSignals)().reduce(xr,{})},xr=function(e,{name:t,number:n,description:r,supported:i,action:s,forced:o,standard:a}){return{...e,[t]:{name:t,number:n,description:r,supported:i,action:s,forced:o,standard:a}}},br=Ir();N.signalsByName=br;var vr=function(){let e=(0,Gt.getSignals)(),t=Pr.SIGRTMAX+1,n=Array.from({length:t},(r,i)=>Tr(i,e));return Object.assign({},...n)},Tr=function(e,t){let n=Dr(e,t);if(n===void 0)return{};let{name:r,description:i,supported:s,action:o,forced:a,standard:p}=n;return{[e]:{name:r,number:e,description:i,supported:s,action:o,forced:a,standard:p}}},Dr=function(e,t){let n=t.find(({name:r})=>wr.constants.signals[r]===e);return n!==void 0?n:t.find(r=>r.number===e)},Fr=vr();N.signalsByNumber=Fr});var jt=l((as,Lt)=>{"use strict";var{signalsByName:Cr}=kt(),Rr=({timedOut:e,timeout:t,errorCode:n,signal:r,signalDescription:i,exitCode:s,isCanceled:o})=>e?`timed out after ${t} milliseconds`:o?"was canceled":n!==void 0?`failed with ${n}`:r!==void 0?`was killed with ${r} (${i})`:s!==void 0?`failed with exit code ${s}`:"failed",Er=({stdout:e,stderr:t,all:n,error:r,signal:i,exitCode:s,command:o,escapedCommand:a,timedOut:p,isCanceled:u,killed:m,parsed:{options:{timeout:S}}})=>{s=s===null?void 0:s,i=i===null?void 0:i;let g=i===void 0?void 0:Cr[i].description,w=r&&r.code,I=`Command ${Rr({timedOut:p,timeout:S,errorCode:w,signal:i,signalDescription:g,exitCode:s,isCanceled:u})}: ${o}`,C=Object.prototype.toString.call(r)==="[object Error]",_=C?`${I}
${r.message}`:I,X=[_,t,e].filter(Boolean).join(`
`);return C?(r.originalMessage=r.message,r.message=X):r=new Error(X),r.shortMessage=_,r.command=o,r.escapedCommand=a,r.exitCode=s,r.signal=i,r.signalDescription=g,r.stdout=e,r.stderr=t,n!==void 0&&(r.all=n),"bufferedData"in r&&delete r.bufferedData,r.failed=!0,r.timedOut=!!p,r.isCanceled=u,r.killed=m&&!p,r};Lt.exports=Er});var Ut=l((cs,we)=>{"use strict";var Q=["stdin","stdout","stderr"],Ar=e=>Q.some(t=>e[t]!==void 0),Bt=e=>{if(!e)return;let{stdio:t}=e;if(t===void 0)return Q.map(r=>e[r]);if(Ar(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${Q.map(r=>`\`${r}\``).join(", ")}`);if(typeof t=="string")return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let n=Math.max(t.length,Q.length);return Array.from({length:n},(r,i)=>t[i])};we.exports=Bt;we.exports.node=e=>{let t=Bt(e);return t==="ipc"?"ipc":t===void 0||typeof t=="string"?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]}});var qt=l((ls,ee)=>{ee.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"];process.platform!=="win32"&&ee.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT");process.platform==="linux"&&ee.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")});var Xt=l((ps,G)=>{var f=global.process,T=function(e){return e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function"};T(f)?(Ht=require("assert"),$=qt(),Mt=/^win/i.test(f.platform),q=require("events"),typeof q!="function"&&(q=q.EventEmitter),f.__signal_exit_emitter__?h=f.__signal_exit_emitter__:(h=f.__signal_exit_emitter__=new q,h.count=0,h.emitted={}),h.infinite||(h.setMaxListeners(1/0),h.infinite=!0),G.exports=function(e,t){if(!T(global.process))return function(){};Ht.equal(typeof e,"function","a callback must be provided for exit handler"),O===!1&&Pe();var n="exit";t&&t.alwaysLast&&(n="afterexit");var r=function(){h.removeListener(n,e),h.listeners("exit").length===0&&h.listeners("afterexit").length===0&&te()};return h.on(n,e),r},te=function(){!O||!T(global.process)||(O=!1,$.forEach(function(t){try{f.removeListener(t,ne[t])}catch{}}),f.emit=re,f.reallyExit=Ie,h.count-=1)},G.exports.unload=te,D=function(t,n,r){h.emitted[t]||(h.emitted[t]=!0,h.emit(t,n,r))},ne={},$.forEach(function(e){ne[e]=function(){if(T(global.process)){var n=f.listeners(e);n.length===h.count&&(te(),D("exit",null,e),D("afterexit",null,e),Mt&&e==="SIGHUP"&&(e="SIGINT"),f.kill(f.pid,e))}}}),G.exports.signals=function(){return $},O=!1,Pe=function(){O||!T(global.process)||(O=!0,h.count+=1,$=$.filter(function(t){try{return f.on(t,ne[t]),!0}catch{return!1}}),f.emit=_t,f.reallyExit=Wt)},G.exports.load=Pe,Ie=f.reallyExit,Wt=function(t){T(global.process)&&(f.exitCode=t||0,D("exit",f.exitCode,null),D("afterexit",f.exitCode,null),Ie.call(f,f.exitCode))},re=f.emit,_t=function(t,n){if(t==="exit"&&T(global.process)){n!==void 0&&(f.exitCode=n);var r=re.apply(this,arguments);return D("exit",f.exitCode,null),D("afterexit",f.exitCode,null),r}else return re.apply(this,arguments)}):G.exports=function(){return function(){}};var Ht,$,Mt,q,h,te,D,ne,O,Pe,Ie,Wt,re,_t});var Vt=l((ds,Kt)=>{"use strict";var Nr=require("os"),$r=Xt(),Or=1e3*5,Gr=(e,t="SIGTERM",n={})=>{let r=e(t);return kr(e,t,n,r),r},kr=(e,t,n,r)=>{if(!Lr(t,n,r))return;let i=Br(n),s=setTimeout(()=>{e("SIGKILL")},i);s.unref&&s.unref()},Lr=(e,{forceKillAfterTimeout:t},n)=>jr(e)&&t!==!1&&n,jr=e=>e===Nr.constants.signals.SIGTERM||typeof e=="string"&&e.toUpperCase()==="SIGTERM",Br=({forceKillAfterTimeout:e=!0})=>{if(e===!0)return Or;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e},Ur=(e,t)=>{e.kill()&&(t.isCanceled=!0)},qr=(e,t,n)=>{e.kill(t),n(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))},Hr=(e,{timeout:t,killSignal:n="SIGTERM"},r)=>{if(t===0||t===void 0)return r;let i,s=new Promise((a,p)=>{i=setTimeout(()=>{qr(e,n,p)},t)}),o=r.finally(()=>{clearTimeout(i)});return Promise.race([s,o])},Mr=({timeout:e})=>{if(e!==void 0&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)},Wr=async(e,{cleanup:t,detached:n},r)=>{if(!t||n)return r;let i=$r(()=>{e.kill()});return r.finally(()=>{i()})};Kt.exports={spawnedKill:Gr,spawnedCancel:Ur,setupTimeout:Hr,validateTimeout:Mr,setExitHandler:Wr}});var Jt=l((us,zt)=>{"use strict";var x=e=>e!==null&&typeof e=="object"&&typeof e.pipe=="function";x.writable=e=>x(e)&&e.writable!==!1&&typeof e._write=="function"&&typeof e._writableState=="object";x.readable=e=>x(e)&&e.readable!==!1&&typeof e._read=="function"&&typeof e._readableState=="object";x.duplex=e=>x.writable(e)&&x.readable(e);x.transform=e=>x.duplex(e)&&typeof e._transform=="function";zt.exports=x});var Yt=l((fs,Zt)=>{"use strict";var{PassThrough:_r}=require("stream");Zt.exports=e=>{e={...e};let{array:t}=e,{encoding:n}=e,r=n==="buffer",i=!1;t?i=!(n||r):n=n||"utf8",r&&(n=null);let s=new _r({objectMode:i});n&&s.setEncoding(n);let o=0,a=[];return s.on("data",p=>{a.push(p),i?o=a.length:o+=p.length}),s.getBufferedValue=()=>t?a:r?Buffer.concat(a,o):a.join(""),s.getBufferedLength=()=>o,s}});var Qt=l((ms,H)=>{"use strict";var{constants:Xr}=require("buffer"),Kr=require("stream"),{promisify:Vr}=require("util"),zr=Yt(),Jr=Vr(Kr.pipeline),ie=class extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}};async function xe(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};let{maxBuffer:n}=t,r=zr(t);return await new Promise((i,s)=>{let o=a=>{a&&r.getBufferedLength()<=Xr.MAX_LENGTH&&(a.bufferedData=r.getBufferedValue()),s(a)};(async()=>{try{await Jr(e,r),i()}catch(a){o(a)}})(),r.on("data",()=>{r.getBufferedLength()>n&&o(new ie)})}),r.getBufferedValue()}H.exports=xe;H.exports.buffer=(e,t)=>xe(e,{...t,encoding:"buffer"});H.exports.array=(e,t)=>xe(e,{...t,array:!0});H.exports.MaxBufferError=ie});var tn=l((hs,en)=>{"use strict";var{PassThrough:Zr}=require("stream");en.exports=function(){var e=[],t=new Zr({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=r,t.on("unpipe",i),Array.prototype.slice.call(arguments).forEach(n),t;function n(s){return Array.isArray(s)?(s.forEach(n),this):(e.push(s),s.once("end",i.bind(null,s)),s.once("error",t.emit.bind(t,"error")),s.pipe(t,{end:!1}),this)}function r(){return e.length==0}function i(s){e=e.filter(function(o){return o!==s}),!e.length&&t.readable&&t.end()}}});var on=l((gs,sn)=>{"use strict";var rn=Jt(),nn=Qt(),Yr=tn(),Qr=(e,t)=>{t===void 0||e.stdin===void 0||(rn(t)?t.pipe(e.stdin):e.stdin.end(t))},ei=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let n=Yr();return e.stdout&&n.add(e.stdout),e.stderr&&n.add(e.stderr),n},be=async(e,t)=>{if(e){e.destroy();try{return await t}catch(n){return n.bufferedData}}},ve=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(!(!e||!n))return t?nn(e,{encoding:t,maxBuffer:r}):nn.buffer(e,{maxBuffer:r})},ti=async({stdout:e,stderr:t,all:n},{encoding:r,buffer:i,maxBuffer:s},o)=>{let a=ve(e,{encoding:r,buffer:i,maxBuffer:s}),p=ve(t,{encoding:r,buffer:i,maxBuffer:s}),u=ve(n,{encoding:r,buffer:i,maxBuffer:s*2});try{return await Promise.all([o,a,p,u])}catch(m){return Promise.all([{error:m,signal:m.signal,timedOut:m.timedOut},be(e,a),be(t,p),be(n,u)])}},ni=({input:e})=>{if(rn(e))throw new TypeError("The `input` option cannot be a stream in sync mode")};sn.exports={handleInput:Qr,makeAllStream:ei,getSpawnedResult:ti,validateInputSync:ni}});var cn=l((Ss,an)=>{"use strict";var ri=(async()=>{})().constructor.prototype,ii=["then","catch","finally"].map(e=>[e,Reflect.getOwnPropertyDescriptor(ri,e)]),si=(e,t)=>{for(let[n,r]of ii){let i=typeof t=="function"?(...s)=>Reflect.apply(r.value,t(),s):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:i})}return e},oi=e=>new Promise((t,n)=>{e.on("exit",(r,i)=>{t({exitCode:r,signal:i})}),e.on("error",r=>{n(r)}),e.stdin&&e.stdin.on("error",r=>{n(r)})});an.exports={mergePromise:si,getSpawnedPromise:oi}});var dn=l((ys,pn)=>{"use strict";var ln=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],ai=/^[\w.-]+$/,ci=/"/g,li=e=>typeof e!="string"||ai.test(e)?e:`"${e.replace(ci,'\\"')}"`,pi=(e,t)=>ln(e,t).join(" "),di=(e,t)=>ln(e,t).map(n=>li(n)).join(" "),ui=/ +/g,fi=e=>{let t=[];for(let n of e.trim().split(ui)){let r=t[t.length-1];r&&r.endsWith("\\")?t[t.length-1]=`${r.slice(0,-1)} ${n}`:t.push(n)}return t};pn.exports={joinCommand:pi,getEscapedCommand:di,parseCommand:fi}});var yn=l((ws,k)=>{"use strict";var mi=require("path"),Te=require("child_process"),hi=It(),gi=bt(),Si=Dt(),yi=Et(),se=jt(),fn=Ut(),{spawnedKill:wi,spawnedCancel:Pi,setupTimeout:Ii,validateTimeout:xi,setExitHandler:bi}=Vt(),{handleInput:vi,getSpawnedResult:Ti,makeAllStream:Di,validateInputSync:Fi}=on(),{mergePromise:un,getSpawnedPromise:Ci}=cn(),{joinCommand:mn,parseCommand:hn,getEscapedCommand:gn}=dn(),Ri=1e3*1e3*100,Ei=({env:e,extendEnv:t,preferLocal:n,localDir:r,execPath:i})=>{let s=t?{...process.env,...e}:e;return n?Si.env({env:s,cwd:r,execPath:i}):s},Sn=(e,t,n={})=>{let r=hi._parse(e,t,n);return e=r.command,t=r.args,n=r.options,n={maxBuffer:Ri,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:n.cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...n},n.env=Ei(n),n.stdio=fn(n),process.platform==="win32"&&mi.basename(e,".exe")==="cmd"&&t.unshift("/q"),{file:e,args:t,options:n,parsed:r}},M=(e,t,n)=>typeof t!="string"&&!Buffer.isBuffer(t)?n===void 0?void 0:"":e.stripFinalNewline?gi(t):t,oe=(e,t,n)=>{let r=Sn(e,t,n),i=mn(e,t),s=gn(e,t);xi(r.options);let o;try{o=Te.spawn(r.file,r.args,r.options)}catch(w){let P=new Te.ChildProcess,I=Promise.reject(se({error:w,stdout:"",stderr:"",all:"",command:i,escapedCommand:s,parsed:r,timedOut:!1,isCanceled:!1,killed:!1}));return un(P,I)}let a=Ci(o),p=Ii(o,r.options,a),u=bi(o,r.options,p),m={isCanceled:!1};o.kill=wi.bind(null,o.kill.bind(o)),o.cancel=Pi.bind(null,o,m);let g=yi(async()=>{let[{error:w,exitCode:P,signal:I,timedOut:C},_,X,En]=await Ti(o,r.options,u),Ee=M(r.options,_),Ae=M(r.options,X),Ne=M(r.options,En);if(w||P!==0||I!==null){let $e=se({error:w,exitCode:P,signal:I,stdout:Ee,stderr:Ae,all:Ne,command:i,escapedCommand:s,parsed:r,timedOut:C,isCanceled:m.isCanceled,killed:o.killed});if(!r.options.reject)return $e;throw $e}return{command:i,escapedCommand:s,exitCode:0,stdout:Ee,stderr:Ae,all:Ne,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}});return vi(o,r.options.input),o.all=Di(o,r.options),un(o,g)};k.exports=oe;k.exports.sync=(e,t,n)=>{let r=Sn(e,t,n),i=mn(e,t),s=gn(e,t);Fi(r.options);let o;try{o=Te.spawnSync(r.file,r.args,r.options)}catch(u){throw se({error:u,stdout:"",stderr:"",all:"",command:i,escapedCommand:s,parsed:r,timedOut:!1,isCanceled:!1,killed:!1})}let a=M(r.options,o.stdout,o.error),p=M(r.options,o.stderr,o.error);if(o.error||o.status!==0||o.signal!==null){let u=se({stdout:a,stderr:p,error:o.error,signal:o.signal,exitCode:o.status,command:i,escapedCommand:s,parsed:r,timedOut:o.error&&o.error.code==="ETIMEDOUT",isCanceled:!1,killed:o.signal!==null});if(!r.options.reject)return u;throw u}return{command:i,escapedCommand:s,exitCode:0,stdout:a,stderr:p,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}};k.exports.command=(e,t)=>{let[n,...r]=hn(e);return oe(n,r,t)};k.exports.commandSync=(e,t)=>{let[n,...r]=hn(e);return oe.sync(n,r,t)};k.exports.node=(e,t,n={})=>{t&&!Array.isArray(t)&&typeof t=="object"&&(n=t,t=[]);let r=fn.node(n),i=process.execArgv.filter(a=>!a.startsWith("--inspect")),{nodePath:s=process.execPath,nodeOptions:o=i}=n;return oe(s,[...o,e,...Array.isArray(t)?t:[]],{...n,stdin:void 0,stdout:void 0,stderr:void 0,stdio:r,shell:!1})}});var Li={};kn(Li,{default:()=>Rn});module.exports=Ln(Li);var v=require("@raycast/api");var Ce=require("child_process");var L=require("child_process"),b=j(require("fs")),y=j(require("os")),c=j(require("path"));var De=j(require("node:process"),1),Fe=j(yn(),1);async function F(e,{humanReadableOutput:t=!0}={}){if(De.default.platform!=="darwin")throw new Error("macOS only");let n=t?[]:["-ss"],{stdout:r}=await(0,Fe.default)("osascript",["-e",e,n]);return r}function W(e,{humanReadableOutput:t=!0}={}){if(De.default.platform!=="darwin")throw new Error("macOS only");let n=t?[]:["-ss"],{stdout:r}=Fe.default.sync("osascript",["-e",e,...n]);return r}var d=require("@raycast/api");var wn=async()=>F(`use framework "AppKit"
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
      
      return filePaths`),Pn=async e=>{let t=Array.isArray(e)?e:[e];await F(`use framework "Foundation"
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
      end if`)};var Ai=async()=>F(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

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
    end tell`),Ni=async()=>F(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

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
    end tell`),xn=async()=>{let t=(await d.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let n of t)b.existsSync(n)&&await b.promises.rm(n);await d.LocalStorage.removeItem("itemsToRemove")},bn=async()=>{let e=[],n=(0,d.getPreferenceValues)().inputMethod,r=!1;if(n=="Clipboard")try{let o=(await wn()).split(", ");if(await d.LocalStorage.setItem("itemsToRemove",o.join(", ")),o.filter(a=>a.trim().length>0).length>0)return o}catch{console.error("Couldn't get images from clipboard"),r=!0}let i=n;try{i=(await(0,d.getFrontmostApplication)()).name}catch{console.error("Couldn't get frontmost application")}try{if(i=="Path Finder"&&n=="Path Finder")return(await Ni()).split(", ").forEach(a=>{e.includes(a)||e.push(a)}),e}catch{console.error("Couldn't get images from Path Finder"),r=!0}let s=(await Ai()).split(", ");return i=="Finder"||n=="Finder"||r?e.push(...s):s.forEach(o=>{o.split("/").at(-2)=="Desktop"&&!e.includes(o)&&e.push(o)}),e},vn=async e=>{let t=(0,d.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await Pn(e),In(e)):t.imageResultHandling=="openInPreview"&&(console.log(e),await Oi(e),In(e))},Tn=async(e,t)=>{let n=(0,d.getPreferenceValues)(),r=`${d.environment.supportPath}/tmp.png`,i=t;n.imageResultHandling=="saveToDownloads"?i=c.default.join(y.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(y.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(y.tmpdir(),c.default.basename(i)));let s=2;for(;b.existsSync(i)&&y.tmpdir()!=c.default.dirname(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${s})${c.default.extname(i)}`),s++;return(0,L.execSync)(`chmod +x ${d.environment.assetsPath}/webp/dwebp`),(0,L.execSync)(`chmod +x ${d.environment.assetsPath}/webp/cwebp`),(0,L.execSync)(`${d.environment.assetsPath}/webp/dwebp "${t}" -o "${r}" && ${e} "${r}" && ${d.environment.assetsPath}/webp/cwebp "${r}" -o "${i}" ; rm "${r}"`),i},Dn=async(e,t)=>{let n=(0,d.getPreferenceValues)(),r=`${d.environment.supportPath}/tmp.bmp`,i=t;n.imageResultHandling=="saveToDownloads"?i=c.default.join(y.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(y.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(y.tmpdir(),c.default.basename(i)));let s=2;for(;b.existsSync(i)&&y.tmpdir()!=c.default.dirname(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${s})${c.default.extname(i)}`),s++;return $i("BMP",t,r),(0,L.execSync)(`chmod +x ${d.environment.assetsPath}/potrace/potrace`),(0,L.execSync)(`${e} "${r}" && ${d.environment.assetsPath}/potrace/potrace -s --tight -o "${i}" "${r}"; rm "${r}"`),i},$i=(e,t,n)=>{W(`use framework "Foundation"
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
  pngData's writeToFile:"${n}" atomically:false`)};var Oi=async e=>{let t=Array.isArray(e)?e:[e],n=t.some(r=>c.default.extname(r)==".svg");await F(`use framework "Foundation"
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
          end tell`}`)},In=e=>{let t=Array.isArray(e)?e:[e];for(let n of t)b.unlinkSync(n)},Gi=()=>W(`use framework "Foundation"
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
    end if`),ki=()=>{let e="Finder";try{e=Gi()}catch{console.error("Couldn't get frontmost application")}try{if(e=="Path Finder")return W(`tell application "Path Finder"
          if 1 \u2264 (count finder windows) then
            get POSIX path of (target of finder window 1)
          else
            get POSIX path of desktop
          end if
        end tell`)}catch{console.error("Couldn't get current directory of Path Finder")}return W(`tell application "Finder"
      if 1 <= (count Finder windows) then
        get POSIX path of (target of window 1 as alias)
      else
        get POSIX path of (desktop as alias)
      end if
    end tell`)},Fn=(e,t=!1)=>{let n=(0,d.getPreferenceValues)();return e.map(r=>{let i=r;if(n.imageResultHandling=="saveToDownloads"?i=c.default.join(y.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(y.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="saveInContainingFolder"||n.imageResultHandling=="replaceOriginal")&&(n.inputMethod=="Clipboard"||t)?i=c.default.join(ki(),c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(y.tmpdir(),c.default.basename(i))),n.imageResultHandling!="replaceOriginal"&&y.tmpdir()!=c.default.dirname(i)){let s=2;for(;b.existsSync(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${s})${c.default.extname(i)}`),s++}return i})},Cn=async(e,t,n)=>{console.error(t),n?(n.title=e,n.message=t.message,n.style=d.Toast.Style.Failure,n.primaryAction={title:"Copy Error",onAction:async()=>{await d.Clipboard.copy(t.message)}}):n=await(0,d.showToast)({title:e,message:t.message,style:d.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await d.Clipboard.copy(t.message)}}})};async function Re(e,t){let n=Fn(e),r=[];for(let i of e){let s=(0,Ce.execSync)(`sips -g pixelWidth -g pixelHeight "${i}"`).toString().split(/(: |\n)/g),o=parseInt(s[4]),a=parseInt(s[8]);if(i.toLowerCase().endsWith("webp"))r.push(await Tn(`sips --resampleHeightWidth ${a*t} ${o*t}`,i));else if(i.toLowerCase().endsWith("svg"))r.push(await Dn(`sips --resampleHeightWidth ${a*t} ${o*t}`,i));else{let p=n[e.indexOf(i)];r.push(p),(0,Ce.execSync)(`sips --resampleHeightWidth ${a*t} ${o*t} -o "${p}" "${i}"`)}}await vn(r)}async function Rn(e){let{scaleFactor:t}=e.arguments,n=parseFloat(t);if(isNaN(n)){await(0,v.showToast)({title:"Scale factor must be a number",style:v.Toast.Style.Failure});return}let r=await bn();if(r.length===0||r.length===1&&r[0]===""){await(0,v.showToast)({title:"No images selected",style:v.Toast.Style.Failure});return}let i=await(0,v.showToast)({title:"Scaling in progress...",style:v.Toast.Style.Animated}),s=`image${r.length===1?"":"s"}`;try{await Re(r,n),i.title=`Scaled ${r.length.toString()} ${s}`,i.style=v.Toast.Style.Success}catch(o){await Cn(`Failed to scale ${r.length.toString()} ${s}`,o,i)}finally{await xn()}}
