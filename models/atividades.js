"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class atividades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  atividades.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      tarefa: {
        type: DataTypes.UUID,
        field: "tarefa",
        references: { model: "tarefas", key: "id" },
        allowNull: false,
      },
      estudante: {
        type: DataTypes.INTEGER,
        field: "estudante",
        references: { model: "estudantes", key: "id" },
        allowNull: false,
      },

      data: { type: DataTypes.DATE, allowNull: false },

      agendamento_inicio: { type: DataTypes.TIME, allowNull: false },

      agendamento_termino: { type: DataTypes.TIME, allowNull: false },

      hora_inicio: { type: DataTypes.TIME, allowNull: true },

      hora_termino: { type: DataTypes.TIME, allowNull: true },
    },
    {
      sequelize,
      tableName: "atividades",
      modelName: "Atividades",
      timestamps: false,
    }
  );
  return atividades;
};
