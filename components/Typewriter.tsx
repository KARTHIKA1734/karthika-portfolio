import { useEffect, useState } from "react";
import { Text } from "react-native";
import type { TextStyle, StyleProp } from "react-native";

type Props = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  className?: string;
  style?: StyleProp<TextStyle>;
  cursorClassName?: string;
};

export function Typewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  holdTime = 1600,
  className,
  style,
  cursorClassName,
}: Props) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdTime);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setPhase("typing");
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typeSpeed, deleteSpeed, holdTime]);

  return (
    <Text className={className} style={style}>
      {text}
      <Text className={cursorClassName} style={style}>
        |
      </Text>
    </Text>
  );
}