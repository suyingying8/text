<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加数据 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <el-upload class="avatar-uploader" action="#" :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import {
  reqClassifyAdd,
  reqClassifyOne,
  reqClassifyEdit,
} from "../../../util/request";
import { alertSuccess } from "../../../util/elart";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      width: "140px",
      imageUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  watch: {},
  methods: {
    //   添加图片
    changeImg(file) {
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.img = file.raw;
    },

    ...mapActions({
      reqClassifyList: "classify/reqClassifyList",
    }),

    // 隐藏
    hid() {
      this.info.isShow = false;
      this.empty();
    },

    // 清空
    empty() {
      this.form.pid = 0;
      this.form.catename = "";
      this.form.img = null;
      this.form.status = 1;
    },

    // 添加
    add() {
        
      reqClassifyAdd(this.form).then((res) => {
        this.empty();  
        this.hid();
        this.reqClassifyList();
        
      });
    },

    // 获取一条数据
    look(id) {
      reqClassifyOne({ id: id }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.imageUrl = this.$preImg + res.data.list.img;
        // 设置修改时所需要的id
        this.form.id = id;
      });
    },

    // 更改
    updata(form) {
      reqClassifyEdit(form).then((res) => {
        this.hid();
        this.reqClassifyList();
        this.empty();
      });
    },
  },
  mounted() {
    this.reqClassifyList();
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
