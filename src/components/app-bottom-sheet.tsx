import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheetBackdropProps, BottomSheetModal} from '@gorhom/bottom-sheet';
// import {hp} from '../../utils/constants';

interface ReusableBottomSheetProps {
  bottomSheetModalRef?: React.MutableRefObject<BottomSheetModal | null>;
  snapPoints?: string[];
  backdropComponent: React.FC<BottomSheetBackdropProps>;
  handleSheetChanges?: (index: number) => void;
  children?: React.ReactNode;
}

const ReusableBottomSheet: React.FC<ReusableBottomSheetProps> = ({
  bottomSheetModalRef,
  snapPoints,
  backdropComponent,
  handleSheetChanges,
  children,
}) => {
  return (
    <BottomSheetModal
      backdropComponent={backdropComponent}
      ref={bottomSheetModalRef}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={styles.contentContainer}>{children}</View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: hp(1),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ReusableBottomSheet;
