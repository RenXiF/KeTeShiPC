<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="20" class=" ">
            <h1 class="flex-center  flex_jufy_center">人员查询</h1>
            <div class="tit flex-center flex_rows">
                <h3>ID</h3>
                <div style="width: 200px; margin: 0 10px;">
                    <el-input placeholder="请输入ID" prefix-icon="el-icon-search" v-model="input2"></el-input>
                </div>

                <el-button type="primary">查询</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column label="日期" align="center" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px;">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="人员ID" align="center" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px;">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="卡号" align="center" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px;">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>住址: {{ scope.row.address }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <ConfirmDialog @confirm="confirm" :showMsg.sync="showMsg"></ConfirmDialog>
            <Pagination></Pagination>
        </el-col>
    </el-row>
</template>

<script>
// 分页组件
import Pagination from '@/components/admin/common/Pagination.vue';
// 确认提示框组件
import ConfirmDialog from '@/components/admin/common/ConfirmDialog.vue';

export default {
    components: {
        Pagination,
        ConfirmDialog,
    },
    data() {
        return {
            input2: '',
            formLabelAlign: {
                id: '',
                name: '',
                region: '',
            },
            // 显示提示框
            showMsg: false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }],
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
        handleEdit(index, row) {
            // this.$refs.dialog.visible = true;
            this.showMsg = true;
            // 显示确定编辑的弹窗
            console.log(index);
            console.log(row);
        },
        handleDelete(index, row) {
            // this.$refs.dialog.visible = true;
            this.showMsg = false;
            // 提示是否确认删除
            console.log(index);
            console.log(row);
        },
        /**
			 *@description: 点击确定执行的方法
			 */
        confirm() {
            // this.$refs.dialog.visible = false;
            console.log('执行确认方法');
        },
    },
};
</script>
<style lang='scss' scoped>
    @import url('../user/userCommo.css');

    /* 引入公共css类 */
    .demo-image {
        padding: 20px 0;
    }

    .tit {
        min-height: 100px;
    }
</style>
