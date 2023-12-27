import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux";
import CreateAllRoleModal from "../modals/create-all-role-modal/CreateUserAllRoleModal";
import { RxCross2 } from "react-icons/rx";
import './Overlays.css'
import { toggleCreateTenantModal, toggleCreateAllRoleModal, toggleDeleteUserModal, toggleResetPasswordModal, toggleUploadModal } from "../../features/modals/modalsSlice";
import CreateTenantModal from "../modals/create-tenant-modal/CreateTenantModal";
import DeleteUserModal from "../modals/deleteModal/DeleteUserModal";
import ResetPasswordModal from "../modals/resetPasswordModal/ResetPasswordModal";
import UploadModal from "../modals/uploadModal/UploadModal";
const mountElement = document.getElementById('overlays');

function Overlays() {
    const { showCreateUserModal, showCreateTenantModal, deleteUser, resetPasswordUser, isUploadModalOpen } = useSelector((state) => state.modals);
    const dispatch = useDispatch();

    const handleUserModal = (e) => {
        e.stopPropagation();
        dispatch(toggleCreateAllRoleModal())
    }
    const handleTenantModal = (e) => {
        e.stopPropagation();
        dispatch(toggleCreateTenantModal())
    }
    const handleDeleteUserModal = (e) => {
        e.stopPropagation();
        dispatch(toggleDeleteUserModal())

    }

    const handleResetPasswordModal = (e) => {
        e.stopPropagation();
        dispatch(toggleResetPasswordModal())
    }
    const handleUploadModalClose = () => {
        dispatch(toggleUploadModal())
    }
    return (
        createPortal(
            <div>
                {showCreateUserModal && <div className="modal" onClick={handleUserModal}>
                    <div
                        className="modal-content"
                    >
                        <RxCross2 onClick={handleUserModal} />
                        <CreateAllRoleModal />

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
                {deleteUser && <div className="modal">
                    <div className="modal-content">
                        <RxCross2 onClick={handleDeleteUserModal} />
                        <DeleteUserModal />
                    </div>
                </div>}
                {resetPasswordUser && <div className="modal">
                    <div className="modal-content">
                        <RxCross2 onClick={handleResetPasswordModal} />
                        <ResetPasswordModal />
                    </div>
                </div>}
                {isUploadModalOpen && <div className="modal">
                    <div className="modal-content">
                        <RxCross2 onClick={handleUploadModalClose} />
                        <UploadModal />
                    </div>
                </div>}

            </div>
            ,
            mountElement
        )
    )
}

export default Overlays