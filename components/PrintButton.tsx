'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-3 bg-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-bright"
    >
      <Printer className="h-4 w-4" aria-hidden="true" /> Print or save as PDF
    </button>
  );
}
