import { View, Text, StyleSheet } from 'react-native';
const DateSyncLogo = ({ size = 28, color = '#003a05', day = 0 }) => {
  const scale = size / 24;

  // Format the date as DD

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Calendar base */}
      <View style={[styles.calendarBase, { borderColor: color }]}>
        {/* Date text */}
        <Text style={[styles.dateText, { color: color, fontSize: 9 * scale }]}>
          {day}
        </Text>
      </View>

      {/* Calendar top */}
      <View
        style={[styles.calendarTop, { borderColor: color, top: 2 * scale }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    position: 'relative',
  },
  calendarBase: {
    position: 'absolute',
    left: '12.5%',
    top: '12.5%',
    width: '75%',
    height: '75%',
    borderWidth: 2,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontWeight: '800',
  },
  calendarTop: {
    position: 'absolute',
    left: '12.5%',
    width: '75%',
    height: '20%',
    borderTopWidth: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
  },
  syncCircle: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncArrow: {
    position: 'absolute',
    width: '40%',
    height: '40%',
    borderWidth: 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    transform: [{ rotate: '45deg' }],
  },
  syncArrowLeft: {
    left: '15%',
    top: '10%',
  },
  syncArrowRight: {
    right: '15%',
    bottom: '10%',
    transform: [{ rotate: '225deg' }],
  },
});

export default DateSyncLogo;
