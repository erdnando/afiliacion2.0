if (!FPhi) {
    var FPhi = {};
}

class ResourceManager {
    
    constructor(baseURL, language, self, eventStatus, dpiList, browserDpi, scaleFactor) {
        var text;
        var languageInfix = "";
        
        this.status = 0;
        this.logDebug = false;
        this.eventStatus = eventStatus;
        this.caller = self;
        this.baseURL = baseURL;
        
        if (language.length > 0) languageInfix = language + '.';
        
        this.widgetLoaded=0;
        this.languageCustomLoaded=0;
        this.languageDefaultLoaded=0;
        this.urlWidget = baseURL + "widget.xml";
        this.urlLanguageCustom = baseURL + "strings/strings."+languageInfix+"xml";
        this.urlLanguageDefault = baseURL + "strings/strings.xml";
        
        this.resourceDict = {};
        this.dpiList = dpiList;
        this.browserDpi = browserDpi;
        this.scaleFactor = scaleFactor;

        var exactDpi = browserDpi*160*scaleFactor;
        var dpiIndex=this.dpiList.length-1;
        for (var a=0; a<this.dpiList.length; a++) {
            if (this.dpiList[a] > exactDpi)
            {
                dpiIndex = a;
                break;
            }
        }
        this.dpi = this.dpiList[dpiIndex];
        this.imageScale = ((160.0)/this.dpi);
        //this.imageScale = this.imageScale/scaleFactor;
        //console.log("resourceManager.dpi ="+this.dpi);
        //console.log("resourceManager.imageScale ="+this.imageScale);

        /*for (var a=0; a<this.dpiList.length; a++) {
            console.log(this.dpiList[a]);
        }*/
        
        // Leemos la configuracion el widget
        this.xmlHttpWidget = new XMLHttpRequest();
        this.xmlHttpWidget.rm = this;
        this.xmlHttpWidget.onreadystatechange = this.readyEvent;
        this.xmlHttpWidget.open("GET", this.urlWidget);
        this.xmlHttpWidget.send(null);
        
        this.xmlHttpLanguageCustom = new XMLHttpRequest();
        this.xmlHttpLanguageCustom.rm = this;
        this.xmlHttpLanguageCustom.onreadystatechange = this.readyEvent;
        this.xmlHttpLanguageCustom.open("GET", this.urlLanguageCustom);
        this.xmlHttpLanguageCustom.send(null);
        
        this.xmlHttpLanguageDefault = new XMLHttpRequest();
        this.xmlHttpLanguageDefault.rm = this;
        this.xmlHttpLanguageDefault.onreadystatechange = this.readyEvent;
        this.xmlHttpLanguageDefault.open("GET", this.urlLanguageDefault);
        this.xmlHttpLanguageDefault.send(null);
    }

    readyEvent(event) {
        //console.log(event.target.readyState + " " + event.target.status);
        //console.log(event);

        if (event.target.readyState == 4 && event.target.status == 200) {

            var parser = new DOMParser();

            if (event.target.responseURL == event.target.rm.urlWidget) {
                event.target.rm.widgetLoaded = 1;
                event.target.rm.xmlDoc = parser.parseFromString(event.target.responseText,"text/xml");
                //console.log(event.target.rm.xmlDoc);

            } else if (event.target.responseURL == event.target.rm.urlLanguageCustom) {
                event.target.rm.languageCustomLoaded = 1;
            } else if (event.target.responseURL == event.target.rm.urlLanguageDefault) {
                event.target.rm.languageDefaultLoaded = 1;
            } else {
            }

        } else if (event.target.readyState == 4 && event.target.status != 200) {
            
            if (event.target.responseURL == event.target.rm.urlWidget) {
                event.target.rm.widgetLoaded = -1;
            } else if (event.target.responseURL == event.target.rm.urlLanguageCustom) {
                event.target.rm.languageCustomLoaded = -1;
            } else if (event.target.responseURL == event.target.rm.urlLanguageDefault) {
                event.target.rm.languageDefaultLoaded = -1;
            }
        }

        if ((event.target.rm.widgetLoaded!==0) && ((event.target.rm.languageCustomLoaded!==0) || (event.target.rm.languageDefaultLoaded!==0))) {
            
            if (event.target.rm.widgetLoaded == -1) {
                event.target.rm.status = -1;
            } else if (event.target.rm.languageCustomLoaded == 1){
                
                var text = event.target.rm.xmlHttpLanguageCustom.responseText;
                var parser = new DOMParser();
                event.target.rm.xmlLang = parser.parseFromString(text,"text/xml");

                event.target.rm.status = 1;

            } else if (event.target.rm.languageDefaultLoaded == 1) {

                var text = event.target.rm.xmlHttpLanguageDefault.responseText;
                var parser = new DOMParser();
                event.target.rm.xmlLang = parser.parseFromString(text,"text/xml");

                event.target.rm.status = 1;

            } else {
                event.target.rm.status = -1;
            }
            
            if (event.target.rm.status == 1) {
                
                // Escaneamos todas las fuentes para añadir el CSS correspondiente
                 var fontName;
                 var fontList = {};
                //console.log(event.target.rm.xmlDoc);
                 var fonts = event.target.rm.xmlDoc.querySelectorAll("[font]");
                //console.log(fonts);
                 for (var i=0; i<fonts.length; i++) {
                     fontName = fonts[i].getAttribute("font");
                     if (fontName.length > 0)
                         fontList[fontName] = fontName;
                 }
                
                event.target.rm.fontRequestVector = [];
                
                 // Generamos los estilos para las fuentes leidas
                 var font;
                 var newStyle = document.createElement('style');
                 for (font in fontList) {
                     //console.log(font);
                     var fontUrl = event.target.rm.getResourceUrlBase(fontList[font]);
                     //var fontUrl = event.target.rm.baseURL + "resources/163dpi/" + fontList[font];
                     var fontNameNoExt = fontList[font];//.slice(0,-4);
                     newStyle.appendChild(document.createTextNode("@font-face { font-family: '" + fontNameNoExt + "'; src: url('" + fontUrl + "'); }"));
                     
                     var xmlhttp = new XMLHttpRequest();
                     xmlhttp.open("GET", fontUrl, true);
                     xmlhttp.send();
                     event.target.rm.fontRequestVector.push(xmlhttp);
                 }
                document.head.appendChild(newStyle);

                event.target.rm.eventStatus(event.target.rm.caller,true);
            } else {
                event.target.rm.eventStatus(event.target.rm.caller,false);
            }
        }
    }
    
    static httpGet(theUrl,event) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = event;
        xmlHttp.open("GET", theUrl); // false for synchronous request
        xmlHttp.send(null);
        // Si se produce algun tipo de error limpiamos la respuesta para detectar desde fuera que no ha llegado contenido
        if (xmlHttp.status != 200) return "";
        return xmlHttp.responseText;
    }
    
    getElement(viewId, elementId) {
        
        if (viewId == "facephi-widget-conf") {
            var elements = this.xmlDoc.getElementsByTagName("facephi-widget-conf");
            return elements[0];
        } else {
            var view = this.xmlDoc.querySelector("[id=" + viewId + "]");
            if (this.logDebug) console.log(view);
            
            if (view == undefined) {
                console.log("ResourceManager::getElement Error. viewId="+viewId+" undefined. Please verify resource's bundle.");
                return;
            }
            
            var element = view.querySelector("[id=" + elementId + "]");
            if (this.logDebug) console.log(element);

            if (element == undefined) {
                console.log("ResourceManager::getElement Error. elementId="+elementId+" undefined. Please verify resource's bundle.");
                return;
            }
            return element;
        }
    }
    
    getSetupColor(viewId, elementId, attribute) {
        var element = this.getElement(viewId, elementId);
        
        var color = element.getAttribute(attribute);
        //Si el color tiene alpha lo convertimos a este formato para adaptarlo a web
        if (color.length == 9) { //#RRGGBBAA --> rgba(r,g,b,a)
            var r, g, b, a;
            r = parseInt(color.substring(1,3), 16);
            g = parseInt(color.substring(3,5), 16);
            b = parseInt(color.substring(5,7), 16);
            a = parseInt(color.substring(7,9), 16);
            a = a / 255.0;
            // Convertimos el color a este formato para adaptarlo a web
            color = 'rgba('+ r +', '+ g +', '+ b +', '+ a.toFixed(3) +')';
        }
        return color;
    }
    
    getSetupColorWithAlpha(viewId,elementId,attribute,alpha) {
        var element = this.getElement(viewId, elementId);
        
        var color = element.getAttribute(attribute);

        var r, g, b, a;
        r = parseInt(color.substring(1,3), 16);
        g = parseInt(color.substring(3,5), 16);
        b = parseInt(color.substring(5,7), 16);
        color = 'rgba('+ r +', '+ g +', '+ b +', '+ alpha.toFixed(3) +')';
        return color;
    }
    
    getSetupFloat(viewId, elementId, attribute) {
        var element = this.getElement(viewId, elementId);
        var floatString = element.getAttribute(attribute);

        return parseFloat(floatString);
    }
    
    getSetupAlign(viewId, elementId, attribute) {
        var element = this.getElement(viewId, elementId);
        
        return element.getAttribute(attribute);
    }
    
    getSetupResourceId(viewId, elementId, attribute) {
        var result;
        var element = this.getElement(viewId, elementId);
        //Puede ser una lista de archivos separados por 'coma'
        var str = element.getAttribute(attribute);
        var files = str.split(',');
        //Seleccionamos un elemento al azar si hay mas de 1
        if (files && files.length > 1) {
            result = files[Math.floor((Math.random() * files.length))];
            result = result.trim();
        }
        else
            result = str;
        
        return result;
    }
    
    getSetupTextId(viewId, elementId, attribute) {
        var element = this.getElement(viewId, elementId);
        
        return element.getAttribute(attribute);
    }
    
    getSetupNodeType(viewId, elementId) {
        var element = this.getElement(viewId, elementId);
        //@Hack: solo comprobamos los elementos que tienen el atributo 'content_type'
        return element.getAttribute("content_type");
    }

    // get resource url on desired dpi
    getResourceUrl(resourceId) {
        return this.baseURL + "resources/"+this.dpi+"dpi/"+resourceId;
    }
    
    // get resource url on base dpi. get resource on lower dpi based on dpiList
    getResourceUrlBase(resourceId) {
        return this.baseURL + "resources/"+this.dpiList[0]+"dpi/"+resourceId;
    }

    getImageScale() {
        return this.imageScale;
    }
    
    getImage(resourceId) {
        
        if (!(resourceId in this.resourceDict)) {
            var url = this.getResourceUrl(resourceId);
            var img = document.createElement("img");
            img.src = url;
            this.resourceDict[resourceId] = img;
            //console.log("resource "+resourceId+" not cached.");
        } else {
            //console.log("resource "+resourceId+" cached.");
        }
        return this.resourceDict[resourceId];
    }
    
    translate(str) {
        var result = str;
        
        var token = this.xmlLang.querySelector("[id=" + str + "]");
        if (this.logDebug) console.log(token);
        
        if (token != null) result = token.textContent;
        
        return result;
    }
}


// User control mode enum
FPhi["UserControlMode"] = {
    Authenticate: 0,
    Register: 1,
};

FPhi["LivenessMode"] = {
    None:0,
    Blink:1
};

// User control state enum
FPhi["UserControlState"] = {
    "Off":0,
    "Nothing":1,
    "WaitingFace":2,
    "WaitingFaceStart":3,
    "Extracting":4,
    "Liveness1":5,
    "Liveness2":6,
    "Liveness3":7,
    "InitialTip":8,
    "CycleTip":9,
    "ShowResults":10,
    "Improve":11,
    "ImproveWizard":12,
    "WizardComplete":13,
    "Finish":14,
    "CancelByUser": 15,
    "WaitingEyeDetection": 16,
    "Errors": 17,
    "CamFailed": 18,
    "WaitForWasmReady":19
};

// User control state enum inverse. Lookup purpose.
FPhi["UserControlStateInv"] = {
    0: "Off",
    1: "Nothing",
    2: "WaitingFace",
    3: "WaitingFaceStart",
    4: "Extracting",
    5: "Liveness1",
    6: "Liveness2",
    7: "Liveness3",
    8: "InitialTip",
    9: "CycleTip",
    10: "ShowResults",
    11: "Improve",
    12: "ImproveWizard",
    13: "WizardComplete",
    14: "Finish",
    15: "CancelByUser",
    16: "UCWaitingEyeDetection",
    17: "Errors",
    18: "CamFailed",
    19: "WaitForWasmReady"
};

// User control state enum
FPhi["ExceptionType"] = {
    "CameraError": 0,
    "ExtractorError": 1,
    "ControlNotInitializedError": 2,
    "ImageCropResizeError": 3,
    "UnexpectedCaptureError": 4
};

FPhi["ImageFormat"] = {
None: 0,
Gray_8bpp: 1,
RGB_24bpp: 2,
BGR_24bpp: 3,
ARGB_32bpp: 4,
YUV_NV21: 5,
ABGR_32bpp: 6,
BGRA_32bpp: 7,
RGBA_32bpp: 8
};

FPhi["SampleDiagnostic"] = {
    Ok : 0,
    FaceNotFound : 1,
    RightEyeNotFound : 2,
    LeftEyeNotFound : 3,
    EyesNotFound : 4,
    FaceTooFar : 5,
    FaceTooClose : 6,
    TooCloseToWindowSide : 7,
    AngleExceeded : 8,
    QualityCheckFailed : 9,
    NotRated : 10
};

FPhi["FinalDiagnostic"] = {
InsufficientValidSamples: 0,
TemplateCreationInProgress: 1,
TemplateCreated: 2
};

FPhi["LivenessDiagnostic"] = {
NotRated:0,
PhotoDetected:1,
LivenessDetected:2,
Unsuccess:3,
UnsuccessLowPerformance:4,
UnsuccessGlasses:5,
UnsuccessLight:6
};

