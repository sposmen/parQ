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
  <div class="col-md-1">
    <button @click="click()" type="button" class="btn btn-success">{{day}}</button>
  </div>
  `,
  beforeMount: function() {
    console.log(this.date)
  },
  methods: {
    click: async function () {
      let result = await Cloud['toggleSubscription'].with({date: this.date});
    },

  }
});
