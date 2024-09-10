# rn-country-picker

## Country picker for react native support both platform IOs and android

<p align="center">
<img  width="250" height="500" src="https://github.com/vishaldhanotiya/rn-country-picker/assets/101810165/148226bd-efa3-42b0-85a4-d5f19d5cd438">
</p>


## Important Note
 While selecting the USA It showed the wrong flag icon because both countries have the same country code so we added a new prop that is the `countryId` field. 

1. For USA countryId is 231
2. For Canada, countryId is 38
3. For Anguilla, countryId is 7
4. For Antarctica, countryId is 8

## Features

1. Lightweight country picker npm.
2. Cross-platform compatibility android and ios both.
3. Search country using country code or country code.
4. Support multiple language search and list items.
5. Dynamically change dropdown, search, and back button images.
6. Customizable search bar style and text colors.
7. Change animation(Slide, fade, none).

## Installation

> **npm i rn-country-picker**

## Usage

```tsx
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import CountryPicker from "./src/countryPicker/CountryPicker";

const App = () => {
  const [countryCode, setCountryCode] = useState<string>("92");

  const selectedValue = (value) => {
    setCountryCode(value?.callingCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>React Native Country Picker</Text>

      <CountryPicker
        animationType={"slide"}
        language="en"
        countryCode={countryCode}
        selectedValue={selectedValue}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  titleText: {
    color: "#000",
    fontSize: 25,
    marginBottom: 25,
    fontWeight: "bold",
  },

});

```

## Properties

| Prop                          | Default | Type                     | Description                                                    | Required/Optional |
| ----------------------------- | ------- | ------------------------ | -------------------------------------------------------------- | ----------------- |
| countryId                     | -       | string                   | Default and selected country Id                                | Required          |
| countryCode                   | -       | string                   | Default and selected country code                              | Required          |
| searchBarPlaceHolder          | -       | string                   | Change search bar placeholder                                  | Optional          |
| searchBarStyle                | -       | object                   | Customize search bar text input style                          | Optional          |
| pickerContainerStyle          | -       | object                   | Customize picker style                                         | Required          |
| searchBarContainerStyle.      | -       | object                   | Customize search bar style                                     | Optional          |
| searchInputStyle              | -       | object                   | Customize search bar Text Input style                          | Optional          |
| searchBarPlaceholderTextColor | -       | object                   | Customize search bar placeholder color                         | Optional          |
| countryNameTextStyle          | -       | object                   | Customize country name text style(List View)                   | Optional          |
| selectedCountryTextStyle      | -       | object                   | Customize selected label text style                            | Optional          |
| dropDownIconStyle             | -       | object                   | Change dropdown arrow style                                    | Optional          |
| countryFlagStyle              | -       | object                   | Customize flag style                                           | Optional          |
| searchIcon                    | -       | png/jpg                  | Add custom search Icon                                         | Optional          |
| dropDownIcon                  | -       | png/jpg                  | Add custom drop down icon                                      | Optional          |
| selectedValue                 | -       | function                 | callback function received value from list selection           | Required          |
| animationType                 | -       | string [slide,none,fade] | Change Modal Animation                                         | Optional          |
| hideCountryCode               | -       | bool                     | hide country code from component only show flag                | Optional          |
| hideCountryFlag               | -       | bool                     | hide country flag from component                               | Optional          |
| disable                       | -       | bool                     | Disable picker                                                 | Optional          |
| language                      | en      | string                   | Change the language of list                                    | required          |


