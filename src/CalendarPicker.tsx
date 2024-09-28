import { useEffect, useState, type ReactNode } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  bs,
  daysInEnglish,
  daysInNepali,
  getNepaliNumber,
  monthsInEnglish,
  monthsInNepali,
} from './calendar/config';
import { calcFirstDay, isToday } from './calendar/settings';
import { NepaliToday } from './calendar/functions';
import { ChevronIcon } from './assets/Icons';
import DateSyncLogo from './assets/DateSync';

interface CalendarPickerPoros {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
  theme?: 'dark' | 'light';
  onDateSelect: (date: string) => void;
  language?: 'en' | 'np';
  brandCOlor: string;
}

const CalendarPicker = ({
  visible,
  onClose,
  theme = 'light',
  onDateSelect,
  language = 'en',
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

  const syncToday = () => {
    setMonth(cMonth);
    setYear(cYear);
  };
  const weekDays = language === 'en' ? daysInEnglish : daysInNepali;

  return (
    <Modal visible={visible}>
      <Pressable style={styles.outerPressable} onPress={onClose}>
        <Pressable onPress={() => {}} style={styles.innerPressable}>
          <View
            style={{
              ...styles.innerView,
              backgroundColor: theme === 'dark' ? '#383838' : '#ffffff',
            }}
          >
            {/*Date in Large font contrls for date */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <View>
                <Text>Today Date</Text>

                {language == 'np' ? (
                  <Text style={{ ...styles.TitleText, fontSize: 27 }}>
                    {getNepaliNumber(cYear)} {monthsInNepali[cMonth - 1]}
                    {'  '} {getNepaliNumber(cDay)}
                  </Text>
                ) : (
                  <Text style={{ ...styles.TitleText, fontSize: 27 }}>
                    {cYear} {monthsInEnglish[cMonth - 1]}
                    {'  '} {cDay}
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={syncToday}>
                <DateSyncLogo day={cDay} />
              </TouchableOpacity>
            </View>

            <View style={{}}>
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
                    {language == 'np'
                      ? monthsInNepali[month - 1]
                      : monthsInEnglish[month - 1]}
                  </Text>
                  <Text style={styles.TitleText}>
                    {language == 'np' ? getNepaliNumber(year) : year}
                  </Text>
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
                  {weekDays.map((item, index) => {
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
                            <Text style={styles.DayText}>
                              {language === 'np'
                                ? getNepaliNumber(dayItem)
                                : dayItem}
                            </Text>
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
    minHeight: '50%',
    marginHorizontal: 30,
  },
  innerView: {
    borderRadius: 20,
    padding: 10,
  },

  weekContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  WeekItem: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 18,
  },
  WeekText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateItem: {
    overflow: 'hidden',
    width: '14.28%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  DayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  CButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  outerDateConainer: {
    paddingHorizontal: 3,
  },
  TitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default CalendarPicker;
