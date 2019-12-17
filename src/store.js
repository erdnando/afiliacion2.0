
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {bus} from './main.js'

Vue.use(Vuex)


const etapasSolicitud = () =>{
    return [
        {id:0, logo:'/images/solicitud.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:false,  nombre:'Application', value: 0, query: false, show: true, barra: 'orange' ,visible:false ,objForm:{}  },
        {id:1, logo:'/images/cardid.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Id card', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
        {id:2, logo:'/images/personal.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Personal data', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} },
        {id:3, logo:'/images/firma1.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'I Agree', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
        {id:4, logo:'/images/documentos.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Files', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
        {id:5, logo:'/images/phone.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Phone ref', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} },
        {id:6, logo:'/images/finish.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Complement', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} }
          ]
}

const etapasSolicitudClear = () =>{
  return [
      {id:0, logo: '/images/solicitud.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:false,  nombre:'Application', value: 0, query: false, show: true, barra: 'orange' ,visible:false ,objForm:{}  },
      {id:1, logo: '/images/cardid.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Id card', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
      {id:2, logo: '/images/personal.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Personal data', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} },
      {id:3, logo: '/images/firma1.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'I Agree', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
      {id:4, logo: '/images/documentos.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Files', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
      {id:5, logo: '/images/phone.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Phone ref', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} },
      {id:6, logo: '/images/finish.jpg', form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Complement', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} }
        ]
}


export  default new Vuex.Store({
    state:{
        etapasSolicitud : etapasSolicitud(),
        folioGenerado:'',
        folioGeneradoCategoria:0,
        etapaFin:false,
        mensajeFinalAfiliacion:'',
        filesAdded : ['vbvbvvb'],
        bIdentificacion:false,
        bPersonales:false,
        bAutorizo:false,
        bMesaControl:false,
        bDocumentos:false,
        bRefTelefonicas:false,
        bComplementarios:false,
        bResultados:false,
        bEtapaFin:false,
        ocrData:{},
        nombreBPM:'', 
        apellidosBPM:'', 
        maternoBPM:'',
        fechaDeNacimientoBPM:'', 
        folioBPM:'', 
        emailBPM:'',
        cellPhoneBPM:'', 
        rfcBPM:'', 
        curpBPM:'', 
        numCasoBPM:''
    },
    mutations:{
        generaFolio(state){
          var newFolio= 'F0';
          var randomValue= Math.floor(Math.random() * 99999999) + 10090000;
          state.folioGenerado=newFolio+randomValue;
          state.etapasSolicitud = etapasSolicitud()

          state.folioGeneradoCategoria =0;
        },
        generaIdCategoria(state){
          state.folioGeneradoCategoria =state.folioGeneradoCategoria+1;
        },
        openForm(state, id){
            state.etapasSolicitud[id].visible = true;
        },
        closeForm(state, id){
            state.etapasSolicitud[id].visible = false;
        },
        closeMessageFinal(state, id){
          state.etapaFin = false;
         
       },
        setForm(state,payload){
            var objForm= payload.objForm;
            var idWin= payload.idWin;
            state.etapasSolicitud[idWin].objForm = objForm;

            if(objForm.avance==100){
                state.etapasSolicitud[idWin].iniciarContinuar="filled";
                state.etapasSolicitud[idWin].form.color='green';
                state.etapasSolicitud[idWin].form.avance=objForm.avance;
            }
            else{
                state.etapasSolicitud[idWin].iniciarContinuar="continue";
                state.etapasSolicitud[idWin].form.color='orange';
                state.etapasSolicitud[idWin].form.avance=objForm.avance;
            } 

            if( objForm.avance == 100 && idWin < state.etapasSolicitud.length - 1 ){
             try{
                 console.log("Etapa:"+ objForm.etapa + " completada");
                 state.etapasSolicitud[idWin+1].disabled=false;
                this.objFormAnterior = state.etapasSolicitud[idWin];
             }catch(e){
               //console.log(e);
             }
           }else{
             try{
                state.etapasSolicitud[idWin+1].disabled=true;
             }catch(e){
              // console.log(e);
             }
           }
            state.etapasSolicitud[idWin].visible = false;

           var countTotal=0;
           for(var i=0;i < state.etapasSolicitud.length;i++ ){
             countTotal+= parseInt(state.etapasSolicitud[i].form.avance);
           }
           if(countTotal >= state.etapasSolicitud.length*100 ){
                console.log("Proceso terminado!");
                

             }
        },
        capturaCompleta(state){
                var refTelefonicas = state.etapasSolicitud[5].objForm;
                var personales = state.etapasSolicitud[2].objForm;
                var curpx = (refTelefonicas.rfc+Math.random().toString(36).substring(7).toUpperCase());
                console.log(refTelefonicas);
                console.log(personales);
                console.log(curpx);
                
            
                axios({
                  method: "post",
                  url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/capturaCompleta',
                  timeout: 1000 * 20, // Wait for 20 seconds
                  headers: {
                    "Content-Type": "application/json"
                  },
                  data: {
                    _nombre:personales.nombre, 
                    _paterno:personales.apellidos, 
                    _materno:"", 
                    _fnacimiento:personales.fechaDeNacimiento, 
                    _folio:personales.folio, 
                    _email:personales.email,
                    _telefonoCasa:refTelefonicas.cellPhone, 
                    _rfc:refTelefonicas.rfc, 
                    _curp:curpx, 
                    _casenumber:refTelefonicas.numCaso
                  }
                })
                  .then(response => {
                     console.log(response);
                     bus.$emit('afiliacion.loading.end','');
                    
                     state.mensajeFinalAfiliacion = "<b>Digital file: "+personales.folio+"</b></br>"+response.data;
                     state.etapaFin = true;
                  })
                  .catch(error => {
                    console.log(error);
                    bus.$emit('afiliacion.loading.end','');
                    state.etapaFin = true;
                    state.mensajeFinalAfiliacion = "An error has occurred, please try again";
                });
        },
        async capturaCompletaBPM(state){
          console.log('CAPTURA COMPLETA BPM:::::::');
          
          console.log('nombreBPM:'+state.nombreBPM); 
          console.log('apellidosBPM:' + state.apellidosBPM);
          console.log('maternoBPM:' + state.maternoBPM);
          console.log('fechaDeNacimientoBPM:' + state.fechaDeNacimientoBPM);
          console.log('folioBPM:' + state.folioBPM);
          console.log('emailBPM:' + state.emailBPM);
          console.log('cellPhoneBPM:' + state.cellPhoneBPM);
          console.log('rfcBPM:' + state.rfcBPM);
          console.log('curpBPM:' + state.curpBPM);
          console.log('numCasoBPM:' + state.numCasoBPM);

          var _data = {
                _nombre: state.nombreBPM, 
                _paterno: state.apellidosBPM,
                _materno: state.maternoBPM,
                _fnacimiento: state.fechaDeNacimientoBPM, 
                _folio: state.folioBPM,
                _email: state.emailBPM,
                _telefonoCasa: state.cellPhoneBPM, 
                _rfc: state.rfcBPM, 
                _curp: state.curpBPM, 
                _casenumber: state.numCasoBPM
              };

              console.log(_data);

          //bus.$emit('afiliacion.loading.ini','');
          axios({
            method: "post",
            url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/capturaCompleta',
            timeout: 1000 * 40, // Wait for 20 seconds
            headers: {
              "Content-Type": "application/json"
            },
            data: _data
          })
            .then(response => {
              console.log('Response ws captura completa::::');
              
               console.log(response);
               //bus.$emit('afiliacion.loading.end','');
               //"<b>Afiliación completa.<b></br></br><b>ID CLIENTE:<b>8700014550<BR/><b>NOMBRE:<b>MARGARITA  VELAZQUEZ MAMOARITA</BR>
               //Conserve su Id Cliente. <BR/>Ahora el sistema procede a evaluar su afiliación."
              
            })
            .catch(error => {
              console.log('Error ws captura completa:');
              
              console.log(error);
              //bus.$emit('afiliacion.loading.end','');
          });




  },
        adddigitalFile(state, msg){
          state.filesAdded.push(msg);
        },
    },
    actions:{

    }
})