<template >
  <div class="Autorizo">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" >
      <v-card  color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text" >I agree with the use of my data</span>
           <v-spacer></v-spacer>
          <span class="body-2 white--text">{{folio}}</span>
        </v-card-title>
        <v-card-text>
          
          <v-container grid-list-md style="" class="fondoBuro">
                 <!-- <div class="sig sigWrapper current " id="firma-Electronica-sigWrapper" > -->
               <Vue-Signature id="signature" width="450px" height="140px" ref="signaturePad" style="margin-top:284px"/>
              <!-- </div> -->
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
//import {bus} from '../../../main.js'
import VueSignature from 'vue-signature-pad'
 import axios from "axios"

   export default {
     props:['open','folio'],
      components: {
        VueSignature
    },
     data(){
       return{
          objForm:{
              etapa:'Autorizo',
              avance:0,
              origen:'Store',
              promotor:'Admin',
              tienda:'Roma',
              fechaSolicitud:'',
              color:'orange',
              categoria:'3'
          }
       }
     },
     computed:{
       
     },
    methods:{
      save(idWin){
       
        var porcentaje=0;
       
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        // console.log("estatus del objeto firma:");
        // console.log(isEmpty);
        // console.log(data);
        var pImgS64=data;

        //pImgS64= pImgS64.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "");
        this.cmProcess(pImgS64,"Firma","autorizo");

        if(!isEmpty)porcentaje+=100;
        this.objForm.avance=porcentaje;
        
        if(porcentaje>=100) this.objForm.color='green';
        else this.objForm.color='orange';

         var objx={"idWin":idWin,"objForm":this.objForm};
         this.$store.commit('setForm',objx);
      },
      close(idWin){
        this.$store.commit('closeForm',idWin);
        this.resizeCanvas();
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
      console.log(this.folio);

          axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/loadImgStr64ToCM',
                timeout: 13000 * 1, // Wait for 1 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  pImgS64: string64.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", ""),
                  idTramite: this.folio,
                  categoria: this.objForm.categoria,
                  lang: 'eng',
                  contraste: '1',
                  ext: '',
                  nombre: nombre,
                  paterno: paterno
                }
              })
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.log("Enviado a CM....timeout");
                  console.log(error);
              });
    },
    resizeCanvas() {
      //try{
       
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
         var canvas = this.$refs.signaturePad.getCanvasRef();
          console.log("inside resizeCanvas");
         console.log(canvas);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.width=450;
      canvas.height=140;
        canvas.getContext("2d").scale(ratio, ratio);
        // }catch(error){
        //   console.log("onResize");
        // }
    }
    },
    created(){
       
    },
   mounted() {
    window.addEventListener("resize", this.resizeCanvas);

   // this.resizeCanvas();
     //console.log("on resize canvas");
     var canvas = this.$refs.signaturePad.getCanvasRef(); // <---- view NOTA
     console.log(canvas);
        canvas.width = 400;
        canvas.height = 180;
        // this.resizeCanvas();
        canvas.width = 450;
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.getContext("2d").scale(ratio, ratio);
        //console.log("despues del get context");
    //NOTA NOTA NOTA
    //se añadio esta funcion al componente node en vue-signature-pad,esm y pad.commons
    // getCanvasRef: function getCanvasRef(){
    //         return this.$refs.signaturePadCanvas;
    // }
  }



  }
</script>

<style>
.v-dialog {
    position: absolute;
    top: 120px;
}
#signature {
  background-color: honeydew;
  background-clip: content-box, border-box;
  opacity: 0.55;
  box-shadow: 0 4px 31px rgb(101, 107, 101);
}

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