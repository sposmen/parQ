module.exports = {


  friendlyName: 'Delete Vehicle',


  description: 'Deletes a vehicle from the logged user.',


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

    await Vehicle.destroy(valuesToHandle);

    return exits.success();

  }


};
