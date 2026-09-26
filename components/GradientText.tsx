import { Text, View } from "react-native";
import type { TextStyle, StyleProp } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Reproduces the spec's `.hero-heading` class — a top-to-bottom gradient
 * fill on the text itself. RN has no background-clip:text, so this masks
 * a LinearGradient with the text shape instead. Same visual result.
 */
export function GradientText({
  children,
  style,
  colors = ["#646973", "#BBCCD7"],
}: {
  children: string;
  style?: StyleProp<TextStyle>;
  colors?: [string, string];
}) {
  return (
    <MaskedView maskElement={<Text style={[style, { backgroundColor: "transparent" }]}>{children}</Text>}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
