import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getUserList,getMoveList } from './api'

export function createStore(){
    return new Vuex.Store({
        state:{
            userList:[],
            moveList:[]
        },
        getters:{
            userList:state => state.userList,
            moveList:state => state.moveList
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
           }
        },
        mutations:{
            SET_USER_LIST(state,list){
                state.userList = list
            },
            SET_MOVE_LIST(state,list){
                state.moveList = list
            }
        }
    })
}