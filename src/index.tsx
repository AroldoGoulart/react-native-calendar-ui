/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
//@ts-ignore
import {
  ViewStyle,
  TextStyle,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
//@ts-ignore

//@ts-ignore
import CalendarPicker from 'react-native-calendar-picker';

import uuid from 'react-native-uuid';

let months_short_default = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

let months_long_default = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let weeks_short_default = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let weeks_long_default = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface CalendarProps {
  selectedDayStyle?: ViewStyle;
  months_short?: string[];
  months_long?: string[];
  weeks_short?: string[];
  weeks_long?: string[];
  previousTitle?: string;
  nextTitle?: string;
  todayBackgroundColor?: string;
  selectedDayTextColor?: string;
  todayTextStyle?: TextStyle;
  allowRange?: boolean;
  selectedRangeStyle?: ViewStyle;
  monthTitleStyle?: TextStyle;
  textStyle?: TextStyle;
  disabledDatesTextStyle?: TextStyle;
  disabledDatesBackgroundColor?: string;
  onDataChange?: (dataInit: any, name: string) => any;
  selectedRangeStartStyle?: ViewStyle;
  selectedRangeEndStyle?: ViewStyle;
  dayShape?: 'circle' | 'square';
  previousTitleStyle?: TextStyle;
  nextTitleStyle?: TextStyle;
  selectMonthTitle?: string;
  selectYearTitle?: string;
  useLongMonths?: boolean;
  useLongWeeks?: boolean;
  startFromMonday?: boolean;
  scrollable?: boolean;
  horizontal?: boolean;
  monthYearHeaderWrapperStyle: ViewStyle;
  headerWrapperStyle?: ViewStyle;
  minDate?: Date;
  maxDate?: Date;
  nextComponent?: () => React.ReactElement;
  previousComponent?: () => React.ReactElement;
  initialDate?: Date;
  scaleFactor?: number;
  firstValue: Date;
  lastValue: Date;
  onAllValueChange: (formated_dates: any) => void;
  userId: string;
}

export function CalendarView(props: CalendarProps) {
  const {
    months_short,
    months_long,
    weeks_short,
    weeks_long,
    startFromMonday = false,
    previousTitle,
    nextTitle,
    selectedDayStyle,
    todayBackgroundColor = '#00adf5',
    selectedDayTextColor = '#fff',
    todayTextStyle,
    allowRange = true,
    selectedRangeStyle,
    monthTitleStyle,
    textStyle,
    disabledDatesTextStyle,
    onDataChange,
    selectedRangeStartStyle,
    selectedRangeEndStyle,
    dayShape = 'circle',
    selectMonthTitle = 'Select Month',
    selectYearTitle = 'Select Year',
    useLongMonths = false,
    useLongWeeks = false,
    horizontal = true,
    scrollable = true,
    monthYearHeaderWrapperStyle,
    headerWrapperStyle,
    initialDate,
    scaleFactor,
    firstValue,
    lastValue,
  } = props;

  return (
    <CalendarPicker
      previousTitle={previousTitle || '<'}
      nextTitle={nextTitle || '>'}
      months={
        !useLongMonths
          ? months_short || months_short_default
          : months_long || months_long_default
      }
      weekdays={
        !useLongWeeks
          ? weeks_short || weeks_short_default
          : weeks_long || weeks_long_default
      }
      selectedDayStyle={selectedDayStyle}
      selectedDayTextColor={selectedDayTextColor}
      todayBackgroundColor={todayBackgroundColor}
      todayTextStyle={todayTextStyle}
      allowRangeSelection={allowRange}
      minDate={props.minDate}
      initialDate={initialDate}
      maxDate={props.maxDate}
      selectedRangeStyle={selectedRangeStyle}
      monthTitleStyle={monthTitleStyle}
      scaleFactor={scaleFactor}
      textStyle={textStyle}
      disabledDatesTextStyle={disabledDatesTextStyle}
      onDateChange={(date: any, event: string) => {
        if (onDataChange) {
          onDataChange(date, event);
        }
        if (event === 'END_DATE' && firstValue && date) {
          // get diference of days in between firstValue and lastValue (date)
          let first_date = new Date(firstValue);
          let last_date = new Date(date);

          // get diferente of days in days
          let days_diference = Math.abs(
            Math.round((first_date.getTime() - last_date.getTime()) / 86400000)
          );

          let dateTime = {
            //Randomly generated numbers up to any sufficient number
            id: uuid.v4(),
            user_id: props.userId,
            date_time: Array.from(Array(days_diference)).map((_, index) => {
              let date_of_day = new Date(first_date);
              date_of_day.setDate(date_of_day.getDate() + index);
              let hours_array = Array.from(Array(24)).map((_, index) => {
                let date_of_hour = new Date(date_of_day);
                date_of_hour.setHours(0 + index);

                return {
                  hour: date_of_hour,
                };
              });
              // sort array of hours
              hours_array = hours_array.sort(
                (a, b) => a.hour.getTime() - b.hour.getTime()
              );

              // As the date 04 am, the first hour is 04:00:00
              // So i move the last 4 items fo array to start
              let new_hours_array = [...hours_array];

              let final_value = {
                date: date_of_day.toISOString(),
                main_task: '',
                // sort hours by hour
                hour: new_hours_array.map((value_date) => {
                  let item = {} as unknown as any;
                  let value_to_string = `${value_date.hour.getHours()}`;
                  item[`${value_to_string}`] = [
                    {
                      location: '',
                      task: ``,
                    },
                  ];
                  return item;
                }),
              };

              return final_value;
            }),
          };
          props?.onAllValueChange(dateTime);
        }
      }}
      selectedRangeStartStyle={selectedRangeStartStyle}
      selectedRangeEndStyle={selectedRangeEndStyle}
      dayShape={dayShape}
      previousTitleStyle={previousTitle}
      nextTitleStyle={nextTitle}
      selectYearTitle={selectYearTitle}
      startFromMonday={startFromMonday}
      scrollable={scrollable}
      horizontal={horizontal}
      monthYearHeaderWrapperStyle={monthYearHeaderWrapperStyle}
      headerWrapperStyle={headerWrapperStyle}
      nextComponent={props.nextComponent}
      previousComponent={props.previousComponent}
    />
  );
}
interface ICalendarDayPicker {
  value: number;
  onChange: (value: number | null) => void;
  max_days: number;
  style: TextStyle;
}

export function CalendarEnterDay(props: ICalendarDayPicker) {
  // create array 1 to 31
  const { value, onChange, max_days, style } = props;

  return (
    <TextInput
      style={{
        color: `white`,
        borderColor: `#283641`,
        borderWidth: 2,
        justifyContent: `center`,
        alignContent: `center`,
        alignItems: `center`,
        textAlign: `center`,
        paddingVertical: 60,
        width: `100%`,
        borderRadius: 5,
        fontSize: 50,
        ...style,
      }}
      value={value ? value.toString() : ''}
      onChangeText={(text: string | any[]) => {
        if (!text) {
          onChange(null);
          return;
        }
        // check if the last character is NaN
        //@ts-ignore
        if (isNaN(text[text.length - 1])) {
          return;
        }
        // check if the number is bigger than max_days
        //@ts-ignore
        if (Number.parseInt(text) > max_days) {
          return;
        }
        //@ts-ignore
        onChange(Number.parseInt(text));
      }}
      keyboardType="numeric"
    />
  );
}

// get number of day
export const getDay = (date: string) => {
  const d = new Date(date);
  return d.getDay();
};

export const monthTitle = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', { month: 'short' }); // {month:'long'}
};

