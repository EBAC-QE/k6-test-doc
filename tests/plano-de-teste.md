# 📋 Plano de Testes de Performance

Este documento descreve a estratégia completa de testes de performance utilizando K6. Cada tipo de teste possui um objetivo específico e configuração adequada para validar diferentes aspectos do sistema.

---

## 📊 Geração de Relatórios HTML

Todos os testes podem gerar relatórios HTML interativos com dashboards. Use o padrão abaixo:

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=nome-do-relatorio.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run seu-teste.js
```

O relatório será gerado automaticamente ao final da execução.

---

## 1️⃣ Smoke Test

**Objetivo:** Validar se a aplicação (API, site, banco, etc.) está disponível e funcionando corretamente.

![Smoke Test Pattern](https://grafana.com/media/docs/k6-oss/chart-smoke-test-overview.png)

### 📝 Configuração
- **VUs:** 2
- **Duração:** 10 segundos
- **Quando executar:** Antes de qualquer teste mais intensivo, em pipelines CI/CD

### ▶️ Executar

```bash
k6 run smoke-test.js
```



---

## 2️⃣ Load Test (Teste de Carga)

**Objetivo:** Validar se o sistema aguenta a carga esperada de usuários simultâneos em condições normais de operação.

![Load Test Pattern](https://grafana.com/media/docs/k6-oss/chart-load-test-overview.png)

### 📝 Configuração
- **VUs:** 50 usuários simultâneos
- **Duração:** 2 minutos
- **Cenário:** Fluxo de login
- **Quando executar:** Validar capacidade antes de releases

### ▶️ Executar

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=load-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run load-test.js
```


---

## 3️⃣ Stress Test (Teste de Estresse)

**Objetivo:** Descobrir os limites do sistema - identificar até onde o sistema aguenta antes de falhar ou degradar.

![Stress Test Pattern](https://grafana.com/media/docs/k6-oss/chart-stress-test-overview.png)

### 📝 Configuração
- **VUs:** Aumento gradativo em estágios
- **Estágios:**
  - **Ramp-up:** 1 → 200 VUs em 1 minuto
  - **Platô:** Mantém 200 VUs durante 5 minutos
  - **Ramp-down:** 200 → 0 VUs em 1 minuto
- **Cenário:** Fluxo de login
- **Quando executar:** Determinar limites de capacidade

### ▶️ Executar

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=stress-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run stress-test.js
```


---

## 4️⃣ Spike Test (Teste de Pico)

**Objetivo:** Validar como a aplicação e infraestrutura reagem a picos repentinos e extremos de tráfego.

![Spike Test Pattern](https://grafana.com/media/docs/k6-oss/chart-spike-test-overview.png)

### 📝 Configuração
- **VUs:** Aumento repentino e extremo
- **Estágios:**
  - **Ramp-up abrupto:** 1 → 400 VUs em 30 segundos
  - **Ramp-down:** 400 → 0 VUs em 40 segundos
- **Cenário:** Fluxo de login
- **Quando executar:** Simular eventos como Black Friday, lançamentos

### ▶️ Executar

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=spike-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run spike-test.js
```

---

## 5️⃣ Soak Test (Teste de Imersão/Resistência)

**Objetivo:** Validar a estabilidade do sistema e infraestrutura durante um período prolongado, identificando memory leaks e degradação de performance.

![Soak Test Pattern](https://grafana.com/media/docs/k6-oss/chart-soak-test-overview.png)

### 📝 Configuração
- **VUs:** Carga constante prolongada
- **Estágios:**
  - **Ramp-up:** 1 → 200 VUs em 1 minuto
  - **Platô prolongado:** Mantém 200 VUs durante **1 hora**
  - **Ramp-down:** 200 → 0 VUs em 1 minuto
- **Cenário:** Fluxo de login
- **Quando executar:** Detectar vazamentos de memória, degradação ao longo do tempo

### ▶️ Executar

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=soak-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run soak-test.js
```

---

## 6️⃣ Breakpoint Test (Teste de Ponto de Ruptura)

**Objetivo:** Descobrir o ponto de ruptura - a capacidade máxima absoluta que a aplicação ou infraestrutura consegue suportar.

![Breakpoint Test Pattern](https://grafana.com/media/docs/k6-oss/chart-breakpoint-test-overview.png)

### 📝 Configuração
- **VUs:** Aumento contínuo até a falha
- **Estágios:**
  - **Ramp-up extremo:** 1 → 50.000 VUs em 1 hora
- **Cenário:** Fluxo de login
- **Quando executar:** Planejamento de capacidade, dimensionamento de infraestrutura

### ▶️ Executar

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=breakpoint-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run breakpoint-test.js
```

---

## 📚 Referências

- [Documentação oficial K6 - Tipos de Testes](https://grafana.com/docs/k6/latest/testing-guides/test-types/)
- [K6 Best Practices](https://grafana.com/docs/k6/latest/testing-guides/)
- [Grafana Cloud K6](https://grafana.com/products/cloud/k6/)

