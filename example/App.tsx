import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CountryPicker from 'rn-country-picker';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mCountryCode: '91',
    };
  }

  _selectedValue = index => {
    this.setState({mCountryCode: index});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>React Native Country Picker</Text>

        <CountryPicker
          disable={false}
          animationType={'slide'}
          language="ar"
          containerStyle={styles.pickerStyle}
          pickerTitleStyle={styles.pickerTitleStyle}
          //dropDownImage={require('../res/ic_back_black.png')}
          selectedCountryTextStyle={styles.selectedCountryTextStyle}
          countryNameTextStyle={styles.countryNameTextStyle}
          pickerTitle={'Country Picker'}
          searchBarPlaceHolder={'Search......'}
          hideCountryFlag={false}
          hideCountryCode={false}
          searchBarStyle={styles.searchBarStyle}
          // backButtonImage={require('../res/ic_back_black.png')}
          // searchButtonImage={require('../res/ic_search.png')}
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
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  pickerStyle: {
    height: 60,
    width: 250,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#303030',
    backgroundColor: 'white',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
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
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
});
