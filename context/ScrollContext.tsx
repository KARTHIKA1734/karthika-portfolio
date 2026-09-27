import { createContext, useContext } from "react";
import type { SharedValue } from "react-native-reanimated";

export const ScrollContext = createContext<SharedValue<number> | null>(null);

export function useScrollY() {
  return useContext(ScrollContext);
}