import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import { VitrineClient } from "@/components/VitrineClient";
import { getDeals } from "@/services/deals";
import { ShieldCheck } from "lucide-react";

export const revalidate = 60; // ISR: revalida dados da planilha a cada 60s

export default async function Home() {
  const { deals, isFallback, error } = await getDeals();

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100/60 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <StructuredData deals={deals} />
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <VitrineClient
          initialDeals={deals}
          isFallback={isFallback}
          errorMessage={error}
        />
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-neutral-500 sm:flex-row sm:px-6 sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Links seguros com redirecionamento oficial para as lojas parceiras.</span>
          </div>
          <p>
            © {new Date().getFullYear()} Ofertas+ • As Melhores Ofertas do Brasil
          </p>
        </div>
      </footer>
    </div>
  );
}
