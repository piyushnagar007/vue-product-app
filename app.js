
Vue.component('product', {
  props : {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
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
    <product-details :details="details"></product-details>
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
  <product-review @review-submitted="addReview"></product-review>
</div>
  `,
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
          variantImage: "./images/blue-socks.jpg",
          variantQuantity: 0
        },
        {
          variantId: 2235,
          variantColor: "green",
          variantImage: "./images/green-socks.jpg",
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
})

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
  <ul>
  <li v-for="detail in details">{{ detail }}</li>
  </ul>
  `,
  data(){
    return this.details;
  }
})

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
  
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>
  `,
  data(){
    return {
      name: null,
      review: null,
      rating: null,
      recommmend: null
    }
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommmend: this.recommmend
      }
      this.$emit('review-submitted', productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
      this.recommmend = null;
    }
  }
})
const app = new Vue({
  el: '#app',
  data : {
    premium: false,
    cart: []
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
})