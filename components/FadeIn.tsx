import { useEffect, useRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withDelay,
  withTiming,
  runOnJS,
  type SharedValue,
} from "react-native-reanimated";
import { useState } from "react";
import { useScrollY } from "@/context/ScrollContext";

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  style?: StyleProp<ViewStyle>;
  /**
   * Pass the shared scroll value from index.tsx so the component can
   * detect when it scrolls into view. If omitted, FadeIn falls back to
   * playing on mount (old behavior).
   */
  scrollY?: SharedValue<number>;
  /** Replay when scrolled out of view + back in. Default: true */
  replay?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 700,
  y = 24,
  x = 0,
  style,
  scrollY,
  replay = true,
}: Props) {
  const { height: windowHeight } = useWindowDimensions();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(y);
  const translateX = useSharedValue(x);
  const hasPlayed = useSharedValue(false);
  const contextScrollY = useScrollY();
const effectiveScrollY = scrollY ?? contextScrollY;

  // Absolute position of this component on the page (relative to scroll content)
  const [layoutY, setLayoutY] = useState<number | null>(null);
  const [layoutH, setLayoutH] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const playIn = () => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translateY.value = withDelay(delay, withTiming(0, { duration }));
    translateX.value = withDelay(delay, withTiming(0, { duration }));
  };

  const playOut = () => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(y, { duration: 200 });
    translateX.value = withTiming(x, { duration: 200 });
  };

  // If no scrollY shared value is passed, play on mount (fallback)
  useEffect(() => {
    if (!scrollY) {
      playIn();
    }
  }, [scrollY]);

  // If scrollY is passed, use animated reaction to detect visibility
  useAnimatedReaction(
    () => {
      if (!scrollY || layoutY == null) return { inView: false, ready: false };
      const scrollTop = scrollY.value;
      const scrollBottom = scrollTop + windowHeight;
      const elementTop = layoutY;
      const elementBottom = layoutY + layoutH;
      // "In view" when the element's bottom is above viewport bottom
      // and its top is below viewport top (with a small buffer)
      const inView =
        elementTop < scrollBottom - 40 && elementBottom > scrollTop + 40;
      return { inView, ready: true };
    },
    ({ inView, ready }) => {
      if (!ready) return;

      if (inView && !hasPlayed.value) {
        hasPlayed.value = true;
        runOnJS(playIn)();
      } else if (!inView && hasPlayed.value && replay) {
        hasPlayed.value = false;
        runOnJS(playOut)();
      }
    },
    [layoutY, layoutH, windowHeight, replay, scrollY]
  );

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  return (
    <Animated.View
      onLayout={(e) => {
        setLayoutY(e.nativeEvent.layout.y);
        setLayoutH(e.nativeEvent.layout.height);
      }}
      style={[style, animStyle]}
    >
      {children}
    </Animated.View>
  );
}