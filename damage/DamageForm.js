/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
var DamageForm = (function (document){
if (document.getElementById("version").firstChild.nodeValue !== "20140927") alert("正常に動作しない可能性があります。裝填するか、キャッシュを消してください。");
//固定
var CK_FULL = location.pathname.indexOf("damageT") !== -1,
	CK_IE6 = typeof document.documentElement.style.maxHeight === "undefined",
	CK_OPERA = /*@if (@_jscript_version >= 9) true @else@*/ !!window.opera || /chrome/i.test(navigator.userAgent) /*@end@*/,
	I_aNAME = 0,I_aAT = 1,I_aZOKU = 2,I_aZOKUAT = 3,I_aZYOU = 4,I_aZYOUAT = 5,I_aCRI = 6,I_aRARE = 7,I_aGR = 8,I_aSLOT = 9,I_aDEF = 10,I_aHR = 11,I_aCRE = 12,I_aCLASS = 13,I_aSINKAGR = 14,I_aDOC = 15,I_aGAUGE = 16,I_aREACH = 17,I_aKYOKUSYA = 5,I_aYA = 16,I_aBIN = 17,I_aSPEED = 4,I_aSOKUSYA = 16,I_aKICK = 17,I_aRELO = 18,I_aGUN = 19,
	I_sREF1 = 0 ,I_sREF2 = 1, I_sZENY = 2, I_sCRE = 3, I_sREP = 4,
	BUKITYPE = ["","斬","打","弾"],
	ZOKUNAME = ["","火","水","雷","龍","氷","炎","光","雷極","天翔","熾凍","黒焔","奏","闇","紅魔","風","響"],
	ZOKUPOINT = [	[0,0,0,0,0,0,0],/*無*/
					[0,100,0,0,0,0],/*火*/
					[0,0,100,0,0,0],/*水*/
					[0,0,0,100,0,0],/*雷*/
					[0,0,0,0,100,0],/*龍*/
					[0,0,0,0,0,100],/*氷*/
					[0,70,0,0,70,0],/*炎*/
					[0,70,0,70,0,0],/*光*/
					[0,0,0,70,70,0],/*雷極*/
					[0,30,100,70,0,0],/*天翔*/
					[0,80,0,0,40,80],/*熾凍*/
					[0,50,0,0,150,0],/*黒焔*/
					[0,0,100,0,0,100], /*奏*/
					[0,0,0,0,80,80], /*闇*/
					[0,150,0,0,50,0], /*紅魔*/
					[0,0,0,80,0,80], /*風*/
					[0,0,100,0,100,0] /*響*/
				],
	IZYONAME = ["","毒","麻痺","睡眠"],
	RELOADNAME = ["装填:慢","装填:較慢","装填:普通","装填:較快","装填:快"],
	KICKNAME = ["反動:最大",0,"反動:中","反動:較小","反動:小"],
	SPEEDNAME = ["彈速:慢","彈速:較慢","彈速:較快","彈速:快","彈速:凄く快","彈速:凄く慢"],
	ONPUCOLOR = [0,"<span class=fr>&#9834;</span>","<span class=fy>&#9834;</span>","<span class=fw>&#9834;</span>","<span class=fb>&#9834;</span>","<span class=fg>&#9834;</span>","<span class=fp>&#9834;</span>","<span class=fa>&#9834;</span>"],
	KYOKUNAME = ["放散型","集中型","爆裂型","切断型"],
	MAKENAME = {"":"",1:"",2:"獵團",3:"網咖",4:"課金",5:"特典","-":"",i:"イベ",m:"狩人祭",g:"扭蛋",k:"套裝",t:"韋駄天",p:"パッケ"},
	CLASSTYPE = {"":" ",G:"剛種",T:"天嵐",H:"覇種",I:"G覇",R:"烈種",Z:"Ｇ級",O:"親方",C:"ＨＣ",S:"進化",N:"剛猫",P:"ＳＰ"},
	MST_Equip = {},MST_Equip_Sinka = {},MST_Item = {},MST_Monster = {},MST_Monster_List = [],MST_Item = setItem(),
	WP_Rui = "",WP_Info = {},WP_Motion = [],
	debug = false,time=0;
	INFO = [
			{Id:"taiken",	Name:"大劍",		Ritu:48,	Type:1,Hosei:100,Hiden:"劍王",ZokuKen:[50,70,90,130,150,210],IzyoKen:[[20,25,30]/*毒*/,[18,23,28]/*麻痺*/,[15,20,25]/*睡眠*/],BakuKen:[140,160,180]},
			{Id:"heavy",	Name:"重弩",Ritu:12,	Type:3,Hosei:100,Hiden:"銃仙"},
			{Id:"hammer",	Name:"大錘",	Ritu:52,	Type:2,Hosei:100,Hiden:"鈍器",ZokuKen:[35,55,75,130,150,210],IzyoKen:[[15,20,25]/*毒*/,[13,18,23]/*麻痺*/,[13,18,23]/*睡眠*/],BakuKen:[120,140,160]},
			{Id:"lance",	Name:"長槍",		Ritu:23,	Type:1,Hosei:100,Hiden:"天槍",ZokuKen:[35,55,75,130,150,210],IzyoKen:[[15,20,25]/*毒*/,[13,18,23]/*麻痺*/,[13,18,23]/*睡眠*/],BakuKen:[130,150,170]},
			{Id:"katate",	Name:"單手劍",		Ritu:14,	Type:1,Hosei:125,Hiden:"劍聖",ZokuKen:[35,55,75,130,150,210],IzyoKen:[[17,22,27]/*毒*/,[17,22,27]/*麻痺*/,[15,20,25]/*睡眠*/],BakuKen:[220,260,300]},
			{Id:"right",	Name:"輕弩",Ritu:12,	Type:3,Hosei:100,Hiden:"銃傑"},
			{Id:"souken",	Name:"雙劍",		Ritu:14,	Type:1,Hosei:100,Hiden:"双龍",ZokuKen:[30,40,50,130,150,210],IzyoKen:[[5,8,10]/*毒*/,[5,8,10]/*麻痺*/,[1,2,3]/*睡眠*/],BakuKen:[200,240,290],BakuKen_Kijin:[150,180,220]},
			{Id:"tachi",	Name:"太刀",		Ritu:48,	Type:1,Hosei:100,Hiden:"刀神",ZokuKen:[35,55,75,130,150,210],IzyoKen:[[15,20,25]/*毒*/,[13,18,23]/*麻痺*/,[13,18,23]/*睡眠*/],BakuKen:[140,160,180]},
			{Id:"horn",		Name:"狩獵笛",		Ritu:52,	Type:2,Hosei:100,Hiden:"奏帝",ZokuKen:[35,55,75,130,150,210],IzyoKen:[[15,20,25]/*毒*/,[13,18,23]/*麻痺*/,[13,18,23]/*睡眠*/],BakuKen:[120,140,160]},
			{Id:"gunlance",	Name:"銃槍",	Ritu:23,	Type:1,Hosei:100,Hiden:"砲皇",ZokuKen:[35,55,75,130,150,210],IzyoKen:[[15,20,25]/*毒*/,[13,18,23]/*麻痺*/,[13,18,23]/*睡眠*/],BakuKen:[130,150,170]},
			{Id:"yumi",		Name:"弓",			Ritu:12,	Type:3,Hosei:100,Hiden:"弓鬼"},
			{Id:"tonfa",	Name:"穿龍棍",		Ritu:18,	Type:2,Hosei:100,Hiden:"穿凰",ZokuKen:[30,40,50,130,150,210],IzyoKen:[[5,8,10]/*毒*/,[5,8,10]/*麻痺*/,[1,2,3]/*睡眠*/],BakuKen:[200,240,290]}
			];
//N:動作名,P:値,C:コメント,c:合算備考,T:個別タイプ,H:個別補正,S:固定銳利度,ZH:属性補正,M:無属性,X:掛け算,K:スタン,E:非表示条件,R*:特殊補正(2:大錘：瞬撃外,4:片手：会心外,7太刀：劍術外)
//flg[S:スタイル,P:技強化,C:技変更]
INFO[11].Motion = [
			{flg:{S:"111",P:"11",C:"11"},N:"抜刀攻撃",P:28,K:12},
			{flg:{S:"111",P:"11",C:"11"},N:"基本連係1",P:14,K:6},
			{flg:{S:"111",P:"11",C:"11"},N:"基本連係2",P:11,K:8},
			{flg:{S:"111",P:"11",C:"11"},N:"基本連係3",P:18,K:6},
			{flg:{S:"111",P:"11",C:"11"},N:"基本連係4",P:9,X:2,K:7},
			{flg:{S:"1 1",P:"11",C:"11"},N:"基本連係5(1)",P:[16,18,20],K:20,ZH:[100,120,130]},
			{flg:{S:"1 1",P:"11",C:"11"},N:"基本連係5(2)",P:[50,55,61],K:60,ZH:[100,120,130]},
			{flg:{S:"1 1",P:"11",C:"11"},N:"基本連係5(3)",P:[110,119,131],K:110,ZH:[100,120,130]},
			{flg:{S:" 11",P:"11",C:"11"},N:"連続突刺1",P:11,K:3},
			{flg:{S:" 11",P:"11",C:"11"},N:"連続突刺1",P:12,K:3},
			{flg:{S:" 11",P:"11",C:"11"},N:"連続突刺2",P:10,X:4,K:3},
			{flg:{S:" 11",P:"11",C:"11"},N:"連続突刺3",P:40,K:12},
			{flg:{S:"1 1",P:"11",C:"11"},N:"ダッシュ突刺",P:12,K:10},
			{flg:{S:"1 1",P:"11",C:"11"},N:"ダッシュ突刺",P:20,K:15},
			{flg:{S:" 11",P:"11",C:"11"},N:"ダッシュ旋回",P:3,X:4,K:2},
			{flg:{S:" 11",P:"11",C:"11"},N:"ダッシュ旋回",P:10,X:2,K:4},
			{flg:{S:"111",P:"11",C:"11"},N:"ダッシュ連携",P:7,X:2,ZH:0,C:"<small>蹴</small>",K:3,R7:1,R11K:[7,9,11]},
			{flg:{S:"111",P:"11",C:"11"},N:"ダッシュ連携",P:12,K:4},
			{flg:{S:"111",P:"11",C:"11"},N:"ダッシュ連携",P:20,K:4},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携1",P:11,X:2,ZH:0,C:"<small>蹴</small>",K:2,R7:1,R11K:[11,13,15]},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携2",P:10,K:10},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携3",P:9,K:6},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携3",P:12,K:8},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携4",P:26,K:24},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携5",P:16,K:15},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携5",P:11,K:13,X:4},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携5",P:24,K:20},
			{flg:{S:"111",P:"11",C:"11"},N:"特殊連携6",P:19,X:2,ZH:0,C:"<small>蹴</small>",K:2,R7:1,R11K:[19,23,27]},
			{flg:{S:"111",P:"11",C:"11"},N:"跳躍回避",P:5,X:2,ZH:0,C:"<small>蹴</small>",K:2,R7:1,R11K:[5,6,7]},
			{flg:{S:"111",P:"11",C:"11"},N:"滞空連携1",P:22,K:14},
			{flg:{S:"111",P:"11",C:"11"},N:"滞空連携2",P:15,X:2,K:13},
			{flg:{S:"111",P:"11",C:"11"},N:"滞空連携3",P:23,ZH:0,C:"<small>蹴</small>",K:11,R7:1,R11K:[23,27,31]},
			{flg:{S:"111",P:"11",C:"11"},N:"滞空連携3",P:25,ZH:0,C:"<small>蹴</small>",K:11,R7:1,R11K:[25,29,33]},
			{flg:{S:"1 1",P:"11",C:"11"},N:"縦迴旋攻撃",P:12,X:2,K:12},
			{flg:{S:" 11",P:"11",C:"11"},N:"滑空踢",P:14,ZH:0,C:"<small>蹴</small>",K:14,R7:1,R11K:[14,17,19]},
			{flg:{S:"111",P:"11",C:"11"},N:"龍氣穿撃",P:1,X:2,R4:1,R11H:[1,8,10,15]},
			{flg:{S:"111",P:"11",C:"11"},N:"龍氣穿撃",P:40,K:2,R4:1,R7:1},
			{flg:{S:"111",P:"11",C:"11"},N:"空中穿撃",P:1,X:2,R4:1,R11H:[1,7,9,12]},
			{flg:{S:"111",P:"11",C:"11"},N:"空中穿撃",P:30,K:2,R4:1,R7:1}
			];
INFO[0].Motion = [
			{flg:{S:"111",P:"11",C:"11"},N:"縱斬",P:58},
			{flg:{S:"111",P:"11",C:"11"},N:"結束動作Ａ",P:43},
			{flg:{S:"111",P:"11",C:"11"},N:"結束動作Ａ",P:63},
			{flg:{S:"111",P:"1 ",C:"11"},N:"橫掃斬",P:44},
			{flg:{S:"111",P:" 1",C:"11"},N:"橫掃斬",P:57},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"結束動作Ｂ",P:96},
			{flg:{S:"111",P:"1 ",C:"11"},N:"上撈斬",P:56},
			{flg:{S:"111",P:" 1",C:"11"},N:"上撈斬",P:72},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"結束動作Ｃ",P:96},
			{flg:{S:"1  ",P:"11",C:"11"},N:"溜斬り１",P:[78,81,83.5],C:"x110%",H:110,ZH:[100,120,130]},
			{flg:{S:"1  ",P:"11",C:"11"},N:"溜斬り２",P:[96,99,101.5],C:"x120%",H:120,ZH:[100,120,130]},
			{flg:{S:"1  ",P:"11",C:"11"},N:"溜斬り３",P:[133,136,138.5],C:"x130%",H:130,ZH:[100,120,130]},
			{flg:{S:"  1",P:"11",C:"11"},N:"溜斬上げ１",P:[84,87,89.5],ZH:[100,120,130]},
			{flg:{S:"  1",P:"11",C:"11"},N:"溜斬上げ２",P:[102,105,107.5],C:"x110%",H:110,ZH:[100,120,130]},
			{flg:{S:"  1",P:"11",C:"11"},N:"溜斬上げ３",P:[142,145,147.5],C:"x120%",H:120,ZH:[100,120,130]},
			{flg:{S:"  1",P:"11",C:"11"},N:"溜斬上げ４",P:[180,183.5,187],C:"x130%",H:130,ZH:[100,120,130]},
			{flg:{S:" 11",P:"11",C:"11"},N:"防禦：０",P:46},
			{flg:{S:" 11",P:"11",C:"11"},N:"防禦：１",P:102},
			{flg:{S:" 11",P:"11",C:"11"},N:"防禦：２",P:149},
			{flg:{S:" 11",P:"11",C:"11"},N:"防禦：３",P:204},
			{flg:{S:"11 ",P:"11",C:"11"},N:"強防禦",P:22}
			];
INFO[2].Motion = [
			{flg:{S:"111",P:"1 ",C:"11"},N:"拔出武器",P:32,K:24,R2:1},
			{flg:{S:"111",P:" 1",C:"11"},N:"拔出武器",P:48,K:24,R2:1},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"單手蓋印",P:60,K:50},
			{flg:{S:"111",P:"1 ",C:"11"},N:"新本壘打",P:100,K:50},
			{flg:{S:"111",P:" 1",C:"11"},N:"新本壘打",P:130,K:50},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"縱擊１",P:52,K:25},
			{flg:{S:"111",P:"11",C:"11"},N:"縱擊２",P:38,K:25},
			{flg:{S:"111",P:"11",C:"11"},N:"舊本壘打",P:100,K:80},
			{flg:{S:"111",P:"11",C:"11"},N:"橫敲",P:30,K:35},
			{flg:{S:"111",P:"11",C:"11"},N:"蓄力振上げ",P:45,K:30},
			{flg:{S:"111",P:"11",C:"11"},N:"蓄力１",P:[52,55,58],K:20,R2:1,ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"蓄力２",P:[52,55,58],K:20,R2:1,ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"蓄力２",P:[35,36,36.5],K:20,R2:1,ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"蓄力３",P:[40,41,42],K:20,ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"蓄力３",P:[100,103,107],K:60,ZH:[100,120,130]},
			{flg:{S:"1  ",P:"11",C:"11"},N:"迴旋開始",P:[20,21,21.5],K:2,ZH:[100,120,130]},
			{flg:{S:"1  ",P:"11",C:"11"},N:"迴旋中",P:[10,11,11],C:"x<i>5回</i>",K:2,ZH:[100,120,130]},
			{flg:{S:"1  ",P:"11",C:"11"},N:"迴旋終了",P:[40,41,42],K:2,ZH:[100,120,130]},
			{flg:{S:"  1",P:"11",C:"11"},N:"JPスタンプ",P:[40,41,42],K:30,ZH:[100,120,130]},
			{flg:{S:"  1",P:"11",C:"11"},N:"JPスタンプ",P:[30,31,31],K:30,ZH:[100,120,130]},
			{flg:{S:"  1",P:"11",C:"11"},N:"JPスタンプ",P:[120,123,127],K:80,ZH:[100,120,130]},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱打開始",P:[60,62,64],K:15,ZH:[100,120,130]},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱打中",P:[45,46,47],C:"x<i>n回</i>",K:15,ZH:[100,120,130]}
			];
INFO[3].Motion = [
			{flg:{S:"1  ",P:"11",C:"11"},N:"中段突刺１",P:24},
			{flg:{S:"1  ",P:"11",C:"11"},N:"中段突刺２",P:24},
			{flg:{S:"1  ",P:"11",C:"11"},N:"中段突刺３",P:32},
			{flg:{S:"1  ",P:"11",C:"11"},N:"上方突刺１",P:29},
			{flg:{S:"1  ",P:"11",C:"11"},N:"上方突刺２",P:29},
			{flg:{S:"1  ",P:"11",C:"11"},N:"上方突刺３",P:32},
			{flg:{S:"1  ",P:"11",C:"1 "},N:"突進",P:21,C:"x<i>n回</i>"},
			{flg:{S:"1  ",P:"11",C:" 1"},N:"螺旋突進",P:26,C:"x<i>n回</i>"},/*紋章*/
			{flg:{S:"1  ",P:"1 ",C:"11"},N:"結束動作突",P:42},
			{flg:{S:"1  ",P:" 1",C:"11"},N:"結束動作突",P:63},/*紋章*/
			{flg:{S:" 11",P:"11",C:"11"},N:"中段突刺1-",P:24},
			{flg:{S:" 11",P:"11",C:"11"},N:"-中段突刺3",P:24},
			{flg:{S:" 11",P:"11",C:"11"},N:"中段突刺４",P:32},
			{flg:{S:" 11",P:"11",C:"11"},N:"上方突刺1-",P:29},
			{flg:{S:" 11",P:"11",C:"11"},N:"-上方突刺3",P:29},
			{flg:{S:" 11",P:"11",C:"11"},N:"上方突刺４",P:32},
			{flg:{S:" 11",P:"11",C:"11"},N:"天上突刺1-",P:30},
			{flg:{S:" 11",P:"11",C:"11"},N:"-天上突刺3",P:30},
			{flg:{S:" 11",P:"11",C:"11"},N:"天上突刺４",P:34},
			{flg:{S:"11 ",P:"11",C:"11"},N:"防禦突刺",P:21},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"チャージ",P:2,T:2,H:100,S:5,K:5},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"チャージ",P:21,T:2,H:100,S:5,K:10},
			{flg:{S:"  1",P:" 1",C:"11"},N:"チャージ",P:3,T:2,H:100,S:5,K:5},/*紋章*/
			{flg:{S:"  1",P:" 1",C:"11"},N:"チャージ",P:31,T:2,H:100,S:5,K:10},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"奮力突",P:[34,36,38.5],ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"〃(蓄力)",P:[47,49,51.5],ZH:[100,120,130]}
			];
INFO[4].Motion = [
			{flg:{S:"111",P:"11",C:"11"},N:"JP斬り",P:10,T:2,H:100,S:5,K:5},
			{flg:{S:"111",P:"11",C:"11"},N:"JP斬り",P:16},
			{flg:{S:"111",P:"1 ",C:"11"},N:"滑動刺",P:16},
			{flg:{S:"111",P:" 1",C:"11"},N:"滑動刺",P:24},/*紋章*/
			{flg:{S:"11 ",P:"11",C:"11"},N:"斬り下げ",P:13},
			{flg:{S:"11 ",P:"11",C:"11"},N:"橫斬",P:11},
			{flg:{S:"11 ",P:"11",C:"11"},N:"盾と劍",P:8,T:2,H:100,S:5,K:5},
			{flg:{S:"11 ",P:"11",C:"11"},N:"盾と劍",P:12},
			{flg:{S:"  1",P:"11",C:"11"},N:"突刺１",P:11},
			{flg:{S:"  1",P:"11",C:"11"},N:"突刺２",P:8},
			{flg:{S:"  1",P:"11",C:"11"},N:"突刺３",P:8},
			{flg:{S:"  1",P:"11",C:"11"},N:"上下斬",P:10},
			{flg:{S:"  1",P:"11",C:"11"},N:"上下斬",P:12},
			{flg:{S:"1  ",P:"11",C:"1 "},N:"迴旋斬",P:24},
			{flg:{S:"1  ",P:"11",C:" 1"},N:"真空迴旋斬",P:24},/*紋章*/
			{flg:{S:"1  ",P:"11",C:" 1"},N:"真空迴旋斬",P:12,R7:1},/*紋章*/
			{flg:{S:" 11",P:"11",C:"11"},N:"JP2段斬り",P:18},
			{flg:{S:" 11",P:"11",C:"11"},N:"JP2段斬り",P:14},
			{flg:{S:"111",P:"11",C:"11"},N:"上撈斬",P:15},
			{flg:{S:"111",P:"1 ",C:"11"},N:"盾擊",P:10,T:2,H:100,S:5,K:7},
			{flg:{S:"111",P:"1 ",C:"11"},N:"盾重擊",P:14,T:2,H:100,S:5,K:8},
			{flg:{S:"111",P:" 1",C:"11"},N:"盾擊",P:15,T:2,H:100,S:5,K:7},/*紋章*/
			{flg:{S:"111",P:" 1",C:"11"},N:"盾重擊",P:21,T:2,H:100,S:5,K:8},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"防禦斬",P:14},
			{flg:{S:"111",P:"11",C:"11"},N:"無限斬り",P:19}
			];
INFO[6].Motion_Normal = [
			{flg:{S:"11 ",P:"1 ",C:"11"},N:"揮斬",P:11},
			{flg:{S:"11 ",P:"1 ",C:"11"},N:"揮斬",P:5},
			{flg:{S:"11 ",P:" 1",C:"11"},N:"揮斬",P:16},/*紋章*/
			{flg:{S:"11 ",P:" 1",C:"11"},N:"揮斬",P:7},/*紋章*/
			{flg:{S:"  1",P:"1 ",C:"11"},N:"ＪＰ斬り",P:11},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"ＪＰ斬り",P:15},
			{flg:{S:"  1",P:" 1",C:"11"},N:"ＪＰ斬り",P:16},/*紋章*/
			{flg:{S:"  1",P:" 1",C:"11"},N:"ＪＰ斬り",P:22},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ１",P:10},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ１",P:13},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ２",P:9},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ２",P:7},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:7},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:5},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:11},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:16},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:14},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:9},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:5},
			{flg:{S:"111",P:"11",C:"11"},N:"上撈斬",P:17}
			];
INFO[6].Motion_kijin = [
			{flg:{S:"11 ",P:"1 ",C:"11"},N:"揮斬",P:14},
			{flg:{S:"11 ",P:"1 ",C:"11"},N:"揮斬",P:6},
			{flg:{S:"11 ",P:" 1",C:"11"},N:"揮斬",P:21},/*紋章*/
			{flg:{S:"11 ",P:" 1",C:"11"},N:"揮斬",P:9},/*紋章*/
			{flg:{S:"  1",P:"1 ",C:"11"},N:"ＪＰ斬り",P:14},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"ＪＰ斬り",P:20},
			{flg:{S:"  1",P:" 1",C:"11"},N:"ＪＰ斬り",P:21},/*紋章*/
			{flg:{S:"  1",P:" 1",C:"11"},N:"ＪＰ斬り",P:29},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ１",P:13},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ１",P:17},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ２",P:12},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ２",P:9},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:9},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:6},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:14},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:21},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:18},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:12},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:6,C:"",c:"<br>x<i>2回</i>"},
			{flg:{S:"111",P:"11",C:"11"},N:"上撈斬",P:22},
			{flg:{S:"1  ",P:"11",C:"11"},N:"乱舞",P:31,ZH:70,c:"",C:"開始"},
			{flg:{S:"1  ",P:"11",C:"11"},N:"乱舞",P:6,X:8,ZH:70},
			{flg:{S:"1  ",P:"11",C:"11"},N:"乱舞",P:37,ZH:70,C:"終了"},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱舞改<br>３連突刺",P:13,X:3},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱舞改<br>迴旋斬",P:21},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱舞改<br>迴旋斬",P:33},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱舞改<br>迴旋斬",P:51},
			{flg:{S:"111",P:"11",C:"11"},N:"乱舞旋風<br>迴旋斬",P:14,X:6},
			{flg:{S:"111",P:"11",C:"11"},N:"乱舞旋風<br>斬り下げ",P:36},
			{flg:{S:"111",P:"11",C:"11"},N:"乱舞旋風<br>斬り下げ",P:54},
			{flg:{S:"111",P:"11",C:"11"},N:"回避攻撃",P:12,X:2}
			];
INFO[6].Motion_syouhi = [
			{flg:{S:"11 ",P:"1 ",C:"11"},N:"揮斬",P:15},
			{flg:{S:"11 ",P:"1 ",C:"11"},N:"揮斬",P:7},
			{flg:{S:"11 ",P:" 1",C:"11"},N:"揮斬",P:23},/*紋章*/
			{flg:{S:"11 ",P:" 1",C:"11"},N:"揮斬",P:10},/*紋章*/
			{flg:{S:"  1",P:"1 ",C:"11"},N:"ＪＰ斬り",P:15},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"ＪＰ斬り",P:21},
			{flg:{S:"  1",P:" 1",C:"11"},N:"ＪＰ斬り",P:23},/*紋章*/
			{flg:{S:"  1",P:" 1",C:"11"},N:"ＪＰ斬り",P:31},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ１",P:14},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ１",P:18},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ２",P:13},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ２",P:10},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:10},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:7},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:15},
			{flg:{S:"111",P:"11",C:"11"},N:"斬り下げ３",P:23},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:20},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:13},
			{flg:{S:"111",P:"11",C:"11"},N:"迴旋斬",P:7,C:"",c:"<br>x<i>2回</i>"},
			{flg:{S:"111",P:"11",C:"11"},N:"上撈斬",P:24},
			{flg:{S:"1  ",P:"11",C:"11"},N:"乱舞",P:33,ZH:70,c:"",C:"開始"},
			{flg:{S:"1  ",P:"11",C:"11"},N:"乱舞",P:7,X:8,ZH:70},
			{flg:{S:"1  ",P:"11",C:"11"},N:"乱舞",P:40,ZH:70,C:"終了"},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱舞改<br>３連突刺",P:14,X:3},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱舞改<br>迴旋斬",P:23},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱舞改<br>迴旋斬",P:36},
			{flg:{S:" 11",P:"11",C:"11"},N:"乱舞改<br>迴旋斬",P:56},
			{flg:{S:"111",P:"11",C:"11"},N:"乱舞旋風<br>迴旋斬",P:15,X:6},
			{flg:{S:"111",P:"11",C:"11"},N:"乱舞旋風<br>斬り下げ",P:39},
			{flg:{S:"111",P:"11",C:"11"},N:"乱舞旋風<br>斬り下げ",P:58},
			{flg:{S:"111",P:"11",C:"11"},N:"回避攻撃",P:13,X:2}
			];
INFO[7].Motion1 = [
			{flg:{S:"111",P:"11",C:"11"},N:"踏み込み",P:33},
			{flg:{S:"111",P:"11",C:"11"},N:"縱斬",P:28},
			{flg:{S:"1  ",P:"1 ",C:"11"},N:"斬り下げ",P:30},
			{flg:{S:"1  ",P:" 1",C:"11"},N:"斬り下げ",P:36},/*紋章*/
			{flg:{S:"1  ",P:"1 ",C:"11"},N:"下突刺",P:24},
			{flg:{S:"1  ",P:" 1",C:"11"},N:"下突刺",P:28},/*紋章*/
			{flg:{S:" 11",P:"11",C:"11"},N:"迴避斬",P:28},
			{flg:{S:"11 ",P:"11",C:"11"},N:"突刺",P:20}
			];
INFO[7].Motion2_normal = [
			{flg:{S:"  1",P:"1 ",C:"11"},N:"貫刺",P:[24,25,26.5],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"貫刺",P:[12,12.5,13.5],ZH:[100*2/3,120*2/3,130*2/3],X:2,R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"貫刺",P:[32,33,34],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"貫刺",P:[16,16.5,17.5],ZH:[100*2/3,120*2/3,130*2/3],X:2,R7:1},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"氣刃貫刺",P:[24,24.5,25],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"氣刃貫刺",P:[12,12.5,13],ZH:[100*2/3,120*2/3,130*2/3],X:5,R7:1},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"氣刃貫刺",P:[30,30.5,31.5],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"氣刃貫刺",P:[32,32.5,33],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"氣刃貫刺",P:[16,16.5,17],ZH:[100*2/3,120*2/3,130*2/3],X:5,R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"氣刃貫刺",P:[40,41,41.5],ZH:[100*2/3,120*2/3,130*2/3],R7:1}
			];
