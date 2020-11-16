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
      <el-table-column prop="id" label="商品编号" sortable width="110"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="110"></el-table-column>
      <el-table-column prop="price" label="商品价格" sortable width="110"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" sortable width="110"></el-table-column>
      
      <el-table-column prop="img" label="图片" sortable width="120">
        <template slot-scope="scope">
          <img :src="$preImg+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column prop="isnew" label="是否新品" sortable width="110">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
            <el-button type="info" v-else disabled>否</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="是否热卖" sortable width="110">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
            <el-button type="info" v-else disabled>否</el-button>
          </div>
        </template>
      </el-table-column>


      <el-table-column prop="status" label="状态" sortable width="100">
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

     <!-- 分页 -->
    <el-pagination :page-size='2' background layout="prev, pager, next" :total="total" :current-page='page' @current-change='pageChange'></el-pagination>
  </div>
</template>

<script>
import { reqGoodDel } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { alertSuccess } from "../../../util/elart";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "good/list",
      total:'good/total',//总数
      page:'good/page'
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      requstGoodList: "good/requstGoodList",
      requstGoodCount:'good/requstGoodCount',
      goodPage:'good/goodPage',
    }),

    // 页面切换
    pageChange(p){
        this.goodPage(p)
    },

    //   删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqGoodDel({ id: id }).then((res) => {
          this.requstGoodList();
          alertSuccess(res.data.msg)
          this.requstGoodCount()
          this.goodPage(1)
        });
      });
    },

    // 修改
    updata(id){
        this.$emit('edit',id)
    }
  },
  mounted() {
    this.requstGoodList();
    this.requstGoodCount();
    this.goodPage(1)
  },
};
</script>

<style lang='' scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
