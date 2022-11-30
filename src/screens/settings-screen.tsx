import * as React from 'react';
import { TabNavigationScreenProps } from '../router';
import SettingContent from '@app/components/modules/setting-screen/setting-screen-content';
import SettingScreenHeader from '@app/components/modules/setting-screen/setting-screen-header';

export const SETTINGS_SCREEN_NAME = 'Setting Screen';
export type SETTINGS_SCREEN_PARAMS = undefined;

interface Props extends TabNavigationScreenProps<typeof SETTINGS_SCREEN_NAME> {}

export default function SettingScreen(props: Props) {
  return (
    <>
      <SettingScreenHeader />
      <SettingContent {...props} />
    </>
  );
}
