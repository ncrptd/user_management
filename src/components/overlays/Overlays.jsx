import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux";
import CreateUserModal from "../modals/create-user-modal/CreateUserModal";
import { RxCross2 } from "react-icons/rx";
import './Overlays.css'
import { toggleCreateTenantModal, toggleCreateUserModal } from "../../features/modals/modalsSlice";
import CreateTenantModal from "../modals/create-tenant-modal/CreateTenantModal";
const mountElement = document.getElementById('overlays');

function Overlays() {
    const { showCreateUserModal, showCreateTenantModal } = useSelector((state) => state.modals);
    const dispatch = useDispatch();

    const handleUserModal = (e) => {
        e.stopPropagation();
        dispatch(toggleCreateUserModal())
    }
    const handleTenantModal = (e) => {
        e.stopPropagation();
        dispatch(toggleCreateTenantModal())
    }
    return (
        createPortal(
            <div>
                {showCreateUserModal && <div className="modal" onClick={handleUserModal}>
                    <div
                        className="modal-content"
                    >
                        <RxCross2 onClick={handleUserModal} />
                        <CreateUserModal />

                    </div>
                </div>}
                {showCreateTenantModal && <div className="modal" onClick={handleTenantModal}>
                    <div
                        className="modal-content"
                    >
                        <RxCross2 onClick={handleTenantModal} />
                        <CreateTenantModal />

                    </div>
                </div>}

            </div>
            ,
            mountElement
        )
    )
}

export default Overlays