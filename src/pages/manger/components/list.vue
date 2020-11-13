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
      <el-table-column prop="id" label="用户编号" sortable width="120"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180"></el-table-column>

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
            <el-button type="primary" @click="updata(scope.row.uid)">修改</el-button>
            <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
import { reqUserDel } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { alertSuccess } from "../../../util/elart";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "user/list",
      roleList: "role/list",
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      requstUserList: "user/requstUserList",
    }),

    //   删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqUserDel({ uid: id }).then((res) => {
          this.requstUserList();
          alertSuccess(res.data.msg);
        });
      });
    },

    // 修改
    updata(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.requstUserList();
  },
};
</script>

<style lang='' scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
