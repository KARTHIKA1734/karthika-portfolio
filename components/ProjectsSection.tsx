import { useState } from "react";
import { View, Text, useWindowDimensions, Platform } from "react-native";
import { FadeIn } from "@/components/FadeIn";
import { ExpandableCard } from "@/components/ExpandableCard";
import { DetailModal } from "@/components/DetailModal";
import { projects, type Project } from "@/content/profile";

export function ProjectsSection() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <View className="relative rounded-t-[40px] bg-base px-6 md:px-10 mx-10 md:mx-12 py-20 mb-16 overflow-hidden">
      {/* Top border hairline */}
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
          Projects
        </Text>
      </FadeIn>

      <View
        className={isWide ? "flex-row flex-wrap gap-5 mt-4" : "gap-5"}
      >
        {projects.map((project, i) => (
          <View
            key={project.name}
            style={isWide ? { width: "calc(50% - 10px)" as any } : undefined}
          >
            <FadeIn delay={i * 100} y={20}>
              <ExpandableCard
                title={project.name}
                category={project.category}
                description={project.points[0]}
                stack={project.stack}
                onPress={() => setSelected(project)}
              />
            </FadeIn>
          </View>
        ))}
      </View>

      <DetailModal
        visible={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
        category={selected?.category ?? ""}
        stack={selected?.stack ?? []}
        link={selected?.link}
        linkLabel={selected?.linkLabel}
        sections={[
          {
            label: "Highlights",
            items: selected?.points ?? [],
          },
        ]}
      />
    </View>
  );
}