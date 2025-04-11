export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  const token = getToken();
  const user = getUser();
  return !!token && !!user;
};
