<template>
	<el-container>
		<h1 class="flex-center  flex_jufy_center">设备管理</h1>
		<el-header>
			<!-- <div style="width: 200px; margin: 0 10px;">
                <el-input placeholder="请输入学校ID" :disabled="schoolsClass == '' ? true : false" clearable prefix-icon="el-icon-search" v-model="inpSchools"></el-input>
            </div>
			<el-button type="primary" :disabled="schoolsClass == '' ? true : false" @click="searchSchool()">搜索</el-button> -->
			<el-select v-model="schoolsClass" clearable placeholder="请选择学校">
				<el-option v-for="item in tableData" :key="item.schoolId" :label="item.schoolName" :value="item.schoolId">
				</el-option>
			</el-select>
			<el-button type="primary" @click="getAllClass()" :disabled="schoolsClass == '' ? true : false"
			 v-loading.fullscreen.lock="fullscreenLoading">查询学校设备</el-button>
			<el-button type="primary" :disabled="schoolsClass == '' ? true : false" @click="addSchools()">添加设备</el-button>
			<el-button type="primary" @click="getDeviceAll()">查询所有设备</el-button>
		</el-header>

		<el-main>
			<el-table :data="tableClass" height="455" stripe border>
				<el-table-column prop="index" label="序号" width="70">
					<template slot-scope="scope">
						<!-- <i class="el-icon-time"></i> -->
						<span style="margin-left: 10px;">{{ scope.$index+1 }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="schoolId" label="学校ID" width="80">
					<template slot-scope="scope">
						<i class="el-icon-school"></i>
						<span style="margin-left: 10px;">{{ scope.row.schoolId }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="deviceNumber" label="设备序列号" width="200">
					<template slot-scope="scope">
						<!-- <i class="el-icon-data-analysis"></i> -->
						<span style="margin-left: 10px;">{{ scope.row.deviceNumber }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="devicePassword" label="设备密码" width="150">
					<template slot-scope="scope">
						<!-- <i class="el-icon-school"></i> -->
						<span style="margin-left: 10px;">{{ scope.row.devicePassword }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="deviceIp" label="设备IP" width="150">
					<template slot-scope="scope">
						<!-- <i class="el-icon-time"></i> -->
						<span style="margin-left: 10px;">{{ scope.row.deviceIp }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="deviceRole" label="安放类型" width="100">
					<template slot-scope="scope">
						<!-- <i class="el-icon-time"></i> -->
						<span style="margin-left: 10px;" v-if="scope.row.deviceRole ==1">进口</span>
						<span style="margin-left: 10px;" v-if="scope.row.deviceRole ==2">出口</span>
					</template>
				</el-table-column>
				<el-table-column prop="createdTime" label="创建时间" width="180">
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
		<ConfirmDialog @confirm="confirm" :showMsg.sync="showMsg" tit="系统提示" :ftit="'确定要删除？'+delateschool.deviceNumber" type="danger"></ConfirmDialog>
		<condialogfrom @confirm="confirm2" :showMsg.sync="showMsgForm" tit="添加设备" :listObj="listobj" type="primary"></condialogfrom>
		<condialogfrom @confirm="confirm3" :showMsg.sync="showMsgModify" tit="修改设备" :listObj="listobj" type="primary"></condialogfrom>
		<!-- <SubmitForm  @SubmitForm="SubmitForm" :showMsg.sync="showMsgForm"></SubmitForm> -->
		<!-- <modifyForm @modifyForm="modifyFormli" title="修改" :list="modifyschool" :showMsg.sync="showMsgModify"></modifyForm> -->
		<!-- <Pagination></Pagination> -->
		<div class=" flex_row_reverse" style="padding: 0 20px;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum"
			 :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

	</el-container>

</template>

<script>
	// 分页组件
	// import Pagination from '../admin/common/Pagination.vue';
	// 确认提示框组件
	import ConfirmDialog from '../admin/common/ConfirmDialog.vue'; //确认删除组件
	import condialogfrom from '../admin/common/condialogfrom.vue'; //提示表单组件
	import SubmitForm from '../admin/common/SubmitForm.vue'; //添加学校
	import modifyForm from '../admin/school/modifyForm.vue'; //修改组件

	export default {
		components: {
			// Pagination,
			ConfirmDialog,
			SubmitForm,
			modifyForm,
			condialogfrom
		},
		data() {
			return {
				fullscreenLoading: false,
				inpSchools: '',
				schoolsClass: '',//已选择id
				listClass: {
					// deviceId: '00',
					deviceRole: '1',
					schoolId:'',
					deviceIp:'',
					devicePassword:'',
					deviceNumber:''//序列号
				},
				listobj: {},
				// currentPage3: 1,
				// 显示提示框
				showMsg: false,
				showMsgForm: false,
				showMsgModify: false,
				tableData: [], //所有学校数据
				tableClass: [], //所有设备数据
				delateschool: '', //确认删除数据
				modifyschool: {}, //确认修改的数据
				pageNum: 1, //第几页
				// pages: 0, //总页数
				pageSize: 10, //每页数
				total: 5, //数据总条数
			};
		},
		computed: {},
		watch: {

		},
		created() {
			this.QueryAllSchools();
			this.getDeviceAll(this.pageNum);
		},
		mounted() {},
		destroyed() {},
		methods: {
			// 查询所有学校
			QueryAllSchools() {
				// this.fullscreenLoading = true;
				this.$api.school.QueryAllSchools((res) => {
					console.log(res);
					this.tableData = res.status == 0 ? res.data : this.$message.success(res.msg);;
					this.fullscreenLoading = false;
				});
			},
			handleSizeChange(val) {
				// eslint-disable-next-line no-console
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				// eslint-disable-next-line no-console
				console.log(`当前页: ${val}`);
				this.getDeviceAll(val);
			},
			// 搜索班级
			getAllClass() {
				if (this.schoolsClass != '') {
					this.fullscreenLoading = true;
					this.$api.device.getDevice({
						SchoolId: this.schoolsClass
					}, (res) => {
						console.log(res);
						if (res.status == 0) {
							this.$message.success('查询成功！');
						}
						this.tableClass = res.status == 0 ? res.data : this.$message.error(res.msg);;
						this.fullscreenLoading = false;
						// this.menuLists = res.data.list;

					});
				} else {
					this.$message.error('请先选择班级');
				}
			},
			//查询所有设备
			getDeviceAll(pageNum) {
				console.log(pageNum);
				this.$api.device.getAll({pageNum: pageNum, //第几页
					pageSize: this.pageSize},(res) => {
					console.log(res);
					if (res.status == 0) {
						this.$message.success('查询成功！');
						this.total = res.data.total;
						this.pageSize = res.data.pageSize;
					}
					this.tableClass = res.status == 0 ? res.data.list : this.$message.error(res.msg);;
					this.fullscreenLoading = false;
				});
			},
			// 打开添加设备
			addSchools() {
				// this.listobj = {};
				this.listobj = this.listClass;
				this.listobj.schoolId = this.schoolsClass;
				this.showMsgForm = true;
				// console.log(this.listClass);
				console.log(this.listobj);
			},
			// 删除设备
			delateschooll(classId) {
				this.fullscreenLoading = true;
				this.$api.device.DelDevice({
					'deviceID': classId
				}, (res) => {
					console.log(res);
					// this.tableData = res.data;
					this.fullscreenLoading = false;
					this.$message.error('删除成功!');
					setTimeout(() => {
						this.getDeviceAll(1);
					}, 1000);
				});
			},
			handleEdit(index, row) {
				this.showMsgModify = true;
				this.listobj = row;
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
			searchSchool() {
				this.fullscreenLoading = true;
				if (this.inpSchools != '') {
					this.$api.school.getschool({
						schoolid: this.inpSchools
					}, (res) => {
						console.log(res);
						this.tableData = res.status == 0 ? [res.data] : this.$message.error(res.msg);;
						this.fullscreenLoading = false;
					});
				} else {
					this.$message.error('请输入内容');
					this.fullscreenLoading = false;
				}
			},
			/**
			 *@description: 点击确定执行的方法
			 */
			confirm() {
				// this.$refs.dialog.visible = false;
				this.delateschooll(this.delateschool.deviceId);
				console.log('执行确认方法');
			},
			//确定添加设备
			confirm2() {
				console.log('执行2确认方法');
				
				console.log(this.listobj);
				this.$api.device.Addevice(this.listobj, (res) => {
					console.log(res);
					if (res.status == 0) {
						this.getDeviceAll(1);
						this.$message.success('添加成功！')
					} else {
						this.$message.error(res.msg);
					}
				});
			},
			confirm3() {
				console.log('执行修改方法');
				console.log(this.listobj);
				this.$api.device.updateDevice(this.listobj, (res) => {
					console.log(res);
					if (res.status == 0) {
						this.getDeviceAll(1);
						this.$message.success('修改成功！')
					} else {
						this.$message.error(res.msg);
					}
				});
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

    .el-select {
        margin: 0 10px;
    }
</style>
