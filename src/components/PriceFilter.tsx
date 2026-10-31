import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors, radius } from "../theme";

interface Props { value: PriceRange; onChange: (v: PriceRange) => void; }

export function PriceFilter({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((range) => {
        const active = value === range.key;
        return (
          <Pressable key={range.key} accessibilityRole="button" accessibilityState={{ selected: active }}
            onPress={() => onChange(active ? null : range.key)} style={[styles.btn, active && styles.active]}>
            <Text style={[styles.text, active && styles.activeText]}>{range.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 10, paddingBottom: 10 },
  btn: { borderWidth: 1, borderColor: colors.cyan, borderRadius: radius.sm, paddingVertical: 8, paddingHorizontal: 12 },
  active: { backgroundColor: colors.cyan },
  text: { color: colors.cyan, fontWeight: "700", fontSize: 12 },
  activeText: { color: "#fff" },
});
