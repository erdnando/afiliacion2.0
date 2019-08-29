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

facePhiUserControl.config.extractionMode = facePhiUserControlType.extractionMode.Authenticate;
facePhiUserControl.config.width = 300;
facePhiUserControl.config.cropImage = true;
facePhiUserControl.config.cropFactor = 1.6;
facePhiUserControl.config.resizeFactor = 1.6;
facePhiUserControl.config.divId = 'webUserControl';
facePhiUserControl.config.culture = 'es';
facePhiUserControl.config.sceneTimeout = 0;

// User control timeout event
facePhiUserControl.events.UserControlLoaded = function () {
    $('#template').val('');
};

// Extraction finished: check if template is generated and send it to server 
facePhiUserControl.events.ExtractionFinished = function (extractionResult) {
console.log("en ExtractionFinished...");
console.log(extractionResult.Template);
    if (extractionResult.Template) {
//https://sminet.com.mx/facephihtml5auth/index.html?name=erdnando@gmail.com
        //$('#template').val(extractionResult.Template);
       var template=extractionResult.Template;
        SaveImages(extractionResult);
        //var name = $('#name').val();
        var name = GetURLParameter('name');
        console.log('usuario:' + name);
        // Set selected profile image
		//https://sminet.com.mx/Digital.Docs.Service/Service1.svc/
		https://sminet.com.mx/mx.com.stefanini.service.ocr.watson/Service1.svc/authFace
        if (picture0 != null && picture0.src.length > 0)
        {
			//console.log("template-->"+template);//picture0.src);
			//console.log("img64-->"+picture0.src);//picture0.src);
			$.ajax({  
					type: "POST",  
					url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc//authFace',
					data: JSON.stringify({ "template64":template, "name":name, "foto":picture0.src.replace('data:image/jpeg;base64,','')}),
					contentType: "application/json; charset=utf-8",
					dataType: "json",						
					success: function (data) {  
						 
					   //console.log('======================');
					   console.log('resultado: '+data);
                      // console.log('======================');
                      window.parent.facephiAuthOK();
                     //en lo q se habilita la licencia
                    //    if(data=='Valido')
                    //     window.parent.facephiAuthOK();
                    //    else 
                    //     window.parent.facephiAuthKO();
					},  
					error: function (err) {  
						console.log(err);
					}  
				}); 
	
           

        }
        

		
	
    }
    else{
        console.log("invalido por null,..");
        window.parent.facephiAuthKO();
    }
    
};

// Exception in the user control event
facePhiUserControl.events.ExceptionCaptured = function (exceptionResult) {
    
    if (exceptionResult && exceptionResult.Message.length > 0)
        $('#exception').val(exceptionResult.Message);
    
};


// User control timeout event
facePhiUserControl.events.ExtractionTimeout = function () {

    //document.forms[0].submit();

};



var picture0; var picture1; var picture2; var picture3; var picture4;
// Saves the images that has been got with the user control
SaveImages = function (args)
{
    if (!args.Images)
    {
        picture0 = null;
        picture1 = null;
        picture2 = null;
        picture3 = null;
        picture4 = null;
    }
    else
    {
        picture0 = (args.Images.length > 0) ? args.Images[0] : null;
        picture1 = (args.Images.length > 1) ? args.Images[1] : null;
        picture2 = (args.Images.length > 2) ? args.Images[2] : null;
        picture3 = (args.Images.length > 3) ? args.Images[3] : null;
        picture4 = (args.Images.length > 4) ? args.Images[4] : null;
    }
};














