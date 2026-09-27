import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  Image,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ArrowRight, Download } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GradientText } from "@/components/GradientText";
import { FadeIn } from "@/components/FadeIn";
import { MagnetOrPress } from "@/components/MagnetOrPress";
import { person } from "@/content/profile";

type Props = {
  onNavigate?: (sectionId: string) => void;
};

export function HeroSection({ onNavigate }: Props) {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 900;
  const isMedium = width >= 640;

  // Rotating gradient ring around avatar
  const ringRotation = useSharedValue(0);
  useEffect(() => {
    ringRotation.value = withRepeat(
      withTiming(360, { duration: 14000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);
  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotation.value}deg` }],
  }));

  const avatarSize = isWide ? 340 : isMedium ? 280 : 220;
  const roleSize = isWide ? 84 : isMedium ? 64 : 48;
  const greetingSize = isWide ? 32 : isMedium ? 26 : 22;

  return (
    <View
      style={{
        minHeight: isWide ? Math.max(height * 0.92, 700) : undefined,
        paddingTop: Platform.OS === "web" ? 120 : 100,
        paddingBottom: 60,
        backgroundColor: "#0C0C0C",
      }}
      className="overflow-hidden px-6 md:px-10"
    >
      {/* Ambient gradient blobs */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 80,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: 500,
          opacity: 0.35,
          backgroundColor: "#7621B0",
          ...(Platform.OS === "web" ? ({ filter: "blur(120px)" } as any) : {}),
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: -80,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: 400,
          opacity: 0.25,
          backgroundColor: "#B600A8",
          ...(Platform.OS === "web" ? ({ filter: "blur(120px)" } as any) : {}),
        }}
      />

      <View
        className={
          isWide
            ? "flex-row items-center gap-10 max-w-[1200px] self-center w-full"
            : "items-center gap-10"
        }
      >
        {/* LEFT: text content */}
        <View className={isWide ? "flex-1" : "w-full items-center"}>
          {/* Greeting line with gradient "hi, i'm karthika" */}
          <FadeIn delay={0} y={16}>
            <View
              className={
                "flex-row items-center gap-2 mb-4 " +
                (isWide ? "" : "justify-center")
              }
            >

              <Text
                style={{
                  fontFamily: "Kanit_900Black",
                  fontSize: greetingSize,
                  lineHeight: greetingSize * 1.05,
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  opacity: 0.45,
                }}
              >
                hi, i'm karthika
              </Text>
            </View>
          </FadeIn>

          {/* Big role heading: MERN Stack Developer */}
          <FadeIn delay={120} y={24}>
            <Text
              style={{
                fontFamily: "Kanit_900Black",
                fontSize: roleSize,
                lineHeight: roleSize * 1.02,
                color: "#D7E2EA",
              }}
              className={isWide ? "" : "text-center"}
            >
              MERN Stack{"\n"}Developer
            </Text>
          </FadeIn>

          {/* Tagline paragraph */}
          <FadeIn delay={280} y={16}>
            <Text
              className={
                "mt-6 max-w-[520px] font-kanit text-base leading-relaxed text-ice/70 md:text-lg " +
                (isWide ? "" : "text-center self-center")
              }
            >
              I build fast, responsive React and React Native applications
              with AI-augmented workflows — shipping quality code faster
              without cutting corners.
            </Text>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={400} y={16}>
            <View
              className={
                "mt-8 flex-row flex-wrap gap-3 " +
                (isWide ? "" : "justify-center")
              }
            >
              {/* Primary: View My Work */}
              <Pressable
                onPress={() => onNavigate?.("projects")}
                className="active:opacity-80"
              >
                <View
                  className="flex-row items-center gap-2 rounded-full px-6 py-3.5"
                  style={{ backgroundColor: "#B600A8" }}
                >
                  <Text className="font-kanitMedium text-xs uppercase tracking-widest text-white">
                    View My Work
                  </Text>
                  <ArrowRight size={14} color="#FFFFFF" strokeWidth={2.4} />
                </View>
              </Pressable>

              {/* Secondary: Resume */}
              <Pressable
                onPress={() => {
                  if (Platform.OS === "web" && typeof window !== "undefined") {
                    window.open(person.resumePath, "_blank");
                  }
                }}
                className="active:opacity-80"
              >
                <View className="flex-row items-center gap-2 rounded-full border border-ice/30 px-6 py-3.5">
                  <Download size={14} color="#D7E2EA" strokeWidth={2.2} />
                  <Text className="font-kanitMedium text-xs uppercase tracking-widest text-ice">
                    Resume
                  </Text>
                </View>
              </Pressable>
            </View>
          </FadeIn>

          {/* Single "Get in touch" link */}
          <FadeIn delay={500} y={12}>
            <View className={"mt-8 " + (isWide ? "" : "items-center")}>
              <Pressable onPress={() => onNavigate?.("contact")}>
                <Text className="font-kanitLight text-xs uppercase tracking-widest text-ice/50 active:opacity-60">
                  → Get in touch
                </Text>
              </Pressable>
            </View>
          </FadeIn>
        </View>

        {/* RIGHT: avatar with magnet + rotating ring */}
        <FadeIn delay={280} y={20}>
          <MagnetOrPress padding={140} strength={3}>
            <LinearGradient
              colors={["#B600A8", "#7621B0", "#BE4C00", "#B600A8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 36,
                padding: 4, // acts as the border thickness
              }}
            >
              <View
                style={{
                  width: avatarSize,
                  aspectRatio: 4 / 5,
                  borderRadius: 32,
                  backgroundColor: "#0C0C0C",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: person.avatarPath }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            </LinearGradient>
          </MagnetOrPress>
        </FadeIn>
      </View>
    </View>
  );
}