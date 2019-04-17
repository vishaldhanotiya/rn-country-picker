/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, I18nManager, StyleSheet, Text, View } from "react-native";
import CountryPicker from "./src/CountryPicker/CountryPicker";
import CountryJSON from "./src/CountryPicker/countries.json";
import DeviceInfo from "react-native-device-info";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mCountryCode: "91"
    };
    let userLocaleCountryCode = "";
    userLocaleCountryCode = DeviceInfo.getDeviceCountry();

    try {
      if (userLocaleCountryCode) {
        const newData = CountryJSON.filter(function(item) {
          const itemData = item.name.common.toUpperCase();
          const textData = userLocaleCountryCode.toUpperCase();
          return itemData.startsWith(textData);
        });
        if (newData.length > 0) {
          this.state.mCountryCode = newData[0].callingCode;
        } else {
          this.setState({ mCountryCode: "91" });
        }
      } else {
        this.setState({ mCountryCode: "91" });
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  _selectedValue = index => {
    this.setState({ mCountryCode: index });
  };


  render() {
    return (
      <View style={styles.container}>

      <Text style={{color:'#000',fontSize:25,marginBottom:25,fontWeight:'bold'}}>React Native Country Picker</Text>
        <CountryPicker
          disable={false}
          animationType={'slide'}
          containerStyle={styles.pickerStyle}
          pickerTitleStyle={styles.pickerTitleStyle}
          dropDownImage={require("./res/ic_drop_down.png")}
          selectedCountryTextStyle={styles.selectedCountryTextStyle}
          countryNameTextStyle={styles.countryNameTextStyle}
          pickerTitle={"Country Picker"}
          searchBarPlaceHolder={"Search......"}
          hideCountryFlag={true}
          hideCountryCode={false}
          searchBarStyle={styles.searchBarStyle}
          backButtonImage={require("./res/ic_back_black.png")}
          searchButtonImage={require("./res/ic_search.png")}
          countryCode={this.state.mCountryCode}
          selectedValue={this._selectedValue}
        />



           <CountryPicker
          disable={false}
          animationType={'fade'}
          containerStyle={styles.pickerStyle}
          pickerTitleStyle={styles.pickerTitleStyle}
          dropDownImage={require("./res/ic_drop_down.png")}
          selectedCountryTextStyle={styles.selectedCountryTextStyle}
          countryNameTextStyle={styles.countryNameTextStyle}
          pickerTitle={"Country Picker"}
          searchBarPlaceHolder={"Search......"}
          hideCountryFlag={false}
          hideCountryCode={true}
          searchBarStyle={styles.searchBarStyle}
          backButtonImage={require("./res/ic_back_black.png")}
          searchButtonImage={require("./res/ic_search.png")}
          countryCode={this.state.mCountryCode}
          selectedValue={this._selectedValue}
        />



           <CountryPicker
          disable={false}
          animationType={'slide'}
          containerStyle={styles.pickerStyle}
          pickerTitleStyle={styles.pickerTitleStyle}
          dropDownImage={require("./res/ic_drop_down.png")}
          selectedCountryTextStyle={styles.selectedCountryTextStyle}
          countryNameTextStyle={styles.countryNameTextStyle}
          pickerTitle={"Country Picker"}
          searchBarPlaceHolder={"Search......"}
          hideCountryFlag={false}
          hideCountryCode={false}
          searchBarStyle={styles.searchBarStyle}
          backButtonImage={require("./res/ic_back_black.png")}
          searchButtonImage={require("./res/ic_search.png")}
          countryCode={this.state.mCountryCode}
          selectedValue={this._selectedValue}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  pickerTitleStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    flex: 1,
    marginTop: 5,
    fontSize: 15,
    color: "#000"
  },
  pickerStyle: {
    height: 60,
    width: 250,
    marginBottom:10,
    justifyContent: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#303030",
    backgroundColor: "white"
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "#000",
    textAlign: "right"
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: "#000",
    textAlign: "right"
  },

  searchBarStyle: {
    flex: 1,
    borderRadius: 50,
    borderWidth: 4,

    borderColor: "#D3D3D3",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 8,
    marginBottom: 5,
    marginRight: 12,
    paddingLeft: 20,
    paddingRight: 10
  }
});
