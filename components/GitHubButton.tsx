import { Linking } from "react-native";
import { Github } from "lucide-react-native";
import { AnimatedButton } from "@/components/AnimatedButton";

type Props = {
  href: string;
  label?: string;
};

export function GitHubButton({ href, label = "View on GitHub" }: Props) {
  return (
    <AnimatedButton
      label={label}
      onPress={() => Linking.openURL(href)}
      variant="ghost"
      iconLeft={<Github size={14} color="#D7E2EA" strokeWidth={2} />}
    />
  );
}