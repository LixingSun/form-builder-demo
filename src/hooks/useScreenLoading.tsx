import { useContext, useEffect } from 'react';
import {
  SCREEN_LOADING_ACTION_TYPE,
  ScreenLoadingContext,
} from '@/context/ScreenLoadingContext';

interface IUseScreenLoading {
  isScreenLoading: boolean;
  toggleOnScreenLoading(): void;
  toggleOffScreenLoading(): void;
}

export const useScreenLoading = (): IUseScreenLoading => {
  const { isScreenLoading, isScreenLoadingDispatch } =
    useContext(ScreenLoadingContext);

  const toggleOnScreenLoading = () => {
    isScreenLoadingDispatch({
      type: SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING,
      value: true,
    });
  };

  const toggleOffScreenLoading = () => {
    isScreenLoadingDispatch({
      type: SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING,
      value: false,
    });
  };

  useEffect(() => {
    toggleOffScreenLoading();
  }, [isScreenLoadingDispatch]);

  return {
    isScreenLoading,
    toggleOnScreenLoading,
    toggleOffScreenLoading,
  };
};
