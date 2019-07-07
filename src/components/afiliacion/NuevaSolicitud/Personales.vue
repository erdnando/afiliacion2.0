<template >
  <div class="Personales">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Personal data</span>
           <span class="subtitle orange--text"  >&nbsp;&nbsp; Verify the data, save and continue with other sections</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm5 md5>
                <v-text-field  prepend-inner-icon="how_to_reg" box  color="green" label="Name*" hint="His name, his access" 
                 ref="objSolicitud.nombre"  :rules="[() => !!objSolicitud.nombre || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objSolicitud.nombre"></v-text-field>
              </v-flex>

              <v-flex xs12 sm7 md7>
                <v-text-field prepend-inner-icon="how_to_reg"  box  label="Last name*" 
                ref="objSolicitud.apellidos"  :rules="[() => !!objSolicitud.apellidos || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objSolicitud.apellidos"></v-text-field>
              </v-flex>


              <v-flex xs12 sm5 md5>
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
                ref="objSolicitud.sexo" 
                v-model="objSolicitud.sexo" 
                :rules="[() => !!objSolicitud.sexo || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Sex*" hint="" ></v-text-field>
              </v-flex>

             <v-flex xs12 sm5 md5>
                <v-text-field 
                 prepend-inner-icon="public"
                ref="objSolicitud.nacionalidad" 
                v-model="objSolicitud.nacionalidad" 
                :rules="[() => !!objSolicitud.nacionalidad || 'This field is required']"
                :error-messages="errorMessages"
                required
                counter maxlength="25" box label="Nationality*" 
                hint="Welcome all countries"></v-text-field>
              </v-flex>

               <v-flex xs12 sm7 md7>
                <v-text-field prepend-inner-icon="location_on"  box  label="Address*" 
                ref="objSolicitud.direccion"  :rules="[() => !!objSolicitud.direccion || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="objSolicitud.direccion"></v-text-field>
              </v-flex>

               <v-flex xs12 sm5 md5>
                <v-text-field prepend-inner-icon="card_giftcard"  box  label="Product*" 
                ref="objSolicitud.producto"  :rules="[() => !!objSolicitud.producto || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="objSolicitud.producto"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close(2)">Close</v-btn>
          <v-btn flat color="blue darken-1"  @click="save(2)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'

   export default {
     props:['open'],
     data(){
       return{
          objSolicitud:{
            etapa:'Personales',
            avance:0,
            folio:'F1000900',
            nombre:'Erdnando',
            apellidos:'Rodriguez Vargas',
            c:'',
            sexo:'H',
            nacionalidad:'Mexican',
            direccion:'Paloma negra 277, 57000',
            producto:'Simple credit',
            color:'orange'
          },
          errorMessages: '',
          formHasErrors: false,
          modalFecha: false,
          fechaNac:new Date().toISOString().substr(0, 10),
       }
     },
     computed:{
      
      form () {
        return {
          nombre: this.objSolicitud.nombre,
          apellidos: this.objSolicitud.apellidos,
          sexo: this.objSolicitud.sexo,
          nacionalidad: this.objSolicitud.nacionalidad,
          direccion: this.objSolicitud.direccion,
          producto: this.objSolicitud.producto
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
        bus.$emit('afiliacion.newSol.setForm',idWin,this.objSolicitud);
      },
      close(idWin){
        this.updatestatus();
        bus.$emit('afiliacion.newSol.closeForm',idWin,this.objSolicitud);
      },
      updatestatus(){
        
        this.objSolicitud.avance=0;
       
        var porcentaje=0;
         if(this.objSolicitud.nombre.toString().length>0)porcentaje+=17;
        if(this.objSolicitud.apellidos.toString().length>0)porcentaje+=17;
        if(this.objSolicitud.sexo.toString().length>0)porcentaje+=16;
        if(this.objSolicitud.nacionalidad.toString().length>0)porcentaje+=16;
        if(this.objSolicitud.direccion.toString().length>0)porcentaje+=17;
        if(this.objSolicitud.producto.toString().length>0)porcentaje+=17;

        this.objSolicitud.avance=porcentaje;
        if(porcentaje>=100) this.objSolicitud.color='green';
        else this.objSolicitud.color='orange';
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