<template >
  <div class="krece">
   
    
     <v-container fluid >
     
       <section>
        <v-parallax :src="section1" height="420">
          <v-layout column align-center justify-center >
            <div class="display-2 white--text mb-1 text-xs-center" style="margin-top: 35px;" >KRECE B2B Plataform</div>
            <em class="headline">Ecosystem between Investors and applicants</em>

                <v-btn  class="green lighten-1"  dark large @click="invite" style="margin-top:70px">
                  Create an entry pass to Krece
                </v-btn>
                <v-text-field autofocus @keyup.enter="invite"  box type="email" style="background-color:ghostwhite;max-height:55px;width:304px"
                  prepend-inner-icon="email"
                  ref="email" 
                  v-model="email" 
                  :rules="[rules.required, rules.email]"
                  :error-messages="errorMessages"
                  required
                  counter maxlength="25"  label="Email*" hint="" >
                </v-text-field>
            
          </v-layout>
        </v-parallax>
      </section>

        <section>
        <v-layout column wrap class="my-1" align-center>

          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">zoom_in</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Digital channels</div>
                    </v-card-title>
                    <v-card-text>
                      The vast majority of banks believe that by 2020 most of their sales operations will have shifted from their branches to digital channels, mostly web and mobile applications.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">domain</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">End-to-end digital origination</div>
                    </v-card-title>
                    <v-card-text>
                      Strong digital sales capabilities and streamlined, end-to-end digital origination processes must play an integral role in any strategy. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">scatter_plot</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">New digital entrants</div>
                    </v-card-title>
                    <v-card-text>
                      In the short-term high-turnover products such as credit cards, loans and payments will most likely undergo the most rapid digital transformation. In fact, these are the areas most under attack from new digital entrants. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
       
       
        <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">monetization_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Onboarding experience</div>
                    </v-card-title>
                    <v-card-text>
                      The process of winning new customers and new business happens in a variety of ways. A consumer could begin their research on their home computer or tablet, they could walk into a branch seeking the best interest rate on a savings account, or the most flexible terms for a mortgage. They could be driven to a bank’s call centre via a number on the website, or fill in an online form to open an account. Whatever they decide, they expect a seamless, integrated onboarding experience 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">fingerprint</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Our technologies</div>
                    </v-card-title>
                    <v-card-text>
                      With KYC data available on demand, and a host of technologies such as biometrics and OCR, the capabilities have never been better. Customers need no longer walk into a bank to sign up for products. Omni-channel banking software acts in an almost human capacity, with dynamic forms and case management handling many of the jobs that drain bank personnel time and frustrate customers.  
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">settings_input_antenna</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Krece B2B 1.0</div>
                    </v-card-title>
                    <v-card-text>
                      We are proud to be the creators of the Backbase Krece B2B 1.0 an Omni-Channel Platform, a state-of-the-art digital onboarding software solution that unifies data and functionality from traditional core systems and new technologies into a seamless digital customer experience. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>



     </v-container>

    

    <v-layout row justify-center>
        <v-dialog :persistent=true v-model="dialogFacePhi" width="460px" height="600px" >
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
             Enter your credentials
            </v-card-title>
            <v-card-text>
              <!-- stepper-->
                 <v-stepper v-model="e1">
                        <v-stepper-header>
                          <v-stepper-step color="green" :complete="e1 > 1" step="1">Commercial</v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step color="green" :complete="e1 > 2" step="2">Face biometrics</v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                          <v-stepper-content step="1" style="width:440px;height:400px">
                            <v-card class="mb-5" color="white lighten-1"  style="height:304px;width:390px">
                              <!-- Paso 1 -->
                              <v-form @submit.prevent="validateStep1"
                                  ref="form" v-model="valid" lazy-validation>
                                  <p style="text-align: justify;margin-right: 5px;">
                                    You are about to enter a demo application.<br>
                                    <br>The presentations are for demonstrative use.
                                    <br>Information about your location and behavior in the application will be collected.
                                    <br>
                                    <br>Please enter your email registered in the biometric:
                                    </p>
                                  <v-text-field autofocus v-model="emailAuth" :rules="emailRules" style="width: 95%;"  label="E-mail"  required></v-text-field>
                                </v-form>
                                <!-- Paso 1 -->
                              </v-card>
                            <v-btn :disabled="!valid"  color="green" @click="validateStep1" style="position: absolute;right:14px;margin-top: -29px;">Continue</v-btn>
                            <v-btn  flat style="position: absolute;right: 123px;margin-top: -29px;" @click="gotoHome">Cancel</v-btn>
                          </v-stepper-content>

                          <v-stepper-content step="2" style="width: 470px;height:400px" >
                            <v-card class="mb-5" color="white lighten-1"  style="height:440px;width:423px;overflow: hidden;">
                              <!-- Paso 2 -->
                                    <iframe v-bind:src="urlFacePhiAuth" id="iframex" sandbox="allow-same-origin allow-scripts" style="height: 440px;width:579px;top:-70px;overflow: hidden;position:absolute;right:-60px;zoom: 0.89;-moz-transform: scale(0.89);-moz-transform-origin: 0 0;-o-transform: scale(0.89);-o-transform-origin: 0 0;-webkit-transform: scale(0.89);-webkit-transform-origin: 0 0;"></iframe>
                                <!-- Paso 2 -->
                              </v-card>
                              
                              <div id="divMsg" style="position: absolute;right:-144pxpx;margin-top: -153px;">{{emailAuth}}</div>
                               <v-btn  flat style="position: absolute;right:0px;margin-top: -160px;" @click="back">Back</v-btn>
                          </v-stepper-content>
 
                        
                        </v-stepper-items>
                      </v-stepper>
              <!-- stepper-->
            </v-card-text>
            <v-divider></v-divider>
           
          </v-card>
        </v-dialog>
    </v-layout>

     <v-card>
      <v-snackbar
        v-model="snackbar"
        :bottom=false
        :color="colorNotificacion"
        :left=false
        :multi-line=true
        :right=true
        :timeout=3000
        :top=false
        :vertical=false
      >
        {{ mensajeNotifica }}
        <v-btn
          flat
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </v-snackbar>
    </v-card>

     <v-btn id="btnLogin" color="primary" flat  @click="login" style="visibility: hidden;">Accept</v-btn>
     <input type="hidden" id="facephifield" v-model="facephiID" name="facephifield">
  </div>
