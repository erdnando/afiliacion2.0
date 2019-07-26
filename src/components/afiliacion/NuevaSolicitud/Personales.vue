<template >
  <div class="Personales">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Personal data</span>
           <span class="subtitle "  style="color:floralwhite;margin-top: 5px;">&nbsp;&nbsp; Verify the data, save and continue with other sections</span>
            <v-spacer></v-spacer>
          <span class="body-2 white--text">{{folio}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm5 md5>
                <v-text-field   prepend-inner-icon="how_to_reg" box  color="green" label="Name*" hint="His name, his access" 
                 ref="objForm.nombre"  :rules="[() => !!objForm.nombre || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objForm.nombre"></v-text-field>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field prepend-inner-icon="how_to_reg"  box  label="Last name*" 
                ref="objForm.apellidos"  :rules="[() => !!objForm.apellidos || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.apellidos"></v-text-field>
              </v-flex>


              <v-flex xs12 sm5 md5 style="margin-top: 7px;">
                 <v-dialog
                  ref="dialog"
                  v-model="modalFecha"
                  :return-value.sync="fechaNac"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="fechaNac"
                      label="Picker in dialog"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="fechaNac" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modalFecha = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(fechaNac)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field 
                 prepend-inner-icon="wc"
                ref="objForm.sexo" 
                v-model="objForm.sexo" 
                :rules="[() => !!objForm.sexo || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Sex*" hint="" ></v-text-field>
              </v-flex>

             <v-flex xs12 sm5 md5>
                <v-text-field 
                 prepend-inner-icon="public"
                ref="objForm.nacionalidad" 
                v-model="objForm.nacionalidad" 
                :rules="[() => !!objForm.nacionalidad || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Nationality*" 
                hint="Welcome all countries"></v-text-field>
              </v-flex>

               <v-flex xs12 sm7 md7>
                <v-text-field prepend-inner-icon="location_on"  box  label="Address*" 
                ref="objForm.direccion"  :rules="[() => !!objForm.direccion || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objForm.direccion"></v-text-field>
              </v-flex>



               <v-flex xs12 sm5 md5>
                <v-text-field autofocus type="email"
                 prepend-inner-icon="wc" background-color="orange" 
                ref="objForm.email" 
                v-model="objForm.email" 
                :rules="[rules.required, rules.email]"
                :error-messages="errorMessages"
                required
                counter maxlength="55" box label="Email*" hint="" ></v-text-field>
              </v-flex>





               <v-flex xs12 sm7 md7>
                <v-text-field prepend-inner-icon="card_giftcard"  box  label="Product*" 
                ref="objForm.producto"  :rules="[() => !!objForm.producto || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objForm.producto"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close(2)">Close</v-btn>
          <v-btn flat color="blue darken-1"  @click="save(2)">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
//import {bus} from '../../../main.js'

   export default {
     props:['open','etapasSolicitud','folio'],
     data(){
       return{
          objForm:{
            etapa:'Personales',
            avance:0,
            folio:'',
            nombre:'',
            apellidos:'',
            fechaDeNacimiento:'',
            sexo:'H',
            nacionalidad:'',
            direccion:'',
            producto:'Simple credit',
            email:'',
            color:'orange'
          },
          errorMessages: '',
          formHasErrors: false,
          modalFecha: false,
          fechaNac:new Date().toISOString().substr(0, 10),
          rules: {
            required: value => !!value || 'Required.',
             counter: value => value.length <= 20 || 'Max 20 characters',
            email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.'
            }
        }
       }
     },
     updated(){
       //console.log("cargando formulario...");
        var arrResultados = this.etapasSolicitud.objForm.ocrEstructurados;

        if(arrResultados==undefined)return;
        
        var paterno='';
        var materno='';
        var direccion='';
        for(var i=0;i<arrResultados.length;i++){
          if(arrResultados[i].nombre == "Nombre") this.objForm.nombre = arrResultados[i].valor;
          if(arrResultados[i].nombre == "Paterno") paterno = arrResultados[i].valor;
          if(arrResultados[i].nombre == "Materno") materno = arrResultados[i].valor;
          if(arrResultados[i].nombre == "fechaDeNacimiento") this.objForm.fechaDeNacimiento = arrResultados[i].valor;
          if(arrResultados[i].nombre == "sexo") this.objForm.sexo = arrResultados[i].valor;
          if(arrResultados[i].nombre == "tipo") this.objForm.nacionalidad = arrResultados[i].valor;
           if(arrResultados[i].nombre == "calle") direccion += arrResultados[i].valor;
           if(arrResultados[i].nombre == "codigoPostal") direccion += arrResultados[i].valor;
           if(arrResultados[i].nombre == "colonia") direccion += arrResultados[i].valor;
           if(arrResultados[i].nombre == "numeroExt") direccion += arrResultados[i].valor;
        }
        this.objForm.apellidos = paterno+' '+materno;
        this.objForm.direccion = direccion;
        //valida fecha nac
       
       try{
         //console.log(this.fechaNac);
        var fechaObtenida = new Date(this.fechaNac+"T12:00:00-06:00");
        
        //console.log(fechaObtenida);
        var year = fechaObtenida.getFullYear();
        var month = fechaObtenida.getMonth()+1;
        var day = fechaObtenida.getDate();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        this.objForm.fechaDeNacimiento = day + '/' + month + '/'+year;
        }
        catch(e){
            console.log("fecha invalida:" + this.fechaNac);
        }
     },
     computed:{
      
      form () {
        return {
          nombre: this.objForm.nombre,
          apellidos: this.objForm.apellidos,
          sexo: this.objForm.sexo,
          nacionalidad: this.objForm.nacionalidad,
          direccion: this.objForm.direccion,
          producto: this.objForm.producto,
          email: this.objForm.email,
          fechaNac: this.objForm.fechaDeNacimiento
        }
      }
     },
     watch: {
      nombre () {
        this.errorMessages = ''
      },
      apellidos () {
        this.errorMessages = ''
      },
      sexo () {
        this.errorMessages = ''
      },
      nacionalidad () {
        this.errorMessages = ''
      },
      direccion () {
        this.errorMessages = ''
      },
      producto () {
        this.errorMessages = ''
      },
       email () {
        this.errorMessages = ''
      }
    },
    methods:{
      save(idWin){
        this.objForm.folio=this.folio;
        this.objForm.fechaDeNacimiento=this.fechaNac;
        this.formHasErrors = false
        var isError=false;
         console.log(this.form);
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) {
              this.formHasErrors = true
              //console.log("-->"+this.formHasErrors);
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
         if(this.objForm.nombre.toString().length>0)porcentaje+=14;
        if(this.objForm.apellidos.toString().length>0)porcentaje+=14;
        if(this.objForm.sexo.toString().length>0)porcentaje+=14;
        if(this.objForm.nacionalidad.toString().length>0)porcentaje+=14;
        if(this.objForm.direccion.toString().length>0)porcentaje+=14;
        if(this.objForm.producto.toString().length>0)porcentaje+=14;
        if(this.objForm.email.toString().length>0)porcentaje+=16;

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