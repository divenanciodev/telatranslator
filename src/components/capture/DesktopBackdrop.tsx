import { useEffect, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { VIDEO_SOURCE_LINES } from "./fakeTranslation";

function FakeVideo() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => v + 1), 2600);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className="mx-auto mb-8 max-w-3xl overflow-hidden rounded-lg bg-foreground shadow-window">
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-foreground to-muted-foreground/60">
        <div className="flex size-16 items-center justify-center rounded-full bg-background/20">
          <Play className="size-8 text-background" />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-foreground/80 px-3 py-1 text-center text-base text-background">
          {VIDEO_SOURCE_LINES[i % VIDEO_SOURCE_LINES.length]}
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-2 text-xs text-background/80">
        <Play className="size-3.5" />
        <Volume2 className="size-3.5" />
        <div className="h-1 flex-1 rounded bg-background/20">
          <div className="h-1 w-1/3 rounded bg-primary" />
        </div>
        <span>03:12 / 10:45</span>
      </div>
    </div>
  );
}

export function DesktopBackdrop() {
  return (
    <div className="min-h-screen bg-desk px-4 py-10">
      <FakeVideo />
      <div className="mx-auto max-w-3xl rounded-lg bg-paper p-10 font-serif text-[15px] leading-relaxed text-paper-foreground shadow-window">
        <h1 className="mb-6 text-lg">A friendly request to the reader!</h1>
        <p className="mb-4">
          As the Preface explains, this is a very slightly corrected reprint of the second edition of my
          Introduction to Formal Logic, originally published in 2020 by CUP. I am now able to make it freely
          available to download as a PDF. You can also buy a print-on-demand physical copy at a price as low as
          I can make it from Amazon.
        </p>
        <p className="mb-4">
          No introductory logic text will suit all readers. This one will be too longwinded for some, and too
          brisk for others. Some readers will want more &lsquo;informal logic&rsquo; at the outset; others will
          complain that I take over fifty pages before we start formal logic proper.
        </p>
        <p className="mb-4">
          But if you do read the book &ndash; because it is set as a course text, or just because you want to
          teach yourself some basic logic &ndash; do let me know how you find it. Are there any particular
          sections that you find obscure? Are there parts that go too fast or too slowly?
        </p>
        <p className="mb-4">
          I&rsquo;m keen to know because I have it in mind to write a third edition sooner or later. Because the
          book is now self-published, it is a lot easier to keep improving it, even if it means adding extra
          pages here or there.
        </p>
        <p>
          Peter Smith, before he retired, was Senior Lecturer in Philosophy at the University of Cambridge. His
          other books include Explaining Chaos (1998) and An Introduction to G&ouml;del&rsquo;s Theorems (2007).
        </p>
      </div>
    </div>
  );
}
