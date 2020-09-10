<template>
  <div id="layout">
    <Lyaoutnav />
    <Lyaoutheader />
    <Lyaoutmain />
  </div>
</template>
<script>
import Lyaoutheader from "./Componets/Header";
import Lyaoutmain from "./Componets/Main";
import Lyaoutnav from "./Componets/Nav";

export default {
  name: "layout",
  components: { Lyaoutheader, Lyaoutmain, Lyaoutnav },
  setup() {}
};
</script>
<style lang="scss" scoped>
</style>