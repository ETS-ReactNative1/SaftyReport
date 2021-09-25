import * as React from 'react';
import { LogBox } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore  from 'expo-secure-store';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Root from './navigation/root';
import DrawerContent from './screen/drawerContent';
import AuthNav from './navigation/authNav';

import { AuthContext } from './components/context/auth';
import { UserContext } from './components/context/user';

//ปิดคำเตือนจาก goBack หน้า status
LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
]);


const Drawer = createDrawerNavigator();

export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userProfile: action.data,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userProfile: action.data,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userProfile: {
              name:'',
              username:'',
              position:'',
              phone:'',
              email:''
            },
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userProfile: {
        name:'',
        username:'',
        position:'',
        phone:'',
        email:''
      },
    }
  );



  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (userToken !== null){
        try{
          const login = await fetch('http://192.168.1.34:3001/api/auth/retID', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`bearer ${userToken}`
            }
          });

          const response = await login.json();

          dispatch({ type: 'RESTORE_TOKEN', token: userToken, data: response.data });

        }catch(er){
          console.log();
        }
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try{
        const login = await fetch('http://192.168.1.34:3001/api/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        });
        
        const response = await login.json();

        if (response.success === true) {
          console.log(response.data);
          SecureStore.setItemAsync('userToken', response.token)
          .then(
          dispatch({ type: 'SIGN_IN', token: response.token, data: response.data })
          );
          return response;
        }
        else if (response.success === false){
          return response;
        };
      }catch(e){
        console.log(e);
      }
      },
      signOut: () => {
        SecureStore.deleteItemAsync('userToken')
        .then(
        dispatch({ type: 'SIGN_OUT' })
        )
        .catch(error =>{
          console.log(error);
        })
      },
      signUp: async data => {
        try{
          const login = await fetch('http://192.168.1.34:3001/api/auth/register', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: data.name,
                username: data.username,
                position: data.position,
                email: data.email,
                phone: data.phone,
                password: data.password
              })
            });
    
            const response = await login.json();

            if (login.status === 201) {
              SecureStore.setItemAsync('userToken', response.token)
              .then(
              dispatch({ type: 'SIGN_IN', token: response.token, data: response.data })
              );
              return response;
            }
            else if (response.success === false){
              return response;
            }
          }catch(e){
            console.log(e);
          }},
    }),
    []
  );

  return (
    <SafeAreaProvider>
    <PaperProvider>
    <AuthContext.Provider value={authContext} >
    <NavigationContainer>
      { state.userToken == null ? (
      <AuthNav />
      ):(
      <UserContext.Provider value={{state}}>
      <Drawer.Navigator drawerContent={prop => <DrawerContent {...prop}/>}  >
        <Drawer.Screen name="Home" component={Root} />
    </Drawer.Navigator>
    </UserContext.Provider>
      )
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
    </SafeAreaProvider>
  );
}

