<template>
  <div class="conatiner">
    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signin" class="flext-item border">
          <h2 class="pt-4">Sign-In</h2>
          <form @submit="signin" class="form-group pt-4 pl-4 pr-4">
            <div class="form-group">
              <label>Email </label>
              <input v-model="email" type="email" class="form-control" />
            </div>
            <div class="form-group">
              <label>Password </label>
              <input v-model="password" type="password" class="form-control" />
            </div>
            <button class="btn btn-primary mt-2 py-0">Continue</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"Signin",
  props: ["baseURL"],
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async signin(e) {
      e.preventDefault();
      const body = {
        email: this.email,
        password: this.password,
      };
      await axios
          .post(`${this.baseURL}user/signin`, body)
          .then((res) => {
/*            if(this.email=="ADMIN"){
              console.log(this.email.localeCompare("ADMIN"));
              console.log("true");

            }*/
            localStorage.setItem("token", res.data.token);
            console.log(res.data.role);
            if(res.data.role==="ADMIN"){
              console.log(2);
              localStorage.setItem("userRole", res.data.role);

            }


            swal({
              text: "Login successful",
              icon: "success",
            });
            this.$emit("fetchData");
            this.$router.push({name:"home"});
          })
          .catch((err) =>{
            swal({
              text: "Incorrect login or password",
              icon: "error",
            });
            console.log("err", err)
          });
    },
  },
};
</script>
<style scoped>
.btn-primary {
  background-color: #f0c14b;
  color: black;
}
@media screen and (min-width: 992px) {
  #signin {
    width: 40%;
  }
}
</style>