<script>
import axios from "axios";

import { store } from "../../store";

import AppHeader from "../components/AppHeader.vue";

import AppMain from "../components/AppMain.vue";

import AppFooter from "../components/AppFooter.vue";

import FilteredApartmentComponent from "../components/FilteredApartmentComponent.vue";

import FIlterSponsoredComponent from "../components/FIlterSponsoredComponent.vue";

export default {
  data() {
    return {
      store,
      nRooms: "",
      nBeds: "",
      radius: 20,
      services: [],
    };
  },
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  },
  methods: {
    callTheServices() {
      axios
        .get("http://localhost:8000/api/services", {
          params: {},
        })
        .then((response) => {
          this.store.services = response.data.result;
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
            });
        });
    },
    handleInputClick() {
      let suggestionsContainer = document.getElementById("suggestions");

      let addressInput = this.store.userSearch;

      const input = addressInput.trim();

      store.isChecked = false;

      if (input.length === 0) {
        suggestionsContainer.innerHTML = "";
        return;
      }

      fetch(
        `https://api.tomtom.com/search/2/search/${input}.json?key=03zxGHB5yWE9tQEW9M7m9s46vREYKHct`
      )
        .then((response) => response.json())
        .then((data) => {
          suggestionsContainer.innerHTML = ""; 

          data.results.forEach((result) => {

            const suggestion = document.createElement("li");

            suggestion.classList.add("suggestion-list");

            suggestion.textContent = result.address.freeformAddress;

            suggestion.addEventListener("click", function () {
              store.userSearch = result.address.freeformAddress;
              suggestionsContainer.innerHTML = "";
              store.isChecked = true;
            });

            suggestionsContainer.appendChild(suggestion);
          });
          document.addEventListener("click", function () {
            suggestionsContainer.innerHTML = "";
          });
        })
        .catch((error) =>
          console.error("Errore durante il recupero dei suggerimenti:", error)
        );
    },
    advancedResearch() {
      axios
        .get("http://localhost:8000/api/advancedResearch", {
          params: {
            lat: this.store.firstApi.lat,

            lon: this.store.firstApi.lon,

            nRooms: this.nRooms,

            nBeds: this.nBeds,

            distance: this.radius,

            services: this.services,

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
      setTimeout(() => {
        this.center = [this.store.firstApi.lon, this.store.firstApi.lat];

        this.myMap = tt.map({
          key: "03zxGHB5yWE9tQEW9M7m9s46vREYKHct",

          container: "ma",

          center: this.center,

          zoom: 10,
        });
        let map = this.myMap;
        for (let i = 0; i < this.store.FilteredApartments.length; i++) {

          var markerHeight = 50,

            markerRadius = 10,

            linearOffset = 25;

          var popupOffsets = {

            top: [0, 0],

            "top-left": [0, 0],

            "top-right": [0, 0],

            bottom: [0, -markerHeight],

            "bottom-left": [

              linearOffset,

              (markerHeight - markerRadius + linearOffset) * -1,

            ],
            "bottom-right": [

              -linearOffset,

              (markerHeight - markerRadius + linearOffset) * -1,

            ],
            left: [markerRadius, (markerHeight - markerRadius) * -1],

            right: [-markerRadius, (markerHeight - markerRadius) * -1],

          };

          var popup = new tt.Popup({ offset: popupOffsets });


          popup.setHTML(`
                          <div style="width:200px; height:150px; object-fit: contain;" class="popup-box mt-2 ">
                            <img style="width:100%; height:100%; border-radius:10px;" src="http://127.0.0.1:8000/storage/${this.store.FilteredApartments[i].img_cover_path}" alt="Apartment Image">
                          </div>
                          <div style="width:200px" class="mt-3 marker-content text-center">
                            <h5 class="m-0 ">Appartamento: ${this.store.FilteredApartments[i].name}</h5>
                            <div>${this.store.FilteredApartments[i].address}</div>
                            
                          </div>
                      `);

          popup.addClassName("popup-box");

          var marker = new tt.Marker()

            .setLngLat({
              lng: this.store.FilteredApartments[i].longitude,

              lat: this.store.FilteredApartments[i].latitude,

            })
            .setPopup(popup)

            .addTo(map);

          var markerElement = marker.getElement();

          markerElement.style.backgroundColor = "white";

          markerElement.style.width = "80px";

          markerElement.style.height = "20px";

          markerElement.style.lineHeight = "20px";

          markerElement.style.verticalAlign = "middle";

          markerElement.style.textAlign = "center";

          markerElement.style.borderRadius = "20px";

          markerElement.style.borderStyle = "solid";

          markerElement.style.borderWidth = "1px";

          markerElement.style.borderColor = "lightgray";

          markerElement.innerHTML =

            Math.floor(this.store.FilteredApartments[i].price) + "€";

          map.on("load", () => {

            marker, popup;
          });
        }
      }, 1000);
    },

    scrollToTop() {

      window.scrollTo({

        top: 0,

        behavior: "smooth",
      });
    },
  },
  mounted() {

    this.scrollToTop();

    this.callTheServices();

    setTimeout(() => {
      this.center = [this.store.firstApi.lon, this.store.firstApi.lat];

      this.myMap = tt.map({

        key: "03zxGHB5yWE9tQEW9M7m9s46vREYKHct",

        container: "ma",

        center: this.center,

        zoom: 10,

      });
      let map = this.myMap;

      for (let i = 0; i < this.store.FilteredApartments.length; i++) {

        var markerHeight = 50,

          markerRadius = 10,

          linearOffset = 25;

        var popupOffsets = {
          top: [0, 0],

          "top-left": [0, 0],

          "top-right": [0, 0],

          bottom: [0, -markerHeight],

          "bottom-left": [

            linearOffset,

            (markerHeight - markerRadius + linearOffset) * -1,

          ],
          "bottom-right": [

            -linearOffset,

            (markerHeight - markerRadius + linearOffset) * -1,

          ],
          left: [markerRadius, (markerHeight - markerRadius) * -1],

          right: [-markerRadius, (markerHeight - markerRadius) * -1],

        };
        var popup = new tt.Popup({ offset: popupOffsets });

        popup.setHTML(`
                          <div style="width:200px; height:150px; object-fit: contain;" class="popup-box mt-2 ">
                            <img style="width:100%; height:100%; border-radius:10px;" src="http://127.0.0.1:8000/storage/${this.store.FilteredApartments[i].img_cover_path}" alt="Apartment Image">
                          </div>
                          <div style="width:200px" class="mt-3 marker-content text-center">
                            <h5 class="m-0 ">Appartamento: ${this.store.FilteredApartments[i].name}</h5>
                            <div>${this.store.FilteredApartments[i].address}</div>
                          </div>
                      `);

        popup.addClassName("popup-box");

        var marker = new tt.Marker()

          .setLngLat({

            lng: this.store.FilteredApartments[i].longitude,

            lat: this.store.FilteredApartments[i].latitude,

          })

          .setPopup(popup)


          .addTo(map);

        var markerElement = marker.getElement();

        markerElement.style.backgroundColor = "white";

        markerElement.style.width = "80px";

        markerElement.style.height = "20px";

        markerElement.style.lineHeight = "20px";

        markerElement.style.verticalAlign = "middle";

        markerElement.style.textAlign = "center";

        markerElement.style.borderRadius = "20px";

        markerElement.style.borderStyle = "solid";

        markerElement.style.borderWidth = "1px";

        markerElement.style.borderColor = "lightgray";

        markerElement.innerHTML =
          Math.floor(this.store.FilteredApartments[i].price) + "€";

        map.on("load", () => {

          marker, popup;

        });
      }
    }, 1000);
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
  components: {
    FilteredApartmentComponent,
    FIlterSponsoredComponent,
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <!-- MAPPA RICERCA AVANZATA -->
      <div class="col-12 my-5" id="ma"></div>
      <!-- RICERCA AVANZATA -->
      <div
        v-if="store.FilteredApartments && store.FilteredApartments.length > 0"
        class="col-12"
      >
        <div id="advanced-search-filters">
          <h5 class="mx-1">Filtri di ricerca avanzata:</h5>
          <div
            class="mt-3 mb-3 d-flex justify-content-center"
            id="desktop-room-bed-filter"
          >
            <input
              v-model="nRooms"
              class="form-control mx-1"
              placeholder="Numero minimo di camere"
            />
            <input
              v-model="nBeds"
              class="form-control mx-1"
              placeholder="Numero minimo di letti"
            />
          </div>
          <div id="mobile-room-bed-filter">
            <div class="mt-3 mb-3 d-flex justify-content-center">
              <input
                v-model="nRooms"
                class="form-control mx-1"
                placeholder="Numero minimo di camere"
              />
            </div>
            <div class="mt-3 mb-3 d-flex justify-content-center">
              <input
                v-model="nBeds"
                class="form-control mx-1"
                placeholder="Numero minimo di letti"
              />
            </div>
          </div>
          <div class="mb-3 d-flex mx-1">
            <label for="radius"
              >Appartamenti in un raggio di
              <span id="search-radius">{{ radius }} km</span> rispetto a
              {{ this.store.userSearch }}:</label
            >
          </div>
          <div class="mb-3 d-flex justify-content-center mx-1">
            1km&nbsp&nbsp
            <input
              v-model="radius"
              type="range"
              name="radius"
              class="form-range"
              id="customRange1"
              min="1"
              max="50"
              step="1"
            />
            &nbsp&nbsp50km
          </div>
          <div class="mb-3 d-flex flex-wrap justify-content-center">
            <div
              v-for="(elem, i) in store.services"
              class="form-check me-3"
              :key="i"
            >
              <input
                v-model="services"
                class="form-check-input m-2"
                type="checkbox"
                :value="elem.type_of_service"
                :id="elem.id"
              />
              <label class="form-check-label" :for="elem.id">
                <i :class="'fa-solid' + ' ' + elem.icon"></i>&nbsp&nbsp{{
                  elem.type_of_service
                }}
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
              @click="advancedResearch()"
              type="submit"
              class="my-primary-button m-2"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
      <!-- RICERCA INDIRIZZO SE NON CI SONO RISULTATI SULLA PRIMA SEARCH -->
      <div v-else class="d-flex flex-column align-items-center">
        <div class="">
          <div class="d-flex flex-column mt-5">
            <div class="px-2">
              <label for="first-search mt-2">
                Inserisci un indirizzo alternativo:
              </label>
            </div>
            <div class="d-flex">
              <input
                @keyup="handleInputClick"
                class="form-control my-2 user-search"
                v-model="store.userSearch"
                type="text"
                id="first-search"
                placeholder="Inserisci un indirizzo qui"
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
        </div>
        <div class="position-relative list-box">
          <ul id="suggestions">
            <!--SUGGERIMENTI INDIRIZZI GENERATI DA TOMTOM-->
          </ul>
        </div>
      </div>
      <!-- MODALE -->
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
                ype="button"
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

      <!-- RISULTATI RICERCA -->
      <div
        v-if="store.FilteredApartments && store.FilteredApartments.length > 0"
        class="col d-flex flex-wrap my-card"
      >
        <div class="col-12 text-center">
          <h4>Appartamenti in zona: {{ this.store.userSearch }}</h4>
        </div>
        <FIlterSponsoredComponent
          v-for="(sponsor, j) in store.sponsoredFilteredApartments"
          :apartment="sponsor"
          :key="j"
        />
        <FilteredApartmentComponent
          v-for="(elem, k) in store.unSponsoredFilteredApartments"
          :apartment="elem"
          :key="k"
        />
      </div>
      <div v-else class="text-center my-5">
        <h3 class="mb-5">
          Non ci sono appartamenti in questa posizione, prova con un nuovo
          indirizzo!
        </h3>
      </div>

      <!-- SCROLL TO TOP TRIGGER ANCHOR -->
      <div class="scroll-to-top" @click="scrollToTop">
        <i class="fas fa-arrow-up"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/mixins.scss" as *;

#alterned-input {
  margin: 0 auto;
}

.user-search {
  width: 400px;
  border-radius: 50px;
}

#search-button-after-check {
  padding-top: 5px;
  padding-bottom: 5px;
}

#search-radius {
  color: #ec5a64;
  font-weight: 600;
}

input[type="range"]::-webkit-slider-thumb {
  background: #ec5a64;
}

input[type="checkbox"]:checked {
  background-color: #ec5a64;
  border-color: #ec5a64;
  /* Aggiungi altri stili se necessario */
}

@media (min-width: 680px) {
  #mobile-room-bed-filter {
    display: none;
  }
  #desktop-room-bed-filter {
    display: block;
  }
  #advanced-search-filters {
    max-width: 680px;
    margin: 0 auto;
    background-color: #fff;
    padding: 32px 60px 24px 60px;
    border-radius: 20px;
  }
}

