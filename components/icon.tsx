import type { SVGProps } from "react";

const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  plug: "M8 2v5m8-5v5M6 7h12v4a6 6 0 0 1-12 0V7m6 10v5",
  moon: "M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11",
  smoke: "M3 15h14v5H3zM20 15v5M17 3c-4 3 4 4 0 8M21 3c-4 3 4 4 0 8",
  home: "m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7",
  leaf: "M20 3C9 2 2 7 5 15s17 4 15-12ZM4 21 15 10",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  chair: "M5 13V4h14v9M3 13h18v5H3zM5 18v4m14-4v4",
  clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 6v6l4 2",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M6 18 18 6",
  cup: "M4 8h13v7a6 6 0 0 1-13 0V8m13 1h2a3 3 0 0 1 0 6h-2M3 22h16M7 2v2m6-2v2",
  plus: "M12 5v14M5 12h14",
  info: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 11v6M12 7v.1",
} as const;

export type IconName = keyof typeof paths;
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}
