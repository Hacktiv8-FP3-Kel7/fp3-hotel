// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import Header from '@app/components/widgets/header';
interface Props {
  title: string;
  back?: boolean;
}
export default function HomeScreenHeader(props: Props) {
  const { back, title } = props;
  return <Header title={title} titleCenter back={back} />;
}