export const getYear = (date: string) => {
  const d = new Date(date);
  return d.getFullYear();
};

const getMonthNameAndDay = (date: Date) => {
  let lastMouth = date.toLocaleString('en-US', { month: 'short' });
  lastMouth = `${date.getDay()} ${lastMouth.split(` `)[1]}`;
  return lastMouth;
};

const getDayOfWeekName = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', { weekday: 'long' }).split(` `)[0];
};

const getDiferenceInDays = (date_estrutured: any): null | string => {
  //@ts-ignore
  if (date_estrutured && date_estrutured?.date_time) {
    // get first item of date_estrutured.data_time
    const first_item = date_estrutured.date_time[0];
    // get last item of date_estrutured.data_time
    const last_item =
      date_estrutured.date_time[date_estrutured.date_time.length - 1];

    if (first_item && last_item) {
      let first_Day = new Date(first_item.date);
      let last_Day = new Date(last_item.date);

      let day_initial = first_Day.getDate();

      // month name in english
      let lastMonth = getMonthNameAndDay(last_Day);

      let latsYear = last_Day.getFullYear();

      let array_of_dates = [] as unknown as any;
      //@ts-ignore
      date_estrutured.date_time.map((e) => array_of_dates.push(e.date));

      let returned_string = day_initial + ` - ` + lastMonth + ` ` + latsYear;
      return returned_string;
    }
  }
  return null;
};

