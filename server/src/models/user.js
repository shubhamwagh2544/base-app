import { DataTypes, Model } from "sequelize";

export function initUser(sequelize) {
    class User extends Model {
        static associate(models) {
            // 1 User -> Many Accounts
            this.hasMany(models.Account, {
                foreignKey: "userId",
                as: "accounts"
            });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true
        }
    );

    return User;
}
