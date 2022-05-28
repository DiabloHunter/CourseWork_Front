<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">{{translate('title')}}</h4>
      </div>
    </div>

    <div class="row">
      <div
          v-for="product of products"
          :key="product.id"
          class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <ProductBox :product="product"> </ProductBox>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ProductBox from "../../components/ProductBox.vue";
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  name:"WishList",
  mixins:[en, ua],
  components: { ProductBox },
  data() {
    return {
      token: null,
      products: null,
    };
  },
  props: ["baseURL", "language"],
  methods: {
    translate(prop){
      return this[this.language]["wishlist"][prop];
    },
    fetchWishList() {
      axios
          .get(`${this.baseURL}wishlist/?token=${this.token}`)
          .then((data) => {
            this.products = data.data;
          })
          .catch((err) => {
            console.log("err", err);
          });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchWishList();
  },
};
</script>