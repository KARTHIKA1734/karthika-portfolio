import { useRef } from "react";
import { View, Platform } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

/**
 * On web: tracks the mouse and nudges the element toward the cursor,
 * matching the spec's Magnet component exactly (mouse events pass through
 * react-native-web's View onMouseMove/onMouseLeave).
 *
 * On iOS/Android: there's no cursor, so this swaps to a press-in
 * scale-and-tilt response instead — the avatar still "reacts to you",
 * just via touch instead of hover.
 */
export function MagnetOrPress({
  children,
  padding = 150,
  strength = 3,
  style,
}: {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const ref = useRef<View>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  if (Platform.OS === "web") {
    const onMouseMove = (e: any) => {
      const rect = (ref.current as any)?.getBoundingClientRect?.();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(rect.width, rect.height) / 2 + padding;
      if (dist < reach) {
        translateX.value = withSpring(dx / strength, { damping: 14 });
        translateY.value = withSpring(dy / strength, { damping: 14 });
      }
    };
    const onMouseLeave = () => {
      translateX.value = withSpring(0, { damping: 14 });
      translateY.value = withSpring(0, { damping: 14 });
    };

    return (
      <View
        ref={ref}
        style={style}
        // @ts-expect-error react-native-web forwards DOM mouse events
        onMouseMove={onMouseMove}
        // @ts-expect-error react-native-web forwards DOM mouse events
        onMouseLeave={onMouseLeave}
      >
        <Animated.View style={animStyle}>{children}</Animated.View>
      </View>
    );
  }

  const onPressIn = () => {
    scale.value = withSpring(0.96, { damping: 14 });
    translateY.value = withSpring(-6, { damping: 14 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 12 });
    translateY.value = withSpring(0, { damping: 12 });
  };

  return (
    <View style={style} onTouchStart={onPressIn} onTouchEnd={onPressOut}>
      <Animated.View style={animStyle}>{children}</Animated.View>
    </View>
  );
}
