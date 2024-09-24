import { useEffect, useState, type ReactNode } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { bs, daysInNepali } from './calendar/config';
import { calcFirstDay } from './calendar/settings';
import { NepaliToday } from './calendar/functions';

interface CalendarPickerPoros {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
}

const CalendarPicker = ({ visible, onClose }: CalendarPickerPoros) => {
  const TodayNepaliDate = NepaliToday();
  const cYear = parseInt(TodayNepaliDate.split('-')[0], 10);
  const cMonth = parseInt(TodayNepaliDate.split('-')[1], 10);
  const [month, setMonth] = useState<number>(cMonth);
  const [year, setYear] = useState<number>(cYear);
  const [calendarDate, setCalendarDate] = useState<(number | null)[]>([]);

  const handleMonthSetup = () => {
    setMonth(4);
    setYear(2081);
  };

  useEffect(() => {
    // calculate First Day Of Month (FDOM) and Days In Month(DIM)
    const FDOM = calcFirstDay(year, month);
    const DIM = bs[year][month + 1];

    // array which contain 42 cells and it only fill the date with number if the date is present otherwise it fill cells with null.
    const calendarCells = Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - FDOM + 1;
      if (dayNumber > 0 && dayNumber <= DIM) {
        return dayNumber;
      } else {
        return null;
      }
    });
    setCalendarDate(calendarCells);
  }, [year, month]);
  return (
    <Modal visible={visible}>
      <Pressable style={styles.outerPressable} onPress={onClose}>
        <Pressable onPress={() => {}} style={styles.innerPressable}>
          <View style={styles.innerView}>
            {/* contrls for date */}
            <View>
              <Text>{month}</Text>
              <Text>{year}</Text>
            </View>

            {/* Actual date container*/}
            <View style={{ paddingHorizontal: 3, paddingVertical: 6 }}>
              {/* for header of calendar */}
              <View style={styles.weekContainer}>
                {daysInNepali.map((item) => {
                  return (
                    <View style={styles.WeekItem}>
                      <Text style={styles.WeekText}>{item}</Text>
                    </View>
                  );
                })}
              </View>
              {/* for actual data fo calenadr */}

              <View style={styles.datesContainer}>
                {calendarDate.map((dayItem, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.dateItem}
                      key={index}
                      onPress={handleMonthSetup}
                    >
                      {dayItem ? (
                        <View>
                          <View>
                            <View>
                              <Text>{dayItem}</Text>
                            </View>
                          </View>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
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

  weekContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  WeekItem: {
    width: '14.28%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: 'gray',
    paddingVertical: 20,
  },
  WeekText: {
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 14,
    color: 'black',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  dateItem: {
    overflow: 'scroll',
    width: '14.28%',
    height: '11.28%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: 'gray',
    paddingVertical: 20,
  },
  DayText: {
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 14,
    color: 'black',
  },
});
export default CalendarPicker;
