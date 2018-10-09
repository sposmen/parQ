/**
 * Vehicle.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    type:{
      type: 'string',
      required: true
    },

    plate: {
      type: 'string',
      required: true,
      regex: /^[A-Z]{3}([0-9]{3}|[0-9]{2}[A-Z])$/,
    },

    description:{
      type: 'string'
    },

    owner: {
      model: 'user'
    }

  },

};

