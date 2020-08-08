<template>
	<el-container>
		<h1 class="flex-center  flex_jufy_center">学生管理</h1>
		<el-header>
			<el-select v-model="schoolsid" clearable placeholder="请选择学校" @change="getAllClass">
				<el-option v-for="item in tableData" :key="item.schoolId" :label="item.schoolName" :value="item.schoolId">
				</el-option>
			</el-select>
			<el-select v-model="nameform.classId" @change="getDeviceAll(pageNum)" clearable :disabled="schoolsid == '' ? true : false" placeholder="请选择班级">
				<el-option v-for="item in tableClass" :key="item.id" :label="item.className" :value="item.id">
				</el-option>
			</el-select>
			<el-button type="primary" @click="getDeviceAll(pageNum)" :disabled="schoolsid == '' || nameform.classId == '' ? true : false">查询班级所有学生信息</el-button>
			<el-button type="primary" :disabled="schoolsid == '' || nameform.classId == '' && coverImg == '' ? true : false" @click="showAddFrom=!showAddFrom">添加学生</el-button>
			<el-button type="danger" :disabled="schoolsid == '' || nameform.classId  == '' ? true : false" @click="Deletelist">删除本班所有学生</el-button>
		</el-header>

		<el-main>
			<div class=" " v-if="showAddFrom">
				<el-form class="flex_rows flex_wrap" style="align-items: flex-start;" :model="nameform" ref="ruleForm" label-position="left">
					<el-form-item label="学生姓名:" :label-width="formLabelWidth" prop="schoolProvince">
						<el-input v-model="nameform.userName" autocomplete="on" placeholder="请输入学生姓名"></el-input>
					</el-form-item>
					<el-form-item label="卡号:" :label-width="formLabelWidth" prop="schoolProvince">
						<el-input v-model="nameform.cardNo" autocomplete="on" placeholder="请输入卡号(非必填)"></el-input>
					</el-form-item>
					<div class=" test">
						上传图片
						<input class="" type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png"
						 @change="changeCoverImg($event)">
					</div>
					<el-button type="primary" @click="addstudent">确定</el-button>
					<img :src="coverImg" v-if="coverImg" style="max-width: 100px; max-height: 60px; border-radius: 5px; margin: 2px 20px;">
				</el-form>
			</div>

			<el-table :data="tableDevice" height="495" stripe border>
				<el-table-column v-for="(item ,index) in tableName" :key="index" :prop="item.key" :label="item.label" :width="item.width" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="操作" align="right">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			
		</el-main>
		<conModifyFrom :showMsg.sync="showMsgModify" tit="修改信息" :fromLabel="modifyFromlabel" :fromModel="modifyModel" @conModify="conModifylist"></conModifyFrom>
		<ConfirmDialog @confirm="confirm" :showMsg.sync="showMsg" tit="系统提示" :ftit="'确定要删除？'+delateschool.userName" type="danger"></ConfirmDialog>
		<ConfirmDialog @confirm="confirm2" :showMsg.sync="showMsglist" tit="删除提示" ftit="确定要删除本班所有学生?此操作将无法恢复数据" type="danger"></ConfirmDialog>
		<div class=" flex_row_reverse" style="padding: 0 20px;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum"
			 :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</el-container>
</template>

