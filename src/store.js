
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)


const etapasSolicitud = () =>{
    return [
        {id:0, form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:false,  nombre:'Solicitud', value: 0, query: false, show: true, barra: 'orange' ,visible:false ,objForm:{}  },
        {id:1, form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Identificacion', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
        {id:2, form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Personales', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} },
        {id:3, form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Autorizo', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
        {id:4, form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Documentos', value: 0, query: false, show: true, barra: 'orange',visible: false ,objForm:{} },
        {id:5, form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Ref.Telefonicas', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} },
        {id:6, form:{'color':'orange','avance':'0'}, iniciarContinuar:'START', disabled:true,  nombre:'Complementa', value: 0, query: false, show: true, barra: 'orange' ,visible: false,objForm:{} }
          ]
}


export  default new Vuex.Store({
    state:{
        etapasSolicitud : etapasSolicitud(),
        folioGenerado:''
    },
    mutations:{
        generaFolio(state){
          var newFolio= 'F0';
          var randomValue= Math.floor(Math.random() * 99999999) + 10090000;
          state.folioGenerado=newFolio+randomValue;
          state.etapasSolicitud = etapasSolicitud()
        },
        openForm(state, id){
            state.etapasSolicitud[id].visible = true;
        },
        closeForm(state, id){
            state.etapasSolicitud[id].visible = false;
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

            if(objForm.avance==100 && idWin<state.etapasSolicitud.length-1){
             try{
                 console.log("Etapa:"+ objForm.etapa + " completada");
                 state.etapasSolicitud[idWin+1].disabled=false;
                this.objFormAnterior = state.etapasSolicitud[idWin];
             }catch(e){
               console.log(e);
             }
           }else{
             try{
                state.etapasSolicitud[idWin+1].disabled=true;
             }catch(e){
               console.log(e);
             }
           }
            state.etapasSolicitud[idWin].visible = false;

           var countTotal=0;
           for(var i=0;i<state.etapasSolicitud.length;i++){
             countTotal+= parseInt(state.etapasSolicitud[i].form.avance);
           }
           if(countTotal>=state.etapasSolicitud.length*100){
                console.log("Proceso terminado!");
                //TODO
                //implement axios call in actions section

                var refTelefonicas = state.etapasSolicitud[5].objForm;
                var personales = state.etapasSolicitud[2].objForm;

                console.log(refTelefonicas); 
                console.log(personales); 
                var curpx = (refTelefonicas.rfc+Math.random().toString(36).substring(7).toUpperCase());
                console.log(curpx);
              
                //---------------Axios------------------
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
                     console.log("send to core ...");
                     console.log(response);
                  })
                  .catch(error => {
                    console.log("error en send to core ...");
                    console.log(error);
                });











             }
        }
    },
    actions:{

    }
})