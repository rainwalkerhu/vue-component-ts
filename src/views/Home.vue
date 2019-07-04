<template>
  <div class="home">
    <h1 style="color: rgb(0, 127, 255)">Vue.js 组件精讲</h1>
    <el-row :gutter="16">
      <el-col :span="12" :offset="6">
        <el-table :data="tableData">
          <el-table-column prop="title" label="课程名称"></el-table-column>
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick(row) {
      this.$router.push({
        name: row.name
      });
    }
  },

  data() {
    return {
      tableData: [
        {
          date: "2019-07-04",
          title: "具有校验功能的表单组件",
          name: "form"
        }
      ]
    };
  }
};
</script>
