import { View, StyleSheet } from 'react-native';

const PencilIcon = ({ height = 20, width = 10 }) => {
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
      {/* tip of pencil */}
      {/* <View style={{ height: '30%', width: '100%', backgroundColor: '#000' }}>
        <View />
      </View> */}
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 4,
          borderRightWidth: 4,
          borderBottomWidth: 0,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopWidth: 8,
        }}
      />
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
});

export default PencilIcon;
