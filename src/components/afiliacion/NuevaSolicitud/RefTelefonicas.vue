<template >
  <div class="Reftelefonicas">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Phone references</span>
           <span class="subtitle orange--text"  >&nbsp;&nbsp; Enter phone numbers and wait for your validation</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm5 md5>
                <v-text-field mask="phone"  prepend-inner-icon="how_to_reg" box  color="green" label="Home homePhone*" hint="His name, his access" 
                 ref="objForm.homePhone"  :rules="[() => !!objForm.homePhone || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objForm.homePhone"></v-text-field>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field  mask="phone" prepend-inner-icon="how_to_reg"  box  label="Cell Phone*" 
                ref="objForm.cellPhone"  :rules="[() => !!objForm.cellPhone || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.cellPhone"></v-text-field>
              </v-flex>



              <v-flex xs12 sm7 md7>
                <v-text-field 
                 prepend-inner-icon="wc"
                ref="objForm.fullName" 
                v-model="objForm.fullName" 
                :rules="[() => !!objForm.fullName || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Full name*" hint="" ></v-text-field>
              </v-flex>

             <v-flex xs12 sm7 md7>
                <v-text-field 
                 prepend-inner-icon="public"
                ref="objForm.parentesco" 
                v-model="objForm.parentesco" 
                :rules="[() => !!objForm.parentesco || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Parentesco*" 
                hint="Welcome all countries"></v-text-field>
              </v-flex>

              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close(5)">Close</v-btn>
          <v-btn flat color="blue darken-1"  @click="save(5)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'

   export default {
     props:['open','etapasSolicitud','folio'],
     data(){
       return{
          objForm:{
            etapa:'RefTelefonicas',
            avance:0,
            color:'orange',
            homePhone:'',
            cellPhone:'',
            fullName:'',
            parentesco:''
          },
          errorMessages: '',
          formHasErrors: false
       }
     },
     updated(){
       console.log("cargando formulario...");
       
       //console.log(this.objFormAnterior.form.ocrEstructurados);
      
        // var arrResultados = this.etapasSolicitud.objForm.ocrEstructurados;

        // if(arrResultados==undefined)return;
        
        // var paterno='';
        // var materno='';
        // var direccion='';
        // for(var i=0;i<arrResultados.length;i++){
        //   if(arrResultados[i].nombre == "Nombre") this.objForm.nombre = arrResultados[i].valor;
        //   if(arrResultados[i].nombre == "Paterno") paterno = arrResultados[i].valor;
        //   if(arrResultados[i].nombre == "Materno") materno = arrResultados[i].valor;
        //   if(arrResultados[i].nombre == "fechaDeNacimiento") this.objForm.fechaDeNacimiento = arrResultados[i].valor;
        //   if(arrResultados[i].nombre == "sexo") this.objForm.sexo = arrResultados[i].valor;
        //   if(arrResultados[i].nombre == "tipo") this.objForm.nacionalidad = arrResultados[i].valor;
        //    if(arrResultados[i].nombre == "calle") direccion += arrResultados[i].valor;
        //    if(arrResultados[i].nombre == "codigoPostal") direccion += arrResultados[i].valor;
        //    if(arrResultados[i].nombre == "colonia") direccion += arrResultados[i].valor;
        //    if(arrResultados[i].nombre == "numeroExt") direccion += arrResultados[i].valor;
        // }
        // this.objForm.apellidos = paterno+' '+materno;
        // this.objForm.direccion = direccion;
        //valida fecha nac
       
      //  try{
      //   var fechaObtenida = new Date(this.objForm.fechaDeNacimiento);
      //   if(fechaObtenida.isValid()){
      //     this.objForm.fechaNac = fechaObtenida;
      //   }
      //   }
      //   catch(e){
      //       console.log("fecha invalida:" + this.objForm.fechaDeNacimiento);
      //   }
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
        this.errorMessages = ''
      },
      homePhone () {
        this.errorMessages = ''
      },
      fullName () {
        this.errorMessages = ''
      },
      parentesco () {
        this.errorMessages = ''
      }
    },
    methods:{
      save(idWin){
        this.formHasErrors = false
        var isError=false;
         console.log(this.form);
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) {
              this.formHasErrors = true
              console.log("-->"+this.formHasErrors);
              isError=true;
              return;
          }
        });

        if(isError){
          return;
        }
         this.updatestatus();
          var objx={"idWin":idWin,"objForm":this.objForm};
         this.$store.commit('setForm',objx);
       // bus.$emit('afiliacion.newSol.setForm',idWin,this.objForm);
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