<template >
  <div class="home">

    <v-container fluid class="my-2 containerHome">
      <carousel></carousel>
       <v-layout column wrap align-center>
               <v-flex>
                <v-container >
                  <v-layout >
                    <v-flex xs12 md8>
                     <h2 class="headline text-xs-center my-4">Explore our solutions and drive your business&nbsp;</h2>
                    </v-flex>
                     <v-flex xs12 md3 style="margin-top: 5px;">
                     <h3 class="subheading text-xs-center my-4">Do not you have access yet?&nbsp;</h3>
                    </v-flex>
                    <v-flex xs12 md1>
                      <div class="text-xs-center" style="margin-top: 14px;">
                         <v-btn color="red"   dark @click="openModalFacePhi" >Request access now</v-btn>
                         
                        </div>
                    </v-flex>
                    
                  </v-layout>
                </v-container>
              </v-flex>
       </v-layout>
      
      <carousel-cards v-bind:items="solucionesArr"></carousel-cards>
      <h2 class="headline text-xs-center my-4">Explore our APIs and components</h2>
      <carousel-cards v-bind:items="apisComponentsArr"></carousel-cards>
      <landing-page></landing-page>
    </v-container>


    <div class="text-xs-center">
      <v-dialog :persistent=true  v-model="dialogFacePhi" width="500">
        <template v-slot:activator="{ on }">
          <!-- <v-btn color="red lighten-2" dark v-on="on"> Click Me</v-btn> -->
        </template>
                <v-stepper v-model="e1">
                        <v-stepper-header>
                          <v-stepper-step color="green" :complete="e1 > 1" step="1">Commercial data</v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step color="green" :complete="e1 > 2" step="2">Face biometrics</v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step color="green" step="3">Result</v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                          <v-stepper-content step="1">
                            <v-card class="mb-5" color="white lighten-1" height="200px" >
                              <!-- Paso 1 -->
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field v-model="name"  :counter="10"  :rules="nameRules"  label="Name" required></v-text-field>
                                    <v-text-field v-model="emailRegister" :rules="emailRules"  label="E-mail"  required></v-text-field>
                                    <v-checkbox  v-model="checkbox"  :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?"  required></v-checkbox>
                                </v-form>
                                <!-- Paso 1 -->
                              </v-card>
                            <v-btn :disabled="!valid"  color="green" @click="validateStep1" style="position: absolute;right:14px;margin-top: -29px;">Continue</v-btn>
                            <v-btn  flat style="position: absolute;right: 123px;margin-top: -29px;" @click="dialogFacePhi=false">Cancel</v-btn>
                          </v-stepper-content>

                          <v-stepper-content step="2" style="width: 470px;" >
                            <v-card class="mb-5" color="white lighten-1"  style="height:440px;width:423px;overflow: hidden;">
                              <!-- Paso 2 -->
                                    <iframe v-bind:src="urlFacePhiRegister" id="iframex" sandbox="allow-same-origin allow-scripts" style="height: 640px;width: 584px;overflow: hidden;zoom: 0.89;-moz-transform: scale(0.89);-moz-transform-origin: 0 0;-o-transform: scale(0.89);-o-transform-origin: 0 0;-webkit-transform: scale(0.89);-webkit-transform-origin: 0 0;"></iframe>
                                <!-- Paso 2 -->
                              </v-card>
                            <div id="divStep2" style="display:none">
                           <v-btn color="green" @click="validaStep2" style="position: absolute;right:14px;margin-top: -29px;">Continue</v-btn>
                           
                            </div>
                             <v-btn flat style="position: absolute;right: 123px;margin-top: -29px;" @click="dialogFacePhi=false">Cancel</v-btn>

                          </v-stepper-content>

                          <v-stepper-content step="3"  style="height: 290px;">
                           
                            <v-flex xs12>
                                <v-card color="white" class="black--text">
                                  <v-layout row>
                                    <v-flex xs12>
                                      <v-card-title primary-title>
                                        <div>
                                          <div class="headline">Congratulations, your access has been registered!</div>
                                          <div>Now you can use the applications with your face as an access key</div>
                                          <div>(2019)</div>
                                        </div>
                                      </v-card-title>
                                    </v-flex>
                                   
                                  </v-layout>
                                  <v-divider light></v-divider>
                                  <v-card-actions class="pa-3">
                                    An access has been generated for 24 hours
                                    <v-spacer></v-spacer>
                                    <v-icon>vpn_key</v-icon>
                                   
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            <v-btn  color="green" @click="dialogFacePhi=false" style="position: absolute;right:14px;margin-top:23px;">
                              Close
                            </v-btn>
                          </v-stepper-content>
                        </v-stepper-items>
                      </v-stepper>
      
      </v-dialog>
      <input type="hidden" id="facephifield" v-model="facephiID" name="facephifield">
      
    </div>


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
import CarouselCards from '@/components/start/CarouselCards'
import Carousel from '@/components/start/Carousel'
import LandingPage from '@/components/start/LandingPage'
import axios from "axios";
import {bus} from '../main.js'

   export default {
    components: {
    CarouselCards,Carousel,LandingPage
    },
    data(){
      return{
        publicPath: process.env.BASE_URL,
        solucionesArr: [
          {id:1 ,deshabilitado:false, logo:'/images/afiliacion.jpg',color:'green', name: 'Afiliación', tag: "Onboarding digital",ruta:'/afiliacion'},
          {id:2 ,deshabilitado:true, logo:'/images/selfservice.jpeg',color:'green', name: 'Self-service', tag: "Process it yourself",ruta:'/self-service'},
          {id:3 ,deshabilitado:false, logo:'/images/krece1.jpg',color:'green', name: 'Krece B2B', tag: "Crowfounding",ruta:'/krece'},
          {id:4 ,deshabilitado:false, logo:'/images/homebanking.jpg',color:'warning', name: 'Home Banking', tag: "Your Online Banking",ruta:'/hb'},
          {id:5 ,deshabilitado:true, logo:'/images/mobileBanking.jpg',color:'warning', name: 'Mobile Banking', tag: "Smartphone",ruta:'/mobile-banking'},
          {id:6 ,deshabilitado:true, logo:'/images/wallet2.jpg',color:'warning', name: 'Tu Wallet', tag: "Your payments, your services",ruta:'/wallet'},
        ],
        apisComponentsArr: [
          {id:1,deshabilitado:true, logo:'https://placehold.it/200x200' ,color:'green', name: 'OCR', tag: "Data extraction customed",ruta:'/ocr'},
          {id:2,deshabilitado:false, logo:'/images/digital.jpg' ,color:'green', name: 'Digital Docs', tag: "Desing it & use it",ruta:'/digital-docs'},
          {id:3,deshabilitado:true, logo:'https://placehold.it/200x200' ,color:'warning', name: 'Soft token', tag: "Simple soft token",ruta:'/soft-token'},
          {id:4,deshabilitado:true, logo:'https://placehold.it/200x200' ,color:'error', name: 'One ring', tag: "Reference phone numbers",ruta:'/one-ring'},
          {id:5,deshabilitado:true, logo:'https://placehold.it/200x200' ,color:'success', name: 'Cognitive', tag: "Chat & phone",ruta:'/cognitive'}
        ],
         fav: true,
         menu: false,
         message: false,
         hints: true,
          e1: 0,
          valid: true,
          name: '',
          nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
          ],
          emailRegister: '',
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          checkbox: false,
          urlFacePhiBase:'',
           dialogFacePhi: false,
           facephiID:'',
           snackbar:false,
           colorNotificacion:'red',
           mensajeNotifica:'',
      }
    },
    computed:{
         kreceimg () {
          return require('../assets/krece1.jpg')
          },
         urlFacePhiRegister () {
          return this.urlFacePhiBase + this.emailRegister.trim()
          },
           getFacePhiId () {
             var aux =document.getElementById("facephifield");
             if(aux==null)return '';
             else
             return document.getElementById("facephifield").value;
            //return this.facephiID;
          }
    },
    methods:{
      facephiVue(){
           console.log("llegaron a vuejs::::::"+ this.facephiID);
      },
      openModalFacePhi(){
         this.$refs.form.resetValidation(),
        this.name='',
        this.emailRegister='',
        this.checkbox=false,
       
        this.e1='1',
        this.dialogFacePhi=true,
        document.getElementById("divStep2").style.display = "none";
      },
       validateStep1 () {
        if (this.$refs.form.validate()) {
            this.validaMailInDB();
           
            
        }
      },
      validaMailInDB(){
         bus.$emit('afiliacion.loading.ini','');
         axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/logMailFace',
                timeout: 12000 * 1, // Wait for 2 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  mail: this.emailRegister
                }
              })
                .then(response => {
                  console.log(response.data);
                  if(response.data == 'OK'){
                       this.snackbar=true;
                    this.mensajeNotifica='Email found. Please register with other email'; 
                  }
                  else {
                    
                    this.snackbar = false
                      this.e1 = '2';
                      this.urlFacePhiBase='/facephi/register/index.html?name=';
                      var iframe = document.getElementById('iframex');
                      iframe.contentWindow.location.reload();
                    }

                     bus.$emit('afiliacion.loading.end','');
                })
                .catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });
          
      },
      validaStep2(){
          this.e1 = '3';
          console.log("------------------------------------------------------");
           console.log(document.getElementById("facephifield"));
          console.log("por fin el id de facephi en vuejs::::::"+this.facephiID);
           var iframe = document.getElementById('iframex');
          iframe.src="";
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      }
    },
    mounted(){
     
    }
  }


window.facephiIdRegister = function (name,id) {
  
    console.log("recibiendo datos de facephi: "+ name+' id:'+id);
    document.getElementById("facephifield").value=id;
    console.log(document.getElementById("facephifield"));
    console.log("---------------------------------------------------------");
    console.log(id);
    document.getElementById("divStep2").style.display = "block";

     };




</script>

<style lang="stylus">
 .containerHome{
   padding:0px!important;margin-top: 0px!important;
 }
 #display{
   overflow:hidden;
 }

  .heart {
	font-size: 150px;
	color: #e00;
	animation: beat .75s infinite alternate;
	transform-origin: center;
}

/* Heart beat animation */
@keyframes beat{
	to { transform: scale(1.1); }
}
</style>
