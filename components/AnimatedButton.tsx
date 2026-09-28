import { View, Text, Pressable, Platform } from "react-native";
import type { ReactNode } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "solid" | "ghost";
  icon?: ReactNode;
  iconLeft?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
};

export function AnimatedButton({
  label,
  onPress,
  variant = "solid",
  icon,
  iconLeft,
  fullWidth = false,
  disabled = false,
  className,
}: Props) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const brightness = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: brightness.value,
  }));

  // Web-only hover
  const webHandlers =
    Platform.OS === "web"
      ? {
          onMouseEnter: () => {
            if (disabled) return;
            translateY.value = withSpring(-3, { damping: 18, stiffness: 200 });
            brightness.value = withTiming(1.15, { duration: 200 });
          },
          onMouseLeave: () => {
            translateY.value = withSpring(0, { damping: 18, stiffness: 200 });
            brightness.value = withTiming(1, { duration: 200 });
          },
        }
      : {};

  const isSolid = variant === "solid";

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => {
        if (disabled) return;
        scale.value = withSpring(0.97, { damping: 20 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 20 });
      }}
      className={
        "active:opacity-95 " +
        (fullWidth ? "w-full " : "self-start ") +
        (className ?? "")
      }
      {...(webHandlers as any)}
    >
      <Animated.View style={style}>
        <View
          className={
            "flex-row items-center justify-center gap-2 rounded-full px-6 py-3.5 " +
            (isSolid
              ? ""
              : "border border-ice/30 bg-transparent")
          }
          style={
            isSolid
              ? {
                  backgroundColor: "#B600A8",
                  opacity: disabled ? 0.6 : 1,
                }
              : { opacity: disabled ? 0.6 : 1 }
          }
        >
          {iconLeft}
          <Text
            className={
              "font-kanitMedium text-xs uppercase tracking-widest " +
              (isSolid ? "text-white" : "text-ice")
            }
          >
            {label}
          </Text>
          {icon}
        </View>
      </Animated.View>
    </Pressable>
  );
}