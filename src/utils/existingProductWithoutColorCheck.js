const { products } = require('../models');

const existingProductWithoutColorCheck = async (name, model) => {
    const thereIsAProductWithName = await products.findOne({ where: { name } });
    const thereIsAProductWithModel = await products.findOne({ where: { model } });

    if (thereIsAProductWithName && thereIsAProductWithModel ) {
        return { type: 'DONT_ADD', message: thereIsAProductWithName.id };
    }

    return { type: 'ADD', message: '' };
}

module.exports = existingProductWithoutColorCheck;