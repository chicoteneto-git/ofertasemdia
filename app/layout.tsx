import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ofertasmais.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ofertas+ | Melhores Descontos e Promoções Verificadas do Brasil",
    template: "%s | Ofertas+ Brasil",
  },
  description:
    "Descubra as melhores ofertas e promoções com descontos reais de até 50% verificadas 24h por dia no Brasil. Eletrônicos, celulares, casa e tecnologia no Mercado Livre, Shopee e Amazon.",
  keywords: [
    "ofertas brasil",
    "promocoes brasil",
    "descontos mercado livre",
    "promocoes shopee",
    "ofertas amazon",
    "compras online brasil",
    "menor preco",
    "cupom de desconto",
    "promocao relampago",
    "achados imperdiveis",
  ],
  authors: [{ name: "Ofertas+ Brasil" }],
  creator: "Ofertas+ Brasil",
  publisher: "Ofertas+ Brasil",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Ofertas+ Brasil",
    title: "Ofertas+ | Melhores Descontos e Promoções Verificadas do Brasil",
    description:
      "Catálogo atualizado 24h com descontos reais de até 50% em lojas oficiais do Mercado Livre, Shopee e Amazon.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ofertas+ | Melhores Descontos e Promoções Verificadas do Brasil",
    description:
      "Garimpo automático de preços baixos e promoções com até 50% de desconto no Brasil.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
