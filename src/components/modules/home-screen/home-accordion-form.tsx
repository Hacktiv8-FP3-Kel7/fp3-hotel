import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import Text from '@app/components/elements/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '@app/styles/color';
import { getHotels } from '@app/api-hooks/hotel/hotel.model';
import HomeSearchForm from './home-search-form';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  onSubmit: (input: getHotels) => void;
  show: boolean;
  onToggle: () => void;
}

export default function HomeAccordionForm(props: Props) {
  const { onSubmit, show, onToggle } = props;

  return (
    <View style={styles.boxShadow}>
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.titleContainer}>
          <Text>Search Booking</Text>
          <Ionicons name={show ? 'chevron-up' : 'chevron-down'} color={colors.black} size={24} />
        </View>
      </TouchableOpacity>
      {show && <HomeSearchForm onSubmit={(input) => onSubmit(input)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    // marginVertical: 16,
    padding: 16,
  },
  boxShadow: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    borderRadius: 8,

    marginHorizontal: 16,

    elevation: 5,
  },
});
