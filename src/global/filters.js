let filters = {
  init(val) {
    return 'filter init'
  },
  arr2name(val) {
    if (val.length > 0) {
      let res = []
      val.forEach(item => {
        res.push(item.name)
      })
      return res.join('、')
    } else {
      return '无'
    }
  },
  arr2id(val) {
    if (val.length > 0) {
      let res = []
      val.forEach(item => {
        res.push(item._id)
      })
      return res
    } else {
      return val
    }
  },
  unix2time(val) {
    return val
    // return moment.unix(val).format('YYYY-MM-DD HH:mm')
  },
  unix2hhmm(val) {
    return val
    // return moment.unix(val).format('HH:mm')
  }
}
export default {
  install(Vue) {
    for (var key in filters) {
      Vue.filter(key, filters[key])
    }
    Vue.prototype.unix2hhmm = filters.unix2hhmm
    Vue.prototype.arr2name = filters.arr2name
    Vue.prototype.arr2id = filters.arr2id
  }
}
