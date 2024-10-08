import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  AdToBs,
  BsToAd,
  CalendarPicker,
  NepaliToday,
} from 'react-native-nepali-picker';

export default function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>();

  const onPicked = (date: string) => {
    setDate(date);
  };

  return (
    <View style={styles.container}>
      <View>
        <CalendarPicker
          visible={visible}
          onClose={() => setVisible(false)}
          onDateSelect={onPicked}
          language="np"
          theme="light"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.text}>Open Calendar</Text>
      </TouchableOpacity>
      <View>
        <Text>{date}</Text>
        <Text>{AdToBs('2000-09-21')}</Text>
        <Text>{BsToAd('2056-01-01')}</Text>
        <Text>{NepaliToday()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: '#fe6684',
    marginBottom: 10,
  },

  text: {
    color: '#000',
    fontSize: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
