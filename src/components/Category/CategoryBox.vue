<template>
  <div class="card w-100 h-100" style="margin-top: 10px">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="category.imageUrl"
        alt="Card image cap"
      />
    </div>
    <div class="card-body">
      <router-link :to="{name: 'ListProducts', params: {id: category.id}}">
        <h5 class="card-title">{{ category.categoryName }}</h5>
      </router-link>

      <p class="card-text">
        {{ category.description }}
      </p>
      <router-link v-if="userRole" :to="{name:'EditCategory', params:{id:category.id}}"
                   v-show="$route.name=='Category'">
        <button class="btn btn-primary">{{translate('edit')}}</button>
      </router-link>
    </div>
  </div>
</template>
<script>
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";

export default {
  name: "CategoryBox",
  mixins:[en, ua],
  props: ["category", "userRole", "language"],
  methods: {
    translate(prop){
      return this[this.language]["categoryBox"][prop];
    },
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>

