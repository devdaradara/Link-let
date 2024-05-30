import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import SearchScreen from '../search/SearchScreen';
import CalendarScreen from '../calendar/CalendarScreen';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  const navigation = useNavigation();
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#fc7a1e',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreenWithFloatingButton}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <MaterialIcons name="settings" size={24} color="#000" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreenWithFloatingButton = () => {
  const navigation = useNavigation();

  const handleAddLink = () => {
    navigation.navigate('CategorySelection', {
      onSelect: (category: string) => {
        navigation.navigate('AddLinkDetails', { category });
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAddLink}
      >
        <MaterialIcons name="add" style={styles.floatingButtonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fc7a1e',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  floatingButtonIcon: {
    color: '#fff',
    fontSize: 30,
  },
});

export default MainTab;
