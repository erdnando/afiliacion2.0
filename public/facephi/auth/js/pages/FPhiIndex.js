
var localizedStrings =
{
    enterUserMessage:
    {
        'es': 'Usuario',
        'en': 'Username'
    },
    passwordMessage:
    {
        'es': 'Password',
        'en': 'Password'
    }
};

function OnFocus(object) {

    var lang = $("#Body_hdnLang");

    var msg = localizedStrings['enterUserMessage'][(lang) ? lang.val() : 'es'];

    if (object.value == msg) {
        object.value = '';
    }
};

function OnBlur(object) {

    var lang = $("#Body_hdnLang");

    var msg = localizedStrings['enterUserMessage'][(lang) ? lang.val() : 'es'];

    if (object.value == '') {
        object.value = msg;
    }
}

function OnFocusPass(object) {

    var lang = $("#Body_hdnLang");

    var msg = localizedStrings['passwordMessage'][(lang) ? lang.val() : 'es'];

    if (object.value == msg) {
        object.value = '';
        object.type = 'password';
    }
};

function OnBlurPass(object) {

    var lang = $("#Body_hdnLang");

    var msg = localizedStrings['passwordMessage'][(lang) ? lang.val() : 'es'];

    if (object.value == '') {
        object.value = msg;
        object.type = 'text';
    }
}

var lastUserValid = false;


// Page loaded event
pageLoaded = function () {

    var lang = $("#Body_hdnLang");

    facePhiUserControl.config.culture = lang.val();
    
    if ($("#Body_textBoxPassword").val() != localizedStrings['passwordMessage'][(lang) ? lang.val() : 'es']) 
    {
        $("#Body_textBoxPassword").attr('type', 'password');
    }

};

// Detect architecture
DetectArchitecture = function () {
    var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    
    if (isMac) {
        
        $('#is32').val('');
    }
    else
    {
        var is32BitBrowser = true;
        if (window.navigator.cpuClass != null && window.navigator.cpuClass.toLowerCase() == "x64")
            is32BitBrowser = false;

        if (window.navigator.platform.toLowerCase() == "win64")
            is32BitBrowser = false;

        $('#is32').val(is32BitBrowser);
    }
};

changePage = function () {

    $("changeLink").attr("href", "registro.aspx");

};

changePageRetrain = function () {

    $("Body_linkError").attr("href", "reentrenar.aspx?user=" + $("#Body_textBoxUserName").val());

};

goRegister = function () {

    $('#Body_webUserControl').attr('display', 'none');
    $("registerLink").attr("href", "registro.aspx");

};

GetInterfaceMode = function (skipLiveness) {
	
	showControlSection();
	
	
    /*$.ajax({
        type: 'POST',
        async: 'false',
        url: 'index.aspx/GetInterfaceMode',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function () {
            return false;
        },
        success: function (responsedata) {
            var resultado = responsedata.d;
            if (resultado == 0) {
                // If we are in auth mode: show user control to perform facial extraction
                if (!skipLiveness)
                {
                    showLivenessSection();
                }
                else
                {
                    showControlSection();
                }                   
            }
            else {
                // If we are in retrain mode, send information to validate pin on server
                sendInformation();
            }
        }
    });*/
};

ValidateUserName = function (username) {


      lastUserValid = true;
      GetInterfaceMode(false);
};


sendErrorUserName = function () {

    $('#response').val('1');  // Response 1: error with username
    document.forms[0].submit();

    return false;
};

sendErrorUserNameNotValid = function () {

    $('#response').val('2');  // Response 1: error with username
    document.forms[0].submit();

    return false;
};

sendInformation = function () {

    document.forms[0].submit();

    return false;
};


showDataSection = function () {

    document.forms[0].submit();

};

showControlSection = function () {

    $('#Body_divBack').attr('display', 'none');
    $('#Body_divContent').attr('class', 'mainImage2');
    $('#dataSection').hide();
    $('#livenessSection').hide();
    $('#controlSection').show();
    $('#Body_dataInfo').hide();

    facePhiUserControl.EnableUserControl();

};

showLivenessSection = function () {

    $('#Body_divBack').attr('display', 'none');
    $('#Body_divContent').attr('class', 'mainImage2');
    $('#dataSection').hide();
    $('#livenessSection').show();
    $('#Body_dataInfo').hide();
    

};

// User control cancelled event
facePhiUserControl.events.CancelledDetected = function () {

    showDataSection();

};

// Called when user press on verification button
checkUser = function (email) {

		//var name = GetURLParameter('name');
    console.log("change width...:" );
    //$('#divRegistroContainer').removeAttr("width")
    //$('#divRegistroContainer').attr('width', '300px');
    $('#name').val(email);
    $('#divRegistroContainer').css('width', '300px');
    console.log("user asigned:" +email);
    //ValidateUserName(email);

    lastUserValid = true;
    GetInterfaceMode(false);
        return false;

   
};

// Shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (/* function */callback, /* DOMElement */element) {
              window.setTimeout(callback, 1000 / 60);
          };
})();


window.addEventListener("load", function () {
    
    DetectArchitecture();
    
    DetectOS();
    
    pageLoaded();
    
});

DetectOS = function () {

    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    $('#osName').val(OSName);

    return OSName;
};


checkOption = function () {

    var checkComponent = document.getElementById('Body_photoCheck');

    var username = $("#Body_textBoxUserName").val().trim();

    if (checkComponent.checked)
        SendCheckValue(username, true);
    else
        SendCheckValue(username, false);
};


SendCheckValue = function(username,checkVal) {

    $.ajax({
        type: 'POST',
        async: 'false',
        url: 'index.aspx/StoreCheck',
        data: JSON.stringify({ username: username, checkValue: checkVal }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function () {
            return false;
        },
        success: function (responsedata) {
            return true;
        }
    });

};