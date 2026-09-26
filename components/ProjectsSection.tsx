import { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { Layers, Smartphone } from "lucide-react-native";
import { GradientText } from "@/components/GradientText";
import { FadeIn } from "@/components/FadeIn";
import { GitHubButton } from "@/components/GitHubButton";
import { projects, type Project } from "@/content/profile";

const icons = [Layers, Smartphone];

export function ProjectsSection({ scrollY }: { scrollY: SharedValue<number> }) {
  const { width } = useWindowDimensions();
  const headingSize = Math.min(width * 0.16, 90);

  return (
    <View className="rounded-t-[40px] bg-base px-6 py-20">
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
          Project
        </GradientText>
      </FadeIn>

      <View className="mt-14 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            scrollY={scrollY}
            Icon={icons[index % icons.length]}
          />
        ))}
      </View>
    </View>
  );
}

function ProjectCard({
  project,
  index,
  scrollY,
  Icon,
}: {
  project: Project;
  index: number;
  scrollY: SharedValue<number>;
  Icon: typeof Layers;
}) {
  const [top, setTop] = useState(0);
  const targetScale = 1 - index * 0.03;

  const style = useAnimatedStyle(() => {
    if (top === 0) return { transform: [{ scale: 1 }] };
    const scale = interpolate(
      scrollY.value,
      [top - 400, top],
      [1, targetScale],
      Extrapolation.CLAMP
    );
    return { transform: [{ scale }] };
  });

  return (
    <Animated.View
      onLayout={(e) => setTop(e.nativeEvent.layout.y)}
      style={style}
      className="rounded-[32px] border-2 border-ice/40 p-5"
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 flex-row items-baseline gap-3">
          <Text
            style={{ fontFamily: "Kanit_900Black" }}
            className="text-4xl text-ice"
          >
            {project.number}
          </Text>
          <View className="flex-1">
            <Text className="font-kanitLight text-xs uppercase tracking-widest text-ice/60">
              {project.category}
            </Text>
            <Text className="font-kanitMedium text-lg uppercase text-ice">
              {project.name}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-4 gap-3">
        {project.points.map((point) => (
          <View
            key={point}
            className="rounded-[24px] border border-ice/15 bg-white/[0.03] p-4"
          >
            <Text className="font-kanit text-sm leading-relaxed text-ice/80">
              {point}
            </Text>
          </View>
        ))}

        <View className="items-center gap-3 rounded-[24px] border border-ice/15 bg-white/[0.03] p-6">
          <Icon size={40} color="rgba(215,226,234,0.4)" strokeWidth={1.2} />
          <View className="flex-row flex-wrap justify-center gap-2">
            {project.stack.map((tech) => (
              <View
                key={tech}
                className="rounded-md border border-ice/20 px-2 py-1"
              >
                <Text className="font-kanitLight text-[10px] text-ice/60">
                  {tech}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {project.github && (
        <View className="mt-4 self-start">
          <GitHubButton href={project.github} />
        </View>
      )}
    </Animated.View>
  );
}