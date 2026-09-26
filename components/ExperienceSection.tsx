import { View, Text, useWindowDimensions } from "react-native";
import { Briefcase, MapPin, Calendar } from "lucide-react-native";
import { FadeIn } from "@/components/FadeIn";
import { GradientText } from "@/components/GradientText";
import { experiences } from "@/content/profile";

export function ExperienceSection() {
  const { width } = useWindowDimensions();
  const headingSize = Math.min(width * 0.16, 90);

  return (
    <View className="px-6 py-20">
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
          Experience
        </GradientText>
      </FadeIn>

      <View className="mt-14 gap-6">
        {experiences.map((exp, i) => (
          <FadeIn key={exp.company} delay={i * 120} y={20}>
            <View
              className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.4,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 8 },
              }}
            >
              {/* Header */}
              <View className="gap-3">
                <View className="flex-row items-center gap-3 flex-wrap">
                  <View className="flex-row items-center gap-2 rounded-full border border-ice/20 px-3 py-1">
                    <Briefcase size={12} color="#D7E2EA" strokeWidth={2} />
                    <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/80">
                      {exp.duration}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2 rounded-full border border-ice/20 px-3 py-1">
                    <MapPin size={12} color="#D7E2EA" strokeWidth={2} />
                    <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/80">
                      {exp.location}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2 rounded-full border border-ice/20 px-3 py-1">
                    <Calendar size={12} color="#D7E2EA" strokeWidth={2} />
                    <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/80">
                      {exp.period}
                    </Text>
                  </View>
                </View>

                <Text className="font-kanitMedium text-xl uppercase text-ice">
                  {exp.role}
                </Text>
                <Text className="font-kanit text-sm text-ice/70">
                  {exp.company}
                </Text>
                <Text className="font-kanitLight text-xs uppercase tracking-widest text-ice/50">
                  {exp.project}
                </Text>
              </View>

              {/* Bullets */}
              <View className="mt-5 gap-3">
                {exp.bullets.map((b) => (
                  <View key={b} className="flex-row gap-3">
                    <Text className="font-kanit text-sm leading-relaxed text-ice/40">•</Text>
                    <Text className="flex-1 font-kanit text-sm leading-relaxed text-ice/80">
                      {b}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Stack pills */}
              <View className="mt-5 flex-row flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <View
                    key={tech}
                    className="rounded-md border border-ice/20 px-2.5 py-1"
                  >
                    <Text className="font-kanitLight text-[10px] text-ice/70">
                      {tech}
                    </Text>
                  </View>
                ))}
              </View>

              {/* AI Tools strip */}
              {exp.aiTools && exp.aiTools.length > 0 && (
                <View className="mt-5 rounded-2xl border border-ice/10 bg-white/[0.02] p-4">
                  <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/50 mb-3">
                    AI-Assisted Development
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {exp.aiTools.map((tool) => (
                      <View
                        key={tool}
                        className="rounded-full border border-ice/20 bg-white/[0.02] px-3 py-1"
                      >
                        <Text className="font-kanitLight text-[10px] text-ice/80">
                          {tool}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </FadeIn>
        ))}
      </View>
    </View>
  );
}