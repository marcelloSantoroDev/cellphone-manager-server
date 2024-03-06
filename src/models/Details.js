module.exports = (sequelize, DataTypes) => {
    const details = sequelize.define('details', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        price: DataTypes.INTEGER,
        color: DataTypes.STRING,
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products', 
                key: 'id',
            },
        }
    },
    {
        timestamps: false,
    });

    details.associate = function (models) {
        details.belongsTo(models.products, {
            foreignKey: 'productId',
            as: 'data'
        });
    }

    return details;

}

