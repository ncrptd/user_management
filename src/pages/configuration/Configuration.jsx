import { useState } from "react";
import { writeFileXLSX, utils } from "xlsx";
import './Configuration.css'
import toast from "react-hot-toast";
import * as api from '../../api/index';
import { getLoggedUser } from "../../utils/getLoggedUser";
function Configuration() {
    const [modalVisible, setModalVisible] = useState(false);
    const [columnInputs, setColumnInputs] = useState([]);
    const [newColumn, setNewColumn] = useState({
        name: "",
        dataType: "",
        defaultValue: "",
        unitOfMeasure: "",
    });
    const [columns, setColumns] = useState([]);


    const excelDataTypes = ["Text", "Number", "Date", "Boolean"];
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setNewColumn({
            name: "",
            dataType: "",
            defaultValue: "",
            unitOfMeasure: "",
        });
    };

    const addColumnInputs = () => {
        const { name, dataType, defaultValue, unitOfMeasure } = newColumn;

        if (name.trim() !== "") {
            // Check if column with the same name already exists
            if (!columnInputs.includes(name)) {
                // Add new column
                setColumnInputs([...columnInputs, name]);
                setColumns((prevColumns) => [
                    ...prevColumns,
                    { name, dataType, defaultValue, unitOfMeasure },
                ]);
                setNewColumn({
                    name: "",
                    dataType: "",
                    defaultValue: "",
                    unitOfMeasure: "",
                });

            } else {
                toast.error("Column with the same name already exists!");
            }
        }
    };

    const handleDownloadTemplate = () => {
        const columnNamesOnly = columnInputs.map((columnName) => ({ [columnName]: '' }));
        console.log('c', columnNamesOnly)
        const ws = utils.json_to_sheet(columnNamesOnly);

        columnInputs.forEach((columnName, index) => {
            // Get the cell address for the first row and current column
            const cellAddress = utils.encode_cell({ r: 0, c: index });

            // Initialize the cell if it is undefined
            if (!ws[cellAddress]) {
                ws[cellAddress] = { t: 's', v: columnName, r: utils.encode_cell({ c: index, r: 0 }) };
            }

            // Create comments for the current column name
            const commentText = `Data Type: ${columns[index].dataType}\nDefault Value: ${columns[index].defaultValue}\nUnit Of Measure: ${columns[index].unitOfMeasure}`;

            // Initialize the comments array if it is undefined
            if (!ws[cellAddress].c) ws[cellAddress].c = [];

            // Add a comment to the cell
            ws[cellAddress].c.push({ a: "Comment Author", t: commentText });
        });

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Template");

        writeFileXLSX(wb, `ExcelTemplate-${Date.now()}.xlsx`, { bookType: "xlsx", bookSST: false, type: "blob" });
    };


    const handleTemplateSave = async (templateName) => {
        try {
            const { id } = getLoggedUser();

            if (columns.length > 0) {
                const templateData = {
                    templateName,
                    template: columns,
                    userId: id
                };

                console.log('Sending template data:', templateData);

                const res = await api.saveTemplate(templateData);

                if (res.status === 201) {
                    toast.success('Template saved successfully');
                } else {
                    toast.error('Error saving template. Please check the console for details.');
                    console.error('Error response:', res);
                }
            } else {
                toast.warn('No columns to save.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('Error While Saving Template');
        }
    };


    return (
        <div className="config-container">
            <h1>Configuration</h1>
            <table className="data-table">
                <thead>
                    <tr>
                        {columnInputs.map((columnName, index) => (
                            <th className="column-name" key={index}>
                                {columnName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {columns.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columnInputs.map((columnName, colIndex) => (
                                <td key={colIndex}>{row[columnName]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="create-sheet-button" onClick={openModal}>Create</button>

            {/* Modal */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Enter Column Details</h2>
                        <form>
                            <label>Column Name:</label>
                            <input
                                type="text"
                                value={newColumn.name}
                                onChange={(e) =>
                                    setNewColumn({ ...newColumn, name: e.target.value })
                                }
                            />

                            <label>Data Type:</label>
                            <select
                                value={newColumn.dataType}
                                onChange={(e) =>
                                    setNewColumn({ ...newColumn, dataType: e.target.value })
                                }
                            >
                                <option value="">Select Data Type</option>
                                {excelDataTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            <label>Default Value:</label>
                            <input
                                type="text"
                                value={newColumn.defaultValue}
                                onChange={(e) =>
                                    setNewColumn({ ...newColumn, defaultValue: e.target.value })
                                }
                            />

                            <label>Unit Of Measure:</label>
                            <input
                                type="text"
                                value={newColumn.unitOfMeasure}
                                onChange={(e) =>
                                    setNewColumn({
                                        ...newColumn,
                                        unitOfMeasure: e.target.value,
                                    })
                                }
                            />

                            <button type="button" onClick={addColumnInputs}>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {columns.length > 0 && <>
                <button onClick={handleDownloadTemplate}>
                    Download Template
                </button>
                {/* <button onClick={handleTemplateSave}>
                    Save Template
                </button> */}

            </>}

        </div>
    );
}

export default Configuration;
