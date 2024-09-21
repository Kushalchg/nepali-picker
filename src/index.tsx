import { Text, View } from 'react-native';
import { AdToBs, BsToAd, NepaliToday } from './calendar/functions';

export { NepaliToday, BsToAd, AdToBs };
export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
export function add(a: number, b: number): number {
  return a + b;
}

export const RandCom = () => {
  return (
    <View>
      <Text>This is random text</Text>
    </View>
  );
};
