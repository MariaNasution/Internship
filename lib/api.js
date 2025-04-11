const BASE_API_URL = "http://localhost:3001";
const API_URL = "http://localhost:3001/users";
const REQRES_API = "https://reqres.in/api";

// User API calls
export const registerUser = async (userData) => {
  try {
    // Cek apakah hanya menggunakan reqres.in atau juga perlu simpan ke lokal
    const useReqres = userData.email && userData.email.endsWith('@reqres.in');
    
    if (useReqres) {
      // Gunakan reqres.in untuk email yang berakhiran @reqres.in
      const response = await fetch(`${REQRES_API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registrasi reqres.in gagal');
      }
      
      return await response.json();
    } else {
      // Gunakan API lokal untuk email lainnya
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          id: Date.now(),
          token: "local-token-" + Math.random().toString(36).substring(2, 15)
        })
      });
      
      if (!response.ok) {
        throw new Error('Registrasi lokal gagal');
      }
      
      const result = await response.json();
      return { id: result.id, token: result.token };
    }
  } catch (error) {
    console.error("Registrasi gagal:", error);
    throw new Error(error.message || 'Registrasi gagal');
  }
};

export const loginUser = async (email, password) => {
  try {
    // Cek apakah menggunakan reqres.in atau database lokal
    const useReqres = email && email.endsWith('@reqres.in');
    
    if (useReqres) {
      // Gunakan reqres.in untuk email yang berakhiran @reqres.in
      const response = await fetch(`${REQRES_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login reqres.in gagal');
      }

      return await response.json();

      
    } else {
      // Gunakan API lokal untuk email lainnya
      const usersResponse = await fetch(`${API_URL}?email=${email}`);
      const users = await usersResponse.json();
      
      if (!users || users.length === 0) {
        throw new Error('Email tidak terdaftar');
      }
      
      const user = users[0];
      
      // Periksa password (dalam kasus nyata, password harusnya di-hash)
      if (user.password !== password) {
        throw new Error('Password salah');
      }
      
      return {
        token: user.token || "local-token-" + Math.random().toString(36).substring(2, 15),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName // bukan fullName4
        }
      };
      
    }
  } catch (error) {
    console.error("Login gagal:", error);
    throw new Error(error.message || 'Login gagal');
  }
};

export const getUserProfile = async (userId) => {
  try {
    // Coba dapatkan dari server lokal
    const response = await fetch(`${BASE_API_URL}/${userId}`);
    
    if (!response.ok) {
      // Jika tidak ditemukan di lokal, coba dari reqres.in
      const reqresResponse = await fetch(`${REQRES_API}/users/${userId}`);
      if (!reqresResponse.ok) {
        throw new Error('Gagal mengambil profil pengguna');
      }
      const reqresData = await reqresResponse.json();
      return reqresData.data; // reqres menyimpan data dalam property 'data'
    }
    
    const user = await response.json();
    // Hilangkan password dari data yang dikembalikan
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Gagal mengambil profil:", error);
    throw new Error('Gagal mengambil profil pengguna');
  }
};
    export const updateUser = async (id, updatedData) => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        });

    if (!response.ok) {
      throw new Error('Gagal mengupdate profil pengguna');
    }

    return await response.json();
  } catch (error) {
    console.error("Update gagal:", error);
    throw new Error(error.message || 'Update gagal');
  }
};

// Transaction API calls tetap menggunakan JSON server lokal
export const getTransactions = async (userId) => {
  const response = await fetch(`${BASE_API_URL}/transactions?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Gagal mengambil transaksi');
  }   
  return response.json();
};

export const getTransaction = async (id) => {
  const response = await fetch(`${BASE_API_URL}/transactions/${id}`);
  if (!response.ok) {
    throw new Error('Gagal mengambil detail transaksi');
  }
  return response.json();
};

export const createTransaction = async (transactionData) => {
  const response = await fetch(`${BASE_API_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transactionData)
  });
  if (!response.ok) {
    throw new Error('Gagal membuat transaksi');
  }
  return response.json();
};

export const updateTransaction = async (id, transactionData) => {
  const response = await fetch(`${BASE_API_URL}/transactions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transactionData)
  });
  if (!response.ok) {
    throw new Error('Gagal memperbarui transaksi');
  }
  return response.json();
};

export const deleteTransaction = async (id) => {
  const response = await fetch(`${BASE_API_URL}/transactions/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Gagal menghapus transaksi');
  }
  return { success: true };
};