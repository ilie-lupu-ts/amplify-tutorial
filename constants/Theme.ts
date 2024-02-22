import {
  Theme as AmplifyTheme,
  defaultTheme,
  useTheme as useAmplifyTheme,
} from "@aws-amplify/ui-react-native";

const Theme: AmplifyTheme = {
  ...defaultTheme,
  tokens: {
    colors: {
      red: {
        10: "#FFEBEC",
        20: "#FFBDBF",
        40: "#FF666E",
        60: "#E61E25",
        80: "#7E1016",
        90: "#4D0A0D",
        100: "#240506",
      },
      purple: {
        100: "#3C0C73",
        90: "#5411A2",
        80: "#6512C4",
        60: "#8929FF",
        40: "#AA80FF",
        20: "#DDD1FF",
        10: "#EDE6FF",
      },
    },
  },
  components: {
    button: {
      textLink: {
        color: "#6D21CA",
      },
    },
  },
  overrides: [],
};

export default Theme;
