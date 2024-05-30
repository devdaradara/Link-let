import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShortLinkCard from '../../components/LinkCard/ShortLinkCard';
import Clipboard from '@react-native-clipboard/clipboard';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
  memo: string;
  createdAt: string;
}

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [logs, setLogs] = useState<Link[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Link[]>([]);
  const navigation = useNavigation();

  const fetchLinks = async () => {
    try {
      const storedLinks = await AsyncStorage.getItem('links');
      if (storedLinks) {
        const parsedLinks = JSON.parse(storedLinks);
        setLogs(parsedLinks);
        const filtered = parsedLinks.filter(
          log => format(new Date(log.createdAt), 'yyyy-MM-dd') === selectedDate,
        );
        setFilteredLogs(filtered);
      } else {
        console.log("No links found in storage.");
      }
    } catch (error) {
      console.error("Error fetching links: ", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [selectedDate]);

  const markedDates = useMemo(() => {
    const dates = logs.reduce((acc, current) => {
      const formattedDate = format(new Date(current.createdAt), 'yyyy-MM-dd');
      acc[formattedDate] = { marked: true };
      return acc;
    }, {});

    dates[selectedDate] = { ...dates[selectedDate], selected: true, selectedColor: '#fc7a1e' };
    return dates;
  }, [logs, selectedDate]);

  const handleCopy = (url: string) => {
    Clipboard.setString(url);
    Alert.alert('URL 복사됨', 'URL이 클립보드에 복사되었습니다.');
  };

  const handlePress = (id: string) => {
    navigation.navigate('LinkCard', { id });
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#fc7a1e',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#fc7a1e',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#fc7a1e',
          selectedDotColor: '#ffffff',
          arrowColor: '#fc7a1e',
          monthTextColor: '#fc7a1e',
          indicatorColor: '#fc7a1e',
        }}
      />
      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShortLinkCard
            key={item.id}
            title={item.title}
            url={item.url}
            createdAt={item.createdAt}
            onCopy={() => handleCopy(item.url)}
            onPress={() => handlePress(item.id)}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
});

export default CalendarScreen;