INFO[7].Motion2_kenzyutu = [
			{flg:{S:"  1",P:"1 ",C:"11"},N:"貫刺",P:[28.5,30,31.5],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"貫刺",P:[14,14.5,15.5],ZH:[100*2/3,120*2/3,130*2/3],X:2,R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"貫刺",P:[38,39,41],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"貫刺",P:[18.5,19,21],ZH:[100*2/3,120*2/3,130*2/3],X:2,R7:1},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"氣刃貫刺",P:[28.5,29,30.5],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"氣刃貫刺",P:[14,14.5,15],ZH:[100*2/3,120*2/3,130*2/3],X:5,R7:1},
			{flg:{S:"  1",P:"1 ",C:"11"},N:"氣刃貫刺",P:[36,37,37.5],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"氣刃貫刺",P:[38,38.5,39],ZH:[100*2/3,120*2/3,130*2/3],R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"氣刃貫刺",P:[18.5,19,20],ZH:[100*2/3,120*2/3,130*2/3],X:5,R7:1},
			{flg:{S:"  1",P:" 1",C:"11"},N:"氣刃貫刺",P:[48,48.5,49],ZH:[100*2/3,120*2/3,130*2/3],R7:1}
			];
INFO[7].Motion3 = [
			{flg:{S:"111",P:"1 ",C:"11"},N:"上撈斬",P:23},
			{flg:{S:"111",P:" 1",C:"11"},N:"上撈斬",P:34},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"氣刃斬無",P:16},
			{flg:{S:"111",P:"11",C:"11"},N:"氣刃斬１",P:35},
			{flg:{S:"111",P:"11",C:"11"},N:"氣刃斬２",P:36},
			{flg:{S:"111",P:"11",C:"11"},N:"氣刃斬３",P:18,X:2},
			{flg:{S:"111",P:"11",C:"11"},N:"氣刃斬３",P:40},
			{flg:{S:"111",P:"11",C:"11"},N:"氣刃放出",P:[40,44,48],C:"·①·①",ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"放出[1後]",P:[60,64,68],C:"·①·①",ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"放出[2後]",P:[70,74,78],C:"·①·①"},
			{flg:{S:"111",P:"11",C:"11"},N:"放出[3後]",P:[90,94,98],C:"·①·①",ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"①練氣100",P:[35,38,40],ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"①練氣80",P:[26,29,31],ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"①練氣50",P:[20,23,25],ZH:[100,120,130]},
			{flg:{S:"111",P:"11",C:"11"},N:"側步斬",P:24}
			];
INFO[8].Motion = [
			{flg:{S:"1  ",P:"11",C:"11"},N:"叩擊",P:15,K:5},
			{flg:{S:"1  ",P:"11",C:"11"},N:"叩擊",P:48,K:20},
			{flg:{S:" 11",P:"11",C:"11"},N:"舊本壘打",P:50,K:20},
			{flg:{S:" 11",P:"11",C:"11"},N:"上方突擊",P:20,K:20,X:3},
			{flg:{S:" 11",P:"11",C:"11"},N:"上踢",P:30,K:25},
			{flg:{S:"111",P:"11",C:"11"},N:"揮打",P:31,K:15},
			{flg:{S:"111",P:"1 ",C:"11"},N:"戳擊",P:12},
			{flg:{S:"111",P:" 1",C:"11"},N:"戳擊",P:20},/*紋章*/
			{flg:{S:"111",P:"1 ",C:"11"},N:"演奏開始",P:22,K:20},
			{flg:{S:"111",P:"1 ",C:"11"},N:"演奏１",P:43,K:20},
			{flg:{S:"111",P:"1 ",C:"11"},N:"演奏２",P:36,K:20},
			{flg:{S:"111",P:"1 ",C:"11"},N:"演奏３",P:41,K:20},
			{flg:{S:"111",P:"1 ",C:"11"},N:"演奏終了",P:26,K:20},
			{flg:{S:"111",P:" 1",C:"11"},N:"演奏開始",P:33,K:20},/*紋章*/
			{flg:{S:"111",P:" 1",C:"11"},N:"演奏１",P:64,K:20},/*紋章*/
			{flg:{S:"111",P:" 1",C:"11"},N:"演奏２",P:54,K:20},/*紋章*/
			{flg:{S:"111",P:" 1",C:"11"},N:"演奏３",P:61,K:20},/*紋章*/
			{flg:{S:"111",P:" 1",C:"11"},N:"演奏終了",P:39,K:20}/*紋章*/
			];
INFO[9].Motion = [
			{flg:{S:"111",P:"1 ",C:"11"},N:"踏み込み",P:35},
			{flg:{S:"111",P:" 1",C:"11"},N:"踏み込み",P:52},/*紋章*/
			{flg:{S:"111",P:"1 ",C:"11"},N:"横薙斬",P:29},
			{flg:{S:"111",P:" 1",C:"11"},N:"横薙斬",P:43},/*紋章*/
			{flg:{S:"111",P:"11",C:"11"},N:"折り返し",P:15},
			{flg:{S:"111",P:"11",C:"11"},N:"前方突刺1,2",P:28},
			{flg:{S:"111",P:"11",C:"11"},N:"前方突刺３",P:29},
			{flg:{S:"111",P:"11",C:"11"},N:"上撈斬",P:35},
			{flg:{S:"111",P:"11",C:"11"},N:"上方突1-3",P:25}
			];
INFO[10].Motion = [
			{flg:{S:"1  ",P:"11",C:"11"},N:"橫掃斬",T:1,P:10,S:-1,ZH:50},
			{flg:{S:"1  ",P:"11",C:"11"},N:"縱斬",T:1,P:18,S:-1,ZH:50},
			{flg:{S:" 11",P:"11",C:"11"},N:"昇龍弓",T:1,P:12,X:2,S:-1,ZH:50},
			{flg:{S:" 11",P:"11",C:"11"},N:"昇龍弓",T:1,P:10,X:2,S:-1,ZH:50},
			{flg:{S:" 11",P:"11",C:"11"},N:"昇龍弓",T:1,P:31,S:-1,ZH:50},
			{flg:{S:" 11",P:"11",C:"11"},N:"昇龍弓",T:1,P:10,S:-1,ZH:50}
			];
INFO[1].Bullet = {
//N:弾名,P:威力,ZT:属性タイプ,ZB:属性倍率,ZP:属性値,IT:異常タイプ,IP:異常値,C:コメント,K:氣絶値,S:速射,M:無属性,BN:爆破名,BM:爆破無属性,BFZ:爆破火属性,BC:爆破コメント
			//通常
			0:{N:"LV1通常弾",P:6},
			1:{N:"LV2通常弾",P:12},
			2:{N:"LV3通常弾",P:12,C:"x<i>n回</i>"},
			3:{N:"LV1貫通弾",P:10,C:"x<i>3回</i>"},
			4:{N:"LV2貫通弾",P:9,C:"x<i>4回</i>"},
			5:{N:"LV3貫通弾",P:7,C:"x<i>6回</i>"},
			6:{N:"LV1散弾",P:5,ZT:2,ZP:5,C:"<br>x<i>3回</i>"},
			7:{N:"LV2散弾",P:5,ZT:2,ZP:4,C:"<br>x<i>4回</i>"},
			8:{N:"LV3散弾",P:5,ZT:2,ZP:4,C:"<br>x<i>5回</i>"},
			12:{N:"LV1拡散弾",P:6,BN:"(子拡散)",BM:32,BFZ:2,BC:"<br>x<i>3個</i>"},
			13:{N:"LV2拡散弾",P:6,BN:"(子拡散)",BM:32,BFZ:2,BC:"<br>x<i>4個</i>"},
			14:{N:"LV3拡散弾",P:6,BN:"(子拡散)",BM:32,BFZ:2,BC:"<br>x<i>5個</i>"},
			15:{N:"LV1回復弾",P:0,C:"<br>回復30"},
			16:{N:"LV2回復弾",P:0,C:"<br>回復50"},
			17:{N:"LV1毒弾",P:10,IT:1,IP:25},
			18:{N:"LV2毒弾",P:15,IT:1,IP:50},
			19:{N:"LV1麻痺弾",P:10,IT:2,IP:25},
			20:{N:"LV2麻痺弾",P:15,IT:2,IP:50},
			21:{N:"LV1睡眠弾",P:0,IT:3,IP:25},
			22:{N:"LV2睡眠弾",P:0,IT:3,IP:50},

			9:{N:"LV1徹甲榴弾",P:3,BN:"(爆破)",BM:30,BFZ:40,BC:"<br>氣絶10"},
			10:{N:"LV2徹甲榴弾",P:3,BN:"(爆破)",BM:40,BFZ:60,BC:"<br>氣絶10"},
			11:{N:"LV3徹甲榴弾",P:3,BN:"(爆破)",BM:50,BFZ:80,BC:"<br>氣絶10"},
			23:{N:"火炎彈",P:1,ZT:1,ZB:500},
			24:{N:"水冷彈",P:1,ZT:2,ZB:250,C:"<br>x<i>3回</i>"},
			25:{N:"電擊彈",P:1,ZT:3,ZB:270,C:"<br>x<i>3回</i>"},
			26:{N:"冰結彈",P:1,ZT:5,ZB:250,C:"<br>x<i>3回</i>"},
			27:{N:"滅龍彈",P:1,ZT:4,ZP:90,C:"<br>x<i>6回</i>"},
			28:{N:"排熱彈",T:-1,ZT:1,ZP:22,M:22},
			29:{N:"爆擊彈",T:-1,M:30,C:"+LV/2",BN:"(持続)",BM:15,BC:"+LV/4<br>x<i>15回</i>"},
			30:{N:"爆擊彈:然",T:-1,M:36,C:"+LV/2",BN:"(持続)",BM:18,BC:"+LV/4<br>x<i>15回</i>"},
			31:{N:"龍爆擊彈",T:-1,M:20,ZT:4,ZP:60,C:"+LV",BN:"(持続)",BM:0,BFZ:120,BC:"LV/4<br>x<i>15回</i>"},

			//圧縮 CN:着弾名,CM:着弾無属性
			C0:{N:"LV1通常弾",P:19,K:3,CN:"(着弾)",CM:10},
			C1:{N:"LV2通常弾",P:48,K:5,CN:"(着弾)",CM:20},
			C2:{N:"LV3通常弾",P:48,C:"x<i>n回</i>",K:7,CN:"(着弾)",CM:10},
			C3:{N:"LV1貫通弾",P:50,C:"x<i>3回</i>",K:7,CN:"(着弾)",CM:20},
			C4:{N:"LV2貫通弾",P:45,C:"x<i>4回</i>",K:7,CN:"(着弾)",CM:20},
			C5:{N:"LV3貫通弾",P:35,C:"x<i>6回</i>",K:14,CN:"(着弾)",CM:20},
			C6:{N:"LV1散弾",P:30,ZT:2,ZP:25,C:"<br>x<i>3回</i>",K:6,CN:"(着弾)",CM:5},
			C7:{N:"LV2散弾",P:30,ZT:2,ZP:20,C:"<br>x<i>4回</i>",K:6,CN:"(着弾)",CM:5},
			C8:{N:"LV3散弾",P:30,ZT:2,ZP:20,C:"<br>x<i>5回</i>",K:6,CN:"(着弾)",CM:5},
			C12:{N:"LV1拡散弾",P:-1},
			C13:{N:"LV2拡散弾",P:-1},
			C14:{N:"LV3拡散弾",P:-1},
			C15:{N:"LV1回復弾",P:0,C:"<br>回復30"},
			C16:{N:"LV2回復弾",P:0,C:"<br>回復50"},
			C17:{N:"LV1毒弾",P:60,IT:1,IP:20,K:25},
			C18:{N:"LV2毒弾",P:90,IT:1,IP:40,K:25},
			C19:{N:"LV1麻痺弾",P:60,IT:2,IP:20,K:25},
			C20:{N:"LV2麻痺弾",P:90,IT:2,IP:40,K:25},
			C21:{N:"LV1睡眠弾",P:0,IT:3,IP:20,K:25},
			C22:{N:"LV2睡眠弾",P:0,IT:3,IP:40,K:25},

			C9:{N:"LV1徹甲榴弾",P:20,K:25,BN:"(爆破)",BM:24,BFZ:20,BC:"<br>氣絶10",CN:"(着弾)",CM:20},
			C10:{N:"LV2徹甲榴弾",P:20,K:25,BN:"(爆破)",BM:32,BFZ:30,BC:"<br>氣絶10",CN:"(着弾)",CM:20},
			C11:{N:"LV3徹甲榴弾",P:20,K:25,BN:"(爆破)",BM:40,BFZ:40,BC:"<br>氣絶10",CN:"(着弾)",CM:20},
			C23:{N:"火炎彈",P:5,ZT:1,ZB:300,K:20,CN:"(着弾)",CM:20},
			C24:{N:"水冷彈",P:5,ZT:2,ZB:150,C:"<br>x<i>3回</i>",K:17,CN:"(着弾)",CM:20},
			C25:{N:"電擊彈",P:5,ZT:3,ZB:170,C:"<br>x<i>3回</i>",K:17,CN:"(着弾)",CM:20},
			C26:{N:"冰結彈",P:5,ZT:5,ZB:150,C:"<br>x<i>3回</i>",K:17,CN:"(着弾)",CM:20},
			C27:{N:"滅龍彈",P:5,ZT:4,ZP:720,C:"<br>x<i>6回</i>",K:100,CN:"(着弾)",CM:20},
			C28:{N:"排熱彈",P:-1},
			C29:{N:"爆擊彈",P:-1},
			C30:{N:"爆擊彈:然",P:-1},
			C31:{N:"龍爆擊彈",P:-1},

			//パーフェクト圧縮
			P0:{N:"LV1通常弾",P:31,K:3,CN:"(着弾)",CM:10},
			P1:{N:"LV2通常弾",P:73,K:5,CN:"(着弾)",CM:20},
			P2:{N:"LV3通常弾",P:72,C:"x<i>n回</i>",K:7,CN:"(着弾)",CM:10},
			P3:{N:"LV1貫通弾",P:70,C:"x<i>3回</i>",K:7,CN:"(着弾)",CM:20},
			P4:{N:"LV2貫通弾",P:62,C:"x<i>4回</i>",K:7,CN:"(着弾)",CM:20},
			P5:{N:"LV3貫通弾",P:49,C:"x<i>6回</i>",K:14,CN:"(着弾)",CM:20},
			P6:{N:"LV1散弾",P:40,ZT:2,ZP:35,C:"<br>x<i>3回</i>",K:6,CN:"(着弾)",CM:5},
			P7:{N:"LV2散弾",P:40,ZT:2,ZP:25,C:"<br>x<i>4回</i>",K:6,CN:"(着弾)",CM:5},
			P8:{N:"LV3散弾",P:40,ZT:2,ZP:25,C:"<br>x<i>5回</i>",K:6,CN:"(着弾)",CM:5},
			P12:{N:"LV1拡散弾",P:-1},
			P13:{N:"LV2拡散弾",P:-1},
			P14:{N:"LV3拡散弾",P:-1},
			P15:{N:"LV1回復弾",P:0,C:"<br>回復30"},
			P16:{N:"LV2回復弾",P:0,C:"<br>回復50"},
			P17:{N:"LV1毒弾",P:80,IT:1,IP:25,K:25},
			P18:{N:"LV2毒弾",P:110,IT:1,IP:50,K:25},
			P19:{N:"LV1麻痺弾",P:80,IT:2,IP:25,K:25},
			P20:{N:"LV2麻痺弾",P:110,IT:2,IP:50,K:25},
			P21:{N:"LV1睡眠弾",P:0,IT:3,IP:25,K:25},
			P22:{N:"LV2睡眠弾",P:0,IT:3,IP:50,K:25},

			P9:{N:"LV1徹甲榴弾",P:20,K:25,BN:"(爆破)",BM:30,BFZ:20,BC:"<br>氣絶10",CN:"(着弾)",CM:20},
			P10:{N:"LV2徹甲榴弾",P:20,K:25,BN:"(爆破)",BM:40,BFZ:30,BC:"<br>氣絶10",CN:"(着弾)",CM:20},
			P11:{N:"LV3徹甲榴弾",P:20,K:25,BN:"(爆破)",BM:50,BFZ:40,BC:"<br>氣絶10",CN:"(着弾)",CM:20},
			P23:{N:"火炎彈",P:8,ZT:1,ZB:400,K:20,CN:"(着弾)",CM:20},
			P24:{N:"水冷彈",P:8,ZT:2,ZB:200,C:"<br>x<i>3回</i>",K:17,CN:"(着弾)",CM:20},
			P25:{N:"電擊彈",P:8,ZT:3,ZB:215,C:"<br>x<i>3回</i>",K:17,CN:"(着弾)",CM:20},
			P26:{N:"冰結彈",P:8,ZT:5,ZB:200,C:"<br>x<i>3回</i>",K:17,CN:"(着弾)",CM:20},
			P27:{N:"滅龍彈",P:5,ZT:4,ZP:905,C:"<br>x<i>6回</i>",K:100,CN:"(着弾)",CM:20},
			P28:{N:"排熱彈",P:-1},
			P29:{N:"爆擊彈",P:-1},
			P30:{N:"爆擊彈:然",P:-1},
			P31:{N:"龍爆擊彈",P:-1}
			};
INFO[5].Bullet = {
//N:弾名,P:威力,ZT:属性タイプ,ZB:属性倍率,ZP:属性値,IT:異常タイプ,IP:異常値,C:コメント,K:氣絶値,S:速射,M:無属性,BN:爆破名,BM:爆破無属性,BFZ:爆破火属性,BC:爆破コメント
			0:{N:"LV1通常弾",P:6,S:"5発速射"},
			1:{N:"LV2通常弾",P:12,S:"5発速射"},
			2:{N:"LV3通常弾",P:12,C:"x<i>n回</i>"},
			3:{N:"LV1貫通弾",P:10,C:"x<i>3回</i>",S:"3発速射"},
			4:{N:"LV2貫通弾",P:9,C:"x<i>4回</i>"},
			5:{N:"LV3貫通弾",P:7,C:"x<i>6回</i>"},
			6:{N:"LV1散弾",P:5,ZT:2,ZP:5,C:"<br>x<i>3回</i>",S:"3発速射"},
			7:{N:"LV2散弾",P:5,ZT:2,ZP:4,C:"<br>x<i>4回</i>",S:"3発速射"},
			8:{N:"LV3散弾",P:5,ZT:2,ZP:4,C:"<br>x<i>5回</i>",S:"3発速射"},
			12:{N:"LV1拡散弾",P:6,BN:"(子拡散)",BM:32,BFZ:2,BC:"<br>x<i>3個</i>"},
			13:{N:"LV2拡散弾",P:6,BN:"(子拡散)",BM:32,BFZ:2,BC:"<br>x<i>4個</i>"},
			14:{N:"LV3拡散弾",P:6,BN:"(子拡散)",BM:32,BFZ:2,BC:"<br>x<i>5個</i>"},
			15:{N:"LV1回復弾",P:0,C:"<br>回復30"},
			16:{N:"LV2回復弾",P:0,C:"<br>回復50"},
			17:{N:"LV1毒弾",P:10,IT:1,IP:25},
			18:{N:"LV2毒弾",P:15,IT:1,IP:50},
			19:{N:"LV1麻痺弾",P:10,IT:2,IP:25},
			20:{N:"LV2麻痺弾",P:15,IT:2,IP:50},
			21:{N:"LV1睡眠弾",P:0,IT:3,IP:25},
			22:{N:"LV2睡眠弾",P:0,IT:3,IP:50},

			9:{N:"LV1徹甲榴弾",P:3,S:"2発速射",BN:"(爆破)",BM:30,BFZ:40,BC:"<br>氣絶5"},
			10:{N:"LV2徹甲榴弾",P:3,BN:"(爆破)",BM:40,BFZ:60,BC:"<br>氣絶5"},
			11:{N:"LV3徹甲榴弾",P:3,BN:"(爆破)",BM:50,BFZ:80,BC:"<br>氣絶5"},
			23:{N:"火炎彈",P:1,ZT:1,ZB:400				,S:"5発速射"},
			24:{N:"水冷彈",P:1,ZT:2,ZB:130,C:"<br>x<i>3回</i>",S:"3発速射"},
			25:{N:"電擊彈",P:1,ZT:3,ZB:200,C:"<br>x<i>3回</i>",S:"3発速射"},
			26:{N:"冰結彈",P:1,ZT:5,ZB:130,C:"<br>x<i>3回</i>",S:"3発速射"},
			27:{N:"滅龍彈",P:1,ZT:4,ZP:75,C:"<br>x<i>6回</i>"}
			};
INFO[9].Bullet = {
//N:名稱,M:無属性,FZ:火属性値,ZB:属性砲倍率,K:氣絶値,MA:無属性(加算),FZA:火属性値(加算)
			"通常型砲撃LV1":{N:"通常型LV1",M:16,FZ:5,ZB:300,K:3},
			"通常型砲撃LV2":{N:"通常型LV2",M:23,FZ:8,ZB:313,K:4},
			"通常型砲撃LV3":{N:"通常型LV3",M:30,FZ:10,ZB:326,K:5},
			"通常型砲撃LV4":{N:"通常型LV4",M:35,FZ:12,ZB:339,K:6},
			"通常型砲撃LV5":{N:"通常型LV5",M:40,FZ:14,ZB:352,K:7},
			"通常型砲撃LV6":{N:"通常型LV6",M:65,FZ:16,ZB:365,K:8},
			"通常型砲撃LV7":{N:"通常型LV7",M:75,FZ:18,ZB:379,K:9},
			"通常型砲撃LV8":{N:"通常型LV8",M:85,FZ:20,ZB:392,K:10},
			"通常型砲撃LV9":{N:"通常型LV9",M:99,FZ:22,ZB:405,K:11},
			"拡散型砲撃LV1":{N:"拡散型LV1",M:31,FZ:10,ZB:550,K:6},
			"拡散型砲撃LV2":{N:"拡散型LV2",M:44,FZ:20,ZB:563,K:7},
			"拡散型砲撃LV3":{N:"拡散型LV3",M:57,FZ:24,ZB:576,K:8},
			"拡散型砲撃LV4":{N:"拡散型LV4",M:63,FZ:29,ZB:589,K:9},
			"拡散型砲撃LV5":{N:"拡散型LV5",M:68,FZ:34,ZB:602,K:10},
			"拡散型砲撃LV6":{N:"拡散型LV6",M:107,FZ:39,ZB:615,K:11},
			"拡散型砲撃LV7":{N:"拡散型LV7",M:119,FZ:43,ZB:629,K:12},
			"拡散型砲撃LV8":{N:"拡散型LV8",M:133,FZ:47,ZB:642,K:13},
			"拡散型砲撃LV9":{N:"拡散型LV9",M:153,FZ:51,ZB:655,K:14},
			"放射型砲撃LV1":{N:"放射型LV1",M:24,FZ:11,ZB:500,K:5},
			"放射型砲撃LV2":{N:"放射型LV2",M:33,FZ:16,ZB:513,K:6},
			"放射型砲撃LV3":{N:"放射型LV3",M:42,FZ:20,ZB:526,K:7},
			"放射型砲撃LV4":{N:"放射型LV4",M:48,FZ:22,ZB:539,K:8},
			"放射型砲撃LV5":{N:"放射型LV5",M:53,FZ:24,ZB:552,K:9},
			"放射型砲撃LV6":{N:"放射型LV6",M:84,FZ:27,ZB:565,K:10},
			"放射型砲撃LV7":{N:"放射型LV7",M:95,FZ:30,ZB:579,K:11},
			"放射型砲撃LV8":{N:"放射型LV8",M:106,FZ:33,ZB:592,K:12},
			"放射型砲撃LV9":{N:"放射型LV9",M:122,FZ:36,ZB:605,K:13},
			"竜通常型砲撃LV1":{N:"竜撃砲LV1",M:40,FZ:12},
			"竜通常型砲撃LV2":{N:"竜撃砲LV2",M:50,FZ:16},
			"竜通常型砲撃LV3":{N:"竜撃砲LV3",M:62,FZ:18},
			"竜通常型砲撃LV4":{N:"竜撃砲LV4",M:69,FZ:21},
			"竜通常型砲撃LV5":{N:"竜撃砲LV5",M:76,FZ:23},
			"竜通常型砲撃LV6":{N:"竜撃砲LV6",M:120,FZ:25},
			"竜通常型砲撃LV7":{N:"竜撃砲LV7",M:132,FZ:28},
			"竜通常型砲撃LV8":{N:"竜撃砲LV8",M:153,FZ:30},
			"竜通常型砲撃LV9":{N:"竜撃砲LV9",M:172,FZ:33},
			"竜拡散型砲撃LV1":{N:"竜撃砲LV1",M:29,FZ:17},
			"竜拡散型砲撃LV2":{N:"竜撃砲LV2",M:43,FZ:16},
			"竜拡散型砲撃LV3":{N:"竜撃砲LV3",M:55,FZ:18},
			"竜拡散型砲撃LV4":{N:"竜撃砲LV4",M:62,FZ:21},
			"竜拡散型砲撃LV5":{N:"竜撃砲LV5",M:69,FZ:23},
			"竜拡散型砲撃LV6":{N:"竜撃砲LV6",M:109,FZ:25},
			"竜拡散型砲撃LV7":{N:"竜撃砲LV7",M:122,FZ:28},
			"竜拡散型砲撃LV8":{N:"竜撃砲LV8",M:142,FZ:30},
			"竜拡散型砲撃LV9":{N:"竜撃砲LV9",M:159,FZ:33},
			"竜放射型砲撃LV1":{N:"竜撃砲LV1",M:45,FZ:15},
			"竜放射型砲撃LV2":{N:"竜撃砲LV2",M:55,FZ:18},
			"竜放射型砲撃LV3":{N:"竜撃砲LV3",M:67,FZ:21},
			"竜放射型砲撃LV4":{N:"竜撃砲LV4",M:74,FZ:23},
			"竜放射型砲撃LV5":{N:"竜撃砲LV5",M:81,FZ:25},
			"竜放射型砲撃LV6":{N:"竜撃砲LV6",M:139,FZ:28},
			"竜放射型砲撃LV7":{N:"竜撃砲LV7",M:153,FZ:30},
			"竜放射型砲撃LV8":{N:"竜撃砲LV8",M:178,FZ:33},
			"竜放射型砲撃LV9":{N:"竜撃砲LV9",M:198,FZ:35},
			"爆通常型砲撃LV1":{N:"爆竜轟砲LV1",M:120,FZ:36,MA:10,FZA:3},
			"爆通常型砲撃LV2":{N:"爆竜轟砲LV2",M:150,FZ:48,MA:12,FZA:4},
			"爆通常型砲撃LV3":{N:"爆竜轟砲LV3",M:186,FZ:54,MA:15,FZA:4},
			"爆通常型砲撃LV4":{N:"爆竜轟砲LV4",M:207,FZ:63,MA:17,FZA:5},
			"爆通常型砲撃LV5":{N:"爆竜轟砲LV5",M:228,FZ:69,MA:19,FZA:5},
			"爆通常型砲撃LV6":{N:"爆竜轟砲LV6",M:378,FZ:75,MA:30,FZA:6},
			"爆通常型砲撃LV7":{N:"爆竜轟砲LV7",M:415,FZ:88,MA:33,FZA:7},
			"爆通常型砲撃LV8":{N:"爆竜轟砲LV8",M:481,FZ:94,MA:39,FZA:8},
			"爆通常型砲撃LV9":{N:"爆竜轟砲LV9",M:541,FZ:103,MA:43,FZA:9},
			"爆拡散型砲撃LV1":{N:"爆竜轟砲LV1",M:99,FZ:33,MA:33,FZA:12},
			"爆拡散型砲撃LV2":{N:"爆竜轟砲LV2",M:129,FZ:43,MA:43,FZA:16},
			"爆拡散型砲撃LV3":{N:"爆竜轟砲LV3",M:165,FZ:54,MA:55,FZA:18},
			"爆拡散型砲撃LV4":{N:"爆竜轟砲LV4",M:186,FZ:63,MA:62,FZA:21},
			"爆拡散型砲撃LV5":{N:"爆竜轟砲LV5",M:207,FZ:69,MA:69,FZA:23},
			"爆拡散型砲撃LV6":{N:"爆竜轟砲LV6",M:343,FZ:75,MA:109,FZA:25},
			"爆拡散型砲撃LV7":{N:"爆竜轟砲LV7",M:384,FZ:88,MA:122,FZA:28},
			"爆拡散型砲撃LV8":{N:"爆竜轟砲LV8",M:447,FZ:94,MA:142,FZA:30},
			"爆拡散型砲撃LV9":{N:"爆竜轟砲LV9",M:500,FZ:103,MA:159,FZA:33},
			"爆放射型砲撃LV1":{N:"爆竜轟砲LV1",M:150,FZ:30,MA:22,FZA:6},
			"爆放射型砲撃LV2":{N:"爆竜轟砲LV2",M:165,FZ:54,MA:27,FZA:7},
			"爆放射型砲撃LV3":{N:"爆竜轟砲LV3",M:201,FZ:63,MA:33,FZA:9},
			"爆放射型砲撃LV4":{N:"爆竜轟砲LV4",M:202,FZ:69,MA:37,FZA:10},
			"爆放射型砲撃LV5":{N:"爆竜轟砲LV5",M:243,FZ:75,MA:40,FZA:12},
			"爆放射型砲撃LV6":{N:"爆竜轟砲LV6",M:444,FZ:84,MA:70,FZA:14},
			"爆放射型砲撃LV7":{N:"爆竜轟砲LV7",M:489,FZ:96,MA:77,FZA:15},
			"爆放射型砲撃LV8":{N:"爆竜轟砲LV8",M:569,FZ:105,MA:89,FZA:17},
			"爆放射型砲撃LV9":{N:"爆竜轟砲LV9",M:633,FZ:112,MA:99,FZA:17}
			};
