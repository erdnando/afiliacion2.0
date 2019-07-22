<template >
  <div class="hb">
    
    <v-layout column wrap class="my-1" align-center>
    
    
        <iframe src='https://sminet.com.mx/hbx/Default.aspx' style="width: 100%;height: 996px;"></iframe>
    
       <v-card>
          <v-snackbar
            v-model="snackbar"
            :timeout=0
            :bottom=true
            :color="colorNotificacion"
            :left=false
            :multi-line=true
            :right=true
            :top=false
            :vertical=false
          >
            {{ mensajeNotifica }}
           
          </v-snackbar>
        </v-card>

     </v-layout>

    </div>






</template>

<script>

import {bus} from '../../main.js'

   export default {
    components: {
      
    },
    data(){
      return {
        snackbar:true,
        mensajeNotifica:'',
        colorNotificacion:'',
        color:'indigo',
        urlHB:'https://sminet.com.mx/hbx/Default.aspx'
      }
    },
    methods:{
      
    },
    created(){
         // bus.$emit('loginApp', {"user":"admin","pwd":"12345","app":"HB"});
           bus.$emit('login', {"user":this.emailAuth,"pwd":"************","app":"HB","drawer":false,"solucion":"Home Banking","version":"1.0"});
          this.colorNotificacion=this.color;
          this.snackbar=true;
          this.mensajeNotifica='Use the following demo credentials: 8700014489 and password: Octopus48 and token 12345678 ';
           },
    computed:{
      
    }
    
    
  }
</script>

<style scoped>
html{
  overflow-y:hidden;
}
</style>