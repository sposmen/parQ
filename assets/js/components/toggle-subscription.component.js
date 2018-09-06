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

  template: `
  <div class="toggle-subscription">
    <div class="form-group">
      <span class="switch">
        <input type="checkbox" class="switch" id="switch-normal" name="toggle" @click="click()">
        <label for="switch-normal">Subscribe for next round</label>
      </span>
    </div>
  </div>
  `,

  methods: {
    click: async function(){
      let result = await Cloud['toggleSubscription'].with({toggle:true})
      console.log(result)
    },

  }
});
