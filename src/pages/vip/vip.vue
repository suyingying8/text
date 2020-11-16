<template>
  <div>
    <v-list @edit='edit($event)'></v-list>
    <v-amend :info='info' ref="one">></v-amend>
  </div>
</template>

<script>
import vList from './components/list'
import vAmend from './components/amend'
export default {
  components:{
    vList,
    vAmend
  },
  data() {
    return {
      info:{
        isShow:true,
      }
    };
  },
  computed:{},
  watch:{},
  methods:{
    // 修改
    edit(e){
      this.info.isShow = true
      this.$refs.one.look(e)
    }
  },
  mounted(){},
};
</script>

<style lang='' scoped>

</style>
