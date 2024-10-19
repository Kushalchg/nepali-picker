import { useEffect, useState, type ReactNode } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  type TextStyle,
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
import Triangle from './assets/Triangle';

interface CalendarPickerPoros {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
  theme?: 'dark' | 'light';
  onDateSelect: (date: string) => void;
  language?: 'en' | 'np';
  brandColor?: string;
  dayTextStyle?: TextStyle;
  weekTextStyle?: TextStyle;
  titleTextStyle?: TextStyle;
}

const CalendarPicker = ({
  visible,
  onClose,
  theme = 'light',
  onDateSelect,
  language = 'np',
  brandColor = '#2081b9',

  titleTextStyle = {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weekTextStyle = {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  dayTextStyle = {
    fontSize: 15,
    fontWeight: '600',
  },
}: CalendarPickerPoros) => {
  const TodayNepaliDate = NepaliToday();
  const cYear = parseInt(TodayNepaliDate.split('-')[0], 10);
  const cMonth = parseInt(TodayNepaliDate.split('-')[1], 10);
  const cDay = parseInt(TodayNepaliDate.split('-')[2], 10);

  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(0);
  const [month, setMonth] = useState<number>(cMonth);
  const [year, setYear] = useState<number>(cYear);
  const [calendarDate, setCalendarDate] = useState<(number | null)[]>([]);

  const [yearModal, setYearModal] = useState<boolean>(false);
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
      if (year > 2000) {
        setYear((prev) => prev - 1);
        setMonth(12);
      }
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const openYearView = () => {
    setYearModal(true);
  };

  const closeYearView = () => {
    setYearModal(false);
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

  const handleYearClick = (y: number) => {
    setYear(y);
    closeYearView();
  };
  const dark = theme === 'dark';
  const weekDays = language === 'en' ? daysInEnglish : daysInNepali;

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.outerPressable} onPress={onClose}>
        <Pressable onPress={() => {}} style={styles.innerPressable}>
          <View
            style={{
              ...styles.innerView,
              backgroundColor: dark ? '#383838' : '#ffffff',
            }}
          >
            <Text
              style={{ color: dark ? 'white' : 'black', paddingHorizontal: 10 }}
            >
              {language === 'np' ? 'आजको मिति ' : "Today's Date"}
            </Text>
            {/* Today date in large fonts on click sync the calenar with today date */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginBottom: 20,
                alignItems: 'center',
              }}
            >
              <View>
                <TouchableOpacity onPress={syncToday}>
                  {language == 'np' ? (
                    <Text
                      style={{
                        ...titleTextStyle,
                        color: dark ? '#fff' : '#000',
                      }}
                    >
                      {getNepaliNumber(cYear)} {monthsInNepali[cMonth - 1]}
                      {'  '} {getNepaliNumber(cDay)}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...titleTextStyle,
                        color: dark ? '#fff' : '#000',
                      }}
                    >
                      {cYear} {monthsInEnglish[cMonth - 1]}
                      {'  '} {cDay}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={syncToday}>
                <DateSyncLogo day={cDay} color={dark ? '#ffff' : '#000'} />
              </TouchableOpacity>
            </View>

            {/* for button container */}
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={styles.CButton}
                onPress={handlePreviousClick}
              >
                <ChevronIcon
                  direction="right"
                  color={dark ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={openYearView}
              >
                <Text
                  style={{
                    ...titleTextStyle,
                    marginRight: 6,
                    color: dark ? 'white' : 'black',
                  }}
                >
                  {language === 'np'
                    ? monthsInNepali[month - 1]
                    : monthsInEnglish[month - 1]}
                </Text>
                <Text
                  style={{
                    ...titleTextStyle,
                    marginRight: 10,
                    color: dark ? 'white' : 'black',
                  }}
                >
                  {language === 'np' ? getNepaliNumber(year) : year}
                </Text>

                <Triangle
                  height={10}
                  width={13}
                  color={dark ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CButton}
                onPress={handleNextClick}
              >
                <ChevronIcon
                  direction="left"
                  color={dark ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>

            {/* Overall date container whith week days and day item */}
            <View style={styles.outerDateConainer}>
              {/* for header of calendar week days */}
              <View style={styles.weekContainer}>
                {weekDays.map((item, index) => {
                  return (
                    <View style={styles.WeekItem} key={index}>
                      <Text
                        style={{
                          ...weekTextStyle,
                          color: dark ? 'white' : 'black',
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* for actual data fo calenadr which has the day in them */}
              <View style={styles.datesContainer}>
                {calendarDate.map((dayItem, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.dateItem}
                      key={index}
                      onPress={
                        //execute on day item press, Only execute when dayItem is not null
                        dayItem ? () => handleDateClick(dayItem) : () => {}
                      }
                    >
                      {dayItem ? (
                        <View
                          style={{
                            paddingHorizontal: 6,
                            paddingVertical: 3,
                            borderRadius: 999,
                            //check if the date is today or not and apply conditional styling.
                            backgroundColor: isToday(
                              TodayNepaliDate,
                              index,
                              year,
                              month,
                              firstDayOfMonth
                            )
                              ? brandColor
                              : dark
                                ? '#383838'
                                : '#fff',
                          }}
                        >
                          <Text
                            style={{
                              ...dayTextStyle,
                              color: isToday(
                                TodayNepaliDate,
                                index,
                                year,
                                month,
                                firstDayOfMonth
                              )
                                ? '#fff'
                                : dark
                                  ? 'white'
                                  : 'black',
                            }}
                          >
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
        </Pressable>
      </Pressable>
      <Modal visible={yearModal} onRequestClose={closeYearView}>
        <Pressable
          style={styles.outerPressable}
          onPress={() => closeYearView()}
        >
          <Pressable style={styles.YearInnerPressable} onPress={() => {}}>
            <View
              style={{
                ...styles.InnerYearView,
                backgroundColor: dark ? '#383838' : '#f2f2f2',
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  display: 'flex',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {Array(100)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleYearClick(index + 2000)}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 6,
                          marginHorizontal: 4,
                          marginVertical: 4,
                          borderColor: dark ? 'white' : 'black',
                          borderRadius: 20,

                          backgroundColor:
                            index + 2000 === year ? brandColor : '',
                          borderWidth: 0.4,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: '500',
                            color:
                              index + 2000 === year
                                ? 'white'
                                : dark
                                  ? 'white'
                                  : 'black',
                          }}
                        >
                          {language === 'np'
                            ? getNepaliNumber(index + 2000)
                            : index + 2000}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  outerPressable: {
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.54)',
  },
  innerPressable: {
    minHeight: '20%',
    maxWidth: 500,
    marginHorizontal: 30,
  },
  innerView: {
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
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
  //WeekText: {
  //  fontWeight: 'bold',
  //  fontSize: 14,
  //  color: 'black',
  //},
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
  //DayText: {
  //  fontSize: 14,
  //  fontWeight: '600',
  //},
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
  //TitleText: {
  //  fontSize: 20,
  //  fontWeight: 'bold',
  //},
  // for year view modal
  YearInnerPressable: {
    justifyContent: 'center',
    maxWidth: 500,
    maxHeight: '70%',
    marginHorizontal: 30,
  },
  InnerYearView: {
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    minHeight: 50,
    maxHeight: '100%',
  },
});
export default CalendarPicker;
