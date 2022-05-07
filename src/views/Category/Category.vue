<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Our Categories</h3>
        <router-link v-if="userEmail"  :to="{ name: 'AddCategory' }">
          <button class="btn" style="float:right">Add Category</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div v-for="category of categories" :key="category.id" class="col-xl-4 col-md-6 col-12 pt-3 d-flex">
        <CategoryBox :category="category"
                     :userEmail="userEmail"></CategoryBox>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryBox from '@/components/Category/CategoryBox.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"Category",
  props:["categories", "userEmail"],
  components: { CategoryBox },
  data() {
    return {
      baseURL: "http://localhost:8080",

    };
  },
  methods: {},
  mounted() {
    this.$emit("fetchData");
  }
};
</script>
<style scoped></style>
