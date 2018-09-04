module.exports = {


  friendlyName: 'View edit plates',


  description: 'Display "Edit plates" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-plates',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
