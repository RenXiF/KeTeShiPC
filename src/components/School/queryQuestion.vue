<template>
	<el-container>
		<h1 class="flex-center  flex_jufy_center">题库管理</h1>
		<el-header>
			<el-select v-model="selectedGrade" placeholder="请选择年级" @change="getQuestion(1)">
				<el-option v-for="item in grade" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="selectedSubject" placeholder="请选择类型" @change="getQuestion(1)">
				<el-option v-for="item in Subject" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" @click="getQuestion(1)">搜索</el-button>
			<el-button type="primary" @click="showAddFrom=!showAddFrom">添加题库</el-button>
		</el-header>

		<el-main>
			<el-table :data="tableQuestion" height="495" stripe border v-loading="loading">
				<el-table-column v-for="(item ,index) in tableName" :key="index" :prop="item.key" :label="item.label" :width="item.width"
				 :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="操作" align="right">
					<template slot-scope="scope" class="flex_rows">
						<div class="demo-image__preview">
						  <el-image 
						    style="width: 30px; height: 30px;"
						    :src="url" 
						    :preview-src-list="srcList"  @click="imgyulan(scope.$index, scope.row)">
						  </el-image>
						</div>
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</el-main>
		<conModifyFrom :showMsg.sync="showMsgModify" tit="修改信息" :fromLabel="modifyFromlabel" :fromModel="modifyModel"
		 @conModify="conModifylist"></conModifyFrom>
		<conModifyFrom :showMsg.sync="showAddFrom" tit="添加题库" :fromLabel="addFromlabel" :fromModel="questionModel" @conModify="conAddlist"></conModifyFrom>
		<ConfirmDialog @confirm="confirm" :showMsg.sync="showMsg" tit="系统提示" :ftit="'确定要删除？'+delateschool.reserveOne" type="danger"></ConfirmDialog>
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
	import conModifyFrom from '../admin/common/conModifyFrom.vue'; //新修改表单
	import { pathToBase64, base64ToPath } from '../admin/image-tools/index.js';
	export default {
		components: {
			ConfirmDialog,
			imgbase,
			conModifyFrom
		},
		data() {
			return {
				coverImg: '', //已选择64位图片
				loading:false,
				// 显示提示框
				showMsg: false, //删除开关
				showMsgModify: false, //修改开关
				showAddFrom: false, //添加开关
				// end
				selectedGrade:0,//已选择年级
				selectedSubject:0,//已选择科目
				url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596705398582&di=f709abb2c5ea168aa18d9f844387d917&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F53%2F62%2F355746e21107dfb.jpg',
				srcList: [
				          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
				          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
				        ],
				grade: [{
					value: 0,
					label: '一年级'
				}, {
					value: 1,
					label: '二年级'
				}, {
					value: 2,
					label: '三年级'
				}, {
					value: 3,
					label: '四年级'
				}, {
					value: 4,
					label: '五年级'
				},{
					value: 5,
					label: '六年级'
				}],
				Subject: [{
					value: 0,
					label: '语文'
				}, {
					value: 1,
					label: '数学'
				}, {
					value: 2,
					label: '英语'
				}],
				tableQuestion: [], //表格数据
				tableName: [{ //表格头渲染数据
						label: '标题',
						key: 'reserveOne',
						name:'',
						width: '120'
					},
					{
						label: '内容',
						key: 'reserveTwo',
						name:'',
						width: '200'
					},
					{
						label: '图片1',
						key: 'imageOne',
						name:'img',
						width: '120'
					},
					{
						label: '图片2',
						key: 'imageTwo',
						name:'img',
						width: '120'
					},
					{
						label: '图片3',
						key: 'imageThree',
						name:'img',
						width: '120'
					},
					{
						label: '创建时间',
						key: 'createdTime',
						name:'',
						width: '160'
					}
				],
				modifyModel: {}, //绑定修改参数
				modifyFromlabel: [ //修改数据
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
				questionModel: {
					classRole: '',
					subject: '',
					reserveOne: '',
					reserveTwo: '',
				}, //绑定添加题库参数
				addFromlabel: [ //添加题库数据
					{
						label: '年级：',
						key: 'classRole',
						rules: [{
							required: true,
							message: '请选择年级'
						}],
						type: 'select',
						options: [{
								label: '一年级',
								value: 0
							},
							{
								label: '二年级',
								value: 1
							},
							{
								label: '三年级',
								value: 2
							},
							{
								label: '四年级',
								value: 3
							},
							{
								label: '五年级',
								value: 4
							},
							{
								label: '六年级',
								value: 5
							}
						]
					},
					{
						label: '科目：',
						key: 'subject',
						rules: [{
							required: true,
							message: '请选择科目'
						}],
						type: 'select',
						options: [{
								label: '语文',
								value: 0
							},
							{
								label: '数学',
								value: 1
							},
							{
								label: '英语',
								value: 2
							}
						]
					},
					{
						label: '标题：',
						key: 'reserveOne',
						rules: [{
							required: true,
							message: '请填写标题'
						}],
						type: 'input'
					},
					{
						label: '内容：',
						key: 'reserveTwo',
						rules: [{
							required: true,
							message: '请输入内容'
						}],
						type: 'textarea'
					},
					{
						label: '图片1：',
						rules: [],
						placeholder: '请选择图片',
						key: 'imageOne',
						type: 'uploadImg'
					},
					{
						label: '图片2：',
						rules: [],
						placeholder: '请选择图片',
						key: 'imageTwo',
						type: 'uploadImg'
					},
					{
						label: '图片3：',
						rules: [],
						placeholder: '请选择图片',
						key: 'imageThree',
						type: 'uploadImg'
					},
				],
				delateschool: '', //确认删除数据
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
			this.getQuestion(1);
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
			handleSizeChange(val) {
				// eslint-disable-next-line no-console
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				// eslint-disable-next-line no-console
				console.log(`当前页: ${val}`);
				this.getQuestion(val);
			},
			//64转图片
			img64zhuan(base64,callback){
				base64ToPath(base64).then(res => {
				    // console.log("转换成功！")
					callback(res)
				  }).catch(error => {
					  console.log("转换失败！")
				    console.error(error)
				  })
			},
			img64zhuanlist(item) {
				if(item.imageOne !=null){
					this.img64zhuan(item.imageOne,(res)=>{
						// console.log(res);
						item.imageOne = res;
					})
				}
				if(item.imageTwo !=null){
					this.img64zhuan(item.imageTwo,(res)=>{
						item.imageTwo = res;
					})
				}
				if(item.imageThree !=null){
					this.img64zhuan(item.imageThree,(res)=>{
						// console.log(res);
						item.imageThree = res;
					})
				}
				
			},
			// 查看题库
			getQuestion(pageNum) {
				this.loading = true;
				let list={
					roleId:this.selectedGrade,
					subjectId:this.selectedSubject,
					pageNum:pageNum,
					pageSize:this.pageSize
				};
				this.$api.question.getQuestion(list, (res) => {
					console.log(res);
					// this.tableQuestion =  res.status==0 ? res.data.list : this.$message.error(res.msg);;
					// console.log(this.tableQuestion);
					if (res.status == 0) {
						this.total = res.data.total;
						this.pageSize = res.data.pageSize;
						this.tableQuestion = res.data.list;
						if(this.tableQuestion.length !=0){
							for (let i = 0; i < this.tableQuestion.length; i++) {
								this.img64zhuanlist(this.tableQuestion[i]);
								console.log("已执行转换");
							}
							this.loading = false;
						}else{
							this.tableQuestion = [];
							this.loading = false;
						}
					}
					else{
						this.loading = false;
						this.tableQuestion = []; 
						this.$message.error(res.msg);
					}
					
					
				});
			},
			// 添加题库
			addstudent() {
				this.$api.question.questionAdd(this.questionModel, (res) => {
					console.log(res);
					if (res.status == 0) {
						this.$message.success('添加' + res.msg);
					} else {
						this.$message.error('添加' + res.msg);
					}

				});
			},
			// 删除题库
			Questiondelete(id) {
				this.$api.question.Questiondelete({question:id}, (res) => {
					console.log(res);
					if (res.status == 0) {
						this.getQuestion(1);
						this.$message.success('删除成功！');
					} else {
						this.$message.error('删除失败！' + res.msg);
					}
			
				});
			},
			//查看图片
			imgyulan(index, row) {
				if (this.srcList) {
					this.srcList =[];
				} 
				this.srcList[0] = row.imageOne != null ? row.imageOne :null;
				this.srcList[1] = row.imageTwo != null ? row.imageTwo :null;
				this.srcList[2] = row.imageThree != null ? row.imageThree :null;
				// 显示确定编辑的弹窗
				console.log(row);
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
			//确定修改数据
			conModifylist() {
				console.log('打印确定数据！');
			},
			//确定添加题库数据
			conAddlist() {
				console.log('打印确定题库数据！');
				console.log(this.questionModel);
				this.addstudent();
			},
			/**
			 *@description: 点击确定执行的方法
			 */
			//执行删除人员信息
			confirm() {
				this.Questiondelete(this.delateschool.id);
				console.log('执行确认删除方法');
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
