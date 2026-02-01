import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getNepaliNumber } from './calendar/config';

type DayCellProps = {
  day: number | null;
  isSelectedDay: boolean;
  onPress: (day: number) => void;
  dark: boolean;
  brandColor: string;
  language: 'np' | 'en';
  dayTextStyle?: any;
  disabled: boolean;
};

const DayCell = React.memo(
  ({
    day,
    isSelectedDay,
    onPress,
    dark,
    brandColor,
    language,
    dayTextStyle,
    disabled,
  }: DayCellProps) => {
    if (!day) {
      return <View style={{ width: '14.28%', paddingVertical: 10 }} />;
    }

    return (
      <TouchableOpacity
        onPress={() => !disabled && onPress(day)}
        style={[{
          width: '14.28%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        },
        disabled && { opacity: 0.35 }]}
      >
        <View
          style={{
            paddingHorizontal: 6,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: isSelectedDay
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
                color: isSelectedDay ? '#fff' : dark ? '#fff' : '#000',
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
