const { Tarefas } = require("../../models");

const tarefasController = {
  async listTarefas(req, res) {
    try {
      const tarefas = await Tarefas.findAll();
      return res.status(200).json(tarefas);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createTarefas(req, res) {
    const { nome } = req.body;

    try {
      const tarefas = await Tarefas.create({ nome });
      return res.status(201).json(tarefas);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateTarefas(req, res) {
    const { nome } = req.body;
    const id = req.params.id;

    try {
      const tarefa = await Tarefas.findByPk(id);
      if (!tarefa) {
        return res.status(404).json({ error: "tarefa não encontrada" });
      }
      await tarefa.update({ nome });
      return res.json(tarefa);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteTarefa(req, res) {
    const id = req.params.id;

    try {
      const tarefa = await Tarefas.findByPk(id);
      if (!tarefa) {
        return res.status(404).json({ error: "tarefa não encontrada" });
      }

      await tarefa.destroy();
      return res.json("tarefa deletada");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

module.exports = tarefasController;
