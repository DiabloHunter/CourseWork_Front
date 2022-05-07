<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4>Our Products</h4>
        <router-link v-if="userEmail" :to="{name:'AddProduct'}">
          <button class="btn" style="float: right">Add Product</button>
        </router-link>
      </div>
    </div>
    <div class="row">
<!--      Display all the products in product box component-->
      <div v-for="product of products" :key="product.id"
           class="col-md-6 col-xl-4 col-12 pt-3">
        <ProductBox :product="product"
                    :userEmail = "userEmail"></ProductBox>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "@/components/ProductBox";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Product",
  components: {ProductBox},
  props:["products", "userEmail"],
  mounted() {
    this.$emit("fetchData");
  }
}
</script>

<style scoped>

</style>