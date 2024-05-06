import React, { useEffect, useState } from "react";

import { Platform, StyleSheet, Text, View } from "react-native";
import CountryPicker from "./src/CountryPicker/CountryPicker";
import CountryJSON from "./src/CountryPicker/countries.json";
// import CountryPicker from 'rn-country-picker'
const App = () => {
  const [countryCode, setCountryCode] = useState<string>("+91");

  const selectedValue = (value: string) => {
    setCountryCode(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>React Native Country Picker</Text>

      <CountryPicker
        disable={false}
        animationType={"slide"}
        language="en"
        pickerContainerStyle={styles.pickerStyle}
        pickerTitleStyle={styles.pickerTitleStyle}
        dropDownImage={require("./res/ic_drop_down.png")}
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        pickerTitle={"Country Picker"}
        searchBarPlaceHolder={"Search......"}
        hideCountryFlag={false}
        hideCountryCode={false}
        countryId={"38"}
        searchBarContainerStyle={styles.searchBarStyle}
        backButtonImage={require("./res/ic_back_black.png")}
        searchButtonImage={require("./res/ic_search.png")}
        countryCode={"1"}
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
  pickerTitleStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    fontWeight: "bold",
  },
  pickerStyle: {
    height: 50,
    width: 120,
    marginVertical: 10,
    borderColor: "#303030",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1.5,
    fontSize: 16,
    color: "#000",
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: "#000",
    textAlign: "right",
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: "#000",
    textAlign: "right",
  },

  searchBarStyle: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: Platform.OS === "ios" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,1)",
    borderRadius: 10,
    elevation: 5,
  },
});
