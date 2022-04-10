export default {
  actions:{
    async fetchOptions({commit, getters}, string) {
      if(string.length == 0) {
        commit('chooseOptionsUpdate')
      }if(!getters.statusSearch && string.length > 1) {
        try {
          const res = await fetch (
            `https://api.hh.ru/suggests/areas/?text=${string}`
          );
          if(res.status === 200) {
            const options = await res.json();
            commit('updateOptions', options.items)
          }
        } catch(e) {
          console.error(e)
        }
        
      }
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
