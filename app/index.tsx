import { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Linking,
  Platform,
  Pressable,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
  scrollTo,
  runOnUI,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { Mail, Phone, Github, Linkedin } from "lucide-react-native";

import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/StatsStrip";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EducationSection } from "@/components/EducationSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { Navbar } from "@/components/Navbar";
import { marqueeItems, person } from "@/content/profile";
import { ScrollContext } from "@/context/ScrollContext";
import { Marquee } from "@/components/Marquee";

type SectionId =
  | "hero"
  | "marquee"
  | "stats"
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "contact";

export default function Home() {
  const scrollY = useSharedValue(0);
  const scrollProgress = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const sectionOffsets = useRef<Record<string, number>>({});
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      const total = event.contentSize.height - event.layoutMeasurement.height;
      scrollY.value = y;
      scrollProgress.value = total > 0 ? Math.min(y / total, 1) : 0;
    },
  });

  const handleNavigate = useCallback((id: string) => {
    const target = sectionOffsets.current[id];
    if (target == null) return;
    runOnUI(() => {
      "worklet";
      scrollTo(scrollRef, 0, target, true);
    })();
  }, []);

  const Section = useCallback(
    ({ id, children }: { id: SectionId; children: React.ReactNode }) => {
      return (
        <View
          onLayout={(e) => {
            sectionOffsets.current[id] = e.nativeEvent.layout.y;
          }}
        >
          {children}
        </View>
      );
    },
    []
  );

  return (
    <ScrollContext.Provider value={scrollY}>
      <View style={{ flex: 1, backgroundColor: "#0C0C0C" }}>
        <ScrollProgress progress={scrollProgress} />
        <NoiseOverlay />

        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

        <Animated.ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={{ flex: 1, backgroundColor: "#0C0C0C" }}
          contentContainerStyle={{
            paddingTop: Platform.OS === "web" ? 0 : 80,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Section id="hero">
            <HeroSection onNavigate={handleNavigate} />
          </Section>

          <Section id="stats">
            <StatsStrip />
          </Section>

          <Section id="about">
            <AboutSection />
          </Section>

          <Section id="experience">
            <ExperienceSection />
          </Section>

          <Section id="skills">
            <SkillsSection />
          </Section>

          {/* Marquee — "how I work" strip (between Skills and Projects) */}
          <View className="relative py-12 gap-3 overflow-hidden">
            {/* Left fade */}
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: 100,
                zIndex: 10,
                ...(Platform.OS === "web"
                  ? ({
                    backgroundImage:
                      "linear-gradient(to right, #0C0C0C 0%, rgba(12,12,12,0) 100%)",
                  } as any)
                  : {}),
              }}
            />
            {/* Right fade */}
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                width: 100,
                zIndex: 10,
                ...(Platform.OS === "web"
                  ? ({
                    backgroundImage:
                      "linear-gradient(to left, #0C0C0C 0%, rgba(12,12,12,0) 100%)",
                  } as any)
                  : {}),
              }}
            />

            <Marquee items={marqueeItems} speed={70} direction="left" />
            <Marquee items={[...marqueeItems].reverse()} speed={55} direction="right" />
          </View>

          <Section id="projects">
            <ProjectsSection />
          </Section>

          <Section id="education">
            <EducationSection />
          </Section>

          <Section id="contact">
            <View className="rounded-t-[40px] bg-base mx-10 md:mx-12 py-20 ">
              {/* Gradient top hairline */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  backgroundColor: "rgba(215,226,234,0.15)",
                }}
              />

              {/* Ambient gradient blobs */}
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 40,
                  right: -140,
                  width: 500,
                  height: 500,
                  borderRadius: 500,
                  opacity: 0.30,
                  backgroundColor: "#7621B0",
                  ...(Platform.OS === "web"
                    ? ({ filter: "blur(140px)" } as any)
                    : {}),
                }}
              />
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  bottom: -100,
                  left: -140,
                  width: 460,
                  height: 460,
                  borderRadius: 460,
                  opacity: 0.25,
                  backgroundColor: "#7621B0",
                  ...(Platform.OS === "web"
                    ? ({ filter: "blur(140px)" } as any)
                    : {}),
                }}
              />

              <FadeIn y={20}>
                <Text
                  style={{ fontFamily: "Kanit_900Black" }}
                  className="text-center text-4xl md:text-6xl lg:text-7xl uppercase text-ice"
                >
                  Let's talk
                </Text>
              </FadeIn>

              <FadeIn delay={120} y={16}>
                <Text className="mt-4 text-center font-kanit text-sm text-ice/60 max-w-[520px] self-center px-4">
                  Open to front-end and full-stack roles. Drop a message below
                  or reach out directly.
                </Text>
              </FadeIn>

              <View className="mt-10 items-center">
                <FadeIn delay={220} y={16}>
                  <ContactForm />
                </FadeIn>
              </View>

              <FadeIn delay={340} y={16}>
                <View className="mt-12 items-center gap-6">
                  {/* Email + Phone as text links */}
                  <View className="flex-row flex-wrap justify-center gap-6">
                    <PressableLink
                      icon={<Mail size={14} color="#D7E2EA" strokeWidth={2} />}
                      label={person.email}
                      onPress={() => Linking.openURL(`mailto:${person.email}`)}
                    />
                    <PressableLink
                      icon={<Phone size={14} color="#D7E2EA" strokeWidth={2} />}
                      label={person.phone}
                      onPress={() =>
                        Linking.openURL(`tel:${person.phone.replace(/\s/g, "")}`)
                      }
                    />
                  </View>

                  {/* GitHub + LinkedIn — icon-only circles with jump animation */}
                  <View className="flex-row gap-4">
                    <JumpingIconButton
                      icon={<Github size={20} color="#D7E2EA" strokeWidth={2} />}
                      onPress={() => Linking.openURL(person.github)}
                      accessibilityLabel="GitHub"
                      delay={0}
                    />
                    <JumpingIconButton
                      icon={
                        <Linkedin size={20} color="#D7E2EA" strokeWidth={2} />
                      }
                      onPress={() => Linking.openURL(person.linkedin)}
                      accessibilityLabel="LinkedIn"
                      delay={120}
                    />
                  </View>
                </View>
              </FadeIn>

              <Text className="mt-6 text-center font-kanitLight text-[10px] uppercase tracking-widest text-ice/30">
                © {new Date().getFullYear()} {person.name} · Built with React
                Native + Expo
              </Text>
            </View>
          </Section>
        </Animated.ScrollView>
      </View>
    </ScrollContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Helper components                                                   */
