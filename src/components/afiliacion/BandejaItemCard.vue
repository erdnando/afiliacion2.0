<template >
  <div class="BandejaItemCard"  >
     <v-layout justify-center>
    <v-flex xs12 sm12>
           <v-layout row wrap> 
            <v-flex  v-for="solicitud in solicitudes" :key="solicitud.idTramite" xs6 md4 lg3 xl2 class="card" style="">
               <v-card  style="margin:4px;  -webkit-box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;">  
               <div v-ripple>
               <v-container fluid grid-list-md style="padding:8px">
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6 md4>
                     <v-img  :src="solicitud.imagen" height="80px" width="auto"></v-img>
                  </v-flex>

                  <v-flex d-flex xs12 sm6 md8>
                    <v-layout row wrap>
                      <v-flex d-flex >
                         <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                  <span  v-on="on" class="body-1 black--text font-weight-medium" v-text="cutName(solicitud.Name)"></span>
                          </template>
                            <span>{{solicitud.Name}}</span>
                        </v-tooltip>
                      </v-flex>
                      <v-flex d-flex>
                         <span class="caption black--text" v-text= "'100000'+solicitud.idTramite"></span>
                      </v-flex>
                      <v-flex d-flex>
                         <span class="caption black--text font-weight-medium" v-text="addLabel(solicitud.FolioExpediente,'File:')"></span>
                          <span class="caption black--text" v-text="formatFecha(solicitud.fechaIni)"></span>
                      </v-flex>
                      <v-flex d-flex>
                        
                          <span style="font-size:10px!important;margin-left: 0px;" class="caption black--text" v-text="armaNombre(solicitud.Nombre, solicitud.Paterno, solicitud.Materno)"></span>
                      </v-flex>

                    </v-layout>
                  </v-flex>
                 
                </v-layout>
                
              </v-container>  
              </div>
              <v-divider></v-divider>
                
                <v-card-actions class="pa-1 white lighten grey--text" style="height:28px;background-color: silver !important;">
                  <v-spacer></v-spacer>
                    <span style="font-size:10px!important;margin-left: 10px;position: absolute;" class="caption black--text" v-text="solicitud.ProcessInstanceId"></span>
                  <v-btn @click="openForm(solicitud.ProcessInstanceId , solicitud.Name,solicitud.FolioExpediente, solicitud)" icon>
                    <v-icon>folder_shared</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
           </v-layout> 
    </v-flex>
  </v-layout>


  
  
<identificacion v-bind:open="this.$store.state.bIdentificacion" v-bind:variablesBPM="this.variablesBPM"></identificacion>
<personales v-bind:open="this.$store.state.bPersonales" v-bind:variablesBPM="this.variablesBPM"></personales>
<autorizo v-bind:open="this.$store.state.bAutorizo" v-bind:variablesBPM="this.variablesBPM"></autorizo>
<mesa-control v-bind:open="this.$store.state.bMesaControl"  v-bind:variablesBPM="this.variablesBPM"  v-bind:resultadosSOLR="this.resultadosSOLR" v-bind:variablesBPMList="this.variablesBPMList"></mesa-control>
<documentos v-bind:open="this.$store.state.bDocumentos" v-bind:variablesBPM="this.variablesBPM" v-bind:fondoAnverso="this.$store.state.fondoAnverso"></documentos>
<ref-telefonicas v-bind:open="this.$store.state.bRefTelefonicas" v-bind:variablesBPM="this.variablesBPM"></ref-telefonicas>
<resultados v-bind:open="this.$store.state.bResultados" v-bind:variablesBPM="this.variablesBPM" v-bind:cardNumber="this.cardNumber"></resultados>
  </div>
</template>

<script>

import Identificacion from '@/components/afiliacion/BPMSolicitud/Identificacion'
import Personales from '@/components/afiliacion/BPMSolicitud/Personales'
import Autorizo from '@/components/afiliacion/BPMSolicitud/Autorizo'
import MesaControl from '@/components/afiliacion/BPMSolicitud/MesaControl'
import Documentos from '@/components/afiliacion/BPMSolicitud/Documentos'
import RefTelefonicas from '@/components/afiliacion/BPMSolicitud/RefTelefonicas'
import Resultados from '@/components/afiliacion/BPMSolicitud/Resultados'

