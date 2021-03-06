module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        roomCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 0,
        },
        isReady: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        imageDownload: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        profile: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 1,
        }
    }, {
        timestamps: false
    });
};