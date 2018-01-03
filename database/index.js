const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoid: Number,
  name: String,
  htmlurl: String,
  description: String,
  owner: String,
  updated: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (array) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  array.forEach(repo => {
    let entry = {
      repoid: repo.id,
      name: repo.name,
      htmlurl: repo.html_url,
      description: repo.description,
      owner: repo.owner.login,
      updated: repo.updated_at
    };
    Repo.findOneAndUpdate({repoid: repo.id}, entry, {upsert: true, new: true}, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(doc, 'was added');
      }
    });
  });
}

let get = (callback) => {
  Repo.find({}).limit(25).sort({updated: -1}).exec((err, results) => {
    callback(results);
  });
};
module.exports.save = save;
module.exports.get = get;