FPhi["UserControl"] = function (container, width, height, onExtractionFinish, onUserCancel, onExceptionCaptured, onExtractionTimeout, onLivenessError, onLivenessErrorButtonClick, onTimeoutErrorButtonClick, language, rmPath, dpiList, canvasWidth, canvasHeight) {

    this.divContainer = document.getElementById(container);
    
    var path = this.getScriptPath("FPhi.UC.wasm.js");
    this.wasmReady=false;
    this.worker = new Worker(path+"FPhi.UC.worker.wasm.js");
    this.worker.onmessage = this.handleExtractorMessage.bind(this);
    this.worker.widget = this;
    this.queuedCommands=0;

    this.language = language;
    this.cameraWidth = width;
    this.cameraHeight = height;
    this.canvasWidth = 500;
    this.canvasHeight = 500;
    if (canvasWidth != undefined)
        this.canvasWidth = canvasWidth;
    if (canvasHeight != undefined)
        this.canvasHeight = canvasHeight;
    this.fontSizeFactor = this.canvasHeight / 500.0;
    
    this.canvasSizeFactor = this.canvasHeight / 500.0;
    this.buttonHeight *= this.canvasSizeFactor;
    this.fpsTime = performance.now();

    //this.canvasVideoPlayer = document.createElement("canvas");
    
    //this.videoPlayer.addEventListener("loadedmetadata",this.videoLoaded.bind(this),false);
    //this.videoPlayer.addEventListener("timeupdate",this.videoFrame.bind(this),false);
    
    //var rmPathLocal = path + "FPhi.Widget.Resources/";
    //if (rmPath != undefined)
    //    rmPathLocal = rmPath;
        
    //console.log("ResourceManager path = "+rmPathLocal);
    this.baseURL = rmPath;
    this.rm = new ResourceManager(rmPath,this.language,this,this.OnResourceManagerStatus,dpiList,window.devicePixelRatio,this.canvasSizeFactor);
    //this.rm.logDebug = true;

    //this.extractorContainer = document.createElement("embed");
    //this.extractorContainer.id = "image_proc";
    //this.extractorContainer.width = 0;
    //this.extractorContainer.height = 0;
    //this.extractorContainer.src= extractrorPath + "FPhi.Extractor.nmf";
    //this.extractorContainer.type = "application/x-pnacl";

    // standard extractor

    // liveness pre-configured extractor

    //this.divContainer.appendChild(this.extractorContainer);
    //this.extractor = new FPhi.Extractor(container, "image_proc");
    //this.divContainer.addEventListener("FPhi.Extractor.event", this.handleExtractorMessage.bind(this), true);
    //this.divContainer.addEventListener("load", this.extractorModuleDidLoad.bind(this), true);
    this.divContainer.addEventListener("FPhi.UserControl.Finish.event", onExtractionFinish, true);
    this.divContainer.addEventListener("FPhi.UserControl.UserCancel.event", onUserCancel, true);
    this.divContainer.addEventListener("FPhi.UserControl.ExtractionTimeout.event", onExtractionTimeout, true);
    this.divContainer.addEventListener("FPhi.UserControl.LivenessError.event", onLivenessError, true);
    this.divContainer.addEventListener("FPhi.UserControl.LivenessErrorButtonClick.event", onLivenessErrorButtonClick, true);
    this.divContainer.addEventListener("FPhi.UserControl.TimeoutErrorButtonClick.event", onTimeoutErrorButtonClick, true);
    //this.divContainer.addEventListener("FPhi.UserControl.ModuleLoaded.event", onModuleLoaded, true);
    this.divContainer.addEventListener("FPhi.UserControl.ExceptionCaptured.event", onExceptionCaptured, true);

    this.imageTimeout = document.createElement("img");
    this.imageTimeout.src = path + FPhi.UserControl.Images["timeOutUrl"];
    this.imageError = document.createElement("img");
    this.imageError.src = path + FPhi.UserControl.Images["livenessErrorUrl"];
    this.imageLiveness = document.createElement("img");
    this.imageLiveness.src = path + FPhi.UserControl.Images["livenessErrorUrl"];
    this.imageLivenessGlasses = document.createElement("img");
    this.imageLivenessGlasses.src = path + FPhi.UserControl.Images["livenessGlassesUrl"];
    this.imageLivenessLight = document.createElement("img");
    this.imageLivenessLight.src = path + FPhi.UserControl.Images["livenessLightsUrl"];
    this.imageLivenessPerformance = document.createElement("img");
    this.imageLivenessPerformance.src = path + FPhi.UserControl.Images["livenessPerformanceUrl"];
    this.imageCamera = document.createElement("img");
    this.imageCamera.src = path + FPhi.UserControl.Images["noCamerasUrl"];

    // onModuleLoaded nacl code

        this.cameraContainer = document.createElement("div");
        this.divContainer.appendChild(this.cameraContainer);

        //var moduleLoadEvent = new CustomEvent("FPhi.UserControl.ModuleLoaded.event");
        //this.divContainer.dispatchEvent(moduleLoadEvent);

        var canvas = document.getElementById("gifWaiting");
        if (canvas) {
            canvas.style.display = "none";
        }

        if (this.cropFactor <= 0.00) {
            var ExceptionEvent = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { "message": "Invalid value of CropFactor. Must be greather than 0.", "exceptionType": 3 } });
            this.divContainer.dispatchEvent(ExceptionEvent);
            this.cropFactor = 1.00;
        }
        
        if (this.resizeFactor <= 0.00) {
            var ExceptionEvent = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { "message": "Invalid value of ResizeFactor. Must be greather than 0.", "exceptionType": 3 } });
            this.divContainer.dispatchEvent(ExceptionEvent);
            this.resizeFactor = 1.00;
        }
        
        if (this.sceneTimeout <= 0.00) {
            this.sceneTimeout = 0.00;
            return;
        }

};

FPhi.UserControl["Language"] = {
    en: {
        faceNotDetected: "Face not detected",
        livenessError: "Please, remain still and blink next time",
        livenessErrorGlasses: "If you are wearing glasses,\navoid the reflections next time",
        livenessErrorDark: "Look for an illuminated place\nwith no backlighting next time",
        livenessErrorPerformance: "Your pc performance is lower\nthan expected",
        timeout: "Information: Maximum time allowed exceeded",
        
    },
    es: {
        faceNotDetected: "Cara no detectada",
        livenessError: "Permanece quieto y parpadea\ncuando accedas la próxima vez",
        livenessErrorGlasses: "Si llevas gafas, evita los reflejos\ncuando accedas la próxima vez",
        livenessErrorDark: "Busca un lugar iluminado y sin contraluces\ncuando accedas la próxima vez",
        livenessErrorPerformance: "El funcionamiento de su PC\nes más lento de lo esperado",
        timeout: "Has excedido el tiempo permitido",
    }
};

FPhi.UserControl["Color"] = {
    leftButtonColor: "rgba(16,163,199,1)",
    rightButtonColor: "rgba(164,164,164,1)",
    leftButtonTextColor: "rgba(255,255,255,1)",
    rightButtonTextColor: "rgba(255,255,255,1)",
    redColor: "rgba(255,0,0,1)",
    blueColor: "rgba(16,163,199,1)",
    greenColor: "rgba(63,183,109,1)",
    orangeColor: "rgba(240, 154, 71, 1)",
    blackColor: "rgba(0,0,0,1)",
    whiteColor: "rgba(255,255,255,1)",
    grayColor: "rgba(255,255,255,0.7)",
    grayColor2: "rgba(255,255,255,1)",
    grayColor3: "rgba(127,125,125,1)",
    grayColor4: "rgba(127,127,127,0.3)",
    blindColor: "rgba(16,163,199,0.5)"
};

FPhi.UserControl["Images"] = {
    timeOutUrl: "../FPhi.UC.Resources/Images/timeout.png",
    livenessErrorUrl: "../FPhi.UC.Resources/Images/livenessError.png",
    livenessGlassesUrl: "../FPhi.UC.Resources/Images/livenessGlasses.png",
    livenessLightsUrl: "../FPhi.UC.Resources/Images/livenessLights.png",
    livenessPerformanceUrl: "../FPhi.UC.Resources/Images/livenessPerformance.png",
    noCamerasUrl: "../FPhi.UC.Resources/Images/errorNoCams.png"
};
/*
FPhi.UserControl["Font"] = {
    fontName: "Raleway",
};

FPhi.UserControl["Logo"] = {
    showLogo: true,
};
*/

