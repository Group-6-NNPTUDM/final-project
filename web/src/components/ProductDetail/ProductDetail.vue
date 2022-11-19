<template>
  <div class="card-group">
    <div class="card" v-for="item in data" v-bind:key="item.index">
      <img class="card-img-top" v-bind:src="item.img" alt="Card image cap">
      <div class="card-body">
        <h6 class="card-title">{{item.title}}</h6>
        <p class="card-text"><small class="text-muted">{{item.price}}</small></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data : []
  },
  name: 'ProductDetail',
}

</script>

<style>
</style>
