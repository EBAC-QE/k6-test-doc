import http from 'k6/http'
import { sleep } from 'k6'
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';
import { BASE_URL, TOKEN } from '../config.js'

export const options = {
    vus: 1, // núemro de usuários virtuais
    duration: '5s' // o tempo de execução do teste, 10 segundos
}

export default function () {
    const headers = {
        Authorization: TOKEN, 
        accept: 'application/json'
    }

    let response = http.get(`${BASE_URL}/api/users`, { headers})

    expect.soft(response.status).toBe(200) // Soft garante que o teste continue
    sleep(1)
}