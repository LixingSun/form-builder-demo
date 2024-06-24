import { render, screen } from '@testing-library/react';
import {
  ScreenLoadingProvider,
  screenLoadingReducer,
  SCREEN_LOADING_ACTION_TYPE,
} from './ScreenLoadingContext';

describe('ScreenLoadingProviderContext', () => {
  describe('ScreenLoadingProviderProvider', () => {
    test('should render children and loading modal', () => {
      const text = 'Test';
      render(
        <ScreenLoadingProvider>
          <div>{text}</div>
        </ScreenLoadingProvider>
      );
      const childrenElement = screen.getByText(text);
      const loadingElement = screen.getByTestId('screen-loading-progress');
      expect(childrenElement).toBeInTheDocument();
      expect(loadingElement).toBeInTheDocument();
    });
  });

  describe('screenReducer', () => {
    test('should handle screen loading toggle', () => {
      const updatedLoadingStatus = screenLoadingReducer(false, {
        type: SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING,
        value: true,
      });

      expect(updatedLoadingStatus).toBeTruthy();
    });
  });
});
