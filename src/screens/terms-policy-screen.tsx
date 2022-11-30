import TermsPolicyContent from '@app/components/modules/terms-policy-screen/terms-policy-content';
import TermsPolicyScreenHeader from '@app/components/modules/terms-policy-screen/terms-policy-screen-header';
import { StackNavigationScreenProps } from '@app/router';
import React from 'react';
import { StyleSheet } from 'react-native';

export const TERMS_POLICY_SCREEN_NAME = 'Terms Policy Screen';
export type TERMS_POLICY_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof TERMS_POLICY_SCREEN_NAME> {}

export default function TermsPolicyScreen(props: Props) {
  return (
    <>
      <TermsPolicyScreenHeader />
      <TermsPolicyContent />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
