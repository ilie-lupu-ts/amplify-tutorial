/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  SafeAreaView as DefaultSafeAreaView,
} from "react-native";

import Colors, { AppColorThemes, ColorTheme } from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import { NestedKeyOf } from "@/constants/types";

function getNestedProperty(obj: any, path: string) {
  return path.split(".").reduce((o, p) => (o ? o[p] : null), obj);
}

export function useThemeColor(
  themes: AppColorThemes,
  colorName: NestedKeyOf<ColorTheme>
) {
  const colorScheme = useColorScheme() ?? "light";
  const colorFromTheme = getNestedProperty(themes[colorScheme], colorName);

  if (!colorFromTheme) {
    throw new Error(`No color found in theme for ${colorName}`);
  }

  return colorFromTheme;
}

export function useColor(color: NestedKeyOf<ColorTheme>) {
  return useThemeColor(Colors, color);
}

export type TextProps = {
  color?: NestedKeyOf<ColorTheme>;
} & DefaultText["props"];

export function Text(props: TextProps) {
  const { style, color: colorName, ...otherProps } = props;

  const color = useThemeColor(Colors, colorName ?? "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export type ViewProps = {
  background?: NestedKeyOf<ColorTheme>;
} & DefaultView["props"];

export function View(props: ViewProps) {
  const { style, background, ...otherProps } = props;

  const backgroundColor = useThemeColor(Colors, background ?? "background");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export type SafeAreaViewProps = {
  background?: NestedKeyOf<ColorTheme>;
} & DefaultSafeAreaView["props"];

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, background, ...otherProps } = props;

  const backgroundColor = useThemeColor(Colors, background ?? "background");

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
