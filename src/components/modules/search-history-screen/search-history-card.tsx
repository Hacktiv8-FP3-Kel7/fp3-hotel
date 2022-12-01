import { SearchHistoryModel } from '@app/redux/auth';
import { TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import Text from '@app/components/elements/text';
import { useDispatch } from 'react-redux';
import { RematchDispatcher } from 'redux';
import { bodyTypography, headlineTypography } from '@app/styles/typography';
import colors from '@app/styles/color';
interface Props {
  history: SearchHistoryModel;
}
export default function SearchHistoryCard(props: Props) {
  const { history } = props;
  const { name, end, starRating, start } = history;
  const dispatch = useDispatch<RematchDispatcher>();

  const onRemove = React.useCallback(() => {
    dispatch.auth.clearHistory(history);
  }, [dispatch.auth, history]);

  return (
    <View
      style={{
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 4,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[headlineTypography.semiBold6]}>Hotel: {name}</Text>

        <TouchableOpacity onPress={onRemove}>
          <Text style={{ textAlign: 'center', color: colors.red }}>Remove</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[bodyTypography.bodyRegular4, { flex: 1 }]}>Check-In: {start}</Text>
        <Text style={[bodyTypography.bodyRegular4, { flex: 1 }]}>Check-Out: {end}</Text>
      </View>
      <Text>Rating: {starRating}</Text>
    </View>
  );
}
