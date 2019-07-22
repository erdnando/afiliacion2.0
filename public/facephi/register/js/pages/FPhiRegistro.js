
var forbiddenList = ["user", "usuario", "name", "nombre", "surname", "apellido", "1234", "admin", "administrador", "administrator", "asdf", "root", "facephi", "selphi", "face", "facial"];

var localizedStrings =
{

    pressMessage:
    {
        'es': 'Comprobando la calidad de las características registradas...',
        'en': 'Checking samples quality...'
    },
    pathPhoto:
    {
        'es': 'img/usuariaoff.jpg',
        'en': 'img/useroff.jpg'
    },
    enterUserMessage:
    {
        'es': 'Usuario',
        'en': 'Username'
    },
    enterUserError:
    {
        'es': 'Usuario no válido',
        'en': 'User not valid'
    },
    enterNameMessage:
    {
        'es': 'Nombre',
        'en': 'Name'
    },
    enterNameError:
    {
        'es': 'Nombre no válido',
        'en': 'Name not valid'
    },
    enterSurnameMessage:
    {
        'es': 'Apellidos',
        'en': 'Surname'
    },
    enterSurnameError:
    {
        'es': 'Apellidos no válidos',
        'en': 'Surname not valid'
    },
    enterPasswordMessage:
    {
        'es': 'Password',
        'en': 'Password'
    },
    enterPasswordError:
    {
        'es': 'Password incorrecto.',
        'en': 'Password not valid.'
    },
    fourChars:
    {
        'es': 'Se necesitan al menos 4 caracteres.',
        'en': 'At least four chars are needed.'
    },
    fourDigits:
    {
        'es': 'Se necesitan 4 dígitos.',
        'en': 'Four digits are needed.'
    },
    alreadyExists:
    {
        'es': 'El usuario ya existe.',
        'en': 'User already exists.'
    }

};

// Detect architecture
DetectArchitecture = function () {

    var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    if (isMac) {

        $('#is32').val('');

    }
    else {
        var is32BitBrowser = true;
        if (window.navigator.cpuClass != null && window.navigator.cpuClass.toLowerCase() == "x64")
            is32BitBrowser = false;

        if (window.navigator.platform.toLowerCase() == "win64")
            is32BitBrowser = false;

        $('#is32').val(is32BitBrowser);
    }
};

function OnFocus1(object) {

    object.className = 'field';

    var lang = $("#Body_hdnLang");

    var msg = localizedStrings['enterUserMessage'][(lang) ? lang.val() : 'es'];
    var msgError = localizedStrings['enterUserError'][(lang) ? lang.val() : 'es'];
    var msgError2 = localizedStrings['alreadyExists'][(lang) ? lang.val() : 'es'];
    var msgError3 = localizedStrings['fourChars'][(lang) ? lang.val() : 'es'];

    if (object.value == msg || object.value == msgError || object.value == msgError2 || object.value == msgError3) {
        object.value = '';
    }

};

function OnBlur1(object) {

    var lang = $("#Body_hdnLang");

    var msg = localizedStrings['enterUserMessage'][(lang) ? lang.val() : 'es'];

    if (object.value == '') {
        object.value = msg;
    }
}

function OnFocus2(object) {

    object.className = 'field';

    var lang = $("#Body_hdnLang");

    var msg = localizedStrings['enterNameMessage'][(lang) ? lang.val() : 'es'];
    var msgError = localizedStrings['enterNameError'][(lang) ? lang.val() : 'es'];

    if (object.value == msg || object.value == msgError) {

        object.value = '';
    }
};

function OnBlur2(object) {
    
    var lang = $("#Body_hdnLang");

    var msg = localizedStrings['enterNameMessage'][(lang) ? lang.val() : 'es'];

    if (object.value == '') {
        object.value = msg;
    }
}