interface IFlatListCustomized {
  data: any;
  textStyle: TextStyle;
  flatListStyle: ViewStyle;
  onPress: (item: any, index: number) => void;
  mainViewStyle: ViewStyle;
  textNameWeekStyle: TextStyle;
  textNameDayMonthStyle: TextStyle;
  touchableOpacityStyle: ViewStyle;
  touchableTextStyle: TextStyle;
}

export function FlatListCustomized(props: IFlatListCustomized) {
  const {
    data,
    textStyle,
    flatListStyle,
    mainViewStyle,
    textNameDayMonthStyle,
    textNameWeekStyle,
    touchableTextStyle,
    touchableOpacityStyle,
  } = props;

  return (
    <>
      {
        //@ts-ignore
        <Text
          style={{
            fontSize: 20,
            color: `#fff`,
            marginBottom: 10,
            ...textStyle,
          }}
        >
          {getDiferenceInDays(data)}
        </Text>
      }

      <FlatList
        data={data ? data?.date_time : []}
        style={{
          ...flatListStyle,
        }}
        renderItem={(value) => {
          const { item } = value;
          return (
            //@ts-ignore
            <View
              style={{
                flexDirection: `row`,
                backgroundColor: `#1E2830`,
                width: `100%`,
                borderRadius: 10,
                marginVertical: 5,
                height: 35,
                alignItems: `center`,
                ...mainViewStyle,
              }}
            >
              {
                //@ts-ignore
                <Text
                  style={{
                    width: 55,
                    color: `#fff`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    textAlign: `center`,
                    marginLeft: 10,
                    borderRightColor: `#fff`,
                    ...textNameWeekStyle,
                  }}
                >
                  {getDayOfWeekName(item.date)}
                </Text>
              }

              {
                //@ts-ignore
                <Text
                  style={{
                    color: `#fff`,
                    borderWidth: 0,
                    borderColor: `#3E4A50`,
                    paddingHorizontal: 10,
                    borderTopColor: `transparent`,
                    borderBottomColor: `transparent`,
                    borderRightColor: `transparent`,
                    borderLeftWidth: 2,
                    height: 20,
                    justifyContent: `center`,
                    alignItems: `center`,
                    textAlign: `center`,
                    ...textNameDayMonthStyle,
                  }}
                >
                  {` ` + getMonthNameAndDay(new Date(item.date))}
                </Text>
              }

              {
                //@ts-ignore
                <TouchableOpacity
                  onPress={() => {
                    props.onPress(item, value.index);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: `#3E4A50`,
                    height: 35,
                    justifyContent: `center`,
                    paddingHorizontal: 5,
                    paddingLeft: 25,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    ...touchableOpacityStyle,
                  }}
                >
                  {
                    //@ts-ignore
                    <Text
                      style={{
                        fontSize: 15,
                        color: `#fff`,
                        ...touchableTextStyle,
                      }}
                    >
                      Add Task
                    </Text>
                  }
                </TouchableOpacity>
              }
            </View>
          );
        }}
      />
    </>
  );
}
