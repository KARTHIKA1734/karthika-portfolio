import { useState, useRef } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ArrowUpRight } from "lucide-react-native";

type Props = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  onPress: () => void;
};

export function ExpandableCard({
  title,
  category,
  description,
  stack,
  onPress,
}: Props) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const glow = useSharedValue(0);
  const [hovered, setHovered] = useState(false);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: `rgba(215,226,234,${0.12 + glow.value * 0.28})`,
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: glow.value * 4 },
      { translateY: -glow.value * 4 },
    ],
    opacity: 0.5 + glow.value * 0.5,
  }));

  // Web-only hover
  const webHandlers =
    Platform.OS === "web"
      ? {
          onMouseEnter: () => {
            setHovered(true);
            translateY.value = withSpring(-6, { damping: 18, stiffness: 180 });
            glow.value = withTiming(1, { duration: 200 });
          },
          onMouseLeave: () => {
            setHovered(false);
            translateY.value = withSpring(0, { damping: 18, stiffness: 180 });
            glow.value = withTiming(0, { duration: 200 });
          },
        }
      : {};

  return (
    <Animated.View style={[cardStyle, { flex: 1 }]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 20 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 20 });
        }}
        className="active:opacity-95"
        {...(webHandlers as any)}
      >
        <Animated.View
          style={[
            borderStyle,
            {
              borderRadius: 24,
              borderWidth: 1,
              backgroundColor: "rgba(255,255,255,0.03)",
              padding: 24,
              overflow: "hidden",
            },
          ]}
        >
          {/* Hover glow (web-only radial shine) */}
          {Platform.OS === "web" && (
            <Animated.View
              pointerEvents="none"
              style={[
                {
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 200,
                  height: 200,
                  borderRadius: 200,
                  backgroundColor: "rgba(182,0,168,0.15)",
                },
                useAnimatedStyle(() => ({
                  opacity: glow.value * 0.6,
                })),
              ]}
            />
          )}

          {/* Top row: title + arrow */}
          <View className="flex-row items-start justify-between gap-4">
            <Text
              style={{ fontFamily: "Kanit_900Black" }}
              className="text-xl uppercase text-ice flex-1"
            >
              {title}
            </Text>

            <Animated.View style={arrowStyle}>
              <ArrowUpRight size={22} color="#D7E2EA" strokeWidth={2.2} />
            </Animated.View>
          </View>

          {/* Category (accent color) */}
          <Text
            className="mt-2 text-sm"
            style={{ color: "#B600A8", fontFamily: "Kanit_500Medium" }}
          >
            {category}
          </Text>

          {/* Description */}
          <Text className="mt-4 font-kanit text-sm leading-relaxed text-ice/70">
            {description}
          </Text>

          {/* Stack pills */}
          <View className="mt-5 flex-row flex-wrap gap-2">
            {stack.map((tech) => (
              <View
                key={tech}
                className="rounded-lg border border-ice/15 bg-white/[0.02] px-3 py-1.5"
              >
                <Text className="font-kanitLight text-[11px] text-ice/70">
                  {tech}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}