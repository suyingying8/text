<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="width" v-for='(item,index) in arr' :key='index'>
          <el-row>
            <el-col :span="16">
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type='primary' @click="addArr" v-if='index==0'>新增规格</el-button>
              <el-button type='danger' @click='delArr(index)' v-else>删除</el-button>
            </el-col>
          </el-row>
          
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
import { reqSpecAdd, reqSpecOne, reqSpecEdit } from "../../../util/request";
import { alertSuccess } from "../../../util/elart";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        specsname: '',
        attrs: '',
        status:1,
      },
      width: "140px",
      arr:[
        {
          value:''
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      list: "spec/list",
    }),
  },
  watch: {},
  methods: {
   
    ...mapActions({
      requstSpecList: "spec/requstSpecList",
    }),

    // 新增属性
    addArr(){
      this.arr.push({
        value:''
      })
    },

    // 删除shuxing
    delArr(index){
      this.arr.splice(index,1)
    },

    // 隐藏
    hid() {
      this.info.isShow = false;
      this.empty();
    },

    // 清空
    empty() {
      this.form.attrs = '';
      this.form.specsname = "";
      this.form.status = 1;
    },

    // 添加
    add() {
      this.form.attrs = JSON.stringify(this.arr.map(item=>{
        return item.value
      }))
      reqSpecAdd(this.form).then((res) => {
        this.empty();
        this.hid();
        this.requstSpecList();
      });
    },

    // 获取一条数据
    look(id) {
      reqSpecOne({ id: id }).then((res) => {
        this.form = res.data.list[0]
        this.arr = JSON.parse(this.form.attrs).map(item=>{
         return {value:item}})
        // 设置修改时所需要的id
        this.form.id = id;
      });
    },

    // 更改
    updata(form) {
       this.form.attrs = JSON.stringify(this.arr.map(item=>{
        return item.value
      }))
      reqSpecEdit(form).then((res) => {
        this.hid();
        this.requstSpecList();
        this.empty();
      });
    },
  },
  mounted() {
    this.requstSpecList();
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
