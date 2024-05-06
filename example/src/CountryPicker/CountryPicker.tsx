import React, { useState } from "react";
import {
  FlatList,
  I18nManager,
  Modal,
  StyleSheet,
  Pressable,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import CountryJSON from "./countries.json";
import SearchBar from "./SearchBar";
import CountryListItem from "./CountryListItem";
import CountryButton from "./CountryButton";

const CountryPicker = (props: CountryPickerProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryJsonProps>();
  const [countryJson, setCountryJson] = useState<any[]>(CountryJSON);
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const [selectedFlag, setSelectedFlag] = useState<boolean>(false);

  const searchByCountryNameCode = (searchText: string) => {
    if (/^-{0,1}\d+$/.test(searchText)) {
      var filteredJson = CountryJSON.filter((item) => {
        return item.callingCode.startsWith(searchText);
      });
    } else {
      var filteredJson = CountryJSON.filter((item) => {
        const itemData =
          item.name[props.language]?.toUpperCase() || item.name[props.language]; // some lanaguage can't be uppercase e.g Arabic, Japenese
        const queryText = searchText?.toUpperCase() || searchText;
        return itemData?.includes(queryText);
      });
    }
    setCountryJson([...filteredJson]);
  };

  const handleItemOnClick = (item: CountryJsonProps) => {
    toggleModal(false);
    setSelectedFlag(true);
    setSelectedCountry(item);
    setCountryJson(CountryJSON);
    props.selectedValue && props.selectedValue(item.callingCode);
  };

  const toggleModal1 = (value: boolean) => {
    toggleModal(value);
  };

  return (
    <View>
      <CountryButton
        {...props}
        toggleModal1={toggleModal1}
        selectedFlag={selectedFlag}
        selectedCountry={selectedCountry}
      />

      <Modal
        transparent
        visible={isModalVisible}
        animationType={props.animationType}
        onRequestClose={() => toggleModal(false)}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <Pressable
            style={styles.onPressClose}
            onPress={() => toggleModal(false)}
          />
          <View style={styles.container}>
            <Pressable
              style={styles.closePress}
              onPress={() => {
                setCountryJson(CountryJSON);
                toggleModal(false);
              }}
            >
              <View style={styles.backDropStyle} />
            </Pressable>
            <SearchBar
              {...props}
              searchByCountryNameCode={searchByCountryNameCode}
            />

            <FlatList
              data={countryJson}
              numColumns={1}
              overScrollMode="never"
              initialNumToRender={50}
              style={styles.flatListStyle}
              keyboardShouldPersistTaps={"handled"}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => (
                <CountryListItem
                  {...item}
                  language={props.language}
                  handleItemOnClick={handleItemOnClick}
                />
              )}
            />
          </View>
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
  dropDownImage: require("../../res/ic_drop_down.png"),
  backButtonImage: require("../../res/ic_back_black.png"),
  searchButtonImage: require("../../res/ic_search.png"),
  closeButtonImage: require("../../res/close.png"),
  countryCode: "91",
  searchBarPlaceHolder: "Search...",
  selectedValue: "",
  pickerTitle: "",
  language: "en",
};
export interface CountryJsonProps {
  currency: "string";
  callingCode: number;
  flag: "string";
  name: {
    en: "string";
    cym: "string";
    deu: "string";
    fra: "string";
    hrv: "string";
    ita: "string";
    jpn: "string";
    nld: "string";
    por: "string";
    rus: "string";
    spa: "string";
    svk: "string";
    fin: "string";
    zho: "string";
    isr: "string";
    ar: "string";
  };
}
export interface CountryPickerProps {
  countryId: any;
  animationType?: "none" | "slide" | "fade" | undefined;
  searchBarContainerStyle?: ViewStyle;
  pickerContainerStyle?: ViewStyle;
  pickerTitleStyle?: TextStyle;
  countryNameTextStyle?: TextStyle;
  selectedCountryTextStyle?: TextStyle;
  dropDownImage?: ImageSourcePropType;
  backButtonImage?: ImageSourcePropType;
  searchButtonImage?: ImageSourcePropType;
  dropDownImageStyle?: ImageStyle;
  countryFlagStyle?: ImageStyle;
  countryCode?: string | any;
  hideCountryFlag?: boolean;
  hideCountryCode?: boolean;
  selectedFlag?: boolean;
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
  container: {
    width: "100%",
    height: "80%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
    paddingBottom: 30,
    bottom: -30,
  },
  fullScreenContainer: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
    paddingBottom: 30,
    bottom: -30,
  },
  safeAreaView: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  onPressClose: { flex: 1 },
  closePress: { alignItems: "center", padding: 10 },

  selectedCountryTextStyle: {
    color: "#000",
    textAlign: "right",
  },
  pickerTitleStyle: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  countryNameTextStyle: {
    color: "#000",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  countryFlagStyle: {
    width: 35,
    height: 25,
    borderRadius: 3,
  },
  flatListStyle: {
    paddingHorizontal: 15,
  },
  backDropStyle: {
    width: 40,
    height: 3,
    borderRadius: 5,
    backgroundColor: "grey",
  },
});
