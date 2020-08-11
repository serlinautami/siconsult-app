import { showMessage } from '@libraries';
import { colors } from '../colors';

export const showError = (message, options = {}) => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.error,
    color: colors.white,
    ...options
  });
};

export const showSuccess = (message, options = {}) => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.primary,
    color: colors.white,
    ...options
  });
};
