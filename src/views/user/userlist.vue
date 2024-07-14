<script setup name="userlist">
import UserPage from '@/components/userPage.vue';
import authHttp from '@/api/authHttp';
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useAuthStore } from '@/stores/auth';



const authStore = useAuthStore()


const tableData = ref([]);

// 定义部门ID与名称的映射关系
const departmentMapping = {
    1: '董事会',
    2: '产品开发部',
    3: '运营部',
    4: '销售部',
    5: '人事部',
    6: '财务部'
};

const getUserList = async () => {
    try {
        const response = await authHttp.getAll();
        tableData.value = response.data.map(user => {
            return {
                ...user,
                departmentName: departmentMapping[user.department] || '未知部门'
            };
        });
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
};

onMounted(() => {
    getUserList();
});

const handleEdit = (index, row) => {
    ElMessage({
        message: `编辑用户: ${row.username}`,
        type: 'info',
    });
    // 实现具体的编辑逻辑
    console.log('Edit user:', row);
};

const handleDelete = (index, row) => {
    if (row.uid === authStore.user.uid) {
        // console.log("UID: ", row.uid, authStore.user.uid)
        ElMessage({
            message: '无法删除当前登录用户',
            type: 'warning',
        });
        return;
    }
    ElMessageBox.confirm(
        `你确定要删除用户 ${row.username} 吗?`,
        '确认删除',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                await authHttp.DeleteUser(row.uid);
                tableData.value.splice(index, 1); // 从 tableData 中删除用户
                ElMessage({
                    message: '删除成功',
                    type: 'success',
                });
            } catch (error) {
                console.error('Failed to delete user:', error);
                ElMessage({
                    message: '删除失败',
                    type: 'error',
                });
            }
        })
        .catch(() => {
            ElMessage({
                message: '已取消删除',
                type: 'info',
            });
        });
};
</script>

<template>
    <UserPage content="用户列表"></UserPage>
    <el-table :data="tableData" class="el-table">
        <el-table-column label="序号" prop="uid" width="280" />
        <el-table-column label="用户名" prop="username" width="200" />
        <el-table-column label="邮箱" prop="email" width="220" />
        <el-table-column label="手机号" prop="telephone" width="220" />
        <el-table-column label="所属部门" prop="departmentName" width="180" />
        <el-table-column label="操作" width="180">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped>
.el-table {
    width: 100%;
    font-size: 0.9rem;
    margin: 30px;
}
</style>