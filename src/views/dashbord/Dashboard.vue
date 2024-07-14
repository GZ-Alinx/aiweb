<template>
    <el-container>
      <el-header>
        <h1>Dashboard</h1>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card>
              <h3>服务器数量</h3>
              <p>{{ serverCount }}</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <h3>服务数量</h3>
              <p>{{ serviceCount }}</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <h3>并发量</h3>
              <p>{{ concurrentUsers }}</p>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="12">
            <el-card>
              <h3>当前资源使用</h3>
              <el-row>
                <el-col :span="12">
                  <p>CPU 使用率: {{ resourceUsage.cpu }}%</p>
                  <el-progress :percentage="resourceUsage.cpu"></el-progress>
                </el-col>
                <el-col :span="12">
                  <p>内存使用率: {{ resourceUsage.memory }}%</p>
                  <el-progress :percentage="resourceUsage.memory"></el-progress>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <p>磁盘使用率: {{ resourceUsage.disk }}%</p>
                  <el-progress :percentage="resourceUsage.disk"></el-progress>
                </el-col>
                <el-col :span="12">
                  <p>网络使用率: {{ resourceUsage.network }}%</p>
                  <el-progress :percentage="resourceUsage.network"></el-progress>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <h3>服务请求量</h3>
              <el-chart type="line" :data="serviceRequestData"></el-chart>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import 'element-plus/dist/index.css';
  
  export default {
    name: 'Dashboard',
    setup() {
      const serverCount = ref(0);
      const serviceCount = ref(0);
      const concurrentUsers = ref(0);
      const resourceUsage = ref({
        cpu: 0,
        memory: 0,
        disk: 0,
        network: 0,
      });
      const serviceRequestData = ref({
        labels: [],
        datasets: [
          {
            label: '请求量',
            data: [],
          },
        ],
      });
  
      onMounted(() => {
        // 模拟从服务器获取数据
        setTimeout(() => {
          serverCount.value = 10;
          serviceCount.value = 25;
          concurrentUsers.value = 120;
          resourceUsage.value = {
            cpu: 45,
            memory: 70,
            disk: 80,
            network: 60,
          };
          serviceRequestData.value = {
            labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
            datasets: [
              {
                label: '请求量',
                data: [10, 20, 30, 40, 50, 60],
              },
            ],
          };
        }, 1000);
      });
  
      return {
        serverCount,
        serviceCount,
        concurrentUsers,
        resourceUsage,
        serviceRequestData,
      };
    },
  };
  </script>
  
  <style scoped>
  .el-container {
    padding: 20px;
  }
  
  .el-header {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
  }
  
  .el-card {
    text-align: center;
  }
  
  .el-progress {
    margin-top: 10px;
  }
  </style>