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

parasails.registerComponent('toggleDay', {

  props: [
    'date',
    'day',
    'subsclass'
  ],

  template: `<button @click="click()" type="button" class="btn" v-bind:class="[subsclass]">{{day}}</button>`,
  methods: {
    click: async function () {
      this.$emit('updatedata', this.date);
    },

  }
});
