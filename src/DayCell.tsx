import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getNepaliNumber } from './calendar/config';

type DayCellProps = {
  day: number | null;
  isToday: boolean;
  onPress: (day: number) => void;
  dark: boolean;
  brandColor: string;
  language: 'np' | 'en';
  dayTextStyle?: any;
};

const DayCell = React.memo(
  ({
    day,
    isToday,
    onPress,
    dark,
    brandColor,
    language,
    dayTextStyle,
  }: DayCellProps) => {
    if (!day) {
      return <View style={{ width: '14.28%', paddingVertical: 10 }} />;
    }

    return (
      <TouchableOpacity
        onPress={() => onPress(day)}
        style={{
          width: '14.28%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            paddingHorizontal: 6,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: isToday
              ? brandColor
              : dark
                ? '#383838'
                : '#fff',
          }}
        >
          <Text
            style={[
              dayTextStyle,
              {
                color: isToday ? '#fff' : dark ? '#fff' : '#000',
              },
            ]}
          >
            {language === 'np' ? getNepaliNumber(day) : day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default DayCell;
