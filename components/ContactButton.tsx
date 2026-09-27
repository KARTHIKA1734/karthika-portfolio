import { Text, Linking, Pressable, View } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { person } from "@/content/profile";

export function ContactButton() {
  return (
    <Pressable
      onPress={() => Linking.openURL(`mailto:${person.email}`)}
      className="active:opacity-80"
    >
      <View
        className="flex-row items-center gap-2 rounded-full px-6 py-3.5"
        style={{ backgroundColor: "#B600A8" }}
      >
        <Text className="font-kanitMedium text-xs uppercase tracking-widest text-white">
          Contact Me
        </Text>
        <ArrowRight size={14} color="#FFFFFF" strokeWidth={2.4} />
      </View>
    </Pressable>
  );
}