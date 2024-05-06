//import libraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  I18nManager,
} from "react-native";
import CountryJSON from "./countries.json";
import { CountryPickerProps } from "./CountryPicker";

// create a component
const CountryButton = (props: CountryPickerProps) => {
  const filteredJson = CountryJSON.filter(function (item) {
    return item.callingCode === props.countryCode;
  });
  const selectedFlag = (filteredJson) => {
    if (filteredJson.length === 1) {
      return filteredJson[0]?.flag;
    } else {
      return filteredJson.filter((item) => item.id == props.countryId)[0].flag;
    }
  };
  
  return (
    <Pressable
      style={{ flexDirection: "row" }}
      disabled={props.disable}
      onPress={() => props.toggleModal1(true)}
    >
      <View style={styles.selectedCountryView}>
        {!props.hideCountryFlag && (
          <Image
            source={{
              uri: props?.selectedFlag
                ? props?.selectedCountry?.flag
                : selectedFlag(filteredJson),
            }}
            style={[styles.countryFlagStyle, props.countryFlagStyle]}
          />
        )}
        {!props.hideCountryCode && (
          <Text
            style={[
              styles.selectedCountryTextStyle,
              props.selectedCountryTextStyle,
            ]}
          >
            {props.selectedFlag
              ? "+" + props.selectedCountry?.callingCode
              : "+" + props.countryCode}
          </Text>
        )}

        <Image
          source={props.dropDownImage}
          style={[styles.dropDownImage, props.dropDownImageStyle]}
        />
      </View>
    </Pressable>
  );
};

//make this component available to the app
export default CountryButton;

const styles = StyleSheet.create({
  selectedCountryTextStyle: {
    color: "#000",
    textAlign: "right",
  },
  selectedCountryView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  countryFlagStyle: {
    width: 35,
    height: 25,
    borderRadius: 3,
  },
  dropDownImage: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
});
