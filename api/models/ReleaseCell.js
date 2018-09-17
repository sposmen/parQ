/**
 * ReleaseCell.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    cell: 'string',

    date: {
      type: 'ref',
      columnType: 'date'
    },

    assignAccepted: 'boolean',

    assignAcceptExpire: {
      type: 'ref',
      columnType: 'datetime'
    },

    owner: {
      model: 'user'
    },

    assigned: {
      model: 'user'
    },

  },

};

