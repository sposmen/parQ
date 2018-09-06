module.exports = {

  friendlyName: 'View Subscriptions',

  description: 'Update the profile for the logged-in user.',

  exits: {
    success: {
      viewTemplatePath: 'pages/parking/subscriptions',
    }
  },


  fn: async function (inputs, exits) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();

    return exits.success({monthName: monthNames[d.getMonth()], testing:"Hello World"});

  }


};
