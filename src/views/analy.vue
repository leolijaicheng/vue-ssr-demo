<template>
<div class="admin-usermg">
    <div class="admin-usermg__top">电影类别统计</div>
    <div id="dataBar" class="analysis__layout">
      <img :src="'/public/' + item" v-for="(item,index) of analysisList" :key="index"/>
    </div>
</div>
</template>
<style lang="scss">
    @import '@/assets/dataAnalysis.scss';
</style>
<script>
    import {mapGetters} from 'vuex';
    import { option1,option2 } from '../../modules'

    export default{
        asyncData( { store }) {
            return Promise.all([
                store.dispatch('drawChart',{ option:option1,name:'img1.png' } ),
                store.dispatch('drawChart',{option:option2,name:'img2.png' })
            ])
        },
        computed: {
            ...mapGetters([
                'analysisList',
            ]),
        }
    };
</script>
