"use strict";var $n=Object.create;var K=Object.defineProperty;var Gn=Object.getOwnPropertyDescriptor;var kn=Object.getOwnPropertyNames;var Ln=Object.getPrototypeOf,jn=Object.prototype.hasOwnProperty;var l=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Bn=(e,t)=>{for(var n in t)K(e,n,{get:t[n],enumerable:!0})},ke=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of kn(t))!jn.call(e,i)&&i!==n&&K(e,i,{get:()=>t[i],enumerable:!(r=Gn(t,i))||r.enumerable});return e};var R=(e,t,n)=>(n=e!=null?$n(Ln(e)):{},ke(t||!e||!e.__esModule?K(n,"default",{value:e,enumerable:!0}):n,e)),Un=e=>ke(K({},"__esModule",{value:!0}),e);var qe=l((Mi,Ue)=>{Ue.exports=Be;Be.sync=Mn;var Le=require("fs");function qn(e,t){var n=t.pathExt!==void 0?t.pathExt:process.env.PATHEXT;if(!n||(n=n.split(";"),n.indexOf("")!==-1))return!0;for(var r=0;r<n.length;r++){var i=n[r].toLowerCase();if(i&&e.substr(-i.length).toLowerCase()===i)return!0}return!1}function je(e,t,n){return!e.isSymbolicLink()&&!e.isFile()?!1:qn(t,n)}function Be(e,t,n){Le.stat(e,function(r,i){n(r,r?!1:je(i,e,t))})}function Mn(e,t){return je(Le.statSync(e),e,t)}});var Xe=l((Hi,_e)=>{_e.exports=He;He.sync=Hn;var Me=require("fs");function He(e,t,n){Me.stat(e,function(r,i){n(r,r?!1:We(i,t))})}function Hn(e,t){return We(Me.statSync(e),t)}function We(e,t){return e.isFile()&&Wn(e,t)}function Wn(e,t){var n=e.mode,r=e.uid,i=e.gid,o=t.uid!==void 0?t.uid:process.getuid&&process.getuid(),s=t.gid!==void 0?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),d=parseInt("010",8),u=parseInt("001",8),m=a|d,y=n&u||n&d&&i===s||n&a&&r===o||n&m&&o===0;return y}});var Ve=l((_i,Ke)=>{var Wi=require("fs"),V;process.platform==="win32"||global.TESTING_WINDOWS?V=qe():V=Xe();Ke.exports=ce;ce.sync=_n;function ce(e,t,n){if(typeof t=="function"&&(n=t,t={}),!n){if(typeof Promise!="function")throw new TypeError("callback not provided");return new Promise(function(r,i){ce(e,t||{},function(o,s){o?i(o):r(s)})})}V(e,t||{},function(r,i){r&&(r.code==="EACCES"||t&&t.ignoreErrors)&&(r=null,i=!1),n(r,i)})}function _n(e,t){try{return V.sync(e,t||{})}catch(n){if(t&&t.ignoreErrors||n.code==="EACCES")return!1;throw n}}});var tt=l((Xi,et)=>{var E=process.platform==="win32"||process.env.OSTYPE==="cygwin"||process.env.OSTYPE==="msys",ze=require("path"),Xn=E?";":":",Je=Ve(),Ze=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"}),Ye=(e,t)=>{let n=t.colon||Xn,r=e.match(/\//)||E&&e.match(/\\/)?[""]:[...E?[process.cwd()]:[],...(t.path||process.env.PATH||"").split(n)],i=E?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",o=E?i.split(n):[""];return E&&e.indexOf(".")!==-1&&o[0]!==""&&o.unshift(""),{pathEnv:r,pathExt:o,pathExtExe:i}},Qe=(e,t,n)=>{typeof t=="function"&&(n=t,t={}),t||(t={});let{pathEnv:r,pathExt:i,pathExtExe:o}=Ye(e,t),s=[],a=u=>new Promise((m,y)=>{if(u===r.length)return t.all&&s.length?m(s):y(Ze(e));let S=r[u],w=/^".*"$/.test(S)?S.slice(1,-1):S,P=ze.join(w,e),I=!w&&/^\.[\\\/]/.test(e)?e.slice(0,2)+P:P;m(d(I,u,0))}),d=(u,m,y)=>new Promise((S,w)=>{if(y===i.length)return S(a(m+1));let P=i[y];Je(u+P,{pathExt:o},(I,F)=>{if(!I&&F)if(t.all)s.push(u+P);else return S(u+P);return S(d(u,m,y+1))})});return n?a(0).then(u=>n(null,u),n):a(0)},Kn=(e,t)=>{t=t||{};let{pathEnv:n,pathExt:r,pathExtExe:i}=Ye(e,t),o=[];for(let s=0;s<n.length;s++){let a=n[s],d=/^".*"$/.test(a)?a.slice(1,-1):a,u=ze.join(d,e),m=!d&&/^\.[\\\/]/.test(e)?e.slice(0,2)+u:u;for(let y=0;y<r.length;y++){let S=m+r[y];try{if(Je.sync(S,{pathExt:i}))if(t.all)o.push(S);else return S}catch{}}}if(t.all&&o.length)return o;if(t.nothrow)return null;throw Ze(e)};et.exports=Qe;Qe.sync=Kn});var pe=l((Ki,le)=>{"use strict";var nt=(e={})=>{let t=e.env||process.env;return(e.platform||process.platform)!=="win32"?"PATH":Object.keys(t).reverse().find(r=>r.toUpperCase()==="PATH")||"Path"};le.exports=nt;le.exports.default=nt});var st=l((Vi,ot)=>{"use strict";var rt=require("path"),Vn=tt(),zn=pe();function it(e,t){let n=e.options.env||process.env,r=process.cwd(),i=e.options.cwd!=null,o=i&&process.chdir!==void 0&&!process.chdir.disabled;if(o)try{process.chdir(e.options.cwd)}catch{}let s;try{s=Vn.sync(e.command,{path:n[zn({env:n})],pathExt:t?rt.delimiter:void 0})}catch{}finally{o&&process.chdir(r)}return s&&(s=rt.resolve(i?e.options.cwd:"",s)),s}function Jn(e){return it(e)||it(e,!0)}ot.exports=Jn});var at=l((zi,ue)=>{"use strict";var de=/([()\][%!^"`<>&|;, *?])/g;function Zn(e){return e=e.replace(de,"^$1"),e}function Yn(e,t){return e=`${e}`,e=e.replace(/(\\*)"/g,'$1$1\\"'),e=e.replace(/(\\*)$/,"$1$1"),e=`"${e}"`,e=e.replace(de,"^$1"),t&&(e=e.replace(de,"^$1")),e}ue.exports.command=Zn;ue.exports.argument=Yn});var lt=l((Ji,ct)=>{"use strict";ct.exports=/^#!(.*)/});var dt=l((Zi,pt)=>{"use strict";var Qn=lt();pt.exports=(e="")=>{let t=e.match(Qn);if(!t)return null;let[n,r]=t[0].replace(/#! ?/,"").split(" "),i=n.split("/").pop();return i==="env"?r:r?`${i} ${r}`:i}});var ft=l((Yi,ut)=>{"use strict";var fe=require("fs"),er=dt();function tr(e){let n=Buffer.alloc(150),r;try{r=fe.openSync(e,"r"),fe.readSync(r,n,0,150,0),fe.closeSync(r)}catch{}return er(n.toString())}ut.exports=tr});var St=l((Qi,gt)=>{"use strict";var nr=require("path"),mt=st(),ht=at(),rr=ft(),ir=process.platform==="win32",or=/\.(?:com|exe)$/i,sr=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function ar(e){e.file=mt(e);let t=e.file&&rr(e.file);return t?(e.args.unshift(e.file),e.command=t,mt(e)):e.file}function cr(e){if(!ir)return e;let t=ar(e),n=!or.test(t);if(e.options.forceShell||n){let r=sr.test(t);e.command=nr.normalize(e.command),e.command=ht.command(e.command),e.args=e.args.map(o=>ht.argument(o,r));let i=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${i}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}function lr(e,t,n){t&&!Array.isArray(t)&&(n=t,t=null),t=t?t.slice(0):[],n=Object.assign({},n);let r={command:e,args:t,options:n,file:void 0,original:{command:e,args:t}};return n.shell?r:cr(r)}gt.exports=lr});var Pt=l((eo,wt)=>{"use strict";var me=process.platform==="win32";function he(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function pr(e,t){if(!me)return;let n=e.emit;e.emit=function(r,i){if(r==="exit"){let o=yt(i,t,"spawn");if(o)return n.call(e,"error",o)}return n.apply(e,arguments)}}function yt(e,t){return me&&e===1&&!t.file?he(t.original,"spawn"):null}function dr(e,t){return me&&e===1&&!t.file?he(t.original,"spawnSync"):null}wt.exports={hookChildProcess:pr,verifyENOENT:yt,verifyENOENTSync:dr,notFoundError:he}});var bt=l((to,A)=>{"use strict";var It=require("child_process"),ge=St(),Se=Pt();function xt(e,t,n){let r=ge(e,t,n),i=It.spawn(r.command,r.args,r.options);return Se.hookChildProcess(i,r),i}function ur(e,t,n){let r=ge(e,t,n),i=It.spawnSync(r.command,r.args,r.options);return i.error=i.error||Se.verifyENOENTSync(i.status,r),i}A.exports=xt;A.exports.spawn=xt;A.exports.sync=ur;A.exports._parse=ge;A.exports._enoent=Se});var Tt=l((no,vt)=>{"use strict";vt.exports=e=>{let t=typeof e=="string"?`
`:`
`.charCodeAt(),n=typeof e=="string"?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===n&&(e=e.slice(0,e.length-1)),e}});var Ft=l((ro,q)=>{"use strict";var U=require("path"),Dt=pe(),Ct=e=>{e={cwd:process.cwd(),path:process.env[Dt()],execPath:process.execPath,...e};let t,n=U.resolve(e.cwd),r=[];for(;t!==n;)r.push(U.join(n,"node_modules/.bin")),t=n,n=U.resolve(n,"..");let i=U.resolve(e.cwd,e.execPath,"..");return r.push(i),r.concat(e.path).join(U.delimiter)};q.exports=Ct;q.exports.default=Ct;q.exports.env=e=>{e={env:process.env,...e};let t={...e.env},n=Dt({env:t});return e.path=t[n],t[n]=q.exports(e),t}});var Et=l((io,ye)=>{"use strict";var Rt=(e,t)=>{for(let n of Reflect.ownKeys(t))Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e};ye.exports=Rt;ye.exports.default=Rt});var Nt=l((oo,J)=>{"use strict";var fr=Et(),z=new WeakMap,At=(e,t={})=>{if(typeof e!="function")throw new TypeError("Expected a function");let n,r=0,i=e.displayName||e.name||"<anonymous>",o=function(...s){if(z.set(o,++r),r===1)n=e.apply(this,s),e=null;else if(t.throw===!0)throw new Error(`Function \`${i}\` can only be called once`);return n};return fr(o,e),z.set(o,r),o};J.exports=At;J.exports.default=At;J.exports.callCount=e=>{if(!z.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return z.get(e)}});var Ot=l(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.SIGNALS=void 0;var mr=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];Z.SIGNALS=mr});var we=l(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.SIGRTMAX=N.getRealtimeSignals=void 0;var hr=function(){let e=Gt-$t+1;return Array.from({length:e},gr)};N.getRealtimeSignals=hr;var gr=function(e,t){return{name:`SIGRT${t+1}`,number:$t+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},$t=34,Gt=64;N.SIGRTMAX=Gt});var kt=l(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.getSignals=void 0;var Sr=require("os"),yr=Ot(),wr=we(),Pr=function(){let e=(0,wr.getRealtimeSignals)();return[...yr.SIGNALS,...e].map(Ir)};Y.getSignals=Pr;var Ir=function({name:e,number:t,description:n,action:r,forced:i=!1,standard:o}){let{signals:{[e]:s}}=Sr.constants,a=s!==void 0;return{name:e,number:a?s:t,description:n,supported:a,action:r,forced:i,standard:o}}});var jt=l(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});O.signalsByNumber=O.signalsByName=void 0;var xr=require("os"),Lt=kt(),br=we(),vr=function(){return(0,Lt.getSignals)().reduce(Tr,{})},Tr=function(e,{name:t,number:n,description:r,supported:i,action:o,forced:s,standard:a}){return{...e,[t]:{name:t,number:n,description:r,supported:i,action:o,forced:s,standard:a}}},Dr=vr();O.signalsByName=Dr;var Cr=function(){let e=(0,Lt.getSignals)(),t=br.SIGRTMAX+1,n=Array.from({length:t},(r,i)=>Fr(i,e));return Object.assign({},...n)},Fr=function(e,t){let n=Rr(e,t);if(n===void 0)return{};let{name:r,description:i,supported:o,action:s,forced:a,standard:d}=n;return{[e]:{name:r,number:e,description:i,supported:o,action:s,forced:a,standard:d}}},Rr=function(e,t){let n=t.find(({name:r})=>xr.constants.signals[r]===e);return n!==void 0?n:t.find(r=>r.number===e)},Er=Cr();O.signalsByNumber=Er});var Ut=l((po,Bt)=>{"use strict";var{signalsByName:Ar}=jt(),Nr=({timedOut:e,timeout:t,errorCode:n,signal:r,signalDescription:i,exitCode:o,isCanceled:s})=>e?`timed out after ${t} milliseconds`:s?"was canceled":n!==void 0?`failed with ${n}`:r!==void 0?`was killed with ${r} (${i})`:o!==void 0?`failed with exit code ${o}`:"failed",Or=({stdout:e,stderr:t,all:n,error:r,signal:i,exitCode:o,command:s,escapedCommand:a,timedOut:d,isCanceled:u,killed:m,parsed:{options:{timeout:y}}})=>{o=o===null?void 0:o,i=i===null?void 0:i;let S=i===void 0?void 0:Ar[i].description,w=r&&r.code,I=`Command ${Nr({timedOut:d,timeout:y,errorCode:w,signal:i,signalDescription:S,exitCode:o,isCanceled:u})}: ${s}`,F=Object.prototype.toString.call(r)==="[object Error]",_=F?`${I}
${r.message}`:I,X=[_,t,e].filter(Boolean).join(`
`);return F?(r.originalMessage=r.message,r.message=X):r=new Error(X),r.shortMessage=_,r.command=s,r.escapedCommand=a,r.exitCode=o,r.signal=i,r.signalDescription=S,r.stdout=e,r.stderr=t,n!==void 0&&(r.all=n),"bufferedData"in r&&delete r.bufferedData,r.failed=!0,r.timedOut=!!d,r.isCanceled=u,r.killed=m&&!d,r};Bt.exports=Or});var Mt=l((uo,Pe)=>{"use strict";var Q=["stdin","stdout","stderr"],$r=e=>Q.some(t=>e[t]!==void 0),qt=e=>{if(!e)return;let{stdio:t}=e;if(t===void 0)return Q.map(r=>e[r]);if($r(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${Q.map(r=>`\`${r}\``).join(", ")}`);if(typeof t=="string")return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let n=Math.max(t.length,Q.length);return Array.from({length:n},(r,i)=>t[i])};Pe.exports=qt;Pe.exports.node=e=>{let t=qt(e);return t==="ipc"?"ipc":t===void 0||typeof t=="string"?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]}});var Ht=l((fo,ee)=>{ee.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"];process.platform!=="win32"&&ee.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT");process.platform==="linux"&&ee.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")});var Vt=l((mo,k)=>{var f=global.process,v=function(e){return e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function"};v(f)?(Wt=require("assert"),$=Ht(),_t=/^win/i.test(f.platform),M=require("events"),typeof M!="function"&&(M=M.EventEmitter),f.__signal_exit_emitter__?h=f.__signal_exit_emitter__:(h=f.__signal_exit_emitter__=new M,h.count=0,h.emitted={}),h.infinite||(h.setMaxListeners(1/0),h.infinite=!0),k.exports=function(e,t){if(!v(global.process))return function(){};Wt.equal(typeof e,"function","a callback must be provided for exit handler"),G===!1&&Ie();var n="exit";t&&t.alwaysLast&&(n="afterexit");var r=function(){h.removeListener(n,e),h.listeners("exit").length===0&&h.listeners("afterexit").length===0&&te()};return h.on(n,e),r},te=function(){!G||!v(global.process)||(G=!1,$.forEach(function(t){try{f.removeListener(t,ne[t])}catch{}}),f.emit=re,f.reallyExit=xe,h.count-=1)},k.exports.unload=te,T=function(t,n,r){h.emitted[t]||(h.emitted[t]=!0,h.emit(t,n,r))},ne={},$.forEach(function(e){ne[e]=function(){if(v(global.process)){var n=f.listeners(e);n.length===h.count&&(te(),T("exit",null,e),T("afterexit",null,e),_t&&e==="SIGHUP"&&(e="SIGINT"),f.kill(f.pid,e))}}}),k.exports.signals=function(){return $},G=!1,Ie=function(){G||!v(global.process)||(G=!0,h.count+=1,$=$.filter(function(t){try{return f.on(t,ne[t]),!0}catch{return!1}}),f.emit=Kt,f.reallyExit=Xt)},k.exports.load=Ie,xe=f.reallyExit,Xt=function(t){v(global.process)&&(f.exitCode=t||0,T("exit",f.exitCode,null),T("afterexit",f.exitCode,null),xe.call(f,f.exitCode))},re=f.emit,Kt=function(t,n){if(t==="exit"&&v(global.process)){n!==void 0&&(f.exitCode=n);var r=re.apply(this,arguments);return T("exit",f.exitCode,null),T("afterexit",f.exitCode,null),r}else return re.apply(this,arguments)}):k.exports=function(){return function(){}};var Wt,$,_t,M,h,te,T,ne,G,Ie,xe,Xt,re,Kt});var Jt=l((ho,zt)=>{"use strict";var Gr=require("os"),kr=Vt(),Lr=1e3*5,jr=(e,t="SIGTERM",n={})=>{let r=e(t);return Br(e,t,n,r),r},Br=(e,t,n,r)=>{if(!Ur(t,n,r))return;let i=Mr(n),o=setTimeout(()=>{e("SIGKILL")},i);o.unref&&o.unref()},Ur=(e,{forceKillAfterTimeout:t},n)=>qr(e)&&t!==!1&&n,qr=e=>e===Gr.constants.signals.SIGTERM||typeof e=="string"&&e.toUpperCase()==="SIGTERM",Mr=({forceKillAfterTimeout:e=!0})=>{if(e===!0)return Lr;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e},Hr=(e,t)=>{e.kill()&&(t.isCanceled=!0)},Wr=(e,t,n)=>{e.kill(t),n(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))},_r=(e,{timeout:t,killSignal:n="SIGTERM"},r)=>{if(t===0||t===void 0)return r;let i,o=new Promise((a,d)=>{i=setTimeout(()=>{Wr(e,n,d)},t)}),s=r.finally(()=>{clearTimeout(i)});return Promise.race([o,s])},Xr=({timeout:e})=>{if(e!==void 0&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)},Kr=async(e,{cleanup:t,detached:n},r)=>{if(!t||n)return r;let i=kr(()=>{e.kill()});return r.finally(()=>{i()})};zt.exports={spawnedKill:jr,spawnedCancel:Hr,setupTimeout:_r,validateTimeout:Xr,setExitHandler:Kr}});var Yt=l((go,Zt)=>{"use strict";var x=e=>e!==null&&typeof e=="object"&&typeof e.pipe=="function";x.writable=e=>x(e)&&e.writable!==!1&&typeof e._write=="function"&&typeof e._writableState=="object";x.readable=e=>x(e)&&e.readable!==!1&&typeof e._read=="function"&&typeof e._readableState=="object";x.duplex=e=>x.writable(e)&&x.readable(e);x.transform=e=>x.duplex(e)&&typeof e._transform=="function";Zt.exports=x});var en=l((So,Qt)=>{"use strict";var{PassThrough:Vr}=require("stream");Qt.exports=e=>{e={...e};let{array:t}=e,{encoding:n}=e,r=n==="buffer",i=!1;t?i=!(n||r):n=n||"utf8",r&&(n=null);let o=new Vr({objectMode:i});n&&o.setEncoding(n);let s=0,a=[];return o.on("data",d=>{a.push(d),i?s=a.length:s+=d.length}),o.getBufferedValue=()=>t?a:r?Buffer.concat(a,s):a.join(""),o.getBufferedLength=()=>s,o}});var tn=l((yo,H)=>{"use strict";var{constants:zr}=require("buffer"),Jr=require("stream"),{promisify:Zr}=require("util"),Yr=en(),Qr=Zr(Jr.pipeline),ie=class extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}};async function be(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};let{maxBuffer:n}=t,r=Yr(t);return await new Promise((i,o)=>{let s=a=>{a&&r.getBufferedLength()<=zr.MAX_LENGTH&&(a.bufferedData=r.getBufferedValue()),o(a)};(async()=>{try{await Qr(e,r),i()}catch(a){s(a)}})(),r.on("data",()=>{r.getBufferedLength()>n&&s(new ie)})}),r.getBufferedValue()}H.exports=be;H.exports.buffer=(e,t)=>be(e,{...t,encoding:"buffer"});H.exports.array=(e,t)=>be(e,{...t,array:!0});H.exports.MaxBufferError=ie});var rn=l((wo,nn)=>{"use strict";var{PassThrough:ei}=require("stream");nn.exports=function(){var e=[],t=new ei({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=r,t.on("unpipe",i),Array.prototype.slice.call(arguments).forEach(n),t;function n(o){return Array.isArray(o)?(o.forEach(n),this):(e.push(o),o.once("end",i.bind(null,o)),o.once("error",t.emit.bind(t,"error")),o.pipe(t,{end:!1}),this)}function r(){return e.length==0}function i(o){e=e.filter(function(s){return s!==o}),!e.length&&t.readable&&t.end()}}});var cn=l((Po,an)=>{"use strict";var sn=Yt(),on=tn(),ti=rn(),ni=(e,t)=>{t===void 0||e.stdin===void 0||(sn(t)?t.pipe(e.stdin):e.stdin.end(t))},ri=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let n=ti();return e.stdout&&n.add(e.stdout),e.stderr&&n.add(e.stderr),n},ve=async(e,t)=>{if(e){e.destroy();try{return await t}catch(n){return n.bufferedData}}},Te=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(!(!e||!n))return t?on(e,{encoding:t,maxBuffer:r}):on.buffer(e,{maxBuffer:r})},ii=async({stdout:e,stderr:t,all:n},{encoding:r,buffer:i,maxBuffer:o},s)=>{let a=Te(e,{encoding:r,buffer:i,maxBuffer:o}),d=Te(t,{encoding:r,buffer:i,maxBuffer:o}),u=Te(n,{encoding:r,buffer:i,maxBuffer:o*2});try{return await Promise.all([s,a,d,u])}catch(m){return Promise.all([{error:m,signal:m.signal,timedOut:m.timedOut},ve(e,a),ve(t,d),ve(n,u)])}},oi=({input:e})=>{if(sn(e))throw new TypeError("The `input` option cannot be a stream in sync mode")};an.exports={handleInput:ni,makeAllStream:ri,getSpawnedResult:ii,validateInputSync:oi}});var pn=l((Io,ln)=>{"use strict";var si=(async()=>{})().constructor.prototype,ai=["then","catch","finally"].map(e=>[e,Reflect.getOwnPropertyDescriptor(si,e)]),ci=(e,t)=>{for(let[n,r]of ai){let i=typeof t=="function"?(...o)=>Reflect.apply(r.value,t(),o):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:i})}return e},li=e=>new Promise((t,n)=>{e.on("exit",(r,i)=>{t({exitCode:r,signal:i})}),e.on("error",r=>{n(r)}),e.stdin&&e.stdin.on("error",r=>{n(r)})});ln.exports={mergePromise:ci,getSpawnedPromise:li}});var fn=l((xo,un)=>{"use strict";var dn=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],pi=/^[\w.-]+$/,di=/"/g,ui=e=>typeof e!="string"||pi.test(e)?e:`"${e.replace(di,'\\"')}"`,fi=(e,t)=>dn(e,t).join(" "),mi=(e,t)=>dn(e,t).map(n=>ui(n)).join(" "),hi=/ +/g,gi=e=>{let t=[];for(let n of e.trim().split(hi)){let r=t[t.length-1];r&&r.endsWith("\\")?t[t.length-1]=`${r.slice(0,-1)} ${n}`:t.push(n)}return t};un.exports={joinCommand:fi,getEscapedCommand:mi,parseCommand:gi}});var Pn=l((bo,L)=>{"use strict";var Si=require("path"),De=require("child_process"),yi=bt(),wi=Tt(),Pi=Ft(),Ii=Nt(),oe=Ut(),hn=Mt(),{spawnedKill:xi,spawnedCancel:bi,setupTimeout:vi,validateTimeout:Ti,setExitHandler:Di}=Jt(),{handleInput:Ci,getSpawnedResult:Fi,makeAllStream:Ri,validateInputSync:Ei}=cn(),{mergePromise:mn,getSpawnedPromise:Ai}=pn(),{joinCommand:gn,parseCommand:Sn,getEscapedCommand:yn}=fn(),Ni=1e3*1e3*100,Oi=({env:e,extendEnv:t,preferLocal:n,localDir:r,execPath:i})=>{let o=t?{...process.env,...e}:e;return n?Pi.env({env:o,cwd:r,execPath:i}):o},wn=(e,t,n={})=>{let r=yi._parse(e,t,n);return e=r.command,t=r.args,n=r.options,n={maxBuffer:Ni,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:n.cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...n},n.env=Oi(n),n.stdio=hn(n),process.platform==="win32"&&Si.basename(e,".exe")==="cmd"&&t.unshift("/q"),{file:e,args:t,options:n,parsed:r}},W=(e,t,n)=>typeof t!="string"&&!Buffer.isBuffer(t)?n===void 0?void 0:"":e.stripFinalNewline?wi(t):t,se=(e,t,n)=>{let r=wn(e,t,n),i=gn(e,t),o=yn(e,t);Ti(r.options);let s;try{s=De.spawn(r.file,r.args,r.options)}catch(w){let P=new De.ChildProcess,I=Promise.reject(oe({error:w,stdout:"",stderr:"",all:"",command:i,escapedCommand:o,parsed:r,timedOut:!1,isCanceled:!1,killed:!1}));return mn(P,I)}let a=Ai(s),d=vi(s,r.options,a),u=Di(s,r.options,d),m={isCanceled:!1};s.kill=xi.bind(null,s.kill.bind(s)),s.cancel=bi.bind(null,s,m);let S=Ii(async()=>{let[{error:w,exitCode:P,signal:I,timedOut:F},_,X,On]=await Fi(s,r.options,u),Ne=W(r.options,_),Oe=W(r.options,X),$e=W(r.options,On);if(w||P!==0||I!==null){let Ge=oe({error:w,exitCode:P,signal:I,stdout:Ne,stderr:Oe,all:$e,command:i,escapedCommand:o,parsed:r,timedOut:F,isCanceled:m.isCanceled,killed:s.killed});if(!r.options.reject)return Ge;throw Ge}return{command:i,escapedCommand:o,exitCode:0,stdout:Ne,stderr:Oe,all:$e,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}});return Ci(s,r.options.input),s.all=Ri(s,r.options),mn(s,S)};L.exports=se;L.exports.sync=(e,t,n)=>{let r=wn(e,t,n),i=gn(e,t),o=yn(e,t);Ei(r.options);let s;try{s=De.spawnSync(r.file,r.args,r.options)}catch(u){throw oe({error:u,stdout:"",stderr:"",all:"",command:i,escapedCommand:o,parsed:r,timedOut:!1,isCanceled:!1,killed:!1})}let a=W(r.options,s.stdout,s.error),d=W(r.options,s.stderr,s.error);if(s.error||s.status!==0||s.signal!==null){let u=oe({stdout:a,stderr:d,error:s.error,signal:s.signal,exitCode:s.status,command:i,escapedCommand:o,parsed:r,timedOut:s.error&&s.error.code==="ETIMEDOUT",isCanceled:!1,killed:s.signal!==null});if(!r.options.reject)return u;throw u}return{command:i,escapedCommand:o,exitCode:0,stdout:a,stderr:d,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}};L.exports.command=(e,t)=>{let[n,...r]=Sn(e);return se(n,r,t)};L.exports.commandSync=(e,t)=>{let[n,...r]=Sn(e);return se.sync(n,r,t)};L.exports.node=(e,t,n={})=>{t&&!Array.isArray(t)&&typeof t=="object"&&(n=t,t=[]);let r=hn.node(n),i=process.execArgv.filter(a=>!a.startsWith("--inspect")),{nodePath:o=process.execPath,nodeOptions:s=i}=n;return se(o,[...s,e,...Array.isArray(t)?t:[]],{...n,stdin:void 0,stdout:void 0,stderr:void 0,stdio:r,shell:!1})}});var Ui={};Bn(Ui,{default:()=>Nn});module.exports=Un(Ui);var C=require("@raycast/api");var ae=require("child_process"),Ee=R(require("path"));var B=require("child_process"),b=R(require("fs")),g=R(require("os")),c=R(require("path"));var Ce=R(require("node:process"),1),Fe=R(Pn(),1);async function D(e,{humanReadableOutput:t=!0}={}){if(Ce.default.platform!=="darwin")throw new Error("macOS only");let n=t?[]:["-ss"],{stdout:r}=await(0,Fe.default)("osascript",["-e",e,n]);return r}function j(e,{humanReadableOutput:t=!0}={}){if(Ce.default.platform!=="darwin")throw new Error("macOS only");let n=t?[]:["-ss"],{stdout:r}=Fe.default.sync("osascript",["-e",e,...n]);return r}var p=require("@raycast/api");var In=async()=>D(`use framework "AppKit"
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
      
      return filePaths`),xn=async e=>{let t=Array.isArray(e)?e:[e];await D(`use framework "Foundation"
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
      end if`)};var $i=async()=>D(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

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
    end tell`),Gi=async()=>D(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

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
    end tell`),Tn=async()=>{let t=(await p.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let n of t)b.existsSync(n)&&await b.promises.rm(n);await p.LocalStorage.removeItem("itemsToRemove")},Dn=async()=>{let e=[],n=(0,p.getPreferenceValues)().inputMethod,r=!1;if(n=="Clipboard")try{let s=(await In()).split(", ");if(await p.LocalStorage.setItem("itemsToRemove",s.join(", ")),s.filter(a=>a.trim().length>0).length>0)return s}catch{console.error("Couldn't get images from clipboard"),r=!0}let i=n;try{i=(await(0,p.getFrontmostApplication)()).name}catch{console.error("Couldn't get frontmost application")}try{if(i=="Path Finder"&&n=="Path Finder")return(await Gi()).split(", ").forEach(a=>{e.includes(a)||e.push(a)}),e}catch{console.error("Couldn't get images from Path Finder"),r=!0}let o=(await $i()).split(", ");return i=="Finder"||n=="Finder"||r?e.push(...o):o.forEach(s=>{s.split("/").at(-2)=="Desktop"&&!e.includes(s)&&e.push(s)}),e},Re=async e=>{let t=(0,p.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await xn(e),bn(e)):t.imageResultHandling=="openInPreview"&&(console.log(e),await Li(e),bn(e))},Cn=async(e,t)=>{let n=(0,p.getPreferenceValues)(),r=`${p.environment.supportPath}/tmp.png`,i=t;n.imageResultHandling=="saveToDownloads"?i=c.default.join(g.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(g.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(g.tmpdir(),c.default.basename(i)));let o=2;for(;b.existsSync(i)&&g.tmpdir()!=c.default.dirname(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${o})${c.default.extname(i)}`),o++;return(0,B.execSync)(`chmod +x ${p.environment.assetsPath}/webp/dwebp`),(0,B.execSync)(`chmod +x ${p.environment.assetsPath}/webp/cwebp`),(0,B.execSync)(`${p.environment.assetsPath}/webp/dwebp "${t}" -o "${r}" && ${e} "${r}" && ${p.environment.assetsPath}/webp/cwebp "${r}" -o "${i}" ; rm "${r}"`),i},Fn=async(e,t)=>{let n=(0,p.getPreferenceValues)(),r=`${p.environment.supportPath}/tmp.bmp`,i=t;n.imageResultHandling=="saveToDownloads"?i=c.default.join(g.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(g.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(g.tmpdir(),c.default.basename(i)));let o=2;for(;b.existsSync(i)&&g.tmpdir()!=c.default.dirname(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${o})${c.default.extname(i)}`),o++;return ki("BMP",t,r),(0,B.execSync)(`chmod +x ${p.environment.assetsPath}/potrace/potrace`),(0,B.execSync)(`${e} "${r}" && ${p.environment.assetsPath}/potrace/potrace -s --tight -o "${i}" "${r}"; rm "${r}"`),i},ki=(e,t,n)=>{j(`use framework "Foundation"
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
  pngData's writeToFile:"${n}" atomically:false`)};var Rn=(e,t)=>{let n=(0,p.getPreferenceValues)(),r=e;n.imageResultHandling=="saveToDownloads"?r=c.default.join(g.homedir(),"Downloads",c.default.basename(r)):n.imageResultHandling=="saveToDesktop"?r=c.default.join(g.homedir(),"Desktop",c.default.basename(r)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(r=c.default.join(g.tmpdir(),c.default.basename(r)));let i=2;for(;b.existsSync(r)&&g.tmpdir()!=c.default.dirname(r);)r=c.default.join(c.default.dirname(r),c.default.basename(r,c.default.extname(r))+` (${i})${c.default.extname(r)}`),i++;let o=t==0?`(transform's scaleXBy:-1 yBy:1)
    (transform's translateXBy:(-(item 1 of item 2 of pdfRect)) yBy:0)`:`(transform's scaleXBy:1 yBy:-1)
    (transform's translateXBy:0 yBy:(-(item 2 of item 2 of pdfRect)))`;return j(`use framework "Foundation"
  use framework "PDFKit"
  
  -- Load the PDF file as NSData
  set pdfData to current application's NSData's dataWithContentsOfFile:"${e}"
  
  -- Create a PDFDocument from the PDF data
  set pdfDoc to current application's PDFDocument's alloc()'s initWithData:pdfData
  
  -- Flip each page
  repeat with i from 0 to ((pdfDoc's pageCount()) - 1)
    set thePDFPage to (pdfDoc's pageAtIndex:i)
    set pdfRect to (thePDFPage's boundsForBox:(current application's kPDFDisplayBoxMediaBox))
    set flippedPdfImage to (current application's NSImage's alloc()'s initWithSize:(item 2 of pdfRect))
    
    flippedPdfImage's lockFocus()
    set transform to current application's NSAffineTransform's alloc()'s init()
    ${o}
    transform's concat()
    (thePDFPage's drawWithBox:(current application's kPDFDisplayBoxMediaBox))
    flippedPdfImage's unlockFocus()
    
    set newPage to (current application's PDFPage's alloc()'s initWithImage:flippedPdfImage)
    
    (pdfDoc's removePageAtIndex:i)
    (pdfDoc's insertPage:newPage atIndex:i)
  end repeat
  
  -- Write the modified PDF data to the file
  set flippedPdfData to pdfDoc's dataRepresentation()
  flippedPdfData's writeToFile:"${r}" atomically:false`),r};var Li=async e=>{let t=Array.isArray(e)?e:[e],n=t.some(r=>c.default.extname(r)==".svg");await D(`use framework "Foundation"
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
          end tell`}`)},bn=e=>{let t=Array.isArray(e)?e:[e];for(let n of t)b.unlinkSync(n)},ji=()=>j(`use framework "Foundation"
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
    end if`),Bi=()=>{let e="Finder";try{e=ji()}catch{console.error("Couldn't get frontmost application")}try{if(e=="Path Finder")return j(`tell application "Path Finder"
          if 1 \u2264 (count finder windows) then
            get POSIX path of (target of finder window 1)
          else
            get POSIX path of desktop
          end if
        end tell`)}catch{console.error("Couldn't get current directory of Path Finder")}return j(`tell application "Finder"
      if 1 <= (count Finder windows) then
        get POSIX path of (target of window 1 as alias)
      else
        get POSIX path of (desktop as alias)
      end if
    end tell`)},En=(e,t=!1)=>{let n=(0,p.getPreferenceValues)();return e.map(r=>{let i=r;if(n.imageResultHandling=="saveToDownloads"?i=c.default.join(g.homedir(),"Downloads",c.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=c.default.join(g.homedir(),"Desktop",c.default.basename(i)):(n.imageResultHandling=="saveInContainingFolder"||n.imageResultHandling=="replaceOriginal")&&(n.inputMethod=="Clipboard"||t)?i=c.default.join(Bi(),c.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=c.default.join(g.tmpdir(),c.default.basename(i))),n.imageResultHandling!="replaceOriginal"&&g.tmpdir()!=c.default.dirname(i)){let o=2;for(;b.existsSync(i);)i=c.default.join(c.default.dirname(i),c.default.basename(i,c.default.extname(i))+` (${o})${c.default.extname(i)}`),o++}return i})},An=async(e,t,n)=>{console.error(t),n?(n.title=e,n.message=t.message,n.style=p.Toast.Style.Failure,n.primaryAction={title:"Copy Error",onAction:async()=>{await p.Clipboard.copy(t.message)}}):n=await(0,p.showToast)({title:e,message:t.message,style:p.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await p.Clipboard.copy(t.message)}}})};async function Ae(e,t){let n='"'+e.join('" "')+'"',r=En(e),i=t==0?"horizontal":"vertical";if(n.toLowerCase().includes("webp")||n.toLowerCase().includes("svg")||n.toLowerCase().includes("pdf")){let o=[];for(let s of e)if(s.toLowerCase().endsWith("webp"))o.push(await Cn(`sips --flip ${i}`,s));else if(s.toLowerCase().endsWith("svg"))o.push(await Fn(`sips --flip ${i}`,s));else if(s.toLowerCase().endsWith("pdf"))o.push(Rn(s,t));else{let a=r[e.indexOf(s)];o.push(a),(0,ae.execSync)(`sips --flip ${i} -o "${a}" "${s}"`)}await Re(o)}else{let o=r.length==1?r[0]:Ee.default.join(Ee.default.dirname(r[0]),"flipped");r.length>1&&(0,ae.execSync)(`mkdir -p "${o}"`),(0,ae.execSync)(`sips --flip ${i} -o "${o}" ${n}`),await Re(r)}}async function Nn(){let e=await Dn();if(e.length===0||e.length===1&&e[0]===""){await(0,C.showToast)({title:"No images selected",style:C.Toast.Style.Failure});return}let t=await(0,C.showToast)({title:"Flipping in progress...",style:C.Toast.Style.Animated}),n=`image${e.length===1?"":"s"}`;try{await Ae(e,1),t.title=`Flipped ${e.length.toString()} ${n} vertically`,t.style=C.Toast.Style.Success}catch(r){await An(`Failed to flip ${e.length.toString()} ${n}`,r,t)}finally{await Tn()}}
