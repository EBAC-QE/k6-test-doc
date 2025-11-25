import http from 'k6/http'
import { check, sleep } from 'k6'
import { BASE_URL } from '../config.js'

export const options = {
    vus: 2, 
    duration: '10s' 
}

export default function () {
   let response = http.get(`${BASE_URL}/api/books`)

   check(response, {
        'Status code deve ser 200' : (r) => r.status === 200
   })
    
}