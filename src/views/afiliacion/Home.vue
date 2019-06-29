<template >
  <div class="afiliacion">
   
    <h1 class="subheading grey--text">afiliacion home</h1>
     <v-container fluid class="my-2">
     
     <v-layout row justify-center>
        <v-dialog :persistent=true v-model="dialog" width="500">
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
              Privacy Policy
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat  @click="login">
                I accept
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

    </v-container>
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
      validaSesion(){
        //TODO generar validacion de la sesion
        console.log("validando sesion");
        return false;
      },
      login(){
        this.dialog = false;
        bus.$emit('login', {"user":"admin","pwd":"12345","app":"AFILIACION"});
      }
    },
    created(){
      bus.$on('loginFail',(userAccediendo)=>{
            console.log("autenicación de:"+userAccediendo.user + "...ha sido denegada a "+ userAccediendo.app);
            this.colorNotificacion='red';
            this.snackbar=true;
            this.mensajeNotifica="Login incorrecto. Verifique sus credenciales para la solución de "+userAccediendo.app;

        }),

        bus.$on('loginOk',(userAccediendo)=>{
            console.log("autenicación de:"+userAccediendo.user + "....es Ok. Accediendo a la solución "+ userAccediendo.app);
            this.colorNotificacion='green';
            this.snackbar=true;
            this.mensajeNotifica="Login correcto. Cargando modulos....de "+ userAccediendo.app;
            bus.$emit('loadDrawer', userAccediendo)
            bus.$emit('showDrawer',true);
        })
    }
    
    
  }
</script>

<style scoped>
html{
  overflow-y:hidden;
}
</style>