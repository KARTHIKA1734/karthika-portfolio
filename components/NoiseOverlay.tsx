import { Platform, View } from "react-native";

const NOISE_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>`;

export function NoiseOverlay() {
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
        zIndex: 1,
        opacity: 0.06,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          pointerEvents: "none",
        }}
      />
    </View>
  );
}