import { useEffect } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  onNavigate?: (sectionId: string) => void;
  activeSection?: string;
  scrolled?: boolean;
};

const links = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export function Navbar({ onNavigate, activeSection = "hero" }: Props) {
  // Track scroll to add background blur/darken when scrolled
  const bgOpacity = useSharedValue(0);

  useEffect(() => {
    // We don't have direct scroll access here; index.tsx handles sticky.
    // This is just for the transition animation when it does stick.
    bgOpacity.value = withTiming(1, { duration: 200 });
  }, []);

  return (
    <View
      style={{
        position: Platform.OS === "web" ? ("fixed" as any) : "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(12,12,12,0.75)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(215,226,234,0.08)",
        ...(Platform.OS === "web"
          ? ({
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            } as any)
          : {}),
      }}
    >
      <View className="flex-row items-center justify-between px-6 py-4 md:px-10 md:py-5">
        {/* Logo */}
        <Pressable
          onPress={() => onNavigate?.("hero")}
          className="flex-row items-center gap-3 active:opacity-70"
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 9999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#B600A8",
            }}
          >
            <Text
              style={{ fontFamily: "Kanit_900Black" }}
              className="text-white text-lg"
            >
              K
            </Text>
          </View>
          <Text
            style={{ fontFamily: "Kanit_900Black" }}
            className="text-ice text-base uppercase tracking-wider md:text-lg"
          >
            Karthika<span className="text-ice/40">.K</span>
          </Text>
        </Pressable>

        {/* Nav links */}
        <View className="flex-row items-center gap-2 md:gap-1">
          {links.map((link) => {
            const active = activeSection === link.id;
            return (
              <Pressable
                key={link.id}
                onPress={() => onNavigate?.(link.id)}
                className={
                  "rounded-full px-3 py-2 md:px-4 " +
                  (active ? "bg-white/5" : "active:opacity-60")
                }
              >
                <Text
                  className={
                    "font-kanitMedium text-xs uppercase tracking-wider md:text-sm " +
                    (active ? "text-ice" : "text-ice/60")
                  }
                >
                  {link.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}