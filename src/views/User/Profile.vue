<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-3">
        <!-- display logo -->
      </div>
    </div>

    <!-- header -->

    <div class="row">
      <div class="col-12 justify-content-center d-flex pt-3">
        <div id="signup" class="flex-item border">
          <h2 class="pt-4 pl-4">{{translate('title')}}</h2>
          <form @submit="signup" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label>Email</label>
              <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  required
              />
            </div>
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label>{{translate('firstName')}}</label>
                  <input
                      type="text"
                      v-model="firstName"
                      class="form-control"
                      required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>{{translate('lastName')}}</label>
                  <input
                      type="text"
                      v-model="lastName"
                      class="form-control"
                      required
                  />
                </div>
              </div>
            </div>

            <!-- password -->
            <div class="form-group">
              <label>{{translate('password')}}</label>
              <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  required
              />
            </div>

            <!-- confirm password -->
            <div class="form-group">
              <label>{{translate('confirmPassword')}}</label>
              <input
                  type="password"
                  v-model="confirmPassword"
                  class="form-control"
                  required
              />
            </div>
            <div style="margin-bottom: 10px">
              <button class="btn btn-primary" type="button" @click="editUser()">{{translate('update')}}</button>
              <button class="btn btn-danger" type="button" style="float:right;">{{translate('delete')}}</button>
            </div>

          </form>
        </div>
      </div>
    </div>

    <!-- form -->
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
import en from "@/assets/i18n/en";
import ua from "@/assets/i18n/ua";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  mixins:[en, ua],
  props: ["baseURL", "token", "language"],
  data() {
    return {
      userInfo:null,
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
    translate(prop){
      return this[this.language]["profile"][prop];
    },
    async editUser(){
      if (this.password === this.confirmPassword) {
        const user = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
        };
        await axios.post(`${this.baseURL}user/update/?token=${this.token}`, user)
            .then(()=>{
              this.$emit("fetchData");
              this.$router.push({name:'Profile'})
              swal({
                text:this.translate('updatedProfile'),
                icon: "success"
              })
            }).catch(err=>console.log('err', err))
      } else {
        // show some error
        swal({
          text: this.translate('passwordsDontMatch'),
          icon: "error",
        });
      }
    },
    async getUserInfo(){
      await axios.get(this.baseURL + "user/?token=" + this.token)
          .then(res=> {
            this.email = res.data.email;
            this.firstName = res.data.firstName;
            this.lastName = res.data.lastName;})
          .catch((err) => console.log('err', err));
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>
<style scoped>
@media screen and (min-width: 992px) {
  #signup {
    width: 40%;
  }
}
</style>