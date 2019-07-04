<template >
  <div class="Autorizo">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" >
      <v-card  >
        <v-card-title>
          <span class="headline">Autorizo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Creation date*" required v-model="fechaCreacion"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Origin*" hint="" v-model="objSolicitud.origen"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Promotor*"
                  hint="Thanks for generating another request"
                  persistent-hint
                  required v-model="objSolicitud.promotor"
                ></v-text-field>
              </v-flex>

             <v-flex xs12 sm6 md4>
                <v-text-field label="Store*" hint="The store with the most sales in the month" v-model="objSolicitud.tienda"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close(3)">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save(3)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'

   export default {
     props:['open'],
     data(){
       return{
          objSolicitud:{
            avance:0,
            origen:'Store',
            promotor:'Admin',
            tienda:'Roma',
            fechaSolicitud:'',
            color:'orange'
          }
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
        this.objSolicitud.fechaSolicitud=this.fechaCreacion;
        var porcentaje=0;
        if(this.objSolicitud.fechaSolicitud.toString().length>0)porcentaje+=25;
        if(this.objSolicitud.origen.toString().length>0)porcentaje+=25;
        if(this.objSolicitud.promotor.toString().length>0)porcentaje+=25;
        if(this.objSolicitud.tienda.toString().length>0)porcentaje+=25;


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

<style>
.v-dialog {
    position: absolute;
    top: 120px;
}
</style>