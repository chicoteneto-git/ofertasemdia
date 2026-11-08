import { BellRing, Send, Sparkles } from "lucide-react";

export function TelegramBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#229ED9] via-[#1a8bc4] to-[#146e9e] p-6 text-white shadow-xl sm:p-8">
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            <BellRing className="h-3.5 w-3.5" />
            <span>ALERTAS EM TEMPO REAL</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            As melhores promoções acabam em minutos.
          </h2>
          <p className="mt-2 text-sm text-sky-100 sm:text-base">
            Participe do nosso canal oficial no Telegram para receber alertas imediatos quando o Robô detectar bugs de preço e descontos acima de 50%.
          </p>
        </div>

        <a
          href="https://t.me/ofertasdmais"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-[#146e9e] shadow-lg transition-all hover:bg-sky-50 hover:shadow-xl active:scale-95"
        >
          <Send className="h-4 w-4" />
          <span>ENTRAR NO CANAL VIP</span>
        </a>
      </div>

      {/* Decorative Circles */}
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-xl" />
    </section>
  );
}

