var Module=typeof Module!=="undefined"?Module:{};
var moduleOverrides={};
var key;
console.log('on fphiExtractor...');
for(key in Module){
	if(Module.hasOwnProperty(key)){
		moduleOverrides[key]=Module[key]
		}
	}
var ENVIRONMENT_IS_WEB=false;
var ENVIRONMENT_IS_WORKER=false;
var ENVIRONMENT_IS_NODE=false;
var ENVIRONMENT_IS_SHELL=false;
if(Module["ENVIRONMENT"]){
	if(Module["ENVIRONMENT"]==="WEB"){
		ENVIRONMENT_IS_WEB=true}
		else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}
		else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}
		else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}
		else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.")}}
		else{ENVIRONMENT_IS_WEB=typeof window==="object";
ENVIRONMENT_IS_WORKER=typeof importScripts==="function";
ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;
if(!Module["printErr"])
	Module["printErr"]=console.warn;
var nodeFS;
var nodePath;
Module["read"]=function shell_read(filename,binary){
	var ret;
	if(!nodeFS)nodeFS=require("fs");
	if(!nodePath)nodePath=require("path");
	filename=nodePath["normalize"](filename);
	ret=nodeFS["readFileSync"](filename);
	return binary?ret:ret.toString()
	};
Module["readBinary"]=function readBinary(filename){
	var ret=Module["read"](filename,true);
	if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);
	return ret
};
if(!Module["thisProgram"]){
	if(process["argv"].length>1){
		Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}
	else{
		Module["thisProgram"]="unknown-program"}
	}
	Module["arguments"]=process["argv"].slice(2);
if(typeof module!=="undefined"){
	module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));
process["on"]("unhandledRejection",(function(reason,p){process["exit"](1)}));
Module["inspect"]=(function(){return"[Emscripten Module object]"})}
else if(ENVIRONMENT_IS_SHELL){
	if(!Module["print"])Module["print"]=print;
if(typeof printErr!="undefined")Module["printErr"]=printErr;
if(typeof read!="undefined"){
	Module["read"]=function shell_read(f){return read(f)}}
	else{
		Module["read"]=function shell_read(){
			throw"no read() available"}
		}
			Module["readBinary"]=function readBinary(f){
				var data;
if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");
assert(typeof data==="object");
return data
};
if(typeof scriptArgs!="undefined"){
	Module["arguments"]=scriptArgs}
	else if(typeof arguments!="undefined"){
		Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=(function(status,toThrow){quit(status)})}}
		else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){
			Module["read"]=function shell_read(url){var xhr=new XMLHttpRequest;
xhr.open("GET",url,false);
xhr.send(null);
return xhr.responseText
};
if(ENVIRONMENT_IS_WORKER){
	Module["readBinary"]=function readBinary(url){
		var xhr=new XMLHttpRequest;
		xhr.open("GET",url,false);
		xhr.responseType="arraybuffer";
		xhr.send(null);
		return new Uint8Array(xhr.response)}
}
Module["readAsync"]=function readAsync(url,onload,onerror){
	var xhr=new XMLHttpRequest;
	xhr.open("GET",url,true);
	xhr.responseType="arraybuffer";
	xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);
	return}onerror()};
	xhr.onerror=onerror;
	xhr.send(null)
};
if(typeof arguments!="undefined"){
	Module["arguments"]=arguments}
	if(typeof console!=="undefined"){
		if(!Module["print"])
			Module["print"]=function shell_print(x){console.log(x)};
if(!Module["printErr"])
	Module["printErr"]=function shell_printErr(x){console.warn(x)}}
else{var TRY_USE_DUMP=false;
if(!Module["print"])
	Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}
if(typeof Module["setWindowTitle"]==="undefined"){
		Module["setWindowTitle"]=(function(title){document.title=title})}}
		else{throw new Error("Unknown runtime environment. Where are we?")}
		if(!Module["print"]){Module["print"]=(function(){})}
		if(!Module["printErr"]){Module["printErr"]=Module["print"]}
		if(!Module["arguments"]){Module["arguments"]=[]}
		if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}
		if(!Module["quit"]){Module["quit"]=(function(status,toThrow){
			throw toThrow})}Module.print=Module["print"];
Module.printErr=Module["printErr"];
Module["preRun"]=[];
Module["postRun"]=[];
for(key in moduleOverrides){
	if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;
var Runtime={setTempRet0:(function(value){tempRet0=value;
return value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),
getNativeTypeSize:(function(type){
	switch(type){
		case"i1":case"i8":return 1;
		case"i16":return 2;
		case"i32":return 4;
		case"i64":return 8;
		case"float":return 4;
		case"double":return 8;
		default:{if(type[type.length-1]==="*"){
	return Runtime.QUANTUM_SIZE}
	else if(type[0]==="i"){
		var bits=parseInt(type.substr(1));
assert(bits%8===0);
return bits/8}
else{return 0}}}}),getNativeFieldSize:(function(type){
	return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){
		if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);
ptr+=4}}else{
	assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;
if(!type)
	return Math.min(size,8);
return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){
	if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}
	else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[],addFunction:(function(func){
		for(var i=0;i<Runtime.functionPointers.length;i++){
			if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;
return 2*(1+i)}}
throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),
removeFunction:(function(index){Runtime.functionPointers[(index-2)/2]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};
if(!Runtime.warnOnce.shown[text]){
	Runtime.warnOnce.shown[text]=1;
Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){if(!func)return;
assert(sig);
if(!Runtime.funcWrappers[sig]){
	Runtime.funcWrappers[sig]={}}
	var sigCache=Runtime.funcWrappers[sig];
if(!sigCache[func]){
	if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func)}}
	else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg])}}
	else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments))}}}
	return sigCache[func]}),getCompilerSetting:(function(name){
		throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){
			var ret=STACKTOP;
STACKTOP=STACKTOP+size|0;
STACKTOP=STACKTOP+15&-16;
return ret}),staticAlloc:(function(size){var ret=STATICTOP;
STATICTOP=STATICTOP+size|0;
STATICTOP=STATICTOP+15&-16;
return ret}),dynamicAlloc:(function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];
var end=(ret+size+15|0)&-16;
HEAP32[DYNAMICTOP_PTR>>2]=end;
if(end>=TOTAL_MEMORY){var success=enlargeMemory();
if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;
return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);
return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*4294967296:+(low>>>0)+ +(high|0)*4294967296;
return ret}),GLOBAL_BASE:1024,QUANTUM_SIZE:4,__dummy__:0};
Module["Runtime"]=Runtime;
var ABORT=0;
var EXITSTATUS=0;
function assert(condition,text){
	if(!condition){abort("Assertion failed: "+text)}}
	var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){
		var ret=Runtime.stackAlloc(arr.length);
writeArrayToMemory(arr,ret);
return ret}),"stringToC":(function(str){
	var ret=0;
if(str!==null&&str!==undefined&&str!==0){
	var len=(str.length<<2)+1;
ret=Runtime.stackAlloc(len);
stringToUTF8(str,ret,len)}return ret})};
var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};
function setValue(ptr,value,type,noSafe){type=type||"i8";
if(type.charAt(type.length-1)==="*")type="i32";
switch(type){
	case"i1":HEAP8[ptr>>0]=value;
	break;
	case"i8":HEAP8[ptr>>0]=value;
	break;
	case"i16":HEAP16[ptr>>1]=value;
	break;
	case"i32":HEAP32[ptr>>2]=value;
	break;
	case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];
	break;
	case"float":HEAPF32[ptr>>2]=value;
	break;
	case"double":HEAPF64[ptr>>3]=value;
	break;
	default:abort("invalid type for setValue: "+type)}}
	var ALLOC_NORMAL=0;
var ALLOC_STACK=1;
var ALLOC_STATIC=2;
var ALLOC_DYNAMIC=3;
var ALLOC_NONE=4;
Module["ALLOC_NORMAL"]=ALLOC_NORMAL;
Module["ALLOC_STACK"]=ALLOC_STACK;
Module["ALLOC_STATIC"]=ALLOC_STATIC;
Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;
Module["ALLOC_NONE"]=ALLOC_NONE;
function allocate(slab,types,allocator,ptr){
	var zeroinit,size;
if(typeof slab==="number"){zeroinit=true;
size=slab}else{
	zeroinit=false;
size=slab.length}
var singleType=typeof types==="string"?types:null;
var ret;
if(allocator==ALLOC_NONE){ret=ptr}
else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,
Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}
if(zeroinit){
	var stop;
ptr=ret;
assert((ret&3)==0);
stop=ret+(size&~3);
for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;
while(ptr<stop){HEAP8[ptr++>>0]=0}
return ret}
if(singleType==="i8"){
	if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}
	else{HEAPU8.set(new Uint8Array(slab),ret)}
	return ret}
	var i=0,type,typeSize,previousType;
