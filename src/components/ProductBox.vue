<template>
  <div class="card w-100 h-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img
          class="card-img-top embed-responsive-item"
          :src="product.imageURL"
          alt="Card image cap"
      />
    </div>
    <div class="card-body">
      <router-link :to="{name:'ShowDetails', params:{id:product.id}}">
        <h5 class="card-title">{{ product.name }}</h5>
      </router-link>
      <p class="card-text" style="display: inline-block">
        {{ product.description.substring(0, 65) }}...
      </p>
      <p class="card-text" style="float: right">
        {{ product.price}}$
      </p>
      <br>
      <router-link :to="{name:'EditProduct', params:{id:product.id}}"
      v-if="userRole">
        <button class="btn btn-primary">{{translate('edit')}}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";

export default {
  name: "ProductBox",
  props: ["product", "userRole", "language"],
  mixins:[en, ua],
  data() {
    return {
      email: null,
    };
  },
  methods:{
    translate(prop){
      return this[this.language]["productBox"][prop];
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
a {
  text-decoration: none;
}
.card-title {
  color: #484848;
}
</style>