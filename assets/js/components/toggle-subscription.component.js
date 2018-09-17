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
    'day',
    'subsclass'
  ],

  data: function () {
    return {
      //…
    };
  },

  template: `
    <button @click="click()" type="button" class="btn" v-bind:class="[subsclass]">{{day}}</button>
  `,
  methods: {
    click: async function () {
      await Cloud.toggleSubscription.with({date: this.date});
      window.location = '/parking/subscriptions';
    },

  }
});
