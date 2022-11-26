import { StackNavigationScreenProps } from "../router";

export const HOME_SCREEN_NAME = "Home Screen";
export type HOME_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof HOME_SCREEN_NAME> {}

export default function HomeScreen(props: Props) {
  return <></>;
}
