import { useEffect, useState } from "react"
import * as api from '../../api/index'
import { writeFileXLSX, utils } from "xlsx";

import * as XLSX from 'xlsx';

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setTemplateData } from "../../features/template/templateSlice";
import TemplateTable from "./components/TemplateTable";
import { Container, Typography } from "@mui/material";
import EditColumnModal from './modals/EditColumnModal'
import SaveTemplateModal from './modals/SaveTemplateModal'
function UITemplate() {


    const [templateNameInput, setTemplateNameInput] = useState("");
    const [setFileUploadProgress] = useState(null);

    // const [setTemplates] = useState([]);

    const excelDataTypes = ["Text", "Number", "Date", "Boolean"];

    const { templateData } = useSelector((state) => state.template);
    const dispatch = useDispatch();


    const calculateTotalPercentage = (category) => {
        const categoryData = templateData.find((data) => data.category === category);
        if (!categoryData) return 0;

        return categoryData.columns.reduce((total, column) => total + parseFloat(column.impactPercentage), 0);
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

        formData.append('templateData', JSON.stringify(templateData))


        try {
            await api.upload('Templates', formData, setFileUploadProgress);
            // setTemplates((prev) => [...prev, res.data.fileUpload]);
            toast.success(`File Uploaded Successfully`);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error(`Upload Failed: ${error.response.data.error}.`);

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




    const handleColumnDelete = (categoryIndex, columnIndex) => {

        const newData = JSON.parse(JSON.stringify(templateData));

        if (
            categoryIndex >= 0 &&
            categoryIndex < newData.length &&
            columnIndex >= 0 &&
            columnIndex < newData[categoryIndex].columns.length
        ) {
            const updatedColumns = newData[categoryIndex].columns.filter((_, index) => index !== columnIndex);
            newData[categoryIndex].columns = updatedColumns;

            if (updatedColumns.length === 0) {
                newData.splice(categoryIndex, 1);
            }

            // Dispatch an action to update the state
            dispatch(setTemplateData({ templateData: newData }));
        } else {
            console.error('Invalid indices provided.');
        }
    };



    useEffect(() => {
        const fetchGlobalTemplate = async () => {
            try {
                const res = await api.getGlobalTemplate();
                if (res.status === 200) {
                    dispatch(setTemplateData({ templateData: res.data }))
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchGlobalTemplate();
    }, [dispatch]);

    console.log('td', templateData)

    return (
        <Container sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                UI Template

            </Typography>
            <TemplateTable templateData={templateData}
                handleColumnDelete={handleColumnDelete}
                calculateTotalPercentage={calculateTotalPercentage} />

            <SaveTemplateModal
                templateNameInput={templateNameInput}
                setTemplateNameInput={setTemplateNameInput}
                handleTemplateSave={handleTemplateSave}
                templateData={templateData}
                handleDownloadTemplate={handleDownloadTemplate}
            />
            <EditColumnModal excelDataTypes={excelDataTypes} />

        </Container>
    )
}

export default UITemplate