import {bus} from '../../main.js';
import axios from "axios";

   export default {
    components: {
    Identificacion,Personales,Autorizo,MesaControl,Documentos,RefTelefonicas,Resultados
    },
    data(){
        return{
           expediente:'',
           processInstanceId:'',
           variablesBPM : {},
           resultadosSOLR:[],
           variablesBPMList:[],
           cardNumber:'',
          //  fondoAnverso:'https://placehold.it/200x150',
        }
    },
    props:['solicitudes'],
    methods:{
      formatFecha(fecha){
        var d = new Date(fecha);
        return d.getFullYear()+'/'+ this.addZero(d.getMonth())+'/'+ this.addZero(d.getDay());
      },
      armaNombre(nombre, paterno, materno){
        if(nombre == undefined ) nombre = '';
        if(paterno == undefined) paterno = '';
        if(materno == undefined) materno = '';

        if(nombre == 'null' || paterno == 'null' || materno == 'null') return 'OCR ...';


        if(nombre+paterno+materno == '')
         return 'New application';
        else
         return nombre+' '+paterno+' '+materno;
         //nombre.substring(0,14)+"...";
      },
      addZero(valor){
        if(valor < 10) return '0'+valor;
        else return valor;
      },
      openForm(_processInstanceId , _step, _expediente, _variables){
       //debugger;
        this.variablesBPM = _variables;
       this.$store.state.fondoReverso='https://placehold.it/200x150';
       this.$store.state.fondoAnverso='https://placehold.it/200x150';
        
        switch (_step) {
          case 'Task.Identificacion':
            this.$store.state.bIdentificacion=true;
            break;
          case 'Task.Personales':
            this.$store.state.bPersonales=true;
            break;
          case 'Task.Autorizo':
            this.$store.state.bAutorizo=true;
            break
          case 'Task.MesaControl':
            this.$store.state.bMesaControl=true;
            this.cargaExpediente();
            break
          case 'Task.Referencias':
            this.$store.state.bRefTelefonicas=true;
            break
          case 'Task.Docs':
            this.$store.state.bDocumentos=true;
            break
          case 'Task.Resultados':
            this.$store.state.bResultados=true;
            this.generaCardNumber();

            break
          default:
            break;
        }

        this.expediente=_expediente;
            this.processInstanceId=_processInstanceId;

      },
      cutName(nombre){
        nombre = nombre.replace('Task.','Step ');
      
        if(nombre.trim().length>15)
         return nombre.substring(0,10)+"...";
         else return nombre;
      },
      setIcon(estatus){
        if(estatus=='Aprobado'){
          return 'thumb_up_alt';
        }else{
          return 'thumb_down_alt';
        }
      },
       getColor(estatus){
        if(estatus=='Aprobado'){
          return 'green lighten-1';
        }else{
          return 'red lighten-1';
        }
      },
      addLabel(valor, label){
           return label+' '+valor;
      },
      generaCardNumber(){

        var terminacion = Math.random(100).toString().substring(2,6);
         this.cardNumber = '4152 3132 9791 '+ terminacion;
      },
      cargaExpediente(){
        bus.$emit('afiliacion.loading.ini','');
        jsonObj =[];
        this.resultados = [];
        var jsonObj = [];
       
            jsonObj.push({'Q':this.variablesBPM.FolioExpediente});
            jsonObj.push({'Q':''});
  
        //cal ws solr
        this.consultaSolr(jsonObj);
      },  
      tieneExtension(valor){
        var arrPath = valor.split('.');
        if(arrPath.length==1) return false;
        
        var ext=arrPath[arrPath.length-1].toUpperCase();
        if(ext =='DOCX' || ext =='XLSX'  || ext =='PDF'  || ext =='TXT'  || ext =='DOC' || ext =='XLS' || ext =='JPEG'){
            return true;
        }
        else{
            console.log("extension no soportada");
            return false;
        }
    },
      async consultaSolr(objConsulta){
        
          axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/selectm',
                timeout: 1000 * 20, // Wait for 10 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  querys: objConsulta
                }
              })
                .then(response => {

                   console.log(response.data.response.docs);
                   var arrR= response.data.response.docs;

                   //remove records without extension
                   for(var i = arrR.length - 1; i >= 0; i--) {
                      if( !this.tieneExtension(arrR[i].id)) {
                          arrR.splice(i, 1);
                      }
                  }

                  this.variablesBPMList=[];
                  this.resultadosSOLR = arrR;
                  
                  Object.entries(this.variablesBPM).forEach(entry => {
                    let key = entry[0];
                    let value = entry[1];

                    if(key == 'imagen' || key == 'Name' || key == 'Id'|| key == 'ClaveElector'|| key == 'OCRProcesado'|| key == 'isOK'|| key == 'processInstanceId'|| key == 'Ciudad' || key == 'RFC'|| key == 'Estado'|| key == 'Municipio'|| key == 'fechaIni'|| key == 'Vigencia'|| key == 'Colonia' || key == 'idTramite' || key == 'Score'|| key == 'Buro' || key == 'ProcessInstanceId')
                    console.log('omitido...'+ key);
                    else
                     this.variablesBPMList.push({'variable':key,'valor':value.toUpperCase()});

                  });

                  bus.$emit('afiliacion.loading.end','');
                })
                .catch(error => {
                  console.log(error);
                  bus.$emit('afiliacion.loading.end','');
              });
    },    

    }
    
  }
</script>

<style>
.card:hover, article.media-wrap:hover {
  box-shadow: 0 0 20px rgba(33, 33, 33, 0.5);
  border-radius: 5px;
  
}

.cardIcon:hover {
  box-shadow: 0 0 20px rgba(23, 180, 9, 1);
  border-radius: 5px;
  cursor: pointer;
}

.cardIconEstatus:hover {
  border-radius: 5px;
  cursor: none;
}
</style>