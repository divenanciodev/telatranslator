export function DesktopBackdrop() {
  return (
    <div className="min-h-screen bg-desk px-4 py-10">
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
