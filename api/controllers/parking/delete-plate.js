module.exports = {


  friendlyName: 'Delete Plate',


  description: 'Deletes a plate from the logged user.',


  inputs: {

    id: {
      type: 'string'
    },

  },


  exits: {},


  fn: async function (inputs, exits) {

    var valuesToHandle = {
      id: inputs.id,
      owner: this.req.me.id
    };

    await Plate.destroy(valuesToHandle);

    return exits.success();

  }


};
