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
    }
  },
  methods: {
    updateCart(id){
      this.$store.commit('addToCart', id);
    },
    removeFromCart(id){
      this.$store.commit('removeFromCart', id);
    }
  },
  computed: {
    getCartSize(){
      return this.$store.getters.cartSize;
    }
  }
}
</script>

<template>
  <div class="cart">
    <p>Cart({{ getCartSize }})</p>
  </div>
  <ProductVue :premium="premium" @add-to-cart="updateCart" @remove-from-cart="removeFromCart"></ProductVue>
</template>

