import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import SearchScreen from '../search/SearchScreen';
import CalendarScreen from '../calendar/CalendarScreen';
import { useTheme } from '../../context/ThemeContext';

const Tab = createBottomTabNavigator();

const HomeScreenWithFloatingButton = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

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

const MainTab = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert("종료 확인", "앱을 종료하시겠습니까?", [
          {
            text: "취소",
            onPress: () => null,
            style: "cancel"
          },
          { text: "확인", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: theme === 'dark' ? '#fc7a1e' : '#fc7a1e',
          tabBarInactiveTintColor: theme === 'dark' ? '#ccc' : '#000',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
            backgroundColor: theme === 'dark' ? '#121212' : '#fff',
          },
          headerTitleAlign: 'center',
          headerTintColor: theme === 'dark' ? '#fff' : '#000',
          headerTitleStyle: { fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' },
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
                <MaterialIcons name="settings" size={24} color={theme === 'dark' ? '#fff' : '#000'} style={{ marginRight: 15 }} />
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
    </>
  );
};

const createStyles = (theme) => StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme === 'dark' ? '#fc7a1e' : '#fc7a1e',
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
