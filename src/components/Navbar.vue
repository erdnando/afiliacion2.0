

<template>
    <nav>
        <v-toolbar  app hidden>

          <v-toolbar-side-icon v-if="isLogged"  class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="text-uppercase grey--text">
              <span class="font-weight-light">Afiliacion</span>
              <span>2.0</span>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn  flat color="grey">
             <span>Login</span>
             <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </v-toolbar>

        <!-- Left menu aka drawer   temporary-->
        <v-navigation-drawer   v-model="drawer"   app class="indigo">
            <br/>
            <!-- datos del promotor-->
             <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                    <img v-bind:src="promotor.foto">
                    </v-list-tile-avatar>
        
                    <v-list-tile-content>
                    <v-list-tile-title class="darken white--text subheading font-weight-thin text-uppercase">{{promotor.nombre}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
    
             <!-- modulos-->
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
               
                <v-list-tile v-for="item in modulos" :key="item.clave"  router :to="item.ruta">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
        
                    <v-list-tile-content>
                         <v-list-tile-title class="darken white--text caption ">{{ item.modulo }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

        </v-navigation-drawer>




    </nav>
</template>

<script>
export default {
    data(){
        return{
            drawer:false,
            isLogged:false,
            promotor:{
                id:10001,
                nombre:'Andres Arriaga Jimenez',
                foto:'https://randomuser.me/api/portraits/men/85.jpg',
                rol:1,
                tienda:'55'
            },
            modulos: [
                { clave:'01' , allow:'rw' , modulo: 'Home', icon: 'dashboard',ruta:'/' },
                { clave:'02' , allow:'rw' , modulo: 'Mis solicitudes', icon: 'library_books',ruta:'/solicitudes' },
                { clave:'03' , allow:'rw' , modulo: 'Nueva solicitud', icon: 'library_add',ruta:'/nuevasolicitud' },
                { clave:'04' , allow:'rw' , modulo: 'Documentos digitales', icon: 'how_to_vote',ruta:'/documentos' },
                { clave:'05' , allow:'rw' , modulo: 'Asistencia', icon: 'report_problem',ruta:'/asistencia' },
                { clave:'06' , allow:'rw' , modulo: 'Configuración', icon: 'settings',ruta:'/configuracion' },
                { clave:'07' , allow:'rw' , modulo: 'Salir', icon: 'power_settings_new',ruta:'/' }
                ]
      }
    }
}
</script>
