<script>
import axios from "axios";
export default {
  data() {
    return {
      apartment: null,
      flag:false,
      backendMessage: null,
      message: {
        name: null,
        last_name: null,
        text: null,
        email: null,
       
      },
      showModal: false,
       term: null
  };
},

methods: {
    sendMessage() {
      // Esegui la chiamata API POST
    if (this.message.name == '') {
        this.message.name = null
    }
    if (this.message.last_name == '') {
        this.message.last_name = null
    }
      console.log('messaggio',this.message)
      axios
        .post(
          `http://127.0.0.1:8000/api/store/${this.$route.params.slug}`,
          {
            text: this.message.text,
            name: this.message.name,
            last_name: this.message.last_name,
            email: this.message.email,
          },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
            if(response.data.success == true){
              this.message.name = null,
              this.message.last_name = null,
              this.message.text= null,
              this.message.email= null
              this.flag = true
              this.showModal = true 
              this.backendMessage = response.data.result
          }
          
        })
        .catch((error) => {
          // Gestisci gli errori
          console.error("Errore nella chiamata API:", error);
        });
    },
    closeModal() {
        this.showModal = false;
    },
    initMap(){
        
        let center = [this.apartment.longitude,this.apartment.latitude]
        const map = tt.map({
            key:"03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
            container:"map",
            center:center,
            zoom:14
        })
        map.scrollZoom.disable( );
        map.on('load',() => {
            new tt.Marker().setLngLat(center).addTo(map)
        })
    },
       scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth" 
                });
            }
},

    created() {
        axios
            .get(`http://localhost:8000/api/apartments/${this.$route.params.slug}`)
            .then((response) => {
                this.apartment = response.data.result;      
            })
            
            .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        });
    },
    mounted(){
        this.scrollToTop();
        this.initMap();
        fetch('https://api.ipify.org?format=json')
        .then(x => x.json())
        .then(({ ip }) => {
            this.term = ip;
           
            axios.post(`http://localhost:8000/api/view/${this.$route.params.slug}`,
            {
                ipAddress: this.term
            }
            ).then((response)=>{
                
            })
        });

        window.addEventListener('scroll', function() {
            var scrollButton = document.querySelector('.scroll-to-top');
            if (window.scrollY > 100) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });
        document.querySelector('.scroll-to-top').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
          
    },
         
};
</script>
    

<template>
    <div class="container-fluid mb-5">
        <div class="my-container">
            <div class="row">
                <div class="text-center mb-4">
                        <h1>
                            {{ apartment.name }}
                        </h1>
                    </div>
                <div class="col-12 col-sm-6 px-5"> 
                    <div class="img-box">
                        <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_cover_path" alt="Cover Image"/>
                    </div>
                </div>
                <div class="col-12 col-sm-6 px-5"> 
                    
                    <ul class="p-0" id="apartment-details">
                        <li>
                            <h5>{{ apartment.type_of_accomodation }}</h5>
                        </li>
                        <li>
                            L'alloggio si trova in {{ apartment.address }}
                        </li>
                        <li>
                            Il costo é di <span>{{ apartment.price }} € per notte. </span>
                        </li>
                        <li class="mt-4">
                            <div>
                                Caratteristiche dell'alloggio:
                                <ul class="p-0">
                                    <li>
                                        Numero di ospiti: {{ apartment.n_guests }}
                                    </li>
                                    <li>
                                        Numero di stanze: {{ apartment.n_rooms }}
                                    </li>
                                    <li>
                                        Numero di letti: {{ apartment.n_beds }}
                                    </li>
                                    <li>
                                        Numero di bagni: {{ apartment.n_baths }}
                                    </li>
                                    <li>
                                        Metratura {{ apartment.mq }} m²
                                    </li>
                                </ul>
                            </div>
                            <div class="my-4">
                                Servizi dell'appartamento:
                                <ul class="p-0">
                                    <li v-for="service in apartment.services" :key="service.id">
                                        <i :class="'fa-solid'  + ' '  + service.icon"></i><span>&nbsp&nbsp{{ service.type_of_service }}</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <div class="mobile-centered">
                        <a href="#contact-form-anchor" class="my-primary-button">
                            CONTATTA L'HOST
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <div class="scroll-to-top" @click="scrollToTop">
        <i class="fas fa-arrow-up"></i>
    </div>
        
    <div id="map">
        <!-- MAPPA TOM TOM PER LOCATION APPARTAMENTO -->
    </div>
    <div   id="contact-form-anchor"></div>
    <!-- INIZIO FORM -->
    <div class="container-fluid my-5" id="contact-form-container">
        <div class="my-container">
            <div class="col-12">
                <!-- messaggio dal backend per invio corretto del messaggio -->
                <!-- <h5 class="text-center mt-2" v-if="flag">{{ backendMessage }}</h5> -->

                <!-- se il messaggio é stato inviato si applica la classe green form -->
                <form class="p-3" @submit.prevent>
                    <div class="row">
                        <div class="text-center mb-4">
                            <h3>
                                Compila il nostro breve modulo di contatto qui sotto!
                            </h3>
                            <h6>
                                Il proprietario sarà lieto di rispondere alle tue domande e fornirti tutte le informazioni necessarie.
                            </h6>
                        </div>
                        <div class="col-12 col-sm-6 mb-3">
                            <label for="name">Il tuo nome</label>
                            <input class="form-control" type="text" v-model="message.name" name="name" id="name"  maxlength="100">
                        </div>

                        <div class="col-12 col-sm-6 mb-3">
                            <label for="last_name">Il tuo cognome</label>
                            <input class="form-control" type="text" v-model="message.last_name"  name="last_name" id="last_name" maxlength="100">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="email">la tua mail<span class="text-danger">*</span></label>
                        <input class="form-control" type="email" v-model="message.email" name="email" id="email" required maxlength="100">
                    </div>

                    <div class="mb-3">
                        <label for="text">Il tuo messaggio<span class="text-danger">*</span></label>
                        <textarea  required id="message" v-model="message.text" class="form-control" rows="10" placeholder="Scrivi qui il tuo messaggio" ></textarea>
                    </div>    

                    <button @click="sendMessage"  class="my-primary-button centered">
                        INVIA IL MESSAGGIO
                    </button>
                </form>
            </div>
        </div>
    </div>
