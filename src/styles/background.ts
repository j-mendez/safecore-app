export const backgroundColor = (isDarkMode: boolean, inverse?: boolean) =>
  isDarkMode && !inverse ? '#000' : '#fff';
