module.exports = {

  friendlyName: 'View Subscriptions',

  description: 'Update the profile for the logged-in user.',

  exits: {
    success: {
      viewTemplatePath: 'pages/parking/subscriptions',
    }
  },


  fn: async function (inputs, exits) {

    let startingDay = moment(1, 'DD').startOf('week');
    const endingDate = moment(1, 'DD').endOf('month').endOf('week')

    return exits.success({monthName: moment().format('MMMM'), startingDay: startingDay, endingDate: endingDate});

  }


};