FPhi.UserControl.prototype = {
    constructor: FPhi.UserControl,
    extractionMode: FPhi.UserControlMode.Authenticate,
    livenessMode: FPhi.LivenessMode.None,
    status: FPhi.UserControlState.Off,
    language: "es",
    userTags:null,
    privateCanvas: null,
    extractor: null,
    extractorLiveness:null,
    extractorVersion: "",
    livenessTimer:null,
    lastDetectResult:null, // actual last result from detect call
    lastExtractionResult: null, // actual last result from extractor
    lastExtractionResultWizard: null, // last result from wizard. Stored prior to start improve stage.
    faceAvailable: true,
    faceDataRect:null,
    faceAvailableDelayed: true,
    faceTooFar: false,
    bestScore: 0,
    actualTime: 0,
    actualTimePrev: 0,
    clockWaitingFace:null, // absolute time waitingface state.
    clockWaitingStart: null, // absolute time waitingstart state.
    clockExtraction: null, // absolute time extraction state.
    clockExtractionPure:null, // absolute time with no correction on face detection.
    clockCycleTip: null, // absolute time cycletip state.
    clockWizardCompleted: null, // absolute time wizardCompleted state.
    clockShowResults: null, // absolute time clockShowResults state.
    clockImprove: null,
    clockLiveness1: null, // absolute time liveness1 state.
    clockLiveness2: null, // absolute time liveness2 state. 
    clockLiveness3: null, // absolute time liveness3 state.
    clockLiveness3_finish: null,
    clockFinish: null, // absolute time finish state.
    clockNewScenario: null,
    clockWarningIn: null,
    clockWarningOut: null,
    clockEyeDetection: null,
    clockEyeDetectionDetected:null,
    waitingTimeStart: 3, // time (in seconds) waiting in waitingstart state before jump to next state.
    extractionTime: 5, // default extraction time
    extractionTimePartial: 0.0, // partial extraction time. Version 4 of extraction process.
    extractionSmartMinScore: 0.5, // default minimum score for smart extraction.
    liveness1Time: 0.500,
    liveness3Time: 0.250,
    livenessActualRetrain: 0,
    livenessCalculating: false, // internal flag to iterate liveness states
    livenessErrorString: "",
    livenessErrorImage:null,
    showImproveButton: false,
    maxResults: 15,
    graphicalScoreMax: 0.0,
    privateLastImage: null,
    privateImages: [],
    privateLivenessImages: [],
    privateLivenessImageTemp:null,
    privateLivenessTimerDiagnostic:null,
    privateLivenessResults: [],
    privateEyesYLevel: 0.0,
    divContainer: null,
    extractorContainer: null,
    cameraContainer: null,
    cameraWidth: null,
    cameraHeight: null,
    canvasWidth: null,
    canvasHeight: null,
    cameraStream: null,
    selectedSource: null,
    samplePeriod: 1000/60.0, //0, // Maximum rate 25 fps
    buttonHeight: 50,
    debug: false,
    fps: 0.0,
    fpse: 0.0,
    fpsframes: 0,
    fpseFrames: 0,
    fpsTime: null,
    fontSizeFactor: 1.0,
    canvasSizeFactor: 1.0,
    imageTips1: null,
    imageTips2: null,
    imageFaceMoving: [],
    imageCheck: null,
    imageError: null,
    imageArrow: null,
    imageLiveness: null,
    imageLivenessGlasses: null,
    imageLivenessLight:null,
    imageLivenessPerformance:null,
    imageTimeout: null,
    imageCamera: null,
    cropImage: true,
    cropFactor: 1.00,
    resizeFactor: 1.00,
    warningInTime: 0.800,
    warningOutTime: 0.000,
    detectionTimeout: 10000,
    extractionTimeout: 20000,
    sceneTimeout: 0.00,
    sendingTimeout: 2.00,
    Start: function () {

         this.selectedSource = null;
         this.initCamera(this.cameraContainer, this.cameraWidth, this.cameraHeight);
         //this.getVideoSources(this);
         this.setVideoInput(this);
         this.setStatus(this, FPhi.UserControlState.Nothing);
        
    },
    Stop: function () {
        
        if (this.cameraStream != null) {
            this.cameraStream.getVideoTracks()[0].stop();
        }

        this.setStatus(this, FPhi.UserControlState.Off);
    },
    postMessage: function(self,message){
        
        self.queuedCommands++;
        self.worker.postMessage(message);
    },
    setLastExtractionResult: function(self, er) {
        if (self.lastExtractionResult != null)
            self.lastExtractionResult.delete();
        self.lastExtractionResult = er;
    },
    setStatus: function (self, newStatus) {
        
        this.status = newStatus;
        console.log("New status requested: " + FPhi.UserControlStateInv[newStatus]);
        switch (newStatus) {
        case FPhi.UserControlState.WizardComplete:
            self.clockWizardCompleted = performance.now();
            self.videoPlayer.loop = false;
            self.videoPlayer.src = self.rm.getResourceUrlBase(self.rm.getSetupResourceId("Success", "video_success", "value"));
            self.videoPlayer.play();
            break;
        case FPhi.UserControlState.InitialTip:
            
            self.videoPlayer.src = self.rm.getResourceUrlBase(self.rm.getSetupResourceId("RegistrationTips", "tip_video", "value"));
            self.videoPlayer.play();
            self.clockNewScenario = performance.now();
            break;
        case FPhi.UserControlState.Nothing:
            self.lastExtractionResult = null;
            self.bestScore = 0;
            self.faceAvailable = false;
            self.clockWaitingStart = null;
            self.clockExtraction = null;
            self.clockExtractionPure = null;
            self.clockLiveness = null;
            if (self.extractionMode == FPhi.UserControlMode.Register)
                self.extractionTime = 7;
            else
                self.extractionTime = 1;
            self.livenessCalculating = false;
            self.privateLastImage = null;
            self.privateImages = [];
            self.privateLivenessImages = [];
            self.privateLivenessResults = [];
            self.livenessActualRetrain = 0;
            self.livenessErrorString = null;
            break;
        case FPhi.UserControlState.WaitingFace:
            self.clockWaitingFace = performance.now();
            self.clockNewScenario = performance.now();
        case FPhi.UserControlState.WaitingFaceStart:
            self.clockNewScenario = performance.now();

            self.videoPlayer.pause();
            self.postMessage(self,{cmd:"livenessTimerSetValues",timeLapse:700,fps:10});
            self.postMessage(self,{cmd:"livenessTimerReset"});
            break;
        case FPhi.UserControlState.Extracting:
		console.log("extrayendo...");
            self.clockNewScenario = performance.now();
            self.clockExtraction = performance.now();
            self.clockExtractionPure = self.clockExtraction;
            self.extractionTimePartial = 0.0;

            if (self.extractionMode == FPhi.UserControlMode.Register) {
                self.videoPlayer.src = self.rm.getResourceUrlBase(self.rm.getSetupResourceId("Extractor", "extraction_video", "value"));
                self.videoPlayer.play();
            }
            //self.videoPlayer.src = self.baseURL+'resources/163dpi/' + self.rm.getSetupResourceId("Extractor", "extraction_video", "value");

            self.postMessage(self,{cmd:"initStreamExtraction",extractionMode:self.extractionMode,livenessMode:self.livenessMode,userTags:self.userTags});
            break;
        case FPhi.UserControlState.CycleTip:
            self.videoPlayer.src = self.rm.getResourceUrlBase(self.rm.getSetupResourceId("FaceMovementTips", "tip_video", "value"));
            self.videoPlayer.play();
            //self.videoPlayer.src = self.baseURL+'resources/163dpi/' + self.rm.getSetupResourceId("FaceMovementTips", "tip_video", "value");
            self.clockCycleTip = performance.now();
            self.clockNewScenario = performance.now();
            break;
        case FPhi.UserControlState.Finish:
            self.clockFinish = performance.now();

            var images = [];
            for (var a = 0; a < self.privateImages.length; a++) {
                images.push(self.getImgTag(self.privateImages[a], self.cropImage, self.cropFactor, self.resizeFactor));
            }

            var ExtractionFinishEvent = new CustomEvent("FPhi.UserControl.Finish.event", { detail: { "template": self.lastExtractionResult.template, "images": images } });
            this.divContainer.dispatchEvent(ExtractionFinishEvent);
            break;
        case FPhi.UserControlState.CancelByUser:
            self.Stop();
            var ExtractionFinishEvent = new CustomEvent("FPhi.UserControl.UserCancel.event");
            this.divContainer.dispatchEvent(ExtractionFinishEvent);
            return;
        case FPhi.UserControlState.ShowResults:
            self.videoPlayer.pause();

            self.clockNewScenario = performance.now();
            self.clockShowResults = performance.now();
            if (self.lastExtractionResultWizard != null) {
                self.setLastExtractionResult(self.lastExtractionResultWizard);
                self.lastExtractionResultWizard = null;
            }
            break;
        case FPhi.UserControlState.Liveness1:
            self.clockLiveness1 = performance.now();
            break;
        case FPhi.UserControlState.Liveness2:
            self.clockLiveness2 = performance.now();
            self.privateLivenessImages = [];
            //self.livenessTimer.reset();
            self.postMessage(self,{cmd:"livenessTimerReset"});

            break;
        case FPhi.UserControlState.Liveness3:
                
            self.clockLiveness3_finish = null;
            self.clockLiveness3 = performance.now();
/*
            var tempImages = [];
            for (var a = 0; a < self.privateLivenessImages.length; a++) {
                var tempImage = {
                    "Width": self.privateLivenessImages[a].width,
                    "Height": self.privateLivenessImages[a].height,
                    "Data": self.privateLivenessImages[a].pixels.data.buffer,
                    "ImageFormat": FPhi.ImageFormat.RGBA_32bpp
                };
                tempImages.push(tempImage);
            }*/
            self.postMessage(self,{cmd:"evaluateLiveness",images:self.privateLivenessImages, template:self.lastExtractionResult.Template });
                
            break;
        case FPhi.UserControlState.WaitingEyeDetection:
            self.clockNewScenario = performance.now();
            self.clockEyeDetection = performance.now();
            self.clockEyeDetectionDetected = null;
            break;
        case FPhi.UserControlState.Errors:
            if (self.livenessErrorImage == self.imageLiveness)
            {
                self.clockNewScenario = performance.now();
                var ExtractionFinishEvent = new CustomEvent("FPhi.UserControl.LivenessError.event", { detail: { "livenessErrorType": 0 } });
                self.divContainer.dispatchEvent(ExtractionFinishEvent);
            } else if (self.livenessErrorImage == self.imageLivenessGlasses) {
                self.clockNewScenario = performance.now();
                var ExtractionFinishEvent = new CustomEvent("FPhi.UserControl.LivenessError.event", { detail: { "livenessErrorType": 1 } });
                self.divContainer.dispatchEvent(ExtractionFinishEvent);
            } else if (self.livenessErrorImage == self.imageLivenessLight) {
                self.clockNewScenario = performance.now();
                var ExtractionFinishEvent = new CustomEvent("FPhi.UserControl.LivenessError.event", { detail: { "livenessErrorType": 2 } });
                self.divContainer.dispatchEvent(ExtractionFinishEvent);
            } else if (self.livenessErrorImage == self.imageLivenessPerformance) {
                self.clockNewScenario = performance.now();
                var ExtractionFinishEvent = new CustomEvent("FPhi.UserControl.LivenessError.event", { detail: { "livenessErrorType": 3 } });
                self.divContainer.dispatchEvent(ExtractionFinishEvent);
            } else {
                self.divContainer.dispatchEvent(new CustomEvent("FPhi.UserControl.ExtractionTimeout.event"));
            }
            break;
        }
    },
    getImageData: function(canvas) {
        var ctx = canvas.getContext("2d");
        var height = canvas.height;
        var width = canvas.width;
        var nBytes = height * width * 4;
        var pixels = ctx.getImageData(0, 0, width, height);
        var imData = { width: width, height: height, pixels: pixels, time: performance.now() };
        return imData;
    },
    getImgTag: function(imdata, cropImage, cropFactor, resizeFactor) {
        var restoredCanvas = document.createElement('canvas');
        restoredCanvas.width = imdata.width;
        restoredCanvas.height = imdata.height;
        restoredCanvas.getContext('2d').putImageData(imdata.pixels, 0, 0);

        var canvas = document.createElement('canvas');
        if (cropImage) { // crop. Use cropFactor

            //console.log(imdata);
            // calculate scaled face rectangle.
            var sourceWidth = imdata.extractionResult.face.width * cropFactor;
            var sourceHeight = imdata.extractionResult.face.height * cropFactor;
            var sourceX = imdata.extractionResult.face.x - ((cropFactor - 1.0) * imdata.extractionResult.face.width) / 2.0;
            var sourceY = imdata.extractionResult.face.y - ((cropFactor - 1.0) * imdata.extractionResult.face.height) / 2.0;

            // checking out of bounds face rectangle. Fixing rectangle.
            if (sourceX < 0) {
                sourceWidth += sourceX;
                sourceX = 0;
            }
            if (sourceY < 0) {
                sourceHeight += sourceY;
                sourceY = 0;
            }
            if (sourceX + sourceWidth >= imdata.width) {
                sourceWidth = imdata.width - sourceX;
            }
            if (sourceY + sourceHeight >= imdata.height) {
                sourceHeight = imdata.height - sourceY;
            }
            canvas.width = sourceWidth;
            canvas.height = sourceHeight;
            canvas.getContext('2d').drawImage(restoredCanvas, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
        } else { // resize. Use resizeFactor
            canvas.width = imdata.width * resizeFactor;
            canvas.height = imdata.height * resizeFactor;
            canvas.getContext('2d').drawImage(restoredCanvas, 0, 0, canvas.width, canvas.height);
        }
        var img = document.createElement('img');
        img.src = canvas.toDataURL("image/jpeg");
        return img;
    },
    handleExtractorMessage: function(message) {
        this.fpseframes++;
        var oldFaceAvailable = this.faceAvailable;
        this.queuedCommands--;
        
        //console.log(this);
        //console.log(message);
        if (message.data.cmd == "ready") {
            this.queuedCommands++;
            this.wasmReady = true;
            //console.log("wasm ready");
        }
        else if (message.data.cmd == "detect") {

            this.lastDetectResult = message.data;
            this.faceAvailable = false;
            var extractionResult = this.lastDetectResult;
            if (extractionResult.sampleDiagnostic == FPhi.SampleDiagnostic.Ok) {

                if (extractionResult.face) {
                    
                    var faceRect = this.fromCameraToScreenDetection(this, extractionResult.face);

                    if (this.faceInsideCircle(this,faceRect)) { 
                        this.faceAvailable = true;
                        this.faceDataRect = faceRect;
                    }
                }
                
                if (extractionResult.leftEye) {
                    var faceRect = this.fromCameraToScreenDetection(this, { x: extractionResult.leftEye.x, y: extractionResult.leftEye.y, width: 1, height: 1});
                    this.privateEyesYLevel = faceRect.y;
                }
                
            }
            this.faceTooFar = extractionResult.sampleDiagnostic == FPhi.SampleDiagnostic.FaceTooFar;

            if (this.status == FPhi.UserControlState.WaitingEyeDetection) {
                if (this.faceAvailable) {
                    if (this.clockEyeDetectionDetected == null)
                        this.clockEyeDetectionDetected = performance.now();
                }
            }
        } else if (message.data.cmd == "extractNextSmart") {

            this.lastExtractionResult = message.data;
            this.faceTooFar = message.data.sampleDiagnostic == FPhi.SampleDiagnostic.FaceTooFar;
            this.faceAvailable = false;
            if (message.data.sampleDiagnostic == FPhi.SampleDiagnostic.Ok) {
                var faceRect = this.fromCameraToScreenDetection(this, this.lastExtractionResult.face);
                if (this.faceInsideCircle(this,faceRect)) { 
                    this.faceAvailable = true;
                    this.faceDataRect = faceRect;
                }
            }

            if (this.lastExtractionResult.leftEye) {
                var faceRect = this.fromCameraToScreenDetection(this, { x: this.lastExtractionResult.leftEye.x, y: this.lastExtractionResult.leftEye.y, width: 1, height: 1 });
                this.privateEyesYLevel = faceRect.y;
            }
         
            if (this.status == FPhi.UserControlState.Extracting ||
                this.status == FPhi.UserControlState.Improve) {
                this.privateLastImage["extractionResult"] = this.lastExtractionResult;

                if (this.lastExtractionResult.sampleDiagnostic == FPhi.SampleDiagnostic.Ok && this.faceAvailable == true) {

                    var score = this.lastExtractionResult.facialScore;
                    if (this.privateImages.length < 15)
                        this.privateImages.push(this.privateLastImage);
                    else
                        this.privateImages = this.distAlgSustitution(this, this.privateImages, this.privateLastImage);
                }

            }
        } else if (message.data.cmd == "evaluateLiveness") {

            if (message.data.livenessDiagnostic == FPhi.LivenessDiagnostic.LivenessDetected) {
                this.setStatus(this, FPhi.UserControlState.Finish);
            } else {
                this.livenessActualRetrain += message.data.penalty;
                if (this.livenessActualRetrain >= 3) {
                    this.livenessErrorString = this.translate(this, "faceNotDetected");
                    switch (message.data.livenessDiagnostic) {
                        case FPhi.LivenessDiagnostic.Unsuccess:
                            this.livenessErrorString = this.translate(this, "livenessError");
                            this.livenessErrorImage = this.imageLiveness;
                        break;
                        case FPhi.LivenessDiagnostic.UnsuccessGlasses:
                            this.livenessErrorString = this.translate(this, "livenessErrorGlasses");
                            this.livenessErrorImage = this.imageLivenessGlasses;
                        break;
                        case FPhi.LivenessDiagnostic.UnsuccessLight:
                            this.livenessErrorString = this.translate(this, "livenessErrorDark");
                            this.livenessErrorImage = this.imageLivenessLight;
                        break;
                        case FPhi.LivenessDiagnostic.UnsuccessLowPerformance:
                            this.livenessErrorString = this.translate(this, "livenessErrorPerformance");
                            this.livenessErrorImage = this.imageLivenessPerformance;
                        break;
                    }
                    this.setStatus(this, FPhi.UserControlState.Errors);
                } else {
                    this.clockLiveness3_finish = this.actualTime;
                }
            }
             
        } else if (message.data.cmd == "livenessTimerReset") {
        } else if (message.data.cmd == "livenessTimerSetValues") {
        } else if (message.data.cmd == "livenessTimerAdd") {
            
            if (message.data.status == true) {
                this.privateLivenessImages.push(this.privateLivenessImageTemp);
            }
            if (message.data.isFull == true) {
                this.privateLivenessTimerDiagnostic = message.data.livenessTimerDiagnostic;
                this.setStatus(this, FPhi.UserControlState.Liveness3);
            }
        }

        if (this.faceTooFar)
            this.faceAvailable = false;

        if (oldFaceAvailable == true && this.faceAvailable == false) {
            this.clockWarningIn = this.actualTime;
            //this.faceAvailableDelayed = this.faceAvailable;
        } else if (oldFaceAvailable == false && this.faceAvailable == true) {
            this.clockWarningOut = this.actualTime;
            //this.faceAvailableDelayed = this.faceAvailable;
        } else {
            if (this.faceAvailable && (this.actualTime - this.clockWarningOut > this.warningOutTime * 1000.0))
                this.faceAvailableDelayed = this.faceAvailable;
            else if (!this.faceAvailable && (this.actualTime - this.clockWarningIn > this.warningInTime * 1000.0))
                this.faceAvailableDelayed = this.faceAvailable;
        }
    },
    canvasOnMove: function (e) {

        e.target.style.cursor = "default";

        if (this.status == FPhi.UserControlState.Off)
            return;

        var x = e.offsetX;
        var y = e.offsetY;
        var limit = this.canvasHeight - this.buttonHeight;
        if (y > limit) {
            if (this.status == FPhi.UserControlState.InitialTip ||
                this.status == FPhi.UserControlState.CycleTip ||
                this.status == FPhi.UserControlState.WaitingFaceStart ||
                this.status == FPhi.UserControlState.ShowResults)
            if (x < this.canvasWidth / 2) { // cancel button
                e.target.style.cursor = "pointer";
            } else { // ok button
                e.target.style.cursor = "pointer";
            }
        } else {
            var content = this.rm.getSetupResourceId("RegistrationTips","button_exit","value");
            var img = this.rm.getImage(content);
            var imgScaleFactor = (this.canvasSizeFactor)*this.rm.getImageScale();
            var offset=15;

            if (y < offset*2.0+img.height*imgScaleFactor && x > this.canvasWidth-offset*2.0-(img.height*imgScaleFactor)) {
                e.target.style.cursor = "pointer";
            } else if ((y < offset*2.0+img.height*imgScaleFactor) && (x < offset*2.0+(img.height*imgScaleFactor)) && (this.status == FPhi.UserControlState.WaitingFaceStart) && (this.extractionMode == FPhi.UserControlMode.Register)) {
                e.target.style.cursor = "pointer";
            }

            else if (y > this.canvasHeight * 0.701 && y <= this.canvasHeight * 0.805 &&
                x > this.canvasWidth / 2 - 75 && x <= this.canvasWidth / 2 + 75 && this.showImproveButton) // improve button
            {
                if (this.status == FPhi.UserControlState.ShowResults) {
                    e.target.style.cursor = "pointer";
                }
            }
        }
    },
    canvasOnClick: function (e) {
        console.log("clickingx..."+this.status );
        if (this.status == FPhi.UserControlState.Off){
			console.log("return");
            return;
        }
        var x = e.offsetX;
        var y = e.offsetY;
        var limit = this.canvasHeight - this.buttonHeight;
		//console.log("x:"+x+"-this.canvasWidth / 2:"+this.canvasWidth / 2);
		
		
		//new code
		y=284;
		limit=270;
        if (y > limit) {
            if (x < this.canvasWidth / 2) {
                // left button
console.log("switching....");
                switch (this.status) {
                case FPhi.UserControlState.Errors:
                        console.log("Errors");
                    var FinishClickEvent;
                    if (this.livenessErrorString == this.translate(this, "timeout")) {
                        
                        FinishClickEvent = new CustomEvent("FPhi.UserControl.TimeoutErrorButtonClick.event");
                        this.divContainer.dispatchEvent(FinishClickEvent);
                        this.Stop();

                    } else {
                        
                        FinishClickEvent = new CustomEvent("FPhi.UserControl.LivenessErrorButtonClick.event");
                        this.divContainer.dispatchEvent(FinishClickEvent);
                        this.Stop();
                    }
                  
                    break;
                case FPhi.UserControlState.InitialTip:
				console.log("InitialTip");
                    this.setStatus(this, FPhi.UserControlState.WaitingFaceStart);
                    break;
                case FPhi.UserControlState.CycleTip:
				console.log("CycleTip");
                    this.setStatus(this, FPhi.UserControlState.InitialTip);
                    break;
                case FPhi.UserControlState.WaitingFaceStart:
				console.log("WaitingFaceStart");
                    this.setStatus(this, FPhi.UserControlState.Extracting);
                    break;
                case FPhi.UserControlState.ShowResults:
				console.log("ShowResults");
                    var graphicalScore = this.getGraphicalScore(this.lastExtractionResult.templateScore); // IMPORTANTE: MERGEAR ESTE CAMBIO
                    if (graphicalScore < 1.0)
                        this.setStatus(this, FPhi.UserControlState.WaitingFaceStart);
                    else
                        this.setStatus(this, FPhi.UserControlState.WizardComplete);
                    break;
                }
            } else {
                // right button
                switch (this.status) {
                case FPhi.UserControlState.InitialTip:
				console.log("else InitialTip");
                    this.setStatus(this, FPhi.UserControlState.CycleTip);
                    break;
                case FPhi.UserControlState.CycleTip:
				console.log("else CycleTip");
                    this.setStatus(this, FPhi.UserControlState.WaitingFaceStart);
                    break;
                case FPhi.UserControlState.WaitingFace:
                case FPhi.UserControlState.WaitingFaceStart:
				console.log("else WaitingFaceStart");
                    this.setStatus(this, FPhi.UserControlState.Extracting);
                    break;
                case FPhi.UserControlState.ShowResults:
				console.log("else ShowResults");
                    this.setStatus(this, FPhi.UserControlState.WizardComplete);
                    break;
                case FPhi.UserControlState.Errors:
				console.log("else Errors");
                    var FinishClickEvent;
                    if (this.livenessErrorString == this.translate(this, "timeout")) {

                        FinishClickEvent = new CustomEvent("FPhi.UserControl.TimeoutErrorButtonClick.event");
                        this.divContainer.dispatchEvent(FinishClickEvent);
                        this.Stop();

                    } else {
console.log("else else stop");
                        FinishClickEvent = new CustomEvent("FPhi.UserControl.LivenessErrorButtonClick.event");
                        this.divContainer.dispatchEvent(FinishClickEvent);
                        this.Stop();
                    }
                    break;
                }
            }
        } else {
			console.log("algooo");
            var content = this.rm.getSetupResourceId("RegistrationTips","button_exit","value");
            var img = this.rm.getImage(content);
            var imgScaleFactor = (this.canvasSizeFactor)*this.rm.getImageScale();
            var offset=15;
            
            if (y < offset*2.0+img.height*imgScaleFactor && x > this.canvasWidth-offset*2.0-(img.height*imgScaleFactor)) {
                this.setStatus(this, FPhi.UserControlState.CancelByUser);
            }
            else if (y < offset*2.0+img.height*imgScaleFactor && x < offset*2.0+(img.height*imgScaleFactor) && (this.status == FPhi.UserControlState.WaitingFaceStart) && this.extractionMode == FPhi.UserControlMode.Register) {
                this.setStatus(this, FPhi.UserControlState.InitialTip);
                
            } else if (y > this.canvasHeight * 0.701 && y <= this.canvasHeight * 0.805 &&
                x > this.canvasWidth / 2 - 75 && x <= this.canvasWidth / 2 + 75 &&
                this.showImproveButton) // improve button
            {
                if (this.status == FPhi.UserControlState.ShowResults) {
                    this.setStatus(this, FPhi.UserControlState.ImproveWizard);
                }
            }
        }
    },
    initCamera: function (divContainer, width, height) {


        if (!divContainer.innerHTML.indexOf('video') > -1) {
            var htmlString = "<video id='live' width='auto' height='auto' hidden muted playsinline autoplay></video><video id='fphiVideoPlayer' hidden playsinline loop muted autoplay></video><canvas id='display' width='" + this.canvasWidth + "' height='" + this.canvasHeight + "'></canvas>";
            //var htmlString = "<video id='live' width='" + width + "' height='" + height + "' hidden autoplay></video>" +"<canvas id='display' width='" + this.canvasWidth + "' height='" + this.canvasHeight + "'></canvas>";
            divContainer.innerHTML = htmlString;
            
            this.videoPlayer = document.getElementById("fphiVideoPlayer");
            //this.videoPlayer.autoplay = true;
            //this.videoPlayer.muted = true;
            //this.videoPlayer.hidden = true;
            //this.videoPlayer.loop = true;
            //this.videoPlayer.playsinline = true;

        } 

        var canvas = document.getElementById("display");
        var canvasWidth = canvas.clientWidth;
        var canvasHeight = canvas.clientHeight;
        this.circleX = canvasWidth/2.0;
        this.circleY = canvasHeight* 0.380;
        //this.circleY = canvasHeight* 0.536; // y position in widget 5.5.0
        this.circleRadius = canvasHeight * 0.310;

        if (canvas) {

            canvas.style.display = 'inline-block';
            canvas.addEventListener("click", this.canvasOnClick.bind(this), false);
            canvas.addEventListener("mousemove", this.canvasOnMove.bind(this), false);

            this.privateCanvas = document.createElement('canvas');
            this.privateCanvas.height = height;
            this.privateCanvas.width = width;
        }
    },
    userMedia: function() {

        //console.log(navigator);

        //if (navigator.getUserMedia) console.log("navigator.getUseMedia");
        //else if (navigator.webkitGetUserMedia) console.log("navigator.webkitGetUserMedia");
        //else if (navigator.mozGetUserMedia) console.log("navigator.mozGetUserMedia");
        //else if (navigator.msGetUserMedia) console.log("navigator.msGetUserMedia");
        //else console.log("no navigator.getUserMedia available.");

        return navigator.getUserMedia = navigator.getUserMedia ||
        //navigator.mediaDevices.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia || null;
    },
    setVideoInput: function(self) {
        var video = document.getElementById("live");
        var canvas = document.getElementById("display");
        
        if (canvas) {
            var context = canvas.getContext("2d", {alpha: false});
            //context.font = "26px " + FPhi.UserControl.Font.fontName;

            if (self.userMedia()) {

                //console.log(self);
                var constraints = {
                    //video: true,
                    video:{ width: self.cameraWidth, height: self.cameraHeight },
                    audio:false
                };
                var media = navigator.mediaDevices.getUserMedia(constraints).then(
                function(stream){
                    self.cameraStream = stream;
                    video.srcObject = stream;
                    video.addEventListener("loadedmetadata",self.videoLoaded.bind(self),false);
                    //video.src = window.URL.createObjectURL(stream);
					video.play();
                    self.draw(self, video, context);
                }).catch(
                function(error) {
                    console.log("camera error");
                    self.setStatus(this, FPhi.UserControlState.CamFailed);
                    self.draw(self, self.imageCamera, context);

                    var ExtractionFinishEvent = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { "message": "Camera not found.", "exceptionType": 0 } });
                    self.divContainer.dispatchEvent(ExtractionFinishEvent);
                });
            }

        }
    },
    fromCameraToScreen: function (self, rect) {

        var imageRect = self.scaleRect({ width: self.cameraWidth, height: self.cameraHeight }, { x: 0, y: 0, width: self.canvasWidth, height: self.canvasHeight });
        
        var ratioX = imageRect.width / self.cameraWidth;
        var ratioY = imageRect.height / self.cameraHeight;
        
        var tempRect = { x: rect.x * ratioX, y: rect.y * ratioY, width: rect.width * ratioX, height: rect.height * ratioY };
        //var tempRect = self.scaleRectByFactor(rect, ratioX, ratioY);
        var x = self.reflectedX(imageRect.width, tempRect.x + tempRect.width);
        tempRect.x = x;
        //tempRect.x -= (imageRect.width - self.cameraWidth);
        tempRect.x += imageRect.x
        tempRect.y += imageRect.y
        return tempRect;
    },
    fromCameraToScreenDetection: function (self, rect) {

        var imageRect = self.scaleRect({ width: self.cameraWidth, height: self.cameraHeight }, { x: 0, y: 0, width: self.canvasWidth, height: self.canvasHeight });
        var ratioX = imageRect.width / self.cameraWidth;
        var ratioY = imageRect.height / self.cameraHeight;
        var tempRect = { x: rect.x * ratioX, y: rect.y * ratioY, width: rect.width * ratioX, height: rect.height * ratioY };
        var x = self.reflectedX(imageRect.width, tempRect.x + tempRect.width);
        tempRect.x = x;
        tempRect.x += imageRect.x
        tempRect.y += imageRect.y
        return tempRect;
    },
    faceInsideCircle: function(self, faceRect) {
        var radius = self.circleRadius;
        var xCenter = self.circleX;
        var yCenter = self.circleY;

        var circleLeft = xCenter - radius;
        var circleRight = xCenter + radius;
        var circleTop = yCenter - radius;
        var circleBottom = yCenter + radius;

        //var tempFace = {x:faceRect.x, y:faceRect.y, width:faceRect.width, height:faceRect.height*0.75};
        var tempFace = {x:faceRect.x, y:faceRect.y, width:faceRect.width, height:faceRect.height};
        var intersection = Math.max(0, Math.min(tempFace.x+tempFace.width,circleRight) - Math.max(tempFace.x,circleLeft)) *
            Math.max(0, Math.min(tempFace.y + tempFace.height, circleBottom) - Math.max(tempFace.y, circleTop));

        var areaFace = tempFace.width * tempFace.height;
        var ratio = intersection / areaFace;

        if (ratio > 0.75)
            return true;
        else
            return false;
    },
    scaleRect: function(rectOrigin, rectDest, innerMode) {
        var centerX = rectDest.x + rectDest.width / 2;
        var centerY = rectDest.y + rectDest.height / 2;
        var factorX = rectDest.width / rectOrigin.width;
        var factorY = rectDest.height / rectOrigin.height;
        var newWidth = rectOrigin.width * factorX;
        var newHeight = rectOrigin.height * factorX;
        if (innerMode == undefined) {
            if (newHeight < rectDest.height) { // este escalado no vale. Tenemos que usar escalado en el eje Y
                newWidth = rectOrigin.width * factorY;
                newHeight = rectOrigin.height * factorY;
            }
        } else {
            if (newHeight >= rectDest.height) { // este escalado no vale. Tenemos que usar escalado en el eje X
                newWidth = rectOrigin.width * factorY;
                newHeight = rectOrigin.height * factorY;
            }
        }

        return { x: centerX - newWidth / 2, y: centerY - newHeight / 2, width: newWidth, height: newHeight };
    },
    scaleRectByFactor(rectOrigin, factorX, factorY) {
        var originalCenterX = rectOrigin.x + rectOrigin.width*0.5;
        var originalCenterY = rectOrigin.y + rectOrigin.height*0.5;
        var temp = {x: 0, y:0, width:0, height:0};
        
        // Escalamos en rect
        temp.width = rectOrigin.width *= factorX;
        temp.height = rectOrigin.height *= factorY;
        temp.x = rectOrigin.x;
        temp.y = rectOrigin.y;

        var newCenterX = rectOrigin.x + rectOrigin.width*0.5;
        var newCenterY = rectOrigin.y + rectOrigin.height*0.5;
        
        var offsetX = newCenterX - originalCenterX;
        var offsetY = newCenterY - originalCenterY;
                
        temp.x -= offsetX;
        temp.y -= offsetY;
        
        return temp;
    },
    getGraphicalScore: function(score) {
        // IMPORTANTE: MERGEAR ESTE CAMBIO
        if (typeof score === "undefined")
            score = 0.0;
        var toReturn = (score * 100.0 / 90.0) * (score * 100.0 / 90.0) * 0.9 + 0.1;
        if (toReturn > 1.0)
            toReturn = 1.0;
        return toReturn;
    },
    drawButtonClose: function (self,canvasContext, viewId) {
        var canvasWidth = canvasContext.canvas.clientWidth;
        var content = self.rm.getSetupResourceId(viewId,"button_exit","value");
        var img = self.rm.getImage(content);
        var imgScaleFactor = (self.canvasSizeFactor)*self.rm.getImageScale();
        var offset=15;
        canvasContext.drawImage(img,
                                canvasWidth-(img.width*imgScaleFactor)-offset,
                                offset,
                                img.width*imgScaleFactor,
                                img.height*imgScaleFactor);

        
    },
    drawButtonInfo: function (self,canvasContext, viewId) {
        var canvasWidth = canvasContext.canvas.clientWidth;
        var content = self.rm.getSetupResourceId(viewId,"button_info","value");
        var img = self.rm.getImage(content);
        var imgScaleFactor = (self.canvasSizeFactor)*self.rm.getImageScale();
        var offset=15;
        canvasContext.drawImage(img,
                                offset,
                                offset,
                                img.width*imgScaleFactor,
                                img.height*imgScaleFactor);

        
    },
    drawButton: function (self, canvasContext, rectButton, viewId, elementId) {
        
        //console.log(rectButton);
        canvasContext.fillStyle = self.rm.getSetupColor(viewId, elementId, "decorator");
        canvasContext.fillRect(rectButton.x, rectButton.y+4, rectButton.width, rectButton.height-4);
        canvasContext.fillStyle = self.rm.getSetupColor(viewId, elementId, "background");
        canvasContext.fillRect(rectButton.x, rectButton.y, rectButton.width, rectButton.height-4);

        var align = self.rm.getSetupAlign(viewId,elementId,"align");
        var type = self.rm.getSetupNodeType(viewId,elementId);
        var buttonPadding = 10 * self.canvasSizeFactor;
        if (type == "TEXT_ID") {
            var content = self.rm.getSetupTextId(viewId,elementId,"content");
            var text = self.rm.translate(content);
            var fontSize = self.rm.getSetupFloat(viewId,elementId,"font_size");
            fontSize = Math.round(fontSize * self.fontSizeFactor);
            var fontName = self.rm.getSetupResourceId(viewId,elementId,"font");
            canvasContext.font = fontSize + "px '"+fontName+"'";
            canvasContext.fillStyle = self.rm.getSetupColor(viewId,elementId,"foreground");
            var dim = canvasContext.measureText(text);
            
            if (align=="LEFT") {
                canvasContext.fillText(text, rectButton.x+buttonPadding, rectButton.y + rectButton.height/2 + fontSize/2.0);
            } else if (align=="RIGHT") {
                canvasContext.fillText(text, rectButton.x + rectButton.width - dim.width - buttonPadding, rectButton.y + rectButton.height/2 + fontSize/2.0);
            } else {
                canvasContext.fillText(text, rectButton.x+rectButton.width/2 - dim.width/2, rectButton.y + rectButton.height/2 + fontSize/2.0);
            }
        } else { // RESOURCE_ID
            var content = self.rm.getSetupResourceId(viewId,elementId,"content");
            var img = self.rm.getImage(content);
            var imgScaleFactor = (self.canvasSizeFactor)*self.rm.getImageScale();

            if (align=="LEFT") {
                canvasContext.drawImage(img,
                                        rectButton.x+buttonPadding,
                                        rectButton.y+rectButton.height/2.0 - (img.height*imgScaleFactor)/2.0,
                                        img.width*imgScaleFactor,
                                        img.height*imgScaleFactor);
            } else if (align=="RIGHT") {
                canvasContext.drawImage(img,
                                        rectButton.x+rectButton.width-(img.width*imgScaleFactor)-buttonPadding,
                                        rectButton.y+rectButton.height/2.0 - (img.height*imgScaleFactor)/2.0,
                                        img.width*imgScaleFactor,
                                        img.height*imgScaleFactor);
            } else {
                canvasContext.drawImage(img,
                                        rectButton.x+rectButton.width/2.0-(img.width*imgScaleFactor)/2.0,
                                        rectButton.y+rectButton.height/2.0 - (img.height*imgScaleFactor)/2.0,
                                        img.width*imgScaleFactor,
                                        img.height*imgScaleFactor);
            }
        }

    },
    drawBlind: function(self,canvasContext, xCenter, yCenter, radius, yLevel, blindPercent, blindColor, text) {
        var canvasWidth = canvasContext.canvas.clientWidth;
        var canvasHeight = canvasContext.canvas.clientHeight;

        var radiusFactor = ((yLevel - yCenter) / radius) * 0.5 + 0.5;
        var radiusTop = radius * 2 * radiusFactor;
        var radiusBottom = radius * 2 * (1 - radiusFactor);

        // clipping area
        canvasContext.save();
        canvasContext.beginPath();
        canvasContext.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
        canvasContext.clip();

        // blind rectangles
        canvasContext.fillStyle = blindColor;
        canvasContext.fillRect(xCenter - radius, yCenter - radius, radius * 2, radiusTop * blindPercent);
        canvasContext.fillRect(xCenter - radius, yCenter + radius - radiusBottom + radiusBottom * (1 - blindPercent), radius * 2, radiusBottom * blindPercent);

        // restore clipping area
        canvasContext.restore();
        
        // optional text
        var fontName = self.rm.getSetupResourceId("facephi-widget-conf","","font_shutter_text");
        canvasContext.fillStyle = self.rm.getSetupColor("facephi-widget-conf","","color_shutter_text");
        canvasContext.font = 26.0 * self.fontSizeFactor + "px '" + fontName+"'";
        //self.adaptText(canvasWidth / 4.0, canvasContext, text, 26.0 * self.fontSizeFactor + "px " + FPhi.UserControl.Font.fontName);
        dim = canvasContext.measureText(text);
        canvasContext.fillText(text, xCenter - dim.width / 2, yCenter + radius - radiusBottom + radiusBottom * (1 - blindPercent) + 30);

    },
    showWarningMessage: function(self, canvasContext, textMessage, textColor) {
        
        var canvasWidth = canvasContext.canvas.clientWidth;
        var fontName = self.rm.getSetupResourceId("facephi-widget-conf","","font_warning_message");
        canvasContext.font = 24 * self.fontSizeFactor + "px '" + fontName+"'";
        canvasContext.fillStyle = textColor;
        var dim = canvasContext.measureText(textMessage);
        canvasContext.fillText(textMessage, canvasWidth / 2 - dim.width / 2, self.canvasHeight*0.81);
    },
    drawBackground: function(self,canvasContext,view) {
        
        //var color = self.rm.getSetupColor(view, "background", "top");
        //console.log("drawBackground "+view+" color: "+color);
        canvasContext.fillStyle = self.rm.getSetupColor(view, "background", "top");
        canvasContext.fillRect(0, 0, self.canvasWidth, self.circleY-self.circleRadius + 1);

        canvasContext.fillStyle = self.rm.getSetupColor(view, "background", "middle_top");
        canvasContext.fillRect(0, self.circleY-self.circleRadius, self.canvasWidth, self.circleY+self.circleRadius + 1);

        canvasContext.fillStyle = self.rm.getSetupColor(view, "background", "middle_bottom");
        canvasContext.fillRect(0, self.circleY+self.circleRadius, self.canvasWidth, (self.canvasHeight - self.buttonHeight) - (self.circleY+self.circleRadius) + 1);

        canvasContext.fillStyle = self.rm.getSetupColor(view, "background", "bottom");
        canvasContext.fillRect(0, self.canvasHeight - self.buttonHeight, self.canvasWidth, self.buttonHeight);
    },
    draw: function(self, video, canvasContext) {

        //console.log("draw called");
        
        var canvasWidth = canvasContext.canvas.clientWidth;
        var canvasHeight = canvasContext.canvas.clientHeight;

        // evaluate fps
        self.fpsframes++;
        self.actualTimePrev = self.actualTime;
        self.actualTime = performance.now();
        var diffTime = (self.actualTime - self.fpsTime) / 1000.0;
        if (diffTime > 1.0) {
            self.fps = self.fpsframes / diffTime;
            if (self.fpseframes>0)
                self.fpse = self.fpseframes / diffTime;
            else
                self.fpse = 0;
            self.fpsTime = self.actualTime;
            self.fpsframes = 0;
            self.fpseframes = 0;
        }

        switch (self.status) {
            case FPhi.UserControlState.WaitingFace:
            case FPhi.UserControlState.WaitingFaceStart:
                self.drawBackground(self,canvasContext,"StartExtractor");
                break;
            case FPhi.UserControlState.Extracting:
            case FPhi.UserControlState.Improve:
            case FPhi.UserControlState.Liveness1:
            case FPhi.UserControlState.Liveness2:
            case FPhi.UserControlState.Liveness3:
            case FPhi.UserControlState.WaitingEyeDetection:
                self.drawBackground(self,canvasContext,"Extractor");
                break;
        }
        
        // draw camera image depending on state. Need clipping???
        switch (self.status) {
            case FPhi.UserControlState.WaitingFace:
            case FPhi.UserControlState.WaitingFaceStart:
            case FPhi.UserControlState.Extracting:
            case FPhi.UserControlState.Improve:
            case FPhi.UserControlState.Liveness1:
            case FPhi.UserControlState.Liveness2:
            case FPhi.UserControlState.Liveness3:
            case FPhi.UserControlState.WaitingEyeDetection:
                //canvasContext.fillStyle = FPhi.UserControl.Color.whiteColor;
                //canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

                canvasContext.save();
                canvasContext.beginPath();
                canvasContext.arc(self.circleX, self.circleY, self.circleRadius, 0, 2 * Math.PI, false);
                canvasContext.clip();
                
                break;
            case FPhi.UserControlState.CamFailed:
                // draw camera error image to visible canvas
                var rect = self.scaleRect({ width: canvasWidth, height: canvasHeight }, { x: 0, y: 0, width: canvasWidth, height: canvasHeight });
                canvasContext.drawImage(video, rect.x, rect.y, rect.width, rect.height);
                canvasContext.restore();
                return;
        }

        // flip horizontally camera image
        canvasContext.save();
        canvasContext.translate(canvasWidth, 0);
        canvasContext.scale(-1, 1);

        // draw camera image to visible canvas
        var rect = self.scaleRect({ width: self.cameraWidth, height: self.cameraHeight }, { x: 0, y: 0, width: canvasWidth, height: canvasHeight });
        canvasContext.drawImage(video, rect.x, rect.y, rect.width, rect.height);

        canvasContext.restore();

        // draw camera image to internal canvas in original size. Used for extracting and returning to app.
        self.privateCanvas.getContext('2d').drawImage(video, 0, 0, self.cameraWidth, self.cameraHeight);

        switch (self.status) {
            case FPhi.UserControlState.WaitingFace:
            case FPhi.UserControlState.WaitingFaceStart:
            case FPhi.UserControlState.Extracting:
            case FPhi.UserControlState.Improve:
            case FPhi.UserControlState.Liveness1:
            case FPhi.UserControlState.Liveness2:
            case FPhi.UserControlState.Liveness3:
            case FPhi.UserControlState.WaitingEyeDetection:
                canvasContext.restore();
                break;
        }

        // iterate automata
        self.iterateAutomata(self, video, canvasContext);

        // draw depending on status and extractionMode selected
        canvasContext.save();
        switch (self.status) {
        case FPhi.UserControlState.WaitForWasmReady:
        case FPhi.UserControlState.Nothing:
        case FPhi.UserControlState.Finish:
            var percent = self.actualTime;
            percent = percent / 1000.0;

            canvasContext.fillStyle = FPhi.UserControl.Color.grayColor2;
            canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

            var arcPosition1 = -Math.PI / 2 + Math.PI * percent;
            var arcPosition2 = -Math.PI / 2 + 2 * Math.PI * percent;
            
            canvasContext.beginPath();
            canvasContext.strokeStyle = FPhi.UserControl.Color.blueColor; // blue
            canvasContext.lineWidth = 3;
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius / 2, arcPosition1, arcPosition1 + Math.PI / 2);
            canvasContext.stroke();

            canvasContext.beginPath();
            canvasContext.strokeStyle = FPhi.UserControl.Color.blueColor; // blue
            canvasContext.lineWidth = 2;
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius / 3, arcPosition2, arcPosition2 + Math.PI / 2);
            canvasContext.stroke();
            break;
        case FPhi.UserControlState.WaitingFace:
            var circleColor = self.rm.getSetupColor("facephi-widget-conf","","color_progress_bar");
            if (!self.faceAvailableDelayed) {
                var string = self.rm.translate("error_message_face");
                if (self.faceTooFar)
                    string = self.rm.translate("error_message_closer");
                var color = self.rm.getSetupColor("facephi-widget-conf","","color_warning_message");
                self.showWarningMessage(self, canvasContext, string, color);
                circleColor = color;
            }
            canvasContext.beginPath();
            canvasContext.strokeStyle = circleColor;
            canvasContext.lineWidth = 3;
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius, 0, Math.PI * 2);
            canvasContext.stroke();

            self.drawButton(self, canvasContext, { x: 0, y: canvasHeight - self.buttonHeight, width: canvasWidth / 2, height: self.buttonHeight }, self.translate(self, "cancel"), FPhi.UserControl.Color.leftButtonColor, FPhi.UserControl.Color.leftButtonTextColor);
            self.drawButton(self, canvasContext, { x: canvasWidth / 2, y: canvasHeight - self.buttonHeight, width: canvasWidth / 2, height: self.buttonHeight }, self.translate(self, "start"), FPhi.UserControl.Color.rightButtonColor, FPhi.UserControl.Color.rightButtonTextColor);
            break;
        case FPhi.UserControlState.Liveness1:
            var percent = self.actualTime - self.clockLiveness1;
            percent = percent / (self.liveness1Time * 1000.0);
            if (percent > 1.0) percent = 1.0;
            
            percent = (percent-1.0)*(percent-1.0)*(percent-1.0)+1.0; // Interpolacion OutCubic

            var circleColor = self.rm.getSetupColor("facephi-widget-conf","","color_progress_bar");
            canvasContext.beginPath();
            canvasContext.strokeStyle = circleColor;
            canvasContext.lineWidth = self.rm.getSetupFloat("facephi-widget-conf","","width_progress_bar") * (1.0-percent);
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius-(canvasContext.lineWidth/2)+0.5, -Math.PI / 2, 2 * Math.PI);
            canvasContext.stroke();

            self.drawBlind(self,canvasContext, self.circleX, self.circleY, self.circleRadius, self.privateEyesYLevel, percent * 0.80, FPhi.UserControl.Color.blindColor, "");
            self.drawButtonClose(self,canvasContext,"Extractor");
            break;
        case FPhi.UserControlState.Liveness2:
            self.drawBlind(self, canvasContext, self.circleX, self.circleY, self.circleRadius, self.privateEyesYLevel, 0.80, FPhi.UserControl.Color.blindColor, self.rm.translate("message_blink"));
            self.drawButtonClose(self,canvasContext,"Extractor");
            break;
        case FPhi.UserControlState.Liveness3:
            var percent = 0.0;
            percent = self.actualTime - self.clockLiveness3;
            percent = (percent / (self.liveness3Time * 1000.0)) * 0.20;
                
            if (percent > 0.20) percent = 0.20;
            self.drawBlind(self, canvasContext, self.circleX, self.circleY, self.circleRadius, self.privateEyesYLevel, 0.80 + percent, FPhi.UserControl.Color.blindColor, "");
            self.drawButtonClose(self,canvasContext,"Extractor");
            break;
        case FPhi.UserControlState.WaitingEyeDetection:
            if (self.clockEyeDetectionDetected == null) {

                var totalTime = self.actualTime - self.clockEyeDetection;
                var percent = 0.0;
                if (totalTime < 1000) {
                    percent = 1.0;
                } else {
                    percent = ((totalTime-1000.0) / (self.liveness1Time*1000.0));
                    if (percent < 0){
                        percent = 0;
                    }
                    else if(percent > 1)
                        percent = 1;
						
                    percent = 1 - percent;
                }

                self.drawBlind(self,canvasContext, self.circleX, self.circleY, self.circleRadius, self.privateEyesYLevel, percent, FPhi.UserControl.Color.blindColor, "");
            }
            else {
                var totalTime = self.actualTime - self.clockEyeDetectionDetected;
                var percent = (totalTime / (self.liveness3Time*1000.0)) * 0.30;
                if (percent < 0)
                    percent = 0;
                else if(percent > 0.30)
                    percent = 0.30;
                self.drawBlind(self, canvasContext, self.circleX, self.circleY, self.circleRadius, self.privateEyesYLevel, 1.0 - percent, FPhi.UserControl.Color.blindColor, "");
            }

            if (!self.faceAvailableDelayed) {
                var color = self.rm.getSetupColor("facephi-widget-conf","","color_warning_message");
                var string = self.rm.translate("error_message_face");
                self.showWarningMessage(self, canvasContext, string, color);
            }
            
            self.drawButtonClose(self,canvasContext,"Extractor");

            break;
        case FPhi.UserControlState.Extracting:
            var circleColor = self.rm.getSetupColor("facephi-widget-conf","","color_progress_bar");
            if (!self.faceAvailableDelayed) {
                var color = self.rm.getSetupColor("facephi-widget-conf","","color_warning_message");
                var string = self.rm.translate("error_message_face");
                self.showWarningMessage(self, canvasContext, string, color);
                circleColor = color; // red
            } else {
                var videoWidth = canvasWidth*0.20;
                
                canvasContext.save();
                canvasContext.beginPath();
                canvasContext.arc(self.circleX, canvasHeight*0.73 + videoWidth/2.0, videoWidth/2.0, 0, 2 * Math.PI, false);
                canvasContext.clip();

                canvasContext.drawImage(self.videoPlayer,canvasWidth/2.0 - videoWidth/2.0,canvasHeight*0.73,videoWidth,videoWidth);
                canvasContext.restore();
            }

            var percent = self.actualTime - self.clockExtraction + self.extractionTimePartial;
            percent = percent / (self.extractionTime * 1000.0);
            
            if (self.extractionMode == FPhi.UserControlMode.Authenticate) {
                percent = percent*percent*(3.0 - 2.0*percent); // Interpolacion Smoothstep
            }

            canvasContext.beginPath();
            canvasContext.strokeStyle = circleColor;
            var widthProgressBar = self.rm.getSetupFloat("facephi-widget-conf","","width_progress_bar");
            canvasContext.lineWidth = self.rm.getSetupFloat("facephi-widget-conf","","width_progress_bar");
            canvasContext.lineCap = "round";
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius-(canvasContext.lineWidth/2)+0.5, -Math.PI / 2, 2 * Math.PI * percent - Math.PI / 2);
            canvasContext.stroke();

            self.drawButtonClose(self,canvasContext,"Extractor");
            break;
        case FPhi.UserControlState.InitialTip:
            
            self.drawBackground(self,canvasContext,"RegistrationTips");
            canvasContext.fillStyle = self.rm.getSetupColor("RegistrationTips", "background", "pagination_separator");
            canvasContext.fillRect(0, canvasHeight-self.buttonHeight-1, canvasWidth, 1);
            
            var text = self.rm.translate("registration_tips_title");
            var fontSize = self.rm.getSetupFloat("RegistrationTips","tip","font_size");
            var fontName = self.rm.getSetupResourceId("RegistrationTips","tip","font");
            var textColor = self.rm.getSetupColor("RegistrationTips","tip","color")
            self.drawStringMultiline(self, canvasContext, text, canvasHeight*0.75, textColor, fontName, fontSize);
            
            text = self.rm.translate("registration_tips_detail");
            fontSize = self.rm.getSetupFloat("RegistrationTips","tip_detail","font_size");
            fontName = self.rm.getSetupResourceId("RegistrationTips","tip_detail","font");
            textColor = self.rm.getSetupColor("RegistrationTips","tip_detail","color")
            self.drawStringMultiline(self, canvasContext, text, canvasHeight*0.81, textColor, fontName, fontSize);

            canvasContext.save();
            canvasContext.beginPath();
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius, 0, 2 * Math.PI, false);
            canvasContext.clip();

            canvasContext.drawImage(self.videoPlayer,self.circleX-self.circleRadius,self.circleY-self.circleRadius,self.circleRadius*2.0,self.circleRadius*2.0);
            canvasContext.restore();
                
            var bWidth = 190 * self.canvasSizeFactor;
            var bHeight = 38 * self.canvasSizeFactor;
            self.drawButton(self, canvasContext, { x: 30*self.canvasSizeFactor, y: canvasHeight - self.buttonHeight*0.5 - bHeight*0.5, width: bWidth, height: bHeight },"RegistrationTips","button_skip");
            self.drawButton(self, canvasContext, { x: canvasWidth -(30*self.canvasSizeFactor) - bWidth, y: canvasHeight - self.buttonHeight*0.5 - bHeight*0.5, width: bWidth, height: bHeight },"RegistrationTips","button_next");

            self.drawButtonClose(self,canvasContext,"RegistrationTips");

            break;
        case FPhi.UserControlState.CycleTip:
        case FPhi.UserControlState.ImproveWizard:
            
            self.drawBackground(self,canvasContext,"FaceMovementTips");
            canvasContext.fillStyle = self.rm.getSetupColor("FaceMovementTips", "background", "pagination_separator");
            canvasContext.fillRect(0, canvasHeight-self.buttonHeight-1, canvasWidth, 1);

            var text = self.rm.translate("face_movement_tips_title");
            var fontSize = self.rm.getSetupFloat("FaceMovementTips","tip","font_size");
            var fontName = self.rm.getSetupResourceId("FaceMovementTips","tip","font");
            var textColor = self.rm.getSetupColor("FaceMovementTips","tip","color");
            self.drawStringMultiline(self, canvasContext, text, canvasHeight*0.75, textColor, fontName, fontSize);

            text = self.rm.translate("face_movement_tips_detail");
            fontSize = self.rm.getSetupFloat("FaceMovementTips","tip_detail","font_size");
            fontName = self.rm.getSetupResourceId("FaceMovementTips","tip_detail","font");
            textColor = self.rm.getSetupColor("FaceMovementTips","tip_detail","color");
            self.drawStringMultiline(self, canvasContext, text, canvasHeight*0.81, textColor, fontName, fontSize);

            canvasContext.save();
            canvasContext.beginPath();
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius, 0, 2 * Math.PI, false);
            canvasContext.clip();
            
            canvasContext.drawImage(self.videoPlayer,self.circleX-self.circleRadius,self.circleY-self.circleRadius,self.circleRadius*2.0,self.circleRadius*2.0);
            canvasContext.restore();
                
            var bWidth = 190 * self.canvasSizeFactor;
            var bHeight = 38 * self.canvasSizeFactor;
            self.drawButton(self, canvasContext, { x: 30*self.canvasSizeFactor, y: canvasHeight - self.buttonHeight*0.5 - bHeight*0.5, width: bWidth, height: bHeight },"FaceMovementTips","button_back");
            self.drawButton(self, canvasContext, { x: canvasWidth -(30*self.canvasSizeFactor) - bWidth, y: canvasHeight - self.buttonHeight*0.5 - bHeight*0.5, width: bWidth, height: bHeight },"FaceMovementTips","button_done");

            self.drawButtonClose(self,canvasContext,"FaceMovementTips");
            break;
        case FPhi.UserControlState.WaitingFaceStart:
            var circleColor = self.rm.getSetupColor("facephi-widget-conf","","color_progress_bar");
            if (!self.faceAvailableDelayed) {
                circleColor = self.rm.getSetupColor("facephi-widget-conf","","color_warning_message");
            }
            canvasContext.beginPath();
            canvasContext.strokeStyle = circleColor;
            canvasContext.lineWidth = self.rm.getSetupFloat("facephi-widget-conf","","width_progress_bar");
            canvasContext.lineCap = "round";
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius-(canvasContext.lineWidth/2)+0.5, 0, Math.PI * 2);
            canvasContext.stroke();

            var text = self.rm.translate("start_extractor_title");
            var fontSize = self.rm.getSetupFloat("StartExtractor","text","font_size");
            var fontName = self.rm.getSetupResourceId("StartExtractor","text","font");
            var textColor = self.rm.getSetupColor("StartExtractor","text","color");
            self.drawStringMultiline(self, canvasContext, text, canvasHeight*0.81, textColor, fontName, fontSize);

            var bWidth = 190 * self.canvasSizeFactor;
            var bHeight = 38 * self.canvasSizeFactor;
            self.drawButton(self, canvasContext, { x: canvasWidth*0.5 - bWidth*0.5, y: canvasHeight - self.buttonHeight*0.5 - bHeight*0.5, width: bWidth, height: bHeight },"StartExtractor","button_start");
			
			

            if (self.extractionMode == FPhi.UserControlMode.Register) {
                self.drawButtonInfo(self,canvasContext,"StartExtractor");
            }
            self.drawButtonClose(self,canvasContext,"StartExtractor");
            break;
        case FPhi.UserControlState.ShowResults:
                
            self.drawBackground(self,canvasContext,"Results");

            var graphicalScore = self.getGraphicalScore(self.lastExtractionResult.templateScore); // IMPORTANTE: MERGEAR ESTE CAMBIO
            var scoreColor = self.rm.getSetupColor("facephi-widget-conf","","color_quality_excellent");
            if (graphicalScore <= 0.33)
                scoreColor = self.rm.getSetupColor("facephi-widget-conf","","color_quality_low");
            else if (graphicalScore <= 0.66)
                scoreColor = self.rm.getSetupColor("facephi-widget-conf","","color_quality_good");
            
            var totalTime = (self.actualTime - self.clockShowResults) / 1000.0;
            var totalTransitionTime = 1.000 + 1.500 * graphicalScore;
            var progressTime = totalTime / totalTransitionTime;
            if (progressTime > 1.0) {
                progressTime = 1.0;
            }
            
            // Calculamos la interpolacion de la barra de progreso (OutQuad -> InOutQuad)
            progressTime = progressTime * (2.0 - progressTime);
            progressTime = progressTime<0.5? 2*progressTime*progressTime : -1+(4-2*progressTime)*progressTime;

            // graphical score
            canvasContext.beginPath();
            canvasContext.fillStyle = "rgba(249,249,249,1)";
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius, -Math.PI / 2, 2 * Math.PI - Math.PI / 2);
            canvasContext.fill();

            canvasContext.beginPath();
            canvasContext.strokeStyle = scoreColor;
            canvasContext.lineWidth = self.rm.getSetupFloat("facephi-widget-conf","","width_progress_bar");
            canvasContext.lineCap = "round";
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius-(canvasContext.lineWidth/2)*0.5, -Math.PI / 2, 2 * Math.PI * graphicalScore * progressTime - Math.PI / 2);
            canvasContext.stroke();

            // score text
            var message="";
            var tipMessage="";
            if (graphicalScore >= 1.0) {
                message = self.rm.translate("results_quality_excellent");
                tipMessage = self.rm.translate("results_message_excellent");
            } else if (graphicalScore >= 0.333) {
                message = self.rm.translate("results_quality_good");
                tipMessage = self.rm.translate("results_message_good");
            } else {
                message = self.rm.translate("results_quality_low");
                tipMessage = self.rm.translate("results_message_low");
            }

            // draw inside-circle message
            var text1 = message;
            fontSize1 = self.rm.getSetupFloat("Results","text_result","font_size");
            fontName1 = self.rm.getSetupResourceId("Results","text_result","font");
            self.drawStringMultiline(self, canvasContext, text1, self.circleY-5, scoreColor, fontName1, fontSize1);

            var text2 = self.rm.translate("results_quality_message");
            fontSize2 = self.rm.getSetupFloat("Results","text_quality","font_size");
            fontName2 = self.rm.getSetupResourceId("Results","text_quality","font");
            self.drawStringMultiline(self, canvasContext, text2, self.circleY+5+fontSize2, scoreColor, fontName2, fontSize2);

            // draw tip
            var totalTime = (self.actualTime - self.clockShowResults) / 1000.0;
            if (totalTime>1.0) {
                var alfa=(totalTime-1.0)*2.0;
                if (alfa>1.0) alfa = 1.0;
                var tipColor = self.rm.getSetupColorWithAlpha("Results","tip","color",alfa);
                //tipColor = [tipColor colorWithAlphaComponent:alfa];
                
                fontSize1 = self.rm.getSetupFloat("Results","tip","font_size");
                fontName1 = self.rm.getSetupResourceId("Results","tip","font");
                self.drawStringMultiline(self, canvasContext, tipMessage, self.canvasHeight*0.81, tipColor, fontName1, fontSize1);
            }

            var bWidth = 190 * self.canvasSizeFactor;
            var bHeight = 38 * self.canvasSizeFactor;
            if (graphicalScore < 1.0)
            {
                self.drawButton(self, canvasContext, self.reduceRect({ x: 0, y: canvasHeight - self.buttonHeight, width: canvasWidth / 2, height: self.buttonHeight },0.2),"Results","button_repeat");
                self.drawButton(self, canvasContext, self.reduceRect({ x: canvasWidth / 2, y: canvasHeight - self.buttonHeight, width: canvasWidth / 2, height: self.buttonHeight },0.2),"Results","button_finish");
            } else {
                self.drawButton(self, canvasContext, { x: canvasWidth*0.5 - bWidth*0.5, y: canvasHeight - self.buttonHeight*0.5 - bHeight*0.5, width: bWidth, height: bHeight },"Results","button_finish");
            }

            break;
        case FPhi.UserControlState.WizardComplete:
            self.drawBackground(self,canvasContext,"Success");
                
            // draw video 'success'
            canvasContext.save();
            canvasContext.beginPath();
            canvasContext.arc(self.circleX, self.circleY, self.circleRadius, 0, 2 * Math.PI, false);
            canvasContext.clip();
            canvasContext.drawImage(self.videoPlayer,self.circleX-self.circleRadius,self.circleY-self.circleRadius,self.circleRadius*2.0,self.circleRadius*2.0);
            canvasContext.restore();
                
            // draw logo
            var content = self.rm.getSetupResourceId("Success","logo_large","value");
            var img = self.rm.getImage(content);
            var imgScaleFactor = (self.canvasSizeFactor)*self.rm.getImageScale();
            canvasContext.drawImage(img,
                                    self.canvasWidth/2.0 - (img.width*imgScaleFactor)/2.0,
                                    self.canvasHeight - (img.height*imgScaleFactor) - 10,
                                    img.width*imgScaleFactor,
                                    img.height*imgScaleFactor);

            break;
        case FPhi.UserControlState.Errors:
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

            text = self.livenessErrorString;
            fontHeight = 15.0 * self.fontSizeFactor;

            var fontName = self.rm.getSetupResourceId("facephi-widget-conf","","font_warning_message");
            canvasContext.font = fontHeight + "px '" + fontName+"'";
            canvasContext.fillStyle = "black";
            var lines = text.split('\n');
            for (var i = 0; i < lines.length; i++) {
                self.adaptText(90.0 * canvasWidth / 100.0, canvasContext, text, 40.0 * self.fontSizeFactor + "px '" + fontName +"'");
                var dim = canvasContext.measureText(lines[i]);
                var y = 330 * self.canvasSizeFactor + fontHeight * i;
                canvasContext.fillText(lines[i], canvasWidth / 2 - dim.width / 2, y);
            }

            var image = self.livenessErrorImage;
            var rect = self.scaleRect({ width: image.width, height: image.height }, { x: canvasWidth * 0.03, y: canvasHeight * 0.378, width: canvasWidth * 0.94, height: canvasHeight * 0.100 }, true);
            canvasContext.drawImage(image, rect.x, rect.y, rect.width, rect.height);
            
            self.drawButton(self, canvasContext, { x: 0, y: canvasHeight - self.buttonHeight, width: canvasWidth, height: self.buttonHeight },"Results","button_finish");
            break;
        }
        canvasContext.restore();

        // draw debug info
        if (self.debug) {
            var line = 1;
            canvasContext.font = "12px Verdana";
            canvasContext.fillStyle = "gray";
            canvasContext.fillText("Version: " + self.extractorVersion, 0, 20*line); line++;
            canvasContext.fillText("FPS: " + self.fps.toFixed(2), 0, 20*line); line++;
            canvasContext.fillText("FPS Extractor: " + self.fpse.toFixed(2), 0, 20*line); line++;
            canvasContext.fillText("Camera size: " + self.cameraWidth + "x" + self.cameraHeight + "px", 0, 20*line); line++;
            canvasContext.fillText("Canvas size: " + canvasWidth + "x" + canvasHeight + "px", 0, 20*line); line++;
            canvasContext.fillText("Status: " + FPhi.UserControlStateInv[self.status], 0, 20*line); line++;
            canvasContext.fillText("Images: " + self.privateImages.length, 0, 20*line); line++;
            canvasContext.fillText("Face available: " + self.faceAvailable, 0, 20*line); line++;
            canvasContext.fillText("EyesYLevel: " + Math.round(self.privateEyesYLevel), 0, 20*line); line++;
            var extractionResult = self.lastDetectResult;
            if (extractionResult != null) {

                if (typeof extractionResult.face != "undefined") {
                    canvasContext.fillText("Face: [" + extractionResult.face.x + "," + extractionResult.face.y + "," + extractionResult.face.width + "," + extractionResult.face.height + "]", 0, 20*line); line++;
                    canvasContext.beginPath();
                    canvasContext.lineWidth = "3";
                    canvasContext.strokeStyle = "red";
                    var faceRect = self.fromCameraToScreen(self, {x:extractionResult.face.x, y:extractionResult.face.y, width:extractionResult.face.width, height:extractionResult.face.height});
                    canvasContext.rect(faceRect.x, faceRect.y, faceRect.width, faceRect.height);
                    canvasContext.stroke();
                }

                if (typeof extractionResult.leftEye != "undefined") {
                    canvasContext.beginPath();
                    canvasContext.lineWidth = "6";
                    canvasContext.strokeStyle = "red";
                    var faceRect = self.fromCameraToScreen(self, { x: extractionResult.leftEye.x, y: extractionResult.leftEye.y, width: 1, height: 1 });
                    canvasContext.rect(faceRect.x, faceRect.y, faceRect.width, faceRect.height);
                    canvasContext.stroke();
                }
                
                if (typeof extractionResult.rightEye != "undefined") {
                    canvasContext.beginPath();
                    canvasContext.lineWidth = "6";
                    canvasContext.strokeStyle = "red";
                    var faceRect = self.fromCameraToScreen(self, { x: extractionResult.rightEye.x, y: extractionResult.rightEye.y, width: 1, height: 1 });
                    canvasContext.rect(faceRect.x, faceRect.y, faceRect.width, faceRect.height);
                    canvasContext.stroke();
                }
            }
        }

        // callback again draw
        if (self.status != FPhi.UserControlState.Off)
            setTimeout(self.draw, self.samplePeriod, self, video, canvasContext);
        else
        {
            self.setOffInterface(canvasContext,self.cameraContainer,self.canvasWidth);
        }
    },
    reduceRect: function (rect,percent) {
        
        var newWidth = rect.width*(1.0-percent);
        var newHeight = rect.height*(1.0-percent);
        rect.x = rect.x + (rect.width-newWidth)/2.0;
        rect.y = rect.y + (rect.height-newHeight)/2.0;
        rect.width = newWidth;
        rect.height = newHeight;
        return rect;
    },
    drawStringMultiline: function (self,canvasContext, text, yPosition, textColor, font, fontSize) {

        var lines = text.split("\n");
        canvasContext.imageSmoothingEnabled=false;
        fontSize = Math.round(fontSize * self.fontSizeFactor);
        canvasContext.font = "normal "+fontSize+"px '"+font+"'";
        canvasContext.fillStyle = textColor;
        for (var a=0; a<lines.length; a++) {
            dim = canvasContext.measureText(lines[a]);
            canvasContext.fillText(lines[a], self.canvasWidth / 2 - dim.width / 2, yPosition + a*(fontSize+1));
        }

    },
    setOffInterface: function(ctx,container,w) {
        
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, w, w);
        ctx.stroke();
    },
    adaptText: function(aSize,ctx,txt,fontText) {

        ctx.font = fontText;
        var medida = ctx.measureText(txt).width;
        if(medida > aSize)
        {
            var ind = fontText.indexOf('px');
            var fontS = fontText.substring(0, ind);

            fontS--;
            fontText = fontS + fontText.substring(ind, fontText.length);
            ctx.font = fontText;
            
            return this.adaptText(aSize,ctx,txt,fontText);
        }
        return true;
    },
    reflectedX: function(width, x) {
        return width - x;
    },
    iterateAutomata: function(self, video, canvasContext) {

        switch (self.status) {
            case FPhi.UserControlState.WaitForWasmReady:
                if ((self.queuedCommands == 0) && (self.wasmReady)) {
                    if (self.extractionMode == FPhi.UserControlMode.Register)
                        self.setStatus(self, FPhi.UserControlState.InitialTip);
                    else
                        self.setStatus(self, FPhi.UserControlState.WaitingFaceStart);
                }
                break;
            case FPhi.UserControlState.Nothing:
                break;
            case FPhi.UserControlState.InitialTip:
                
                self.evaluateScenarioTimeout(self);
                
                break;
            case FPhi.UserControlState.CycleTip:

                self.evaluateScenarioTimeout(self);
                
                break;
            case FPhi.UserControlState.ShowResults:

                self.evaluateScenarioTimeout(self);
                break;
            case FPhi.UserControlState.WaitingFace:
                
                if (self.extractor.QueuedCommands == 0) {
                    var imdata = self.getImageData(self.privateCanvas);
                    self.privateLastImage = imdata;
                    self.extractor.Detect(imdata.width, imdata.height, imdata.pixels.data.buffer, FPhi.ImageFormat.RGBA_32bpp);
                }
                
                self.evaluateScenarioTimeout(self);

                break;
            case FPhi.UserControlState.WaitingFaceStart:

                if ((self.queuedCommands == 0) && (self.wasmReady)) {
                    var imData = self.getImageData(self.privateCanvas);
                    self.privateLastImage = imData;
                    self.postMessage(self,{cmd:"detect",data:imData.pixels.data,width:imData.width,height:imData.height,format:FPhi.ImageFormat.RGBA_32bpp});
                    self.evaluateScenarioTimeout(self);
                }
                break;
            case FPhi.UserControlState.WaitingEyeDetection:

                if (performance.now() - self.clockEyeDetection > (self.detectionTimeout)) {
                    self.livenessErrorString = self.translate(self, "timeout");
                    self.livenessErrorImage = self.imageTimeout;
                    self.setStatus(self, FPhi.UserControlState.Errors);
                    break;
                }

                var totalTime = performance.now() - self.clockEyeDetection;
                if (totalTime > 1000 && self.clockEyeDetectionDetected==null) {
                    if (totalTime < 1000 + self.liveness1Time*1000) {
                        break;
                    }
                }

                if ((totalTime > (1000 + self.liveness1Time*1000)) && (self.clockEyeDetectionDetected != null)) {
                    self.setStatus(self, FPhi.UserControlState.Liveness1);
                    break;
                }

                if (self.clockEyeDetectionDetected != null && (performance.now() - self.clockEyeDetectionDetected > self.liveness3Time * 1000))
                    self.setStatus(self, FPhi.UserControlState.Liveness2);

                if (self.clockEyeDetectionDetected == null) {
                    
                    if ((self.queuedCommands == 0) && (self.wasmReady)) {
                        var imData = self.getImageData(self.privateCanvas);
                        self.privateLastImage = imData;
                        self.postMessage(self,{cmd:"detect",data:imData.pixels.data,width:imData.width,height:imData.height,format:FPhi.ImageFormat.RGBA_32bpp});
                        self.evaluateScenarioTimeout(self);
                    }
                }
                
                break;
            case FPhi.UserControlState.Liveness1:
                if (performance.now() - self.clockLiveness1 > (self.liveness1Time * 1000)) {
                    self.setStatus(self, FPhi.UserControlState.Liveness2);
                }
                break;
            case FPhi.UserControlState.Liveness2:

                if ((self.queuedCommands == 0) && (self.wasmReady)) {
                    var imdata = self.getImageData(self.privateCanvas);
                    self.privateLivenessImageTemp = imdata;
                    self.postMessage(self,{cmd:"livenessTimerAdd",milliseconds:performance.now() - self.clockLiveness2});
                }
                break;
            case FPhi.UserControlState.Liveness3:
                if (self.clockLiveness3_finish != null) {
                    if (performance.now() - self.clockLiveness3_finish > (self.liveness3Time * 1000)) {
                        self.setStatus(self, FPhi.UserControlState.WaitingEyeDetection);
                    }
                }
                break;
            case FPhi.UserControlState.Extracting:

                if (!self.faceAvailableDelayed) {
                    self.extractionTimePartial += self.actualTimePrev - self.clockExtraction;
                    self.clockExtraction = self.actualTime;
                }
                
                if (self.queuedCommands == 0) {
                    
                    if (self.actualTime - self.clockExtractionPure > self.detectionTimeout && self.privateImages.length == 0) {
                        
                        self.livenessErrorString = self.translate(self, "timeout");
                        self.livenessErrorImage = self.imageTimeout;
                        self.setStatus(self, FPhi.UserControlState.Errors);
                    }
                    else if ((self.actualTime - self.clockExtraction + self.extractionTimePartial < (self.extractionTime * 1000)) || (this.privateImages.length == 0)){
                        
                        if (self.actualTime - self.clockExtractionPure > self.extractionTimeout)
                        {
                            self.livenessErrorString = self.translate(self, "timeout");
                            self.livenessErrorImage = self.imageTimeout;
                            self.setStatus(self, FPhi.UserControlState.Errors);
                            
                        } else {
                            var imData = self.getImageData(self.privateCanvas);
                            self.privateLastImage = imData;
                            self.postMessage(self,{cmd:"extractNextSmart",data:imData.pixels.data,width:imData.width,height:imData.height,format:FPhi.ImageFormat.RGBA_32bpp});
                            //self.extractor.ExtractNextSmart(imdata.width, imdata.height, imdata.pixels.data.buffer, FPhi.ImageFormat.RGBA_32bpp);
                        }
                    }
                    else
                    {
                        if (self.extractionMode == FPhi.UserControlMode.Register)
                            self.setStatus(self, FPhi.UserControlState.ShowResults);
                        else {
                            if (self.livenessMode == FPhi.LivenessMode.Blink)
                                self.setStatus(self, FPhi.UserControlState.Liveness1);
                            else
                                self.setStatus(self, FPhi.UserControlState.Finish);
                        }
                    }
                }
                break;
            case FPhi.UserControlState.WizardComplete:
                if (performance.now() - self.clockWizardCompleted > (self.sendingTimeout * 1000)) // 2 seconds waiting...
                    self.setStatus(self, FPhi.UserControlState.Finish);
                break;
        }

    },
    evaluateScenarioTimeout: function(self){
        
        if (self.sceneTimeout > 0.00) {
            
            if (performance.now() - self.clockNewScenario > (self.sceneTimeout * 1000)) {

                self.livenessErrorString = self.translate(self, "timeout");
                self.livenessErrorImage = self.imageTimeout;
                self.setStatus(self, FPhi.UserControlState.Errors);
            }

        }
    },
    getVideoSources: function(self) {
        // Populate list of video sources e.g. laptop camera and USB webcam
        //var videoSelect = document.querySelector("select#camera");
        if (navigator.mediaDevices) {

            navigator.mediaDevices.enumerateDevices().then(
                function(srcInfo) {
                    videoSourceId = srcInfo
                        .filter(function(s) { return s.kind == "video"; })
                        .map(function(s, ind) {
                            // Set up list of cameras
                            //var option = document.createElement("option");
                            //option.text = "camera " + ind;
                            //option.value = s.id;
                            //videoSelect.appendChild(option);
                            return s.id;
                        });
                    selectedSource = videoSourceId[0];
                    self.setVideoInput(self);
                }
            );
        }
        else
        {
            // in MAC is normally used this deprecated method and works fine. (In MAC  navigator.mediaDevices is not working)
            MediaStreamTrack.getSources(
               function (srcInfo) {
                   videoSourceId = srcInfo
                       .filter(function (s) { return s.kind == "video"; })
                       .map(function (s, ind) {
                           // Set up list of cameras
                           //var option = document.createElement("option");
                           //option.text = "camera " + ind;
                           //option.value = s.id;
                           //videoSelect.appendChild(option);
                           return s.id;
                       });
                   selectedSource = videoSourceId[0];
                   self.setVideoInput(self);
               }
            );
        }
    },
    getScriptPath: function(fileName) {

        var fPhiPageScripts = document.getElementsByTagName('script');
        var index, selected = 0;

        for (index = 0; index < fPhiPageScripts.length; index++) {
            if (fPhiPageScripts[index].src.indexOf(fileName) > -1)
                selected = index;
        }

        return fPhiPageScripts[selected].src.split('/').slice(0, -1).join('/') + '/';
    },
    translate: function (self, key) {
        
        if (self.language == "es") {

            var translation = FPhi.UserControl.Language.es[key];
            if (translation == undefined) return key;
            else return translation;
        } else if (self.language == "en") {
            
            var translation = FPhi.UserControl.Language.en[key];
            if (translation == undefined) return key;
            else return translation;
        } else {
            return key;
        }
    },
    distAlgSustitution: function(self, imageArray, newImage) {

        var desviacion = Number.MAX_VALUE;
        var better; // better array

        for (var a = 1; a < imageArray.length; a++) {
            var copy = imageArray.slice();
            copy[a] = newImage;
            copy.sort(function(a, b) { return a.time - b.time });

            var localDesviacion = self.desviacionTipica(self, copy);
            if (localDesviacion < desviacion) {
                desviacion = localDesviacion;
                better = copy;
            }
        }
        return better;
    },
    desviacionTipica: function(self, imageArray) {
        var media = self.media(self, imageArray);
        var total = 0.0;

        for (var a = 1; a < imageArray.length; a++) {
            var timeInterval = imageArray[a].time - imageArray[a - 1].time;
            total += (timeInterval - media) * (timeInterval - media);
        }
        total = Math.sqrt(total / (imageArray.length - 2));

        return total;
    },
    media: function(self, imageArray) {
        var total = 0.0;
        for (var a = 1; a < imageArray.length; a++) {
            var interval = imageArray[a].time - imageArray[a - 1].time;
            total += interval;
        }
        return total / (imageArray.length - 1);
    },
    OnResourceManagerStatus: function(self,statusBool) {
        
        if (statusBool) {
            self.setStatus(self,FPhi.UserControlState.WaitForWasmReady);
        } else {
            //console.log(errorMessage);
        }
    },
    videoLoaded: function(e){
        //console.log(e);
        this.cameraWidth = e.target.videoWidth;
        this.cameraHeight = e.target.videoHeight;
        //console.log(e.target.videoWidth);
        //console.log(this.cameraWidth);
        
        //this.canvasVideoPlayer.width = e.target.videoWidth;
//        //this.canvasVideoPlayer.height = e.target.videoHeight;
        //console.log("video dim: "+this.canvasVideoPlayer.width+"x"+this.canvasVideoPlayer.height);
    },
    videoFrame:function(e) {
        
        //e.target.pause();
        var ctx = this.canvasVideoPlayer.getContext('2d');
        ctx.drawImage(e.target,0,0);
        
        //e.target.play();
    }

};

