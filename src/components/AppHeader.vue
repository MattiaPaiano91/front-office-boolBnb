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
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top sticky-top vh-10 z-2 position-absolute">
        <div class="container-fluid">
            <router-link class="navbar-brand router-link" :to="{ name: 'Home-page' }" @click="callTheApartments()">
                <img src="../../public/img/logos/boolbnb-rosa-trasparente-150px.PNG" class="logo" alt="logo BoolBnb" />
            </router-link>

            <!-- Toggle -->
            <button class="navbar-toggler shadow-none border-0" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar" 
            aria-controls="offcanvasNavbar" 
            >
            <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Sidebar Header -->
            <div class="sidebar offcanvas offcanvas-end" 
                tabindex="-1" 
                id="offcanvasNavbar" 
                aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">                    
                    <img src="../../public/img/logos/boolbnb-rosa-trasparente-150px.PNG" alt="logo BoolBnb" />
                    <button 
                    type="button" 
                    class="btn-close shadow-none" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Close"></button>
                </div>

                <!-- Sidebar Body -->
                <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
                    <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                        <li class="nav-item mx-4">
                            <router-link class="hov-underline nav-link active router-link p-0" :to="{ name: 'Home-page' }" @click="callTheApartments()">
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item mx-4">
                            <a href="http://127.0.0.1:8000" target="_blank" class="text-black text-decoration-none ">
                                <span class="hov-underline">
                                    Area Personale
                                </span>
                            </a>                            
                        </li>
                    </ul>

                    <!-- Login / Sign up -->
                    <div class="login-box d-flex flex-column flex-lg-row justify-content-center align-items-center gap-5">
                        <a href="http://127.0.0.1:8000/login" class="login hov-underline"> Login </a>
                        <a href="http://127.0.0.1:8000/register" class="my-primary-button"> Registrati </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  </header>

</template>

<style lang="scss" scoped>

@use '../assets/scss/partials/mixins.scss' as *;
@use "../assets/scss/main.scss" as *;


header{
    height: 80px;
    background-color: white;
    position: fixed;
    z-index: 3;
    font-size: 1.2rem;
    background-color: #F5F5F7;

    .navbar-brand, .register{
        margin: 0 20px;
        border-radius: 20px;
    }

    .hov-underline {
        position: relative;
        display: inline-block;
        font-size: 1.2  rem;
        //padding-bottom: 3px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: border-color 0.3s ease; /* Aggiungi una transizione fluida per l'effetto hover */
        &:hover{
            transform: scale(1.1);
        }
    }
    /* Animazione per la sottolineatura */
    .hov-underline::after {
    content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0; /* Inizia senza larghezza */
        height: 2px; /* Altezza della sottolineatura */
        background-color: #EB5A63; 
        transition: width 0.3s ease; /* Aggiungi una transizione fluida per l'animazione */
        transform: scale(1.1);
    }
    .hov-underline:hover::after {
        width: 100%; /* Espandi la larghezza al 100% durante l'hover */
        
    }
    
    .login{
        color: #EB5A63;
        text-decoration: none;
        font-weight: 600;
    }

    .my-primary-button {

        @include primary-button-styles;
        text-decoration: none;
        padding: 4px 20px;
        /* transition: transform 0.3s ease; /* Aggiungi transizione fluida per l'ingrandimento */

        /* &:hover {
            transform: scale(1.1); /* Inganna l'elemento del 10% durante l'hover */
        /*  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5); Aggiungi ombra 
        } */
    }
    
}
@media (max-width:768px) {
    
    .sidebar{
        backdrop-filter: blur(10px);
    }

    .nav-item {
        padding-bottom: 20px;
    }
    
}
</style>
