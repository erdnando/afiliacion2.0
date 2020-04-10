<template >
  <div class="Autorizo">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" >
      <v-card  color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text" >I agree with the use of my data</span>
           <v-spacer></v-spacer>
          <span class="body-2 white--text">{{variablesBPM.FolioExpediente}}</span>
        </v-card-title>
        <v-card-text>
          
          <v-container grid-list-md style="" class="fondoBuro">
                 <!-- <div class="sig sigWrapper current " id="firma-Electronica-sigWrapper" > -->
               <!-- <Vue-Signature id="signature" width="450px" height="140px" ref="signaturePad" style="margin-top:284px"/> -->
                 <!-- <Vue-Signature id="signature"  :width="'440px'" :height="'180px'" ref="signaturePad" style="margin-top:264px"/> -->
                   <!-- <Vue-Signature id="signature"   ref="signaturePad" style="margin-top:264px"/> -->
              <!-- </div> -->
                <VueSignaturePad
            id="signature"
            width="60%"
            height="180px"
            ref="signaturePad" style="margin-top:264px"
          />
          </v-container>
          
         
          <small>*Sign with your cursor or finger</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="undo()">Undo</v-btn>
          <v-btn color="blue darken-1" flat @click="close(3)">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save(3)">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js';
 import VueSignaturePad from 'vue-signature-pad';
 import axios from "axios";

   export default {
     props:['open','variablesBPM'],
      components: {
        VueSignaturePad
    },
     data(){
       return{
          objForm:{
              etapa:'Autorizo',
              Score:'',
              Buro:'',
              categoria:'3',
              Location:''
          }
       }
     },
     computed:{
       
     },
    methods:{
      save(idWin){
       
        var porcentaje=0;
       
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

        if(isEmpty){
          console.log('sin firma');
          return;
          
        }
        var pImgS64=data;

        this.cmProcess(pImgS64,"Firma.jpg","autorizo");


        //TODO: move bpm
        // set => Buro, Score & isOk
         bus.$emit('afiliacion.loading.ini','');

          this.objForm.Buro = Math.random(100).toString().substring(2,9);
          this.objForm.Score =Math.random(100).toString().substring(2,4);


debugger;
      

     



          var variablesXML="{'variables': { "+
          "'Buro': {'value': '" + this.objForm.Buro + "','type':'String'},"+
          "'Score':{'value':'" + this.objForm.Score + "','type':'String'},"+
          "'Coordenadas':{'value':'" + this.objForm.Location + "','type':'String'},"+
          "'isOK':{'value':true,'type':'boolean'}    } }";

          console.log(this.objForm.Location);
           
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
                  console.log('bpm autorizo');
                  
                  console.log(bpmResp);
                  
                  //reset
                  this.$store.state.bAutorizo = false;
                 
                   var firma= this.$refs.signaturePad.getCanvasRef();
                   firma.clear();

                 //reload
                 bus.$emit('search', '');
                 bus.$emit('afiliacion.loading.end','');
                  
                }).catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });
      },
      close(idWin){
        this.$store.state.bAutorizo = false;
        var firma= this.$refs.signaturePad.getCanvasRef();
        firma.clear();
       },
      undo() {
        this.$refs.signaturePad.undoSignature();
       },
      sleep(delay){
          var start = new Date().getTime();
          while(new Date().getTime() < start + delay);
        },
      async cmProcess(string64,nombre,paterno){


        console.log(string64);
        console.log(this.objForm.categoria);
        console.log(this.variablesBPM.FolioExpediente);

            axios({
                  method: "post",
                  url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/loadImgStr64ToCM',
                  timeout: 13000 * 1, // Wait for 1 seconds
                  headers: {
                    "Content-Type": "application/json"
                  },
                  data: {
                    pImgS64: string64.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", ""),
                    idTramite: this.variablesBPM.FolioExpediente,
                    categoria: this.objForm.categoria,
                    lang: 'eng',
                    contraste: 1,
                    ext: ''
                  }
                })
                  .then(response => {
                    console.log(response);
                  })
                  .catch(error => {
                    console.log("Enviado a CM....timeout");
                    console.log(error);
                });






            //  var arr64 = string64.split(',');
            // //console.log("----------CM----------");
            // axios({
            //       method: "post",
            //       url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/loadBase64ToCM',
            //       timeout: 153500 * 1, // Wait for 13.5 seconds
            //       headers: {
            //         "Content-Type": "application/json"
            //       },
            //       data: {
            //         pImgS64: arr64[1],
            //         idTramite: this.variablesBPM.FolioExpediente,
            //         categoria: this.objForm.categoria,
            //         nombre: nombre
            //       }
            //     })
            //       .then(response => {
            //         console.log("CM...."+response);
            //       })
            //       .catch(error => {
            //         console.log("Enviado a CM....Timeout"+error);
            //         //console.log(error);
            //     });


      },
    resizeCanvas() {
      
    }
    },
    created(){

      //do we support geolocation
      if(!("geolocation" in navigator)) {
        console.log('Geolocation is not available.');
       // return;
      }else{
           //this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        //this.gettingLocation = false;
        this.objForm.Location = pos.coords.latitude +','+ pos.coords.longitude;
      }, err => {
        //this.gettingLocation = false;
        //this.errorStr = err.message;
        console.log(err.message);
      });
      }
    
     },
     updated(){
      this.$nextTick(() => {
        this.$refs.signaturePad.resizeCanvas();
      });
      },
   mounted() {
      this.$nextTick(() => {
        this.$refs.signaturePad.resizeCanvas();
      });
  }



  }
</script>

<style>
.v-dialog {
    position: absolute;
    top: 120px;
}
/* #signature {
  background-color: honeydew;
  background-clip: content-box, border-box;
  opacity: 0.55;
  box-shadow: 0 4px 31px rgb(101, 107, 101);
} */

.fondoBuro{
  background-image: url('~@/assets/fondoBuro2.png');
  box-shadow: 0 4px 31px rgb(101, 107, 101);
  width: 100%!important;
  height:460px;
  text-align: -webkit-center;
  background-repeat: no-repeat;
  background-position: center;
}

</style>