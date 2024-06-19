import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@mui/material';

export const ScreenLoadingContext = createContext(null);
export const ScreenLoadingDispatchContext = createContext(null);

export const ACTION_TYPE_TOGGLE_SCREEN_LOADING = 'toggleScreenLoading';

export const screenLoadingReducer = (isLoading, action) => {
  switch (action.type) {
    case ACTION_TYPE_TOGGLE_SCREEN_LOADING:
      return action.value;
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export function ScreenLoadingProvider({ children }) {
  const [isLoading, dispatch] = useReducer(screenLoadingReducer, true);

  return (
    <ScreenLoadingContext.Provider value={isLoading}>
      <ScreenLoadingDispatchContext.Provider value={dispatch}>
        {children}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress
            data-testid="screen-loading-progress"
            color="inherit"
          />
        </Backdrop>
      </ScreenLoadingDispatchContext.Provider>
    </ScreenLoadingContext.Provider>
  );
}

ScreenLoadingProvider.propTypes = {
  children: PropTypes.node,
};
