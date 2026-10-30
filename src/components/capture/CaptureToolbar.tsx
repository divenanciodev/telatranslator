import { useEffect, useRef, useState } from "react";
import { Camera, Film, Mic, Captions, Minus, Plus, Square, Timer, Video, X, MoreHorizontal, Pin } from "lucide-react";
import type { CaptureMode, Phase, VideoSource } from "./types";

type Props = {
  mode: CaptureMode;
  onModeChange: (mode: CaptureMode) => void;
  phase: Phase;
  onNew: () => void;
  onCancel: () => void;
  videoSource: VideoSource;
  onVideoSourceChange: (s: VideoSource) => void;
};

export function CaptureToolbar({ mode, onModeChange, phase, onNew, onCancel, videoSource, onVideoSourceChange }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    const width = 760;
    setPos({
      x: Math.max(16, (window.innerWidth - width) / 2),
      y: Math.max(16, window.innerHeight * 0.16),
    });
    setReady(true);
  }, []);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragRef.current) return;
      setPos({ x: e.clientX - dragRef.current.dx, y: e.clientY - dragRef.current.dy });
    }
    function onUp() {
      dragRef.current = null;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      className="fixed z-50 w-[760px] max-w-[94vw] select-none overflow-hidden rounded-window border border-window-border bg-window shadow-window"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className="flex cursor-grab items-center gap-2 px-4 py-3 active:cursor-grabbing"
        onPointerDown={(e) => {
          dragRef.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
        }}
      >
        <Pin className="size-4 text-muted-foreground" />
        <span className="text-sm text-window-foreground">Ferramenta de Tradução</span>
        <div className="ml-auto flex items-center gap-1 text-muted-foreground">
          <button className="rounded p-1.5 transition-colors hover:bg-window-hover" aria-label="Minimizar">
            <Minus className="size-4" />
          </button>
          <button className="rounded p-1.5 transition-colors hover:bg-window-hover" aria-label="Maximizar">
            <Square className="size-3.5" />
          </button>
          <button
            onClick={onCancel}
            className="rounded p-1.5 transition-colors hover:bg-destructive hover:text-destructive-foreground"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 pb-4">
        <button
          onClick={onNew}
          className="flex items-center gap-2 rounded-lg border border-window-border bg-window-hover px-4 py-2.5 text-sm font-medium text-window-foreground transition-colors hover:bg-window-active"
        >
          <Plus className="size-4" />
          Novo
        </button>

        <div className="mx-1 flex items-center gap-1 rounded-lg bg-window-hover p-1">
          <ModeButton
            active={mode === "fixed"}
            onClick={() => onModeChange("fixed")}
            icon={<Video className="size-4" />}
            label="Fixo"
          />
          <ModeButton
            active={mode === "screenshot"}
            onClick={() => onModeChange("screenshot")}
            icon={<Camera className="size-4" />}
            label="Captura de tela"
          />
          <ModeButton
            active={mode === "video"}
            onClick={() => onModeChange("video")}
            icon={<Film className="size-4" />}
            label="Vídeos"
          />
        </div>

        <div className="h-8 w-px bg-window-border" />

        <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-window-hover" aria-label="Formato">
          <Square className="size-4" />
        </button>
        <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-window-hover" aria-label="Atraso">
          <Timer className="size-4" />
        </button>
        <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-window-hover" aria-label="Mais">
          <MoreHorizontal className="size-4" />
        </button>

        {phase !== "idle" && (
          <button
            onClick={onCancel}
            className="ml-auto rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90"
          >
            Cancelar
          </button>
        )}
      </div>

      {mode === "video" && (
        <div className="flex items-center gap-2 px-4 pb-3 text-xs text-muted-foreground">
          <span>Traduzir a partir de:</span>
          <div className="flex items-center gap-1 rounded-lg bg-window-hover p-1">
            <ModeButton
              active={videoSource === "voice"}
              onClick={() => onVideoSourceChange("voice")}
              icon={<Mic className="size-3.5" />}
              label="Voz → legenda PT"
            />
            <ModeButton
              active={videoSource === "subtitles"}
              onClick={() => onVideoSourceChange("subtitles")}
              icon={<Captions className="size-3.5" />}
              label="Legendas EN → PT"
            />
          </div>
        </div>
      )}

      <div className="border-t border-window-border px-4 py-2.5 text-xs text-muted-foreground">
        {phase === "selecting"
          ? "Arraste para delimitar a área da tela que deseja traduzir."
          : phase === "active"
            ? mode === "video"
              ? videoSource === "voice"
                ? "Modo vídeo ativo — ouvindo a voz e gerando legendas em português. Clique em Cancelar para sair."
                : "Modo vídeo ativo — lendo as legendas em inglês e traduzindo para português. Clique em Cancelar para sair."
              : mode === "fixed"
              ? "Modo fixo ativo — traduzindo continuamente. Clique em Cancelar para sair."
              : "Captura concluída — texto traduzido exibido na área delimitada."
            : `Modo selecionado: ${mode === "fixed" ? "Fixo" : mode === "video" ? "Vídeos" : "Captura de tela"}. ${mode === "video" ? "Delimite a área do vídeo. " : ""}Clique em Novo para começar.`}
      </div>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-window text-primary shadow-sm ring-1 ring-primary/30"
          : "text-muted-foreground hover:bg-window-active"
      }`}
    >
      {icon}
      {label}
      {active && <span className="ml-1 h-1 w-4 rounded-full bg-primary" />}
    </button>
  );
}
