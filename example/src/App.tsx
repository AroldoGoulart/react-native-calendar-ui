/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, View } from 'react-native';

//@ts-ignore
import { CalendarView, CalendarEnterDay, FlatListCustomized } from 'react-native-calendar-ui';

//@ts-ignore
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);

export default function App() {
  const [selectedStartDate, setSelectedStartDate] = React.useState<any>();
  const [selectEndDate, setSelectEndDate] = React.useState<any>();
  const [transledArray, setTransledArray] = React.useState<any>();

  let user_id = `${Math.floor(Math.random() * 100)}`;

  const [value, setValue] = React.useState<number>(1);
  const minDate = new Date(); // Today

  return (
    <>
      {true ? (
        <>
          {false ? (
            //@ts-ignore
            <View
              style={{
                flex: 1,
                backgroundColor: `#1E2830`,
                justifyContent: 'center',
              }}
            >
              <CalendarView
                minDate={minDate}
                todayBackgroundColor={`#3A7C81`}
                selectedRangeStyle={{
                  backgroundColor: `#3E4A50`,
                }}
                firstValue={selectedStartDate}
                lastValue={selectEndDate}
                onDataChange={(date, type) => {
                  if (type === 'END_DATE') {
                    setSelectEndDate(date);
                  } else {
                    setSelectedStartDate(date);
                    setSelectEndDate(null);
                  }
                }}
                monthYearHeaderWrapperStyle={{
                  position: `absolute`,
                  left: 10,
                }}
                monthTitleStyle={{
                  fontSize: 24,
                }}
                // set the value of tranlatedArray to your requested data structure
                onAllValueChange={setTransledArray}
                allowRange
                horizontal={false}
                useLongMonths
                weeks_short={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                textStyle={{
                  color: '#fff',
                }}
                userID={user_id}
                headerWrapperStyle={{
                  backgroundColor: '#3A7C81',
                  height: 30,
                }}
                nextComponent={() => null}
                previousComponent={() => null}
              />
            </View>
          ) : (
            //@ts-ignore
            <View
              style={[
                styles.container,
                { backgroundColor: `#1B2730`, paddingHorizontal: 40 },
              ]}
            >
              <CalendarEnterDay
                value={value}
                onChange={(value) => {
                  setValue(value);
                }}
                max_days={31}
                style={{}}
              />
            </View>
          )}
        </>
      ) : null}

      {
        false ?
          (
            //@ts-ignore
            <View
              style={{
                backgroundColor: `#1E2830`,
                paddingHorizontal: 20,
              }}
            >
              <FlatListCustomized
                onPress={(item, index) => {
                  // you can do anything you want here
                }}
                mainViewStyle={{
                  backgroundColor: `#0E2110`,
                }}
                data={transledArray}
              />
            </View>

          ) : null

      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
