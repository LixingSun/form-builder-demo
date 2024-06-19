import { render, screen } from '@testing-library/react';
import {
  ScreenLoadingProvider,
  screenLoadingReducer,
  ACTION_TYPE_TOGGLE_SCREEN_LOADING,
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
        type: ACTION_TYPE_TOGGLE_SCREEN_LOADING,
        value: true,
      });

      expect(updatedLoadingStatus).toBeTruthy();
    });

    test('should throw error for unhandled action type', () => {
      expect(() => {
        screenLoadingReducer(false, {
          type: 'unknown',
        });
      }).toThrowError();
    });
  });
});