function OnFocus3(object) {

    object.className = 'field';

    var lang = $("#Body_hdnLang");
    
    var msg = localizedStrings['enterSurnameMessage'][(lang) ? lang.val() : 'es'];
    var msgError = localizedStrings['enterSurnameError'][(lang) ? lang.val() : 'es'];

    if (object.value == msg || object.value == msgError) {

        object.value = '';
    }
};

function OnBlur3(object) {
    
    var lang = $("#Body_hdnLang");
    var msg = localizedStrings['enterSurnameMessage'][(lang) ? lang.val() : 'es'];

    if (object.value == '') {
        object.value = msg;
    }
}

function OnFocus4(object) {

    var lang = $("#Body_hdnLang");
    
    var msg = localizedStrings['enterPasswordMessage'][(lang) ? lang.val() : 'es'];
    var msgError = localizedStrings['enterPasswordError'][(lang) ? lang.val() : 'es'];

    if (object.value == msgError) {
        return;
    }

    object.className = 'field';
    object.value = '';
    object.type = 'password';

    if (object.value == msg || object.value == msgError) {

        object.value = '';
    }
};


function OnCheckTermsClick(object) {

    var lang = $("#Body_hdnLang");
    var termsHelp = $("#Body_lblTermsHelp");
    var termsHelp2 = $("#Body_lblTermsHelp2");

    if (object.checked) {

        termsHelp.attr('class', 'termsHidden');
        termsHelp2.attr('class', 'termsHidden');
        return;
    }

    termsHelp.attr('class', 'termsVisible');
    termsHelp2.attr('class', 'termsVisible2');
};


