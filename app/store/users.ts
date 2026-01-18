import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserStoreState {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updatedData: User) => void;
  removeUser: (id: string) => void;
  setUsers: (users: User[]) => void;
}

export const usersStore = create<UserStoreState>((set) => ({
  users: [],

  addUser: (user) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },

  updateUser: (id: string, updatedData: User) => {
    set((state) => ({
      users: state.users.map((user) => {
        return user.id === id ? { ...user, ...updatedData } : user;
      }),
    }));
  },

  removeUser: (id: string) => {
    set((state) => {
      return {
        users: state.users.filter((user) => {
          return user.id !== id;
        }),
      };
    });
  },

  setUsers(users) {
    set((state) => ({
      users,
    }));
  },
}));
