import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';


const OnBoardingInfoBox = ({slideNumber})=>{

  const text1 = () => {
    return (
      <View>
        <Text style={styles.headerText}> Free!</Text>
        <Text style={styles.text}>With Sport<Text style={{ color: "#FDE88E"}}>King</Text> you don't need real money, just play with your virtual coins.</Text>
      </View>
    )
  };

  const text2 = () => {
    return (
      <View>
        <Text style={styles.headerText}>Show them who is the <Text style={{ color: "#FDE88E"}}>King</Text>!</Text>
        <Text style={styles.text}>Everyday, play on your favorites games, Challenge other players and aim for the top.</Text>
      </View>
    )
  };

  const text3 = () => {
    return (
      <View>
        <Text style={styles.headerText}>24/7</Text>
        <Text style={styles.text}>More than <Text style={{ color: "#FDE88E"}}>25</Text> different sports {"\n\n"}The biggest sports leagues <Text style={{ color: "#FDE88E"}}>live</Text> and virtual games, {"\n\n"} Just <Text style={{ color: "#FDE88E"}}>Fun</Text> 24/7!</Text>
      </View>
    )
  };

  const renderCorrectText = () => {
    console.log("slide number ",slideNumber);
    switch (slideNumber) {
      case 0:
        return text1();

      case 1:
        return text2();

      case 2:
        return text3();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
      </View>
      {renderCorrectText()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: moderateScale(200),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: moderateScale(15),
    paddingHorizontal: moderateScale(10)
  },
  overlay: {
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    position: "absolute",
    backgroundColor: 'black',
    borderRadius: 5,
    opacity: 0.3
  },
  headerText: {
    alignSelf: "center",
    fontFamily: "GROBOLD",
    color: "#fff",
    fontSize: moderateScale(18),
    marginBottom: moderateScale(10)
  },
  text: {
    textAlign: 'center',
    alignSelf: "center",
    fontFamily: "GROBOLD",
    color: "#fff",
    fontSize: moderateScale(17.5)
  }
});

export default OnBoardingInfoBox;
