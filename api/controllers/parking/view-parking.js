module.exports = {

  friendlyName: 'View Subscriptions',

  description: 'Update the profile for the logged-in user.',

  exits: {
    success: {
      viewTemplatePath: 'pages/parking/view-parking',
    }
  },


  fn: async function (inputs, exits) {

    let currentCellAssigns = await CurrentCellsAssign.find();

    if(currentCellAssigns.length === 0){
      currentCellAssigns = await cellAssigns();
      if(currentCellAssigns.length !== 0){
        await CurrentCellsAssign.createEach(currentCellAssigns)
       }
    }
    return exits.success({cellAssigns: currentCellAssigns});

  }


};
