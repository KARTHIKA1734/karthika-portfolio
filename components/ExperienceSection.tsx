import { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { FadeIn } from "@/components/FadeIn";
import { ExpandableCard } from "@/components/ExpandableCard";
import { DetailModal } from "@/components/DetailModal";
import { experiences, type Experience } from "@/content/profile";

export function ExperienceSection() {
  const { width } = useWindowDimensions();
  const headingSize = Math.min(width * 0.16, 90);
  const isWide = width >= 900;

  const [selected, setSelected] = useState<Experience | null>(null);

  return (
    <View className="rounded-t-[40px] bg-base mx-10 md:mx-12 py-20">
      <FadeIn y={30}>
        <Text
          style={{
            fontFamily: "Kanit_900Black",
            fontSize: headingSize,
            lineHeight: headingSize,
            color: "#D7E2EA",
            textTransform: "uppercase",
          }}
          className="mb-14 text-center"
        >
          Experience
        </Text>
      </FadeIn>

      <View className="items-center">
        <View style={{ width: "100%", maxWidth: 640 }}>
          {experiences.map((exp, i) => (
            <FadeIn key={exp.company} delay={i * 100} y={20}>
              <ExpandableCard
                title={exp.role}
                category={`${exp.company} · ${exp.duration}`}
                description={exp.bullets[0]}
                stack={exp.stack}
                onPress={() => setSelected(exp)}
              />
            </FadeIn>
          ))}
        </View>
      </View>

      <DetailModal
        visible={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.role ?? ""}
        category={
          selected
            ? `${selected.company} · ${selected.location} · ${selected.period}`
            : ""
        }
        stack={selected?.stack ?? []}
        sections={[
          {
            label: "What I did",
            items: selected?.bullets ?? [],
          },
          ...(selected?.aiTools?.length
            ? [
              {
                label: "AI Tools Used",
                items: selected.aiTools,
              },
            ]
            : []),
        ]}
      />
    </View>
  );
}