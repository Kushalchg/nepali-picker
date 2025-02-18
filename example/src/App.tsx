import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  AdToBs,
  BsToAd,
  NepaliToday,
  CalendarPicker,
} from 'react-native-nepali-picker';

export default function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>();

  const onDateSelect = (PickedDate: string) => {
    setDate(PickedDate);
  };

  return (
    <View style={styles.container}>
      <View>
        {/* actual picker component */}
        <CalendarPicker
          visible={visible}
          onClose={() => setVisible(false)}
          initialDate="2011-1-11"
          onDateSelect={onDateSelect}
          language="np"
          theme="light"

          //dayTextStyle={{ fontSize: 14, }}
          //weekTextStyle={{ fontSize: 15, }}
          //titleTextStyle={{ fontSize: 20, }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.text}>Open Calendar</Text>
      </TouchableOpacity>
      <View>
        <Text>{date}</Text>
        {/* convert date on AD to BS equivalent date: required format is (YYYY-MM-DD) */}
        <Text>{AdToBs('2000-09-21')}</Text>

        {/* convert date on BS to AD equivalent date: required  format is (YYYY-MM-DD)  */}
        <Text>{BsToAd('2081-11-06')}</Text>
        {/* This function will return the current nepali date: return value is string and format is (YYYY-MM-DD) */}
        <Text>{NepaliToday()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff3f3',
    justifyContent: 'center',
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#4400ff',
    marginBottom: 10,
  },

  text: {
    color: '#fff',
    fontSize: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