while(i<size){var curr=slab[i];
if(typeof curr==="function"){
	curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];
if(type===0){
	i++;continue}
	if(type=="i64")type="i32";
setValue(ret+i,curr,type);
if(previousType!==type){
	typeSize=Runtime.getNativeTypeSize(type);
previousType=type}i+=typeSize}
return ret}
function getMemory(size){
	if(!staticSealed)return Runtime.staticAlloc(size);
if(!runtimeInitialized)
	return Runtime.dynamicAlloc(size);
return _malloc(size)}Module["getMemory"]=getMemory;
function Pointer_stringify(ptr,length){
	if(length===0||!ptr)return"";
var hasUtf=0;
var t;
var i=0;
while(1){t=HEAPU8[ptr+i>>0];
hasUtf|=t;
if(t==0&&!length)break;
i++;
if(length&&i==length)
	break}if(!length)
		length=i;
var ret="";
if(hasUtf<128){
	var MAX_CHUNK=1024;
var curr;
while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));
ret=ret?ret+curr:curr;
ptr+=MAX_CHUNK;
length-=MAX_CHUNK}
return ret}
return UTF8ToString(ptr)}
var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;
function UTF8ArrayToString(u8Array,idx){
	var endPtr=idx;
while(u8Array[endPtr])++endPtr;
if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){
	return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}
	else{
		var u0,u1,u2,u3,u4,u5;
var str="";
while(1){u0=u8Array[idx++];
if(!u0)return str;
if(!(u0&128)){
	str+=String.fromCharCode(u0);
continue}u1=u8Array[idx++]&63;
if((u0&224)==192){
	str+=String.fromCharCode((u0&31)<<6|u1);
continue}
u2=u8Array[idx++]&63;
if((u0&240)==224){
	u0=(u0&15)<<12|u1<<6|u2}else{
		u3=u8Array[idx++]&63;
if((u0&248)==240){
	u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{
		u4=u8Array[idx++]&63;
if((u0&252)==248){
	u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{
		u5=u8Array[idx++]&63;
u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}
if(u0<65536){str+=String.fromCharCode(u0)}
else{var ch=u0-65536;
str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}function UTF8ToString(ptr){
	return UTF8ArrayToString(HEAPU8,ptr)}function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;
var startIdx=outIdx;
var endIdx=outIdx+maxBytesToWrite-1;
for(var i=0;i<str.length;++i){
	var u=str.charCodeAt(i);
if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;
if(u<=127){if(outIdx>=endIdx)break;
outU8Array[outIdx++]=u}
else if(u<=2047){
	if(outIdx+1>=endIdx)break;
outU8Array[outIdx++]=192|u>>6;
outU8Array[outIdx++]=128|u&63}
else if(u<=65535){if(outIdx+2>=endIdx)break;
outU8Array[outIdx++]=224|u>>12;
outU8Array[outIdx++]=128|u>>6&63;
outU8Array[outIdx++]=128|u&63}
else if(u<=2097151){if(outIdx+3>=endIdx)break;
outU8Array[outIdx++]=240|u>>18;
outU8Array[outIdx++]=128|u>>12&63;
outU8Array[outIdx++]=128|u>>6&63;
outU8Array[outIdx++]=128|u&63}
else if(u<=67108863){if(outIdx+4>=endIdx)break;
outU8Array[outIdx++]=248|u>>24;
outU8Array[outIdx++]=128|u>>18&63;
outU8Array[outIdx++]=128|u>>12&63;
outU8Array[outIdx++]=128|u>>6&63;
outU8Array[outIdx++]=128|u&63}
else{if(outIdx+5>=endIdx)break;
outU8Array[outIdx++]=252|u>>30;
outU8Array[outIdx++]=128|u>>24&63;
outU8Array[outIdx++]=128|u>>18&63;
outU8Array[outIdx++]=128|u>>12&63;
outU8Array[outIdx++]=128|u>>6&63;
outU8Array[outIdx++]=128|u&63}}
outU8Array[outIdx]=0;
return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){
	return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){
		var len=0;
for(var i=0;i<str.length;++i){
	var u=str.charCodeAt(i);
if(u>=55296&&u<=57343)
	u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;
if(u<=127){++len}
else if(u<=2047){len+=2}
else if(u<=65535){len+=3}
else if(u<=2097151){len+=4}
else if(u<=67108863){len+=5}
else{len+=6}}return len}
var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;
function demangle(func){
	return func}function demangleAll(text){
		var regex=/__Z[\w\d_]+/g;
return text.replace(regex,(function(x){
	var y=demangle(x);
return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){
	var err=new Error;
if(!err.stack){
	try{throw new Error(0)}catch(e){err=e}if(!err.stack){
		return"(no stack trace available)"}}
		return err.stack.toString()}function stackTrace(){
			var js=jsStackTrace();
if(Module["extraStackTrace"])
	js+="\n"+Module["extraStackTrace"]();
return demangleAll(js)}
var PAGE_SIZE=16384;
var WASM_PAGE_SIZE=65536;
var ASMJS_PAGE_SIZE=16777216;
function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}
return x}
var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;
function updateGlobalBuffer(buf){
	Module["buffer"]=buffer=buf}
function updateGlobalBufferViews(){
	Module["HEAP8"]=HEAP8=new Int8Array(buffer);
Module["HEAP16"]=HEAP16=new Int16Array(buffer);
Module["HEAP32"]=HEAP32=new Int32Array(buffer);
Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);
Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);
Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);
Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);
Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}
var STATIC_BASE,STATICTOP,staticSealed;
var STACK_BASE,STACKTOP,STACK_MAX;
var DYNAMIC_BASE,DYNAMICTOP_PTR;
STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;
staticSealed=false;
function abortOnCannotGrowMemory(){
	abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+
	TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
	}
function enlargeMemory(){
	abortOnCannotGrowMemory()}
	var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;
var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||134217728;
if(TOTAL_MEMORY<TOTAL_STACK)Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");
if(Module["buffer"]){buffer=Module["buffer"]}
else{
	if(typeof WebAssembly==="object"&&typeof WebAssembly.Memory==="function"){
		Module["wasmMemory"]=new WebAssembly.Memory({"initial":TOTAL_MEMORY/WASM_PAGE_SIZE,"maximum":TOTAL_MEMORY/WASM_PAGE_SIZE});
buffer=Module["wasmMemory"].buffer}
else{buffer=new ArrayBuffer(TOTAL_MEMORY)}}updateGlobalBufferViews();
function getTotalMemory(){
	return TOTAL_MEMORY}HEAP32[0]=1668509029;
HEAP16[1]=25459;
if(HEAPU8[2]!==115||HEAPU8[3]!==99)
	throw"Runtime error: expected the system to be little-endian!";
Module["HEAP"]=HEAP;
Module["buffer"]=buffer;
Module["HEAP8"]=HEAP8;
Module["HEAP16"]=HEAP16;
Module["HEAP32"]=HEAP32;
Module["HEAPU8"]=HEAPU8;
Module["HEAPU16"]=HEAPU16;
Module["HEAPU32"]=HEAPU32;
Module["HEAPF32"]=HEAPF32;
Module["HEAPF64"]=HEAPF64;
function callRuntimeCallbacks(callbacks){
	while(callbacks.length>0){
		var callback=callbacks.shift();
if(typeof callback=="function"){callback();
continue}var func=callback.func;
if(typeof func==="number"){
	if(callback.arg===undefined){Module["dynCall_v"](func)}
else{Module["dynCall_vi"](func,callback.arg)}}
else{func(callback.arg===undefined?null:callback.arg)}}}
var __ATPRERUN__=[];
var __ATINIT__=[];
var __ATMAIN__=[];
var __ATEXIT__=[];
var __ATPOSTRUN__=[];
var runtimeInitialized=false;
var runtimeExited=false;
function preRun(){if(Module["preRun"]){
	if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];
while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}
function ensureInitRuntime(){
	if(runtimeInitialized)return;
runtimeInitialized=true;
callRuntimeCallbacks(__ATINIT__)}
function preMain(){callRuntimeCallbacks(__ATMAIN__)}
function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);
runtimeExited=true
}
function postRun(){
	if(Module["postRun"]){
	if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];
while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}
function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}
function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}
function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}
function writeAsciiToMemory(str,buffer,dontAddNull){
	for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}
if(!dontAddNull)
	HEAP8[buffer>>0]=0}assert(Math["imul"]&&Math["fround"]&&Math["clz32"]&&Math["trunc"],"this is a legacy browser, build with LEGACY_VM_SUPPORT");
var Math_abs=Math.abs;
var Math_cos=Math.cos;
var Math_sin=Math.sin;
var Math_tan=Math.tan;
var Math_acos=Math.acos;
var Math_asin=Math.asin;
var Math_atan=Math.atan;
var Math_atan2=Math.atan2;
var Math_exp=Math.exp;
var Math_log=Math.log;
var Math_sqrt=Math.sqrt;
var Math_ceil=Math.ceil;
var Math_floor=Math.floor;
var Math_pow=Math.pow;
var Math_imul=Math.imul;
var Math_fround=Math.fround;
var Math_round=Math.round;
var Math_min=Math.min;
var Math_clz32=Math.clz32;
var Math_trunc=Math.trunc;
var runDependencies=0;
var runDependencyWatcher=null;
var dependenciesFulfilled=null;
function addRunDependency(id){runDependencies++;
if(Module["monitorRunDependencies"]){
	Module["monitorRunDependencies"](runDependencies)}}
Module["addRunDependency"]=addRunDependency;
function removeRunDependency(id){runDependencies--;
if(Module["monitorRunDependencies"]){
	Module["monitorRunDependencies"](runDependencies)}
if(runDependencies==0){
	if(runDependencyWatcher!==null){
		clearInterval(runDependencyWatcher);
runDependencyWatcher=null}
if(dependenciesFulfilled){
	var callback=dependenciesFulfilled;
dependenciesFulfilled=null;
callback()}}}Module["removeRunDependency"]=removeRunDependency;
Module["preloadedImages"]={};
Module["preloadedAudios"]={};