function arrayBufferToBase64(buffer) {
    
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};


/* FacePhi User Control Wasm API. v 5.5.1 */

var facePhiUserControlWasm =
{
    GetPluginEnabled: function () 
    {
		if (privateFacePhiConfig.WasmControl == null)
			return false;
		
        return true;
    },

    OnExtractionFinish: function (args) 
    {
        var templateBase64 = null;
        var imagesArray = null;

        if (args.detail.template && args.detail.template.byteLength > 0) 
        {
            templateBase64 = arrayBufferToBase64(args.detail.template);
        }

        if (args.detail.images.length > 0) 
        {
            imagesArray = args.detail.images;
        }

        var extractionResult = { Template: templateBase64, Images: imagesArray };

        facePhiUserControl.events.ExtractionFinished(extractionResult);
    },
    
	OnLivenessError: function (args) {

        var errorResult = null;

        if (args.detail.livenessErrorType > -1) {

            errorResult = { LivenessErrorType: args.detail.livenessErrorType}; 
        } 

        facePhiUserControl.events.LivenessError(errorResult);
	},
    
	OnTimeoutErrorButtonClick: function (args) {

	    facePhiUserControl.events.TimeoutErrorButtonClick();
	},


	OnLivenessErrorButtonClick: function (args) {

	    facePhiUserControl.events.LivenessErrorButtonClick();
	},
	
	OnExceptionCaptured: function (args) 
    {
        var message = null;
        var type = null;

        if (args.detail.message)
            message = args.detail.message;

        if (args.detail.exceptionType > -1)
            type = args.detail.exceptionType;

        var exceptionResult = { Message: message, ExceptionType: type };

        facePhiUserControl.events.ExceptionCaptured(exceptionResult);
    },
	
	OnExtractionTimeout: function () 
    {
        facePhiUserControl.events.ExtractionTimeout();
    },

    OnUserCancel: function () 
    {
        facePhiUserControl.events.CancelledDetected();
    }
};

