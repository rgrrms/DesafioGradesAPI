import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grade = db.grade;

const create = async (req, res) => {
  const { name, subject, type, value } = req.body;
  const data = new Grade({
    name,
    subject,
    type,
    value,
    lastModified: Date.now()
  });
  console.log(data);

  try {
    const retorno = await data.save();
    logger.info(`POST /grade - ${JSON.stringify(retorno)}`);
    res.send({ message: 'Grade inserido com sucesso' });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const data = await Grade.find(condition);
    if (!data) {
      res.status(400).send({message: "Grade não encotrada"})
    } else {
      res.send(data);
    }
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findById({_id: id});
    if (!data) {
      res.status(400).send({message: "Grade não encotrada: " + id});
    } else {
      res.send(data);
    }
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndUpdate({_id: id}, req.body, {new: true});
    if (!data) {
      res.status(400).send({message: "Grade não encotrada: " + id});
    } else {
      res.send(data);
    }
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndRemove({_id: id});
    if (!data) {
      res.status(400).send({message: "Grade não encotrada: " + id});
    } else {
      res.send({ message: 'Grade deletado com sucesso' });
    }
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await Grade.deleteMany();
    if (!data) {
      res.status(400).send({message: "Grades não encotradas"});
    } else {
      res.send({ message: 'HOJE É DIA DE MALDADE, DROPOOOOOOOU!' });
    }
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
