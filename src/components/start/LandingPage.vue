<template >
  <div class="LandingPage">
   
    <section>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Material Design</div>
                    </v-card-title>
                    <v-card-text>
                      Material design is a comprehensive guide for visual, motion, and interaction design across platforms and devices. To use material design in your Android apps, follow the guidelines defined in the material design specification and use the new components and styles available in the material design support library. This page provides an overview of the patterns and APIs you should use.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast development</div>
                    </v-card-title>
                    <v-card-text>
                      Rapid application development is an approach to information systems (IS) development which is much discussed in the practitioner literature. However, there is comparatively little research data on this topic. We conclude with a discussion of a number of important questions relating to further research on RAD.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Support Open Source</div>
                    </v-card-title>
                    <v-card-text>
                      Is a term used to refer to a type of software that is distributed through a license that allows the end user, if he has the necessary knowledge, to use the source code of the program to study it. , Modify and make improvements in it, may even redistribute it.
                      This type of software provides the features and advantages. with what the program once compiled better was improved when it left the computer of its original programmer. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="section1" height="380">

          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Starting business has never been so easy</div>
            <em>Kick-start your application today</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>


      <section>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The possibilities are endless</h2>
              <span class="subheading" style="width:50%;display: inline-block;">
                Generate integrations and automate your operation is difficult. We want to tell you that you are not alone, SMI Networks experts work with organizations like yours every day solving these difficult challenges and we are here to share that experience with you.
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">zoom_in</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Focus on Your Operation</div>
                    </v-card-title>
                    <v-card-text>
                      With us you don"t need to worry about infrastructure, disaster recovery, or dev ops. We work with different clouds such as amazon Web Services, Azure, IBM and we can adapt to other. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">domain</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Pricing from Startups to Enterprise</div>
                    </v-card-title>
                    <v-card-text>
                      We know that startups and experimentations are a core component to the success and speed of innovation in the software industry. That"s why we offer pricing from startups all the way to enterprise level businesses. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">scatter_plot</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Support for principal technologies</div>
                    </v-card-title>
                    <v-card-text>
                      We work with the main technologies of the market with our partners such as IBM, Microsoft, Oracle, Tibco and their technologies. For that reason our platforms inherit the robustness of our partners. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
       
       
        <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">monetization_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Everything You Need</div>
                    </v-card-title>
                    <v-card-text>
                      We focus on enabling enterprise platforms, giving you more time to focus on your operation 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">fingerprint</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fully Secured</div>
                    </v-card-title>
                    <v-card-text>
                      We make sure that your information is safeguarded in a secure and encrypted way. Your information can only be accessed by you
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">settings_input_antenna</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Real-Time Monitoring</div>
                    </v-card-title>
                    <v-card-text>
                      We constantly monitor the performance of the solutions to provide an availability of several nines. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
       
       
       
        </v-layout>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Information of the company</div>
                </v-card-title>
                <v-card-text>
                  SMI Networks is formed by an interdisciplinary team of professionals, 
                  with the experience to participate in business projects and willing to face the needs that new technologies require.
                </v-card-text>
                 <v-card-text>
                  Visit our page:  <a href="http://sminetworks.com" target="_blank">http://sminetworks.com</a>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">contact us</div>
                </v-card-title>
                <v-card-text>
                  We have a call center to give you answers to any question :).
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>+52 56.1372.4477</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>México, MX</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>contacto@sminetworks.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

        <v-footer dark height="auto">
          <v-layout row wrap align-center>
             <v-flex xs12 style="height:60px">
          <v-card flat tile class="indigo lighten-1 white--text text-xs-center">
            <v-card-text style="height:45px">
              <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
                <v-icon size="24px">{{ icon }}</v-icon>
              </v-btn>
            </v-card-text>
              <v-flex>
                <v-container >
                  <v-layout >
                    <v-flex xs12 md4>
                      <v-card class="elevation-0 transparent">
                        <v-card-text>
                          <v-btn @click="openPrivacidad">Privacy statement</v-btn>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-card class="elevation-0 transparent">
                        <v-card-text>
                         <v-btn @click="openTerminos">Terms of use</v-btn>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-card class="elevation-0 transparent">
                        <v-card-text>
                          <v-btn @click="openCookies">Cookies policy</v-btn>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
           <v-divider></v-divider>

            <v-card-text class="white--text" style="height:40px">
              &copy;2019 — <strong>Sminetworks</strong>
            </v-card-text>
          </v-card>
          </v-flex>
          </v-layout>
        </v-footer>




        <v-dialog :persistent=true v-model="dialogPrivacidad" width="500">
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
            Privacy statement
            </v-card-title>
            <v-card-text>
              SMI collects, uses, and processes Information as legally permitted, and as requested or consented by you. SMI strives to handle your Information in a manner consistent with the local privacy laws that apply to you and in the jurisdictions where SMI operates.
              When you use the Site or the Application or submit Information via the Site, the Application, or to SMI representatives across its offices in Mexico, you acknowledge that you have read and understood, and agree to be bound by this Privacy Statement and the SMI Terms of Use or eSignLive Terms of Use. If you submit Information of or about other persons, you represent that you have their consent or authority to consent to this Privacy Statement. To comply with applicable law, SMI may require that you signify in writing your consent or authority to consent to this Privacy Statement.
              You likewise signify consent to SMI’s use and processing of Information by participating in any SMI activity, or by not exercising your right to opt-out of marketing communications.
              SMI may have entered into separate written agreements with you that contain specific data protection provisions, in which case, the terms of such other written agreements prevail of general terms of this Privacy Statement in the context of the agreement.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="closeModales"  >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

         <v-dialog :persistent=true v-model="dialogTerminos" width="500">
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
             Terms of use
            </v-card-title>
            <v-card-text>
              This website (the “Site”) is owned and operated by SMI, and is subject to the following terms and conditions (“Terms of Use”). Access to and use of the Site and the information, materials, products and services available through the Site are subject to all applicable laws and to these Terms of Use. By accessing or using the Site, you signify your and your company’s agreement to these Terms of Use. If you do not agree to these Terms of Use, please do not access or use the Site. Also, by accessing or using the Site, you signify your agreement to the Privacy Statement. SMI's performance of these Terms of Use is subject to existing applicable laws and legal process, and nothing contained in these Terms of Use shall derogate SMI's right to comply with law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by SMI with respect to such use. We may provide notices to you via postings on the Site, via email or via any other means of communication for which you have provided contact information. If any provision of these Terms of Use shall be unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from these Terms of Use and shall not affect the validity and enforceability of any remaining provisions. No waiver of any provision of these Terms of Use by SMI shall be deemed a further or continuing waiver of such provision or any other provision, and SMI’s failure to assert any right or provision under these Terms of Use shall not constitute a waiver of such right or provision. These Terms of Use constitute the entire agreement between the parties relating to the subject matter herein, and replace all prior or contemporaneous communications, oral or written.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="closeModales"  >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

         <v-dialog :persistent=true v-model="dialogCookies" width="500">
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
             Politica de cookies
            </v-card-title>
            <v-card-text>
              SMI uses cookies and similar tools across the SMI website (the “Site”) to keep track of the products and services you request, to assist with the downloading or uploading of documents and other materials from and to the Site, to create a more personalized user experience, for standard Site traffic analysis, and to improve Site content and display. Please read this policy carefully for more details about the information we collect through the use of cookies when you use this Site. You are advised to also review SMI’s data privacy policy to understand how SMI otherwise will collect, transfer, disclose, process and use your personal data and personally identifiable information obtained by SMI when using this Site.
              By continuing to use this Site, you are agreeing to SMI placing cookies on your computer or mobile device as set forth in this policy. If you do not wish to accept cookies in connection with your use of this Site, you must stop using the Site.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="closeModales"  >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
 
  </div>


</template>

<script>
   export default {
     methods:{
       openPrivacidad(){
         this.dialogPrivacidad=true;
       },
       openTerminos(){
         this.dialogTerminos=true;
       },
       openCookies(){
         this.dialogCookies=true;
       },
        closeModales(){
         this.dialogPrivacidad=false;
         this.dialogTerminos=false;
         this.dialogCookies=false;
       }
     },
    data: () => ({
      dialogPrivacidad:false,
      dialogTerminos:false,
      dialogCookies:false,
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    }),
    computed:{
         section1 () {
       return require('../../assets/section.jpg')
       }
    }
  }
</script>

<style>

</style>