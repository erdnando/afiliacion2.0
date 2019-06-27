import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NuevaSolicitud from './views/nuevasolicitud.vue';
import MisSolicitudes from './views/solicitudes.vue';
import Documentos from './views/documentos.vue';
import Asistencia from './views/asistencia.vue';
import Configuracion from './views/configuracion.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/indexado/',
      name: 'home',
      component: Home
    },
    {
      path: '/indexado/nuevasolicitud',
      name: 'nuevasolicitud',
      component: NuevaSolicitud
    },
    {
      path: '/indexado/solicitudes',
      name: 'solicitudes',
      component: MisSolicitudes
    },
    {
      path: '/indexado/documentos',
      name: 'documentos',
      component: Documentos
    },
    {
      path: '/indexado/asistencia',
      name: 'asistencia',
      component: Asistencia
    },
    {
      path: '/indexado/configuracion',
      name: 'configuracion',
      component: Configuracion
    }
  ]
});
