<template >
  <div class="Identificacion">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card >
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Card ID</span>
          <span class="subtitle " style="color:floralwhite;margin-top: 5px;">&nbsp;&nbsp;{{subtitulo}}</span>
          <v-spacer></v-spacer>
          <span class="body-2 white--text">{{variablesBPM.FolioExpediente}}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid style="margin-top: -40px;">

            <!-- caerga de imagenes-->
            <v-layout row inline v-show="vistaUploader">
              <v-flex  md6 lg6 xl6 style="margin-left: -8px;margin-right: 35px;" >
                <uploader categoria="1" v-bind:folio="variablesBPM.FolioExpediente" v-bind:imagenFondo="fondoAnverso" :key="componentKey1"></uploader>
              </v-flex>
              <v-flex  md6 lg6 xl6>
                <uploader categoria="2" v-bind:folio="variablesBPM.FolioExpediente" v-bind:imagenFondo="fondoReverso" :key="componentKey2"></uploader>
              </v-flex>
            </v-layout>
            <!-- resultados -->
            <v-layout v-show="!vistaUploader" row inline >
                <!-- <v-flex  md6 lg6 xl6 style="margin-left: -8px;margin-right: 35px;" >
                 resultados
                </v-flex> -->
                <v-flex xs12>
                  <v-card  class="black--text">
                    <v-layout>

                      <v-flex xs6 style="margin-left: -8px;margin-right: 35px;">
                        <v-img style="border-radius: 5px;border-style: solid;border-color: darkgray;border-width: 1px;margin-top: 29px;margin-left: 8px;width: 351px;max-width:400px;height:300px;" width="400px" height="300px"
                          v-bind:src="fondoAnverso"  contain></v-img>
                      </v-flex>

                      <v-flex xs6>
                        <v-card-title primary-title>
                          <div>
                            <div class="headline">Data without structure:</div>
                            <div class="caption font-italic grey--text">{{resultadoOCR}}</div>
                             <div class="headline">Data with structure:</div>
                              <div class=" caption font-weight-regular grey--text">
                                <ul id="ocrEstructuradosDiv">
                                  <li v-for="property in objForm.ocrEstructurados" v-bind:key="property.nombre">
                                    {{ property.nombre }} :  {{ property.valor }}
                                  </li>
                                </ul>
                              </div>
                          </div>
                        </v-card-title>
                      </v-flex>

                    </v-layout>
                    <v-divider light></v-divider>
                  
                  </v-card>
                </v-flex>

            </v-layout>


          </v-container>
          <small v-show="vistaUploader">*click on the box to select an image of your identification </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="blue darken-1" flat @click="close(1)">Close</v-btn>
          
          <v-btn v-show="vistaUploader" :disabled="!canProcess" color="blue darken-1" flat @click="cambiaVista">View</v-btn>
          <div v-show="!vistaUploader">
             <v-btn color="blue darken-1" flat @click="retryVista">Retry</v-btn>
             <v-btn color="blue darken-1" flat @click="save()">Continue</v-btn>
          </div>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js';
