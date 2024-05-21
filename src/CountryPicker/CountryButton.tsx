import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageStyle,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import CountryJSON from "./countries.json";

interface CountryButtonProps {
  countryId?: string;
  pickerContainerStyle?: ViewStyle;
  selectedCountryTextStyle?: TextStyle;
  dropDownIconStyle?: ImageStyle;
  countryFlagStyle?: ImageStyle;
  dropDownIcon?: ImageSourcePropType;
  countryCode?: string | any;
  hideCountryFlag?: boolean;
  hideCountryCode?: boolean;
  searchBarPlaceHolder?: string;
  disable?: boolean;
  selectedValue?: Function;
  toggleModal1?: any;
}

const CountryButton = (props: CountryButtonProps) => {
  const dropDown = props.dropDownIcon
    ? props.dropDownIcon
    : require("../../res/ic_drop_down.png");

  const filteredJson = CountryJSON.filter(function (item) {
    return item.callingCode === props.countryCode?.replaceAll("+", "");
  });

  const selectedFlag = (filteredJson) => {
    if (filteredJson.length === 1) {
      return filteredJson[0]?.flag;
    } else {
      return filteredJson.filter((item) => item.id == props.countryId)[0]?.flag;
    }
  };

  return (
    <Pressable
      style={styles.onPressStyle}
      disabled={props.disable}
      onPress={() => props.toggleModal1(true)}
    >
      <View style={[styles.selectedCountryView, props.pickerContainerStyle]}>
        {!props.hideCountryFlag && (
          <Image
            style={[styles.countryFlagStyle, props.countryFlagStyle]}
            source={{
              uri: selectedFlag(filteredJson),
            }}
          />
        )}
        {!props.hideCountryCode && (
          <Text
            style={[
              styles.selectedCountryTextStyle,
              props.selectedCountryTextStyle,
            ]}
          >
            {` +${props.countryCode?.replaceAll("+", "")}`}
          </Text>
        )}

        <Image
          resizeMode="contain"
          source={dropDown}
          style={[styles.dropDownIcon, props.dropDownIconStyle]}
        />
      </View>
    </Pressable>
  );
};

export default CountryButton;

const styles = StyleSheet.create({
  onPressStyle: {
    flexDirection: "row",
  },
  selectedCountryTextStyle: {
    color: "#000",
    textAlign: "right",
  },
  selectedCountryView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    height: 54,
    width: 120,
    marginVertical: 10,
    borderColor: "#303030",
    marginHorizontal: 10,
    backgroundColor: "white",
    fontSize: 16,
    color: "#000",
  },
  countryFlagStyle: {
    width: 35,
    height: 25,
    borderRadius: 3,
  },
  dropDownIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
});