ValidateFields = function () {

var hasError = false;
    var terms = document.getElementById("CheckTerms");
    var lang = $("#Body_hdnLang");
    var name = $("#Body_TextBoxName");
    var surname = $("#Body_TextBoxSurname");
    var username = $("#Body_TextBoxUserName");
    var pin = $("#Body_TextBoxPassword");
    var termsHelp = $("#Body_lblTermsHelp");
    var termsHelp2 = $("#Body_lblTermsHelp2");
	
	 name.attr('class', 'field');
    surname.attr('class', 'field');
    username.attr('class', 'field');
    pin.attr('class', 'field');
    termsHelp.attr('class', 'termsHidden');
    termsHelp2.attr('class', 'termsHidden');
	
    /*var hasError = false;
    var terms = document.getElementById("CheckTerms");
    var lang = $("#Body_hdnLang");
    var name = $("#Body_TextBoxName");
    var surname = $("#Body_TextBoxSurname");
    var username = $("#Body_TextBoxUserName");
    var pin = $("#Body_TextBoxPassword");
    var termsHelp = $("#Body_lblTermsHelp");
    var termsHelp2 = $("#Body_lblTermsHelp2");

    name.attr('class', 'field');
    surname.attr('class', 'field');
    username.attr('class', 'field');
    pin.attr('class', 'field');
    termsHelp.attr('class', 'termsHidden');
    termsHelp2.attr('class', 'termsHidden');

    if (!terms.checked) {
        termsHelp.attr('class', 'termsVisible');
        termsHelp2.attr('class', 'termsVisible2');
        return false;
    } else {
        termsHelp.attr('class', 'termsHidden');
        termsHelp2.attr('class', 'termsHidden');
    }

    if (!name.val().trim()) {

        name.val(localizedStrings['enterNameError'][(lang) ? lang.val() : 'es']);
        name.attr('class', 'fieldError');
        hasError = true;
    }


    var usedName = name.val().toLowerCase();

    if (forbiddenList.indexOf(usedName) > -1 || HasWhiteSpace(usedName)) {

        name.val(localizedStrings['enterNameError'][(lang) ? lang.val() : 'es']);
        name.attr('class', 'fieldError');
        hasError = true;
    }


    if (name.val() == localizedStrings['enterNameError'][(lang) ? lang.val() : 'es']) {

        name.val(localizedStrings['enterNameError'][(lang) ? lang.val() : 'es']);
        name.attr('class', 'fieldError');
        hasError = true;
    }

    if (name.val() == localizedStrings['enterNameMessage'][(lang) ? lang.val() : 'es']) {

        name.val(localizedStrings['enterNameError'][(lang) ? lang.val() : 'es']);
        name.attr('class', 'fieldError');
        hasError = true;
    }

    var usedSurname = surname.val().toLowerCase();

    if (forbiddenList.indexOf(usedSurname) > -1 || HasWhiteSpace(usedSurname)) {

        surname.val(localizedStrings['enterSurnameError'][(lang) ? lang.val() : 'es']);
        surname.attr('class', 'fieldError');
        hasError = true;
    }

    if (!surname.val().trim()) {

        surname.val(localizedStrings['enterSurnameError'][(lang) ? lang.val() : 'es']);
        surname.attr('class', 'fieldError');
        hasError = true;
    }

    if (surname.val() == localizedStrings['enterSurnameError'][(lang) ? lang.val() : 'es']) {

        surname.val(localizedStrings['enterSurnameError'][(lang) ? lang.val() : 'es']);
        surname.attr('class', 'fieldError');
        hasError = true;
    }

    if (surname.val() == localizedStrings['enterSurnameMessage'][(lang) ? lang.val() : 'es']) {

        surname.val(localizedStrings['enterSurnameError'][(lang) ? lang.val() : 'es']);
        surname.attr('class', 'fieldError');
        hasError = true;
    }


    var usedUserName = username.val().toLowerCase();

    if (forbiddenList.indexOf(usedUserName) > -1 || HasWhiteSpace(usedUserName)) {

        username.val(localizedStrings['enterUserError'][(lang) ? lang.val() : 'es']);
        username.attr('class', 'fieldError');
        hasError = true;
    }

    if (username.val().trim().length < 4) {

        username.val(localizedStrings['fourChars'][(lang) ? lang.val() : 'es']);
        username.attr('class', 'fieldError');
        hasError = true;
    }

    if (username.val() == localizedStrings['fourChars'][(lang) ? lang.val() : 'es']) {

        username.val(localizedStrings['fourChars'][(lang) ? lang.val() : 'es']);
        username.attr('class', 'fieldError');
        hasError = true;
    }

    if (username.val() == localizedStrings['enterUserError'][(lang) ? lang.val() : 'es']) {

        username.val(localizedStrings['enterUserError'][(lang) ? lang.val() : 'es']);
        username.attr('class', 'fieldError');
        hasError = true;
    }

    if (username.val().toLowerCase() == 'usuario') {

        username.val(localizedStrings['enterUserMessage'][(lang) ? lang.val() : 'es']);
        username.attr('class', 'fieldError');
        hasError = true;
    }
    
    if (username.val().toLowerCase() == 'username') {

        username.val(localizedStrings['enterUserMessage'][(lang) ? lang.val() : 'es']);
        username.attr('class', 'fieldError');
        hasError = true;
    }

    if (!IsNumeric(pin.val())) {

        pin.val(localizedStrings['fourDigits'][(lang) ? lang.val() : 'es']);
        pin.attr('class', 'fieldError');
        pin.attr('type', 'text');
        hasError = true;
    }

    if (pin.val().length != 4) {

        pin.val(localizedStrings['fourDigits'][(lang) ? lang.val() : 'es']);
        pin.attr('class', 'fieldError');
        pin.attr('type', 'text');
        hasError = true;
    }
  
    if (!hasError)
        ValidateUserNameRegister(username.val());
*/
	//alert(username.val());
	ValidateUserNameRegister(username.val());
    //alert('devuelve ahora');
    return false;
};

