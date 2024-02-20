const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const brandColors = {
  primary: "#FF6B2E",
  secondary: "#08213C",
};

const colors = {
  white: "#fff",
  black: "#000",
  textDisabled: "#ADADB4",
  neutral: {
    300: "#DFE2E6",
  },
};

const light: ColorTheme = {
  brandColors,
  button: {
    primary: {
      backgroundColor: brandColors.primary,
      borderColor: brandColors.primary,
      color: colors.white,
    },
    secondary: {
      backgroundColor: colors.white,
      borderColor: brandColors.secondary,
      color: brandColors.secondary,
    },
    disabled: {
      backgroundColor: colors.neutral[300],
      borderColor: colors.neutral[300],
      color: colors.textDisabled,
    },
    disabledSecondary: {
      backgroundColor: colors.white,
      borderColor: colors.neutral[300],
      color: colors.textDisabled,
    },
  },
  text: "#000",
  background: "#fff",
  tint: tintColorLight,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColorLight,
};

const dark: ColorTheme = {
  brandColors,
  button: {
    primary: {
      backgroundColor: brandColors.primary,
      borderColor: brandColors.primary,
      color: colors.white,
    },
    secondary: {
      backgroundColor: colors.white,
      borderColor: brandColors.secondary,
      color: brandColors.secondary,
    },
    disabled: {
      backgroundColor: colors.neutral[300],
      borderColor: colors.neutral[300],
      color: colors.textDisabled,
    },
    disabledSecondary: {
      backgroundColor: colors.white,
      borderColor: colors.neutral[300],
      color: colors.textDisabled,
    },
  },
  text: "#fff",
  background: "#000",
  tint: tintColorDark,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColorDark,
};

export default {
  light,
  dark,
};

export type ColorTheme = {
  brandColors: {
    primary: string;
    secondary: string;
  };
  button: {
    primary: {
      backgroundColor: string;
      borderColor: string;
      color: string;
    };
    secondary: {
      backgroundColor: string;
      borderColor: string;
      color: string;
    };
    disabled: {
      backgroundColor: string;
      borderColor: string;
      color: string;
    };
    disabledSecondary: {
      backgroundColor: string;
      borderColor: string;
      color: string;
    };
  };
  tint: string;
  text: string;
  background: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

export type AppColorThemes = {
  light: ColorTheme;
  dark: ColorTheme;
};
