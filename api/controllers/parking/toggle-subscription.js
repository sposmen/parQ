module.exports = {


  friendlyName: 'Toogle suscription',


  description: 'Toogle user in the list.',


  inputs: {

    date: {
      type: 'string',
      required: true
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const objToCheck = {owner: this.req.me.id, date: inputs.date};


    if( await Subscription.count(objToCheck) ){
      await Subscription.destroy(objToCheck)
    } else {
      await Subscription.create(objToCheck)
    }


    return exits.success();

  }


};
