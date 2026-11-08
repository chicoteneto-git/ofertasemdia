import { Deal } from "@/types/deal";

interface StructuredDataProps {
  deals: Deal[];
}

export function StructuredData({ deals }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ofertasmais.com.br";

  // Schema.org WebSite & SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ofertas+ Brasil",
    url: siteUrl,
    description: "Vitrine de ofertas inteligentes com descontos reais verificados 24h por dia no Brasil.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Schema.org ItemList with Products & Offers
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Melhores Ofertas e Promoções do Brasil",
    numberOfItems: deals.length,
    itemListElement: deals.slice(0, 50).map((deal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: deal.title,
        image: deal.imageUrl || undefined,
        description: `${deal.title} com ${deal.discountPercent}% de desconto no ${deal.seller}. De R$ ${deal.originalPrice.toFixed(2)} por R$ ${deal.promotionalPrice.toFixed(2)}.`,
        sku: deal.id,
        offers: {
          "@type": "Offer",
          price: deal.promotionalPrice.toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: deal.affiliateUrl || deal.originalUrl,
          priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          seller: {
            "@type": "Organization",
            name: deal.seller,
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: deal.rating.toFixed(1),
          reviewCount: Math.max(deal.soldQuantity, 15),
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}

