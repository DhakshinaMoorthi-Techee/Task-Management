"use client";

import LoaderComponent from "@/components/loader";
import Snackbar from "@/components/snackbar";
import React, { useContext, useState, ReactNode, createContext } from "react";

interface AuthContextType {
  user: { username: string; email: string; password: string } | null;
  formDatas: string[] | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => void;
  onPriorityChange: (value: any, id: any) => void;
  saveFormData: (formData: any) => void;
  setLoading: (load: boolean) => void;
  deleteData: (formData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    username: string;
    email: string;
    password: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const [formDatas, setFormDatas]: any = useState([]);

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState("");

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const storedUser = localStorage.getItem("user");
      const formData = localStorage.getItem("formData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (formData) {
        setFormDatas(JSON.parse(formData));
      }
      setLoading(false);
    }, 500);
  }, []);

  const register = (username: string, email: string, password: string) => {
    const newUser = { username, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setSnackBarMessage("Registered Successfully");
    setSnackbarOpen(true);
    setUser(newUser);
  };

  const login = (username: string, password: string): boolean => {
    const storedUser = localStorage.getItem("user");
    if (storedUser != 'null' && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (
        parsedUser.username === username &&
        parsedUser.password === password
      ) {
        setUser(parsedUser);
        setSnackBarMessage("LoggedIn Successfully");
        setSnackbarOpen(true);
        return true;
      } else {
        setSnackBarMessage("Email or Password mismatch");
        setSnackbarOpen(true);
        return false;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const deleteData = (value: any) => {
    const temp: any = formDatas;
    if (value.id) {
      const index = temp.indexOf(value);
      temp.splice(index, 1);
      setFormDatas([...temp]);
    }
    localStorage.setItem("formData", JSON.stringify([...temp]));
  };

  const saveFormData = (value: any) => {
    const temp: any = formDatas ?? [];
    if (!value.id) {
      temp.push({ ...value, id: formDatas?.length + 1 });
      setFormDatas([...temp]);
    } else {
      let index = temp.findIndex((s:any) => s.id == value.id);
      temp[index] = value;
      setFormDatas([...temp]);
    }
    localStorage.setItem("formData", JSON.stringify([...temp]));
  };

  const onPriorityChange = (value:any, id:number) => {
    const temp: any = formDatas;
    if (id) {
      temp.map((s:any) => {
        if (s.id == id) {
          s.priority = value;
        }
      });
      setFormDatas([...temp]);
    }
    localStorage.setItem("formData", JSON.stringify([...temp]));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        saveFormData,
        formDatas,
        onPriorityChange,
        setLoading,
        deleteData
      }}
    >
      {children}
      <Snackbar
        message={snackbarMessage}
        isOpen={isSnackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
      {loading && <LoaderComponent />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
