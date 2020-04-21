<template>
	<div class="content">
		<div class="child-page-bg">
			<div class="prize-area">
				<div class="name">{{name}}: {{prize}}</div>
			</div>
			<div class="winner-area">
				<div class="winner-con">
					<div class="avatar-con" data-id="1" v-if="prizeRecordList1 !== undefined && prizeRecordList1.length > 0">
						<div class="avatar-bg">
							<transition name="fade" mode="out-in" tag="div">
								<img :key="prizeRecord1.id" :src="prizeRecord1.src || '../../static/default.jpg'" class="avatar-pic"/>
							</transition>
						</div>
						<span v-if="prizeRecord1 && prizeRecord1.name" v-text="prizeRecord1.name" class="winner-info"></span>
					</div>
					<div class="avatar-con" data-id="2" v-if="prizeRecordList2 !== undefined && prizeRecordList2.length > 0">
						<div class="avatar-bg">
							<transition name="fade" mode="out-in" tag="div">
								<img :key="prizeRecord2.id" :src="prizeRecord2.src || '../../static/default.jpg'" class="avatar-pic"/>
							</transition>
						</div>
						<span v-if="prizeRecord2 && prizeRecord2.name" v-text="prizeRecord2.name" class="winner-info"></span>
					</div>
					<div class="avatar-con" data-id="3" v-if="prizeRecordList3 !== undefined && prizeRecordList3.length > 0">
						<div class="avatar-bg">
							<transition name="fade" mode="out-in" tag="div">
								<img :key="prizeRecord3.id" :src="prizeRecord3.src || '../../static/default.jpg'" class="avatar-pic"/>
							</transition>
						</div>
						<span v-if="prizeRecord3 && prizeRecord3.name" v-text="prizeRecord3.name" class="winner-info"></span>
					</div>
					<div class="avatar-con" data-id="4" v-if="prizeRecordList4 !== undefined && prizeRecordList4.length > 0">
						<div class="avatar-bg">
							<transition name="fade" mode="out-in" tag="div">
								<img :key="prizeRecord4.id" :src="prizeRecord4.src || '../../static/default.jpg'" class="avatar-pic"/>
							</transition>
						</div>
						<span v-if="prizeRecord4 && prizeRecord4.name" v-text="prizeRecord4.name" class="winner-info"></span>
					</div>
					<div class="avatar-con" data-id="5" v-if="prizeRecordList5 !== undefined && prizeRecordList5.length > 0">
						<div class="avatar-bg">
							<transition name="fade" mode="out-in" tag="div">
								<img :key="prizeRecord5.id" :src="prizeRecord5.src || '../../static/default.jpg'" class="avatar-pic"/>
							</transition>
						</div>
						<span v-if="prizeRecord5 && prizeRecord5.name" v-text="prizeRecord5.name" class="winner-info"></span>
					</div>
				</div>
			</div>
			<div class="prize-btn">
				<button v-if="prizeFlag == 0" @click="rollRedPocket()" v-text="str.roll" class="button"></button>
				<button v-else-if="prizeFlag == 1" @click="stopRollRedPocket()" v-text="str.stop" class="button"></button>
				<button v-else @click="reRollRedPocket()" v-text="str.restart" class="button"></button>
			</div>
			<router-link to="/"><button class="backToHome" v-text="str.back"></button></router-link>
			<router-link to="/record"><button class="backToHome" v-text="str.record" style="left:132px"></button></router-link>
		</div>
	</div>
</template>

