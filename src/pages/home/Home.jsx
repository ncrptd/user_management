
import RootAdminUsers from "../../components/RootAdmin/RootAdminUsers";
import TenantAdminUsers from "../../components/TenantAdmin/TenantAdminUsers";
import { getLoggedUser } from "../../utils/getLoggedUser";

import './Home.css'

function Home() {


    const loggedInUser = getLoggedUser();



    return (
        <div className="home">
            {loggedInUser?.role === 'ROOT_ADMIN' && <RootAdminUsers />}
            {loggedInUser?.role === 'TENANT_ADMIN' && <TenantAdminUsers />}
            <div className="regular-user">
                {loggedInUser?.role === 'TENANT' && <p>Work in Progress</p>}
                {loggedInUser?.role === 'USER' && <p>Work in Progress</p>}
            </div>
        </div>
    )
}

export default Home