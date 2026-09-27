import { View, Text, useWindowDimensions, Platform } from "react-native";
import { FadeIn } from "@/components/FadeIn";
import { skillGroups } from "@/content/profile";

export function SkillsSection() {
  const { width } = useWindowDimensions();
  const headingSize = Math.min(width * 0.16, 90);
  const numberSize = Math.min(width * 0.14, 72);

  return (
    <View className="rounded-t-[40px] bg-base px-6 md:px-10 py-20 mx-10 md:mx-12">
      {/* Gradient top hairline */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 40,
          right: 40,
          height: 1,
        }}
      >
        <View className="flex-1 bg-ice/20" />
      </View>
       {/* Ambient gradient blobs */}
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: -80,
                right: -100,
                width: 500,
                height: 500,
                borderRadius: 500,
                opacity: 0.25,
                backgroundColor: "#7621B0",
                ...(Platform.OS === "web" ? ({ filter: "blur(120px)" } as any) : {}),
              }}
            />
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                bottom: -80,
                left: -100,
                width: 500,
                height: 500,
                borderRadius: 400,
                opacity: 0.25,
                backgroundColor: "#7621B0",
                ...(Platform.OS === "web" ? ({ filter: "blur(120px)" } as any) : {}),
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
          Skills
        </Text>
      </FadeIn>

      {skillGroups.map((group, i) => (
        <FadeIn key={group.label} delay={i * 90} y={16}>
          <View
            className="flex-row gap-4  "
            style={{ borderColor: "rgba(215,226,234,0.10)" }}
          >
            <Text
              style={{
                fontFamily: "Kanit_900Black",
                fontSize: numberSize,
                color: "#D7E2EA",
                opacity: 0.9,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </Text>
            <View className="flex-1 justify-center gap-3">
              <Text className="font-kanitMedium text-lg uppercase text-ice">
                {group.label}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <View
                    key={skill}
                    className="rounded-full border px-3 py-1"
                    style={{
                      borderColor: "rgba(215,226,234,0.20)",
                      backgroundColor: "rgba(215,226,234,0.02)",
                      ...(Platform.OS === "web"
                        ? ({
                            transitionProperty: "transform, border-color",
                            transitionDuration: "180ms",
                            cursor: "default",
                          } as any)
                        : {}),
                    }}
                  >
                    <Text className="font-kanitLight text-xs text-ice/75">
                      {skill}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </FadeIn>
      ))}
    </View>
  );
}