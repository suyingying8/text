<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened='creatText'>
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeCate">
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加数据 -->
            <el-option
              v-for="item in classifyList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加数据 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <el-upload class="avatar-uploader" action="#" :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" placeholder="请选择" @change="changeSpec">
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加数据 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加数据 -->
            <el-option v-for="item in secondSpec" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" :label-width="width">
          <!-- <textarea name id cols="30" rows="10" v-model="form.description"></textarea> -->
          <div id="div1" v-if="info.isShow"></div>
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
import { reqGoodAdd, reqGoodOne, reqGoodEdit } from "../../../util/request";
import { alertSuccess } from "../../../util/elart";

import { mapGetters, mapActions } from "vuex";

import E from 'wangeditor'
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      // 二级分类商品
      secondCate: [],
      // 二级规格属性
      secondSpec: [],
      form: {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      width: "110px",
      imageUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      // list: "good/list",
      classifyList: "classify/list",
      specList: "spec/list",
      page: "good/page",
      total: "good/total",
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
      requstGoodList: "good/requstGoodList",
      reqClassifyList: "classify/reqClassifyList",
      requstSpecList: "spec/requstSpecList",
      requstGoodCount: "good/requstGoodCount",
      goodPage: "good/goodPage",
    }),

    // 通过一级分类获取二级分类数据
    changeCate() {
      this.secondCate = this.classifyList.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },

    // 二级商品规格数据
    changeSpec() {
      this.secondSpec = this.specList.find((item) => {
        return item.id == this.form.specsid;
      }).attrs;
    },

    // 创建富文本
    creatText(){
      this.editor = new E('#div1')
      this.editor.create()
      this.editor.txt.html(this.form.description)
    },


    // 隐藏
    hid() {
      this.info.isShow = false;
      this.empty();
    },

    // 清空
    empty() {
      this.form = {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },

    // 添加
    add() {
      this.form.description =this.editor.txt.html()
      reqGoodAdd(this.form).then((res) => {
        this.empty();
        this.hid();
        this.requstGoodList();
        this.requstGoodCount();
        this.imageUrl = "";
        confirm(res.data.msg);
      });
    },

    // 获取一条数据
    look(id) {
      reqGoodOne({ id: id }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.imageUrl = this.$preImg + res.data.list.img;
        // 设置修改时所需要的id
        this.form.id = id;
        // 获取规格属性
        this.form.specsattr=this.form.specsattr.split(',')
      });
    },

    // 更改
    updata(form) {
      this.form.description =this.editor.txt.html()
      reqGoodEdit(form).then((res) => {
        this.hid();
        this.requstGoodList();
        this.empty();
      });
    },
  },
  mounted() {
    if(this.classifyList.length==0){
      this.reqClassifyList();
    }
    this.requstGoodList();
    this.requstSpecList();
    this.requstGoodCount(this.page + 1);
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
