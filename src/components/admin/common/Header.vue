<template>
	<div class="header flex_rows flex-center">
		<!-- <div class="control border" @click="control"></div> -->
		<h2 style=" color: #fff; font-weight: 900;">科特士考勤管理系统</h2>
		<div class="" style="margin-left: 40px;">
			<el-select v-model="SchoolId" clearable placeholder="请选择学校" @change="getAllClass">
				<el-option v-for="item in tableData" :key="item.schoolId" :label="item.schoolName" :value="item.schoolId">
				</el-option>
			</el-select>
			<el-button type="primary" style="margin-left: 30px;" @click="openDoo">验证</el-button>
			<el-button type="primary" style="margin-left: 30px;" :disabled="SchoolId=='' ? true : false" @click="showAddFrom=!showAddFrom">配置设备</el-button>
		</div>

		<conModifyFrom :showMsg.sync="showAddFrom" tit="配置设备" :fromLabel="addFromlabel" :fromModel="questionModel" @conModify="conAddlist"></conModifyFrom>

	</div>

</template>

<script>
	import conModifyFrom from '../common/conModifyFrom'; //新修改表单
	export default {
		components: {
			conModifyFrom
		},
		data() {
			return {
				formInline: {
					user: '',
					pass: '',
				},
				showAddFrom: false, //添加开关
				questionModel: { //绑定添加题库参数
					deviceKey: '', //序列号
					secret: '', //密码
					"comModContent": "hello", // String，串口输出模式自定义内容
					"comModType": 100, // Int，串口输出模式
					"companyName": "贵州科特士有限公司", // String，公司名称，显示位置参见设备屏幕
					"delayTimeForCloseDoor": 500, // Int，继电器控制开门到关门的时间间隔，单位ms
					"displayModContent": "{name}欢迎你", // String，识别文字显示模式自定义内容
					"displayModType": 100, // Int，识别文字显示模式
					"identifyDistance": 1, // Int，识别距离，0：无限制，1：0.5米以内，2：1米以内，3：1.5米以内，4：3米以内
					"saveIdentifyTime": 3, // Int，识别间隔
					"identifyScores": 80, // Int，识别分数
					"multiplayerDetection": 1, // Int，多个人脸检测设置
					"recRank": 2, // Int，识别等级- 等级1：不开启活体识别;等级2：开启单目活体识别;等级3：开启双目活体识别(红外)，识别距离最远为1.5米
					"recStrangerTimesThreshold": 3, // Int，陌生人判定次数
					"recStrangerType": 1, // Int，陌生人开关（是否进行陌生人识别）
					"ttsModContent": "欢迎{name}", // String，语音播报模式自定义内容
					"ttsModStrangerContent": "陌生人啊你好", // String，陌生人语音播报模式自定义内容
					"ttsModStrangerType": 100, // Int，陌生人语音播报模式
					"ttsModType": 100, // Int，语音播报模式
					"wg": "#WG{id}#", // String，韦根类型及输出
				},
				addFromlabel: [ //添加题库数据
					{
						label: '继电器设置',
						key: 'companyName',
						placeholder: '请输入公司名字',
						type: 'input',
						rules: [{
							required: true,
							message: '请输入公司名字'
						}],
					},
					{
						label: '串口输出模式自定义内容:',
						key: 'comModContent',
						type: 'input',
						placeholder: '请填写自定义内容',
						rules: [{
							required: true,
							message: '请填写内容'
						}],
					},
					{
						label: '串口输出模式：',
						key: 'comModType',
						placeholder: '请选择串口输出模式',
						rules: [{
							required: true,
							message: '请选择模式'
						}],
						type: 'select',
						options: [{
								label: '开门信号，若设备连接了门禁，人员识别成功后就会触发开门',
								value: 1
							},
							{
								label: '不输出',
								value: 2
							},
							{
								label: '韦根信号输出人员ID',
								value: 3
							},
							{
								label: '韦根信号输出身份证/IC卡号',
								value: 4
							}
						]
					},
					{
						label: '继电器设置',
						key: 'delayTimeForCloseDoor',
						placeholder: '请填写控制开门到关门的时间间隔，单位ms，如：1000ms=1秒钟',
						type: 'input',
						rules: [{
							required: true,
							message: '请填写控制开门到关门的时间间隔，单位ms，如：1000ms=1秒钟 '
						}],
					},
					{
						label: '识别文字自定义内容',
						key: 'displayModContent',
						placeholder: '请填写识别自定义内容，（如：{name}欢迎你）',
						type: 'input',
						rules: [{
							required: true,
							message: '请填写识别自定义内容，（如：{name}欢迎你）'
						}],
					},
					{
						label: '识别文字显示模式：',
						key: 'displayModType',
						placeholder: '请选择识别文字显示模式',
						rules: [{
							required: true,
							message: '请选择识别文字显示模式'
						}],
						type: 'select',
						options: [{
								label: '显示名字',
								value: 1
							},
							{
								label: '显示自定义内容',
								value: 100
							}
						]
					},
					{
						label: '识别距离：',
						key: 'identifyDistance',
						placeholder: '请选择识别距离',
						rules: [{
							required: true,
							message: '请选择识别距离'
						}],
						type: 'select',
						options: [{
								label: '无限制',
								value: 0
							},
							{
								label: '0.5米以内',
								value: 1
							},
							{
								label: '1米以内',
								value: 2
							},
							{
								label: '1.5米以内',
								value: 3
							},
							{
								label: '3米以内',
								value: 4
							}
						]
					},
					{
						label: '识别间隔(秒)：',
						key: 'saveIdentifyTime',
						placeholder: '请填写默认3秒，最大60秒。如：1=1秒',
						type: 'input',
						rules: [{
							required: true,
							message: '请填写默认3秒，最大60秒。如：1=1秒',
						}],
					},
					{
						label: '识别分数：',
						key: 'identifyScores',
						placeholder: '请填写识别分数，默认75，要求传入值为60-100的整数，分数越高，识别准确率越高，但识别速度会变慢。',
						type: 'input',
						rules: [{
							required: true,
							message: '请填写识别分数，默认75，要求传入值为60-100的整数，分数越高，识别准确率越高，但识别速度会变慢。',
						}],
					},
					{
						label: '多个人脸检测设置：',
						key: 'multiplayerDetection',
						placeholder: '请选择人脸检测设置',
						rules: [{
							required: true,
							message: '请选择人脸检测设置'
						}],
						type: 'select',
						options: [{
								label: '检测多个人脸并进行识别，即只要设备检测到人脸都会进行识别，每个人脸都会有识别结果（成功或失败）',
								value: 1
							},
							{
								label: '只检测多个人脸中最大的人脸并进行识别，即多个人脸只有最大人脸会有一个识别结果（成功或失败）',
								value: 2
							}
						]
					},
					{
						label: '识别等级：',
						key: 'recRank',
						placeholder: '请选择识别等级',
						rules: [{
							required: true,
							message: '请选择识别等级'
						}],
						type: 'select',
						options: [{
								label: '等级1：不开启活体识别',
								value: 1
							},
							{
								label: '等级2：开启单目活体识别(默认)',
								value: 2
							},
							{
								label: '等级3：开启双目活体识别，识别距离最远为1.5米',
								value: 3
							}
						]
					},
					{
						label: '陌生人判定：',
						key: 'recStrangerTimesThreshold',
						placeholder: '请填写传入值请选择3-10之间的整数, 1表示快速判定但精确率最低，随着数值增加，判定时间增长，精确度提高',
						type: 'input',
						rules: [{
							required: true,
							message: '请填写传入值请选择3-10之间的整数, 1表示快速判定但精确率最低，随着数值增加，判定时间增长，精确度提高',
						}],
					},
					{
						label: '陌生人开关：',
						key: 'recStrangerType',
						placeholder: '请选择是否开启',
						rules: [{
							required: true,
							message: '请选择是否开启'
						}],
						type: 'select',
						options: [{
								label: '不识别陌生人，即只识别注册人员，对检测到的陌生人（非注册人员）不会识别',
								value: 1
							},
							{
								label: '识别陌生人',
								value: 2
							}
						]
					},
					{
						label: '陌生人语音播报模式：',
						key: 'ttsModStrangerType',
						placeholder: '请选择是否开启',
						rules: [{
							required: true,
							message: '请选择是否开启'
						}],
						type: 'select',
						options: [{
								label: '不播报语音',
								value: 1
							},
							{
								label: '语音播报 “陌生人警报”',
								value: 2
							},
							{
								label: '自定义',
								value: 100
							}
						]
					},
					{
						label: '陌生人子自定义语音播报：',
						key: 'ttsModStrangerContent',
						placeholder: '请填写播报自定义内容，只允许数字、英文和汉字，不允许符号，长度限制255个字符，如：注意陌生人。',
						type: 'input',
						rules: [{
							required: true,
							message: '请填写播报自定义内容，只允许数字、英文和汉字，不允许符号，长度限制255个字符，如：注意陌生人。',
						}],
					},
					{
						label: '韦根类型及输出：',
						key: 'wg',
						placeholder: '请填写韦根类型及输出，（如：#WG{id}#）',
						type: 'input',
						rules: [{
							required: true,
							message: '请填写韦根类型及输出，（如：#WG{id}#）',
						}],
					},
					{
						label: '身份证比对白名单开关：',
						key: 'whitelist',
						placeholder: '请选择是否开启',
						type: 'select',
						options: [{
								label: '关',
								value: 1
							},
							{
								label: '开',
								value: 2
							}
						]
					},
					{
						label: '保存识别记录模式：',
						key: 'saveIdentifyMode',
						placeholder: '请选择保存识别记录模式',
						type: 'select',
						options: [{
								label: '不续传',
								value: 0
							},
							{
								label: '续传',
								value: 1
							}
						]
					},
					{
						label: '开补光灯开始时间：',
						key: 'onLightStartTime',
						placeholder: '请输入0~23的数值',
						type: 'input',
						rules: [{
							message: '请输入0~23的数值',
						}],
					},
					{
						label: '开补光灯结束时间：',
						placeholder: '请输入0~23的数值',
						key: 'onLightEndTime',
						type: 'input',
						rules: [{
							message: '请输入0~23的数值',
						}],
					}
				],
				tableData: [], //所有学校列表
				SchoolId: '', //已选择学校ID
				tableDevice: [] //学校所有设备列表
			};
		},
		computed: {
			// 左侧菜单是否收起
			isCollapse() {
				return this.$store.state.isCollapse;
			},
		},
		watch: {},
		created() {
			this.QueryAllSchools();
		},
		mounted() {},
		destroyed() {},
		methods: {
			// /**
			// *@description: TODO执行控制方法的时候加入节流或防抖
			// *@param{}
			// *@return:
			// */
			// 验证设备开门接口
			openDoo() {
				if (this.tableDevice.length > 0) {
					for (let i = 0; i < this.tableDevice.length; i++) {
						let list = {
							deviceKey: this.tableDevice[i].deviceNumber,
							secret: this.tableDevice[i].devicePassword,
						};
						console.log(list);
						this.$api.yun.openDoo(list, (res) => {
							console.log('循环' + i + '次');
							console.log(res);
							if (res.code != "000") {
								this.$message.error('第' + i + '设备序列号：' + list.deviceKey + '验证失败！');
							}
							if (res.code == "000") {
								this.$message.success('验证设备成功！');
							}
						});
					}
				} else {
					this.$message.error('请先选择学校！');
				}
			},
			// 查询所有学校
			QueryAllSchools() {
				this.$api.school.QueryAllSchools((res) => {
					console.log(res);
					this.tableData = res.status == 0 ? res.data : this.$message.success(res.msg);;
					this.fullscreenLoading = false;
				});
			},
			addForDenice() {
				if (this.tableDevice.length != 0) {
					for (let i = 0; i < this.tableDevice.length; i++) {
						this.questionModel.deviceKey = this.tableDevice[i].deviceNumber;
						this.questionModel.secret = this.tableDevice[i].devicePassword;
						this.addYunDenice();
					}
				} else {
					this.$notify.error('当前学校暂无设备！')
				}
			},
			// 配置设备
			addYunDenice() {
				this.$api.yun.deviceConfig(this.questionModel, (res) => {
					console.log(res);
					if (res.code != "000") {
						this.$notify.error({
							title: '配置失败',
							message: res.msg,
							duration: 0
						})
					} else {
						this.$notify.success({
							title: '成功',
							message: '添加成功！'
						})
					}
				});
			},
			// 根据学校ID查询所有设备
			getAllClass() {
				if (this.SchoolId != '') {
					// this.fullscreenLoading = true;
					this.$api.device.getDevice({
						SchoolId: this.SchoolId
					}, (res) => {
						console.log(res);
						if (res.status == 0) {
							this.$message.success('查询成功！');
						}
						this.tableDevice = res.status == 0 ? res.data : this.$message.error(res.msg);;
					});
				} else {
					this.$message.error('请先选择学校');
					this.tableDevice = '';
				}
			},
			control() {
				this.$store.commit('isCollapse', !this.isCollapse);
			},
			onSubmit() {
				console.log('submit!');
			},
			//确定添加方法数据
			conAddlist() {
				console.log('打印确定题库数据！');
				console.log(this.tableDevice);
				console.log(this.questionModel);
				this.addForDenice();
				// this.addstudent();
			}
		},
	};
</script>
<style lang='scss' scoped>
    .header {
        width: 100%;
        min-height: 110px;
        padding: 0 20px;
        background: cadetblue;

        /*
        .control {
            position: relative;
            top: 9px;
            left: 200px;
            width: 30px;
            height: 30px;
            background: brown;
        } */

        .tit {
            width: 60%;
            height: 100%;
            padding: 20px;

            /* padding-left: 200px; */
        }
    }
</style>
