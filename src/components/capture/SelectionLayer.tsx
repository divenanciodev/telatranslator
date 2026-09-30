import { useRef, useState } from "react";
import type { Rect } from "./types";

type Props = {
  onComplete: (rect: Rect) => void;
};

function toRect(a: { x: number; y: number }, b: { x: number; y: number }): Rect {
  return {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };
}

export function SelectionLayer({ onComplete }: Props) {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);

  return (
    <div
      className="fixed inset-0 z-40 cursor-crosshair bg-overlay"
      onPointerDown={(e) => {
        startRef.current = { x: e.clientX, y: e.clientY };
        setRect({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
      }}
      onPointerMove={(e) => {
        if (!startRef.current) return;
        setRect(toRect(startRef.current, { x: e.clientX, y: e.clientY }));
      }}
      onPointerUp={(e) => {
        if (!startRef.current) return;
        const final = toRect(startRef.current, { x: e.clientX, y: e.clientY });
        startRef.current = null;
        setRect(null);
        if (final.width > 40 && final.height > 40) onComplete(final);
      }}
    >
      {rect && (
        <div
          className="pointer-events-none absolute border-2 border-dashed border-selection bg-selection-fill"
          style={{ left: rect.x, top: rect.y, width: rect.width, height: rect.height }}
        />
      )}
      {!rect && (
        <div className="pointer-events-none flex h-full items-center justify-center">
          <p className="rounded-full bg-window/90 px-5 py-2 text-sm text-window-foreground shadow-window">
            Arraste para selecionar a área
          </p>
        </div>
      )}
    </div>
  );
}
