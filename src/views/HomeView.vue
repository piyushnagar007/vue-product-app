<script>
import ProductVue from '@/components/Product.vue';
export default {
  name: 'HomeView',
  components: {
    ProductVue
  },
  data() {
    return{
      premium: false,
    cart: []
    }
  },
  methods: {
    updateCart(id){
      this.cart.push(id);
    },
    removeFromCart(id){
      this.cart = this.cart.filter((value) => {
        return value != id
      })
    }
  }
}
</script>

<template>
  <div class="cart">
    <p>Cart({{ cart.length }})</p>
  </div>
  <ProductVue :premium="premium" @add-to-cart="updateCart" @remove-from-cart="removeFromCart"></ProductVue>
</template>

