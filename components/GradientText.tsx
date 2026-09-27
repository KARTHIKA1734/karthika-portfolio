import { Platform, Text } from "react-native";
import type { TextStyle, StyleProp } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: string;
  style?: StyleProp<TextStyle>;
  colors?: [string, string];
};

export function GradientText({
  children,
  style,
  colors = ["#FFFFFF", "#D7E2EA"],
}: Props) {
  // --- WEB: pure CSS background-clip: text ---
  if (Platform.OS === "web") {
    const [from, to] = colors;

    // Flatten style prop so we can override color to transparent
    const flatStyle: any = Array.isArray(style)
      ? Object.assign({}, ...style.filter(Boolean))
      : { ...(style as any) };

    const merged = {
      ...flatStyle,
      backgroundImage: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      display: "inline-block",
    };

    return <Text style={merged as any}>{children}</Text>;
  }

  // --- NATIVE: MaskedView + LinearGradient ---
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent" }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}