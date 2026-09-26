import { Text, Linking, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { person } from "@/content/profile";

export function ContactButton() {
  return (
    <Pressable onPress={() => Linking.openURL(`mailto:${person.email}`)}>
      <LinearGradient
        colors={["#18011F", "#B600A8", "#7621B0", "#BE4C00"]}
        locations={[0.07, 0.37, 0.72, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 999,
          paddingHorizontal: 32,
          paddingVertical: 14,
          borderWidth: 2,
          borderColor: "white",
        }}
      >
        <Text className="font-kanitMedium text-xs uppercase tracking-widest text-white">
          Contact Me
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