/* ------------------------------------------------------------------ */

function PressableLink({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-2 active:opacity-60"
    >
      {icon}
      <Text className="font-kanit text-xs text-ice/80 md:text-sm">{label}</Text>
    </Pressable>
  );
}

function JumpingIconButton({
  icon,
  onPress,
  accessibilityLabel,
  delay = 0,
}: {
  icon: React.ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  delay?: number;
}) {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const [hovered, setHovered] = useState(false);

  // Idle bounce while hovered (web only)
  useEffect(() => {
    if (hovered) {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: 260, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 260, easing: Easing.in(Easing.quad) })
        ),
        -1,
        false
      );
    } else {
      cancelAnimation(translateY);
      translateY.value = withSpring(0, { damping: 14, stiffness: 200 });
    }
  }, [hovered]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const webHandlers =
    Platform.OS === "web"
      ? {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }
      : {};

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        translateY.value = withSequence(
          withTiming(-10, { duration: 120 }),
          withSpring(0, { damping: 8, stiffness: 220 })
        );
        scale.value = withSpring(0.92, { damping: 20 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 20 });
      }}
      aria-label={accessibilityLabel}
      className="active:opacity-80"
      {...(webHandlers as any)}
    >
      <Animated.View style={style}>
        <View className="h-11 w-11 items-center justify-center rounded-full border border-ice/20 bg-white/[0.03]">
          {icon}
        </View>
      </Animated.View>
    </Pressable>
  );
}