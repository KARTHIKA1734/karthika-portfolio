import { useEffect, useState } from "react";
import { View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withTiming } from "react-native-reanimated";

/**
 * The RN equivalent of the spec's FadeIn (Framer Motion whileInView).
 * Plays once, triggered on mount with a delay — since a true viewport
 * intersection observer isn't available uniformly across RN + web here,
 * this mirrors the same staged reveal feel without over-engineering a
 * custom IntersectionObserver-equivalent for a single-screen scroll page.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 700,
  y = 24,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(y);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translateY.value = withDelay(delay, withTiming(0, { duration }));
  }, [mounted]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[style, animStyle]}>{children}</Animated.View>;
}
