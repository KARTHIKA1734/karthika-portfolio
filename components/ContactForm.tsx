import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ArrowRight } from "lucide-react-native";

const WEB3FORMS_KEY = "2d24f13c-03d2-483a-ab5e-0e07fb9127ec";

/* ------------------------------------------------------------------ */
/* Animated input field                                                */
/* ------------------------------------------------------------------ */

function AnimatedField({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  multiline,
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences";
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const borderOpacity = useSharedValue(0.1);
  const bgOpacity = useSharedValue(0.03);
  const lift = useSharedValue(0);

  useEffect(() => {
    // Priority: focused > hovered > idle
    const targetBorder = focused ? 0.55 : hovered ? 0.28 : 0.1;
    const targetBg = focused ? 0.06 : hovered ? 0.045 : 0.03;
    const targetLift = hovered && !focused ? -2 : 0;

    borderOpacity.value = withTiming(targetBorder, { duration: 200 });
    bgOpacity.value = withTiming(targetBg, { duration: 200 });
    lift.value = withSpring(targetLift, { damping: 20, stiffness: 200 });
  }, [focused, hovered]);

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: lift.value }],
    borderColor: `rgba(${focused ? "182,0,168" : "215,226,234"},${borderOpacity.value})`,
    backgroundColor: `rgba(255,255,255,${bgOpacity.value})`,
  }));

  // Web-only hover handlers on the wrapper
  const webHandlers =
    Platform.OS === "web"
      ? {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
        }
      : {};

  return (
    <Animated.View
      style={[
        wrapperStyle,
        {
          borderRadius: 16,
          borderWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 14,
          ...(multiline ? { minHeight: 140 } : {}),
        },
      ]}
      {...(webHandlers as any)}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(215,226,234,0.35)"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="font-kanit text-sm text-ice"
        style={[
          {
            padding: 0,
            ...(multiline
              ? { minHeight: 100, textAlignVertical: "top" }
              : {}),
          },
          Platform.OS === "web"
            ? ({ outlineStyle: "none" } as any)
            : undefined,
        ]}
      />
    </Animated.View>
  );
}

/* ------------------------------------------------------------------ */
/* Animated submit button                                              */
/* ------------------------------------------------------------------ */

function SubmitButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const brightness = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: brightness.value,
  }));

  const webHandlers =
    Platform.OS === "web"
      ? {
          onMouseEnter: () => {
            translateY.value = withSpring(-3, { damping: 18, stiffness: 200 });
            brightness.value = withTiming(1.15, { duration: 200 });
          },
          onMouseLeave: () => {
            translateY.value = withSpring(0, { damping: 18, stiffness: 200 });
            brightness.value = withTiming(1, { duration: 200 });
          },
        }
      : {};

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 20 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 20 });
      }}
      className="active:opacity-95 self-center"
      {...(webHandlers as any)}
    >
      <Animated.View style={style}>
        <View
          className="flex-row items-center gap-2 rounded-full px-6 py-3.5"
          style={{
            backgroundColor: "#B600A8",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <Text className="font-kanitMedium text-xs uppercase tracking-widest text-white">
            {label}
          </Text>
          <ArrowRight size={14} color="#FFFFFF" strokeWidth={2.4} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/* Status message (fades in)                                           */
/* ------------------------------------------------------------------ */

function StatusMessage({
  type,
  text,
}: {
  type: "sent" | "error";
  text: string;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    translateY.value = withTiming(0, { duration: 400 });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={style}>
      <Text
        className={
          "text-center font-kanit text-sm " +
          (type === "error" ? "text-red-400" : "text-ice/80")
        }
      >
        {text}
      </Text>
    </Animated.View>
  );
}

/* ------------------------------------------------------------------ */
/* Main form                                                           */
/* ------------------------------------------------------------------ */

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const submit = async () => {
    if (!name || !email || !message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          message,
          subject: `Portfolio contact from ${name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <View className="w-full max-w-[720px] gap-4">
      <AnimatedField
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />
      <AnimatedField
        value={email}
        onChangeText={setEmail}
        placeholder="Your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AnimatedField
        value={message}
        onChangeText={setMessage}
        placeholder="Your message"
        multiline
      />

      <SubmitButton
        label={status === "sending" ? "Sending..." : "Send Message"}
        onPress={submit}
        disabled={status === "sending"}
      />

      {status === "sent" && (
        <StatusMessage
          type="sent"
          text="✅ Message sent — thanks, I'll get back to you soon."
        />
      )}
      {status === "error" && (
        <StatusMessage
          type="error"
          text="Something went wrong. Email me directly at karthikakrishnan2004@gmail.com"
        />
      )}
    </View>
  );
}