/**
 * <month>
 * -----------------------------------------------------------------------------
 * A button with a built-in loading spinner.
 *
 * @type {Component}
 *
 * @event toggled   [emitted when toggle-day is clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('month', {

  props: [
    'monthName',
    'monthData'
  ],

  template: JST['assets/templates/generic/month.html'](),
  methods: {
    toggled: async function (date) {
      this.$emit('toggled-day', date);
    },

  }
});
