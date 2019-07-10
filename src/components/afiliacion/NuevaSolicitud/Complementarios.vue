<template >
  <div class="complementarios">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Complement</span>
           <span class="subtitle orange--text"  >&nbsp;&nbsp; Enter the data</span>
            <v-spacer></v-spacer>
          <span class="body-2 white--text">{{folio}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm5 md5>
                <v-text-field   prepend-inner-icon="how_to_reg" box  color="green" label="Edo civil*" hint="His name, his access" 
                 ref="objForm.edoCivil"  :rules="[() => !!objForm.edoCivil || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objForm.edoCivil"></v-text-field>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field   prepend-inner-icon="how_to_reg"  box  label="RFC*" 
                ref="objForm.rfc"  :rules="[() => !!objForm.rfc || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.rfc"></v-text-field>
              </v-flex>

              <v-flex xs12 sm5 md5>
                <v-text-field   prepend-inner-icon="how_to_reg" box  color="green" label="Country*" hint="His name, his access" 
                 ref="objForm.country"  :rules="[() => !!objForm.country || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objForm.country"></v-text-field>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field   prepend-inner-icon="how_to_reg"  box  label="CURP*" 
                ref="objForm.curp"  :rules="[() => !!objForm.curp || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.curp"></v-text-field>
              </v-flex>



              <v-flex xs12 sm7 md7>
                <v-text-field 
                 prepend-inner-icon="wc"
                ref="objForm.email" 
                v-model="objForm.email" 
                :rules="[() => !!objForm.email || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Email*" hint="" ></v-text-field>
              </v-flex>

             <!-- <v-flex xs12 sm7 md7>
                checkbox1
              </v-flex> -->

              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close(6)">Close</v-btn>
          <v-btn flat color="blue darken-1"  @click="save(6)">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'

   export default {
     props:['open','etapasSolicitud','folio'],
     data(){
       return{
          objForm:{
            etapa:'Complementarios',
            avance:0,
            color:'orange',
            edoCivil:'Casado',
            rfc:'',
            country:'MX',
            curp:'',
            email:''
          },
          errorMessages: '',
          formHasErrors: false
       }
     },
     updated(){
       console.log("cargando formulario...");
     },
     computed:{
      
      form () {
        return {
          edoCivil: this.objForm.edoCivil,
          rfc: this.objForm.rfc,
          country: this.objForm.country,
          curp: this.objForm.curp,
          email: this.objForm.email
        }
      }
     },
     watch: {
      edoCivil () {
        this.errorMessages = ''
      },
      rfc () {
        this.errorMessages = ''
      },
      country () {
        this.errorMessages = ''
      },
      curp () {
        this.errorMessages = ''
      },
      email () {
        this.errorMessages = ''
      }
    },
    methods:{
      save(idWin){
        this.formHasErrors = false
        var isError=false;
         console.log(this.form);
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
       // bus.$emit('afiliacion.newSol.setForm',idWin,this.objForm);
      },
      close(idWin){
        this.updatestatus();
        //bus.$emit('afiliacion.newSol.closeForm',idWin,this.objForm);
        this.$store.commit('closeForm',idWin);
      },
      updatestatus(){
        this.objForm.avance=0;
        var porcentaje=0;
          if(this.objForm.edoCivil.toString().length>0)porcentaje+=20;
          if(this.objForm.rfc.toString().length>0)porcentaje+=20;
          if(this.objForm.country.toString().length>0)porcentaje+=20;
          if(this.objForm.curp.toString().length>0)porcentaje+=20;
          if(this.objForm.email.toString().length>0)porcentaje+=20;
       

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