import { BackHandler, Alert } from 'react-native';

let backHandlerRegistered = false;

const disableBackButton = () => {
  if (!backHandlerRegistered) {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    backHandlerRegistered = true;
  }
};

const enableBackButton = () => {
  if (backHandlerRegistered) {
    BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    backHandlerRegistered = false;
  }
};

const handleBackPress = () => {
  Alert.alert(
    'Exit App',
    'Are you sure you want to exit the app?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', onPress: () => BackHandler.exitApp() }
    ],
    { cancelable: false }
  );

  return true;
};

const resetBackButton = () => {
  enableBackButton();
  disableBackButton();
};

export { disableBackButton, enableBackButton };
