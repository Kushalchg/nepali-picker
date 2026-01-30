import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateSyncLogo from './assets/DateSync';
import { ChevronIcon } from './assets/Icons';
import Triangle from './assets/Triangle';
import {
  bs,
  daysInEnglish,
  daysInNepali,
  getNepaliNumber,
  monthsInEnglish,
  monthsInNepali,
} from './calendar/config';
import { NepaliToday, validateDate } from './calendar/functions';
import { calcFirstDay } from './calendar/settings';
import DayCell from './DayCell'
import type { CalendarPickerProps } from './types';

const CalendarPicker = ({
  visible,
  onClose,
  theme = 'light',
  onDateSelect,
  language = 'np',
  initialDate = NepaliToday(),
  brandColor = '#2081b9',
  titleTextStyle = {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weekTextStyle = {
    fontSize: 15,
    fontWeight: 'bold',
  },
  dayTextStyle = {
    fontSize: 15,
    fontWeight: '600',
  },
}: CalendarPickerProps) => {
  const yearModelScrollRef = useRef<ScrollView>(null)

  const value = validateDate(initialDate);
  const [TodayNepaliDate, setTodayNepaliDate] = useState(initialDate);
  const cYear = parseInt(TodayNepaliDate.split('-')[0], 10);
  const cMonth = parseInt(TodayNepaliDate.split('-')[1], 10);
  const cDay = parseInt(TodayNepaliDate.split('-')[2], 10);

  const [month, setMonth] = useState<number>(cMonth);
  const [year, setYear] = useState<number>(cYear);

  const [yearModal, setYearModal] = useState<boolean>(false);

  const syncToday = () => {
    setMonth(cMonth);
    setYear(cYear);
  };

  const handleDateClick = useCallback((day: number) => {
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setTodayNepaliDate(date);
    onDateSelect(date);
    onClose();
  }, [year, month, onDateSelect, onClose]);


  // Set the user selected date is as NepaliDate (initially it will be always
  // TodayNepaliDate)
  useEffect(() => {
    setTodayNepaliDate(initialDate);
  }, [initialDate]);

  // It will calculate the current date number
  const todayDay = useMemo(() => {
    const [y, m, d] = TodayNepaliDate.split('-').map(Number);
    return y === year && m === month ? d : null;
  }, [TodayNepaliDate, year, month]);

  //Handle Next Month button Click
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

  //Handle Previous Month button Click
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

  //open the model which shows the list of years(2000-2099)BS
  const openYearView = async () => {
    setYearModal(true);

    //wait for model to open completely before to scroll down
    await new Promise((resolve) => setTimeout(resolve, 10))
    // After model is opened, need ot scrolldown to that year
    yearModelScrollRef.current?.scrollTo({
      y: 100,
      animated: true
    })
  };

  //close the year view model
  const closeYearView = () => {
    setYearModal(false);
  };


  // Calculating the number of cells on that month and year(Max it can have 42 cells)
  // If the cells don't have the date, it will be null otherwise it will contain the actual
  // date number (1,2,3...upto 32)
  const calendarDate = useMemo(() => {
    const FDOM = calcFirstDay(year, month);
    const DIM = bs[year][month];
    return Array.from({ length: 42 }, (_, index) => {
      const dayNum = index - FDOM + 1
      return dayNum > 0 && dayNum <= DIM ? dayNum : null
    })
  }, [year, month])

  const handleYearClick = (y: number) => {
    setYear(y);
    closeYearView();
  };

  const dark = theme === 'dark';
  const weekDays = language === 'en' ? daysInEnglish : daysInNepali;

  // If the user prvided (initial value ) is not in correct format i.e (YYYY-MM-DD)
  if (value !== true) {
    return (
      <Modal visible={visible} onRequestClose={onClose} transparent={true}>
        <Pressable style={styles.outerPressable} onPress={onClose}>
          <Pressable onPress={() => {}} style={styles.innerPressable}>
            <View
              style={{
                ...styles.innerView,
                minHeight: '40%',
                minWidth: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: dark ? '#383838' : '#ffffff',
              }}
            >
              <Text
                style={{
                  color: dark ? 'white' : 'black',
                  fontWeight: '600',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                Unsupported date range on initialDate
              </Text>
              <Text
                style={{
                  color: dark ? 'white' : 'black',
                  paddingHorizontal: 10,
                }}
              >
                {value}
              </Text>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <Pressable style={styles.outerPressable} onPress={onClose}>
        <Pressable onPress={() => { }} style={styles.innerPressable}>
          <View
            style={{
              ...styles.innerView,
              backgroundColor: dark ? '#383838' : '#ffffff',
            }}
          >
            <Text
              style={{
                color: dark ? 'white' : 'black',
                paddingHorizontal: 10,
              }}
            >
              {language === 'np' ? 'आजको मिति ' : "Selected Date"}
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
                {calendarDate.map((day, index) => (
                  <DayCell
                    key={index}
                    day={day}
                    isToday={day !== null && day === todayDay}
                    onPress={handleDateClick}
                    dark={dark}
                    brandColor={brandColor}
                    language={language}
                    dayTextStyle={dayTextStyle}
                  />
                ))}
              </View>

            </View>
          </View>
        </Pressable>
      </Pressable>

      {/* the year modal which will show the list of year (in scrollview) */}
      {/* NOTE: Need to change in flatlist for performance but need to fix the responsive  */}
      <Modal
        visible={yearModal}
        onRequestClose={closeYearView}
        transparent={true}
      >
        <Pressable
          style={styles.outerPressable}
          onPress={() => closeYearView()}
        >
          <Pressable style={styles.YearInnerPressable} onPress={() => { }}>
            <View
              style={{
                ...styles.InnerYearView,
                backgroundColor: dark ? '#383838' : '#f2f2f2',
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                ref={yearModelScrollRef}
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