@media (max-width: 680px) {
  #mobile-room-bed-filter {
    display: block;
  }
  #desktop-room-bed-filter {
    display: none !important;
  }
  #advanced-search-filters {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    padding: 16px 10px 6px 10px;
    border-radius: 10px;
  }
}

.list-box {
  width: 500px;
  #suggestions {
    background-color: white;
    /* border: 1px solid #ec5a64; */
    border-radius: 5px;
    padding: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
  }
}

#ma {
  height: 400px;
  .marker-content {
    width: 50px;
    border-radius: 20px;
    background-color: white !important;
    img {
      width: 100%;
    }
  }
}
.custom-marker {
  background-color: white;
  width: 70px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 20px;
  padding: 5px;
}
.my-primary-button {
  @include primary-button-styles;
}

.my-card {
  //width: calc(100% / 4);
  margin-top: 50px;
  padding: 20px;
  border: none !important;
  position: relative;
  .badge {
    position: absolute;
    z-index: 1;
    top: 7%;
    left: 10%;
    display: inline-block;
    height: 30px;
    line-height: 18px;
    vertical-align: middle;
    width: 100px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid lightgray;
  }
  .title {
    font-weight: 600;
  }
  .link {
    color: black;
    text-decoration: none;
  }

  .night {
    font-size: 0.9rem;
    color: gray;
    text-decoration: underline;
  }

  .img-box {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    border-radius: 20px;

    .img-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  ul {
    li {
      list-style: none;
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
  transition: transform 0.3s ease; /* Aggiungi transizione fluida per l'ingrandimento */

  &:hover {
    transform: scale(1.1); /* Inganna l'elemento del 10% durante l'hover */
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5); /* Aggiungi ombra */
  }
}

.scroll-to-top i {
  font-size: 20px;
}

@media (max-width: 576px) {
  .my-card {
    width: calc(100% / 1);
  }
}
@media (min-width: 576px) {
  .my-card {
    width: calc(100% / 2);
  }
}
@media (min-width: 992px) {
  .my-card {
    width: calc(100% / 3);
  }
}

@media (min-width: 1200px) {
  .my-card {
    width: calc(100% / 4);
  }
}
@media (min-width: 1400px) {
  .my-card {
    width: calc(100% / 5);
  }
}
</style>
