<template >
  <div class="documentos">
<!--se actualiza el documento 1.3  -->  
    <!--<h1 class="subheading grey--text">Documentos</h1>-->

<v-container  fluid class="txtBuscador">
  <v-layout row wrap>
 <v-spacer></v-spacer>
 <v-text-field xs6 md6 lg6 xl6 outline
              v-model="inputSearch"
              :error-messages="searchErrors"
              required
              ref="inputSearch"
              name="inputSearch"
              label="Buscar"
              @keydown.enter="realizarConsulta" >
             <template bottom slot="append">
                <!-- <v-btn color="primary" > -->
                <v-icon @click="realizarConsulta">search</v-icon>
                <!-- </v-btn> -->
              </template>
            </v-text-field>
 <v-spacer></v-spacer>
 </v-layout>
</v-container>



          <v-container fluid class="resultados"  >
            <v-layout row wrap>
              <v-flex xs12 md5  class="scroll-y" :style="{'height':maxHeightResults}"   >
                <FlipCard >
                  <template slot="front">
                    <!-- front --->
                    <!-- front --->
                    <div slot="front" >
                      <v-card v-bind:key="id" v-for="(element, id) in resultSearching" class="vcardEspacio">
                        <v-card-title class="GoogleTitle">
                                <span
                                  @click="verPDF(element.path, element.id)"
                                  v-bind:class="{visitado:element.visitado}"
                                >{{element.path}}</span>
                              </v-card-title>
                        <v-card-text class="GoogleSubtitle">
                                <span>Fecha de creación: {{element.last_modified}}</span>
                              </v-card-text>
                              <v-card-text class="GoogleContent">
                                <v-flex xs12 sm12 md12 lg12 xl12>Tipo de contenido: {{element.content_type}}</v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12>Nombre del recurso: {{element.resourcename}}</v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12>Autor: {{element.author}}</v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12>Versión: {{element.version}}</v-flex>
                              </v-card-text>
                      </v-card>
                      </div>
                  </template>
                  <!-- front --->
                  <!--  back --->
                  <template slot="back">
                    <v-flex xs12 md7  hidden-md-and-up>
                      <v-card v-bind:height="maxHeightPDF" v-bind:width="maxWidthPDF"  >
                        <v-card-title></v-card-title>
                              <iframe v-bind:src="urlPDF" class="framePDF" ></iframe>
                        <v-card-text>
                          </v-card-text>
                      </v-card>
                  </v-flex>

                  <v-flex xs12 md11   hidden-sm-and-down>
                      <!--<v-card v-bind:height="maxHeightPDF" v-bind:width="maxWidthPDF"  >
                        <v-card-title></v-card-title>
                              
                        <v-card-text>
                          Search engine powered by Solr
                          </v-card-text>
                      </v-card>-->
<v-card v-bind:key="id" v-for="(element, id) in resultSearching" class="vcardEspacio">
                        <v-card-title class="GoogleTitle">
                                <span
                                  @click="verPDF(element.path, element.id)"
                                  v-bind:class="{visitado:element.visitado}"
                                >{{element.path}}</span>
                              </v-card-title>
                        <v-card-text class="GoogleSubtitle">
                                <span>Fecha de creación: {{element.last_modified}}</span>
                              </v-card-text>
                              <v-card-text class="GoogleContent">
                                <v-flex xs12 sm12 md12 lg12 xl12>Tipo de contenido: {{element.content_type}}</v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12>Nombre del recurso: {{element.resourcename}}</v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12>Autor: {{element.author}}</v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12>Versión: {{element.version}}</v-flex>
                              </v-card-text>
                      </v-card>
                      
                  </v-flex>


                  </template>
                  <!--  back --->
                </FlipCard>
              </v-flex>

                <v-flex xs12 md7  hidden-sm-and-down>
                <v-card v-bind:height="maxHeightPDF"  >
                  <!--<v-card-title></v-card-title> -->
                        <iframe v-bind:src="urlPDF" class="framePDF"></iframe>
                  <v-card-text>
                    </v-card-text>
                </v-card>
              </v-flex>
          
       
      
         </v-layout>
        </v-container>

  </div>
</template>

