import { Text, Pressable, Linking } from "react-native";
import { Github } from "lucide-react-native";
import { View } from "react-native";

type Props = {
  href: string;
  label?: string;
};

export function GitHubButton({ href, label = "View on GitHub" }: Props) {
  return (
    <Pressable
      onPress={() => Linking.openURL(href)}
      className="rounded-full border-2 border-ice px-6 py-2.5 active:bg-ice/10"
    >
      <View className="flex-row items-center gap-2">
        <Github size={14} color="#D7E2EA" strokeWidth={2} />
        <Text className="font-kanitMedium text-xs uppercase tracking-widest text-ice">
          {label}
        </Text>
      </View>
    </Pressable>
  );
}