import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CountryPicker from 'rn-country-picker';

const App = () => {
  const [countryCode, setCountryCode] = useState<string>('91');

  const selectedValue = (value: string) => {
    setCountryCode(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>React Native Country Picker</Text>

      <CountryPicker
        disable={false}
        animationType={'slide'}
        language="en"
        containerStyle={styles.pickerStyle}
        pickerTitleStyle={styles.pickerTitleStyle}
        dropDownImage={require('./res/ic_drop_down.png')}
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        pickerTitle={'Country Picker'}
        searchBarPlaceHolder={'Search......'}
        hideCountryFlag={true}
        hideCountryCode={false}
        searchBarStyle={styles.searchBarStyle}
        backButtonImage={require('./res/ic_back_black.png')}
        searchButtonImage={require('./res/ic_search.png')}
        countryCode={countryCode}
        selectedValue={selectedValue}
      />
      <CountryPicker
        disable={false}
        animationType={'slide'}
        language="en"
        containerStyle={styles.pickerStyle}
        pickerTitleStyle={styles.pickerTitleStyle}
        dropDownImage={require('./res/ic_drop_down.png')}
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        pickerTitle={'Country Picker'}
        searchBarPlaceHolder={'Search......'}
        hideCountryFlag={false}
        hideCountryCode={true}
        searchBarStyle={styles.searchBarStyle}
        backButtonImage={require('./res/ic_back_black.png')}
        searchButtonImage={require('./res/ic_search.png')}
        countryCode={countryCode}
        selectedValue={selectedValue}
      />

      <CountryPicker
        disable={false}
        animationType={'slide'}
        language="ar"
        containerStyle={styles.pickerStyle}
        pickerTitleStyle={styles.pickerTitleStyle}
        dropDownImage={require('./res/ic_drop_down.png')}
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        pickerTitle={'Country Picker'}
        searchBarPlaceHolder={'Search......'}
        hideCountryFlag={false}
        hideCountryCode={false}
        searchBarStyle={styles.searchBarStyle}
        backButtonImage={require('./res/ic_back_black.png')}
        searchButtonImage={require('./res/ic_search.png')}
        countryCode={'1'}
        selectedValue={selectedValue}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleText: {
    color: '#000',
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  pickerStyle: {
    height: 54,
    width: 150,
    marginVertical: 10,
    borderColor: '#303030',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    fontSize: 16,
    color: '#000',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
  },
});
