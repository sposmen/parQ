module.exports = {


  friendlyName: 'Delete Plate',


  description: 'Deletes a plate from the logged user.',


  inputs: {

    plate: {
      type: 'string'
    },

  },


  exits: {},


  fn: async function (inputs, exits) {

    var valuesToHandle = {
      plate: inputs.plate,
      owner: this.req.me.id
    };

    await Plate.destroy(valuesToHandle);

    return exits.success();

  }


};