INFO[10].Bullet = {
//N:名稱,P:威力,C:コメント
			"連射1":{N:"連射LV1",P:[12],C:"|12"},
			"連射2":{N:"連射LV2",P:[12,5],C:"|12-5"},
			"連射3":{N:"連射LV3",P:[12,5,4],C:"|12-5-4"},
			"連射4":{N:"連射LV4",P:[12,5,4,2],C:"|12-5-4-2"},
			"拡散1":{N:"拡散LV1",P:[5,4],C:"|4-5-4"},
			"拡散2":{N:"拡散LV2",P:[6,5],C:"|5-6-5"},
			"拡散3":{N:"拡散LV3",P:[5,4],C:"|4-5-5-5-4"},
			"拡散4":{N:"拡散LV4",P:[6,5,4],C:"|4-5-6-5-4"},
			"貫通1":{N:"貫通LV1",P:[6],C:"|6x3回"},
			"貫通2":{N:"貫通LV2",P:[6],C:"|6x4回"},
			"貫通3":{N:"貫通LV3",P:[6],C:"|6x5回"},
			"貫通4":{N:"貫通LV4",P:[6],C:"|6x6回"},
			"オーラ4":{N:"オーラ LV4",P:[12],C:"|12"},
			"オーラ5":{N:"オーラ LV5",P:[12],C:"|12"},
			"貫薙4":{N:"貫薙 LV4",P:[47],C:"|47x6"},
			"貫薙5":{N:"貫薙 LV5",P:[47],C:"|47x6"},
			"放散型":{N:"放散",P:18,K:3,C:"|18x7回"},
			"集中型":{N:"集中",P:16,K:2,C:"|16x5回"},
			"爆裂型":{N:"爆裂",P:15,K:30,C:"|15"},
			"切断型":{N:"切断",P:12,C:"|12x7回"}
			};
INFO[10].IzyoBin = {"近接":2,
					//ノーマル,+1,+2,+3
					"連射":[[13,7,5,4],[14,8,5,4],[17,9,6,5],[19,10,7,6]],
					"拡散":[[5,6,5,5],[5,6,5,5],[6,7,6,6],[7,9,7,7]],
					"貫通":[[5,4,4,4],[5,4,4,4],[6,5,5,5],[7,6,6,6]],
					"オー":25,"貫薙":19,"放散":2,"集中":6,"爆裂":0,"切断":2};
INFO[10].BakuBin = {"近接":{Normal:2,TenRan:10},
					"連射":[70,40,32,28],
					"拡散":[26,32,22,24],
					"貫通":[28,28,28,28],
					"オー":37,"貫薙":0,"オー火事場":55,"放散":26,"集中":28,"爆裂":50,"爆裂追加":100,"切断":24};
INFO[10].DaBin = {"近接":0,
					"連射":4,
					"拡散":4,
					"貫通":4,
					"オー":20,"貫薙":0,"放散":4,"集中":4,"爆裂":4,"切断":4};
setItem = null;
var global = {
//------------------------------------初期化----------
init : function(){
//ヴァージョンチェック
if (debug) var time = new Date().getTime();
//対戦相手
this.m_enemy = document.getElementById("m_enemy");
this.m_def = document.getElementById("m_def");
this.d_def = document.getElementById("d_def");
this.m_class = document.getElementById("m_class");
this.m_class.selectedIndex = 0;
this.m_hc = document.getElementById("m_hc");
this.m_status = document.getElementById("m_status");
this.m_ang = document.getElementById("m_ang");
this.m_enemy.selectedIndex = 0;
this.enemy_gou = false;
this.enemy_hc = false;
//武器選択
this.s_rui = document.getElementById("s_rui");
this.s_wp = document.getElementById("s_wp");
this.s_srt = document.getElementById("s_srt");
this.s_srt_zoku = this.s_srt.options[3];
this.s_srt_zyou = this.s_srt.options[4];
this.s_srt_tama = this.s_srt.options[5];
this.s_slot = document.getElementById("s_slot");
this.s_hr = document.getElementById("s_hr");
this.s_rare = document.getElementById("s_rare");
this.c_rep2 = document.getElementById("c_rep2");
this.c_rep3 = document.getElementById("c_rep3");
this.c_rep5 = document.getElementById("c_rep5");
this.c_rept = document.getElementById("c_rept");
this.c_repi = document.getElementById("c_repi");
this.c_repg = document.getElementById("c_repg");
this.c_repk = document.getElementById("c_repk");
this.c_repp = document.getElementById("c_repp");
this.c_repm = document.getElementById("c_repm");
this.s_wp.selectedIndex = this.s_rui.selectedIndex = 0;
this.wp_Gclass = false;
this.wp_tenran = false;
this.wp_gousyu = false;
this.wp_bin = false;
this.wp_hc = false;
//武器選択（個別）
this.s_ken_G_Style = document.getElementById("s_ken_G").style;
this.s_zoku_ken = document.getElementById("s_zoku_ken");
this.s_zyoutai = document.getElementById("s_zyoutai");
this.s_reach = document.getElementById("s_reach");
this.s_guns = document.getElementById("s_guns");
this.s_fue = document.getElementById("s_fue");

this.s_yumi_G_Style = document.getElementById("s_yumi_G").style;
this.s_zoku_yumi = document.getElementById("s_zoku_yumi");
this.s_tame = document.getElementById("s_tame");
this.s_ya = document.getElementById("s_ya");
this.s_kyoku = document.getElementById("s_kyoku");
this.s_bin = document.getElementById("s_bin");

this.s_gun_G_Style = document.getElementById("s_gun_G").style;
this.s_tama1 = document.getElementById("s_tama1");
this.s_tama2 = document.getElementById("s_tama2");
this.s_reload = document.getElementById("s_reload");
this.s_kick = document.getElementById("s_kick");
this.s_speed = document.getElementById("s_speed");
//条件
this.c_style = document.getElementById("c_style");

this.c_ken_G_Style = document.getElementById("c_ken_G").style;
this.c_sharp = document.getElementById("c_sharp");
this.c_kiri = document.getElementById("c_kiri");
this.c_kensyo = document.getElementById("c_kensyo");

this.c_gun_G_Style = document.getElementById("c_gun_G").style;
this.c_tama = document.getElementById("c_tama");
this.c_tamaAdd = document.getElementById("c_tamaAdd");
this.c_shot = document.getElementById("c_shot");

this.c_yumi_G_Style = document.getElementById("c_yumi_G").style;
this.c_tame = document.getElementById("c_tame");
this.c_ya = document.getElementById("c_ya");
this.c_bin = document.getElementById("c_bin");
//技能·道具
this.c_gohu = document.getElementById("c_gohu");
this.c_tume = document.getElementById("c_tume");
this.c_kyokuat = document.getElementById("c_kyokuat");
this.c_mesi = document.getElementById("c_mesi");
this.c_tane = document.getElementById("c_tane");
this.c_fueAtUp = document.getElementById("c_fueAtUp");
this.c_fueAtAdd = document.getElementById("c_fueAtAdd");
this.c_fueZK = document.getElementById("c_fueZK");
this.c_attUp = document.getElementById("c_attUp");
this.c_criUp = document.getElementById("c_criUp");
this.c_sen = document.getElementById("c_sen");
this.c_soko = document.getElementById("c_soko");
this.c_zkUp = [,document.getElementById("c_zkUp1"),document.getElementById("c_zkUp2"),document.getElementById("c_zkUp3"),document.getElementById("c_zkUp4"),document.getElementById("c_zkUp5")];
this._c_zkAtUp = document.getElementById("_c_zkAtUp");
this.c_hit = document.getElementById("c_hit");
this.c_adjust = document.getElementById("c_adjust");
this.c_kenzyutu = document.getElementById("c_kenzyutu");
this.c_honki = document.getElementById("c_honki");
this.c_tamaAtUp = document.getElementById("c_tamaAtUp");
this.c_houzyutu = document.getElementById("c_houzyutu");
this.c_taizyutu = document.getElementById("c_taizyutu");
this.c_izyou = document.getElementById("c_izyou");
this.c_geki = document.getElementById("c_geki");
this.c_kizuna = document.getElementById("c_kizuna");
this.c_wolf = document.getElementById("c_wolf");
this.c_garou = document.getElementById("c_garou");
this.c_karyudo = document.getElementById("c_karyudo");
this.c_karyudo_ransya = this.c_karyudo.options[4];
this.c_kobetu1_Text = document.getElementById("c_kobetumei1").firstChild;
this.c_kobetu1 = document.getElementById("c_kobetu1");
this.c_kobetu2_Text = document.getElementById("c_kobetumei2").firstChild;
this.c_kobetu2 = document.getElementById("c_kobetu2");
this.c_sensya = document.getElementById("c_sensya");
this.c_katsu = document.getElementById("c_katsu");
this.c_sien = document.getElementById("c_sien");
this.c_reflect = document.getElementById("c_reflect");
this.c_tameAtUp = document.getElementById("c_tameAtUp");
this.c_sinkaLv = document.getElementById("c_sinkaLv");
this.c_GclassLv = document.getElementById("c_GclassLv");
this.c_hiden = document.getElementById("c_hiden");
this.c_srcri = document.getElementById("c_srcri");
this.c_srup = document.getElementById("c_srup");
this.c_tenran = document.getElementById("c_tenran");
this.c_hasyu = document.getElementById("c_hasyu");
this.c_Gkyu = document.getElementById("c_Gkyu");
this.c_fw = document.getElementById("c_fw");
this.c_mission = document.getElementById("c_mission");
this.c_kyokuAtAdd = document.getElementById("c_kyokuAtAdd");
this.k_cri = document.getElementById("k_cri");
this.k_motion = document.getElementById("k_motion");
this.k_gou = document.getElementById("k_gou");

//入力
this.sub_Neko = document.getElementById("sub_Neko");
this.i_att = document.getElementById("i_att");
this.i_zoku_disp = document.getElementById("i_zoku_disp");
this.i_zoku = document.getElementById("i_zoku");
this.i_cri = document.getElementById("i_cri");
this.i_set_B = document.getElementById("i_set_B");
this.i_yumi = document.getElementById("i_yumi");
this.i_ya1 = document.getElementById("i_ya1");
this.i_ya2 = document.getElementById("i_ya2");
this.i_ya3 = document.getElementById("i_ya3");
this.i_ya4 = document.getElementById("i_ya4");
this.i_yaLv1 = document.getElementById("i_yaLv1");
this.i_yaLv2 = document.getElementById("i_yaLv2");
this.i_yaLv3 = document.getElementById("i_yaLv3");
this.i_yaLv4 = document.getElementById("i_yaLv4");
this.i_sizilatt = document.getElementById("i_sizilatt");
this.i_sizilzoku = document.getElementById("i_sizilzoku");
this.i_sizilcri = document.getElementById("i_sizilcri");
this.c_sizilMotCng = document.getElementById("c_sizilMotCng");
this.c_sizilMuUp = document.getElementById("c_sizilMuUp");
this.c_sizilMotUp = document.getElementById("c_sizilMotUp");
this.c_sizilReachUp = document.getElementById("c_sizilReachUp");
this.c_sizilkyoku = document.getElementById("c_sizilkyoku");
this.c_sizilgunscng = document.getElementById("c_sizilgunscng");
this.c_sizilgunsup = document.getElementById("c_sizilgunsup");
//結果
this.d_att = document.getElementById("d_att");
this.d_zoku = document.getElementById("d_zoku");
this.d_cri = document.getElementById("d_cri");
this.d_doc = document.getElementById("d_doc");
this.d_hr = document.getElementById("d_hr");
this.d_spec = document.getElementById("d_spec");
this.d_slot = document.getElementById("d_slot");
this.d_class = document.getElementById("d_class");
this.g_att = document.getElementById("g_att");
this.g_zoku = document.getElementById("g_zoku");
this.g_cri = document.getElementById("g_cri");
this.g_attB = document.getElementById("g_attB");
this.g_attN = document.getElementById("g_attN");
this.g_zokuN = document.getElementById("g_zokuN");
this.damage = document.getElementById("damage");
this.damage_head = this.damage.getElementsByTagName("thead")[0];
this.damage_head_col = this.damage.getElementsByTagName("col")[1]
this.damage_data = this.damage.getElementsByTagName("tbody")[0];
if (CK_FULL) {
	this.niku = document.getElementById("niku").getElementsByTagName("tbody")[0];
} else {
	this.damage_col = 1;
	for (var cell = this.damage_head.rows[1].cells.length-1; cell > 3; cell--) {
		var w = this.damage_data.rows;
		this.damage_head.rows[1].cells[cell].style.display = 
			w[0].cells[cell].style.display = 
			w[1].cells[cell].style.display = 
			w[2].cells[cell].style.display = 
			w[3].cells[cell].style.display = 
			w[4].cells[cell].style.display = 
			w[5].cells[cell].style.display = 
			w[6].cells[cell].style.display =  "none";
	}
	this.damage_head.rows[0].cells[0].colSpan = 5;
	this.damage_head_col.span = 4;
}
//子画面
this.sub_Win = document.getElementById("sub_Win");
this.sub_WinBody = document.getElementById("sub_WinBody");
this.debug = document.getElementById("debug");
if (debug) this.debug.innerText += "init:" + (new Date().getTime() - time) + "\n",this.debug.style.display ="";
}
//------------------------------------データセット----------
,setEquip : function (name,data){
MST_Equip[name]=data;
}
,setSinka : function (name,data){
MST_Equip_Sinka[name]=data;
}
,setSozai : function (data){
MST_Equip["sozai"]=data;
}
,setMos : function (data){
MST_Monster=data;
}
,setMosList : function (data){
MST_Monster_List=data;
}
//------------------------------------武器個別----------
,cngKobetu1 : function(){}
//------------------------------------武器個別----------
,cngKobetu2 : function(){}
//------------------------------------武器切替時補足----------
,cngWpSub : function(){}
//------------------------------------武器セット----------
,setWeapon : function(){
if (!this.s_rui.value) return;
if (debug) var time = new Date().getTime();

//武器の情報セット
WP_Rui = +this.s_rui.value,WP_Info = INFO[WP_Rui];

//画面情報のクリア
this.s_wp.length = 1,this.c_kobetu1.selectedIndex = this.c_kobetu2.selectedIndex = 0;
this.c_sizilgunscng.style.display = this.c_sizilgunsup.style.display = "inline";
this.c_kenzyutu.style.display = this.c_sinkaLv.style.display = this.c_GclassLv.style.display = this.s_reach.style.display = this.s_guns.style.display = this.s_fue.style.display = this.c_sizilkyoku.style.display = "none";
this.c_kobetu1_Text.nodeValue = this.c_kobetu2_Text.nodeValue = "";
this.cngKobetu1 = function(){},this.cngKobetu2 = function(){};

//表示項目のONOFF
switch (WP_Rui) {
case 1: //重弩
case 5: //輕弩
	this.s_ken_G_Style.display = this.s_yumi_G_Style.display = this.c_ken_G_Style.display = this.c_yumi_G_Style.display = "none";
	this.c_sharp.value = 3;
	this.c_tama.length = 1,this.c_tama.options[0].value = "",this.c_tama.options[0].text = "---------------";
	this.c_sensya.selectedIndex = 0;
	this.s_gun_G_Style.display = this.c_gun_G_Style.display = "inline";
	this.c_tamaAtUp.disabled = this.c_houzyutu.disabled = this.c_sensya.disabled = false;
	this.c_taizyutu.disabled = this.c_sizilgunscng.disabled = this.c_sizilgunsup.disabled = this.c_sizilkyoku.disabled = true;
	this.c_karyudo.options[4] = this.c_karyudo_ransya;
	this.s_srt.length = 4,this.s_srt.options[3] = this.s_srt_tama;
	this.c_soko.options[1].value = 13;
	break;
case 10: //弓
	this.s_ken_G_Style.display = this.s_gun_G_Style.display = this.c_ken_G_Style.display = this.c_gun_G_Style.display = this.c_sizilgunscng.style.display = this.c_sizilgunsup.style.display = "none";
	this.c_sharp.value = 3;
	this.c_tame.length = this.c_ya.length = 1,this.c_ya.options[0].value = "",this.c_ya.options[0].text = "-----";
	this.c_sensya.selectedIndex = this.c_tame.selectedIndex = this.c_ya.selectedIndex = 0;
	this.s_yumi_G_Style.display = this.c_yumi_G_Style.display = this.c_sizilkyoku.style.display = "inline";
	this.c_sensya.disabled = this.c_tamaAtUp.disabled = this.c_sizilkyoku.disabled = false;
	this.c_houzyutu.disabled = this.c_taizyutu.disabled = true;
	this.c_karyudo.options[4] = this.c_karyudo_ransya;
	this.s_srt.length = 4,this.s_srt.options[3] = this.s_srt_zoku;
	this.c_soko.options[1].value = 15;
	break;
default: //劍用
	this.s_gun_G_Style.display = this.s_yumi_G_Style.display = this.c_gun_G_Style.display = this.c_yumi_G_Style.display = "none";
	this.s_ken_G_Style.display = this.c_ken_G_Style.display = this.c_kenzyutu.style.display = "inline";
	this.c_tamaAtUp.disabled = this.c_houzyutu.disabled = this.c_taizyutu.disabled = this.c_sensya.disabled = this.c_sizilgunscng.disabled = this.c_sizilgunsup.disabled = this.c_sizilkyoku.disabled = true;
	this.c_karyudo.length = 4;
	this.s_srt.length = 5,this.s_srt.options[3] = this.s_srt_zoku,this.s_srt.options[4] = this.s_srt_zyou;
	this.c_soko.options[1].value = 15;
}
//秘伝防具技能
this.c_hiden.options[3].text = WP_Info.Hiden;
switch (WP_Rui) {
case 4: //單手劍
	this.c_hiden.options[2].value = "12";
	this.c_hiden.options[3].value = this.c_hiden.options[4].value = "13";
	break;
case 1: //重弩
case 5: //輕弩
case 10: //弓
	this.c_hiden.options[2].value = "11";
	this.c_hiden.options[3].value = "12";
	this.c_hiden.options[4].value = "14";
	break;
default: //劍用
	this.c_hiden.options[2].value = "11";
	this.c_hiden.options[3].value = this.c_hiden.options[4].value = "12";
}
//表記変更
if (CK_FULL) {
	this.c_soko.options[1].text = this.c_soko.options[1].text.substring(0,6) + (this.c_soko.options[1].value/10).toFixed(1) + "倍";
	this.c_hiden.options[2].text = this.c_hiden.options[2].text.substring(0,2) + "|" + ((this.c_hiden.options[2].value/10).toFixed(1)) + "倍";
	this.c_hiden.options[3].text = this.c_hiden.options[3].text.substring(0,2) + "|" + ((this.c_hiden.options[3].value/10).toFixed(1)) + "倍";
	this.c_hiden.options[4].text = this.c_hiden.options[4].text.substring(0,2) + "|" + ((this.c_hiden.options[4].value/10).toFixed(1)) + "倍";
}

//武器毎の表記セット
switch (WP_Rui) {
case 0: //大劍
	this.s_reach.style.display = "inline";
	this.c_kobetu1_Text.nodeValue = "刃部",this.c_kobetu1.length = 2,this.c_kobetu1.options[1].text = "中腹";
	break;
case 1: //重弩
case 5: //輕弩
	if (WP_Rui === 1){ //ヘビィ
		this.c_shot.length = 3,this.c_shot.options[0].text = "裝填",this.c_shot.options[1].text = "圧縮",this.c_shot.options[2].text = "Ｐ";
		this.c_kobetu1_Text.nodeValue = "パワーB",this.c_kobetu1.length = 2,this.c_kobetu1.options[1].text = "あり",this.c_kobetu1.selectedIndex = 1;
	} else { //ライト
		this.c_shot.length = 3,this.c_shot.options[0].text = "ショット",this.c_shot.options[1].text = "ジャスト",this.c_shot.options[2].text = "Ｐ";
	}
	this.cngKobetu2 = function(){this.setMotion();} //ステップ有無（ライト）·蓄力（ヘビィ）
	//武器を選ぶ度に実行
	this.cngWpSub = function(eq){
		if (debug) var time = new Date().getTime();
		//弾
		var df = document.createDocumentFragment(),o = document.createElement("option");
		for (var i = 0,c = 0;i < 28;i++) {
			if (eq[I_aGUN+i] !== "0") { //0以外
				o.setAttribute("value", i),df.appendChild(o.cloneNode(false));
				if (eq[I_aGUN+i] < 0) {	//マイナス＝弾追加
					df.lastChild.style.backgroundColor = "lightpink";
					c = +eq[I_aGUN+i] - this.c_tamaAdd.checked;
				} else {
					c = +eq[I_aGUN+i] + this.c_tamaAdd.checked;
				}
				df.lastChild.appendChild(document.createTextNode(WP_Info.Bullet[i].N + ":" + c + "発"));
			}
		}
		//個別設定
		if (WP_Rui === 1) { //ヘビィ
			//バレル名変更
			this.c_kobetu1_Text.nodeValue = this.wp_gousyu ? "ヘビィB" : "パワーB";
			//剛武器·進化の設定
			if (this.wp_gousyu) {
				o.setAttribute("value", 28),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("排熱彈"));
			} else if (eq[I_aCLASS] === "S") {
				switch (eq[I_aSINKAGR]) {
				case "1": //【燦然】
					o.setAttribute("value", 30),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("爆擊彈")); //派生後
					break;
				case "2": //【絢爛】
					o.setAttribute("value", 31),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("龍爆擊彈"));
					break;
				case "3": //【煌然】
					o.setAttribute("value", 30),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("爆擊彈")); //派生後
					o.setAttribute("value", 31),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("龍爆擊彈"));
					break;
				default:
					o.setAttribute("value", 29),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("爆擊彈")); //派生前
				}
			}
		}
		//弾セット
		this.c_tama.length = 0,this.c_tama.appendChild(df);
		if (!this.s_tama1.value || CK_IE6) {
			this.c_tama.selectedIndex = 1;
		} else {
			this.c_tama.value = this.s_tama1.value;
		}
		if (debug) this.debug.innerText += "cngWpSub:" + (new Date().getTime() - time) + "\n";
	}
	break;
case 2: //大錘
case 3: //長槍
case 4: //單手劍
	this.s_reach.style.display = "inline";
	break;
case 6: //雙劍
	this.s_reach.style.display = "inline";
	if (!this.sou_hauchi) {
		var df = document.createDocumentFragment(),o = document.createElement("option");
		o.setAttribute("value", "100"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("沒有"));
		o.setAttribute("value", "105"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("１回"));
		o.setAttribute("value", "110"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("２回"));
		o.setAttribute("value", "115"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("３回"));
		o.setAttribute("value", "120"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("４回"));
		this.sou_hauchi = df;
	}
	this.c_kobetu1_Text.nodeValue = "鬼人",this.c_kobetu1.length = 4,this.c_kobetu1.options[1].text = "発動",this.c_kobetu1.options[2].text = "開放",this.c_kobetu1.options[3].text = "赤消費";
	this.c_kobetu2_Text.nodeValue = "刃打",this.c_kobetu2.length = 0,this.c_kobetu2.appendChild(this.sou_hauchi.cloneNode(true));
	this.cngKobetu1 = function(){this.setMotion();}
	break;
case 7: //太刀
	this.s_reach.style.display = "inline";
	this.c_kobetu1_Text.nodeValue = "氣刃",this.c_kobetu1.length = 2,this.c_kobetu1.options[1].text = "発動";
	this.c_kobetu2_Text.nodeValue = "刃部",this.c_kobetu2.length = 2,this.c_kobetu2.options[0].text = "沒有",this.c_kobetu2.options[1].text = "中腹";
	this.cngKobetu1 = function(){
		if (!this.c_kobetu1.selectedIndex) this.c_tane.value = 0; //氣刃沒有状態 限時は強制解除
		this.setMotion();
	}
	break;
case 8: //狩獵笛
	this.s_fue.style.display = "inline";
	break;
case 9: //銃槍
	this.s_guns.style.display = "inline";
	this.c_sizilgunscng.disabled = this.c_sizilgunsup.disabled = this.c_houzyutu.disabled = false;
	//HB有無を変えたら動作を変更
	this.cngKobetu2 = function(){this.setMotion();}
	break;
case 10: //弓
	//武器を選ぶ度に実行
	this.cngWpSub = function(eq){
		if (debug) var time = new Date().getTime();
		//蓄力(矢)
		var kyoku_name = KYOKUNAME[eq[I_aGR] && this.c_sizilkyoku.value ? this.c_sizilkyoku.value : eq[I_aKYOKUSYA]],df = document.createDocumentFragment(),o = document.createElement("option");
		o.setAttribute("value", kyoku_name),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("曲射:" + WP_Info.Bullet[kyoku_name].N + (CK_FULL ? WP_Info.Bullet[kyoku_name].C : "")));
		for (var i = 0,ya_G = eq[I_aYA].split(":"); i < 4; i++){
			o.setAttribute("value", ya_G[i]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode((i+1) + ":" + WP_Info.Bullet[ya_G[i]].N + (CK_FULL ? WP_Info.Bullet[ya_G[i]].C : "")));
		}
		this.c_tame.length = 1,this.c_tame.appendChild(df);
		this.setAuraArrow();
		this.c_tame.selectedIndex = 4;

		//ビン
		var bin = eq[I_aBIN],b = (CK_FULL ? "ビン" : ""),df = document.createDocumentFragment(),o = document.createElement("option");
		if (bin.indexOf("強") !== -1) o.setAttribute("value", "KG"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("強撃"+b));
		o.setAttribute("value", "11" + (bin.indexOf("毒+") !== -1 ? bin.charAt(bin.indexOf("毒+") + 2) : 0)),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("毒"+b));
		if (bin.indexOf("毒") === -1) df.lastChild.style.backgroundColor = "lightpink";
		o.setAttribute("value", "12" + (bin.indexOf("麻+") !== -1 ? bin.charAt(bin.indexOf("麻+") + 2) : 0)),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("麻痺"+b));
		if (bin.indexOf("麻") === -1) df.lastChild.style.backgroundColor = "lightpink";
		o.setAttribute("value", "13" + (bin.indexOf("睡+") !== -1 ? bin.charAt(bin.indexOf("睡+") + 2) : 0)),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("睡眠"+b));
		if (bin.indexOf("睡") === -1) df.lastChild.style.backgroundColor = "lightpink";
		if (bin.indexOf("爆") !== -1) o.setAttribute("value", "BA"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("爆撃"+b));
		if (bin.indexOf("打") !== -1) o.setAttribute("value", "DA"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("打撃"+b));
		this.c_bin.length = 1,this.c_bin.appendChild(df);

		this.cngTame();
		if (debug) this.debug.innerText += "cngWpSub:" + (new Date().getTime() - time) + "\n";
	}
	//蓄力を変えるたびに実行
	this.cngTame = function(){
		if (debug) this.debug.innerText += "cngTame:\n";
		//矢セット
		var df = document.createDocumentFragment(),o = document.createElement("option");
		if (this.c_tame.selectedIndex <= 1) { //近接、曲射
			df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("-----"));
		} else {
			for (var i = 0,w = WP_Info.Bullet[this.c_tame.value].P,max = w.length; i < max ; i++) {
				o.setAttribute("value", i),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode((i+1) + "矢:" + w[i]));
			}
		}
		this.c_ya.length = 0,this.c_ya.appendChild(df);
	}
	//オーラアロー追加
	this.setAuraArrow = function(){
		if (debug) this.debug.innerText += "setAuraArrow:\n";
		if (!this.s_wp.value) return;
		this.c_tame.length = 6;
		if (this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex) {
			if (this.c_sizilMotCng.checked) {
				this.c_tame.appendChild(this.yumi_nagi.cloneNode(true));
			} else {
				this.c_tame.appendChild(this.yumi_aura.cloneNode(true));
			}
		}
	}
	if (!this.yumi_aura) {
		var df = document.createDocumentFragment(),o = document.createElement("option");
		o.setAttribute("value", "オーラ4"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("4:" + WP_Info.Bullet["オーラ4"].N + (CK_FULL ? WP_Info.Bullet["オーラ4"].C : "")));
		o.setAttribute("value", "オーラ5"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("5:" + WP_Info.Bullet["オーラ5"].N + (CK_FULL ? WP_Info.Bullet["オーラ5"].C : "")));
		this.yumi_aura = df.cloneNode(true);
		var df = document.createDocumentFragment(),o = document.createElement("option");
		o.setAttribute("value", "貫薙4"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("4:" + WP_Info.Bullet["貫薙4"].N + (CK_FULL ? WP_Info.Bullet["貫薙4"].C : "")));
		o.setAttribute("value", "貫薙5"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("5:" + WP_Info.Bullet["貫薙5"].N + (CK_FULL ? WP_Info.Bullet["貫薙5"].C : "")));
		this.yumi_nagi = df.cloneNode(true);
	}
	//立ち有無を変えたら動作を変更
	this.cngKobetu2 = function(){this.setAuraArrow();this.setMotion();}
	break;
case 11: //穿龍棍
	this.c_houzyutu.disabled = this.c_taizyutu.disabled = false;
	this.c_kobetu1_Text.nodeValue = "槽",this.c_kobetu1.length = 6,this.c_kobetu1.options[1].text = "１",this.c_kobetu1.options[2].text = "２",this.c_kobetu1.options[3].text = "３",this.c_kobetu1.options[4].text = "４",this.c_kobetu1.options[5].text = "５";
	this.c_kobetu2_Text.nodeValue = "リーチ",this.c_kobetu2.length = 2,this.c_kobetu2.options[0].text = "長",this.c_kobetu2.options[1].text = "短";
	//リーチを変えたら動作を変更
	this.cngKobetu2 = function(){this.setMotion();}
	break;
}
//表示
this.damage_head.rows[1].cells[0].innerHTML = "武器補正<br>"+BUKITYPE[WP_Info.Type] + WP_Info.Hosei + (WP_Info.Type === 2 ? "%<br>(氣絶値)" : WP_Rui === 3 ? "%<br>打72%" : "%");

