import React from 'react';
import Navigation from './src/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';

export default function AppRecoilWrapper() {
  return (
      <RecoilRoot>
        <App />
      </RecoilRoot>
  );
}

export function App() {
  
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
