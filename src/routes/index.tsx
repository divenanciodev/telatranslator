import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CaptureToolbar } from "@/components/capture/CaptureToolbar";
import { SelectionLayer } from "@/components/capture/SelectionLayer";
import { TranslationRegion } from "@/components/capture/TranslationRegion";
import { DesktopBackdrop } from "@/components/capture/DesktopBackdrop";
import { firstBatch, nextTranslatedLine, nextVideoLine, type TranslatedLine } from "@/components/capture/fakeTranslation";
import type { CaptureMode, Phase, Rect, VideoSource } from "@/components/capture/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tradutor de Tela — captura e traduz áreas da tela" },
      {
        name: "description",
        content:
          "Ferramenta de captura de tela que traduz o texto de uma área delimitada, com modo fixo para tradução contínua.",
      },
      { property: "og:title", content: "Tradutor de Tela — captura e traduz áreas da tela" },
      {
        property: "og:description",
        content:
          "Selecione uma área da tela e veja o texto traduzido na hora, ou use o modo fixo para tradução contínua.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mode, setMode] = useState<CaptureMode>("fixed");
  const [phase, setPhase] = useState<Phase>("idle");
  const [rect, setRect] = useState<Rect | null>(null);
  const [lines, setLines] = useState<TranslatedLine[]>([]);
  const indexRef = useRef(3);
  const [videoSource, setVideoSource] = useState<VideoSource>("subtitles");

  // Modo fixo: continua traduzindo o que aparece na área até o usuário cancelar.
  useEffect(() => {
    if (phase !== "active" || mode === "screenshot") return;
    const timer = window.setInterval(() => {
      const next = mode === "video" ? nextVideoLine(indexRef.current++) : nextTranslatedLine(indexRef.current++);
      setLines((prev) => [...prev.slice(-5), next]);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [phase, mode]);

  function handleNew() {
    setLines([]);
    setRect(null);
    indexRef.current = 3;
    setPhase("selecting");
  }

  function handleCancel() {
    setPhase("idle");
    setRect(null);
    setLines([]);
  }

  function handleComplete(selected: Rect) {
    setRect(selected);
    if (mode === "video") {
      indexRef.current = 1;
      setLines([nextVideoLine(0)]);
    } else setLines(firstBatch());
    setPhase("active");
  }

  return (
    <>
      <DesktopBackdrop />

      {phase === "selecting" && <SelectionLayer onComplete={handleComplete} />}

      {phase === "active" && rect && (
        <TranslationRegion rect={rect} mode={mode} lines={lines} live={mode !== "screenshot"} videoSource={videoSource} />
      )}

      <CaptureToolbar
        mode={mode}
        onModeChange={setMode}
        phase={phase}
        onNew={handleNew}
        onCancel={handleCancel}
        videoSource={videoSource}
        onVideoSourceChange={setVideoSource}
      />
    </>
  );
}
