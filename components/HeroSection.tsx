import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  Image,
  Pressable,
} from "react-native";
import { ArrowRight, Download } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "@/components/FadeIn";
import { MagnetOrPress } from "@/components/MagnetOrPress";
import { Typewriter } from "@/components/Typewriter";
import { person } from "@/content/profile";
import { AnimatedButton } from "./AnimatedButton";

type Props = {
  onNavigate?: (sectionId: string) => void;
};

export function HeroSection({ onNavigate }: Props) {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 900;
  const isMedium = width >= 640;

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
          backgroundColor: "#7621B0",
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
          {/* Greeting line — faded white "hi, i'm karthika" */}
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

          {/* Typewriter — cycling focus line */}
          <FadeIn delay={220} y={16}>
            <View
              className={
                "mt-4 flex-row items-center gap-2 " +
                (isWide ? "" : "justify-center")
              }
            >
              <Text className="font-kanitLight text-xs uppercase tracking-wider text-ice/40 md:text-sm">
                Focused on{" "}
              </Text>
              <Typewriter
                words={[
                  "React & React Native",
                  "Clean Component Design",
                  "AI-Augmented Workflows",
                  "REST API Integration",
                ]}
                className="font-kanitMedium text-xs uppercase tracking-wider text-ice/80 md:text-sm"
                cursorClassName="text-[#B600A8]"
                typeSpeed={70}
                deleteSpeed={35}
                holdTime={1400}
              />
            </View>
          </FadeIn>

          {/* Tagline paragraph */}
          <FadeIn delay={360} y={16}>
            <Text
              className={
                "mt-6 max-w-[520px] font-kanit text-base leading-relaxed text-ice/70 md:text-lg " +
                (isWide ? "" : "text-center self-center")
              }
            >
              I turn ideas into fast, responsive React and React Native
              experiences using AI-assisted workflows to ship quality code,
              faster.
            </Text>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={480} y={16}>
            <View
              className={
                "mt-8 flex-row flex-wrap gap-3 " +
                (isWide ? "" : "justify-center")
              }
            >
              <AnimatedButton
                label="View My Work"
                onPress={() => onNavigate?.("projects")}
                variant="solid"
                icon={<ArrowRight size={14} color="#FFFFFF" strokeWidth={2.4} />}
              />
              <AnimatedButton
                label="Resume"
                onPress={() => {
                  if (Platform.OS === "web" && typeof window !== "undefined") {
                    window.open(person.resumePath, "_blank");
                  }
                }}
                variant="ghost"
                iconLeft={
                  <Download size={14} color="#D7E2EA" strokeWidth={2.2} />
                }
              />
            </View>
          </FadeIn>

          {/* Single "Get in touch" link */}
          <FadeIn delay={560} y={12}>
            <View className={"mt-8 " + (isWide ? "" : "items-center")}>
              <Pressable onPress={() => onNavigate?.("contact")}>
                <Text className="font-kanitLight text-xs uppercase tracking-widest text-ice/50 active:opacity-60">
                  → Get in touch
                </Text>
              </Pressable>
            </View>
          </FadeIn>
        </View>

        {/* RIGHT: avatar with magnet + gradient frame */}
        <FadeIn delay={280} y={20}>
          <MagnetOrPress padding={140} strength={3}>
            <LinearGradient
              colors={["#B600A8", "#7621B0", "#BE4C00", "#B600A8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 36,
                padding: 4,
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