<script>
import ApartmentComponent from "../components/ApartmentComponent.vue";
import FilteredApartmentComponent from "../components/FilteredApartmentComponent.vue";
import axios from "axios";
import { store } from "../../store.js";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Exception } from "sass";

export default {
  data() {
    return {
      store,
      suggestionResult: null,
      img_carousel: [
        "pexels-casia-charlie-2433467.jpg",
        "pexels-christian-heitz-842711.jpg",
        "pexels-eberhard-grossgasteiger-443446.jpg",
        "pexels-kyle-loftus-2734428.jpg",
        "pexels-m-venter-1659438.jpg",
        "pexels-pixabay-36478.jpg",
        "pexels-pixabay-247599.jpg",
        "pexels-pixabay-237272.jpg",
        "pexels-pixabay-261101.jpg",
      ],
      modules: [Autoplay],
    };
  },
  methods: {
    saveAddress(elem) {
      store.userSearch = elem;
      store.isChecked = true;
      this.suggestionResult = null
    },
    callTheApartmentsNormal() {
      axios
        //faccio la prima chiamata al mio backend per ricevere tutti gli appartamenti del database
        .get("http://localhost:8000/api/apartments", {
          params: {},
        })
        .then((response) => {
          //Inserisco la risposta in una variabile nello store
          this.store.apartments = response.data.result;
          this.store.notSponsoredApartments = [];
          this.store.sponsoredApartments = [];
          for (let i = 0; i < this.store.apartments.length; i++) {
            if (
              response.data.result[i].sponsorships.length > 0 &&
              response.data.result[i].availability == 1
            ) {
              this.store.sponsoredApartments.push(response.data.result[i]);
            }
          }
          for (let i = 0; i < this.store.apartments.length; i++) {
            if (
              response.data.result[i].sponsorships.length == 0 &&
              response.data.result[i].availability == 1
            ) {
              this.store.notSponsoredApartments.push(response.data.result[i]);
            }
          }
        });
    },
    searchApartment() {
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
              this.store.sponsoredFilteredApartments = [];
              this.store.unSponsoredFilteredApartments = [];
              for (let i = 0; i < this.store.FilteredApartments.length; i++) {
                if (
                  this.store.FilteredApartments[i].sponsorships.length > 0 &&
                  this.store.FilteredApartments[i].availability == 1
                ) {
                  this.store.sponsoredFilteredApartments.push(
                    this.store.FilteredApartments[i]
                  );
                }
              }
              for (let i = 0; i < this.store.FilteredApartments.length; i++) {
                if (
                  this.store.FilteredApartments[i].sponsorships.length == 0 &&
                  this.store.FilteredApartments[i].availability == 1
                ) {
                  this.store.unSponsoredFilteredApartments.push(
                    this.store.FilteredApartments[i]
                  );
                }
              }
            });
        });
    },

    handleInputClick() {
      let addressInput = this.store.userSearch;

      const input = addressInput.trim();

      store.isChecked = false;

      fetch(
        `https://api.tomtom.com/search/2/search/${input}.json?key=03zxGHB5yWE9tQEW9M7m9s46vREYKHct`
      )
        .then((response) => response.json())
        .then((data) => {
          try {
            if (data || data != undefined) {
              this.suggestionResult = data.results;
            }
          } catch (e) {
            console.log(e.message);
          }
        })
        .catch((error) =>
          console.error("Errore durante il recupero dei suggerimenti:", error)
        );
    },
  },
  components: {
    ApartmentComponent,
    FilteredApartmentComponent,
    Swiper,
    SwiperSlide,
  },
  mounted() {
    if (this.store.text) {
    } else {
    }
    gsap.registerPlugin(TextPlugin);
    gsap.from(".sponsorized", {
      x: -500,
      duration: 1,
      delay: 3,
      ease: "power4",
    });
    if (this.store.text) {
      setTimeout(() => {
        this.callTheApartmentsNormal();
      }, 2200);
      setTimeout(() => {
        gsap.to(".text", {
          text: "Scegli un appartamento, ti ci portiamo noi",
          duration: 2,
          ease: "linear",
        });
        gsap.fromTo(
          ".text",
          { width: 0 },
          { width: "50%", duration: 2, ease: "linear" }
        );
      }, 3000);
      this.store.text = false;
    } else {
      this.callTheApartmentsNormal();
      gsap.to(".text", {
        text: "Scegli un appartamento, ti ci portiamo noi",
        duration: 2,
        ease: "linear",
      });
      gsap.fromTo(
        ".text",
        { width: 0 },
        { width: "50%", duration: 2, ease: "linear" }
      );
    }
    window.addEventListener("click", function () {
      let suggestionContainer = document.getElementById("suggestions");

      if (suggestionContainer != undefined) suggestionContainer.innerHTML = "";
    });

    window.addEventListener("scroll", function () {
      var scrollButton = document.querySelector(".scroll-to-top");
      if (window.scrollY > 100) {
        scrollButton.style.display = "block";
      } else {
        scrollButton.style.display = "none";
      }
    });
    document
      .querySelector(".scroll-to-top")
      .addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row shadow">
      <div class="col-12 p-0">
        <swiper
          :slidesPerView="1"
          :spacebetween="10"
          :loop="true"
          :pagination="{
            clickable: true,
          }"
          :autoplay="{
            delay: 2500,
          }"
          :modules="modules"
          class="mySwiper p-0 position-relative"
        >
          <swiper-slide v-for="(elem, i) in img_carousel">
            <img :src="'public/img/img-carousel/' + elem" alt="" />
          </swiper-slide>
          <p class="position-absolute text"></p>
        </swiper>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-column align-items-center">
          <div class="d-flex flex-column mt-5">
            <div class="px-2 text-center">
              Cerca Appartamenti nel raggio di 20km:
            </div>
            <div class="d-flex">
              <input
                @keyup="handleInputClick"
                class="form-control my-2 user-search"
                v-model="store.userSearch"
                type="text"
                id="first-search"
                placeholder="Inserisci un indirizzo qui"
                autocomplete="off"
              />
              <router-link
                v-if="store.isChecked"
                :to="{ name: 'advanced-search' }"
                @click="searchApartment"
                class="my-primary-button m-2"
                id="search-button-after-check"
              >
                SEARCH
              </router-link>
              <button
                v-else
                class="my-primary-button m-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                SEARCH
              </button>
            </div>
          </div>
          <div v-if="suggestionResult != null" class="position-relative list-box">
            <ul  id="suggestions">
              <li
                class="suggestion-item"
                @click="saveAddress(elem.address.freeformAddress)"
                v-for="elem in suggestionResult"
              >
                {{ elem.address.freeformAddress }}
              </li>
            </ul>
          </div>
          <div class="scroll-to-top" @click="scrollToTop">
            <i class="fas fa-arrow-up"></i>
          </div>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Attenzione!
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Devi scegliere un indirizzo dalla lista dei suggerimenti
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="my-primary-button"
                    data-bs-dismiss="modal"
                  >
                    CHIUDI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- v-if="store.FilteredApartments.length === 0" -->
      <div class="col-12">
        <h1 class="sponsorized"></h1>
        <div class="d-flex flex-wrap border-bottom">
          <ApartmentComponent
            v-for="(elem, i) in store.sponsoredApartments"
            :apartment="elem"
            :key="i"
            class="box"
          />
          <ApartmentComponent
            v-for="(x, j) in store.notSponsoredApartments"
            :apartment="x"
            :key="j"
            class="box"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/mixins.scss" as *;