var privateFacePhiConfig = {
    
    WasmControl: null
};



// Method that loads the user control in the web form
FacePhiShowWasm = function (ucDiv) {

	var rmPathLocal = FPhi.UserControl.prototype.getScriptPath("FPhi.UC.wasm.js") + "FPhi.Widget.Resources/";

    if (privateFacePhiConfig.WasmControl == null) {

        privateFacePhiConfig.WasmControl = new FPhi.UserControl(facePhiUserControl.config.divId, 640, 480, facePhiUserControlWasm.OnExtractionFinish, facePhiUserControlWasm.OnUserCancel, 
															    facePhiUserControlWasm.OnExceptionCaptured, facePhiUserControlWasm.OnExtractionTimeout, facePhiUserControlWasm.OnLivenessError, 
																facePhiUserControlWasm.OnLivenessErrorButtonClick, facePhiUserControlWasm.OnTimeoutErrorButtonClick, 
																facePhiUserControl.config.culture, rmPathLocal, [163,326,489], facePhiUserControl.config.width, facePhiUserControl.config.width);

        privateFacePhiConfig.WasmControl.cropImage = facePhiUserControl.config.cropImage;
        privateFacePhiConfig.WasmControl.cropFactor = facePhiUserControl.config.cropFactor;
        privateFacePhiConfig.WasmControl.resizeFactor = facePhiUserControl.config.resizeFactor;
        privateFacePhiConfig.WasmControl.sceneTimeout = facePhiUserControl.config.sceneTimeout;
		
		privateFacePhiConfig.WasmControl.debug = facePhiUserControl.config.debug;

        if (facePhiUserControl.config.extractionMode == facePhiUserControlType.extractionMode.Authenticate) {
            privateFacePhiConfig.WasmControl.extractionMode = FPhi.UserControlMode.Authenticate;
        }

        if (facePhiUserControl.config.extractionMode == facePhiUserControlType.extractionMode.Register) {
            privateFacePhiConfig.WasmControl.extractionMode = FPhi.UserControlMode.Register;
        }
		
		if (facePhiUserControl.config.livenessMode == facePhiUserControlType.livenessMode.Blink) {
            privateFacePhiConfig.WasmControl.livenessMode = FPhi.LivenessMode.Blink;
        }
		
		if (facePhiUserControl.config.livenessMode == facePhiUserControlType.livenessMode.None) {
            privateFacePhiConfig.WasmControl.livenessMode = FPhi.LivenessMode.None;
        }
		
		if (privateFacePhiConfig.WasmControl.status == FPhi.UserControlState.Off) {
            privateFacePhiConfig.WasmControl.Start();
        } 
        
        // on module loaded -> start();
      } 
      else
      {
        if (facePhiUserControl.config.extractionMode == facePhiUserControlType.extractionMode.Authenticate) {
            privateFacePhiConfig.WasmControl.extractionMode = FPhi.UserControlMode.Authenticate;
        }

        if (facePhiUserControl.config.extractionMode == facePhiUserControlType.extractionMode.Register) {
            privateFacePhiConfig.WasmControl.extractionMode = FPhi.UserControlMode.Register;
        }   
		
		if (facePhiUserControl.config.livenessMode == facePhiUserControlType.livenessMode.Blink) {
            privateFacePhiConfig.WasmControl.livenessMode = FPhi.LivenessMode.Blink;
        }
		
		if (facePhiUserControl.config.livenessMode == facePhiUserControlType.livenessMode.None) {
            privateFacePhiConfig.WasmControl.livenessMode = FPhi.LivenessMode.None;
        }
        
        if (privateFacePhiConfig.WasmControl.status == FPhi.UserControlState.Off) {
            privateFacePhiConfig.WasmControl.Start();
        } 
     }

};





