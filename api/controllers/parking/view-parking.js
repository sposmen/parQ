module.exports = {

  friendlyName: 'View Subscriptions',

  description: 'Update the profile for the logged-in user.',

  exits: {
    success: {
      viewTemplatePath: 'pages/parking/view-parking',
    }
  },

  fn: async function (inputs, exits) {
    let me = await User.findOne({id: this.req.me.id}).populate('vehicles');
    me.vehicles = me.vehicles.filter((vehicle)=> vehicle.type === 'Car' );
    return exits.success({me});
  }

};
