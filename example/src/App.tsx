import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BsToAd } from 'react-native-rn-nepali-calendar-picker';
import { CalendarPicker } from 'react-native-rn-nepali-calendar-picker';

export default function App() {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <View>
        <CalendarPicker visible={visible} onClose={() => setVisible(false)} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.text}>Open Calendar</Text>
      </TouchableOpacity>
      <View>
        <Text>{BsToAd('3085-09-12')}</Text>
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
