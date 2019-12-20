import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Afiliacion from './views/afiliacion/Home.vue';
import NuevaSolicitud from './views/afiliacion/nuevasolicitud.vue';
import MisSolicitudes from './views/afiliacion/solicitudes.vue';
import Documentos from './views/afiliacion/documentos.vue';
import Asistencia from './views/asistencia.vue';
import Configuracion from './views/configuracion.vue';
import SelfService from './views/self-service/Home.vue';
import Krece from './views/krece/Home.vue';
import Maas from './views/maas/Home.vue';
import Hb from './views/hb/Home.vue';
import MobileBanking from './views/mobile-banking/Home.vue';
import Wallet from './views/wallet/Home.vue';

import DS from './views/standalone/ds/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/afiliacion',
      name: 'afiliacion',
      component: Afiliacion
    },
        {
          path: '/afiliacion/nuevasolicitud',
          name: 'afiliacion-nueva',
          component: NuevaSolicitud
        },
        {
          path: '/afiliacion/solicitudes',
          name: 'solicitudes',
          component: MisSolicitudes
        },
        {
          path: '/afiliacion/documentos',
          name: 'documentos',
          component: Documentos
        },
    {
      path: '/self-service',
      name: 'self-service',
      component: SelfService
    },
    {
      path: '/krece',
      name: 'krece',
      component: Krece
    },
    {
      path: '/maas',
      name: 'maas',
      component: Maas
    },
    {
      path: '/hb',
      name: 'hb',
      component: Hb
    },
    {
      path: '/mobile-banking',
      name: 'mobile-banking',
      component: MobileBanking
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/asistencia',
      name: 'asistencia',
      component: Asistencia
    },
    {
      path: '/configuracion',
      name: 'configuracion',
      component: Configuracion
    },
    {
      path: '/digital-docs',
      name: 'digital-docs',
      component: DS
    }
  ]
});
