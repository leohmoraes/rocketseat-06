import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  // const tron = Reactotron.configure({ host: '192.168.56.101' }).useReactNative().connect(); //se for emulado via USB
  // se não funcionar no emulador do Android, execute adb reverse tcp:9090 tcp:9090
  const tron = Reactotron.configure().useReactNative().connect();
  console.tron = tron;

  tron.clear();
}
