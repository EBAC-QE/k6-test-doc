import http from 'k6/http'
import { sleep } from 'k6'
import { BASE_URL } from '../config.js'

export const options = {
    vus: 10, // núemro de usuários virtuais
    duration: '10s' // o tempo de execução do teste, 30 segundos
}

export default function () {
    http.get(`${BASE_URL}/api/health`)
    //sleep(0.5)
}