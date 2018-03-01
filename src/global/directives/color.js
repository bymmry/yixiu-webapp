(function () {
  'use strict'
  let color_obj = {
    red: {
      "base": '#F44336',
      "l5": '#FFEBEE',
      "l4": '#FFCDD2',
      "l3": '#EF9A9A',
      "l2": '#E57373',
      "l1": '#EF5350',
      "d1": '#E53935',
      "d2": '#D32F2F',
      "d3": '#C62828',
      "d4": '#B71C1C',
      "a1": '#FF8A80',
      "a2": '#FF5252',
      "a3": '#FF1744',
      "a4": '#D50000'
    }

    ,
    pink: {
      "base": '#e91e63',
      "l5": '#fce4ec',
      "l4": '#f8bbd0',
      "l3": '#f48fb1',
      "l2": '#f06292',
      "l1": '#ec407a',
      "d1": '#d81b60',
      "d2": '#c2185b',
      "d3": '#ad1457',
      "d4": '#880e4f',
      "a1": '#ff80ab',
      "a2": '#ff4081',
      "a3": '#f50057',
      "a4": '#c51162'
    }

    ,
    purple: {
      "base": '#9c27b0',
      "l5": '#f3e5f5',
      "l4": '#e1bee7',
      "l3": '#ce93d8',
      "l2": '#ba68c8',
      "l1": '#ab47bc',
      "d1": '#8e24aa',
      "d2": '#7b1fa2',
      "d3": '#6a1b9a',
      "d4": '#4a148c',
      "a1": '#ea80fc',
      "a2": '#e040fb',
      "a3": '#d500f9',
      "a4": '#aa00ff'
    }

    ,
    deep_purple: {
      "base": '#673ab7',
      "l5": '#ede7f6',
      "l4": '#d1c4e9',
      "l3": '#b39ddb',
      "l2": '#9575cd',
      "l1": '#7e57c2',
      "d1": '#5e35b1',
      "d2": '#512da8',
      "d3": '#4527a0',
      "d4": '#311b92',
      "a1": '#b388ff',
      "a2": '#7c4dff',
      "a3": '#651fff',
      "a4": '#6200ea'
    }

    ,
    indigo: {
      "base": '#3f51b5',
      "l5": '#e8eaf6',
      "l4": '#c5cae9',
      "l3": '#9fa8da',
      "l2": '#7986cb',
      "l1": '#5c6bc0',
      "d1": '#3949ab',
      "d2": '#303f9f',
      "d3": '#283593',
      "d4": '#1a237e',
      "a1": '#8c9eff',
      "a2": '#536dfe',
      "a3": '#3d5afe',
      "a4": '#304ffe'
    }

    ,
    blue: {
      "base": '#2196F3',
      "l5": '#E3F2FD',
      "l4": '#BBDEFB',
      "l3": '#90CAF9',
      "l2": '#64B5F6',
      "l1": '#42A5F5',
      "d1": '#1E88E5',
      "d2": '#1976D2',
      "d3": '#1565C0',
      "d4": '#0D47A1',
      "a1": '#82B1FF',
      "a2": '#448AFF',
      "a3": '#2979FF',
      "a4": '#2962FF'
    }

    ,
    light_blue: {
      "base": '#03a9f4',
      "l5": '#e1f5fe',
      "l4": '#b3e5fc',
      "l3": '#81d4fa',
      "l2": '#4fc3f7',
      "l1": '#29b6f6',
      "d1": '#039be5',
      "d2": '#0288d1',
      "d3": '#0277bd',
      "d4": '#01579b',
      "a1": '#80d8ff',
      "a2": '#40c4ff',
      "a3": '#00b0ff',
      "a4": '#0091ea'
    }

    ,
    cyan: {
      "base": '#00bcd4',
      "l5": '#e0f7fa',
      "l4": '#b2ebf2',
      "l3": '#80deea',
      "l2": '#4dd0e1',
      "l1": '#26c6da',
      "d1": '#00acc1',
      "d2": '#0097a7',
      "d3": '#00838f',
      "d4": '#006064',
      "a1": '#84ffff',
      "a2": '#18ffff',
      "a3": '#00e5ff',
      "a4": '#00b8d4'
    }

    ,
    teal: {
      "base": '#009688',
      "l5": '#e0f2f1',
      "l4": '#b2dfdb',
      "l3": '#80cbc4',
      "l2": '#4db6ac',
      "l1": '#26a69a',
      "d1": '#00897b',
      "d2": '#00796b',
      "d3": '#00695c',
      "d4": '#004d40',
      "a1": '#a7ffeb',
      "a2": '#64ffda',
      "a3": '#1de9b6',
      "a4": '#00bfa5'
    }

    ,
    green: {
      "base": '#4CAF50',
      "l5": '#E8F5E9',
      "l4": '#C8E6C9',
      "l3": '#A5D6A7',
      "l2": '#81C784',
      "l1": '#66BB6A',
      "d1": '#43A047',
      "d2": '#388E3C',
      "d3": '#2E7D32',
      "d4": '#1B5E20',
      "a1": '#B9F6CA',
      "a2": '#69F0AE',
      "a3": '#00E676',
      "a4": '#00C853'
    }

    ,
    light_green: {
      "base": '#8bc34a',
      "l5": '#f1f8e9',
      "l4": '#dcedc8',
      "l3": '#c5e1a5',
      "l2": '#aed581',
      "l1": '#9ccc65',
      "d1": '#7cb342',
      "d2": '#689f38',
      "d3": '#558b2f',
      "d4": '#33691e',
      "a1": '#ccff90',
      "a2": '#b2ff59',
      "a3": '#76ff03',
      "a4": '#64dd17'
    }

    ,
    lime: {
      "base": '#cddc39',
      "l5": '#f9fbe7',
      "l4": '#f0f4c3',
      "l3": '#e6ee9c',
      "l2": '#dce775',
      "l1": '#d4e157',
      "d1": '#c0ca33',
      "d2": '#afb42b',
      "d3": '#9e9d24',
      "d4": '#827717',
      "a1": '#f4ff81',
      "a2": '#eeff41',
      "a3": '#c6ff00',
      "a4": '#aeea00'
    }

    ,
    yellow: {
      "base": '#ffeb3b',
      "l5": '#fffde7',
      "l4": '#fff9c4',
      "l3": '#fff59d',
      "l2": '#fff176',
      "l1": '#ffee58',
      "d1": '#fdd835',
      "d2": '#fbc02d',
      "d3": '#f9a825',
      "d4": '#f57f17',
      "a1": '#ffff8d',
      "a2": '#ffff00',
      "a3": '#ffea00',
      "a4": '#ffd600'
    }

    ,
    amber: {
      "base": '#ffc107',
      "l5": '#fff8e1',
      "l4": '#ffecb3',
      "l3": '#ffe082',
      "l2": '#ffd54f',
      "l1": '#ffca28',
      "d1": '#ffb300',
      "d2": '#ffa000',
      "d3": '#ff8f00',
      "d4": '#ff6f00',
      "a1": '#ffe57f',
      "a2": '#ffd740',
      "a3": '#ffc400',
      "a4": '#ffab00'
    }

    ,
    orange: {
      "base": '#ff9800',
      "l5": '#fff3e0',
      "l4": '#ffe0b2',
      "l3": '#ffcc80',
      "l2": '#ffb74d',
      "l1": '#ffa726',
      "d1": '#fb8c00',
      "d2": '#f57c00',
      "d3": '#ef6c00',
      "d4": '#e65100',
      "a1": '#ffd180',
      "a2": '#ffab40',
      "a3": '#ff9100',
      "a4": '#ff6d00'
    }

    ,
    deep_orange: {
      "base": '#ff5722',
      "l5": '#fbe9e7',
      "l4": '#ffccbc',
      "l3": '#ffab91',
      "l2": '#ff8a65',
      "l1": '#ff7043',
      "d1": '#f4511e',
      "d2": '#e64a19',
      "d3": '#d84315',
      "d4": '#bf360c',
      "a1": '#ff9e80',
      "a2": '#ff6e40',
      "a3": '#ff3d00',
      "a4": '#dd2c00'
    }

    ,
    brown: {
      "base": '#795548',
      "l5": '#efebe9',
      "l4": '#d7ccc8',
      "l3": '#bcaaa4',
      "l2": '#a1887f',
      "l1": '#8d6e63',
      "d1": '#6d4c41',
      "d2": '#5d4037',
      "d3": '#4e342e',
      "d4": '#3e2723'
    }

    ,
    blue_grey: {
      "base": '#607d8b',
      "l5": '#eceff1',
      "l4": '#cfd8dc',
      "l3": '#b0bec5',
      "l2": '#90a4ae',
      "l1": '#78909c',
      "d1": '#546e7a',
      "d2": '#455a64',
      "d3": '#37474f',
      "d4": '#263238'
    }

    ,
    grey: {
      "base": '#9e9e9e',
      "l5": '#fafafa',
      "l4": '#f5f5f5',
      "l3": '#eeeeee',
      "l2": '#e0e0e0',
      "l1": '#bdbdbd',
      "d1": '#757575',
      "d2": '#616161',
      "d3": '#424242',
      "d4": '#212121'
    }
  }

  function extend(o, n, override = true) {
    for (var key in n) {
      if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
        o[key] = n[key]
      }
    }
    return o
  }

  function hexToRgba(hex, opacity) {
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"
  }
  let color = {
    setColor(el, binding) {
      let mainColor = ''
      let color = ''
      for (let o in binding.modifiers) {
        for (let colorKey in color_obj) {
          if (color_obj.hasOwnProperty(o)) {
            mainColor = color_obj[o]
          }
        }
      }
      if (mainColor) {
        for (let o in binding.modifiers) {
          for (let colorKey in mainColor) {
            if (mainColor.hasOwnProperty(o)) {
              color = mainColor[o]
            }
          }
        }
        if (color === '' || color === undefined) {
          if (mainColor.base) {
            color = mainColor.base
          }
        }
      }
      if (color) {
        let rgba = hexToRgba(color, binding.value || 1)
        if (binding.modifiers.bg) {
          el.style.setProperty('background', rgba, 'important')
          if (color != '#ffffff') {
            el.style.color = '#ffffff'
          }
        } else {
          el.style.setProperty('color', rgba, 'important')
        }
      }
    },
    install(Vue, options) {
      if (options) {
        color_obj = extend(color_obj, options)
      }
      Vue.directive('color', {
        inserted: this.setColor,
        updated: this.setColor
      })
    }
  }
  if (typeof module !== 'undefined' && module.exports !== 'undefined') {
    module.exports = color
  }else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return color
    })
  } else if (typeof window !== 'undefined' && window.Vue) {
    window.color = color
    Vue.use(color)
  }
}())
