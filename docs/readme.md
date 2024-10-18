# Installation
```sh

# Install with npm
npm install react-native-nepali-picker

# For installation with yarn
yarn add react-native-nepali-picker
```

<!--Images here-->

# Usage
Example uses of `<CalendarPicker/>` component, which is the actual picker component. For more info


```jsx

import { useState } from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
//import calendar picker component
import {
  CalendarPicker,
} from 'react-native-nepali-picker';

export default function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>();

  const onDateSelect = (PickedDate: string) => {
    setDate(PickedDate);
  };

  return (
    <View style={styles.container}>
      <View>
        {/* actual picker component */}
        <CalendarPicker
          visible={visible}
          onClose={() => setVisible(false)}
          onDateSelect={onDateSelect}
          //these are optional

          //language="np"
          //theme="light"
          //brandColor="#420420"

        />
      </View>

      {/* Button to open calendar picker*/}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Open Calendar</Text>
      </TouchableOpacity>
    </View>
  );
}
```



# Props

### visible
Boolean value to control whether to show the picker modal or not.

| type | default | required |
|-------|-------|-------|
| boolean | none | yes |


### onClose
Function that execute on picker modal closed.
You have to set the visible props to false , in addition to that you can execute others customs function too.

| type | default | required |
|-------|-------|-------|
| ()=>void | none | yes |


### onDateSelect
Function that execute on select the date
The string parameter is the selected  date in Nepali format.

| type | default | required |
|-------|-------|-------|
| (string)=>void | none | yes |


### theme
Preferred theme for picker modal.

| type | default | required |
|-------|-------|-------|
| "dark" \| "light" | light| no|


### language
Preferred language for picker modal.

| type | default | required |
|-------|-------|-------|
| "en" \| "np"| "en"| no |


### brandColor
Color that represent your brand or organization. This color only applied to highlight today date on calendar.

> [!Note]
> Provide the string of color in hex code.

| type | default | required |
|-------|-------|-------|
| "string"| "#2081b9"| no |


# Functions
This package provides three main functions:

### 1) AdtoBs(date:string):string
Convert a date from Anno Domini (AD) to Bikram Sambat (BS):
Function return the BS date in string type with format `yyyy-mm-dd`

>[!Note]
> Supported date range is `1943-04-14` AD to `2042-04-14` AD.

#### **uses**
```js
import {AdToBs} form 'react-native-nepali-picker'

const adDate = '2000-09-21';
const bsDate = AdToBs(adDate);
console.log(bsDate); // Output: 2057-06-05
```

### 2) BstoAd(date:string):string
Convert date from Bikram Sambat (BS) to Anno Domini (AD).
Function return the AD date in string type with format `yyyy-mm-dd`.

>[!Note]
> Supported date range is `2000-01-01` BS to `2099-01-01` BS.


#### **uses**
```js
import {BsToAd} form 'react-native-nepali-picker'

const bsDate = '2057-06-05';
const adDate = BsToAd(bsDate);
console.log(adDate); // Output: 2000-09-21
```

### 3) NepaliToday():string
Get the current date in Nepali calendar (BS)
Function return the BS date in string type with format `yyyy-mm-dd`.

#### **uses**
```js
import {NepaliToday} form 'react-native-nepali-picker'

const today = NepaliToday();
console.log(today); // Output: Current date in BS format (e.g., 2080-07-15)
```

## Full Example uses


```jsx

import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  AdToBs,
  BsToAd,
  CalendarPicker,
  NepaliToday,
} from 'react-native-nepali-picker';

export default function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>();

  const onDateSelect = (PickedDate: string) => {
    setDate(PickedDate);
  };

  return (
    <View style={styles.container}>
      <View>
        {/* actual picker component */}
        <CalendarPicker
          visible={visible}
          onClose={() => setVisible(false)}
          onDateSelect={onDateSelect}
          language="np"
          theme="light"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.text}>Open Calendar</Text>
      </TouchableOpacity>
      <View>
        <Text>{date}</Text>
        {/* convert date on AD to BS equivalent date: required format is (YYYY-MM-DD) */}
        <Text>{AdToBs('2000-09-21')}</Text>

        {/* convert date on BS to AD equivalent date: required  format is (YYYY-MM-DD)  */}
        <Text>{BsToAd('2056-01-01')}</Text>
        {/* This function will return the current nepali date: return value is string and format is (YYYY-MM-DD) */}
        <Text>{NepaliToday()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: '#fe6684',
    marginBottom: 10,
  },

  text: {
    color: '#000',
    fontSize: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

```

If you noticed something that need improvement or have additional feature request or just want to chat, feel free to reach out or you can create pull request for feature request, I will try my best to help you.


>Social:( *** You will get instant response on Linkedin  than Email *** )

[Linkedin](https://www.linkedin.com/in/kushal-chapagain-1aa66419a/)

[Email](mailto:chapagainkushal74@gmail.com)




