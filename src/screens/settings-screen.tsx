import Setting from '@app/components/modules/setting';
import * as React from 'react';

import { StackNavigationScreenProps } from '../router';

export const SETTINGS_SCREEN_NAME = 'Setting Screen';
export type SETTINGS_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof SETTINGS_SCREEN_NAME> {}

export default function SettingScreen(props: Props) {
  return <Setting {...props} />;
}
