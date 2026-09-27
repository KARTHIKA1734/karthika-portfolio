// import { useEffect, useRef, useState } from "react";
// import { Platform, View } from "react-native";

// export function CursorGlow() {
//   const [pos, setPos] = useState({ x: -500, y: -500 });
//   const [visible, setVisible] = useState(false);
//   const rafRef = useRef<number | null>(null);
//   const pendingRef = useRef<{ x: number; y: number } | null>(null);

//   useEffect(() => {
//     if (Platform.OS !== "web" || typeof window === "undefined") return;

//     const onMove = (e: MouseEvent) => {
//       pendingRef.current = { x: e.clientX, y: e.clientY };
//       if (!visible) setVisible(true);
//       if (rafRef.current == null) {
//         rafRef.current = requestAnimationFrame(() => {
//           if (pendingRef.current) setPos(pendingRef.current);
//           rafRef.current = null;
//         });
//       }
//     };

//     window.addEventListener("mousemove", onMove, { passive: true });
//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [visible]);

//   if (Platform.OS !== "web") return null;

//   return (
//     <View
//       pointerEvents="none"
//       style={{
//         position: "fixed" as any,
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 50,
//       }}
//     >
//       <View
//         style={{
//           position: "absolute",
//           left: pos.x,
//           top: pos.y,
//           width: 0,
//           height: 0,
//           opacity: visible ? 1 : 0,
//           // @ts-ignore web-only CSS
//           transition: "opacity 500ms ease-out",
//         }}
//       >
//         <View
//           style={{
//             position: "absolute",
//             left: -200,
//             top: -200,
//             width: 400,
//             height: 400,
//             borderRadius: 400,
//             backgroundColor: "rgba(182,0,168,0.10)",
//             // @ts-ignore web-only CSS
//             filter: "blur(60px)",
//             // @ts-ignore web-only CSS
//             willChange: "transform",
//           }}
//         />
//       </View>
//     </View>
//   );
// }