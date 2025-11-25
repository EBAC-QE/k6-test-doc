import http from 'k6/http'
import { check, sleep } from 'k6'
import { BASE_URL } from '../config.js'

export const options = {
    vus: 50,
    duration: '2m'
}

export default function () {

    const payload = JSON.stringify(
        {
            "email": "usuario@teste.com",
            "password": "user123"
        }
    )

    const params = {
        headers: {
            'Content-Type' : 'application/json', 
            'accept' : 'application/json'
        }
    }

    let response = http.post(`${BASE_URL}/api/login`, payload, params)

    check(response, {
        'Status code deve ser 200': (r) => r.status === 200
    })

}