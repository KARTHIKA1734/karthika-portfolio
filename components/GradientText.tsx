import { Platform, Text } from "react-native";
import type { TextStyle, StyleProp } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: string;
  style?: StyleProp<TextStyle>;
  colors?: [string, string];
    className?: string;  
};

export function GradientText({
  children,
  style,
  className,
  colors = ["#FFFFFF", "#D7E2EA"],
}: Props) {
  // --- WEB ---
  if (Platform.OS === "web") {
    const [from, to] = colors;

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

    return (
      <Text className={className} style={merged as any}>
        {children}
      </Text>
    );
  }

  // --- NATIVE ---
  return (
    <MaskedView
      maskElement={
        <Text
          className={className}
          style={[style, { backgroundColor: "transparent" }]}
        >
          {children}
        </Text>
      }
    >
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <Text className={className} style={[style, { opacity: 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}
