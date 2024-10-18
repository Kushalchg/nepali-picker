 # react-native-nepali-picker

As a Nepali-date picker it will help you on your `react native` project to integrate the Nepali date picker.Addition to that it also have functions to for date conversion.

## Feature of the plugins
- Support all platforms (IOS, android, web and expo).
- Minimalist design.
- Support Nepali and English language.
- Support dark theme.
- Support Date conversion form BS to Ad and vice-versa.

## Installation

```sh
npm install react-native-nepali-picker
```

# Usage

# configuration

## Props

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
| "dark"\|"light" | light| no|


## language
Preferred language for picker modal.

| type | default | required |
|-------|-------|-------|
| "en"\|"np"| "en"| no |


## Functions
This package provides three main functions:

### 1) AdtoBs(date:string):string
Convert a date from Anno Domini (AD) to Bikram Sambat (BS):
Function return the BS date in string type with format `yyyy-mm-dd`

>[!Warning]
> Supported date range is 1943-04-14 AD to 2042-04-14 AD.

#### **uses**
```js
const adDate = '2000-09-21';
const bsDate = AdToBs(adDate);
console.log(bsDate); // Output: 2057-06-05
```

### 2) BstoAd(date:string):string
Convert date from Bikram Sambat (BS) to Anno Domini (AD).
Function return the AD date in string type with format `yyyy-mm-dd`.

>[!Warning]
> The supported date range is 2000-01-01 BS to 2099-01-01 BS.


#### **uses**
```js
const bsDate = '2057-06-05';
const adDate = BsToAd(bsDate);
console.log(adDate); // Output: 2000-09-21
```

### 3) NepaliToday():string
Get the current date in Nepali calendar (BS)
Function return the BS date in string type with format `yyyy-mm-dd`.

### **uses**
```js
const today = NepaliToday();
console.log(today); // Output: Current date in BS format (e.g., 2080-07-15)
```






```js
<<<<<<< HEAD
import { AdToBs } from 'react-native-nepali-picker';

// ...

const result = AdToBs("2000-09-21");
=======
const result = await multiply(3, 7);
>>>>>>> 567f9b7 (feat: added some extra docs)
```





## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)




