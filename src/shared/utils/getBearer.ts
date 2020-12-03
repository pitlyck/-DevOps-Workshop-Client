export const getBearer = (): string => 'Bearer ' + localStorage.getItem('user');

export const clearBearer = (): void => localStorage.setItem('user', '');
