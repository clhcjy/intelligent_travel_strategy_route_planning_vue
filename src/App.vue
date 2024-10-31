<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HelloWorld/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { defineComponent } from "vue";

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>


