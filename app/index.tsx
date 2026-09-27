import { useRef, useState, useCallback } from "react";
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
// import { CursorGlow } from "@/components/CursorGlow";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { Navbar } from "@/components/Navbar";
import { person } from "@/content/profile";
import { ScrollContext } from "@/context/ScrollContext";

type SectionId =
  | "hero"
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

  // Called by Navbar's onNavigate — smooth-scroll to that section
  const handleNavigate = useCallback((id: string) => {
    const target = sectionOffsets.current[id];
    if (target == null) return;
    runOnUI(() => {
      "worklet";
      scrollTo(scrollRef, 0, target, true);
    })();
  }, []);

  // Wrapper that reports each section's y-position
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
        {/* <CursorGlow /> */}
        <NoiseOverlay />

        {/* Sticky navbar — outside the ScrollView so it stays fixed */}
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

          <Section id="projects">
            <ProjectsSection />
          </Section>

          <Section id="education">
            <EducationSection />
          </Section>

          <Section id="contact">
            <View className="rounded-t-[40px] bg-base mx-10 md:mx-12 py-20">
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

              <FadeIn y={20}>
                <Text
                  style={{ fontFamily: "Kanit_900Black" }}
                  className="text-center text-4xl uppercase text-ice"
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

              {/* Contact form */}
              <View className="mt-10 items-center">
                <FadeIn delay={220} y={16}>
                  <ContactForm />
                </FadeIn>
              </View>

              {/* Direct contact row */}
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

                  {/* GitHub + LinkedIn — icon-only circles */}
                  <View className="flex-row gap-4">
                    <IconButton
                      icon={<Github size={20} color="#D7E2EA" strokeWidth={2} />}
                      onPress={() => Linking.openURL(person.github)}
                      accessibilityLabel="GitHub"
                    />
                    <IconButton
                      icon={
                        <Linkedin size={20} color="#D7E2EA" strokeWidth={2} />
                      }
                      onPress={() => Linking.openURL(person.linkedin)}
                      accessibilityLabel="LinkedIn"
                    />
                  </View>
                </View>
              </FadeIn>

              <Text className="mt-16 text-center font-kanitLight text-[10px] uppercase tracking-widest text-ice/30">
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

function IconButton({
  icon,
  onPress,
  accessibilityLabel,
}: {
  icon: React.ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      aria-label={accessibilityLabel}
      className="active:opacity-60"
    >
      <View className="h-11 w-11 items-center justify-center rounded-full border border-ice/20 bg-white/[0.03]">
        {icon}
      </View>
    </Pressable>
  );
}