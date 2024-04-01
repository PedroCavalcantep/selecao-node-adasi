const { Atividades } = require("../../models");
const moment = require("moment");
const atividadesController = {
  async createAtividade(req, res) {
    const { tarefa, estudante, data, agendamento_inicio, agendamento_termino } =
      req.body;

    try {
      const inicio = new Date(data + "T" + agendamento_inicio);
      const termino = new Date(data + "T" + agendamento_termino);

      const duracaoHoras = (termino - inicio) / 3600000;

      if (duracaoHoras > 6) {
        return res.status(400).json({
          error: "A duração da atividade não pode ultrapassar 6 horas.",
        });
      }

      if (termino <= inicio) {
        return res.status(400).json({
          error:
            "A data e hora de término devem ser posteriores à data e hora de início.",
        });
      }

      const atividade = await Atividades.create({
        tarefa,
        estudante,
        data,
        agendamento_inicio,
        agendamento_termino,
      });
      return res.status(201).json(atividade);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar atividade." });
    }
  },

  async listAtividades(req, res) {
    try {
      const atividades = await Atividades.findAll();
      return res.json(atividades);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateAtividade(req, res) {
    const { tarefa, estudante, data, agendamento_inicio, agendamento_termino } =
      req.body;
    const id = req.params.id;

    try {
      const atividade = await Atividades.findByPk(id);
      if (!atividade) {
        return res.status(404).json("atividade não encontrada");
      }

      const inicio = new Date(data + "T" + agendamento_inicio);
      const termino = new Date(data + "T" + agendamento_termino);

      const duracaoHoras = (termino - inicio) / 3600000;

      if (duracaoHoras > 6) {
        return res.status(400).json({
          error: "A duração da atividade não pode ultrapassar 6 horas.",
        });
      }

      if (termino <= inicio) {
        return res.status(400).json({
          error:
            "A data e hora de término devem ser posteriores à data e hora de início.",
        });
      }

      await atividade.update({
        tarefa,
        estudante,
        data,
        agendamento_inicio,
        agendamento_termino,
      });
      return res.status(201).json(atividade);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar atividade." });
    }
  },

  async deleteAtividade(req, res) {
    const id = req.params.id;
    try {
      const atividade = await Atividades.findByPk(id);
      if (!atividade) {
        return res.status(404).json("atividade não encontrada");
      }
      await atividade.destroy();
      return res.json("atividade deletada com sucesso");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async iniciarAtividade(req, res) {
    const id = req.params.id;

    const horaInicio = moment().format("HH:mm:ss");

    try {
      const atividade = await Atividades.findByPk(id);
      if (!atividade) {
        return res.status(404).json({ error: "Atividade não encontrada" });
      }
      if (atividade.hora_inicio !== null) {
        return res.status(400).json({ error: "Atividade já iniciada" });
      }

      const agendamentoInicio = moment(
        atividade.agendamento_inicio,
        "HH:mm:ss"
      );
      const diferencaTempo = moment.duration(
        moment(horaInicio, "HH:mm:ss").diff(agendamentoInicio)
      );

      const tolerancia = moment.duration(15, "minutes");
      if (diferencaTempo.asMinutes() > tolerancia.asMinutes()) {
        return res.status(400).json({
          error:
            "Hora de início fora da tolerância de 15 minutos em relação ao agendamento",
        });
      }

      await atividade.update({ hora_inicio: horaInicio });
      return res.status(201).json(atividade);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao iniciar atividade" });
    }
  },
  async encerrarAtividade(req, res) {
    const id = req.params.id;
    const horaTermino = moment().format("HH:mm:ss");

    try {
      const atividade = await Atividades.findByPk(id);
      if (!atividade) {
        return res.status(404).json({ error: "Atividade não encontrada" });
      }
      await atividade.update({ hora_termino: horaTermino });
      return res.status(201).json(atividade);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};
module.exports = atividadesController;