</template>

<script>

import {bus} from '../../main.js'
import axios from "axios";

   export default {
    data(){
      return {
        dialogFacePhi: true,
        snackbar:false,
        mensajeNotifica:'',
        colorNotificacion:'',
        select: [
          { text: 'State 1' }
        ],
        errorMessages: '',
        email:'',
        formHasErrors:'',
        rules: {
          required: value => !!value || '*Required',
            counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },
        urlFacePhiBase:'',
        e1: 0,
        valid: true,
        emailAuth: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        facephiID:''
      }
    },
    methods:{
      invite(){
         bus.$emit('afiliacion.loading.ini','');
         this.formHasErrors = false
        //var isError=false;
       
        if(this.email){
          console.log("calling ws...");
          this.callKreceApi();
          }
          else{
          console.log("fail calling ws...");
           bus.$emit('afiliacion.loading.end','');
          }
      },
       async callKreceApi(){
           axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/kreceInvite',
                timeout: 1000 * 10, // Wait for 10 seconds
                headers: {
                   "Content-Type": "application/json"
                },
                data: {
                  'email': this.email.trim()
                }
              })
                .then(response => {
                   console.log(response);
                   bus.$emit('afiliacion.notifica','Invitación generada. Revise su correo: '+ this.email,'indigo');
                   this.email="";
                     bus.$emit('afiliacion.loading.end','');
                   
                })
                .catch(error => {
                  console.log(error);
                    bus.$emit('afiliacion.loading.end','');
                });
    },
      validaSesion(){
        //TODO generar validacion de la sesion
        console.log("validando sesion");
        return false;
      },
      login(){
        this.dialogFacePhi = false;
        //in navbar is its implementation
        //bus.$emit('loginApp', {"user":"admin","pwd":"12345","app":"KRECE"});
         bus.$emit('login', {"user":this.emailAuth,"pwd":"************","app":"KRECE","drawer":false,"solucion":"KRECE","version":"1.0"});
      },
     validateStep1 () {
        if (this.$refs.form.validate()) {
          //this.snackbar = true
          this.e1 = '2';
          this.urlFacePhiBase='/facephi/auth/index.html?name=';

          var divMsg = document.getElementById('divMsg');
          divMsg.style.color='black';
          divMsg.innerText=this.emailAuth;
          
          var iframe = document.getElementById('iframex');
          iframe.contentWindow.location.reload();
        }
      },
      gotoHome(){
        console.log("cancelling...");
         this.dialogFacePhi=false
          //bus.$emit('afiliacion.goTo','/fintech');
           this.$router.push('/fintech');
      },
      back(){
         this.e1 = '1';
      },
    created(){
      bus.$on('afiliacion.notifica',(msg, color)=>{
            this.colorNotificacion=color;
            this.snackbar=true;
            this.mensajeNotifica=msg; 
        });

        bus.$on('afiliacion.goTo',(ruta)=>{
           this.$router.push(ruta);

        });
    }
    },
    computed:{
       urlFacePhiAuth () {
          return this.urlFacePhiBase + this.emailAuth.trim()
          },
         section1 () {
       return require('../../assets/krece1.jpg')
       }
    }
  }
   


  window.facephiAuthOK = function() { 
    console.log("valido:::::::::::.");
     var iframe = document.getElementById('iframex');
     iframe.src="";
    document.getElementById('btnLogin').click();
    };


  window.facephiAuthKO = function () {
    console.log(".......invalid::::::::");
     var divMsg = document.getElementById('divMsg');
    var arrMsg = divMsg.innerText.split(' ');
          divMsg.innerText = arrMsg[0] +" :Failed authentication";
          divMsg.style.color='red'
           var iframe = document.getElementById('iframex');
          iframe.contentWindow.location.reload();
          
         
  };
</script>

<style scoped>
html{
  overflow-y:hidden;
}
</style>