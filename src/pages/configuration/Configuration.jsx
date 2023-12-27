import { useState } from "react";
import { writeFileXLSX, utils } from "xlsx";
import './Configuration.css'
import toast from "react-hot-toast";
import * as api from '../../api/index';
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

    const [templateNameInput, setTemplateNameInput] = useState("");
    const [saveModalVisible, setSaveModalVisible] = useState(false);

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
            if (!columnInputs.includes(name)) {
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
            const cellAddress = utils.encode_cell({ r: 0, c: index });

            if (!ws[cellAddress]) {
                ws[cellAddress] = { t: 's', v: columnName, r: utils.encode_cell({ c: index, r: 0 }) };
            }

            const commentText = `Data Type: ${columns[index].dataType}\nDefault Value: ${columns[index].defaultValue}\nUnit Of Measure: ${columns[index].unitOfMeasure}`;

            if (!ws[cellAddress].c) ws[cellAddress].c = [];

            ws[cellAddress].c.push({ a: "Comment Author", t: commentText });
        });

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Template");

        writeFileXLSX(wb, `ExcelTemplate-${Date.now()}.xlsx`, { bookType: "xlsx", bookSST: false, type: "blob" });
    };


    const handleTemplateSave = async (templateName) => {
        try {
            if (columns.length > 0) {
                const templateData = {
                    templateName: templateName,
                    template: columns,
                };

                console.log('Sending template data:', templateData);

                const res = await api.saveTemplate(templateData);

                if (res.status === 201 || res.status === 200) {
                    console.log(res.data.message)
                    toast.success(res.data.message);
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

            {columns.length > 0 && (
                <>
                    <button onClick={handleDownloadTemplate}>Download Template</button>
                    <button onClick={() => setSaveModalVisible(true)}>Save Template</button>
                </>
            )}

            {/* Save Template Modal */}
            {saveModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSaveModalVisible(false)}>
                            &times;
                        </span>
                        <h2>Save Template</h2>
                        <form>
                            <label>Template Name:</label>
                            <input
                                type="text"
                                value={templateNameInput}
                                onChange={(e) => setTemplateNameInput(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    handleTemplateSave(templateNameInput);
                                    setSaveModalVisible(false);
                                }}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Configuration;
