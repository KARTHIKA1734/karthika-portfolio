import { View, Text, useWindowDimensions } from "react-native";
import { GraduationCap, MapPin } from "lucide-react-native";
import { FadeIn } from "@/components/FadeIn";
import { GradientText } from "@/components/GradientText";
import { CGPARing } from "@/components/CGPARing";
import { educations } from "@/content/profile";

export function EducationSection() {
  const { width } = useWindowDimensions();
  const headingSize = Math.min(width * 0.16, 90);

  return (
   <View className="px-6 md:px-10 py-20 mx-10 md:mx-12">
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
          Education
        </GradientText>
      </FadeIn>

      <View className="mt-14 gap-6">
        {educations.map((edu, i) => (
          <FadeIn key={edu.short} delay={i * 140} y={20}>
            <View
              className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.4,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 8 },
              }}
            >
              <View className="flex-row items-center gap-5">
                <CGPARing
                  progress={edu.cgpa / edu.cgpaMax}
                  size={92}
                  strokeWidth={6}
                  color={i === 0 ? "#B600A8" : "#BE4C00"}
                />

                <View className="flex-1 gap-2">
                  <View className="flex-row items-center gap-2 rounded-full border border-ice/20 px-3 py-1 self-start">
                    <GraduationCap size={12} color="#D7E2EA" strokeWidth={2} />
                    <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/80">
                      {edu.short}
                    </Text>
                  </View>

                  <Text className="font-kanitMedium text-base uppercase text-ice leading-snug">
                    {edu.degree}
                  </Text>

                  <View className="flex-row items-start gap-2">
                    <MapPin size={12} color="rgba(215,226,234,0.6)" strokeWidth={2} style={{ marginTop: 3 }} />
                    <Text className="flex-1 font-kanitLight text-xs text-ice/60 leading-snug">
                      {edu.institution}
                      {"\n"}
                      {edu.location}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-5 flex-row items-center justify-between rounded-2xl border border-ice/10 bg-white/[0.02] px-4 py-3">
                <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/60">
                  CGPA
                </Text>
                <Text
                  className="font-kanitBlack text-xl text-ice"
                  style={{ fontFamily: "Kanit_900Black" }}
                >
                  {edu.cgpa} / {edu.cgpaMax}
                </Text>
              </View>
            </View>
          </FadeIn>
        ))}
      </View>
    </View>
  );
}