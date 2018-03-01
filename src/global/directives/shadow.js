let shadow_key_umbra_opacity = 'rgba(0, 0, 0, .2)'
let shadow_key_penumbra_opacity = 'rgba(0, 0, 0, .14)'
let shadow_ambient_shadow_opacity = 'rgba(0, 0, 0, .12)'
let preset = {
  0: `0 0px 0px ${shadow_key_umbra_opacity},0 0px 0px ${shadow_key_penumbra_opacity},0 0px 0px ${shadow_ambient_shadow_opacity}`,
  1: `0 1px 3px ${shadow_key_umbra_opacity},0 1px 1px ${shadow_key_penumbra_opacity},0 2px 1px -1px ${shadow_ambient_shadow_opacity}`,
  2: `0 1px 5px ${shadow_key_umbra_opacity},0 2px 2px ${shadow_key_penumbra_opacity},0 3px 1px -2px ${shadow_ambient_shadow_opacity}`,
  3: `0 1px 8px ${shadow_key_umbra_opacity},0 3px 4px ${shadow_key_penumbra_opacity},0 3px 3px -2px ${shadow_ambient_shadow_opacity}`,
  4: `0 2px 4px -1px ${shadow_key_umbra_opacity},0 4px 5px ${shadow_key_penumbra_opacity},0 1px 10px ${shadow_ambient_shadow_opacity}`,
  5: `0 3px 5px -1px ${shadow_key_umbra_opacity},0 5px 8px ${shadow_key_penumbra_opacity},0 1px 14px ${shadow_ambient_shadow_opacity}`,
  6: `0 3px 5px -1px ${shadow_key_umbra_opacity},0 6px 10px ${shadow_key_penumbra_opacity},0 1px 18px ${shadow_ambient_shadow_opacity}`,
  7: `0 4px 5px -2px ${shadow_key_umbra_opacity},0 7px 10px 1px ${shadow_key_penumbra_opacity},0 2px 16px 1px ${shadow_ambient_shadow_opacity}`,
  8: `0 5px 5px -3px ${shadow_key_umbra_opacity},0 8px 10px 1px ${shadow_key_penumbra_opacity},0 3px 14px 2px ${shadow_ambient_shadow_opacity}`,
  9: `0 5px 6px -3px ${shadow_key_umbra_opacity},0 9px 12px 1px ${shadow_key_penumbra_opacity},0 3px 16px 2px ${shadow_ambient_shadow_opacity}`,
  10: `0 6px 6px -3px ${shadow_key_umbra_opacity},0 10px 14px 1px ${shadow_key_penumbra_opacity},0 4px 18px 3px ${shadow_ambient_shadow_opacity}`,
  11: `0 6px 7px -4px ${shadow_key_umbra_opacity},0 11px 15px 1px ${shadow_key_penumbra_opacity},0 4px 20px 3px ${shadow_ambient_shadow_opacity}`,
  12: `0 7px 8px -4px ${shadow_key_umbra_opacity},0 12px 17px 2px ${shadow_key_penumbra_opacity},0 5px 22px 4px ${shadow_ambient_shadow_opacity}`,
  13: `0 7px 8px -4px ${shadow_key_umbra_opacity},0 13px 19px 2px ${shadow_key_penumbra_opacity},0 5px 24px 4px ${shadow_ambient_shadow_opacity}`,
  14: `0 7px 9px -4px ${shadow_key_umbra_opacity},0 14px 21px 2px ${shadow_key_penumbra_opacity},0 5px 26px 4px ${shadow_ambient_shadow_opacity}`,
  15: `0 8px 9px -5px ${shadow_key_umbra_opacity},0 15px 22px 2px ${shadow_key_penumbra_opacity},0 6px 28px 5px ${shadow_ambient_shadow_opacity}`,
  16: `0 8px 10px -5px ${shadow_key_umbra_opacity},0 16px 24px 2px ${shadow_key_penumbra_opacity},0 6px 30px 5px ${shadow_ambient_shadow_opacity}`,
  17: `0 8px 11px -5px ${shadow_key_umbra_opacity},0 17px 26px 2px ${shadow_key_penumbra_opacity},0 6px 32px 5px ${shadow_ambient_shadow_opacity}`,
  18: `0 9px 11px -5px ${shadow_key_umbra_opacity},0 18px 28px 2px ${shadow_key_penumbra_opacity},0 7px 34px 6px ${shadow_ambient_shadow_opacity}`,
  19: `0 9px 12px -6px ${shadow_key_umbra_opacity},0 19px 29px 2px ${shadow_key_penumbra_opacity},0 7px 36px 6px ${shadow_ambient_shadow_opacity}`,
  20: `0 10px 13px -6px ${shadow_key_umbra_opacity},0 20px 31px 3px ${shadow_key_penumbra_opacity},0 8px 38px 7px ${shadow_ambient_shadow_opacity}`,
  21: `0 10px 13px -6px ${shadow_key_umbra_opacity},0 21px 33px 3px ${shadow_key_penumbra_opacity},0 8px 40px 7px ${shadow_ambient_shadow_opacity}`,
  22: `0 10px 14px -6px ${shadow_key_umbra_opacity},0 22px 35px 3px ${shadow_key_penumbra_opacity},0 8px 42px 7px ${shadow_ambient_shadow_opacity}`,
  23: `0 11px 14px -7px ${shadow_key_umbra_opacity},0 23px 36px 3px ${shadow_key_penumbra_opacity},0 9px 44px 8px ${shadow_ambient_shadow_opacity}`,
  24: `0 11px 15px -7px ${shadow_key_umbra_opacity},0 24px 38px 3px ${shadow_key_penumbra_opacity},0 9px 46px 8px ${shadow_ambient_shadow_opacity}`
}

function setElevation(el, binding) {
  if (binding.value >= 0) {
    el.style.boxShadow = `${preset[binding.value]}`
  }
}
export default {
  install(Vue) {
    Vue.directive('shadow', {
      inserted: setElevation,
      updated: setElevation
    })
  }
}
