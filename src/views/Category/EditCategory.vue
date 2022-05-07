<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Category</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="category">
          <div class="form-group">
            <label>Category Name</label>
            <input type="text" class="form-control" v-model="category.categoryName" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea type="text" class="form-control" v-model="category.description" pattern=".{30,240}" required />
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <textarea type="text" class="form-control" v-model="category.imageUrl" pattern=".{30,240}" required />
          </div>
          <button class="btn btn-primary" type="button" @click="editCategory()">Submit</button>
          <button class="btn btn-danger" type="button" @click="deleteCategory()" style="float: right">Delete</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: "EditCategory",
  data(){
    return{
      category:null,
      id:null
    }
  },
  props:["baseURL","categories"],
  methods:{
    async editCategory(){
      delete this.category["products"]
      console.log('category', this.category)
      await axios.post(`${this.baseURL}category/update/${this.id}`, this.category)
          .then((res)=>{
            if(res.data.success){
              this.$emit("fetchData");
              this.$router.push({name:'Category'})
              swal({
                text:"Category has been updated successfully",
                icon: "success"
              })
            }
            else{
              swal({
                text: res.data.message,
                icon: "error",
              });
            }
          }).catch(err=>console.log('err', err))
    },
    async deleteCategory(){
      delete this.category["products"]
      console.log('category', this.category)
      await axios.delete(`${this.baseURL}category/delete/${this.id}`, this.category)
          .then(()=>{
            this.$emit("fetchData");
            this.$router.push({name:'Category'})
            swal({
              text:"Category has been deleted successfully",
              icon: "success"
            })
          }).catch(err=>console.log('err', err))
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.category = this.categories.find(category=>category.id==this.id)
  }
}
</script>

<style scoped>

</style>