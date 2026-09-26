import Animated, {
  useAnimatedStyle,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

// Controlled by app/index.tsx via a shared scroll value.
export function ScrollProgress({
  progress,
}: {
  progress: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          { height: 2, position: "absolute", top: 0, left: 0 },
          style,
        ]}
      >
        <LinearGradient
          colors={["#B600A8", "#7621B0", "#BE4C00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </Animated.View>
  );
}

// Optional helper — call from index.tsx if you want a local shared value
export function useScrollProgress() {
  const progress = useSharedValue(0);
  return { progress };
}