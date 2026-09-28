import { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { FadeIn } from "@/components/FadeIn";
import { ExpandableCard } from "@/components/ExpandableCard";
import { DetailModal } from "@/components/DetailModal";
import { experiences, type Experience } from "@/content/profile";

export function ExperienceSection() {

  const [selected, setSelected] = useState<Experience | null>(null);

  return (
    <View className="rounded-t-[40px]bg-base mx-10 md:mx-12 py-20">
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
      <FadeIn y={30}>
        <Text
          className="text-4xl md:text-6xl lg:text-7xl text-center uppercase mb-16"
          style={{
            fontFamily: "Kanit_900Black",
            color: "#D7E2EA",
            lineHeight: 1,
          }}
        >
          Experience
        </Text>
      </FadeIn>

      <View className="items-center mt-4">
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
        link={selected?.liveLink}
        linkLabel={selected?.liveLinkLabel ?? "Visit Live Site"}
        secondaryLink={selected?.certificatePath}
        secondaryLinkLabel={selected?.certificateLabel ?? "View Certificate"}
      />
    </View>
  );
}