function integrateWasmJS(){
	var wasmTextFile="FPhiExtractor.wast";
var wasmBinaryFile="FPhiExtractor.wasm";
var asmjsCodeFile="FPhiExtractor.temp.asm.js";
if(typeof Module["locateFile"]==="function"){
	wasmTextFile=Module["locateFile"](wasmTextFile);
wasmBinaryFile=Module["locateFile"](wasmBinaryFile);
asmjsCodeFile=Module["locateFile"](asmjsCodeFile)}
var wasmPageSize=64*1024;
var info={"global":null,"env":null,"asm2wasm":{"f64-rem":(
function(x,y){return x%y}),"debugger":(
function(){debugger})},"parent":Module};
var exports=null;
function mergeMemory(newBuffer){
	var oldBuffer=Module["buffer"];
if(newBuffer.byteLength<oldBuffer.byteLength){Module["printErr"]("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here")}
var oldView=new Int8Array(oldBuffer);
var newView=new Int8Array(newBuffer);
newView.set(oldView);
updateGlobalBuffer(newBuffer);
updateGlobalBufferViews()}
function fixImports(imports){return imports}
function getBinary(){
	try{if(Module["wasmBinary"]){return new Uint8Array(Module["wasmBinary"])}if(Module["readBinary"]){
		return Module["readBinary"](wasmBinaryFile)}
		else{throw"on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)"}}
		catch(err){abort(err)}}function getBinaryPromise(){
			if(!Module["wasmBinary"]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){
				return fetch(wasmBinaryFile,{credentials:"same-origin"}).then((function(response){
					if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}
					return response["arrayBuffer"]()})).catch((function(){return getBinary()}))}
					return new Promise((function(resolve,reject){resolve(getBinary())}))}
					function doNativeWasm(global,env,providedBuffer){if(typeof WebAssembly!=="object"){Module["printErr"]("no native wasm support detected");
return false}
if(!(Module["wasmMemory"]instanceof WebAssembly.Memory)){Module["printErr"]("no native wasm Memory in use");
return false}
env["memory"]=Module["wasmMemory"];
info["global"]={"NaN":NaN,"Infinity":Infinity};
info["global.Math"]=Math;
info["env"]=env;
function receiveInstance(instance,module){exports=instance.exports;
if(exports.memory)mergeMemory(exports.memory);
Module["asm"]=exports;
Module["usingWasm"]=true;
removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");
if(Module["instantiateWasm"]){
	try{return Module["instantiateWasm"](info,receiveInstance)}
catch(e){Module["printErr"]("Module.instantiateWasm callback failed with error: "+e);
return false}}function receiveInstantiatedSource(output){receiveInstance(output["instance"],output["module"])}
function instantiateArrayBuffer(receiver){getBinaryPromise().then((
function(binary){return WebAssembly.instantiate(binary,info)})).then(receiver).catch((function(reason){Module["printErr"]("failed to asynchronously prepare wasm: "+reason);
abort(reason)}))}
if(!Module["wasmBinary"]&&typeof WebAssembly.instantiateStreaming==="function"&&wasmBinaryFile.indexOf("data:")!==0&&typeof fetch==="function"){
	WebAssembly.instantiateStreaming(fetch(wasmBinaryFile,{credentials:"same-origin"}),info).then(receiveInstantiatedSource).catch((
	function(reason){Module["printErr"]("wasm streaming compile failed: "+reason);
Module["printErr"]("falling back to ArrayBuffer instantiation");
instantiateArrayBuffer(receiveInstantiatedSource)}))}
else{instantiateArrayBuffer(receiveInstantiatedSource)}
return{}}Module["asmPreload"]=Module["asm"];
var asmjsReallocBuffer=Module["reallocBuffer"];
var wasmReallocBuffer=(function(size){var PAGE_MULTIPLE=Module["usingWasm"]?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE;
size=alignUp(size,PAGE_MULTIPLE);
var old=Module["buffer"];
var oldSize=old.byteLength;
if(Module["usingWasm"]){try{var result=Module["wasmMemory"].grow((size-oldSize)/wasmPageSize);
if(result!==(-1|0)){return Module["buffer"]=Module["wasmMemory"].buffer}
else{return null}}catch(e){return null}}});
Module["reallocBuffer"]=(function(size){if(finalMethod==="asmjs"){
	return asmjsReallocBuffer(size)}else{return wasmReallocBuffer(size)}});
var finalMethod="";
Module["asm"]=(function(global,env,providedBuffer){env=fixImports(env);
if(!env["table"]){
	var TABLE_SIZE=Module["wasmTableSize"];
if(TABLE_SIZE===undefined)TABLE_SIZE=1024;
var MAX_TABLE_SIZE=Module["wasmMaxTableSize"];
if(typeof WebAssembly==="object"&&typeof WebAssembly.Table==="function"){
	if(MAX_TABLE_SIZE!==undefined){env["table"]=new WebAssembly.Table({"initial":TABLE_SIZE,"maximum":MAX_TABLE_SIZE,"element":"anyfunc"})}
	else{env["table"]=new WebAssembly.Table({"initial":TABLE_SIZE,element:"anyfunc"})}}
	else{env["table"]=new Array(TABLE_SIZE)}Module["wasmTable"]=env["table"]}
	if(!env["memoryBase"]){env["memoryBase"]=Module["STATIC_BASE"]}if(!env["tableBase"]){env["tableBase"]=0}
	var exports;
exports=doNativeWasm(global,env,providedBuffer);
if(!exports)
	abort("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods");
return exports})}integrateWasmJS();
var ASM_CONSTS=[];
STATIC_BASE=Runtime.GLOBAL_BASE;
STATICTOP=STATIC_BASE+1369968;
__ATINIT__.push({func:(function(){__GLOBAL__sub_I_ExtractorCore_cpp()})},{func:(function(){__GLOBAL__sub_I_FaceDetector_cpp()})},
{func:(function(){__GLOBAL__sub_I_Base64_cpp()})},{func:(function(){__GLOBAL__sub_I_FPhiExtractorBindings_cpp()})},{func:(function(){__GLOBAL__sub_I_bind_cpp()})});
var STATIC_BUMP=1369968;
Module["STATIC_BASE"]=STATIC_BASE;
Module["STATIC_BUMP"]=STATIC_BUMP;
STATICTOP+=16;
function __ZSt18uncaught_exceptionv(){
	return!!__ZSt18uncaught_exceptionv.uncaught_exception}function ___cxa_allocate_exception(size){
		return _malloc(size)}var EXCEPTIONS={last:0,caught:[],infos:{},deAdjust:(function(adjusted){if(!adjusted||EXCEPTIONS.infos[adjusted])
			return adjusted;
for(var ptr in EXCEPTIONS.infos){
	var info=EXCEPTIONS.infos[ptr];
if(info.adjusted===adjusted){return ptr}}
return adjusted}),addRef:(function(ptr){if(!ptr)return;
var info=EXCEPTIONS.infos[ptr];
info.refcount++}),decRef:(function(ptr){if(!ptr)return;
var info=EXCEPTIONS.infos[ptr];
assert(info.refcount>0);
info.refcount--;
if(info.refcount===0&&!info.rethrown){
	if(info.destructor){Module["dynCall_vi"](info.destructor,ptr)}delete EXCEPTIONS.infos[ptr];
___cxa_free_exception(ptr)}}),clearRef:(function(ptr){if(!ptr)return;
var info=EXCEPTIONS.infos[ptr];
info.refcount=0})};
function ___cxa_decrement_exception_refcount(ptr){EXCEPTIONS.decRef(EXCEPTIONS.deAdjust(ptr))}
function ___cxa_increment_exception_refcount(ptr){EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(ptr))}
function ___cxa_pure_virtual(){ABORT=true;
throw"Pure virtual function called!"}
function ___cxa_free_exception(ptr){try{return _free(ptr)}catch(e){}}
function ___cxa_rethrow(){var ptr=EXCEPTIONS.caught.pop();
if(!EXCEPTIONS.infos[ptr].rethrown){EXCEPTIONS.caught.push(ptr);
EXCEPTIONS.infos[ptr].rethrown=true}EXCEPTIONS.last=ptr;
throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."}
function ___cxa_rethrow_primary_exception(ptr){
	if(!ptr)return;
EXCEPTIONS.caught.push(ptr);
EXCEPTIONS.infos[ptr].rethrown=true;
___cxa_rethrow()}
function ___cxa_find_matching_catch(){
	var thrown=EXCEPTIONS.last;
if(!thrown){return(Runtime.setTempRet0(0),0)|0}
var info=EXCEPTIONS.infos[thrown];
var throwntype=info.type;
if(!throwntype){
	return(Runtime.setTempRet0(0),thrown)|0}
	var typeArray=Array.prototype.slice.call(arguments);
var pointer=Module["___cxa_is_pointer_type"](throwntype);
if(!___cxa_find_matching_catch.buffer)___cxa_find_matching_catch.buffer=_malloc(4);
HEAP32[___cxa_find_matching_catch.buffer>>2]=thrown;
thrown=___cxa_find_matching_catch.buffer;
for(var i=0;i<typeArray.length;i++){
	if(typeArray[i]&&Module["___cxa_can_catch"](typeArray[i],throwntype,thrown)){thrown=HEAP32[thrown>>2];
info.adjusted=thrown;
return(Runtime.setTempRet0(typeArray[i]),thrown)|0}}thrown=HEAP32[thrown>>2];
return(Runtime.setTempRet0(throwntype),thrown)|0}
function ___cxa_throw(ptr,type,destructor){EXCEPTIONS.infos[ptr]={ptr:ptr,adjusted:ptr,type:type,destructor:destructor,refcount:0,caught:false,rethrown:false};
EXCEPTIONS.last=ptr;
if(!("uncaught_exception"in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv.uncaught_exception=1}
else{__ZSt18uncaught_exceptionv.uncaught_exception++}
throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."}
function ___lock(){}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,
EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,
EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,
EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,
ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,
ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,
EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,
EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,
EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
function ___setErrNo(value){
	if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;
return value}
function ___map_file(pathname,size){___setErrNo(ERRNO_CODES.EPERM);
return-1}
var SYSCALLS={varargs:0,get:(
function(varargs){SYSCALLS.varargs+=4;
var ret=HEAP32[SYSCALLS.varargs-4>>2];
return ret}),getStr:(
function(){
	var ret=Pointer_stringify(SYSCALLS.get());
return ret}),get64:(
function(){
	var low=SYSCALLS.get(),high=SYSCALLS.get();
if(low>=0)assert(high===0);
else assert(high===-1);
return low}),getZero:(
function(){assert(SYSCALLS.get()===0)})};
function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;
try{
	var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();
var offset=offset_low;
FS.llseek(stream,offset,whence);
HEAP32[result>>2]=stream.position;
if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;
return 0}catch(e){
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
return-e.errno}}
function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;
try{
	var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();
var ret=0;
if(!___syscall146.buffer){___syscall146.buffers=[null,[],[]];
___syscall146.printChar=(
function(stream,curr){
	var buffer=___syscall146.buffers[stream];
assert(buffer);
if(curr===0||curr===10){(stream===1?Module["print"]:Module["printErr"])(UTF8ArrayToString(buffer,0));
buffer.length=0}
else{buffer.push(curr)}})}
for(var i=0;i<iovcnt;i++){
	var ptr=HEAP32[iov+i*8>>2];
var len=HEAP32[iov+(i*8+4)>>2];
for(var j=0;j<len;j++){___syscall146.printChar(stream,HEAPU8[ptr+j])}ret+=len}
return ret}catch(e){
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
return-e.errno}}
function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;
try{
	var stream=SYSCALLS.getStreamFromFD();
FS.close(stream);
return 0}catch(e){
	if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
return-e.errno}}
function ___syscall91(which,varargs){SYSCALLS.varargs=varargs;
try{
	var addr=SYSCALLS.get(),len=SYSCALLS.get();
var info=SYSCALLS.mappings[addr];
if(!info)
	return 0;
if(len===info.len){
	var stream=FS.getStream(info.fd);
SYSCALLS.doMsync(addr,stream,len,info.flags);
FS.munmap(stream);
SYSCALLS.mappings[addr]=null;
if(info.allocated){_free(info.malloc)}}
return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);
return-e.errno}}
function ___unlock(){}var structRegistrations={};
function runDestructors(destructors){
	while(destructors.length){var ptr=destructors.pop();
var del=destructors.pop();
del(ptr)}}
function simpleReadValueFromPointer(pointer){
	return this["fromWireType"](HEAPU32[pointer>>2])}
	var awaitingDependencies={};
var registeredTypes={};
var typeDependencies={};
var char_0=48;
var char_9=57;
function makeLegalFunctionName(name){
	if(undefined===name){
		return"_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");
var f=name.charCodeAt(0);
if(f>=char_0&&f<=char_9){return"_"+name}
else{return name}}
function createNamedFunction(name,body){name=makeLegalFunctionName(name);
return(new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n"))(body)}
function extendError(baseErrorType,errorName){
	var errorClass=createNamedFunction(errorName,(
	function(message){this.name=errorName;
this.message=message;
var stack=(new Error(message)).stack;
if(stack!==undefined){
	this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"")}}));
errorClass.prototype=Object.create(baseErrorType.prototype);
errorClass.prototype.constructor=errorClass;
errorClass.prototype.toString=(
function(){if(this.message===undefined){return this.name}
else{return this.name+": "+this.message}});
return errorClass}
var InternalError=undefined;
function throwInternalError(message){
	throw new InternalError(message)}
	function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach((
	function(type){typeDependencies[type]=dependentTypes}));
function onComplete(typeConverters){
	var myTypeConverters=getTypeConverters(typeConverters);
if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}
for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}
var typeConverters=new Array(dependentTypes.length);
var unregisteredTypes=[];
var registered=0;
dependentTypes.forEach((
function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}
else{unregisteredTypes.push(dt);
if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push((
function(){typeConverters[i]=registeredTypes[dt];
++registered;
if(registered===unregisteredTypes.length){onComplete(typeConverters)}}))}}));
if(0===unregisteredTypes.length){onComplete(typeConverters)}}
function __embind_finalize_value_object(structType){
	var reg=structRegistrations[structType];
delete structRegistrations[structType];
var rawConstructor=reg.rawConstructor;
var rawDestructor=reg.rawDestructor;
var fieldRecords=reg.fields;
var fieldTypes=fieldRecords.map((
function(field){return field.getterReturnType})).concat(fieldRecords.map((
function(field){return field.setterArgumentType})));
whenDependentTypesAreResolved([structType],fieldTypes,(
function(fieldTypes){
	var fields={};
fieldRecords.forEach((
function(field,i){
	var fieldName=field.fieldName;
var getterReturnType=fieldTypes[i];
var getter=field.getter;
var getterContext=field.getterContext;
var setterArgumentType=fieldTypes[i+fieldRecords.length];
var setter=field.setter;
var setterContext=field.setterContext;
fields[fieldName]={read:(
function(ptr){return getterReturnType["fromWireType"](getter(getterContext,ptr))}),write:(function(ptr,o){var destructors=[];
setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,o));
runDestructors(destructors)})}}));
return[{name:reg.name,"fromWireType":(
function(ptr){var rv={};
for(var i in fields){rv[i]=fields[i].read(ptr)}rawDestructor(ptr);
return rv}),"toWireType":(
function(destructors,o){for(var fieldName in fields){if(!(fieldName in o)){
	throw new TypeError("Missing field")}}var ptr=rawConstructor();
for(fieldName in fields){fields[fieldName].write(ptr,o[fieldName])}if(destructors!==null){destructors.push(rawDestructor,ptr)}
return ptr}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:rawDestructor}]}))}
function getShiftFromSize(size){
	switch(size){
		case 1:return 0;
case 2:return 1;
case 4:return 2;
case 8:return 3;
default:throw new TypeError("Unknown type size: "+size)}}
function embind_init_charCodes(){var codes=new Array(256);
for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes}var embind_charCodes=undefined;
function readLatin1String(ptr){var ret="";
var c=ptr;
while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]]}return ret}
var BindingError=undefined;
function throwBindingError(message){
	throw new BindingError(message)}
