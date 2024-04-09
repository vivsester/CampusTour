import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueHammer } from 'vue2-hammer'

createApp(App).use(VueHammer).mount('#app')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/serviceworker.js')
        .then(function(registration) {
          // für testing: Registrierung erfolgreich
          console.log('Service Worker registriert: ', registration);
        })
        .catch(function(error) {
          // für testing: Registrierung fehlgeschlagen
          console.log('Service Worker Registrierung fehlgeschlagen: ', error);
        });
    });
  }
  
