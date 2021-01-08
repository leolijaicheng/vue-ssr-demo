import axios from 'axios'

export function getUserList(){
    return axios({
        url:'/userList',
        method:'get'
    })
}

export function getMoveList(){
    return axios({
        url:'/moveList',
        method:'get'
    })
}