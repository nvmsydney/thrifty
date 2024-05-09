export const logoutUser = () => {
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'bio=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};