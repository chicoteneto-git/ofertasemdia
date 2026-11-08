import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ofertasemdia.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: "d19vw4wUCNMRgQT6oDJgORtHQGsECeV4lTVsNItWLck",
  },
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PK9JT7H6');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PK9JT7H6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
