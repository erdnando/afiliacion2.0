
import Vue from 'vue'
import Vuex from 'vuex'

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
                alert("Proceso terminado!");
             }
        }
    },
    actions:{

    }
})