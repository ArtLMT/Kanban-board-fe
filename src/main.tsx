import React from 'react';
import ReactDOM from 'react-dom/client'; // Import client API
import App from './App.tsx'; // Import component gốc của ứng
import { AuthProvider} from "./context/AuthContext.tsx";

// Lấy element DOM nơi ứng dụng sẽ được mount
const rootElement = document.getElementById('root');

// Bắt buộc phải kiểm tra hoặc khẳng định element tồn tại,
// nếu không TypeScript sẽ báo lỗi vì getElementById có thể trả về null.

if (!rootElement) {
    throw new Error('Không tìm thấy element có ID là "root".');
}

// Khởi tạo root và render component App
ReactDOM.createRoot(rootElement).render(
    // React.StrictMode giúp kiểm tra lỗi và cảnh báo trong quá trình phát triển
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
);