import { View } from 'react-native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';
import Text from '@app/components/elements/text';
import { FlatList } from 'react-native-gesture-handler';
import Header from '@app/components/widgets/header';
import SearchHistoryCard from './search-history-card';
import EmptyView from '@app/components/widgets/empty-view';

export default function SearchHistoryContent() {
  const histories = useSelector(authSelector.searchHistories);
  return (
    <>
      <Header title="History Screen" titleCenter back />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        {histories.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <EmptyView title={'Tidak Ada History Pencarian'} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={histories}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => <SearchHistoryCard history={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </>
  );
}