//個別設定の切り替え
this.c_kobetu1.style.display = this.c_kobetu1_Text.nodeValue ? "inline" : "none";
this.c_kobetu2.style.display = this.c_kobetu2_Text.nodeValue ? "inline" : "none";

this.setHiden();
this.cngStyle();
this.setMotion();
this.d_att.firstChild.nodeValue = this.d_zoku.firstChild.nodeValue = this.d_cri.firstChild.nodeValue = this.d_doc.firstChild.nodeValue = this.d_hr.firstChild.nodeValue = this.d_spec./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = this.d_slot.firstChild.nodeValue = this.d_class.firstChild.nodeValue = this.g_att.firstChild.nodeValue = this.g_zoku.firstChild.nodeValue = this.g_cri.firstChild.nodeValue = this.g_attB.firstChild.nodeValue = this.g_attN.firstChild.nodeValue = this.g_zokuN.firstChild.nodeValue = "　";

//事前展開
var eqlist = MST_Equip[WP_Info.Id];
for (var eqid in eqlist) {
	if (typeof eqlist[eqid] !== "string") break;
	eqlist[eqid] = eqlist[eqid].split(",");
}
eqlist = MST_Equip_Sinka[WP_Info.Id];
for (var i = 0,m = eqlist.length; i < m; i++) {
	if (typeof eqlist[i] !== "string") break;
	eqlist[i] = eqlist[i].split(",");
	for (var j = 0,w = eqlist[i]; j < 100; w[j] = w[j++].split("."));
}
this.setSinkaAtt();
this.search();
if (debug) this.debug.innerText += "setWeapon:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------スタイル別表記----------
,cngStyle : function(){
if (debug) var time = new Date().getTime();
switch (WP_Rui) {
case 1: //重弩
	switch (this.c_style.value) {
	case "地":
	case "天":
		this.c_kobetu2_Text.nodeValue = "",this.c_kobetu2.selectedIndex = 0;
		break;
	case "嵐":
		if (!this.heavy_tame) {
			var df = document.createDocumentFragment(),o = document.createElement("option");
			o.setAttribute("value", "95"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("０"));
			o.setAttribute("value", "115"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("１"));
			o.setAttribute("value", "130"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("２"));
			o.setAttribute("value", "150"),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("３"));
			this.heavy_tame = df;
		}
		this.c_kobetu2_Text.nodeValue = "蓄力",this.c_kobetu2.length = 0,this.c_kobetu2.appendChild(this.heavy_tame.cloneNode(true));
		break;
	}
	break;
case 5: //輕弩
	this.c_kobetu2.length = 0;
	switch (this.c_style.value) {
	case "地":
	case "天":
		this.c_kobetu2_Text.nodeValue = "",this.c_kobetu2.selectedIndex = 0;
		break;
	case "嵐":
		this.c_kobetu2_Text.nodeValue = "ステップ",this.c_kobetu2.length = 2,this.c_kobetu2.options[0].text = "沒有",this.c_kobetu2.options[1].text = "あり";
		this.c_kobetu2.selectedIndex = 1;
		break;
	}
	break;
case 9: //銃槍
	this.c_kobetu2.length = 0;
	switch (this.c_style.value) {
	case "地":
		this.c_kobetu2_Text.nodeValue = "",this.c_kobetu2.selectedIndex = 0;
		break;
	case "天":
	case "嵐":
		this.c_kobetu2_Text.nodeValue = "ＨＢ",this.c_kobetu2.length = 2,this.c_kobetu2.options[0].text = "沒有",this.c_kobetu2.options[1].text = "発動";
		this.c_kobetu2.selectedIndex = 1;
		break;
	}
	break;
case 10: //弓
	this.c_kobetu2.length = 0;
	switch (this.c_style.value) {
	case "地":
	case "天":
		this.c_kobetu2_Text.nodeValue = "",this.c_kobetu2.selectedIndex = 0;
		break;
	case "嵐":
		this.c_kobetu2_Text.nodeValue = "姿勢",this.c_kobetu2.length = 2,this.c_kobetu2.options[0].text = "立ち",this.c_kobetu2.options[1].text = "座り";
		this.c_kobetu2.selectedIndex = 1;
		break;
	}
	this.setAuraArrow();
	break;
}

//個別設定の切り替え
this.c_kobetu2.style.display = this.c_kobetu2_Text.nodeValue ? "inline": "none";
if (debug) this.debug.innerText += "cngStyle:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------秘伝技能----------
,setHiden : function(){
switch (WP_Rui) {
case 2: //大錘
	if (this.c_hiden.value >= 12) {
		this.c_kobetu1_Text.nodeValue = "蓄力",this.c_kobetu1.length = 2,this.c_kobetu1.options[1].text = "瞬撃";
	} else {
		this.c_kobetu1_Text.nodeValue = "",this.c_kobetu1.selectedIndex = 0;
	}
	break;
case 3: //長槍
	this.setMotion();
	break;
case 11: //穿龍棍
	if (this.c_hiden.value >= 12) {
		this.c_kobetu1.length = 7,this.c_kobetu1.options[6].text = "６";
	} else {
		this.c_kobetu1.length = 6;
	}
	break;
}

//個別設定の切り替え
this.c_kobetu1.style.display = this.c_kobetu1_Text.nodeValue ? "inline" : "none";
}
//------------------------------------動作セット----------
,setMotion : function (){
if (debug) var time = new Date().getTime();
var motionPow = this.wp_Gclass && this.c_sizilMotUp.checked,
	motionCng = this.wp_Gclass && this.c_sizilMotCng.checked,
	kenzyutuCk = WP_Rui !== 10 && +this.c_kenzyutu.value,
	stanUp = 10;
WP_Motion.length = 0;
var wp_motion_set = function (motion){
	var tameAtUp = this.c_tameAtUp.selectedIndex,
		style = WP_Rui === 11 ? this.c_kobetu2.selectedIndex
							: (this.c_style.value === "地" ? 0 : this.c_style.value === "天" ? 1 : 2);
		
	for (var i = 0,m = WP_Motion.length - 1,max = motion.length; i < max; i++) {
		if (+motion[i].flg.S.charAt(style) && +motion[i].flg.P.charAt(motionPow) && +motion[i].flg.C.charAt(motionCng)) {
			WP_Motion[++m] = {};
			for (var e in motion[i]) {
				switch (e) {
				case "P":
					WP_Motion[m].P = motion[i].P instanceof Array ? motion[i].P[tameAtUp] : motion[i].P;
					switch (WP_Rui) {
					case 3: //長槍
						if (this.c_hiden.value >= 12 && 
							(motion[i].N === "中段突刺３" || 
							motion[i].N === "中段突刺４" || 
							motion[i].N === "上方突刺３" || 
							motion[i].N === "上方突刺４" || 
							motion[i].N === "天上突刺４")) {
								WP_Motion[m].P += 10;
						}
						break;
					case 11: //穿龍棍
						if (motion[i].R11H) WP_Motion[m].P = motion[i].R11H[this.c_houzyutu.selectedIndex];
						if (motion[i].R11K) WP_Motion[m].P = motion[i].R11K[this.c_taizyutu.selectedIndex];
						break;
					}
					break;
				case "ZH":
					WP_Motion[m].ZH = motion[i].ZH instanceof Array ? motion[i].ZH[tameAtUp] : motion[i].ZH;
					break;
				default:
					WP_Motion[m][e] = motion[i][e];
				}
			}
			if (motionPow && !+motion[i].flg.P.charAt(0)) WP_Motion[m].N += "<small>強</small>";
			//なんか間延びするがやってみるか劍術
			if (kenzyutuCk && !motion[i].R7) {
				WP_Motion[++m] = {};
				for (var e in WP_Motion[m-1]) WP_Motion[m][e] = WP_Motion[m-1][e];

				WP_Motion[m].P = WP_Motion[m].P * 2/10|0;
				WP_Motion[m].ZH = WP_Motion[m].ZH ? (WP_Motion[m].ZH * 2/10|0) : 20;
				WP_Motion[m].K = WP_Motion[m].K * 2/10|0;
				WP_Motion[m].C = "<small>劍</small>";
			}
		}
	}
}
//N:動作名,P:値,C:コメント,c:合算備考,T:個別タイプ,H:個別補正,S:固定銳利度,ZH:属性補正,M:無属性,X:掛け算,E:非表示条件,R:特殊補正対象外
//ガン系　ZT:属性,ZP:属性値,ZB:属性倍率
switch (WP_Rui) {
case 0: //大劍
//	if (this.c_fw.checked) 抜刀に会心＋100つくが放置
	wp_motion_set(INFO[WP_Rui].Motion);
	break;
case 2: //大錘
	stanUp = this.c_fw.checked ? 15 : 10; //FEATUREだとスタン1.5倍
	wp_motion_set(INFO[WP_Rui].Motion);
	break;
case 3: //長槍
	wp_motion_set(INFO[WP_Rui].Motion);
	break;
case 4: //單手劍
	wp_motion_set(INFO[WP_Rui].Motion);
	break;
case 6: //雙劍
	switch (this.c_kobetu1.selectedIndex) { //鬼人
	case 0: //通常時
		wp_motion_set(INFO[WP_Rui].Motion_Normal);
		break;
	case 1: //乱舞時
	case 2: //開放
		wp_motion_set(INFO[WP_Rui].Motion_kijin);

		//天嵐でG級
		if (this.c_style.value !== "地" && this.m_class.selectedIndex === 2) {
		for(var i = 0,m = WP_Motion.length; i < m; i++) {
				if (WP_Motion[i].N === "乱舞改<br>３連突刺" || 
					WP_Motion[i].N === "乱舞改<br>迴旋斬" || 
					WP_Motion[i].N === "乱舞改<br>迴旋斬" || 
					WP_Motion[i].N === "乱舞改<br>迴旋斬") {
					WP_Motion[i].ZH = 70;
				}
			}
		}
		//開放限定
		if (this.c_kobetu1.selectedIndex < 2) WP_Motion.length -= 4;
		break;
	case 3: //赤消費時
		wp_motion_set(INFO[WP_Rui].Motion_syouhi);
		//天嵐でG級
		if (this.c_style.value !== "地" && this.m_class.selectedIndex === 2) {
			for(var i = 0,m = WP_Motion.length; i < m; i++) {
				if (WP_Motion[i].N === "乱舞改<br>３連突刺" || 
					WP_Motion[i].N === "乱舞改<br>迴旋斬" || 
					WP_Motion[i].N === "乱舞改<br>迴旋斬" || 
					WP_Motion[i].N === "乱舞改<br>迴旋斬") {
					WP_Motion[i].ZH = 70;
				}
			}
		}
		//開放限定
		if (this.c_kobetu1.selectedIndex < 2) WP_Motion.length -= 4;
		break;
	}
	break;
case 7: //太刀
	wp_motion_set(INFO[WP_Rui].Motion1);
	if (this.c_style.value === "嵐") {
		if (this.c_kenzyutu.selectedIndex) { //劍術＋２発動か
			wp_motion_set(INFO[WP_Rui].Motion2_kenzyutu);
		} else {
			wp_motion_set(INFO[WP_Rui].Motion2_normal);
		}
		for(var i = 0,m = WP_Motion.length; i < m; i++) {
			if (this.c_kobetu1.selectedIndex && WP_Motion[i].N === "貫刺" ||
				!this.c_kobetu1.selectedIndex && WP_Motion[i].N === "氣刃貫刺") WP_Motion.splice(i, 1),i--,m--; 
		}
	}
	wp_motion_set(INFO[WP_Rui].Motion3);
	break;
case 8: //狩獵笛
	wp_motion_set(INFO[WP_Rui].Motion);
	break;
case 9: //銃槍
	wp_motion_set(INFO[WP_Rui].Motion);
	//武器別
	if (this.s_wp.value) {
		var eq = MST_Equip[WP_Info.Id][this.s_wp.value];

		//N:名稱,M:無属性,FZ:火属性値,ZB:属性砲倍率,K:氣絶値,MA:無属性(加算),FZA:火属性値(加算)
		var hougekiType = eq[I_aREACH];
		if (eq[I_aGR] && this.c_sizilgunscng.value) hougekiType = this.c_sizilgunscng.value + hougekiType.substring(3);
		if (eq[I_aGR] && this.c_sizilgunsup.value) hougekiType = hougekiType.substring(0,7) + (+hougekiType.substring(7) + +this.c_sizilgunsup.value);
		var hougeki = WP_Info.Bullet[ hougekiType ],rengekiP = 0;
		switch (hougeki.N.substring(0,3)) {
		case "通常型":
			rengekiP = 9;break;
		case "放射型":
			rengekiP = 7;break;
		case "拡散型":
			rengekiP = 8;break;
		}
		//赤槽では砲撃、HB使用不可、龍撃砲可
		switch (this.c_style.value) {
		case "天":
			if (this.c_kobetu2.selectedIndex) {
				WP_Motion = WP_Motion.concat([{N:hougeki.N,T:-1,M:hougeki.M,ZT:1,ZP:hougeki.FZ * 3,E:"this.c_sharp.value === '0'"}]); //砲撃(天は3倍)

				WP_Motion = WP_Motion.concat([{N:"クイック",T:-1,M:hougeki.M * 15/10|0,ZT:1,ZP:hougeki.FZ * 3 * 15/10|0,E:"this.c_sharp.value === '0'"}]); //砲撃クイック裝填
				WP_Motion = WP_Motion.concat([{N:"連撃砲",T:-1,M:hougeki.M * rengekiP/10|0,ZT:1,ZP:hougeki.FZ * 3 * rengekiP/10|0,E:"this.c_sharp.value === '0'"}]); //砲撃連撃
				break;
			}
		case "嵐":
			if (this.c_kobetu2.selectedIndex) {
				var motion1 = "", motion2 = "";
				if (this.c_kensyo.value.substring(0,2) === "BA") { //爆擊劍晶
					WP_Motion = WP_Motion.concat([{N:hougeki.N.replace("型LV","属性"),T:-1,M:hougeki.M * 12/10|0,E:"this.c_sharp.value === '0'"}]); //砲撃（属性分）

					motion1 = {N:"クイック",T:-1,T:-1,M:hougeki.M * 12/10 * 15/10|0,E:"this.c_sharp.value === '0'"}; //砲撃クイック裝填
					motion2 = {N:"連撃砲",T:-1,M:hougeki.M * 12/10 * rengekiP/10|0,E:"this.c_sharp.value === '0'"}; //砲撃連撃
				} else {
					switch (this.c_kensyo.value.substring(0,2)) {
					case "01":case "02":case "03":case "04":case "05":
						var zokuType = +this.c_kensyo.value.charAt(1);
						break;
					default:
						var zokuType = +eq[I_aZOKU];
					}
					if (zokuType) { //属性砲撃
						WP_Motion = WP_Motion.concat([{N:hougeki.N.replace("型LV","属性"),T:-1,M:0,ZT:zokuType,ZB:hougeki.ZB,E:"this.c_sharp.value === '0'"}]); //砲撃（属性分）

						motion1 = {N:"クイック",T:-1,M:0,ZT:zokuType,ZB:hougeki.ZB * 15/10|0,E:"this.c_sharp.value === '0'"}; //砲撃クイック裝填
						motion2 = {N:"連撃砲",T:-1,M:0,ZT:zokuType,ZB:hougeki.ZB * rengekiP/10|0,E:"this.c_sharp.value === '0'"}; //砲撃連撃
					} else { //打撃砲撃
						WP_Motion = WP_Motion.concat([{N:hougeki.N.replace("型LV","属性"),T:-1,M:hougeki.M * 9/10 + 1|0,C:"<small>氣絶</small>:"+hougeki.K,E:"this.c_sharp.value === '0'"}]); //砲撃（属性分）

						motion1 = {N:"クイック",T:-1,M:hougeki.M * 9/10 * 15/10 + 1|0,C:"<small>氣絶</small>:"+hougeki.K,E:"this.c_sharp.value === '0'"}; //砲撃クイック裝填
						motion2 = {N:"連撃砲",T:-1,M:hougeki.M * 9/10 * rengekiP/10 + 1|0,C:"<small>氣絶</small>:"+hougeki.K,E:"this.c_sharp.value === '0'"}; //砲撃連撃
					}
				}
				WP_Motion = WP_Motion.concat([{N:hougeki.N.replace("型LV","属性"),T:-1,M:hougeki.M * 6/10|0,E:"this.c_sharp.value === '0'"}]); //砲撃（無属性分）
				
				WP_Motion = WP_Motion.concat([motion1]); //砲撃クイック裝填
				WP_Motion = WP_Motion.concat([{N:"クイック",T:-1,M:hougeki.M * 6/10 * 15/10|0,E:"this.c_sharp.value === '0'"}]); //砲撃クイック裝填
				WP_Motion = WP_Motion.concat([motion2]); //砲撃連撃
				WP_Motion = WP_Motion.concat([{N:"連撃砲",T:-1,M:hougeki.M * 6/10 * rengekiP/10|0,E:"this.c_sharp.value === '0'"}]); //砲撃連撃
				break;
			}
		case "地":
			WP_Motion = WP_Motion.concat([{N:hougeki.N,T:-1,M:hougeki.M,ZT:1,ZP:hougeki.FZ,E:"this.c_sharp.value === '0'"}]); //砲撃

			WP_Motion = WP_Motion.concat([{N:"クイック",T:-1,M:hougeki.M * 15/10|0,ZT:1,ZP:hougeki.FZ * 15/10|0,E:"this.c_sharp.value === '0'"}]); //砲撃クイック裝填
			WP_Motion = WP_Motion.concat([{N:"連撃砲",T:-1,M:hougeki.M * rengekiP/10|0,ZT:1,ZP:hougeki.FZ * rengekiP/10|0,E:"this.c_sharp.value === '0'"}]); //砲撃連撃
			break;
		}
		hougeki = WP_Info.Bullet["竜"+hougekiType];
		switch (this.c_style.value) {
		case "地":
			WP_Motion = WP_Motion.concat([{N:hougeki.N,T:-1,M:hougeki.M,ZT:1,ZP:hougeki.FZ,C:"<br>x<i>5回</i>",E:"this.c_sharp.value === '0'"}]); //竜激砲
			hougeki = WP_Info.Bullet["爆"+hougekiType];
			WP_Motion = WP_Motion.concat([{N:hougeki.N,T:-1,M:hougeki.M,ZT:1,ZP:hougeki.FZ,C:"<br>x<i>2回</i>",E:"this.c_sharp.value === '0'"}]); //爆竜轟砲
			WP_Motion = WP_Motion.concat([{N:"加算",T:-1,M:hougeki.MA,ZT:1,ZP:hougeki.FZA,C:"<br>1装填分",E:"this.c_sharp.value === '0'"}]); //爆竜轟砲
			break;
		case "嵐":
			if (this.c_kobetu2.selectedIndex) {
				WP_Motion = WP_Motion.concat([{N:"叩擊",P:21,E:"this.c_sharp.value === '0'"}]); //赤槽は使用不可
			}
		case "天":
			if (this.c_kobetu2.selectedIndex) {
				WP_Motion = WP_Motion.concat([{N:"HB先端",P:5,ZT:1,ZP:hougeki.FZ * 0.85|0,E:"this.c_sharp.value === '0'"},{N:"HB叩擊",P:57,E:"this.c_sharp.value === '0'"}]);
			}
			break;
		}
	}
	break;
case 11: //穿龍棍
	wp_motion_set(INFO[WP_Rui].Motion);
	break;
case 1: //重弩
case 5: //ライト
	//武器を選ばないと処理しない
	if (this.s_wp.value) {
		if (WP_Rui === 1) { //ヘビィ
			var criPoint = 17;
			//圧縮撃ち
			if (this.c_shot.selectedIndex && +this.c_tama.value < 28) {
				//弾数
				var s = Math.abs(this.c_tama.options[this.c_tama.selectedIndex].text.split(":")[1].replace("発",""));
				if (this.c_shot.selectedIndex === 1) { //圧縮
					var tama = (function (e){var F = function(){};F.prototype = e;return new F;})(WP_Info.Bullet["C"+this.c_tama.value]);
				} else { //パーフェクト圧縮
					var tama = (function (e){var F = function(){};F.prototype = e;return new F;})(WP_Info.Bullet["P"+this.c_tama.value]);
				}
				if (tama.P === -1 || s === 1){ //圧縮沒有
					var tama = WP_Info.Bullet[this.c_tama.value];
				} else { //圧縮あり
					//圧縮時の能力変化
					//tama.N = "<span style='color:blue'>" + tama.N + "</span>"
					tama.P = tama.P * s / 10|0;
					if (tama.ZP) tama.ZP = tama.ZP * s / 10|0;
					if (tama.K) tama.C = (tama.C || "") + "<br>氣絶" + (tama.K * s / 10|0);
					if (tama.IP) tama.IP = tama.IP * s;
					if (tama.ZB) tama.ZB = (tama.ZB * s / 10|0) * 10;
					if (tama.BM) tama.BM = tama.BM * s;
					if (tama.BFZ) tama.BFZ = tama.BFZ * s;
				}
			} else {
				var tama = WP_Info.Bullet[this.c_tama.value];
			}
		} else { //ライト
			var criPoint = 15;
			if (this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex) { //嵐でステップ
				criPoint += 5;
			} else if (this.c_style.value !== "地") { //地以外
				criPoint += 1;
			}
			var tama = WP_Info.Bullet[this.c_tama.value];
		}
		if (this.c_fw.checked) criPoint += 1; //FEATURE
		if (this.enemy_gou && this.wp_tenran && (this.c_tenran.selectedIndex + this.c_hasyu.selectedIndex >= 2)) criPoint += 3; //剛種で２部位以上で天嵐武器
		//弾
		WP_Motion = [(function (e){var F = function(){};F.prototype = e;return new F;})(tama)];
		//距離
		switch (tama.N) {
		case "LV1通常弾":case "LV2通常弾":case "LV3通常弾":
			if (WP_Rui === 1){ //ヘビィ
					WP_Motion = WP_Motion.concat([{N:"近距離",P:criPoint,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:criPoint,C:"倍"},{N:"遠距離２",P:10,C:"倍"},{N:"遠距離３",P:8,C:"倍"},{N:"遠距離４",P:5,C:"倍"}/*,{N:"遠距離５",P:0,C:"倍"}*/]);
			} else { //ライト
				switch (this.c_style.value) {
				case "地":
					WP_Motion = WP_Motion.concat([{N:"近距離",P:criPoint,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:10,C:"倍"},{N:"遠距離１",P:8,C:"倍"},{N:"遠距離２",P:5,C:"倍"},{N:"遠距離３",P:5,C:"倍"}/*,{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
					break;
				case "嵐":
					if (this.c_kobetu2.selectedIndex) { //ステップ打ちの時
						WP_Motion = WP_Motion.concat([{N:"近距離",P:criPoint,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:15,C:"倍"}/*,{N:"遠距離２",P:0,C:"倍"},{N:"遠距離３",P:0,C:"倍"},{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
						break;
					}
				case "天":
					WP_Motion = WP_Motion.concat([{N:"近距離",P:criPoint,C:"倍"},{N:"中距離１",P:10,C:"倍"},{N:"中距離２",P:8,C:"倍"},{N:"遠距離１",P:5,C:"倍"},{N:"遠距離２",P:5,C:"倍"},{N:"遠距離３",P:5,C:"倍"}/*,{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
					break;
				}
			}
			break;
		case "LV1貫通弾":case "LV2貫通弾":case "LV3貫通弾":
			if (WP_Rui === 1){ //ヘビィ
					WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:criPoint,C:"倍"},{N:"遠距離２",P:criPoint,C:"倍"},{N:"遠距離３",P:10,C:"倍"},{N:"遠距離４",P:8,C:"倍"},{N:"遠距離５",P:5,C:"倍"}]);
			} else { //ライト
				switch (this.c_style.value) {
				case "地":
					WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:criPoint,C:"倍"},{N:"遠距離２",P:10,C:"倍"},{N:"遠距離３",P:8,C:"倍"},{N:"遠距離４",P:5,C:"倍"}/*,{N:"遠距離５",P:0,C:"倍"}*/]);
					break;
				case "嵐":
					if (this.c_kobetu2.selectedIndex) { //ステップ打ちの時
						WP_Motion = WP_Motion.concat([{N:"近距離",P:criPoint,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:15,C:"倍"}/*,{N:"遠距離２",P:0,C:"倍"},{N:"遠距離３",P:0,C:"倍"},{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
						break;
					}
				case "天":
					WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:10,C:"倍"},{N:"遠距離２",P:8,C:"倍"},{N:"遠距離３",P:5,C:"倍"},{N:"遠距離４",P:5,C:"倍"}/*,{N:"遠距離５",P:0,C:"倍"}*/]);
					break;
				}
			}
			break;
		case "LV1徹甲榴弾":case "LV2徹甲榴弾":case "LV3徹甲榴弾":
			WP_Motion[0].N = WP_Motion[0].N.substring(0,6);
			if (WP_Rui === 1){ //ヘビィ
					WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:10,C:"倍"},{N:"遠距離２",P:8,C:"倍"},{N:"遠距離３",P:5,C:"倍"},{N:"遠距離４",P:5,C:"倍"}/*,{N:"遠距離５",P:0,C:"倍"}*/]);
			} else { //ライト
				switch (this.c_style.value) {
				case "地":
					WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:10,C:"倍"},{N:"遠距離１",P:8,C:"倍"},{N:"遠距離２",P:8,C:"倍"},{N:"遠距離３",P:5,C:"倍"},{N:"遠距離４",P:5,C:"倍"}/*,{N:"遠距離５",P:0,C:"倍"}*/]);
					break;
				case "嵐":
					if (this.c_kobetu2.selectedIndex) { //ステップ打ちの時
						WP_Motion = WP_Motion.concat([{N:"近距離",P:criPoint,C:"倍"},{N:"中距離１",P:10,C:"倍"},{N:"中距離２",P:15,C:"倍"}/*,{N:"遠距離１",P:0,C:"倍"},{N:"遠距離２",P:0,C:"倍"},{N:"遠距離３",P:0,C:"倍"},{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
						break;
					}
				case "天":
					WP_Motion = WP_Motion.concat([{N:"近距離",P:criPoint,C:"倍"},{N:"中距離１",P:10,C:"倍"},{N:"中距離２",P:8,C:"倍"},{N:"遠距離１",P:8,C:"倍"},{N:"遠距離２",P:5,C:"倍"},{N:"遠距離３",P:5,C:"倍"},{N:"遠距離４",P:5,C:"倍"}/*,{N:"遠距離５",P:0,C:"倍"}*/]);
					break;
				}
			}
			break;
		case "LV1散弾":case "LV2散弾":case "LV3散弾":case "LV1回復弾":case "LV2回復弾":
			if (WP_Rui === 5 && this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex) { //ライトのステップ打ちの時
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"}/*,{N:"中距離１",P:0,C:"倍"},{N:"中距離２",P:0,C:"倍"},{N:"遠距離１",P:0,C:"倍"},{N:"遠距離２",P:0,C:"倍"},{N:"遠距離３",P:0,C:"倍"},{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
			} else {
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:10,C:"倍"},{N:"中距離２",P:10,C:"倍"}/*,{N:"遠距離１",P:0,C:"倍"},{N:"遠距離２",P:0,C:"倍"},{N:"遠距離３",P:0,C:"倍"},{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
			}
			break;
		case "LV1拡散弾":case "LV2拡散弾":case "LV3拡散弾":case "LV1毒弾":case "LV2毒弾":case "LV1麻痺弾":case "LV2麻痺弾":case "LV1睡眠弾":case "LV2睡眠弾":
			if (WP_Rui === 5 && this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex) { //ライトのステップ打ちの時
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:10,C:"倍"},{N:"中距離２",P:10,C:"倍"}/*,{N:"遠距離１",P:0,C:"倍"},{N:"遠距離２",P:0,C:"倍"},{N:"遠距離３",P:0,C:"倍"},{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
			} else {
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:10,C:"倍"},{N:"中距離２",P:10,C:"倍"},{N:"遠距離１",P:10,C:"倍"},{N:"遠距離２",P:10,C:"倍"},{N:"遠距離３",P:10,C:"倍"},{N:"遠距離４",P:10,C:"倍"},{N:"遠距離５",P:10,C:"倍"}]);
			}
			break;
		case "火炎彈":case "水冷彈":case "電擊彈":case "冰結彈":case "滅龍彈":
			if (WP_Rui === 5 && this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex) { //ライトのステップ打ちの時
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"}/*,{N:"中距離１",P:0,C:"倍"},{N:"中距離２",P:0,C:"倍"},{N:"遠距離１",P:0,C:"倍"},{N:"遠距離２",P:0,C:"倍"},{N:"遠距離３",P:0,C:"倍"},{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
			} else {
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:10,C:"倍"},{N:"中距離２",P:10,C:"倍"}/*,{N:"遠距離１",P:0,C:"倍"},{N:"遠距離２",P:0,C:"倍"},{N:"遠距離３",P:0,C:"倍"},{N:"遠距離４",P:0,C:"倍"},{N:"遠距離５",P:0,C:"倍"}*/]);
			}
			break;
		case "爆擊彈":case "爆擊彈:然":case "龍爆擊彈":
			WP_Motion = WP_Motion.concat({N:tama.BN,T:-1,M:tama.BM,ZT:tama.ZT,ZP:tama.BFZ,C:tama.BC});
			tama.BN = "";
			break;
		}
		if (tama.IT) { //状態異常
			//状態異常強化 or ライトFEATURE補正 or ライト嵐の時補正
			WP_Motion[0].C = (WP_Motion[0].C || "") + "<br>" + IZYONAME[tama.IT] + (tama.IP * (this.c_izyou.checked ? 1125 : 1000)/1000 * (WP_Rui === 5 && this.c_fw.checked ? 12 : 10)/10 * (WP_Rui === 5 && this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex ? 13 : 10)/10|0);
		}
		if (WP_Rui === 1) { //ヘビィ
			if (this.c_style.value === "嵐") WP_Motion[0].H = +this.c_kobetu2.value; //嵐なら蓄力補正変更
		} else { //ライト
			//嵐のステップ撃ち
			if (this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex) {
				WP_Motion[0].ZH = 150;
				WP_Motion = WP_Motion.concat([{N:"密着爆風",T:-1,M:30,ZT:1,ZP:12}]);
			}
			//武器別(速射)
			var eq = MST_Equip[WP_Info.Id][this.s_wp.value];
			if (eq[I_aSOKUSYA].indexOf(tama.N) !== -1) {
				//速射は傷害半分
				WP_Motion[0].C = (WP_Motion[0].C || "") + "<div style='color:blue'>" + tama.S + "</div>";
				WP_Motion[0].H = 50;
				if (WP_Motion[WP_Motion.length-1].N === "密着爆風") {
					//爆風は1/10
					WP_Motion[WP_Motion.length-1].M = WP_Motion[WP_Motion.length-1].M / 10|0,WP_Motion[WP_Motion.length-1].ZP = WP_Motion[WP_Motion.length-1].ZP / 10|0;
				}
			}
		}
		//無屬性攻擊
		if (tama.BN) WP_Motion = WP_Motion.concat({N:tama.BN,T:-1,M:tama.BM,ZT:1,ZP:tama.BFZ,C:tama.BC});
		//ヘビィ圧縮着弾
		if (tama.CN) WP_Motion = WP_Motion.concat({N:tama.CN,T:-1,M:tama.CM});
	} else {
		WP_Motion = [];
	}
	break;
