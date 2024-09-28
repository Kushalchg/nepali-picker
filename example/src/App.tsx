import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CalendarPicker } from 'react-native-rn-nepali-calendar-picker';

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
          brandCOlor={''}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.text}>Open Calendar</Text>
      </TouchableOpacity>
      <View>
        <Text>{date}</Text>
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
