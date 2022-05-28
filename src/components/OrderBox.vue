<template>

  <div class="card w-100 h-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img
          class="card-img-top embed-responsive-item"
          :src="order.products[0].imageURL"
          alt="Card image cap"
      />
    </div>
    <div class="card-body">
      <router-link :to="{name:'OrderDetails', params:{id:order.id}}">
        <h5 class="card-title text-center">{{ correctDate }}</h5>
      </router-link>
      <p class="card-text">
        {{ order.price}} $
      </p>
      <p class="card-text">
        {{ order.products.length}} {{ translate('goods') }}
      </p>

    </div>
  </div>
</template>
<script>
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";

export default {
  name: "OrderBox",
  props: ["order", "language"],
  mixins:[en, ua],
  data() {
    return {
      correctDate: "",
    };
  },
  methods:{
    translate(prop){
      return this[this.language]["orderBox"][prop];
    },
  },
  mounted() {
    this.correctDate = this.order.createdDate.split("T").join(" ").substring(0, 19);
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