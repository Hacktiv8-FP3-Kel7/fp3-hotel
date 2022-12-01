import { SearchHistoryModel } from '@app/redux/auth';
import { TouchableHighlight, View } from 'react-native';
import * as React from 'react';
import Text from '@app/components/elements/text';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { RematchDispatcher } from 'redux';
interface Props {
  history: SearchHistoryModel;
}
export default function SearchHistoryCard(props: Props) {
  const { history } = props;
  const { name, id, end, starRating, start, createdAt } = history;
  const dispatch = useDispatch<RematchDispatcher>();

  const onRemove = React.useCallback(() => {
    dispatch.auth.clearHistory(history);
  }, [dispatch.auth, history]);

  return (
    <View>
      <Text>
        {id} - {format(createdAt, 'dd MMM YYYY, HH:mm')}
      </Text>
      <Text>Hotel: {name}</Text>
      <Text>Check-In: {start}</Text>
      <Text>Check-Out: {end}</Text>
      <Text>Rating: {starRating}</Text>
      <TouchableHighlight onPress={onRemove}>
        <Text>Remove</Text>
      </TouchableHighlight>
    </View>
  );
}