import axios from "axios";
import Uploader from '@/components/afiliacion/BPMSolicitud/Upload';

   export default {
       components: {
        Uploader
    },
     props:['open','variablesBPM'],
     data(){
       return{
          objForm:{
            etapa:'Identificacion',
            avance:0,
            color:'orange',
            ocrEstructurados:[{nombre:'...',valor:'loading...'}]
          },
          componentKey1:0,
          componentKey2:0,
          fondoAnverso:'https://placehold.it/400x300',
          fondoReverso:'https://placehold.it/400x300',
          vistaUploader:true,
          subtitulo:'Load the images and then process them',
          canProcess:false,
          categoriasCargadas:[],
          resultadoOCR:'loading...',
          porcentaje:0
       }
     },
     computed:{
       fechaCreacion: function(){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = mm + '/' + dd + '/' + yyyy;
          return today;
       }
     },
    methods:{
      forceRerender() {
        this.componentKey1 += 1;  
        this.componentKey2 += 1;  
      },
      retryVista(){
         this.vistaUploader=true;
         this.subtitulo='Load the images and then process them'
         this.canProcess=false;
         this.categoriasCargadas=[];
         this.fondoAnverso='https://placehold.it/400x300',
         this.fondoReverso='https://placehold.it/400x300',
         this.resultadoOCR='loading...',
         this.objForm.ocrEstructurados=[{nombre:'...',valor:'loading...'}]
         this.forceRerender();
         this.porcentaje=0;
         
      },
      cambiaVista(){
        if(this.resultadoOCR == 'loading...')
          bus.$emit('afiliacion.loading.ini','');

         this.vistaUploader=false;
         this.subtitulo='Verify the data and continue or retry'
      },
      save(){
       
         bus.$emit('afiliacion.loading.ini','');
      
            console.log(this.variablesBPM);
            var d =this.$store.state.ocrData;
           
            console.log(d.fechaDeNacimiento);
            console.log(d.fechaDeNacimientoDIA);
            console.log(d.fechaDeNacimientoMES);
            console.log(d.fechaDeNacimientoANIO);
            
            try{
                d.fechaDeNacimiento = d.fechaDeNacimientoANIO + '-'+ d.fechaDeNacimientoMES + '-'+ d.fechaDeNacimientoDIA;

                var timestamp = Date.parse(d.fechaDeNacimiento);

                if (isNaN(timestamp) == false) {
                  d.fechaDeNacimiento = new Date(timestamp).toISOString().substr(0, 10);
                }
                else{
                    d.fechaDeNacimiento = new Date().toISOString().substr(0, 10);
                }
            }
            catch(error){
              console.log(error);
              
              d.fechaDeNacimiento = new Date().toISOString().substr(0, 10);
            }
           


            var variablesXML="{'variables': { 'OCRProcesado': {'value': true,'type': 'boolean'},'Nombre':{'value':'"+d.Nombre+"','type':'String'},'Materno':{'value':'"+d.Materno+"','type':'String'},'Paterno':{'value':'"+d.Paterno+"','type':'String'},'Sexo':{'value':'"+d.sexo+"','type':'String'},'Calle':{'value':'"+d.calle+"','type':'String'},'NumExt':{'value':'"+d.numeroExt+"','type':'String'},'CP':{'value':'"+d.codigoPostal+"','type':'String'},'Colonia':{'value':'"+d.colonia+"','type':'String'},'ClaveElector':{'value':'"+d.claveElector+"','type':'String'},'Vigencia':{'value':'"+d.vigencia+"','type':'String'},'FechaNac':{'value':'"+d.fechaDeNacimiento+"','type':'String'} } }";
           console.log(variablesXML);
           
           axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/moveBPM',
                timeout: 1000 * 12, // Wait for 45 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                      instanceId : this.variablesBPM.processInstanceId.replace('BPM: ',''),
                      xml: variablesXML
                }
              })
                .then(response => {

                  var bpmResp = response.data;//4 arra

                  //reset
                  this.componentKey1 += 1;  
                  this.componentKey2 += 1;  
                  this.vistaUploader=true;
                  this.resultadoOCR='loading...',
                  this.subtitulo='Load the images and then process them'
                  this.$store.state.bIdentificacion = false;
                  this.objForm.ocrEstructurados=[{nombre:'...',valor:'loading...'}];
                  this.fondoAnverso='https://placehold.it/400x300';
                  this.fondoReverso='https://placehold.it/400x300';
                  

                 //reload
                 bus.$emit('search', '');
                 bus.$emit('afiliacion.loading.end','');
                  
                }).catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });


      },
      close(idWin){
        this.vistaUploader=true;
        this.subtitulo='Load the images and then process them'
        this.$store.state.bIdentificacion = false;
      }
    },
    created(){
        bus.$on('afiliacion.upload.categoria',(categoria)=>{
              this.categoriasCargadas.push(categoria);

              let unique = [...new Set(this.categoriasCargadas)];
              if(unique.length>=2){
                this.canProcess=true;
                this.porcentaje=100;
               // console.log("Archivos procesados:"+ unique.length);
              }else{
                this.porcentaje=50;
               // console.log("Archivos procesados:"+ unique.length);
              }
        });
         bus.$on('afiliacion.upload.documento',(data,categoria,blobUrl)=>{
             if(categoria=="1"){
                //console.log("solo para anverso");
                //console.log(data);
                if(data==null)return;
                if(data.ResultadoOCR==null)return;
                var outString = data.ResultadoOCR.replace(/[`~!@#$%^&*()_|+\-=?;:'",.¡’•—‘ç<>\{\}\[\]\\\/]/gi, '');
                var arrDatos = outString.split('\n');
                var salida='';
                  for(var i=0;i< arrDatos.length;i++){
                    if(arrDatos[i].startsWith(' '))continue;
                    if(arrDatos[i].length<5)continue;
                     if(salida.length>=700)continue;
                    salida+= arrDatos[i]+" ";
                   
                  }
                  salida=salida.replace("iiic","").replace("aC ir e a","").replace("aeee","").replace("1ILi","").replace("lre","").replace("71s1itljIf","");

                 this.resultadoOCR = salida+ "...";
                 this.fondoAnverso=blobUrl;
                 this.objForm.ocrEstructurados=[];
               
                  Object.entries(data).forEach(entry => {
                    let key = entry[0];
                    let value = entry[1];
                    //use key and value here
                    if(key=='ResultadoOCR')return true;
                    if(value=='' || value== null )return true;
                     this.objForm.ocrEstructurados.push({'nombre':key,'valor':value});
                  });
        
                 bus.$emit('afiliacion.loading.end','');
                }
           });

            bus.$on('afiliacion.upload.documento.error',(data,categoria,blobUrl)=>{
             
              
              this.resultadoOCR = "el servicio ha tardado mas de lo esperado. favor de reintentar";
               this.ocrEstructurados=[];
                 bus.$emit('afiliacion.loading.end','');
                
           });
    }
   }
</script>

<style scoped>
.v-dialog {
    position: absolute;
    top: 120px;
}

</style>