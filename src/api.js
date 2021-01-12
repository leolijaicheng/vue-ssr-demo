import axios from 'axios'

export function getUserList(){
    return axios({
        url:'http://localhost:3001/api/userList',
        method:'get'
    })
}

export function getMoveList(){
    return axios({
        url:'http://localhost:3001/api/moveList',
        method:'get'
    })
}