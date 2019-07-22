/************************************************************************************************************
* Copyright (c) 2018 FacePhi. All rights reserved.
* This program and the accompanying materials are made available under this terms:
*
* NO WARRANTY
* EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY
* WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
* Each Recipient is solely responsible for determining the appropriateness of using and distributing
* the Program and assumes all risks associated with its exercise of rights under this Agreement, 
* including but not limited to the risks and costs of program errors, compliance with applicable laws,
* damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
*
* DISCLAIMER OF LIABILITY
* EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY
* LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING
* WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR
* DISTRIBUTION OF THE PROGRAM OR THE * EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF 
* THE POSSIBILITY OF SUCH DAMAGES.
************************************************************************************************************/

// Change this values to customize user control properties

facePhiUserControl.config.extractionMode = facePhiUserControlType.extractionMode.Register;
facePhiUserControl.config.width = 450;
facePhiUserControl.config.cropImage = true;
facePhiUserControl.config.cropFactor = 1.6;
facePhiUserControl.config.resizeFactor = 1.6;
facePhiUserControl.config.divId = 'webUserControl';
facePhiUserControl.config.culture = 'en';
facePhiUserControl.config.sceneTimeout = 0;

// User control loaded event
facePhiUserControl.events.UserControlLoaded = function () {

    $('#Body_template').val('');

};


// Extraction finished: check if template is generated and send it to server 
facePhiUserControl.events.ExtractionFinished = function (extractionResult) {

    $('#Body_hdnStep').val(3);


    // We save the second template and we perform a match via AJAX in order to check the register quality.
    if (extractionResult.Template)
    {
        // Element in register form that contains the 2nd user template created
        $('#Body_template').val(extractionResult.Template);

        // Try to show images
        SaveImages(extractionResult);

        $('#step1').hide();

        OnSave();

        // Set selected profile image
        if (picture0 != null && picture0.src.length > 0)
        {
            $('#userPicture').val(picture0.src);
        }
        else
        {
            $('#userPicture').val('');
        }

        $('#response').val('1'); // Response 1: save user
		
		
		
		//template to save
		//console.log('Template:'+extractionResult.Template);
		var template=extractionResult.Template;
		facePhiUserControl.DisableUserControl();
		
		var img = document.createElement('img');
          img.src = picture0.src;
		  img.setAttribute('width', '80%');
        document.getElementById('webUserControl').appendChild(img);
		var name = GetURLParameter('name');
		//console.log('email2facePhi:'+name);
		//console.log('FOTO:'+img.src.replace("data:image/jpeg;base64,", ""));
		var foto=img.src.replace("data:image/jpeg;base64,", "");
		//console.log('FOTO:'+foto);
		//console.log("picture0.src: "+picture0.src);
		//extractionResult.Template   //template
        //picture0.src                //img
		//persist template and image
		//https://sminet.com.mx/Digital.Docs.Service/Service1.svc
		//https://sminet.com.mx/mx.com.stefanini.service.ocr.watson444/Service1.svc/loadFace
		
		 var facephidata = {
            'template64': template,
            'name':name,
            'foto':foto
        }
		
		//console.log("===================");
		console.log(facephidata);
		
		//; charset=utf-8
		 $.ajax({  
					type: 'POST',  
					url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/loadFace',
					data: JSON.stringify(facephidata),
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',						
					success: function (data) {  
                       console.log('ID: '+data);
                       window.parent.facephiIdRegister(name,data);
					},  
					error: function (err) {  
						console.log(err); 
					}  
				}); 
		
	
		
        return true;
    }
    else
    {
        return true;
    }
};


// Exception in the user control event
facePhiUserControl.events.ExceptionCaptured = function (exceptionResult) 
{
    if (exceptionResult && exceptionResult.Message.length > 0)
        $('#exception').val(exceptionResult.Message);

};

// User control timeout event
facePhiUserControl.events.ExtractionTimeout = function () {

    $('#response').val('2'); // Response 2: go register again
    //document.forms[0].submit();

};


// User control cancelled event
facePhiUserControl.events.CancelledDetected = function () {

    $('#response').val('2'); // Response 2: go register again
    //document.forms[0].submit();

};







