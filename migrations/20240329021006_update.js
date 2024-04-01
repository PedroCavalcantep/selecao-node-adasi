const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "cursos", deps: []
 * createTable() => "tarefas", deps: []
 * createTable() => "estudantes", deps: [cursos]
 * createTable() => "atividades", deps: [tarefas, estudantes]
 *
 */

const info = {
  revision: 1,
  name: "update",
  created: "2024-03-29T02:10:06.303Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "cursos",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          unique: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        nome: { type: Sequelize.STRING, field: "nome", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "tarefas",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          unique: true,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        nome: { type: Sequelize.STRING, field: "nome", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "estudantes",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          unique: true,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        cpf: {
          type: Sequelize.STRING,
          field: "cpf",
          allowNull: false,
          unique: true,
        },
        nome: { type: Sequelize.STRING, field: "nome", allowNull: false },
        curso: {
          type: Sequelize.UUID,
          field: "curso",
          references: { model: "cursos", key: "id" },
          allowNull: false,
        },
        matricula: {
          type: Sequelize.STRING,
          field: "matricula",
          allowNull: false,
          unique: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "atividades",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          unique: true,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        tarefa: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "tarefas", key: "id" },
          field: "tarefa",
        },
        estudante: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "estudantes", key: "id" },
          field: "estudante",
        },
        data: { type: Sequelize.DATE, field: "data", allowNull: false },
        agendamento_inicio: {
          type: Sequelize.TIME,
          field: "agendamento_inicio",
          allowNull: false,
        },
        agendamento_termino: {
          type: Sequelize.TIME,
          field: "agendamento_termino",
          allowNull: false,
        },
        hora_inicio: {
          type: Sequelize.TIME,
          field: "hora_inicio",
          allowNull: true,
        },
        hora_termino: {
          type: Sequelize.TIME,
          field: "hora_termino",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["atividades", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["cursos", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["estudantes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["tarefas", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
