<template>
	<div class="uk-container">
		<div class="uk-margin-bottom">
			<label>
				<div>デッキ枚数</div>
				<select class="uk-select uk-form-width-small uk-form-small" v-model="deckCount">
					<option v-for="i in 41">{{ 19 + i }}</option>
				</select>
			</label>
		</div>
		<div class="uk-margin-bottom">
			<label>
				<div>初期手札枚数</div>
				<select class="uk-select uk-form-width-small uk-form-small" v-model="handCount">
					<option>4</option>
					<option>5</option>
				</select>
			</label>
		</div>
		<div class="uk-margin-bottom">
			<label>
				<div>キーカード枚数</div>
				<select class="uk-select uk-form-width-small uk-form-small" v-model="keyCardCount">
					<option v-for="i in 60">{{ i }}</option>
				</select>
			</label>
		</div>
		<div class="uk-margin-bottom">
			<label>
				<div>ドローしたいキーカード最低枚数</div>
				<select class="uk-select uk-form-width-small uk-form-small" v-model="expectedKeyCardCount">
					<option v-for="i in 60">{{ i }}</option>
				</select>
			</label>
		</div>
		<button class="uk-button uk-button-default uk-button-small uk-margin-bottom" v-on:click="calcProbability">計算</button>
		<canvas id="canvas"></canvas>
	</div>
</template>
<script>
import Chart from 'chart.js';

export default {
	mounted: function() {
		for (let i = 0; i <= this.deckCount - this.handCount; ++i) {
			this.probabilities.push(0.0);
		}
		this.showChart(this.deckCount, this.handCount, this.probabilities);
	},
	data: function() {
		return {
			deckCount: 20,
			handCount: 4,
			keyCardCount: 1,
			expectedKeyCardCount: 1,
			probabilities: [],
			graph: null
		};
	},
	methods: {
		showChart: function(deckNum, handNum, probabilities) {
			let labels = [];
			for (let i = 0; i <= deckNum - handNum; ++i) {
				labels.push(i.toString());
			}
			const canvas = document.getElementById('canvas');
			this.graph = new Chart(canvas, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [{
						data: probabilities,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1
					}]
				},
				options: {
					aspectRatio: 1,
					legend: {
						display: false
					},
					scales: {
						xAxes: [{
							scaleLabel: {
								display: true,
								labelString: "ドロー枚数"
							}
						}],
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: 'ドロー確率 (%)'
							},
							ticks: {
								beginAtZero: true,
								min: 0,
								max: 100
							}
						}]
					}
				}
			});
		},
		calcProbability: function() {
			this.deckCount = parseInt(this.deckCount);
			this.handCount = parseInt(this.handCount);
			this.keyCardCount = parseInt(this.keyCardCount);
			this.expectedKeyCardCount = parseInt(this.expectedKeyCardCount);
			this.probabilities = [];
			for (let hand = this.handCount; hand <= this.deckCount; ++hand) {
				if (this.deckCount < this.keyCardCount) {
					this.probabilities.push(0.0);
					continue;
				}
				let hit = 0.0;
				const lowerHitCount = this.expectedKeyCardCount;
				const upperHitCount = this.keyCardCount < hand ? this.keyCardCount : hand;
				for (let hitCount = lowerHitCount; hitCount <= upperHitCount; ++hitCount) {
					let tempHit = 1.0;
					for (let n = 0; n < hitCount; ++n)
					{
						tempHit *= 1.0 * (this.keyCardCount - n) / (this.deckCount - n);
					}
					let tempNoHit = 1.0;
					for (let n = 0; n < hand - hitCount; ++n) {
						tempNoHit *= 1.0 * ((this.deckCount - hitCount - n) - (this.keyCardCount - hitCount)) / (this.deckCount - hitCount - n);
					}
					hit += (tempHit * tempNoHit) * this.c(hand, hitCount);
				}
				this.probabilities.push(hit * 100);
			}
			this.updateChart(this.deckCount, this.handCount, this.probabilities);
		},
		c: function(n, r) {
			let numerator = 1;
			for (let i = 0; i < r; ++i) {
				numerator *= n - i;
			}
			let denominator = 1;
			for (let i = 0; i < r; ++i) {
				denominator *= r - i;
			}
			return 1.0 * numerator / denominator;
		},
		updateChart: function(deckNum, handNum, probabilities) {
			let labels = [];
			for (let i = 0; i <= deckNum - handNum; ++i) {
				labels.push(i.toString());
			}
			this.graph.data.labels = labels;
			this.graph.data.datasets[0].data = probabilities;
			this.graph.update();
		}
	},
}
</script>
<style scoped>
</style>
