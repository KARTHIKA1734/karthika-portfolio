import { View, Text, Pressable, Platform } from "react-native";

type Props = {
  onNavigate?: (sectionId: string) => void;
  activeSection?: string;
};

const links = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export function Navbar({ onNavigate }: Props) {
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
      <View className="flex-row items-center justify-center gap-1 px-3 py-3 md:gap-2 md:px-10 md:py-5">
        {links.map((link) => (
          <Pressable
            key={link.id}
            onPress={() => onNavigate?.(link.id)}
            className="rounded-full px-2.5 py-2 md:px-4 active:opacity-60"
          >
            <Text className="font-kanitMedium text-[11px] uppercase tracking-wider text-ice/70 md:text-sm">
              {link.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}