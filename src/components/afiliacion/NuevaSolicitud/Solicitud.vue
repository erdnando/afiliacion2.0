<template >
  <div class="Solicitud">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">New application</span>
           <span class="subtitle"  style="color:floralwhite;margin-top: 5px;">&nbsp;&nbsp; Verify the data, save and continue with other sections </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm6 md6>
                <v-text-field solo prepend-inner-icon="folder" box disabled="" color="green" label="Folio*" hint="The store with the most sales in the month" 
                v-model="folio"></v-text-field>
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
                  required v-model="objForm.promotor"
                ></v-text-field>
              </v-flex>

              <!-- <v-flex xs12 sm6 md6>
                <v-text-field 
                ref="objForm.origen" 
                v-model="objForm.origen" 
                :rules="[() => !!objForm.origen || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Origin*" hint="" ></v-text-field>
              </v-flex> -->

             <v-flex xs12 sm6 md6>
                <v-text-field 
                ref="objForm.tienda" 
                v-model="objForm.tienda" 
                :rules="[() => !!objForm.tienda || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" prepend-inner-icon="store_mall_directory" box label="Store*" 
                hint="The store with the most sales in the month"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
          <br>
          <small>*some data has been pre-filled for the purposes of the demo</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close(0)">Close</v-btn>
          <v-btn flat color="blue darken-1"  @click="save(0)">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
//import {bus} from '../../../main.js'

   export default {
     props:['open','folio'],
     data(){
       return{
          objForm:{
            etapa:'Solicitud',
            avance:0,
            folio:'',
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
          origen: this.objForm.origen,
          tienda: this.objForm.tienda
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

        this.objForm.folio=this.folio;
        this.formHasErrors = false
        var isError=false;
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) {
              this.formHasErrors = true
              console.log("-->"+this.formHasErrors);
              isError=true;
              return;
          }
        });
        if(isError){
          return;
        }
         this.updatestatus();

        var objx={"idWin":idWin,"objForm":this.objForm};
         this.$store.commit('setForm',objx);
      },
      close(idWin){
        this.updatestatus();
        this.$store.commit('closeForm',idWin);
      },
      updatestatus(){
        this.objForm.avance=0;
        this.objForm.fechaSolicitud=this.fechaCreacion;
        var porcentaje=0;
        if(this.objForm.fechaSolicitud.toString().length>0)porcentaje+=25;
        if(this.objForm.origen.toString().length>0)porcentaje+=25;
        if(this.objForm.promotor.toString().length>0)porcentaje+=25;
        if(this.objForm.tienda.toString().length>0)porcentaje+=25;

        this.objForm.avance=porcentaje;
        
        if(porcentaje>=100) this.objForm.color='green';
        else this.objForm.color='orange';
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