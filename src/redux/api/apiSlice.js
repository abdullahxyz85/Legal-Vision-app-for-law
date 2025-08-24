import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '../../constants/enviroments';

// Define the base API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL, // Adjust this to your API base URL
    prepareHeaders: (headers) => {
      // Add authentication headers if needed
      const token = localStorage.getItem('authToken'); // Example of getting token from localStorage

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      // headers.set('Content-Type', 'application/json')
      return headers;
    },
  }),
  tagTypes: [
    'Campaign',
    'Device',
    'WhatsApp',
    'User',
    'browserProfileApi',
    'messageTemplateApi',
    'profileApi',
  ],
  endpoints: () => ({
    // Base endpoints can be defined here or in separate slices
  }),
});

export default apiSlice;
