<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
