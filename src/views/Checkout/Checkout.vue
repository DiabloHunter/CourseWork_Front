<template>
  <div class="div_class">
    <h3>You will be redirected to payment page</h3>
    <div class="alert alert-primary">
      While making payment use card number 4242 4242 4242 4242 and enter random
      date and cvv (3 digit)
    </div>

    <button class="btn btn-primary" @click="goToCheckout">Make Payment</button>
  </div>
</template>

<script>
import axios from 'axios';
import swal from "sweetalert";
export default {
  data() {
    return {
      stripeAPIToken: 'pk_test_51KpYLzAvBsO8ov2CuczSaSRKNddiBeB8dRZXrqL6PgDyKu7D9y5jEuZ7zf4AjpvLtUeV8e6fAAvhz6YkfDW1e2Qi00uLKyVNME',
      stripe: '',
      token: null,
      checkoutBodyArray: [],
      listOfOrderGoods: [],
      orderItem: null,
    };
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Checkout',
  props: ['baseURL'],
  methods: {
    getAllItems() {
      axios
          .get(`${this.baseURL}cart/?token=${this.token}`)
          .then((response) => {
            if (response.status == 200) {
              let products = response.data;
              for (let i = 0; i < products.cartItems.length; i++) {
                this.checkoutBodyArray.push({
                  price: products.cartItems[i].product.price,
                  quantity: products.cartItems[i].quantity,
                  productName: products.cartItems[i].product.name,
                  productId: products.cartItems[i].product.id,
                });
              }
              for (let i = 0; i < products.cartItems.length; i++) {
                this.listOfOrderGoods.push({
                  id: products.cartItems[i].product.id,
                  name: products.cartItems[i].product.name,
                  imageURL: products.cartItems[i].product.imageURL,
                  price: products.cartItems[i].product.price,
                  description: products.cartItems[i].description,
                  quantity: products.cartItems[i].quantity,

                });
              }
              const item = {
                id: null,
                price: products.totalCost,
                products: this.listOfOrderGoods,
                userId: products.userId,
                createdDate:null,
              };
              this.orderItem = item;
            }
          })
          .catch((err) => console.log(err));
    },
    goToCheckout() {
      console.log('checkoutBodyArray', this.checkoutBodyArray);
      console.log(this.orderItem);

      axios
          .post(`${this.baseURL}order/add?token=${this.token}`, this.orderItem)
          .catch((err) => {
            swal({
              text: "Error",
              icon: "error",
            });
            console.log("err", err)
          });

      this.$emit("resetCartCountAfterPayment");

      axios
          .post(
              `${this.baseURL}order/create-checkout-session`,
              this.checkoutBodyArray
          )
          .then((response) => {
            localStorage.setItem('sessionId', response.data.sessionId);
            console.log('session', response.data);
            this.stripe.redirectToCheckout({
              sessionId: response.data.sessionId,
            });
          })
          .catch((err) => console.log(err));

    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.stripe = window.Stripe(this.stripeAPIToken);
    this.getAllItems();

  },
};
</script>
<style scoped>
.alert {
  width: 50%;
}
.div_class {
  margin-top: 5%;
  margin-left: 30%;
}
.checkout_button {
  background-color: #5d3dec;
  margin: 10px;
}
</style>