<script>
import axios from "axios";
import { store } from "../../store.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay} from 'swiper/modules';
import "swiper/css";
export default {
  data() {
    return {
      store,
      visibleDestinations: [],
      modules: [Autoplay],
      slider: [
        {
          icon: "client-logo-colored-02.png",
        },
        {
          icon: "client-logo-colored-03.png",
        },
        {
          icon: "client-logo-colored-04.png",
        },
        {
          icon: "client-logo-colored-05.png",
        },
        {
          icon: "client-logo-colored-06.png",
        },
      ],
      destinationsObjs: [
        [
          {
            destination: "Milano",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Bergamo",
            typeOfStay: "Soggiorni in chalet",
          },
          {
            destination: "Rovereto",
            typeOfStay: "Soggiorni in casale",
          },
          {
            destination: "Venezia",
            typeOfStay: "Soggiorni in alloggi sull'acqua",
          },
          {
            destination: "Firenze",
            typeOfStay: "Soggiorni in casale",
          },
          {
            destination: "Verona",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Lago di Garda",
            typeOfStay: "Soggiorni in alloggi sull'acqua",
          },
          {
            destination: "Bolzano",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Genova",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Trento",
            typeOfStay: "Soggiorni in casale",
          },
          {
            destination: "Mantova",
            typeOfStay: "Soggiorni in chalet",
          },
          {
            destination: "Ferrara",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Lago d'orta",
            typeOfStay: "Soggiorni in casale",
          },
          {
            destination: "Vicenza",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Bellagio",
            typeOfStay: "Soggiorni in chalet",
          },
        ],
        [
          {
            destination: "Sirmione",
            typeOfStay: "Soggiorni in case",
          },
          {
            destination: "Cinque Terre",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Portofino",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Santa Margherita Ligure",
            typeOfStay: "Soggiorni in alloggi sull'acqua",
          },
          {
            destination: "Rapallo",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Viareggio",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Lido di Venezia",
            typeOfStay: "Soggiorni in alloggi sull'acqua",
          },
          {
            destination: "Jesolo",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Rimini",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Sestri Levante",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Alassio",
            typeOfStay: "Soggiorni in chalet",
          },
          {
            destination: "Sanremo",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Cattolica",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Grado",
            typeOfStay: "Soggiorni in alloggi sull'acqua",
          },
          {
            destination: "Finale Ligure",
            typeOfStay: "Case vacanze",
          },
        ],
        [
          {
            destination: "Isola d'Elba",
            typeOfStay: "Soggiorni in alloggi sull'acqua",
          },
          {
            destination: "Isola Bella",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Isola dei Pescatori",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Isola Comacina",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Isola di Burano",
            typeOfStay: "Soggiorni in chalet",
          },
          {
            destination: "Ischia",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Isola di San Giulio",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Isola di San Nicola",
            typeOfStay: "Soggiorni in chalet",
          },
          {
            destination: "Isola di San Domino",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Isola di Pianosa",
            typeOfStay: "Case vacanze",
          },
        ],
        [
          {
            destination: "Cortina d'Ampezzo",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Livigno",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Bormio",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Courmayeur",
            typeOfStay: "Soggiorni in chalet",
          },
          {
            destination: "Sestriere",
            typeOfStay: "Soggiorni in chalet",
          },
          {
            destination: "Madonna di Campiglio",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Limone Piemonte",
            typeOfStay: "Case vacanze",
          },
          {
            destination: "Alagna Valsesia",
            typeOfStay: "Soggiorni in chalet",
          },
          {
            destination: "Macugnaga",
            typeOfStay: "Soggiorni in appartamenti",
          },
          {
            destination: "Sappada",
            typeOfStay: "Case vacanze",
          },
        ],
      ],
      destinations: ["Popolari", "Sul litorale", "Isole", "Montagne"],
      footerList: [
        {
          title: "Assistenza",
          list: [
            "Centro assistenza",
            "AirCover",
            "Antidiscriminazione",
            "Supporto alla disabilità",
            "Opzioni di cancellazione",
            "Segnala problema nel quartiere",
          ],
        },
        {
          title: "Ospitare",
          list: [
            "Apri un Boolbnb",
            "AirCover per gli host",
            "Risorse per gli host",
            "Forum della community",
            "Ospitare responsabilmente",
            "Partecipa a una lezione gratuita sull'ospitalità",
          ],
        },
        {
          title: "Boolbnb",
          list: [
            "Newsroom",
            "Nuove funzionalità",
            "Opportunità di lavoro",
            "Investitori",
            "Gift card",
            "Soggiorni con Boolbnb.org",
          ],
        },
      ],
      activeIndex: 0,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },

  methods: {
    getImagePath: function (imgPath) {
      return new URL(imgPath, import.meta.url).href;
    },
    changeActiveIndex(i) {
      this.activeIndex = i;
      this.visibleDestinations = [];
      this.visibleDestinations.push(this.destinationsObjs[this.activeIndex]);
    },
    footerAdvancedSearch(obj) {
      this.store.userSearch = obj.destination
      axios
        // Faccio la prima chiamata API a tomtom e faccio trasformare l'input dell'utente in latitudine e longitudine
        .get(
          "https://api.tomtom.com/search/2/geocode/.json?key=03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
          {
            params: {
              query: this.store.userSearch,
            },
          }
        )
        .then((responseOne) => {
          this.store.firstApi = responseOne.data.results[0].position;
          axios
            .get("http://localhost:8000/api/getApartments", {
              params: {
                lat: this.store.firstApi.lat,
                lon: this.store.firstApi.lon,
              },
            })
            .then((response) => {
              this.store.FilteredApartments = response.data.result;
            });
        });
    },
  },
  mounted() {
    this.visibleDestinations.push(this.destinationsObjs[this.activeIndex]);
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row mt-4">
    <h3 class="text-center">I nostri Sponsor</h3>
    <div class="col-12 my-5">
      <swiper
        :slidesPerView="1"
        :spaceBetween="10"
        :loop="true"
        :autoplay="{
          delay: 3000,
        }"
        :breakpoints="{
          '640': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          '1024': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide class="mySwiper" v-for="(elem, i) in slider">
          <img :src="getImagePath('/img/' + elem.icon)" alt=""  id="carousel-sponsorship"/>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  </div>

  <footer class="footer-bg">
    <div class="container pt-5 pb-5 special-height">
      <div class="future-trips-container">
        <h4 class="mb-4">Ispirazione per viaggi futuri</h4>
        <ul class="list-unstyled mb-5">
          <li
            @click="changeActiveIndex(i)"
            v-for="(elem, i) in destinations"
            class="d-inline-block pb-3 pt-3"
            :class="activeIndex == i ? 'active' : ''"
          >
            <span v-if="i == 0" class="ps-0 pe-3">{{ elem }}</span>
            <span
              v-if="i > 0 && i < destinations.length - 1"
              class="ps-3 pe-3"
              >{{ elem }}</span
            >
            <span v-if="i == destinations.length - 1" class="ps-3 pe-0">{{
              elem
            }}</span>
          </li>
        </ul>
        <div class="row">
          <div
            v-for="(elem, i) in visibleDestinations[0]"
            class="col-12 col-sm-6 col-md-4 col-lg-2 mb-3 pointer"
          >
            <router-link
              :to="{ name: 'advanced-search' }"
              @click="footerAdvancedSearch(elem)"
              class="text-decoration-none"
            >
              <div class="text-dark hov-underline">
                <strong>{{ elem.destination }}</strong>
              </div>
              <div class="text-secondary">
                {{ elem.typeOfStay }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <hr class="m-0" />
    <div class="container">
      <div class="row pt-5 pb-5">
        <div v-for="(elem, i) in footerList" class="col-12 col-md-4 pointer">
          <div class="mb-3">
            <strong class="hov-underline">{{ elem.title }}</strong>
          </div>
          <div v-for="(elem, j) in footerList[i].list" class="mb-3">
            {{ elem }}
          </div>
        </div>
      </div>
      <hr class="m-0" />
    </div>
    <div class="container pt-4 pb-4">
      <div class="row">
        <div class="col-12 col-md-auto">
          <div class="d-md-flex justify-content-md-end">
            <span class="pe-1"> © 2024 Boolbnb, Inc. </span>
            <span class="ps-1 pe-1"> · </span>
            <span class="pointer ps-1 pe-1"> Privacy </span>
            <span class="ps-1 pe-1"> · </span>
            <span class="pointer ps-1 pe-1"> Termini </span>
            <span class="ps-1 pe-1"> · </span>
            <span class="pointer ps-1 pe-1"> Mappa del sito </span>
            <span class="ps-1 pe-1"> · </span>
            <span class="pointer ps-1"> Dettagli dell'azienda </span>
          </div>
        </div>
        <div class="col-12 col-md">
          <div
            class="d-flex justify-content-center d-lg-flex justify-content-lg-end"
          >
            <span class="pointer pe-1">
              <i class="fa-solid fa-globe"></i> Italiano (IT)
            </span>
            <span class="pointer ps-1 pe-1">
              <i class="fa-brands fa-square-facebook"></i>
            </span>
            <span class="pointer ps-1 pe-1">
              <i class="fa-brands fa-twitter"></i>
            </span>
            <span class="pointer ps-1">
              <i class="fa-brands fa-square-instagram"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss";
@use "../assets/scss/main.scss" as *;
.pointer {
  cursor: pointer;
}
.special-height {
  min-height: 530px;
}
.footer-bg {
  background-color: #f7f7f7;
  ul {
    border-bottom: 1px solid #dddddd;
    li {
      cursor: pointer;
    }
    .active {
      border-bottom: 3px solid black;
    }
  }
}

#carousel-sponsorship {
  width: 120px;
}
.hov-underline {
        position: relative;
        display: inline-block;
        font-size: 1.2 rem;
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
    .mySwiper{
      background-color: #F5F5F7;
    }
</style>
