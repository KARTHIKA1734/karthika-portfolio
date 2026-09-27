import { Modal, View, Text, Pressable, ScrollView, Platform } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { X, ExternalLink } from "lucide-react-native";
import { AnimatedButton } from "./AnimatedButton";

type Section = { label?: string; items: string[] };

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  category: string;
  stack: string[];
  sections: Section[];
  link?: string;
  linkLabel?: string;
};

export function DetailModal({
  visible,
  onClose,
  title,
  category,
  stack,
  sections,
  link,
  linkLabel = "View on GitHub",
}: Props) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 250 });
      scale.value = withSpring(1, { damping: 18, stiffness: 180 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = 0.95;
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            ...(Platform.OS === "web"
              ? ({ backdropFilter: "blur(8px)" } as any)
              : {}),
          },
          backdropStyle,
        ]}
      >
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Animated.View
          style={[
            {
              width: "100%",
              maxWidth: 720,
              maxHeight: "88%",
              borderRadius: 28,
              borderWidth: 1,
              borderColor: "rgba(215,226,234,0.15)",
              backgroundColor: "#141414",
              overflow: "hidden",
            },
            contentStyle,
          ]}
        >
          {/* Header */}
          <View className="flex-row items-start justify-between gap-4 p-6 border-b border-ice/10">
            <View className="flex-1">
              <Text
                style={{ fontFamily: "Kanit_900Black" }}
                className="text-2xl uppercase text-ice"
              >
                {title}
              </Text>
              <Text
                className="mt-1 text-sm"
                style={{ color: "#B600A8", fontFamily: "Kanit_500Medium" }}
              >
                {category}
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              className="rounded-full border border-ice/20 p-2 active:opacity-60"
            >
              <X size={18} color="#D7E2EA" strokeWidth={2.2} />
            </Pressable>
          </View>

          {/* Scrollable content */}
          <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
            {sections.map((section, si) => (
              <View key={si} className="mb-6">
                {section.label && (
                  <Text className="mb-3 font-kanitLight text-[10px] uppercase tracking-widest text-ice/50">
                    {section.label}
                  </Text>
                )}
                <View className="gap-3">
                  {section.items.map((item, ii) => (
                    <View key={ii} className="flex-row gap-3">
                      <Text className="font-kanit text-sm leading-relaxed text-ice/40">
                        •
                      </Text>
                      <Text className="flex-1 font-kanit text-sm leading-relaxed text-ice/85">
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {/* Stack */}
            <View className="mb-6">
              <Text className="mb-3 font-kanitLight text-[10px] uppercase tracking-widest text-ice/50">
                Tech Stack
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {stack.map((tech) => (
                  <View
                    key={tech}
                    className="rounded-lg border border-ice/15 bg-white/[0.02] px-3 py-1.5"
                  >
                    <Text className="font-kanitLight text-[11px] text-ice/80">
                      {tech}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* External link */}
            {link && (
              <AnimatedButton
                label={linkLabel}
                onPress={() => {
                  if (Platform.OS === "web" && typeof window !== "undefined") {
                    window.open(link, "_blank");
                  }
                }}
                variant="solid"
                icon={<ExternalLink size={14} color="#FFFFFF" strokeWidth={2.4} />}
              />
            )}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}