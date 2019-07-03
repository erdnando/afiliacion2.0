<template >
  <div class="Carousel" >
      <v-carousel height="370">
        <div v-for="item in carouselItems" :key="item.id" >
          <v-carousel-item reverse-transition="fade" transition="fade" >
            <v-parallax height="480" dark :src="item.img" >
              <v-layout align-center column  justify-center >
                <h1 class="display-3 font-weight-thin mb-3">{{item.titulo}}</h1>
                <h4 class="headline">{{item.texto}}</h4>
              </v-layout>
            </v-parallax>
          </v-carousel-item>
       </div>
      </v-carousel>
  </div>
</template>

<script>
   export default {
 data(){
   return {
     carouselItems: [
        {id:1 , img: 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg', titulo:"Afiliacion2.0", texto: "Onboarding de clientes y originacion en Banking. Esto es Afiliación 2.0"},
        {id:2 , img: 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg',titulo:"Self-service", texto: "Solución self-service permite a los usuarios iniciar su proceso de solicitud de su crédito personal."},
        {id:3 , img: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg',titulo:"Krece B2B", texto: "Plataforma que habilita el ecosistema entre Inversionistas y solicitantes en un entorno B2B"},
        {id:4 , img: 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg', titulo:"Home Banking", texto: "El front-end que extiende tu core bancario a tus clientes."},
        {id:5 , img: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', titulo:"Mobile Banking", texto: "Con tu App brinda tus servicios en este mundo movil. (iOS/And)"},
        {id:6 , img: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', titulo:"Tu wallet", texto: "App que permite solicitar pagos apegada a CoDi® y codigos QR o mensajes NFC"},
        {id:7 , img: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', titulo:"OCR", texto: "Uso de tecnologia OCR para la extraccion de datos y automatizar procesos."},
      ]
   }
 }
}

//{id:4 , img: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',titulo:"MaaS 360", texto: "Solución que permite a tu fuerza de ventas captar y gestionar nuevos leads de créditos. ¡Esto es MaaS 360!"},
</script>

<style lang="stylus">
 #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>


