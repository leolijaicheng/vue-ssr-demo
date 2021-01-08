<template>
    <div id="app">
       <h1>客户端动态交互</h1>
       <h2>{{ message }}</h2>
       <div>
           <input v-model="message">
       </div>
       <button @click="onClick">点击测试</button>
       <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: "ssr vue "
            }
        },
        methods:{
            onClick(){
                console.log('Hello world')
            }
        }
    }
</script>

<style  scoped>
#app{
    color:red;
}
</style>