case 10: //弓
	if (this.c_tame.selectedIndex <= 0) {
		WP_Info.Type = 1;
		//弓の近接は銳利度無効、属性は半分
		wp_motion_set(INFO[WP_Rui].Motion);
	//武器を選ばないと処理しない
	} else if (this.s_wp.value) {
		WP_Info.Type = 3;
		if (this.c_tame.selectedIndex === 1) {
			//曲射
			WP_Motion = [(function (e){var F = function(){};F.prototype = e;return new F;})(WP_Info.Bullet[this.c_tame.value])];
			WP_Motion[0].C = WP_Motion[0].C.substring(3);	//余計なのが入るので消し
			WP_Motion[0].ZH = 70;	//曲射は属性0.7倍
			WP_Motion = WP_Motion.concat([{N:"-",P:10,C:"倍"}]);
			if (this.c_tame.value === "爆裂型") {	//爆裂の無属性
				WP_Motion = WP_Motion.concat({N:"無属性",T:-1,M:19});
				WP_Motion[0].ZH = 20;	//爆裂は0.2倍
			}
		} else {
			var criPoint=15;
			if (this.enemy_gou && this.wp_tenran && (this.c_tenran.selectedIndex + this.c_hasyu.selectedIndex >= 2)) criPoint += 3; //剛種で２部位以上で天嵐武器
			//弾
			var tama = WP_Info.Bullet[this.c_tame.value];
			var tameAt = [40,100,150,180,100,112.5][this.c_tame.selectedIndex-2];
			var tameZoku = [50,75,100,112.5,100,110][this.c_tame.selectedIndex-2];
			if (this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex) { //嵐のしゃがみ撃ち
				//tameAt     *= [120,130,140,140,100,100][this.c_tame.selectedIndex-2]/100;
				//tameZoku *= [120,130,140,140,100,100][this.c_tame.selectedIndex-2]/100;
				tameAt     = [48,130,210,252,100,112.5][this.c_tame.selectedIndex-2];
				tameZoku = [60,97.5,140,157.5,100,110][this.c_tame.selectedIndex-2];
			}
			WP_Motion = [{N:tama.N,P:tama.P[this.c_ya.value],H:tameAt,ZH:tameZoku,C:"<br>" + (tameAt/100) +"倍"}];
			//距離
			switch (this.c_tame.value.substring(0,2)) {
			case "連射":
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:10,C:"倍"},{N:"遠距離２",P:8,C:"倍"},{N:"遠距離３",P:8,C:"倍"},{N:"遠距離４",P:5,C:"倍"}]);break;
			case "拡散":
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:10,C:"倍"},{N:"遠距離１",P:8,C:"倍"},{N:"遠距離２",P:8,C:"倍"},{N:"遠距離３",P:5,C:"倍"}/*,{N:"遠距離４",P:0,C:"倍"}*/]);break;
			case "貫通":
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:criPoint,C:"倍"},{N:"遠距離２",P:10,C:"倍"},{N:"遠距離３",P:8,C:"倍"},{N:"遠距離４",P:5,C:"倍"}]);break;
			case "オー":
				WP_Motion[0].X = 5; //オーラアローは傷害５倍
				WP_Motion = WP_Motion.concat([{N:"近距離",P:10,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:criPoint,C:"倍"},{N:"遠距離２",P:criPoint,C:"倍"},{N:"遠距離３",P:criPoint,C:"倍"},{N:"遠距離４",P:10,C:"倍"},{N:"遠距離５",P:8,C:"倍"}]);break;
			case "貫薙":
				WP_Motion[0].C = "<br>HIT毎に40%減";
				WP_Motion = WP_Motion.concat([{N:"近距離",P:criPoint,C:"倍"},{N:"中距離１",P:criPoint,C:"倍"},{N:"中距離２",P:criPoint,C:"倍"},{N:"遠距離１",P:criPoint,C:"倍"},{N:"遠距離２",P:criPoint,C:"倍"},{N:"遠距離３",P:criPoint,C:"倍"},{N:"遠距離４",P:10,C:"倍"},{N:"遠距離５",P:8,C:"倍"}]);break;
			}
		}
	}
	//ビン別
	if (this.c_bin.value) {
		switch (this.c_bin.value) {
		case "BA": //爆擊瓶
			var yaLv = this.c_tame.value.charAt(2)-1;
			var binPoint = WP_Info.BakuBin[this.c_tame.value.substring(0,2)];
			break;
		case "KG": //強擊瓶
			break;
		case "DA": //打擊瓶
			var binPoint = WP_Info.DaBin[this.c_tame.value.substring(0,2)];
			break;
		default: //状態異常ビン
			var izyoName = IZYONAME[this.c_bin.value.charAt(1)];
			var binPlus = +this.c_bin.value.charAt(2);
			var yaLv = +this.c_tame.value.charAt(2)-1;
			var binPoint = WP_Info.IzyoBin[this.c_tame.value.substring(0,2)];
		}
		var m = this.c_tame.selectedIndex ? 1 : WP_Motion.length;
		for (var i = 0; i < m; i++) {
			switch (this.c_bin.value) {
			case "KG": //強擊瓶
				break;
			case "BA": //爆擊瓶
				WP_Motion[i].C = (WP_Motion[i].C || "") + "爆撃";
				if (this.c_tame.selectedIndex) {
					if (typeof binPoint === "number") {
						WP_Motion[i].M = binPoint;
					} else {
						WP_Motion[i].M = binPoint[yaLv];
					}
					if (i === 2 && this.c_tame.value === "爆裂型") WP_Motion[2].M = WP_Info.BakuBin["爆裂追加"];
				} else { //近接
						WP_Motion[i].M = binPoint[this.c_style.value === "地" ? "Normal" : "TenRan"];
				}
				break;
			case "DA": //打擊瓶
				if (this.c_tame.selectedIndex) {
					WP_Motion[i].C += "氣絶" + binPoint;
					WP_Motion[i].T = 2;
				}
				break;
			default: //状態異常ビン
				if (typeof binPoint === "object") {
					if (this.c_bin.value.charAt(1) === "1") { //毒
						WP_Motion[i].C = (WP_Motion[i].C || "") + izyoName + (binPoint[binPlus][yaLv] * (this.c_izyou.checked ? 1125 : 1000)/1000 * [5,10,15,15,10,11][this.c_tame.selectedIndex-1]/10 * (this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex ? [12,13,14,15,10,10][this.c_tame.selectedIndex-1] : 10)/10|0);
					} else {
						WP_Motion[i].C = (WP_Motion[i].C || "") + izyoName + (binPoint[binPlus][yaLv] * (this.c_izyou.checked ? 1125 : 1000)/1000 * [5,10,10,10,10,11][this.c_tame.selectedIndex-1]/10 * (this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex ? [12,13,14,15,10,10][this.c_tame.selectedIndex-1] : 10)/10|0);
					}
				} else { //近接
						WP_Motion[i].C = (WP_Motion[i].C || "") + izyoName + binPoint;
				}
				break;
			}
		}
	}
	break;
}
//this.damage.style.tableLayout = ""; //いらんか？
if (this.c_fw.checked && WP_Rui === 3) {
	WP_Motion[WP_Motion.length] = {N:"反射+3",P:+this.c_reflect.options[3].value,ZH:0.1,R4:1}
} else if (this.c_reflect.selectedIndex && (WP_Rui === 0 || WP_Rui === 3 || WP_Rui === 4 || WP_Rui === 9)) {
	WP_Motion[WP_Motion.length] = {N:"反射+" + this.c_reflect.selectedIndex,P:+this.c_reflect.value,ZH:0.1,R4:1}
}
var thead = this.damage_head.rows[1].cells,tdata = this.damage_data.rows,maxMot = WP_Motion.length,cntMot = maxMot;

//動作表示
for (var i = 0,j = 0,t = ""; i < maxMot; i++) {
	if (!WP_Motion[i].T) WP_Motion[i].T = WP_Info.Type;
	switch (WP_Motion[i].T) {
	case 1: //斬
	case 2: //打
		t = (WP_Motion[i].T === WP_Info.Type ? "" : BUKITYPE[WP_Motion[i].T]) + WP_Motion[i].P + (WP_Motion[i].ZT ? "+" + ZOKUNAME[WP_Motion[i].ZT] + WP_Motion[i].ZP : "") + (WP_Motion[i].X ? "x"+WP_Motion[i].X : "");
		if (!WP_Motion[i].H) WP_Motion[i].H = WP_Info.Hosei;
		break;
	case 3: //弾
		if (i) { //距離
			t = WP_Motion[i].P / 10;
		} else { //先頭
			if (WP_Motion[i].ZB) { //属性倍率
				t = "<small>" + WP_Motion[i].P + "+攻x" + ZOKUNAME[WP_Motion[i].ZT] + (WP_Motion[i].ZB/1000) + "</small>" + (WP_Motion[i].X ? "x"+WP_Motion[i].X : "");
			} else {
				t = WP_Motion[i].P + (WP_Motion[i].ZT ? "+" + ZOKUNAME[WP_Motion[i].ZT] + WP_Motion[i].ZP : "") + (WP_Motion[i].X ? "x"+WP_Motion[i].X : "");
			}
			if (!WP_Motion[i].H) WP_Motion[i].H = WP_Info.Hosei;
		}
		break;
	case -1: //他
		if (WP_Motion[i].M) { //無属性+属性
			t = "爆" + WP_Motion[i].M + (WP_Motion[i].ZT ? "+" + ZOKUNAME[WP_Motion[i].ZT] + WP_Motion[i].ZP : "");
		} else if (WP_Motion[i].ZB) { //武器属性依存
			t = "<small>属性</small>x" + (WP_Motion[i].ZB/100).toFixed(2);
		} else { //属性のみ
			t = (WP_Motion[i].ZT ? ZOKUNAME[WP_Motion[i].ZT] + WP_Motion[i].ZP : "");
		}
		break;
	default:
		alert("エラーだよ");
	}
	//氣絶
	if (WP_Motion[i].K) t += "(" + (WP_Motion[i].K * stanUp/10|0) + ")";
	if (this.k_motion.value && i > 0 && WP_Motion[i-1].N === WP_Motion[i].N) { //結合
		thead[j].innerHTML += "·" + t + (WP_Motion[i].c || "");
		cntMot -= 1;
	} else {
		if (thead.length-1 === j) {
			this.damage_head.rows[1].appendChild(document.createElement("th"));
			for (var k = 0; k < 7; k++) {
				var w = tdata[k].insertCell(-1);
				w.appendChild(document.createTextNode(""));   
			}
		}
		thead[++j].innerHTML = WP_Motion[i].N + "<br>" + t + (WP_Motion[i].C && (WP_Motion[i].c !== "" || !this.k_motion.value) ? WP_Motion[i].C : "");
		tdata[0].cells[j].firstChild.nodeValue = 
		tdata[1].cells[j].firstChild.nodeValue = 
		tdata[2].cells[j].firstChild.nodeValue = 
		tdata[3].cells[j].firstChild.nodeValue = 
		tdata[4].cells[j].firstChild.nodeValue = 
		tdata[5].cells[j].firstChild.nodeValue = 
		tdata[6].cells[j].firstChild.nodeValue = " ";
	}
}
//for (var j = thead.length-1; j > 0 && !(CK_FULL && j <= cntMot && !thead[j].style.display); j--) {
for (var j = thead.length-1; j > 0 ; j--) {
	thead[j].style.display = 
	tdata[0].cells[j].style.display = 
	tdata[1].cells[j].style.display = 
	tdata[2].cells[j].style.display = 
	tdata[3].cells[j].style.display = 
	tdata[4].cells[j].style.display = 
	tdata[5].cells[j].style.display = 
	tdata[6].cells[j].style.display = j > cntMot || (!CK_FULL && (j < this.damage_col || j > this.damage_col +2)) ? "none" : "";
}
this.damage_head_col.span = CK_FULL ? (cntMot < 9 ? 9 : cntMot) : 3;
this.damage_head.rows[0].cells[0].colSpan = this.damage_head_col.span+1;
this.damage.style.tableLayout = "fixed";	//cssにするか
if (debug) this.debug.innerText += "setMotion:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------武器搜索----------
,search : function (){
if (WP_Rui === "") return;
if (debug) var time = new Date().getTime();

var bk_s_wp = this.s_wp.value,list = [],cnt=0,eqlist = MST_Equip[WP_Info.Id],M=Math.round;
var ck_sort = +this.s_srt.value,lm_rare = +this.s_rare.value,lm_hr = +this.s_hr.value,lm_slot = this.s_slot.value,_sp = this.m_class.selectedIndex,_mon_hc = this.enemy_hc,ck_gr = lm_rare === 99 ? "9" : "";
//生産種類
var rep = "1-";
if (!this.c_repi.style.backgroundColor) rep += "1i";
if (!this.c_rept.style.backgroundColor) rep += "1t";
if (!this.c_rep2.style.backgroundColor) {
	rep += "2-";
	if (!this.c_repi.style.backgroundColor) rep += "2i";
	if (!this.c_rept.style.backgroundColor) rep += "2t";
}
if (!this.c_rep3.style.backgroundColor) {
	rep += "3-";
	if (!this.c_repi.style.backgroundColor) rep += "3i";
	if (!this.c_repg.style.backgroundColor) rep += "3g";
	if (!this.c_rept.style.backgroundColor) rep += "3t";
}
if (!this.c_repm.style.backgroundColor) rep += "2m";
if (!this.c_repg.style.backgroundColor) rep += "4g";
if (!this.c_repk.style.backgroundColor) rep += "4k";
if (!this.c_rep5.style.backgroundColor) rep += "5-";
if (!this.c_repp.style.backgroundColor) rep += "5p";

//個別条件設定
var check_F = function(){return true},t = "",c1 = I_aZOKU,c2 = I_aZYOU,c3 = I_aGAUGE;
switch (WP_Rui) {
case 1: //重弩
case 5: //輕弩
	c1 = +this.s_tama1.value + I_aGUN,c2 = this.s_tama2.value - 0 + I_aGUN,c3 = I_aRELO;
	if (this.s_tama1.value) t = "e_gun1 > 0";
	if (this.s_tama2.value) t += (t ? " && " : "") + "e_gun2 > 0";
	if (this.s_kick.value) t += (t ? " && " : "") + "e_kick >= \"" + this.s_kick.value + "\"";
	if (this.s_reload.value) t += (t ? " && " : "") + "e_reload >= \"" + this.s_reload.value + "\"";
	if (this.s_speed.value) t += (t ? " && " : "") + "e_speed === \"" + this.s_speed.value + "\"";
	if (t) eval("check_F = function(e_gun1,e_gun2,e_reload,e_kick,e_speed){return " + t + ";}");
	break;
case 10: //弓
	c2 = I_aKYOKUSYA;
	this.s_zoku_ken.selectedIndex = this.s_zoku_yumi.selectedIndex;
	if (this.s_zoku_yumi.value !== "-") t = "e_zoku === \"" + this.s_zoku_yumi.value + "\"";
	if (this.s_kyoku.value) t += "e_kyokusya === \"" + this.s_kyoku.value + "\"";
	if (this.s_ya.value) {
		switch (this.s_tame.value) {
		case "1":
			t += (t ? " && " : "") + new RegExp(this.s_ya.value + ".:...:...:...") + ".test(e_ya)";
			break;
		case "2":
			t += (t ? " && " : "") + new RegExp("...:" + this.s_ya.value + ".:...:...") + ".test(e_ya)";
			break;
		case "3":
			t += (t ? " && " : "") + new RegExp("...:...:" + this.s_ya.value + ".:...") + ".test(e_ya)";
			break;
		case "4":
			t += (t ? " && " : "") + new RegExp("...:...:...:" + this.s_ya.value + ".") + ".test(e_ya)";
			break;
		}
	}
	if (this.s_bin.value) t += (t ? " && " : "") + "e_bin.lastIndexOf(\"" + this.s_bin.value + "\") !== -1";
	if (t) eval("check_F = function(e_zoku,e_kyokusya,e_ya,e_bin){return " + t + ";}");
	break;
default: //劍用
	this.s_zoku_yumi.selectedIndex = this.s_zoku_ken.selectedIndex;
	if (this.s_zoku_ken.value !== "-") t = "e_zoku === \"" + this.s_zoku_ken.value + "\"";
	if (this.s_zyoutai.value !== "-") t += (t ? " && " : "") + "e_zyou === \"" + this.s_zyoutai.value + "\"";
	switch (WP_Rui) {
	case 8: //狩獵笛
		if (this.s_fue.value) t += (t ? " && " : "") + "e_sub === \"" + this.s_fue.value + "\"";
		break;
	case 9: //銃槍
		if (this.s_guns.value) t += (t ? " && " : "") + "e_sub.charAt(0) === \"" + this.s_guns.value.charAt(0) +"\"";
		break;
	default: //劍用
		var e = this.s_reach.getElementsByTagName("input");
		for (var i = 0,m = e.length; i < m;i++) {
			if (e[i].style.backgroundColor) { //除外
				if (e[i].value === "中") {
					t += (t ? " && " : "") + "e_sub";
				} else {
					t += (t ? " && " : "") + "e_sub !== \"" + e[i].value + "\"";
				}
			}
		}
	}
	if (t) eval("check_F = function(e_zoku,e_zyou,e_spec,e_sub){return " + t + ";}");
}
for(var eqid in eqlist) {
	var eq = eqlist[eqid];
	if (check_F(eq[c1],eq[c2],eq[c3],eq[I_aREACH],eq[I_aSPEED]) &&
		+eq[I_aRARE] <= lm_rare &&
		+eq[I_aHR]   <= lm_hr &&
	    eq[I_aGR] <= ck_gr && 
		eq[I_aSLOT]  >= lm_slot &&
		rep.indexOf(eq[I_aCRE]) !== -1) {

		var w = list[cnt++] = [0,eq,eqid,0],eqAt = +eq[I_aAT],eqCri = +eq[I_aCRI];
		//凄腕,G級の場合攻撃力を変更
		if (_sp && eq[I_aCLASS] === "P") eqAt += 10,eqCri += 20;
		//HCの場合、遠距離は会心を変更
		if (_mon_hc && (WP_Rui === 1 || WP_Rui === 5 || WP_Rui === 10) && eq[I_aCLASS] === "C") eqCri += 40;
		//ソートキー
		switch (ck_sort) {
		case 0: //名稱
			break;
		case 1: //攻撃
			w[0] = eqAt * 1000 + +eq[I_aZOKUAT] + +eq[I_aZYOUAT],w[3] = eqAt;
			break;
		case 2: //会心
			w[3] = eqAt + M(eqAt * 25 * eqCri / 10000),w[0] = w[3] * 1000 + +eq[I_aZOKUAT] + +eq[I_aZYOUAT];
			break;
		case 3: //属性
			w[0] = eq[I_aZOKUAT] * 1000 + eqAt + M(eqAt * 25 * eqCri / 10000),w[3] = eq[I_aZOKUAT];
			break;
		case 4: //状態異常
			w[0] = eq[I_aZYOUAT] * 1000 + eqAt + M(eqAt * 25 * eqCri / 10000),w[3] = eq[I_aZYOUAT];
			break;
		case 5: //弾
			w[3] = eq[c1] < 0 ? eq[c1]*-1 : eq[c1],w[0] = w[3] * 1000 + eqAt + M(eqAt * 25 * eqCri / 10000);
			break;
		}
	}
}
//ソート
if (ck_sort) {
	list.sort(function (a, b){return b[0]-a[0]});
} else if (CK_OPERA) { //名稱順（一部ブラウザのみ)
	var Fulltohalf = (function (){
		var han = "0123456789.,-+ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ&#65382;ンアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ&#65382;ンァァィィゥゥェェォォッッャャュュョョカキクケコサシスセソタチツテトハヒフヘホハヒフヘホカキクケコサシスセソタチツテトハヒフヘホハヒフヘホウ";
		var zen = "０１２３４５６７８９．，－＋ＡＢＣＤＥＦＪＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁァぃィぅゥぇェぉォっッゃャゅュょョがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽガギグゲゴザジズゼゾダジヅデドバビブベボパピプペポヴ";
		return function (strVal) {
			for (var i=0,str = "",m=strVal.length,c = "",n=0; i<m; i++){
				c = strVal.charAt(i),n = zen.indexOf(c,0);
				str += (n >= 0) ? han.charAt(n) : "“" + c;
			}
			return str;
		}
	})();
	list.sort(function (a, b){return Fulltohalf(b[1][I_aNAME]) < Fulltohalf(a[1][I_aNAME]) ? 1 : -1});
}
//区切り挿入
var eqAt = 99999, sortname = ["","武器倍率:","会心付倍率:","属性値:","状態異常値:","弾数:"][ck_sort];
var df = document.createDocumentFragment(),o = document.createElement("option");
for(var i = 0,m = list.length; i < m; i++) {
	if (ck_sort && eqAt-list[i][3] > 0) {
		o.setAttribute("value", ""),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("－"+sortname+list[i][3]+"－"))
		df.lastChild.style.backgroundColor = "aquamarine";
		eqAt = list[i][3];
	}
	o.setAttribute("value", list[i][2]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(list[i][1][I_aNAME]));
}
this.s_wp.length = 1,this.s_wp.appendChild(df);
if (!CK_IE6) this.s_wp.value = bk_s_wp;
if (!this.s_wp.value) this.s_wp.selectedIndex = 0;

