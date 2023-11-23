"use strict";var En=Object.create;var z=Object.defineProperty;var An=Object.getOwnPropertyDescriptor;var kn=Object.getOwnPropertyNames;var On=Object.getPrototypeOf,Mn=Object.prototype.hasOwnProperty;var l=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),$n=(e,t)=>{for(var n in t)z(e,n,{get:t[n],enumerable:!0})},Ee=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of kn(t))!Mn.call(e,a)&&a!==n&&z(e,a,{get:()=>t[a],enumerable:!(i=An(t,a))||i.enumerable});return e};var F=(e,t,n)=>(n=e!=null?En(On(e)):{},Ee(t||!e||!e.__esModule?z(n,"default",{value:e,enumerable:!0}):n,e)),Gn=e=>Ee(z({},"__esModule",{value:!0}),e);var $e=l((ja,Me)=>{Me.exports=Oe;Oe.sync=Ln;var Ae=require("fs");function Bn(e,t){var n=t.pathExt!==void 0?t.pathExt:process.env.PATHEXT;if(!n||(n=n.split(";"),n.indexOf("")!==-1))return!0;for(var i=0;i<n.length;i++){var a=n[i].toLowerCase();if(a&&e.substr(-a.length).toLowerCase()===a)return!0}return!1}function ke(e,t,n){return!e.isSymbolicLink()&&!e.isFile()?!1:Bn(t,n)}function Oe(e,t,n){Ae.stat(e,function(i,a){n(i,i?!1:ke(a,e,t))})}function Ln(e,t){return ke(Ae.statSync(e),e,t)}});var Ue=l((Ua,je)=>{je.exports=Be;Be.sync=jn;var Ge=require("fs");function Be(e,t,n){Ge.stat(e,function(i,a){n(i,i?!1:Le(a,t))})}function jn(e,t){return Le(Ge.statSync(e),t)}function Le(e,t){return e.isFile()&&Un(e,t)}function Un(e,t){var n=e.mode,i=e.uid,a=e.gid,r=t.uid!==void 0?t.uid:process.getuid&&process.getuid(),o=t.gid!==void 0?t.gid:process.getgid&&process.getgid(),s=parseInt("100",8),p=parseInt("010",8),u=parseInt("001",8),d=s|p,b=n&u||n&p&&a===o||n&s&&i===r||n&d&&r===0;return b}});var We=l((Wa,_e)=>{var _a=require("fs"),K;process.platform==="win32"||global.TESTING_WINDOWS?K=$e():K=Ue();_e.exports=se;se.sync=_n;function se(e,t,n){if(typeof t=="function"&&(n=t,t={}),!n){if(typeof Promise!="function")throw new TypeError("callback not provided");return new Promise(function(i,a){se(e,t||{},function(r,o){r?a(r):i(o)})})}K(e,t||{},function(i,a){i&&(i.code==="EACCES"||t&&t.ignoreErrors)&&(i=null,a=!1),n(i,a)})}function _n(e,t){try{return K.sync(e,t||{})}catch(n){if(t&&t.ignoreErrors||n.code==="EACCES")return!1;throw n}}});var Ze=l((Ha,Ve)=>{var R=process.platform==="win32"||process.env.OSTYPE==="cygwin"||process.env.OSTYPE==="msys",He=require("path"),Wn=R?";":":",qe=We(),Xe=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"}),ze=(e,t)=>{let n=t.colon||Wn,i=e.match(/\//)||R&&e.match(/\\/)?[""]:[...R?[process.cwd()]:[],...(t.path||process.env.PATH||"").split(n)],a=R?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",r=R?a.split(n):[""];return R&&e.indexOf(".")!==-1&&r[0]!==""&&r.unshift(""),{pathEnv:i,pathExt:r,pathExtExe:a}},Ke=(e,t,n)=>{typeof t=="function"&&(n=t,t={}),t||(t={});let{pathEnv:i,pathExt:a,pathExtExe:r}=ze(e,t),o=[],s=u=>new Promise((d,b)=>{if(u===i.length)return t.all&&o.length?d(o):b(Xe(e));let I=i[u],w=/^".*"$/.test(I)?I.slice(1,-1):I,S=He.join(w,e),P=!w&&/^\.[\\\/]/.test(e)?e.slice(0,2)+S:S;d(p(P,u,0))}),p=(u,d,b)=>new Promise((I,w)=>{if(b===a.length)return I(s(d+1));let S=a[b];qe(u+S,{pathExt:r},(P,T)=>{if(!P&&T)if(t.all)o.push(u+S);else return I(u+S);return I(p(u,d,b+1))})});return n?s(0).then(u=>n(null,u),n):s(0)},Hn=(e,t)=>{t=t||{};let{pathEnv:n,pathExt:i,pathExtExe:a}=ze(e,t),r=[];for(let o=0;o<n.length;o++){let s=n[o],p=/^".*"$/.test(s)?s.slice(1,-1):s,u=He.join(p,e),d=!p&&/^\.[\\\/]/.test(e)?e.slice(0,2)+u:u;for(let b=0;b<i.length;b++){let I=d+i[b];try{if(qe.sync(I,{pathExt:a}))if(t.all)r.push(I);else return I}catch{}}}if(t.all&&r.length)return r;if(t.nothrow)return null;throw Xe(e)};Ve.exports=Ke;Ke.sync=Hn});var le=l((qa,ce)=>{"use strict";var Je=(e={})=>{let t=e.env||process.env;return(e.platform||process.platform)!=="win32"?"PATH":Object.keys(t).reverse().find(i=>i.toUpperCase()==="PATH")||"Path"};ce.exports=Je;ce.exports.default=Je});var tt=l((Xa,et)=>{"use strict";var Ye=require("path"),qn=Ze(),Xn=le();function Qe(e,t){let n=e.options.env||process.env,i=process.cwd(),a=e.options.cwd!=null,r=a&&process.chdir!==void 0&&!process.chdir.disabled;if(r)try{process.chdir(e.options.cwd)}catch{}let o;try{o=qn.sync(e.command,{path:n[Xn({env:n})],pathExt:t?Ye.delimiter:void 0})}catch{}finally{r&&process.chdir(i)}return o&&(o=Ye.resolve(a?e.options.cwd:"",o)),o}function zn(e){return Qe(e)||Qe(e,!0)}et.exports=zn});var nt=l((za,ue)=>{"use strict";var pe=/([()\][%!^"`<>&|;, *?])/g;function Kn(e){return e=e.replace(pe,"^$1"),e}function Vn(e,t){return e=`${e}`,e=e.replace(/(\\*)"/g,'$1$1\\"'),e=e.replace(/(\\*)$/,"$1$1"),e=`"${e}"`,e=e.replace(pe,"^$1"),t&&(e=e.replace(pe,"^$1")),e}ue.exports.command=Kn;ue.exports.argument=Vn});var at=l((Ka,it)=>{"use strict";it.exports=/^#!(.*)/});var ot=l((Va,rt)=>{"use strict";var Zn=at();rt.exports=(e="")=>{let t=e.match(Zn);if(!t)return null;let[n,i]=t[0].replace(/#! ?/,"").split(" "),a=n.split("/").pop();return a==="env"?i:i?`${a} ${i}`:a}});var ct=l((Za,st)=>{"use strict";var me=require("fs"),Jn=ot();function Yn(e){let n=Buffer.alloc(150),i;try{i=me.openSync(e,"r"),me.readSync(i,n,0,150,0),me.closeSync(i)}catch{}return Jn(n.toString())}st.exports=Yn});var mt=l((Ja,ut)=>{"use strict";var Qn=require("path"),lt=tt(),pt=nt(),ei=ct(),ti=process.platform==="win32",ni=/\.(?:com|exe)$/i,ii=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function ai(e){e.file=lt(e);let t=e.file&&ei(e.file);return t?(e.args.unshift(e.file),e.command=t,lt(e)):e.file}function ri(e){if(!ti)return e;let t=ai(e),n=!ni.test(t);if(e.options.forceShell||n){let i=ii.test(t);e.command=Qn.normalize(e.command),e.command=pt.command(e.command),e.args=e.args.map(r=>pt.argument(r,i));let a=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${a}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}function oi(e,t,n){t&&!Array.isArray(t)&&(n=t,t=null),t=t?t.slice(0):[],n=Object.assign({},n);let i={command:e,args:t,options:n,file:void 0,original:{command:e,args:t}};return n.shell?i:ri(i)}ut.exports=oi});var ht=l((Ya,ft)=>{"use strict";var de=process.platform==="win32";function fe(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function si(e,t){if(!de)return;let n=e.emit;e.emit=function(i,a){if(i==="exit"){let r=dt(a,t,"spawn");if(r)return n.call(e,"error",r)}return n.apply(e,arguments)}}function dt(e,t){return de&&e===1&&!t.file?fe(t.original,"spawn"):null}function ci(e,t){return de&&e===1&&!t.file?fe(t.original,"spawnSync"):null}ft.exports={hookChildProcess:si,verifyENOENT:dt,verifyENOENTSync:ci,notFoundError:fe}});var bt=l((Qa,N)=>{"use strict";var gt=require("child_process"),he=mt(),ge=ht();function It(e,t,n){let i=he(e,t,n),a=gt.spawn(i.command,i.args,i.options);return ge.hookChildProcess(a,i),a}function li(e,t,n){let i=he(e,t,n),a=gt.spawnSync(i.command,i.args,i.options);return a.error=a.error||ge.verifyENOENTSync(a.status,i),a}N.exports=It;N.exports.spawn=It;N.exports.sync=li;N.exports._parse=he;N.exports._enoent=ge});var wt=l((er,yt)=>{"use strict";yt.exports=e=>{let t=typeof e=="string"?`
`:`
`.charCodeAt(),n=typeof e=="string"?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===n&&(e=e.slice(0,e.length-1)),e}});var xt=l((tr,j)=>{"use strict";var L=require("path"),St=le(),Pt=e=>{e={cwd:process.cwd(),path:process.env[St()],execPath:process.execPath,...e};let t,n=L.resolve(e.cwd),i=[];for(;t!==n;)i.push(L.join(n,"node_modules/.bin")),t=n,n=L.resolve(n,"..");let a=L.resolve(e.cwd,e.execPath,"..");return i.push(a),i.concat(e.path).join(L.delimiter)};j.exports=Pt;j.exports.default=Pt;j.exports.env=e=>{e={env:process.env,...e};let t={...e.env},n=St({env:t});return e.path=t[n],t[n]=j.exports(e),t}});var Ft=l((nr,Ie)=>{"use strict";var Ct=(e,t)=>{for(let n of Reflect.ownKeys(t))Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e};Ie.exports=Ct;Ie.exports.default=Ct});var Dt=l((ir,Z)=>{"use strict";var pi=Ft(),V=new WeakMap,vt=(e,t={})=>{if(typeof e!="function")throw new TypeError("Expected a function");let n,i=0,a=e.displayName||e.name||"<anonymous>",r=function(...o){if(V.set(r,++i),i===1)n=e.apply(this,o),e=null;else if(t.throw===!0)throw new Error(`Function \`${a}\` can only be called once`);return n};return pi(r,e),V.set(r,i),r};Z.exports=vt;Z.exports.default=vt;Z.exports.callCount=e=>{if(!V.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return V.get(e)}});var Tt=l(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.SIGNALS=void 0;var ui=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];J.SIGNALS=ui});var be=l(E=>{"use strict";Object.defineProperty(E,"__esModule",{value:!0});E.SIGRTMAX=E.getRealtimeSignals=void 0;var mi=function(){let e=Nt-Rt+1;return Array.from({length:e},di)};E.getRealtimeSignals=mi;var di=function(e,t){return{name:`SIGRT${t+1}`,number:Rt+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},Rt=34,Nt=64;E.SIGRTMAX=Nt});var Et=l(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.getSignals=void 0;var fi=require("os"),hi=Tt(),gi=be(),Ii=function(){let e=(0,gi.getRealtimeSignals)();return[...hi.SIGNALS,...e].map(bi)};Y.getSignals=Ii;var bi=function({name:e,number:t,description:n,action:i,forced:a=!1,standard:r}){let{signals:{[e]:o}}=fi.constants,s=o!==void 0;return{name:e,number:s?o:t,description:n,supported:s,action:i,forced:a,standard:r}}});var kt=l(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.signalsByNumber=A.signalsByName=void 0;var yi=require("os"),At=Et(),wi=be(),Si=function(){return(0,At.getSignals)().reduce(Pi,{})},Pi=function(e,{name:t,number:n,description:i,supported:a,action:r,forced:o,standard:s}){return{...e,[t]:{name:t,number:n,description:i,supported:a,action:r,forced:o,standard:s}}},xi=Si();A.signalsByName=xi;var Ci=function(){let e=(0,At.getSignals)(),t=wi.SIGRTMAX+1,n=Array.from({length:t},(i,a)=>Fi(a,e));return Object.assign({},...n)},Fi=function(e,t){let n=vi(e,t);if(n===void 0)return{};let{name:i,description:a,supported:r,action:o,forced:s,standard:p}=n;return{[e]:{name:i,number:e,description:a,supported:r,action:o,forced:s,standard:p}}},vi=function(e,t){let n=t.find(({name:i})=>yi.constants.signals[i]===e);return n!==void 0?n:t.find(i=>i.number===e)},Di=Ci();A.signalsByNumber=Di});var Mt=l((cr,Ot)=>{"use strict";var{signalsByName:Ti}=kt(),Ri=({timedOut:e,timeout:t,errorCode:n,signal:i,signalDescription:a,exitCode:r,isCanceled:o})=>e?`timed out after ${t} milliseconds`:o?"was canceled":n!==void 0?`failed with ${n}`:i!==void 0?`was killed with ${i} (${a})`:r!==void 0?`failed with exit code ${r}`:"failed",Ni=({stdout:e,stderr:t,all:n,error:i,signal:a,exitCode:r,command:o,escapedCommand:s,timedOut:p,isCanceled:u,killed:d,parsed:{options:{timeout:b}}})=>{r=r===null?void 0:r,a=a===null?void 0:a;let I=a===void 0?void 0:Ti[a].description,w=i&&i.code,P=`Command ${Ri({timedOut:p,timeout:b,errorCode:w,signal:a,signalDescription:I,exitCode:r,isCanceled:u})}: ${o}`,T=Object.prototype.toString.call(i)==="[object Error]",q=T?`${P}
${i.message}`:P,X=[q,t,e].filter(Boolean).join(`
`);return T?(i.originalMessage=i.message,i.message=X):i=new Error(X),i.shortMessage=q,i.command=o,i.escapedCommand=s,i.exitCode=r,i.signal=a,i.signalDescription=I,i.stdout=e,i.stderr=t,n!==void 0&&(i.all=n),"bufferedData"in i&&delete i.bufferedData,i.failed=!0,i.timedOut=!!p,i.isCanceled=u,i.killed=d&&!p,i};Ot.exports=Ni});var Gt=l((lr,ye)=>{"use strict";var Q=["stdin","stdout","stderr"],Ei=e=>Q.some(t=>e[t]!==void 0),$t=e=>{if(!e)return;let{stdio:t}=e;if(t===void 0)return Q.map(i=>e[i]);if(Ei(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${Q.map(i=>`\`${i}\``).join(", ")}`);if(typeof t=="string")return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let n=Math.max(t.length,Q.length);return Array.from({length:n},(i,a)=>t[a])};ye.exports=$t;ye.exports.node=e=>{let t=$t(e);return t==="ipc"?"ipc":t===void 0||typeof t=="string"?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]}});var Bt=l((pr,ee)=>{ee.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"];process.platform!=="win32"&&ee.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT");process.platform==="linux"&&ee.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")});var Wt=l((ur,M)=>{var m=global.process,v=function(e){return e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function"};v(m)?(Lt=require("assert"),k=Bt(),jt=/^win/i.test(m.platform),U=require("events"),typeof U!="function"&&(U=U.EventEmitter),m.__signal_exit_emitter__?f=m.__signal_exit_emitter__:(f=m.__signal_exit_emitter__=new U,f.count=0,f.emitted={}),f.infinite||(f.setMaxListeners(1/0),f.infinite=!0),M.exports=function(e,t){if(!v(global.process))return function(){};Lt.equal(typeof e,"function","a callback must be provided for exit handler"),O===!1&&we();var n="exit";t&&t.alwaysLast&&(n="afterexit");var i=function(){f.removeListener(n,e),f.listeners("exit").length===0&&f.listeners("afterexit").length===0&&te()};return f.on(n,e),i},te=function(){!O||!v(global.process)||(O=!1,k.forEach(function(t){try{m.removeListener(t,ne[t])}catch{}}),m.emit=ie,m.reallyExit=Se,f.count-=1)},M.exports.unload=te,D=function(t,n,i){f.emitted[t]||(f.emitted[t]=!0,f.emit(t,n,i))},ne={},k.forEach(function(e){ne[e]=function(){if(v(global.process)){var n=m.listeners(e);n.length===f.count&&(te(),D("exit",null,e),D("afterexit",null,e),jt&&e==="SIGHUP"&&(e="SIGINT"),m.kill(m.pid,e))}}}),M.exports.signals=function(){return k},O=!1,we=function(){O||!v(global.process)||(O=!0,f.count+=1,k=k.filter(function(t){try{return m.on(t,ne[t]),!0}catch{return!1}}),m.emit=_t,m.reallyExit=Ut)},M.exports.load=we,Se=m.reallyExit,Ut=function(t){v(global.process)&&(m.exitCode=t||0,D("exit",m.exitCode,null),D("afterexit",m.exitCode,null),Se.call(m,m.exitCode))},ie=m.emit,_t=function(t,n){if(t==="exit"&&v(global.process)){n!==void 0&&(m.exitCode=n);var i=ie.apply(this,arguments);return D("exit",m.exitCode,null),D("afterexit",m.exitCode,null),i}else return ie.apply(this,arguments)}):M.exports=function(){return function(){}};var Lt,k,jt,U,f,te,D,ne,O,we,Se,Ut,ie,_t});var qt=l((mr,Ht)=>{"use strict";var Ai=require("os"),ki=Wt(),Oi=1e3*5,Mi=(e,t="SIGTERM",n={})=>{let i=e(t);return $i(e,t,n,i),i},$i=(e,t,n,i)=>{if(!Gi(t,n,i))return;let a=Li(n),r=setTimeout(()=>{e("SIGKILL")},a);r.unref&&r.unref()},Gi=(e,{forceKillAfterTimeout:t},n)=>Bi(e)&&t!==!1&&n,Bi=e=>e===Ai.constants.signals.SIGTERM||typeof e=="string"&&e.toUpperCase()==="SIGTERM",Li=({forceKillAfterTimeout:e=!0})=>{if(e===!0)return Oi;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e},ji=(e,t)=>{e.kill()&&(t.isCanceled=!0)},Ui=(e,t,n)=>{e.kill(t),n(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))},_i=(e,{timeout:t,killSignal:n="SIGTERM"},i)=>{if(t===0||t===void 0)return i;let a,r=new Promise((s,p)=>{a=setTimeout(()=>{Ui(e,n,p)},t)}),o=i.finally(()=>{clearTimeout(a)});return Promise.race([r,o])},Wi=({timeout:e})=>{if(e!==void 0&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)},Hi=async(e,{cleanup:t,detached:n},i)=>{if(!t||n)return i;let a=ki(()=>{e.kill()});return i.finally(()=>{a()})};Ht.exports={spawnedKill:Mi,spawnedCancel:ji,setupTimeout:_i,validateTimeout:Wi,setExitHandler:Hi}});var zt=l((dr,Xt)=>{"use strict";var x=e=>e!==null&&typeof e=="object"&&typeof e.pipe=="function";x.writable=e=>x(e)&&e.writable!==!1&&typeof e._write=="function"&&typeof e._writableState=="object";x.readable=e=>x(e)&&e.readable!==!1&&typeof e._read=="function"&&typeof e._readableState=="object";x.duplex=e=>x.writable(e)&&x.readable(e);x.transform=e=>x.duplex(e)&&typeof e._transform=="function";Xt.exports=x});var Vt=l((fr,Kt)=>{"use strict";var{PassThrough:qi}=require("stream");Kt.exports=e=>{e={...e};let{array:t}=e,{encoding:n}=e,i=n==="buffer",a=!1;t?a=!(n||i):n=n||"utf8",i&&(n=null);let r=new qi({objectMode:a});n&&r.setEncoding(n);let o=0,s=[];return r.on("data",p=>{s.push(p),a?o=s.length:o+=p.length}),r.getBufferedValue=()=>t?s:i?Buffer.concat(s,o):s.join(""),r.getBufferedLength=()=>o,r}});var Zt=l((hr,_)=>{"use strict";var{constants:Xi}=require("buffer"),zi=require("stream"),{promisify:Ki}=require("util"),Vi=Vt(),Zi=Ki(zi.pipeline),ae=class extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}};async function Pe(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};let{maxBuffer:n}=t,i=Vi(t);return await new Promise((a,r)=>{let o=s=>{s&&i.getBufferedLength()<=Xi.MAX_LENGTH&&(s.bufferedData=i.getBufferedValue()),r(s)};(async()=>{try{await Zi(e,i),a()}catch(s){o(s)}})(),i.on("data",()=>{i.getBufferedLength()>n&&o(new ae)})}),i.getBufferedValue()}_.exports=Pe;_.exports.buffer=(e,t)=>Pe(e,{...t,encoding:"buffer"});_.exports.array=(e,t)=>Pe(e,{...t,array:!0});_.exports.MaxBufferError=ae});var Yt=l((gr,Jt)=>{"use strict";var{PassThrough:Ji}=require("stream");Jt.exports=function(){var e=[],t=new Ji({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=i,t.on("unpipe",a),Array.prototype.slice.call(arguments).forEach(n),t;function n(r){return Array.isArray(r)?(r.forEach(n),this):(e.push(r),r.once("end",a.bind(null,r)),r.once("error",t.emit.bind(t,"error")),r.pipe(t,{end:!1}),this)}function i(){return e.length==0}function a(r){e=e.filter(function(o){return o!==r}),!e.length&&t.readable&&t.end()}}});var nn=l((Ir,tn)=>{"use strict";var en=zt(),Qt=Zt(),Yi=Yt(),Qi=(e,t)=>{t===void 0||e.stdin===void 0||(en(t)?t.pipe(e.stdin):e.stdin.end(t))},ea=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let n=Yi();return e.stdout&&n.add(e.stdout),e.stderr&&n.add(e.stderr),n},xe=async(e,t)=>{if(e){e.destroy();try{return await t}catch(n){return n.bufferedData}}},Ce=(e,{encoding:t,buffer:n,maxBuffer:i})=>{if(!(!e||!n))return t?Qt(e,{encoding:t,maxBuffer:i}):Qt.buffer(e,{maxBuffer:i})},ta=async({stdout:e,stderr:t,all:n},{encoding:i,buffer:a,maxBuffer:r},o)=>{let s=Ce(e,{encoding:i,buffer:a,maxBuffer:r}),p=Ce(t,{encoding:i,buffer:a,maxBuffer:r}),u=Ce(n,{encoding:i,buffer:a,maxBuffer:r*2});try{return await Promise.all([o,s,p,u])}catch(d){return Promise.all([{error:d,signal:d.signal,timedOut:d.timedOut},xe(e,s),xe(t,p),xe(n,u)])}},na=({input:e})=>{if(en(e))throw new TypeError("The `input` option cannot be a stream in sync mode")};tn.exports={handleInput:Qi,makeAllStream:ea,getSpawnedResult:ta,validateInputSync:na}});var rn=l((br,an)=>{"use strict";var ia=(async()=>{})().constructor.prototype,aa=["then","catch","finally"].map(e=>[e,Reflect.getOwnPropertyDescriptor(ia,e)]),ra=(e,t)=>{for(let[n,i]of aa){let a=typeof t=="function"?(...r)=>Reflect.apply(i.value,t(),r):i.value.bind(t);Reflect.defineProperty(e,n,{...i,value:a})}return e},oa=e=>new Promise((t,n)=>{e.on("exit",(i,a)=>{t({exitCode:i,signal:a})}),e.on("error",i=>{n(i)}),e.stdin&&e.stdin.on("error",i=>{n(i)})});an.exports={mergePromise:ra,getSpawnedPromise:oa}});var cn=l((yr,sn)=>{"use strict";var on=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],sa=/^[\w.-]+$/,ca=/"/g,la=e=>typeof e!="string"||sa.test(e)?e:`"${e.replace(ca,'\\"')}"`,pa=(e,t)=>on(e,t).join(" "),ua=(e,t)=>on(e,t).map(n=>la(n)).join(" "),ma=/ +/g,da=e=>{let t=[];for(let n of e.trim().split(ma)){let i=t[t.length-1];i&&i.endsWith("\\")?t[t.length-1]=`${i.slice(0,-1)} ${n}`:t.push(n)}return t};sn.exports={joinCommand:pa,getEscapedCommand:ua,parseCommand:da}});var hn=l((wr,$)=>{"use strict";var fa=require("path"),Fe=require("child_process"),ha=bt(),ga=wt(),Ia=xt(),ba=Dt(),re=Mt(),pn=Gt(),{spawnedKill:ya,spawnedCancel:wa,setupTimeout:Sa,validateTimeout:Pa,setExitHandler:xa}=qt(),{handleInput:Ca,getSpawnedResult:Fa,makeAllStream:va,validateInputSync:Da}=nn(),{mergePromise:ln,getSpawnedPromise:Ta}=rn(),{joinCommand:un,parseCommand:mn,getEscapedCommand:dn}=cn(),Ra=1e3*1e3*100,Na=({env:e,extendEnv:t,preferLocal:n,localDir:i,execPath:a})=>{let r=t?{...process.env,...e}:e;return n?Ia.env({env:r,cwd:i,execPath:a}):r},fn=(e,t,n={})=>{let i=ha._parse(e,t,n);return e=i.command,t=i.args,n=i.options,n={maxBuffer:Ra,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:n.cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...n},n.env=Na(n),n.stdio=pn(n),process.platform==="win32"&&fa.basename(e,".exe")==="cmd"&&t.unshift("/q"),{file:e,args:t,options:n,parsed:i}},W=(e,t,n)=>typeof t!="string"&&!Buffer.isBuffer(t)?n===void 0?void 0:"":e.stripFinalNewline?ga(t):t,oe=(e,t,n)=>{let i=fn(e,t,n),a=un(e,t),r=dn(e,t);Pa(i.options);let o;try{o=Fe.spawn(i.file,i.args,i.options)}catch(w){let S=new Fe.ChildProcess,P=Promise.reject(re({error:w,stdout:"",stderr:"",all:"",command:a,escapedCommand:r,parsed:i,timedOut:!1,isCanceled:!1,killed:!1}));return ln(S,P)}let s=Ta(o),p=Sa(o,i.options,s),u=xa(o,i.options,p),d={isCanceled:!1};o.kill=ya.bind(null,o.kill.bind(o)),o.cancel=wa.bind(null,o,d);let I=ba(async()=>{let[{error:w,exitCode:S,signal:P,timedOut:T},q,X,Nn]=await Fa(o,i.options,u),De=W(i.options,q),Te=W(i.options,X),Re=W(i.options,Nn);if(w||S!==0||P!==null){let Ne=re({error:w,exitCode:S,signal:P,stdout:De,stderr:Te,all:Re,command:a,escapedCommand:r,parsed:i,timedOut:T,isCanceled:d.isCanceled,killed:o.killed});if(!i.options.reject)return Ne;throw Ne}return{command:a,escapedCommand:r,exitCode:0,stdout:De,stderr:Te,all:Re,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}});return Ca(o,i.options.input),o.all=va(o,i.options),ln(o,I)};$.exports=oe;$.exports.sync=(e,t,n)=>{let i=fn(e,t,n),a=un(e,t),r=dn(e,t);Da(i.options);let o;try{o=Fe.spawnSync(i.file,i.args,i.options)}catch(u){throw re({error:u,stdout:"",stderr:"",all:"",command:a,escapedCommand:r,parsed:i,timedOut:!1,isCanceled:!1,killed:!1})}let s=W(i.options,o.stdout,o.error),p=W(i.options,o.stderr,o.error);if(o.error||o.status!==0||o.signal!==null){let u=re({stdout:s,stderr:p,error:o.error,signal:o.signal,exitCode:o.status,command:a,escapedCommand:r,parsed:i,timedOut:o.error&&o.error.code==="ETIMEDOUT",isCanceled:!1,killed:o.signal!==null});if(!i.options.reject)return u;throw u}return{command:a,escapedCommand:r,exitCode:0,stdout:s,stderr:p,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}};$.exports.command=(e,t)=>{let[n,...i]=mn(e);return oe(n,i,t)};$.exports.commandSync=(e,t)=>{let[n,...i]=mn(e);return oe.sync(n,i,t)};$.exports.node=(e,t,n={})=>{t&&!Array.isArray(t)&&typeof t=="object"&&(n=t,t=[]);let i=pn.node(n),a=process.execArgv.filter(s=>!s.startsWith("--inspect")),{nodePath:r=process.execPath,nodeOptions:o=a}=n;return oe(r,[...o,e,...Array.isArray(t)?t:[]],{...n,stdin:void 0,stdout:void 0,stderr:void 0,stdio:i,shell:!1})}});var Ba={};$n(Ba,{default:()=>Rn});module.exports=Gn(Ba);var y=require("@raycast/api");var vn=F(require("fs")),B=F(require("os")),g=F(require("path")),Dn=require("@raycast/api");var G=F(require("fs"));var Sn=F(require("path"));var gn=F(require("node:process"),1),In=F(hn(),1);async function C(e,{humanReadableOutput:t=!0}={}){if(gn.default.platform!=="darwin")throw new Error("macOS only");let n=t?[]:["-ss"],{stdout:i}=await(0,In.default)("osascript",["-e",e,n]);return i}var h=require("@raycast/api");var bn=async()=>C(`use framework "AppKit"
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
      
      return filePaths`),yn=async e=>{let t=Array.isArray(e)?e:[e];await C(`use framework "Foundation"
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
      end if`)};var Aa=async()=>C(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

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
    end tell`),ka=async()=>C(`set imageTypes to {"PNG", "JPG", "JPEG", "TIF", "HEIF", "GIF", "ICO", "ICNS", "ASTC", "BMP", "DDS", "EXR", "JP2", "KTX", "Portable Bitmap", "Adobe Photoshop", "PVR", "TGA", "WebP", "SVG", "PDF", "HEIC"}

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
    end tell`),Pn=async()=>{let t=(await h.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let n of t)G.existsSync(n)&&await G.promises.rm(n);await h.LocalStorage.removeItem("itemsToRemove")},xn=async()=>{let e=[],n=(0,h.getPreferenceValues)().inputMethod,i=!1;if(n=="Clipboard")try{let o=(await bn()).split(", ");if(await h.LocalStorage.setItem("itemsToRemove",o.join(", ")),o.filter(s=>s.trim().length>0).length>0)return o}catch{console.error("Couldn't get images from clipboard"),i=!0}let a=n;try{a=(await(0,h.getFrontmostApplication)()).name}catch{console.error("Couldn't get frontmost application")}try{if(a=="Path Finder"&&n=="Path Finder")return(await ka()).split(", ").forEach(s=>{e.includes(s)||e.push(s)}),e}catch{console.error("Couldn't get images from Path Finder"),i=!0}let r=(await Aa()).split(", ");return a=="Finder"||n=="Finder"||i?e.push(...r):r.forEach(o=>{o.split("/").at(-2)=="Desktop"&&!e.includes(o)&&e.push(o)}),e},Cn=async e=>{let t=(0,h.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await yn(e),wn(e)):t.imageResultHandling=="openInPreview"&&(console.log(e),await Oa(e),wn(e))};var Oa=async e=>{let t=Array.isArray(e)?e:[e],n=t.some(i=>Sn.default.extname(i)==".svg");await C(`use framework "Foundation"
    use scripting additions
    set pageImages to {${t.map(i=>`current application's NSURL's fileURLWithPath:"${i}"`).join(", ")}}

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
                repeat with thePath in {"${t.map(i=>encodeURI(`file://${i}`)).join('", "')}"}
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
          end tell`}`)},wn=e=>{let t=Array.isArray(e)?e:[e];for(let n of t)G.unlinkSync(n)};var Fn=async(e,t,n)=>{console.error(t),n?(n.title=e,n.message=t.message,n.style=h.Toast.Style.Failure,n.primaryAction={title:"Copy Error",onAction:async()=>{await h.Clipboard.copy(t.message)}}):n=await(0,h.showToast)({title:e,message:t.message,style:h.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await h.Clipboard.copy(t.message)}}})};async function ve(e,t){let n=(0,Dn.getPreferenceValues)(),i=[];for(let a of e){let r=g.default.join(g.default.dirname(a),g.default.basename(a,g.default.extname(a))+(a.endsWith(".pdf")?".pdf":".png"));if(n.imageResultHandling=="saveToDownloads"?r=g.default.join(B.default.homedir(),"Downloads",g.default.basename(r)):n.imageResultHandling=="saveToDesktop"?r=g.default.join(B.default.homedir(),"Desktop",g.default.basename(r)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(r=g.default.join(B.default.tmpdir(),g.default.basename(r))),n.imageResultHandling!="replaceOriginal"&&B.default.tmpdir()!=g.default.dirname(r)){let o=2;for(;vn.default.existsSync(r)&&B.default.tmpdir()!=g.default.dirname(r);)r=g.default.join(g.default.dirname(r),g.default.basename(r,g.default.extname(r))+` ${o}`+g.default.extname(r)),o++}await t.applyMethod(a,r,t.CIFilterName),i.push(r)}await Cn(i)}var Ma=(e,t,n)=>`use framework "Foundation"
    use framework "Quartz"
    use framework "PDFKit"

    set thePDF to missing value
    applyFilter("${e}", "${t}")
    on applyFilter(sourcePath, destinationPath)
        global thePDF
        set repeatCount to 1
        if "${e}" ends with ".pdf" then
            set thePDF to current application's PDFDocument's alloc()'s initWithURL:(current application's |NSURL|'s fileURLWithPath:sourcePath)
            set pageCount to thePDF's pageCount()
            set repeatCount to pageCount
        end if

        repeat with i from 1 to repeatCount
          if repeatCount > 1 then
            set thePage to thePDF's pageAtIndex:(i - 1)
            set theData to thePage's dataRepresentation()
            set theImage to current application's NSImage's alloc()'s initWithData:theData
          else
            set theImage to current application's NSImage's alloc()'s initWithContentsOfFile:sourcePath
          end if
          
          -- Set up the Filter
          set filterName to "${n}"
          set theFilter to current application's CIFilter's filterWithName:filterName
          theFilter's setDefaults()`,$a=`-- Get result & crop to original image size
    set theBounds to current application's NSMakeRect(0, 0, theImage's |size|()'s width, theImage's |size|()'s height)
    set uncroppedOutput to theFilter's valueForKey:(current application's kCIOutputImageKey)
    set croppedOutput to uncroppedOutput's imageByCroppingToRect:(uncroppedOutput's extent())
    
    -- Convert back to NSImage and save to file
    set theRep to current application's NSCIImageRep's imageRepWithCIImage:croppedOutput
    set theResult to current application's NSImage's alloc()'s initWithSize:(theRep's |size|())
    theResult's addRepresentation:theRep
    saveImage(theResult, sourcePath, destinationPath, i)`,Ga=`on saveImage(imageToSave, sourcePath, destinationPath, iter)
    global thePDF
    if destinationPath ends with ".pdf" then
      -- Replaces the contents of a PDF page with the supplied NSImage
      set newPage to current application's PDFPage's alloc()'s initWithImage:imageToSave
      thePDF's removePageAtIndex:(iter - 1)
      thePDF's insertPage:newPage atIndex:(iter - 1)
    else
      -- Saves an NSImage to the supplied file path
      set theTIFFData to imageToSave's TIFFRepresentation()
      set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
      set theImageProperties to current application's NSDictionary's dictionaryWithObject:1 forKey:(current application's NSImageCompressionFactor)
      set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
      theResultData's writeToFile:destinationPath atomically:false
    end if
end saveImage`,c=async(e,t,n)=>C(`${Ma(e,t,n)}
          set theCIImage to current application's CIImage's imageWithData:(theImage's TIFFRepresentation())
          theFilter's setValue:theCIImage forKey:"inputImage"
          ${$a}
        end repeat

        -- Save PDFs
        if "${e}" ends with ".pdf" then
          thePDF's writeToFile:"${t}"
        end if
    end applyFilter
    ${Ga}`),Tn=[{name:"Bloom",description:"Softens edges and adds a glow",applyMethod:c,CIFilterName:"CIBloom",thumbnail:"thumbnails/bloom.webp"},{name:"Bokeh Blur",description:"Applies a Bokeh effect",applyMethod:c,CIFilterName:"CIBokehBlur",thumbnail:"thumbnails/bokeh_blur.webp"},{name:"Box Blur",description:"Blur effect using a box-shaped convolution kernel",applyMethod:c,CIFilterName:"CIBoxBlur",thumbnail:"thumbnails/box_blur.webp"},{name:"Chrome",description:"Increase brightness and saturation",applyMethod:c,CIFilterName:"CIPhotoEffectChrome",thumbnail:"thumbnails/chrome.webp"},{name:"Circular Screen",description:"Simulates a circular-shaped halftone screen",applyMethod:c,CIFilterName:"CICircularScreen",thumbnail:"thumbnails/circular_screen.webp"},{name:"Circular Wrap",description:"Wraps an image around a transparent circle",applyMethod:c,CIFilterName:"CICircularWrap",thumbnail:"thumbnails/circular_wrap.webp"},{name:"CMYK Halftone",description:"Creates a halftoned rendition of an image using cyan, magenta, yellow, and black",applyMethod:c,CIFilterName:"CICMYKHalftone",thumbnail:"thumbnails/cmyk_halftone.webp"},{name:"Comic",description:"Makes images look like comic book drawings",applyMethod:c,CIFilterName:"CIComicEffect",thumbnail:"thumbnails/comic.webp"},{name:"Crystallize",description:"Creates polygon-shaped color blocks by aggregating pixel values",applyMethod:c,CIFilterName:"CICrystallize",thumbnail:"thumbnails/crystallize.webp"},{name:"Depth Of Field",description:"Simulates tilt-shift",applyMethod:c,CIFilterName:"CIDepthOfField",thumbnail:"thumbnails/depth_of_field.webp"},{name:"Disc Blur",description:"Blur effect that uses a disc-shaped convolution kernel",applyMethod:c,CIFilterName:"CIDiscBlur",thumbnail:"thumbnails/disc_blur.webp"},{name:"Dither",description:"Adds noise to reduce distortion",applyMethod:c,CIFilterName:"CIDither",thumbnail:"thumbnails/dither.webp"},{name:"Document Enhancement",description:"Removes unwanted shadows, whitens background, and enhances contrast",applyMethod:c,CIFilterName:"CIDocumentEnhancer",thumbnail:"thumbnails/document_enhancement.webp"},{name:"Dot Screen",description:"Simulates the dot pattern of a halftone screen",applyMethod:c,CIFilterName:"CIDotScreen",thumbnail:"thumbnails/dot_screen.webp"},{name:"Edges",description:"Detects edges and highlights them colorfully, blackening other areas",applyMethod:c,CIFilterName:"CIEdges",thumbnail:"thumbnails/edges.webp"},{name:"Edge Work",description:"White woodblock cutout effect",applyMethod:c,CIFilterName:"CIEdgeWork",thumbnail:"thumbnails/edge_work.webp"},{name:"Fade",description:"Decreases saturation",applyMethod:c,CIFilterName:"CIPhotoEffectFade",thumbnail:"thumbnails/fade.webp"},{name:"Gaussian Blur",description:"Blurs the image using a Gaussian filter",applyMethod:c,CIFilterName:"CIGaussianBlur",thumbnail:"thumbnails/gaussian_blur.webp"},{name:"Gloom",description:"Dulls highlights",applyMethod:c,CIFilterName:"CIGloom",thumbnail:"thumbnails/gloom.webp"},{name:"Hatched Screen",description:"Simulates the hatched pattern of a halftone screen",applyMethod:c,CIFilterName:"CIHatchedScreen",thumbnail:"thumbnails/hatched_screen.webp"},{name:"Hexagonal Pixellate",description:"Pixellates images using hexagons",applyMethod:c,CIFilterName:"CIHexagonalPixellate",thumbnail:"thumbnails/hexagonal_pixellate.webp"},{name:"Instant",description:"Decreases saturation, reduces contrast",applyMethod:c,CIFilterName:"CIPhotoEffectInstant",thumbnail:"thumbnails/instant.webp"},{name:"Invert",description:"Inverts colors",applyMethod:c,CIFilterName:"CIColorInvert",thumbnail:"thumbnails/invert.webp"},{name:"Kaleidoscope",description:"Creates a kaleidoscopic image by applying 12-way symmetry",applyMethod:c,CIFilterName:"CIKaleidoscope",thumbnail:"thumbnails/kaleidoscope.webp"},{name:"Line Overlay",description:"Black woodblock cutout effect",applyMethod:c,CIFilterName:"CILineOverlay",thumbnail:"thumbnails/line_overlay.webp"},{name:"Line Screen",description:"Simulates the line pattern of a halftone screen",applyMethod:c,CIFilterName:"CILineScreen",thumbnail:"thumbnails/line_screen.webp"},{name:"Maximum Component",description:"Converts image to grayscale using the maximum of the three color components",applyMethod:c,CIFilterName:"CIMaximumComponent",thumbnail:"thumbnails/maximum_component.webp"},{name:"Median",description:"Reduces noise by calculating median pixel values",applyMethod:c,CIFilterName:"CILineOverlay",thumbnail:"thumbnails/median.webp"},{name:"Minimum Component",description:"Converts image to grayscale using the minimum of the three color components",applyMethod:c,CIFilterName:"CIMinimumComponent",thumbnail:"thumbnails/minimum_component.webp"},{name:"Mono",description:"Desaturates images and reduces contrast",applyMethod:c,CIFilterName:"CIPhotoEffectMono",thumbnail:"thumbnails/mono.webp"},{name:"Motion Blur",description:"Blur effect simulating a camera moving while capturing an image",applyMethod:c,CIFilterName:"CIMotionBlur",thumbnail:"thumbnails/motion_blur.webp"},{name:"Noir",description:"Desaturates images and increases contrast",applyMethod:c,CIFilterName:"CIPhotoEffectNoir",thumbnail:"thumbnails/noir.webp"},{name:"Noise Reduction",description:"Reduces noise by sharpening areas of low luminance",applyMethod:c,CIFilterName:"CINoiseReduction",thumbnail:"thumbnails/noise_reduction.webp"},{name:"Pixellate",description:"Pixellates images with large square pixels",applyMethod:c,CIFilterName:"CIPixellate",thumbnail:"thumbnails/pixellate.webp"},{name:"Posterize",description:"Flattens colors",applyMethod:c,CIFilterName:"CIColorPosterize",thumbnail:"thumbnails/posterize.webp"},{name:"Pointillize",description:"Pixellates images with dots",applyMethod:c,CIFilterName:"CIPointillize",thumbnail:"thumbnails/pointillize.webp"},{name:"Process",description:"Gives images a cooler toner",applyMethod:c,CIFilterName:"CIPhotoEffectProcess",thumbnail:"thumbnails/process.webp"},{name:"Sepia",description:"Maps all colors to shades of brown",applyMethod:c,CIFilterName:"CISepiaTone",thumbnail:"thumbnails/sepia.webp"},{name:"Sharpen Luminance",description:"Increases detailed by sharpening based on luminance",applyMethod:c,CIFilterName:"CISharpenLuminance",thumbnail:"thumbnails/sharpen_luminance.webp"},{name:"Thermal",description:"Thermal camera effect",applyMethod:c,CIFilterName:"CIThermal",thumbnail:"thumbnails/thermal.webp"},{name:"Tonal",description:"Decreases saturation and contrast",applyMethod:c,CIFilterName:"CIPhotoEffectTonal",thumbnail:"thumbnails/tonal.webp"},{name:"Transfer",description:"Makes images warmer",applyMethod:c,CIFilterName:"CIPhotoEffectTransfer",thumbnail:"thumbnails/transfer.webp"},{name:"Vignette",description:"Adds shading to the corners of images",applyMethod:c,CIFilterName:"CIVignette",thumbnail:"thumbnails/vignette.webp"},{name:"X-Ray",description:"X-Ray image effect",applyMethod:c,CIFilterName:"CIXRay",thumbnail:"thumbnails/x-ray.webp"},{name:"Zoom Blur",description:"Blur simulating a camera zooming in while capturing an image",applyMethod:c,CIFilterName:"CIZoomBlur",thumbnail:"thumbnails/zoom_blur.webp"}];var H=require("react/jsx-runtime");function Rn(){let e=async n=>{let i=await xn();if(i.length===0||i.length===1&&i[0]===""){await(0,y.showToast)({title:"No images selected",style:y.Toast.Style.Failure});return}let a=await(0,y.showToast)({title:"Filtering in progress...",style:y.Toast.Style.Animated}),r=`image${i.length===1?"":"s"}`;try{await ve(i,n),a.title=`Applied ${n.name} Filter To ${i.length.toString()} ${r}`,a.style=y.Toast.Style.Success}catch(o){await Fn("Failed To Apply Filter",o,a)}finally{await Pn()}},t=Tn.map(n=>(0,H.jsx)(y.Grid.Item,{title:n.name,subtitle:n.description,content:{source:n.thumbnail},actions:(0,H.jsx)(y.ActionPanel,{children:(0,H.jsx)(y.Action,{title:`Apply ${n.name} Filter`,onAction:async()=>await e(n)})})},n.name));return(0,H.jsx)(y.Grid,{searchBarPlaceholder:"Search filters...",children:t})}
