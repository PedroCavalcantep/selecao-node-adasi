const { Estudantes } = require("../../models");

const estudantesController = {
  async listEstudantes(req, res) {
    try {
      const getEstudantes = await Estudantes.findAll();
      return res.json(getEstudantes);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "erro" });
    }
  },

  async findEstudante(req, res) {
    const id = req.params.id;

    try {
      const findEstudante = await Estudantes.findOne({
        where: { id },
      });
      return res.json(findEstudante);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "erro" });
    }
  },

  async createEstudante(req, res) {
    const { cpf, nome, curso, matricula } = req.body;

    const checkNumeros = /^\d+$/;
    if (!checkNumeros.test(cpf) || !checkNumeros.test(matricula)) {
      return res.status(400).json({
        error: "CPF / matricula devem ser compostos apenas por numeros",
      });
    }

    try {
      const estudante = await Estudantes.create({
        cpf,
        nome,
        curso,
        matricula,
      });
      return res.json(estudante);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateEstudante(req, res) {
    const { cpf, nome, curso, matricula } = req.body;
    const id = req.params.id;

    const checkNumeros = /^\d+$/;
    if (!checkNumeros.test(cpf) || !checkNumeros.test(matricula)) {
      return res.status(400).json({
        error: "CPF / matricula devem ser compostos apenas por numeros",
      });
    }

    try {
      const estudante = await Estudantes.findByPk(id);

      if (!estudante) {
        return res.status(404).json({ error: "Estudante não encontrado" });
      }

      await estudante.update({ cpf, nome, curso, matricula });

      return res.json(estudante);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteEstudante(req, res) {
    const id = req.params.id;

    try {
      const estudante = await Estudantes.findByPk(id);

      if (!estudante) {
        return res.status(404).json({ error: "estudante não encontrado" });
      }

      await estudante.destroy();
      return res.json("Deletado com sucesso");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "erro" });
    }
  },
};

module.exports = estudantesController;
