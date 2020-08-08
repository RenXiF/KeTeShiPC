<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="13" class="">
            <h1 class="flex-center flex_jufy_center">照片注册URL</h1>
            <el-form label-position="left" class="el-form" label-width="0" :model="formLabelAlign">
                <el-form-item label="ID" label-width="auto">
                    <el-input v-model="formLabelAlign.id" required="true" placeholder="请输入ID"></el-input>
                </el-form-item>
                <el-form-item label="照片ID" required="true" label-width="auto">
                    <el-input v-model="formLabelAlign.name" placeholder="请输入照片ID"></el-input>
                </el-form-item>
                <div class="demo-image flex-center">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview"
                               :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <el-form-item size="large">
                    <el-button type="primary" @click="">立即注册</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            formLabelAlign: {
                id: '',
                name: '',
                region: '',
            },
            dialogImageUrl: '',
            dialogVisible: false,
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
        choiceimg() {

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
</style>
