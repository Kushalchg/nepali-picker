import { View, StyleSheet } from 'react-native';

const Triangle = ({ width = 10, height = 20, color = 'black' }) => {
  return (
    <View
      style={[
        styles.triangle,
        {
          borderLeftWidth: width / 2,
          borderRightWidth: width / 2,
          borderBottomWidth: height,
          borderBottomColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    transform: [{ rotate: '180deg' }],
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default Triangle;
