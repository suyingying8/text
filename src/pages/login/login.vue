<template>
  <div class="login">
    <div class="con">
      <h2>登录</h2>
      <div><input type="text" placeholder="请输入用户名"></div>
      <div><input type="text" placeholder="请输入密码"></div>
      <div><button @click="index">登录</button></div>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  data() {
    return {
    };
  },
  computed:{},
  watch:{},
  methods:{
    index(){
      this.$router.push('/index')
    }
  },
  mounted(){},
};
</script>

<style lang='' scoped>
.login{
  width: 100vm;
  height: 100vh;
  background:linear-gradient(to right,#553443,#303d60) ;
}
.con{
  width: 360px;
  height: 260px;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  overflow: hidden;
}
.con h2{
  margin: 20px 0px;
}
.con input{
  width: 260px;
  height: 30px;
  margin-bottom: 15px;
  text-indent: 1em;
}
.con button{
  width: 260px;
  height: 30px;
  border: none;
  background: skyblue;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
}
</style>
