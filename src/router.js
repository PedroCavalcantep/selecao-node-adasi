const express = require("express");
const router = express.Router();

const estudantesController = require("./controllers/estudantesController");
const cursosController = require("./controllers/cursosController");
const tarefasController = require("./controllers/tarefasController");
const atividadesController = require("./controllers/atividadesController");

// rotas estudantes
router.get("/estudantes", estudantesController.listEstudantes);
router.get("/estudantes/:id", estudantesController.findEstudante);
router.post("/estudantes", estudantesController.createEstudante);
router.put("/estudantes/:id", estudantesController.updateEstudante);
router.delete("/estudantes/:id", estudantesController.deleteEstudante);

// rotas cursos
router.post("/cursos", cursosController.createCurso);
router.get("/cursos", cursosController.listCursos);
router.put("/cursos/:id", cursosController.updateCurso);
router.delete("/cursos/:id", cursosController.deleteCurso);

// rotas tarefas
router.post("/tarefas", tarefasController.createTarefas);
router.get("/tarefas", tarefasController.listTarefas);
router.put("/tarefas/:id", tarefasController.updateTarefas);
router.delete("/tarefas/:id", tarefasController.deleteTarefa);

// rotas atividades
router.post("/atividades", atividadesController.createAtividade);
router.get("/atividades", atividadesController.listAtividades);
router.put("/atividades/:id", atividadesController.updateAtividade);
router.delete("/atividades/:id", atividadesController.deleteAtividade);
router.put("/atividades/iniciar/:id", atividadesController.iniciarAtividade);
router.put("/atividades/encerrar/:id", atividadesController.encerrarAtividade);

module.exports = router;
