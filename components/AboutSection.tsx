import { View, Text, useWindowDimensions } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { GradientText } from "@/components/GradientText";
import { FadeIn } from "@/components/FadeIn";
import { ContactButton } from "@/components/ContactButton";
import { person } from "@/content/profile";

export function AboutSection() {
  const { width } = useWindowDimensions();
  const headingSize = Math.min(width * 0.16, 90);

  // Pulsing dot
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.6, { duration: 1400, easing: Easing.out(Easing.ease) }),
      -1,
      true
    );
  }, []);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 2 - pulse.value,
  }));

  return (
    <View className="items-center gap-10 px-6 md:px-10 py-20 mx-10 md:mx-12">
      <FadeIn y={30}>
        <GradientText
          style={{
            fontFamily: "Kanit_900Black",
            fontSize: headingSize,
            lineHeight: headingSize,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          About me
        </GradientText>
      </FadeIn>

      {/* Currently @ badge */}
      <FadeIn delay={80} y={12}>
        <View className="flex-row items-center gap-3 rounded-full border border-ice/20 bg-white/[0.03] px-4 py-2">
          <View style={{ width: 10, height: 10 }}>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  backgroundColor: "#22C55E",
                },
                pulseStyle,
              ]}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                backgroundColor: "#22C55E",
              }}
            />
          </View>
          <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/80">
            Currently open to front-end and full-stack opportunities.
          </Text>
        </View>
      </FadeIn>

      <View className="items-center gap-10">
        <FadeIn delay={150} y={16}>
          <Text className="max-w-[600px] text-center font-kanit text-base leading-relaxed text-ice/85">
            {person.summary}
          </Text>
        </FadeIn>

        <FadeIn delay={280} y={16}>
          <ContactButton />
        </FadeIn>
      </View>
    </View>
  );
}