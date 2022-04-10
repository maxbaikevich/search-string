<template>
  <div class="search">
    <div class="search__container">
      <label class="search__input-wrapper">
        <p class="search__label">Выберите город</p>
          <input class="search__input" placeholder="Выберите город"
            v-model="search"
            @focus="activeSearch"
          />
        <svg class="icon-search" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#e5e5e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.0004 20.9999L16.6504 16.6499" stroke="#e5e5e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </label>
      <ul class="drop-down">
        <li class="drop-down__item" v-for="(item, index) in allOptions"
          :key="index"
          @click="chooseItem(item.title)"
        >
          <p class="drop-down__title">{{item.title}}</p>
          <p class="drop-down__allTitle">{{item.allTitle}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  name: 'search',
  data() {
    return {
      search: '',
      timer: null,
    }
  },
  watch:{
    search(val) {
      this.typing(val)
    }
  },
  methods:{
    ...mapActions(['fetchOptions']),
    ...mapMutations(['chooseOptionsUpdate','chooseStatusUpdate']),
    chooseItem(val) {
      this.search = val
      this.chooseOptionsUpdate()
      this.chooseStatusUpdate(true)
    },
    activeSearch() {
      this.chooseStatusUpdate(false)
    },
    typing(val) {
      if(this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
				this.fetchOptions(val)
			}, 300)
    },
  },
  computed:{
    ...mapGetters(['allOptions', 'statusSearch'])
  },
}
</script>

<style>
  .search {
    display: flex;
    justify-content: center;
  }

  .search__container {
    justify-content: center;
  }

  .search__input {
    width: 417px;
    height: 54px;
    box-sizing: border-box;
    font-size: 17px;
    font-weight: 500;
    padding-left: 53px;
    color: #000000;
    border-radius: 4px;
    border: none;
  }

  ::placeholder { 
    color: #b9b9b9;
    font-size: 17px;
    font-weight: 500;
  }

  .search__input-wrapper {
    color: #b9b9b9;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 10px;
  }

  .search__label {
    margin: 0;
    margin-bottom: 5px;
  }

  .icon-search {
    position: absolute;
    bottom: 12px;
    left: 13px;
  }
  .drop-down {
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    border-radius: 4px;
  }

  .drop-down__item {
    height: 50px;
    background-color: #ffffffff;
    padding-top: 10px;
    padding-left: 13px;
    padding-right: 13px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .drop-down__item:hover  {
    background-color: #D0D0E2;
  }

  .drop-down__item:last-child{
    border-radius: 0 0 4px 4px;
  }

  .drop-down__item:first-child{
    border-radius: 4px 4px 0 0;
  }

  .drop-down__title {
    margin: 0;
  }

  .drop-down__allTitle {
    margin: 0;
    color: #b9b9b9;
    font-size: 12px;
  }
</style>