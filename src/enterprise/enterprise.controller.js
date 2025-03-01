import Enterprise from "./entreprise.model.js";
import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const registerEnterprise = async (req, res) => {
    try {
        const { yearFoundation, ...data } = req.body;

        // Validar y convertir la fecha de fundación
        const isoDate = new Date(yearFoundation);
        if (isNaN(isoDate.getTime())) {
            return res.status(400).json({
                success: false,
                msg: "Invalid date",
            });
        }

        const enterprise = new Enterprise({
            ...data,
            yearFoundation: isoDate,
        });

        await enterprise.save();

        return res.status(200).json({
            success: true,
            message: "Enterprise registered successfully",
            enterprise,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error registering the enterprise",
            error: error.message,
        });
    }
};

// Obtener todas las empresas
export const getEnterprises = async (req, res) => {
    try {
        const enterprises = await Enterprise.find();
        return res.status(200).json({
            success: true,
            total: enterprises.length,
            enterprises,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting enterprises",
            error: error.message,
        });
    }
};

// Actualizar una empresa por ID
export const updateEnterprise = async (req, res) => {
    try {
        const { id } = req.params;
        const { yearFoundation, ...data } = req.body;

        if (yearFoundation) {
            const isoDate = new Date(yearFoundation);
            if (isNaN(isoDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid date",
                });
            }

            const currentDate = new Date();
            const yearsInService = currentDate.getFullYear() - isoDate.getFullYear();
            data.yearFoundation = isoDate;
            data.yearsInService = yearsInService;
        }

        const enterprise = await Enterprise.findByIdAndUpdate(id, data, { new: true });
        if (!enterprise) {
            return res.status(404).json({
                success: false,
                message: "Enterprise not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Enterprise updated successfully",
            enterprise,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating enterprise",
            error: error.message,
        });
    }
};


export const generateEnterpriseReport = async (req, res) => {
    try {
        // Obtener todas las empresas
        const enterprises = await Enterprise.find();

        // Verificar si hay empresas
        if (enterprises.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'There are no enterprises to generate the report',
            });
        }

        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Enterprises Report');

        // Definir las columnas del informe
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Description', key: 'description', width: 50 },
            { header: 'Address', key: 'address', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Impact Level', key: 'impactLevel', width: 15 },
            { header: 'Year Foundation', key: 'yearFoundation', width: 15 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Years in Service', key: 'yearsInService', width: 15 },
        ];

        // Agregar filas con los datos de las empresas
        enterprises.forEach((enterprise) => {
            worksheet.addRow({
                name: enterprise.name,
                description: enterprise.description,
                address: enterprise.address,
                phone: enterprise.phone,
                email: enterprise.email,
                impactLevel: enterprise.impactLevel,
                yearFoundation: enterprise.yearFoundation.toISOString().split('T')[0], // Formato YYYY-MM-DD
                category: enterprise.category,
                yearsInService: enterprise.yearsInService, // Campo virtual
            });
        });

        // Guardar el archivo Excel
        const filePath = path.join(__dirname, `../../public/reports/enterprises-report-${Date.now()}.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        // Respuesta exitosa
        return res.status(200).json({
            success: true,
            message: 'Report generated successfully',
            report: filePath,
        });
    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            success: false,
            message: 'Error generating report',
            error: error.message,
        });
    }
};