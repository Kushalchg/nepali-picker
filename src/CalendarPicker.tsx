import { type ReactNode } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

interface CalendarPickerPoros {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
}

const CalendarPicker = ({
  children,
  visible,
  onClose,
}: CalendarPickerPoros) => {
  return (
    <Modal visible={visible}>
      <Pressable style={styles.outerPressable} onPress={onClose}>
        <Pressable onPress={() => {}} style={styles.innerPressable}>
          <View style={styles.innerView}>
            <Text>{visible}</Text>
            <Text>CalendarPicker</Text>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  outerPressable: {
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.54)',
  },
  innerPressable: {
    height: '60%',
    borderRadius: 20,
    marginHorizontal: 30,
  },
  innerView: {
    height: '100%',
    backgroundColor: '#F2F2F2',
  },
});
export default CalendarPicker;
