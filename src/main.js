import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'
import "./assets/styles/styles.css"

const store = createStore({
  state() {
    return {
      cart: []
    }
  },
  mutations: {
    addToCart(state, data) {
      state.cart.push(data);
    },
    removeFromCart(state, data) {
      state.cart = state.cart.filter((value) => {
        return value != data
      })
    }
  },
  getters: {
    cartSize (state) {
      return state.cart.length;
    }
  }
})

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
