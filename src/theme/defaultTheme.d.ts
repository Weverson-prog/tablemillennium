import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: {
        normal: string;
      };
      black: {
        normal: string;
      };
      gray: {
        default: string;
        light: string;
        normal: string;
        dark: string;
        darker: string;
        header: string;
      };
      green: {
        default: string;
        darker: string;
        dark: string;
        normal: string;
        light: string;
      };
      orange: {
        normal: string
      },
      red: {
        normal: string;
        default: string;
      };
      yellow: {
        normal: string;
        palete: string;
        warning: string;
      };
      blue: {
        default: string;
        palete: string;
      },
      defaultColor: {
        normal: string;
      }

    };
    fonts: {
      primary: string;
      secundary: string;
    };
    shadow: {
      vertical: string;
      bottomRight: string;
      black: string;
    };
    animation: {
      duration: string;
      name: string;
    };
    devices: {
      mobileS: string;
      mobileM: string;
      mobileL: string;
      tablet: string;
      laptop: string;
      laptopL: string;
      desktop: string;
    };

    fontSize: {
      sm: string;
      mm: string;
      md: string;
      md2: string;
      lg: string;
      xlg: string;
      xxlg: string;
      xxxlg: string;
    };
    siteWidth: string;
  }
}
