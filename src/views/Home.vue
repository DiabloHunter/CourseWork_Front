<template>
  <div id="home">
    <div id="background-div" class="page-holder bg-cover">
      <div class="container py-5">
        <header class="text-left text-white py-5" style="margin-top: 20%">
          <h3 class="mb-4 rounded" id="heading">
            <router-link class="bg-white px-2 py-2 rounded" :to="{ name: 'AdminProduct' }" style="color:black;">
              <a href="#start-shopping">{{translate('startShopping')}}</a>
            </router-link>
          </h3>
          <p class="lead mb-0 bg-dark p-1 rounded" style="width: 220px">{{translate('slogan')}}</p>
        </header>
      </div>
    </div>

    <!--    display categories-->
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="pt-3">{{translate('topCategories')}}</h2>
          <div class="row">
            <div v-for="index in this.categorySize" :key="index"
                 class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
              <CategoryBox :category="categories[index-1]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    display products-->
    <div class="container py-2">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="pt-3">{{translate('topProducts')}}</h2>
          <div class="row">
            <div v-for="index in this.productSize" :key="index"
                 class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
              <ProductBox :product="products[index-1]" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import CategoryBox from "@/components/Category/CategoryBox";
import ProductBox from "@/components/ProductBox";
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  mixins:[en, ua],
  components: {ProductBox, CategoryBox},
  props:["categories", "products", "language"],
  data(){
    return{
      categorySize: 0,
      productSize: 0
    }
  },
  methods:{
    translate(prop){
      return this[this.language]["home"][prop];
    },
  },
  mounted() {
    this.categorySize = Math.min(6, this.categories.length);
    this.productSize = Math.min(9, this.products.length);
  }
}
</script>

<style>
  .page-holder{
    min-height: 100vh;
  }
  .bg-cover{
    background-size: cover !important;
  }
  #background-div{
    background: url("../assets/home.png");
  }
  #heading{
    font-weight: 400;
  }
</style>
