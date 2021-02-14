<template>
  <q-page class="flex flex-center">
    <button
      class="buzzer"
      :class="{ pressed: pressed, success: myturn }"
      @click="buzz"
      :disabled="pressed"
    ></button>
  </q-page>
</template>

<script>
import store from "@/store/store";
import { io } from "socket.io-client";

export default {
  name: "Buzzer",
  data() {
    return {
      username: "",
      pressed: false,
      buzzQueue: [],
      sharedState: store.state
    };
  },
  computed: {
    myturn() {
      if (this.buzzQueue.length > 0) {
        return this.buzzQueue[0].id === this.sharedState.playerId;
      } else {
        return false;
      }
    }
  },
  created() {
    if (!this.sharedState.socket) {
      const socket = io({
        query: {
          role: "player",
          id: this.$route.params.id
        }
      });
      store.setSocket(socket);
    }

    this.sharedState.socket.on("buzzed", queue => {
      console.log(queue);
      this.buzzQueue = queue;
    });
    this.sharedState.socket.on("reset", this.reset);
  },
  methods: {
    reset() {
      this.pressed = false;
      this.buzzQueue = [];
    },
    join(username) {
      const socket = io({
        query: {
          role: "player",
          username
        }
      });
      store.setSocket(socket);
      this.$router.replace("/buzzer");
    },
    buzz() {
      this.sharedState.socket.emit("buzz", this.sharedState.playerId);
      this.pressed = true;
    }
  }
};
</script>
