var facePhiOsTypes={other:0,windows:1,linux:2,mac:3},
	facePhiUcTypes={notSelectedError:-3,contentError:-2,genericError:-1,silverlight:0,wasm:1},
	facePhiNavigatorTypes={other:0,explorer:1,chrome:2,firefox:3,opera:4,safari:5,edge:6},
	facePhiResourceType={movie0:0,movie1:1,movie2:2,movie3:3,xml:4},
	folderPath=FacePhiGetFolderPath("FPhiUserControl.js"),
	Module={
		locateFile:function(){
			return folderPath+"FPhi.UC.Wasm/FPhiExtractor.wasm"}
		},
		userControlSelected=facePhiUcTypes.notSelectedError,
		minimumAllowedWidth=300,
		defaultWidth=500,
		navigatorUsed=-1,
		dataBase=null,
		percent=0;
function FacePhiLoadOperatingSystem(){
	var a=facePhiOsTypes.other;
	return-1!=navigator.appVersion.indexOf("Win")&&(a=facePhiOsTypes.windows),
	-1!=navigator.appVersion.indexOf("Linux")&&(a=facePhiNavigatorTypes.linux),
	-1!=navigator.appVersion.indexOf("Mac")&&(a=facePhiOsTypes.mac),
	a
	}
function FacePhiLoadNavigator(){
	var a=window.navigator.userAgent.toLowerCase(),
	b=window.navigator.appName.toLowerCase(),
	c=window.navigator.appVersion,
	d=window.navigator.userAgent,
	e={navigatorType:facePhiNavigatorTypes.other,navigatorVersion:0};
	return-1<a.indexOf("edge")?(e.navigatorType=facePhiNavigatorTypes.edge,e.navigatorVersion=FacePhiGetExplorerVersion(d),e):
		"netscape"==b&&-1<a.indexOf("trident")?(e.navigatorType=facePhiNavigatorTypes.explorer,e.navigatorVersion=FacePhiGetExplorerVersion(d),e):
		"microsoft internet explorer"==b&&-1<a.indexOf("msi")?(e.navigatorType=facePhiNavigatorTypes.explorer,e.navigatorVersion=FacePhiGetExplorerVersion(d),e):
		-1<a.indexOf(" opr/")?(e.navigatorType=facePhiNavigatorTypes.opera,e.navigatorVersion=parseInt(c.match(/OPR\/(\d+)\./)[1],10),e):
		-1<a.indexOf("firefox")?(e.navigatorType=facePhiNavigatorTypes.firefox,e.navigatorVersion=parseInt(d.match(/Firefox\/(\d+)\./)[1],10),e):
		-1<a.indexOf("safari")&&-1==a.indexOf("chrome")?(e.navigatorType=facePhiNavigatorTypes.safari,e.navigatorVersion=parseInt(c.match(/Version\/(\d+)\./)[1],10),e):
		-1<a.indexOf("chrome")?(e.navigatorType=facePhiNavigatorTypes.chrome,e.navigatorVersion=parseInt(c.match(/Chrome\/(\d+)\./)[1],10),e):e
	}
function FacePhiGetExplorerVersion(a){
	var b=a.indexOf("MSIE ");
	if(0<b)
		return parseInt(a.substring(b+5,a.indexOf(".",b)),10);
	var c=a.indexOf("Trident/");
	if(0<c){
		var d=a.indexOf("rv:");
		return parseInt(a.substring(d+3,a.indexOf(".",d)),10)
		  }
	var e=a.indexOf("Edge/");
	return 0<e?parseInt(a.substring(e+5,a.indexOf(".",e)),10):0
	}
function FacePhiGetCompatibleUcTypes(a,b){
	for(var c,d=[],e=!1,f=!1,g=!1,h=0,j=0;j<a.length-1;j++)
		c=j%4,0==c&&a[j].trim()==b.navigatorType&&(e=!0),
		1==c&&e&&parseInt(b.navigatorVersion)>=parseInt(a[j].trim())&&(f=!0),
		2==c&&e&&f&&("*"==a[j].trim()?g=!0:parseInt(b.navigatorVersion)<=parseInt(a[j].trim())&&(g=!0)),
		3==c&&(e&&f&&g&&(d[h]=parseInt(a[j].trim()),h++),e=!1,g=!1,f=!1);
		return 0==d.length&&(d[0]=facePhiUcTypes.wasm),d
	}
