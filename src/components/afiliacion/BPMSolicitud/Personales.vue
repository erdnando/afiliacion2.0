<template >
  <div class="Personales">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Personal data</span>
           <span class="subtitle "  style="color:floralwhite;margin-top: 5px;">&nbsp;&nbsp; Verify the data, save and continue with other sections</span>
            <v-spacer></v-spacer>
          <span class="body-2 white--text">{{variablesBPM.FolioExpediente}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm5 md5>
                

                <v-text-field   prepend-inner-icon="how_to_reg" box  color="green" label="Name*" hint="His name, his access" 
                 ref="variablesBPM.Nombre" v-model="variablesBPM.Nombre"  :rules="[() => !!variablesBPM.Nombre || 'This field is required']"
                :error-messages="errorMessages" required 
                :value="variablesBPM.Nombre" @change="updateName"></v-text-field>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field prepend-inner-icon="how_to_reg"  box  label="Last name*" 
                ref="variablesBPM.Paterno" v-model="variablesBPM.Paterno" :rules="[() => !!variablesBPM.Paterno || 'This field is required']"
                :error-messages="errorMessages" required  
                :value="variablesBPM.Paterno" @change="updateApellidos"></v-text-field>
              </v-flex>


              <v-flex xs12 sm5 md5 style="margin-top: 7px;">
                 <v-dialog
                  ref="dialog"
                  v-model="modalFecha"
                  :return-value.sync="variablesBPM.FechaNac"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="variablesBPM.FechaNac"
                      label="Picker in dialog"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="variablesBPM.FechaNac" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modalFecha = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(variablesBPM.FechaNac)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field 
                 prepend-inner-icon="wc"
                ref="variablesBPM.Sexo" 
                v-model="variablesBPM.Sexo" 
                :rules="[() => !!variablesBPM.Sexo || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Sex*" hint="" ></v-text-field>
              </v-flex>

             <v-flex xs12 sm5 md5>
                <v-text-field 
                 prepend-inner-icon="public"
                ref="objForm.nacionalidad" 
                v-model="objForm.nacionalidad" 
                :rules="[() => !!objForm.nacionalidad || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Nationality*" 
                hint="Welcome all countries"></v-text-field>
              </v-flex>

               <v-flex xs12 sm7 md7>
                <v-text-field prepend-inner-icon="location_on"  box  label="Address*" 
                ref="variablesBPM.Calle"  :rules="[() => !!variablesBPM.Calle || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="variablesBPM.Calle"></v-text-field>
              </v-flex>



               <v-flex xs12 sm5 md5>
                <v-text-field autofocus type="email"
                 prepend-inner-icon="wc" background-color="orange" 
                ref="objForm.email" 
                v-model="objForm.email" 
                :rules="[rules.required, rules.email]"
                :error-messages="errorMessages"
                required
                counter maxlength="55" box label="Email*" hint="" ></v-text-field>
              </v-flex>





               <v-flex xs12 sm7 md7>
                <v-text-field prepend-inner-icon="card_giftcard"  box  label="Product*" 
                ref="objForm.producto"  :rules="[() => !!objForm.producto || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.producto"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close(2)">Close</v-btn>
          <v-btn flat color="blue darken-1"  @click="save(2)">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>

import {bus} from '../../../main.js';
import axios from "axios";

   export default {
     props:['open','variablesBPM'],   //'etapasSolicitud',
     data(){
       return{
          objForm:{
            etapa:'Personales',
            avance:0,
            folio:'',
            nombre:'',
            apellidos:'',
            fechaDeNacimiento:'',
            sexo:'H',
            nacionalidad:'MEXICAN',
            direccion:'',
            producto:'Simple credit',
            email:'',
            color:'orange',
            rfc:'',
            materno:'',
            NumExt:'',
            CP:'',
            Colonia:'',
            Municipio:'',
            Ciudad:'',
            claveElector:'',
            domicilioFinal:'',
          },
          asignados:false,
          errorMessages: '',
          formHasErrors: false,
          modalFecha: false,
          fechaNac:new Date().toISOString().substr(0, 10),
          rules: {
            required: value => !!value || 'Required.',
             counter: value => value.length <= 20 || 'Max 20 characters',
            email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.'
            }
        }
       }
     },
     updated(){
      
     },
     mounted(){
        
        
     },
      created(){
      
        
      },
      beforeMount() {
       
       
    },
     computed:{
      
      form () {
        return {
          nombre: this.variablesBPM.Nombre,
          apellidos: this.variablesBPM.Paterno,
          sexo: this.variablesBPM.Sexo,
          nacionalidad: this.objForm.nacionalidad,
          direccion: this.variablesBPM.Calle,
          producto: this.objForm.producto,
          email: this.objForm.email,
          fechaNac: this.variablesBPM.FechaNac
        }
      },
     },
     watch: {
      nombre () {
        this.errorMessages = ''
      },
      apellidos () {
        this.errorMessages = ''
      },
      sexo () {
        this.errorMessages = ''
      },
      nacionalidad () {
        this.errorMessages = ''
      },
      direccion () {
        this.errorMessages = ''
      },
      producto () {
        this.errorMessages = ''
      },
       email () {
        this.errorMessages = ''
      }
    },
    methods:{
      save(idWin){

        //this.objForm.folio=this.folio;
        //this.objForm.fechaDeNacimiento=this.fechaNac;
        this.formHasErrors = false
        var isError=false;
         console.log(this.form);
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) {
              this.formHasErrors = true
              //console.log("-->"+this.formHasErrors);
              console.log('faltan campos');
              
              isError=true;
              return;
          }
        });

        if(isError){
          return;
        }

