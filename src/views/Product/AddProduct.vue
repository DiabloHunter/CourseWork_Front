<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4>{{translate('title')}}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>{{translate('category')}}</label>
            <select class="form-control" v-model="categoryId" >
              <option v-for="category in categories" :key="category.id"
                      :value="category.id">{{ category.categoryName }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{translate('code')}}</label>
            <input type="text" v-model="code" class="form-control" placeholder="D001" required />
          </div>
          <div class="form-group">
            <label>{{translate('name')}}</label>
            <input type="text" v-model="name" class="form-control" required />
          </div>
          <div class="form-group">
            <label>{{translate('description')}}</label>
            <textarea v-model="description" class="form-control" pattern=".{3,240}" required/>
          </div>
          <div class="form-group">
            <label>{{translate('image')}}</label>
            <textarea v-model="imageURL" class="form-control" pattern=".{20,240}" required />
          </div>
          <div class="form-group">
            <label>{{translate('price')}}</label>
            <input type="number" v-model="price" class="form-control" required>
          </div>
          <div class="form-group">
            <label>{{translate('minimalSales')}}</label>
            <input type="number" v-model="minSales" class="form-control" required>
          </div>
          <div class="form-group">
            <label>{{translate('maximumSales')}}</label>
            <input type="number" v-model="maxSales" class="form-control" required>
          </div>
          <button type="button" class="btn btn-primary" @click="addProduct()">{{translate('addGood')}}</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>

    <!--        Form-->
  </div>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert'
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  props: ["baseURL", "categories", "language"],
  mixins:[en, ua],
  data() {
    return {
      id: null,
      categoryId: null,
      code:null,
      name: null,
      description: null,
      imageURL: null,
      price: null,
      minSales: null,
      maxSales: null
    }
  },
  methods: {
    translate(prop){
      return this[this.language]["addProduct"][prop];
    },
    addProduct() {
      const newProduct = {
        categoryId: this.categoryId,
        code:this.code,
        description: this.description,
        name: this.name,
        imageURL: this.imageURL,
        price: this.price,
        minSales: this.minSales,
        maxSales: this.maxSales
      };

      axios.post(this.baseURL+"product/add", newProduct)
          .then((res) => {
            if(res.data.success){
              this.$emit("fetchData");
              this.$router.push({name: 'AdminProduct'});
              swal({
                text: this.translate('addedProduct'),
                icon: "success"
              })
            }
            else{
              swal({
                text: res.data.message,
                icon: "error",
              });
            }
          }).catch((err)=> {
        console.log("err", err);
      })
      this.$emit("fetchData");

    }
  }
}
</script>
