const BASE_URL = "http://127.0.0.1:7000";

async function request(url, options = {}, isFormData = false) {
  const headers = isFormData
    ? {
        ...(options.headers || {})
      }
    : {
        "Content-Type": "application/json",
        ...(options.headers || {})
      };

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers
  });

  return res.json();
}

// AUTH
export const login = (data) =>
  request("/accounts/login/", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const register = (data) =>
  request("/accounts/register/", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const logout = (token, refresh) =>
  request("/accounts/logout/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ refresh })
  });

// FIELDS
export const createField = (data, token) =>
  request("/fields/create/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

export const updateField = (id, data, token) =>
  request(`/fields/update/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

export const getMyFields = (token) =>
  request("/fields/my-fields/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getAdminFields = (token) =>
  request("/fields/admin-fields/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const deleteField = (id, token) =>
  request(`/fields/delete/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

// AGENTS
export const getAgents = (token) =>
  request("/accounts/agents/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

// FIELD UPDATES
export const createFieldUpdate = (data, token) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return request(
    "/updates/create/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    },
    true
  );
};

export const getFieldUpdates = (fieldId, token) =>
  request(`/updates/${fieldId}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });