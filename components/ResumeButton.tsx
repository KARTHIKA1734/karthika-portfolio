import { Text, Pressable, Linking, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Download } from "lucide-react-native";
import { View } from "react-native";
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
    <Pressable onPress={open}>
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
        <View className="flex-row items-center gap-2">
          <Download size={14} color="#FFFFFF" strokeWidth={2.2} />
          <Text className="font-kanitMedium text-xs uppercase tracking-widest text-white">
            Download Resume
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}