console.log('saving....');

         this.objForm.rfc ='XXXXXXXXXXXXXXX';
         //this.objForm.nombre = this.variablesBPM.Nombre;
         //this.objForm.apellidos = this.variablesBPM.Paterno;
         //this.objForm.materno = this.variablesBPM.Materno;
        //  this.objForm.NumExt=this.variablesBPM.NumExt;
        //  this.objForm.CP=this.variablesBPM.CP;
        //  this.objForm.Colonia=this.variablesBPM.Colonia;
         this.objForm.Municipio='';
         this.objForm.Ciudad='';
         this.objForm.Estado='';
         this.objForm.claveElector=this.variablesBPM.ClaveElector;



        //TODO: move bpm
         bus.$emit('afiliacion.loading.ini','');

          var variablesXML="{'variables': { "+
          "'Email': {'value': '" + this.objForm.email + "','type':'String'},"+
          "'RFC':{'value':'" + this.objForm.rfc + "','type':'String'},"+
          "'Nombre':{'value':'" + this.variablesBPM.Nombre + "','type':'String'},"+
          "'Paterno':{'value':'" + this.variablesBPM.Paterno + "','type':'String'},"+
          "'Materno':{'value':'" + this.variablesBPM.Materno + "','type':'String'},"+
          "'FechaNac':{'value':'" + this.variablesBPM.FechaNac + "','type':'String'},"+
          "'Sexo':{'value':'" + this.variablesBPM.Sexo + "','type':'String'},"+
          "'Nacionalidad':{'value':'" + this.objForm.nacionalidad + "','type':'String'},"+
          "'Calle':{'value':'" + this.variablesBPM.Calle + "','type':'String'},"+
          "'NumExt':{'value':'" + this.variablesBPM.NumExt + "','type':'String'},"+
          "'CP':{'value':'" + this.variablesBPM.CP + "','type':'String'},"+
          "'Colonia':{'value':'" + this.variablesBPM.Colonia + "','type':'String'},"+
          "'Municipio':{'value':'" + this.objForm.Municipio + "','type':'String'},"+
          "'Ciudad':{'value':'" + this.objForm.Ciudad + "','type':'String'},"+
          "'Estado':{'value':'" + this.objForm.Estado + "','type':'String'},"+
          "'ClaveElector':{'value':'" + this.objForm.claveElector + "','type':'String'}    } }";
           
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
                  console.log('bpm personales');
                  
                  console.log(bpmResp);
                  
                  //reset
                   this.asignados=false;
                  this.$store.state.bPersonales = false;
                  this.objForm.nombre =  '';
                  this.objForm.apellidos='';
                  this.objForm.sexo = '';
                  this.objForm.fechaDeNacimiento = '';
                  this.fechaDeNacimiento = '';
                  this.objForm.direccion ='';
                  this.objForm.nacionalidad = 'MEXICAN';
                  this.objForm.email='';
        
       
                  

                 //reload
                 bus.$emit('search', '');
                 bus.$emit('afiliacion.loading.end','');
                  
                }).catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });
         //this.updatestatus();
        //   var objx={"idWin":idWin,"objForm":this.objForm};
        //   console.log(objx);
        //  this.$store.commit('setForm',objx);
       // bus.$emit('afiliacion.newSol.setForm',idWin,this.objForm);
      },
      close(idWin){
        //this.updatestatus();
        //bus.$emit('afiliacion.newSol.closeForm',idWin,this.objForm);
        //this.$store.commit('closeForm',idWin);
        //reset

         //this.asignados=false;
         //console.log('asignados false..');
         
        this.$store.state.bPersonales = false;
        this.objForm.email='';
        
       
       
         this.objForm.nacionalidad = 'MEXICAN';
       
      },
      updatestatus(){
        this.objForm.avance=0;
        var porcentaje=0;
         if(this.objForm.nombre.toString().length>0)porcentaje+=14;
        if(this.objForm.apellidos.toString().length>0)porcentaje+=14;
        if(this.objForm.sexo.toString().length>0)porcentaje+=14;
        if(this.objForm.nacionalidad.toString().length>0)porcentaje+=14;
        if(this.objForm.direccion.toString().length>0)porcentaje+=14;
        if(this.objForm.producto.toString().length>0)porcentaje+=14;
        if(this.objForm.email.toString().length>0)porcentaje+=16;

        this.objForm.avance=porcentaje;
        if(porcentaje>=100) this.objForm.color='green';
        else this.objForm.color='orange';
      },
    updateName (valor) {
      //console.log(valor);
      this.variablesBPM.Nombre=valor;
    },
    updateApellidos(valor){
      this.variablesBPM.Paterno=valor;
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