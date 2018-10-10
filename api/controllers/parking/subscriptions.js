module.exports = {

  friendlyName: 'Subscriptions',

  description: 'Update the profile for the logged-in user.',

  exits: {
    // success: {
    //   viewTemplatePath: 'pages/parking/subscriptions',
    // }
  },


  fn: async function (inputs, exits) {
    let monthData = [];
    let result = {monthData: monthData, monthName: moment().format('MMMM')};
    let startingDay = moment(1, 'DD').startOf('month').startOf('week');
    let endingDate = moment(1, 'DD').endOf('month').endOf('week');

    const subscriptions = await Subscription.find({date: {'>=': startingDay.format(), '<=': endingDate.format()}});

    let subscriptionClass = {};

    subscriptions.forEach((subscription) => {
      subscriptionClass[subscription.date] = 'btn-info';
    });

    let subscriptionAssign = await ReleaseCell.find({
      assigned: this.req.me.id,
      assignAccepted: true,
      date: {
        '>=': startingDay.format(),
        '<=': endingDate.format()
      }
    });

    subscriptionAssign.forEach((subscription) => {
      subscriptionClass[subscription.date] = 'btn-success';
    });

    while (startingDay.isBefore(endingDate)) {
      let weekData = [];
      for (let day = 0; day < 7; day++) {
        let dayData = {
          day: startingDay.day(day).format('DD'),
          dateText: startingDay.day(day).format('YYYY-MM-DD'),
          class: 'btn-danger'
        };
        if (subscriptionClass.hasOwnProperty(dayData.dateText)) {
          dayData.class = subscriptionClass[dayData.dateText];
        }
        weekData.push(dayData);
      }
      monthData.push(weekData);
      startingDay.add(7, 'day');
    }

    return exits.success(result);

  }


};
