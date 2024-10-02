import { View, StyleSheet } from 'react-native';

const ChevronIcon = ({ direction = 'right', size = 15, color = '#000' }) => {
  const isLeft = direction === 'left';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.line,
          isLeft ? styles.leftTop : styles.rightTop,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.line,
          isLeft ? styles.leftBottom : styles.rightBottom,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

const EditPencilIcon = ({ size = 24, color = '#000' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.pencilBody, { backgroundColor: color }]} />
      <View style={[styles.pencilTip, { borderBottomColor: color }]} />
      <View style={[styles.pencilEraser, { backgroundColor: '#FFA07A' }]} />
    </View>
  );
};
const Triangle = ({ width = 10, height = 20, color = 'white' }) => {
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
const ChevronDown = ({ size = 10, color = '#000' }) => {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, transform: [{ rotate: '-90deg' }] },
      ]}
    >
      <View
        style={[styles.line, styles.rightTop, { backgroundColor: color }]}
      />
      <View
        style={[styles.line, styles.rightBottom, { backgroundColor: color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    width: '90%',
    height: 2,
  },
  leftTop: {
    top: '15%',
    left: '20%',
    transform: [{ rotate: '45deg' }],
  },
  leftBottom: {
    bottom: '15%',
    left: '20%',
    transform: [{ rotate: '-45deg' }],
  },
  rightTop: {
    top: '15%',
    right: '20%',
    transform: [{ rotate: '-45deg' }],
  },
  rightBottom: {
    bottom: '15%',
    right: '20%',
    transform: [{ rotate: '45deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: 8,
  },
  pencilBody: {
    width: '60%',
    height: '75%',
    position: 'absolute',
    bottom: '12.5%',
    left: '20%',
    transform: [{ skewX: '5deg' }],
  },
  pencilTip: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    position: 'absolute',
    bottom: '12.5%',
    left: '20%',
  },
  pencilEraser: {
    width: '60%',
    height: '10%',
    position: 'absolute',
    top: '12.5%',
    left: '20%',
    transform: [{ skewX: '5deg' }],
  },
});

export { ChevronIcon, ChevronDown, EditPencilIcon, Triangle };
