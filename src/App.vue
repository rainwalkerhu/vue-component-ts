<template>
  <div id="app">
    <i class="componentName">组件名称：app</i>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  provide() {
    return {
      app: this
    }
  },
  data() {
    return {
      name: 'rainwalker'
    }
  }
}
</script>
<style lang="stylus">
.componentName
  color: red
  position: relative
  left: 0
  top: 0

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
