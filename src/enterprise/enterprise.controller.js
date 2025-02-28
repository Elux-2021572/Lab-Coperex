import Enterprise from "./entreprise.model.js";

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

