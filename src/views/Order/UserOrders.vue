<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4>{{translate('title')}}</h4>
        <h5 style="font-weight: 300; color: #686868"> {{msg}} </h5>
      </div>
    </div>
    <div class="row">
      <!--      Display all the products in product box component-->
      <div v-for="order of orderItems" :key="order.id"
           class="col-md-6 col-xl-4 col-12 pt-3">
        <OrderBox :order="order" :language="language"></OrderBox>
      </div>
    </div>
  </div>
</template>

<script>
import OrderBox from "@/components/OrderBox";
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UserOrders",
  mixins:[en, ua],
  components: {OrderBox},
   data() {
    return {
      token: null,
      msg:'',
    };
  },
  props: ["baseURL", "orderItems", "language"],
  methods: {
    translate(prop){
      return this[this.language]["orders"][prop];
    },
    listUserOrders() {
      if(this.token==null){
        this.$router.push({ name: "home" });
      }

    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.listUserOrders();
/*    console.log(this.orderItems);
    if (this.orderItems==null){
      this.msg = "no orders found"
    }*/
    /*if (this.orderItems.length == 0) {
      this.msg = "no orders found"
    } else if (this.orderItems.length == 1) {
      this.msg = "Only 1 order found"
    } else {
      this.msg = this.orderItems.length + " orders found"
    }*/

  },
};

</script>

<style scoped>

</style>