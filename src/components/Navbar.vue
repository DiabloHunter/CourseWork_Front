<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- Navbar content -->
    <!--    Logo-->
    <router-link class="navbar-brand" :to="{ name: 'home' }">
      <h4>Easy&Go</h4>
<!--      <img id="logo" src="../assets/icon.png" />-->
    </router-link>
    <!--    Burger Button-->
    <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!--      Search Bar-->
      <!-- dropdown for browse -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <select name="lang" class="custom-select" v-model="lang" @change="changeLang()">
            <option value="en">English</option>
            <option value="ua">Український</option>
          </select>
        </li>
        <li class="nav-item dropdown">
          <a
              class="nav-link text-light dropdown-toggle"
              href="#"
              id="navbarBrowse"
              data-toggle="dropdown">
            {{translate('browse')}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarBrowse">
            <router-link class="dropdown-item" :to="{ name: 'home' }" style="color:black;">
              {{translate('home')}}
            </router-link>
            <router-link class="dropdown-item" :to="{ name: 'AdminProduct' }" style="color:black;">
              {{translate('products')}}
            </router-link>
            <router-link class="dropdown-item" :to="{ name: 'Category' }" style="color:black;">
              {{translate('categories')}}
            </router-link>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
              class="nav-link dropdown-toggle text-light"
              href="#"
              id="navbarAccount"
              data-toggle="dropdown"
          >
            {{translate('accounts')}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarAccount">
            <router-link
                v-if="token"
                class="dropdown-item"
                :to="{ name: 'Profile'}"
                style="color:black;">
              {{translate('profile')}}
            </router-link>
            <router-link
                v-if="token"
                class="dropdown-item"
                :to="{ name: 'WishList' }"
                style="color:black;">
              {{translate('wishlist')}}
            </router-link>
            <router-link
                v-if="token"
                class="dropdown-item"
                :to="{ name: 'UserOrders' }"
                style="color:black;">
              {{translate('orders')}}
            </router-link>
            <router-link
                v-if="!token"
                class="dropdown-item"
                :to="{ name: 'Signup' }"
                style="color:black;">
              {{translate('signUp')}}
            </router-link>
            <router-link
                v-if="!token"
                class="dropdown-item"
                :to="{ name: 'Signin' }"
                style="color:black;">
              {{translate('signIn')}}
            </router-link>
            <a class="dropdown-item" v-if="token" href="#" @click="signout">{{translate('signOut')}}
            </a>

          </div>
        </li>
        <li class="nav-item">
          <div id="cart" style="position:relative">
            <span id="nav-cart-count">{{ cartCount }}</span>
            <router-link class="text-light" :to="{ name: 'Cart' }">
              <i class="fa fa-shopping-cart" style="font-size:36px"></i>
            </router-link>
          </div>
        </li>
      </ul>
      <!-- dropdown for account -->
    </div>
  </nav>
</template>
<script>
import swal from "sweetalert";
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  mixins:[en, ua],
  props: ["cartCount", "token", "language"],
  data() {
    return {
      lang: "en",
    };
  },
  methods: {
    translate(prop){
      return this[this.language]["navbar"][prop];
    },
    changeLang(){
      this.$emit("changeLang", {
            lang: this.lang,
      })
    },
    signout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      swal({
        text: this.translate('loggedOut'),
        icon: "success",
      });
      this.$emit("resetCartCount");
      this.$router.push({ name: "home" });
    },
  },
  mounted() {
/*    this.token = localStorage.getItem("token");*/
  },
};
</script>
<style scoped>
#logo {
  width: 150px;
  margin-left: 20px;
  margin-right: 20px;
}
.nav-link {
  color: rgba(255, 255, 255);
}
#search-button-navbar {
  background-color: #febd69;
  border-color: #febd69;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
#nav-cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  font-size: 15px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  margin-left: 10px;
}
</style>