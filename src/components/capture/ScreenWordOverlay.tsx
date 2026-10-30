import { useEffect, useState } from "react";

const DICT: Record<string, string> = {
  a: "um", friendly: "amigável", request: "pedido", to: "para", the: "o", reader: "leitor",
  as: "como", preface: "prefácio", explains: "explica", this: "isto", is: "é", very: "muito",
  slightly: "levemente", corrected: "corrigida", reprint: "reimpressão", of: "de", second: "segunda",
  edition: "edição", my: "minha", introduction: "introdução", formal: "formal", logic: "lógica",
  originally: "originalmente", published: "publicado", in: "em", by: "por", i: "eu", am: "estou",
  now: "agora", able: "capaz", make: "tornar", it: "isso", freely: "livremente", available: "disponível",
  download: "baixar", you: "você", can: "pode", also: "também", buy: "comprar", physical: "física",
  copy: "cópia", at: "a", price: "preço", low: "baixo", from: "de", no: "nenhum", introductory: "introdutório",
  text: "texto", will: "vai", suit: "servir", all: "todos", readers: "leitores", one: "um", too: "demais",
  for: "para", some: "alguns", and: "e", others: "outros", want: "querer", more: "mais", informal: "informal",
  outset: "início", complain: "reclamar", that: "que", take: "levo", over: "mais de", fifty: "cinquenta",
  pages: "páginas", before: "antes", we: "nós", start: "começar", proper: "propriamente", but: "mas",
  if: "se", do: "fazer", read: "ler", book: "livro", because: "porque", set: "definido", course: "curso",
  or: "ou", just: "apenas", teach: "ensinar", yourself: "a si mesmo", basic: "básica", let: "deixe",
  me: "me", know: "saber", how: "como", find: "acha", are: "são", there: "lá", any: "algum",
  particular: "particular", sections: "seções", obscure: "obscuro", parts: "partes", go: "vão",
  fast: "rápido", slowly: "devagar", keen: "ansioso", have: "tenho", mind: "mente", write: "escrever",
  third: "terceira", sooner: "cedo", later: "tarde", lot: "muito", easier: "mais fácil", keep: "continuar",
  improving: "melhorando", even: "mesmo", means: "significa", adding: "adicionar", extra: "extras",
  here: "aqui", he: "ele", retired: "aposentou", was: "foi", senior: "sênior", lecturer: "professor",
  philosophy: "filosofia", university: "universidade", his: "seus", other: "outros", books: "livros",
  include: "incluem", explaining: "explicando", chaos: "caos", theorems: "teoremas", welcome: "bem-vindo",
  back: "de volta", channel: "canal", everyone: "pessoal", today: "hoje", talk: "falar", about: "sobre",
  with: "com", simple: "simples", example: "exemplo",
};

type Box = { x: number; y: number; w: number; h: number; t: string; k: string };

export function ScreenWordOverlay() {
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    function scan() {
      const root = document.querySelector("[data-screen-root]");
      if (!root) return;
      const out: Box[] = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      let n = 0;
      while ((node = walker.nextNode())) {
        const text = node.textContent ?? "";
        const re = /[A-Za-z]+/g;
        let m: RegExpExecArray | null;
        while ((m = re.exec(text))) {
          const t = DICT[m[0].toLowerCase()];
          if (!t) continue;
          const range = document.createRange();
          range.setStart(node, m.index);
          range.setEnd(node, m.index + m[0].length);
          const r = range.getBoundingClientRect();
          if (r.width === 0 || r.bottom < 0 || r.top > window.innerHeight) continue;
          out.push({ x: r.left, y: r.top, w: r.width, h: r.height, t, k: `${n++}` });
        }
      }
      setBoxes(out);
    }
    scan();
    const id = window.setInterval(scan, 800);
    window.addEventListener("scroll", scan, true);
    window.addEventListener("resize", scan);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", scan, true);
      window.removeEventListener("resize", scan);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {boxes.map((b) => (
        <span
          key={b.k}
          title={b.t}
          className="absolute flex items-center justify-center overflow-hidden whitespace-nowrap rounded-sm border border-dashed border-selection bg-window text-window-foreground animate-fade-in"
          style={{ left: b.x, top: b.y, width: b.w, height: b.h, fontSize: Math.min(b.h * 0.7, (b.w / Math.max(b.t.length, 1)) * 1.8) }}
        >
          {b.t}
        </span>
      ))}
    </div>
  );
}
