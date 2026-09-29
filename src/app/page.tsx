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
  Sun,
  Laptop,
  CheckCircle2,
  Share2
} from "lucide-react";

interface WebhookEvent {
  id: string;
  source: string;
  event: string;
  status: number;
  time: string;
  payload: Record<string, unknown>;
  headers: Record<string, string>;
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
      customer: "cus_N7b53xWw9",
      payment_method_types: ["pix", "card"],
      metadata: {
        order_id: "PED-98214",
        user_email: "cliente@empresa.com.br"
      }
    },
    headers: {
      "stripe-signature": "t=1679071234,v1=9e83bd60...",
      "content-type": "application/json",
      "user-agent": "Stripe/1.0 (+https://stripe.com/docs/webhooks)"
    }
  },
  {
    id: "evt_1092a84c",
    source: "Asaas",
    event: "PAYMENT_RECEIVED",
    status: 200,
    time: "há 2 min",
    payload: {
      event: "PAYMENT_RECEIVED",
      payment: {
        id: "pay_98124810924",
        customer: "cus_000005128",
        value: 290.0,
        netValue: 288.01,
        billingType: "PIX",
        status: "RECEIVED",
        confirmedDate: "2025-05-18T14:32:00Z"
      }
    },
    headers: {
      "asaas-access-token": "live_tok_92104812a...",
      "content-type": "application/json"
    }
  },
  {
    id: "evt_1092a84d",
    source: "Mercado Pago",
    event: "payment.created",
    status: 201,
    time: "há 5 min",
    payload: {
      action: "payment.created",
      api_version: "v1",
      data: { id: "1314981290" },
      date_created: "2025-05-18T14:29:12.000Z",
      type: "payment"
    },
    headers: {
      "x-signature": "ts=1679071000,v1=abc1234...",
      "content-type": "application/json"
    }
  }
];

