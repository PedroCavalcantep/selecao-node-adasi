"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cursos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ estudantes }) {
      // define association here
     
    }
  }

  cursos.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Define um valor padrão para o ID
        allowNull: false,
        unique: true,
      },
      nome: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName:"cursos",
      modelName: "Cursos",
      // timestamps: false,
    }
  );
  return cursos;
};
