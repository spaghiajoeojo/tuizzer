<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col">
        <img
          class="transition-500"
          :class="[isConnected() ? 'xsmall' : 'medium']"
          alt="Quasar logo"
          src="../assets/logo.png"
        />
      </div>
    </div>
    <div class="row">
      <div class="row">
        <div v-if="isConnected()" class="col">
          <div class="q-pa-md">
            <qrcode-vue :value="`${url}join`" size="200"></qrcode-vue>
            <p>Join the game</p>
          </div>
        </div>
        <div v-if="!isConnected()" class="col">
          <div class="q-pa-md">
            <q-btn @click="connect">Connect</q-btn>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <q-btn @click="reset">Reset</q-btn>
        </div>
        <div class="col">
          <q-btn @click="next">Next</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import store from "@/store/store";
import { io } from "socket.io-client";
import QrcodeVue from "qrcode.vue";

export default {
  name: "Home",
  components: {
    QrcodeVue
  },
  data() {
    return {
      sharedState: store.state,
      url: window.location
    };
  },
  methods: {
    isConnected() {
      return !!this.sharedState.socket;
    },
    connect() {
      const socket = io({
        query: {
          role: "admin"
        }
      });
      store.setSocket(socket);
    },
    reset() {
      this.sharedState.socket.emit("reset");
    },
    next() {
      this.sharedState.socket.emit("next");
    }
  }
};
</script>