function FacePhiSelectUserControl(){
	var a=FacePhiLoadNavigator();
	if(dataBase){
		var b=FacePhiGetCompatibleUcTypes(dataBase,a);
		if(0<b.length)
			for(var c=0;c<b.length;c++){
				if(parseInt(b[c])==facePhiUcTypes.wasm){userControlSelected=facePhiUcTypes.wasm;break}
				if(parseInt(b[c])==facePhiUcTypes.silverlight){userControlSelected=facePhiUcTypes.silverlight;
				break}parseInt(b[c])==facePhiUcTypes.genericError&&(userControlSelected=facePhiUcTypes.genericError)
				}
		else 
			return void(userControlSelected=facePhiUcTypes.wasm)
	}
	else userControlSelected=facePhiUcTypes.silverlight
	}
	
var facePhiUserControlType={
	extractionMode:{Authenticate:0,Register:1},
	livenessMode:{None:0,Blink:1},
    userControlExceptionType:{CameraError:0,ExtractorError:1,ControlNotInitializedError:2,ImageCropResizeError:3,FontError:4,UnexpectedCaptureError:5},
    livenessErrorType:{Unsuccess:0,UnsuccessGlasses:1,UnsuccessLight:2,UnsuccessLowPerformance:3}
	},
facePhiUserControl={
	config:{
	divId:"facePhiDiv",
	extractionMode:facePhiUserControlType.extractionMode.Register,
	livenessMode:facePhiUserControlType.livenessMode.None,
	width:defaultWidth,cropImage:!0,
	cropFactor:1,
	sceneTimeout:0,
	resizeFactor:1,
	culture:"en",
	custom:{
		font:"",
		color:{leftButtonColor:"#A4A3A3",leftButtonTextColor:"#000",rightButtonColor:"#0ba3c7",rightButtonTextColor:"#000"},
	img:{
		tipImageUrl1:"FPhi.UC.Resources/Images/tips2.png",
		tipImageUrl2:"FPhi.UC.Resources/Images/tips1.png",
		timeOutUrl:"FPhi.UC.Resources/Images/timeout.png",
		tickUrl:"FPhi.UC.Resources/Images/ok.png",
		livenessErrorUrl:"FPhi.UC.Resources/Images/livenessError.png",
		livenessGlassesUrl:"FPhi.UC.Resources/Images/livenessGlasses.png",
		livenessLightsUrl:"FPhi.UC.Resources/Images/livenessLights.png",
		livenessPerformanceUrl:"FPhi.UC.Resources/Images/livenessPerformance.png",
		animationUrl:"FPhi.UC.Resources/Animation/animacion.wmv",
		arrowUrl:"FPhi.UC.Resources/Images/arrow.png",
		updateUrl:"FPhi.UC.Resources/Images/update.png",
		configUrl:"FPhi.UC.Resources/Images/config.png",
		poweredUrl:"FPhi.UC.Resources/Images/powered.png"
		},
	en:{
		start:"START",
		cancel:"CANCEL",
		next:"NEXT",
		improve:"IMPROVED",
		finish:"FINISH",
		tips:"TIPS",
		improveRegister:"REGISTER IMPROVE",
		registerQuality:"REGISTER QUALITY",
		register:"REGISTER",
		registerFinish:"FINISH",
		tip1:"The face must be always visible",
		tip2:"Avoid backlightings and dark scenarios",
		tip3:"Follow the model",
		tip4:"during registration",
		tip5:"Put your face into the shape and click Start",
		excellent:"Excellent",
		good:"Good",
		improvable:"Improvable",
		improveLink:"Improve",
		warningFaceOut:"Put your face into the shape",
		warningFaceTooFar:"Put your face into the shape",
		blink:"Blink",
		photoDetected:"Photo detected",
		faceNotDetected:"Face not detected",
		livenessError:"Please, remain still and blink next time",
		livenessErrorGlasses:"If you are wearing glasses,\navoid the reflections next time",
		livenessErrorDark:"Look for an illuminated place\nwith no backlighting next time",
		livenessErrorPerformance:"Your pc performance is lower\nthan expected",
		timeout:"Information: Maximum time allowed exceeded",
		retry:"RETRY",
		tutorialHeader:"LIVENESS DETECTOR",
		tutorial1:"Avoid the photograph fraud",
		tutorial2:"Want to know more about it?",
		tutorial3:"Step 1",
		tutorial4:"Adjust your face",
		tutorial5:"inside the circle",
		tutorial6:"Step 2",
		tutorial7:"Don\uFFFDt move the device",tutorial8:"or your face",
		tutorial9:"Step 3",
		tutorial10:"Blink when blinds",
		tutorial11:"get the eyes position",
		tutorialButton1:"No, thanks",
		tutorialButton2:"More info",
		tutorialButton3:"Next >",
		tutorialButton4:"Finish",
		tutorialBlink:"Blink"
		},
	es:{
		start:"COMENZAR",
		cancel:"CANCELAR",
		next:"SIGUIENTE",
		improve:"MEJORA",
		finish:"FINALIZAR",
		tips:"CONSEJOS de FacePhi",
		improveRegister:"MEJORA DEL REGISTRO",
		registerQuality:"CALIDAD DEL REGISTRO",
		register:"REGISTRO",
		registerFinish:"COMPLETADO",
		tip1:"Aseg\uFFFDrate de ver tu cara correctamente",
		tip2:"Evita contraluces y lugares oscuros",
		tip3:"Durante el Registro",
		tip4:"imita los movimientos del modelo",
		tip5:"Coloca tu cara dentro del c\uFFFDrculo y pulsa Comenzar",
		excellent:"Excelente",
		good:"Bueno",
		improvable:"Mejorable",
		improveLink:"Mejorar",
		warningFaceOut:"Col\uFFFDcate dentro del c\uFFFDrculo",
		warningFaceTooFar:"Col\uFFFDcate dentro del c\uFFFDrculo",
		blink:"Parpadea",
		photoDetected:"Fotograf\uFFFDa detectada",
		faceNotDetected:"Cara no detectada",
		livenessError:"Permanece quieto y parpadea\ncuando accedas la pr\uFFFDxima vez",
		livenessErrorGlasses:"Si llevas gafas, evita los reflejos\ncuando accedas la pr\uFFFDxima vez",
		livenessErrorDark:"Busca un lugar iluminado y sin contraluces\ncuando accedas la pr\uFFFDxima vez",
		livenessErrorPerformance:"El funcionamiento de su PC\nes m\uFFFDs lento de lo esperado",
		timeout:"Has excedido el tiempo permitido",
		retry:"REINTENTAR",
		tutorialHeader:"DETECTOR DE FOTOGRAF\uFFFDAS",
		tutorial1:"Evita el fraude mediante fotograf\uFFFDas",
		tutorial2:"\uFFFDQuieres saber como utilizarlo?",
		tutorial3:"Paso 1",
		tutorial4:"Centra tu rostro",
		tutorial5:"dentro del c\uFFFDrculo",
		tutorial6:"Paso 2",
		tutorial7:"No muevas el dispositivo",
		tutorial8:"ni tu cara",
		tutorial9:"Paso 3",
		tutorial10:"Parpadea cuando las ventanas",
		tutorial11:"esten a la altura de los ojos",
		tutorialButton1:"No, gracias",
		tutorialButton2:"Saber m\uFFFDs",
		tutorialButton3:"Siguiente >",
		tutorialButton4:"Finalizar",
		tutorialBlink:"Parpadea"
		},
	showLogo:!0},
	debug:!1},
events:{
	ExtractionFinished:function(){},
	ExtractionTimeout:function(){},
	LivenessError:function(){},
	LivenessErrorButtonClick:function(){},
	TimeoutErrorButtonClick:function(){},
	ExceptionCaptured:function(){},
	CancelledDetected:function(){},
	UserControlLoaded:function(){}
	},
	GetPluginEnabled:function(){
		if(userControlSelected==facePhiUcTypes.silverlight)
		return facePhiUserControlSilver.GetPluginEnabled();
		return userControlSelected==facePhiUcTypes.wasm?facePhiUserControlWasm.GetPluginEnabled():void 0
	},
	EnableUserControl:function(){
		var a=FacePhiGetFolderPath("FPhiUserControl.js"),b=document.getElementById(facePhiUserControl.config.divId);
		return b?(FacePhiCreateWaiting(b),!(facePhiUserControl.config.width>=minimumAllowedWidth))?void FacePhiDisplayErrorImage(minimumAllowedWidth,
		a+"FPhi.UC.Resources/Images/errorSizeEs.png",
		a+"FPhi.UC.Resources/Images/errorSizeEn.png",
		"FacePhiWebUserControl",b):userControlSelected==facePhiUcTypes.genericError?void FacePhiDisplayErrorImage(facePhiUserControl.config.width,
		a+"FPhi.UC.Resources/Images/errorFileEs.png",
		a+"FPhi.UC.Resources/Images/errorFileEn.png","FacePhiWebUserControl",
		b):userControlSelected==facePhiUcTypes.contentError?void FacePhiDisplayErrorImage(facePhiUserControl.config.width,
		a+"FPhi.UC.Resources/Images/errorFileEs.png",
		a+"FPhi.UC.Resources/Images/errorFileEn.png","FacePhiWebUserControl",b):void(userControlSelected==facePhiUcTypes.notSelectedError&&(userControlSelected=facePhiUcTypes.silverlight),
		LoadDynamicResourceWrapper(facePhiResourceType.xml,!0,b)):void console.log("FacePhi Web User Control not loaded. It has not been found the html object with the ID: "+facePhiUserControl.config.divId+" (facephiUserControl.config.divId) It is necessary to include a <div> tag with this ID in order to integrate the FacePhi Web User Control.")},
	DisableUserControl:function(){
		var a=document.getElementById(facePhiUserControl.config.divId);
		return a?void(userControlSelected==facePhiUcTypes.wasm&&privateFacePhiConfig.WasmControl&&(privateFacePhiConfig.WasmControl.Stop(),FacePhiDestroyUC(a)),
		userControlSelected==facePhiUcTypes.silverlight&&privateFacePhiConfig.silverlightControl&&(privateFacePhiConfig.silverlightControl.Stop(),FacePhiDestroyUC(a))):void console.log("FacePhi Web User Control not disabled")
	}
	};
	function SupportsCanvas(){
		return!!document.createElement("canvas").getContext
		}
	function SupportsText(){
		if(!SupportsCanvas())
		return!1;
		var a=document.createElement("canvas").getContext("2d");
		return"function"==typeof a.fillText
	}
	function SupportsVideo(){return!!document.createElement("video").canPlayType}
	function IsHtml5Available(){
		var a=FacePhiLoadNavigator();
		return!(a.navigatorType==facePhiNavigatorTypes.explorer&&9>=a.navigatorVersion)&&!!SupportsCanvas()&&!!SupportsText()&&!!SupportsVideo()
	}
	function FacePhiGetFolderPath(a){
		var b,c=document.getElementsByTagName("script"),d=0;
		for(b=0;b<c.length;b++)-1<c[b].src.indexOf(a)&&(d=b);
		return c[d].src.split("/").slice(0,-1).join("/")+"/"
	}
	function FacePhiLoadFile(a,b){
		var c;"wasm"==b&&(c=document.createElement("script"),c.setAttribute("type","text/javascript"),
		c.setAttribute("src",a),
		c.onload=WasmApiLoaded(),
		document.getElementsByTagName("head")[0].appendChild(c)),
		"svl"==b&&(c=document.createElement("script"),
		c.setAttribute("type","text/javascript"),c.setAttribute("src",a),
		c.onload=SilverlightApiLoaded(),
		document.getElementsByTagName("head")[0].appendChild(c)),
		"js"==b&&(c=document.createElement("script"),c.setAttribute("type","text/javascript"),
		c.setAttribute("src",a),document.getElementsByTagName("head")[0].appendChild(c))
		}
	function FacePhiDisplayErrorImage(a,b,c,d,e){
		var f="<img src='{1}' alt='{2}' width='{3}' height='{4} style='border-style: none'/>";
		f=f.replace("{1}","es"==facePhiUserControl.config.culture?b:c),
		f=f.replace("{2}",d),f=f.replace("{3}",a+"px"),f=f.replace("{4}",a+"px"),e.innerHTML=f
		}
	function FacePhiCreateWaiting(a){
		a.innerHTML="<img id='gifWaiting' alt='Loading' style='width:"+facePhiUserControl.config.width+"px;height:auto'>";
		var b=document.getElementById("gifWaiting");b&&(b.src=folderPath+"FPhi.UC.Resources/Images/waiting.gif")
	}
	function FacePhiDestroyUC(a){
		if(userControlSelected==facePhiUcTypes.silverlight){a.innerHTML=""}else{
		var b=document.getElementById("display");b.style.display="none"}
		}
	function FacePhiIterateWaiting(a,b,c){
		var d,e,f=Math.PI,g=document.getElementById("canvasWaiting");if(g){
		var h=g.getContext("2d");percent+=.01,d=-f/2+f*percent,e=-f/2+2*f*percent,h.fillStyle=FPhi.UserControl.Color.grayColor,
		h.fillRect(0,0,a,b),h.beginPath(),h.strokeStyle=FPhi.UserControl.Color.blueColor,h.lineWidth=3,h.arc(a/2,.536*b,.31*b/2,d,d+f/2),h.stroke(),h.beginPath(),
		h.strokeStyle=FPhi.UserControl.Color.blueColor,h.lineWidth=2,h.arc(a/2,.536*b,.31*b/3,e,e+f/2),h.stroke(),setTimeout(FacePhiIterateWaiting,10,a,b,c)}
		}
	function FacePhiCheckEnvironment(a){
		var b=new XMLHttpRequest;b.open("GET",a+"FPhi.UC.Resources/Browsers/FPhi.UC.browsers.csv",!0),
		b.onload=function(){4===b.readyState&&200===b.status&&(dataBase=b.responseText.split(",")),dataBase||console.log("FacePhi Web User Control: missing .csv data file."),
		FacePhiSelectUserControl()},
		b.onError=function(){console.log("FacePhi Web User Control not loaded. Missing .csv data file.")},b.send(null)
	}
	function WasmApiLoaded(){
		var a=new XMLHttpRequest;a.open("GET",folderPath+"FPhi.UC.Wasm/FPhiExtractor.wasm",!0),
		a.onload=function(){
		var b=!1;4===a.readyState&&200===a.status&&(b=!0,console.log("FacePhi Wasm components loaded.")),b||(console.log("FacePhi Wasm components not loaded."),
		userControlSelected=facePhiUcTypes.contentError)},
		a.onError=function(){
		return console.log("FacePhi Wasm error: wasm not loaded"),void(userControlSelected=facePhiUcTypes.contentError)},a.send(null)
		}
	function SilverlightApiLoaded(){
		var a=new XMLHttpRequest;a.open("GET",folderPath+"FPhi.UC.Svl/FPhiUC.xap",!0),
		a.onload=function(){
		var b=!1;4===a.readyState&&200===a.status&&(b=!0,console.log("FacePhi Silverlight components loaded.")),b||(console.log("FacePhi Silverlight components not loaded."),
		userControlSelected=facePhiUcTypes.contentError)
		},
		a.onError=function(){
			return console.log("FacePhi Silverlight error: xap not loaded."),
			void(userControlSelected=facePhiUcTypes.contentError)
		},
		a.send(null)
	}
	function LoadDynamicResource(a,b,c){
		if(a==facePhiResourceType.xml){
			var d=new XMLHttpRequest;
			return d.open("GET",folderPath+"FPhi.UC.Resources/Custom/FPhiTexts.xml",!0),
			d.onreadystatechange=function(){
				if(4==d.readyState&&200<=d.status&&300>d.status){
					var a,b=d.responseXML;
					"es"==facePhiUserControl.config.culture?(a=b.getElementsByTagName("TextEN"),
					facePhiUserControl.config.custom.es.start=a[0].getElementsByTagName("Start")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.cancel=a[0].getElementsByTagName("Cancel")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.next=a[0].getElementsByTagName("Next")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.improve=a[0].getElementsByTagName("Improve")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.finish=a[0].getElementsByTagName("Finish")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tips=a[0].getElementsByTagName("Tips")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.improveRegister=a[0].getElementsByTagName("ImproveRegister")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.registerQuality=a[0].getElementsByTagName("RegisterQuality")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.register=a[0].getElementsByTagName("Register")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.registerFinish=a[0].getElementsByTagName("RegisterFinish")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tip1=a[0].getElementsByTagName("Tip1")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tip2=a[0].getElementsByTagName("Tip2")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tip3=a[0].getElementsByTagName("Tip3")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tip4=a[0].getElementsByTagName("Tip4")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tip5=a[0].getElementsByTagName("Tip5")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.excellent=a[0].getElementsByTagName("Excellent")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.good=a[0].getElementsByTagName("Good")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.improvable=a[0].getElementsByTagName("Improvable")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.improveLink=a[0].getElementsByTagName("ImproveLink")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.warningFaceOut=a[0].getElementsByTagName("WarningFaceOut")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.warningFaceTooFar=a[0].getElementsByTagName("WarningFaceTooFar")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.blink=a[0].getElementsByTagName("Blink")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.photoDetected=a[0].getElementsByTagName("PhotoDetected")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.faceNotDetected=a[0].getElementsByTagName("FaceNotDetected")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.livenessError=a[0].getElementsByTagName("LivenessError")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.livenessErrorGlasses=a[0].getElementsByTagName("LivenessErrorGlasses")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.livenessErrorDark=a[0].getElementsByTagName("LivenessErrorDark")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.livenessErrorPerformance=a[0].getElementsByTagName("LivenessErrorPerformance")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.timeout=a[0].getElementsByTagName("Timeout")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorialHeader=a[0].getElementsByTagName("TutorialHeader")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial1=a[0].getElementsByTagName("Tutorial1")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial2=a[0].getElementsByTagName("Tutorial2")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial3=a[0].getElementsByTagName("Tutorial3")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial4=a[0].getElementsByTagName("Tutorial4")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial5=a[0].getElementsByTagName("Tutorial5")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial6=a[0].getElementsByTagName("Tutorial6")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial7=a[0].getElementsByTagName("Tutorial7")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial8=a[0].getElementsByTagName("Tutorial8")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial9=a[0].getElementsByTagName("Tutorial9")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial10=a[0].getElementsByTagName("Tutorial10")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorial11=a[0].getElementsByTagName("Tutorial11")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorialButton1=a[0].getElementsByTagName("TutorialButton1")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorialButton2=a[0].getElementsByTagName("TutorialButton2")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorialButton3=a[0].getElementsByTagName("TutorialButton3")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorialButton4=a[0].getElementsByTagName("TutorialButton4")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.es.tutorialBlink=a[0].getElementsByTagName("TutorialBlink")[0].childNodes[0].nodeValue):(a=b.getElementsByTagName("TextEN"),
					facePhiUserControl.config.custom.en.start=a[0].getElementsByTagName("Start")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.cancel=a[0].getElementsByTagName("Cancel")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.next=a[0].getElementsByTagName("Next")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.improve=a[0].getElementsByTagName("Improve")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.finish=a[0].getElementsByTagName("Finish")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tips=a[0].getElementsByTagName("Tips")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.improveRegister=a[0].getElementsByTagName("ImproveRegister")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.registerQuality=a[0].getElementsByTagName("RegisterQuality")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.register=a[0].getElementsByTagName("Register")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.registerFinish=a[0].getElementsByTagName("RegisterFinish")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tip1=a[0].getElementsByTagName("Tip1")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tip2=a[0].getElementsByTagName("Tip2")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tip3=a[0].getElementsByTagName("Tip3")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tip4=a[0].getElementsByTagName("Tip4")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tip5=a[0].getElementsByTagName("Tip5")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.excellent=a[0].getElementsByTagName("Excellent")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.good=a[0].getElementsByTagName("Good")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.improvable=a[0].getElementsByTagName("Improvable")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.improveLink=a[0].getElementsByTagName("ImproveLink")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.warningFaceOut=a[0].getElementsByTagName("WarningFaceOut")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.warningFaceTooFar=a[0].getElementsByTagName("WarningFaceTooFar")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.blink=a[0].getElementsByTagName("Blink")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.photoDetected=a[0].getElementsByTagName("PhotoDetected")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.faceNotDetected=a[0].getElementsByTagName("FaceNotDetected")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.livenessError=a[0].getElementsByTagName("LivenessError")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.livenessErrorGlasses=a[0].getElementsByTagName("LivenessErrorGlasses")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.livenessErrorDark=a[0].getElementsByTagName("LivenessErrorDark")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.livenessErrorPerformance=a[0].getElementsByTagName("LivenessErrorPerformance")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.timeout=a[0].getElementsByTagName("Timeout")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorialHeader=a[0].getElementsByTagName("TutorialHeader")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial1=a[0].getElementsByTagName("Tutorial1")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial2=a[0].getElementsByTagName("Tutorial2")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial3=a[0].getElementsByTagName("Tutorial3")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial4=a[0].getElementsByTagName("Tutorial4")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial5=a[0].getElementsByTagName("Tutorial5")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial6=a[0].getElementsByTagName("Tutorial6")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial7=a[0].getElementsByTagName("Tutorial7")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial8=a[0].getElementsByTagName("Tutorial8")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial9=a[0].getElementsByTagName("Tutorial9")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial10=a[0].getElementsByTagName("Tutorial10")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorial11=a[0].getElementsByTagName("Tutorial11")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorialButton1=a[0].getElementsByTagName("TutorialButton1")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorialButton2=a[0].getElementsByTagName("TutorialButton2")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorialButton3=a[0].getElementsByTagName("TutorialButton3")[0].childNodes[0].nodeValue,
					facePhiUserControl.config.custom.en.tutorialBlink=a[0].getElementsByTagName("TutorialBlink")[0].childNodes[0].nodeValue);
				var e=new XMLHttpRequest;
				e.open("GET",folderPath+"FPhi.UC.Resources/Custom/FPhiSkin.xml",!0),
				e.onreadystatechange=function(){
					if(4==e.readyState&&200<=e.status&&300>e.status){
						var a=e.responseXML,b=a.getElementsByTagName("MainButton");
						facePhiUserControl.config.custom.color.rightButtonColor=b[0].getElementsByTagName("BackgroundColor")[0].childNodes[0].nodeValue,
						facePhiUserControl.config.custom.color.rightButtonTextColor=b[0].getElementsByTagName("ForegroundColor")[0].childNodes[0].nodeValue;
						var d=a.getElementsByTagName("AlternativeButton");
						facePhiUserControl.config.custom.color.leftButtonColor=d[0].getElementsByTagName("BackgroundColor")[0].childNodes[0].nodeValue,
						facePhiUserControl.config.custom.color.leftButtonTextColor=d[0].getElementsByTagName("ForegroundColor")[0].childNodes[0].nodeValue;
						var f=a.getElementsByTagName("Font");
						facePhiUserControl.config.custom.font=f[0].getElementsByTagName("FontName")[0].childNodes[0].nodeValue;
						var g=a.getElementsByTagName("ShowLogo");
						facePhiUserControl.config.custom.showLogo=!(g[0]&&g[0].textContent)||g[0].textContent.trim(),
						userControlSelected==facePhiUcTypes.silverlight&&FacePhiShowSilver(c),
						userControlSelected==facePhiUcTypes.wasm&&FacePhiShowWasm(c)
					}
				},
				e.send()
		}},void d.send()
		}
		}
		function LoadDynamicResourceSync(a,b,c){
			if(a==facePhiResourceType.xml){
				var d=new XMLHttpRequest;d.open("GET",folderPath+"FPhi.UC.Resources/Custom/FPhiTexts.xml",!1),d.send();
				var e,f=d.responseXML;
				"es"==facePhiUserControl.config.culture?(e=f.getElementsByTagName("TextEN"),
				facePhiUserControl.config.custom.es.start=e[0].getElementsByTagName("Start")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.cancel=e[0].getElementsByTagName("Cancel")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.next=e[0].getElementsByTagName("Next")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.improve=e[0].getElementsByTagName("Improve")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.finish=e[0].getElementsByTagName("Finish")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tips=e[0].getElementsByTagName("Tips")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.improveRegister=e[0].getElementsByTagName("ImproveRegister")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.registerQuality=e[0].getElementsByTagName("RegisterQuality")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.register=e[0].getElementsByTagName("Register")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.registerFinish=e[0].getElementsByTagName("RegisterFinish")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tip1=e[0].getElementsByTagName("Tip1")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tip2=e[0].getElementsByTagName("Tip2")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tip3=e[0].getElementsByTagName("Tip3")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tip4=e[0].getElementsByTagName("Tip4")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tip5=e[0].getElementsByTagName("Tip5")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.excellent=e[0].getElementsByTagName("Excellent")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.good=e[0].getElementsByTagName("Good")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.improvable=e[0].getElementsByTagName("Improvable")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.improveLink=e[0].getElementsByTagName("ImproveLink")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.warningFaceOut=e[0].getElementsByTagName("WarningFaceOut")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.warningFaceTooFar=e[0].getElementsByTagName("WarningFaceTooFar")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.blink=e[0].getElementsByTagName("Blink")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.photoDetected=e[0].getElementsByTagName("PhotoDetected")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.faceNotDetected=e[0].getElementsByTagName("FaceNotDetected")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.livenessError=e[0].getElementsByTagName("LivenessError")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.livenessErrorGlasses=e[0].getElementsByTagName("LivenessErrorGlasses")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.livenessErrorDark=e[0].getElementsByTagName("LivenessErrorDark")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.livenessErrorPerformance=e[0].getElementsByTagName("LivenessErrorPerformance")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.timeout=e[0].getElementsByTagName("Timeout")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorialHeader=e[0].getElementsByTagName("TutorialHeader")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial1=e[0].getElementsByTagName("Tutorial1")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial2=e[0].getElementsByTagName("Tutorial2")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial3=e[0].getElementsByTagName("Tutorial3")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial4=e[0].getElementsByTagName("Tutorial4")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial5=e[0].getElementsByTagName("Tutorial5")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial6=e[0].getElementsByTagName("Tutorial6")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial7=e[0].getElementsByTagName("Tutorial7")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial8=e[0].getElementsByTagName("Tutorial8")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial9=e[0].getElementsByTagName("Tutorial9")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial10=e[0].getElementsByTagName("Tutorial10")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorial11=e[0].getElementsByTagName("Tutorial11")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorialButton1=e[0].getElementsByTagName("TutorialButton1")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorialButton2=e[0].getElementsByTagName("TutorialButton2")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorialButton3=e[0].getElementsByTagName("TutorialButton3")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorialButton4=e[0].getElementsByTagName("TutorialButton4")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.es.tutorialBlink=e[0].getElementsByTagName("TutorialBlink")[0].childNodes[0].nodeValue):(e=f.getElementsByTagName("TextEN"),
				facePhiUserControl.config.custom.en.start=e[0].getElementsByTagName("Start")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.cancel=e[0].getElementsByTagName("Cancel")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.next=e[0].getElementsByTagName("Next")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.improve=e[0].getElementsByTagName("Improve")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.finish=e[0].getElementsByTagName("Finish")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tips=e[0].getElementsByTagName("Tips")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.improveRegister=e[0].getElementsByTagName("ImproveRegister")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.registerQuality=e[0].getElementsByTagName("RegisterQuality")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.register=e[0].getElementsByTagName("Register")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.registerFinish=e[0].getElementsByTagName("RegisterFinish")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tip1=e[0].getElementsByTagName("Tip1")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tip2=e[0].getElementsByTagName("Tip2")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tip3=e[0].getElementsByTagName("Tip3")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tip4=e[0].getElementsByTagName("Tip4")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tip5=e[0].getElementsByTagName("Tip5")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.excellent=e[0].getElementsByTagName("Excellent")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.good=e[0].getElementsByTagName("Good")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.improvable=e[0].getElementsByTagName("Improvable")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.improveLink=e[0].getElementsByTagName("ImproveLink")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.warningFaceOut=e[0].getElementsByTagName("WarningFaceOut")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.warningFaceTooFar=e[0].getElementsByTagName("WarningFaceTooFar")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.blink=e[0].getElementsByTagName("Blink")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.photoDetected=e[0].getElementsByTagName("PhotoDetected")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.faceNotDetected=e[0].getElementsByTagName("FaceNotDetected")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.livenessError=e[0].getElementsByTagName("LivenessError")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.livenessErrorGlasses=e[0].getElementsByTagName("LivenessErrorGlasses")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.livenessErrorDark=e[0].getElementsByTagName("LivenessErrorDark")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.livenessErrorPerformance=e[0].getElementsByTagName("LivenessErrorPerformance")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.timeout=e[0].getElementsByTagName("Timeout")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorialHeader=e[0].getElementsByTagName("TutorialHeader")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial1=e[0].getElementsByTagName("Tutorial1")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial2=e[0].getElementsByTagName("Tutorial2")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial3=e[0].getElementsByTagName("Tutorial3")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial4=e[0].getElementsByTagName("Tutorial4")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial5=e[0].getElementsByTagName("Tutorial5")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial6=e[0].getElementsByTagName("Tutorial6")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial7=e[0].getElementsByTagName("Tutorial7")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial8=e[0].getElementsByTagName("Tutorial8")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial9=e[0].getElementsByTagName("Tutorial9")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial10=e[0].getElementsByTagName("Tutorial10")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorial11=e[0].getElementsByTagName("Tutorial11")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorialButton1=e[0].getElementsByTagName("TutorialButton1")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorialButton2=e[0].getElementsByTagName("TutorialButton2")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorialButton3=e[0].getElementsByTagName("TutorialButton3")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.en.tutorialBlink=e[0].getElementsByTagName("TutorialBlink")[0].childNodes[0].nodeValue);
				var g=new XMLHttpRequest;g.open("GET",folderPath+"FPhi.UC.Resources/Custom/FPhiSkin.xml",!1),g.send();
				var f=g.responseXML,h=f.getElementsByTagName("MainButton");
				facePhiUserControl.config.custom.color.rightButtonColor=h[0].getElementsByTagName("BackgroundColor")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.color.rightButtonTextColor=h[0].getElementsByTagName("ForegroundColor")[0].childNodes[0].nodeValue;
				var i=f.getElementsByTagName("AlternativeButton");
				facePhiUserControl.config.custom.color.leftButtonColor=i[0].getElementsByTagName("BackgroundColor")[0].childNodes[0].nodeValue,
				facePhiUserControl.config.custom.color.leftButtonTextColor=i[0].getElementsByTagName("ForegroundColor")[0].childNodes[0].nodeValue;
				var j=f.getElementsByTagName("Font");facePhiUserControl.config.custom.font=j[0].getElementsByTagName("FontName")[0].childNodes[0].nodeValue;
				var k=f.getElementsByTagName("ShowLogo");facePhiUserControl.config.custom.showLogo=!(k[0]&&k[0].textContent)||k[0].textContent.trim(),
				b&&(userControlSelected==facePhiUcTypes.silverlight&&FacePhiShowSilver(c),userControlSelected==facePhiUcTypes.wasm&&FacePhiShowWasm(c))}}
		function LoadDynamicResourceWrapper(a,b,c){
			var d=FacePhiLoadNavigator();
			d.navigatorType==facePhiNavigatorTypes.safari?LoadDynamicResourceSync(a,b,c):LoadDynamicResource(a,b,c)
			}
		function FacePhiPreloadContent(a){
			var b=FacePhiLoadNavigator();
			b.navigatorType==facePhiNavigatorTypes.explorer?FacePhiLoadFile(a+"FPhi.UC.Svl/FPhi.UC.Silverlight.js","svl"):
			(FacePhiLoadFile(a+"FPhi.UC.Wasm/FPhiExtractor.js","js"),FacePhiLoadFile(a+"FPhi.UC.Wasm/FPhi.UC.wasm.js","wasm"))
		}
	FacePhiCheckEnvironment(folderPath),FacePhiPreloadContent(folderPath);