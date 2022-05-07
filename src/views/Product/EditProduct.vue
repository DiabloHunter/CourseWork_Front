<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Product</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="product">
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model="product.categoryId">
              <option v-for="category of categories"
                      :key="category.id"
                      :value="category.id">{{category.categoryName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Code</label>
            <input type="text" class="form-control" v-model="product.code" required>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="product.name" required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="product.description" required />
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="text" class="form-control" v-model="product.imageURL"  required />
          </div>
          <div class="form-group">
            <label>Price($)</label>
            <input type="number" class="form-control" v-model="product.price" required />
          </div>
          <div class="form-group">
            <label>Minimal sales</label>
            <input type="number" class="form-control" v-model="product.minSales" required />
          </div>
          <div class="form-group">
            <label>Maximal sales</label>
            <input type="number" class="form-control" v-model="product.maxSales" required />
          </div>
          <button class="btn btn-primary" type="button" @click="editProduct()">Submit</button>
          <button class="btn btn-danger" type="button" @click="deleteProduct()" style="float:right;">Delete</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "EditProduct",
  data(){
    return{
      product:null,
      id:null
    }
  },
  props:["baseURL","categories", "products"],
  methods:{
    async editProduct(){
      delete this.product["products"]
      console.log('product', this.product)
      await axios.post(`${this.baseURL}product/update/${this.id}`, this.product)
          .then(res=>{
            if(res.data.success){
              this.$emit("fetchData");
              this.$router.push({name:'AdminProduct'});
              swal({
                text:"Product has been updated successfully",
                icon: "success"
              });
            }
            else{
              swal({
                text: res.data.message,
                icon: "error",
              });
            }

          }).catch(err=>console.log('err', err));
    },
    async deleteProduct(){
      delete this.product["products"]
      console.log('product', this.product)
      await axios.delete(`${this.baseURL}product/delete/${this.id}`, this.product)
          .then(()=>{
            this.$emit("fetchData");
            this.$router.push({name:'AdminProduct'})
            swal({
              text:"Product has been deleted successfully",
              icon: "success"
            })
          }).catch(err=>console.log('err', err))
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.product = this.products.find(product=>product.id==this.id)
    console.log(this.product);
  }
}
</script>

<style scoped>

</style>