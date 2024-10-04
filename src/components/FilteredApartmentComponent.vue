<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    },
    props:{
        apartment:Object
    } 
}
</script>

<template>
    
    <div class="my-card">
        <router-link class="link" :to="{name:'apartment-show', params: { slug: apartment.slug }}">
            <div  id="apartment-card">
                <!-- SPONSORSHIP PILL -->
               
                <div class="img-box">
                    <div class="img-wrapper">
                        <img v-if="apartment.img_cover_path" :src="'http://127.0.0.1:8000/storage/'+apartment.img_cover_path" alt="Cover Image">
                        <img v-else class="alt-img" src="../../img/logos/boolairbnb-favicon.PNG" alt="">
                    </div>
                </div>
                <div  id="apartment-details">
                    <ul class="p-0 d-block mt-2">
                        <li class="title">
                            {{ apartment.name }}
                        </li>
                        <li>
                            Prezzo: {{apartment.price }}€ per notte.
                        </li>
                        <li>
                            Servizi:&nbsp&nbsp 
                            <span v-for="service in apartment.services">
                                <i :class="'fa-solid'  + ' '  + service.icon"></i>&nbsp&nbsp
                            </span>
                        </li>
                         <li v-if="apartment.distance >= 1">
                            A {{ apartment.distance.toFixed(1) }} km di distanza. 
                        </li>
                        <li v-else>
                            A ~ 0,5 km di distanza. 
                        </li>
                    </ul>
                </div>
            </div>
        </router-link>
    </div>
</template>
                
            


<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;


.my-card{
    margin-top: 50px;
    padding: 20px;
    border:none!important;
    position: relative;

    .badge{
        position: absolute;
        color: #fff !important;
        background-color: #ec5a64 !important;
        z-index: 1;
        top: 7%;
        left: 10%;
        display: inline-block;
        height: 30px;
        line-height: 18px;
        vertical-align: middle;
        width: 100px;
        font-size: 0.8rem;
        font-weight:500;
        border: 1px solid lightgray;

    }

    .title{
        font-weight: 700;
    }

    .link {
        color: black;
        text-decoration: none;
    }

    #apartment-card {
        background-color: #fff;
        border-radius: 20px
    }

    #apartment-details {
        padding: 10px 12px 4px 12px;
    }

    .link{
        color: black;
        text-decoration: none;
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
             overflow: hidden;
           
           
            .alt-img{
                object-fit: contain;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                 transition: 0.5s transform  ease-in-out;
                 &:hover{
                     transform: scale(1.05);
                    }
                    
                 }
             }
         }


    ul{
        li{
            list-style: none;
        }
    }
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