if (debug) this.debug.innerText += "search:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------剛猫入力用----------
,setNekoWp : function(){
if (!this.i_att.value === "" || this.i_att.value === "0" || this.i_zoku.value === "" || this.i_cri.value === "") alert("数字入れて");
var eq = MST_Equip[WP_Info.Id][this.s_wp.value];
eq[I_aAT] = Math.ceil(this.i_att.value / WP_Info.Ritu * 10); //切り上げ
eq[I_aZOKUAT] = this.i_zoku.value / 10|0;
eq[I_aCRI] = this.i_cri.value;
if (WP_Rui === 10) eq[I_aYA] = this.i_ya1.value + this.i_yaLv1.value + ":" + this.i_ya2.value + this.i_yaLv2.value + ":" + this.i_ya3.value + this.i_yaLv3.value + ":" + this.i_ya4.value + this.i_yaLv4.value
}
//------------------------------------武器変更----------
,cngWeapon : function(){
if (!this.s_wp.value) { //選択していない
	this.d_att.firstChild.nodeValue = this.d_zoku.firstChild.nodeValue = this.d_cri.firstChild.nodeValue = this.d_doc.firstChild.nodeValue = this.d_hr.firstChild.nodeValue = this.d_spec./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = this.d_slot.firstChild.nodeValue = this.d_class.firstChild.nodeValue = this.g_att.firstChild.nodeValue = this.g_zoku.firstChild.nodeValue = this.g_cri.firstChild.nodeValue = this.g_attB.firstChild.nodeValue = this.g_attN.firstChild.nodeValue = this.g_zokuN.firstChild.nodeValue = "　";
	this.sub_Neko.style.display = this.c_sinkaLv.style.display = this.c_GclassLv.style.display = "none";
	return;
}
if (debug) var time = new Date().getTime();
var eq = MST_Equip[WP_Info.Id][this.s_wp.value];
//剛猫武器
if (eq[I_aCLASS] === "N") {
	this.i_zoku_disp.firstChild.nodeValue = ZOKUNAME[eq[I_aZOKU]];
	this.i_yumi.style.display = WP_Rui === 10 ? "" : "none"
	this.sub_Neko.style.display = "";
	if (eq[I_aAT] === "0") return false;
} else {
	this.sub_Neko.style.display = "none";
}
//表示
this.d_att.firstChild.nodeValue = eq[I_aAT] * WP_Info.Ritu / 10|0;
var t = "";
if (WP_Rui === 1 || WP_Rui === 5){
	t = eq[I_aCLASS] !== "Z" ? "LV5強化" : "";
} else if (WP_Rui === 10){
	t = KYOKUNAME[eq[I_aKYOKUSYA]]; //曲射
	if (eq[I_aZOKUAT]) t += (t ? "<br>" : "") + ZOKUNAME[eq[I_aZOKU]] + "：" + eq[I_aZOKUAT] + "0"; //属性
} else {
	if (eq[I_aZOKUAT]) t = ZOKUNAME[eq[I_aZOKU]] + "：" + eq[I_aZOKUAT] + "0"; //属性
	if (eq[I_aZYOUAT]) t += (t ? "<br>" : "") + IZYONAME[eq[I_aZYOU]] + "：" + eq[I_aZYOUAT] + "0"; //状態異常
}
if (eq[I_aDEF]) t += (t ? "<br>" : "") + "防御+" + eq[I_aDEF];

this.d_zoku.innerHTML = t || "<br>";
this.d_cri.firstChild.nodeValue = eq[I_aCRI] || "0";
this.d_slot.firstChild.nodeValue = eq[I_aSLOT] || "0";
if (+eq[I_aHR] >= 3000) {
	this.d_hr.innerHTML = "GSR:" + (eq[I_aHR]-3000);
} else if (+eq[I_aHR] >= 2000) {
	this.d_hr.innerHTML = "GR:" + (eq[I_aHR]-2000);
} else if (+eq[I_aHR] >= 1000) {
	this.d_hr.innerHTML = "SR:" + (eq[I_aHR]-1000);
} else {
	this.d_hr.innerHTML = "HR:" + eq[I_aHR];
}
this.d_hr.innerHTML += " レア:" + eq[I_aRARE] + (CK_FULL ? " " : "<br>") + MAKENAME[eq[I_aCRE].charAt(0)] + MAKENAME[eq[I_aCRE].charAt(1)];
this.d_class.firstChild.nodeValue = CLASSTYPE[eq[I_aCLASS]];
this.d_doc.innerHTML = eq[I_aDOC];

var wp_Gclass_BK = this.wp_Gclass;
this.wp_Gclass = eq[I_aCLASS] === "Z";
this.wp_tenran = eq[I_aCLASS] === "T" || eq[I_aCLASS] === "H" || eq[I_aCLASS] === "I" || eq[I_aCLASS] === "R";
this.wp_gousyu = eq[I_aCLASS] === "G" || eq[I_aCLASS] === "N" || this.wp_tenran;
this.wp_bin = this.wp_gousyu || this.wp_Gclass || eq[I_aCLASS] === "S";
this.wp_hc = eq[I_aCLASS] === "C";

switch (WP_Rui) {
case 1: //重弩
case 5: //輕弩
	t = RELOADNAME[eq[I_aRELO]] + " " + KICKNAME[eq[I_aKICK]] + " " + SPEEDNAME[eq[I_aSPEED]];
	if (eq[I_aSOKUSYA] && WP_Rui === 5) {
		t += (this.wp_gousyu ? "<br>超速射:" : "<br>速射:") + eq[I_aSOKUSYA];
	}
	break;
case 10: //弓
	t = eq[I_aBIN] + "<br>" + eq[I_aYA];
	break;
default:
	t = "<ul>" + eq[I_aGAUGE].replace(/([roygbwps])(\d+)/g,"<li class=$1 style='width:$2px'>").replace("|","</ul><ul style=\"float:left\">") + "</ul>";
	if ((this.enemy_hc && this.wp_hc) || (this.enemy_gou && (this.c_tenran.selectedIndex + this.c_hasyu.selectedIndex >= 2) && this.wp_tenran)) t = t.replace(/class\=p/g,"class=s").replace(/class\=w/g,"class=p").replace(/class\=b/g,"class=w").replace(/class\=g/g,"class=b").replace(/class\=y/g,"class=g").replace(/class\=o/g,"class=y").replace(/class\=r/g,"class=o"); //HC任務or天嵐剛種

	if (WP_Rui === 8) { //狩獵笛
		t += "<a class=f href='../buki/fue.htm?"+eq[I_aREACH]+"' target=_blank>"+ONPUCOLOR[eq[I_aREACH].charAt(0)]+ONPUCOLOR[eq[I_aREACH].charAt(1)]+ONPUCOLOR[eq[I_aREACH].charAt(2)]+"</a>";
	} else if (WP_Rui === 9) { //銃槍
		t += "<small>" + eq[I_aREACH] + "</small>";
	} else if (eq[I_aREACH]) {
		t += "<small>リーチ：" + eq[I_aREACH] + "</small>";
	}
}
this.d_spec.innerHTML = t;

if (eq[I_aCLASS] === "S") { //進化武器
//	while(this.c_sinkaLv.lastChild) {this.c_sinkaLv.removeChild(this.c_sinkaLv.lastChild);}
	var eqSinka = MST_Equip_Sinka[WP_Info.Id][eq[I_aSINKAGR]],df = document.createDocumentFragment(),o = document.createElement("option");
	for (var i = 0; i < 100 && eqSinka[i][2]-this.s_rare.value <= 0; i++) {
		o.setAttribute("value", i+1),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(("  "+(i+1)).slice(-3)));
	}
	if (this.c_sinkaLv.length !== i) {
		df.lastChild.setAttribute("selected", "selected");
		this.c_sinkaLv.length = 0,this.c_sinkaLv.appendChild(df);
	}
	this.c_GclassLv.style.display = "none";
	this.c_sinkaLv.style.display = "inline";

	this.c_kensyo.options[this.c_kensyo.length-1].style.backgroundColor = "";
	this.cngSinkaLV();
} else if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) { //G武器
	var eqG = eq[I_aSINKAGR].split("!"),df = document.createDocumentFragment(),o = document.createElement("option");
	for (var i = 0; i < eqG.length-1; i++) {
		o.setAttribute("value", i+1),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(("  "+(i+1)).slice(-2)));
	}
	if (this.c_GclassLv.length !== i) {
		df.lastChild.setAttribute("selected", "selected");
		this.c_GclassLv.length = 0,this.c_GclassLv.appendChild(df);
	}
	this.c_sinkaLv.style.display = "none";
	this.c_GclassLv.style.display = "inline";

	this.c_kensyo.options[this.c_kensyo.length-1].style.backgroundColor = "gray";
	this.cngGLV();
} else {
	this.c_GclassLv.style.display = "none";
	this.c_sinkaLv.style.display = "none";
	this.c_kensyo.options[this.c_kensyo.length-1].style.backgroundColor = "gray";
}
//武器個別
switch (WP_Rui) {
case 1: //重弩
case 5: //輕弩
case 10: //弓
	this.cngWpSub(eq);
	break;
}
//武器で動作が変わる
switch (WP_Rui) {
case 1: //重弩
case 5: //輕弩
case 9: //銃槍
case 10: //弓
	this.setMotion();
	break;
default:
	//G武器とノーマルの切り替えなら
	if (wp_Gclass_BK !== this.wp_Gclass) this.setMotion();
}
if (debug) this.debug.innerText += "cngWeapon:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------進化レア変更合わせ----------
,setSinkaAtt : function(){
if (WP_Rui === "") return;
if (debug) var time = new Date().getTime();
var eqlist = MST_Equip[WP_Info.Id],eqSinkaList = MST_Equip_Sinka[WP_Info.Id];
for(var eqid in eqlist) {
	var eq = eqlist[eqid];
	if (eq[I_aCLASS] === "S"){
		for (var i = 0,eqSinka = eqSinkaList[eq[I_aSINKAGR]]; i < 100 && eqSinka[i][2]-this.s_rare.value <= 0; i++);
		if (i > 0) {
			var w = eqSinka[--i];
			eq[I_aAT] = w[0],eq[I_aZOKUAT] = w[1],eq[I_aRARE] = w[2];
		}
	} else if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) {
		var eqG = eq[I_aSINKAGR].split("!");
		var w = eqG[eqG.length-2].split(".");
		eq[I_aAT] = w[0],eq[I_aZOKUAT] = w[1],eq[I_aZYOUAT] = w[2],eq[I_aCRI] = w[3];
	}
}
if (debug) this.debug.innerText += "setSinkaAtt:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------進化武器LV変更----------
,cngSinkaLV : function(){
if (debug) var time = new Date().getTime();
var eq = MST_Equip[WP_Info.Id][this.s_wp.value],eqSinka = MST_Equip_Sinka[WP_Info.Id][eq[I_aSINKAGR]][this.c_sinkaLv.value-1];
//画面表示
this.d_att.firstChild.nodeValue = eqSinka[0] * WP_Info.Ritu / 10|0;
if (WP_Rui !== 1 && WP_Rui !== 5){
	this.d_zoku.firstChild.nodeValue = ZOKUNAME[eq[I_aZOKU]] + "：" + eqSinka[1] + "0"
}

this.d_hr.innerHTML = "HR:" + eq[I_aHR] + " レア:" + eqSinka[2] + (CK_FULL ? " " : "<br>") + MAKENAME[eq[I_aCRE].charAt(0)] + MAKENAME[eq[I_aCRE].charAt(1)];

switch (WP_Rui) {
case 1: //重弩
case 5: //輕弩
	if (this.c_sinkaLv.value < 6) {
		eq[I_aSPEED] = 5;
	} else if (this.c_sinkaLv.value < 16) {
		eq[I_aSPEED] = 0;
	} else if (this.c_sinkaLv.value < 36) {
		eq[I_aSPEED] = 1;
	} else if (this.c_sinkaLv.value < 66) {
		eq[I_aSPEED] = 2;
	} else if (eq[I_aSINKAGR] !== "0" && eq[I_aSINKAGR] !== "4" && this.c_sinkaLv.value < 76) {
		eq[I_aSPEED] = 3;
	} else if ((eq[I_aSINKAGR] === "0" || eq[I_aSINKAGR] === "4") && this.c_sinkaLv.value < 86) {
		eq[I_aSPEED] = 3;
	} else {
		eq[I_aSPEED] = 4;
	}
	//装填,反動,彈速
	this.d_spec.innerHTML = RELOADNAME[eq[I_aRELO]] + " " + KICKNAME[eq[I_aKICK]] + " " + SPEEDNAME[eq[I_aSPEED]];
	if (eq[I_aSOKUSYA] && WP_Rui === 5) {
		this.d_spec.innerHTML += (this.wp_gousyu ? "<br>超速射:" : "<br>速射:") + eq[I_aSOKUSYA];
	}
	break;
case 9: //銃槍
	if (this.c_sinkaLv.value < 6) {
		eq[I_aREACH] = eq[I_aREACH].substring(0,7) + 1;
	} else if (this.c_sinkaLv.value < 16) {
		eq[I_aREACH] = eq[I_aREACH].substring(0,7) + 2;
	} else if (this.c_sinkaLv.value < 36) {
		eq[I_aREACH] = eq[I_aREACH].substring(0,7) + 3;
	} else if (this.c_sinkaLv.value < 66) {
		eq[I_aREACH] = eq[I_aREACH].substring(0,7) + 4;
	} else if (eq[I_aSINKAGR] !== "0" && eq[I_aSINKAGR] !== "4" && this.c_sinkaLv.value < 76) {
		eq[I_aREACH] = eq[I_aREACH].substring(0,7) + 5;
	} else if ((eq[I_aSINKAGR] === "0" || eq[I_aSINKAGR] === "4") && this.c_sinkaLv.value < 86) {
		eq[I_aREACH] = eq[I_aREACH].substring(0,7) + 5;
	} else {
		eq[I_aREACH] = eq[I_aREACH].substring(0,7) + 6;
	}
	this.d_spec.lastChild.lastChild.nodeValue = eq[I_aREACH];
	this.setMotion();
	break;
}
if (debug) this.debug.innerText += "cngSinkaLV:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------G武器LV変更----------
,cngGLV : function(){
if (debug) var time = new Date().getTime();
var eq = MST_Equip[WP_Info.Id][this.s_wp.value],eqG = eq[I_aSINKAGR].split("!")[this.c_GclassLv.value-1].split(".");
this.d_att.firstChild.nodeValue = eqG[0] * WP_Info.Ritu / 10|0;

var t = "";
if (WP_Rui === 1 || WP_Rui === 5){
	t = eq[I_aCLASS] !== "Z" ? "LV5強化" : "";
} else if (WP_Rui === 10){
	if (eq[I_aZOKUAT]) t = ZOKUNAME[eq[I_aZOKU]] + "：" + eqG[1] + "0"; //属性
	t += "<br>" + KYOKUNAME[eq[I_aKYOKUSYA]]; //曲射
} else {
	if (eq[I_aZOKUAT]) t = ZOKUNAME[eq[I_aZOKU]] + "：" + eqG[1] + "0"; //属性
	if (eq[I_aZYOUAT]) t += (t ? "<br>" : "") + IZYONAME[eq[I_aZYOU]] + "：" + eqG[2] + "0"; //状態異常
}
if (eq[I_aDEF]) t += (t ? "<br>" : "") + "防御+" + eq[I_aDEF];
this.d_zoku.innerHTML = t || "<br>";
this.d_cri.firstChild.nodeValue = eqG[3] || "0";

switch (WP_Rui) {
case 1: //重弩
case 5: //輕弩
case 10: //弓
	//変化沒有
	break;
default:
	eq[I_aGAUGE] = eqG[4];

	t = "<ul>" + eq[I_aGAUGE].replace(/([roygbwps])(\d+)/g,"<li class=$1 style='width:$2px'>").replace("|","</ul><ul style=\"float:left\">") + "</ul>";
	if ((this.enemy_hc && this.wp_hc) || (this.enemy_gou && (this.c_tenran.selectedIndex + this.c_hasyu.selectedIndex >= 2) && this.wp_tenran)) t = t.replace(/class\=p/g,"class=s").replace(/class\=w/g,"class=p").replace(/class\=b/g,"class=w").replace(/class\=g/g,"class=b").replace(/class\=y/g,"class=g").replace(/class\=o/g,"class=y").replace(/class\=r/g,"class=o"); //HC任務or天嵐剛種

	if (WP_Rui === 8) { //狩獵笛
		t += "<a class=f href='../buki/fue.htm?"+eq[I_aREACH]+"' target=_blank>"+ONPUCOLOR[eq[I_aREACH].charAt(0)]+ONPUCOLOR[eq[I_aREACH].charAt(1)]+ONPUCOLOR[eq[I_aREACH].charAt(2)]+"</a>";
	} else if (WP_Rui === 9) { //銃槍
		eq[I_aREACH] = eqG[5];
		t += "<small>" + eq[I_aREACH] + "</small>";
	} else if (eq[I_aREACH]) {
		t += "<small>リーチ：" + eq[I_aREACH] + "</small>";
	}
	this.d_spec.innerHTML = t;
	break;
}
//武器で動作が変わる
switch (WP_Rui) {
case 9: //銃槍
	this.setMotion();
	break;
}

if (debug) this.debug.innerText += "cngGLV:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------魔物列表変更----------
,cngMosList : function(){
if (debug) var time = new Date().getTime();
var mos_class = this.m_class.selectedIndex,thead = [["大型","古龍","中型","小型"],["大型","剛種","中型","小型"],["大型","極征","中型","小型"]][mos_class],bk_m_enemy = this.m_enemy.value;
this.m_status.selectedIndex = this.m_ang.selectedIndex = this.m_def.selectedIndex = this.m_hc.selectedIndex = 0;

var df = document.createDocumentFragment(),o = document.createElement("option");
for (var i = 0; i < 4; i++) {
	o.setAttribute("value", ""),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode("－－－－" + thead[i] + "－－－－"));
	df.lastChild.style.backgroundColor = "aquamarine";
	for (var j = 0,n = "",w = "",max = MST_Monster_List[mos_class][i].length; j < max; j++) {
		n = MST_Monster_List[mos_class][i][j];
/*		if (mos_class) {
			w = MST_Monster[n][mos_class][0];
			if (w === "奇種") {
				n = n.replace("【亜種】",w).replace("【繁殖期】",w);
			} else {
				n += w;
			}
		}*/
		o.setAttribute("value",MST_Monster_List[mos_class][i][j]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(n));
	}
}
this.m_enemy.length = 0,this.m_enemy.appendChild(df);
if (!CK_IE6) this.m_enemy.value = bk_m_enemy;
if (!this.m_enemy.value) this.m_enemy.selectedIndex = 0;
//旋律效果の切り替え
if (mos_class === 2) {
	var i = this.c_fueAtUp.selectedIndex;
	this.c_fueAtUp.selectedIndex = 0;
	this.c_fueAtUp.style.display = "none";
	this.c_fueAtAdd.style.display = "inline";
	this.c_fueAtAdd.selectedIndex = i;
} else if (this.c_fueAtAdd.style.display !== "none") {
	var i = this.c_fueAtAdd.selectedIndex;
	this.c_fueAtAdd.selectedIndex = 0;
	this.c_fueAtAdd.style.display = "none";
	this.c_fueAtUp.style.display = "inline";
	this.c_fueAtUp.selectedIndex = i;
}
if (debug) this.debug.innerText += "cngMosList:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------魔物変更----------
,cngMons : function(){
if (!this.m_enemy.value) return;
if (debug) var time = new Date().getTime();
var mons = MST_Monster[this.m_enemy.value][this.m_class.selectedIndex],t = "";
var df = document.createDocumentFragment(),o = document.createElement("option");

//状態
for (var i = 0,m = mons[1].split("|"),max = m.length; i < max ; t = m[i++].split("I"),o.setAttribute("value", t[1]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(t[0])));
this.m_status.length = 0,this.m_status.appendChild(df);
this.m_status.disabled = this.m_status.length === 1;

//發怒
if (mons[3]) for (var i = 0,m = mons[3].split(","),max = m.length; i < max ; t = m[i++].split(":"),o.setAttribute("value", t[1]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(t[0]+":"+(t[1]/100).toFixed(2))));
this.m_ang.length = 1,this.m_ang.appendChild(df);
this.m_ang.disabled = this.m_ang.length === 1;

//HC
if (mons[4]) for (var i = 0,m = mons[4].split("I"),max = m.length; i < max ; t = m[i++].split(":"),o.setAttribute("value", t[1]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(t[0])));
this.m_hc.length = 1,this.m_hc.appendChild(df);
this.m_hc.disabled = this.m_hc.length === 1;

//全体防御率
if (mons[5]) for (var i = 0,m = mons[5].split(","),max = m.length; i < max ; t = m[i++].split(":"),o.setAttribute("value", t[1]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(t[0]+":"+(t[1]/100).toFixed(2))));
this.m_def.length = 1,this.m_def.appendChild(df);
this.m_def.disabled = this.m_def.length === 1;

this.enemy_gou = mons[0] === "剛種" || mons[0] === "覇種" || this.m_class.selectedIndex === 2;

this.cngNiku();
if (debug) this.debug.innerText += "cngMons:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------HC変更----------
,cngHc : function(){
if (debug) var time = new Date().getTime();

this.enemy_hc = this.m_hc.selectedIndex;

if (this.m_enemy.value === "刻龍") {  //こいつは特殊
	this.enemy_gou = this.m_hc.options[this.m_hc.selectedIndex].text === "覇種";
}
if (debug) this.debug.innerText += "cngHc:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------肉質変更----------
,cngNiku : function(){
if (!this.m_enemy.value) return;
if (debug) var time = new Date().getTime();

var bui = this.m_status.value.split(":");
//部位設定
for (var i = 0; i < 7; i++) {
	if (bui.length > i && bui[i].length > 1) {
		bui[i] = bui[i].split(",");
		this.damage_data.rows[i].cells[0].firstChild.nodeValue = bui[i][0];
		if (CK_FULL) {
			this.niku.rows[i].cells[0].firstChild.nodeValue = bui[i][0];
			this.niku.rows[i].cells[1].firstChild.nodeValue = bui[i][1];
			this.niku.rows[i].cells[2].firstChild.nodeValue = bui[i][2];
			this.niku.rows[i].cells[3].firstChild.nodeValue = bui[i][3];
			this.niku.rows[i].cells[4].firstChild.nodeValue = bui[i][4];
			this.niku.rows[i].cells[5].firstChild.nodeValue = bui[i][5];
			this.niku.rows[i].cells[6].firstChild.nodeValue = bui[i][6];
			this.niku.rows[i].cells[7].firstChild.nodeValue = bui[i][7];
			this.niku.rows[i].cells[8].firstChild.nodeValue = bui[i][8];
		}
	} else {
		this.damage_data.rows[i].cells[0].firstChild.nodeValue = " ";
		if (CK_FULL) {
			this.niku.rows[i].cells[0].firstChild.nodeValue = 
			this.niku.rows[i].cells[1].firstChild.nodeValue = 
			this.niku.rows[i].cells[2].firstChild.nodeValue = 
			this.niku.rows[i].cells[3].firstChild.nodeValue = 
			this.niku.rows[i].cells[4].firstChild.nodeValue = 
			this.niku.rows[i].cells[5].firstChild.nodeValue = 
			this.niku.rows[i].cells[6].firstChild.nodeValue = 
			this.niku.rows[i].cells[7].firstChild.nodeValue = 
			this.niku.rows[i].cells[8].firstChild.nodeValue = " ";
		}
	}
	for (var k = 1,m = this.damage_data.rows[i].cells.length; k < m ; this.damage_data.rows[i].cells[k].className = "",this.damage_data.rows[i].cells[k++].firstChild.nodeValue = " ");
}

//發怒固定
var mons = MST_Monster[this.m_enemy.value][this.m_class.selectedIndex];
if (mons[2]) {
	var ang = mons[2].split(",")[this.m_status.selectedIndex];
	if (ang) { //肉質と發怒が連動
		if (ang - this.m_ang.length >= 0) {
			this.m_ang.selectedIndex = this.m_ang.length-1;
		} else {
			this.m_ang.selectedIndex = ang;
		}
		this.m_ang.disabled = true;
	} else {
		this.m_ang.disabled = false;
	}
}
if (debug) this.debug.innerText += "cngNiku:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------フレーム１から複写----------
,copyData : function(){
var w = parent.damage1.DamageForm;

this.m_class.selectedIndex = w.m_class.selectedIndex;
this.cngMosList();
this.m_enemy.selectedIndex = w.m_enemy.selectedIndex;
this.cngMons();
this.m_status.selectedIndex = w.m_status.selectedIndex;
this.cngNiku();
this.m_ang.selectedIndex = w.m_ang.selectedIndex;
this.m_def.selectedIndex = w.m_def.selectedIndex;
this.m_hc.selectedIndex = w.m_hc.selectedIndex;
this.cngHc();

this.s_rui.selectedIndex = w.s_rui.selectedIndex;
this.s_srt.selectedIndex = w.s_srt.selectedIndex;
this.s_rare.selectedIndex = w.s_rare.selectedIndex;
this.s_slot.selectedIndex = w.s_slot.selectedIndex;
this.s_hr.selectedIndex = w.s_hr.selectedIndex;
this.s_zoku_ken.selectedIndex = w.s_zoku_ken.selectedIndex;
this.s_zyoutai.selectedIndex = w.s_zyoutai.selectedIndex;
this.s_guns.selectedIndex = w.s_guns.selectedIndex;
this.s_fue.selectedIndex = w.s_fue.selectedIndex;
this.s_tama1.selectedIndex = w.s_tama1.selectedIndex;
this.s_tama2.selectedIndex = w.s_tama2.selectedIndex;
this.s_reload.selectedIndex = w.s_reload.selectedIndex;
this.s_kick.selectedIndex = w.s_kick.selectedIndex;
this.s_speed.selectedIndex = w.s_speed.selectedIndex;
this.s_zoku_yumi.selectedIndex = w.s_zoku_yumi.selectedIndex;
this.s_tame.selectedIndex = w.s_tame.selectedIndex;
this.s_ya.selectedIndex = w.s_ya.selectedIndex;
this.s_kyoku.selectedIndex = w.s_kyoku.selectedIndex;
this.s_bin.selectedIndex = w.s_bin.selectedIndex;
this.setWeapon();

this.c_style.selectedIndex = w.c_style.selectedIndex;
this.c_fw.checked = w.c_fw.checked;
this.cngStyle();

//this.s_wp.selectedIndex = w.s_wp.selectedIndex;
this.cngWeapon();

this.c_hiden.selectedIndex = w.c_hiden.selectedIndex
this.setHiden();
this.c_sharp.selectedIndex = w.c_sharp.selectedIndex;
this.c_kiri.selectedIndex = w.c_kiri.selectedIndex;
//this.c_tama.selectedIndex = w.c_tama.selectedIndex;
this.c_tamaAdd.checked = w.c_tamaAdd.checked;
this.c_shot.selectedIndex = w.c_shot.selectedIndex;
this.c_kobetu1.selectedIndex = w.c_kobetu1.selectedIndex;
this.c_kobetu2.selectedIndex = w.c_kobetu2.selectedIndex;
this.c_gohu.checked = w.c_gohu.checked;
this.c_tume.checked = w.c_tume.checked;
this.c_kyokuat.checked = w.c_kyokuat.checked;
this.c_mesi.selectedIndex = w.c_mesi.selectedIndex;
this.c_tane.selectedIndex = w.c_tane.selectedIndex;
this.c_fueAtUp.selectedIndex = w.c_fueAtUp.selectedIndex;
this.c_fueAtAdd.selectedIndex = w.c_fueAtAdd.selectedIndex;
this.c_fueZK.checked = w.c_fueZK.checked;
this.c_attUp.selectedIndex = w.c_attUp.selectedIndex;
this.c_criUp.selectedIndex = w.c_criUp.selectedIndex;
this.c_sen.selectedIndex = w.c_sen.selectedIndex;
this.c_soko.selectedIndex = w.c_soko.selectedIndex;
this.c_zkUp[1].selectedIndex = w.c_zkUp[1].selectedIndex;
this.c_zkUp[2].selectedIndex = w.c_zkUp[2].selectedIndex;
this.c_zkUp[3].selectedIndex = w.c_zkUp[3].selectedIndex;
this.c_zkUp[4].selectedIndex = w.c_zkUp[4].selectedIndex;
this.c_zkUp[5].selectedIndex = w.c_zkUp[5].selectedIndex;
this._c_zkAtUp.selectedIndex = w._c_zkAtUp.selectedIndex;
this.c_hit.selectedIndex = w.c_hit.selectedIndex;
this.c_adjust.selectedIndex = w.c_adjust.selectedIndex;
this.c_kenzyutu.selectedIndex = w.c_kenzyutu.selectedIndex;
this.c_honki.selectedIndex = w.c_honki.selectedIndex;
this.c_tamaAtUp.checked = w.c_tamaAtUp.checked;
this.c_houzyutu.selectedIndex = w.c_houzyutu.selectedIndex;
this.c_taizyutu.selectedIndex = w.c_taizyutu.selectedIndex;
this.c_izyou.checked = w.c_izyou.checked;
this.c_geki.checked = w.c_geki.checked;
this.c_kizuna.checked = w.c_kizuna.checked;
this.c_wolf.checked = w.c_wolf.checked;
this.c_sien.checked = w.c_sien.checked;
this.c_garou.selectedIndex = w.c_garou.selectedIndex;
this.c_srcri.selectedIndex = w.c_srcri.selectedIndex;
this.c_srup.selectedIndex = w.c_srup.selectedIndex;
this.c_karyudo.selectedIndex = w.c_karyudo.selectedIndex;
this.c_sensya.selectedIndex = w.c_sensya.selectedIndex;
this.c_katsu.selectedIndex = w.c_katsu.selectedIndex;
this.c_reflect.selectedIndex = w.c_reflect.selectedIndex;
this.c_tameAtUp.selectedIndex = w.c_tameAtUp.selectedIndex;
this.c_mission.selectedIndex = w.c_mission.selectedIndex;
this.c_tenran.selectedIndex = w.c_tenran.selectedIndex;
this.c_hasyu.selectedIndex = w.c_hasyu.selectedIndex;
this.c_Gkyu.selectedIndex = w.c_Gkyu.selectedIndex;
this.c_kyokuAtAdd.selectedIndex = w.c_kyokuAtAdd.selectedIndex;
this.c_sizilMotCng.checked = w.c_sizilMotCng.checked;
this.c_sizilMuUp.checked = w.c_sizilMuUp.checked;
this.c_sizilMotUp.checked = w.c_sizilMotUp.checked;
this.c_sizilReachUp.checked = w.c_sizilReachUp.checked;
this.c_sizilkyoku.checked = w.c_sizilkyoku.checked;
this.c_sizilgunscng.checked = w.c_sizilgunscng.checked;
this.c_sizilgunsup.checked = w.c_sizilgunsup.checked;
this.setMotion();

this.k_cri.selectedIndex = w.k_cri.selectedIndex;
this.k_gou.selectedIndex = w.k_gou.selectedIndex;
this.k_motion.selectedIndex = w.k_motion.selectedIndex;

if (this.c_kobetu1.style.display !=="none") this.cngKobetu1();
if (this.c_kobetu2.style.display !=="none") this.cngKobetu2();
this.calc();
}
//------------------------------------計算----------
,calc : function(){
if (!this.s_wp.value) return;
if (debug) var time = new Date().getTime();
//技能等による補正
//扇射
if (WP_Rui === 1 || WP_Rui === 5 || WP_Rui === 10) {
	switch (this.c_sensya.value) {
	case "1":
		if (+this.c_attUp.value < 20) this.c_attUp.value = 20;
		break;
	case "2":
		if (+this.c_attUp.value < 30) this.c_attUp.value = 30;
		break;
	case "3":
		if (+this.c_attUp.value < 50) this.c_attUp.value = 50;
		break;
	case "4":
		if (WP_Rui === 10) this.c_sensya.selectedIndex = 0;
	}
}
//斬り方
var sharp = +this.c_sharp.value,
	hosei_kirikata = 100;
if (sharp <= 2) { //橙以下のみきり方補正がある
	this.c_kiri.disabled = false;
	hosei_kirikata = this.c_kiri.value;
} else {
	this.c_kiri.disabled = true;
	this.c_kiri.value = 100;
}
//技能補正
var skill_issen = +this.c_sen.value,
	skill_tokou = +this.c_hit.value;

//武器
var eq = MST_Equip[WP_Info.Id][this.s_wp.value];
//基礎
var eqAt = +eq[I_aAT],eqCri = +eq[I_aCRI],eqZokuType = +eq[I_aZOKU],eqZokuAt = +eq[I_aZOKUAT],eqZyouType = +eq[I_aZYOU],eqZyouAt = +eq[I_aZYOUAT];
//進化武器
if (eq[I_aCLASS] === "S") {
	var eqSinka = MST_Equip_Sinka[WP_Info.Id][eq[I_aSINKAGR]][this.c_sinkaLv.value-1];
	eqAt = +eqSinka[0],eqZokuAt = +eqSinka[1];
//G武器
} else if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) {
	var eqG = eq[I_aSINKAGR].split("!")[this.c_GclassLv.value-1].split(".");
	eqAt = +eqG[0],eqZokuAt = +eqG[1],eqZyouAt = +eqG[2],eqCri = +eqG[3];
//烈種
} else if (eq[I_aCLASS] === "R") {
	if (eq[I_aDOC].lastIndexOf("一閃+1") !== -1 && skill_issen < 1) skill_issen = 1;
	if (eq[I_aDOC].lastIndexOf("弱點特效") !== -1 && skill_tokou < 5) skill_tokou = 5;
}
//ミッション
var lm_at = 800,atAdd = 0;
if (this.c_mission.selectedIndex) lm_at += this.c_mission.value * 20; //武器倍率の上限
if (this.c_srup.selectedIndex) atAdd += +this.c_srup.value;
if (this.c_kyokuAtAdd.selectedIndex) atAdd += +this.c_kyokuAtAdd.value;
//補正
var bakuFlg = 0,
	bakuAt = 0,
	hosei_At = 100,
	hosei_Zoku = (this.enemy_gou && this.wp_gousyu ? 100 + +this.c_hasyu.value : 100),
	hosei_ZokuDMG = 10,
	hosei_Fue_ZokuDMG = this.c_fueZK.checked ? 11 : 10,
	hosei_Skill = 10,
	hosei_DMG = 10,
	adjustP = (WP_Rui === 1 || WP_Rui === 5 || WP_Rui === 10 ? [0,65,73][this.c_adjust.selectedIndex] : [0,72,81][this.c_adjust.selectedIndex]);

//劇物の心得
if (eqZyouAt && this.c_geki.checked) {
	eqAt +=  ~~(~~(eqZyouAt * (this.c_izyou.checked ? 1125/1000 : 1)) * 1 / 4);
	eqZyouAt = ~~(eqZyouAt * 3 / 8);
}

//名称設定·初期値設定
switch (WP_Rui) {
case 0: //大劍
	if (this.c_kobetu1.selectedIndex && this.c_kiri.value === "100") hosei_kirikata = 105; //中腹
	break;
case 1: //重弩
	eqZyouType = 0,eqZyouAt = 0;
	var tama_N = WP_Info.Bullet[this.c_tama.value].N;
	if (this.c_kobetu1.selectedIndex) eqAt += this.wp_gousyu ? 40 : 20; //ヘビィのバレル
	if (this.c_tamaAtUp.checked) { //弾強化
		switch (tama_N) {
		case "LV1通常弾":case "LV2通常弾":case "LV3通常弾":
		case "LV1貫通弾":case "LV2貫通弾":case "LV3貫通弾":
			hosei_Skill = 11;break;
		case "LV1散弾":case "LV2散弾":case "LV3散弾":
			hosei_Skill = 13;break;
		}
	}
	switch (tama_N) {
	case "爆擊彈":
	case "爆擊彈:然":
		WP_Motion[0].M = +WP_Info.Bullet[this.c_tama.value].M + this.c_sinkaLv.value/2|0;
		WP_Motion[1].M = +WP_Info.Bullet[this.c_tama.value].BM + this.c_sinkaLv.value/4|0;
		break;
	case "龍爆擊彈":
		WP_Motion[0].ZP = +WP_Info.Bullet[this.c_tama.value].ZP + this.c_sinkaLv.value/1|0;
		WP_Motion[1].ZP = +WP_Info.Bullet[this.c_tama.value].BFZ + this.c_sinkaLv.value/4|0;
		break;
	}
	if (this.c_hiden.value >= 12) hosei_ZokuDMG = 12;//ヘビィ秘伝
	break;
case 5: //輕弩
	eqZyouType = 0,eqZyouAt = 0;
	var tama_N = WP_Info.Bullet[this.c_tama.value].N;
	if (this.c_tamaAtUp.checked) { //弾強化
		switch (tama_N) {
		case "LV1通常弾":case "LV2通常弾":case "LV3通常弾":
		case "LV1貫通弾":case "LV2貫通弾":case "LV3貫通弾":
			hosei_Skill = 11;break;
		case "LV1散弾":case "LV2散弾":case "LV3散弾":
			hosei_Skill = 13;break;
		}
	}
	if (this.c_shot.selectedIndex) { //ジャストショット
		hosei_DMG = [10,11,12][this.c_shot.selectedIndex];
	}
	break;
case 2: //大錘
	if (this.c_kobetu1.selectedIndex) hosei_At = 130; //秘伝瞬撃
	break;
case 4: //片手
	if (this.c_fw.checked) hosei_ZokuDMG = 12; //フューチャー
	break;
case 6: //雙劍
	hosei_At = this.c_kobetu2.value; //刃打ち
	break;
case 7: //太刀
	if (this.c_kobetu2.selectedIndex && this.c_kiri.value === "100") hosei_kirikata = 105; //中腹
	if (this.c_kobetu1.selectedIndex) { //氣刃状態
		if (this.c_fw.checked) { //FEATUREは＋40、限時のタネと相殺なので差分をセット
			atAdd += 40 - this.c_tane.value;
		} else if (this.c_tane.value === "0") {  //FEATURE以外は沒有の時は＋10
			atAdd += 10;
		}
		if (this.c_hiden.value >= 12) {//秘伝
			hosei_At = 1125/10*110/100;
		} else {
			hosei_At = 1125/10;
		}
	}
	break;
case 9: //銃槍
	//火焰刀中は、青槽以下の場合、１級別ＵＰする
	if (this.c_style.value !== "地" && sharp <= 5 && this.c_kobetu2.selectedIndex) sharp += 1;
	break;
case 10: //弓
	if (this.c_tamaAtUp.checked) { //弾強化
		switch (this.c_tame.value.substring(0,2)) {
		case "連射":
		case "貫通":
			hosei_Skill = 11;break;
		case "拡散":
			hosei_Skill = 13;break;
		}
	}
	break;
case 11: //穿龍棍
	hosei_At = 100 + this.c_kobetu1.selectedIndex * 5; //コンボ
	break;
}

//槽
var sharpDmg = [600,850,1100,1325,1450,1600,1700,1800];
var sharpHit = [500,750,1000,1125,1250,1400,1500,1600];
var sharpZoku = [2500,5000,7500,10000,10625,11250,11500,12000];
var sharpCri = [0,0,0,0,5,10,10,10];
var hitStop = sharp <= 4 ? [23,45,100] : [16,31,69.9];

//表示攻撃·武器倍率
var eqAt_hammer = ~~(
       ~~(
        ~~(
         ~~(
           (~~(eqAt * this.c_karyudo.value / 1000) + atAdd + +this.c_mesi.value + +this.c_tane.value + +this.c_attUp.value + (this.c_gohu.checked ? 6 : 0) + (this.c_tume.checked ? 9 : 0) + (this.c_kyokuat.checked ? 100 : 0) + (this.c_wolf.checked ? 100 : 0)
                                                   + (this.m_class.selectedIndex && eq[I_aCLASS] === "P" ? 10 : 0)
                                                   + (this.wp_Gclass ? parseInt(this.i_sizilatt.value) + ((WP_Rui === 3 || WP_Rui === 4 ) && this.c_sizilReachUp.checked ? -eqAt/14|0 : 0) : 0))
            * this.c_fueAtUp.value / 100 + +this.c_fueAtAdd.value
           )
          * this.c_soko.value / 10
          )
         
        )
       * this.c_hiden.value / 10
      )
      + (this.c_kizuna.checked ? 5 : 0) + +this.c_katsu.value + (this.c_sien.checked ? 20 : 0) + (this.enemy_gou && this.wp_gousyu ? +this.c_tenran.options[this.c_tenran.selectedIndex + this.c_hasyu.selectedIndex].value : 0) + (this.m_class.selectedIndex === 2 ? +this.c_Gkyu.value : 0);
eqAt = ~~(
       ~~(
        ~~(
         ~~(
           (~~(eqAt * this.c_karyudo.value / 1000) + atAdd + +this.c_mesi.value + +this.c_tane.value + +this.c_attUp.value + (this.c_gohu.checked ? 6 : 0) + (this.c_tume.checked ? 9 : 0) + (this.c_kyokuat.checked ? 100 : 0) + (this.c_wolf.checked ? 100 : 0)
                                                   + (this.m_class.selectedIndex && eq[I_aCLASS] === "P" ? 10 : 0)
                                                   + (this.wp_Gclass ? parseInt(this.i_sizilatt.value) + ((WP_Rui === 3 || WP_Rui === 4 ) && this.c_sizilReachUp.checked ? -eqAt/14|0 : 0) : 0))
            * this.c_fueAtUp.value / 100 + +this.c_fueAtAdd.value
           )
          * this.c_soko.value / 10
          )
         * hosei_At / 100
        )
       * this.c_hiden.value / 10
      )
      + (this.c_kizuna.checked ? 5 : 0) + +this.c_katsu.value + (this.c_sien.checked ? 20 : 0) + (this.enemy_gou && this.wp_gousyu ? +this.c_tenran.options[this.c_tenran.selectedIndex + this.c_hasyu.selectedIndex].value : 0) + (this.m_class.selectedIndex === 2 ? +this.c_Gkyu.value : 0);
//攻撃表示
if (eqAt_hammer > lm_at) eqAt_hammer = lm_at;
if (eqAt > lm_at) {
	eqAt = lm_at;
	this.g_attB.style.color = "red";
} else {
	this.g_attB.style.color = "black";
}
this.g_att.firstChild.nodeValue = eqAt * WP_Info.Ritu / 10|0;
this.g_attB.firstChild.nodeValue = "(" + eqAt+ ")";

//結晶·ビン
switch (WP_Rui) {
case 1: //輕弩
case 5: //重弩
	//個別属性
	if (WP_Motion[0].ZB) {
		eqZokuAt = eqAt * WP_Motion[0].ZB/1000 * WP_Motion[0].H/100|0;
	} else if (WP_Motion[0].ZP) {
		eqZokuAt = WP_Motion[0].ZP;
	}
	break;
case 10: //弓
	switch (this.c_bin.value) {
	case "": break;
	case "KG": //強擊瓶
		if (this.enemy_gou && (this.c_tenran.selectedIndex + this.c_hasyu.selectedIndex >= 2) && this.wp_tenran) {
			//剛種で２部位以上で天嵐
			hosei_DMG = 17;
		} else {
			 //剛/進化/G武器で弓鬼は1.7倍　弓鬼か剛武器は1.6倍　他は1.5倍
			hosei_DMG = this.wp_bin && this.c_hiden.value >= 12 ? 17 : this.wp_bin || this.c_hiden.value >= 12 ? 16 : 15;
		}
		break;
	case "BA": //爆擊瓶
		bakuFlg = this.c_bin.value;
		if (this.c_style.value === "嵐" && this.c_tame.selectedIndex >= 6 && this.c_soko.selectedIndex === 1) {
			//底力オーラアロー
			bakuAt = WP_Info.BakuBin["オー火事場"];
		} else {
			bakuAt = WP_Motion[0].M;
		}
		break;
	case "DA": //打擊瓶
		break; //動作セットで処理
	default: //状態異常ビン
		eqZokuType = eqZokuAt = 0;
		eqZyouType = this.c_bin.value.charAt(1);
		eqZyouAt = "-";
		break;
	}
	break;
default:
	switch (this.c_kensyo.value.substring(0,2)) {
	case "": break;
	case "11": //毒劍晶
	case "12": //麻痺劍晶
	case "13": //睡眠劍晶
		eqZyouType = +this.c_kensyo.value.charAt(1);
		eqZyouAt = WP_Info.IzyoKen[this.c_kensyo.value.charAt(1)-1][this.c_kensyo.value.charAt(2)-1];
		break;
	case "BA": //爆擊劍晶
		bakuFlg = this.c_kensyo.value.substring(0,2);
		if (WP_Rui === 6 && this.c_kobetu1.selectedIndex) { //雙劍鬼人は別数値
			bakuAt = WP_Info.BakuKen_Kijin[this.c_kensyo.value.charAt(2)-1];
		} else{
			bakuAt = WP_Info.BakuKen[this.c_kensyo.value.charAt(2)-1];
		}
		break;
	case "KG": //強擊劍晶
		hosei_DMG = 12;
		break;
	default: //属性劍晶
		eqZokuType = +this.c_kensyo.value.charAt(1);
		eqZokuAt = WP_Info.ZokuKen[this.c_kensyo.value.charAt(2)-1];
	}
}
//属性関連
eqZokuAt += this.wp_Gclass ? parseInt(this.i_sizilzoku.value) : 0;
eqZyouAt = ~~(eqZyouAt * (this.c_izyou.checked ? 1125/1000 : 1) * hosei_Zoku/100);
//属性補正
hosei_Zoku *= this._c_zkAtUp.value * (this.c_honki.value === "1" ? 11 : 10); //属性強化,本氣飲料

//表示属性
var t = "";
if (eqZokuType && eqZokuAt) { //属性
	if (eqZokuType >= 1 && eqZokuType <= 5) {
		t = ZOKUNAME[eqZokuType] + "：" + (eqZokuAt * hosei_Zoku/10000 * this.c_zkUp[eqZokuType].value/10|0) + "0";
	} else {
		t = ZOKUNAME[eqZokuType] + "：" + (eqZokuAt * hosei_Zoku/10000|0) + "0";
	}
}
if (eqZyouType && eqZyouAt) { //状態異常
	t += (t ? "<br>" : "") + IZYONAME[eqZyouType] + "：" + eqZyouAt + "0";
}
this.g_zoku.innerHTML = t ? t : "<br>";
//表示会心
eqCri += +this.c_criUp.value + +this.c_srcri.value + [0,5,10,20][skill_issen] + (this.wp_Gclass ? parseInt(this.i_sizilcri.value) : 0);
if (!(WP_Rui === 1 || WP_Rui === 5 || WP_Rui === 10) && eqCri > 0) eqCri += sharpCri[sharp]; //銳利度ボーナス
if (this.m_class.selectedIndex && eq[I_aCLASS] === "P") eqCri += 20; //凄腕任務
if (this.enemy_hc && this.wp_hc && (WP_Rui === 1 || WP_Rui === 5 || WP_Rui === 10)) eqCri += 40; //HC任務
if (this.c_garou.value >= 1) eqCri += 50; //餓狼
if (this.c_honki.value === "2") eqCri += 30; //本氣飲料

if (WP_Rui === 9 && this.c_style.value !== "地" && this.c_kobetu2.selectedIndex) eqCri = 100; //銃槍新スタイルでは100%
if (!(WP_Rui === 1 || WP_Rui === 5 || WP_Rui === 10) && sharp <= 2) eqCri = 0; //ガン以外は黄以下だと無効

if (eqCri > 100) {
	eqCri = 100;
	this.g_cri.style.color = "red";
} else {
	this.g_cri.style.color = "black";
}
this.g_cri.firstChild.nodeValue = eqCri;

//攻撃時攻撃値
this.g_attN.firstChild.nodeValue = ~~((WP_Rui === 1 || WP_Rui === 5 || WP_Rui === 10) ? eqAt * WP_Info.Hosei/100 * hosei_DMG/10: eqAt * sharpDmg[sharp]/1000 * hosei_kirikata/100 * WP_Info.Hosei/100 * hosei_DMG/10);
//攻撃時属性値
var t = "";
if (bakuFlg === "BA") { //爆撃
	t = "爆撃："  + bakuAt;
} else {
	if (WP_Rui === 10) { //弓
		if (eqZokuType) {
			t = ZOKUNAME[eqZokuType] + "：" + ~~(eqZokuAt * (this.c_tame.selectedIndex <= 1 ? 1 : WP_Motion[0].ZH/100) * hosei_Fue_ZokuDMG/10); //属性
		} else if (eqZyouType) { //状態異常　弓はどっちか一方
			t = IZYONAME[eqZyouType] + "：" + (eqZyouAt * (this.c_tame.selectedIndex <= 0 ? 1 : [5,10,10,1,10,11][this.c_tame.selectedIndex-1]/10)); //状態異常
		}
	} else {
		if (eqZokuType) t = ZOKUNAME[eqZokuType] + "：" + ~~(eqZokuAt * sharpZoku[sharp]/10000 * hosei_ZokuDMG/10 * hosei_Fue_ZokuDMG/10); //属性
		if (eqZyouType) t += (t ? "<br>" : "") + IZYONAME[eqZyouType] + "：" + (WP_Rui === 4 && this.c_fw.checked ? ~~(eqZyouAt * 12/10) : eqZyouAt); //状態異常
	}
}
this.g_zokuN.innerHTML = t || "<br>";

if (!this.m_enemy.value) return;
//全体防御率
var hc_def = this.m_hc.value.split(",");
if (this.m_ang.selectedIndex) { //發怒
	var mos_Def = this.m_def.value/100 * this.m_ang.value/100 * hc_def[0]/100 * hc_def[1]/100 * 100;
} else { //通常
	var mos_Def = this.m_def.value/100 * hc_def[0]/100 * 100;
}
this.d_def.firstChild.nodeValue = (mos_Def/100).toFixed(2);

//会心設定
var criHosei = eqCri < 0 ? 75 : this.c_garou.value === "2" ? [135,145,150,159][skill_issen] : [125,135,140,150][skill_issen];
eqCri = Math.abs(eqCri);

//------------------実計算------------------
//部位
var bui = this.m_status.value.split(":");
for (var cntBui = 0,maxBui = bui.length; cntBui < maxBui; bui[cntBui] = bui[cntBui++].split(","));
if (WP_Rui === 11 && this.c_kobetu2.selectedIndex) { //穿龍棍
	//リーチ短
	for (var cntBui = 0,maxBui = bui.length,maxNiku = 0,minNiku = 900; cntBui < maxBui; cntBui++){
		if (maxNiku < +bui[cntBui][2]) maxNiku = +bui[cntBui][2];
		if (minNiku > +bui[cntBui][2]) minNiku = +bui[cntBui][2];
	}
	for (var cntBui = 0,maxBui = bui.length; cntBui < maxBui; cntBui++){
		bui[cntBui][2] = maxNiku + minNiku - bui[cntBui][2];
	}
}
for (var cntBui = 0,maxBui = bui.length; cntBui < maxBui; cntBui++){
	//痛撃補正
	bui[cntBui][1] = +bui[cntBui][1] + (+bui[cntBui][1] >= 35 ? skill_tokou : 0),
	bui[cntBui][2] = +bui[cntBui][2] + (+bui[cntBui][2] >= 35 ? skill_tokou : 0),
	bui[cntBui][3] = +bui[cntBui][3] + (+bui[cntBui][3] >= 35 ? skill_tokou : 0);

	//動作
	for (var cntMot = 0,maxMot = WP_Motion.length; cntMot < maxMot; cntMot++) {
		switch (WP_Motion[cntMot].T === -1 ? -1 : bakuFlg || WP_Motion[cntMot].T) {
		case 1: //斬
		case 2: //打
			//タイプ選択
			var kei_type = WP_Motion[cntMot].T,kei_hosei = WP_Motion[cntMot].H,kei_adjust = 100,disp_adjust = "";
			switch (WP_Rui) {
			case 3: //長槍
				if (adjustP) {
					if (+bui[cntBui][1] >= +bui[cntBui][2] && +bui[cntBui][1] >= +bui[cntBui][3] && 
								bui[cntBui][kei_type] * kei_hosei < bui[cntBui][1] * adjustP) { //斬
						kei_type = 1,kei_hosei = WP_Info.Hosei,kei_adjust = adjustP,disp_adjust = " aj1";
					} else if (+bui[cntBui][2] >= +bui[cntBui][1] && +bui[cntBui][2] >= +bui[cntBui][3] && 
								bui[cntBui][kei_type] * kei_hosei < bui[cntBui][2] * adjustP) { //打
						kei_type = 2,kei_hosei = WP_Info.Hosei,kei_adjust = adjustP,disp_adjust = " aj2";
					} else if (	bui[cntBui][kei_type] * kei_hosei < bui[cntBui][3] * adjustP) { //弾
						kei_type = 3,kei_hosei = WP_Info.Hosei,kei_adjust = adjustP,disp_adjust = " aj3";
					}
				} else {
					if (kei_type !== 2) {
						if (bui[cntBui][1] * 100 >= bui[cntBui][2] * 72) { //部位選択
							kei_hosei = 100,kei_type = 1;
						} else {
							kei_hosei = 72,kei_type = 2;
						}
					}
				}
				break;
			case 4: //單手劍
				if (adjustP) {
					if (kei_type !== 2) {
						if (+bui[cntBui][2] >= +bui[cntBui][3] && 
									bui[cntBui][kei_type] * kei_hosei * 100 < bui[cntBui][2] * WP_Info.Hosei * adjustP) { //打
							kei_type = 2,kei_adjust = adjustP,disp_adjust = " aj2";
						} else if (bui[cntBui][kei_type] * kei_hosei * 100 < bui[cntBui][3] * WP_Info.Hosei * adjustP) { //弾
							kei_type = 3,kei_adjust = adjustP,disp_adjust = " aj3";
						}
					} else {
						if (+bui[cntBui][1] >= +bui[cntBui][3] && 
									bui[cntBui][kei_type] * kei_hosei * WP_Info.Hosei < bui[cntBui][1] * 100 * adjustP) { //斬
							kei_type = 1,kei_adjust = adjustP,disp_adjust = " aj1";
						} else if (bui[cntBui][kei_type] * kei_hosei * WP_Info.Hosei < bui[cntBui][3] * WP_Info.Hosei * adjustP) { //弾
							kei_type = 3,kei_hosei = WP_Info.Hosei,kei_adjust = adjustP,disp_adjust = " aj3";
						}
						if (WP_Motion[cntMot].T === 2 && kei_type === 2) kei_hosei = WP_Info.Hosei;
					}
				}
				break;
			case 10: //弓
				if (adjustP) {
					if (+bui[cntBui][1] >= +bui[cntBui][2] && +bui[cntBui][1] >= +bui[cntBui][3] && 
								bui[cntBui][kei_type] * 100 < bui[cntBui][1] * 100) { //斬
						kei_type = 1,kei_adjust = 100,disp_adjust = " aj1";
					} else if (+bui[cntBui][2] >= +bui[cntBui][1] && +bui[cntBui][2] >= +bui[cntBui][3] && 
								bui[cntBui][kei_type] * 100 < bui[cntBui][2] * 100) { //打
						kei_type = 2,kei_adjust = 100,disp_adjust = " aj2";
					} else if (	bui[cntBui][kei_type] * 100 < bui[cntBui][3] * adjustP) { //弾
						kei_type = 3,kei_adjust = adjustP,disp_adjust = " aj3";
					}
				} else {
					if (bui[cntBui][1] * 100 >= bui[cntBui][2] * 100) { //部位選択
						kei_type = 1;
					} else {
						kei_type = 2;
					}
				}
				break;
//			case 0: //大劍
			default:
				if (adjustP) {
					if (+bui[cntBui][1] >= +bui[cntBui][2] && +bui[cntBui][1] > +bui[cntBui][3] && 
								bui[cntBui][kei_type] * kei_hosei < bui[cntBui][1] * adjustP) { //斬
						kei_type = 1,kei_hosei = WP_Info.Hosei,kei_adjust = adjustP,disp_adjust = " aj1";
					} else if (+bui[cntBui][2] >= +bui[cntBui][1] && +bui[cntBui][2] > +bui[cntBui][3] && 
								bui[cntBui][kei_type] * kei_hosei < bui[cntBui][2] * adjustP) { //打
						kei_type = 2,kei_hosei = WP_Info.Hosei,kei_adjust = adjustP,disp_adjust = " aj2";
					} else if (	bui[cntBui][kei_type] * kei_hosei < bui[cntBui][3] * adjustP) { //弾
						kei_type = 3,kei_hosei = WP_Info.Hosei,kei_adjust = adjustP,disp_adjust = " aj3";
					}
				}
				break;
			}
			//固定銳利度
			if (WP_Motion[cntMot].S) {
				var kei_kirikata = 100;
				if (WP_Motion[cntMot].S < 0) {
					var kei_sharpDmg = 1000;
					var kei_sharpHit = 1000;
					var kei_sharpzoku = 10000;
				} else {
					var kei_sharpDmg = sharpDmg[WP_Motion[cntMot].S];
					var kei_sharpHit = sharpHit[WP_Motion[cntMot].S];
					var kei_sharpzoku = sharpZoku[WP_Motion[cntMot].S];
				}
			} else {
				var kei_kirikata = hosei_kirikata;
				var kei_sharpDmg = sharpDmg[sharp];
				var kei_sharpHit = sharpHit[sharp];
				var kei_sharpzoku = sharpZoku[sharp];
			}
			//個別属性タイプ
			var kei_zokuType = WP_Motion[cntMot].ZT || eqZokuType;
			var zokuPoint = ZOKUPOINT[kei_zokuType];
			//個別属性補正
			var kei_zokuhosei = WP_Motion[cntMot].ZH || 100;
			//個別補正有無
			var kei_At = WP_Motion[cntMot].R2 ? eqAt_hammer : eqAt;

			//攻撃力×銳利度倍率×斬り方×動作×補正×肉質×道具補正(強擊劍晶)×判定(1.25,0.75)
			var dmg_M_Cr = ~~(kei_At * kei_sharpDmg/1000 * kei_kirikata/100 * WP_Motion[cntMot].P/100 * kei_hosei/100 * kei_adjust/100 * +bui[cntBui][kei_type]/100 * hosei_DMG/10 * criHosei/100); //通常
			var dmg_M_No = ~~(kei_At * kei_sharpDmg/1000 * kei_kirikata/100 * WP_Motion[cntMot].P/100 * kei_hosei/100 * kei_adjust/100 * +bui[cntBui][kei_type]/100 * hosei_DMG/10); //通常クリ沒有
			if (this.wp_Gclass && !eqZokuType && !eqZyouType && (WP_Rui === 4 || WP_Rui === 10) && this.c_sizilMuUp.checked) {
				dmg_M_Cr += ~~(kei_At * kei_sharpDmg/1000 * 15/1000 * WP_Info.Hosei/100 * kei_adjust/100 * hosei_DMG/10);
				dmg_M_No += ~~(kei_At * kei_sharpDmg/1000 * 15/1000 * WP_Info.Hosei/100 * kei_adjust/100 * hosei_DMG/10);
			}
			if (WP_Motion[cntMot].R4) dmg_M_Cr = dmg_M_No;
			if (dmg_M_Cr < 1) dmg_M_Cr = 1; //最低傷害保障
			if (dmg_M_No < 1) dmg_M_No = 1; //最低傷害保障
			//属性×銳利度倍率×肉質×属性旋律×個別補正
			var dmg_Zoku = 0;
			for (var i = 1; i < 6 && kei_zokuType; i++) {
				if (WP_Motion[cntMot].ZT) {
					//HB先端用
					dmg_Zoku += ~~(zokuPoint[i]/100 * WP_Motion[cntMot].ZP * bui[cntBui][i+3]/100 * hosei_Fue_ZokuDMG/10); //属性
				} else {
					dmg_Zoku += ~~((eqZokuAt * hosei_Zoku/10000 * this.c_zkUp[i].value/10|0) * zokuPoint[i]/100
									* kei_sharpzoku/10000 * bui[cntBui][i+3]/100 * hosei_Fue_ZokuDMG/10 * hosei_ZokuDMG/10 * kei_zokuhosei/100); //属性
				}
			}

			//弾かれ値(太刀で鬼刃状態は1.125UP)
			var kick = kei_sharpHit/1000 * hosei_kirikata * WP_Motion[cntMot].H/100 * bui[cntBui][kei_type]/100 * (WP_Rui === 7 && this.c_kobetu1.selectedIndex ? 1125/1000 : 1);
			//弾かれ·会心動作
			if (kick <= hitStop[0]) {WP_Motion[cntMot].Hit = "0" + disp_adjust;}
			else if (kick > hitStop[2]) {WP_Motion[cntMot].Hit = "2" + disp_adjust;}
			else if (kick >= hitStop[1]) {WP_Motion[cntMot].Hit = "1" + disp_adjust;}
			else {WP_Motion[cntMot].Hit = "" + disp_adjust;}
			break;
		case 3: //弾
			if (cntMot === 0) this.damage_data.rows[cntBui].cells[1].className = "",cntMot++; //弾の最初は威力
			if (cntMot === 1) WP_Motion[0].Dam = 0; //弓打擊瓶のとき、0で近接計算してしまうので消去するため

			//タイプ、適應擊
			var kei_type = WP_Motion[0].T,kei_adjust = 100,disp_adjust = "";
			if (adjustP) {
				if (+bui[cntBui][1] >= +bui[cntBui][2] && +bui[cntBui][1] >= +bui[cntBui][3] && 
							bui[cntBui][kei_type] * 100 < bui[cntBui][1] * adjustP) { //斬
					kei_type = 1,kei_adjust = adjustP,disp_adjust = " aj1";
				} else if (+bui[cntBui][2] >= +bui[cntBui][1] && +bui[cntBui][2] >= +bui[cntBui][3] && 
							bui[cntBui][kei_type] * 100 < bui[cntBui][2] * adjustP) { //打
					kei_type = 2,kei_adjust = adjustP,disp_adjust = " aj2";
				} else if (	bui[cntBui][kei_type] * 100 < bui[cntBui][3] * adjustP) { //弾
					kei_type = 3,kei_adjust = adjustP,disp_adjust = " aj3";
				}
			}
			//個別属性タイプ
			var kei_zokuType = WP_Motion[0].ZT || eqZokuType;
			var zokuPoint = ZOKUPOINT[kei_zokuType];
			//個別属性補正
			var kei_zokuhosei = WP_Motion[0].ZH || 100;
			//狙擊(判定距離のみ）
			var kei_hit = (this.c_sensya.value !== "0" && WP_Motion[cntMot].P >= (WP_Rui === 5 && this.c_style.value === "嵐" && this.c_kobetu2.selectedIndex ? 20 : 15)) ? 5 : 0;

			//攻撃×威力×動作(減衰)×補正×肉質×技能補正×道具補正(強擊瓶)×判定(1.25,0.75)
			var dmg_M_Cr = ~~(eqAt * WP_Motion[0].P/10 * WP_Motion[cntMot].P/10 * WP_Motion[0].H/100 * kei_adjust/100 * (+bui[cntBui][kei_type] + kei_hit)/100 * hosei_Skill/100 * hosei_DMG/10 * criHosei/100); //通常
			var dmg_M_No = ~~(eqAt * WP_Motion[0].P/10 * WP_Motion[cntMot].P/10 * WP_Motion[0].H/100 * kei_adjust/100 * (+bui[cntBui][kei_type] + kei_hit)/100 * hosei_Skill/100 * hosei_DMG/10); //通常クリ沒有
			if (WP_Motion[0].X) { //オーラアロー用
				dmg_M_Cr *= WP_Motion[0].X;
				dmg_M_No *= WP_Motion[0].X;
			}
			if (this.wp_Gclass && !eqZokuType && !eqZyouType && (WP_Rui === 4 || WP_Rui === 10) && this.c_sizilMuUp.checked) {
				dmg_M_Cr += ~~(eqAt * 15/100 * WP_Motion[0].H/100 * kei_adjust/100 * (+bui[cntBui][kei_type] + kei_hit)/100 * hosei_Skill/100 * hosei_DMG/10);
				dmg_M_No += ~~(eqAt * 15/100 * WP_Motion[0].H/100 * kei_adjust/100 * (+bui[cntBui][kei_type] + kei_hit)/100 * hosei_Skill/100 * hosei_DMG/10);
			}
			if (dmg_M_Cr < 1) dmg_M_Cr = 1; //最低傷害保障
			if (dmg_M_No < 1) dmg_M_No = 1; //最低傷害保障
			//攻撃属性×肉質×属性旋律×個別補正
			var dmg_Zoku = 0;
			for (var i = 1; i < 6 && kei_zokuType; i++) {
				dmg_Zoku += ~~((eqZokuAt * hosei_Zoku/10000 * this.c_zkUp[i].value/10|0) * zokuPoint[i]/100
								* bui[cntBui][i+3]/100 * hosei_Fue_ZokuDMG/10 * hosei_ZokuDMG/10 * kei_zokuhosei/100); //属性
			}
			WP_Motion[cntMot].Hit = "" + disp_adjust;
			break;
		case "BA": //爆撃
			switch (WP_Rui) {
			case 10: //弓
				var dmg_M_Cr = bakuAt; //通常
				if (this.c_tame.selectedIndex) {
					if (cntMot === 0) cntMot++; //弾の最初は威力
					if (WP_Motion[0].X) dmg_M_Cr *= WP_Motion[0].X; //オーラアロー用
				}
				break;
			default:
				var dmg_M_Cr = ~~(bakuAt * WP_Motion[cntMot].P/100); //通常
			}
			if (dmg_M_Cr < 1) dmg_M_Cr = 1; //最低傷害保障
			var dmg_M_No = dmg_M_Cr;
			var dmg_Zoku = 0;
			
			WP_Motion[cntMot].Hit = "";
			break;
		case -1: //他
			var hosei_Hou_M = 100,hosei_Hou_Zoku = 100,kei_zokuhosei = 100;
			switch (WP_Rui) {
			case 1: //重弩
				switch (tama_N) {
				case "LV1徹甲榴弾":case "LV2徹甲榴弾":case "LV3徹甲榴弾":
					if (this.c_houzyutu.selectedIndex) hosei_Hou_M = 150;
					hosei_Hou_Zoku = [100,150,160,170][this.c_houzyutu.selectedIndex];
					break;
				case "排熱彈":
					hosei_Hou_M = [100,110,120,130][this.c_houzyutu.selectedIndex];
					if (this.c_hiden.value >= 12){ //重銃技【銃仙】は1.2倍
						hosei_Hou_M *= 12/10;
						hosei_Hou_Zoku = 120;
					}
				}
				break;
			case 5: //輕弩
				switch (tama_N) {
				case "LV1徹甲榴弾":case "LV2徹甲榴弾":case "LV3徹甲榴弾":
					if (this.c_houzyutu.selectedIndex) hosei_Hou_M = 150;
					hosei_Hou_Zoku = [100,150,160,170][this.c_houzyutu.selectedIndex];
					break;
				}
				break;
			case 9: //銃槍砲撃
				if (WP_Motion[cntMot].N.indexOf("型") !== -1) {
					//砲撃
					hosei_Hou_M = [100,110,120,130][this.c_houzyutu.selectedIndex];
				} else {
					// 竜撃砲
					hosei_Hou_M = [100,120,130,140][this.c_houzyutu.selectedIndex];
				}
				//砲撃は橙槽で75％
				if (sharp <= 1) hosei_Hou_M *= 75 / 100;
				if (WP_Motion[cntMot].ZB) WP_Motion[cntMot].ZP = eqZokuAt * WP_Motion[cntMot].ZB/100;
				//FEATUREで1.5倍
				if (this.c_fw.checked) hosei_Hou_M *= 15/10;
				break;
			}
			if (WP_Motion[cntMot].M) {
				var dmg_M_Cr = ~~(WP_Motion[cntMot].M * hosei_Hou_M/100);
				if (dmg_M_Cr < 1) dmg_M_Cr = 1; //最低傷害保障
			} else {
				var dmg_M_Cr = 0;
			}
			var dmg_M_No = dmg_M_Cr;
			//爆裂型の無属性傷害を計算
			if (WP_Rui === 10 && this.c_tame.value === "爆裂型") {
				if (this.c_bin.value === "BA") {
					//爆擊瓶
					var dmg_M_Cr = bakuAt * 2; //通常
					var dmg_M_No = dmg_M_Cr; //通常クリ沒有
				} else {
					//攻撃×威力×道具補正(強擊瓶)×判定(1.25,0.75)
					var dmg_M_Cr = ~~(eqAt * WP_Motion[cntMot].M/100 * hosei_DMG/10 * criHosei/100); //通常
					var dmg_M_No = ~~(eqAt * WP_Motion[cntMot].M/100 * hosei_DMG/10); //通常クリ沒有
				}
			}
			var zokuPoint = ZOKUPOINT[WP_Motion[cntMot].ZT],dmg_Zoku = 0;
			for (var i = 1; i < 6 && WP_Motion[cntMot].ZT; i++) {
				dmg_Zoku += ~~((WP_Motion[cntMot].ZP * hosei_Zoku/10000 * this.c_zkUp[i].value/10|0) * zokuPoint[i]/100
								* bui[cntBui][i+3]/100 * hosei_Fue_ZokuDMG/10 * hosei_ZokuDMG/10 * kei_zokuhosei/100); //属性
			}

			WP_Motion[cntMot].Hit = "";
			break;
		default:
			alert("設定ミス" + (WP_Motion[cntMot].T === -1 ? -1 : bakuFlg || WP_Motion[cntMot].T))
		}
		WP_Motion[cntMot].DamZoku = ~~(dmg_Zoku * mos_Def/100);
		switch (this.k_cri.value) {
		case "2": //会心平均
			WP_Motion[cntMot].DamButu = ~~((~~(dmg_M_Cr * mos_Def/100) * eqCri + ~~(dmg_M_No * mos_Def/100) * (100 - eqCri)) / 10);
			dmg_M_Cr = ~~((dmg_M_Cr + dmg_Zoku) * mos_Def/100);
			dmg_M_No = ~~((dmg_M_No + dmg_Zoku) * mos_Def/100);
			if (dmg_M_Cr < 1) dmg_M_Cr = 1; //最低傷害保障
			if (dmg_M_No < 1) dmg_M_No = 1; //最低傷害保障
			dmg_M_Cr = ~~((dmg_M_Cr * eqCri + dmg_M_No * (100 - eqCri)) / 10); //平均(10倍)
			if (dmg_M_Cr < 10) dmg_M_Cr = 10; //最低傷害保障
			break;
		case "1": //会心あり
			WP_Motion[cntMot].DamButu = ~~(dmg_M_Cr * mos_Def/100);
			dmg_M_Cr = ~~((dmg_M_Cr + dmg_Zoku) * mos_Def/100);
			break;
		case "": //会心沒有
			WP_Motion[cntMot].DamButu = ~~(dmg_M_No * mos_Def/100);
			dmg_M_Cr = ~~((dmg_M_No + dmg_Zoku) * mos_Def/100);
			break;
		}
		if (dmg_M_Cr < 1) dmg_M_Cr = 1; //最低傷害保障
		
		WP_Motion[cntMot].Dam = dmg_M_Cr;
	}
	//動作表示
	for (var cntMot = 0,cell = 1,maxMot = WP_Motion.length; cntMot < maxMot; cntMot++) {
		if (!WP_Motion[cntMot].Dam) cntMot++,cell++;
		if (this.k_motion.value) { //結合
			if (WP_Motion[cntMot].X) {
				WP_Motion[cntMot].Dam *= WP_Motion[cntMot].X;
				WP_Motion[cntMot].DamButu *= WP_Motion[cntMot].X;
				WP_Motion[cntMot].DamZoku *= WP_Motion[cntMot].X;
			}
			if (cntMot > 0 && WP_Motion[cntMot-1].N === WP_Motion[cntMot].N) {
				WP_Motion[cntMot].Dam += WP_Motion[cntMot-1].Dam;
				WP_Motion[cntMot].DamButu += WP_Motion[cntMot-1].DamButu;
				WP_Motion[cntMot].DamZoku += WP_Motion[cntMot-1].DamZoku;
				cell--;
			}
		}
		if (WP_Motion[cntMot].E && eval(WP_Motion[cntMot].E)) {
			this.damage_data.rows[cntBui].cells[cell].firstChild.nodeValue = "-";
		} else {
			if (this.k_gou.value) {
				this.damage_data.rows[cntBui].cells[cell].firstChild.nodeValue = (this.k_cri.value === "2" ? WP_Motion[cntMot].DamButu/10 : WP_Motion[cntMot].DamButu) + (WP_Motion[cntMot].DamZoku < 0 ? "":"+") + WP_Motion[cntMot].DamZoku;
			} else {
				this.damage_data.rows[cntBui].cells[cell].firstChild.nodeValue = this.k_cri.value === "2" ? WP_Motion[cntMot].Dam/10 : WP_Motion[cntMot].Dam;
			}
		}
		this.damage_data.rows[cntBui].cells[cell++].className = "stop" + WP_Motion[cntMot].Hit;
	}
}
if (debug) this.debug.innerText += "calc:" + (new Date().getTime() - time) + "\n";
}
//------------------------------------素材表示----------
,dispSozai : function (){
//技能シミュのcpy
//素材
var sozaiHtml = function (recipe) {
	if (!recipe) return "";
	var t = [],list = recipe.split(" ");
	for (var i = 0,cnt = 0,m = list.length; i < m; i++) {
		var w = list[i];
		if (!isNaN(w.charAt(w.length-1)) || !isNaN(w.charAt(w.length-2))) {
			if (w.lastIndexOf("R") !== -1) {
				t[cnt++] = "<a href='../sozai/sozai.htm?" + w.substring(0,4) + "W' target=_blank class=r>" + MST_Item[w.substring(0,4)][0] + "</a>x" + parseInt(w.substring(4));
			} else {
				t[cnt++] = "<a href='../sozai/sozai.htm?" + w.substring(0,4) + "W' target=_blank>" + MST_Item[w.substring(0,4)][0] + "</a>x" + w.substring(4);
			}
		} else {
			t[cnt++] = w;
		}
	}
	return t.join("<br>");
};
var sozaiRowHtml = function (sozai_pool,ck_gr) {
	//素材合計 技能シミュのcpy
	sozai_pool = sozai_pool.join(" ").replace(/R/g,"").split(" ").sort();
	var sozai_sum = [], toku = "";

	for (var i = 0,m = sozai_pool.length; i < m; i++) {
		var w = sozai_pool[i];
		for (var j = 0,n = sozai_sum.length; j < n; j++) {
			if (sozai_sum[j][0] === w.substring(0,4)){
				sozai_sum[j][1] += +w.substring(4);
				break;
			}
		}
		if (j >= n) {
			if (!isNaN(w.charAt(w.length-1)) || !isNaN(w.charAt(w.length-2))) {
				sozai_sum[sozai_sum.length] = [w.substring(0,4), +w.substring(4)];
			} else {
				if (w && w !== "沒有" && w !== "or") toku = w.replace("<br>","") + "<br>";
			}
		}
	}
	for (var i = 0,m = sozai_sum.length; i < m; sozai_sum[i] = sozai_sum[i++].join(""));
	sozai_sum = sozai_sum.sort(function (a, b){return MST_Item[b.substring(0,4)][5]+b.substring(0,4) < MST_Item[a.substring(0,4)][5]+a.substring(0,4) ? 1 : -1});
	//cpyend
	var t = sozaiHtml(sozai_sum.join(" "));
	if (ck_gr) { //G武器
		t = t.split("<br>");
		for (var i = 1,row = t.length / 25|0; i < row; i++) {
			t[25 * i] = "</td><td>" + t[25 * i];
		}
		if (i * 25 < t.length) t[25 * i] = "</td><td>" + t[25 * i];
		return "<td>" + toku + t.join("<br>") + "</td>";
	} else {
		return "<td>" + toku + t + "</td>";
	}
	}
var eq = MST_Equip[WP_Info.Id][this.s_wp.value];
var recipi = MST_Equip.sozai[this.s_wp.value + WP_Rui].split(",");
var sozai_pool = [],upg = "",zeny_sum = 0,gzeny_sum = 0,ck = false,tzeny = "",tsozai = "",tupg = "",refid = "",root = ","+this.s_wp.value + WP_Rui+",";
if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) { //G武器
	upg = "LV" + this.c_GclassLv.value + "<small>(確定)</small>";
}
//第一ルート
do {
	if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) { //G武器
		var w = recipi[I_sZENY].split("|");
		for (var i = 0,m = this.c_GclassLv.selectedIndex; i <= m; gzeny_sum += parseInt(w[i++],16));
	} else { //ノーマル
		if (+eq[I_aHR] >= 2000) {
			gzeny_sum += parseInt(recipi[I_sZENY],16);
		} else {
			zeny_sum += parseInt(recipi[I_sZENY],16);
		}
	}
	if (recipi[I_sCRE]) {
		if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) { //G武器
			var w = recipi[I_sCRE].split("|");
			for (var i = 0,m = this.c_GclassLv.selectedIndex; i <= m; sozai_pool[sozai_pool.length] = w[i++]);
		} else {
			sozai_pool[sozai_pool.length] = recipi[I_sCRE];
		}
		tzeny += "<td>" + (zeny_sum || !gzeny_sum ? zeny_sum + "z\n" : "") + (gzeny_sum ? gzeny_sum + "Gz" : "") + "</td>",tupg += "<td>" + upg + "</td>",tsozai += sozaiRowHtml(sozai_pool,eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]);
		if (!recipi[I_sREP]) break;
		sozai_pool.length--;
	}
	if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) { //G武器
		var w = recipi[I_sREP].split("|");
		for (var i = 0,m = this.c_GclassLv.selectedIndex; i <= m; sozai_pool[sozai_pool.length] = w[i++]);
	} else {
		sozai_pool[sozai_pool.length] = recipi[I_sREP];
	}
	//第二ルートがあるか
	if (recipi[I_sREF2]) ck = true;
	//強化元探し
	if (root.indexOf(","+recipi[I_sREF1]+",") === -1) {
		refid = recipi[I_sREF1];
		root += recipi[I_sREF1] + ",";
	} else if (recipi[I_sREF2] && root.indexOf(","+recipi[I_sREF2]+",") === -1) {
		refid = recipi[I_sREF2];
		root += recipi[I_sREF2] + ",";
	} else {
		break;
	}
	if (refid) {
		eq = MST_Equip[INFO[refid.substring(4)].Id][refid.substring(0,4)];
		if (typeof eq === "string") eq = eq.split(",");
		upg = eq[I_aNAME] + " →<br>" + upg;
		recipi = MST_Equip.sozai[refid].split(",");
	}
} while (sozai_pool);

