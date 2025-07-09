export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/api/auth/login`,
    REGISTER: `${API_URL}/api/auth/register`,
    LOGOUT: `${API_URL}/api/auth/logout`,
    ME: `${API_URL}/api/auth/me`,
  },
  BLOGS: {
    BASE: `${API_URL}/api/blogs`,
    MY_BLOGS: `${API_URL}/api/blogs/my-blogs`,
    BY_ID: (id: string) => `${API_URL}/api/blogs/${id}`,
  },
  BOOKMARKS: {
    BASE: `${API_URL}/api/bookmarks`,
    BY_ID: (id: string) => `${API_URL}/api/bookmarks/${id}`,
  },
}
