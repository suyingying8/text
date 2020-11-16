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
      <el-table-column prop="uid" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180"></el-table-column>
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
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { reqVipList } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { alertSuccess } from "../../../util/elart";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "vip/list",
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      reqVipList: "vip/reqVipList",
    }),

    // 修改
    updata(id){
        this.$emit('edit',id)
    }
  },
  mounted() {
    this.reqVipList();
  },
};
</script>

<style lang='' scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
