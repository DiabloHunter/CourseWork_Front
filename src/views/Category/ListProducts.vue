<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">{{category.categoryName}}</h4>
        <h5 style="font-weight: 300; color: #686868"> {{msg}} </h5>
      </div>
    </div>

    <div class="row">
      <div v-for="product of productList" :key="product.id"
           class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
        <ProductBox :product="product" />
      </div>
    </div>

  </div>
</template>

<script>
import ProductBox from "@/components/ProductBox";
export default {
  name: "ListProduct",
  components: {ProductBox},
  data(){
    return{
      id:null,
      category:{},
      productList:{},
      msg:''
    }
  },
  props:["categories", "products"],
  mounted() {
    this.id = this.$route.params.id;
    this.category = this.categories.find(category=>category.id==this.id);
    this.productList = this.products.filter(x=>x.categoryId==this.id);
    if (this.productList.length == 0) {
      this.msg = "no products found"
    } else if (this.productList.length == 1) {
      this.msg = "Only 1 product found"
    } else {
      this.msg = this.productList.length + " products found"
    }
  }
}
</script>

<style scoped>

</style>