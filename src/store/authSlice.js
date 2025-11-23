import { createSlice } from "@reduxjs/toolkit";

// --- Load user from localStorage ---
const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  } catch {
    return null;
  }
};

// --- Load all users (database simulation) ---
const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
};

// --- Helpers to save ---
const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const saveCurrentUser = (user) => {
  if (user) localStorage.setItem("currentUser", JSON.stringify(user));
  else localStorage.removeItem("currentUser");
};

// Initial redux state
const initialState = {
  user: loadUser(),
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup(state, action) {
      const { name, email, password, role } = action.payload;
      const users = loadUsers();

      const exists = users.find((u) => u.email === email);
      if (exists) {
        state.error = "An account with this email already exists.";
        return;
      }

      const newUser = { name, email, password, role };
      users.push(newUser);
      saveUsers(users);

      state.user = { name, email, role };
      saveCurrentUser(state.user);
      state.error = null;
    },

    login(state, action) {
      const { email, password } = action.payload;
      const users = loadUsers();

      const match = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!match) {
        state.error = "Invalid email or password.";
        return;
      }

      state.user = { name: match.name, email: match.email, role: match.role };
      saveCurrentUser(state.user);
      state.error = null;
    },

    // ---- THE FIX YOU NEEDED ----
    logout(state) {
      state.user = null;
      state.error = null;
      saveCurrentUser(null);
    },

    clearError(state) {
      state.error = null;
    }
  }
});

// Export ALL actions including logout
export const { signup, login, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
