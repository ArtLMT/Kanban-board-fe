import { useState } from 'react';
import { KanbanPage } from './pages/KanbanPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

type AuthState = 'login' | 'register' | 'authenticated';

function App() {
    const [authState, setAuthState] = useState<AuthState>('login');
    const [username, setUsername] = useState<string>('');

    const handleLoginSuccess = (user: string) => {
        setUsername(user);
        setAuthState('authenticated');
    };

    const handleRegisterSuccess = (user: string) => {
        setUsername(user);
        setAuthState('authenticated');
    };

    const handleLogout = () => {
        setUsername('');
        setAuthState('login');
    };

    if (authState === 'login') {
        return (
            <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={() => setAuthState('register')}
            />
        );
    }

    if (authState === 'register') {
        return (
            <RegisterPage
                onRegisterSuccess={handleRegisterSuccess}
                onSwitchToLogin={() => setAuthState('login')}
            />
        );
    }

    return <KanbanPage username={username} onLogout={handleLogout} />;
}

export default App;