<script>
	// 确认提示框组件
	import ConfirmDialog from '../admin/common/ConfirmDialog.vue'; //确认删除组件
	import imgbase from '../admin/common/imgBase64.vue';
	import conModifyFrom from '../admin/common/conModifyFrom.vue';//新修改表单
	export default {
		components: {
			ConfirmDialog,
			imgbase,
			conModifyFrom
		},
		data() {
			return {
				formLabelWidth: "80px",
				fullscreenLoading: false,
				schoolsid: '', //已选择学校id
				coverImg: '', //已选择64位图片
				// 显示提示框
				showMsg: false,
				showMsgModify: false,
				showAddFrom: false,
				showMsglist:false,
				// end
				scholsDevice:[],//当前学校的所有设备
				tableData: [], //所有学校数据
				tableDevice: [], //所有班级学生数据
				tableName:[{//表格渲染数据
						label:'名字',
						key:'userName',
						width:'120'
					},
					{
						label:'学校ID',
						key:'schoolId',
						width:'70'
					},
					{
						label:'班级ID',
						key:'classId',
						width:'70'
					},
					{
						label:'学生ID',
						key:'id',
						width:'70'
					},
					{
						label:'创建时间',
						key:'createdTime',
						width:'160'
					}],
					modifyModel:{},//绑定修改参数
					modifyFromlabel:[//修改数据
						{
							label: '姓名：',
							key: 'userName',
							type: 'input'
						},
						{
							label: '学校ID：',
							key: 'schoolId',
							type: 'input'
						},
						{
							label: '班级ID：',
							key: 'classId',
							type: 'input'
						},
						{
							label: '学生ID：',
							key: 'id',
							type: 'input'
						},
						{
							label: '卡号：',
							key: 'cardNo',
							type: 'input'
						},
					],
				tableClass: [], //所有班级数据
				banjilist: '', //临时学生信息
				delateschool: '', //确认删除数据
				nameform: {
					schoolId: '',
					classId: '',
					userName: '',
					cardNo: ''
				},
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
			// this.getDeviceAll(this.pageNum);
		},
		mounted() {},
		destroyed() {},
		methods: {
			// 图片上传转base64位
			changeCoverImg: function(e) {
				var file = e.target.files[0]
				var reader = new FileReader()
				var that = this
				reader.readAsDataURL(file)
				reader.onload = function(e) {
					that.coverImg = this.result
					console.log(that.coverImg)
				}
			},
			// 查询所有学校
			QueryAllSchools() {
				// this.fullscreenLoading = true;
				this.$api.school.QueryAllSchools((res) => {
					console.log(res);
					this.tableData = res.status == 0 ? res.data : this.$message.error(res.msg);;
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
			//搜索班级
			getAllClass() {
				if(this.schoolsid == ''){return;}
				this.$api.school.getAllClass({
					SchoolId: this.schoolsid
				}, (res) => {
					console.log(res);
					if (res.status == 0) {this.tableClass = res.data;
					this.getAllDeviceck();
					}else{this.$message.error(res.msg);}
				});
			},
			// 添加学生
			addstudent() {
				if(this.nameform.classId==''){this.$message.error('请选择班级');return;}
				if(this.nameform.userName==''){this.$message.error('请填写姓名');return;}
				if(this.coverImg==''){this.$message.error('请选择照片');return;}
				this.nameform.schoolId = this.schoolsid;
				console.log(this.nameform)
				this.$api.student.register(this.nameform, (res) => {
					console.log(res);
					if (res.status == 0) {}
					this.banjilist = res.status == 0 ? res.data : this.$message.error(res.msg);;
					this.shebeilist();

				});
			},
			// 添加设备信息
			shebeilist() {
				if (this.banjilist.deviceList.length > 0) {
					for (let i = 0; i < this.banjilist.deviceList.length; i++) {
						let list = {
							deviceKey: this.banjilist.deviceList[i].deviceNumber,
							secret: this.banjilist.deviceList[i].devicePassword,
							id: this.banjilist.studentUsr.id,
							name: this.banjilist.studentUsr.userName,
							idcardNum: this.banjilist.studentUsr.cardNo,
						};
						console.log(list);
						this.$api.yun.personAdd(list, (res) => {
							console.log('循环' + i + '次');
							console.log(res);
							if (res.code != "000") {
								this.$message.error('第' + i + '设备序列号：' + list.deviceKey + '添加失败！');
							}
						});
					}
					this.$message.success('执行添加设备信息成功！');
						this.imgBase();
					
				} else {
					this.$message.error('添加失败！');
				}
			},
			// 注册设备base64图片
			imgBase(){
				if (this.banjilist.deviceList.length > 0) {
					for (let i = 0; i < this.banjilist.deviceList.length; i++) {
						let list = {
							deviceKey: this.banjilist.deviceList[i].deviceNumber,
							secret: this.banjilist.deviceList[i].devicePassword,
							personId: this.banjilist.studentUsr.id,
							faceId: this.banjilist.studentUsr.id,
							imgBase64: this.coverImg
						};
						console.log(list);
						this.$api.yun.faceAdd(list, (res) => {
							console.log('循环' + i + '次');
							console.log(res);
							if (res.code != "000") {
								this.$message.error('第' + i + '设备：' + list.deviceKey + '添加照片失败！');
							}
						});
					}
					this.$message.success('执行设备注册照片成功！');
					this.coverImg = '';
				} else {
					this.$message.error('添加失败！');
				}
			},
			// 根据学校ID查询所有设备
			getAllDeviceck() {
				if (this.schoolsid != '') {
					this.$api.device.getDevice({
						SchoolId: this.schoolsid
					}, (res) => {
						console.log(res);
						if (res.status == 0) {
							// this.$message.success('查询所有设备成功！');
							this.scholsDevice = res.data;
						}else{
							this.scholsDevice = [];
							this.$message.error(res.msg);
						}
					});
				} else {
					this.$message.error('请先选择学校');
					this.scholsDevice = [];
					
				}
			},
			//根据学校id 与班级查询学生信息
			getDeviceAll(pageNum) {
				if(this.nameform.classId == ''){
					return ;
				}
				this.$api.student.getStudentByclass({
					schoolId:this.schoolsid,
					ClassId: this.nameform.classId,
					pageNum: pageNum, //第几页
					pageSize: this.pageSize
				}, (res) => {
					console.log(res);
					if (res.status == 0) {
						this.total = res.data.total;
						this.pageSize = res.data.pageSize;
						this.tableDevice = res.data.list;
					}
					else{
						this.tableDevice = []; 
						this.$message.error(res.msg);
					}
					this.fullscreenLoading = false;
				});
			},
			// 删除信息
			delateschooll(item) {
				this.$api.student.deleteStudent({
					'SchoolId': item.schoolId,
					'StudentId': item.id,
				}, (res) => {
					console.log(res);
					
					if(res.status == 0 ){
						this.$message.success('删除成功!');
						this.banjilist = res.data;
						this.delshebeilist(item.id);
					}else{
						this.$message.error(res.msg);
					}
					setTimeout(() => {
						this.getDeviceAll(1);
					}, 1000);
				});
			},
			//批量删除人员信息
			batchDelshelist(){
				console.log('打印信息')
				console.log(this.scholsDevice);
				console.log(this.tableDevice);
				if (this.scholsDevice.length > 0) {
					 let idlist = '';
					 let hei = ',';
					for(let j = 0 ; j < this.tableDevice.length; j++){
						idlist = idlist+this.tableDevice[j].id+hei;
						console.log(idlist);
					}
					for (let i = 0; i < this.scholsDevice.length; i++) {
						let list = {
							deviceKey: this.scholsDevice[i].deviceNumber,
							secret: this.scholsDevice[i].devicePassword,
							personId: idlist,
						};
						console.log(list);
						this.$api.yun.persondel(list, (res) => {
							console.log('循环' + i + '次');
							console.log(res);
							if (res.code != "000") {
								this.$message.error('第' + i + '设备序列号：' + list.deviceKey + '删除学生失败！');
							}
						});
					}
					this.studentDelete(this.nameform.classId);
					this.$message.success('执行删除设备信息成功！');
				} else {
					this.$message.error('删除失败！');
				}
			},
			//删除服务器整个班级数据
			studentDelete(classId){
				this.$api.student.deleteClassStudent({schoolId:this.schoolsid,classId:classId}, (res) => {
					console.log(res);
					if(res.status == 0){
						this.pageSize = 10;
						this.getDeviceAll(1);
						this.$message.success('执行删除服务器信息成功！');
					}else{
						this.$message.error(res.msg);
					}
				});
			},
			//删除设备人员
			delshebeilist(id){
				console.log('打印删除设备人员');
				console.log(this.banjilist);
				if (this.banjilist.length > 0) {
					for (let i = 0; i < this.banjilist.length; i++) {
						let list = {
							deviceKey: this.banjilist[i].deviceNumber,
							secret: this.banjilist[i].devicePassword,
							personId: id,
						};
						console.log(list);
						this.$api.yun.persondel(list, (res) => {
							console.log('循环' + i + '次');
							console.log(res);
							if (res.code != "000") {
								this.$message.error('第' + i + '设备序列号：' + list.deviceKey + '删除学生失败！');
							}
						});
					}
					this.$message.success('执行删除设备信息成功！');
					
				} else {
					this.$message.error('删除失败！');
				}
			},
			handleEdit(index, row) {
				this.showMsgModify = true;
				this.modifyModel = row;
				// 显示确定编辑的弹窗
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
			//删除本班所有人员
			Deletelist() {
				this.showMsglist = true;
				this.pageSize = 500;
				this.getAllDeviceck();
				this.getDeviceAll(1);
				// 提示是否确认删除
			},
			//确定修改数据
			conModifylist(){
				console.log('打印确定数据！');
				console.log(this.modifyModel);
				let list ={
					cardNo:this.modifyModel.cardNo,
					schoolId:this.modifyModel.schoolId,
					classId:this.modifyModel.classId,
					userName:this.modifyModel.userName,
					id:this.modifyModel.id
				};
				this.$api.student.updateStudent(list, (res) => {
					console.log(res);
					if(res.status == 0){
						this.getDeviceAll(1);
						this.$message.success('修改成功');
					}else{
						this.$message.error(res.msg);
					}
				});
				
			},

			/**
			 *@description: 点击确定执行的方法
			 */
			//执行删除人员信息
			confirm() {
				this.delateschooll(this.delateschool);
				console.log('执行确认方法');
			},
			//执行删除本班所有人员信息
			confirm2() {
				// this.$refs.dialog.visible = false;
				// this.delateschooll(this.delateschool);
				console.log('执行删除确认方法');
				this.batchDelshelist();
			},
		},
	};
</script>
<style lang='scss' scoped>
    @import url('../user/userCommo.css');

    /* 引入公共css类 */

    .el-container {
        height: 750px;
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

    .test {
        position: relative;
        display: inline-block;
        height: 30px;
        padding: 5px 20px;

        /* border: 1px solid #99d3f5; */
        border-radius: 5px;
        margin: 0 10px;

        /* color: #1e88c7; */
        color: #fff;
        background: #409eff;
        overflow: hidden;
        font-size: 13px;
        line-height: 30px;
        text-indent: 0;

        /* text-decoration: none; */
    }

    .test input {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.3;
        font-size: 50px;
    }

    .test:hover {
        /* border-color: #78c3f3; */

        /* color: #004974; */
        color: #fff;
        background: #66b1ff;
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
