import http from 'k6/http'
import { sleep, check} from 'k6'

export const options = {
    vus: 10, // núemro de usuários virtuais
    duration: '10s' // o tempo de execução do teste, 10 segundos
}

export default function () {
    let response = http.get('http://localhost:3000/api/health')
    check(response, {
        'Deve validar o status code 200': (r) => r.status === 201,
    });
    sleep(1)
}