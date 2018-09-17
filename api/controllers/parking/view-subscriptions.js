module.exports = {

  friendlyName: 'View Subscriptions',

  description: 'Update the profile for the logged-in user.',

  exits: {
    success: {
      viewTemplatePath: 'pages/parking/subscriptions',
    }
  },


  fn: async function (inputs, exits) {

    let startingDay = moment(1, 'DD').startOf('month').startOf('week');
    const endingDate = moment(1, 'DD').endOf('month').endOf('week');

    const subscriptions = await Subscription.find({date: {'>=': startingDay.format(), '<=': endingDate.format()}});

    let subscriptionClass = {}

    subscriptions.forEach((subscription)=>{
      subscriptionClass[subscription.date] = 'btn-info'
    });

    let subscriptionAssign = await ReleaseCell.find({
      assigned: this.req.me.id,
      assignAccepted: true,
      date: {
        '>=': startingDay.format(),
        '<=': endingDate.format()
      }
    });

    subscriptionAssign.forEach((subscription)=>{
      subscriptionClass[subscription.date] = 'btn-success'
    });

    return exits.success({monthName: moment().format('MMMM'), startingDay: startingDay, endingDate: endingDate, subscriptionClass: subscriptionClass});

  }


};
