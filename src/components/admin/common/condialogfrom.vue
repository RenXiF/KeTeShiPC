<template>
	<!-- 系统提示表单 -->
	<div class="confirm-dialog">
		<el-dialog :title="tit" :visible.sync="showMsg" :show-close="false" width="35%" center>
			<div v-if="listObj.className || listObj.name">班级:
				<el-input v-model="listObj.className" v-if="listObj.className" placeholder="请输入内容"></el-input>
				<el-input v-model="listObj.value" v-if="listObj.name" placeholder="请输入内容"></el-input>
			</div>
			<div v-if="listObj.deviceRole">
				学校ID:
				<el-input v-model="listObj.schoolId" placeholder="请输入学校ID" :disabled="true"></el-input>
				<div class="" style="padding: 10px 0;">
					进出类型：
					<el-radio v-model="listObj.deviceRole" label="1"border size="medium">进口</el-radio>
				  <el-radio v-model="listObj.deviceRole" label="2"border size="medium">出口</el-radio>
				</div>
				
				设备IP：
				<el-input v-model="listObj.deviceIp" placeholder="请输入设备IP"></el-input>
				设备密码：
				<el-input v-model="listObj.devicePassword" placeholder="请输入设备密码" show-password></el-input>
				设备序列号：
				<el-input v-model="listObj.deviceNumber" placeholder="请输入设备序列号"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$emit('update:showMsg', false)">取 消</el-button>
				<el-button :type="type" @click="dialogConfirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'ConfirmDialog',
		props: {
			showMsg: Boolean,
			tit: {
				type: String,
				default: '系统消息'
			},
			ftit: {
				type: String,
				default: '系统消息'
			},
			type: {
				type: String,
				default: 'primary'
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			listObj: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		components: {},
		data() {
			return {
				formLabelWidth: '120px',
				formlist: {
					name: ''
				}
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
				this.$emit('confirm');
				this.$emit('update:showMsg', false);
			},
		},
	};
</script>
<style lang='scss' scoped>
    //@import url(); 引入公共css类
    .el-input {
        margin-top: 10px;
        margin-bottom: 15px;
    }
</style>
