import { createContext, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthActionContext = createContext();

export const AuthActionProvider = ({ children }) => {
  const actionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user has a valid token
  const hasToken = () => {
    const token = localStorage.getItem("access_token");
    return !!token;
  };

  // Execute action only if user is logged in, otherwise redirect to login
  const requireAuthAction = (action) => {
    if (!hasToken()) {
      // Store the action and redirect to login
      actionRef.current = action;
      navigate("/auth", { state: { from: location } });
      return;
    }
    // User is logged in, execute the action immediately
    action();
  };

  // Execute the saved action after login
  const runSavedAction = () => {
    if (actionRef.current) {
      const savedAction = actionRef.current;
      actionRef.current = null;
      savedAction();
    }
  };

  return (
    <AuthActionContext.Provider value={{ requireAuthAction, runSavedAction }}>
      {children}
    </AuthActionContext.Provider>
  );
};

export const useAuthAction = () => useContext(AuthActionContext);
