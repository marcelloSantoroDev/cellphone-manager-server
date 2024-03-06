const { products } = require('../models');
const { details } = require('../models');

const existingProductCheck = async (name, model, color) => {
    const product = await products.findOne({
        where: { name, model },
        include: [{
            model: details,
            as: 'data',
            attributes: {
                exclude: ['id', 'productId'],
            },
        }]
    });

    if(product) {
        const productDetails = product.dataValues.data;
        const thereIsAProductWithNameModelAndColor = productDetails?.some(detail => detail.color === color);
        if (!thereIsAProductWithNameModelAndColor) {
            return {type: "FREE_TO_ADD", message: product.dataValues.id}
        }
        if (thereIsAProductWithNameModelAndColor) {
            return {type: "DONT_ADD", message: ''}
        }
    }


    return {type: null, message: product};
}

module.exports = existingProductCheck;