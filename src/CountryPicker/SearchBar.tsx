
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  I18nManager,
} from "react-native";
const SearchBar = (props) => {
const [text, setText]=useState('')

  return (
    <View style={[styles.searchBarStyle, props.searchBarContainerStyle]}>
      
   
        <Image
          resizeMode="center"
          style={styles.imageStyle}
          source={props.searchButtonImage}
        />

      {!props.hideSearchBar && (
        <TextInput
        style={{flex:1}}
           onChangeText={
            props.searchByCountryNameCode
           
          }
          onChange={(event)=>{
            const {eventCount, target, text} = event.nativeEvent;
            setText(text)
          }  
        }
          placeholderTextColor={"#A9A9A9"}
          placeholder={props.searchBarPlaceHolder}
          keyboardType="default"
          returnKeyType={"done"}
          blurOnSubmit={true}
        />
      )}

        {text &&  <Image
          resizeMode="center"
          style={styles.imageStyle}
          source={props.closeButtonImage}
        />}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
  },

  searchBarStyle: {
    margin: 10,
    flexDirection: 'row',
    height: 45,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
  },
  imageStyle: {
    width: 45,
    height: 45,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
});
