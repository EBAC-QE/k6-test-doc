import http from 'k6/http'
import { sleep } from 'k6'
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';

export const options = {
    vus: 10, // núemro de usuários virtuais
    duration: '10s' // o tempo de execução do teste, 10 segundos
}

export default function () {
    let response = http.get('http://localhost:3000/api/health')
    expect.soft(response.status).toBe(200) // Soft garante que o teste continue
    sleep(1)
}