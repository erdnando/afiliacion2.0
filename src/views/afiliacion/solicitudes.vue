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
                  var arrInstancias = response.data;//4 arrays

                  for(var i=0;i< arrInstancias.length;i++){//recorre 4

                      var instancia = arrInstancias[i]; // un arr de variables
                      var ProcessInstanceId='';
                      var Nombre='';
                      var FechaIni = '';
                      var idTramite='';
                      var promotorId='';
                      var imagen='';

                      for(var j=0;j< instancia.length;j++){//recorre la n cantidad de variables

                         var parValue = instancia[j];
                         //console.log(parValue);

                          if(parValue.VariableName == 'idTramite') idTramite='100000'+parValue.Value;
                          if(parValue.VariableName == 'ProcessInstanceId') ProcessInstanceId=parValue.Value;
                          if(parValue.VariableName == 'fechaIni') FechaIni=parValue.Value;
                          if(parValue.VariableName == 'promotorId') promotorId=parValue.Value;
                          if(parValue.VariableName == 'Name') {
                              Nombre=parValue.Value;
                              switch (Nombre) {
                                case "Task.Identificacion":imagen= '/images/cardid.jpg'; break;
                                case "Task.Personales":imagen= '/images/personal.jpg'; break;
                                case "Task.Autorizo":imagen= '/images/firma1.jpg'; break;
                                case "Task.Referencias":imagen= '/images/phone.jpg'; break;
                                case "Task.Docs":imagen= '/images/documentos.jpg'; break;
                                case "Task.Resultados":imagen= '/images/finish.jpg'; break;
                                default: imagen='http://lorempixel.com/130/140/';break;
                              }
                            }

                          //

                      }//end 2do loop

                       sol = {
                          resourcename: '',
                          account:idTramite,
                          foto:imagen,
                          nombre:Nombre,
                          fechaIni:FechaIni,
                          promotorId:promotorId,
                          collectionViewUrl:'',
                          processInstanceId: 'BPM'+ProcessInstanceId
                        };
                   this.solicitudes.push(sol);
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

                  var sol={};
                  var arrInstancias = response.data;//4 arrays

                  for(var i=0;i< arrInstancias.length;i++){//recorre 4

                      var instancia = arrInstancias[i]; // un arr de variables
                      var ProcessInstanceId='';
                      var Nombre='';
                      var FechaIni = '';
                      var idTramite='';
                      var promotorId='';
                      var imagen='';

                      for(var j=0;j< instancia.length;j++){//recorre la n cantidad de variables

                         var parValue = instancia[j];

                          if(parValue.VariableName == 'idTramite') idTramite='100000'+parValue.Value;
                          if(parValue.VariableName == 'ProcessInstanceId') ProcessInstanceId=parValue.Value;
                          if(parValue.VariableName == 'fechaIni') FechaIni=parValue.Value;
                          if(parValue.VariableName == 'promotorId') promotorId=parValue.Value;
                          if(parValue.VariableName == 'Name') {
                              Nombre=parValue.Value;
                              switch (Nombre) {
                                case "Task.Identificacion":imagen= '/images/cardid.jpg'; break;
                                case "Task.Personales":imagen= '/images/personal.jpg'; break;
                                case "Task.Autorizo":imagen= '/images/firma1.jpg'; break;
                                case "Task.Referencias":imagen= '/images/phone.jpg'; break;
                                case "Task.Docs":imagen= '/images/documentos.jpg'; break;
                                case "Task.Resultados":imagen= '/images/finish.jpg'; break;
                                default: imagen='http://lorempixel.com/130/140/';break;
                              }
                            }

                      }//end 2do loop

                       sol = {
                          resourcename: '',
                          account:idTramite,
                          foto:imagen,
                          nombre:Nombre,
                          fechaIni:FechaIni,
                          promotorId:promotorId,
                          collectionViewUrl:'',
                          processInstanceId: 'BPM'+ProcessInstanceId
                        };
                   this.solicitudes.push(sol);
                   //----------------------------
                    consulta=consulta.toUpperCase();
                    this.solicitudes = this.solicitudes.filter(function (solicitud) {
                     // console.log(solicitudes);
                      //return solicitud.expediente.toUpperCase().includes(consulta) || solicitud.nombre.toUpperCase().includes(consulta) ||  solicitud.estatus.toUpperCase().includes(consulta) ||  solicitud.account.toString().includes(consulta)
                      return solicitud.nombre.toUpperCase().includes(consulta) || solicitud.processInstanceId.toUpperCase().includes(consulta) || solicitud.promotorId.toUpperCase().includes(consulta) ;
                    
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