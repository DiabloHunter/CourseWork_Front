<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">{{translate('title')}}</h3>
        <router-link v-if="userRole"  :to="{ name: 'AddCategory' }">
          <button class="btn" style="float:right">{{translate('addCategory')}}</button>
        </router-link>

        <div style="">
          <select class="form-control" v-model="sort" style="width: 20%; display: inline-block; margin-right: 1%" >
            <option value="id" selected>{{translate('order')}}</option>
            <option value="name">{{translate('name')}}</option>
            <option value="description">{{translate('description')}}</option>
          </select>
          <input class="form-control" placeholder=Search style="width: 20%;display: inline-block;margin-right: 1%"  v-model="search" />
          <button type="button" class="btn btn-primary" style="display: inline-block; margin-bottom: 3px" @click="categorySortAndFilter()">{{translate('submit')}}</button>
        </div>

      </div>

    </div>
    <div class="row">
      <div v-for="category of filteredCategory" :key="category.id" class="col-xl-4 col-md-6 col-12 pt-3 d-flex">
        <CategoryBox :category="category"
                     :userRole="userRole"
                     :language="language"></CategoryBox>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryBox from '@/components/Category/CategoryBox.vue';
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"Category",
  mixins:[en, ua],
  props:["categories", "userRole", "language"],
  components: { CategoryBox },
  data() {
    return {
      baseURL: "http://localhost:8080/api",
      sort:null,
      search:null,
      thisCategory:null,
      filteredCategory:null,
    };
  },
  methods: {
    translate(prop){
      return this[this.language]["category"][prop];
    },
    categorySortAndFilter() {

      switch (this.sort){
        case "id":
          this.thisCategory.sort(function(a, b){return a.id - b.id});
          break;
        case "name":
          this.thisCategory.sort(function(a, b){return a.categoryName.localeCompare(b.categoryName);});
          break;
        case "description":
          this.thisCategory.sort(function(a, b){return a.description.length-b.description.length});
          break;
      }
      this.filteredCategory = this.thisCategory;

      /////////
      if(this.search!=null){
        this.filteredCategory = this.thisCategory.filter(x=>x.categoryName.toLowerCase().includes(this.search.toLowerCase()));
      }

      /////////


    },
  },
  mounted() {
    this.$emit("fetchData");
    this.thisCategory = this.categories;
    this.categorySortAndFilter();
  }
};
</script>
<style scoped></style>
