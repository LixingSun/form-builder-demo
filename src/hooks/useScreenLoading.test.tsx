import { fireEvent, render, screen } from '@testing-library/react';
import {
  SCREEN_LOADING_ACTION_TYPE,
  ScreenLoadingContext,
} from '@/context/ScreenLoadingContext';
import { useScreenLoading } from './useScreenLoading';
import { vi } from 'vitest';

describe('useScreenLoading', () => {
  test('should handle toggling on screen loading', () => {
    const TestComponent = () => {
      const { toggleOnScreenLoading } = useScreenLoading();

      return (
        <button
          data-testid="toggle-button"
          onClick={() => {
            toggleOnScreenLoading();
          }}
        >
          Toggle
        </button>
      );
    };

    const mockDispatch = vi.fn();
    render(
      <ScreenLoadingContext.Provider
        value={{
          isScreenLoading: false,
          isScreenLoadingDispatch: mockDispatch,
        }}
      >
        <TestComponent />
      </ScreenLoadingContext.Provider>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING,
      value: true,
    });
  });

  test('should handle toggling off screen loading', () => {
    const TestComponent = () => {
      const { toggleOffScreenLoading } = useScreenLoading();

      return (
        <button
          data-testid="toggle-button"
          onClick={() => {
            toggleOffScreenLoading();
          }}
        >
          Toggle
        </button>
      );
    };

    const mockDispatch = vi.fn();
    render(
      <ScreenLoadingContext.Provider
        value={{
          isScreenLoading: true,
          isScreenLoadingDispatch: mockDispatch,
        }}
      >
        <TestComponent />
      </ScreenLoadingContext.Provider>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING,
      value: false,
    });
  });
});
