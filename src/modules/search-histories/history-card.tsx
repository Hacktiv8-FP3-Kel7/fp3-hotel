import { SearchHistoryModel } from '@app/redux/auth';
import { View } from 'react-native';
import * as React from 'react';
import Text from '@app/components/elements/text';
import { format } from 'date-fns';
interface Props {
  history: SearchHistoryModel;
}
export default function HistoryCard(props: Props) {
  const { history } = props;
  const { name, id, end, starRating, start, createdAt } = history;
  return (
    <View>
      <Text>
        {id} - {format(createdAt, 'dd MMM YYYY, HH:mm')}
      </Text>
      <Text>Hotel: {name}</Text>
      <Text>Check-In: {start}</Text>
      <Text>Check-Out: {end}</Text>
      <Text>Rating: {starRating}</Text>
    </View>
  );
}
