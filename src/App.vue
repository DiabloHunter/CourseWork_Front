<template>
  <Navbar :cartCount="cartCount"
          @resetCartCount="resetCartCount"
          :token="token"
          @changeLang="changeLang"
          :language="language"
  />
  <router-view v-if="categories && products" style="min-height: 60vh"
      :baseURL="baseURL"
      :categories="categories"
      :products="products"
      :orderItems="orderItems"
      :token="token"
      :userRole="userRole"
      :language="language"
      @fetchData="fetchData"
      @changeLang="changeLang"
      @resetCartCountAfterPayment="resetCartCountAfterPayment"
  >
  </router-view>
<!--  footer-->
  <Footer />
</template>


<script>
import Navbar from './components/Navbar.vue';
import axios from 'axios';
import Footer from "@/components/Footer";
export default {
  components: {Footer, Navbar},
  data() {
    return {
      baseURL: 'http://localhost:8080/api/',
      products:null,
      categories:null,
      orderItems:null,
      cartCount: 0,
      token:null,
      userRole:null,
      language: "en",
    }
  },
  methods: {
    async fetchData(){
      this.token = localStorage.getItem("token");
      this.userRole = localStorage.getItem("userRole");
      //api call to get categories
      await axios.get(this.baseURL + "category/")
      .then(res=> {
        this.categories = res.data})
      .catch((err) => console.log('err', err));

      //api call to get products

      await axios.get(this.baseURL + "product/")
          .then(res=> {
            this.products = res.data})
          .catch((err) => console.log('err', err));

      // fetch cart item if token is present i.e logged in
      if (this.token) {
        axios
            .get(`${this.baseURL}cart/?token=${this.token}`)
            .then((res) => {
              const result = res.data;
              this.cartCount = result.cartItems.length;
            })
            .catch((err) => console.log("err", err));
        await axios
            .get(`${this.baseURL}order/getOrders/?token=${this.token}`)
            .then((res) => {
              const result = res.data;
              this.orderItems = result.orderItems;
            })
            .catch((err) => console.log("err", err));

      }

    },
    resetCartCount() {
      this.cartCount = 0;
      this.token = null;
      this.userRole = null;
    },

    resetCartCountAfterPayment() {
      this.cartCount = 0;
    },

    changeLang(data){
      this.language = data.lang;
    }
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.userRole = localStorage.getItem("userRole");
    this.fetchData();
  }
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
