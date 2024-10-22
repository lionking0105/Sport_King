import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initUser} from '../redux/features/userSlice';
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreens from '../screens/Onboardings';
import { moderateScale } from "react-native-size-matters";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getHeaderTitle, Home } from "./";
import CoinsHeaderDisplay from '../components/CoinsHeaderDisplay';
import ConnectOptions from '../screens/ConnectOptions';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ResetPasswordScreen from '../screens/ResetPassword';
import GameDetailsScreen from '../screens/GameDetailsScreen';
{ /* import { getHeaderTitle, Home } from "./index";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen"; */}


export const rootDrawerNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [isFirstRun, setIsFirstRun] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getToken()
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("jsWebToken");
    setToken(token);

    // console.log("Token before", token)
    if(token){
      dispatch(initUser({ jsWebToken: token }));
      setIsFirstRun(true)
    }else{
      setIsFirstRun(false);
    }
  };

  getToken();

  if(isFirstRun === ""){
    return (
      <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size="large" color="#fff"/>
      </View>
    )
  }
  return(
    <Stack.Navigator
      initialRouteName={isFirstRun?  'Home' : 'onBoardings' }
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1C0C4F",
          paddingRight: moderateScale(-200)
        }
      }}
    >
      <Stack.Screen name="ConnectOptions" component={ConnectOptions} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}}/>
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="onBoardings" component={OnBoardingScreens} options={{ headerShown: false }} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ route, navigation }) => ({
          headerShown: getHeaderTitle(route),
          title: "",
          headerLeft: () => (
            <View>
              <Text style={{ color: "#ffffff", fontSize: moderateScale(16), fontWeight: "bold"}}>{getHeaderTitle(route) || "Home"}</Text>
            </View>
          ),
          /* headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: moderateScale(15)}}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            >
              <MaterialIcons name="menu" size={moderateScale(24)} color="#fff" />
            </TouchableOpacity>
          ), */
          headerRight: () => ( <CoinsHeaderDisplay />),
          headerTintColor: "#fff",
        })}
      />
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerTintColor: "#fff",
          headerRight: () => ( <CoinsHeaderDisplay />),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: moderateScale(15)}}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            >
              <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      {/* <Stack.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: "#fff",
          headerRight: () => ( <CoinsHeaderDisplay />),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: moderateScale(15)}}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            >
              <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={({ navigation }) => ({
          headerTitle: "Opsyon",
          headerTintColor: "#fff",
          headerRight: () => ( <CoinsHeaderDisplay />),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: moderateScale(15)}}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            >
              <MaterialIcons name="arrow-back" size={moderateScale(24)} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />*/}
    </Stack.Navigator>
  )
};
