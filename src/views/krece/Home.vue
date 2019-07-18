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
        <v-dialog :persistent=true v-model="dialog" width="500">
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
              Ingrese sus credenciales
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat  @click="login">
                Aceptar
              </v-btn>
            </v-card-actions>
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

    
  </div>
</template>

<script>

import {bus} from '../../main.js'
import axios from "axios";

   export default {
    data(){
      return {
        dialog: true,
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
        }
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
        this.dialog = false;
        //in navbar is its implementation
        bus.$emit('loginApp', {"user":"admin","pwd":"12345","app":"KRECE"});
      }
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
    },
    computed:{
         section1 () {
       return require('../../assets/krece1.jpg')
       }
    }
    
    
  }
</script>

<style scoped>
html{
  overflow-y:hidden;
}
</style>