<template >
  <div class="Identificacion">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card >
        <v-card-title class="grey lighten-2">
          <span class="headline">Card ID</span>
          <span class="subtitle grey--text" >&nbsp;&nbsp;{{subtitulo}}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid style="margin-top: -40px;">

            <!-- caerga de imagenes-->
            <v-layout row inline v-show="vistaUploader">
              <v-flex  md6 lg6 xl6 style="margin-left: -8px;margin-right: 35px;" >
                <uploader categoria="1" v-bind:expediente="expediente" v-bind:imagenFondo="fondoAnverso"></uploader>
              </v-flex>
              <v-flex  md6 lg6 xl6>
                <uploader categoria="2" v-bind:expediente="expediente" v-bind:imagenFondo="fondoReverso"></uploader>
              </v-flex>
            </v-layout>
            <!-- resultados -->
            <v-layout v-show="!vistaUploader" row inline >
                <!-- <v-flex  md6 lg6 xl6 style="margin-left: -8px;margin-right: 35px;" >
                 resultados
                </v-flex> -->
                <v-flex xs12>
                  <v-card color="cyan darken-2" class="white--text">
                    <v-layout>
                      <v-flex xs5>
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                          height="125px"
                          contain
                        ></v-img>
                      </v-flex>
                      <v-flex xs7>
                        <v-card-title primary-title>
                          <div>
                            <div class="headline">Resultados:</div>
                            <div>{{resultadoOCR}}</div>
                          </div>
                        </v-card-title>
                      </v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-card-actions class="pa-3">
                      Rate this album
                      <v-spacer></v-spacer>
                      <v-icon>star_border</v-icon>
                      <v-icon>star_border</v-icon>
                      <v-icon>star_border</v-icon>
                      <v-icon>star_border</v-icon>
                      <v-icon>star_border</v-icon>
                    </v-card-actions>
                  </v-card>
                </v-flex>

            </v-layout>


          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="blue darken-1" flat @click="close(1)">Close</v-btn>
          
          <v-btn v-show="vistaUploader" :disabled="!canProcess" color="blue darken-1" flat @click="cambiaVista">View</v-btn>
          <div v-show="!vistaUploader">
             <v-btn color="blue darken-1" flat @click="retryVista">Retry</v-btn>
             <v-btn color="blue darken-1" flat @click="save(1)">Continue</v-btn>
          </div>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'
 import Uploader from '@/components/afiliacion/NuevaSolicitud/Upload'

   export default {
       components: {
        Uploader
    },
     props:['open'],
     data(){
       return{
          objSolicitud:{
            avance:0,
            color:'orange'
          },
          expediente:'F1000235',
          fondoAnverso:'https://placehold.it/400x300',
          fondoReverso:'https://placehold.it/400x300',
          vistaUploader:true,
          subtitulo:'Load the images and then process them',
          canProcess:false,
          categoriasCargadas:[],
          resultadoOCR:''
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
      retryVista(){
         this.vistaUploader=true;
         this.subtitulo='Load the images and then process them'
         this.canProcess=false;
         this.categoriasCargadas=[];
         this.fondoAnverso='https://placehold.it/400x300',
          this.fondoReverso='https://placehold.it/400x300'
      },
      cambiaVista(){
         this.vistaUploader=false;
         this.subtitulo='Verify the data and continue or retry'
      },
      save(idWin){
        //this.objSolicitud.fechaSolicitud=this.fechaCreacion;
        var porcentaje=0;

        //if(this.objSolicitud.fechaSolicitud.toString().length>0)porcentaje+=25;
        //if(this.objSolicitud.origen.toString().length>0)porcentaje+=25;
        //if(this.objSolicitud.promotor.toString().length>0)porcentaje+=25;
        //if(this.objSolicitud.tienda.toString().length>0)porcentaje+=25;


        this.objSolicitud.avance=porcentaje;
        
        if(porcentaje>=100) this.objSolicitud.color='green';
        else this.objSolicitud.color='orange';

        this.vistaUploader=true;
        this.subtitulo='Load the images and then process them'
        bus.$emit('afiliacion.newSol.setForm',idWin,this.objSolicitud);
      },
      close(idWin){
        this.vistaUploader=true;
        this.subtitulo='Load the images and then process them'
        bus.$emit('afiliacion.newSol.closeForm',idWin,this.objSolicitud);
      }

    },
    created(){
        bus.$on('afiliacion.upload.categoria',(categoria)=>{
              this.categoriasCargadas.push(categoria);

              let unique = [...new Set(this.categoriasCargadas)];
              if(unique.length>=2){
                this.canProcess=true;
              }else{
                console.log("Archivos procesados:"+ unique.length);
              }
        });
        //bus.$emit('afiliacion.upload.documento',response.data,this.categoria);
         bus.$on('afiliacion.upload.documento',(data,categoria)=>{
            // console.log("categoria:"+categoria);
             //console.log(data);
             if(categoria=="1"){
                console.log("solo para anverso");
                var outString = data.ResultadoOCR.replace(/[`~!@#$%^&*()_|+\-=?;:'",.¡’•—‘ç<>\{\}\[\]\\\/]/gi, '');
                var arrDatos = outString.split('\n');
                var salida='';
                  for(var i=0;i< arrDatos.length;i++){
                    if(arrDatos[i].startsWith(' '))continue;
                    if(arrDatos[i].length<5)continue;
                    //console.log("agregando:::-->"+arrDatos[i]+"<--");
                    salida+= arrDatos[i]+" ";
                  }
                  salida=salida.replace("iiic","").replace("aC ir e a","").replace("aeee","").replace("1ILi","").replace("lre","").replace("71s1itljIf","");

                console.log(salida);
                 this.resultadoOCR = salida;
             }
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