ShowPopUpLegal = function() {
    
    $('#facePhiPop1').modal({
        keyboard: false
    });

    $('#facePhiPop1').modal('show');

    $('#facePhiPop1').on('hidden.bs.modal', function (e) {

        if ($('#response').val() == '3')
        {
            var terms = document.getElementById("CheckTerms");
            terms.checked = true;
        }

        if ($('#response').val() == '4')
        {
            var terms = document.getElementById("CheckTerms");
            terms.checked = false;
        }

    });

    return false;

}


IsNumeric = function (input) {
    return (input - 0) == input && (input + '').replace(/^\s+|\s+$/g, '').length > 0;
};

IsValidEmailAddress = function (emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

$(document).ready(

    function () {
        var step = $('#Body_hdnStep');

        if (step.val() == 1) {
            $('#step2').hide();
            $('#step1').show();
        }

        if (step.val() == 2 || step.val() == 3) {
            $('#step1').hide();
            $('#step2').show();
        }

        if (step.val() == 4) {
            $('#step1').hide();
            $('#step2').hide();
        }
    }
);

window.onload = function () {

    DetectArchitecture();

    DetectOS();

    facePhiUserControl.config.culture = $("#Body_hdnLang").val();

};

var picture0; var picture1; var picture2; var picture3; var picture4;
// Saves the images that has been got with the user control
SaveImages = function (args) {
    if (!args.Images) {

        picture0 = null;
        picture1 = null;
        picture2 = null;
        picture3 = null;
        picture4 = null;
    }
    else {

        picture0 = (args.Images.length > 0) ? args.Images[0] : null;
        picture1 = (args.Images.length > 1) ? args.Images[1] : null;
        picture2 = (args.Images.length > 2) ? args.Images[2] : null;
        picture3 = (args.Images.length > 3) ? args.Images[3] : null;
        picture4 = (args.Images.length > 4) ? args.Images[4] : null;
    }
};


Dec2Hex = function (dec) {
    return dec.toString(16);
};

Hex2Dec = function (hex) {
    return parseInt(hex, 16);
};


ValidateUserNameRegister = function (username) {
	
	$('#Body_TextBoxUserName').attr('class', 'field');

                $('#step1').hide();
                $('#step2').show();

                facePhiUserControl.EnableUserControl();

				
				
                $('#Body_divContent').attr('class', 'mainImage2');
                $('#Body_hdnStep').val('2');
				
                return true;
	
	
	
   /* $.ajax({
        type: 'POST',
        async: 'false',
        url: 'registro.aspx/ValidateUserName',
        data: JSON.stringify({ username: username }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function () {
            return false;
        },
        success: function (responsedata) {

            var lang = $("#Body_hdnLang");

            if (responsedata.d == 0)
            {
                // Username NOT EXISTS in database: we can start the enroll process
                $('#Body_TextBoxUserName').attr('class', 'field');

                $('#step1').hide();
                $('#step2').show();

                facePhiUserControl.EnableUserControl();

                $('#Body_divContent').attr('class', 'mainImage2');
                $('#Body_hdnStep').val('2');

                alert('can start');
                return true;
            }
            else
            {
                // Username already EXISTS in database: error
                $('#Body_TextBoxUserName').val(localizedStrings['alreadyExists'][(lang) ? lang.val() : 'es']);
                $('#Body_TextBoxUserName').attr('class', 'fieldError');
                alert('cannot start');
                return false;
            }
        }
    });*/
};


var saving = false;
OnSave = function () {
    
    if (saving) return false;
    saving = true;

    $('#ImageWait').attr('visibility', 'Visible');
    $('#Body_TextBoxName').attr('disabled', false);
    $('#Body_TextBoxSurname').attr('disabled', false);
    $('#Body_TextBoxUserName').attr('disabled', false);
    $('#Body_TextBoxPassword').attr('disabled', false);
    return true;
    
};

DetectOS = function() {

    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    $('#osName').val(OSName);

    return OSName;
};

HasWhiteSpace = function (s) {

    return /\s/g.test(s);

}



