import { View, Text, Pressable } from "react-native";
import { FadeIn } from "@/components/FadeIn";

type Props = {
  onNavigate?: (sectionId: string) => void;
  activeSection?: string;
};

const links = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export function Navbar({ onNavigate, activeSection }: Props) {
  return (
    <FadeIn delay={0} y={-16}>
      <View className="flex-row justify-between px-6 pt-6 md:px-10 md:pt-8">
        {links.map((link) => {
          const active = activeSection === link.id;
          return (
            <Pressable
              key={link.id}
              onPress={() => onNavigate?.(link.id)}
              className="active:opacity-60"
            >
             // In Navbar.tsx, replace the link rendering block with:
              <Text className="font-kanitMedium text-xs uppercase tracking-wider text-ice/70 md:text-sm">
                {link.label}
              </Text>
              {active && (
                <View className="mt-1 h-[2px] w-full rounded-full bg-ice/70" />
              )}
            </Pressable>
          );
        })}
      </View>
    </FadeIn>
  );
}