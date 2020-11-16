<template>
  <div>
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      reqClassifyList: "classify/reqClassifyList",
    }),
  },
  mounted() {
    this.reqClassifyList();
  },
  watch: {
    list: {
      handler() {
        var myChart = echarts.init(document.getElementById("main"));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "商品类别数量",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map(item=>item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "line",
              data: this.list.map(item=>item.children?item.children.length:0),
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true
    },
  },
};
</script>

<style lang='' scoped>
</style>
