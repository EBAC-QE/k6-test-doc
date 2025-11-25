import http from 'k6/http'
import { check, sleep } from 'k6'
import { BASE_URL } from '../config.js'

export const options = {
  // Key configurations for Stress in this section
  executor: 'ramping-arrival-rate', 
  stages: [
    { duration: '1h', target: 50000 }, // rump-up de 1 até 5000 virtual users em 1 hora
  ],
};

export default function () {

    let response = http.get(`${BASE_URL}/api/books?category=Fantasia&available=true`)
    sleep(0.5)

    check(response, {
        'Status code deve ser 200': (r) => r.status === 200
    })

}