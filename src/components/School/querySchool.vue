<template>
    <el-container>
        <h1 class="flex-center  flex_jufy_center">学校管理</h1>
        <el-header>
            <div style="width: 200px; margin: 0 10px;">
                <el-input placeholder="请输入学校ID" clearable prefix-icon="el-icon-search" v-model="inpSchools"></el-input>
            </div>
            <el-button type="primary" :disabled="inpSchools == '' ? true : false" @click="searchSchool()">搜索</el-button>
            <el-button type="primary" @click="QueryAllSchools()" v-loading.fullscreen.lock="fullscreenLoading">查询全部</el-button>
            <el-button type="primary" @click="addSchools()">添加学校</el-button>
        </el-header>

        <el-main>
            <el-table :data="tableData" height="455" stripe border>
                <el-table-column prop="index" label="序号" width="70">
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-time"></i> -->
                        <span style="margin-left: 10px;">{{ scope.$index+1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolId" label="ID" width="80">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px;">{{ scope.row.schoolId }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolName" label="名称" width="240">
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-time"></i> -->
                        <span style="margin-left: 10px;">{{ scope.row.schoolName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolProvince" label="地址" width="180"  show-overflow-tooltip>
                    <template slot-scope="scope">
                        <i class="el-icon-location-information"></i>
                        <span style="margin-left: 10px;">{{ scope.row.schoolProvince +scope.row.schoolCity +scope.row.schoolDistrict}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createdTime" label="注册时间" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px;">{{ scope.row.createdTime.substring(0,16) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <ConfirmDialog @confirm="confirm" :showMsg.sync="showMsg"  tit="系统提示" :ftit="'确定要删除？'+delateschool.schoolName" type="danger"></ConfirmDialog>
        <SubmitForm  @SubmitForm="SubmitForm" :showMsg.sync="showMsgForm"></SubmitForm>
		<modifyForm @modifyForm="modifyFormli" title="修改" :list="modifyschool" :showMsg.sync="showMsgModify"></modifyForm>
        <Pagination></Pagination>
    </el-container>

</template>

<script>
// 分页组件
import Pagination from '@/components/admin/common/Pagination.vue';
// 确认提示框组件
import ConfirmDialog from '../admin/common/ConfirmDialog.vue';//确认删除组件
import SubmitForm from '../admin/common/SubmitForm.vue';//添加学校
import modifyForm from '../admin/school/modifyForm.vue';//修改组件

export default {
    components: {
        Pagination,
        ConfirmDialog,
        SubmitForm,
		modifyForm,
    },
    data() {
        return {
            fullscreenLoading: false,
            inpSchools: '',
            // 显示提示框
            showMsg: false,
            showMsgForm: false,
			showMsgModify: false,
            tableData: [],
			delateschool:'',//确认删除数据
			modifyschool:{}//确认修改的数据
        };
    },
    computed: {},
    watch: {

    },
    created() {
        this.QueryAllSchools();
    },
    mounted() {},
    destroyed() {},
    methods: {
			// 查询所有学校
        QueryAllSchools() {
            // this.fullscreenLoading = true;
            this.$api.school.QueryAllSchools((res) => {
                console.log(res);
                this.tableData = res.status == 0 ? res.data : this.$message({ type: 'success',message: res.msg});;
                this.fullscreenLoading = false;
            });
            // setTimeout(() => {
            //     this.fullscreenLoading = false;
            // }, 5000);
        },
		// 打开添加学校
        addSchools() {
            this.showMsgForm = true;
        },
		// 删除学校
		delateschooll(schoolId){
			const zhu = {'schoolId':schoolId};
			console.log(zhu);
			// this.fullscreenLoading = true;
			this.$api.school.delateschool(zhu,(res) => {
			    console.log(res);
			    // this.tableData = res.data;
			    this.fullscreenLoading = false;
			    this.$message({ type: 'success',message: '删除成功!'});
				setTimeout(() => {
				    this.QueryAllSchools();
				}, 1000);
			});
		},
        handleEdit(index, row) {
            // this.$refs.dialog.visible = true;
            this.showMsgModify = true;
			this.modifyschool = row;
            // 显示确定编辑的弹窗
            console.log(index);
            console.log(row);
        },
        handleDelete(index, row) {
            // this.$refs.dialog.visible = true;
            this.showMsg = true;
			this.delateschool = row;
            // 提示是否确认删除
            console.log(index);
            console.log(row);
        },
		// 搜索按钮
		searchSchool(){
			// this.fullscreenLoading = true;
			if (this.inpSchools !='') {
				this.$api.school.getschool({schoolid:this.inpSchools},(res) => {
				    console.log(res);
				    this.tableData = res.status==0 ? [res.data] : this.$message.error(res.msg);;
				    this.fullscreenLoading = false;
				    
					// setTimeout(() => {
					//     this.QueryAllSchools();
					// }, 1000);
				});
			} else{
				this.fullscreenLoading = false;
			}
		},
        /**
			 *@description: 点击确定执行的方法
			 */
        confirm() {
            // this.$refs.dialog.visible = false;
			this.delateschooll(this.delateschool.schoolId);
            console.log('执行确认方法');
        },
		//添加学校成功回调函刷新
        SubmitForm() {
			setTimeout(() => {
			    this.QueryAllSchools();
			}, 2000);
        },
		// 执行确定修改
		modifyFormli() {
			setTimeout(() => {
			    this.QueryAllSchools();
			}, 2000);
		},
    },
};
</script>
<style lang='scss' scoped>
    @import url('../user/userCommo.css');

    /* 引入公共css类 */

    .el-container {
        height: 700px;
        padding: 10px 0;
        border: 1px solid #eee;
    }

    .el-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #333;
        background-color: #b3c0d1;

        /* font-size: 12px; */
        line-height: 60px;
    }

    .el-table {
        border: #eee 1px solid;
    }

    .el-aside {
        color: #333;
    }
</style>
