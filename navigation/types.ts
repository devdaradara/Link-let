import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/** MainTab */
export type MainTabParamList = {
  Home: { refresh?: boolean };
  AddLink: undefined;
  Settings: undefined;
};

export type MainTabNavigationScreenParams = NavigatorScreenParams<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>;

/** RootStack */
export type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  CategorySelection: { onSelect: (category: string) => void };
  AddLinkDetails: { category: string };
  AddCategory: undefined;
  LinkCard: { id: string };
  CategoryNotes: { category: string };
};
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
