import { initUser } from "./user.js";
import { initAccount } from "./account.js";

export function initModels(sequelize) {
    const models = {};

    // 1. Initialize all models
    models.User = initUser(sequelize);
    models.Account = initAccount(sequelize);

    // 2. Run associations
    Object.values(models).forEach((model) => {
        if (typeof model.associate === "function") {
            model.associate(models);
        }
    });

    return models;
}
