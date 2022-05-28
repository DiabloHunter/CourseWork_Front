<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <!--      display image-->
      <div class="col-md-4 col-12">
        <img :src="product.imageURL" class="img-fluid">
      </div>
      <!--      display product details-->
      <div class="col-md-6 col-12 pt-3 pt-md-0">
        <h4>{{product.name}}</h4>
        <h6 class="catgory font-italic">{{category.categoryName}}</h6>
        <h6 class="font-weight-bold">{{product.price}} $</h6>
        <p>
          {{product.description}}
        </p>
        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-3 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text">{{translate('quantity')}}</span>
            </div>
            <input type="number" class="form-control" v-model="quantity" />
          </div>

          <div class="input-group col-md-3 col-4 p-0">
            <button class="btn" id="add-to-cart-button" @click="addToCart">
              {{translate('addToCart')}}
            </button>
          </div>
        </div>
        <div class="features pt-3">
          <h5><strong>Features</strong></h5>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Officia quas, officiis eius magni error magnam voluptatem</li>
            <li>nesciunt quod! Earum voluptatibus quaerat dolorem doloribus</li>
            <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
            <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
          </ul>
        </div>
        <button
            id="wishlist-button"
            class="btn mr-3 p-1 py-0"
            @click="addToWishlist()"
        >
          {{ wishListString }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  name: "ShowDetails",
  data(){
    return {
      product:{},
      category:{},
      quantity: 1,
      wishListString: "Add to wishlist",
      goodAddedToWishList:0,
      wishlist: null
    }
  },
  mixins:[en, ua],
  props: ["baseURL", "products", "categories", "language"],
  methods:{
    translate(prop){
      if(this.language=="ua"){
        if(this.goodAddedToWishList==0){
          this.wishListString = "Додати до кошику";
        }
        else{
          this.wishListString = "Додано до кошику";
        }
      }
      else{
        if(this.goodAddedToWishList==0){
          this.wishListString = "Add to Wishlist";
        }
        else{
          this.wishListString = "Added to Wishlist";
        }
      }
      return this[this.language]["productDetails"][prop];
    },
    addToWishlist() {
      if (!this.token) {
        swal({
          text: this.translate('pleaseLoginToAddToWishlist'),
          icon: "error",
        });
        return;
      }
      // add item to wishlist
      if(this.wishlist!=null && this.wishlist.find((product)=>product.id == this.id)!=null){
        axios
            .delete(`${this.baseURL}wishlist/delete/${this.id}?token=${this.token}`)
            .then((res) => {
              let index = this.wishlist.indexOf((product)=>product.id == this.product.id);
              this.wishlist.splice(index);
              if (res.status === 200) {
                this.wishListString = this.translate('wishlistAdd');
                this.goodAddedToWishList = 0;
                swal({
                  text: this.translate('deletedFromWishlist'),
                  icon: "success",
                });
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
      }
      else{
        axios
            .post(`${this.baseURL}wishlist/add?token=${this.token}`, {
              id: this.product.id,
            })
            .then((res) => {
              this.wishlist.push(this.product);
              if (res.status === 201) {
                this.wishListString = this.translate('wishlistAdded');
                this.goodAddedToWishList = 1;
                swal({
                  text: this.translate('addedToWishlist'),
                  icon: "success",
                });
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
      }
    },
    addToCart() {
      if (!this.token) {
        // user is not logged in
        // show some error
        swal({
          text: this.translate('pleaseLoginToAddToCart'),
          icon: "error",
        });
        return;
      }
      // add to cart
      axios
          .post(`${this.baseURL}cart/add?token=${this.token}`, {
            productId: this.id,
            quantity: this.quantity,
          })
          .then((res) => {
            if (res.status == 201) {
              swal({
                text: this.translate('addedToCart'),
                icon: "success",
              });
              this.$emit("fetchData");
            }
          })
          .catch((err) => console.log("err", err));
    },
    fetchWishList() {
      axios
          .get(`${this.baseURL}wishlist/?token=${this.token}`)
          .then((data) => {
            this.wishlist = data.data;
            let inWishList;
            if(this.wishlist!=null){
              inWishList = this.wishlist.find((product)=>product.id == this.id);
            }
            if(inWishList!=null){
              this.goodAddedToWishList = 1;
              this.wishListString = this.translate('wishlistAdded');
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.token = localStorage.getItem("token");
    this.fetchWishList();

    this.product = this.products.find((product)=>product.id == this.id);
    this.category = this.categories.find((category)=>category.id == this.product.categoryId);

  }
}
</script>

<style>
.category {
  font-weight: 400;
}
#wishlist-button {
  background-color: #b9b9b9;
}
#add-to-cart-button {
  background-color: #febd69;
}
</style>