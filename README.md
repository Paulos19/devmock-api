# DevMock API ⚡

> Simulador de Webhooks e Pagamentos para Devs com Live SSE & Replay para Localhost.

## A Dor
Testar fluxos de checkout, integrações de webhook e eventos assíncronos em ambiente de desenvolvimento local costuma ser burocrático e exige ferramentas pesadas (ngrok com sessões que expiram, dashboards de sandbox lentos, payloads perdidos em caso de crash do servidor).

## A Solução
Serviço web que cria endpoints temporários instantâneos para disparar e inspecionar payloads de webhooks (Stripe, Mercado Pago PIX, gateways locais, etc.) com UI moderna para replay de requisições direto para o localhost.

## Superpoder do Next.js
Atualização de eventos em tempo real via **Server-Sent Events (SSE)** e WebSockets nativos do Next.js App Router, permitindo que cada webhook recebido pisque no dashboard em milissegundos com baixíssimo consumo de memória.

## Tech Stack
- Next.js 16 (App Router)
- React 19 & TypeScript
- Tailwind CSS v4
- Lucide React Icons
