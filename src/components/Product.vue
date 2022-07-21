<script>
import ProductDetailsVue from '@/components/ProductDetails.vue';
import ProductReviewVue from '@/components/ProductReview.vue';
export default {
  name: 'ProductView',
  components: {
    ProductDetailsVue,
    ProductReviewVue
  },
  props : {
    premium: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      product: 'Socks',
      brand: 'Vue',
      selectedVariant: 0,
      onSale: true,
      variants: [
        {
          variantId: 2234,
          variantColor: "blue",
          variantImage: "../assets/images/blue-socks.jpg",
          variantQuantity: 0
        },
        {
          variantId: 2235,
          variantColor: "green",
          variantImage: "../assets/images/green-socks.jpg",
          variantQuantity: 5
        }
      ],
      sizes: ["S", "M", "L"],
      reviews: [],
      details: ["80% Cotton", "20% Polyester", "Gender-neutral"]
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateImage(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    addReview(productReview){
      this.reviews.push(productReview);
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shippingFee(){
      if(this.premium){
        return 'Free';
      }
      return '2.99';
    }
  }
}
</script>

<template>

  <div class="product">
  <div class="product-image">
    <img v-bind:src="image">
  </div>
  <div class="product-info">
    <h1>{{ title }}</h1>
    <p v-if="inStock">In Stock</p>
    <p v-else :class=" !inStock ? 'no-stock' : ''">Out of Stock</p>
    <span v-show="onSale">On Sale!</span>
    <p>Shipping: {{ shippingFee }}</p>
    
    <div v-for="(variant,index) in variants" :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor}"
          @mouseover="updateImage(index)"
          >
    </div>
    <div>Sizes:
      <span v-for="size in sizes">{{ size }} </span>
    </div>
    <ProductDetailsVue :details="details"></ProductDetailsVue>
    <button @click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}">Add to Cart</button>
    <button @click="removeFromCart">Remove</button>
  </div>
  <div>
    <h2>Reviews</h2>
    <p v-if="!reviews.length">There are no reviews yet!</p>
    <ul>
      <li v-for="review in reviews">
      <p>{{ review.name }}</p>
      <p>Rating: {{ review.rating}}</p>
      <p>{{ review.review }}</p>
      </li>
    </ul>
  </div>
  <ProductReviewVue @review-submitted="addReview"></ProductReviewVue>
</div>
</template>

