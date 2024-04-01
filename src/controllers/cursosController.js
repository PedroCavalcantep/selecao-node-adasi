const { Cursos } = require("../../models");

const cursosController = {
  async createCurso(req, res) {
    const { nome } = req.body;

    try {
      const curso = await Cursos.create({ nome });
      return res.json(curso);
    } catch (err) {
      console.log(err);

      return res.status(500).json(err);
    }
  },

  async listCursos(req, res) {
    try {
      const cursos = await Cursos.findAll();
      return res.status(200).json(cursos);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "erro" });
    }
  },
  async updateCurso(req, res) {
    const { nome } = req.body;
    const id = req.params.id;

    try {
      const curso = await Cursos.findByPk(id);

      if (!curso) {
        res.status(404).json({ error: "curso não encontrado" });
      }
      await curso.update({ nome });
      return res.json(curso);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteCurso(req, res) {
    // pegar id
    const id = req.params.id;

    try {
      const curso = await Cursos.findByPk(id);
      if (!curso) {
        return res.status(404).json({ error: "curso não encontrado" });
      }
      await curso.destroy();
      return res.json("deletado com sucesso");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
module.exports = cursosController;
