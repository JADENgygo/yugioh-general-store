document.addEventListener('DOMContentLoaded', () => {
	const host = {
		mounted: function() {
			window.addEventListener('resize', () => this.pc = window.matchMedia("(min-width: 768.02px)").matches);
			this.activateNavigation();
		},
		beforeUpdate: function() {
			this.activateNavigation();
		},
		data: function() {
			return {
				active: [false, false, false, false, false, false],
				pc: window.matchMedia("(min-width: 768.02px)").matches
			};
		},
		methods: {
			activateNavigation: function() {
				for (let i = 0; i < this.active.length; ++i) {
					this.$set(this.active, i, false);
				}
				switch (this.$route.path) {
					case '/':
						this.$set(this.active, 0, true);
						break;
					case '/calendar':
						this.$set(this.active, 1, true);
						break;
					case '/quote':
						this.$set(this.active, 2, true);
						break;
					case '/fortune-telling':
						this.$set(this.active, 3, true);
						break;
					case '/probability':
						this.$set(this.active, 4, true);
						break;
					case '/link':
						this.$set(this.active, 5, true);
						break;
					default:
						break;
				}
			},
			closeNavigation: function() {
				UIkit.offcanvas('#navigation-menu').hide();
			}
		},
		template: `
			<div>
				<!-- PC向け -->
				<div v-if="pc">
					<nav class="uk-navbar-container" uk-navbar>
						<div class="uk-navbar-center">
							<ul class="uk-navbar-nav">
								<li><router-link to="/"><span class="title uk-text-large uk-text-lead uk-text-bold">遊戯王の雑貨屋</span></router-link></li>
							</ul>
						</div>
					</nav>
					<div uk-grid class="uk-margin-top">
						<div class="uk-width-auto uk-margin-left">
							<ul class="uk-nav uk-nav-primary">
								<li class="uk-active"><a>ラインナップ</a></li>
								<li v-bind:class="{'uk-active': active[0]}"><router-link to="/"><span uk-icon="home"></span> トップページ</router-link></li>
								<li v-bind:class="{'uk-active': active[1]}"><router-link to="/calendar"><span uk-icon="calendar"></span> カレンダー</router-link></li>
								<li v-bind:class="{'uk-active': active[2]}"><router-link to="/quote"><span uk-icon="comments"></span> セリフ集</router-link></li>
								<li v-bind:class="{'uk-active': active[3]}"><router-link to="/fortune-telling"><span uk-icon="star"></span> カード占い</router-link></li>
								<li v-bind:class="{'uk-active': active[4]}"><router-link to="/probability"><span uk-icon="pencil"></span> ドロー確率計算機</router-link></li>
								<li v-bind:class="{'uk-active': active[5]}"><router-link to="/link"><span uk-icon="link"></span> リンク</router-link></li>
							</ul>
						</div>
						<div class="uk-width-expand uk-margin-left uk-margin-right uk-margin-bottom">
							<router-view></router-view>
						</div>
					</div>
				</div>
				<!-- モバイル向け -->
				<div v-else>
					<nav class="uk-navbar-container" uk-navbar>
						<div class="uk-navbar-left">
							<a class="uk-navbar-toggle" uk-navbar-toggle-icon href="" uk-toggle="target: #navigation-menu"></a>
						</div>
						<div class="uk-navbar-center">
							<ul class="uk-navbar-nav">
								<li><router-link to="/"><span class="title uk-text-large uk-text-lead uk-text-bold">遊戯王の雑貨屋</span></router-link></li>
							</ul>
						</div>
					</nav>
					<div id="navigation-menu" uk-offcanvas="overlay: true">
						<div class="uk-offcanvas-bar">
							<button class="uk-offcanvas-close" type="button" uk-close></button>
							<ul class="uk-nav uk-nav-primary">
								<li class="uk-active"><a>ラインナップ</a></li>
								<li v-bind:class="{'uk-active': active[0]}" v-on:click="closeNavigation()"><router-link to="/"><span uk-icon="home"></span> トップページ</router-link></li>
								<li v-bind:class="{'uk-active': active[1]}" v-on:click="closeNavigation()"><router-link to="/calendar"><span uk-icon="calendar"></span> カレンダー</router-link></li>
								<li v-bind:class="{'uk-active': active[2]}" v-on:click="closeNavigation()"><router-link to="/quote"><span uk-icon="comments"></span> セリフ集</router-link></li>
								<li v-bind:class="{'uk-active': active[3]}" v-on:click="closeNavigation()"><router-link to="/fortune-telling"><span uk-icon="star"></span> カード占い</router-link></li>
								<li v-bind:class="{'uk-active': active[4]}" v-on:click="closeNavigation()"><router-link to="/probability"><span uk-icon="pencil"></span> ドロー確率計算機</router-link></li>
								<li v-bind:class="{'uk-active': active[5]}" v-on:click="closeNavigation()"><router-link to="/link"><span uk-icon="link"></span> リンク</router-link></li>
							</ul>
						</div>
					</div>
					<div class="uk-margin-top uk-margin-bottom">
						<router-view></router-view>
					</div>
				</div>
			</div>
		`
	};
	const topPage = {
		template: `
			<div class="uk-container">
				<div>
					<p>遊戯王の雑貨屋です。遊戯王の雑貨を置いています。</p>
					<ul class="uk-list">
						<li>ツイッター: <a href="https://twitter.com/oJADENo" class="uk-link-muted">@oJADENo</a></li>
						<li>インスタグラム: <a href="https://www.instagram.com/ojadeno/" class="uk-link-muted">@ojadeno</a></li>
					</ul>
				</div>
			</div>
		`
	};
	const calendar = {
		data: function() {
			return {
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				day: ['日', '月', '火', '水', '木', '金', '土'],
				message: {
					'1-1': 'デイビット・ラブの誕生日',
					'1-2': '遊☆戯☆王デュエルモンスターズ 光のピラミッド テレビ放送 (2005)',
					'1-11': 'ジャック・アトラスの誕生日',
					'1-23': '10thアニバーサリー 劇場版 遊☆戯☆王 ~超融合!時空を越えた絆~ 公開日 (2010)',
					'1-25': '城之内 克也の誕生日',
					'2-5': 'アモン・ガラムの誕生日',
					'2-28': '御伽 龍児の誕生日',
					'3-1': '梶木 漁太の誕生日',
					'3-6': '劇場版「遊☆戯☆王」 公開日 (1999)',
					'3-8': '遊☆戯☆王 連載終了 (2004)',
					'3-14': 'ジェームス(ジム)・クロコダイル・クックの誕生日',
					'3-23': '遊☆戯☆王ZEXAL 放送終了 (2014)',
					'3-26': '遊☆戯☆王デュエルモンスターズGX 放送終了 (2008) / 遊☆戯☆王ARC-V 放送終了 (2017)',
					'3-29': 'オースチン・オブライエンの誕生日',
					'3-30': "遊☆戯☆王5D's 放送終了 (2011)",
					'4-1': 'エスパー絽場の誕生日 / 龍牙 の誕生日',
					'4-2': "遊☆戯☆王5D's 放送開始 (2008)",
					'4-4': '遊☆戯☆王 (アニメ第1作) 放送開始 (1998) / 遊☆戯☆王SEVENS 放送開始 (2020)',
					'4-5': 'イシズ・イシュタールの誕生日',
					'4-6': '遊☆戯☆王ARC-V 放送開始 (2014)',
					'4-11': '遊☆戯☆王ZEXAL 放送開始 (2011)',
					'4-12': '三沢 大地の誕生日',
					'4-18': '遊☆戯☆王デュエルモンスターズ 放送開始 (2000)',
					'4-20': '本田 ヒロトの誕生日',
					'4-23': '遊☆戯☆王 THE DARK SIDE OF DIMENSIONS 公開日 (2016)',
					'5-5': '天上院 明日香の誕生日',
					'5-10': '遊☆戯☆王VRAINS 放送開始 (2017)',
					'6-4': '武藤 遊戯の誕生日 / 伊集院 セクトの誕生日',
					'6-6': 'ゴースト骨塚の誕生日',
					'6-11': 'ヨハン・アンデルセンの誕生日',
					'6-20': '龍亞の誕生日, 龍可の誕生日',
					'6-21': 'エビフライの日',
					'7-7': '不動 遊星の誕生日 / 海馬 モクバの誕生日',
					'7-10': '響 みどりの誕生日',
					'7-21': 'インセクター羽蛾の誕生日',
					'8-1': '万丈目 準の誕生日',
					'8-12': 'キース・ハワードの誕生日',
					'8-13': '遊☆戯☆王デュエルモンスターズ 光のピラミッド 公開日 (2004)',
					'8-16': '十六夜 アキの誕生日',
					'8-18': '真崎 杏子の誕生日',
					'8-21': 'レクス・コドウィンの誕生日',
					'8-31': '遊城 十代の誕生日',
					'9-2': '獏良 了の誕生日',
					'9-6': 'クロウ・ホーガンの誕生日',
					'9-16': '遊☆戯☆王 連載開始 (1996)',
					'9-25': '丸藤 翔の誕生日 / 遊☆戯☆王VRAINS 放送終了 (2019)',
					'9-29': '遊☆戯☆王デュエルモンスターズ 放送終了 (2004)',
					'10-4': '武藤 双六の誕生日',
					'10-6': '遊☆戯☆王デュエルモンスターズGX 放送開始 (2004)',
					'10-8': 'ペガサス・J・クロフォードの誕生日',
					'10-10': 'レジー・マッケンジーの誕生日 / 遊☆戯☆王 (アニメ第1作) 放送終了 (1998)',
					'10-25': '海馬 瀬人の誕生日',
					'10-31': '天上院 吹雪の誕生日',
					'11-1': '丸藤 亮の誕生日 / 鬼柳 京介の誕生日',
					'11-4': '響 紅葉の誕生日',
					'11-18': 'リシドの誕生日',
					'11-20': '孔雀 舞の誕生日',
					'12-14': '骸骨騎士の誕生日',
					'12-19': 'エド・フェニックスの誕生日',
					'12-23': 'マリク・イシュタールの誕生日',
					'12-29': 'ダイナソー竜崎の誕生日'
				}
			};
		},
		template: `
			<div class="uk-container">
				<ul uk-tab>
					<li class="uk-disabled">{{ year }}</li>
					<li v-for="i in 12" v-bind:key="i" v-bind:class="{'uk-active': i === month}"><a href="#">{{ i }}</a></li>
				</ul>
				<ul class="uk-switcher">
					<!-- なぜかuk-activeを付けないと初期表示されない -->
					<li v-for="m in 12" v-bind:key="m" v-bind:class="{'uk-active': month === m}">
						<table class="uk-table uk-table-justify uk-table-small uk-table-divider">
							<tbody>
								<tr v-for="d in new Date(year, m, 0).getDate()" v-bind:key="d" v-bind:class="{today: year === new Date().getFullYear() && m === new Date().getMonth() + 1 && d === new Date().getDate()}">
									<td>{{ d }} ({{ day[new Date(year, m - 1, d).getDay()] }})</td>
									<td>{{ message[m + '-' + d] }}</td>
								</tr>
							</tbody>
						</table>
					</li>
				</ul>
			</div>
		`
	};
	const quote = {
		data: function() {
			return {
				titles: ['DM', 'GX', "5D's", 'ZEXAL', 'ARC-V', 'VRAINS', 'SEVENS'],
				sounds: [
					['あ', 'い', 'う', 'え', 'お'],
					['か', 'き', 'く', 'け', 'こ'],
					['さ', 'し', 'す', 'せ', 'そ'],
					['た', 'ち', 'つ', 'て', 'と'],
					['な', 'に', 'ぬ', 'ね', 'の'],
					['は', 'ひ', 'ふ', 'へ', 'ほ'],
					['ま', 'み', 'む', 'め', 'も'],
					['や', 'ゆ', 'よ'],
					['ら', 'り', 'る', 'れ', 'ろ'],
					['わ']
				],
				quotes: [
					[['相棒が、友が力を貸してくれたのさ。 (遊戯)',
					  'ありがとう、俺のデッキ。お前達こそが、俺が築き上げてきた絆の全て。 (十代)',
					  'アキ、笑顔を忘れるな。お前の笑顔は世界の誰にも負けない。 (遊星)',
					  '諦めたら人の心は死んじゃうんだよ。 (遊馬)',
					  'アカデミアか。 (黒咲)',
					  '現れろ、未来を導くサーキット。 (Playmaker)'],
					 ['今は敗れて、憎しみに打ち勝て。 (遊戯)',
					  '一度地獄に落ちて、そこから這い上がって来てみろ。貴様にそれができるか。 (万丈目)',
					  '今、全てを無くしてようやく気付いた。俺の心の奥底で、俺を支えていたものに。 (ジャック)',
					  'イラッとくるぜ。 (シャーク)',
					  '一流は一流を知る。お前も一流になれ遊矢。ペンデュラムという扉を最初に開いた人間として、後に続く者たちの模範となれ。 (塾長)',
					  'Into the VRAINS. (遊作)'],
					 ['美しい。 (海馬)',
					  '運命に平伏せ。泣いて許しを請うが良い。 (破滅の光)',
					  'ヴァルハランダー、パワー全開。 (ドラガン)',
					  '運、運ってなぁ、気に入らねぇんだよ。運があろうとなかろうと、全ての力を出しきって闘う。それがデュエルだ。俺はそう、父ちゃんに教えてもらった。 (遊馬)',
					  '薄ら笑いはどうした。少しは狩られる者の気持ちが分かったか。 (黒咲)',
					  '運もまた私の一部なのだ。 (ボーマン)'],
					 ['エアトスは不滅だ。 (ラフェール)',
					  'E･HERO ネオスは、宇宙の波動を受けてネオスペーシアンとコンタクトできる唯一無二、奇跡のE･HEROなのさ。 (十代)',
					  'えらい張り切りボーイがやって来たじゃねぇか。 (クラッシュタウンの住人)',
					  'え、これは、お菓し状。 (遊馬)',
					  'LDS、ならば俺が相手だ。 (黒咲)',
					  'AIは祈ったりしない。するのは勝つための計算だけだ。 (Ai)'],
					 ['俺のターン、ドロー。 (遊戯)',
					  '俺の名は、一、十、百、千、万丈目サンダー。 (万丈目)',
					  'おい、デュエルしろよ。 (遊星)',
					  '俺と、私で、オーバーレイ。 (遊馬、アストラル)',
					  'お楽しみはこれからだ。 (遊矢)',
					  '俺の復讐に引きずられて闇に落ちる必要はない。お前達は光差す場所を歩いてくれ。 (Playmaker)']],
					[['過去の無いやつに未来は訪れはしない。過去が積み重なって今があり、そして未来へ続いていく。どんな過去も無意味なんかじゃない。全ては今の、そして未来の自分へと繋がっているんだ。 (遊戯)',
					  'ガッチャ、楽しいデュエルだったぜ。 (十代)',
					  'カーリー、この命、一度はお前に救われた様なもの。 (ジャック)',
					  'かっとビングだ、俺。 (遊馬)',
					  '家族とは、デュエリストではないのか。 (セレナ)',
					  '勝っても負けても、いつまでも戦っていたい。そんなデュエルもある。 (Playmaker)'],
					 ['きたねえ手でパズルにさわんじゃねえ。 (遊戯)',
					  '今日は、エビフライの日だったっけ。 (十代)',
					  '恐怖は人の可能性を小さくする。闇はその事を知った上で忍び寄ってくる。 (アンチノミー)',
					  '絆結ばれし時、力と心が一つとなり、光の奇跡と伝説が生まれる。エクシーズ・チェンジ、ZEXAL。 (ZEXALⅢ)',
					  '貴様らのデュエルには、鉄の意志も鋼の強さも感じられない。 (黒咲)',
					  '君達は私に理解できない多様性を持っている。エラーコードを突然変異と考えれば、そこには未知なる進化の可能性があるだろう。私には認められないがね。 (ライトニング)'],
					 ['クリボーが勝手に。 (遊戯)',
					  'クロノス先生は強いぜ。戦った俺が言うんだ、間違いない。 (十代)',
					  'クリアマインド。 (遊星)',
					  '来るぞ遊馬。 (アストラル)',
					  '来るぞ遊矢。 (ユート)',
					  '草薙さん、俺はあなたとの約束を守る。 (Playmaker)'],
					 ['結束の力は、どんなに厚い壁でも越えて見せるぜ。 (遊戯)',
					  '権力を握った英雄は何かしら罪を犯している。俺はお前の父親を殺し、英雄になった。俺は選ばれた者である事を証明した。 (DD)',
					  '',
					  '',
					  '',
					  ''],
					 ['この闘いの先に君が探し求めていた大切なものがあるなら、僕は君と共に闘う。 (遊戯)',
					  'このドローに、全てを賭ける。 (十代)',
					  'ここから先は、俺達が創り出す未来。走り続けようぜ皆、人生という名のライディングデュエルを。 (遊星)',
					  '混沌の具現たる軍神よ、切なる望みを我が元へ。集え、七皇の力、CX 冀望皇バリアン。 (ナッシュ)',
					  '心まで守備表示になってたら、楽しいデュエルなんかできるはずない。 (遊矢)',
					  'ご主人様のお部屋に戻ってお掃除するです。それが、おいらの一番幸せな時間なんです。ご主人様のお部屋には、おいらの幸せな思い出がいっぱいあるです。 (ロボッピ)']],
					[['さあラーよ、地より蘇生し天を舞え。炎を纏いし不死鳥となりて。 (マリク)',
					  '最強のデッキ、最強のデュエリスト。これで燃えて来なけりゃ、俺は偽物のデュエリストだぜ。 (十代)',
					  '雑魚だったろ、相手。 (遊星)',
					  '最強デュエリストのデュエルは全て必然。ドローカードさえも、デュエリストが創造する。 (ZEXAL)',
					  'さあ、ハンティングゲームの時間だ。 (デニス)',
					  'さあ行こうか、地獄のデュエルの始まりだ。 (リボルバー)'],
					 ['城之内君、大好きだ。 (遊戯)',
					  'シャケ召喚。 (十代)',
					  'シャトルの中に隠れるのよ。 (シェリー)',
					  '真の絆で結ばれし二人の心が重なった時、語り継ぐべき奇跡が現れる。エクシーズ・チェンジ、ZEXAL。 (ZEXLAⅡ)',
					  '邪魔しに参った。 (日影)',
					  '紫電一閃、未知なる力が飛竜乗雲となる。シンクロ召喚、降臨せよ、サイバース・クアンタム・ドラゴン。 (Playmaker)'],
					 ['すまねえ、もうお前の顔さえ見えねえ。 (城之内)',
					  'すまなかったな、俺のデッキよ。俺はお前を信じるぜ。だから俺に、お前の力を貸してくれ。 (橘)',
					  'すごい。通常のデュエルなのに、サイコデュエルとも違う。このスピードが与える、心にまで響くエモーションは、何なの。 (アキ)',
					  '全ての光よ、力よ、我が右腕に宿り、希望の道筋を照らせ、シャイニング・ドロー。 (ZEXAL)',
					  '過ぎたる情けは相手への侮辱に等しい。言ったはずだぞ、遊矢。親友だからこそ俺は全力でお前を倒すと。お前も要らぬ情など捨て去り、全力でかかってこんか。 (権現坂)',
					  'スキル発動、ストームアクセス。 (Playmaker)'],
					 ['背負うから勝てるんだ。城之内くんがそうだったようにな。 (遊戯)',
					  '絶望か、虫けらも絶望するか。ならば、もっと味わわせてやろう。虫けらの仲間が死にゆく姿を、たっぷりと見せてからお前を死なせてやる。 (ズール)',
					  'セキュリティは信用しない。だが、デュエリストならば話は別だ。あんたはこのデュエルに乗った。信用してやるよ。 (遊星)',
					  '生と死の狭間を彷徨いし魂よ、暗黒に澱みし恨みをこの地で晴らせ。エクシーズ召喚、現れろランク8 No.23、冥界の霊騎士ランスロット。 (八雲)',
					  '戦場に咲きし一輪の花よ、散れ。 (セルゲイ)',
					  '絶望とは、おさらばだ。 (Soulburner)'],
					 ['それはどうかな。 (遊戯)',
					  'その言葉、のし付けて、リボンかけて、化粧箱に詰めて、紙袋に入れて返すよ。 (翔)',
					  'そのDホイール、どこから盗んだ。 (牛尾)',
					  'そんなことは俺の管轄外だ。 (カイト)',
					  'それズルじゃん。 (少年)',
					  '底知れぬ絶望の淵へ沈め。 (リボルバー)']],
					[['ダーツ、答えてやる。なぜこの俺が、全てを失った俺が3000年の時を超え、この世界に蘇ったのか。それは、巡り合った仲間によって生まれ変わるため。お前を倒し、世界の未来を変えるためだ。 (名もなきファラオ)',
					  '例え闇のデュエルに敗れたとしても、闇は光を凌駕できない。そう信じて、決して心を折らぬ事。私と約束してくだサイ。 (クロノス先生)',
					  'だが俺はレアだぜ。 (遊星)',
					  '立て、勝つぞ。 (アストラル)',
					  '例え絶体絶命の崖っぷちに追い込まれようとも俺は屈しない。俺一人のためではない。貴様のためにも。 (黒咲)',
					  '端的に言うなら、お金で雇われる魅惑の謎の美女ってところかしら。 (ゴーストガール)'],
					 ['力とは、こう言う事だ。 (海馬)',
					  '力とは、自分の欲望を満たすためのものじゃない。大いなる使命を果たすためのものなんだ。 (十代)',
					  'チーム・サティスファクションの復活だ。 (鬼柳)',
					  '違う。俺はこれまで一度だって、ハルトを俺の苦しみだと思った事などない。あいつは、ハルトは、俺の全てだ。生き甲斐だ。あいつは俺に希望を与え続けてくれた。俺は諦めない。俺のことも、ハルトのことも。 (カイト)',
					  '地を司る悪魔よ、大地を掴む悪魔よ、今、雌雄一つとなりて大いなる大地の底より来れ。融合召喚、現れよ、レベル10、地縛戒隷ジオグラシャ=ラボラス。 (セルゲイ)',
					  ''],
					 ['つき落としてやろうか、ククク。 (遊戯)',
					  'ツヴァインシュタイン博士の言う通り、デュエルは美しい。それは博士の言う論理的なデッキと、十代の奇跡のドロー。論理と直感、その矛盾する二つが統一されたものがデュエルだからだ。 (三沢)',
					  '集いし願いが、新たに輝く星となる、光さす道となれ。シンクロ召喚、飛翔せよ、スターダスト・ドラゴン。 (遊星)',
					  '九十九遊馬をなめんじゃねえ。 (ギラグ)',
					  '月明かりに舞い踊る美しき野獣よ、紫の毒持つ蝶よ、月の引力により渦巻きて新たなる力と生まれ変わらん。融合召喚、現れ出でよ、月光の原野に舞い踊るしなやかなる野獣、月光舞豹姫。 (セレナ)',
					  ''],
					 ['デュエルスタンバイ。 (杏子)',
					  'デッキが何を望んでいるのかよく聞いてさ、お前とデッキとで作り上げていくしかないんじゃないか。 (十代)',
					  '電気は点けないで。ここで待ってたら色々なことを思い出して。今の顔は見せられない。 (アキ)',
					  'ディスティニー・シャイニング・ドロー。 (ZEXALⅢ)',
					  'デュエルで、笑顔を。 (ユート)',
					  'データストーム解放。 (Ai)'],
					 ['トムの勝ちデース。 (ペガサス)',
					  'ドローは偶然なんかじゃない。デュエルモンスターと心が通じ合ったとき、起こる奇跡なんだ。(十代)',
					  'どうしてDホイールと合体しないんだ。 (遊星)',
					  '遠き2つの魂が交わるとき、語り継がれし力が現れる。 (アストラル)',
					  'どんなカードにも役割はある。俺は信じてる、思いを受け止めれば必ずカードは応えてくれる。 (遊矢)',
					  '閉ざされし世界を貫く我が新風。リンク召喚、現れろ、リンク4、ヴァレルロード・ドラゴン。 (リボルバー)']],
					[['ならサ店に行くぜ。 (遊戯)',
					  'ならば見せてやる、落ちこぼれの意地を。 (万丈目)',
					  'なあシェリー、今からでも遅くねえ。俺達と一緒に未来を変えようぜ。 (クロウ)',
					  '仲間が居て、一つになって、そんで二倍も三倍も、すっげー力が生まれるんだ。皆で生きてるから楽しいんだ、面白いんじゃねえのかよ。 (遊馬)',
					  'なぜ瑠璃がここに。逃げたのか、自力で脱出を。 (黒咲)',
					  '何とかしろ遊作。 (草薙)'],
					 ['憎しみを束ねても、それは、脆い。憎しみと怒り、そんなもので勝利の重圧を受け止められるか。 (遊戯)',
					  '偽物は、すぐ見破られるぜ。 (十代)',
					  '憎みきれなかった、お前を。格好悪いよな。こんなんじゃ、満足できねえぜ。 (鬼柳)',
					  '人間は食べては出すという永久コンボをする。しかし、出す瞬間を見られたら死んでしまう。人間は完全なコンボで生きている。 (アストラル)',
					  '逃げるだと。誰が逃げるものか、皆まとめてやっつけてやる。 (セレナ)',
					  '人間には絆という不可思議な力がある。それが集まると、侮れぬ力を発揮する傾向を見せる。無駄なリスクは回避する。 (ライトニング)'],
					 ['',
					  '',
					  'ぬるい、ぬるい、ぬるい、ぬる過ぎる。貴様、キングを舐めているのか。 (偽ジャック)',
					  '',
					  '盗んだのではない、教えを請うたのだ。例え敵であっても、必要とあれば礼を尽くして教えを請う。当然のことだ。 (権現坂)',
					  ''],
					 ['',
					  'ネオス宇宙の新たなるヒーローの誕生だ。 (十代)',
					  '',
					  '',
					  '',
					  ''],
					 ['',
					  'ノンノンノン、それではまるで出しっぱなしのビールではありませんか。 (クロノス先生)',
					  '',
					  '',
					  '',
					  '']],
					[['はっきり言うぜ。羽蛾、お前、弱いだろ。 (遊戯)',
					  'パパン、もういいんだよ。僕はもう一人じゃないから。僕をユベルから開放する為に必死に戦ってくれた、友達がいるんだ。 (マルタン)',
					  '半端な気持ちで入ってくるなよ、デュエルの世界によぉ。 (鬼柳)',
					  'はたしじゅう。 (遊馬)',
					  'はぁ、余裕が無い、冗談言うなよ。こんなデュエル、キャンディ舐めながらだって僕にはできる。 (素良)',
					  '万物を蹴散らす力の壁よ、今竜の牙となりて顕現せよ。エクシーズ召喚、現れよリンク4、ファイアウォール・X・ドラゴン。 (Playmaker)'],
					 ['人の心には、神を超えて信じるべきものがある。俺は、それに従ったまでだ。 (海馬)',
					  'ヒーローにはヒーローに相応しい、戦う舞台ってもんがあるんだ。 (十代)',
					  'びっくりして、カラスと勇気がドッキングしちゃうとこだったよ、もう。 (龍亞)',
					  'ピーマンの恨み、人参の仇、茄子の恨み、きゅうりの願い。 (豊作)',
					  '一人でやってるよ。 (フトシ)',
					  '一つ、俺の復讐は終わった。二つ、このデュエルで俺は運命の奈落を越える。三つ、俺はお前と共に新たな未来を掴む。 (Playmaker)'],
					 ['ファラオだろうが、アテムだろうが、お前は遊戯だ。千年経とうが俺達はずっと仲間だ。 (城之内)',
					  '粉砕、玉砕、大喝采。 (カイバーマン)',
					  'ふざけんじゃねえ。そいつは、スカーレット・ノヴァ・ドラゴンは、ジャックの魂だ。俺達はいつも、シンクロモンスターと共に戦ってきた。お前達に悪く言われる筋合いはねえ。 (クロウ)',
					  'ふざけるなてめえら、いい加減沈めよ、沈めえ。 (IV)',
					  '振り子と同じさ。大きく振れば大きく戻る。デュエルもそうだ。怖がって縮こまっていたら何もできない。勝ちたいなら勇気をもって前に出ろ。その勇気の分だけ喜びも戻ってくる。 (遊勝)',
					  '不屈の霊、夢に非ず。 (不霊夢)'],
					 ['ヘルモスの爪の効果で　ロケット戦士と融合。ロケット・ヘルモス・キャノン。ランドスターの銃士と装備合体。 (城之内)',
					  'ヘルカイザーとなって地獄を彷徨いやっと今、勝利の喜びのためでも敗北の恐怖でもない、この瞬間を輝かせたい。そんな心境に達することができた。 (ヘルカイザー)',
					  '',
					  '',
					  'ペンデュラム召喚。現れろ、俺のモンスター達。 (遊矢)',
					  ''],
					 ['本当の勇気って、どんな時でも自分の手の中で命のチップを守り続けることじゃないの。 (杏子)',
					  'ボーイ、光の、デュエルを。 (クロノス先生)',
					  'ぼ、暴力反対。 (ブルーノ)',
					  '本当に仲間を信じているからこそ、俺は一人なのさ。 (シャーク)',
					  '僕の仮面を外したお礼を、たっぷりさせてもらおう。 (デニス)',
					  '']],
					[['待たせたな、マハード。 (遊戯)',
					  'また一から計算し直しだ。いつかお前を超える、八番目のデッキを作れる様にな。 (三沢)',
					  '守ることは、攻めることより難しい。しかし、それを成してこそキング。 (ジャック)',
					  '眩き希望の光が未来を導く、アルティメット・エクシーズ・チェンジ、ZEXAL。 (ZEXALⅢ)',
					  '負けたやつのことなど誰が気にする。トップスのやつらにとって俺達は、ただの見世物に過ぎない。ゲームの駒は負けた時点で終わりだ。 (シンジ)',
					  ''],
					 ['未来に従うやつに光はない。 (海馬)',
					  '未来に絶望なんてするな。俺達は、まだ何にもやり遂げちゃいないじゃないか。 (十代)',
					  'ミルクでも貰おうか。 (遊星)',
					  'ミザエル、行け、自分の信じる道を。 (カイト)',
					  'みんなを笑顔にって、クククク、そんなの無理に決まってるじゃん。だってデュエルは勝負事だよ。笑えるのは勝った方だけ。 (ユーリ)',
					  ''],
					 ['無駄だよ、言ったろう、神の領域は攻略不可能だと。 (マリク)',
					  'むかつくんだよ、お前の様に憧れだけでヒーローを使うやつが。僕には必要なんだ、やつを倒すために僕に力を与える本当のヒーローが。 (エド)',
					  '無論だ。俺もお前に全てを叩きつける。デュエルに取り憑かれた、このジャック・アトラスの魂を。 (ジャック)',
					  '無理ではない、ライフが1ポイントでも残っている限り、例え心臓が止まってもデュエルを続けるのが真のデュエリスト。 (V)',
					  '胸を打ち鳴らす森の賢人よ、神秘の竜と一つとなりて新たな力を生み出さん。融合召喚、出でよ、野獣の眼光りし獰猛なる竜、ビーストアイズ・ペンデュラム・ドラゴン。 (遊矢)',
					  ''],
					 ['目の前の敵から視線をそらして勝てるほど、デュエルは甘くはないわ。 (舞)',
					  '飯、飯をくれ。 (十代)',
					  '',
					  '',
					  '',
					  ''],
					 ['もっと腕にシルバー巻くとかさ。 (遊戯)',
					  'もうどんなことがあっても忘れない。どんなときでも、素直にデュエルを楽しむ気持ちを。 (十代)',
					  'もう二度と、あんな悲劇は繰り返させない。そのためにも、必ず俺の手でシティを守り抜いてみせる。 (遊星)',
					  '',
					  'もう、君を傷つけたくない。 (ユート)',
					  '']],
					[['闇ってやつは恐怖心を映し出す幻惑の鏡。心の弱いやつは飲まれるぜ。 (遊戯)',
					  '止まない雨はない。どんなに強い嵐だろうと、いつかは止む。涙もいつかは晴れる。待てばいいんだよ、嵐が去るのを。 (斎王)',
					  'やっと会えたな、ズシン。さあ、俺達と戦おう。 (太郎)',
					  'ヤット、褒メラレタ、デアリマス。大好キナ、カイ。 (オービタル)',
					  'やっぱり俺みたいな超レアな人間が、超レアなカードを使うべきなんだ。 (沢渡)',
					  ''],
					 ['遊戯よ、俺もよ、お前にならって宝物、持つことにしたぜ。 (城之内)',
					  '遊戯さん、強すぎだよ、まじつええ。こんな強い人に会ったことがないってくらい。 (十代)',
					  '遊星、君ならきっと見つけられる。君だけのアクセルシンクロを。 (ブルーノ)',
					  '幽霊とはどんな効果だ。いつ発動する。 (アストラル)',
					  '融合じゃねぇ、ユーゴだ。 (ユーゴ)',
					  ''],
					 ['ヨーヨーは人に向けるもんじゃない。地面に向けるものなんだぜ。覚えときな。 (遊戯)',
					  '4400だと、守備モンスターもなく、リバースカードもない。この状況で、4400だと。 (オブライエン)',
					  'ようやく分かった。お前の拒絶や怒り、その先にあるもう一つの感情。十六夜アキ、お前は破壊を、その力を楽しんでいる。その力に愉悦を感じている。 (遊星)',
					  '喜んで、ファンサービスは僕のモットーですから。 (IV)',
					  '',
					  '']],
					[['',
					  'ラッキーカードだ。こいつが君の所へ行きたがっている。 (遊戯)',
					  'ライディングデュエル、アクセラレーション。 (遊星)',
					  '',
					  '',
					  ''],
					 ['',
					  '',
					  'リミッター解放、レベルマックス、レギュレーターオープン、オールクリア。無限の力よ、時空を突き破り、未知なる世界を開け。GO、デルタアクセル。カモン、TG ハルバード・キャノン。 (アンチノミー)',
					  'リ・コントラクト・ユニバース。 (ZEXALⅡ)',
					  '',
					  ''],
					 ['ルールは一見複雑そうだけどやれば簡単だぜ。 (遊戯)',
					  '',
					  '',
					  '',
					  '',
					  ''],
					 ['',
					  'レインボー・ドラゴンが、オレを守ってくれた。俺を主だって、認めてくれるんだ。 (ヨハン)',
					  '',
					  '',
					  '',
					  ''],
					 ['',
					  '',
					  'ロットン、お前がいる限り、この街に満足は訪れない。 (遊星)',
					  '',
					  '',
					  '']],
					[['',
					  '',
					  '',
					  '忘れたのか。お前の一番のファンの顔を。 (シャーク)',
					  '笑わせるのと笑われるのでは、天と地ほども違う。 (権現坂)',
					  '分かりやすく言おう。我々は君達に、宣戦布告する。 (ライトニング)']]
				]
			};
		},
		template: `
			<div class="uk-container">
				<ul uk-tab>
					<li v-for="i in 10"><a href="#">{{ sounds[i - 1][0] }}</a></li>
				</ul>
				<ul class="uk-switcher">
					<li v-for="i in 10">
						<table class="uk-table uk-table-justify uk-table-small uk-table-divider">
							<tbody>
								<template v-for="(letter, letterIndex) in sounds[i - 1]">
									<tr><td>{{ letter }}</td><td></td></tr>
									<tr v-for="(title, titleIndex) in titles"><td>{{ title }}</td><td>{{ quotes[i - 1][letterIndex][titleIndex] }}</td></tr>
									<tr><td></td><td></td></tr>
								</template>
							</tbody>
						</table>
					</li>
				</ul>
			</div>
		`
	};
	const fortuneTelling = {
		data: function() {
			return {
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
				cardStates: ['back', 'back', 'back', 'back', 'back', 'back'],
				result: {},
			};
		},
		methods: {
			openCard: function(index) {
				if (this.opened) {
					return;
				}
				this.opened = true;
				this.$set(this.cardStates, index, 'front');
				this.result = this.descriptions[this.cardIndices[index]];
			},
			reset: function() {
				this.cardIndices = [0, 1, 2, 3, 4, 5].sort((a, b) => Math.random() - 0.5);
				this.opened = false;
				for (let i = 0; i < this.cardStates.length; ++i) {
					this.$set(this.cardStates, i, 'back');
				}
			}
		},
		template: `
			<div class="uk-container">
				<div uk-grid class="uk-grid-small uk-child-width-1-3">
					<div v-for="i in 6">
						<img v-bind:src="'img/card_' + cardStates[i - 1] + cardIndices[i - 1] + '.webp'" v-on:click="openCard(i - 1)">
					</div>
				</div>
				<div class="uk-margin-top" v-if="opened">
					<div>占いの結果</div>
					<div>{{ result['summary'] }}<br>{{ result['number'] }}<br>{{ result['color'] }}<br>{{ result['item'] }}<br>{{ result['advice'] }}</div>
					<button class="uk-margin-top uk-button uk-button-default uk-button-small" v-on:click="reset()">もう一度占う</button>
				</div>
			</div>
		`
	};
	const probability = {
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
		template: `
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
		`
	};
	const link = {
		template: `
			<div class="uk-container">
				<table class="uk-table uk-table-justify uk-table-small uk-table-divider">
					<thead>
						<tr><th>Webサイト</th></tr>
					</thead>
					<tbody>
						<tr><td><a class="uk-link-muted" href="https://www.tv-tokyo.co.jp/anime/yugioh2000/">テレビ東京・あにてれ 遊☆戯☆王 デュエルモンスターズ</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.tv-tokyo.co.jp/anime/yugioh-dm/">遊☆戯☆王デュエルモンスターズ 20thリマスター テレビ東京アニメ公式</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.tv-tokyo.co.jp/anime/yugioh2004/">テレビ東京・あにてれ 遊☆戯☆王デュエルモンスターズGX</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.tv-tokyo.co.jp/anime/yugioh/">遊☆戯☆王ファイブディーズ - テレビ東京</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.tv-tokyo.co.jp/anime/yugioh-zexal/">遊☆戯☆王ゼアルⅡ：あにてれ：テレビ東京</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.tv-tokyo.co.jp/anime/yugioh-arcv/">テレビ東京・あにてれ 遊☆戯☆王ARC-V</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.tv-tokyo.co.jp/anime/yugioh-vrains/">テレビ東京・あにてれ 遊☆戯☆王VRAINS</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.tv-tokyo.co.jp/anime/yugioh-sevens/">遊☆戯☆王SEVENS テレビ東京アニメ公式</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.youtube.com/channel/UCvP9G8Z5ndG4-GX81vhgmDg">遊戯王OCGチャンネル - YouTube</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.konami.com/yugioh/">遊戯王総合サイト - Konami</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.yugioh-card.com/japan/">遊戯王OCG デュエルモンスターズ - Yugioh-Card.com</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://yu-gi-oh.jp/">YU-GI-OH.jp</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.db.yugioh-card.com/yugiohdb/?request_locale=ja&request_device=sp">遊戯王OCGカードデータベース</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.konami.com/yugioh/duel_links/ja/">遊戯王 デュエルリンクス - Konami</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://www.konamistyle.jp/products/list.php?mode=search&category_id=83">遊戯王 - コナミスタイル</a></td></tr>
						<tr><td><a class="uk-link-muted" href="http://yugioh-wiki.net/">遊戯王カードWiki - トップページ</a></td></tr>
					</tbody>
				</table>
				<table class="uk-table uk-table-justify uk-table-small uk-table-divider">
					<thead>
						<tr><th>Twitter</th></tr>
					</thead>
					<tbody>
						<tr><td><a class="uk-link-muted" href="https://twitter.com/yugioh_anime">アニメ「遊☆戯☆王」公式</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://twitter.com/YuGiOh_OCG_INFO">【公式】遊戯王OCG</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://twitter.com/yu_gi_oh_jp">【公式】YU-GI-OH.jp</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://twitter.com/YuGiOh_INS_INFO">【公式】遊戯王OCGインストラクター</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://twitter.com/YuGiOh_DL_INFO">【公式】遊戯王 デュエルリンクス</a></td></tr>
						<tr><td><a class="uk-link-muted" href="https://twitter.com/YuGiOh_DL_INFO">【公式】遊戯王レガシー・オブ・ザ・デュエリスト</a></td></tr>
					</tbody>
				</table>
			</div>
		`
	};
	const router = new VueRouter({
		routes: [
			{path: '/', component: topPage},
			{path: '/calendar', component: calendar},
			{path: '/quote', component: quote},
			{path: '/fortune-telling', component: fortuneTelling},
			{path: '/probability', component: probability},
			{path: '/link', component: link}
		]
	});
	new Vue({
		el: '#app',
		components: {
			'host': host
		},
		template: `
			<host></host>
		`,
		router
	});
});
