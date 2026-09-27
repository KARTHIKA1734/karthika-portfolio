import { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { GradientText } from "@/components/GradientText";
import { FadeIn } from "@/components/FadeIn";
import { ExpandableCard } from "@/components/ExpandableCard";
import { DetailModal } from "@/components/DetailModal";
import { projects, type Project } from "@/content/profile";

export function ProjectsSection() {
  const { width } = useWindowDimensions();
  const headingSize = Math.min(width * 0.16, 90);
  const isWide = width >= 900;

  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <View className="rounded-t-[40px] bg-base px-6 md:px-10 mx-10 md:mx-12 py-20">
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
           Projects
        </Text>
      </FadeIn>

      <View
        className={
          isWide
            ? "flex-row flex-wrap gap-5"
            : "gap-5"
        }
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
        // link={selected?.github}
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