import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import type { TextStyle, StyleProp } from "react-native";

type Props = {
  value: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: StyleProp<TextStyle>;
};

export function CountUp({
  value,
  duration = 1400,
  delay = 0,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  style,
}: Props) {
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = Date.now() + delay;
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, delay]);

  return (
    <Text className={className} style={style}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </Text>
  );
}