//第二ルート
if (ck) {
var eq = MST_Equip[WP_Info.Id][this.s_wp.value];
var recipi = MST_Equip.sozai[this.s_wp.value + WP_Rui].split(",");
var sozai_pool = [],upg = "",zeny_sum = 0,gzeny_sum = 0,root = ","+this.s_wp.value + WP_Rui+",";
do {
	if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) { //G武器
		var w = recipi[I_sZENY].split("|");
		for (var i = 0,m = this.c_GclassLv.selectedIndex; i <= m; gzeny_sum += parseInt(w[i++],16));
	} else { //ノーマル
		if (+eq[I_aHR] >= 2000) {
			gzeny_sum += parseInt(recipi[I_sZENY],16);
		} else {
			zeny_sum += parseInt(recipi[I_sZENY],16);
		}
	}
	if (recipi[I_sCRE]) {
		if (eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]) { //G武器
			var w = recipi[I_sCRE].split("|");
			for (var i = 0,m = this.c_GclassLv.selectedIndex; i <= m; sozai_pool[sozai_pool.length] = w[i++]);
			upg += "LV" + this.c_GclassLv.value + "<small>(確定)</small>";
		} else {
			sozai_pool[sozai_pool.length] = recipi[I_sCRE];
		}
		tzeny += "<td>" + (zeny_sum || !gzeny_sum ? zeny_sum + "z\n" : "") + (gzeny_sum ? gzeny_sum + "Gz" : "") + "</td>",tupg += "<td>" + upg + "</td>",tsozai += sozaiRowHtml(sozai_pool,eq[I_aCLASS] === "Z" && eq[I_aSINKAGR]);
		if (!recipi[I_sREP]) break;
	}
	sozai_pool[sozai_pool.length] = recipi[I_sREP];
	//強化元探し
	if (recipi[I_sREF2] && root.indexOf(","+recipi[I_sREF2]+",") === -1) {
		refid = recipi[I_sREF2];
		root += recipi[I_sREF2] + ",";
	} else if (root.indexOf(","+recipi[I_sREF1]+",") === -1) {
		refid = recipi[I_sREF1];
		root += recipi[I_sREF1] + ",";
	} else {
		break;
	}
	if (refid) {
		eq = MST_Equip[INFO[refid.substring(4)].Id][refid.substring(0,4)];
		if (typeof eq === "string") eq = eq.split(",");
		upg = eq[I_aNAME] + " →<br>" + upg;
		recipi = MST_Equip.sozai[refid].split(",");
	}
} while (sozai_pool);
}
this.sub_WinBody.innerHTML = "<table border=1 cellspacing=0 cellpadding=2>" +
						"<tr><td>名称</td><td>" + this.s_wp.options[this.s_wp.selectedIndex].text + "</td></tr>" +
						"<tr><td>費用</td>" + tzeny + "</tr>" +
						"<tr class=rep><td class=rep_n>強化</td>" + tupg +"</tr>" +
						"<tr class=sozai><td>素材</td>" + tsozai + "</tr>";
						"</table>";

