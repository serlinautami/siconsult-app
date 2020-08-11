export * from './colors';
export * from './fonts';
export * from './useForm';
export * from './localstorage';
export * from './showMessage';
export * from './date';
export * from './constant';

export const getReportType = function (type) {
  switch (type) {
    case 'daily':
      return 'Harian';
    case 'monthly':
      return 'Harian';
    case 'yearly':
      return 'Tahunan';
    default:
      return '';
  }
};
