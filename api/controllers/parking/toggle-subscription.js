module.exports = {


  friendlyName: 'Toogle suscription',


  description: 'Toogle user in the list.',


  inputs: {

    toggle: {
      type: 'string'
    },

  },


  exits: {},


  fn: async function (inputs, exits) {

    const objToCheck = {owner: this.req.me.id};

    if(inputs.toggle){
      if( await Subscription.count(objToCheck) ){
        await Subscription.destroy(objToCheck)
      } else {
        await Subscription.create(objToCheck)
      }
    }

    return exits.success();

  }


};
