import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import './Overlays.css'
import { toggleUploadModal } from "../../features/modals/modalsSlice";
import UploadModal from "../modals/uploadModal/UploadModal";
const mountElement = document.getElementById('overlays');

function Overlays() {
    const { isUploadModalOpen } = useSelector((state) => state.modals);
    const dispatch = useDispatch();




    const handleUploadModalClose = () => {
        dispatch(toggleUploadModal())
    }
    return (
        createPortal(
            <div>

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