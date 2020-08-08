<template>
	<!-- 修改表单组件 -->
	<div class="confirm-dialog " v-if="list">
		<el-dialog :title="title" :visible.sync="showMsg" :show-close="false" width="40%" center>
			<el-form :model="list" :rules="rules" ref="ruleForm" label-position="left" class="demo-ruleForm">
				<el-form-item label="学校名称" :label-width="formLabelWidth" prop="schoolName">
					<el-input v-model="list.schoolName" autocomplete="on" placeholder="请输入学校名称"></el-input>
				</el-form-item>
				<el-form-item label="所在省份:" :label-width="formLabelWidth" prop="schoolProvince">
					<el-input v-model="list.schoolProvince" autocomplete="on" placeholder="请输入所在省份"></el-input>
				</el-form-item>
				<el-form-item label="所在市:" :label-width="formLabelWidth" prop="schoolCity">
					<el-input v-model="list.schoolCity" autocomplete="on" placeholder="请输入所在市"></el-input>
				</el-form-item>
				<el-form-item label="所在区县:" :label-width="formLabelWidth" prop="schoolDistrict">
					<el-input v-model="list.schoolDistrict" autocomplete="on" placeholder="请输入所在区/县"></el-input>
				</el-form-item>
				<el-form-item label="详细地址:" :label-width="formLabelWidth" prop="schoolAddress">
					<el-input v-model="list.schoolAddress" autocomplete="on" placeholder="请输入详细地址"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$emit('update:showMsg', false)">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'SubmitForm',
		props: {
			showMsg: Boolean,
			title:{
				type: String,
				default: '修改学校'
			},
			list: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		components: {},
		data() {
			return {
				// 是否同步展示
				// visible: false,
				formLabelWidth: '100px',

				nameform: {
					// schoolId:1,
					schoolName: '',
					schoolProvince: '', // 省
					schoolCity: '', // 市
					schoolDistrict: '', // 区县
					schoolAddress: '', // 详细地址
				},
				rules: {
					schoolName: [{
							required: true,
							message: '请输入学校名称',
							trigger: 'blur',
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur',
						},
					],
					schoolProvince: [{
						required: true,
						message: '请输入省份',
						trigger: 'blur',
					}],
					schoolCity: [{
						type: 'date',
						required: true,
						message: '请输入市份',
						trigger: 'blur',
					}],
					schoolDistrict: [{
						type: 'date',
						required: true,
						message: '请输入区/县',
						trigger: 'blur',
					}],
					schoolAddress: [{
						type: 'date',
						required: true,
						message: '请填写详细地址',
						trigger: 'blur',
					}],
				},
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		destroyed() {},
		methods: {
			/**
			 *@description: 确定执行的方法
			 *@param{}
			 *@return:
			 */
			dialogConfirm() {
				// console.log(this.form);
				// this.$emit('SubmitForm',this.form);
				// this.$emit('update:showMsg', false);
				if (this.list.schoolName == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写学校名称!',
					});
					return;
				}
				if (this.list.schoolProvince == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写省份!',
					});
					return;
				}
				if (this.list.schoolCity == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写市份!',
					});
					return;
				}
				if (this.list.schoolDistrict == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写区/县!',
					});
					return;
				}
				if (this.list.schoolAddress == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写详细地址!',
					});
					return;
				}
				this.schoolAdd();
			},
			schoolAdd() {
				this.$api.school.updateschool(this.list, (res) => {
					console.log(res);
					// this.tableData = res.data;
					if (res.status == 0) {
						this.$message({
							type: 'success',
							message: '修改成功!',
						});
						this.$emit('modifyForm');
						this.$emit('update:showMsg', false);
					} else {
						this.$message({
							type: 'error',
							message: '修改失败!'+res.msg,
						});
					}

					// this.getTest1 = res;
				});
			},
		},
	};
</script>
<style lang='scss' scoped>
    /* //@import url(); 引入公共css类 */
    .el-form-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .el-input {
        /* width: 200px; */
    }
</style>
