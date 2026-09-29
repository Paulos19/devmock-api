import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevMock API • Simulador de Webhooks e Pagamentos para Devs",
  description: "Crie endpoints temporários instantâneos para simular Stripe, gateways locais, inspecionar payloads em tempo real via SSE e fazer replay de requisições.",
  keywords: ["webhooks", "mock payments", "stripe simulator", "developer tools", "realtime webhooks", "sse dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen bg-[#07090e] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
