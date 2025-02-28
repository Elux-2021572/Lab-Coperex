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