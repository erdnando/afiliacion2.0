<template >
  <div class="documentos">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card >
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Documents</span>
          <span class="subtitle " style="color:floralwhite;margin-top: 5px;">&nbsp;&nbsp;{{subtitulo}}</span>
           <v-spacer></v-spacer>
          <span class="body-2 white--text">{{variablesBPM.FolioExpediente}}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid style="margin-top: -40px;">

            <!-- caerga de imagenes-->
            <v-layout row inline v-show="vistaUploader">
              <v-flex  md4 lg4 xl4 style="" >
                <uploader-mini categoria="4" v-bind:folio="variablesBPM.FolioExpediente" v-bind:imagenFondo="fondoAnverso" :key="componentKey1"></uploader-mini>
              </v-flex>
              <v-flex  md4 lg4 xl4>
                <uploader-mini categoria="5" v-bind:folio="variablesBPM.FolioExpediente" v-bind:imagenFondo="fondoReverso" :key="componentKey2"></uploader-mini>
              </v-flex>

              <v-flex  md4 lg4 xl4>
                <uploader-mini categoria="6" v-bind:folio="variablesBPM.FolioExpediente" v-bind:imagenFondo="fondoReverso" :key="componentKey3"></uploader-mini>
              </v-flex>

            </v-layout>
            <!-- resultados -->
            <v-layout v-show="!vistaUploader" row inline style="height: 400px;" >
                <!-- <v-flex  md6 lg6 xl6 style="margin-left: -8px;margin-right: 35px;" >
                 resultados
                </v-flex> -->
                <v-flex xs12>
                  <v-card  class="black--text">
                    <v-layout>

                      <v-flex xs6 style="margin-left: -8px;margin-right: 35px;">
                        <!-- <v-img style="margin-top: 5px;margin-left: 8px;width: 351px;max-width:400px;border-radius: 3px;height:300px;" width="400px" height="300px"
                          v-bind:src="fondoAnverso"  contain></v-img> -->
                           <uploader-mini categoria="7" v-bind:folio="variablesBPM.FolioExpediente" v-bind:imagenFondo="fondoPDF" :key="componentKey4"></uploader-mini>
                      </v-flex>

                      <v-flex xs6>
                        <v-card-title primary-title>
                          <div>
                            <div class="headline">Data obtained without structure:</div>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="blue darken-1" flat @click="close(4)">Close</v-btn>
          
          <!-- <v-btn v-show="vistaUploader" :disabled="!canProcess" color="blue darken-1" flat @click="cambiaVista">Add PDF</v-btn> -->
          <!-- <div v-show="!vistaUploader"> -->
             <!-- <v-btn color="blue darken-1" flat @click="cambiaVistaInicial">Back</v-btn> -->
             <v-btn color="blue darken-1"  :disabled="!canProcess" flat @click="save()">Continue</v-btn>
          <!-- </div> -->
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'
 import UploaderMini from '@/components/afiliacion/BPMSolicitud/UploadMini'
 import axios from "axios";

   export default {
       components: {
        UploaderMini
    },
     props:['open','variablesBPM','fondoAnverso'],
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
          componentKey3:0,
          componentKey4:0,
          fondoReverso:'https://placehold.it/200x150',
          fondoPDF:'https://www.chaosium.com/product_images/uploaded_images/pdf-cover-2inch-grey.png',
          vistaUploader:true,
          subtitulo:'Load the images and then process them (jpg,png,bmp) up to 3mb',
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
        this.componentKey3 += 1; 
        this.componentKey4 += 1; 
      },
      retryVista(){
         this.vistaUploader=true;
         this.subtitulo='Load the images and then process them up to 3mb'
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
        //if(this.resultadoOCR == 'loading...')
          //bus.$emit('afiliacion.loading.ini','');

         this.vistaUploader=false;
         this.subtitulo='Load a Pdf document'
      },
      // cambiaVistaInicial(){
      //   //if(this.resultadoOCR == 'loading...')
      //     //bus.$emit('afiliacion.loading.ini','');

      //    this.vistaUploader=true;
      //    this.subtitulo='Load the images and then process them'
      // },
      save(){
       

        this.vistaUploader=true;
        this.subtitulo='Load the images and then process them'
     

        //TODO: move bpm
        // set => Buro, Score & isOk
         bus.$emit('afiliacion.loading.ini','');

        

          var variablesXML="{'variables': { "+
          "'documentos': {'value': '4|5|6','type':'String'},"+
          "'FolioExpediente':{'value':'"+ this.variablesBPM.FolioExpediente +"','type':'String'}    } }";
           console.log(variablesXML);
           
           axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/moveBPM',
                timeout: 1000 * 12, // Wait for 45 seconds
                headers: {"Content-Type": "application/json"},
                data: {
                      instanceId : this.variablesBPM.processInstanceId.replace('BPM: ',''),
                      xml: variablesXML
                }
              })
                .then(response => {

                  var bpmResp = response.data;//4 arra
                  console.log('bpm autorizo');
                  
                  console.log(bpmResp);
                  
                  //reset
                 this.$store.state.bDocumentos = false;
                 this.fondoAnverso='https://placehold.it/200x150';
                 this.fondoReverso='https://placehold.it/200x150';
                 
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
        this.subtitulo='Load the images and then process them up to 3mb'
        this.$store.state.bDocumentos = false;
      }
    },
    created(){
        bus.$on('afiliacion.upload.categoriaBPM',(categoria)=>{
          console.log('doc añadido....');
          
              this.categoriasCargadas.push(categoria);

              let unique = [...new Set(this.categoriasCargadas)];
              console.log(unique.length);

              if(unique.length>=3){
                this.canProcess=true;
                this.porcentaje=100;
                //console.log("Archivos procesados:"+ unique.length);
              }else{
                this.porcentaje=50;
                //console.log("Archivos procesados:"+ unique.length);
              }
        });
         bus.$on('afiliacion.upload.documento',(data,categoria,blobUrl)=>{
             if(categoria=="1"){
                //console.log("solo para anverso");
                if(data==null){bus.$emit('afiliacion.loading.end','');return;}
                if(data.ResultadoOCR==null){bus.$emit('afiliacion.loading.end','');return;}

                var outString = data.ResultadoOCR.replace(/[`~!@#$%^&*()_|+\-=?;:'",.¡’•—‘ç<>\{\}\[\]\\\/]/gi, '');
                var arrDatos = outString.split('\n');
                var salida='';
                  for(var i=0;i< arrDatos.length;i++){
                    if(arrDatos[i].startsWith(' '))continue;
                    if(arrDatos[i].length<5)continue;
                    salida+= arrDatos[i]+" ";
                  }
                  salida=salida.replace("iiic","").replace("aC ir e a","").replace("aeee","").replace("1ILi","").replace("lre","").replace("71s1itljIf","");

                //console.log(salida);
                 this.resultadoOCR = salida;
                 this.fondoAnverso=blobUrl;

                 //console.log(data);
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
              console.log(data,categoria,blobUrl);
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