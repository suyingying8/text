<template>
  <div>
    <el-button type='primary' @click="willAdd">添加</el-button>
    <v-list @edit='edit($event)'></v-list>
    <v-add :info='info' ref="one"></v-add>
    
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  components:{
    vAdd,
    vList
  },
  data() {
    return {
      info:{
        isShow:false,
        isAdd:true,
        title:'商品规格添加'
      }
    };
  },
  computed:{},
  watch:{},
  methods:{
    willAdd(){
      this.info.isShow = true
      this.info.isAdd=true
      this.info.title='商品规格添加'
    },
    edit(e){
      this.info.isShow = true
      this.info.isAdd=false
      this.info.title='商品规格修改'
      this.$refs.one.look(e)

    }
  },
  mounted(){},
};
</script>

<style lang='' scoped>

</style>
