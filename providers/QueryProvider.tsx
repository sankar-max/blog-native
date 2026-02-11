import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { AppState, type AppStateStatus, Platform } from 'react-native';
import { queryClient } from '../lib/query-client';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
