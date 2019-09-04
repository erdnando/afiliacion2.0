<template >
  <div class="complementarios">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title  class="indigo lighten">
          <span class="headline white--text">Your query to buro was successful!</span>
           <span class="subtitle "  style="color:floralwhite;margin-top: 5px;">&nbsp;&nbsp; Continue with missing information</span>
            <v-spacer></v-spacer>
          <span class="body-2 white--text">{{variablesBPM.FolioExpediente}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

               <v-flex xs12 sm6 md6>
                <v-text-field readonly background-color="green"  prepend-inner-icon="offline_pin" box  color="white" label="Folio buro*" 
                hint="Congratulations, your query to buro was successful!" 
                 ref="objForm.folioBuro"  :rules="[() => !!objForm.folioBuro || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objForm.folioBuro"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field readonly background-color="green" prepend-inner-icon="playlist_add_check"  box  color="white" label="Scoring*" hint="It's a great scoring"
                ref="objForm.scoring"  :rules="[() => !!objForm.scoring || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.scoring"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field  readonly background-color="green" prepend-inner-icon="business"  box  color="white" label="Case number*" hint="Your credit core code"
                ref="objForm.numCaso"  :rules="[() => !!objForm.numCaso || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.numCaso"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field   prepend-inner-icon="how_to_reg" box  color="green" label="Edo civil*" hint="His name, his access" 
                 ref="objForm.edoCivil"  :rules="[() => !!objForm.edoCivil || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objForm.edoCivil"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field disabled  prepend-inner-icon="perm_contact_calendar"  box  label="RFC*" 
                ref="objForm.rfc"  :rules="[() => !!objForm.rfc || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.rfc"></v-text-field>
              </v-flex>

              <v-flex xs12 sm4 md4>
                <v-text-field disabled  prepend-inner-icon="public" box  color="green" label="Country*" hint="His name, his access" 
                 ref="objForm.country"  :rules="[() => !!objForm.country || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objForm.country"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field  disabled prepend-inner-icon="perm_contact_calendar"  box  label="CURP*" 
                ref="objForm.curp"  :rules="[() => !!objForm.curp || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.curp"></v-text-field>
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
          <v-btn flat color="blue darken-1"  @click="save(6)">Send application</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'

   export default {
     props:['open','variablesBPM'],
     data(){
       return{
          objForm:{
            etapa:'Complementarios',
            avance:0,
            color:'orange',
            edoCivil:'Casado',
            rfc:'',
            folioBuro:'',
            numCaso:'',
            country:'MX',
            curp:'',
            scoring:'972'
          },
          errorMessages: '',
          formHasErrors: false
       }
     },
     updated(){
       //console.log("cargando formulario...");
        var arrPrecalifica = {};//this.etapaTelefonica.objForm;
        //console.log(this.etapaTelefonica);
        
         this.objForm.rfc = arrPrecalifica.rfc;
         this.objForm.folioBuro = arrPrecalifica.folioBuro;
         this.objForm.numCaso = arrPrecalifica.numCaso;

         

     },
     beforeUpdate(){
             // console.log("cargando curp...");
         this.objForm.curp = this.variablesBPM.rfc + this.generaHomoclave();
     },
     computed:{
      
      form () {
        return {
          edoCivil: this.objForm.edoCivil,
          rfc: this.objForm.rfc,
          country: this.objForm.country,
          curp: this.objForm.curp,
          folioBuro:this.objForm.folioBuro,
          scoring:this.objForm.scoring,
          numCaso:this.objForm.numCaso
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
      folioBuro () {
        this.errorMessages = ''
      },
      scoring () {
        this.errorMessages = ''
      },
      numCaso () {
        this.errorMessages = ''
      }
    },
    methods:{
      generaHomoclave(){
        return Math.random().toString(36).substring(9).toUpperCase();
      },
      save(idWin){
        this.formHasErrors = false
        var isError=false;
         //console.log(this.form);
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) {
              this.formHasErrors = true
              //"-->"+this.formHasErrors);
              isError=true;
              return;
          }
        });

        if(isError){
          return;
        }
         this.updatestatus();

          var objx={"idWin":idWin,"objForm":this.objForm};

         // console.log("setForm complementarios...objx");
          //console.log(objx);
         this.$store.commit('setForm',objx);

          bus.$emit('afiliacion.loading.ini','');
          this.$store.commit('capturaCompleta');
      },
      close(idWin){
        this.updatestatus();
        this.$store.commit('closeForm',idWin);
      },
      updatestatus(){
        this.objForm.avance=0;
        var porcentaje=0;
          if(this.objForm.edoCivil.toString().length>0)porcentaje+=14;
          if(this.objForm.rfc.toString().length>0)porcentaje+=14;
          if(this.objForm.country.toString().length>0)porcentaje+=14;
          if(this.objForm.curp.toString().length>0)porcentaje+=14;
          if(this.objForm.folioBuro.toString().length>0)porcentaje+=14;
          if(this.objForm.scoring.toString().length>0)porcentaje+=16;
          if(this.objForm.numCaso.toString().length>0)porcentaje+=14;
       

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