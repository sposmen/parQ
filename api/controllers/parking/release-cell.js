module.exports = {


  friendlyName: 'Release cell',


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

    const objToAdd = {owner: this.req.me.id, date: inputs.date};


    if( await Subscription.count(objToAdd) ){
      await Subscription.destroy(objToAdd);
    } else {
      await Subscription.create(objToAdd);
    }


    return exits.success();

  }


};
