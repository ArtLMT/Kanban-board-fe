import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { KanbanPage } from "./pages/KanbanPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
    const { user, loading, fetchUser } = useContext(AuthContext);
    const [page, setPage] = useState<"login" | "register">("login");

    if (loading) {
        return <div>Loading...</div>;
    }

    // ✅ NOT LOGGED IN
    if (!user) {
        return page === "login" ? (
            <LoginPage
                onSwitchToRegister={() => setPage("register")}
                // 👇 SỬA ĐÚNG 1 DÒNG NÀY THÔI 👇
                onLoginSuccess={async () => {
                    // Login xong -> Gọi ngay hàm này để update State
                    await fetchUser();
                }}
            />
        ) : (
            <RegisterPage onSwitchToLogin={() => setPage("login")} />
        );
    }

    // ✅ LOGGED IN
    return <KanbanPage />;
}

export default App;