function registerType(rawType,registeredInstance,options){options=options||{};
if(!("argPackAdvance"in registeredInstance)){
	throw new TypeError("registerType registeredInstance requires argPackAdvance")}
	var name=registeredInstance.name;
if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer')}
if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}
else{throwBindingError("Cannot register type '"+name+"' twice")}}registeredTypes[rawType]=registeredInstance;
delete typeDependencies[rawType];
if(awaitingDependencies.hasOwnProperty(rawType)){
	var callbacks=awaitingDependencies[rawType];
delete awaitingDependencies[rawType];
callbacks.forEach((function(cb){cb()}))}}
function __embind_register_bool(rawType,name,size,trueValue,falseValue){
	var shift=getShiftFromSize(size);
name=readLatin1String(name);
registerType(rawType,{name:name,"fromWireType":(function(wt){return!!wt}),"toWireType":(function(destructors,o){
	return o?trueValue:falseValue}),"argPackAdvance":8,"readValueFromPointer":(function(pointer){var heap;
if(size===1){heap=HEAP8}
else if(size===2){heap=HEAP16}
else if(size===4){heap=HEAP32}
else{throw new TypeError("Unknown boolean type size: "+name)}
return this["fromWireType"](heap[pointer>>shift])}),destructorFunction:null})}
function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false}
if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;
var left=this.$$.ptr;
var rightClass=other.$$.ptrType.registeredClass;
var right=other.$$.ptr;
while(leftClass.baseClass){left=leftClass.upcast(left);
leftClass=leftClass.baseClass}
while(rightClass.baseClass){right=rightClass.upcast(right);
rightClass=rightClass.baseClass}
return leftClass===rightClass&&left===right}
function shallowCopyInternalPointer(o){
	return{count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,
	smartPtrType:o.smartPtrType}}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){
		return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted")}
		function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}
		if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;
return this}else{var clone=Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}});
clone.$$.count.value+=1;
clone.$$.deleteScheduled=false;
return clone}}function runDestructor(handle){
	var $$=handle.$$;
if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr)}
else{$$.ptrType.registeredClass.rawDestructor($$.ptr)}}
function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}
if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}
this.$$.count.value-=1;
var toDelete=0===this.$$.count.value;
if(toDelete){runDestructor(this)}
if(!this.$$.preservePointerOnDelete){
	this.$$.smartPtr=undefined;
this.$$.ptr=undefined}}
function ClassHandle_isDeleted(){
	return!this.$$.ptr}
var delayFunction=undefined;
var deletionQueue=[];
function flushPendingDeletes(){
	while(deletionQueue.length){var obj=deletionQueue.pop();
obj.$$.deleteScheduled=false;
obj["delete"]()}}
function ClassHandle_deleteLater(){
	if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}
	if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}deletionQueue.push(this);
if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes)}
this.$$.deleteScheduled=true;
return this}
function init_ClassHandle(){ClassHandle.prototype["isAliasOf"]=ClassHandle_isAliasOf;
ClassHandle.prototype["clone"]=ClassHandle_clone;
ClassHandle.prototype["delete"]=ClassHandle_delete;
ClassHandle.prototype["isDeleted"]=ClassHandle_isDeleted;
ClassHandle.prototype["deleteLater"]=ClassHandle_deleteLater}
function ClassHandle(){}var registeredPointers={};
function ensureOverloadTable(proto,methodName,humanName){
	if(undefined===proto[methodName].overloadTable){
		var prevFunc=proto[methodName];
proto[methodName]=(function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){
	throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!")}
	return proto[methodName].overloadTable[arguments.length].apply(this,arguments)});
proto[methodName].overloadTable=[];
proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}}
function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){
	if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){
		throwBindingError("Cannot register public name '"+name+"' twice")}ensureOverloadTable(Module,name,name);
if(Module.hasOwnProperty(numArguments)){
	throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!")}Module[name].overloadTable[numArguments]=value}
	else{Module[name]=value;
if(undefined!==numArguments){Module[name].numArguments=numArguments}}}
function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){
	this.name=name;
this.constructor=constructor;
this.instancePrototype=instancePrototype;
this.rawDestructor=rawDestructor;
this.baseClass=baseClass;
this.getActualType=getActualType;
this.upcast=upcast;
this.downcast=downcast;
this.pureVirtualFunctions=[]}
function upcastPointer(ptr,ptrClass,desiredClass){
	while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError("Expected null or instance of "+desiredClass.name+", got an instance of "+ptrClass.name)}
	ptr=ptrClass.upcast(ptr);
ptrClass=ptrClass.baseClass}return ptr}function constNoSmartPtrRawPointerToWireType(destructors,handle){
	if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name)}return 0}
	if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}
	if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}
	var handleClass=handle.$$.ptrType.registeredClass;
var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);
return ptr}function genericPointerToWireType(destructors,handle){
	var ptr;
if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name)}
if(this.isSmartPointer){ptr=this.rawConstructor();
if(destructors!==null){destructors.push(this.rawDestructor,ptr)}return ptr}
else{return 0}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}
if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}
if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+
" to parameter type "+this.name)}var handleClass=handle.$$.ptrType.registeredClass;
ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);
if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal")}
switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}
else{throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name)}break;
case 1:ptr=handle.$$.smartPtr;
break;
case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}
else{var clonedHandle=handle["clone"]();
ptr=this.rawShare(ptr,__emval_register((function(){clonedHandle["delete"]()})));
if(destructors!==null){destructors.push(this.rawDestructor,ptr)}}break;
default:throwBindingError("Unsupporting sharing policy")}}return ptr}
function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){
	if(this.isReference){throwBindingError("null is not a valid "+this.name)}return 0}
if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}
if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}
if(handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+handle.$$.ptrType.name+" to parameter type "+this.name)}
var handleClass=handle.$$.ptrType.registeredClass;
var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);
return ptr}
function RegisteredPointer_getPointee(ptr){
	if(this.rawGetPointee){ptr=this.rawGetPointee(ptr)}return ptr}
	function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr)}}
	function RegisteredPointer_deleteObject(handle){if(handle!==null){handle["delete"]()}}
	function downcastPointer(ptr,ptrClass,desiredClass){
		if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}
		var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);
if(rv===null){return null}return desiredClass.downcast(rv)}
function getInheritedInstanceCount(){return Object.keys(registeredInstances).length}
function getLiveInheritedInstances(){var rv=[];
for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k])}}return rv}
function setDelayFunction(fn){delayFunction=fn;
if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes)}}
function init_embind(){Module["getInheritedInstanceCount"]=getInheritedInstanceCount;
Module["getLiveInheritedInstances"]=getLiveInheritedInstances;
Module["flushPendingDeletes"]=flushPendingDeletes;
Module["setDelayFunction"]=setDelayFunction}
var registeredInstances={};
function getBasestPointer(class_,ptr){
	if(ptr===undefined){throwBindingError("ptr should not be undefined")}
	while(class_.baseClass){ptr=class_.upcast(ptr);
class_=class_.baseClass}return ptr}
function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);
return registeredInstances[ptr]}
function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType")}
var hasSmartPtrType=!!record.smartPtrType;
var hasSmartPtr=!!record.smartPtr;
if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified")}record.count={value:1};
return Object.create(prototype,{$$:{value:record}})}
function RegisteredPointer_fromWireType(ptr){
	var rawPointer=this.getPointee(ptr);
if(!rawPointer){this.destructor(ptr);
return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);
if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;
registeredInstance.$$.smartPtr=ptr;
return registeredInstance["clone"]()}else{var rv=registeredInstance["clone"]();
this.destructor(ptr);
return rv}}function makeDefaultHandle(){
	if(this.isSmartPointer){
	return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}
	else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr})}}
	var actualType=this.registeredClass.getActualType(rawPointer);
var registeredPointerRecord=registeredPointers[actualType];
if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;
if(this.isConst){toType=registeredPointerRecord.constPointerType}
else{toType=registeredPointerRecord.pointerType}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);
if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){
	return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}
	else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}
	function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;
RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;
RegisteredPointer.prototype["argPackAdvance"]=8;
RegisteredPointer.prototype["readValueFromPointer"]=simpleReadValueFromPointer;
RegisteredPointer.prototype["deleteObject"]=RegisteredPointer_deleteObject;
RegisteredPointer.prototype["fromWireType"]=RegisteredPointer_fromWireType}
function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){
	this.name=name;
this.registeredClass=registeredClass;
this.isReference=isReference;
this.isConst=isConst;
this.isSmartPointer=isSmartPointer;
this.pointeeType=pointeeType;
this.sharingPolicy=sharingPolicy;
this.rawGetPointee=rawGetPointee;
this.rawConstructor=rawConstructor;
this.rawShare=rawShare;
this.rawDestructor=rawDestructor;
if(!isSmartPointer&&registeredClass.baseClass===undefined){
	if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;
this.destructorFunction=null}else{this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;
this.destructorFunction=null}}else{this["toWireType"]=genericPointerToWireType}}
function replacePublicSymbol(name,value,numArguments){
	if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol")}
	if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}
	else{Module[name]=value;
Module[name].argCount=numArguments}}
function requireFunction(signature,rawFunction){signature=readLatin1String(signature);
function makeDynCaller(dynCall){
	var args=[];
for(var i=1;
i<signature.length;++i){args.push("a"+i)}
var name="dynCall_"+signature+"_"+rawFunction;
var body="return function "+name+"("+args.join(", ")+") {\n";
body+="    return dynCall(rawFunction"+(args.length?", ":"")+args.join(", ")+");\n";
body+="};\n";
return(new Function("dynCall","rawFunction",body))(dynCall,rawFunction)}
var fp;
if(Module["FUNCTION_TABLE_"+signature]!==undefined){
	fp=Module["FUNCTION_TABLE_"+signature][rawFunction]}
	else if(typeof FUNCTION_TABLE!=="undefined"){
		fp=FUNCTION_TABLE[rawFunction]}
		else{
			var dc=Module["asm"]["dynCall_"+signature];
			if(dc===undefined){
				dc=Module["asm"]["dynCall_"+signature.replace(/f/g,"d")];
				if(dc===undefined){throwBindingError("No dynCall invoker for signature: "+signature)}}
				fp=makeDynCaller(dc)
		    }
			if(typeof fp!=="function"){
				throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction)
				}
				return fp
				}
				var UnboundTypeError=undefined;
				function getTypeName(type){
					var ptr=___getTypeName(type);
					var rv=readLatin1String(ptr);_free(ptr);
					return rv}
				function throwUnboundTypeError(message,types){
						var unboundTypes=[];
						var seen={};
				function visit(type){
						if(seen[type]){return}
						if(registeredTypes[type]){return}
						if(typeDependencies[type]){typeDependencies[type].forEach(visit);
						return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);
						throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}
				function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,
				                                 upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){
					       name=readLatin1String(name);
						   getActualType=requireFunction(getActualTypeSignature,getActualType);
						   if(upcast){upcast=requireFunction(upcastSignature,upcast)}
						   if(downcast){downcast=requireFunction(downcastSignature,downcast)}rawDestructor=requireFunction(destructorSignature,rawDestructor);
						   var legalFunctionName=makeLegalFunctionName(name);
						   exposePublicSymbol(legalFunctionName,(function(){
							   throwUnboundTypeError("Cannot construct "+name+" due to unbound types",[baseClassRawType])}));
							   whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],(
							   function(base){base=base[0];
							   var baseClass;
							   var basePrototype;
							   if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype}else{
								   basePrototype=ClassHandle.prototype}
								   var constructor=createNamedFunction(legalFunctionName,(function(){
									   if(Object.getPrototypeOf(this)!==instancePrototype){
										   throw new BindingError("Use 'new' to construct "+name)}
										   if(undefined===registeredClass.constructor_body){
											   throw new BindingError(name+" has no accessible constructor")}
											   var body=registeredClass.constructor_body[arguments.length];
											   if(undefined===body){
												   throw new BindingError("Tried to invoke ctor of "+name+" with invalid number of parameters ("+arguments.length+") - expected ("+
												   Object.keys(registeredClass.constructor_body).toString()+") parameters instead!")}
												   return body.apply(this,arguments)}));
												   var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;
												   var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);
												   var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);
												   var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);
												   var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);
												   registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);
												   return[referenceConverter,pointerConverter,constPointerConverter]}))}
												   function new_(constructor,argumentList){
													   if(!(constructor instanceof Function)){
													   throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}
													   var dummy=createNamedFunction(constructor.name||"unknownFunctionName",(function(){}));
													   dummy.prototype=constructor.prototype;var obj=new dummy;
													   var r=constructor.apply(obj,argumentList);
													   return r instanceof Object?r:obj}
													   function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){
														   var argCount=argTypes.length;
														   if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}
														   var isClassMethodFunc=argTypes[1]!==null&&classType!==null;
														   var needsDestructorStack=false;
														   for(var i=1;i<argTypes.length;++i){
															   if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){
															   needsDestructorStack=true;break}}
														   var returns=argTypes[0].name!=="void";
														   var argsList="";
														   var argsListWired="";
														   for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired"}
														   var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+
														   (argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(
														   argCount-2)+" args!');\n"+"}\n";
														   if(needsDestructorStack){
															   invokerFnBody+="var destructors = [];\n"}
														   var dtorStack=needsDestructorStack?"destructors":"null";
														   var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];
														   var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];
														   if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n"}
														   for(var i=0;i<argCount-2;++i){
															   invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";
															   args1.push("argType"+i);args2.push(argTypes[i+2])}
															   if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired}invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+
															   (argsListWired.length>0?", ":"")+argsListWired+");\n";
															   if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n"}
															   else{
																   for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){
																	   var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";
																	   if(argTypes[i].destructorFunction!==null){
																		   invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");
																	   args2.push(argTypes[i].destructorFunction)}}}
																	   if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n"}
																	   else{}invokerFnBody+="}\n";args1.push(invokerFnBody);
																	   var invokerFunction=new_(Function,args1).apply(null,args2);
																	   return invokerFunction}
																	   function heap32VectorToArray(count,firstElement){
																		   var array=[];
																	   for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i])}
																	   return array}
																	   function __embind_register_class_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,fn){
																		   var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);
																		   methodName=readLatin1String(methodName);rawInvoker=requireFunction(invokerSignature,rawInvoker);
																		   whenDependentTypesAreResolved([],[rawClassType],(
																		   function(classType){classType=classType[0];
																		   var humanName=classType.name+"."+methodName;
																		   function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes)}
																		   var proto=classType.registeredClass.constructor;
																		   if(undefined===proto[methodName]){unboundTypesHandler.argCount=argCount-1;proto[methodName]=unboundTypesHandler}
																		   else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-1]=unboundTypesHandler}
																		   whenDependentTypesAreResolved([],rawArgTypes,(
																		   function(argTypes){
																			   var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));
																		   var func=craftInvokerFunction(humanName,invokerArgsArray,null,rawInvoker,fn);
																		   if(undefined===proto[methodName].overloadTable){proto[methodName]=func}else{
																			   proto[methodName].overloadTable[argCount-1]=func}return[]}));return[]}))}
																			   function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){
																				   var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);
																				   invoker=requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],(
																				   function(classType){classType=classType[0];
																				   var humanName="constructor "+classType.name;
																				   if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[]}
																				   if(undefined!==classType.registeredClass.constructor_body[argCount-1]){
																					   throw new BindingError("Cannot register multiple constructors with identical number of parameters ("+(argCount-1)+") for class '"+
																					   classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!")}
																					   classType.registeredClass.constructor_body[argCount-1]=
																					   function unboundTypeHandler(){throwUnboundTypeError("Cannot construct "+classType.name+" due to unbound types",rawArgTypes)};
																					   whenDependentTypesAreResolved([],rawArgTypes,(function(argTypes){classType.registeredClass.constructor_body[argCount-1]=
																					   function constructor_body(){
																						   if(arguments.length!==argCount-1){throwBindingError(humanName+" called with "+arguments.length+" arguments, expected "+
																						   (argCount-1))}
																						   var destructors=[];
																						   var args=new Array(argCount);args[0]=rawConstructor;
																						   for(var i=1;i<argCount;++i){args[i]=argTypes[i]["toWireType"](destructors,arguments[i-1])}
																						   var ptr=invoker.apply(null,args);runDestructors(destructors);
																						   return argTypes[0]["fromWireType"](ptr)};
																						   return[]}));
																						   return[]}))}
																						   function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,
																						   context,isPureVirtual){
																							   var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);
																							   rawInvoker=requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],(
																							   function(classType){classType=classType[0];
																							   var humanName=classType.name+"."+methodName;
																							   if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName)}
																							   function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes)}
																							   var proto=classType.registeredClass.instancePrototype;
																							   var method=proto[methodName];
																							   if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){
																								   unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler}
																							   else{
																								   ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler}
																								   whenDependentTypesAreResolved([],rawArgTypes,
																								   (function(argTypes){var 
																								   memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);
																								   if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;
																								   proto[methodName]=memberFunction}else{
																									   proto[methodName].overloadTable[argCount-2]=memberFunction}return[]}));
																									   return[]}))}
																									   var emval_free_list=[];
																									   var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];
																									   function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){
																										   emval_handle_array[handle]=undefined;
																									   emval_free_list.push(handle)}}
																									   function count_emval_handles(){
																										   var count=0;
																										   for(var i=5;i<emval_handle_array.length;++i){
																											   if(emval_handle_array[i]!==undefined){++count}}
																											   return count}
																											   function get_first_emval(){
																												   for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){
																													   return emval_handle_array[i]}}return null}
																													   function init_emval(){Module["count_emval_handles"]=count_emval_handles;
																													   Module["get_first_emval"]=get_first_emval}
																													   function __emval_register(value){
																														   switch(value){
																															   case undefined:{return 1};
																															   case null:{return 2};
																															   case true:{return 3};
																															   case false:{return 4};
																															   default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;
																															   emval_handle_array[handle]={refcount:1,value:value};
																															   return handle}}}
																															   function __embind_register_emval(rawType,name){name=readLatin1String(name);
																															   registerType(rawType,{name:name,"fromWireType":(function(handle){
																																   var rv=emval_handle_array[handle].value;
																															   __emval_decref(handle);
																															   return rv}),"toWireType":(function(destructors,value){
																																   return __emval_register(value)}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null})}
																																   function enumReadValueFromPointer(name,shift,signed){
																																	   switch(shift){
																																		   case 0:return(function(pointer){var heap=signed?HEAP8:HEAPU8;
																															   return this["fromWireType"](heap[pointer])});
																															   case 1:return(function(pointer){var heap=signed?HEAP16:HEAPU16;
																															   return this["fromWireType"](heap[pointer>>1])});
																															   case 2:return(function(pointer){var heap=signed?HEAP32:HEAPU32;
																															   return this["fromWireType"](heap[pointer>>2])});
																															   default:throw new TypeError("Unknown integer type: "+name)}}
																															   function __embind_register_enum(rawType,name,size,isSigned){var shift=getShiftFromSize(size);
																															   name=readLatin1String(name);
																															   function ctor(){}ctor.values={};
																															   registerType(rawType,{name:name,constructor:ctor,"fromWireType":(function(c){return this.constructor.values[c]}),"toWireType":(
																															   function(destructors,c){return c.value}),"argPackAdvance":8,"readValueFromPointer":enumReadValueFromPointer(name,shift,isSigned),
																															   destructorFunction:null});
																															   exposePublicSymbol(name,ctor)}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];
																															   if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType))}return impl}
																															   function __embind_register_enum_value(rawEnumType,name,enumValue){var enumType=requireRegisteredType(rawEnumType,"enum");
																															   name=readLatin1String(name);
																															   var Enum=enumType.constructor;
																															   var Value=Object.create(enumType.constructor.prototype,{
																																   value:{value:enumValue},constructor:{value:createNamedFunction(enumType.name+"_"+name,(function(){}))}});
																															   Enum.values[enumValue]=Value;
																															   Enum[name]=Value}function _embind_repr(v){if(v===null){return"null"}
																															   var t=typeof v;
																															   if(t==="object"||t==="array"||t==="function"){return v.toString()}
																															   else{return""+v}}function floatReadValueFromPointer(name,shift){
																																   switch(shift){case 2:return(function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])});
																															   case 3:return(function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])});
																															   default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){
																																   var shift=getShiftFromSize(size);
																															   name=readLatin1String(name);
																															   registerType(rawType,{name:name,"fromWireType":(function(value){return value}),"toWireType":(
																															   function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){
																																   throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}
																																   return value}),"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null})}
																																   function __embind_register_function(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn){
																																	   var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);
																															   name=readLatin1String(name);
																															   rawInvoker=requireFunction(signature,rawInvoker);
																															   exposePublicSymbol(name,(function(){throwUnboundTypeError("Cannot call "+name+" due to unbound types",argTypes)}),argCount-1);
																															   whenDependentTypesAreResolved([],argTypes,(
																															   function(argTypes){var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));
																															   replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn),argCount-1);
																															   return[]}))}
																															   function integerReadValueFromPointer(name,shift,signed){
																																   switch(shift){
																																	   case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){
																																		   return HEAPU8[pointer]};
																															   case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){
																																   return HEAPU16[pointer>>1]};
																															   case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){
																																   return HEAPU32[pointer>>2]};
																															   default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){
																																   name=readLatin1String(name);
																															   if(maxRange===-1){maxRange=4294967295}var shift=getShiftFromSize(size);
																															   var fromWireType=(function(value){return value});
																															   if(minRange===0){var bitshift=32-8*size;
																															   fromWireType=(function(value){return value<<bitshift>>>bitshift})}
																															   var isUnsignedType=name.indexOf("unsigned")!=-1;
																															   registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":(
																															   function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){
																																   throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}
																																   if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+
																																   '" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!")}
																																   return isUnsignedType?value>>>0:value|0}),"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),
																																   destructorFunction:null})}function __embind_register_memory_view(rawType,dataTypeIndex,name){
																																	   var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];
																															   var TA=typeMapping[dataTypeIndex];
																															   function decodeMemoryView(handle){handle=handle>>2;
																															   var heap=HEAPU32;
																															   var size=heap[handle];
																															   var data=heap[handle+1];
																															   return new TA(heap["buffer"],data,size)}name=readLatin1String(name);
																															   registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},
																															   {ignoreDuplicateRegistrations:true})}function __embind_register_std_string(rawType,name){name=readLatin1String(name);
																															   registerType(rawType,{name:name,"fromWireType":(function(value){
																																   var length=HEAPU32[value>>2];
																															   var a=new Array(length);
																															   for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i])}_free(value);
																															   return a.join("")}),"toWireType":(function(destructors,value){
																																   if(value instanceof ArrayBuffer){value=new Uint8Array(value)}
																															   function getTAElement(ta,index){return ta[index]}
																															   function getStringElement(string,index){return string.charCodeAt(index)}
																															   var getElement;
																															   if(value instanceof Uint8Array){getElement=getTAElement}else if(value instanceof Uint8ClampedArray){getElement=getTAElement}
																															   else if(value instanceof Int8Array){getElement=getTAElement}else if(typeof value==="string"){getElement=getStringElement}
																															   else{throwBindingError("Cannot pass non-string to std::string")}var length=value.length;
																															   var ptr=_malloc(4+length);
																															   HEAPU32[ptr>>2]=length;
																															   for(var i=0;i<length;++i){var charCode=getElement(value,i);
																															   if(charCode>255){_free(ptr);
																															   throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+4+i]=charCode}
																															   if(destructors!==null){destructors.push(_free,ptr)}return ptr}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:(
																															   function(ptr){_free(ptr)})})}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);
																															   var getHeap,shift;
																															   if(charSize===2){getHeap=(function(){return HEAPU16});
																															   shift=1}else if(charSize===4){getHeap=(function(){return HEAPU32});
																															   shift=2}registerType(rawType,{name:name,"fromWireType":(function(value){var HEAP=getHeap();
																															   var length=HEAPU32[value>>2];
																															   var a=new Array(length);
																															   var start=value+4>>shift;
																															   for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAP[start+i])}_free(value);
																															   return a.join("")}),"toWireType":(function(destructors,value){var HEAP=getHeap();
																															   var length=value.length;
																															   var ptr=_malloc(4+length*charSize);
																															   HEAPU32[ptr>>2]=length;
																															   var start=ptr+4>>shift;
																															   for(var i=0;i<length;++i){HEAP[start+i]=value.charCodeAt(i)}if(destructors!==null){destructors.push(_free,ptr)}return ptr}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:(function(ptr){_free(ptr)})})}function __embind_register_value_object(rawType,name,constructorSignature,rawConstructor,destructorSignature,rawDestructor){structRegistrations[rawType]={name:readLatin1String(name),rawConstructor:requireFunction(constructorSignature,rawConstructor),rawDestructor:requireFunction(destructorSignature,rawDestructor),fields:[]}}function __embind_register_value_object_field(structType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){structRegistrations[structType].fields.push({fieldName:readLatin1String(fieldName),getterReturnType:getterReturnType,getter:requireFunction(getterSignature,getter),getterContext:getterContext,setterArgumentType:setterArgumentType,setter:requireFunction(setterSignature,setter),setterContext:setterContext})}function __embind_register_void(rawType,name){name=readLatin1String(name);
																															   registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":(function(){return undefined}),"toWireType":(function(destructors,o){return undefined})})}
																															   function requireHandle(handle){
																																   if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle)}return emval_handle_array[handle].value}
																															   function __emval_as(handle,returnType,destructorsRef){handle=requireHandle(handle);
																															   returnType=requireRegisteredType(returnType,"emval::as");
																															   var destructors=[];
																															   var rd=__emval_register(destructors);
																															   HEAP32[destructorsRef>>2]=rd;
																															   return returnType["toWireType"](destructors,handle)}
																															   var emval_symbols={};
																															   function getStringOrSymbol(address){var symbol=emval_symbols[address];
																															   if(symbol===undefined){return readLatin1String(address)}
																															   else{return symbol}}var emval_methodCallers=[];
																															   function __emval_call_void_method(caller,handle,methodName,args){caller=emval_methodCallers[caller];
																															   handle=requireHandle(handle);
																															   methodName=getStringOrSymbol(methodName);
																															   caller(handle,methodName,null,args)}function __emval_addMethodCaller(caller){var id=emval_methodCallers.length;
																															   emval_methodCallers.push(caller);
																															   return id}function __emval_lookupTypes(argCount,argTypes,argWireTypes){
																																   var a=new Array(argCount);
																															   for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAP32[(argTypes>>2)+i],"parameter "+i)}return a}
																															   function __emval_get_method_caller(argCount,argTypes){var types=__emval_lookupTypes(argCount,argTypes);
																															   var retType=types[0];var signatureName=retType.name+"_$"+types.slice(1).map((function(t){return t.name})).join("_")+"$";
																															   var params=["retType"];
																															   var args=[retType];
																															   var argsList="";
																															   for(var i=0;i<argCount-1;++i){argsList+=(i!==0?", ":"")+"arg"+i;
																															   params.push("argType"+i);
																															   args.push(types[1+i])}
																															   var functionName=makeLegalFunctionName("methodCaller_"+signatureName);
																															   var functionBody="return function "+functionName+"(handle, name, destructors, args) {\n";
																															   var offset=0;
																															   for(var i=0;i<argCount-1;++i){functionBody+="    var arg"+i+" = argType"+i+".readValueFromPointer(args"+(offset?"+"+offset:"")+");\n";
																															   offset+=types[i+1]["argPackAdvance"]}functionBody+="    var rv = handle[name]("+argsList+");\n";
																															   for(var i=0;i<argCount-1;++i){if(types[i+1]["deleteObject"]){functionBody+="    argType"+i+".deleteObject(arg"+i+");\n"}}
																															   if(!retType.isVoid){functionBody+="    return retType.toWireType(destructors, rv);\n"}functionBody+="};\n";
																															   params.push(functionBody);
																															   var invokerFunction=new_(Function,params).apply(null,args);
																															   return __emval_addMethodCaller(invokerFunction)}function __emval_get_module_property(name){name=getStringOrSymbol(name);
																															   return __emval_register(Module[name])}function __emval_get_property(handle,key){handle=requireHandle(handle);
																															   key=requireHandle(key);
																															   return __emval_register(handle[key])}function __emval_incref(handle){
																																   if(handle>4){emval_handle_array[handle].refcount+=1}}
																															   function craftEmvalAllocator(argCount){var argsList="";
																															   for(var i=0;i<argCount;++i){argsList+=(i!==0?", ":"")+"arg"+i}var functionBody="return function emval_allocator_"+argCount+"(constructor, argTypes, args) {\n";
																															   for(var i=0;i<argCount;++i){functionBody+="var argType"+i+" = requireRegisteredType(HEAP32[(argTypes >> 2) + "+i+'], "parameter '+i+'");\n'+"var arg"+i+" = argType"+i+".readValueFromPointer(args);\n"+"args += argType"+i+"['argPackAdvance'];\n"}functionBody+="var obj = new constructor("+argsList+");\n"+"return __emval_register(obj);\n"+"}\n";
																															   return(new Function("requireRegisteredType","HEAP32","__emval_register",functionBody))(requireRegisteredType,HEAP32,__emval_register)}
																															   var emval_newers={};
																															   function __emval_new(handle,argCount,argTypes,args){handle=requireHandle(handle);
																															   var newer=emval_newers[argCount];
																															   if(!newer){newer=craftEmvalAllocator(argCount);
																															   emval_newers[argCount]=newer}return newer(handle,argTypes,args)}
																															   function __emval_new_cstring(v){return __emval_register(getStringOrSymbol(v))}
																															   function __emval_run_destructors(handle){var destructors=emval_handle_array[handle].value;
																															   runDestructors(destructors);
																															   __emval_decref(handle)}
																															   function __emval_take_value(type,argv){type=requireRegisteredType(type,"_emval_take_value");
																															   var v=type["readValueFromPointer"](argv);
																															   return __emval_register(v)}
																															   function _abort(){Module["abort"]()}
																															   function _emscripten_get_now(){abort()}
																															   function _emscripten_get_now_is_monotonic(){
																																   return ENVIRONMENT_IS_NODE||typeof dateNow!=="undefined"||(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&self["performance"]&&self["performance"]["now"]}
																																   function _clock_gettime(clk_id,tp){var now;
																															   if(clk_id===0){now=Date.now()}
																															   else if(clk_id===1&&_emscripten_get_now_is_monotonic()){now=_emscripten_get_now()}
																															   else{___setErrNo(ERRNO_CODES.EINVAL);
																															   return-1}HEAP32[tp>>2]=now/1e3|0;
																															   HEAP32[tp+4>>2]=now%1e3*1e3*1e3|0;
																															   return 0}var _environ=STATICTOP;
																															   STATICTOP+=16;
																															   function ___buildEnvironment(env){
																																   var MAX_ENV_VALUES=64;
																															   var TOTAL_ENV_SIZE=1024;
																															   var poolPtr;
																															   var envPtr;
																															   if(!___buildEnvironment.called){___buildEnvironment.called=true;
																															   ENV["USER"]=ENV["LOGNAME"]="web_user";
																															   ENV["PATH"]="/";
																															   ENV["PWD"]="/";
																															   ENV["HOME"]="/home/web_user";
																															   ENV["LANG"]="C.UTF-8";
																															   ENV["_"]=Module["thisProgram"];
																															   poolPtr=allocate(TOTAL_ENV_SIZE,"i8",ALLOC_STATIC);
																															   envPtr=allocate(MAX_ENV_VALUES*4,"i8*",ALLOC_STATIC);
																															   HEAP32[envPtr>>2]=poolPtr;
																															   HEAP32[_environ>>2]=envPtr}else{envPtr=HEAP32[_environ>>2];
																															   poolPtr=HEAP32[envPtr>>2]}var strings=[];
																															   var totalSize=0;
																															   for(var key in env){if(typeof env[key]==="string"){var line=key+"="+env[key];
																															   strings.push(line);
																															   totalSize+=line.length}}if(totalSize>TOTAL_ENV_SIZE){throw new Error("Environment size exceeded TOTAL_ENV_SIZE!")}
																															   var ptrSize=4;
																															   for(var i=0;i<strings.length;i++){var line=strings[i];
																															   writeAsciiToMemory(line,poolPtr);
																															   HEAP32[envPtr+i*ptrSize>>2]=poolPtr;
																															   poolPtr+=line.length+1}HEAP32[envPtr+strings.length*ptrSize>>2]=0}var ENV={};
																															   function _getenv(name){if(name===0)return 0;
																															   name=Pointer_stringify(name);
																															   if(!ENV.hasOwnProperty(name))return 0;
																															   if(_getenv.ret)_free(_getenv.ret);
																															   _getenv.ret=allocate(intArrayFromString(ENV[name]),"i8",ALLOC_NORMAL);
																															   return _getenv.ret}
																															   function _llvm_exp2_f32(x){return Math.pow(2,x)}
																															   function _llvm_exp2_f64(){
																																   return _llvm_exp2_f32.apply(null,arguments)}
																																   function _llvm_trap(){abort("trap!")}
																																   function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);
																															   return dest}function _pthread_cond_destroy(){return 0}
																															   function _pthread_cond_wait(){return 0}
																															   function _pthread_create(){return 11}
																															   function _pthread_detach(){}
																															   var PTHREAD_SPECIFIC={};
																															   function _pthread_getspecific(key){return PTHREAD_SPECIFIC[key]||0}var PTHREAD_SPECIFIC_NEXT_KEY=1;
																															   function _pthread_key_create(key,destructor){if(key==0){
																																   return ERRNO_CODES.EINVAL}HEAP32[key>>2]=PTHREAD_SPECIFIC_NEXT_KEY;
																															   PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY]=0;
																															   PTHREAD_SPECIFIC_NEXT_KEY++;
																															   return 0}function _pthread_mutex_destroy(){}
																															   function _pthread_once(ptr,func){if(!_pthread_once.seen)_pthread_once.seen={};
																															   if(ptr in _pthread_once.seen)return;
																															   Module["dynCall_v"](func);
																															   _pthread_once.seen[ptr]=1}function _pthread_setspecific(key,value){if(!(key in PTHREAD_SPECIFIC)){
																																   return ERRNO_CODES.EINVAL}PTHREAD_SPECIFIC[key]=value;
																															   return 0}function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}
																															   function __arraySum(array,index){var sum=0;
																															   for(var i=0;i<=index;sum+=array[i++]);
																															   return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
																															   var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];
																															   function __addDays(date,days){var newDate=new Date(date.getTime());
																															   while(days>0){var leap=__isLeapYear(newDate.getFullYear());
																															   var currentMonth=newDate.getMonth();
																															   var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];
																															   if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;
																															   newDate.setDate(1);
																															   if(currentMonth<11){newDate.setMonth(currentMonth+1)}else{newDate.setMonth(0);
																															   newDate.setFullYear(newDate.getFullYear()+1)}}else{newDate.setDate(newDate.getDate()+days);
																															   return newDate}}return newDate}function _strftime(s,maxsize,format,tm){var tm_zone=HEAP32[tm+40>>2];
																															   var date={tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],
																															   tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?Pointer_stringify(tm_zone):""};
																															   var pattern=Pointer_stringify(format);
																															   var EXPANSION_RULES_1={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S"};
																															   for(var rule in EXPANSION_RULES_1){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_1[rule])}
																															   var WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
																															   var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
																															   function leadingSomething(value,digits,character){var str=typeof value==="number"?value.toString():value||"";
																															   while(str.length<digits){str=character[0]+str}return str}function leadingNulls(value,digits){return leadingSomething(value,digits,"0")}
																															   function compareByDay(date1,date2){
																																   function sgn(value){return value<0?-1:value>0?1:0}var compare;
																															   if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0){
																																   if((compare=sgn(date1.getMonth()-date2.getMonth()))===0){compare=sgn(date1.getDate()-date2.getDate())}}
																															   return compare}function getFirstWeekStartDate(janFourth){
																																   switch(janFourth.getDay()){
																																	   case 0:return new Date(janFourth.getFullYear()-1,11,29);
																															   case 1:return janFourth;
																															   case 2:return new Date(janFourth.getFullYear(),0,3);
																															   case 3:return new Date(janFourth.getFullYear(),0,2);
																															   case 4:return new Date(janFourth.getFullYear(),0,1);
																															   case 5:return new Date(janFourth.getFullYear()-1,11,31);
																															   case 6:return new Date(janFourth.getFullYear()-1,11,30)}}
																															   function getWeekBasedYear(date){var thisDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);
																															   var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);
																															   var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);
																															   var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);
																															   var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);
																															   if(compareByDay(firstWeekStartThisYear,thisDate)<=0){
																																   if(compareByDay(firstWeekStartNextYear,thisDate)<=0){
																																   return thisDate.getFullYear()+1}else{return thisDate.getFullYear()}}else{
																																	   return thisDate.getFullYear()-1}}var EXPANSION_RULES_2={"%a":(function(date){
																																	   return WEEKDAYS[date.tm_wday].substring(0,3)}),"%A":(function(date){
																																		   return WEEKDAYS[date.tm_wday]}),"%b":(function(date){
																																		   return MONTHS[date.tm_mon].substring(0,3)}),"%B":(function(date){
																																			   return MONTHS[date.tm_mon]}),"%C":(function(date){var year=date.tm_year+1900;
																															   return leadingNulls(year/100|0,2)}),"%d":(function(date){return leadingNulls(date.tm_mday,2)}),"%e":(
																															   function(date){return leadingSomething(date.tm_mday,2," ")}),"%g":(function(date){
																																   return getWeekBasedYear(date).toString().substring(2)}),"%G":(function(date){
																																   return getWeekBasedYear(date)}),"%H":(function(date){return leadingNulls(date.tm_hour,2)}),"%I":(function(date){
																																	   var twelveHour=date.tm_hour;
																															   if(twelveHour==0)twelveHour=12;
																															   else if(twelveHour>12)twelveHour-=12;
																															   return leadingNulls(twelveHour,2)}),"%j":(function(date){
																																   return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,date.tm_mon-1),3)}),"%m":(function(date){
																																	   return leadingNulls(date.tm_mon+1,2)}),"%M":(function(date){
																																		   return leadingNulls(date.tm_min,2)}),"%n":(function(){return"\n"}),"%p":(function(date){
																																		   if(date.tm_hour>=0&&date.tm_hour<12){return"AM"}
																																		   else{return"PM"}}),"%S":(function(date){return leadingNulls(date.tm_sec,2)}),"%t":(function(){return"\t"}),"%u":(function(date){
																																			   var day=new Date(date.tm_year+1900,date.tm_mon+1,date.tm_mday,0,0,0,0);
																															   return day.getDay()||7}),"%U":(function(date){var janFirst=new Date(date.tm_year+1900,0,1);
																															   var firstSunday=janFirst.getDay()===0?janFirst:__addDays(janFirst,7-janFirst.getDay());
																															   var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);
																															   if(compareByDay(firstSunday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,
																															   endDate.getMonth()-1)-31;
																															   var firstSundayUntilEndJanuary=31-firstSunday.getDate();
																															   var days=firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
																															   return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstSunday,janFirst)===0?"01":"00"}),"%V":(function(date){
																																   var janFourthThisYear=new Date(date.tm_year+1900,0,4);
																															   var janFourthNextYear=new Date(date.tm_year+1901,0,4);
																															   var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);
																															   var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);
																															   var endDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);
																															   if(compareByDay(endDate,firstWeekStartThisYear)<0){return"53"}
																															   if(compareByDay(firstWeekStartNextYear,endDate)<=0){return"01"}
																															   var daysDifference;
																															   if(firstWeekStartThisYear.getFullYear()<date.tm_year+1900){daysDifference=date.tm_yday+32-firstWeekStartThisYear.getDate()}
																															   else{daysDifference=date.tm_yday+1-firstWeekStartThisYear.getDate()}
																															   return leadingNulls(Math.ceil(daysDifference/7),2)}),"%w":(function(date){
																																   var day=new Date(date.tm_year+1900,date.tm_mon+1,date.tm_mday,0,0,0,0);
																															   return day.getDay()}),"%W":(function(date){var janFirst=new Date(date.tm_year,0,1);
																															   var firstMonday=janFirst.getDay()===1?janFirst:__addDays(janFirst,janFirst.getDay()===0?1:7-janFirst.getDay()+1);
																															   var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);
																															   if(compareByDay(firstMonday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,
																															   endDate.getMonth()-1)-31;
																															   var firstMondayUntilEndJanuary=31-firstMonday.getDate();
																															   var days=firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
																															   return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstMonday,janFirst)===0?"01":"00"}),"%y":(function(date){
																																   return(date.tm_year+1900).toString().substring(2)}),"%Y":(function(date){
																																	   return date.tm_year+1900}),"%z":(function(date){var off=date.tm_gmtoff;
																															   var ahead=off>=0;
																															   off=Math.abs(off)/60;
																															   off=off/60*100+off%60;
																															   return(ahead?"+":"-")+String("0000"+off).slice(-4)}),"%Z":(function(date){
																																   return date.tm_zone}),"%%":(function(){return"%"})};
																															   for(var rule in EXPANSION_RULES_2){if(pattern.indexOf(rule)>=0){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_2[rule](date))}}
																															   var bytes=intArrayFromString(pattern,false);
																															   if(bytes.length>maxsize){return 0}writeArrayToMemory(bytes,s);
																															   return bytes.length-1}
																															   function _strftime_l(s,maxsize,format,tm){return _strftime(s,maxsize,format,tm)}
																															   function _sysconf(name){
																																   switch(name){
																																	   case 30:return PAGE_SIZE;
																															   case 85:var maxHeapSize=2*1024*1024*1024-65536;
																															   maxHeapSize=HEAPU8.length;
																															   return maxHeapSize/PAGE_SIZE;
																															   case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:
																															   case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:c
																															   ase 95:case 52:case 51:case 46:return 200809;
																															   case 79:return 0;
																															   case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:
																															   case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;
																															   case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;
																															   case 74:case 60:case 69:case 70:case 4:return 1024;
																															   case 31:case 42:case 72:return 32;
																															   case 87:case 26:case 33:return 2147483647;
																															   case 34:case 1:return 47839;
																															   case 38:case 36:return 99;
																															   case 43:case 37:return 2048;
																															   case 0:return 2097152;
																															   case 3:return 65536;
																															   case 28:return 32768;
																															   case 44:return 32767;
																															   case 75:return 16384;
																															   case 39:return 1e3;
																															   case 89:return 700;
																															   case 71:return 256;
																															   case 40:return 255;
																															   case 2:return 100;
																															   case 180:return 64;
																															   case 25:return 20;
																															   case 5:return 16;
																															   case 6:return 6;
																															   case 73:return 4;
																															   case 84:{if(typeof navigator==="object")
																																   return navigator["hardwareConcurrency"]||1;
																															   return 1}}___setErrNo(ERRNO_CODES.EINVAL);
																															   return-1}function _time(ptr){var ret=Date.now()/1e3|0;
																															   if(ptr){HEAP32[ptr>>2]=ret}return ret}InternalError=Module["InternalError"]=extendError(Error,"InternalError");
																															   embind_init_charCodes();
																															   BindingError=Module["BindingError"]=extendError(Error,"BindingError");
																															   init_ClassHandle();
																															   init_RegisteredPointer();
																															   init_embind();
																															   UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");
																															   init_emval();
																															   if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function _emscripten_get_now_actual(){var t=process["hrtime"]();
																															   return t[0]*1e3+t[1]/1e6}}else if(typeof dateNow!=="undefined"){_emscripten_get_now=dateNow}
																															   else if(typeof self==="object"&&self["performance"]&&typeof self["performance"]["now"]==="function"){_emscripten_get_now=(function(){
																																   return self["performance"]["now"]()})}else if(typeof performance==="object"&&typeof performance["now"]==="function"){_emscripten_get_now=(function(){
																																	   return performance["now"]()})}else{_emscripten_get_now=Date.now}___buildEnvironment(ENV);
																															   DYNAMICTOP_PTR=Runtime.staticAlloc(4);
																															   STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);
																															   STACK_MAX=STACK_BASE+TOTAL_STACK;
																															   DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);
																															   HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;
																															   staticSealed=true;
																															   function intArrayFromString(stringy,dontAddNull,length){
																																   var len=length>0?length:lengthBytesUTF8(stringy)+1;
																															   var u8array=new Array(len);
																															   var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);
																															   if(dontAddNull)u8array.length=numBytesWritten;
																															   return u8array}Module["wasmTableSize"]=1092;
																															   Module["wasmMaxTableSize"]=1092;
																															   Module.asmGlobalArg={};
																															   Module.asmLibraryArg={"abort":abort,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"__ZSt18uncaught_exceptionv":__ZSt18uncaught_exceptionv,"___cxa_allocate_exception":___cxa_allocate_exception,"___cxa_decrement_exception_refcount":___cxa_decrement_exception_refcount,"___cxa_increment_exception_refcount":___cxa_increment_exception_refcount,"___cxa_pure_virtual":___cxa_pure_virtual,"___cxa_rethrow_primary_exception":___cxa_rethrow_primary_exception,"___cxa_throw":___cxa_throw,"___lock":___lock,"___map_file":___map_file,"___setErrNo":___setErrNo,"___syscall140":___syscall140,"___syscall146":___syscall146,"___syscall6":___syscall6,"___syscall91":___syscall91,"___unlock":___unlock,"__embind_finalize_value_object":__embind_finalize_value_object,"__embind_register_bool":__embind_register_bool,"__embind_register_class":__embind_register_class,"__embind_register_class_class_function":__embind_register_class_class_function,"__embind_register_class_constructor":__embind_register_class_constructor,"__embind_register_class_function":__embind_register_class_function,"__embind_register_emval":__embind_register_emval,"__embind_register_enum":__embind_register_enum,"__embind_register_enum_value":__embind_register_enum_value,"__embind_register_float":__embind_register_float,"__embind_register_function":__embind_register_function,"__embind_register_integer":__embind_register_integer,"__embind_register_memory_view":__embind_register_memory_view,"__embind_register_std_string":__embind_register_std_string,"__embind_register_std_wstring":__embind_register_std_wstring,"__embind_register_value_object":__embind_register_value_object,"__embind_register_value_object_field":__embind_register_value_object_field,"__embind_register_void":__embind_register_void,"__emval_as":__emval_as,"__emval_call_void_method":__emval_call_void_method,"__emval_decref":__emval_decref,"__emval_get_method_caller":__emval_get_method_caller,"__emval_get_module_property":__emval_get_module_property,"__emval_get_property":__emval_get_property,"__emval_incref":__emval_incref,"__emval_new":__emval_new,"__emval_new_cstring":__emval_new_cstring,"__emval_run_destructors":__emval_run_destructors,"__emval_take_value":__emval_take_value,"_abort":_abort,"_clock_gettime":_clock_gettime,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_getenv":_getenv,"_llvm_exp2_f64":_llvm_exp2_f64,"_llvm_trap":_llvm_trap,"_pthread_cond_destroy":_pthread_cond_destroy,"_pthread_cond_wait":_pthread_cond_wait,"_pthread_create":_pthread_create,"_pthread_detach":_pthread_detach,"_pthread_getspecific":_pthread_getspecific,"_pthread_key_create":_pthread_key_create,"_pthread_mutex_destroy":_pthread_mutex_destroy,"_pthread_once":_pthread_once,"_pthread_setspecific":_pthread_setspecific,"_strftime_l":_strftime_l,"_sysconf":_sysconf,"_time":_time,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX};
																															   var asm=Module["asm"](Module.asmGlobalArg,Module.asmLibraryArg,buffer);
																															   Module["asm"]=asm;
																															   var __GLOBAL__sub_I_Base64_cpp=Module["__GLOBAL__sub_I_Base64_cpp"]=(function(){
																																   return Module["asm"]["__GLOBAL__sub_I_Base64_cpp"].apply(null,arguments)});
																															   var __GLOBAL__sub_I_ExtractorCore_cpp=Module["__GLOBAL__sub_I_ExtractorCore_cpp"]=(function(){
																																   return Module["asm"]["__GLOBAL__sub_I_ExtractorCore_cpp"].apply(null,arguments)});
																															   var __GLOBAL__sub_I_FPhiExtractorBindings_cpp=Module["__GLOBAL__sub_I_FPhiExtractorBindings_cpp"]=(function(){
																																   return Module["asm"]["__GLOBAL__sub_I_FPhiExtractorBindings_cpp"].apply(null,arguments)});
																															   var __GLOBAL__sub_I_FaceDetector_cpp=Module["__GLOBAL__sub_I_FaceDetector_cpp"]=(function(){
																																   return Module["asm"]["__GLOBAL__sub_I_FaceDetector_cpp"].apply(null,arguments)});
																															   var __GLOBAL__sub_I_bind_cpp=Module["__GLOBAL__sub_I_bind_cpp"]=(function(){
																																   return Module["asm"]["__GLOBAL__sub_I_bind_cpp"].apply(null,arguments)});
																															   var ___cxa_can_catch=Module["___cxa_can_catch"]=(function(){return Module["asm"]["___cxa_can_catch"].apply(null,arguments)});
																															   var ___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=(function(){
																																   return Module["asm"]["___cxa_is_pointer_type"].apply(null,arguments)});
																															   var ___getTypeName=Module["___getTypeName"]=(function(){return Module["asm"]["___getTypeName"].apply(null,arguments)});
																															   var _emscripten_get_global_libc=Module["_emscripten_get_global_libc"]=(function(){
																																   return Module["asm"]["_emscripten_get_global_libc"].apply(null,arguments)});
																															   var _free=Module["_free"]=(function(){return Module["asm"]["_free"].apply(null,arguments)});
																															   var _malloc=Module["_malloc"]=(function(){return Module["asm"]["_malloc"].apply(null,arguments)});
																															   var establishStackSpace=Module["establishStackSpace"]=(function(){
																																   return Module["asm"]["establishStackSpace"].apply(null,arguments)});
																															   var getTempRet0=Module["getTempRet0"]=(function(){return Module["asm"]["getTempRet0"].apply(null,arguments)});
																															   var setTempRet0=Module["setTempRet0"]=(function(){return Module["asm"]["setTempRet0"].apply(null,arguments)});
																															   var setThrew=Module["setThrew"]=(function(){return Module["asm"]["setThrew"].apply(null,arguments)});
																															   var stackAlloc=Module["stackAlloc"]=(function(){return Module["asm"]["stackAlloc"].apply(null,arguments)});
																															   var stackRestore=Module["stackRestore"]=(function(){return Module["asm"]["stackRestore"].apply(null,arguments)});
																															   var stackSave=Module["stackSave"]=(function(){return Module["asm"]["stackSave"].apply(null,arguments)});
																															   var dynCall_fi=Module["dynCall_fi"]=(function(){return Module["asm"]["dynCall_fi"].apply(null,arguments)});
																															   var dynCall_fii=Module["dynCall_fii"]=(function(){return Module["asm"]["dynCall_fii"].apply(null,arguments)});
																															   var dynCall_i=Module["dynCall_i"]=(function(){return Module["asm"]["dynCall_i"].apply(null,arguments)});
																															   var dynCall_ii=Module["dynCall_ii"]=(function(){return Module["asm"]["dynCall_ii"].apply(null,arguments)});
																															   var dynCall_iii=Module["dynCall_iii"]=(function(){return Module["asm"]["dynCall_iii"].apply(null,arguments)});
																															   var dynCall_iiii=Module["dynCall_iiii"]=(function(){return Module["asm"]["dynCall_iiii"].apply(null,arguments)});
																															   var dynCall_iiiii=Module["dynCall_iiiii"]=(function(){return Module["asm"]["dynCall_iiiii"].apply(null,arguments)});
																															   var dynCall_iiiiid=Module["dynCall_iiiiid"]=(function(){return Module["asm"]["dynCall_iiiiid"].apply(null,arguments)});
																															   var dynCall_iiiiii=Module["dynCall_iiiiii"]=(function(){return Module["asm"]["dynCall_iiiiii"].apply(null,arguments)});
																															   var dynCall_iiiiiid=Module["dynCall_iiiiiid"]=(function(){return Module["asm"]["dynCall_iiiiiid"].apply(null,arguments)});
																															   var dynCall_iiiiiii=Module["dynCall_iiiiiii"]=(function(){return Module["asm"]["dynCall_iiiiiii"].apply(null,arguments)});
																															   var dynCall_iiiiiiii=Module["dynCall_iiiiiiii"]=(function(){return Module["asm"]["dynCall_iiiiiiii"].apply(null,arguments)});
																															   var dynCall_iiiiiiiii=Module["dynCall_iiiiiiiii"]=(function(){return Module["asm"]["dynCall_iiiiiiiii"].apply(null,arguments)});
																															   var dynCall_iiiiij=Module["dynCall_iiiiij"]=(function(){return Module["asm"]["dynCall_iiiiij"].apply(null,arguments)});
																															   var dynCall_v=Module["dynCall_v"]=(function(){return Module["asm"]["dynCall_v"].apply(null,arguments)});
																															   var dynCall_vi=Module["dynCall_vi"]=(function(){return Module["asm"]["dynCall_vi"].apply(null,arguments)});
																															   var dynCall_vif=Module["dynCall_vif"]=(function(){return Module["asm"]["dynCall_vif"].apply(null,arguments)});
																															   var dynCall_vii=Module["dynCall_vii"]=(function(){return Module["asm"]["dynCall_vii"].apply(null,arguments)});
																															   var dynCall_viif=Module["dynCall_viif"]=(function(){return Module["asm"]["dynCall_viif"].apply(null,arguments)});
																															   var dynCall_viii=Module["dynCall_viii"]=(function(){return Module["asm"]["dynCall_viii"].apply(null,arguments)});
																															   var dynCall_viiii=Module["dynCall_viiii"]=(function(){return Module["asm"]["dynCall_viiii"].apply(null,arguments)});
																															   var dynCall_viiiii=Module["dynCall_viiiii"]=(function(){return Module["asm"]["dynCall_viiiii"].apply(null,arguments)});
																															   var dynCall_viiiiii=Module["dynCall_viiiiii"]=(function(){return Module["asm"]["dynCall_viiiiii"].apply(null,arguments)});
																															   var dynCall_viijii=Module["dynCall_viijii"]=(function(){return Module["asm"]["dynCall_viijii"].apply(null,arguments)});
																															   Runtime.stackAlloc=Module["stackAlloc"];
																															   Runtime.stackSave=Module["stackSave"];
																															   Runtime.stackRestore=Module["stackRestore"];
																															   Runtime.establishStackSpace=Module["establishStackSpace"];
																															   Runtime.setTempRet0=Module["setTempRet0"];
																															   Runtime.getTempRet0=Module["getTempRet0"];
																															   Module["asm"]=asm;
																															   function ExitStatus(status){this.name="ExitStatus";
																															   this.message="Program terminated with exit("+status+")";
																															   this.status=status}ExitStatus.prototype=new Error;
																															   ExitStatus.prototype.constructor=ExitStatus;
																															   var initialStackTop;
																															   var preloadStartTime=null;
																															   dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();
																															   if(!Module["calledRun"])dependenciesFulfilled=runCaller};
																															   function run(args){args=args||Module["arguments"];
																															   if(preloadStartTime===null)preloadStartTime=Date.now();
																															   if(runDependencies>0){return}preRun();
																															   if(runDependencies>0)return;
																															   if(Module["calledRun"])return;
																															   function doRun(){if(Module["calledRun"])return;
																															   Module["calledRun"]=true;
																															   if(ABORT)return;
																															   ensureInitRuntime();
																															   preMain();
																															   if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();
																															   postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");
																															   setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);
																															   doRun()}),1)}else{doRun()}}Module["run"]=run;
																															   function exit(status,implicit){if(implicit&&Module["noExitRuntime"]&&status===0){return}
																															   if(Module["noExitRuntime"]){}else{ABORT=true;
																															   EXITSTATUS=status;
																															   STACKTOP=initialStackTop;
																															   exitRuntime();
																															   if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["exit"](status)}Module["quit"](status,new ExitStatus(status))}Module["exit"]=exit;
																															   var abortDecorators=[];
																															   function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){Module.print(what);
																															   Module.printErr(what);
																															   what=JSON.stringify(what)}else{what=""}ABORT=true;
																															   EXITSTATUS=1;
																															   var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
																															   var output="abort("+what+") at "+stackTrace()+extra;
																															   if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=abort;
																															   if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];
																															   while(Module["preInit"].length>0){Module["preInit"].pop()()}}Module["noExitRuntime"]=true;
																															   run()



