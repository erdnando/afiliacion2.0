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
     components: {
  
    },
 data(){
   return {
     carouselItems: [
        {id:1 , img: '/images/afiliacion1.jpg', titulo:"Afiliacion2.0", texto: "Onboarding and origination in Banking. This is Afiliación 2.0"},
        {id:2 , img: '/images/self.jpg',titulo:"Self-service", texto: "Self-service solution that allows users to start their personal credit application process themselves."},
        {id:3 , img: '/images/krece2.jpg',titulo:"Krece B2B", texto: "Platform that enables the ecosystem between Investors and applicants in a B2B environment."},
        {id:4 , img: '/images/hb2.jpg', titulo:"Home Banking", texto: "The front-end that extends your banking core to your clients."},
        {id:5 , img: '/images/mobilebank4.jpg', titulo:"Mobile Banking", texto: "With your App access your bank services. (iOS / And)"},
        {id:6 , img: '/images/wallet2.jpg', titulo:"Tu wallet", texto: "App that allows you to request payments attached to CoDi® and QR codes or NFC messages"},
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


