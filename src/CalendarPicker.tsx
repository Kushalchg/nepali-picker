import { useEffect, useState, type ReactNode } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { bs, daysInNepali, monthsInNepali } from './calendar/config';
import { calcFirstDay } from './calendar/settings';
import { NepaliToday } from './calendar/functions';

interface CalendarPickerPoros {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
  theme: 'dark' | 'light';
  onDateSelect: (date: string) => void;
}

const CalendarPicker = ({
  visible,
  onClose,
  theme,
  onDateSelect,
}: CalendarPickerPoros) => {
  const TodayNepaliDate = NepaliToday();
  const cYear = parseInt(TodayNepaliDate.split('-')[0], 10);
  const cMonth = parseInt(TodayNepaliDate.split('-')[1], 10);
  const [month, setMonth] = useState<number>(cMonth);
  const [year, setYear] = useState<number>(cYear);
  const [calendarDate, setCalendarDate] = useState<(number | null)[]>([]);

  const handleDateClick = (day: number) => {
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    onDateSelect(date);
    onClose();
  };

  const handleNextClick = () => {
    if (month === 11) {
      if (year < 2099) {
        setYear((prev) => prev + 1);
        setMonth(0);
      }
    } else {
      setMonth((prev) => prev + 1);
    }
  };
  const handlePreviousClick = () => {
    if (month === 0) {
      if (year > 2081) {
        setYear((prev) => prev - 1);
        setMonth(11);
      }
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  useEffect(() => {
    // calculate First Day Of Month (FDOM) and Days In Month(DIM)
    const FDOM = calcFirstDay(year, month + 1);
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
          <View
            style={{
              ...styles.innerView,
              backgroundColor: theme == 'dark' ? '#383838' : '#fff',
            }}
          >
            {/* contrls for date */}
            <View>
              <Text>{monthsInNepali[month]}</Text>
              <Text>{year}</Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={styles.CButton}
                onPress={handlePreviousClick}
              >
                <Text>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CButton}
                onPress={handleNextClick}
              >
                <Text>Next</Text>
              </TouchableOpacity>
            </View>

            {/* Actual date container*/}
            <View
              style={{
                paddingHorizontal: 3,
                justifyContent: 'center',
              }}
            >
              {/* for header of calendar */}
              <View style={styles.weekContainer}>
                {daysInNepali.map((item, index) => {
                  return (
                    <View style={styles.WeekItem} key={index}>
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
                      onPress={
                        dayItem ? () => handleDateClick(dayItem) : () => {}
                      }
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
    marginHorizontal: 30,
  },
  innerView: {
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#F2F2F2',
  },

  weekContainer: {
    flexDirection: 'row',
    width: '100%',
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
  },
  dateItem: {
    overflow: 'scroll',
    width: '14.28%',
    height: '10.28%',
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
  CButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#5121e1',
  },
});
export default CalendarPicker;