import { Pressable, Text, StyleSheet } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "active" | "outline";
};

export default function AppButton({ title, onPress, variant = "active" }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "active" ? styles.active : styles.outline,
        pressed && styles.pressed,
      ]}
    >
      <Text style={variant === "active" ? styles.activeText : styles.outlineText}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
  },

  // Active button (filled)
  active: {
    backgroundColor: "#007BFF",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Outline button
  outline: {
    borderWidth: 2,
    borderColor: "#007BFF",
    backgroundColor: "transparent",
  },
  outlineText: {
    color: "#007BFF",
    fontWeight: "bold",
  },

  // Feedback when pressed
  pressed: {
    opacity: 0.8,
  },
});