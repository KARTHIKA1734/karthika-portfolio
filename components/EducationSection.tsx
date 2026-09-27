import { View, Text, useWindowDimensions, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GraduationCap, MapPin } from "lucide-react-native";
import { FadeIn } from "@/components/FadeIn";
import { CGPARing } from "@/components/CGPARing";
import { educations, type Education } from "@/content/profile";

export function EducationSection() {
  const { width } = useWindowDimensions();
  const headingSize = Math.min(width * 0.16, 90);
  const isWide = width >= 900;

  return (
    <View className="bg-base mx-10 md:mx-12 py-20 px-6 md:px-10 overflow-hidden">
      <FadeIn y={30}>
          <Text
          className="text-4xl md:text-6xl lg:text-7xl text-center uppercase mb-16"
          style={{
            fontFamily: "Kanit_900Black",
            color: "#D7E2EA",
            lineHeight: 1,
          }}
        >
          Education
        </Text>
      </FadeIn>

      <View className={isWide ? "flex-row gap-5" : "gap-5"}>
        {educations.map((edu, i) => (
          <View key={edu.short} style={isWide ? { flex: 1 } : undefined}>
            <FadeIn delay={i * 120} y={20}>
              <EducationCard
                edu={edu}
                accent={i === 0 ? "#B600A8" : "#BE4C00"}
              />
            </FadeIn>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Education Card — hover/tap animations only, no click                */
/* ------------------------------------------------------------------ */

function EducationCard({
  edu,
  accent,
}: {
  edu: Education;
  accent: string;
}) {
  const translateY = useSharedValue(0);
  const glow = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: `rgba(215,226,234,${0.12 + glow.value * 0.28})`,
  }));

  // Web-only hover
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
    <Animated.View
      style={[cardStyle, { flex: 1 }]}
      {...(webHandlers as any)}
    >
      <Animated.View
        style={[
          borderStyle,
          {
            borderRadius: 24,
            borderWidth: 1,
            backgroundColor: "rgba(255,255,255,0.03)",
            padding: 24,
            overflow: "hidden",
          },
        ]}
      >
        {/* Hover radial glow (web-only) */}
        {Platform.OS === "web" && (
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: 200,
                backgroundColor: accent,
              },
              useAnimatedStyle(() => ({
                opacity: glow.value * 0.15,
              })),
            ]}
          />
        )}

        {/* Top row: badge */}
        <View className="flex-row items-center gap-2 rounded-full border border-ice/20 px-3 py-1 self-start">
          <GraduationCap size={12} color="#D7E2EA" strokeWidth={2} />
          <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/80">
            {edu.short}
          </Text>
        </View>

        {/* CGPA + ring */}
        <View className="mt-5 flex-row items-center gap-5">
          <CGPARing
            progress={edu.cgpa / edu.cgpaMax}
            size={84}
            strokeWidth={6}
            color={accent}
          />

          <View className="flex-1 gap-1">
            <Text
              style={{ fontFamily: "Kanit_900Black" }}
              className="text-3xl text-ice"
            >
              {edu.cgpa}
            </Text>
            <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/50">
              CGPA / {edu.cgpaMax}
            </Text>
          </View>
        </View>

        {/* Degree + institution */}
        <View className="mt-5 gap-2">
          <Text
            style={{ fontFamily: "Kanit_500Medium" }}
            className="text-base uppercase text-ice leading-snug"
          >
            {edu.degree}
          </Text>
          <View className="flex-row items-start gap-2">
            <MapPin
              size={12}
              color="rgba(215,226,234,0.6)"
              strokeWidth={2}
              style={{ marginTop: 3 }}
            />
            <Text className="flex-1 font-kanitLight text-xs text-ice/60 leading-snug">
              {edu.institution}
              {"\n"}
              {edu.location}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}