<template>
  <q-layout view="hHh lpR lfr">
    <q-header elevated class="bg-surface text-onsurface">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo.png" />
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item>
          <q-btn class="full-width">Reset</q-btn>
        </q-item>
        <q-item>
          <q-btn class="full-width">Block</q-btn>
        </q-item>
        <q-item>
          <q-btn class="full-width">Next</q-btn>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <!-- drawer content -->
      <q-list bordered>
        <q-item v-for="player in players" :key="player.id" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="secondary" name="check_circle" />
          </q-item-section>

          <q-item-section>{{ player.username }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- MAIN CONTENT -->
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      left: false,
      right: false,
      players: [
        { username: "Ciccio", id: "jihasfg" },
        { username: "Paperino", id: "juihvasjidhf" },
        { username: "Qui", id: "iuglyirf" },
        { username: "Quo", id: "iugl45irf" },
        { username: "Qua", id: "iuglydfrf" },
        { username: "Topolino", id: "iuglsdfyirf" },
        { username: "Pippo", id: "iuglyfmjirf" },
        { username: "Nonna Papera", id: "iugdfhjlyirf" },
        { username: "Gastone", id: "iuglyistrrf" }
      ]
    };
  }
};
</script>