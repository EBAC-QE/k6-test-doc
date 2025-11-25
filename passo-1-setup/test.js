import http from 'k6/http';
import { sleep } from 'k6';
import { BASE_URL } from '../config.js'

export const options = {
  iterations: 5,
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  // Make a GET request to the target URL
  //http.get(BASE_URL + '/index.html');
  http.get(`${BASE_URL}/index.html`)

  // Sleep for 1 second to simulate real-world usage
  sleep(1);
}