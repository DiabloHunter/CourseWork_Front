<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4>{{translate('title')}}</h4>
        <router-link v-if="userRole" :to="{name:'AddProduct'}">
          <button class="btn" style="float: right">{{translate('addProduct')}}</button>
        </router-link>

        <div style="">
          <select class="form-control" v-model="sort" style="width: 20%; display: inline-block; margin-right: 1%" >
            <option value="id" selected>{{translate('order')}}</option>
            <option value="name">{{translate('name')}}</option>
            <option value="description" >{{translate('description')}}</option>
            <option value="price">{{translate('price')}}</option>
          </select>
          <input class="form-control" placeholder="Search" style="width: 20%;display: inline-block;margin-right: 1%"  v-model="search" />
          <input class="form-control" placeholder="Price start" style="width: 10%;display: inline-block;margin-right: 1%"  v-model="priceStart"/>
          <input class="form-control" placeholder="Price end" style="width: 10%;display: inline-block; margin-right: 1%"  v-model="priceEnd"/>

          <button type="button" class="btn btn-primary" style="display: inline-block; margin-bottom: 3px" @click="productSortAndFilter()">{{translate('submit')}}</button>
        </div>


      </div>
    </div>
    <div class="row">
<!--      Display all the products in product box component-->
      <div v-for="product of filteredProducts" :key="product.id"
           class="col-md-6 col-xl-4 col-12 pt-3">
        <ProductBox :product="product"
                    :userRole = "userRole"
                    :language="language"></ProductBox>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "@/components/ProductBox";
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Product",
  mixins:[en, ua],
  components: {ProductBox},
  props:["products", "userRole", "language"],
  data(){
    return {
      sort:null,
      search:null,
      priceStart:null,
      priceEnd:null,
      thisProducts:null,
      filteredProducts:null,
    }
  },
  methods:{
    translate(prop){
      return this[this.language]["product"][prop];
    },
    productSortAndFilter() {
      switch (this.sort){
        case "id":
          this.thisProducts.sort(function(a, b){return a.id - b.id});
          break;
        case "name":
          this.thisProducts.sort(function(a, b){return a.name.localeCompare(b.name);});
          break;
        case "description":
          this.thisProducts.sort(function(a, b){return a.description.length-b.description.length});
          break;
        case "price":
          this.thisProducts.sort(function(a, b){return a.price - b.price});
          break;
      }
      this.filteredProducts = this.thisProducts;


      /////////
      if(this.search!=null){
        let filteredByName = this.thisProducts.filter(x=>x.name.toLowerCase().includes(this.search.toLowerCase()));
        let filteredByCode = this.thisProducts.filter(x=>x.code.toLowerCase().includes(this.search.toLowerCase()));
        let result =filteredByCode.concat(filteredByName);

        this.filteredProducts = result.filter(function(item, pos) {
          return result.indexOf(item) == pos;
        })
      }

      /////////

      if(this.priceStart!=null && this.priceStart!=""){
        this.filteredProducts = this.filteredProducts.filter(x=>x.price>=this.priceStart);
      }

      /////////
      if(this.priceEnd!=null && this.priceEnd!=""){
        this.filteredProducts = this.filteredProducts.filter(x=>x.price<=this.priceEnd);
      }
      /////////
    },
  },
  mounted() {
    this.$emit("fetchData");
    this.thisProducts = this.products;
    this.productSortAndFilter();
  }
}
</script>

<style scoped>

</style>