"use client";

import { Deal, SortOption } from "@/types/deal";
import { DealCard } from "./DealCard";
import { TelegramBanner } from "./TelegramBanner";
import { AlertCircle, ArrowUpDown, Filter, Flame, Info, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";

interface VitrineClientProps {
  initialDeals: Deal[];
  isFallback: boolean;
  errorMessage?: string;
}

export function VitrineClient({ initialDeals, isFallback, errorMessage }: VitrineClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState<SortOption>("discount");

  // Dynamic categories from deals
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialDeals.forEach((d) => {
      if (d.category) set.add(d.category);
    });
    return ["Todos", ...Array.from(set)];
  }, [initialDeals]);

  // Filtered and sorted deals
  const filteredDeals = useMemo(() => {
    return initialDeals
      .filter((deal) => {
        const matchesCategory =
          selectedCategory === "Todos" || deal.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          deal.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
          deal.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "discount":
            return b.discountPercent - a.discountPercent;
          case "price_asc":
            return a.promotionalPrice - b.promotionalPrice;
          case "price_desc":
            return b.promotionalPrice - a.promotionalPrice;
          case "rating":
            return b.rating - a.rating;
          case "sales":
            return b.soldQuantity - a.soldQuantity;
          default:
            return 0;
        }
      });
  }, [initialDeals, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="space-y-8">
      {/* Fallback Notice Banner */}
      {isFallback && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 sm:text-sm dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="space-y-1">
            <p className="font-bold">Modo Catálogo Demonstrativo Ativo</p>
            <p className="text-amber-800 dark:text-amber-300">
              {errorMessage ||
                "A planilha do Google Sheets precisa estar com permissão de leitura pública ou publicada na Web para sincronização em tempo real."}
            </p>
            <p className="font-mono text-[11px] text-amber-700 dark:text-amber-400">
              Dica: No Google Sheets, clique em <strong>Arquivo → Compartilhar → Publicar na Web</strong> (formato CSV) ou libere para &quot;Qualquer pessoa com o link pode ler&quot;.
            </p>
          </div>
        </div>
      )}

      {/* Hero Welcome */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>GARIMPO AUTOMÁTICO DE PREÇOS</span>
        </div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
          Os Maiores Descontos do <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">Brasil</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 sm:text-base dark:text-neutral-400">
          Produtos com desconto real de até 50% verificados e atualizados pelo Robô de Afiliados.
        </p>
      </div>

      {/* Controls: Search, Categories & Sorting */}
      <div className="space-y-4 rounded-3xl border border-neutral-200 bg-neutral-50/70 p-4 backdrop-blur-sm sm:p-6 dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por produto, marca ou loja oficial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-white py-2.5 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              <option value="discount">Maior Desconto (%)</option>
              <option value="price_asc">Menor Preço (R$)</option>
              <option value="price_desc">Maior Preço (R$)</option>
              <option value="rating">Melhor Avaliação</option>
              <option value="sales">Mais Vendidos</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900"
                    : "bg-white text-neutral-600 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 sm:text-sm">
        <p>
          Mostrando <span className="font-bold text-neutral-900 dark:text-white">{filteredDeals.length}</span>{" "}
          {filteredDeals.length === 1 ? "oferta" : "ofertas"}
        </p>
        {(searchTerm || selectedCategory !== "Todos") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Todos");
            }}
            className="text-amber-600 hover:underline dark:text-amber-400"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Grid of Deals */}
      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-800">
          <AlertCircle className="h-10 w-10 text-neutral-400" />
          <h3 className="mt-3 text-base font-bold text-neutral-800 dark:text-neutral-200">
            Nenhuma oferta encontrada
          </h3>
          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
            Tente buscar com outros termos ou altere a categoria selecionada.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Todos");
            }}
            className="mt-4 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
          >
            Ver todas as ofertas
          </button>
        </div>
      )}

      {/* Telegram Community Banner */}
      <TelegramBanner />
    </div>
  );
}

