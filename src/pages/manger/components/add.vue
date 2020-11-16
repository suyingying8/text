<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="updata(form)" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqUserAdd, reqUserOne, reqUserEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
      width: "140px",
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
      page:'user/page',
      total:'user/total'
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      requstUserList: "user/requstUserList",
      reqRoleList: "role/reqRoleList",
      requstUserCount:'user/requstUserCount',
      userPage:'user/userPage'
    }),

    // 隐藏
    hid() {
      this.info.isShow = false;
      this.empty();
    },

    // 清空
    empty() {
      this.form = {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      };
    },

    // 添加
    add() {
      reqUserAdd(this.form).then((res) => {
        this.empty();
        this.hid();
        this.requstUserList();
        this.requstUserCount()
      });
    },

    // 获取一条数据
    look(id) {
      reqUserOne({ uid: id }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        // 设置修改时所需要的id
        this.form.id = id;
        this.form.password =''
      });
    },

    // 更改
    updata(form) {
      reqUserEdit(form).then((res) => {
        this.hid();
        this.requstUserList();
        this.empty();
      });
    },
  },
  mounted() {
    this.requstUserList();
    this.reqRoleList();
    this.requstUserCount(this.page+1)
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
