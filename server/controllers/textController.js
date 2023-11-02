const models = require('../models/ctextModels');
const textController = {};

textController.saveTitle = (req, res, next) => {
  const { title, fulltext } = req.body;
  models.Text.findOne({ title })
  .then(data => {
    if (!data) {
      models.Text.create({ fulltext: fulltext, title: title})
      .then (text => {
        res.locals.text = text;
        return next();
      });
    };
    models.Text.findOneAndUpdate({ title }, { fulltext})
    .then(text => {

    })
  })
};

textController.getAll = (req, res, next) => {
  console.log('getAll');
  models.Text.find({})
  .then(texts => {
    const titles = [];
    for (const text of texts) {
      titles.push(text.title);
    };
    console.log(titles);
    res.locals.titles = titles;
    return next()
  })
}

textController.delete = (req, res, next) => {
  const { title } = req.body;
  models.Text.deleteOne({ title: title })
  .then(data => {
    return next();
  })
  .catch(err => {

  })
};
 
textController.view = (req, res, next) => {
  const title = req.params.title;
  models.Text.findOne({ title: title })
  .then(text => {
    res.locals.text = text;
    return next();
  })
  .catch();
};
textController.deleteAll = (req, res, next) => {
  models.Text.deleteMany({})
  .then(data => {
    return next();
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = textController;