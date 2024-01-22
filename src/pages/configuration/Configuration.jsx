import { useEffect, useState } from "react";
import { writeFileXLSX, utils } from "xlsx";
import * as XLSX from 'xlsx';
import toast from "react-hot-toast";
import * as api from '../../api/index';
import Templates from "../../components/templates/Templates";
import ConfigModal from "./modals/ConfigModal";
import CreatedTemplate from "./components/CreatedTemplate";
import CreateTemplateModal from "./modals/CreateTemplateModal";
import SaveTemplateModal from "./modals/SaveTemplateModal";
import { Container, Typography } from "@mui/material";

function Configuration() {

    const [newColumn, setNewColumn] = useState({
        category: "",
        columnName: "",
        dataType: "",
        defaultValue: "",
        unitOfMeasure: "",
        impactPercentage: 0,
    });

    const [templateNameInput, setTemplateNameInput] = useState("");
    const [setFileUploadProgress] = useState(null);

    const [templates, setTemplates] = useState([]);

    const excelDataTypes = ["Text", "Number", "Date", "Boolean"];
    const categories = ['Environment', 'Social', 'Governance', 'Economic'];

    const [templateData, setTemplateData] = useState([])




    const calculateTotalPercentage = (category) => {
        const categoryData = templateData.find((data) => data.category === category);
        if (!categoryData) return 0;

        return categoryData.columns.reduce((total, column) => total + parseFloat(column.impactPercentage), 0);
    };

    const handleTemplateData = () => {

        if (!newColumn.category.trim() || !newColumn.columnName.trim()) {
            // Display an error message or take appropriate action
            toast.error('Field is empty!');
            return;
        }
        const impactPercentage = newColumn.impactPercentage === '' ? 0 : parseFloat(newColumn.impactPercentage);

        const totalPercentage = calculateTotalPercentage(newColumn.category);
        if (totalPercentage + impactPercentage > 100) {
            // Display an error message or take appropriate action
            toast.error('Total Impact Percentage cannot exceed 100% for a category!');
            return;
        }


        const existingCategoryIndex = templateData.findIndex((category) => category.category === newColumn.category);

        if (existingCategoryIndex !== -1) {
            // Category already exists, add new columns to its columns array
            const updatedData = [...templateData];



            updatedData[existingCategoryIndex].columns.push({
                columnName: newColumn.columnName,
                dataType: newColumn.dataType,
                defaultValue: newColumn.defaultValue,
                unitOfMeasure: newColumn.unitOfMeasure,
                impactPercentage
            });
            setTemplateData([...updatedData]);
        } else {
            // Category doesn't exist, add a new category object
            setTemplateData((prevData) => [
                ...prevData,
                {
                    category: newColumn.category,
                    columns: [
                        {
                            columnName: newColumn.columnName,
                            dataType: newColumn.dataType,
                            defaultValue: newColumn.defaultValue,
                            unitOfMeasure: newColumn.unitOfMeasure,
                            impactPercentage

                        },
                    ],
                },
            ]);
        }

        // Reset the newColumn state
        setNewColumn({
            category: '',
            columnName: '',
            dataType: '',
            defaultValue: '',
            unitOfMeasure: '',
            impactPercentage: '',
        });


    };



    const handleTemplateSave = async (templateName) => {

        const wb = utils.book_new();
        let hasError = false;

        templateData.forEach((sheet) => {

            const totalPercentage = calculateTotalPercentage(sheet.category);

            if (totalPercentage !== 100) {
                // Set hasError flag to true
                hasError = true;

                toast.error(`Total Impact Percentage for ${sheet.category} must be 100%!`);
                return;
            }
            const wsData = sheet.columns.map((column) => ({ [column.columnName]: '' }));
            const ws = utils.json_to_sheet(wsData);

            sheet.columns.forEach((item, index) => {
                const cellAddress = utils.encode_cell({ r: 0, c: index });

                if (!ws[cellAddress]) {
                    ws[cellAddress] = { t: 's', v: item.columnName, r: utils.encode_cell({ c: index, r: 0 }) };
                }

                const commentText = `Data Type: ${item.dataType}\nDefault Value: ${item.defaultValue
                    }\nUnit Of Measure: ${item.unitOfMeasure}\nImpact Percentage: ${item.impactPercentage} `;

                if (!ws[cellAddress].c) ws[cellAddress].c = [];

                ws[cellAddress].c.push({ a: "Comment Author", t: commentText });
            });

            utils.book_append_sheet(wb, ws, sheet.category);
        });

        if (hasError) {
            return;
        }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const formData = new FormData();
        formData.append('file', blob, `${templateName}.xlsx`); // Set filename using templateName parameter


        try {
            const res = await api.upload('Templates', formData, setFileUploadProgress);
            setTemplates((prev) => [...prev, res.data.fileUpload]);
            toast.success(`File Uploaded Successfully`);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('File Upload Failed');
        }
    };



    const handleDownloadTemplate = () => {
        const wb = utils.book_new();

        let hasError = false;

        templateData.forEach((sheet) => {
            const totalPercentage = calculateTotalPercentage(sheet.category);
            if (totalPercentage !== 100) {
                // Set hasError flag to true
                hasError = true;

                toast.error(`Total Impact Percentage for ${sheet.category} must be 100%!`);
                return;
            }

            const wsData = sheet.columns.map((column) => ({ [column.columnName]: '' }));
            const ws = utils.json_to_sheet(wsData);

            sheet.columns.forEach((item, index) => {
                const cellAddress = utils.encode_cell({ r: 0, c: index });

                if (!ws[cellAddress]) {
                    ws[cellAddress] = { t: 's', v: item.columnName, r: utils.encode_cell({ c: index, r: 0 }) };
                }

                const commentText = `Data Type: ${item.dataType}\nDefault Value: ${item.defaultValue
                    }\nUnit Of Measure: ${item.unitOfMeasure}\nImpact Percentage: ${item.impactPercentage} `;

                if (!ws[cellAddress].c) ws[cellAddress].c = [];

                ws[cellAddress].c.push({ a: "Comment Author", t: commentText });
            });

            utils.book_append_sheet(wb, ws, sheet.category);
        });

        // If there are no errors, initiate the download
        if (!hasError) {
            writeFileXLSX(wb, `ExcelTemplate - ${Date.now()}.xlsx`, { bookType: "xlsx", bookSST: false, type: "blob" });
        }
    };

    const handleImpactPercentage = (categoryIndex, columnIndex, e) => {

        const inputValue = e.target.value.trim();
        const parsedValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
        if (!isNaN(parsedValue)) {
            // Clone the existing data structure to avoid directly mutating state
            const updatedData = JSON.parse(JSON.stringify(templateData));

            // Update the impactPercentage for the specified category and column
            updatedData[categoryIndex].columns[columnIndex].impactPercentage = inputValue;

            // Update the state with the modified data structure
            setTemplateData(updatedData);
        }
    };



    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await api.getTemplates();
                setTemplates(response.data.templates);
                // setAdminTemplate(response
                //     .data.adminTemplate)
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, []);

    return (
        <Container sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Configuration

            </Typography>


            {templates.length > 0 && <Templates templates={templates} adminTemplate />}



            {templateData.length > 0 && (
                <CreatedTemplate templateData={templateData} handleImpactPercentage={handleImpactPercentage} />
            )}
            {/* Config File Modal */}
            <SaveTemplateModal
                templateNameInput={templateNameInput}
                setTemplateNameInput={setTemplateNameInput}
                handleTemplateSave={handleTemplateSave}
                templateData={templateData}
                handleDownloadTemplate={handleDownloadTemplate}
            />

            {/* Create Template Modal */}
            <CreateTemplateModal
                newColumn={newColumn}
                setNewColumn={setNewColumn}
                categories={categories}
                excelDataTypes={excelDataTypes}
                handleTemplateData={handleTemplateData}
            />

            <ConfigModal />

        </Container>
    );
}

export default Configuration;
