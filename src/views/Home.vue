<template>
  <div class="home">
      <i class="componentName">组件名称：home</i>
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
      <form-demo></form-demo>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import FormDemo from '@/components/form-demo.vue'

@Component({
  name: 'home',
  components: {
    HelloWorld,
    FormDemo
  }
})
export default class Home extends Vue {
  
}
</script>
<style lang="stylus">
.home
  display: flex;
  & > div
    flex: 1;
  
</style>
