<template>
	<div class="content">
		<div class="main-page-bg child-page-bg">
			<div class="record">
				<h4>中奖纪录</h4>
				<div class="record-list" v-if="recordList != null && recordList.length > 0 ">
					<div class="prize-list" v-for="(item,index) in recordList" :key="index">
						<div class="item" >
							<div class="item-title">{{(item.key).replace('prizeRecord_','') | filterNumber}}等奖<span>第{{index + 1}}次抽奖</span></div>
							<div class="item-con">
								<div class="c-item" v-for="(k,index) in item.prizeRecord" :key="index">
									<div class="avatar">
										<img :src="k.src" :alt="k.name" />
									</div>
									<div class="min">
										<span class="jobid">工号：{{k.id}}</span>
										<span class="name">姓名：{{k.name}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="no-record" v-else>
					暂无抽奖纪录
				</div>
			</div>
			<router-link to="/"><button class="backToHome" v-text="str.back"></button></router-link>
			<button class="backToHome addPerson" v-text="str.resetAll" @click="resetAll()" v-if="reset == 1 && recordList !== null"></button>
		</div>
	</div>
</template>

<script>
import str from '../common/str.js';

export default {
	name: "record",
	data() {
		return {
			str: str,
			recordList: [],
			reset: 0
		};
	},
	created() {
		this.recordList = JSON.parse(window.localStorage.getItem('prizeRecordTotal'));
		this.reset = Number(this.$route.query.reset);
	},
	methods: {
		resetAll() {
			this.$confirm('您是否要重置本次抽奖?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '重置成功!'
				});
				window.localStorage.removeItem('list');
				window.localStorage.removeItem('prizeRecordTotal');
				this.$router.go(0);
			}).catch(() => {
							
			});
		}
	},
    filters: {
      filterNumber(number){
			const data = {
				'1': '一',
				'2': '二',
				'3': '三',
				'4': '四',
				'5': '五',
				'6': '六',
				'7': '七',
				'8': '八',
				'9': '九',
			};
			return number.split('').map(v => data[v] || v).join('');
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
</style>