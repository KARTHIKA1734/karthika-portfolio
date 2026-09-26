import { useRef, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  Linking,
  Platform,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
  scrollTo,
  runOnUI,
} from "react-native-reanimated";
import { Mail, Phone, Github, Linkedin } from "lucide-react-native";

import { HeroSection } from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { StatsStrip } from "@/components/StatsStrip";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EducationSection } from "@/components/EducationSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorGlow } from "@/components/CursorGlow";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { person, marqueeItems } from "@/content/profile";

// Order of section ids — must match the order they render below
const SECTION_IDS = [
  "hero",
  "marquee",
  "stats",
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

export default function Home() {
  const scrollY = useSharedValue(0);
  const scrollProgress = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const { height: windowHeight } = useWindowDimensions();

  // Track each section's y-offset on the page
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

  // Called by each section via onLayout to record its top position
  const registerSection = useCallback(
    (id: SectionId) => (e: any) => {
      sectionOffsets.current[id] = e.nativeEvent.layout.y;
    },
    []
  );

  // Called by Navbar's onNavigate — smooth-scroll to that section
  const handleNavigate = useCallback((id: string) => {
    const target = sectionOffsets.current[id];
    if (target == null) return;
    runOnUI(() => {
      "worklet";
      scrollTo(scrollRef, 0, target, true);
    })();
  }, []);

  // Called by each section's onLayout wrapper as scroll passes — updates active link
  const handleSectionActive = useCallback(
    (id: SectionId, y: number) => {
      if (y < windowHeight * 0.4) {
        setActiveSection((prev) => (prev === id ? prev : id));
      }
    },
    [windowHeight]
  );

  // Stable wrapper — a View that reports its layout y and updates active section
  const Section = useMemo(() => {
    return function SectionWrapper({
      id,
      children,
    }: {
      id: SectionId;
      children: React.ReactNode;
    }) {
      return (
        <View
          onLayout={(e) => {
            const y = e.nativeEvent.layout.y;
            sectionOffsets.current[id] = y;
          }}
        >
          {children}
        </View>
      );
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0C0C0C" }}>
      <ScrollProgress progress={scrollProgress} />
      <CursorGlow />
      <NoiseOverlay />

      <Animated.ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1, backgroundColor: "#0C0C0C" }}
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Section id="hero">
          <HeroSection onNavigate={handleNavigate} activeSection={activeSection} />
        </Section>

        <Section id="marquee">
          <View className="py-12 gap-3">
            <Marquee items={marqueeItems} speed={70} direction="left" />
            <Marquee items={[...marqueeItems].reverse()} speed={55} direction="right" />
          </View>
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

        <Section id="projects">
          <ProjectsSection scrollY={scrollY} />
        </Section>

        <Section id="education">
          <EducationSection />
        </Section>

        <Section id="contact">
          <View className="rounded-t-[40px] bg-base px-6 py-20">
            {/* Gradient top hairline */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 40,
                right: 40,
                height: 1,
                backgroundColor: "rgba(215,226,234,0.15)",
              }}
            />

            <FadeIn y={20}>
              <Text
                style={{ fontFamily: "Kanit_900Black" }}
                className="text-center text-4xl uppercase text-ice"
              >
                Let's talk
              </Text>
            </FadeIn>

            <FadeIn delay={120} y={16}>
              <Text className="mt-4 text-center font-kanit text-sm text-ice/60 max-w-[420px] self-center">
                Open to front-end and full-stack roles. Drop a message below or reach out directly.
              </Text>
            </FadeIn>

            {/* Contact form */}
            <View className="mt-10 items-center">
              <FadeIn delay={220} y={16}>
                <ContactForm />
              </FadeIn>
            </View>

            {/* Direct contact row */}
            <FadeIn delay={340} y={16}>
              <View className="mt-12 items-center gap-4">
                <View className="flex-row flex-wrap justify-center gap-6">
                  <PressableLink
                    icon={<Mail size={14} color="#D7E2EA" strokeWidth={2} />}
                    label={person.email}
                    onPress={() => Linking.openURL(`mailto:${person.email}`)}
                  />
                  <PressableLink
                    icon={<Phone size={14} color="#D7E2EA" strokeWidth={2} />}
                    label={person.phone}
                    onPress={() => Linking.openURL(`tel:${person.phone.replace(/\s/g, "")}`)}
                  />
                </View>

                <View className="mt-2 flex-row gap-6">
                  <PressableLink
                    icon={<Github size={16} color="#D7E2EA" strokeWidth={2} />}
                    label="GitHub"
                    onPress={() => Linking.openURL(person.github)}
                  />
                  <PressableLink
                    icon={<Linkedin size={16} color="#D7E2EA" strokeWidth={2} />}
                    label="LinkedIn"
                    onPress={() => Linking.openURL(person.linkedin)}
                  />
                </View>
              </View>
            </FadeIn>

            <Text className="mt-16 text-center font-kanitLight text-[10px] uppercase tracking-widest text-ice/30">
              © {new Date().getFullYear()} {person.name} · Built with React Native + Expo
            </Text>
          </View>
        </Section>
      </Animated.ScrollView>
    </View>
  );
}

// Tiny reusable clickable icon + label
import { Pressable } from "react-native";
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
    <Pressable onPress={onPress} className="flex-row items-center gap-2 active:opacity-60">
      {icon}
      <Text className="font-kanit text-xs text-ice/80 md:text-sm">{label}</Text>
    </Pressable>
  );
}