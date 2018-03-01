import {
  Style,
  Button,
  // Checkbox,
  // CheckboxGroup,
  // Loading,
  // Tip,
  // Popup,
  Toast,
  Picker,
  // TimePicker,
  Dialog,
  ActionSheet,
  Scroll,
  Slide,
  // IndexList,
} from 'cube-ui'

export default {
  install(Vue) {
    Vue.use(Button)
    Vue.use(Scroll)
    Vue.use(Picker)
    Vue.use(Slide)
    Vue.use(Slide)
    Vue.use(Toast)
    Vue.use(Dialog)
    Vue.use(ActionSheet)
  }
}