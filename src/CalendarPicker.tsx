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
import { calcFirstDay, isToday } from './calendar/settings';
import { NepaliToday } from './calendar/functions';
import { ChevronIcon } from './assets/Icons';
import PencilIcon from './assets/cIcon';

interface CalendarPickerPoros {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
  theme?: 'dark' | 'light';
  onDateSelect: (date: string) => void;
}

const CalendarPicker = ({
  visible,
  onClose,
  theme = 'light',
  onDateSelect,
}: CalendarPickerPoros) => {
  const TodayNepaliDate = NepaliToday();
  const cYear = parseInt(TodayNepaliDate.split('-')[0], 10);
  const cMonth = parseInt(TodayNepaliDate.split('-')[1], 10);
  const cDay = parseInt(TodayNepaliDate.split('-')[2], 10);

  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(0);
  const [month, setMonth] = useState<number>(cMonth);
  const [year, setYear] = useState<number>(cYear);
  const [calendarDate, setCalendarDate] = useState<(number | null)[]>([]);

  const handleDateClick = (day: number) => {
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    onDateSelect(date);
    onClose();
  };

  const handleNextClick = () => {
    if (month === 12) {
      if (year < 2099) {
        setYear((prev) => prev + 1);
        setMonth(1);
      }
    } else {
      setMonth((prev) => prev + 1);
    }
  };
  const handlePreviousClick = () => {
    if (month === 1) {
      if (year > 2081) {
        setYear((prev) => prev - 1);
        setMonth(12);
      }
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  useEffect(() => {
    // calculate First Day Of Month (FDOM) and Days In Month(DIM)
    const FDOM = calcFirstDay(year, month);
    const DIM = bs[year][month];
    setFirstDayOfMonth(FDOM);

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
              backgroundColor: theme === 'dark' ? '#383838' : '#fff',
            }}
          >
            {/*Date in Large font contrls for date */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={{ ...styles.TitleText, fontSize: 30 }}>
                  {cYear} {monthsInNepali[cMonth - 1]} {cDay}
                </Text>
              </View>
              <View>
                <PencilIcon height={24} width={9} />
              </View>
            </View>

            <View style={{ justifyContent: 'space-evenly' }}>
              {/* for button container */}
              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={styles.CButton}
                  onPress={handlePreviousClick}
                >
                  <ChevronIcon direction="right" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.TitleText, marginRight: 6 }}>
                    {monthsInNepali[month - 1]}
                  </Text>
                  <Text style={styles.TitleText}>{year}</Text>
                </View>
                <TouchableOpacity
                  style={styles.CButton}
                  onPress={handleNextClick}
                >
                  <ChevronIcon direction="left" />
                </TouchableOpacity>
              </View>

              {/* Actual date container*/}
              <View style={styles.outerDateConainer}>
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
                          <View
                            style={{
                              paddingHorizontal: 6,
                              paddingVertical: 3,
                              borderRadius: 999,
                              backgroundColor: isToday(
                                TodayNepaliDate,
                                index,
                                year,
                                month,
                                firstDayOfMonth
                              )
                                ? '#696969'
                                : theme === 'dark'
                                  ? '#282828'
                                  : '#fff',
                            }}
                          >
                            <Text>{dayItem}</Text>
                          </View>
                        ) : null}
                      </TouchableOpacity>
                    );
                  })}
                </View>
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
    height: '50%',
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
    // borderWidth: 0.3,
    // borderColor: 'gray',
    paddingVertical: 18,
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    paddingVertical: 18,
  },
  DayText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    color: 'black',
  },
  CButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outerDateConainer: {
    paddingHorizontal: 3,
    justifyContent: 'flex-end',
  },
  TitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default CalendarPicker;
