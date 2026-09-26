import { Text, Pressable } from "react-native";

export function LiveProjectButton() {
  return (
    <Pressable className="rounded-full border-2 border-ice px-6 py-2.5 active:bg-ice/10">
      <Text className="font-kanitMedium text-xs uppercase tracking-widest text-ice">
        Live Project
      </Text>
    </Pressable>
  );
}
