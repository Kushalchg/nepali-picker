import { View, StyleSheet } from 'react-native';

const PencilIcon = () => {
  return (
    <View style={styles.container}>
      {/* Eraser */}
      <View
        style={{
          height: 14,
          width: 10,
          borderTopStartRadius: 3,
          borderTopEndRadius: 3,
          borderWidth: 0.7,
        }}
      >
        <View
          style={{
            top: '80%',
            width: 9,
            borderWidth: 0.7,
          }}
        />
      </View>

      {/* Body */}
      <View
        style={{
          height: 34,
          width: 10,
          borderWidth: 0.7,
        }}
      >
        <View
          style={{
            left: '50%',
            height: 34,
            width: 0,
            borderWidth: 0.2,
          }}
        />
      </View>
      {/* tip of pencil */}
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Eraser part of the pencil
  eraserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eraser: {
    width: 12,
    height: 25,
    backgroundColor: '#FF7F50', // Eraser color
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  eraserTop: {
    width: 5,
    height: 25,
    backgroundColor: '#D3D3D3', // Metal holding the eraser
  },
  // Pencil body

  // Tip of the pencil
  tipContainer: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    borderBottomWidth: 25,
    borderBottomColor: '#FFD700', // Yellow continues to the tip
    position: 'relative',
  },
  tip: {
    position: 'absolute',
    bottom: -25,
    left: -15,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 15,
    borderBottomColor: '#8B4513', // Brownish color for pencil wood
  },
  sharpTip: {
    position: 'absolute',
    bottom: -40,
    left: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: '#000', // Pencil lead
  },
});

export default PencilIcon;
