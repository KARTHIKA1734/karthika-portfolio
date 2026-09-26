import { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;

    const onMove = (e: MouseEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          if (pendingRef.current) setPos(pendingRef.current);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (Platform.OS !== "web") return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: pos.x - 300,
          top: pos.y - 300,
          width: 600,
          height: 600,
          borderRadius: 600,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 400ms ease-out",
          background:
            "radial-gradient(circle at center, rgba(182,0,168,0.10) 0%, rgba(118,33,176,0.06) 35%, rgba(0,0,0,0) 70%)",
          filter: "blur(20px)",
          willChange: "transform, left, top",
        }}
      />
    </View>
  );
}