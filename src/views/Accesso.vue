<template>
  <div>
    <!-- DIALOG PER L'ACCESSO CON UNICO INSERIMENTO PER LO USERNAME -->
    <md-dialog-prompt
      :md-active.sync="activeDialog"
      v-model="inserimentoNomeUtente"
      md-title="Effettua l'accesso"
      md-input-maxlength="15"
      md-input-placeholder="Inserisci il tuo nome..."
      md-confirm-text="Inserisci"
      md-cancel-text="Annulla"
      @md-confirm="login"
      @md-cancel="annulla"
    />
  </div>
</template>

<script>
import Accesso from "../login/access-functions.js";

export default {
  data: () => ({
    activeDialog: true,
    inserimentoNomeUtente: ""
  }),
  
  methods: {
    //REGISTRO SUL BROWSER LO USERNAME E TORNO ALLA PRECEDENTE PER FAR PROSEGUIRE L'UTENTE
    login() {
      Accesso.login(this.inserimentoNomeUtente);
      this.$router.go(-1);
    },

    annulla(){
        this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>