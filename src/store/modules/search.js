export default {
  actions:{
    async fetchOptions({commit}, string) {
      const res = await fetch (
        `https://api.hh.ru/suggests/areas/?text=${string}`
      );
      const options = await res.json();
      commit('updateOptions', options.items)
    }
  },
  mutations:{
    updateOptions(state, options) {
      state.options = options
    },
    chooseStatusUpdate(state, val) {
      state.finishSearch = val
    },
    chooseOptionsUpdate(state) {
      state.options = []
    }
  },
  state:{
    options:[],
    finishSearch: false
  },
  getters:{
    allOptions(state) {
      if(!state.options) return
      let res = state.options.map((el)=> {
        const [title, subText = ''] = el.text.split('(')
        return {
          title: title.trim(),
          allTitle: subText ? `г ${title.trim()}, ${subText.replace(/.$/,"")}` :  null
        }
      })
      return res
    },
    statusSearch(state) {
      return state.finishSearch
    }
  },
}
