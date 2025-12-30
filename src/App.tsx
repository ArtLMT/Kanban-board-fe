// import { useState, useContext } from 'react';
// import { KanbanPage } from './pages/KanbanPage';
// import { LoginPage } from './pages/LoginPage';
// import { RegisterPage } from './pages/RegisterPage';
// import {AuthContext} from "./context/AuthContext.tsx";
//
// type AuthState = 'login' | 'register' | 'authenticated';
//
// function App() {
//     const [authState, setAuthState] = useState<AuthState>('login');
//     const [username, setUsername] = useState<string>('');
//
//     const { user, loading } = useContext(AuthContext);
//
//
//     const handleLoginSuccess = (user: string) => {
//         setUsername(user);
//         setAuthState('authenticated');
//     };
//
//     const handleRegisterSuccess = (user: string) => {
//         setUsername(user);
//         setAuthState('authenticated');
//     };
//
//     const handleLogout = () => {
//         setUsername('');
//         setAuthState('login');
//     };
//
//     if (authState === 'login') {
//         return (
//             <LoginPage
//                 onLoginSuccess={handleLoginSuccess}
//                 onSwitchToRegister={() => setAuthState('register')}
//             />
//         );
//     }
//
//     if (authState === 'register') {
//         return (
//             <RegisterPage
//                 onRegisterSuccess={handleRegisterSuccess}
//                 onSwitchToLogin={() => setAuthState('login')}
//             />
//         );
//     }
//
//     return <KanbanPage username={username} onLogout={handleLogout} />;
// }
//
// export default App;

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { KanbanPage } from "./pages/KanbanPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useState } from "react";

function App() {
    const { user, loading } = useContext(AuthContext);
    const [page, setPage] = useState<"login" | "register">("login");

    if (loading) {
        return <div>Loading...</div>;
    }

    // ✅ NOT LOGGED IN
    if (!user) {
        return page === "login" ? (
            <LoginPage onSwitchToRegister={() => setPage("register")} />
        ) : (
            <RegisterPage onSwitchToLogin={() => setPage("login")} />
        );
    }

    // ✅ LOGGED IN
    return <KanbanPage />;
}

export default App;
