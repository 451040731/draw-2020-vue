<template>
	<div class="content">
		<div class="main-page-bg child-page-bg">
			<div class="logo">
				<img src="../assets/logo.png" alt="深圳市吉迩科技有限公司">
			</div>
			<div class="title">深圳市吉迩科技有限公司2020年年会抽奖</div>
			<div class="child-page-entry">
				<button v-for="(item,index) in navs" :key="index" @click="toDetail(item.id, item.name,item.number, item.prize)" v-text="item.name" class="button"></button>
			</div>
			<router-link to="/record"><button class="backToHome" v-text="str.record"></button></router-link>
			<button class="backToHome addPerson" v-text="str.addPerson" @click="addPerson()"></button>
		</div>

		<el-dialog
			title="增加抽奖人"
			:visible.sync="dialogVisible"
			width="26%"
			:close-on-click-modal="false">
			<el-form label-position="left" ref="dataForm" :rules="rules" label-width="60px" :model="personJson">
				<el-form-item label="工号" prop="id">
					<el-input v-model="personJson.id"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="personJson.name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleClose()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import str from '../common/str.js';

export default {
	name: "index",
	data() {
		return {
			str: str,
			dialogVisible: false,
			navs: [],
			prizeList: [],
			personJson: {
				id: '',
				name: ''
			},
			rules: {
				id: [{ required: true, message: '请输入工号', trigger: 'blur' }],
				name: [{required: true, message: '请输入姓名', trigger: 'blur'}]
			}
		};
	},
	mounted() {
		if (window.localStorage) {
			this.navs = JSON.parse(window.localStorage.getItem("prize"));
			this.navs.forEach(item=>{
				let prizeRecord_ = `prizeRecord_${item.id}`;
				this.prizeList.push({
					key: item.id,
					prizeRecord: JSON.parse(window.localStorage.getItem(prizeRecord_))
				})
			})
		}
	},
	methods: {
		toDetail(id, name, number, prize) {
			this.$router.push({
				path: "/detail",
				query: { id: id, name: name, number: number, prize: prize }
			});
		},
		resetTemp() {
			this.personJson = {
				id: '',
				name: ''
			}
		},
		addPerson(){
			this.resetTemp();
			this.dialogVisible = true
			this.$nextTick(() => {
				this.$refs['dataForm'].clearValidate()
			})
		},
		handleClose(){
			this.$refs['dataForm'].validate((valid) => {
				if (valid) {
					this.$confirm('您确定要增加抽奖人?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '增加成功!'
						});

						let prizeRecordTotal = JSON.parse(window.localStorage.getItem("list"));
						prizeRecordTotal.push({
							"id": this.personJson.id,
							"name": this.personJson.name,
							"src": "../../static/default.jpg"
						})
						window.localStorage.setItem('list', JSON.stringify(prizeRecordTotal));

						this.dialogVisible = false
					}).catch(() => {
									
					});
				}
			})
		}
	}
};
</script>

<style>
@import "../common/common.css";

.main-page-bg {
	display: flex;
	align-items: center;
	justify-content: center;
}
.main-page-bg .title {
	margin-bottom: 100px;
	font-size: 50px;
	color: #ffe9af;
	text-align: center;
	line-height: 60px;
}
.main-page-bg .logo{
	width: 330px;
	margin-bottom: 40px;
	margin-top: -100px;
}
.main-page-bg .logo img{
	width: 100%;
}
</style>