export default function DevMockLandingPage() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent>(SAMPLE_EVENTS[0]);
  const [eventsList, setEventsList] = useState<WebhookEvent[]>(SAMPLE_EVENTS);
  const [isReplaying, setIsReplaying] = useState(false);
  const [replaySuccess, setReplaySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"payload" | "headers">("payload");
  const [filterSource, setFilterSource] = useState<string>("All");

  const mockEndpointUrl = "https://devmock.api/wh/v1/9a4f-8e2b-live";

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(mockEndpointUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSimulateWebhook = (gateway: string) => {
    const newId = `evt_${Math.random().toString(16).substring(2, 10)}`;
    let newEvt: WebhookEvent;

    if (gateway === "Stripe") {
      newEvt = {
        id: newId,
        source: "Stripe",
        event: "charge.captured",
        status: 200,
        time: "agora mesmo",
        payload: {
          id: `ch_${Math.random().toString(36).substring(2, 9)}`,
          amount: Math.floor(Math.random() * 50000) + 1000,
          currency: "brl",
          captured: true,
          livemode: false,
          created_at: new Date().toISOString()
        },
        headers: {
          "stripe-signature": `t=${Date.now()},v1=hash_simulada`,
          "content-type": "application/json"
        }
      };
    } else if (gateway === "Asaas") {
      newEvt = {
        id: newId,
        source: "Asaas",
        event: "PAYMENT_OVERDUE",
        status: 200,
        time: "agora mesmo",
        payload: {
          event: "PAYMENT_OVERDUE",
          payment: {
            id: `pay_${Math.random().toString(36).substring(2, 9)}`,
            value: 99.9,
            billingType: "BOLETO",
            status: "OVERDUE"
          }
        },
        headers: {
          "asaas-access-token": "simulated_token_xyz",
          "content-type": "application/json"
        }
      };
    } else {
      newEvt = {
        id: newId,
        source: "Mercado Pago",
        event: "merchant_order.updated",
        status: 200,
        time: "agora mesmo",
        payload: {
          topic: "merchant_order",
          resource: `https://api.mercadopago.com/merchant_orders/${Math.floor(Math.random() * 9000000)}`,
          status: "closed"
        },
        headers: {
          "x-signature": `ts=${Date.now()},v1=signature_mp`,
          "content-type": "application/json"
        }
      };
    }

    setEventsList((prev) => [newEvt, ...prev]);
    setSelectedEvent(newEvt);
  };

  const handleReplay = () => {
    setIsReplaying(true);
    setTimeout(() => {
      setIsReplaying(false);
      setReplaySuccess(true);
      setTimeout(() => setReplaySuccess(false), 3000);
    }, 700);
  };

  const filteredEvents =
    filterSource === "All"
      ? eventsList
      : eventsList.filter((e) => e.source.toLowerCase() === filterSource.toLowerCase());

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Background Subtle Mesh & Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-emerald-100/70 via-teal-50/50 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-0 w-[450px] h-[450px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-xs py-2 px-4 text-center font-medium shadow-sm">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Novo: Integração instantânea com Webhooks do Stripe, Asaas e Mercado Pago em 1-clique!
          <a href="#demo" className="underline font-bold hover:text-emerald-100 transition-colors ml-1">
            Testar Demo ao Vivo &rarr;
          </a>
        </span>
      </div>

      {/* Navbar Light */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                DevMock<span className="text-emerald-600">.api</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                v2.0 Light
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">
              Recursos
            </a>
            <a href="#demo" className="hover:text-emerald-600 transition-colors">
              Console Interativo
            </a>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">
              Como Funciona
            </a>
            <a href="#pricing" className="hover:text-emerald-600 transition-colors">
              Planos
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyUrl}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all cursor-pointer shadow-xs"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{mockEndpointUrl.replace("https://", "")}</span>
            </button>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Gerar Endpoint Grátis</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Next.js SSE &amp; WebSockets Live Inspector
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Simule webhooks e gateways de pagamento{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              sem dor de cabeça.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            Crie endpoints temporários instantâneos para testar integrações com Stripe, Mercado Pago, Asaas e Pix.
            Inspecione payloads em tempo real e faça retransmissão para seu localhost com 1 clique.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 cursor-pointer text-base"
            >
              <Zap className="w-4 h-4 fill-current" />
              Criar Endpoint de Teste Agora
            </a>
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm transition-all hover:border-slate-400"
            >
              {copiedUrl ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              {copiedUrl ? "Copiado para a Área de Transferência!" : "Copiar URL Pública"}
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Túnel Seguro SSL Automático</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Histórico SSE Instantâneo</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Sandbox / Demo Console */}
        <div id="demo" className="mt-14 scroll-mt-24">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80 overflow-hidden">
            {/* Window bar */}
            <div className="px-5 py-3.5 bg-slate-100/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block shadow-xs" />
                <span className="ml-2 font-mono text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  live-inspector // {mockEndpointUrl}
                </span>
              </div>

              {/* Quick Triggers */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium mr-1 hidden sm:inline">Disparar Webhook Mock:</span>
                <button
                  onClick={() => handleSimulateWebhook("Stripe")}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 transition-colors cursor-pointer"
                >
                  + Stripe PIX
                </button>
                <button
                  onClick={() => handleSimulateWebhook("Asaas")}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  + Asaas Boleto
                </button>
                <button
                  onClick={() => handleSimulateWebhook("Mercado Pago")}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors cursor-pointer"
                >
                  + Mercado Pago
                </button>
              </div>
            </div>

            {/* Console Body Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
              {/* Left Column: Event List */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Recebidos ao Vivo ({filteredEvents.length})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-600">
                    <button
                      onClick={() => setFilterSource("All")}
                      className={`px-2 py-0.5 rounded ${filterSource === "All" ? "bg-slate-800 text-white" : "hover:text-slate-900"}`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setFilterSource("Stripe")}
                      className={`px-2 py-0.5 rounded ${filterSource === "Stripe" ? "bg-slate-800 text-white" : "hover:text-slate-900"}`}
                    >
                      Stripe
                    </button>
                    <button
                      onClick={() => setFilterSource("Asaas")}
                      className={`px-2 py-0.5 rounded ${filterSource === "Asaas" ? "bg-slate-800 text-white" : "hover:text-slate-900"}`}
                    >
                      Asaas
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {filteredEvents.map((evt) => {
                    const isSelected = selectedEvent.id === evt.id;
                    return (
                      <div
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/10"
                            : "bg-white hover:bg-slate-100/70 border-slate-200 shadow-2xs"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span
                            className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                              evt.source === "Stripe"
                                ? "bg-violet-100 text-violet-800 border border-violet-200"
                                : evt.source === "Asaas"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "bg-sky-100 text-sky-800 border border-sky-200"
                            }`}
                          >
                            {evt.source}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">{evt.time}</span>
                        </div>

                        <div className="font-mono text-xs font-semibold text-slate-800 truncate mb-1">
                          {evt.event}
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                          <span className="text-slate-400">{evt.id}</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                            {evt.status} OK
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Event Inspector & Replay */}
              <div className="lg:col-span-7 flex flex-col bg-white">
                {/* Details Bar */}
                <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{selectedEvent.event}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                        {selectedEvent.source}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono mt-0.5 block">{selectedEvent.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReplay}
                      disabled={isReplaying}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isReplaying ? "animate-spin" : ""}`} />
                      <span>{isReplaying ? "Reenviando..." : "Replay para Localhost:3000"}</span>
                    </button>

                    {replaySuccess && (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 animate-fade-in">
                        <Check className="w-3.5 h-3.5" /> Reenviado com sucesso!
                      </span>
                    )}
                  </div>
                </div>

                {/* Tabs */}
                <div className="px-4 py-2 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab("payload")}
                      className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                        activeTab === "payload"
                          ? "bg-white text-emerald-700 border border-slate-300 shadow-2xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      JSON Body
                    </button>
                    <button
                      onClick={() => setActiveTab("headers")}
                      className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                        activeTab === "headers"
                          ? "bg-white text-emerald-700 border border-slate-300 shadow-2xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      HTTP Headers
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const data =
                        activeTab === "payload"
                          ? JSON.stringify(selectedEvent.payload, null, 2)
                          : JSON.stringify(selectedEvent.headers, null, 2);
                      navigator.clipboard.writeText(data);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-mono transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copiar {activeTab}
                  </button>
                </div>

                {/* Code Viewer (Dark Terminal contrast for readability) */}
                <div className="p-4 flex-1 bg-slate-900 overflow-x-auto text-slate-100 font-mono text-xs leading-relaxed selection:bg-emerald-500/30">
                  <pre className="text-slate-200">
                    {activeTab === "payload"
                      ? JSON.stringify(selectedEvent.payload, null, 2)
                      : JSON.stringify(selectedEvent.headers, null, 2)}
                  </pre>
                </div>

                {/* Footer Status */}
                <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>SSL v3 / TLS 1.3 Criptografado</span>
                  <span>Payload verificado com HMAC SHA256</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 font-mono">
              Projetado para Desenvolvedores
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Tudo o que você precisa para testar integrações sem dor
            </h3>
            <p className="mt-3 text-base text-slate-600">
              Economize horas de configuração de ngrok, portas abertas e mocks manuais com ferramentas prontas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Endpoints Instantâneos</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Gere uma URL pública temporária com HTTPS nativo em menos de 1 segundo. Nenhuma instalação ou conta obrigatória para começar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Replay 1-Clique para Localhost</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receba requisições reais da Stripe ou Mercado Pago e retransmita para o seu servidor local quantas vezes quiser até o seu código funcionar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Validador de Assinaturas HMAC</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Simulador e validador de cabeçalhos de assinatura criptográfica como `stripe-signature` e webhooks autenticados por token secreto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Clean Light */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 font-mono">
            Preços Claros &amp; Acessíveis
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Comece grátis, faça upgrade quando escalar
          </h3>
          <p className="mt-3 text-base text-slate-600">
            Perfeito para freelancers, estúdios de software e equipes de produto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Dev Free</h3>
              <p className="text-xs text-slate-500 mt-1">Perfeito para testes rápidos e side projects</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">R$ 0</span>
                <span className="text-slate-500 text-sm"> / para sempre</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  3 Endpoints ativos simultâneos
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Feed SSE em tempo real
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  100 eventos no histórico/dia
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Replay manual para localhost
                </li>
              </ul>
            </div>
            <button className="mt-8 w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-sm font-semibold text-slate-800 transition-colors cursor-pointer shadow-xs">
              Criar Conta Gratuita
            </button>
          </div>

          {/* Pro (Highlighted) */}
          <div className="p-8 rounded-2xl bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
              Mais Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Dev Pro</h3>
              <p className="text-xs text-slate-500 mt-1">Para desenvolvedores full-stack e freelas</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">R$ 29</span>
                <span className="text-slate-500 text-sm"> / mês</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Endpoints temporários ilimitados
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Domínios customizados (ex: mock.minhaempresa.com)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Histórico persistente de 30 dias
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Simulador automático de falhas de rede (400, 500)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  CLI nativa para Mac, Linux e Windows
                </li>
              </ul>
            </div>
            <button className="mt-8 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white transition-all shadow-md shadow-emerald-600/20 cursor-pointer">
              Iniciar Teste Pro de 7 Dias
            </button>
          </div>

          {/* Team */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Team &amp; Empresa</h3>
              <p className="text-xs text-slate-500 mt-1">Para squads, agências e fintechs</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">R$ 89</span>
                <span className="text-slate-500 text-sm"> / mês</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Até 10 desenvolvedores no time
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Mocks compartilhados entre frontend e backend
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Retenção ilimitada de payloads
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Suporte prioritário via WhatsApp / Slack
                </li>
              </ul>
            </div>
            <button className="mt-8 w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-sm font-semibold text-slate-800 transition-colors cursor-pointer shadow-xs">
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-slate-900 text-sm">DevMock API</span>
            <span className="text-xs text-slate-400">© 2025 • Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Docs de API</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Status do Servidor</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
