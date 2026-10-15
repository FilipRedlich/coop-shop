// Helper to read Django CSRF cookie
export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

async function request(url, options = {}) {
  const headers = {
    'Accept': 'application/json',
    ...(options.headers || {}),
  };

  const method = (options.method || 'GET').toUpperCase();
  if (method !== 'GET') {
    const csrftoken = getCookie('csrftoken');
    if (csrftoken) {
      headers['X-CSRFToken'] = csrftoken;
    }
    if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'same-origin',
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMsg = data?.error || data?.detail || response.statusText || 'Wystąpił błąd zapytania.';
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Categories & Catalog
  getCategories: () => request('/api/categories/'),
  getSubcategories: (catId) => request(catId ? `/api/subcategories/?category=${catId}` : '/api/subcategories/'),
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.subcategory) query.append('subcategory', params.subcategory);
    if (params.search) query.append('search', params.search);
    if (params.onSale) query.append('on_sale', 'true');
    if (params.ordering) query.append('ordering', params.ordering);
    const qs = query.toString();
    return request(`/api/products/${qs ? `?${qs}` : ''}`);
  },
  getProduct: (id) => request(`/api/products/${id}/`),
  getHotshot: () => request('/api/hotshot/'),
  setHotshot: (productId, discountMultiplier) =>
    request('/api/hotshot/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, discount_multiplier: discountMultiplier }),
    }),

  // Cart
  getCart: () => request('/api/cart/'),
  addToCart: (productId, quantity = 1) =>
    request('/api/cart/add/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    }),
  updateCartQuantity: (productId, quantity) =>
    request('/api/cart/update/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    }),
  removeFromCart: (productId) =>
    request('/api/cart/remove/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    }),
  clearCart: () => request('/api/cart/clear/', { method: 'POST' }),

  // Auth
  getMe: () => request('/api/auth/me/'),
  login: (username, password) =>
    request('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  register: (username, email, password) =>
    request('/api/auth/register/', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),
  logout: () => request('/api/auth/logout/', { method: 'POST' }),

  // Newsletter & Checkout
  subscribeNewsletter: (email) =>
    request('/api/newsletter/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  checkout: (orderData) =>
    request('/api/checkout/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
};
