# rn-country-picker

## Country picker for react native support both platform IOs and android

<p align="center">
<img  width="270" height="450" src="https://github.com/vishaldhanotiya/rn-country-picker/assets/101810165/148226bd-efa3-42b0-85a4-d5f19d5cd438">
</p>

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
import { StyleSheet, Text, View } from "react-native";
import CountryPicker from "rn-country-picker";

const App = () => {
	const [countryCode, setCountryCode] = useState<string>("91");

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
				containerStyle={styles.pickerStyle}
				pickerTitleStyle={styles.pickerTitleStyle}
				dropDownImage={require("./res/ic_drop_down.png")}
				selectedCountryTextStyle={styles.selectedCountryTextStyle}
				countryNameTextStyle={styles.countryNameTextStyle}
				pickerTitle={"Country Picker"}
				searchBarPlaceHolder={"Search......"}
				hideCountryFlag={false}
				hideCountryCode={false}
				backButtonImage={require("./res/ic_back_black.png")}
				searchButtonImage={require("./res/ic_search.png")}
				countryCode={"1"}
                                countryId={231}
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
	pickerTitleStyle: {
		justifyContent: "center",
		flexDirection: "row",
		alignSelf: "center",
		fontWeight: "bold",
	},
	pickerStyle: {
		height: 54,
		width: 150,
		marginVertical: 10,
		borderColor: "#303030",
		alignItems: "center",
		marginHorizontal: 10,
		padding: 10,
		backgroundColor: "white",
		borderRadius: 5,
		borderWidth: 2,
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
		flex: 1,
	},
});
```

## Properties

| Prop                     | Default | Type                     | Description                                                    | Required/Optional |
| ------------------------ | ------- | ------------------------ | -------------------------------------------------------------- | ----------------- |
| countryCode              | -       | string                   | Default and selected country code                              | Required          |
| pickerTitle              | -       | string                   | Change picker title                                            | Required          |
| pickerTitleStyle         | -       | string                   | Customize picker title style                                   | Required          |
| searchBarPlaceHolder     | -       | string                   | Change search bar placeholder                                  | Optional          |
| searchBarStyle           | -       | object                   | Customize search bar text input style                          | Optional          |
| containerStyle           | -       | object                   | Customize picker style                                         | Required          |
| countryNameTextStyle     | -       | object                   | Customize country name text style(List View)                   | Optional          |
| selectedCountryTextStyle | -       | object                   | Customize selected label text style                            | Optional          |
| dropDownImageStyle       | -       | object                   | Change dropdown arrow style                                    | Optional          |
| countryFlagStyle         | -       | object                   | Customize flag style                                           | Optional          |
| searchButtonImage        | -       | png/jpg                  | Add custom search image                                        | Optional          |
| backButtonImage          | -       | png/jpg                  | Add custom back button image                                   | Optional          |
| dropDownImage            | -       | png/jpg                  | Add custom drop down image                                     | Optional          |
| selectedValue            | -       | function                 | callback function received value from list selection           | Required          |
| animationType            | -       | string [slide,none,fade] | Change Modal Animation                                         | Optional          |
| hideCountryCode          | -       | bool                     | hide country code from component only show flag                | Optional          |
| hideCountryFlag          | -       | bool                     | hide country flag from component and List only show code       | Optional          |
| disable                  | -       | bool                     | Disable picker if you show default value and no need to change | Optional          |
| language                 | en      | string                   | Change the language of list                                    | Optional          |
