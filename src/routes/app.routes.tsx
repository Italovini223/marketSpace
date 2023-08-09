import { Platform } from "react-native";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { useTheme } from "native-base";

import { useAuth } from "@hooks/useAuth";

import { Home } from "@screens/Home";
import { Product } from "@screens/Product";
import { MyProducts } from "@screens/MyProduct";
import { New } from "@screens/New";
import { PreView } from "@screens/PreView";

import { House, Tag, SignOut } from 'phosphor-react-native'
import { useEffect } from "react";
import { Loading } from "@components/Loading";
import { color } from "native-base/lib/typescript/theme/styled-system";

type AppRoutes = {
  home: undefined;
  product: { id: string};
  myProducts: undefined;
  logout: undefined;
  new: undefined;
  preView: undefined
  singOut: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>
export function AppRoutes(){
  const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

  

  const { sizes, colors } = useTheme()
  const iconsSize = sizes[6]


  return(
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[700],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.gray[100],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 96 : 56,

      }
      
    }}>
      <Screen 
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House 
              color={color}
              size={iconsSize}
            />
          )
        }}
      />

      <Screen 
        name="product"
        component={Product}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />

      <Screen 
        name="myProducts"
        component={MyProducts}
        options={{
          tabBarIcon: ({ color }) => (
            <Tag 
              color={color}
              size={iconsSize}
            />
          ),

        }}
      />

      <Screen 
        name="new"
        component={New}
        options={{
          tabBarButton: () => undefined,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />

      <Screen 
        name="preView"
        component={PreView}
        options={{
          tabBarButton: () => undefined,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />

      <Screen 
        name="singOut"
        component={() => {
          const { singOut } = useAuth()
          useEffect(() => {
            const getOut = async () => {
              await singOut()
            }
            getOut()
          }, [])

          return <Loading />
        }}  
        options={{
          tabBarIcon: () => (
            <SignOut 
              size={iconsSize}
              color={colors.orange[500]}
            />
          )
        }}
      />

    </Navigator>

  )
}

export function AppStackNavigator(){
  
}