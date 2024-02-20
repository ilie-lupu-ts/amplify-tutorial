import { forwardRef } from "react";
import { TextInput as DefaultTextInput, StyleSheet } from "react-native";

export type TextInputProps = DefaultTextInput["props"];

export const TextInput = forwardRef(
  (props: TextInputProps, ref: React.ForwardedRef<DefaultTextInput>) => {
    const { style, ...otherProps } = props;

    return (
      <DefaultTextInput
        ref={ref}
        style={[styles.input, style]}
        cursorColor={"#000"}
        {...otherProps}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    borderColor: "#222",
    borderWidth: 1,
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 16,
    color: "#000",
  },
});
