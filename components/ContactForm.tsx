import { useState } from "react";
import { View, Text, TextInput, Pressable, Platform } from "react-native";
import { Send } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const WEB3FORMS_KEY = "749604a9-e78b-458f-b0ab-fdec4253b4aa";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async () => {
    if (!name || !email || !message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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
    <View className="w-full max-w-[560px] gap-4">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor="rgba(215,226,234,0.35)"
        className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 font-kanit text-sm text-ice"
        style={Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : undefined}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Your email"
        placeholderTextColor="rgba(215,226,234,0.35)"
        keyboardType="email-address"
        autoCapitalize="none"
        className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 font-kanit text-sm text-ice"
        style={Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : undefined}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Your message"
        placeholderTextColor="rgba(215,226,234,0.35)"
        multiline
        numberOfLines={5}
        className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 font-kanit text-sm text-ice"
        style={[
          { minHeight: 120, textAlignVertical: "top" },
          Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : undefined,
        ]}
      />

      <Pressable onPress={submit} disabled={status === "sending"}>
        <LinearGradient
          colors={["#18011F", "#B600A8", "#7621B0", "#BE4C00"]}
          locations={[0.07, 0.37, 0.72, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 999,
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderWidth: 2,
            borderColor: "white",
            opacity: status === "sending" ? 0.6 : 1,
          }}
        >
          <View className="flex-row items-center justify-center gap-2">
            <Send size={14} color="#FFFFFF" strokeWidth={2.2} />
            <Text className="font-kanitMedium text-xs uppercase tracking-widest text-white">
              {status === "sending" ? "Sending..." : "Send Message"}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>

      {status === "sent" && (
        <Text className="text-center font-kanit text-sm text-ice/80">
          ✅ Message sent — thanks, I'll get back to you soon.
        </Text>
      )}
      {status === "error" && (
        <Text className="text-center font-kanit text-sm text-red-400">
          Something went wrong. Email me directly at karthikakrishnan2004@gmail.com
        </Text>
      )}
    </View>
  );
}