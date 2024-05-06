//import libraries
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
} from "react-native";
import CountryJSON from "./countries.json";

interface CountryButtonProps {
  countryId?: any;
  pickerContainerStyle?: ViewStyle;
  selectedCountryTextStyle?: TextStyle;
  dropDownImageStyle?: ImageStyle;
  countryFlagStyle?: ImageStyle;
  dropDownImage?: any;
  countryCode?: string | any;
  hideCountryFlag?: boolean;
  hideCountryCode?: boolean;
  searchBarPlaceHolder?: string;
  pickerTitle?: string;
  disable?: boolean;
  selectedValue?: Function;
  toggleModal1?: any;
  selectedFlag?: any;
  selectedCountry?: any;
}
// create a component
const CountryButton = (props: CountryButtonProps) => {
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
      style={styles.onPressStyle}
      disabled={props.disable}
      onPress={() => props.toggleModal1(true)}
    >
      <View style={[styles.selectedCountryView, props.pickerContainerStyle]}>
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
