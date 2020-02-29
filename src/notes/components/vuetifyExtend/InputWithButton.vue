<script>
import { VTextField } from 'vuetify'

export default {
  name: 'input-with-button',
  extends: VTextField,
  methods: {
    // genButtonSlot () {
    //   const slot = []

    //   if (this.$slots['append']) {
    //     slot.push(this.$slots['append'])
    //   } else if (this.appendIcon) {
    //     slot.push(this.genIcon('append'))
    //   }

    //   return this.genSlot('append', 'inner', slot)
    // },
    genDefaultSlot () {
      return [
        this.genTextFieldSlot(),
        this.genClearIcon(),
        this.genIconSlot()
      ]
    }
  }
}
</script>
