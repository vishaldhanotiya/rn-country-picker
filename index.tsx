import React, { useState } from "react";
import {
  FlatList,
  I18nManager,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import CountryJSON from "./src/CountryPicker/countries.json";

const CountryPicker = (props: CountryPickerProps) => {
  const [selectedCountry, updateSelectedCountry] =
    useState<typeof arrayData[0]>();
  const [hidePickerTitle, togglePickerTitle] = useState(false);
  const [hideSearchBar, toggleSearchBar] = useState(true);
  const [arrayData, updateArrayData] = useState(CountryJSON);
  const [modalVisible, toggleModal] = useState(false);
  const [selectedFlag, updateSelectedFlag] = useState(false);

  const searchFilterFunction = (searchText: string) => {
    if (/^-{0,1}\d+$/.test(searchText)) {
      var newData = CountryJSON.filter(function (item) {
        const itemData = item.callingCode;
        const textData = searchText;
        return itemData.startsWith(textData);
      });
    } else {
      var newData = CountryJSON.filter(function (item) {
        const itemData =
          item.name[props.language]?.toUpperCase() || item.name[props.language]; // some lanaguage can't be uppercase e.g Arabic, Japenese
        const textData = searchText?.toUpperCase() || searchText;
        return itemData?.includes(textData);
      });
    }
    updateArrayData([...newData]);
  };

  const _listItemClickListener = (item: typeof arrayData[0]) => {
    toggleModal(false);
    updateSelectedFlag(true);
    updateSelectedCountry(item);
    updateArrayData(CountryJSON);
    props.selectedValue && props.selectedValue(item.callingCode);
  };

  const selectDefaultCountry = (
    defaultText: string,
    dropDownImage: ImageSourcePropType,
    hideCountryFlag: boolean,
    hideCountryCode: boolean,
    selectedCountryTextStyle: TextStyle
  ) => {
    const newData = CountryJSON.filter(function (item) {
      const itemData = item.callingCode;
      const textData = defaultText;
      return itemData === textData;
    });
    return (
      <View>
        <View style={styles.selectedCountryContainer}>
          {hideCountryFlag ? null : (
            <Image
              source={{ uri: newData[0].flag }}
              style={[styles.countryFlagContainer, props.countryFlagContainer]}
            />
          )}
          {hideCountryCode ? null : (
            <Text style={selectedCountryTextStyle}>{"+" + defaultText}</Text>
          )}

          <Image
            source={dropDownImage}
            style={[styles.dropDownImageStyle, props.dropDownImageStyle]}
          />
        </View>
      </View>
    );
  };

  const renderListItems = ({ item }: { item: typeof arrayData[0] }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => _listItemClickListener(item)}>
          <View style={styles.listViewRowContainer}>
            {props.hideCountryFlag ? null : (
              <Image
                source={{ uri: item.flag }}
                style={styles.countryFlagContainer}
              />
            )}
            <View style={styles.countryTitleView}>
              <Text
                style={[
                  styles.countryNameTextStyle,
                  props.countryNameTextStyle,
                ]}
              >
                {item.name[props.language]}
              </Text>
              <Text
                style={[
                  styles.countryNameTextStyle,
                  props.countryNameTextStyle,
                ]}
              >
                {`(+${item.callingCode})`}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={props.containerStyle}>
      {selectedFlag ? (
        <TouchableOpacity
          disabled={props.disable}
          onPress={() => toggleModal(true)}
          //activeOpacity={0.7}
        >
          <View style={styles.selectedCountryContainer}>
            {props.hideCountryFlag ? null : (
              <Image
                source={{
                  uri: selectedCountry?.flag || "",
                }}
                style={[
                  styles.countryFlagContainer,
                  props.countryFlagContainer,
                ]}
              />
            )}
            {props.hideCountryCode ? null : (
              <Text style={props.selectedCountryTextStyle}>
                {"+" + selectedCountry?.callingCode || ""}
              </Text>
            )}

            <Image
              source={props.dropDownImage}
              style={[styles.dropDownImageStyle, props.dropDownImageStyle]}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={props.disable}
          onPress={() => toggleModal(true)}
          activeOpacity={0.7}
        >
          <View style={styles.selectedCountryContainer}>
            {selectDefaultCountry(
              props.countryCode,
              props.dropDownImage,
              props.hideCountryFlag,
              props.hideCountryCode,
              props.selectedCountryTextStyle
            )}
          </View>
        </TouchableOpacity>
      )}

      <Modal
        animationType={props.animationType}
        visible={modalVisible}
        onRequestClose={() => toggleModal(false)}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={[styles.searchBarContainer, props.searchBarContainerStyle]}
          >
            <TouchableOpacity
              disabled={props.disable}
              activeOpacity={0.5}
              style={styles.backBtnContainer}
              onPress={() => {
                updateArrayData(CountryJSON);
                toggleModal(false);
              }}
            >
              <Image
                resizeMode="center"
                style={styles.backImageStyle}
                source={props.backButtonImage}
              />
            </TouchableOpacity>

            {hidePickerTitle ? null : (
              <Text style={props.pickerTitleStyle}>{props.pickerTitle}</Text>
            )}

            {hideSearchBar ? null : (
              <TextInput
                style={props.searchBarStyle}
                onChangeText={searchFilterFunction}
                placeholder={props.searchBarPlaceHolder}
                keyboardType="default"
                returnKeyType={"done"}
                blurOnSubmit={true}
              />
            )}

            <TouchableOpacity
              disabled={props.disable}
              activeOpacity={0.5}
              style={styles.searchImageStyle}
              onPress={() => {
                toggleSearchBar(!hideSearchBar);
                togglePickerTitle(!hidePickerTitle);
              }}
            >
              <Image
                resizeMode="center"
                style={styles.searchImageStyle}
                source={props.searchButtonImage}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            overScrollMode="never"
            style={{ paddingTop: 10 }}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            initialNumToRender={50}
            data={arrayData}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderListItems}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
export default CountryPicker;
CountryPicker.defaultProps = {
  disable: false,
  animationType: "slide",
  hideCountryFlag: false,
  hideCountryCode: false,
  dropDownImage: require("./res/ic_drop_down.png"),
  backButtonImage: require("./res/ic_back_black.png"),
  searchButtonImage: require("./res/ic_search.png"),
  countryCode: "92",
  searchBarPlaceHolder: "Search...",
  containerStyle: {
    height: 60,
    width: 250,
    marginBottom: 10,
    justifyContent: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#303030",
    backgroundColor: "white",
  },
  searchBarStyle: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 10,
  },
  countryNameTextStyle: {
    color: "#000",
    textAlign: "right",
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "#000",
    textAlign: "right",
  },
  pickerTitleStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  selectedValue: "",
  pickerTitle: "",
  language: "en",
};

