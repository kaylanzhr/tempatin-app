"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./icon";

export function DemoDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    closeButton.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, []);

  return <dialog ref={ref} className="demo-dialog" aria-labelledby="dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onKeyDown={(event) => {
    if (event.key === "Escape") { event.preventDefault(); onClose(); }
    if (event.key === "Tab") {
      const buttons = ref.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
      if (!buttons?.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }}>
    <div className="flex items-center justify-between gap-4 border-b border-line p-5 sm:p-6">
      <h2 id="dialog-title" className="text-xl font-semibold">{title}</h2>
      <button ref={closeButton} type="button" onClick={onClose} className="icon-button" aria-label="Tutup dialog"><Icon name="close" /></button>
    </div>
    <div className="space-y-5 p-5 sm:p-6">{children}<button type="button" className="button button-primary w-full" onClick={onClose}>Tutup</button></div>
  </dialog>;
}
