import Enterprise from "./enterprise.model.js";

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

        // Crear la empresa con los datos proporcionados
        const enterprise = new Enterprise({
            ...data,
            yearFoundation: isoDate,
        });

        // Guardar la empresa en la base de datos
        await enterprise.save();

        // Respuesta exitosa
        return res.status(200).json({
            success: true,
            message: "Enterprise registered successfully",
            enterprise,
        });
    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            success: false,
            msg: "Error registering the enterprise",
            error: error.message,
        });
    }
};