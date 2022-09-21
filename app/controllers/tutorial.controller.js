const Tutorial = require('../models/tutorial.models');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty!',
    });
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  });

  Tutorial.create(tutorial, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some occurred while creating the tutorial.',
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  Tutorial.getAll(title, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials',
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAllPublished = (req, res) => {
  Tutorial.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials',
      });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == 'not found') {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Tutorial with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty!',
    });
  }
  console.log(req.body);
  Tutorial.updateById(req.params.id, new Tutorial(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          mesasge: 'Error updating Tutorial with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          mesasge: 'Could not delete Tutorial with id ' + req.params.id,
        });
      }
    } else res.send({ message: 'Tutorial was deleted successfully!' });
  });
};

exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all tutorials.',
      });
    } else {
      res.send({ message: 'All Tutorials were deleted successfully!' });
    }
  });
};
