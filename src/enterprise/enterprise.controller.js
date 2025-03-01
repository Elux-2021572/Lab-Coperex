import Enterprise from "./entreprise.model.js";
import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultCategory } from '../../configs/defaultCategory.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const registerEnterprise = async (req, res) => {
    try {
        const { yearFoundation, ...data } = req.body;

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
        const enterprises = await Enterprise.find();

        if (enterprises.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'There are no enterprises to generate the report',
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Enterprises Report');

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

        enterprises.forEach((enterprise) => {
            worksheet.addRow({
                name: enterprise.name,
                description: enterprise.description,
                address: enterprise.address,
                phone: enterprise.phone,
                email: enterprise.email,
                impactLevel: enterprise.impactLevel,
                yearFoundation: enterprise.yearFoundation.toISOString().split('T')[0],
                category: enterprise.category,
                yearsInService: enterprise.yearsInService,
            });
        });

        const filePath = path.join(__dirname, `../../public/reports/enterprises-report-${Date.now()}.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            success: true,
            message: 'Report generated successfully',
            report: filePath,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error generating report',
            error: error.message,
        });
    }
};

export const getEnterprisesByOrder = async (req, res) => {
    try {
        const { order } = req.query; 
        let nameSort = {}; 

        if (order === 'A-Z') {
            nameSort.name = 1; 
        } else if (order === 'Z-A') {
            nameSort.name = -1; 
        }
        const enterprises = await Enterprise.find().sort(nameSort);

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

export const getEnterprisesByCategory = async (req, res) => {
    try {
        const { category } = req.params; 

        if (!defaultCategory.includes(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category',
                validCategories: defaultCategory, 
            });
        }
        const enterprises = await Enterprise.find({ category });

        if (enterprises.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No enterprises found in the specified category',
            });
        }

        return res.status(200).json({
            success: true,
            total: enterprises.length,
            enterprises,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting enterprises by category",
            error: error.message,
        });
    }
};