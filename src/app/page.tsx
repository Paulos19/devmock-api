"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Zap,
  Radio,
  Play,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Code2,
  ArrowRight,
  Server,
  Layers,
  ChevronRight,
  Eye,
  Filter,
  Activity,
  Sliders,
  Sparkles,
  GitBranch,
  Github
} from "lucide-react";

interface WebhookEvent {
  id: string;
  source: string;
  event: string;
  status: number;
  time: string;
  payload: Record<string, unknown>;
}

const SAMPLE_EVENTS: WebhookEvent[] = [
  {
    id: "evt_1092a84b",
    source: "Stripe",
    event: "payment_intent.succeeded",
    status: 200,
    time: "agora mesmo",
    payload: {
      id: "pi_3MtwxL2eZvKYlo2C17e290",
      object: "payment_intent",
      amount: 14900,
      currency: "brl",
      status: "succeeded",
      customer: "cus_N83a7s098df",
      payment_method_types: ["pix", "card"],
      charges: {
        total_count: 1,
        data: [{ paid: true, receipt_url: "https://pay.mock/rcpt_984" }]
      }
    }
  },
  {
    id: "evt_3821fc09",
    source: "Mercado Pago",
    event: "payment.created (PIX)",
    status: 200,
    time: "2s atrás",
    payload: {
      action: "payment.created",
      data: { id: "9832109841" },
      type: "payment",
      live_mode: false,
      qr_code: "00020126580014br.gov.bcb.pix...",
      transaction_amount: 89.90
    }
  },
  {
    id: "evt_9941bd12",
    source: "Assinaturas SaaS",
    event: "customer.subscription.renewed",
    status: 200,
    time: "14s atrás",
    payload: {
      subscription_id: "sub_1Om8eL912a",
      plan: "pro_developer_annual",
      status: "active",
      next_billing_cycle: "2026-04-19T10:00:00Z"
    }
  },
  {
    id: "evt_5510cc39",
    source: "Stripe",
    event: "charge.refunded",
    status: 200,
    time: "48s atrás",
    payload: {
      refund_id: "re_894178cc",
      charge_id: "ch_178491823",
      amount_refunded: 4900,
      reason: "requested_by_customer"
    }
  }
];

