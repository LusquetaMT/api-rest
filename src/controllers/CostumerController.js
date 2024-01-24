/* eslint-disable consistent-return */
import { parse, isValid } from 'date-fns';
import Costumer from '../models/Costumer';
import Picture from '../models/Picture';

class CostumerController {
  index = async (req, res) => {
    try {
      const costumers = await Costumer.findAll({
        attributes: ['id', 'name', 'last_name', 'email', 'birth_date'],
        order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
        include: {
          model: Picture,
          attributes: ['filename'],
        },
      });
      return res.json(costumers);
    } catch (e) {
      let response = null;
      console.log(e);
      if (e.errors) response = e.errors.map((err) => err.message);

      return res.status(400).json(response);
    }
  };

  store = async (req, res) => {
    try {
      const birthErrors = this.validateBirthDay(req.body);
      if (birthErrors.length > 0) {
        return res.status(400).json({
          errors: birthErrors,
        });
      }

      const newCostumer = await Costumer.create(req.body);
      const {
        id, name, last_name, email, birth_date,
      } = newCostumer;

      return res.status(201).json({
        id, name, last_name, email, birth_date,
      });
    } catch (e) {
      let response = null;
      if (e.errors) response = e.errors.map((err) => err.message);
      return res.status(400).json(response);
    }
  };

  show = async (req, res) => {
    try {
      const { id } = req.params;
      const costumer = await Costumer.findByPk(id, {
        attributes: ['id', 'name', 'last_name', 'email', 'birth_date'],
        order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
        include: {
          model: Picture,
          attributes: ['url', 'filename'],
        },
      });
      if (costumer === null) {
        return res.status(404).json({
          errors: ['Costumer not found'],
          id,
        });
      }
      return res.json(costumer);
    } catch (e) {
      let response = null;

      if (e.errors) {
        response = { errors: e.errors.map((err) => err.message) };
      } else {
        return res.status(500).json({ errors: ['Internal server error'] });
      }
      return res.status(400).json(response);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const costumer = await Costumer.findByPk(id);
      if (costumer === null) {
        return res.status(404).json({
          errors: ['Costumer not found'],
        });
      }
      await costumer.update(req.body);

      return res.status(204).json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  };

  async delete(req, res) {
    const costumer = await Costumer.findByPk(req.userId);
    try {
      if (!costumer) {
        return res.status(404).json({
          errors: ["costumer doesn't exists"],
        });
      }
      await costumer.destroy();
      return res.status(204).json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  validateBirthDay = (body) => {
    const errors = [];
    const { birth_date } = body;

    if (!birth_date) {
      errors.push('The field birth_date must not be empty');
      return errors;
    }

    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = birth_date.match(dateRegex);

    if (!match) {
      errors.push('Invalid date format. Use dd/mm/aaaa');
      return errors;
    }

    const parsedDate = parse(birth_date, 'dd/MM/yyyy', new Date());

    if (!isValid(parsedDate)) {
      errors.push('Invalid date');
    }

    return errors;
  };
}

export default new CostumerController();
