<template>
  <div>
    <button
      :style="{
        backgroundColor: buttonColor,
        cursor: isClickable ? 'pointer' : 'not-allowed',
        color: '#FFFFFF',
        padding: '12px',
        borderRadius: '50%', // Jetzt ist der Button rund!
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'relative', // Füge diese Zeile hinzu
        width: '2rem',
        height: '2rem',
        display: 'flex',
        justifyContent: 'center', // Zentriere horizontal
        alignItems: 'center', // Zentriere vertikal
      }"
      @click="handleButtonClick"
      :disabled="!isClickable"
    >
      <span v-if="buttonColor === 'green'">✔</span>
      <span v-else>✓</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonColor: '#D3D3D3',
      isClickable: false,
    };
  },
  methods: {
    handleButtonClick() {
      if (this.buttonColor === 'yellow') {
        this.buttonColor = 'green';
        // Speichere den grünen Zustand hier (z. B. in Local Storage oder Vuex Store)
      }
    },
    // Hier kannst du deine andere Funktion implementieren, die die Farbe ändert
    // und die `isClickable`-Eigenschaft entsprechend setzt.
  },
  mounted() {
    // Beispiel: Wenn die andere Funktion erfüllt ist, ändere die Farbe auf gelb
    // und setze `isClickable` auf true.
    // Du kannst diese Logik an deine Anforderungen anpassen.
    // ...
  },
};
</script>