<script>
   import axios from "axios";
   import FlipCard from '@/components/afiliacion/FlipCard'
   

   export default {
     components: {
    FlipCard,
    },
    data(){
      return{
        resultSearching: [{
                id: 0,
                path: 'Motor de busqueda Afiliación2.0',
                last_modified: '2019',
                content_type: '["application/pdf"]',
                resourcename: 'Motor de busqueda indexado, powered by Solr',
                author: 'Erdnando',
                version: '1.0.0.0.0      Ingrese su busqueda y presione enter',
                visitado: false
               }
        ],
        inputSearch: '',
        onedrive:'https://drive.google.com/viewerng/viewer?embedded=true&url=',
        urlPDF: this.onedrive+"https://sminet.com.mx/docs/0.pdf",
        maxHeightPDF:'',
        maxWidthPDF:'',
        maxHeightResults:''
      }
    },
    created(){
            this.urlPDF = "https://drive.google.com/viewerng/viewer?embedded=true&url=https://sminet.com.mx/docs/0.pdf";
    },
    mounted() {
    this.onResize();
    //se agrega listener al evento onResize de js
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
    computed: {
    searchErrors() {
      const errors = [];
      /*
      if (!this.$v.inputSearch.$dirty) return errors;
      !this.$v.inputSearch.required &&
        errors.push("Escribe algún valor a buscar");
      return errors;*/
      return errors;
    }
  },
    methods:{
        verPDF(path, id) {

          if(path.startsWith('Motor de')){
                this.resultSearching[id].visitado = true;
                this.indiceResultado = id;
                this.ispdfVisible = true;
                this.urlPDF = this.onedrive+"https://sminet.com.mx/docs/0.pdf";
                return;
            }

          //console.log('url--->'+path);
            this.resultSearching[id].visitado = true;
            // let visitado = this.resultSearching[id].visitado = !this.resultSearching[id].visitado;

            this.indiceResultado = id;
            var armUrl = path.split("\\");
            this.ispdfVisible = true;
            this.urlPDF = this.onedrive+"https://sminet.com.mx/docs/" + armUrl[armUrl.length - 1];
            console.log(this.urlPDF);
            //this.onResize();
          },
          onResize() {
            //let resolucionPrimaria = window.innerHeight;
            this.maxHeightPDF= (window.innerHeight-230)+'px';//240
            this.maxHeightResults= (window.innerHeight-218)+'px';//208

            //this.maxWidthPDF=(window.innerWidth/2.6)+'px';    //(this.maxHeightResults+100)+'px'
            /*this.pdfInternoVisible = false;
            this.pdfExternoVisible = false;
            if (resolucionPrimaria < 600) {
              this.pdfInternoVisible = true;
            }
            if (resolucionPrimaria > 600 && resolucionPrimaria < 960) {
              this.pdfInternoVisible = true;
            }
            if (resolucionPrimaria > 960 && resolucionPrimaria < 1264) {
              this.pdfExternoVisible = true;
            }
            if (resolucionPrimaria > 1264 && resolucionPrimaria < 1904) {
              this.pdfExternoVisible = true;
            }
            if (resolucionPrimaria > 1904) {
              this.pdfExternoVisible = true;
            }
            
            if(this.arrayResolucion.xs == true){
                this.pdfInternoVisible = true;
            }
            if(this.arrayResolucion.sm == true){
              this.pdfInternoVisible = true;
            }
            if(this.arrayResolucion.md == true){
              this.pdfExternoVisible = true;
            }
            if(this.arrayResolucion.lg == true){
              this.pdfExternoVisible = true;
            }
            if(this.arrayResolucion.xl == true){
              this.pdfExternoVisible = true;
            }
            */
          },
          realizarConsulta() {
            
            this.resultServer = [];
            this.resultSearching = [];

            
            if(this.inputSearch.trim()==''){
                  this.resultSearching = [{
                      id: 0,
                      path: 'Motor de busqueda Afiliación2.0',
                      last_modified: '2019',
                      content_type: '["application/pdf"]',
                      resourcename: 'Motor de busqueda indexado, powered by Solr',
                      author: 'Erdnando',
                      version: '1.0.0.0.0      Ingrese su busqueda y presione enter',
                      visitado: false
                    }];

                    this.urlPDF= this.onedrive+"https://sminet.com.mx/docs/0.pdf"
                    return;
            }

      /*"http://74.208.98.86:8183/solr/afiliacionRumania/select?fq=" +
                    this.inputSearch.trim() +
                    "&q=*%3A*"*/
      
            setTimeout(() => {
              axios
                .get(
                  "https://sminet.com.mx/Digital.Docs.Service/Service1.svc/API/select/" + this.inputSearch.trim() ,
                  {
                    headers: {}
                  }
                )
                .then(respuesta => {
                  return respuesta.data.response.docs;
                })
                .then(respuestaJson => {
                  let indice = 0;
                  for (let id in respuestaJson) {
                    let resp = {
                      id: indice++,
                      path: (respuestaJson[id].id).replace('D:','...'),
                      last_modified: respuestaJson[id].last_modified,
                      content_type: respuestaJson[id].content_type,
                      resourcename: respuestaJson[id].resourcename,
                      author: respuestaJson[id].author,
                      version: respuestaJson[id]._version_,
                      visitado: false
                    };

                    this.resultSearching.push(resp);
                  }
                })
                .catch(error => {
                  console.log(error);
                  this.$emit("update:dialogm", false);
                  window.getApp.$emit("SERVICE_ERROR");
                })
                .finally(() => {
                  //this.$root.$dialogLoader.hide();
                });
            }, 2000);
    }
    }
    
  }
</script>

<style>

.txtBuscador{
    margin-top: 0px;  
}
.resultados{
    margin-top: -30px; 
    margin-right: 10px;
}
.visitado {
  color: gray;
  text-decoration: line-through;
}
.GoogleTitle {
  font-family: arial, sans-serif;
  font-size: 18px;
  line-height: 1;
  color: #1a0dab;
  text-decoration: underline;
  display: inline-block;
  font-weight: normal;
  cursor: pointer;
}
.GoogleSubtitle {
  font-size: 14px;
  padding-top: 1px;
  margin-top: -20px;
  color: #006621;
  font-style: normal;
  font-family: arial, sans-serif;
}
.GoogleContent {
  margin-top: -30px;
  word-wrap: break-word;
  color: #545454;
  font-family: arial, sans-serif;
  font-size: small;
  font-weight: normal;
  list-style: none;
}
.framePDF {
  width: 100%;
  height:100%
}
.vcardEspacio{
  margin-right: 10px;
}
  
     
</style>