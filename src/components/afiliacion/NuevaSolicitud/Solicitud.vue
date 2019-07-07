<template >
  <div class="Solicitud">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">New application</span>
           <span class="subtitle orange--text"  >&nbsp;&nbsp; Verify the data, save and continue with other sections</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm6 md6>
                <v-text-field solo prepend-inner-icon="folder" box disabled="" color="green" label="Folio*" hint="The store with the most sales in the month" v-model="objSolicitud.folio"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field prepend-inner-icon="today" solo box disabled label="Creation date*" required v-model="fechaCreacion"></v-text-field>
              </v-flex>


              <v-flex xs12 sm6 md6>
                <v-text-field
                prepend-inner-icon="assignment_ind"
                 box disabled solo
                  label="Promotor*"
                  hint="Thanks for generating another request"
                  persistent-hint
                  required v-model="objSolicitud.promotor"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field 
                ref="objSolicitud.origen" 
                v-model="objSolicitud.origen" 
                :rules="[() => !!objSolicitud.origen || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Origin*" hint="" ></v-text-field>
              </v-flex>

             <v-flex xs12 sm6 md6>
                <v-text-field 
                ref="objSolicitud.tienda" 
                v-model="objSolicitud.tienda" 
                :rules="[() => !!objSolicitud.tienda || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" prepend-inner-icon="store_mall_directory" box label="Store*" 
                hint="The store with the most sales in the month"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close(0)">Close</v-btn>
          <v-btn flat color="blue darken-1"  @click="save(0)">Save</v-btn>
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
            etapa:'Solicitud',
            avance:0,
            folio:'F1000900',
            origen:'Store',
            promotor:'Admin',
            tienda:'Roma',
            fechaSolicitud:'',
            color:'orange'
          },
          errorMessages: '',
          formHasErrors: false
       }
     },
     computed:{
       fechaCreacion: {
          get:function(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            return today;
         },
         set: function(newValue){
              this.fechaSolicitud=newValue;
         }

         
       },
       form () {
        return {
          origen: this.objSolicitud.origen,
          tienda: this.objSolicitud.tienda
        }
      }

     },
     watch: {
      origen () {
        this.errorMessages = ''
      },
      tienda () {
        this.errorMessages = ''
      }
    },
    methods:{
      save(idWin){

        this.formHasErrors = false
        var isError=false;
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) {
              this.formHasErrors = true
              console.log("-->"+this.formHasErrors);
              isError=true;
              return;
          }
         // this.$refs[f].validate(true)
        });

        if(isError){

          return;
        }


         this.updatestatus();

        bus.$emit('afiliacion.newSol.setForm',idWin,this.objSolicitud);
      },
      close(idWin){

        this.updatestatus();


        bus.$emit('afiliacion.newSol.closeForm',idWin,this.objSolicitud);
      },
      updatestatus(){
        
        this.objSolicitud.avance=0;
        this.objSolicitud.fechaSolicitud=this.fechaCreacion;
        var porcentaje=0;
        if(this.objSolicitud.fechaSolicitud.toString().length>0)porcentaje+=25;
        if(this.objSolicitud.origen.toString().length>0)porcentaje+=25;
        if(this.objSolicitud.promotor.toString().length>0)porcentaje+=25;
        if(this.objSolicitud.tienda.toString().length>0)porcentaje+=25;


        this.objSolicitud.avance=porcentaje;
        
        if(porcentaje>=100) this.objSolicitud.color='green';
        else this.objSolicitud.color='orange';
       
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