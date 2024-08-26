<template>
  <div>
    <iframe :src="address" style="width: 100%; height: 100vh; border: none;"></iframe>
  </div>
</template>

<script>
export default {
  name: '/Game',
  props: {
    address: String
  }
};
</script>