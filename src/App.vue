<template>
  <div id="app" style="height:100%;background:#ebf0f5;">
    <adminHeader></adminHeader>
    <leftNav></leftNav>
    <adminContent></adminContent>
  </div>
</template>

<style lang="scss" scoped>
  @import './assets/index.scss';
</style>
<script>
  import adminHeader from './components/header';
  import leftNav from './components/leftNavigation';
  import adminContent from './components/adminContent';
  export default{
    name: 'app',
    components: {
      adminHeader,
      leftNav,
      adminContent
    }
  }
</script>