<script>
	import str from '../common/str.js';
	import * as api from '../api/index.js';

	export default {
		name: 'detail',
		data() {
			return {
				id: Number,
				name: '',
				number: Number,
				admin: '',
				prize: '',
				str: str,
				initNumber1: -1,//初始值
				initNumber2: -1,//初始值
				initNumber3: -1,//初始值
				initNumber4: -1,//初始值
				initNumber5: -1,//初始值
				left: [], //源数据
				group: [], // 分组
				prizeRecordList1: [],//组列表1
				prizeRecordList2: [],//组列表2
				prizeRecordList3: [],//组列表3
				prizeRecordList4: [],//组列表4
				prizeRecordList5: [],//组列表5
				prizeRecord1: {},//中奖列表1
				prizeRecord2: {},//中奖列表2
				prizeRecord3: {},//中奖列表3
				prizeRecord4: {},//中奖列表4
				prizeRecord5: {},//中奖列表5
				prizeFlag: 1, //0抽奖，1停止，2重置
				prizeTimer1: null, //定时器,
				prizeTimer2: null, //定时器,
				prizeTimer3: null, //定时器,
				prizeTimer4: null, //定时器,
				prizeTimer5: null, //定时器,
				prizeRecordSingle: [],//单次纪录
				prizeRecordTotal: [],//总纪录
			}
		},
		created(){
			this.id = Number(this.$route.query.id);
			this.number = Number(this.$route.query.number);
			this.name = this.$route.query.name;
			this.prize = this.$route.query.prize;
			this.reset = Number(this.$route.query.reset);
			if(this.reset == 1){
				this.prizeFlag = 2;
			}else{
				this.prizeFlag = 0;
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.localStorage.getItem('list'));
			let leftSourceArr = JSON.parse(window.localStorage.getItem('list'));
			this.group = api.getGroup(leftSourceArr,this.number);
			this.prizeRecordList1 = this.group[0];
			this.prizeRecordList2 = this.group[1];
			this.prizeRecordList3 = this.group[2];
			this.prizeRecordList4 = this.group[3];
			this.prizeRecordList5 = this.group[4];
		},
		methods: {
			rollRedPocket() {
				this.prizeFlag = 1;
				let leftSourceArr = JSON.parse(window.localStorage.getItem('list'));
				this.group = api.getGroup(leftSourceArr,this.number);
				this.prizeRecordList1 = this.group[0];
				this.prizeRecordList2 = this.group[1];
				this.prizeRecordList3 = this.group[2];
				this.prizeRecordList4 = this.group[3];
				this.prizeRecordList5 = this.group[4];
				if(this.prizeRecordList1 !== undefined && this.prizeRecordList1.length > 0){
					this.prizeTimer1 = setInterval(() => {
						//第一列
						this.initNumber1 = this.initNumber1 + 1
						if(this.initNumber1 >= this.prizeRecordList1.length){
							this.initNumber1 = 0	
						}
						this.prizeRecord1 = this.prizeRecordList1[this.initNumber1];
					}, 100);
				}
				if(this.prizeRecordList2 !== undefined && this.prizeRecordList2.length > 0){
					this.prizeTimer2 = setInterval(() => {
						//第二列
						this.initNumber2 = this.initNumber2 + 1
						if(this.initNumber2 >= this.prizeRecordList2.length){
							this.initNumber2 = 0
						}
						this.prizeRecord2 = this.prizeRecordList2[this.initNumber2];
				}, 100);
				}
				if(this.prizeRecordList3 !== undefined && this.prizeRecordList3.length > 0){
					this.prizeTimer3 = setInterval(() => {
						//第三列
						this.initNumber3 = this.initNumber3 + 1
						if(this.initNumber3 >= this.prizeRecordList3.length){
							this.initNumber3 = 0
						}
						this.prizeRecord3 = this.prizeRecordList3[this.initNumber3];
					}, 100);
				}
				if(this.prizeRecordList4 !== undefined && this.prizeRecordList4.length > 0){
					this.prizeTimer4 = setInterval(() => {
						//第四列
						this.initNumber4 = this.initNumber4 + 1
						if(this.initNumber4 >= this.prizeRecordList4.length){
							this.initNumber4 = 0	
						}
						this.prizeRecord4 = this.prizeRecordList4[this.initNumber4];
					}, 100);
				}
				if(this.prizeRecordList5 !== undefined && this.prizeRecordList5.length > 0){
					this.prizeTimer5 = setInterval(() => {
						//第五列
						this.initNumber5 = this.initNumber5 + 1
						if(this.initNumber5 >= this.prizeRecordList5.length){
							this.initNumber5 = 0	
						}
						this.prizeRecord5 = this.prizeRecordList5[this.initNumber5];
					}, 100);
				}
			},
			stopRollRedPocket() {
				clearInterval(this.prizeTimer1);
				clearInterval(this.prizeTimer2);
				clearInterval(this.prizeTimer3);
				clearInterval(this.prizeTimer4);
				clearInterval(this.prizeTimer5);
				setTimeout(() => {
					//第一列
					if(this.prizeRecordList1 !== undefined && this.prizeRecordList1.length > 0){
						this.left.forEach((item,index)=>{
							if(item.id == this.prizeRecord1.id){
								this.left.splice(index, 1);
							}
						})
						this.prizeRecordSingle = [this.prizeRecord1];
					}
					//第二列
					if(this.prizeRecordList2 !== undefined && this.prizeRecordList2.length > 0){
						this.left.forEach((item,index)=>{
							if(item.id == this.prizeRecord2.id){
								this.left.splice(index, 1);
							}
						})
						this.prizeRecordSingle = [this.prizeRecord1, this.prizeRecord2];
					}
					//第三列
					if(this.prizeRecordList3 !== undefined && this.prizeRecordList3.length > 0){
						this.left.forEach((item,index)=>{
							if(item.id == this.prizeRecord3.id){
								this.left.splice(index, 1);
							}
						})
						this.prizeRecordSingle = [this.prizeRecord1, this.prizeRecord2, this.prizeRecord3];
					}
					//第四列
					if(this.prizeRecordList4 !== undefined && this.prizeRecordList4.length > 0){
						this.left.forEach((item,index)=>{
							if(item.id == this.prizeRecord4.id){
								this.left.splice(index, 1);
							}
						})
						this.prizeRecordSingle = [this.prizeRecord1, this.prizeRecord2, this.prizeRecord3, this.prizeRecord4];
					}
					//第五列
					if(this.prizeRecordList5 !== undefined && this.prizeRecordList5.length > 0){
						this.left.forEach((item,index)=>{
							if(item.id == this.prizeRecord5.id){
								this.left.splice(index, 1);
							}
						})
						this.prizeRecordSingle = [this.prizeRecord1, this.prizeRecord2, this.prizeRecord3, this.prizeRecord4, this.prizeRecord5];
					}
					
					let prizeRecord_ = `prizeRecord_${this.id}`;
					if(window.localStorage.getItem("prizeRecordTotal") != null){
						this.prizeRecordTotal = JSON.parse(window.localStorage.getItem("prizeRecordTotal"));
					}
					this.prizeRecordTotal.push({
						key: prizeRecord_,
						prizeRecord: this.prizeRecordSingle
					})
					window.localStorage.setItem('prizeRecord_'+this.id, JSON.stringify(this.prizeRecordSingle));
					window.localStorage.setItem('list', JSON.stringify(this.left));
					window.localStorage.setItem('prizeRecordTotal', JSON.stringify(this.prizeRecordTotal));
					if(this.reset == 1){
						this.prizeFlag = 2;
					}else{
						this.prizeFlag = 0;
					}
				}, 100);
			},
			reRollRedPocket() {
				if(this.reset == 1){
					this.$confirm('您是否要重置本轮抽奖?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '重置本轮抽奖成功!'
						});
						this.prizeFlag = 0;
						let prizeRecord_ = `prizeRecord_${this.id}`;
						let prizeRecordStorage = JSON.parse(window.localStorage.getItem(prizeRecord_))
						if(prizeRecordStorage != null){
							prizeRecordStorage
							prizeRecordStorage.forEach(item=>{
								this.left.push(item);
							})
							window.localStorage.setItem('list', JSON.stringify(this.left));
							this.prizeRecordTotal = JSON.parse(window.localStorage.getItem('prizeRecordTotal'))
							this.prizeRecordTotal.splice(this.prizeRecordTotal.length-1,1)
							window.localStorage.setItem('prizeRecordTotal', JSON.stringify(this.prizeRecordTotal));
						}
					}).catch(() => {
								 
					});
				}
			}
		}
	}
</script>

<style>
	@import '../common/common.css';
</style>