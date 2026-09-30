import { Languages, Loader2 } from "lucide-react";
import type { CaptureMode, Rect } from "./types";
import type { TranslatedLine } from "./fakeTranslation";

type Props = {
  rect: Rect;
  mode: CaptureMode;
  lines: TranslatedLine[];
  live: boolean;
};

export function TranslationRegion({ rect, mode, lines, live }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <div
        className="absolute animate-marching border-2 border-dashed border-selection bg-selection-fill"
        style={{ left: rect.x, top: rect.y, width: rect.width, height: rect.height }}
      >
        <div className="flex h-full flex-col gap-2 overflow-hidden p-3">
          <div className="flex w-fit items-center gap-2 rounded bg-window/95 px-2 py-1 text-xs font-medium text-primary shadow-sm">
            {live ? <Loader2 className="size-3.5 animate-spin" /> : <Languages className="size-3.5" />}
            {mode === "fixed" ? "Tradução ao vivo (Inglês → Português)" : "Texto traduzido (Inglês → Português)"}
          </div>
          <div className="flex-1 space-y-2 overflow-hidden rounded-md bg-window/95 p-3 text-sm leading-relaxed text-window-foreground shadow-window">
            {lines.map((line) => (
              <p key={line.id} className="animate-fade-in">
                {line.translated}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
