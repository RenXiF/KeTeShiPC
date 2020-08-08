<template>
	<!-- <div class="index">
		我是首页132131321
	</div> -->
	<el-container style="height: 800px; padding: 0; border: 1px solid #eee;">
		<el-container>
			<el-main>
				<div id="main" style="width: 100%; height:800px;"></div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				userlist: '',
				tableData: ''
			};
		},
		computed: {},
		watch: {},
		created() {
			// this.drawChart();
			// this.homelist();
			// this.QueryAllSchools();
		},
		mounted() {
			this.drawChart();
		},
		destroyed() {},
		methods: {
			homelist() {
				this.$api.home.getAllVo((res) => {
					console.log(res);
					this.userlist = res.data;
					// this.tableData = res.status == 0 ? res.data : this.$message({ type: 'success',message: res.msg});;
					// this.fullscreenLoading = false;
				});
			},
			// 查询所有学校
			// QueryAllSchools() {
			// 	this.fullscreenLoading = true;
			// 	this.$api.school.QueryAllSchools((res) => {
			// 		console.log(res);
			// 		this.tableData = res.status == 0 ? res.data : this.$message({
			// 			type: 'success',
			// 			message: res.msg
			// 		});;
			// 		this.fullscreenLoading = false;
			// 	});
			// },
			/**
			 *@description: 绘制图表
			 */
			drawChart() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById("main"));
				// 指定图表的配置项和数据
				var option = {
					backgroundColor: '#2c343c',

					title: {
						text: '科特士注册人数',
						left: 'center',
						top: 20,
						textStyle: {
							color: '#ccc'
						}
					},

					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},

					visualMap: {
						show: false,
						min: 80,
						max: 600,
						inRange: {
							colorLightness: [0, 1]
						}
					},
					series: [{
						name: '学校注册学生人数',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: [ {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'}].sort(function(a, b) {
							return a.value - b.value;
						}),
						roseType: 'radius',
						label: {
							color: 'rgba(255, 255, 255, 0.3)'
						},
						labelLine: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						},
						itemStyle: {
							color: '#c23531',
							shadowBlur: 200,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						},

						animationType: 'scale',
						animationEasing: 'elasticOut',
						animationDelay: function(idx) {
							return Math.random() * 200;
						}
					}]
				};
				this.$api.home.getAllVo((res) => {
					console.log(res);
					// option.series[0].data =res.data.list;
					// console.log('sdfsdfsd');
					// console.log(option.series[0].data);
					// option.series[0].data = res.data.list;
					for (let i =0 ;i < res.data.list.length;i++) {
						option.series[0].data[i].name = res.data.list[i].name;
						option.series[0].data[i].value = res.data.list[i].number;
						console.log(option.series[0].data);
					}

					console.log(option);
					myChart.setOption(option);
				});
				// 使用刚指定的配置项和数据显示图表。
				
			}
		},
	};
</script>
<style lang='scss' scoped>
    /* // import */
    .user_list {
        width: 100%;
        height: vh(900);
    }
</style>
