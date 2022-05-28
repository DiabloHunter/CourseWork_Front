<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">{{translate('title')}}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>{{translate('name')}}</label>
            <input type="text" class="form-control" v-model="categoryName" required/>
          </div>
          <div class="form-group">
            <label>{{translate('description')}}</label>
            <input type="text" class="form-control" v-model="description" pattern=".{3,240}"/>
          </div>
          <div class="form-group">
            <label>{{translate('image')}}</label>
            <input type="text" class="form-control" v-model="imageUrl" pattern=".{20,240}" />
          </div>
          <button type="button" class="btn btn-primary" @click="addCategory()">
            {{translate('submit')}}
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
import axios from 'axios'
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  props: ["baseURL", "language"],
  mixins:[en, ua],
  data() {
    return {
      categoryName: "",
      description: "",
      imageUrl: "",
    };
  },
  methods: {
    translate(prop){
      return this[this.language]["addCategory"][prop];
    },
    addCategory() {
      const newCategory = {
        categoryName: this.categoryName,
        description: this.description,
        imageUrl: this.imageUrl,
      };


      axios.post(this.baseURL+"category/create", newCategory)
          .then((res) => {
            if(res.data.success){
              this.$emit("fetchData");
              this.$router.push({name: 'Category'});
              swal({
                text: this.translate('addedCategory'),
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
    },
  },
};
</script>
<style scoped></style>
