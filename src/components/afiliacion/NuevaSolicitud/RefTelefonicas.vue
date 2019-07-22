<template >
  <div class="Reftelefonicas">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Phone references</span>
           <span class="subtitle " style="color:floralwhite;margin-top: 5px;" >&nbsp;&nbsp; Enter phone numbers and wait for your validation</span>
            <v-spacer></v-spacer>
          <span class="body-2 white--text">{{folio}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>




              <v-flex xs12 sm7 md7>
                <v-text-field autofocus mask="phone"  
                prepend-inner-icon="local_phone"
                box  color="green" label="Home homePhone*" 
                 ref="objForm.homePhone"  :rules="[() => !!objForm.homePhone || 'This field is required with 10 digits']"
                :error-messages="errorMessagesHomePhone" 
                required 
                v-model="objForm.homePhone"
                hint="Remember that the number must be 10 digits">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm5 md5>
                  <v-btn  :loading="loading" :disabled="loading"  :color="colorBoton" @click="onering1" style="height: 55px;margin-top: 1px;">
                   <v-icon center dark>local_phone</v-icon>
                  </v-btn>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field  mask="phone" 
                prepend-inner-icon="local_phone"  
                box  color="green" label="Cell Phone*" 
                ref="objForm.cellPhone"  :rules="[() => !!objForm.cellPhone || 'This field is required with 10 digits']"
                 :error-messages="errorMessagesCellPhone" 
                 required  
                v-model="objForm.cellPhone"
                hint="Remember that the number must be 10 digits">
                </v-text-field>
              </v-flex>

               <v-flex xs12 sm5 md5>
                  <v-btn  :loading="loading2" :disabled="loading2"  :color="colorBoton2" @click="onering2" style="height: 55px;margin-top: 1px;">
                   <v-icon center dark>local_phone</v-icon>
                  </v-btn>
              </v-flex>


              <v-flex xs12 sm7 md7>
                <v-text-field 
                 prepend-inner-icon="wc"
                ref="objForm.fullName" 
                v-model="objForm.fullName" 
                :rules="[() => !!objForm.fullName || 'This field is required']"
                required
                counter maxlength="25" box label="Full name reference*" hint="" ></v-text-field>
              </v-flex>

             <v-flex xs12 sm7 md7>
                <v-text-field 
                 prepend-inner-icon="public"
                ref="objForm.parentesco" 
                v-model="objForm.parentesco" 
                :rules="[() => !!objForm.parentesco || 'This field is required']"
                required
                counter maxlength="25" box label="Relationship*" 
                hint="Your family can support you"></v-text-field>
              </v-flex>

              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close(5)">Close</v-btn>
          <v-btn flat color="blue darken-1" :disabled="!todoOK"  @click="save(5)">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'
import axios from "axios";

   export default {
     props:['open','etapaPersonales','folio'],
     data(){
       return{
          objForm:{
            etapa:'RefTelefonicas',
            avance:0,
            color:'orange',
            homePhone:'',
            cellPhone:'',
            homePhoneStatus:"",
            cellPhoneStatus:"",
            fullName:'Andrea Jimenez Mendez',
            parentesco:'Hermana',
            folioBuro:'',
            numCaso:'',
            rfc:''
          },
          errorMessagesHomePhone: '',
          errorMessagesCellPhone:'',
          errorMessages:'',
          formHasErrors: false,
          loader: null,
          loading: false,
          loading2: false,
           colorBoton:'indigo white--text',
           colorBoton2:'indigo white--text',
           todoOK : false,
      marker: true,

       }
     },
     updated(){
       
     },
     computed:{
      
      form () {
        return {
          homePhone: this.objForm.homePhone,
          cellPhone: this.objForm.cellPhone,
          fullName: this.objForm.fullName,
          parentesco: this.objForm.parentesco
        }
      }
     },
     watch: {
      homePhone () {
        this.errorMessagesHomePhone = ''
      },
      cellPhone () {
        this.errorMessagesCellPhone = ''
      },
      fullName () {
        this.errorMessages = ''
      },
      parentesco () {
        this.errorMessages = ''
      },
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    methods:{
      onering1(){
        //console.log("onering1...");
        if(this.objForm.homePhone.length<10){
          this.errorMessagesHomePhone='This field is required with 10 digits'
          return
        }
        this.errorMessagesHomePhone=''
          this.loading=true;
          this.homePhoneStatus='';
          console.log("calling...");
          this.calling(this.objForm.homePhone,1);
      },
      onering2(){
       // console.log("onering2...");
        if(this.objForm.cellPhone.length<10){
          this.errorMessagesCellPhone='This field is required with 10 digits'
          return
        }
        this.errorMessagesCellPhone=''
          this.loading2=true;
           this.cellPhoneStatus='';
          console.log("calling...");
          this.calling(this.objForm.cellPhone,2);
      },
      sleep(delay){
        var start = new Date().getTime();
        while(new Date().getTime() < start + delay);
      },
       async calling(telefono,tipoTelefono){
          axios({
                method: "post",
                url: 'https://sminet.com.mx/OneRingService/Service1.svc/postCall',
                timeout: 1000 * 10, // Wait for 10 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  telefono: telefono
                }
              })
                .then(response => {
                   console.log("SID...");
                   console.log(response.data.Sid);
                  console.log("sleeping...");
                  this.sleep(1500);
                   console.log("wake up...intentarPedirOneRing intento 0");
                  this.intentarPedirOneRing(response.data.Sid, tipoTelefono, 0);

                })
                .catch(error => {
                  console.log(error);
                  
                  if(tipoTelefono==1){
                        this.homePhoneStatus="invalido";
                        this.loading=false;
                        this.colorBoton='red white--text'
                     }
                     else if(tipoTelefono==2){
                        this.cellPhoneStatus="invalido";
                         this.loading2=false;
                         this.colorBoton2='red white--text'
                     }
              });
    },
    async intentarPedirOneRing(sid,tipoTelefono, intentos){
          axios({
                method: "post",
                url: 'https://sminet.com.mx/OneRingService/Service1.svc/estatus',
                timeout: 1000 * 5, // Wait for 5 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  sid: sid
                }
              })
                .then(response => {
                 // console.log("respuesta de estatus...");
                 // console.log(response.data.Status);
                   if(response.data.Status == 'Válido'){
                     //intentos = 6;
                     console.log("telefono valido!!!!!");
                     if(tipoTelefono==1){
                        this.homePhoneStatus="valido";
                        this.loading=false;
                        this.colorBoton='green white--text'
                     }
                     else if(tipoTelefono==2){
                        this.cellPhoneStatus="valido";
                         this.loading2=false;
                         this.colorBoton2='green white--text'
                     }
                       this.todoOK=true;

                     return;

                   }else if(intentos < 5){
                      console.log("sleeping ...");
                      this.sleep(1500);
                      console.log("wake up...intentarPedirOneRing intento "+intentos);

                      console.log("volviendo a reintentar..."+ (intentos+1));
                     this.intentarPedirOneRing(response.data.Sid, tipoTelefono, intentos+1);
                     return;
                   }else{
                     
                     if(tipoTelefono==1){
                        this.homePhoneStatus="invalido";
                        this.loading=false;
                        this.colorBoton='red white--text'
                     }
                     else if(tipoTelefono==2){
                        this.cellPhoneStatus="invalido";
                         this.loading2=false;
                         this.colorBoton2='red white--text'
                     }
                   }
                 
                  
                })
                .catch(error => {
                  console.log(error);
                  //bus.$emit('afiliacion.upload.documento.error');
              });
    },
     async precalifica(idWin){

       //TODO
       //get data from previous steps
          // console.log(this.etapaPersonales.objForm.nombre);
          // console.log(this.etapaPersonales.objForm.apellidos);
          // console.log(this.etapaPersonales.objForm.fechaDeNacimiento);
          // console.log(this.folio);
          // console.log(this.etapaPersonales.objForm.email);
          bus.$emit('afiliacion.loading.ini','');
          axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/precalifica',
                timeout: 1000 * 10, // Wait for 10 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  nombre:this.etapaPersonales.objForm.nombre, 
                  paterno:this.etapaPersonales.objForm.apellidos, 
                  materno:"", 
                  fnacimiento:this.etapaPersonales.objForm.fechaDeNacimiento, 
                  folio:this.folio, 
                  email:this.etapaPersonales.objForm.email
                }
              })
                .then(response => {
                  //  console.log("precalifica response...");
                  //  console.log(response.data.folioBuro);
                  //  console.log(response.data.numCaso);
                  //  console.log(response.data.rfc);
                  this.savePrecalifica(idWin,response.data)
                   bus.$emit('afiliacion.loading.end','');
                })
                .catch(error => {
                  console.log(error);
                  bus.$emit('afiliacion.loading.end','');
              });
    },
      save(idWin){
        //console.log("saving ref telefonicas...");
        this.formHasErrors = false
        var isError=false;
         //console.log(this.form);
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) {
              this.formHasErrors = true
             // console.log(f);
              //this.errorMessages = f
             // console.log("-->"+this.formHasErrors);
              
              isError=true;
              return;
          }
          //this.$refs[f].validate(true);
        });

        if(isError){
          return;
          }
        //console.log(this.homePhoneStatus);
        if(this.homePhoneStatus != "valido" ){
            this.errorMessagesHomePhone='The phone must be validated before';
            return;
        }
        //console.log(this.cellPhoneStatus);
        if(this.cellPhoneStatus != "valido"){
             this.errorMessagesCellPhone='The phone must be validated before';
             return;
        }

        
         this.updatestatus();
          var objx={"idWin":idWin,"objForm":this.objForm};
         this.$store.commit('setForm',objx);

         this.precalifica(idWin);
       
      },
      savePrecalifica(idWin,data){
        console.log("saving precalifica...");
       this.objForm.folioBuro=data.folioBuro;
       this.objForm.numCaso=data.numCaso;
       this.objForm.rfc=data.rfc;
        
        var objx={"idWin":idWin,"objForm":this.objForm};
        this.$store.commit('setForm',objx);
        bus.$emit('afiliacion.loading.end','');
      },
      close(idWin){
        this.updatestatus();
        //bus.$emit('afiliacion.newSol.closeForm',idWin,this.objForm);
        this.$store.commit('closeForm',idWin);
      },
      updatestatus(){
        this.objForm.avance=0;
        var porcentaje=0;
         if(this.objForm.cellPhone.toString().length>0)porcentaje+=25;
        if(this.objForm.homePhone.toString().length>0)porcentaje+=25;
        if(this.objForm.fullName.toString().length>0)porcentaje+=25;
        if(this.objForm.parentesco.toString().length>0)porcentaje+=25;
       

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