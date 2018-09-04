module.exports = {


  friendlyName: 'Add Plate',


  description: 'Update the profile for the logged-in user.',


  inputs: {

    plate: {
      type: 'string'
    },

  },


  exits: {


  },


  fn: async function (inputs, exits) {

    var valuesToSet = {
      plate: inputs.plate,
      owner: this.req.me.id
    };

    await Plate.create(valuesToSet);

    return exits.success();

  }


};
