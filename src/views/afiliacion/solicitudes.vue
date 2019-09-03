<template >
  <div class="solicitudes">
   
    <bandeja-searcher v-bind:solicitudesLength="solicitudes.length" v-bind:pageType="pageType" v-bind:solicitudes="solicitudes"></bandeja-searcher>
    <bandeja-list v-bind:solicitudes="solicitudes" v-bind:pageType="pageType"></bandeja-list>
  </div>
</template>

<script>
import {bus} from '../../main.js'
import BandejaList from '@/components/afiliacion/BandejaList'
import BandejaSearcher from '@/components/afiliacion/BandejaSearcher'
import axios from "axios";

   export default {
    components: {
    BandejaList,BandejaSearcher
    },
    computed:{
      
    },
    mounted () {

     this.getBandejas();
    },
    data () {
    return {
          solicitudes: [],
        pageType:'CARD'
    }
  },
  methods:{
   
     getBandejas(){
       this.solicitudes = [];
       bus.$emit('afiliacion.loading.ini','');

           axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/bandejaBPM',
                timeout: 1000 * 12, // Wait for 45 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  proceso: "afiliacion.process"
                }
              })
                .then(response => {

                  var sol={};
                  var arrTramites = response.data;//4 arrays
                  console.log(response.data);
                  for(var i=0;i< arrTramites.length;i++){//recorre 4
                      var tramite = arrTramites[i]; // un arr de variables
                      // var ProcessInstanceId='';
                      // var Nombre='';
                      // var FechaIni = '';
                      // var idTramite='';
                      // var promotorId='';
                      var imagen='';
                      // var folioExpediente='';
                      // var idTarea = '';
                      
                      var variablesBPM ={};
                      for(var j=0;j< tramite.length;j++){//recorre la n cantidad de variables
                        
                         //var parValue = instancia[j];
                         var nombre= tramite[j].VariableName;
                         var valor= tramite[j].Value;
                         variablesBPM[nombre]=valor; //   .push( {[nombre] :  valor} );

                          // if(parValue.VariableName == 'idTramite') idTramite='100000'+parValue.Value;
                          // if(parValue.VariableName == 'ProcessInstanceId') ProcessInstanceId=parValue.Value;
                          // if(parValue.VariableName == 'fechaIni') FechaIni=parValue.Value;
                          // if(parValue.VariableName == 'promotorId') promotorId=parValue.Value;
                          //  if(parValue.VariableName == 'FolioExpediente') folioExpediente=parValue.Value;
                          //  if(parValue.VariableName == 'Id') idTarea = parValue.Value;

                          // if(parValue.VariableName == 'Name') {
                          //     Nombre=parValue.Value;
                              switch (variablesBPM.Name) {
                                case "Task.Identificacion":imagen= '/images/cardid.jpg'; break;
                                case "Task.Personales":imagen= '/images/personal.jpg'; break;
                                case "Task.Autorizo":imagen= '/images/firma1.jpg'; break;
                                case "Task.Referencias":imagen= '/images/phone.jpg'; break;
                                case "Task.Docs":imagen= '/images/documentos.jpg'; break;
                                case "Task.Resultados":imagen= '/images/finish.jpg'; break;
                                default: imagen='http://lorempixel.com/130/140/';break;
                              }

                              variablesBPM['imagen']=imagen; 
                            //}

                          //

                      }//end 2do loop

                      // console.log('============Variables BPM==========');
                      // console.log(variablesBPM);
                      // console.log('============Variables BPM==========');

                      //  sol = {
                      //     resourcename: '',
                      //     account:variablesBPM.idTramite,
                      //     foto:imagen,
                      //     nombre:variablesBPM.Name,
                      //     fechaIni:variablesBPM.fechaIni,
                      //     promotorId:variablesBPM.promotorId,
                      //     collectionViewUrl:'',
                      //     processInstanceId: 'BPM: '+variablesBPM.ProcessInstanceId,
                      //     folioExpediente:variablesBPM.FolioExpediente,
                      //     idTarea: 'BPM: '+variablesBPM.Id,
                      //     variables: variablesBPM
                      //   };
                   this.solicitudes.push(variablesBPM);
                  }


                  bus.$emit('afiliacion.loading.end','');
                })
                .catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });
     }

  },
  created(){
      bus.$on('changeMode',(modo)=>{
            this.pageType= modo
        }),
      
      bus.$on('search',(consulta)=>{
      
        console.log('-->'+consulta+'<--');
        if(consulta.trim()==''){
          //  start
          this.getBandejas();
       
        }
        else{

           this.solicitudes = [];
           bus.$emit('afiliacion.loading.ini','');

           axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/bandejaBPM',
                timeout: 1000 * 12, // Wait for 45 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  proceso: "afiliacion.process"
                }
              })
                .then(response => {
                  console.log('=============bandejas================');
                  console.log(response.data);
                  var sol={};
                  var arrTramites = response.data;//4 arrays
                 //TODO: aqui llegan todas las variables
                  for(var i=0;i< arrTramites.length;i++){//recorre 4

                       var tramite = arrTramites[i]; // un arr de variables
                      // var ProcessInstanceId='';
                      // var Nombre='';
                      // var FechaIni = '';
                      // var idTramite='';
                      // var promotorId='';
                      var imagen='';
                      // var folioExpediente='';
                      // var idTarea='';

                      var variablesBPM ={};

                      for(var j=0;j< tramite.length;j++){//recorre la n cantidad de variables

                         var nombre= tramite[j].VariableName;
                         var valor= tramite[j].Value;
                         variablesBPM[nombre]=valor; 

                          // if(parValue.VariableName == 'idTramite') idTramite = '100000'+parValue.Value;
                          // if(parValue.VariableName == 'ProcessInstanceId') ProcessInstanceId = parValue.Value;
                          // if(parValue.VariableName == 'fechaIni') FechaIni = parValue.Value;
                          // if(parValue.VariableName == 'promotorId') promotorId = parValue.Value;
                          // if(parValue.VariableName == 'FolioExpediente') folioExpediente = parValue.Value;
                          // if(parValue.VariableName == 'Id') idTarea = parValue.Value;

                          //if(parValue.VariableName == 'Name') {
                            //  Nombre=parValue.Value;
                              switch (variablesBPM.Name) {
                                case "Task.Identificacion":imagen= '/images/cardid.jpg'; break;
                                case "Task.Personales":imagen= '/images/personal.jpg'; break;
                                case "Task.Autorizo":imagen= '/images/firma1.jpg'; break;
                                case "Task.Referencias":imagen= '/images/phone.jpg'; break;
                                case "Task.Docs":imagen= '/images/documentos.jpg'; break;
                                case "Task.Resultados":imagen= '/images/finish.jpg'; break;
                                default: imagen='http://lorempixel.com/130/140/';break;
                              }
                           // }
                              variablesBPM['imagen']=imagen; 
                      }//end 2do loop
  
                      console.log('============Variables BPM==========');
                      console.log(variablesBPM);
                      console.log('============Variables BPM==========');
                      //  sol = {
                      //     resourcename: '',
                      //     account:idTramite,
                      //     foto:imagen,
                      //     nombre:Nombre,
                      //     fechaIni:FechaIni,
                      //     promotorId:promotorId,
                      //     collectionViewUrl:'',
                      //     processInstanceId: 'BPM: '+ProcessInstanceId,
                      //     folioExpediente:folioExpediente,
                      //     idTarea: 'BPM: '+ idTarea
                      //   };
                   this.solicitudes.push(variablesBPM);
                   //----------------------------
                    consulta=consulta.toUpperCase();
                    this.solicitudes = this.solicitudes.filter(function (solicitud) {
                     // console.log(solicitudes);
                      //return solicitud.expediente.toUpperCase().includes(consulta) || solicitud.nombre.toUpperCase().includes(consulta) ||  solicitud.estatus.toUpperCase().includes(consulta) ||  solicitud.account.toString().includes(consulta)
                      if(solicitud.Nombre == undefined)
                      return  solicitud.processInstanceId.toUpperCase().includes(consulta) || solicitud.promotorId.toUpperCase().includes(consulta) ;
                      else
                      return solicitud.Nombre.toUpperCase().includes(consulta) || solicitud.processInstanceId.toUpperCase().includes(consulta) || solicitud.promotorId.toUpperCase().includes(consulta) ;
                    
                    });
                  }
                  bus.$emit('afiliacion.loading.end','');
                })
                .catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });
          // consulta=consulta.toUpperCase();
          // this.solicitudes = this.solicitudes.filter(function (solicitud) {
          //   console.log(solicitudes);
          //   //return solicitud.expediente.toUpperCase().includes(consulta) || solicitud.nombre.toUpperCase().includes(consulta) ||  solicitud.estatus.toUpperCase().includes(consulta) ||  solicitud.account.toString().includes(consulta)
          //   return solicitud.nombre.toUpperCase().includes(consulta) || solicitud.processInstanceId.toUpperCase().includes(consulta) || solicitud.promotorId.toUpperCase().includes(consulta) ;
          // });
        }
        
      });
  }
    
   }  
</script>

<style>

</style>