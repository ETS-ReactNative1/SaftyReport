import * as React from 'react';
import { ActivityIndicator, View, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tabs from './navigation/tab';
import addReport from './screen/addReport';
import viewMore from './screen/viewMore';
import DrawerContent from './screen/drawerContent';
import LoginScreen from './screen/auth/LoginScreen';
import SignUp from './screen/auth/SignUp';
import { AuthContext } from './components/context';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}} />
        <Stack.Screen name ="AddReport" component={ addReport } options={{ title: 'Add Report' }} />
        <Stack.Screen name ="ViewMore" component={ viewMore } options={{ title: 'More Detail', }} />
        <Stack.Screen name="Root" component={Root} />
      </Stack.Navigator>
  )
}

function SignInUp(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={LoginScreen} options={{headerShown:false}} />
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default function App() {
const [isLoading, setIsLoading] = React.useState(true);
const [userToken, setUserToken] = React.useState(null);

const authContext = React.useMemo(()=> ({
  signIn: () => {
    setUserToken('asdf');
    setIsLoading(false);
  },
  signOut: () => {
    setUserToken(null);
    setIsLoading(false);
  },
  signUp: () => {
    setUserToken('asdf');
    setIsLoading(false);
  },
}));

React.useEffect(()=> {
  setTimeout(() => {
    setIsLoading(false);
  }, 1000)
},[]);

if( isLoading) {
  return (
    <View style={{flex:1,justifyContent:'center',alignContent:'center', backgroundColor:"#5892f6"}}>
      <Image style={{resizeMode:'contain'}} source={require('./assets/img/1Screen.png')} />
    </View>
  )
}

  return (
    <SafeAreaProvider>
    <PaperProvider>
    <AuthContext.Provider value={authContext} >
    <NavigationContainer>
      { userToken == null ? (
      <SignInUp />
      ):(
      <Drawer.Navigator drawerContent={prop => <DrawerContent {...prop}/>}  >
        <Drawer.Screen name="Home" component={Root} />
    </Drawer.Navigator>
      )
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
    </SafeAreaProvider>
  );
}

