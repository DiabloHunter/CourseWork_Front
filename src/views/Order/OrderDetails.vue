<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">
          Products in order
        </h3>
      </div>
    </div>

    <!-- loop over the cart items and display -->

<!--
    <h1>{{orderItems.products[0].description}}</h1>
-->

    <div
        v-for="productItem in products"
        :key="productItem.id"
        class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <img
            :src="productItem.imageURL"
            alt=""
            class="w-100 card-image-top embed-responsive-item"
            style="object-fit: cover"
        />
      </div>

      <!-- display product name, quantity -->
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            <router-link
                :to="{ name: 'ShowDetails', params: { id: productItem.id } }"
            >
              {{ productItem.name }}
            </router-link>
          </h6>

          <p class="mb-0 font-weight-bold" id="item-price">
            $ {{ productItem.price }} per unit
          </p>
          <p class="mb-0" style="float:left">
            Quantity:{{ productItem.quantity }}
          </p>
        </div>
        <p class="mb-0" style="float:right">
          Total:
          <span class="font-weight-bold">
            $ {{ productItem.price * productItem.quantity }}
          </span>
        </p>
        <br />
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>

    <!-- display the price -->
<!--    <div class="total-cost pt-2 text-right">
      <h5>Total : ${{ orderItems.totalCost }}</h5>
    </div>-->
  </div>
</template>
<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"OrderDetails",
  data() {
    return {
      id:null,
      token: null,
      products: null,
    };
  },
  props: ["baseURL", "orderItems"],
  methods:{
    async getOrder(){
      await axios
          .get(`${this.baseURL}order/getOrder/${this.id}?token=${this.token}`)
          .then((res) => {
            const result = res.data;
            this.products = result.products;
            console.log(this.products);
          })
          .catch((err) => console.log("err", err));
    }

  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.id = this.$route.params.id;
    this.getOrder();

  }
};
</script>
<style scoped>
h4,
h5 {
  color: #484848;
}
</style>