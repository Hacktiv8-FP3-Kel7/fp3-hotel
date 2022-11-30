import { View } from 'react-native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';
import Text from '@app/components/elements/text';
import { FlatList } from 'react-native-gesture-handler';
import HistoryCard from './history-card';
import Header from '@app/components/widgets/header';

export default function SearchHistories() {
  const histories = useSelector(authSelector.searchHistories);
  return (
    <View>
      <Header title="History Screen" titleCenter back />
      <Text>Pencarian</Text>
      {histories.length === 0 ? (
        <Text>Tidak ada pencarian</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={histories}
          renderItem={({ item }) => <HistoryCard history={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
