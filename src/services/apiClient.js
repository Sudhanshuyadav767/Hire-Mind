const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const getAccessToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('hiremind_access_token');
};

export const getRefreshToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('hiremind_refresh_token');
};

export const setTokens = (accessToken, refreshToken) => {
  if (typeof window === 'undefined') return;
  if (accessToken) localStorage.setItem('hiremind_access_token', accessToken);
  if (refreshToken) localStorage.setItem('hiremind_refresh_token', refreshToken);
};

export const clearTokens = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('hiremind_access_token');
  localStorage.removeItem('hiremind_refresh_token');
  localStorage.removeItem('hiremind_user');
};

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    ...options.headers,
  };

  // If not FormData, set Content-Type to application/json
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getAccessToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized for token refresh
  if (response.status === 401 && !options._retry && getRefreshToken()) {
    options._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: getRefreshToken() }),
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          const newAccessToken = refreshData.data?.accessToken;
          const newRefreshToken = refreshData.data?.refreshToken;
          
          if (newAccessToken) {
            setTokens(newAccessToken, newRefreshToken);
            onRefreshed(newAccessToken);
            isRefreshing = false;
            
            // Retry initial request
            headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(url, { ...options, headers });
          } else {
            throw new Error('Refresh response missing token');
          }
        } else {
          clearTokens();
          isRefreshing = false;
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
      } catch (err) {
        clearTokens();
        isRefreshing = false;
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    } else {
      // Wait for refresh to complete
      return new Promise((resolve) => {
        subscribeTokenRefresh(async (newToken) => {
          headers['Authorization'] = `Bearer ${newToken}`;
          resolve(fetch(url, { ...options, headers }).then((res) => parseResponse(res)));
        });
      });
    }
  }

  return parseResponse(response);
}

async function parseResponse(response) {
  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    let errMsg = data.message || data.error || 'An error occurred during request execution.';
    if (data.errors && Array.isArray(data.errors)) {
      const details = data.errors.map(e => e.message || e.instancePath || JSON.stringify(e)).join('; ');
      if (details) errMsg = `${errMsg}: ${details}`;
    }
    const error = new Error(errMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
