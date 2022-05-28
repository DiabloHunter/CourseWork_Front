<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">{{translate('title')}}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="category">
          <div class="form-group">
            <label>{{translate('name')}}</label>
            <input type="text" class="form-control" v-model="category.categoryName" required />
          </div>
          <div class="form-group">
            <label>{{translate('description')}}</label>
            <textarea type="text" class="form-control" v-model="category.description" pattern=".{30,240}" required />
          </div>
          <div class="form-group">
            <label>{{translate('image')}}</label>
            <textarea type="text" class="form-control" v-model="category.imageUrl" pattern=".{30,240}" required />
          </div>
          <button class="btn btn-primary" type="button" @click="editCategory()">{{translate('submit')}}</button>
          <button class="btn btn-danger" type="button" @click="deleteCategory()" style="float: right">{{translate('delete')}}</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";

export default {
  name: "EditCategory",
  mixins:[en, ua],
  data(){
    return{
      category:null,
      id:null
    }
  },
  props:["baseURL","categories", "language"],
  methods:{
    translate(prop){
      return this[this.language]["editCategory"][prop];
    },
    async editCategory(){
      delete this.category["products"]
      await axios.post(`${this.baseURL}category/update/${this.id}`, this.category)
          .then((res)=>{
            if(res.data.success){
              this.$emit("fetchData");
              this.$router.push({name:'Category'})
              swal({
                text:this.translate('updatedCategory'),
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
      await axios.delete(`${this.baseURL}category/delete/${this.id}`, this.category)
          .then(()=>{
            this.$emit("fetchData");
            this.$router.push({name:'Category'})
            swal({
              text:this.translate('deletedCategory'),
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