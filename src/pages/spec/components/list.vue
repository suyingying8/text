<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号" sortable width="120"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="120"></el-table-column>
      
      <el-table-column label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item.id">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
            <el-button type="info" v-else disabled>禁用</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="updata(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqSpecDel } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { alertSuccess } from "../../../util/elart";
export default {
  components: {},
  data() {
    return {};
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

    //   删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqSpecDel({ id: id }).then((res) => {
          this.requstSpecList();
          alertSuccess(res.data.msg)
        });
      });
    },

    // 修改
    updata(id){
        this.$emit('edit',id)
    }
  },
  mounted() {
    this.requstSpecList();
  },
};
</script>

<style lang='' scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
