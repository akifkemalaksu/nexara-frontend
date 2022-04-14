<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>NEXARA</span>
    </router-link>

    <Button
      label="Siparişler"
      class="p-button-secondary p-button-text mr-2 mb-2"
    />

    <Button
      label="Sipariş Oluştur"
      class="p-button-secondary p-button-text mr-2 mb-2"
      @click="$router.push('create-order')"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    topbarImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo-dark.svg";
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>