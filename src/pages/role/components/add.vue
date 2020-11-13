<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleAdd,reqRoleList,reqRoleOne,reqRoleEdit} from "../../../util/request";
import {mapGetters,mapActions} from 'vuex'
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      width: "120px",
    };
  },
  computed: {
    ...mapGetters({
      list:'menu/list'
    })
  },
  watch: {},
  methods: {

    ...mapActions({
      reqMenuList:'menu/reqMenuList',
      reqRoleList:'role/reqRoleList',
    }),
    // 清空
    empty() {
      this.form.rolename = "";
      this.form.menus = [];
      this.form.status = 1;
    },
    // 关闭弹窗
    hid() {
      this.info.isShow = false
    },
    // 添加数据到数据库
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        this.hid()
        this.reqRoleList()
      });
    },

    // 获取一条数据
    look(id){
      reqRoleOne({id:id}).then((res)=>{
        console.log(res);
        this.form=res.data.list
       this.form.menus =  this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
       this.form.id = id
      })

    },

    // 点击修改
    updata(form){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then(res=>{
         this.hid()
         this.reqRoleList()
      })
    }
  },
  mounted() {
    this.reqMenuList()
  },
};
</script>

<style lang='' scoped>
</style>
