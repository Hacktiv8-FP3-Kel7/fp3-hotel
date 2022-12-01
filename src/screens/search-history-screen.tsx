import SearchHistoryContent from '@app/components/modules/search-history-screen/search-history-content';
import * as React from 'react';

import { StackNavigationScreenProps } from '../router';

export const SEARCH_HISTORY_SCREEN_NAME = 'Search History Screen';
export type SEARCH_HISTORY_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof SEARCH_HISTORY_SCREEN_NAME> {}

export default function SeachHistoryScreen(props: Props) {
  return <SearchHistoryContent />;
}
