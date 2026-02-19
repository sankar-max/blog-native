import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

export type BottomSheetRef = BottomSheetModal;

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
  onDismiss?: () => void;
  footerComponent?: (props: any) => React.ReactElement | null;
}

import { useColorScheme } from 'react-native';

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, snapPoints = ['50%'], onDismiss, footerComponent }, ref) => {
    const isDarkMode = useColorScheme() === 'dark';

    // variables
    const initialSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    // callbacks
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
      ),
      []
    );

    const backgroundStyle = useMemo(
      () => ({
        backgroundColor: isDarkMode ? '#171717' : '#FFFFFF',
        borderRadius: 32,
      }),
      [isDarkMode]
    );

    const handleStyle = useMemo(
      () => ({
        backgroundColor: isDarkMode ? '#404040' : '#E5E5E5',
        width: 48,
      }),
      [isDarkMode]
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={initialSnapPoints}
        onDismiss={onDismiss}
        backdropComponent={renderBackdrop}
        footerComponent={footerComponent}
        enablePanDownToClose
        backgroundStyle={backgroundStyle}
        handleIndicatorStyle={handleStyle}
        enableDynamicSizing={false}>
        <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 0, // Let the content handle padding
  },
});
