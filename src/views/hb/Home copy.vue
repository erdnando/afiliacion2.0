<template >
  <div class="hb">
   
    
     <v-container fluid >
     
       <section>
        <v-parallax :src="section1" height="420">
          <v-layout column align-center justify-center>
            <div class="display-2 white--text mb-3 text-xs-center">Customer Onboarding</div>
            <em class="headline">and Origination in Banking. This is Afiliacion 2.0</em>
            <v-btn  class="blue lighten-2 mt-5" dark large @click="openHB">
              Home Banking
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

   export default {
    data(){
      return {
        dialog: true,
        snackbar:false,
        mensajeNotifica:'',
        colorNotificacion:'',
        select: [
          { text: 'State 1' }
        ]
      }
    },
    methods:{
      openHB(){
       window.open("https://sminet.com.mx/hbx/Default.aspx");
      },
      validaSesion(){
        //TODO generar validacion de la sesion
        console.log("validando sesion");
        return false;
      },
      login(){
        this.dialog = false;
        //in navbar is its implementation
        //bus.$emit('loginApp', {"user":"admin","pwd":"12345","app":"HB"});
         bus.$emit('login', {"user":this.emailAuth,"pwd":"************","app":"HB","drawer":false,"solucion":"AFILIACION","version":"2.0"});
      }
    },
    created(){
      bus.$on('afiliacion.notifica',(msg, color)=>{
            this.colorNotificacion=color;
            this.snackbar=true;
            this.mensajeNotifica=msg;

            
        })

        bus.$on('afiliacion.goTo',(ruta)=>{
           console.log("desde una copia afiliacion:" + ruta);
           this.$router.push(ruta);

        })
    },
    computed:{
         section1 () {
       return require('../../assets/section.jpg')
       }
    }
    
    
  }
</script>

<style scoped>
html{
  overflow-y:hidden;
}
</style>