@use "../assets/scss/main" as *;
.user-search {
  width: 400px;
  border-radius: 50px;
}

.my-primary-button {
  @include primary-button-styles;
}

.btn-close {
  color: #ec5a64;
}

#search-button-after-check {
  padding-top: 5px;
  padding-bottom: 5px;
}

.list-box {
  width: 600px;
  #suggestions {
    background-color: rgba(0, 0, 0, 0.22);
    padding: 15px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    border: 2px solid #ec5a64;
    border-radius: 10px;
    .suggestion-item {
      padding: 10px;
      background-color: white;
      list-style: none;
      border-bottom: 1px solid lightgray;
      &:hover {
        background-color: lightgray;
      }
    }
  }
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
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
  }
}

.text {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  min-width: 0;
  height: 100px;
  line-height: 100px;
  border-radius: 10px;
  text-align: center;
  background-color: rgba($color: #000000, $alpha: 0.5);
}

.scroll-to-top i {
  font-size: 20px;
}

// slider-top
.swiper {
  width: 100%;
  height: 500px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1400px) {
  .text {
    width: 80% !important;
    font-size: 1.5rem;
  }
}

@media (max-width: 1200px) {
  .text {
    width: 70% !important;
  }
}

@media (max-width: 992px) {
  .text {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .text {
    display: none;
  }
}

@media (max-width: 575px) {
  .user-search {
    width: 200px;
    border-radius: 50px;
    .text {
      display: none;
    }
  }

  #suggestions {
    width: 60%;
  }
}
</style>
