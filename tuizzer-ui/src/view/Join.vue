<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="../assets/logo.png" />
    <q-input
      bottom-slots
      v-model="username"
      label="Username"
      maxlength="25"
      dense="dense"
      :rules="[val => !!val || 'Field is required']"
    >
      <!-- TODO random generated avatar -->
      <!-- <template v-slot:before>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar5.jpg">
        </q-avatar>
      </template> -->

      <template v-slot:after>
        <q-btn
          round
          dense
          flat
          icon="login"
          :disabled="!username"
          @click="join(username)"
        />
      </template>
    </q-input>
  </q-page>
</template>

<style>
</style>

<script>
import store from "@/store/store";
import { io } from "socket.io-client";

export default {
  name: "Join",
  data() {
    return {
      username: "",
      sharedState: store.state
    };
  },
  created() {},
  methods: {
    join(username) {
      const socket = io({
        query: {
          role: "player",
          username
        }
      });
      store.setSocket(socket);
      socket.on("playerId", id => {
        console.log(id);
        store.setPlayerId(id);
        this.$router.replace(`/buzzer/${id}`);
      });
    }
  }
};
</script>
