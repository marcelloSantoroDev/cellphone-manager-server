const { products } = require('../models');
const { details } = require('../models');
const existingProductCheck = require('../utils/existingProductCheck');
const existingProductWithoutColorCheck = require('../utils/existingProductWithoutColorCheck');

const createProduct = async (name, brand, model, price, color) => {
    const checkFields = [name, brand, model, price, color];
    const checkFieldsEmpty = checkFields.some(field => field === '');

    if (checkFieldsEmpty) return { type: 'INVALID_FIELDS', message: 'All fields must be filled' };
    if (isNaN(parseFloat(price))) return { type: 'INVALID_PRICE', message: 'Price must be a number' };
    if (color.length < 3) return { type: 'INVALID_COLOR', message: 'Color must be at least 3 characters long' };

    const lowerCaseColor = color.toLowerCase();
    const lowerCaseName = name.toLowerCase();
    const lowerCaseBrand = brand.toLowerCase();
    const lowerCaseModel = model.toLowerCase();
    
    const {type, message } = await existingProductCheck(lowerCaseName, lowerCaseModel, lowerCaseColor);

    if (type === 'FREE_TO_ADD') {
        await details.create({
            price,
            color: lowerCaseColor,
            productId: message
        });
        return { type: null, message: 'created' };
    }

    if (type === 'DONT_ADD') return { type: 'INVALID_PRODUCT', message: 'Product already exists' };

    if (type === null) {
        const product = await products.create({
            name: lowerCaseName,
            brand: lowerCaseBrand,
            model: lowerCaseModel,
        });
    
        await details.create({
            price,
            color: lowerCaseColor,
            productId: product.id
        });

        return { type: null, message: 'created' };
    }

}

const getAll = async () => {
    const data = await products.findAll({
        include: [{
            model: details,
            as: 'data',
            attributes: {
                exclude: ['id', 'productId'],
            },
        }]
    });

    return { type: null, message: data };
}

const updateProduct = async (id, name, brand, model) => {
    const checkFields = [name, brand, model];
    const checkFieldsEmpty = checkFields.some(field => field === '');

    if (checkFieldsEmpty) return { type: 'INVALID_FIELDS', message: 'All fields must be filled' };

    const lowerCaseName = name.toLowerCase();
    const lowerCaseBrand = brand.toLowerCase();
    const lowerCaseModel = model.toLowerCase();

    const { type } = await existingProductWithoutColorCheck(lowerCaseName, lowerCaseModel)

    if (type === 'DONT_ADD') return { type: 'INVALID_PRODUCT', message: 'Product already exists' };

    await products.update({
        name: lowerCaseName,
        brand: lowerCaseBrand,
        model: lowerCaseModel
    }, { where: { id } });
    
    return { type: null, message: 'Updated' };
}

const deleteProduct = async (id) => {
    await products.destroy({ where: { id } });
    await details.destroy({ where: { id } });

    return { type: null, message: 'Deleted' };
}

const updateDetails = async (index, id, price, color) => {
    const checkFields = [price, color];
    const checkFieldsEmpty = checkFields.some(field => field === '');

    if (checkFieldsEmpty) return { type: 'INVALID_FIELDS', message: 'All fields must be filled' };
    if (isNaN(parseFloat(price))) return { type: 'INVALID_PRICE', message: 'Price must be a number' };
    if (color.length < 3) return { type: 'INVALID_COLOR', message: 'Color must be at least 3 characters long' };

    const lowerCaseColor = color.toLowerCase();
    const data = await details.findAll({ where: { productId: id } });
    const hasColor = data.some(detail => detail.dataValues.color === lowerCaseColor);

    if (hasColor) return { type: 'EXISTENT_COLOR', message: 'Color already exists' };


    const detailToEdit = data[index].dataValues;

    await details.update({
        price,
        color: lowerCaseColor
    }, {where: {id: detailToEdit.id}});

    return { type: null, message: 'Updated' };
}

const deleteDetails = async (index, id) => {
    const data = await details.findAll({ where: { productId: id } });
    const detailToEdit = data[index].dataValues;
    await details.destroy({ where: { id: detailToEdit.id } });

    return { type: null, message: 'Deleted' };
}

module.exports = { createProduct, getAll, updateProduct, deleteProduct, updateDetails, deleteDetails };