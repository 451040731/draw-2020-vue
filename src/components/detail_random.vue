<template>
	<div class="content">
		<div class="child-page-bg">
			<div class="prize-area">
				<div class="name">{{name}}: {{prize}}</div>
			</div>
			<div class="winner-area">
				<div class="winner-con">
					<div v-for="(person,index) in prizeRecord" :key="index" class="avatar-con">
						<div class="avatar-bg">
							<transition name="flip-list" mode="out-in" tag="div">
								<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
							</transition>
						</div>
						<span v-if="person && person.name" v-text="person.name" class="winner-info"></span>
					</div>
				</div>
			</div>
			<div class="prize-btn">
				<button v-if="prizeFlag == 0" @click="rollRedPocket()" v-text="str.roll" class="button"></button>
				<button v-else-if="prizeFlag == 1" @click="stopRollRedPocket()" v-text="str.stop" class="button"></button>
				<button v-else @click="reRollRedPocket()" v-text="str.restart" class="button"></button>
			</div>
			<router-link to="/"><button class="backToHome" v-text="str.back"></button></router-link>
		</div>
	</div>
</template>

<script>
	import str from '../common/str.js';
	import * as api from '../api/index.js';

	export default {
		name: 'cheng2',
		data() {
			return {
				id: Number,
				name: '',
				number: Number,
				admin: '',
				prize: '',
				str: str,
				left: [],
				prizeRecord: [],
				prizeFlag: 2,
				prizeTimer: null
			}
		},
		created(){
			this.id = Number(this.$route.query.id);
			this.number = Number(this.$route.query.number);
			this.name = this.$route.query.name;
			this.prize = this.$route.query.prize;
			this.admin = this.$route.query.admin;
			if(this.admin == 'voopoo123'){
				this.prizeFlag = 2;
			}else{
				this.prizeFlag = 0;
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
			this.prizeRecord = JSON.parse(window.sessionStorage.getItem('prizeRecord_'+this.id));
			if (!this.prizeRecord) {
				this.prizeRecord = new Array(this.number);
				if(this.admin == 'voopoo123'){
					this.prizeFlag = 2;
				}else{
					this.prizeFlag = 0;
				}
			}
			
		},
		methods: {
			rollRedPocket() {
				this.prizeFlag = 1;
				this.left = api.shuffle(this.left);
				this.prizeRecord = this.left.slice(0, this.number);
				this.prizeTimer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.prizeRecord = this.left.slice(0, this.number);
				}, 100);
			},
			stopRollRedPocket() {
				clearInterval(this.prizeTimer);
				setTimeout(() => {
					this.prizeRecord = api.pick(this.left, this.number)
					console.log(this.prizeRecord)
					window.sessionStorage.setItem('prizeRecord_'+this.id, JSON.stringify(this.prizeRecord));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					if(this.admin == 'voopoo123'){
						this.prizeFlag = 2;
					}else{
						this.prizeFlag = 0;
					}
				}, 100);
			},
			reRollRedPocket() {
				if(this.admin == 'voopoo123'){
					this.$confirm('您是否要重置本次抽奖?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '重置成功!'
						});
						this.prizeFlag = 0;
						this.left = [...this.left, ...this.prizeRecord];
						window.sessionStorage.setItem('list', JSON.stringify(this.left));
						this.prizeRecord = new Array(this.number);
						window.sessionStorage.removeItem('prizeRecord_'+this.id);
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