export interface CountryPickerProps {
  animationType?: "none" | "slide" | "fade" | undefined;
  containerStyle?: ViewStyle;
  searchBarStyle?: ViewStyle;
  searchBarContainerStyle?: ViewStyle;
  pickerTitleStyle?: TextStyle;
  countryNameTextStyle?: TextStyle;
  selectedCountryTextStyle?: TextStyle;
  dropDownImage?: ImageSourcePropType;
  backButtonImage?: ImageSourcePropType;
  searchButtonImage?: ImageSourcePropType;
  dropDownImageStyle?: ImageStyle;
  countryFlagContainer?: ImageStyle;
  countryCode?: string;
  hideCountryFlag?: boolean;
  hideCountryCode?: boolean;
  searchBarPlaceHolder?: string;
  pickerTitle?: string;
  disable?: boolean;
  selectedValue?: Function;
  language:
    | "en"
    | "cym"
    | "deu"
    | "fra"
    | "hrv"
    | "ita"
    | "jpn"
    | "nld"
    | "por"
    | "rus"
    | "spa"
    | "svk"
    | "fin"
    | "zho"
    | "isr"
    | "ar";
}
const styles = StyleSheet.create({
  divider: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#D3D3D3",
    width: "95%",
    height: 0.8,
  },
  selectedCountryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listViewRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  countryTitleView: {
    flexDirection: "row",
  },
  searchImageStyle: {
    width: 45,
    height: "100%",
    padding: 10,
    justifyContent: "flex-end",
    alignSelf: "center",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  countryNameTextStyle: {
    paddingHorizontal: 2.5,
    color: "#000",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  countryFlagContainer: {
    width: 32,
    marginHorizontal: 5,
    height: 25,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownImageStyle: {
    width: 10,
    marginLeft: 5,
    paddingRight: 5,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    height: 56,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,9)",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
  },
  backBtnContainer: {
    paddingStart: 20,
    height: "100%",
    justifyContent: "center",
  },
  backImageStyle: {
    width: 30,
    height: 30,
    alignSelf: "center",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
});
