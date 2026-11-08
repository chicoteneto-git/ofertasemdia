"use client";

import { Deal } from "@/types/deal";
import { ExternalLink, Flame, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { useState } from "react";

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (val: number) => {
    return val.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const savings = deal.originalPrice > deal.promotionalPrice ? deal.originalPrice - deal.promotionalPrice : 0;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
      {/* Top Media & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-50 p-4 dark:bg-neutral-800/50">
        {/* Discount Badge */}
        {deal.discountPercent > 0 && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-black tracking-wide text-white shadow-md">
            <Flame className="h-3.5 w-3.5 fill-white stroke-none" />
            <span>-{deal.discountPercent}%</span>
          </div>
        )}

        {/* Free Shipping Badge */}
        {deal.freeShipping && (
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-md">
            <Truck className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Frete Grátis</span>
          </div>
        )}

        {/* Product Image */}
        <div className="flex h-full w-full items-center justify-center">
          {!imageError && deal.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={deal.imageUrl}
              alt={deal.title}
              onError={() => setImageError(true)}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-400">
              <ShoppingCart className="h-12 w-12 stroke-[1.5]" />
              <span className="text-xs font-medium">Imagem em alta resolução</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Info */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          {/* Category & Rating */}
          <div className="mb-2 flex items-center justify-between gap-2 text-xs">
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {deal.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-500 stroke-none" />
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {deal.rating > 0 ? deal.rating.toFixed(1) : "4.8"}
              </span>
              {deal.soldQuantity > 0 && (
                <span className="text-neutral-400">({deal.soldQuantity}+)</span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-amber-600 dark:text-neutral-100 dark:group-hover:text-amber-400">
            {deal.title}
          </h3>

          {/* Seller / Store */}
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Vendido por: <span className="font-medium text-neutral-700 dark:text-neutral-300">{deal.seller}</span>
          </p>
        </div>

        {/* Pricing Block & CTA */}
        <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <div className="flex items-baseline gap-2">
            {deal.originalPrice > deal.promotionalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(deal.originalPrice)}
              </span>
            )}
            <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">
              {formatPrice(deal.promotionalPrice)}
            </span>
          </div>

          {savings > 0 && (
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Você economiza {formatPrice(savings)}
            </p>
          )}

          {/* Purchase Button */}
          <a
            href={deal.affiliateUrl || deal.originalUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-2.5 text-sm font-black text-neutral-950 shadow-sm transition-all hover:brightness-105 hover:shadow-md active:scale-[0.98]"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>PEGAR OFERTA</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </article>
  );
}

