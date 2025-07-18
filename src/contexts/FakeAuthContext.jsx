import { createContext, useContext, useReducer } from "react"
import { FAKE_USER } from "../_config"

const AuthContext = createContext();

const initialState = {

     user: null,
     isAuthenticated: false,

}
function reducer(state, action) {

     switch (action.type) {

          case "login":
               return {
                    ...state,
                    user: action.payload,
                    isAuthenticated: true,
               }

          case "logout":
               return {
                    ...state,
                    user: null,
                    isAuthenticated: false,
               }

          default: throw new Error("Unkown Action Type.");

     }

}

export function AuthProvider({ children }) {

     const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

     function login(email, password) {
          if (email === FAKE_USER.email && password === FAKE_USER.password) dispatch({ type: "login", payload: FAKE_USER })
     }

     function logout() {
          dispatch({ type: "logout" })
     }

     return (

          <AuthContext.Provider value={{
               user,
               isAuthenticated,
               login,
               logout,
          }}>
               {children}
          </AuthContext.Provider>

     )

}

export function useAuth() {

     const context = useContext(AuthContext);
     if (context === undefined) throw new Error("Auth Provider The Outside.");
     return context;

}