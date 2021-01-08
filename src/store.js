import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(vuex)

import { getUserList,getMoveList } from './api'

export function cteateStore(){
    return new Vuex.Store({
        state:{
            userList:[],
            moveList:[]
        },
        actions:{
           getUser({ commit }){
                return getUserList().then(items => {
                    commit('SET_USER_LIST',items)
                })
           },
           getMove(){
                return getMoveList().then(items => {
                    commit('SET_MOVE_LIST',items)
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