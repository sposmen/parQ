module.exports = {

  friendlyName: 'Parking Assignments',

  description: 'View of parking assignments.',

  exits: {},

  fn: async function (inputs, exits) {

    let assignments = await CurrentCellsAssignment.find();

    inputs;

    if (assignments.length === 0) {
      assignments = await cellAssigns();
      if (assignments.length !== 0) {
        await CurrentCellsAssignment.createEach(assignments);
      }
    }
    return exits.success({assignments});

  }


};
