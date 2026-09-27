import { useState } from "react";
import { View, Text, TextInput, Pressable, Platform } from "react-native";
import { ArrowRight } from "lucide-react-native";

const WEB3FORMS_KEY = "PASTE_YOUR_ACCESS_KEY_HERE";

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
    <View className="w-full gap-4">
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
          { minHeight: 140, textAlignVertical: "top" },
          Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : undefined,
        ]}
      />

      <Pressable
        onPress={submit}
        disabled={status === "sending"}
        className="active:opacity-80 self-center"
      >
        <View
          className="flex-row items-center gap-2 rounded-full px-6 py-3.5"
          style={{
            backgroundColor: "#B600A8",
            opacity: status === "sending" ? 0.6 : 1,
          }}
        >
          <Text className="font-kanitMedium text-xs uppercase tracking-widest text-white">
            {status === "sending" ? "Sending..." : "Send Message"}
          </Text>
          <ArrowRight size={14} color="#FFFFFF" strokeWidth={2.4} />
        </View>
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