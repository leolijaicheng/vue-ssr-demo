import Vue from 'vue'
import { createApp } from './app'
import NProgress from 'nprogress'

Vue.mixin({
  beforeRouteUpdate(to,from,next){
    const { asyncData }=  this.$options
    if(asyncData){
      asyncData({
        store:this.$store,
        route:to
      }).then(next).catch(next)
    }else{
      next()
    }
  }
})

const { app,router,store } = createApp()

if(window.__INITIAL_STATE__){
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {

  router.beforeResolve((to,from,next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const avctivated = matched.filter((c,i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if(!avctivated.length){
      return next()
    }

    NProgress.start()

    Promise.all(avctivated.map(c => {
      if(c.asyncData){
        return c.asyncData({ store,route:to })
      }
    })).then(() => {
      NProgress.done()

      next()
    }).catch(next)
  })

  app.$mount('#app',true)
})
