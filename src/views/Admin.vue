<template>
  <div class="container py-4">
    <router-link :to="{name:'Category'}">
      <button class="btn btn-primary btn-large">Admin Category</button>
    </router-link>
    <br />
    <router-link :to="{name:'AdminProduct'}">
      <button class="btn btn-primary btn-large">Admin Product</button>
    </router-link>
    <br />
    <router-link :to="{name:'Category'}">
      <button class="btn btn-primary btn-large">Admin Category</button>
    </router-link>
  </div>


</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Admin"
}
</script>

<style scoped>
  .btn{
    margin-bottom: 20px;
  }
</style>