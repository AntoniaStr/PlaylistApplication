'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const SuggestionsStore = {
  
  store: new JsonStore('./models/suggestions-store.json', { suggestionsCollection: [] }),
  collection: 'suggestionsCollection',

  getList(){
    return this.store.findAll(this.collection);
  },
  
};

module.exports = SuggestionsStore;
