import { Linking, Platform } from "react-native";
import { Download } from "lucide-react-native";
import { AnimatedButton } from "@/components/AnimatedButton";
import { person } from "@/content/profile";

export function ResumeButton() {
  const open = () => {
    const url = person.resumePath;
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.open(url, "_blank");
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <AnimatedButton
      label="Download Resume"
      onPress={open}
      variant="solid"
      iconLeft={<Download size={14} color="#FFFFFF" strokeWidth={2.2} />}
    />
  );
}