<template >
  <div class="Autorizo">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" >
      <v-card  >
        <v-card-title>
          <span class="headline">I agree with the use of my data</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <!-- <v-layout > -->

              <Vue-Signature id="signature" style="width:100%;" height="300px" ref="signaturePad"/>


            <!-- </v-layout> -->
          </v-container>
          <small>*Sign with your cursor or finger</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="undo()">Undo</v-btn>
          <v-btn color="blue darken-1" flat @click="close(3)">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save(3)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'
import VueSignature from 'vue-signature-pad'
 import axios from "axios"

   export default {
     props:['open','folio'],
      components: {
        VueSignature,axios
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
        console.log("estatus del objeto firma:");
        console.log(isEmpty);
        console.log(data);
        var pImgS64=data;
        //TODO save img 64
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
      },
      undo() {
      this.$refs.signaturePad.undoSignature();
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
                  console.log("CM....");
                })
                .catch(error => {
                  console.log("Enviado a CM....timeout");
                  //console.log(error);
              });
    }
    },
  
  }
</script>

<style>
.v-dialog {
    position: absolute;
    top: 120px;
}
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

</style>