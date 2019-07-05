<template >
  <div class="Identificacion">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" >
      <v-card >
        <v-card-title>
          <span class="headline">Card ID</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid style="margin-top: -40px;">


      <v-layout row inline>
        <!-- -->
        <v-flex  md6 lg6 xl6 style="margin-left: -8px;margin-right: 35px;" >
          <uploader categoria="1" v-bind:expediente="expediente" v-bind:imagenFondo="fondoAnverso"></uploader>
        </v-flex>
        <v-flex  md6 lg6 xl6>
          <uploader categoria="2" v-bind:expediente="expediente" v-bind:imagenFondo="fondoReverso"></uploader>
        </v-flex>
    </v-layout>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close(1)">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save(1)">Save</v-btn>
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
          expediente:'F1000234',
          fondoAnverso:'https://placehold.it/400x300',
          fondoReverso:'https://placehold.it/400x300'
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

        bus.$emit('afiliacion.newSol.setForm',idWin,this.objSolicitud);
      },
      close(idWin){
        bus.$emit('afiliacion.newSol.closeForm',idWin,this.objSolicitud);
      }

    },
  
  }
</script>

<style scoped>
.v-dialog {
    position: absolute;
    top: 120px;
}

</style>