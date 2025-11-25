# 📚 K6 Load Testing - Testes de Performance

Repositório educacional sobre testes de carga e performance com K6, demonstrando desde configuração básica até testes de produção completos.

## 🎯 Objetivo

Este projeto ensina testes de performance progressivamente, desde conceitos fundamentais até implementações avançadas de testes de carga. Você aprenderá a validar a disponibilidade, capacidade, estabilidade e limites de sistemas usando K6.

## 📂 Estrutura do Projeto

### `passo-X/` - Setup e Aprendizado Progressivo

Pastas numeradas para aprendizado incremental dos conceitos de K6:

- **`passo-1-setup/`** - Configuração inicial do K6 com testes baseados em iterações
- **`passo-2-metricas/`** - Introdução a Virtual Users (VUs) e testes baseados em duração
- **`passo-3-asserts-limits/`** - Validações com assertions (`check`/`expect`) e definição de thresholds
- **`passo-4-token/`** - Autenticação dinâmica com geração de tokens JWT
- **`passo-5-report/`** - Geração de relatórios HTML com dashboard interativo

### `tests/` - Testes de Performance de Produção

Suite completa com os principais tipos de testes de performance:

| Teste | Arquivo | Objetivo | Configuração |
|-------|---------|----------|--------------|
| **Smoke Test** | `smoke-test.js` | Validar disponibilidade do sistema | 2 VUs, 10s |
| **Load Test** | `load-test.js` | Validar capacidade sob carga esperada | 50 VUs, 2min |
| **Stress Test** | `stress-test.js` | Descobrir limites do sistema | 1→200→0 VUs em estágios |
| **Spike Test** | `spike-test.js` | Testar resiliência a picos repentinos | 1→400 VUs em 30s |
| **Soak Test** | `soak-test.js` | Validar estabilidade prolongada | 200 VUs por 1 hora |
| **Breakpoint Test** | `breakpoint-test.js` | Encontrar ponto de ruptura | 1→50000 VUs |

## 🚀 Quick Start

### Pré-requisitos

```bash
# macOS
brew install k6

# Ou verificar: https://k6.io/docs/getting-started/installation/
```

### Executar Testes Básicos

```bash
# Teste de setup simples
k6 run passo-1-setup/test.js

# Teste com métricas
k6 run passo-2-metricas/test.js

# Smoke test (validar se o sistema está no ar)
k6 run tests/smoke-test.js
```

### Gerar Relatórios HTML

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=load-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run tests/load-test.js
```

📖 **Consulte o [Plano de Teste Completo](tests/plano-de-teste.md)** para comandos detalhados, exemplos visuais e instruções de cada tipo de teste.

## 💡 Conceitos Fundamentais

### O que você aprenderá:

#### **Virtual Users (VUs)**
Usuários virtuais que executam o script simultaneamente, simulando tráfego real.

#### **Assertions**
Validações de resposta usando `check()` (nativo K6) ou `expect()` (biblioteca externa).
- Exemplos em: `passo-3-asserts-limits/`

#### **Thresholds**
Limites (SLOs) que definem critérios de sucesso/falha do teste.
- Exemplos em: `passo-3-asserts-limits/test-limites.js`

#### **Autenticação Dinâmica**
Geração de tokens JWT em tempo de execução para testes de endpoints protegidos.
- Exemplos em: `passo-4-token/` e `geraToken.js`

#### **Relatórios HTML**
Dashboards interativos com métricas detalhadas de performance.
- Exemplos em: `passo-5-report/`

### Onde encontrar exemplos práticos:

| Conceito | Localização |
|----------|-------------|
| Setup básico | `passo-1-setup/test.js` |
| VUs e duração | `passo-2-metricas/test.js` |
| Assertions com check | `passo-3-asserts-limits/test-asserts-check.js` |
| Assertions com expect | `passo-3-asserts-limits/test-asserts.js` |
| Thresholds (limites) | `passo-3-asserts-limits/test-limites.js` |
| Token estático | `passo-4-token/test-listar-usuarios.js` |
| Token dinâmico | `passo-4-token/test-listar-usuarios-token-dinamico.js` |
| Relatórios HTML | `passo-5-report/test-report.js` |
| Smoke Test | `tests/smoke-test.js` |
| Load Test | `tests/load-test.js` |
| Stress Test | `tests/stress-test.js` |
| Spike Test | `tests/spike-test.js` |
| Soak Test | `tests/soak-test.js` |
| Breakpoint Test | `tests/breakpoint-test.js` |

## 🎓 Metodologia de Testes

1. **Smoke Test** - Valida se a aplicação está funcionando (2 VUs, 10s)
2. **Load Test** - Valida se o fluxo aguenta a carga esperada (50 VUs, 2min)
3. **Stress Test** - Descobre o limite antes de falhar (ramp até 200 VUs)
4. **Spike Test** - Testa reação a picos repentinos (400 VUs em 30s)
5. **Soak Test** - Valida estabilidade prolongada (200 VUs por 1h)
6. **Breakpoint Test** - Encontra o ponto máximo de ruptura (até 50000 VUs)

## 🔧 Arquivos de Configuração

### `config.js`
Centraliza a URL base do ambiente de testes. Pode ser sobrescrita via variável de ambiente.

### `geraToken.js`
Função auxiliar que gera tokens JWT dinamicamente fazendo login na API com credenciais admin.

## 📊 API Alvo

Testes direcionados à API de uma biblioteca (library system):

- `GET /api/health` - Health check (sem autenticação)
- `POST /api/login` - Autenticação (retorna token JWT)
- `GET /api/books` - Listagem de livros (sem autenticação)
- `GET /api/users` - Listagem de usuários (requer autenticação)

## 📚 Recursos

- [Documentação K6](https://k6.io/docs/)
- [Plano de Teste Completo](tests/plano-de-teste.md)
- [Copilot Instructions](.github/copilot-instructions.md)

## 🤝 Contribuindo

Este é um projeto educacional. Sinta-se à vontade para explorar, modificar e aprender!
