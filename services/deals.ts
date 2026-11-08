import { Deal } from "@/types/deal";

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || "10ruQ8-9O2pIh7XfKDsjWm-1fBEr9X6fXid3ojEtaGVs";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;

const FALLBACK_DEALS: Deal[] = [
  {
    id: "MLB5318281144",
    title: "Smart Tv 50 Polegadas 4k Uhd Led Dolby Audio Hdr10",
    originalPrice: 2899.0,
    promotionalPrice: 1999.0,
    discountPercent: 31,
    originalUrl: "https://www.mercadolivre.com.br",
    affiliateUrl: "https://tinyurl.com/exemplo-ml-tv50",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_789456-MLA80123456789_112024-F.webp",
    category: "TV e Vídeo",
    freeShipping: true,
    rating: 4.8,
    soldQuantity: 1540,
    seller: "Loja Oficial Samsung",
    status: "ATIVO",
  },
  {
    id: "MLB4129841284",
    title: "Fritadeira Sem Óleo Air Fryer Digital 4.5l Antiaderente",
    originalPrice: 499.9,
    promotionalPrice: 299.9,
    discountPercent: 40,
    originalUrl: "https://www.mercadolivre.com.br",
    affiliateUrl: "https://tinyurl.com/exemplo-ml-airfryer",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_912345-MLA80234567890_112024-F.webp",
    category: "Eletrodomésticos",
    freeShipping: true,
    rating: 4.9,
    soldQuantity: 4210,
    seller: "Mondial Oficial",
    status: "ATIVO",
  },
];

