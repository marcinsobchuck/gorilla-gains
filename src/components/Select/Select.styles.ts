import { StylesConfig } from "react-select"
import { DefaultTheme } from "styled-components"

import { Option } from "./Select.types"

export const selectStyles = (theme: DefaultTheme): StylesConfig<Option, false> => {
  const styles: StylesConfig<Option, false> = {
    // container: (baseStyles) => {
    //   return {
    //     ...baseStyles,
    //     marginBottom: "24px",
    //   }
    // },

    control: (baseStyles, state) => {
      return {
        ...baseStyles,
        height: "64px",
        backgroundColor: theme.inputBackgroundColor,
        border:
          state.menuIsOpen || state.isFocused
            ? `2px solid ${theme.secondary}`
            : "2px solid transparent",
        boxShadow:
          state.menuIsOpen || state.isFocused
            ? `0px 0px 0px 4px ${theme.secondaryOpacity}`
            : `none`,
        borderRadius: "9px",
        transition: "0.3s",
        transitionDelay: ".1s",

        "&:hover": {
          borderColor: state.menuIsOpen || state.isFocused ? `${theme.secondary}` : "transparent",
        },
      }
    },
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      marginRight: "24px",
      padding: 0,
      width: "24px",
      height: "24px",
      justifyContent: "center",
      alignItems: "center",
      svg: {
        fill: theme.secondary,
        width: "100%",
        height: "100%",
      },
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      margin: 0,
      padding: 0,
    }),

    menu: (baseStyles) => ({
      ...baseStyles,
      borderRadius: "9px",
      overflow: "hidden",
      zIndex: 2,
      backgroundColor: theme.selectBackgroundColor,
    }),

    option: (baseStyles, state) => ({
      ...baseStyles,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? theme.secondary
        : state.isFocused
        ? theme.primaryDisabled
        : "transparent",
      color: state.isSelected ? theme.primaryButtonColor : theme.primary,
      fontWeight: state.isSelected ? 600 : 400,
      paddingBottom: "12px",

      "&:hover": {
        backgroundColor: !state.isSelected ? `${theme.primaryDisabled}` : theme.secondary,
      },
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      margin: 0,
      color: theme.primary,
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: "24px 6px 12px 24px",
    }),
  }

  return styles
}
