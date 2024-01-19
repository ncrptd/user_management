import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import App from "../App";
import Footer from "../components/footer/Footer";

function RootLayout() {

    return (
        <div className="root-layout">
            <Header />
            <main className="main">
                <Sidebar />
                <App>
                    <Outlet />
                </App>
            </main>
            <Footer />
        </div>
    );
}

export default RootLayout;
