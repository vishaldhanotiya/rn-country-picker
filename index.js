/**
 * @format
 */import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryJSON from './src/CountryPicker/countries.json';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : 56;
const PADDING_TOP = Platform.OS === 'ios' ? 20 : 0;

export default class CountryPicker extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      selectedCountryFlag: '',
      hidePickerTitle: false,
      hideSearchBar: true,
      arrayData: CountryJSON,
      modalVisible: false,
      selectedFlag: false,
    };
  }

  _searchFilterFunction(searchText) {
    if (/^-{0,1}\d+$/.test(searchText)) {
      var newData = CountryJSON.filter(function (item) {
        const itemData = item.callingCode;
        const textData = searchText;
        return itemData.startsWith(textData);
      });
    } else {
      var newData = CountryJSON.filter(function (item) {
        const itemData = item.name.common.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.startsWith(textData);
      });
    }
    this.setState({
      arrayData: [...newData],
    });
  }

  _listItemClickListener(item) {
    this.setState({
      modalVisible: false,
      selectedFlag: true,
      selectedCountryCode: item.callingCode,
      selectedCountryFlag: item.flag,
      selectedCountryName: item.name.common,
      arrayData: CountryJSON,
    });
    this.props.selectedValue(item.callingCode);
  }

  static _selectDefaultCountry(
    defaultText,
    dropDownImage,
    hideCountryFlag,
    hideCountryCode,
    selectedCountryTextStyle,
  ) {
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
              source={{uri: newData[0].flag}}
              style={styles.countryFlagContainer}
            />
          )}
          {hideCountryCode ? null : (
            <Text style={selectedCountryTextStyle}>{'+' + defaultText}</Text>
          )}

          <Image source={dropDownImage} style={styles.dropDownImageStyle} />
        </View>
      </View>
    );
  }

  _renderListItems(item, index) {
    return (
      <View>
        <TouchableOpacity onPress={() => this._listItemClickListener(item)}>
          <View style={styles.listViewRowContainer}>
            {this.props.hideCountryFlag ? null : (
              <Image
                source={{uri: item.flag}}
                style={styles.countryFlagContainer}
              />
            )}
            <Text style={this.props.countryNameTextStyle}>
              {item.name.common + ' (+' + item.callingCode + ')'}
            </Text>
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        {this.state.selectedFlag ? (
          <TouchableOpacity
            disabled={this.props.disable}
            onPress={() => this.setState({modalVisible: true})}
            activeOpacity={0.7}>
            <View style={styles.selectedCountryContainer}>
              {this.props.hideCountryFlag ? null : (
                <Image
                  source={{
                    uri: this.state.selectedCountryFlag,
                  }}
                  style={styles.countryFlagContainer}
                />
              )}
              {this.props.hideCountryCode ? null : (
                <Text style={this.props.selectedCountryTextStyle}>
                  {'+' + this.state.selectedCountryCode}
                </Text>
              )}

              <Image
                source={this.props.dropDownImage}
                style={styles.dropDownImageStyle}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={this.props.disable}
            onPress={() => this.setState({modalVisible: true})}
            activeOpacity={0.7}>
            <View style={styles.selectedCountryContainer}>
              {CountryPicker._selectDefaultCountry(
                this.props.countryCode,
                this.props.dropDownImage,
                this.props.hideCountryFlag,
                this.props.hideCountryCode,
                this.props.selectedCountryTextStyle,
              )}
            </View>
          </TouchableOpacity>
        )}

        <Modal
          animationType={this.props.animationType}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <View elevation={10} style={styles.searchBarContainer}>
            <TouchableOpacity
              disabled={this.props.disable}
              activeOpacity={0.5}
              style={styles.backBtnContainer}
              onPress={() =>
                this.setState({arrayData: CountryJSON, modalVisible: false})
              }>
              <Image
                resizeMode="center"
                style={styles.backImageStyle}
                source={this.props.backButtonImage}
              />
            </TouchableOpacity>

            {this.state.hidePickerTitle ? null : (
              <Text style={this.props.pickerTitleStyle}>
                {this.props.pickerTitle}
              </Text>
            )}

            {this.state.hideSearchBar ? null : (
              <TextInput
                style={this.props.searchBarStyle}
                onChangeText={(text) => this._searchFilterFunction(text)}
                placeholder={this.props.searchBarPlaceHolder}
                keyboardType="default"
                returnKeyType={'done'}
                blurOnSubmit={true}
              />
            )}

            <TouchableOpacity
              disabled={this.props.disable}
              activeOpacity={0.5}
              style={styles.searchImageStyle}
              onPress={() =>
                this.setState({
                  hideSearchBar: !this.state.hideSearchBar,
                  hidePickerTitle: !this.state.hidePickerTitle,
                })
              }>
              <Image
                resizeMode="center"
                style={styles.searchImageStyle}
                source={this.props.searchButtonImage}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            overScrollMode="never"
            style={{paddingTop: 10}}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            initialNumToRender={50}
            // onScroll={this._handleScroll}
            data={this.state.arrayData}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => this._renderListItems(item, index)}
          />
        </Modal>
      </View>
    );
  }
}

CountryPicker.propTypes = {
  animationType: PropTypes.any,
  containerStyle: PropTypes.object,
  searchBarStyle: PropTypes.object,
  pickerTitleStyle: PropTypes.object,
  countryNameTextStyle: PropTypes.object,
  selectedCountryTextStyle: PropTypes.object,
  dropDownImage: PropTypes.any,
  backButtonImage: PropTypes.any,
  searchButtonImage: PropTypes.any,
  countryCode: PropTypes.any,
  hideCountryFlag: PropTypes.bool,
  hideCountryCode: PropTypes.bool,
  searchBarPlaceHolder: PropTypes.string,
  pickerTitle: PropTypes.string,
  disable: PropTypes.bool,
};
CountryPicker.defaultProps = {
  disable: false,
  animationType: 'slide',
  hideCountryFlag: false,
  hideCountryCode: false,
  dropDownImage: require('../../res/ic_drop_down.png'),
  backButtonImage: require('../../res/ic_back_black.png'),
  searchButtonImage: require('../../res/ic_search.png'),
  countryCode: '91',
  containerStyle: {
    height: 60,
    width: 250,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#303030',
    backgroundColor: 'white',
  },
  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
    textAlign: 'right',
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
};
const styles = StyleSheet.create({
  divider: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#D3D3D3',
    width: '95%',
    height: 0.8,
  },
  selectedCountryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listViewRowContainer: {
    flexDirection: 'row',
    paddingStart: 15,
    margin: 10,
  },
  searchImageStyle: {
    width: 45,
    height: '100%',
    padding: 10,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  countryFlagContainer: {
    width: 32,
    paddingRight: 8,
    height: 25,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownImageStyle: {
    width: 10,
    marginLeft: 5,
    paddingRight: 5,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    paddingTop: PADDING_TOP,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    shadowRadius: 2,
    shadowOpacity: 1.0,
    backgroundColor: 'rgba(255,255,255,9)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: 'black',
    width: '100%',
  },
  backBtnContainer: {
    paddingStart: 20,
    height: '100%',
    justifyContent: 'center',
  },
  backImageStyle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
});



// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
