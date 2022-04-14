<template>
  <div class="layout-overlay">
    <AppTopBar />

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppTopBar from "./AppTopbar.vue";

export default {
  emits: ["change-theme"],
  data() {
    return {
      layoutMode: "static",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  methods: {
    isDesktop() {
      return window.innerWidth >= 992;
    },
  },
  computed: {
    logo() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo.svg";
    },
  },
  components: {
    AppTopBar: AppTopBar,
  },
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
