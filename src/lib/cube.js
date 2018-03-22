import {
  Style,
  Button,
  Checkbox,
  CheckboxGroup,
  // Loading,
  // Tip,
  Popup,
  Toast,
  Picker,
  TimePicker,
  Dialog,
  ActionSheet,
  Scroll,
  Slide,
  Select,
  Upload
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
    Vue.use(Select)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Upload)
    Vue.use(TimePicker)
    Vue.use(Popup)
  }
}