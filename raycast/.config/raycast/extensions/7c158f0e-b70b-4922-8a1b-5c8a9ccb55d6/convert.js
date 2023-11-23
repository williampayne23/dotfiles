"use strict";var Nn=Object.create;var K=Object.defineProperty;var On=Object.getOwnPropertyDescriptor;var Gn=Object.getOwnPropertyNames;var kn=Object.getPrototypeOf,Ln=Object.prototype.hasOwnProperty;var p=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),jn=(e,t)=>{for(var r in t)K(e,r,{get:t[r],enumerable:!0})},Ge=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Gn(t))!Ln.call(e,o)&&o!==r&&K(e,o,{get:()=>t[o],enumerable:!(n=On(t,o))||n.enumerable});return e};var C=(e,t,r)=>(r=e!=null?Nn(kn(e)):{},Ge(t||!e||!e.__esModule?K(r,"default",{value:e,enumerable:!0}):r,e)),Bn=e=>Ge(K({},"__esModule",{value:!0}),e);var Ue=p((qo,Be)=>{Be.exports=je;je.sync=qn;var ke=require("fs");function Un(e,t){var r=t.pathExt!==void 0?t.pathExt:process.env.PATHEXT;if(!r||(r=r.split(";"),r.indexOf("")!==-1))return!0;for(var n=0;n<r.length;n++){var o=r[n].toLowerCase();if(o&&e.substr(-o.length).toLowerCase()===o)return!0}return!1}function Le(e,t,r){return!e.isSymbolicLink()&&!e.isFile()?!1:Un(t,r)}function je(e,t,r){ke.stat(e,function(n,o){r(n,n?!1:Le(o,e,t))})}function qn(e,t){return Le(ke.statSync(e),e,t)}});var _e=p((Ho,We)=>{We.exports=He;He.sync=Hn;var qe=require("fs");function He(e,t,r){qe.stat(e,function(n,o){r(n,n?!1:Me(o,t))})}function Hn(e,t){return Me(qe.statSync(e),t)}function Me(e,t){return e.isFile()&&Mn(e,t)}function Mn(e,t){var r=e.mode,n=e.uid,o=e.gid,s=t.uid!==void 0?t.uid:process.getuid&&process.getuid(),i=t.gid!==void 0?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),c=parseInt("010",8),l=parseInt("001",8),f=a|c,P=r&l||r&c&&o===i||r&a&&n===s||r&f&&s===0;return P}});var Ve=p((Wo,Xe)=>{var Mo=require("fs"),z;process.platform==="win32"||global.TESTING_WINDOWS?z=Ue():z=_e();Xe.exports=ce;ce.sync=Wn;function ce(e,t,r){if(typeof t=="function"&&(r=t,t={}),!r){if(typeof Promise!="function")throw new TypeError("callback not provided");return new Promise(function(n,o){ce(e,t||{},function(s,i){s?o(s):n(i)})})}z(e,t||{},function(n,o){n&&(n.code==="EACCES"||t&&t.ignoreErrors)&&(n=null,o=!1),r(n,o)})}function Wn(e,t){try{return z.sync(e,t||{})}catch(r){if(t&&t.ignoreErrors||r.code==="EACCES")return!1;throw r}}});var et=p((_o,Qe)=>{var $=process.platform==="win32"||process.env.OSTYPE==="cygwin"||process.env.OSTYPE==="msys",Ke=require("path"),_n=$?";":":",ze=Ve(),Je=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"}),Ze=(e,t)=>{let r=t.colon||_n,n=e.match(/\//)||$&&e.match(/\\/)?[""]:[...$?[process.cwd()]:[],...(t.path||process.env.PATH||"").split(r)],o=$?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",s=$?o.split(r):[""];return $&&e.indexOf(".")!==-1&&s[0]!==""&&s.unshift(""),{pathEnv:n,pathExt:s,pathExtExe:o}},Ye=(e,t,r)=>{typeof t=="function"&&(r=t,t={}),t||(t={});let{pathEnv:n,pathExt:o,pathExtExe:s}=Ze(e,t),i=[],a=l=>new Promise((f,P)=>{if(l===n.length)return t.all&&i.length?f(i):P(Je(e));let S=n[l],y=/^".*"$/.test(S)?S.slice(1,-1):S,I=Ke.join(y,e),b=!y&&/^\.[\\\/]/.test(e)?e.slice(0,2)+I:I;f(c(b,l,0))}),c=(l,f,P)=>new Promise((S,y)=>{if(P===o.length)return S(a(f+1));let I=o[P];ze(l+I,{pathExt:s},(b,E)=>{if(!b&&E)if(t.all)i.push(l+I);else return S(l+I);return S(c(l,f,P+1))})});return r?a(0).then(l=>r(null,l),r):a(0)},Xn=(e,t)=>{t=t||{};let{pathEnv:r,pathExt:n,pathExtExe:o}=Ze(e,t),s=[];for(let i=0;i<r.length;i++){let a=r[i],c=/^".*"$/.test(a)?a.slice(1,-1):a,l=Ke.join(c,e),f=!c&&/^\.[\\\/]/.test(e)?e.slice(0,2)+l:l;for(let P=0;P<n.length;P++){let S=f+n[P];try{if(ze.sync(S,{pathExt:o}))if(t.all)s.push(S);else return S}catch{}}}if(t.all&&s.length)return s;if(t.nothrow)return null;throw Je(e)};Qe.exports=Ye;Ye.sync=Xn});var pe=p((Xo,le)=>{"use strict";var tt=(e={})=>{let t=e.env||process.env;return(e.platform||process.platform)!=="win32"?"PATH":Object.keys(t).reverse().find(n=>n.toUpperCase()==="PATH")||"Path"};le.exports=tt;le.exports.default=tt});var it=p((Vo,ot)=>{"use strict";var nt=require("path"),Vn=et(),Kn=pe();function rt(e,t){let r=e.options.env||process.env,n=process.cwd(),o=e.options.cwd!=null,s=o&&process.chdir!==void 0&&!process.chdir.disabled;if(s)try{process.chdir(e.options.cwd)}catch{}let i;try{i=Vn.sync(e.command,{path:r[Kn({env:r})],pathExt:t?nt.delimiter:void 0})}catch{}finally{s&&process.chdir(n)}return i&&(i=nt.resolve(o?e.options.cwd:"",i)),i}function zn(e){return rt(e)||rt(e,!0)}ot.exports=zn});var st=p((Ko,ue)=>{"use strict";var de=/([()\][%!^"`<>&|;, *?])/g;function Jn(e){return e=e.replace(de,"^$1"),e}function Zn(e,t){return e=`${e}`,e=e.replace(/(\\*)"/g,'$1$1\\"'),e=e.replace(/(\\*)$/,"$1$1"),e=`"${e}"`,e=e.replace(de,"^$1"),t&&(e=e.replace(de,"^$1")),e}ue.exports.command=Jn;ue.exports.argument=Zn});var ct=p((zo,at)=>{"use strict";at.exports=/^#!(.*)/});var pt=p((Jo,lt)=>{"use strict";var Yn=ct();lt.exports=(e="")=>{let t=e.match(Yn);if(!t)return null;let[r,n]=t[0].replace(/#! ?/,"").split(" "),o=r.split("/").pop();return o==="env"?n:n?`${o} ${n}`:o}});var ut=p((Zo,dt)=>{"use strict";var fe=require("fs"),Qn=pt();function er(e){let r=Buffer.alloc(150),n;try{n=fe.openSync(e,"r"),fe.readSync(n,r,0,150,0),fe.closeSync(n)}catch{}return Qn(r.toString())}dt.exports=er});var gt=p((Yo,ht)=>{"use strict";var tr=require("path"),ft=it(),mt=st(),nr=ut(),rr=process.platform==="win32",or=/\.(?:com|exe)$/i,ir=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function sr(e){e.file=ft(e);let t=e.file&&nr(e.file);return t?(e.args.unshift(e.file),e.command=t,ft(e)):e.file}function ar(e){if(!rr)return e;let t=sr(e),r=!or.test(t);if(e.options.forceShell||r){let n=ir.test(t);e.command=tr.normalize(e.command),e.command=mt.command(e.command),e.args=e.args.map(s=>mt.argument(s,n));let o=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${o}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}function cr(e,t,r){t&&!Array.isArray(t)&&(r=t,t=null),t=t?t.slice(0):[],r=Object.assign({},r);let n={command:e,args:t,options:r,file:void 0,original:{command:e,args:t}};return r.shell?n:ar(n)}ht.exports=cr});var wt=p((Qo,Pt)=>{"use strict";var me=process.platform==="win32";function he(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function lr(e,t){if(!me)return;let r=e.emit;e.emit=function(n,o){if(n==="exit"){let s=St(o,t,"spawn");if(s)return r.call(e,"error",s)}return r.apply(e,arguments)}}function St(e,t){return me&&e===1&&!t.file?he(t.original,"spawn"):null}function pr(e,t){return me&&e===1&&!t.file?he(t.original,"spawnSync"):null}Pt.exports={hookChildProcess:lr,verifyENOENT:St,verifyENOENTSync:pr,notFoundError:he}});var xt=p((ei,A)=>{"use strict";var yt=require("child_process"),ge=gt(),Se=wt();function It(e,t,r){let n=ge(e,t,r),o=yt.spawn(n.command,n.args,n.options);return Se.hookChildProcess(o,n),o}function dr(e,t,r){let n=ge(e,t,r),o=yt.spawnSync(n.command,n.args,n.options);return o.error=o.error||Se.verifyENOENTSync(o.status,n),o}A.exports=It;A.exports.spawn=It;A.exports.sync=dr;A.exports._parse=ge;A.exports._enoent=Se});var vt=p((ti,bt)=>{"use strict";bt.exports=e=>{let t=typeof e=="string"?`
`:`
`.charCodeAt(),r=typeof e=="string"?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===r&&(e=e.slice(0,e.length-1)),e}});var Dt=p((ni,H)=>{"use strict";var q=require("path"),Tt=pe(),Ct=e=>{e={cwd:process.cwd(),path:process.env[Tt()],execPath:process.execPath,...e};let t,r=q.resolve(e.cwd),n=[];for(;t!==r;)n.push(q.join(r,"node_modules/.bin")),t=r,r=q.resolve(r,"..");let o=q.resolve(e.cwd,e.execPath,"..");return n.push(o),n.concat(e.path).join(q.delimiter)};H.exports=Ct;H.exports.default=Ct;H.exports.env=e=>{e={env:process.env,...e};let t={...e.env},r=Tt({env:t});return e.path=t[r],t[r]=H.exports(e),t}});var Rt=p((ri,Pe)=>{"use strict";var Ft=(e,t)=>{for(let r of Reflect.ownKeys(t))Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));return e};Pe.exports=Ft;Pe.exports.default=Ft});var $t=p((oi,Z)=>{"use strict";var ur=Rt(),J=new WeakMap,Et=(e,t={})=>{if(typeof e!="function")throw new TypeError("Expected a function");let r,n=0,o=e.displayName||e.name||"<anonymous>",s=function(...i){if(J.set(s,++n),n===1)r=e.apply(this,i),e=null;else if(t.throw===!0)throw new Error(`Function \`${o}\` can only be called once`);return r};return ur(s,e),J.set(s,n),s};Z.exports=Et;Z.exports.default=Et;Z.exports.callCount=e=>{if(!J.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return J.get(e)}});var At=p(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.SIGNALS=void 0;var fr=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];Y.SIGNALS=fr});var we=p(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.SIGRTMAX=N.getRealtimeSignals=void 0;var mr=function(){let e=Ot-Nt+1;return Array.from({length:e},hr)};N.getRealtimeSignals=mr;var hr=function(e,t){return{name:`SIGRT${t+1}`,number:Nt+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},Nt=34,Ot=64;N.SIGRTMAX=Ot});var Gt=p(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.getSignals=void 0;var gr=require("os"),Sr=At(),Pr=we(),wr=function(){let e=(0,Pr.getRealtimeSignals)();return[...Sr.SIGNALS,...e].map(yr)};Q.getSignals=wr;var yr=function({name:e,number:t,description:r,action:n,forced:o=!1,standard:s}){let{signals:{[e]:i}}=gr.constants,a=i!==void 0;return{name:e,number:a?i:t,description:r,supported:a,action:n,forced:o,standard:s}}});var Lt=p(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});O.signalsByNumber=O.signalsByName=void 0;var Ir=require("os"),kt=Gt(),xr=we(),br=function(){return(0,kt.getSignals)().reduce(vr,{})},vr=function(e,{name:t,number:r,description:n,supported:o,action:s,forced:i,standard:a}){return{...e,[t]:{name:t,number:r,description:n,supported:o,action:s,forced:i,standard:a}}},Tr=br();O.signalsByName=Tr;var Cr=function(){let e=(0,kt.getSignals)(),t=xr.SIGRTMAX+1,r=Array.from({length:t},(n,o)=>Dr(o,e));return Object.assign({},...r)},Dr=function(e,t){let r=Fr(e,t);if(r===void 0)return{};let{name:n,description:o,supported:s,action:i,forced:a,standard:c}=r;return{[e]:{name:n,number:e,description:o,supported:s,action:i,forced:a,standard:c}}},Fr=function(e,t){let r=t.find(({name:n})=>Ir.constants.signals[n]===e);return r!==void 0?r:t.find(n=>n.number===e)},Rr=Cr();O.signalsByNumber=Rr});var Bt=p((li,jt)=>{"use strict";var{signalsByName:Er}=Lt(),$r=({timedOut:e,timeout:t,errorCode:r,signal:n,signalDescription:o,exitCode:s,isCanceled:i})=>e?`timed out after ${t} milliseconds`:i?"was canceled":r!==void 0?`failed with ${r}`:n!==void 0?`was killed with ${n} (${o})`:s!==void 0?`failed with exit code ${s}`:"failed",Ar=({stdout:e,stderr:t,all:r,error:n,signal:o,exitCode:s,command:i,escapedCommand:a,timedOut:c,isCanceled:l,killed:f,parsed:{options:{timeout:P}}})=>{s=s===null?void 0:s,o=o===null?void 0:o;let S=o===void 0?void 0:Er[o].description,y=n&&n.code,b=`Command ${$r({timedOut:c,timeout:P,errorCode:y,signal:o,signalDescription:S,exitCode:s,isCanceled:l})}: ${i}`,E=Object.prototype.toString.call(n)==="[object Error]",X=E?`${b}
${n.message}`:b,V=[X,t,e].filter(Boolean).join(`
`);return E?(n.originalMessage=n.message,n.message=V):n=new Error(V),n.shortMessage=X,n.command=i,n.escapedCommand=a,n.exitCode=s,n.signal=o,n.signalDescription=S,n.stdout=e,n.stderr=t,r!==void 0&&(n.all=r),"bufferedData"in n&&delete n.bufferedData,n.failed=!0,n.timedOut=!!c,n.isCanceled=l,n.killed=f&&!c,n};jt.exports=Ar});var qt=p((pi,ye)=>{"use strict";var ee=["stdin","stdout","stderr"],Nr=e=>ee.some(t=>e[t]!==void 0),Ut=e=>{if(!e)return;let{stdio:t}=e;if(t===void 0)return ee.map(n=>e[n]);if(Nr(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${ee.map(n=>`\`${n}\``).join(", ")}`);if(typeof t=="string")return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let r=Math.max(t.length,ee.length);return Array.from({length:r},(n,o)=>t[o])};ye.exports=Ut;ye.exports.node=e=>{let t=Ut(e);return t==="ipc"?"ipc":t===void 0||typeof t=="string"?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]}});var Ht=p((di,te)=>{te.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"];process.platform!=="win32"&&te.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT");process.platform==="linux"&&te.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")});var Vt=p((ui,L)=>{var d=global.process,D=function(e){return e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function"};D(d)?(Mt=require("assert"),G=Ht(),Wt=/^win/i.test(d.platform),M=require("events"),typeof M!="function"&&(M=M.EventEmitter),d.__signal_exit_emitter__?h=d.__signal_exit_emitter__:(h=d.__signal_exit_emitter__=new M,h.count=0,h.emitted={}),h.infinite||(h.setMaxListeners(1/0),h.infinite=!0),L.exports=function(e,t){if(!D(global.process))return function(){};Mt.equal(typeof e,"function","a callback must be provided for exit handler"),k===!1&&Ie();var r="exit";t&&t.alwaysLast&&(r="afterexit");var n=function(){h.removeListener(r,e),h.listeners("exit").length===0&&h.listeners("afterexit").length===0&&ne()};return h.on(r,e),n},ne=function(){!k||!D(global.process)||(k=!1,G.forEach(function(t){try{d.removeListener(t,re[t])}catch{}}),d.emit=oe,d.reallyExit=xe,h.count-=1)},L.exports.unload=ne,F=function(t,r,n){h.emitted[t]||(h.emitted[t]=!0,h.emit(t,r,n))},re={},G.forEach(function(e){re[e]=function(){if(D(global.process)){var r=d.listeners(e);r.length===h.count&&(ne(),F("exit",null,e),F("afterexit",null,e),Wt&&e==="SIGHUP"&&(e="SIGINT"),d.kill(d.pid,e))}}}),L.exports.signals=function(){return G},k=!1,Ie=function(){k||!D(global.process)||(k=!0,h.count+=1,G=G.filter(function(t){try{return d.on(t,re[t]),!0}catch{return!1}}),d.emit=Xt,d.reallyExit=_t)},L.exports.load=Ie,xe=d.reallyExit,_t=function(t){D(global.process)&&(d.exitCode=t||0,F("exit",d.exitCode,null),F("afterexit",d.exitCode,null),xe.call(d,d.exitCode))},oe=d.emit,Xt=function(t,r){if(t==="exit"&&D(global.process)){r!==void 0&&(d.exitCode=r);var n=oe.apply(this,arguments);return F("exit",d.exitCode,null),F("afterexit",d.exitCode,null),n}else return oe.apply(this,arguments)}):L.exports=function(){return function(){}};var Mt,G,Wt,M,h,ne,F,re,k,Ie,xe,_t,oe,Xt});var zt=p((fi,Kt)=>{"use strict";var Or=require("os"),Gr=Vt(),kr=1e3*5,Lr=(e,t="SIGTERM",r={})=>{let n=e(t);return jr(e,t,r,n),n},jr=(e,t,r,n)=>{if(!Br(t,r,n))return;let o=qr(r),s=setTimeout(()=>{e("SIGKILL")},o);s.unref&&s.unref()},Br=(e,{forceKillAfterTimeout:t},r)=>Ur(e)&&t!==!1&&r,Ur=e=>e===Or.constants.signals.SIGTERM||typeof e=="string"&&e.toUpperCase()==="SIGTERM",qr=({forceKillAfterTimeout:e=!0})=>{if(e===!0)return kr;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e},Hr=(e,t)=>{e.kill()&&(t.isCanceled=!0)},Mr=(e,t,r)=>{e.kill(t),r(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))},Wr=(e,{timeout:t,killSignal:r="SIGTERM"},n)=>{if(t===0||t===void 0)return n;let o,s=new Promise((a,c)=>{o=setTimeout(()=>{Mr(e,r,c)},t)}),i=n.finally(()=>{clearTimeout(o)});return Promise.race([s,i])},_r=({timeout:e})=>{if(e!==void 0&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)},Xr=async(e,{cleanup:t,detached:r},n)=>{if(!t||r)return n;let o=Gr(()=>{e.kill()});return n.finally(()=>{o()})};Kt.exports={spawnedKill:Lr,spawnedCancel:Hr,setupTimeout:Wr,validateTimeout:_r,setExitHandler:Xr}});var Zt=p((mi,Jt)=>{"use strict";var v=e=>e!==null&&typeof e=="object"&&typeof e.pipe=="function";v.writable=e=>v(e)&&e.writable!==!1&&typeof e._write=="function"&&typeof e._writableState=="object";v.readable=e=>v(e)&&e.readable!==!1&&typeof e._read=="function"&&typeof e._readableState=="object";v.duplex=e=>v.writable(e)&&v.readable(e);v.transform=e=>v.duplex(e)&&typeof e._transform=="function";Jt.exports=v});var Qt=p((hi,Yt)=>{"use strict";var{PassThrough:Vr}=require("stream");Yt.exports=e=>{e={...e};let{array:t}=e,{encoding:r}=e,n=r==="buffer",o=!1;t?o=!(r||n):r=r||"utf8",n&&(r=null);let s=new Vr({objectMode:o});r&&s.setEncoding(r);let i=0,a=[];return s.on("data",c=>{a.push(c),o?i=a.length:i+=c.length}),s.getBufferedValue=()=>t?a:n?Buffer.concat(a,i):a.join(""),s.getBufferedLength=()=>i,s}});var en=p((gi,W)=>{"use strict";var{constants:Kr}=require("buffer"),zr=require("stream"),{promisify:Jr}=require("util"),Zr=Qt(),Yr=Jr(zr.pipeline),ie=class extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}};async function be(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};let{maxBuffer:r}=t,n=Zr(t);return await new Promise((o,s)=>{let i=a=>{a&&n.getBufferedLength()<=Kr.MAX_LENGTH&&(a.bufferedData=n.getBufferedValue()),s(a)};(async()=>{try{await Yr(e,n),o()}catch(a){i(a)}})(),n.on("data",()=>{n.getBufferedLength()>r&&i(new ie)})}),n.getBufferedValue()}W.exports=be;W.exports.buffer=(e,t)=>be(e,{...t,encoding:"buffer"});W.exports.array=(e,t)=>be(e,{...t,array:!0});W.exports.MaxBufferError=ie});var nn=p((Si,tn)=>{"use strict";var{PassThrough:Qr}=require("stream");tn.exports=function(){var e=[],t=new Qr({objectMode:!0});return t.setMaxListeners(0),t.add=r,t.isEmpty=n,t.on("unpipe",o),Array.prototype.slice.call(arguments).forEach(r),t;function r(s){return Array.isArray(s)?(s.forEach(r),this):(e.push(s),s.once("end",o.bind(null,s)),s.once("error",t.emit.bind(t,"error")),s.pipe(t,{end:!1}),this)}function n(){return e.length==0}function o(s){e=e.filter(function(i){return i!==s}),!e.length&&t.readable&&t.end()}}});var an=p((Pi,sn)=>{"use strict";var on=Zt(),rn=en(),eo=nn(),to=(e,t)=>{t===void 0||e.stdin===void 0||(on(t)?t.pipe(e.stdin):e.stdin.end(t))},no=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let r=eo();return e.stdout&&r.add(e.stdout),e.stderr&&r.add(e.stderr),r},ve=async(e,t)=>{if(e){e.destroy();try{return await t}catch(r){return r.bufferedData}}},Te=(e,{encoding:t,buffer:r,maxBuffer:n})=>{if(!(!e||!r))return t?rn(e,{encoding:t,maxBuffer:n}):rn.buffer(e,{maxBuffer:n})},ro=async({stdout:e,stderr:t,all:r},{encoding:n,buffer:o,maxBuffer:s},i)=>{let a=Te(e,{encoding:n,buffer:o,maxBuffer:s}),c=Te(t,{encoding:n,buffer:o,maxBuffer:s}),l=Te(r,{encoding:n,buffer:o,maxBuffer:s*2});try{return await Promise.all([i,a,c,l])}catch(f){return Promise.all([{error:f,signal:f.signal,timedOut:f.timedOut},ve(e,a),ve(t,c),ve(r,l)])}},oo=({input:e})=>{if(on(e))throw new TypeError("The `input` option cannot be a stream in sync mode")};sn.exports={handleInput:to,makeAllStream:no,getSpawnedResult:ro,validateInputSync:oo}});var ln=p((wi,cn)=>{"use strict";var io=(async()=>{})().constructor.prototype,so=["then","catch","finally"].map(e=>[e,Reflect.getOwnPropertyDescriptor(io,e)]),ao=(e,t)=>{for(let[r,n]of so){let o=typeof t=="function"?(...s)=>Reflect.apply(n.value,t(),s):n.value.bind(t);Reflect.defineProperty(e,r,{...n,value:o})}return e},co=e=>new Promise((t,r)=>{e.on("exit",(n,o)=>{t({exitCode:n,signal:o})}),e.on("error",n=>{r(n)}),e.stdin&&e.stdin.on("error",n=>{r(n)})});cn.exports={mergePromise:ao,getSpawnedPromise:co}});var un=p((yi,dn)=>{"use strict";var pn=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],lo=/^[\w.-]+$/,po=/"/g,uo=e=>typeof e!="string"||lo.test(e)?e:`"${e.replace(po,'\\"')}"`,fo=(e,t)=>pn(e,t).join(" "),mo=(e,t)=>pn(e,t).map(r=>uo(r)).join(" "),ho=/ +/g,go=e=>{let t=[];for(let r of e.trim().split(ho)){let n=t[t.length-1];n&&n.endsWith("\\")?t[t.length-1]=`${n.slice(0,-1)} ${r}`:t.push(r)}return t};dn.exports={joinCommand:fo,getEscapedCommand:mo,parseCommand:go}});var wn=p((Ii,j)=>{"use strict";var So=require("path"),Ce=require("child_process"),Po=xt(),wo=vt(),yo=Dt(),Io=$t(),se=Bt(),mn=qt(),{spawnedKill:xo,spawnedCancel:bo,setupTimeout:vo,validateTimeout:To,setExitHandler:Co}=zt(),{handleInput:Do,getSpawnedResult:Fo,makeAllStream:Ro,validateInputSync:Eo}=an(),{mergePromise:fn,getSpawnedPromise:$o}=ln(),{joinCommand:hn,parseCommand:gn,getEscapedCommand:Sn}=un(),Ao=1e3*1e3*100,No=({env:e,extendEnv:t,preferLocal:r,localDir:n,execPath:o})=>{let s=t?{...process.env,...e}:e;return r?yo.env({env:s,cwd:n,execPath:o}):s},Pn=(e,t,r={})=>{let n=Po._parse(e,t,r);return e=n.command,t=n.args,r=n.options,r={maxBuffer:Ao,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:r.cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...r},r.env=No(r),r.stdio=mn(r),process.platform==="win32"&&So.basename(e,".exe")==="cmd"&&t.unshift("/q"),{file:e,args:t,options:r,parsed:n}},_=(e,t,r)=>typeof t!="string"&&!Buffer.isBuffer(t)?r===void 0?void 0:"":e.stripFinalNewline?wo(t):t,ae=(e,t,r)=>{let n=Pn(e,t,r),o=hn(e,t),s=Sn(e,t);To(n.options);let i;try{i=Ce.spawn(n.file,n.args,n.options)}catch(y){let I=new Ce.ChildProcess,b=Promise.reject(se({error:y,stdout:"",stderr:"",all:"",command:o,escapedCommand:s,parsed:n,timedOut:!1,isCanceled:!1,killed:!1}));return fn(I,b)}let a=$o(i),c=vo(i,n.options,a),l=Co(i,n.options,c),f={isCanceled:!1};i.kill=xo.bind(null,i.kill.bind(i)),i.cancel=bo.bind(null,i,f);let S=Io(async()=>{let[{error:y,exitCode:I,signal:b,timedOut:E},X,V,An]=await Fo(i,n.options,l),$e=_(n.options,X),Ae=_(n.options,V),Ne=_(n.options,An);if(y||I!==0||b!==null){let Oe=se({error:y,exitCode:I,signal:b,stdout:$e,stderr:Ae,all:Ne,command:o,escapedCommand:s,parsed:n,timedOut:E,isCanceled:f.isCanceled,killed:i.killed});if(!n.options.reject)return Oe;throw Oe}return{command:o,escapedCommand:s,exitCode:0,stdout:$e,stderr:Ae,all:Ne,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}});return Do(i,n.options.input),i.all=Ro(i,n.options),fn(i,S)};j.exports=ae;j.exports.sync=(e,t,r)=>{let n=Pn(e,t,r),o=hn(e,t),s=Sn(e,t);Eo(n.options);let i;try{i=Ce.spawnSync(n.file,n.args,n.options)}catch(l){throw se({error:l,stdout:"",stderr:"",all:"",command:o,escapedCommand:s,parsed:n,timedOut:!1,isCanceled:!1,killed:!1})}let a=_(n.options,i.stdout,i.error),c=_(n.options,i.stderr,i.error);if(i.error||i.status!==0||i.signal!==null){let l=se({stdout:a,stderr:c,error:i.error,signal:i.signal,exitCode:i.status,command:o,escapedCommand:s,parsed:n,timedOut:i.error&&i.error.code==="ETIMEDOUT",isCanceled:!1,killed:i.signal!==null});if(!n.options.reject)return l;throw l}return{command:o,escapedCommand:s,exitCode:0,stdout:a,stderr:c,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}};j.exports.command=(e,t)=>{let[r,...n]=gn(e);return ae(r,n,t)};j.exports.commandSync=(e,t)=>{let[r,...n]=gn(e);return ae.sync(r,n,t)};j.exports.node=(e,t,r={})=>{t&&!Array.isArray(t)&&typeof t=="object"&&(r=t,t=[]);let n=mn.node(r),o=process.execArgv.filter(a=>!a.startsWith("--inspect")),{nodePath:s=process.execPath,nodeOptions:i=o}=r;return ae(s,[...i,e,...Array.isArray(t)?t:[]],{...r,stdin:void 0,stdout:void 0,stderr:void 0,stdio:n,shell:!1})}});var Bo={};jn(Bo,{default:()=>$n});module.exports=Bn(Bo);var u=require("@raycast/api");var x=require("child_process"),En=C(require("fs")),U=C(require("os")),g=C(require("path")),w=require("@raycast/api");var B=C(require("fs"));var bn=C(require("path"));var De=C(require("node:process"),1),Fe=C(wn(),1);async function R(e,{humanReadableOutput:t=!0}={}){if(De.default.platform!=="darwin")throw new Error("macOS only");let r=t?[]:["-ss"],{stdout:n}=await(0,Fe.default)("osascript",["-e",e,r]);return n}function Re(e,{humanReadableOutput:t=!0}={}){if(De.default.platform!=="darwin")throw new Error("macOS only");let r=t?[]:["-ss"],{stdout:n}=Fe.default.sync("osascript",["-e",e,...r]);return n}var m=require("@raycast/api");var yn=async()=>R(`use framework "AppKit"
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
      
      return filePaths`),In=async e=>{let t=Array.isArray(e)?e:[e];await R(`use framework "Foundation"
      use framework "PDFKit"
      use scripting additions
  
      set thePasteboard to current application's NSPasteboard's generalPasteboard()
      thePasteboard's clearContents()
      
      -- Handle PDFs separately
      set pdfPaths to {"${t.filter(r=>r.endsWith(".pdf")).join('", "')}"}
  
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
      end if`)};var Go=async()=>R(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

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
    end tell`),ko=async()=>R(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

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
    end tell`),vn=async()=>{let t=(await m.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let r of t)B.existsSync(r)&&await B.promises.rm(r);await m.LocalStorage.removeItem("itemsToRemove")},Tn=async()=>{let e=[],r=(0,m.getPreferenceValues)().inputMethod,n=!1;if(r=="Clipboard")try{let i=(await yn()).split(", ");if(await m.LocalStorage.setItem("itemsToRemove",i.join(", ")),i.filter(a=>a.trim().length>0).length>0)return i}catch{console.error("Couldn't get images from clipboard"),n=!0}let o=r;try{o=(await(0,m.getFrontmostApplication)()).name}catch{console.error("Couldn't get frontmost application")}try{if(o=="Path Finder"&&r=="Path Finder")return(await ko()).split(", ").forEach(a=>{e.includes(a)||e.push(a)}),e}catch{console.error("Couldn't get images from Path Finder"),n=!0}let s=(await Go()).split(", ");return o=="Finder"||r=="Finder"||n?e.push(...s):s.forEach(i=>{i.split("/").at(-2)=="Desktop"&&!e.includes(i)&&e.push(i)}),e},Cn=async e=>{let t=(0,m.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await In(e),xn(e)):t.imageResultHandling=="openInPreview"&&(console.log(e),await Lo(e),xn(e))};var Dn=(e,t,r)=>{Re(`use framework "Foundation"
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
  pngData's writeToFile:"${r}" atomically:false`)},Fn=(e,t,r)=>{let n=(0,m.getPreferenceValues)();Re(`use framework "Foundation"
  use framework "PDFKit"
  
  -- Load the PDF file as NSData
  set pdfData to current application's NSData's dataWithContentsOfFile:"${t}"
  
  -- Create a PDFDocument from the PDF data
  set pdfDoc to current application's PDFDocument's alloc()'s initWithData:pdfData

  ${n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview"?"set pageImages to current application's NSMutableArray's alloc()'s init()":""}
  
  set pageCount to (pdfDoc's pageCount()) - 1
  repeat with pageIndex from 0 to pageCount
    -- Create an NSImage from each page of the PDF document
    set pdfPage to (pdfDoc's pageAtIndex:pageIndex)
    set pdfRect to (pdfPage's boundsForBox:(current application's kPDFDisplayBoxMediaBox))
    set pdfImage to (current application's NSImage's alloc()'s initWithSize:{item 1 of item 2 of pdfRect, item 2 of item 2 of pdfRect})
    pdfImage's lockFocus()
    (pdfPage's drawWithBox:(current application's kPDFDisplayBoxMediaBox))
    pdfImage's unlockFocus()

    ${n.imageResultHandling=="copyToClipboard"?"pageImages's addObject:pdfImage":`
  
    -- Convert the NSImage to PNG data
    set pngData to pdfImage's TIFFRepresentation()
    set pngRep to (current application's NSBitmapImageRep's imageRepWithData:pngData)
    set pngData to (pngRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value))
    
    -- Write the PNG data to a new file
    set filePath to "${r}/page-" & pageIndex + 1 & ".${e.toLowerCase()}"
    set fileURL to current application's NSURL's fileURLWithPath:filePath
    ${n.imageResultHandling=="openInPreview"?"pageImages's addObject:fileURL":""}
    pngData's writeToURL:fileURL atomically:false`}
  end repeat

  ${n.imageResultHandling=="openInPreview"?`
    -- Open the images of each page in Preview, then delete their temporary files
    tell application "Finder"
      set previewPath to POSIX path of ((application file id "com.apple.Preview") as text)
      set previewURL to current application's NSURL's fileURLWithPath:previewPath
    end tell

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()
    workspace's openURLs:pageImages withApplicationAtURL:previewURL configuration:config completionHandler:(missing value)
    delay 1
    
    set fileManager to current application's NSFileManager's defaultManager()
    repeat with imageURL in pageImages
      fileManager's removeItemAtURL:imageURL |error|:(missing value)
    end repeat
    `:""}
  
  ${n.imageResultHandling=="copyToClipboard"?`
    -- Copy the image of each page to the clipboard
    set thePasteboard to current application's NSPasteboard's generalPasteboard()
    thePasteboard's clearContents()
    thePasteboard's writeObjects:pageImages`:""}`)};var Lo=async e=>{let t=Array.isArray(e)?e:[e],r=t.some(n=>bn.default.extname(n)==".svg");await R(`use framework "Foundation"
    use scripting additions
    set pageImages to {${t.map(n=>`current application's NSURL's fileURLWithPath:"${n}"`).join(", ")}}

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()

    ${r?`tell application "Finder"
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
                repeat with thePath in {"${t.map(n=>encodeURI(`file://${n}`)).join('", "')}"}
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
          end tell`}`)},xn=e=>{let t=Array.isArray(e)?e:[e];for(let r of t)B.unlinkSync(r)};var Rn=async(e,t,r)=>{console.error(t),r?(r.title=e,r.message=t.message,r.style=m.Toast.Style.Failure,r.primaryAction={title:"Copy Error",onAction:async()=>{await m.Clipboard.copy(t.message)}}):r=await(0,m.showToast)({title:e,message:t.message,style:m.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await m.Clipboard.copy(t.message)}}})};async function Ee(e,t){let r=(0,w.getPreferenceValues)(),n=[];for(let o of e){let s=g.default.extname(o).slice(1),i=g.default.join(g.default.dirname(o),g.default.basename(o,s)+t.toLowerCase());r.imageResultHandling=="saveToDownloads"?i=g.default.join(U.homedir(),"Downloads",g.default.basename(i)):r.imageResultHandling=="saveToDesktop"?i=g.default.join(U.homedir(),"Desktop",g.default.basename(i)):(r.imageResultHandling=="copyToClipboard"||r.imageResultHandling=="openInPreview")&&(i=g.default.join(U.tmpdir(),g.default.basename(i)));let a=2;for(;En.existsSync(i)&&U.tmpdir()!=g.default.dirname(i);)i=g.default.join(g.default.dirname(i),g.default.basename(i,`.${t.toLowerCase()}`)+` (${a})${g.default.extname(i)}`),a++;if(t==="WEBP")(0,x.execSync)(`chmod +x ${w.environment.assetsPath}/webp/cwebp`),(0,x.execSync)(`${w.environment.assetsPath}/webp/cwebp "${o}" -o "${i}"`);else if(s.toLowerCase()=="svg")Dn(t,o,i);else if(t=="SVG"){let c=`${w.environment.supportPath}/tmp.bmp`;if((0,x.execSync)(`chmod +x ${w.environment.assetsPath}/potrace/potrace`),s.toLowerCase()=="webp"){let l=`${w.environment.supportPath}/tmp.png`;(0,x.execSync)(`chmod +x ${w.environment.assetsPath}/webp/dwebp`),(0,x.execSync)(`${w.environment.assetsPath}/webp/dwebp "${o}" -o "${l}"`),(0,x.execSync)(`sips --setProperty format "bmp" "${l}" --out "${c}" && ${w.environment.assetsPath}/potrace/potrace -s --tight -o "${i}" "${c}"; rm "${c}"; rm "${l}"`)}else(0,x.execSync)(`sips --setProperty format "bmp" "${o}" --out "${c}" && ${w.environment.assetsPath}/potrace/potrace -s --tight -o "${i}" "${c}"; rm "${c}"`)}else if(s.toLowerCase()=="webp")(0,x.execSync)(`chmod +x ${w.environment.assetsPath}/webp/dwebp`),(0,x.execSync)(`${w.environment.assetsPath}/webp/dwebp "${o}" -o "${i}"`);else if(s.toLowerCase()=="pdf"){let c=g.default.basename(o),l=`${c?.substring(0,c.lastIndexOf("."))} ${t}`,f=g.default.join(i.split("/").slice(0,-1).join("/"),l);(0,x.execSync)(`mkdir -p "${f}"`),Fn(t,o,f)}else(0,x.execSync)(`sips --setProperty format ${t.toLowerCase()} "${o}" --out "${i}"`);n.push(i)}await Cn(n)}var T=require("react/jsx-runtime"),jo=["ASTC","BMP","DDS","EXR","GIF","HEIC","HEICS","ICNS","ICO","JPEG","JP2","KTX","PBM","PDF","PNG","PSD","PVR","TGA","TIFF","WEBP","SVG"];function $n(){let e=(0,u.getPreferenceValues)(),t=jo.filter(n=>e[`show${n}`]),r=async n=>{let o=await Tn();if(o.length===0||o.length===1&&o[0]===""){await(0,u.showToast)({title:"No images selected",style:u.Toast.Style.Failure});return}let s=await(0,u.showToast)({title:"Conversion in progress...",style:u.Toast.Style.Animated}),i=`image${o.length===1?"":"s"}`;try{await Ee(o,n),s.title=`Converted ${o.length.toString()} ${i} to ${n}`,s.style=u.Toast.Style.Success}catch(a){await Rn(`Failed to convert ${o.length.toString()} ${i} to ${n}`,a,s)}finally{await vn()}};return(0,T.jsxs)(u.List,{searchBarPlaceholder:"Search image transformations...",children:[(0,T.jsx)(u.List.EmptyView,{title:"No Formats Enabled",description:"Enable formats in the command preferences (\u2318\u21E7,)",icon:u.Icon.Image,actions:(0,T.jsx)(u.ActionPanel,{children:(0,T.jsx)(u.Action,{title:"Open Command Preferences",onAction:async()=>await(0,u.openCommandPreferences)(),shortcut:{modifiers:["cmd","shift"],key:","}})})}),t.map(n=>(0,T.jsx)(u.List.Item,{title:n,actions:(0,T.jsx)(u.ActionPanel,{children:(0,T.jsx)(u.Action,{title:`Convert to ${n}`,onAction:async()=>await r(n)})})},n))]})}
