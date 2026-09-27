import { useRef, useState, useEffect } from "react";
import { Platform, View, Text } from "react-native";
import type { TextStyle, StyleProp } from "react-native";

type Props = {
    children: string;
    style?: StyleProp<TextStyle>;
    className?: string;
    radius?: number;
    dimColor?: string;
    brightColor?: string;
};

export function SpotlightText({
    children,
    style,
    className,
    radius = 120,
    dimColor = "rgba(215,226,234,0.25)",
    brightColor = "#FFFFFF",
}: Props) {
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const [hovered, setHovered] = useState(false);
    const ref = useRef<any>(null);

    useEffect(() => {
        if (Platform.OS !== "web") return;
        const el = ref.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        };
        const onEnter = () => setHovered(true);
        const onLeave = () => {
            setHovered(false);
            setPos(null);
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    // Native fallback: just render the bright version
    if (Platform.OS !== "web") {
        return (
            <Text className={className} style={[style, { color: brightColor }]}>
                {children}
            </Text>
        );
    }

    const mask =
        pos && hovered
            ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, #000 0%, #000 60%, transparent 100%)`
            : `radial-gradient(circle 0px at 0px 0px, transparent, transparent)`;

    return (
        <View
            ref={ref}
            style={
                {
                    position: "relative",
                    display: Platform.OS === "web" ? "inline-block" : "flex",
                    cursor: Platform.OS === "web" ? "default" : undefined,
                } as any
            }
        >
            {/* Dim base */}
            <Text className={className} style={[style, { color: dimColor }]}>
                {children}
            </Text>

            {/* Bright layer revealed only near cursor */}
            <View
                pointerEvents="none"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // @ts-ignore web-only CSS masks
                    WebkitMaskImage: mask,
                    maskImage: mask,
                }}
            >
                <Text className={className} style={[style, { color: brightColor }]}>
                    {children}
                </Text>
            </View>
        </View>
    );
}