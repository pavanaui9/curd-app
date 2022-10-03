const express = require('express');
const app = express();
const SourceRoutes = express.Router();

var Source = require('../model/Source');

// api to add Source
SourceRoutes.route('/add').post(function (req, res) {
  let source = new Source(req.body);
  source.save()
  .then(Source => {
    res.status(200).json({'status': 'success','mssg': 'Source added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get Sources
SourceRoutes.route('/').get(function (req, res) {
  Source.find(function (err, Sources){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','Sources': Sources});
    }
  });
});

// api to edit Source
SourceRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Source.findById(id, function (err, Source){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','Source': Source});
    }
  });
});

// api to update route
SourceRoutes.route('/update/:id').post(function (req, res) {
    Source.findById(req.params.id, function(err, Source) {
    if (!Source){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        Source.name = req.body.name;
        Source.domain = req.body.domain;
        Source.ipaddress = req.body.ipaddress;

        Source.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
SourceRoutes.route('/delete/:id').get(function (req, res) {
  Source.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = SourceRoutes;