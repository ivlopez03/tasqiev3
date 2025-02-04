/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase";
import { useEffect, useState, useContext, createContext } from "react";

const SessionContext = createContext();

export function useAuth() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        setSession(null);
        setUserLoggedIn(false);
        navigate("/login", { replace: true });
      } else if (session) {
        setSession(session);
        setUserLoggedIn(true);
        setUser(session.user.user_metadata);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    userLoggedIn,
    user,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
