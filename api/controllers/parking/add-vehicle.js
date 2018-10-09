module.exports = {


  friendlyName: 'Add Vehicle',


  description: 'Adds a vehicle to the logged user.',


  inputs: {

    type: {
      type: 'string'
    },
    plate: {
      type: 'string'
    },
    description: {
      type: 'string'
    },

  },


  exits: {},


  fn: async function (inputs, exits) {

    var valuesToSet = {
      type: inputs.type,
      plate: inputs.plate,
      description: inputs.description,
      owner: this.req.me.id
    };

    await Vehicle.create(valuesToSet);

    return exits.success();

  }


};
