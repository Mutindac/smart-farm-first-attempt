const BASE_URL = "http://127.0.0.1:7000";

async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
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

export const createField = (data, token) =>
  fetch("http://127.0.0.1:7000/fields/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(res => res.json());


export const updateField = (id, data, token) =>
  fetch(`http://127.0.0.1:7000/fields/update/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const getMyFields = (token) =>
  fetch("http://127.0.0.1:7000/fields/my-fields/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());



export const getAgents = (token) =>
  fetch("http://127.0.0.1:7000/accounts/agents/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());


export const createFieldUpdate = (data, token) =>
  fetch("http://127.0.0.1:7000/updates/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const getFieldUpdates = (fieldId, token) =>
  fetch(`${BASE_URL}/updates/${fieldId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());

export const getAdminFields = (token) =>
  fetch(`${BASE_URL}/fields/admin-fields/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());

export const deleteField = (id, token) =>
  fetch(`${BASE_URL}/fields/delete/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
