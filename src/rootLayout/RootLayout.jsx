import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import App from "../App";
const data = [
    {
        title: 'Home',
        path: '/root-admin'
    },

    {
        title: 'Tenant Management',
        path: '/tenants',
    },

    {
        title: 'User Management',
        path: '/users',
    },

]
function RootLayout() {

    return (
        <div className="root-layout">
            <Header />
            <main className="main">
                <Sidebar data={data} />
                <App>
                    <Outlet />
                </App>
            </main>
        </div>
    );
}

export default RootLayout;
