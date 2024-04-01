"use strict";
const { Model } = require("sequelize");
const Curso = require("./cursos");
module.exports = (sequelize, DataTypes) => {
  class estudantes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  estudantes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      nome: { type: DataTypes.STRING, allowNull: false },

      curso: {
        type: DataTypes.UUID,
        allowNull: false,

        references: {
          model: "cursos",
          key: "id",
        },
      },

      matricula: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "estudantes",
      modelName: "Estudantes",
      // timestamps: false,
    }
  );
  return estudantes;
};