this.sub_Win.style.display = "block";
}
}//グローバル
global.init();
global.init=null;
return global;
})(document);

(function(){
//------------------------------------活動貼り付け----------
//活動セット
var addEvent = function (elm, type, func) {
	//追加
	elm./*@cc_on @if (true) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
	//アンロードで削除
	window./*@cc_on @if (true) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ "unload",
		function(){
			elm./*@cc_on @if (true) detachEvent ('on' + @else@*/ removeEventListener (/*@end@*/ type,func,false);
		}
		,false);
}
addEvent(window,"load",
function () {
	if (location.pathname.indexOf("damageT") === -1) document.getElementById("cpy").style.display = window.name === "damage1" ? "none" : "inline";
});
addEvent(document,"dblclick",
function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	if (t.id.substring(0,5) === "c_rep") {
		t.style.backgroundColor = t.style.backgroundColor ? "" : "gray";DamageForm.search();
	}
});
addEvent(document,"click",
function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	switch (t.id) {
	case "c_gohu":
	case "c_tume":
	case "c_kyokuat":
	case "c_tamaAtUp":
	case "c_izyou":
	case "c_geki":
	case "c_kizuna":
	case "c_wolf":
	case "c_sien":
	case "c_fueZK":
	case "c_sizilReachUp":
	case "c_sizilMuUp":
		DamageForm.calc();
		break;
	case "cpy":
		DamageForm.copyData();
		break;
	case "c_tamaAdd":
		var w = DamageForm.c_tama.selectedIndex;
		DamageForm.cngWeapon();
		DamageForm.c_tama.selectedIndex = w;
		DamageForm.calc();
		break;
	case "c_sizilMotCng":
		if (DamageForm.s_rui.value === "10" && c_style.value === "嵐") DamageForm.setAuraArrow();	//オーラ貫薙
	case "c_fw":
	case "c_sizilMotUp":
		DamageForm.setMotion();
		DamageForm.calc();
		break;
	case "t_left1":
	case "t_left3":
		DamageForm.damage_col -= t.id === "t_left1" ? 1 : 3;
		if (DamageForm.damage_col < 1) DamageForm.damage_col = 1;
		DamageForm.setMotion();
		DamageForm.calc();
		break;
	case "t_right1":
	case "t_right3":
		DamageForm.damage_col += t.id === "t_right1" ? 1 : 3;
		if (DamageForm.damage_col > 30) DamageForm.damage_col = 30;
		DamageForm.setMotion();
		DamageForm.calc();
		break;
	case "d_sozai":
		if (DamageForm.s_wp.value && DamageForm.sub_Win.style.display === "none") {
			if (typeof document.documentElement.style.maxHeight === "undefined") { //IE6か
				var w = document.getElementsByTagName("SELECT");
				for (var i=21,m=w.length; i<m; w[i++].style.visibility = "hidden");
			}
			DamageForm.dispSozai();
			break;
		}
	case "sub_WinClose_B":
		if (typeof document.documentElement.style.maxHeight === "undefined") { //IE6か
			var w = document.getElementsByTagName("SELECT");
			for (var i=21,m=w.length; i<m; w[i++].style.visibility = "visible");
		}
		DamageForm.sub_Win.style.display = "none";
		break;
	case "i_set_B":
		DamageForm.setNekoWp();
		DamageForm.cngWeapon();
		DamageForm.calc();
		break;
	default:
		if (t.id.substring(0,5) === "c_rep" || t.id.substring(0,5) === "c_rea") {t.style.backgroundColor = t.style.backgroundColor === "" ? "gray" : "";DamageForm.search();}
		break;
	}
});
var change_event = function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	switch (t.id) {
	case "m_class":
		DamageForm.cngMosList();
		DamageForm.cngMons();
		DamageForm.search();
		if (DamageForm.wp_hc) DamageForm.cngWeapon(); //性能変化
		if (DamageForm.s_rui.value === "6" && c_style.value === "嵐") DamageForm.setMotion();	//乱舞改
		DamageForm.calc();
		break;
	case "s_rui":
		DamageForm.setWeapon();
		break;
	case "m_enemy":
		var enemy_type_bk = DamageForm.enemy_gou;
		DamageForm.cngMons();
		if (DamageForm.enemy_gou !== enemy_type_bk && DamageForm.wp_tenran && (DamageForm.c_tenran.selectedIndex + DamageForm.c_hasyu.selectedIndex >= 2)) { //天嵐用
			if (!DamageForm.c_tamaAtUp.disabled) {
				DamageForm.setMotion(); //遠距離の場合距離減衰が変わる
			} else {
				DamageForm.cngWeapon(); //近接なら槽が変わる
			}
		}
		DamageForm.calc();
		break;
	case "m_status":
		DamageForm.cngNiku();
		DamageForm.calc();
		break;
	case "s_wp":
		DamageForm.cngWeapon();
		DamageForm.calc();
		break;
	case "s_rare":
		DamageForm.setSinkaAtt();
		DamageForm.search();
		break;
	case "s_srt":
	case "s_hr":
	case "s_slot":
	case "s_zoku_ken":
	case "s_zyoutai":
	case "s_guns":
	case "s_fue":
	case "s_zoku_yumi":
	case "s_tame":
	case "s_ya":
	case "s_kyoku":
	case "s_bin":
	case "s_tama1":
	case "s_tama2":
	case "s_reload":
	case "s_kick":
	case "s_speed":
		DamageForm.search();
		break;
	case "c_style":
		DamageForm.cngStyle();
		DamageForm.setMotion();
		DamageForm.calc();
		break;
	case "c_sizilkyoku":
		var w = DamageForm.c_tame.selectedIndex;
		DamageForm.cngWeapon();
		DamageForm.c_tame.selectedIndex = w;
	case "c_tame":
		DamageForm.cngTame();
	case "c_tama":
	case "c_ya":
	case "c_bin":
	case "k_motion":
	case "c_shot":
	case "c_tameAtUp":
	case "c_kenzyutu":
	case "c_reflect":
	case "c_sizilgunscng":
	case "c_sizilgunsup":
		DamageForm.setMotion();
		DamageForm.calc();
		break;
	case "c_houzyutu":
	case "c_taizyutu":
		if (DamageForm.s_rui.value === "11") DamageForm.setMotion();
		DamageForm.calc();
		break;
	case "c_kensyo":
		if (DamageForm.s_rui.value === "9" && DamageForm.c_style.value === "嵐") DamageForm.setMotion();
		DamageForm.calc();
		break;
	case "c_kobetu1":
		DamageForm.cngKobetu1();
		DamageForm.calc();
		break;
	case "c_kobetu2":
		DamageForm.cngKobetu2();
		DamageForm.calc();
		break;
	case "c_hiden":
		DamageForm.setHiden();
		DamageForm.calc();
		break;
	case "c_sinkaLv":
		DamageForm.cngSinkaLV()
		DamageForm.calc();
		break;
	case "c_GclassLv":
		DamageForm.cngGLV()
		DamageForm.calc();
		break;
	case "m_hc":
		//遠距離はHCで会心が変わる
		if (DamageForm.enemy_hc === (DamageForm.m_hc.selectedIndex) && !DamageForm.c_tamaAtUp.disabled) {
			DamageForm.cngHc();
			DamageForm.search();
		} else {
			DamageForm.cngHc();
		}
		if (DamageForm.wp_hc) DamageForm.cngWeapon(); //性能変化
		DamageForm.calc();
		break;
	case "c_hasyu":
	case "c_tenran":
		if (DamageForm.enemy_gou && DamageForm.wp_tenran) { //天嵐用
			if (!DamageForm.c_tamaAtUp.disabled) {
				DamageForm.setMotion(); //遠距離の場合距離減衰が変わる
			} else {
				DamageForm.cngWeapon(); //近接なら槽が変わる
			}
		}
		DamageForm.calc();
		break;
	default:
		DamageForm.calc();
	}
}
addEvent(document.getElementById("m_class"),"change",change_event);
addEvent(document.getElementById("s_rui"),"change",change_event);
addEvent(document.getElementById("m_enemy"),"change",change_event);
addEvent(document.getElementById("m_hc"),"change",change_event);
addEvent(document.getElementById("m_ang"),"change",change_event);
addEvent(document.getElementById("m_status"),"change",change_event);
addEvent(document.getElementById("s_wp"),"change",change_event);
addEvent(document.getElementById("s_rare"),"change",change_event);
addEvent(document.getElementById("s_srt"),"change",change_event);
addEvent(document.getElementById("s_hr"),"change",change_event);
addEvent(document.getElementById("s_slot"),"change",change_event);
addEvent(document.getElementById("s_zoku_ken"),"change",change_event);
addEvent(document.getElementById("s_zyoutai"),"change",change_event);
addEvent(document.getElementById("s_guns"),"change",change_event);
addEvent(document.getElementById("s_fue"),"change",change_event);
addEvent(document.getElementById("s_zoku_yumi"),"change",change_event);
addEvent(document.getElementById("s_tame"),"change",change_event);
addEvent(document.getElementById("s_ya"),"change",change_event);
addEvent(document.getElementById("s_kyoku"),"change",change_event);
addEvent(document.getElementById("s_bin"),"change",change_event);
addEvent(document.getElementById("s_tama1"),"change",change_event);
addEvent(document.getElementById("s_tama2"),"change",change_event);
addEvent(document.getElementById("s_reload"),"change",change_event);
addEvent(document.getElementById("s_kick"),"change",change_event);
addEvent(document.getElementById("s_speed"),"change",change_event);
addEvent(document.getElementById("m_def"),"change",change_event);
addEvent(document.getElementById("c_style"),"change",change_event);
addEvent(document.getElementById("c_sharp"),"change",change_event);
addEvent(document.getElementById("c_kiri"),"change",change_event);
addEvent(document.getElementById("c_kensyo"),"change",change_event);
addEvent(document.getElementById("c_mesi"),"change",change_event);
addEvent(document.getElementById("c_tane"),"change",change_event);
addEvent(document.getElementById("c_attUp"),"change",change_event);
addEvent(document.getElementById("c_criUp"),"change",change_event);
addEvent(document.getElementById("c_sen"),"change",change_event);
addEvent(document.getElementById("c_fueAtUp"),"change",change_event);
addEvent(document.getElementById("c_fueAtAdd"),"change",change_event);
addEvent(document.getElementById("c_soko"),"change",change_event);
addEvent(document.getElementById("c_zkUp1"),"change",change_event);
addEvent(document.getElementById("c_zkUp2"),"change",change_event);
addEvent(document.getElementById("c_zkUp3"),"change",change_event);
addEvent(document.getElementById("c_zkUp4"),"change",change_event);
addEvent(document.getElementById("c_zkUp5"),"change",change_event);
addEvent(document.getElementById("c_karyudo"),"change",change_event);
addEvent(document.getElementById("c_houzyutu"),"change",change_event);
addEvent(document.getElementById("c_taizyutu"),"change",change_event);
addEvent(document.getElementById("c_garou"),"change",change_event);
addEvent(document.getElementById("c_tama"),"change",change_event);
addEvent(document.getElementById("c_tame"),"change",change_event);
addEvent(document.getElementById("c_ya"),"change",change_event);
addEvent(document.getElementById("c_bin"),"change",change_event);
addEvent(document.getElementById("c_kobetu1"),"change",change_event);
addEvent(document.getElementById("c_kobetu2"),"change",change_event);
addEvent(document.getElementById("c_sinkaLv"),"change",change_event);
addEvent(document.getElementById("c_GclassLv"),"change",change_event);
addEvent(document.getElementById("c_hiden"),"change",change_event);
addEvent(document.getElementById("c_srcri"),"change",change_event);
addEvent(document.getElementById("c_srup"),"change",change_event);
addEvent(document.getElementById("c_mission"),"change",change_event);
addEvent(document.getElementById("c_tenran"),"change",change_event);
addEvent(document.getElementById("c_sensya"),"change",change_event);
addEvent(document.getElementById("c_katsu"),"change",change_event);
addEvent(document.getElementById("c_reflect"),"change",change_event);
addEvent(document.getElementById("c_shot"),"change",change_event);
addEvent(document.getElementById("c_tameAtUp"),"change",change_event);
addEvent(document.getElementById("c_hasyu"),"change",change_event);
addEvent(document.getElementById("c_Gkyu"),"change",change_event);
addEvent(document.getElementById("_c_zkAtUp"),"change",change_event);
addEvent(document.getElementById("c_hit"),"change",change_event);
addEvent(document.getElementById("c_adjust"),"change",change_event);
addEvent(document.getElementById("c_kenzyutu"),"change",change_event);
addEvent(document.getElementById("c_honki"),"change",change_event);
addEvent(document.getElementById("c_kyokuAtAdd"),"change",change_event);
addEvent(document.getElementById("k_gou"),"change",change_event);
addEvent(document.getElementById("k_motion"),"change",change_event);
addEvent(document.getElementById("k_cri"),"change",change_event);
addEvent(document.getElementById("i_sizilatt"),"change",change_event);
addEvent(document.getElementById("i_sizilzoku"),"change",change_event);
addEvent(document.getElementById("i_sizilcri"),"change",change_event);
addEvent(document.getElementById("c_sizilkyoku"),"change",change_event);
addEvent(document.getElementById("c_sizilgunscng"),"change",change_event);
addEvent(document.getElementById("c_sizilgunsup"),"change",change_event);
})();
