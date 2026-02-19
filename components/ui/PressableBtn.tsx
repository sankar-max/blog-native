import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

interface PressableBtnProps extends Omit<PressableProps, 'style' | 'children'> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  hitSlop?: number | { top?: number; bottom?: number; left?: number; right?: number };
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export default function PressableBtn({
  children,
  style,
  pressedStyle,
  disabledStyle,
  disabled = false,
  hitSlop = 12,
  accessibilityLabel,
  accessibilityHint,
  ...pressableProps
}: PressableBtnProps) {
  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      hitSlop={hitSlop}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        style,
        pressed && { opacity: 0.7, transform: [{ scale: 0.96 }] },
        pressed && pressedStyle,
        disabled && disabledStyle,
      ]}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.15)', borderless: false }}>
      {children}
    </Pressable>
  );
}