function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseNumber(val: string | undefined): number {
  if (!val) return 0;
  const clean = String(val).replace(/[^0-9,.-]/g, "").trim();
  if (clean.includes(",") && clean.includes(".")) {
    return parseFloat(clean.replace(/\./g, "").replace(",", "."));
  }
  if (clean.includes(",")) {
    return parseFloat(clean.replace(",", "."));
  }
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

function detectCategory(title: string): string {
  const t = title.toLowerCase();
  if (/fone|headset|earbud|airpod|caixa de som|bluetooth|jbl/i.test(t)) return "Áudio";
  if (/tv|smart tv|televis|oled|qled|roku/i.test(t)) return "TV e Vídeo";
  if (/celular|smartphone|iphone|galaxy|motorola|xiaomi|redmi|poco/i.test(t)) return "Smartphones";
  if (/notebook|computador|laptop|teclado|mouse|monitor|ssd|ram|ryzen|intel|gamer/i.test(t)) return "Informática";
  if (/liquidificador|aspirador|fritadeira|air fryer|batedeira|cafeteira|micro-ondas|panela|ventilador/i.test(t)) return "Eletrodomésticos";
  if (/perfume|creme|shampoo|hidratante|maquiagem|protetor|cabelo/i.test(t)) return "Beleza e Cuidados";
  if (/furadeira|parafusadeira|ferramenta|jogo de chave|trena|serra/i.test(t)) return "Ferramentas";
  if (/relogio|smartwatch|relogio inteligente|band/i.test(t)) return "Smartwatch";
  return "Ofertas";
}

function detectStore(url: string, explicitSeller?: string): string {
  if (explicitSeller && explicitSeller.trim().length > 0 && explicitSeller !== "Mercado Livre") {
    return explicitSeller;
  }
  const u = url.toLowerCase();
  if (u.includes("amazon.com") || u.includes("amzn.to")) return "Amazon";
  if (u.includes("shopee.com") || u.includes("s.shopee")) return "Shopee";
  if (u.includes("mercadolivre.com") || u.includes("mercadolibre.com")) return "Mercado Livre";
  if (u.includes("magazineluiza.com") || u.includes("magalu")) return "Magalu";
  return explicitSeller || "Loja Oficial";
}

export async function getDeals(): Promise<{ deals: Deal[]; isFallback: boolean; error?: string }> {
  try {
    const res = await fetch(CSV_URL, {
      next: { revalidate: 60 },
      headers: { Accept: "text/csv,text/plain" },
    });

    if (!res.ok) {
      return {
        deals: FALLBACK_DEALS,
        isFallback: true,
        error: `Planilha retornou status HTTP ${res.status}. Certifique-se de que a planilha está publicada na Web.`,
      };
    }

    const csvText = await res.text();
    if (csvText.startsWith("<!DOCTYPE") || csvText.includes("<html")) {
      return {
        deals: FALLBACK_DEALS,
        isFallback: true,
        error: "Acesso privado detectado. A planilha precisa de permissão de visualização pública ou publicação na Web.",
      };
    }

    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length <= 1) {
      return { deals: FALLBACK_DEALS, isFallback: true };
    }

    const header = parseCSVLine(lines[0]);
    const colIdx = {
      id: header.findIndex((h) => /^id$/i.test(h)),
      title: header.findIndex((h) => /titulo|title/i.test(h)),
      originalPrice: header.findIndex((h) => /precooriginal|precode/i.test(h)),
      promotionalPrice: header.findIndex((h) => /precoatual|precopromocional|precopor/i.test(h)),
      discount: header.findIndex((h) => /descontopercent|desconto/i.test(h)),
      rating: header.findIndex((h) => /avaliacao|rating/i.test(h)),
      originalUrl: header.findIndex((h) => /linkoriginal|urloriginal/i.test(h)),
      imageUrl: header.findIndex((h) => /^imagemurl$/i.test(h)),
      image1Url: header.findIndex((h) => /^imagem1url$/i.test(h)),
      status: header.findIndex((h) => /^status$/i.test(h)),
      affiliateShort: header.findIndex((h) => /linkafiliadocurto|linkcurto/i.test(h)),
      affiliateLong: header.findIndex((h) => /^linkafiliado$/i.test(h)),
      category: header.findIndex((h) => /categoria|category/i.test(h)),
      freeShipping: header.findIndex((h) => /fretegratis|freeshipping/i.test(h)),
      soldQuantity: header.findIndex((h) => /quantidadevendida|soldquantity/i.test(h)),
      seller: header.findIndex((h) => /vendedor|seller/i.test(h)),
    };

    const deals: Deal[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i]);
      if (cols.length < 4) continue;

      const statusVal = (cols[colIdx.status] || "ok").toLowerCase().trim();
      // Exclude only known expired or disabled statuses
      if (statusVal === "expirado" || statusVal === "esgotado" || statusVal === "inativo") {
        continue;
      }

      const id = cols[colIdx.id] || `ITEM-${i}`;
      const title = cols[colIdx.title] || "Oferta Mercado Livre";
      const originalPrice = parseNumber(cols[colIdx.originalPrice]);
      const promotionalPrice = parseNumber(cols[colIdx.promotionalPrice]);
      let discountPercent = parseNumber(cols[colIdx.discount]);

      if (discountPercent <= 0 && originalPrice > promotionalPrice && originalPrice > 0) {
        discountPercent = Math.round(((originalPrice - promotionalPrice) / originalPrice) * 100);
      }

      // Fallback image chain: ImagemURL -> Imagem1URL -> placeholder
      const imageUrl =
        cols[colIdx.imageUrl] ||
        cols[colIdx.image1Url] ||
        "";

      // Fallback affiliate link chain: LinkAfiliadoCurto -> LinkAfiliado -> LinkOriginal
      const originalUrl = cols[colIdx.originalUrl] || "https://www.mercadolivre.com.br";
      const affiliateUrl =
        cols[colIdx.affiliateShort] ||
        cols[colIdx.affiliateLong] ||
        originalUrl;

      // Category detection or explicit column
      const category =
        (colIdx.category !== -1 && cols[colIdx.category])
          ? cols[colIdx.category]
          : detectCategory(title);

      const freeShipping =
        colIdx.freeShipping !== -1
          ? (cols[colIdx.freeShipping] || "").toUpperCase() === "SIM"
          : promotionalPrice >= 79; // Mercado Livre default free shipping threshold

      const rating =
        colIdx.rating !== -1 ? parseNumber(cols[colIdx.rating]) || 4.7 : 4.7;

      const soldQuantity =
        colIdx.soldQuantity !== -1
          ? parseInt(cols[colIdx.soldQuantity]?.replace(/\D/g, "") || "100", 10)
          : 250;

      const seller = detectStore(
        originalUrl,
        colIdx.seller !== -1 ? cols[colIdx.seller] : undefined
      );

      deals.push({
        id,
        title,
        originalPrice,
        promotionalPrice,
        discountPercent,
        originalUrl,
        affiliateUrl,
        imageUrl,
        category,
        freeShipping,
        rating,
        soldQuantity,
        seller,
        status: statusVal,
      });
    }

    if (deals.length === 0) {
      return { deals: FALLBACK_DEALS, isFallback: true };
    }

    // Sort by highest discount % by default
    deals.sort((a, b) => b.discountPercent - a.discountPercent);

    return { deals, isFallback: false };
  } catch (err) {
    return {
      deals: FALLBACK_DEALS,
      isFallback: true,
      error: err instanceof Error ? err.message : "Erro desconhecido ao carregar planilha",
    };
  }
}
