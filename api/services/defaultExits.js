module.exports = (extraExits = {}) => {
  return _.merge({},
    {
      success: {
        statusCode: 200,
        description: 'Requesting user is a guest, so show the public landing page.',
        viewTemplatePath: 'pages/homepage'
      },

      redirect: {
        responseType: 'redirect',
        description: 'Requesting user is logged in, so redirect to the internal welcome page.'
      },
    }
    , extraExits)
};
