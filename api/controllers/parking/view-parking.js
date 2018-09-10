module.exports = {

  friendlyName: 'View Subscriptions',

  description: 'Update the profile for the logged-in user.',

  exits: {
    success: {
      viewTemplatePath: 'pages/parking/view-parking',
    }
  },


  fn: async function (inputs, exits) {

    const currentCellAssigns = await cellAssigns();

    return exits.success({cellAssigns: currentCellAssigns});

  }


};
