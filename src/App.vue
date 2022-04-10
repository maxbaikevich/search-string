<template>
  <div class="app">
    <Search />
  </div>
</template>

<script>
import Search from './components/search-string'
export default {
  name: 'app',
  components: {
    Search
  }

}
</script>

<style>
  body {
    background-color: #e5e5e5;
    margin: 0 
  }

.app {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
  }

</style>