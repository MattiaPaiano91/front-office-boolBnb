import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";
import { gsap } from "gsap";

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
createApp(App).use(router).mount('#app')


    gsap.from(".gsap-logo", { x: 2000, duration: 1, ease: "power1" });
    gsap.from(".gsap-logo-2", {
      y: 500,
      delay: 1,
      rotate: 180,
      ease: "power2",
    });
    // gsap.fromTo(
    //   ".my-welcome",
    //   { autoAlpha: 1 },
    //   { autoAlpha: 0, duration: 1.5, delay: 2 }
    // );

    gsap.to(".my-welcome", {
      x: -3000,
      duration: 3,
      ease: "power3",
      delay: 2,
    });
    
    