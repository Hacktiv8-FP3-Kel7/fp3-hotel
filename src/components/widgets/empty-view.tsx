import typography from '@app/styles/typography';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title?: string;
}
export default function EmptyView(props: Props) {
  const { title = 'Data tidak ditemukan' } = props;
  const animationRef = React.useRef<AnimatedLottieView>(null);
  React.useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        loop={true}
        source={require('../../../assets/lottie/empty.json')}
        ref={animationRef}
        style={styles.emptyStyle}
      />
      <Text style={[typography.title, { marginTop: 12 }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 500,
    height: 500,
  },
  emptyStyle: {
    height: '90%',
    alignSelf: 'center',
  },
});
