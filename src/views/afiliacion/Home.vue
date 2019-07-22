<template >
  <div class="afiliacion">
   
    
     <v-container fluid >
     
       <section>
        <v-parallax :src="section1" height="420">
          <v-layout column align-center justify-center>
            <div class="display-2 white--text mb-3 text-xs-center">Customer Onboarding</div>
            <em class="headline">and Origination in Banking. This is Afiliacion 2.0</em>
            <v-btn v-if="botonDeshabilitado" class="blue lighten-2 mt-5" dark large @click="gotoNewSol">
              New application
            </v-btn>
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
                      <div class="headline text-xs-center">Afiliacion 2.0</div>
                    </v-card-title>
                    <v-card-text>
                      We are proud to be the creators of the Backbase Afiliación 2.0 an Omni-Channel Platform, a state-of-the-art digital onboarding software solution that unifies data and functionality from traditional core systems and new technologies into a seamless digital customer experience. 
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
        <v-dialog :persistent=true v-model="dialog" width="460px" height="600px" >
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
             Enter your credentials
            </v-card-title>
            <v-card-text>
              <!-- stepper-->
                 <v-stepper v-model="e1">
                        <v-stepper-header>
                          <v-stepper-step color="green" :complete="e1 > 1" step="1">Commercial data</v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step color="green" :complete="e1 > 2" step="2">Face biometrics</v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                          <v-stepper-content step="1" style="width:520px;height:400px">
                            <v-card class="mb-5" color="white lighten-1"  style="height:304px;width:457px">
                              <!-- Paso 1 -->
                              <v-form
                                  ref="form" v-model="valid" lazy-validation>
                                  <v-text-field v-model="emailAuth" :rules="emailRules"  label="E-mail"  required></v-text-field>
                                </v-form>
                                <!-- Paso 1 -->
                              </v-card>
                            <v-btn :disabled="!valid"  color="green" @click="validateStep1" style="position: absolute;right:14px;margin-top: -29px;">Continue</v-btn>
                            <v-btn  flat style="position: absolute;right: 123px;margin-top: -29px;" @click="dialogFacePhi=false">Cancel</v-btn>
                          </v-stepper-content>

                          <v-stepper-content step="2" style="width: 470px;height:400px" >
                            <v-card class="mb-5" color="white lighten-1"  style="height:440px;width:423px;overflow: hidden;">
                              <!-- Paso 2 -->
                                    <iframe v-bind:src="urlFacePhiAuth" id="iframex" sandbox="allow-same-origin allow-scripts" style="height: 440px;width:579px;top:-70px;overflow: hidden;position:absolute;right:-60px;zoom: 0.89;-moz-transform: scale(0.89);-moz-transform-origin: 0 0;-o-transform: scale(0.89);-o-transform-origin: 0 0;-webkit-transform: scale(0.89);-webkit-transform-origin: 0 0;"></iframe>
                                <!-- Paso 2 -->
                              </v-card>
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

   export default {
    data(){
      return {
        dialog: true,
        snackbar:false,
        mensajeNotifica:'',
        colorNotificacion:'',
        botonDeshabilitado:false,
        select: [
          { text: 'State 1' }
        ],
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
      gotoNewSol(){
        bus.$emit('afiliacion.goTo','/fintech/afiliacion/nuevasolicitud');
      },
      gotoHome(){
          bus.$emit('afiliacion.goTo','/fintech')
      },
      validaSesion(){
        //TODO generar validacion de la sesion
        console.log("validando sesion");
        return false;
      },
      login(){
        this.dialog = false;
        bus.$emit('login', {"user":"admin","pwd":"12345","app":"AFILIACION"});
      },
      validateStep1 () {
        if (this.$refs.form.validate()) {
          //this.snackbar = true
          this.e1 = '2';
          this.urlFacePhiBase='/facephi/auth/index.html?name=';
          var iframe = document.getElementById('iframex');
          
          iframe.contentWindow.location.reload();
        }
      },
    },
    created(){
      bus.$on('afiliacion.notifica',(msg, color)=>{
            this.colorNotificacion=color;
            this.snackbar=true;
            this.mensajeNotifica=msg;

            if(color=='red') this.botonDeshabilitado=false;
            else this.botonDeshabilitado=true;
        })

        bus.$on('afiliacion.goTo',(ruta)=>{
          console.log("move to:" + ruta);
           this.$router.push(ruta);

        })
    },
    computed:{
         section1 () {
       return require('../../assets/section.jpg')
       },
       urlFacePhiAuth () {
          return this.urlFacePhiBase + this.emailAuth.trim()
          },
    }
    
    
  }


  window.facephiAuthOK = function() {
    console.log("recibiendo datos de facephi resultado:OK");
    //document.getElementById("facephifield").value=id;
    console.log(document.getElementById("facephifield"));
    console.log("---------------------------------------------------------");
    //console.log(id);
     var iframe = document.getElementById('iframex');
     iframe.src="";
    document.getElementById('btnLogin').click();
    };


  window.facephiAuthKO = function () {
          //console.log("recibiendo datos de facephi en facephiAuthKO resultado: "+id);
         // document.getElementById("facephifield").value=id;
          // console.log(document.getElementById("facephifield"));
          // console.log("---------------------------------------------------------");
          // console.log(id);
           var iframe = document.getElementById('iframex');
          iframe.contentWindow.location.reload();
  };


</script>

<style scoped>
html{
  overflow-y:hidden;
}
</style>