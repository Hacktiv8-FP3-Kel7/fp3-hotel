import Profile from '@app/modules/profile/index';
import * as React from 'react';

import { TabNavigationScreenProps } from '../router';

export const PROFILE_SCREEN_NAME = 'Profile Screen';
export type PROFILE_SCREEN_PARAMS = undefined;

interface Props extends TabNavigationScreenProps<typeof PROFILE_SCREEN_NAME> {}

export default function ProfileScreen(props: Props) {
  return <Profile />;
}
