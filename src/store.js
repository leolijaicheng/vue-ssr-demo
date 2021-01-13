import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getUserList,getMoveList,drawChart } from './api'

export function createStore(){
    return new Vuex.Store({
        state:{
            userList:[],
            moveList:[],
            analysisList:[]
        },
        getters:{
            userList:state => state.userList,
            moveList:state => state.moveList,
            analysisList:state => state.analysisList
        },
        actions:{
           getUser({ commit }){
                return getUserList().then(items => {
                    commit('SET_USER_LIST',items.data.userlist)
                })
           },
           getMove({ commit }){
                return getMoveList().then(items => {
                    commit('SET_MOVE_LIST',items.data.movielist)
                })
           },
           drawChart({ commit },option){
               return drawChart(option).then(res => {
                   if(res.data.success){
                       commit('SET_ANALY_LIST',res.data.filename)
                   }
               })
           }
        },
        mutations:{
            SET_USER_LIST(state,list){
                state.userList = list
            },
            SET_MOVE_LIST(state,list){
                state.moveList = list
            },
            SET_ANALY_LIST(state,item){
                if(!state.analysisList.includes(item)){
                    state.analysisList.push(item)
                }
            }
        }
    })
}