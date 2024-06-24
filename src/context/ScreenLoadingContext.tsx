import { ReactNode, createContext, useReducer } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export enum SCREEN_LOADING_ACTION_TYPE {
  TOGGLE_SCREEN_LOADING = 'toggleScreenLoading',
}
interface ITOGGLE_SCREEN_LOADING {
  type: SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING;
  value: boolean;
}
export type screenLoadingAction = ITOGGLE_SCREEN_LOADING;

export const screenLoadingReducer = (
  isScreenLoading: boolean,
  action: screenLoadingAction
): boolean => {
  switch (action.type) {
    case SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING:
      return action.value;
  }
};

interface IScreenLoadingContextProps {
  isScreenLoading: boolean;
  isScreenLoadingDispatch: React.Dispatch<screenLoadingAction>;
}
export const ScreenLoadingContext = createContext<IScreenLoadingContextProps>({
  isScreenLoading: false,
  isScreenLoadingDispatch: () => undefined,
});

export const ScreenLoadingProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isScreenLoading, isScreenLoadingDispatch] = useReducer(
    screenLoadingReducer,
    true
  );

  return (
    <ScreenLoadingContext.Provider
      value={{ isScreenLoading, isScreenLoadingDispatch }}
    >
      {children}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isScreenLoading}
      >
        <CircularProgress
          data-testid="screen-loading-progress"
          color="inherit"
        />
      </Backdrop>
    </ScreenLoadingContext.Provider>
  );
};
