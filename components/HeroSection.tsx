import { View, Text, useWindowDimensions, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { useEffect } from "react";
import { User, ChevronDown } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GradientText } from "@/components/GradientText";
import { FadeIn } from "@/components/FadeIn";
import { MagnetOrPress } from "@/components/MagnetOrPress";
import { ContactButton } from "@/components/ContactButton";
import { ResumeButton } from "@/components/ResumeButton";
import { Typewriter } from "@/components/Typewriter";
import { Navbar } from "@/components/Navbar";
import { person } from "@/content/profile";

type Props = {
  onNavigate?: (sectionId: string) => void;
  activeSection?: string;
};

export function HeroSection({ onNavigate, activeSection }: Props) {
  const { width, height } = useWindowDimensions();
  const headlineSize = Math.min(width * 0.16, 96);
  const avatarWidth = Math.min(width * 0.62, 360);

  // Rotating gradient ring behind the avatar
  const ringRotation = useSharedValue(0);
  useEffect(() => {
    ringRotation.value = withRepeat(
      withTiming(360, { duration: 12000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);
  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotation.value}deg` }],
  }));

  return (
    <View
      style={{ minHeight: Math.max(height * 0.95, 640) }}
      className="justify-between bg-base overflow-hidden"
    >
      <Navbar onNavigate={onNavigate} activeSection={activeSection} />

      {/* Heading */}
      <View className="px-6 pt-10">
        <FadeIn delay={150} y={30}>
          <View className="overflow-hidden">
            <GradientText
              style={{
                fontFamily: "Kanit_900Black",
                fontSize: headlineSize,
                lineHeight: headlineSize * 0.98,
                textTransform: "uppercase",
              }}
            >
              hi, i'm karthika
            </GradientText>
          </View>
        </FadeIn>

        {/* Typewriter roles */}
        <FadeIn delay={300} y={16}>
          <View className="mt-3 flex-row items-center">
            <Text className="font-kanitLight text-xs uppercase tracking-[0.2em] text-ice/50 md:text-sm">
              A{" "}
            </Text>
            <Typewriter
              words={person.roles}
              className="font-kanitMedium text-xs uppercase tracking-[0.2em] text-ice md:text-sm"
              cursorClassName="text-ice/60"
            />
          </View>
        </FadeIn>
      </View>

      {/* Avatar with rotating gradient ring */}
      <View className="items-center">
        <FadeIn delay={550} y={20}>
          <MagnetOrPress padding={120} strength={3}>
            <View
              style={{ width: avatarWidth, aspectRatio: 4 / 5 }}
              className="items-center justify-center rounded-[32px] border border-ice/20 bg-white/5 overflow-hidden"
            >
              {/* Rotating gradient ring behind */}
              <Animated.View
                pointerEvents="none"
                style={[
                  {
                    position: "absolute",
                    width: avatarWidth * 1.6,
                    height: avatarWidth * 1.6,
                    opacity: 0.35,
                  },
                  ringStyle,
                ]}
              >
                <LinearGradient
                  colors={["#B600A8", "#7621B0", "#BE4C00", "#B600A8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flex: 1,
                    borderRadius: 9999,
                  }}
                />
              </Animated.View>

              {/* Inner dark cover so the ring only shows at the edges */}
              <View
                style={{
                  position: "absolute",
                  width: avatarWidth - 8,
                  aspectRatio: 4 / 5,
                  borderRadius: 28,
                  backgroundColor: "#0C0C0C",
                }}
                className="items-center justify-center"
              >
                <User size={48} color="rgba(215,226,234,0.4)" strokeWidth={1.2} />
                <Text className="mt-3 font-kanit text-xs uppercase tracking-widest text-ice/40">
                  your photo here
                </Text>
              </View>
            </View>
          </MagnetOrPress>
        </FadeIn>
      </View>

      {/* Bottom bar */}
      <View className="gap-5 px-6 pb-10">
        <View className="flex-row items-end justify-between">
          <FadeIn delay={320} y={16} style={{ maxWidth: 200 }}>
            <Text className="font-kanitLight text-xs uppercase leading-snug tracking-wide text-ice">
              {person.tagline}
            </Text>
          </FadeIn>
          <FadeIn delay={480} y={16}>
            <View className="gap-3 items-end">
              <ResumeButton />
              <ContactButton />
            </View>
          </FadeIn>
        </View>

        {/* Scroll indicator */}
        <FadeIn delay={700} y={10}>
          <View className="items-center">
            <ChevronDown size={18} color="rgba(215,226,234,0.4)" strokeWidth={2} />
          </View>
        </FadeIn>
      </View>
    </View>
  );
}