import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  Image,
} from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ArrowRight, Download, User } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "@/components/FadeIn";
import { Typewriter } from "@/components/Typewriter";
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

  const avatarSize = isWide ? 400 : isMedium ? 320 : 260;

  return (
    <View
      style={{
       minHeight: isWide ? Math.max(height * 0.92, 700) : undefined,
        paddingTop: Platform.OS === "web" ? 100 : 80,
        paddingBottom: 60,
        backgroundColor: "#0C0C0C",
      }}
      className="overflow-hidden px-6 md:px-10"
    >
      {/* Ambient gradient blobs behind hero */}
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
          ...(Platform.OS === "web"
            ? ({ filter: "blur(120px)" } as any)
            : {}),
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
          ...(Platform.OS === "web"
            ? ({ filter: "blur(120px)" } as any)
            : {}),
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
          {/* Greeting line */}
          <FadeIn delay={0} y={16}>
            <View className="flex-row items-center gap-2 mb-4">
              <Text className="text-base">👋</Text>
              <Text className="font-kanitLight text-xs uppercase tracking-[0.2em] text-ice/60 md:text-sm">
                Hi, I'm{" "}
                <Text className="font-kanitMedium text-ice">
                  {person.name}
                </Text>
              </Text>
            </View>
          </FadeIn>

          {/* Massive headline with typewriter role */}
          <FadeIn delay={120} y={24}>
            <Text
              style={{
                fontFamily: "Kanit_900Black",
                fontSize: isWide ? 72 : isMedium ? 56 : 40,
                lineHeight: isWide ? 76 : isMedium ? 60 : 44,
                color: "#D7E2EA",
              }}
              className={isWide ? "" : "text-center"}
            >
              MERN Stack{"\n"}
              <Text style={{ color: "#D7E2EA" }}>Developer</Text>
            </Text>
          </FadeIn>

          {/* Typewriter subline */}
          <FadeIn delay={220} y={16}>
            <View
              className={
                "mt-3 flex-row items-center " +
                (isWide ? "" : "justify-center")
              }
            >
              <Text className="font-kanitLight text-xs uppercase tracking-[0.2em] text-ice/40 md:text-sm">
                Also a{" "}
              </Text>
              <Typewriter
                words={["Front-End Developer", "MCA Graduate", "Problem Solver"]}
                className="font-kanitMedium text-xs uppercase tracking-[0.2em] text-ice/80 md:text-sm"
                cursorClassName="text-ice/50"
              />
            </View>
          </FadeIn>

          {/* Tagline paragraph */}
          <FadeIn delay={320} y={16}>
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
          <FadeIn delay={420} y={16}>
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

          {/* Quick contact row */}
          <FadeIn delay={520} y={12}>
            <View
              className={
                "mt-8 flex-row flex-wrap gap-4 " +
                (isWide ? "" : "justify-center")
              }
            >
              <Text
                onPress={() => onNavigate?.("contact")}
                className="font-kanitLight text-xs uppercase tracking-widest text-ice/50"
              >
                → Get in touch
              </Text>
              <Text
                onPress={() => onNavigate?.("projects")}
                className="font-kanitLight text-xs uppercase tracking-widest text-ice/50"
              >
                → See recent work
              </Text>
            </View>
          </FadeIn>
        </View>

        {/* RIGHT: avatar with rotating ring */}
        <FadeIn delay={280} y={20}>
          <View
            style={{
              width: avatarSize,
              height: avatarSize,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Rotating gradient ring */}
            <Animated.View
              pointerEvents="none"
              style={[
                {
                  position: "absolute",
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: avatarSize / 2,
                  opacity: 0.9,
                },
                ringStyle,
              ]}
            >
              <LinearGradient
                colors={["#B600A8", "#7621B0", "#BE4C00", "#B600A8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, borderRadius: avatarSize / 2 }}
              />
            </Animated.View>

            {/* Inner dark cover (photo sits here) */}
            <View
              style={{
                width: avatarSize - 8,
                height: avatarSize - 8,
                borderRadius: (avatarSize - 8) / 2,
                backgroundColor: "#0C0C0C",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Replace this block with your photo once you have it: */}
              <Image
                source={{ uri: person.avatarPath }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
              {/* Fallback if image missing — Expo web just shows blank, 
                  so keep the placeholder comment. Once avatar.jpg is added
                  to /public, the image will appear. */}
            </View>
          </View>
        </FadeIn>
      </View>

      {/* Tech stack pill row */}
      <FadeIn delay={680} y={20}>
        <View className="mt-16 max-w-[1200px] self-center w-full">
          <View className="items-center mb-5">
            <Text className="font-kanitLight text-[10px] uppercase tracking-[0.3em] text-ice/40">
              Tech Stack
            </Text>
          </View>
          <View className="flex-row flex-wrap justify-center gap-3">
            {[
              "React",
              "React Native",
              "TypeScript",
              "Node.js",
              "Express",
              "MongoDB",
              "Tailwind",
              "Git",
            ].map((tech) => (
              <View
                key={tech}
                className="rounded-full border border-ice/15 bg-white/[0.03] px-5 py-2.5"
              >
                <Text className="font-kanitLight text-xs text-ice/70">
                  {tech}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </FadeIn>
    </View>
  );
}

// Local import for Pressable — placing at bottom to avoid clutter
import { Pressable } from "react-native";