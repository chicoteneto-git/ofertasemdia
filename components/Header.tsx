import { Flame, Send, Sparkles, ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-neutral-950 shadow-md shadow-amber-500/20">
            <Flame className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-neutral-900 sm:text-xl dark:text-white">
                OFERTAS<span className="text-amber-500">+</span>
              </span>
              <span className="hidden rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 sm:inline-flex dark:bg-emerald-500/20 dark:text-emerald-400">
                Verificadas
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Descontos reais garimpados 24h por dia
            </p>
          </div>
        </div>

        {/* Action CTA Telegram */}
        <div className="flex items-center gap-3">
          <a
            href="https://t.me/ofertasdmais"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-[#229ED9] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#1e8dbf] hover:shadow-md sm:text-sm"
          >
            <Send className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Canal VIP no Telegram</span>
            <span className="sm:hidden">Telegram</span>
          </a>
        </div>
      </div>
    </header>
  );
}

