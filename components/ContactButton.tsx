import { Linking } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { AnimatedButton } from "@/components/AnimatedButton";
import { person } from "@/content/profile";

export function ContactButton() {
  return (
    <AnimatedButton
      label="Contact Me"
      onPress={() => Linking.openURL(`mailto:${person.email}`)}
      variant="solid"
      icon={<ArrowRight size={14} color="#FFFFFF" strokeWidth={2.4} />}
    />
  );
}