<!-- FINE FORM -->
    

<!-- INIZIO MODAL -->
    <section >
        <div id="contact-form-modal" v-if="showModal" class="my-modal">
            <div class="my-modal-content">
                
                <!-- Icona che ci permette di chiudere il modale attraverso la funzione closeModal -->
                <span class="close" @click="closeModal">
                    <i class="fa-solid fa-xmark"></i>
                </span>
                <h3 class="text-center my-5">
                    Il tuo messaggio é stato inviato correttamente!
                </h3>
                <!-- <div class="mb-5">
                    <h5>
                        Ecco un reminder di quello che hai scritto:
                    </h5>
                    <ul class="p-0">
                        <li>
                            Nome: {{ message.name }}
                        </li>
                        <li>
                            Cognome: {{ message.last_name }}
                        </li>
                        <li>
                            La tua e-mail: {{ message.email }}
                        </li>
                        <li>
                            Testo del messaggio: {{ message.text }}
                        </li>

                    </ul>
                </div> -->

            </div>
        </div>
    </section>
<!-- FINE MODAL -->
</template>


<style lang="scss" scoped>

@use '../assets/scss/partials/mixins.scss' as *;
@use "../assets/scss/main.scss" as *;

.container-fluid {
    padding-left: 0;
    padding-right: 0;
    
}

.scroll-to-top {
    display: none;
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: rgba(235, 90, 99, 1);
    color: #fff;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
    z-index: 999;
    transition: transform 0.3s ease; /* Aggiungi transizione fluida per l'ingrandimento */

        &:hover {
            transform: scale(1.1); /* Inganna l'elemento del 10% durante l'hover */
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5); /* Aggiungi ombra */
        }
}

.scroll-to-top i {
    font-size: 20px;
}


@media (max-width: 575px) {
    .my-container {
        width: 100%; 
        margin: 0;
    }
    .detail {
        margin-top: 50px;
    }

    .mobile-centered {
        text-align: center; 
        display: flex;
        justify-content: center;
    }

    #apartment-details {
        margin-top: 30px;
        margin-bottom: 30px;
    }
}

@media (min-width: 576px) {
    .my-container {
        width: 1400px;
        margin: 0 auto;
    }

    .container-fluid {
    padding-top: 50px;
    }
}
a {
    text-decoration: none;
}
.centered {
    display: block;
    margin: auto;
}

.close {
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }

ul {
    li {
        list-style: none;
    }
}

.img-box {
    img {
        border-radius: 5px;
        width: 100%;
        object-fit: cover;
        height: 600px;
    }
}

.my-primary-button {
  @include primary-button-styles;
  padding-bottom: 8px;
  padding-top: 8px;
  padding: 8px 40px;
}

#map{
    width: 100%;
    height: 500px;
}

.my-modal { 
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
    }

    .my-modal-content {
        background-color: #ec5a64;
        margin: 15% auto; 
        padding: 20px 30px;
        border-radius: 12px;
        width: 1000px;
        color: white;

            >*{
            padding-bottom: 10px;
        }
        i {
            color: white;
        }
        i:hover {
            color: white;
        }
        #user-data {
            text-align: start;
        }
    }

</style>
