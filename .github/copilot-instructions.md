# K6 Load Testing - Copilot Instructions

## Project Overview
Educational k6 performance testing repository demonstrating progressive test complexity from basic setup to advanced load patterns. Tests target a biblioteca (library) API with authentication endpoints.

## Architecture & Structure

### Progressive Learning Structure (`passo-X/`)
Tests are organized pedagogically in numbered folders:
- `passo-1-setup/`: Basic k6 setup with iterations
- `passo-2-metricas/`: VUs and duration-based metrics
- `passo-3-asserts-limits/`: Assertions (check/expect) and thresholds
- `passo-4-token/`: Dynamic authentication with token generation
- `passo-5-report/`: HTML dashboard reporting

### Production Test Suite (`tests/`)
Complete test types following performance testing methodology:
- `smoke-test.js`: 2 VUs, 10s - validate system availability
- `load-test.js`: 50 VUs, 2m - validate expected load capacity
- `stress-test.js`: stages-based ramp (1→200→0) - find system limits
- `spike-test.js`: rapid ramp (1→400 in 30s) - test spike resilience
- `soak-test.js`: extended duration (200 VUs for 1h) - stability testing
- `breakpoint-test.js`: extreme ramp (1→50000) - discover breaking point

## Critical Patterns

### Configuration Management
**Always** import `BASE_URL` and `TOKEN` from `config.js`:
```javascript
import { BASE_URL } from './config.js'
// or from subdirectories:
import { BASE_URL } from '../config.js'
```

### Token Generation Pattern
For authenticated endpoints, use `geraToken.js`:
```javascript
import { getToken } from '../geraToken.js'

export default function () {
    const token = getToken()
    const headers = {
        Authorization: token,
        accept: 'application/json'
    }
    http.get(`${BASE_URL}/api/users`, { headers })
}
```
Note: `getToken()` performs a POST to `/api/login` with admin credentials

### Assertion Styles
Two validation approaches coexist:

**check()** - non-blocking validation (preferred for multi-scenario):
```javascript
import { check } from 'k6'
check(response, {
    'Status code deve ser 200': (r) => r.status === 200
})
```

**expect()** - library-based assertions (use soft for continuation):
```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js'
expect.soft(response.status).toBe(200) // continues test on failure
```

### Thresholds Configuration
Define SLOs in `options.thresholds`:
```javascript
export const options = {
    thresholds: {
        'http_req_duration': ['p(90) < 10'],  // 90th percentile < 10ms
        'http_req_failed': ['rate < 0.01']     // < 1% failure rate
    }
}
```

## Test Execution Workflow

### Standard Test Run
```bash
k6 run <test-file>.js
```

### Dashboard Report Generation
All tests in `tests/` use this pattern:
```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=<test-name>-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run <test-name>.js
```

See `tests/plano-de-teste.md` for complete execution commands per test type.

## API Target Endpoints
- `/api/health` - health check (no auth)
- `/api/login` - authentication (returns JWT token)
- `/api/books` - books listing (no auth)
- `/api/users` - users listing (requires auth)

## Conventions
- Use ES6 imports (`import`), not CommonJS
- Export options via `export const options = {...}`
- Default function is test entry point: `export default function () {...}`
- VUs = Virtual Users (concurrent users)
- Duration formats: `'10s'`, `'2m'`, `'1h'`
- Use `sleep(1)` to simulate think time between requests
