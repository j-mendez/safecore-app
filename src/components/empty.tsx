import React, {useCallback} from 'react';
import {Alert, Button, Linking, View, Text} from 'react-native';
import {styles} from '../styles/containers';

type Props = {
  url?: string;
};

export const Empty: React.FC<Props> = ({
  children,
  url = 'https://github.com/SafeWare/safecore#getting-started',
}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <Text>Please start the API</Text>
      <Button title={'View Docs'} onPress={handlePress} />
      {children}
    </View>
  );
};
