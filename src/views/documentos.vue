<template >
  <div class="documentos">
<!--se actualiza el documento 1.2  -->  
    <h1 class="subheading grey--text">Documentos</h1>

    <v-container fluid class="my-2">
     <v-layout row wrap>
       <v-flex xs12 md6>
         <v-card>
           <v-card-title>Resultado de la busqueda</v-card-title>
           <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae molestiae eos, quibusdam quam aliquid, nostrum animi saepe assumenda molestias beatae omnis rerum explicabo fuga similique sed, reiciendis veniam voluptatibus dolore?</v-card-text></v-card-text>
         </v-card>
       </v-flex>

        <v-flex xs12 md6  hidden-sm-and-down>
         <v-card >
           <v-card-title>PDF</v-card-title>
           <v-responsive  :aspect-ratio="1/.75">
                <iframe style="width:100%;height:100%" src="http://www.historicas.unam.mx/publicaciones/revistas/nahuatl/pdf/ecn25/453.pdf"></iframe>
             
          </v-responsive>
           <v-card-text>
             Lorem, ipsum dolor sit aanditiis distinctio! Quos, et.
             </v-card-text>
         </v-card>
       </v-flex>








     </v-layout>
    </v-container>


  </div>
</template>

<script>
   export default {
    
    
  }
</script>

<style>

</style>