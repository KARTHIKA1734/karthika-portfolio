import { useEffect } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";

type Props = {
  items: string[];
  speed?: number; // pixels per second
  direction?: "left" | "right";
};

export function Marquee({ items, speed = 60, direction = "left" }: Props) {
  const { width } = useWindowDimensions();
  // Repeat 4x so there's always content on both sides
  const loop = [...items, ...items, ...items, ...items];

  // Estimate tile width: padding + text length. Rough but works visually.
  const estimatedWidth = items.reduce((sum, s) => sum + s.length * 10 + 60, 0);
  const totalWidth = estimatedWidth;

  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = 0;
    const distance = totalWidth;
    const duration = (distance / speed) * 1000;
    offset.value = withRepeat(
      withTiming(direction === "left" ? -distance : distance, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    return () => cancelAnimation(offset);
  }, [direction, speed, totalWidth]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View style={{ overflow: "hidden", width: "100%" }}>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            gap: 12,
            paddingVertical: 4,
            willChange: "transform",
          },
          animStyle,
        ]}
      >
        {loop.map((item, i) => (
          <View
            key={`${item}-${i}`}
            className="rounded-full border border-ice/20 bg-white/[0.03] px-5 py-2.5"
          >
            <Text className="font-kanitLight text-sm uppercase tracking-widest text-ice/80">
              {item}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}