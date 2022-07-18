import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Navigation } from '../types';
import HomePage from '../screens/HomePage';
import NFTScreen from './NFTScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from './Profile';

type Props = {
  navigation: Navigation;
};

const Tab = createMaterialBottomTabNavigator();

const Dashboard = ({ navigation }: Props) => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#8ddfa3"
      barStyle={{ backgroundColor: '#2a4876' }}
    >
      <Tab.Screen
        name="Home"
        children={()=><HomePage navigation={navigation} />}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="NFT"
        children={()=><NFTScreen navigation={navigation} />}

        options={{
          tabBarLabel: 'NFTs',
          
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="image" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        children={()=><Profile navigation={navigation} />}
        options={{
          tabBarLabel: 'Profil',
          
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      / >
    </Tab.Navigator>
  </NavigationContainer>
);

export default memo(Dashboard);
