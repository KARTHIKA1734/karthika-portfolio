import { View, Text } from "react-native";
import { FadeIn } from "@/components/FadeIn";
import { CountUp } from "@/components/CountUp";
import { stats } from "@/content/profile";

export function StatsStrip() {
  return (
    <View className="px-6 py-16">
      <FadeIn y={20}>
        <View
          className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.4,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 8 },
          }}
        >
          <View className="flex-row flex-wrap justify-between gap-y-6">
            {stats.map((s, i) => (
              <View key={s.label} className="w-1/2 items-center gap-2">
                <CountUp
                  value={s.value}
                  decimals={s.decimals ?? 0}
                  suffix={s.suffix}
                  delay={i * 120}
                  className="font-kanitBlack text-3xl text-ice"
                  style={{ fontFamily: "Kanit_900Black" }}
                />
                <Text className="font-kanitLight text-[10px] uppercase tracking-widest text-ice/60 text-center">
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </FadeIn>
    </View>
  );
}