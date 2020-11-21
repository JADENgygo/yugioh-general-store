<template>
	<div class="uk-container">
		<div uk-grid class="uk-grid-small uk-child-width-1-3">
			<div v-for="i in 6">
				<img v-bind:src="cardPaths[cardIndices[i - 1]]" v-on:click="openCard(cardIndices[i - 1])">
			</div>
		</div>
		<div class="uk-margin-top" v-if="opened">
			<div>占いの結果</div>
			<div>{{ result['summary'] }}<br>{{ result['number'] }}<br>{{ result['color'] }}<br>{{ result['item'] }}<br>{{ result['advice'] }}</div>
			<button class="uk-margin-top uk-button uk-button-default uk-button-small" v-on:click="reset()">もう一度占う</button>
		</div>
	</div>
</template>
<script>
export default {
	data: function() {
		return {
			//frontCardPaths: [require('./img/card_front0.webp'), require('./img/card_front1.webp'), require('./img/card_front2.webp'), require('./img/card_front3.webp'), require('./img/card_front4.webp'), require('./img/card_front5.webp')],
			cardPaths: [require('./img/card_back0.webp'), require('./img/card_back1.webp'), require('./img/card_back2.webp'), require('./img/card_back3.webp'), require('./img/card_back4.webp'), require('./img/card_back5.webp')],
			cardIndices: [0, 1, 2, 3, 4, 5].sort((a, b) => Math.random() - 0.5),
			opened: false,
			descriptions: [
				{'summary': 'このカードをドローした今日のあなたの運勢は、スーパーハッピー！',
				 'number': 'ラッキーナンバーは、１。',
				 'color': 'ラッキーカラーは、黄色。',
				 'item': 'ラッキーアイテムは、光るチャーム。',
				 'advice': '願いは何でもかなっちゃう！！' },
				{'summary': 'このカードをドローした今日のあなたの運勢は、ベリーハッピー！',
				 'number': 'ラッキーナンバーは、２。',
				 'color': 'ラッキーカラーは、赤。',
				 'item': 'ラッキーアイテムは、金魚。',
				 'advice': '楽しいことがおこるかも♪' },
				{'summary': 'このカードをドローした今日のあなたの運勢は、まあまあね。',
				 'number': 'ラッキーナンバーは、３。',
				 'color': 'ラッキーカラーは、緑。',
				 'item': 'ラッキーアイテムは、植物。',
				 'advice': '無くした物が見つかるかもよ。' },
				{'summary': 'このカードをドローした今日のあなたの運勢は、ちょっと悪いかも。',
				 'number': 'ラッキーナンバーは、４。',
				 'color': 'ラッキーカラーは、青。',
				 'item': 'ラッキーアイテムは、傘。',
				 'advice': '東に向かうと運が向いてくるかもね。'},
				{'summary': 'このカードをドローした今日のあなたの運勢は、アンハッピ～。',
				 'number': 'ラッキーナンバーは、５。',
				 'color': 'ラッキーカラーは、紫。',
				 'item': 'ラッキーアイテムは、サングラス。',
				 'advice': '落し物に注意して！'},
				{'summary': 'このカードをドローした今日のあなたの運勢は、スーパーピンチ！',
				 'number': 'ラッキーナンバーは、６。',
				 'color': 'ラッキーカラーは、黒。',
				 'item': 'ラッキーアイテムは、革靴。',
				 'advice': 'ライバルに差をつけられちゃうかも！がんばれ！'}
			],
			result: {},
		};
	},
	methods: {
		openCard: function(index) {
			if (this.opened) {
				return;
			}
			this.opened = true;
			this.$set(this.cardPaths, index, require(`./img/card_front${index}.webp`));
			this.result = this.descriptions[this.cardIndices[index]];
		},
		reset: function() {
			this.cardIndices = [0, 1, 2, 3, 4, 5].sort((a, b) => Math.random() - 0.5);
			this.opened = false;
			for (let i = 0; i < this.cardPaths.length; ++i) {
				this.$set(this.cardPaths, i, require(`./img/card_back${this.cardIndices[i]}.webp`));
			}
		}
	},
}
</script>
