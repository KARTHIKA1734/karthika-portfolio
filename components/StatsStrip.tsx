import { View, Text, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FadeIn } from "@/components/FadeIn";
import { CountUp } from "@/components/CountUp";
import { stats } from "@/content/profile";

export function StatsStrip() {
  const translateY = useSharedValue(0);
  const glow = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: `rgba(215,226,234,${0.12 + glow.value * 0.28})`,
  }));

  const webHandlers =
    Platform.OS === "web"
      ? {
          onMouseEnter: () => {
            translateY.value = withSpring(-6, { damping: 18, stiffness: 180 });
            glow.value = withTiming(1, { duration: 200 });
          },
          onMouseLeave: () => {
            translateY.value = withSpring(0, { damping: 18, stiffness: 180 });
            glow.value = withTiming(0, { duration: 200 });
          },
        }
      : {};

  return (
    <View className="px-6 md:px-10 py-16 mx-10 md:mx-12">
      <FadeIn y={20}>
        <Animated.View
          style={[
            cardStyle,
            borderStyle,
            {
              borderRadius: 32,
              borderWidth: 1,
              backgroundColor: "rgba(255,255,255,0.03)",
              padding: 24,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: 0.4,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 8 },
            },
          ]}
          {...(webHandlers as any)}
        >
          <View className="flex-row flex-wrap justify-between gap-y-6">
            {stats.map((s, i) => (
              <View key={s.label} className="w-1/2 items-center gap-2">
                <CountUp
                  value={s.value}
                  decimals={s.decimals ?? 0}
                  suffix={s.suffix}
                  delay={i * 120}
                  className="font-kanitBlack text-3xl text-ice"
                  style={{ fontFamily: "Kanit_900Black" }}
                />
                <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/60 text-center">
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </FadeIn>
    </View>
  );
}