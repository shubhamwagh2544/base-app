import { DataTypes, Model } from "sequelize";

export function initAccount(sequelize) {
    class Account extends Model {
        static associate(models) {
            // Many Accounts -> 1 User
            this.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user"
            });
        }
    }

    Account.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "userId" // DB column name match
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: "SAVINGS"
            },
            balance: {
                type: DataTypes.DECIMAL(14, 2),
                allowNull: false,
                defaultValue: 0
            },
            currency: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: "INR"
            }
        },
        {
            sequelize,
            modelName: "Account",
            tableName: "accounts",
            timestamps: true
        }
    );

    return Account;
}
