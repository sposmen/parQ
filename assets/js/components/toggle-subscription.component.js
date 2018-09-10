/**
 * <toggle-subscription>
 * -----------------------------------------------------------------------------
 * A button with a built-in loading spinner.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('toggleSubscription', {

  props: [
    'date',
    'day'
  ],

  data: function () {
    return {
      //…
    };
  },

  template: `
    <button @click="click()" type="button" class="btn btn-success">{{day}}</button>
  `,
  methods: {
    click: async function () {
      let result = await Cloud.toggleSubscription.with({date: this.date}).protocol(io.socket);
    },

  }
});
