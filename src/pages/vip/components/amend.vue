<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isShow">
      <el-form :model="form">
       
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="width">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hid">取 消</el-button>
        <el-button type="primary" @click="updata(form)">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqVipOne,
  reqVipEdit,
} from "../../../util/request";
import { alertSuccess } from "../../../util/elart";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        nickname:'',
        phone:'',
        password:'',
        status:1
      },
      width: "140px",
    };
  },
  computed: {
    ...mapGetters({
      list: "vip/list"
    }),
  },
  watch: {},
  methods: {
   

    ...mapActions({
      reqVipList: "vip/reqVipList",
    }),


    // 隐藏
    hid() {
      this.info.isShow = false;
    },

    // 获取一条数据
    look(id) {
      reqVipOne({ uid: id }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        // 设置修改时所需要的id
        this.form.id = id;
      });
    },

    // 更改
    updata(form) {
      reqVipEdit(form).then((res) => {
        this.hid();
        this.reqVipList();
      });
    },

  },
  mounted() {
    this.reqVipList();
  },
};
</script>

<style lang='' scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #ccc;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
