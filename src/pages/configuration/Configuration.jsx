import { useState } from "react";
import './Configuration.css';

function Configuration() {

    const [modalVisible, setModalVisible] = useState(false);
    const [columnInputs, setColumnInputs] = useState([]);
    const [newColumnInputName, setNewColumnInputName] = useState('');
    const [inputValues, setInputValues] = useState({});
    const [columns, setColumns] = useState([])


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setNewColumnInputName('');
    };

    const addColumnInputs = () => {
        if (newColumnInputName.trim() !== '' && !columnInputs.includes(newColumnInputName)) {
            setColumnInputs([...columnInputs, newColumnInputName]);
            setNewColumnInputName('');
        }
    };

    const handleInputChange = (columnName, value) => {
        setInputValues({ ...inputValues, [columnName]: value });
    };

    const handleSave = () => {
        console.log("Input Values:", Object.values(inputValues));
        setColumns(Object.values(inputValues))
    };

    return (
        <div className="config-container">
            <h1>Configuration</h1>
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((columnName) => (
                            <th className="column-name" key={columnName}>
                                {columnName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {columns.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((columnName) => (
                                <td key={columnName}>{row[columnName]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>


            <button onClick={openModal}>Create</button>

            {columnInputs.length > 0 && (
                <div className="configure-columns">
                    <h3>Configure Columns:</h3>
                    {columnInputs.map((columnName, index) => (
                        <div key={index}>
                            <label>{columnName}:</label>
                            <input
                                type="text"
                                value={inputValues[columnName] || ''}
                                onChange={(e) => handleInputChange(columnName, e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
            {/* Modal */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Enter Name</h2>
                        <input
                            type="text"
                            value={newColumnInputName}
                            onChange={(e) => setNewColumnInputName(e.target.value)}
                        />
                        <button onClick={addColumnInputs}>Add</button>
                    </div>
                </div>
            )}


        </div >
    );
}

export default Configuration;
