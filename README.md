# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).



   axios.get(`https://api.tomtom.com/search/2/geometryFilter.json/${this.jsonPoilist}.json`,{
                 params:{
                    key:"03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
                    geometryList:{
                         "type": "CIRCLE",
                         "position": `${this.firstApi.lat} , ${this.firstApi.lon}`,
                         "radius": 20000
                    }
                    
                     
                     
                    }
                        


                        <script>
import axios from "axios";
import { store } from "../../store.js";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {
      callTheApartments(){
            axios
            .get('http://localhost:8000/api/apartments',{
                params:{
                   
                }
            })
            .then(response=>{
                this.store.apartments = response.data.result;
                this.store.FilteredApartments = []
            })
        },
  },
};
  
              
                
</script>

<template>
  <header class="container-fluid text-center shadow-sm">
    <div class="row justify-content-between align-items-center h-100">

      <!-- Logo a sinistra -->
      <div class="col-auto">
        <div class="img-box w-100 mx-2">
          <router-link class="router-link"   :to="{ name: 'Home-page' }">
            <img src="../../public/img/logos/boolbnb-rosa-trasparente-300px.PNG" alt="logo BoolBnb" />
          </router-link>
        </div>
      </div>
      
      <!-- Menu a destra -->
      <div class="col-auto d-flex">
        <div class="col-auto">
          <router-link class="router-link"   :to="{ name: 'Home-page' }">
            <span class="hov-underline mx-2" @click="callTheApartments()">Homepage</span>
          </router-link>
        </div>
        <div class="col-auto">
          <a class="hov-underline mx-2" href="http://127.0.0.1:8000/admin/dashboard">Area Riservata</a>
        </div>
        <div class="col-auto">
          <a class="hov-underline mx-2" href="http://localhost:8000/login">Login</a>
        </div>
        <div class="col-auto">
          <a class="hov-underline mx-2" href="http://localhost:8000/register">Registrati</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;

header {
  color:#2a2a2a;
  height: 80px;
  background-color: white;
  position: fixed;
  z-index: 2;
  .router-link {
    color: #2a2a2a;
    text-decoration: none;
    border-radius: 30px;
    span {
      color: #2a2a2a;
    }
  }
  .img-box{
    height: 80px;
    img{
      padding: 15px 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  a {
    text-decoration: none;
    color:#2a2a2a;
  }

  .hov-underline {
  position: relative;
  display: inline-block;
  padding-bottom: 3px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease; /* Aggiungi una transizione fluida per l'effetto hover */
  }
  /* Animazione per la sottolineatura */
  .hov-underline::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0; /* Inizia senza larghezza */
    height: 2px; /* Altezza della sottolineatura */
    background-color: #2a2a2a; 
    transition: width 0.3s ease; /* Aggiungi una transizione fluida per l'animazione */
  }
  .hov-underline:hover::after {
    width: 100%; /* Espandi la larghezza al 100% durante l'hover */
  }
}

  
</style>


<div class="modal" :class="{ 'is-active': showModal }">
            <div class="modal-background" @click="closeModal"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Contatta l'host</p>
                    <button class="delete" aria-label="close" @click="closeModal"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Inserisci il form qui -->
                    <h5 class="text-center mt-2" v-if="flag">{{ backendMessage }}</h5>
                    <form class="p-3 " :class="flag ? 'green-form':''" @submit.prevent method="post">
                        <div class="row">
                            <div class="col-12 col-sm-6 mb-3">
                                <label for="name"> Inserisci il tuo nome </label>
                                <input
                                    class="form-control"
                                    type="text"
                                    v-model="message.name"
                                    name="name"
                                    id="name"
                                    cols="30"
                                    rows="10"
                                    
                                    maxlength="100"
                                />
                            </div>

                            <div class="col-12 col-sm-6 mb-3">
                                <label for="last_name"> Inserisci il tuo cognome </label>
                                <input
                                    class="form-control"
                                    type="text"
                                    v-model="message.last_name"
                                    name="last_name"
                                    id="last_name"
                                    cols="30"
                                    rows="10"
                                    
                                    maxlength="100"
                                />
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="email"> Inserisci la tua mail <span class="text-danger">*</span></label>
                            <input
                                class="form-control"
                                type="text"
                                v-model="message.email"
                                name="email"
                                id="email"
                                cols="30"
                                rows="10"
                                required
                                maxlength="100"
                            />
                        </div>

                            <div class="mb-3">
                            <label for="text"> Scrivi un messaggio all'host <span class="text-danger">*</span></label>
                            <textarea  required id="message" v-model="message.text" class="form-control" placeholder="Scrivi qui il tuo messaggio" ></textarea>
                        </div>

                        <button @click="sendMessage" class="btn btn-outline-dark">
                        Invia il messaggio
                        </button>
                        
                    </form>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="sendMessage">Invia</button>
                    <button class="button" @click="closeModal">Annulla</button>
                </footer>
            </div>