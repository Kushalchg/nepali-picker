import { View, StyleSheet } from 'react-native';

const PencilIcon = ({ height = 30, width = 10 }) => {
  return (
    <View style={{ ...styles.container, height: height, width: width }}>
      {/* Eraser */}
      <View
        style={{
          height: '40%',
          width: '100%',
          borderTopStartRadius: 3,
          borderTopEndRadius: 3,
          borderWidth: 0.7,
        }}
      >
        <View
          style={{
            top: '50%',
            width: '100%',
            borderWidth: 0.7,
          }}
        />
      </View>

      {/* Body */}
      <View
        style={{
          height: '90%',
          width: '100%',
          borderWidth: 0.7,
        }}
      >
        <View
          style={{
            left: '50%',
            height: '100%',
            width: 0,
            borderWidth: 0.2,
          }}
        />
      </View>
      {/* tip of pencil
      <View>
        <View style={styles.triangle} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    marginHorizontal: 'auto',
    justifyContent: 'center',
  },
  // Eraser part of the pencil
  eraserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eraser: {
    width: 12,
    height: '90%',
    backgroundColor: '#FF7F50', // Eraser color
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  eraserTop: {
    width: 5,
    height: '90%',
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
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: '#000',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: 12,
  },
});

export default PencilIcon;
