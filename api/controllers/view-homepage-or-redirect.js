module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: defaultExits(),


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {redirect:'/welcome'};
    }

    return exits.success();

  }


};
