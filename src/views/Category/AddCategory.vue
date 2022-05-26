<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Add Category</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="categoryName" required/>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="description" pattern=".{3,240}"/>
          </div>
          <div class="form-group">
            <label>Image</label>
            <input type="text" class="form-control" v-model="imageUrl" pattern=".{20,240}" />
          </div>
          <button type="button" class="btn btn-primary" @click="addCategory()">
            Submit
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
export default {
  props: ["baseURL"],
  data() {
    return {
      categoryName: "",
      description: "",
      imageUrl: "",
    };
  },
  methods: {
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
                text: "Category added successfully",
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

     /* axios({
        method: "post",
        url: `${this.baseURL}/category/create`,
        data: JSON.stringify(newCategory),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if(res.data.success){
            this.$emit("fetchData");
            this.$router.push({name: 'Category'});
            sweetalert({
              text: "Category added successfully",
              icon: "success",
            });
          }
          else{
            swal({
              text: res.data.message,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });*/
    },
  },
};
</script>
<style scoped></style>
