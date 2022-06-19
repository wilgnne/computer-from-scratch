(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8738:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8186)}])},7649:function(e,r,n){"use strict";n.d(r,{f:function(){return u}});var t=n(2322),s=n(2784),i=n(6007),a=n(4915),o=n(3591),c=(0,s.createContext)(null);function u(){return(0,s.useContext)(c)}r.Z=function(e){var r=e.children,n=(0,s.useState)((function(){return o.zp.createMemory(1024,[0,1,2,3])})),u=n[0],d=n[1],l=(0,s.useState)(),p=l[0],f=l[1],g=(0,s.useState)(),h=g[0],m=g[1],b=(0,s.useState)(0),v=b[0],x=b[1],y=(0,s.useState)(),E=y[0],j=y[1],C=(0,i.pm)(),w=(0,s.useCallback)((function(e){try{var r=(0,a.aN)(e),n=r.code,t=r.labels,s=o.zp.createMemory(1024,n);d(s),j(t)}catch(i){C({title:"Compile Error",description:i.message,status:"error",duration:9e3,isClosable:!0})}}),[]),O=(0,s.useCallback)((function(){try{if(p){var e=p.step().registers,r=Math.floor(e.IP/3),n=Object.keys(E).filter((function(r){return E[r].address<=e.IP})).length;m(e),x(r+n)}}catch(t){throw C({title:"Runtime Error",description:t.message,status:"error",duration:9e3,isClosable:!0}),new Error(t)}}),[p]);(0,s.useEffect)((function(){var e=o.Z9.createCpu(u);m(e.getRegisters()),f(e)}),[u]);var A=(0,s.useMemo)((function(){return{cpu:p,registers:h,executedInstructions:v,memory:u,labels:E,assemble:w,step:O}}),[p,h,v,u,E,w]);return p?(0,t.jsx)(c.Provider,{value:A,children:r}):null}},8186:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return I}});var t=n(2322),s=n(2784),i=n(4033),a=n(5237),o=n(7649),c=n(6915);var u=function(e){var r=e.labels,n=void 0===r?{}:r;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.X6,{size:"md",children:"Labels"}),(0,t.jsx)(i.iz,{marginTop:2,marginBottom:2}),(0,t.jsx)(i.xu,{maxH:250,overflowY:"auto",children:(0,t.jsxs)(c.iA,{variant:"simple",children:[(0,t.jsx)(c.hr,{position:"sticky",top:0,bg:"white",children:(0,t.jsxs)(c.Tr,{children:[(0,t.jsx)(c.Th,{children:"Name"}),(0,t.jsx)(c.Th,{children:"Adrres"}),(0,t.jsx)(c.Th,{children:"Value"})]})}),(0,t.jsx)(c.p3,{children:Object.keys(n).map((function(e){var r;return(0,t.jsxs)(c.Tr,{children:[(0,t.jsx)(c.Td,{children:e}),(0,t.jsx)(c.Td,{children:n[e].address}),(0,t.jsx)(c.Td,{children:"".concat(null===(r=n[e].value.number)||void 0===r?void 0:r.toString(16).toUpperCase(),"('").concat(n[e].value.char,"')")})]},e)}))})]})})]})},d=n(194);var l=function(){var e=(0,o.f)().registers,r=Object.keys(e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.xv,{size:"md",children:"Registers / Flags"}),(0,t.jsx)(i.iz,{marginTop:2,marginBottom:2}),(0,t.jsx)(c.xJ,{children:(0,t.jsxs)(c.iA,{variant:"striped",size:"sm",children:[(0,t.jsx)(c.hr,{children:(0,t.jsx)(c.Tr,{children:r.map((function(e){return(0,t.jsx)(c.Th,{children:e},e)}))})}),(0,t.jsx)(c.p3,{children:(0,t.jsx)(c.Tr,{children:r.map((function(r){return(0,t.jsx)(c.Td,{children:(0,t.jsx)(i.M5,{bg:d.Registers.RegistersColors[r]||void 0,borderRadius:4,children:e[r].toString("F"===r?2:16).toUpperCase()})},r)}))})})]})})]})},p=n(50),f=n(384);function g(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}var h=function(){var e=(0,o.f)(),r=e.memory,n=e.registers,s=Object.keys(n).reduce((function(e,r){return function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){g(e,r,n[r])}))}return e}({},e,g({},n[r],r))}),{}),a=(0,f.F)(r.getMemory(),256);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.xv,{size:"md",marginTop:2,children:"RAM"}),(0,t.jsx)(i.iz,{marginTop:2,marginBottom:2}),(0,t.jsxs)(p.mQ,{children:[(0,t.jsx)(p.td,{children:a.map((function(e,r){return(0,t.jsx)(p.OK,{children:r},"".concat(r))}))}),(0,t.jsx)(p.nP,{children:a.map((function(e,r){var n=(0,f.F)(e,16);return(0,t.jsx)(p.x4,{children:(0,t.jsx)(i.xu,{bg:"gray.200",borderRadius:2,children:n.map((function(e,n){return(0,t.jsx)(i.kC,{justifyContent:"flex-start",children:e.map((function(e,a){var o=s[256*r+16*n+a];return(0,t.jsx)(i.M5,{w:"100%",h:"100%",bg:o?d.Registers.RegistersColors[o]:void 0,borderRadius:4,children:(0,t.jsx)(i.xv,{fontSize:"sm",children:e.toString(16).toUpperCase()})},a)}))},n)}))})},r)}))})]})]})},m=(0,a.default)((function(){return Promise.all([n.e(32),n.e(192),n.e(296)]).then(n.bind(n,9296))}),{loadableGenerated:{webpack:function(){return[9296]}},ssr:!1}),b=(0,a.default)((function(){return Promise.all([n.e(80),n.e(22)]).then(n.bind(n,2022))}),{loadableGenerated:{webpack:function(){return[2022]}},ssr:!1});var v=function(){var e=(0,o.f)().labels;return(0,t.jsxs)(i.kC,{flex:1,h:"100%",padding:8,gap:6,children:[(0,t.jsx)(i.kC,{flex:1,direction:"column",gap:6,children:(0,t.jsx)(i.xu,{flex:1,borderWidth:1,borderRadius:6,padding:2,children:(0,t.jsx)(m,{})})}),(0,t.jsx)(i.kC,{direction:"column",gap:6,minWidth:420,children:(0,t.jsxs)(i.xu,{borderWidth:1,borderRadius:6,padding:2,children:[(0,t.jsx)(i.X6,{size:"md",children:"CPU & Memory"}),(0,t.jsx)(i.iz,{marginTop:2,marginBottom:2}),(0,t.jsx)(l,{}),(0,t.jsx)(h,{})]})}),(0,t.jsxs)(i.kC,{direction:"column",gap:6,children:[(0,t.jsx)(i.xu,{borderWidth:1,borderRadius:6,padding:2,children:(0,t.jsx)(b,{})}),(0,t.jsx)(i.xu,{borderWidth:1,borderRadius:6,padding:2,children:(0,t.jsx)(u,{labels:e})})]})]})},x=n(6007),y=n(9694),E=n(4915);function j(e){var r=Number(e).toString(16);return r.length<2?"0".concat(r):r}function C(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function w(e){return function(e){if(Array.isArray(e))return C(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,r){if(!e)return;if("string"===typeof e)return C(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return C(e,r)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var O=function(e){var r=e.data,n=e.lineLength;return(0,t.jsx)(i.xu,{bg:"gray.200",borderRadius:2,children:r.map((function(e,r){return(0,t.jsx)(i.kC,{children:w(e).concat(w(Array(n-e.length).fill(0))).map((function(e,r){return(0,t.jsx)(i.M5,{w:"100%",h:"100%",borderRadius:4,children:(0,t.jsx)(i.xv,{fontSize:"sm",children:j(e).toUpperCase()})},r)}))},r)}))})},A=(0,a.default)((function(){return Promise.all([n.e(32),n.e(192),n.e(106)]).then(n.bind(n,1106))}),{loadableGenerated:{webpack:function(){return[1106]}},ssr:!1}),R=(0,a.default)((function(){return Promise.all([n.e(32),n.e(192),n.e(539)]).then(n.bind(n,4539))}),{loadableGenerated:{webpack:function(){return[4539]}},ssr:!1});var S=function(e){var r=e.Links,n=(0,e.useNavigator)().navigate;return(0,t.jsxs)(i.xu,{display:"flex",justifyContent:"space-around",bg:"blue.600",p:2,children:[(0,t.jsx)(i.X6,{color:"white",size:"lg",children:"\ud83d\udda5\ufe0f CFS - Computer from Scratch"}),(0,t.jsx)(i.xu,{textColor:"white",alignSelf:"center",children:(0,t.jsx)(i.Ug,{spacing:8,alignItems:"center",children:(0,t.jsx)(i.Ug,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:r.map((function(e){return(0,t.jsx)(y.zx,{size:"md",colorScheme:"blue",textColor:"white",variant:"link",onClick:function(){return n(e)},children:e},e)}))})})})]})},k={Emulator:v,Assembler:function(){var e=(0,o.f)().assemble,r=(0,s.useState)(""),n=r[0],a=r[1],c=(0,s.useState)(),d=c[0],l=c[1],p=(0,s.useState)(),g=p[0],h=p[1],m=(0,s.useState)([]),b=m[0],v=m[1],j=(0,x.pm)(),C=(0,s.useCallback)((function(r){try{var n=(0,E.FN)(r);a(n.code),l(n.labels);var t=(0,E.aN)(n.code),s=t.code,i=t.labels;a(n.code),v(s),h(i),e(n.code)}catch(o){j({title:"Compile Error",description:o.message,status:"error",duration:9e3,isClosable:!0})}}),[]);return(0,t.jsxs)(i.kC,{flex:1,p:8,gap:6,children:[(0,t.jsxs)(i.kC,{flex:1,direction:"column",gap:6,children:[(0,t.jsx)(i.xu,{flex:1,borderWidth:1,borderRadius:6,p:2,children:(0,t.jsx)(A,{onAssemble:function(e){return C(e)}})}),(0,t.jsx)(i.xu,{borderWidth:1,borderRadius:6,p:2,children:(0,t.jsx)(u,{labels:d})})]}),(0,t.jsxs)(i.kC,{flex:1,direction:"column",gap:6,children:[(0,t.jsx)(i.xu,{flex:1,borderWidth:1,borderRadius:6,p:2,children:(0,t.jsx)(R,{value:n})}),(0,t.jsx)(i.xu,{borderWidth:1,borderRadius:6,p:2,children:(0,t.jsx)(u,{labels:g})})]}),(0,t.jsx)(i.kC,{flex:1,direction:"column",gap:6,children:(0,t.jsxs)(i.xu,{flex:1,borderWidth:1,borderRadius:6,p:2,children:[(0,t.jsxs)(i.kC,{justifyContent:"space-between",children:[(0,t.jsx)(i.X6,{size:"md",children:"Machine Code"}),(0,t.jsxs)(i.Kq,{spacing:4,direction:"row",align:"center",children:[(0,t.jsx)(y.zx,{colorScheme:"teal",variant:"outline",size:"xs",disabled:0===b.length,onClick:function(){return navigator.clipboard.writeText(JSON.stringify(b))},children:"Copy"}),(0,t.jsx)(y.zx,{colorScheme:"teal",size:"xs",disabled:0===b.length,children:"Download"})]})]}),(0,t.jsx)(i.iz,{marginTop:2,marginBottom:2}),(0,t.jsx)(i.xu,{overflowY:"auto",children:(0,t.jsx)(O,{data:(0,f.F)(b,16),lineLength:16})})]})})]})}},P=["Assembler","Emulator"],T=(0,s.createContext)(null);var M=function(){var e=(0,s.useState)("Assembler"),r=e[0],n=e[1],a=(0,s.useCallback)((function(e){n(e)}),[]),c=(0,s.useMemo)((function(){return{navigate:a}}),[a]);return(0,t.jsx)(T.Provider,{value:c,children:(0,t.jsxs)(o.Z,{children:[(0,t.jsx)(S,{Links:P,useNavigator:function(){return c}}),Object.keys(k).map((function(e){var n=k[e];return(0,t.jsx)(i.kC,{flex:1,display:e===r?void 0:"none",children:(0,t.jsx)(n,{})},e)}))]})})};var I=function(){return(0,t.jsx)(M,{})}},384:function(e,r,n){"use strict";function t(e,r){var n=0,t=e.length,s=[];for(n=0;n<t;n+=r){var i=e.slice(n,n+r);s.push(i)}return s}n.d(r,{F:function(){return t}})},7699:function(e,r,n){"use strict";var t=this&&this.__assign||function(){return t=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var s in r=arguments[n])Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s]);return e},t.apply(this,arguments)};r.__esModule=!0,r.asm=void 0;var s=n(194),i=n(2518),a=n(6902);r.asm=function(e){var r=[],n=[],o=[],c={},u=e.split("\n");u.map((function(e){return a.regex.exec(e)})).forEach((function(e,t){if(e){var d=e[a.RegexGroup.Label],l=e[a.RegexGroup.Mnemonic],p=e[a.RegexGroup.Operand1],f=e[a.RegexGroup.Operand2];try{if(d||l){if(d&&function(e){var n=e.toUpperCase();if(o.find((function(e){return e===n})))throw new Error("Duplicate label: ".concat(e));if("A"===n||"B"===n||"C"===n||"D"===n)throw new Error("Label contains keyword: ".concat(n));c[e]=r.length,o.push(n)}(d),l){var g=l.toUpperCase();switch("DB"!==g&&(n[r.length]=t),g){case"DB":if("number"===(b=(0,i.getValue)(p)).type){var h=b.value;r.push(h)}else{if("numbers"!==b.type)throw new Error("DB does not support this operand");(h=b.value).forEach((function(e){return r.push(e)}))}break;case"HLT":case"RET":(0,i.checkNoExtraArg)(g,p);var m=s.OpCode.createOpcode(s.OpCode.InstructionEnum[g]);r.push(m,0,0);break;case"PUSH":case"POP":case"CALL":case"NOT":var b=(0,i.getValue)(p);(0,i.checkNoExtraArg)(g,f),(0,i.checkSupportedArgs)(g,b.type);m=s.OpCode.createOpcode(s.OpCode.InstructionEnum[g],s.Utils.operandType2AddressingType(b.type));r.push(m,b.value,0);break;case"MOV":case"JMP":case"CMP":case"SHL":case"SHR":case"AND":case"OR":case"XOR":case"ADD":case"SUB":b=(0,i.getValue)(p);var v=(0,i.getValue)(f);(0,i.checkSupportedArgs)(g,b.type,v.type);m=s.OpCode.createOpcode(s.OpCode.InstructionEnum[g],s.Utils.operandType2AddressingType(b.type),s.Utils.operandType2AddressingType(v.type));r.push(m,b.value,v.value);break;default:throw new Error("Invalid instruction: ".concat(g))}}}else{var x=u[t].trim();if(""!==x&&";"!==x.slice(0,1))throw new Error("Syntax error at line ".concat(t+1," (line: ").concat(x,")"))}}catch(y){throw new Error("Error at line ".concat(t+1,": ").concat(y.message))}}}));var d=r.map((function(e){if("number"!==typeof e){if(e in c)return c[e];throw new Error("Label ".concat(e," not found"))}return e}));return{code:d,labels:Object.keys(c).map((function(e){var r=c[e];return{name:e,value:{address:r,value:{number:d[r],char:String.fromCharCode(d[r])}}}})).reduce((function(e,r){var n;return t(t({},e),((n={})[r.name]=r.value,n))}),{})}}},4915:function(e,r,n){"use strict";r.FN=r.aN=void 0;var t=n(7699);r.aN=t.asm;var s=n(236);r.FN=s.preprocessor},2518:function(e,r,n){"use strict";r.__esModule=!0,r.checkSupportedArgs=r.checkNoExtraArg=r.getValue=r.parseRegOrNumber=r.parseOffsetAddressing=r.parseRegister=r.parseNumber=r.parseLabel=void 0;var t=n(194),s=n(3117);function i(e){return t.Assembler.regexLabel.exec(e)?e:void 0}function a(e){if("0x"===e.slice(0,2))return parseInt(e.slice(2),16);if("0o"===e.slice(0,2))return parseInt(e.slice(2),8);if("b"===e.slice(e.length-1))return parseInt(e.slice(0,e.length-1),2);if("d"===e.slice(e.length-1))return parseInt(e.slice(0,e.length-1),10);if(t.Assembler.regexNum.exec(e))return parseInt(e,10);throw Error("Invalid number format")}function o(e){var r=e.toUpperCase();return t.Registers.encodeRegister(r)}function c(e){var r=e.toUpperCase(),n=0,t=0;if("SP"===r.slice(0,2))t=4;else if("BP"===r.slice(0,2))t=5;else if("A"===r[0])t=0;else if("B"===r[0])t=1;else if("C"===r[0])t=2;else{if("D"!==r[0])return;t=3}var s=1;if(t>=4&&(s=2),"-"===r[s])n=-1;else{if("+"!==r[s])return;n=1}var i=n*parseInt(r.slice(s+1),10);if(i<-16||i>15)throw new Error("offset must be a value between -16...+15");return i<0&&(i=32+i),8*i+t}function u(e,r,n){var t=o(e);if(void 0!==t)return{type:r,value:t};var s=i(e);if(s)return{type:n,value:s};if("regaddress"===r&&void 0!==(t=c(e)))return{type:r,value:t};var u=a(e);if(Number.isNaN(u))throw new Error("Not a ".concat(n,": ").concat(u));if(u<0||u>65535)throw new Error("".concat(n," must have a value between 0x0-0xffff"));return{type:n,value:u}}r.parseLabel=i,r.parseNumber=a,r.parseRegister=o,r.parseOffsetAddressing=c,r.parseRegOrNumber=u,r.getValue=function(e){switch(e.slice(0,1)){case"[":return u(e.slice(1,e.length-1),"regaddress","address");case'"':return{type:"numbers",value:e.slice(1,e.length-1).split("").map((function(e){return e.charCodeAt(0)}))};case"'":var r=e.slice(1,e.length-1);if(r.length>1)throw Error("Only one character is allowed. Use String instead");return{type:"number",value:r.charCodeAt(0)};default:return u(e,"register","number")}},r.checkNoExtraArg=function(e,r){if(void 0!==r)throw new Error("".concat(e,": too many arguments"))},r.checkSupportedArgs=function(e,r,n){var t=s.default[e][r];if(!t)throw new Error("".concat(e," does not support the first argument ").concat(r));if(n&&!t.includes(n))throw new Error("".concat(e," does not support the second argument ").concat(n))}},236:function(e,r,n){"use strict";var t=this&&this.__assign||function(){return t=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var s in r=arguments[n])Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s]);return e},t.apply(this,arguments)};r.__esModule=!0,r.preprocessor=void 0;var s=n(2518),i=n(6902);r.preprocessor=function(e){var r=[],n=[];return e.split("\n").map((function(e){return i.regex.exec(e)})).forEach((function(e,t){if(e){var a=e[i.RegexGroup.Label],o=e[i.RegexGroup.Mnemonic],c=e[i.RegexGroup.Operand1],u=e[i.RegexGroup.Operand2];try{if((a||o)&&(a&&(!function(e){var r=e.toUpperCase();if(n.find((function(e){return e===r})))throw new Error("Duplicate label: ".concat(e));if("A"===r||"B"===r||"C"===r||"F"===r)throw new Error("Label contains keyword: ".concat(r));n.push(r)}(a),r.push("".concat(a,":"))),o)){var d=o.toUpperCase();switch(d){case"JZ":var l=(0,s.getValue)(c);(0,s.checkNoExtraArg)(d,u),(0,s.checkSupportedArgs)(d,l.type),r.push("    MOV C, F"),r.push("    AND C, 10b"),r.push("    JMP C, ".concat(l.value));break;case"JLEZ":l=(0,s.getValue)(c);(0,s.checkNoExtraArg)(d,u),(0,s.checkSupportedArgs)(d,l.type),r.push("    MOV C, F"),r.push("    AND C, 110b"),r.push("    JMP C, ".concat(l.value));break;default:r.push("    ".concat(d," ").concat([c,u].filter(Boolean).join(",")))}}}catch(p){throw new Error("Error at line ".concat(t+1,": ").concat(p.message))}}})),{code:r.join("\n"),labels:n.map((function(e){return{name:e,value:{address:void 0,value:{number:void 0,char:void 0}}}})).reduce((function(e,r){var n;return t(t({},e),((n={})[r.name]=r.value,n))}),{})}}},6902:function(e,r){"use strict";r.__esModule=!0,r.RegexGroup=r.regex=void 0,r.regex=/^[\t ]*(?:([.A-Za-z]\w*)[:])?(?:[\t ]*([A-Za-z]{2,4})(?:[\t ]+(\[(\w+((\+|-)\d+)?)\]|".+?"|'.+?'|[.A-Za-z0-9]\w*)(?:[\t ]*[,][\t ]*(\[(\w+((\+|-)\d+)?)\]|".+?"|'.+?'|[.A-Za-z0-9]\w*))?)?)?/,r.RegexGroup={Label:1,Mnemonic:2,Operand1:3,Operand2:7}},3117:function(e,r){"use strict";r.__esModule=!0;r.default={CALL:{number:[]},RET:{},HLT:{},MOV:{address:["number","address","register","regaddress"],register:["number","address","register","regaddress"],regaddress:["number","address","register","regaddress"]},PUSH:{register:[],regaddress:[],address:[],number:[]},POP:{register:[]},JMP:{register:["number","address","register","regaddress"],regaddress:["number","address","register","regaddress"],number:["number","address","register","regaddress"]},JZ:{register:["number","address","register","regaddress"],regaddress:["number","address","register","regaddress"],number:["number","address","register","regaddress"]},JLEZ:{register:["number","address","register","regaddress"],regaddress:["number","address","register","regaddress"],number:["number","address","register","regaddress"]},CMP:{register:["register","address","number"]},SHL:{register:["register","address","number"]},SHR:{register:["register","address","number"]},NOT:{register:[]},AND:{register:["register","address","number"]},OR:{register:["register","address","number"]},XOR:{register:["register","address","number"]},ADD:{register:["register","address","number"]},SUB:{register:["register","address","number"]}}},1779:function(e,r){"use strict";r.__esModule=!0,r.regexLabel=r.regexNum=void 0,r.regexNum=/^[-+]?[0-9]+$/,r.regexLabel=/^[.A-Za-z]\w*$/},194:function(e,r,n){"use strict";r.__esModule=!0,r.Utils=r.OpCode=r.Registers=r.Assembler=void 0;var t=n(1779);r.Assembler=t;var s=n(3449);r.Registers=s;var i=n(3677);r.OpCode=i;var a=n(2354);r.Utils=a},3677:function(e,r){"use strict";r.__esModule=!0,r.decodeOpcode=r.createOpcode=r.AddressingTypeEnum=r.InstructionEnum=void 0,function(e){e[e.HLT=0]="HLT",e[e.MOV=1]="MOV",e[e.PUSH=2]="PUSH",e[e.POP=3]="POP",e[e.JMP=4]="JMP",e[e.CMP=5]="CMP",e[e.CALL=6]="CALL",e[e.RET=7]="RET",e[e.SHL=8]="SHL",e[e.SHR=9]="SHR",e[e.NOT=10]="NOT",e[e.AND=11]="AND",e[e.OR=12]="OR",e[e.XOR=13]="XOR",e[e.ADD=14]="ADD",e[e.SUB=15]="SUB"}(r.InstructionEnum||(r.InstructionEnum={})),function(e){e[e.NUMBER=0]="NUMBER",e[e.ADDRESS=1]="ADDRESS",e[e.REGISTER=2]="REGISTER",e[e.REGADDRESS=3]="REGADDRESS"}(r.AddressingTypeEnum||(r.AddressingTypeEnum={})),r.createOpcode=function(e,r,n){return e<<4|r<<2|n},r.decodeOpcode=function(e){return{instruction:e>>4,aAddressingType:e>>2&3,bAddressingType:3&e}}},3449:function(e,r){"use strict";r.__esModule=!0,r.RegistersColors=r.decodeRegister=r.encodeRegister=void 0,r.encodeRegister=function(e){return{A:0,B:1,C:2,F:3,SP:4,BP:5}[e]},r.decodeRegister=function(e){return{0:"A",1:"B",2:"C",3:"F",4:"SP",5:"BP"}[e]},r.RegistersColors={A:"blue.600",B:"green.600",C:"red.600",IP:"purple.600",SP:"orange.600",BP:"pink.600"}},2354:function(e,r,n){"use strict";r.__esModule=!0,r.operandType2AddressingType=void 0;var t=n(3677);r.operandType2AddressingType=function(e){switch(e){case"register":return t.AddressingTypeEnum.REGISTER;case"regaddress":return t.AddressingTypeEnum.REGADDRESS;case"address":return t.AddressingTypeEnum.ADDRESS;case"number":return t.AddressingTypeEnum.NUMBER;default:throw new Error("Unknown operand type")}}},2355:function(e,r,n){"use strict";var t=this&&this.__assign||function(){return t=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var s in r=arguments[n])Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s]);return e},t.apply(this,arguments)};r.__esModule=!0,r.createCpu=void 0;var s=n(194),i=n(3449),a=65535;r.createCpu=function(e){var r={A:0,B:0,C:0,IP:0,SP:1023,BP:1023,F:0};function n(e){var n=s.Registers.decodeRegister(e),t=r[n];if(void 0===t)throw new Error("Unknown register ".concat(e,", decoded as ").concat(n," on read"));return t}function o(e,n){var t=s.Registers.decodeRegister(e);if(!Object.keys(r).includes(t))throw new Error("Unknown register ".concat(e,", decoded as ").concat(t," on write"));r[t]=n}function c(){var n=e.read(r.IP);return r.IP+=1,n}function u(r,t){var i=void 0===t?c():t;switch(r){case s.OpCode.AddressingTypeEnum.ADDRESS:var a=i;return e.read(a);case s.OpCode.AddressingTypeEnum.NUMBER:return i;case s.OpCode.AddressingTypeEnum.REGADDRESS:var o=i>>3,u=o>=16?-(1+(31&~o)):o;a=n(7&i);return e.read(a+u);case s.OpCode.AddressingTypeEnum.REGISTER:return n(i);default:throw new Error("Unsupported addressing type ".concat(r," on read ").concat(i))}}function d(t,i,c){var u=c&a,d=c>a?1:0,l=0===u?1:0,p=32768&u?1:0;switch(r.F=p<<2|l<<1|d,i){case s.OpCode.AddressingTypeEnum.ADDRESS:var f=t;e.write(f,u);break;case s.OpCode.AddressingTypeEnum.REGADDRESS:var g=t>>3,h=g>=16?-(1+(31&~g)):g;f=n(7&t);e.write(f+h,u);break;case s.OpCode.AddressingTypeEnum.REGISTER:o(t,u);break;default:throw new Error("Unsupported addressing type ".concat(i," on write in target: ").concat(t))}}function l(n){e.write(r.SP,n),r.SP-=1}function p(){return r.SP+=1,e.read(r.SP)}return{step:function(){var e=c(),f=s.OpCode.decodeOpcode(e),g=f.instruction,h=f.aAddressingType,m=f.bAddressingType;switch(g){case s.OpCode.InstructionEnum.HLT:throw new Error("EOF");case s.OpCode.InstructionEnum.MOV:d(A=c(),h,b=u(m));break;case s.OpCode.InstructionEnum.PUSH:var b=u(h);c(),l(b);break;case s.OpCode.InstructionEnum.POP:var v=c();c(),o(v,p());break;case s.OpCode.InstructionEnum.JMP:var x=u(h),y=u(m);x&&(r.IP=y);break;case s.OpCode.InstructionEnum.CMP:var E=(R=u(h,A=c())-u(m))&a,j=R>a?1:0,C=0===E?1:0,w=32768&E?1:0;r.F=w<<2|C<<1|j;break;case s.OpCode.InstructionEnum.CALL:y=u(h);c(),l(r.BP),l(r.IP),o((0,i.encodeRegister)("BP"),r.SP),r.IP=y;break;case s.OpCode.InstructionEnum.RET:c(),c(),r.IP=p(),r.BP=p();break;case s.OpCode.InstructionEnum.SHL:v=c();var O=u(m);d(v,h,(b=n(v))<<O);break;case s.OpCode.InstructionEnum.SHR:v=c(),O=u(m);d(v,h,(b=n(v))>>O);break;case s.OpCode.InstructionEnum.NOT:v=c();c(),d(v,h,~(b=n(v))&a);break;case s.OpCode.InstructionEnum.AND:d(A=c(),h,R=u(h,A)&u(m));break;case s.OpCode.InstructionEnum.OR:d(A=c(),h,R=u(h,A)|u(m));break;case s.OpCode.InstructionEnum.XOR:d(A=c(),h,R=u(h,A)^u(m));break;case s.OpCode.InstructionEnum.ADD:d(A=c(),h,R=u(h,A)+u(m));break;case s.OpCode.InstructionEnum.SUB:var A,R;d(A=c(),h,R=u(h,A)-u(m));break;default:throw new Error("Unknown instruction: ".concat(g.toString(16)))}return{registers:t({},r)}},getRegisters:function(){return t({},r)}}}},3591:function(e,r,n){"use strict";r.zp=r.Z9=void 0;var t=n(2355);r.Z9=t;var s=n(6716);r.zp=s},6716:function(e,r){"use strict";var n=this&&this.__spreadArray||function(e,r,n){if(n||2===arguments.length)for(var t,s=0,i=r.length;s<i;s++)!t&&s in r||(t||(t=Array.prototype.slice.call(r,0,s)),t[s]=r[s]);return e.concat(t||Array.prototype.slice.call(r))};r.__esModule=!0,r.createMemory=void 0,r.createMemory=function(e,r){var t=new Array(e).fill(0);if(r)for(var s=r.length,i=0;i<s;i+=1)t[i]=r[i];return{read:function(e){return t[e]},write:function(e,r){t[e]=r},getMemory:function(){return n([],t,!0)}}}}},function(e){e.O(0,[984,774,888,179],(function(){return r=8738,e(e.s=r);var r}));var r=e.O();_N_E=r}]);