export default function DevMockLandingPage() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent>(SAMPLE_EVENTS[0]);
  const [eventsList, setEventsList] = useState<WebhookEvent[]>(SAMPLE_EVENTS);
  const [isReplaying, setIsReplaying] = useState(false);
  const [replaySuccess, setReplaySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"payload" | "headers" | "curl">("payload");
  const [sseActive, setSseActive] = useState(true);

  const mockEndpoint = "https://devmock.api/v1/hook/whk_live_839f201";

  const handleCopyEndpoint = () => {
    navigator.clipboard?.writeText(mockEndpoint);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleReplay = (evt: WebhookEvent) => {
    setIsReplaying(true);
    setTimeout(() => {
      setIsReplaying(false);
      setReplaySuccess(true);
      const newEvt: WebhookEvent = {
        ...evt,
        id: `evt_replay_${Math.floor(Math.random() * 90000 + 10000)}`,
        time: "agora mesmo (replay)"
      };
      setEventsList((prev) => [newEvt, ...prev.slice(0, 5)]);
      setSelectedEvent(newEvt);
      setTimeout(() => setReplaySuccess(false), 2500);
    }, 600);
  };

  const handleSimulateNewEvent = () => {
    const randomAmount = (Math.random() * 200 + 20).toFixed(2);
    const newId = `evt_${Math.random().toString(36).substring(2, 9)}`;
    const freshEvent: WebhookEvent = {
      id: newId,
      source: "Stripe PIX Simulator",
      event: "payment_intent.succeeded",
      status: 200,
      time: "agora mesmo",
      payload: {
        id: `pi_sim_${Math.random().toString(36).substring(2, 8)}`,
        object: "payment_intent",
        amount_received: Number(randomAmount) * 100,
        currency: "brl",
        method: "pix_dynamic_qr",
        status: "succeeded",
        simulated: true,
        timestamp: new Date().toISOString()
      }
    };
    setEventsList((prev) => [freshEvent, ...prev.slice(0, 5)]);
    setSelectedEvent(freshEvent);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-emerald-600/15 via-cyan-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-[400px] h-[400px] bg-indigo-600/10 blur-3xl pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#07090e]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px] shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#090d16] rounded-xl flex items-center justify-center">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">DevMock</span>
              <span className="text-xs uppercase tracking-wider font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                API
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#problema" className="hover:text-emerald-400 transition-colors">A Dor dos Devs</a>
            <a href="#solucao" className="hover:text-emerald-400 transition-colors">Como Funciona</a>
            <a href="#demo" className="hover:text-emerald-400 transition-colors">Live Dashboard</a>
            <a href="#recursos" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#precos" className="hover:text-emerald-400 transition-colors">Planos</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4" />
              Gerar Endpoint Grátis
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Next.js SSE & WebSockets Live Engine
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Chega de sofrer para testar{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              webhooks & pagamentos
            </span>{" "}
            no localhost.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Crie endpoints temporários instantâneos para simular Stripe, gateways Pix e eventos assíncronos. Inspecione payloads em tempo real via Server-Sent Events e faça replay com 1 clique.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              Testar Simulador no Navegador
            </a>
            <button
              onClick={handleCopyEndpoint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-sm font-mono transition-all"
            >
              {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedUrl ? "Copiado para o Clipboard!" : "curl https://devmock.api/v1/..."}</span>
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 max-w-2xl mx-auto text-left">
            <div>
              <div className="text-2xl font-bold font-mono text-white">&lt;10ms</div>
              <div className="text-xs text-slate-400">Latência do túnel SSE</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-400">0 CLI</div>
              <div className="text-xs text-slate-400">Sem instalar ngrok/localtunnel</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-cyan-400">100% Mock</div>
              <div className="text-xs text-slate-400">Stripe, Pix, Mercado Pago</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">Replay 1-Click</div>
              <div className="text-xs text-slate-400">Reenvie para o seu localhost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: The Pain vs The Solution */}
      <section id="problema" className="py-16 border-y border-slate-800/70 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">A Realidade do Dev Backend</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">Por que testar webhooks hoje é um pesadelo?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Pain */}
            <div className="p-6 sm:p-8 rounded-2xl bg-rose-950/10 border border-rose-900/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="text-lg font-bold text-rose-300">O Jeito Doloroso & Tradicional</h3>
                  <p className="text-xs text-rose-400/80">ngrok vencendo tokens, CLI quebrando, payload perdido</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Configuração burocrática de túnel:</strong> Baixar CLI, autenticar token, abrir terminal e torcer para o ngrok não expirar a URL a cada 2 horas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Cartão recusado ou sem saldo no sandbox:</strong> Precisar abrir o dashboard pesado do Stripe ou do gateway para disparar eventos simulados manualmente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Zero replay imediato:</strong> Se seu backend crashar durante o debug, você tem que refazer todo o fluxo de checkout no frontend para disparar novamente.</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/15 border border-emerald-600/30 relative overflow-hidden shadow-lg shadow-emerald-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-300">O Jeito DevMock API</h3>
                  <p className="text-xs text-emerald-400/80">Copie o webhook, aponte e veja a mágica fluir em tempo real</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Endpoints instantâneos com 1 clique:</strong> URL HTTPS pronta com rota protegida por token, pronta para receber POSTs imediatos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Superpoder Server-Sent Events (SSE):</strong> O dashboard Next.js se conecta diretamente ao stream; cada webhook recebido pisca na tela em milissegundos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Replay de requisições:</strong> Corrigiu o bug no seu código? Clique em <code>Replay to Localhost</code> e repita o exato payload sem precisar reabrir o carrinho.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Live Simulator Interativo
          </div>
          <h2 className="text-3xl font-extrabold text-white">Experimente o Dashboard em Tempo Real</h2>
          <p className="text-sm text-slate-400 mt-2">
            Dispare um evento simulado ou teste o replay do payload para sentir a velocidade do feed Next.js com SSE.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="rounded-2xl border border-slate-800 bg-[#0d131f] shadow-2xl overflow-hidden">
          {/* Dashboard Header Bar */}
          <div className="border-b border-slate-800 bg-[#0a0e17] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
                hook: <span className="text-emerald-400">whk_live_839f201</span>
              </span>
            </div>

            {/* SSE status badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SSE Stream Conectado
              </span>
              <button
                onClick={handleSimulateNewEvent}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm transition-all"
              >
                <Zap className="w-3 h-3 fill-slate-950" />
                + Simular Post Webhook
              </button>
            </div>
          </div>

          {/* Endpoint Bar */}
          <div className="p-4 bg-[#090d16] border-b border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-slate-300 w-full sm:w-auto flex-1">
              <span className="text-emerald-400 font-bold">POST</span>
              <span className="text-slate-400 truncate">{mockEndpoint}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyEndpoint}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedUrl ? "Copiado!" : "Copiar URL"}
              </button>
              <button
                onClick={() => handleReplay(selectedEvent)}
                disabled={isReplaying}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white transition-all shadow-sm"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isReplaying ? "animate-spin" : ""}`} />
                {isReplaying ? "Reenviando..." : "Replay para Localhost"}
              </button>
            </div>
          </div>

          {/* Feed & Inspector Grid */}
          <div className="grid md:grid-cols-12 min-h-[460px]">
            {/* Left Column: Events Feed */}
            <div className="md:col-span-5 border-r border-slate-800 bg-[#0b101b] p-3 overflow-y-auto max-h-[500px]">
              <div className="flex items-center justify-between px-2 py-1.5 text-xs font-mono text-slate-400 uppercase tracking-wider">
                <span>Eventos Recebidos ({eventsList.length})</span>
                <span className="text-[10px] text-emerald-400">Live SSE</span>
              </div>

              <div className="mt-2 space-y-2">
                {eventsList.map((evt) => {
                  const isSelected = selectedEvent.id === evt.id;
                  return (
                    <div
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? "bg-slate-800/80 border-emerald-500/50 shadow-md shadow-emerald-500/5"
                          : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[11px] font-bold text-slate-300 truncate max-w-[180px]">
                          {evt.event}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {evt.status} OK
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span className="text-slate-400">{evt.source}</span>
                        <span>{evt.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Payload Inspector */}
            <div className="md:col-span-7 bg-[#080c14] p-4 flex flex-col justify-between">
              <div>
                {/* Tabs */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab("payload")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "payload"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      JSON Body
                    </button>
                    <button
                      onClick={() => setActiveTab("headers")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "headers"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Headers
                    </button>
                    <button
                      onClick={() => setActiveTab("curl")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "curl"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      cURL Replay
                    </button>
                  </div>

                  <span className="text-xs font-mono text-slate-500">ID: {selectedEvent.id}</span>
                </div>

                {replaySuccess && (
                  <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Payload reenviado com sucesso para seu localhost (porta 3000)!
                  </div>
                )}

                {/* Tab content viewer */}
                <div className="rounded-xl bg-[#05070c] border border-slate-800/80 p-4 font-mono text-xs overflow-x-auto text-emerald-300/90 leading-relaxed max-h-[300px]">
                  {activeTab === "payload" && (
                    <pre>{JSON.stringify(selectedEvent.payload, null, 2)}</pre>
                  )}
                  {activeTab === "headers" && (
                    <pre className="text-slate-300">
{`content-type: application/json
user-agent: Stripe/1.0 (+https://stripe.com/docs/webhooks)
stripe-signature: t=1681987123,v1=5257a869e7ecebeda32affa62cd...
x-devmock-stream: sse-v2
x-forwarded-for: 177.136.21.90`}
                    </pre>
                  )}
                  {activeTab === "curl" && (
                    <pre className="text-cyan-300">
{`curl -X POST http://localhost:3000/api/webhooks \\
  -H "Content-Type: application/json" \\
  -H "X-DevMock-Replay: true" \\
  -d '${JSON.stringify(selectedEvent.payload)}'`}
                    </pre>
                  )}
                </div>
              </div>

              {/* Inspector bottom info */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Assinatura HMAC validada
                </span>
                <span>Tamanho: ~840 bytes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Superpower Section: Next.js + SSE */}
      <section id="solucao" className="py-20 border-t border-slate-800/70 bg-gradient-to-b from-slate-950 to-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Superpoder do Next.js
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Streaming Contínuo via Server-Sent Events (SSE) nativo
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Esqueça polling pesado ou conexões WebSockets que caem com firewall corporativo. O DevMock usa o motor de streaming nativo do Next.js App Router para entregar cada requisição recebida instantaneamente na sua tela com zero delay.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Activity className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Zero Overhead no Servidor</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Next.js Edge Runtime mantém milhares de conexões abertas com consumo irrisório de memória.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <RotateCcw className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Replay para Localhost com Override</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Altere parâmetros do JSON no próprio browser antes de reenviar para testar cenários de erro.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Validador de Assinaturas HMAC</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Gera automaticamente o hash do Stripe, Mercado Pago ou custom secret para você testar segurança.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4 text-slate-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>app/api/stream/route.ts</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Next.js 15+ Route Handler</span>
              </div>

              <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`export async function GET(request: Request) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // Escuta os webhooks do Redis Pub/Sub
  pubsub.subscribe("whk_live_839f201", (payload) => {
    const sseEvent = \`data: \${JSON.stringify(payload)}\\n\\n\`;
    writer.write(encoder.encode(sseEvent));
  });

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="recursos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Ecossistema Completo</h2>
          <p className="text-3xl font-extrabold text-white">Tudo o que um desenvolvedor precisa para integrar pagamentos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Mocks Pré-configurados</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Templates prontos para Stripe, Mercado Pago PIX, Asaas, PagBank, Pagar.me e GitHub Webhooks. Dispare payloads realistas em 1 clique.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Replay & Retry Inteligente</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Falhou o tratamento do webhook no seu controller? Modifique o código, clique em Replay e teste novamente sem precisar refazer a compra.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Histórico Persistente</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Salve suas sessões de depuração para comparar payloads passados, tempos de resposta e códigos de status HTTP retornados pelo seu app.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing / Tiers */}
      <section id="precos" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Planos Transparentes</h2>
            <p className="text-3xl font-extrabold text-white">Comece grátis, faça upgrade quando o time crescer</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="p-8 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Dev Free</h3>
                <p className="text-xs text-slate-400 mt-1">Perfeito para testes rápidos e side projects</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-white">R$ 0</span>
                  <span className="text-slate-500 text-sm"> / para sempre</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    3 Endpoints ativos simultâneos
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Feed SSE em tempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    100 eventos no histórico/dia
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Replay manual para localhost
                  </li>
                </ul>
              </div>
              <button className="mt-8 w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-sm font-semibold text-white transition-colors">
                Criar Conta Gratuita
              </button>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0c121d] border-2 border-emerald-500/60 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                Mais Popular
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Dev Pro</h3>
                <p className="text-xs text-slate-400 mt-1">Para desenvolvedores full-stack e freelas</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-white">R$ 29</span>
                  <span className="text-slate-500 text-sm"> / mês</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Endpoints temporários ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Domínios customizados (ex: mock.minhaempresa.com)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Histórico persistente de 30 dias
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Simulador avançado com falhas e latência programada
                  </li>
                </ul>
              </div>
              <button className="mt-8 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold shadow-md shadow-emerald-500/20 transition-all">
                Começar Teste de 14 Dias
              </button>
            </div>

            {/* Team */}
            <div className="p-8 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Team & SaaS</h3>
                <p className="text-xs text-slate-400 mt-1">Para squads de engenharia e empresas</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-white">R$ 99</span>
                  <span className="text-slate-500 text-sm"> / mês</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Tudo do Pro para até 10 desenvolvedores
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Workspaces compartilhados de teste
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Auditoria de payloads e compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Suporte prioritário via Discord/Slack
                  </li>
                </ul>
              </div>
              <button className="mt-8 w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-sm font-semibold text-white transition-colors">
                Falar com Vendas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Pare de perder horas configurando túneis e webhooks
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Gere seu primeiro endpoint agora mesmo em menos de 5 segundos. Sem cartão de crédito, sem instalação de CLI.
          </p>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
          >
            <Zap className="w-5 h-5 fill-slate-950" />
            Criar Endpoint em 5 Segundos
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05070c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="font-bold text-slate-200">DevMock API</span>
            <span className="text-xs text-slate-500">© {new Date().getFullYear()} Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#problema" className="hover:text-slate-200 transition-colors">A Dor</a>
            <a href="#solucao" className="hover:text-slate-200 transition-colors">Solução SSE</a>
            <a href="#demo" className="hover:text-slate-200 transition-colors">Simulador</a>
            <a href="#precos" className="hover:text-slate-200 transition-colors">Planos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
