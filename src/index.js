import React from 'react';
// import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';

console.tron.log('src/index');
// console.tron.warning('teste');
/*
export default function App() {
  return <Routes />;
}
*/

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#715971" />
      <Routes />
    </>
  );
}

// const App = () => <Routes />;
// export default App;
