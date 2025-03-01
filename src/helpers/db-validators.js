import Enterprise from "../enterprise/entreprise.model.js";

export const enterpriseExist = async (name) => {
    const existe = await Enterprise.findOne({ name });
    if (existe) {
        throw new Error(`The Enterprise ${name} is already registered`);
    }
}  