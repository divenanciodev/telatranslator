export type TranslatedLine = {
  id: number;
  source: string;
  translated: string;
};

const SAMPLES: Array<{ source: string; translated: string }> = [
  {
    source: "A friendly request to the reader!",
    translated: "Um pedido amigável ao leitor!",
  },
  {
    source:
      "As the Preface explains, this is a very slightly corrected reprint of the second edition of my Introduction to Formal Logic.",
    translated:
      "Como explica o Prefácio, esta é uma reimpressão levemente corrigida da segunda edição da minha Introdução à Lógica Formal.",
  },
  {
    source:
      "I am now able to make it freely available to download as a PDF. You can also buy a print-on-demand physical copy.",
    translated:
      "Agora posso disponibilizá-la gratuitamente para download em PDF. Você também pode comprar uma cópia física impressa sob demanda.",
  },
  {
    source:
      "No introductory logic text will suit all readers. This one will be too longwinded for some, and too brisk for others.",
    translated:
      "Nenhum texto introdutório de lógica servirá para todos os leitores. Este será prolixo demais para alguns e rápido demais para outros.",
  },
  {
    source:
      "But if you do read the book, do let me know how you find it. Are there any particular sections that you find obscure?",
    translated:
      "Mas se você ler o livro, me diga o que achou. Existe alguma seção que você considere obscura?",
  },
  {
    source:
      "I'm keen to know because I have it in mind to write a third edition sooner or later.",
    translated:
      "Tenho interesse em saber porque pretendo escrever uma terceira edição mais cedo ou mais tarde.",
  },
  {
    source:
      "Peter Smith, before he retired, was Senior Lecturer in Philosophy at the University of Cambridge.",
    translated:
      "Peter Smith, antes de se aposentar, foi Professor Sênior de Filosofia na Universidade de Cambridge.",
  },
];

let counter = 0;

export function nextTranslatedLine(index: number): TranslatedLine {
  const sample = SAMPLES[index % SAMPLES.length]!;
  counter += 1;
  return { id: counter, ...sample };
}

export function firstBatch(): TranslatedLine[] {
  return [0, 1, 2].map((i) => nextTranslatedLine(i));
}

const VIDEO_SAMPLES: Array<{ source: string; translated: string }> = [
  { source: "Welcome back to the channel, everyone.", translated: "Bem-vindos de volta ao canal, pessoal." },
  { source: "Today we're going to talk about formal logic.", translated: "Hoje vamos falar sobre lógica formal." },
  { source: "Let's start with a simple example.", translated: "Vamos começar com um exemplo simples." },
  { source: "If it rains, the street gets wet.", translated: "Se chover, a rua fica molhada." },
  { source: "Does that sound reasonable to you?", translated: "Isso parece razoável para você?" },
  { source: "Don't forget to like and subscribe!", translated: "Não esqueça de curtir e se inscrever!" },
];

export function nextVideoLine(index: number): TranslatedLine {
  const sample = VIDEO_SAMPLES[index % VIDEO_SAMPLES.length]!;
  counter += 1;
  return { id: counter, ...sample };
}

export const VIDEO_SOURCE_LINES = VIDEO_SAMPLES.map((s) => s.source);
