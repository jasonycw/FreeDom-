/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
(function (document){
//固定
var item_id = location.search.substring(1,5).toUpperCase(),
	MST_Item = setItem(),
	MST_Quest = setQuest(),
	MST_Saisyu = setSaisyu(),
	MST_Mos = setMonster(),
	MST_Other = setOther(),
	Quest_Season = ["","：温暖期","：繁殖期","：寒冷期"],
	Quest_Time = ["","/昼","/夜"],
	Saisyu_Name = ["汎用","密林","砂漠","沼地","雪山","火山","森丘","塔", "樹海","迎撃拠点",	"砦",	"城",	"決戦場","闘技演習","峡谷","絶島","高地","潮島","極海","広場","花畑"],
	Saisyu_Id	= ["",	"mitu","saba","numa","yuki","kaza","mori","tou","zyu", "def",		"toride","siro","kessen","tougi",	"kyou","sima","kou", "shio","kyoku","hiroba","hana"];
setItem = setQuest = setSaisyu = setMonster = setOther = null;

//------------------------------------説明----------
var item = MST_Item[item_id];
document.getElementById("d_mei").firstChild.nodeValue = item[0];
document.getElementById("d_rea").firstChild.nodeValue = item[1];
document.getElementById("d_buy").firstChild.nodeValue = item[2] + (+item[4] >= 2000 ? "Gz" : "z");
document.getElementById("d_stock").firstChild.nodeValue = item[3];
if (+item[4] >= 3000) {
	document.getElementById("d_hrmei").firstChild.nodeValue = "GSR";
	document.getElementById("d_hr").firstChild.nodeValue = item[4] - 3000;
} else if (+item[4] >= 2000) {
	document.getElementById("d_hrmei").firstChild.nodeValue = "GR";
	document.getElementById("d_hr").firstChild.nodeValue = item[4] - 2000;
} else if (+item[4] >= 1000) {
	document.getElementById("d_hrmei").firstChild.nodeValue = "SR";
	document.getElementById("d_hr").firstChild.nodeValue = item[4] - 1000;
} else {
	document.getElementById("d_hr").firstChild.nodeValue = item[4];
}
document.getElementById("d_setu").firstChild.nodeValue = item[6];

//------------------------------------採取----------
var creSaiLink = function (data,obj,rank,season) {
	if (!data) return;
	for (var i = 0,list = data.split(","),m = list.length,txt = ""; i < m; i++) {
		var w = list[i].split("|"),
			map_id = Saisyu_Id[w[0]] + "-";
		txt += Saisyu_Name[w[0]] + " 區域：" +
				(w[3].indexOf("h") !== -1	? w[3].replace("h"," <span id=\"" + map_id + w[1] + "." + map_id + rank + "." + w[2] + "." + season + i + "\"><span class=h>昼</span> ")
											: w[3].replace("y"," <span id=\"" + map_id + w[1] + "." + map_id + rank + "." + w[2] + "." + season + i + "\"><span class=y>夜</span> ")
				) + "%</span>" +
				(w.length > 4	? " <span id=\"" + map_id + w[4] + "." + map_id + rank + "." + w[5] + "." + season + i + "\"><span class=y>夜</span> " + w[6] + "%</span><br>"
								: "<br>");
	}
	obj.innerHTML = txt.replace(/s /g,"採掘 ").replace(/m /g,"虫網 ").replace(/t /g,"釣魚 ");
	if (m > 4) {
		obj.style.height = "5em";
		obj.style.overflow = "auto";
	}
}
//下位
if (MST_Saisyu.Kai[item_id]) {
	var sai = MST_Saisyu.Kai[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_kaion"),"kai","on");
	creSaiLink(sai[1],document.getElementById("sai_kaikan"),"kai","kan");
	creSaiLink(sai[2],document.getElementById("sai_kaihan"),"kai","han");
}
//上位
if (MST_Saisyu.Zyoui[item_id]) {
	var sai = MST_Saisyu.Zyoui[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_zyouion"),"zyoui","on");
	creSaiLink(sai[1],document.getElementById("sai_zyouikan"),"zyoui","kan");
	creSaiLink(sai[2],document.getElementById("sai_zyouihan"),"zyoui","han");
}
//凄腕
if (MST_Saisyu.Sugo[item_id]) {
	var sai = MST_Saisyu.Sugo[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_sugoon"),"sugo","on");
	creSaiLink(sai[1],document.getElementById("sai_sugokan"),"sugo","kan");
	creSaiLink(sai[2],document.getElementById("sai_sugohan"),"sugo","han");
}
//G級
if (MST_Saisyu.G[item_id]) {
	var sai = MST_Saisyu.G[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_gon"),"g","on");
	creSaiLink(sai[1],document.getElementById("sai_gkan"),"g","kan");
	creSaiLink(sai[2],document.getElementById("sai_ghan"),"g","han");
}
//------------------------------------魔物----------
var creMosLink = function (data,obj) {
	if (!data) return;
	for (var i = 0,list = data.split(","),m = list.length,txt = ""; i < m; i++) {
		var w = list[i].split("|");
		txt += "<a href=\"../hagi/" + w[0] + ".htm\">" + MST_Mos.Name[w[0]] + "</a> " + w[1] + "<br>";
	}
	obj.innerHTML = txt;
}
creMosLink(MST_Mos.Kai[item_id],document.getElementById("mos_kai"));
creMosLink(MST_Mos.Zyoui[item_id],document.getElementById("mos_zyoui"));
creMosLink(MST_Mos.Sugo[item_id],document.getElementById("mos_sugo"));
creMosLink(MST_Mos.G[item_id],document.getElementById("mos_g"));
//------------------------------------任務----------
var creQueLink = function (data,obj) {
	if (!data) return;
	for (var i = 0,list = data.split(","),m = list.length,txt = ""; i < m; i++) {
		var w = MST_Quest.Name[list[i].substring(0,4)].split(","),hosyu = list[i].substring(6).split("%");
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(3) ? " class="+w[1].charAt(3) : "") + ">" + MST_Quest.Btype[parseInt(w[1].charAt(0),36)] + Quest_Season[w[1].charAt(1)] + Quest_Time[w[1].charAt(2)] + "：" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> " + MST_Quest.Htype[parseInt(list[i].substring(4,6),16)] + " で " + (hosyu.length === 1 ? hosyu[0] + "個" : hosyu[0] + "個 (" + hosyu[1] + "%)") + "<br>";
	}
	obj.innerHTML = txt;
}
creQueLink(MST_Quest.Kai[item_id],document.getElementById("que_kai"));
creQueLink(MST_Quest.Zyoui[item_id],document.getElementById("que_zyoui"));
creQueLink(MST_Quest.Sugo[item_id],document.getElementById("que_sugo"));
creQueLink(MST_Quest.G[item_id],document.getElementById("que_g"));
//------------------------------------店賣----------
if (MST_Other.Shop[item_id]) {
	var ShopName = ["総合（基本）","総合（書籍）","総合（弾ビン）","総合（道具）","総合（大闘技会）","総合（雑貨）","総合（公會貢献P交換）","食材屋","調合屋","射的","摺扇貓","萬能園地雑貨屋","網咖ショップ","公會大姐姐","氣球内","特殊道具屋","獵團受付","大討伐氣球内"];
	for (var i = 0,list = MST_Other.Shop[item_id].split(","),m = list.length,txt = ""; i < m; txt += ShopName[+list[i].substring(0,2)] + list[i++].substring(2) + "で販売<br>");
	document.getElementById("shop").innerHTML = txt;
}
//------------------------------------調合----------
var CyougoType = ["","","摩卡醃壺?","喵卡醃壺：","花園：","","萬能園地冒険屋：",""],
	CyougoName = ["調合：","萬能園地調合：LV","CP調合：","貢献P調合：","特別調合："],
	JijiMei = ["密林/樹海爺：","森丘爺：","沼地爺：","砂漠爺：","雪山爺：","峡谷爺：","高地爺：","潮島爺：","極海爺：","竹林奥部爺：","爺："];
if (MST_Other.Cyougo[item_id]) {
	var JijiMeiKoukan = [" と交換「秘藏」で高確率"," と交換「寶物」で高確率"," と交換 どちらでも高確率"," と交換 どちらでも低確率"," と交換"],
		GalleryName = ["ギャラリー大会：","ギャラリー大会Ｇ："],
		GalleryPont =["1999點數以下の賞品 ","2000點數以上の賞品 ","10000點數以上の賞品 ","20000點數以上の賞品 ","40000點數以上の賞品 ","60000點數以上の賞品 ","60000點數以上の賞品 ","80000點數以上の賞品 ","90000點數以上の賞品 ","100000點數以上の賞品 "],
		GardenName = ["澆水","打掃","採掘","採掘","採掘","發掘物","落し物貓"],
		BoukenName = ["Lv1 寒い湖畔","Lv1 足の裏が暑い砂漠の平地","Lv1 霧の掛かった湿地","Lv1 緑が生い茂った平地","Lv2 きれいな湖岸","Lv2 遺跡が見える場所","Lv2 危険な毒の沼地","Lv2 巨木のある深緑の平地","Lv2 溶岩流れる洞窟","Lv3 遺跡となった場所","Lv3 襲撃されやすい場所","Lv3 吹雪いた山頂","Lv3 伝説が生まれそうな場所","Lv3 熱すぎる火口付近"," (稀に出現) ジメっとして生臭い場所"," (稀に出現) 巨蜂の巣"," (稀に出現) 何かの巣"," (稀に出現) 大闘技場付近"," (稀に出現) 秘密の抜け穴","LV3 落雷、落石注意の平地","Lv3 風が強い赤土の谷","Lv3 潮の香りがする水辺","(SRで稀に出現) 長く険しい道","GR 身を焦がす灼地","GR 緑豊かな水辺","GR 輝く壁面の洞穴","GR 地面が凍る場所","(GRで稀に出現) 甘い香りのする草原"],
		BoukenRank = [" で最大 ","★1 で最大 ","★2 で最大 ","★3(HR31) で最大 ","HR1～10 で最大 ","HR11～20 で最大 ","HR21～30 で最大 ","HR31～ で最大 ","HR100～ で最大 ","HR1～ で ","HR1～16 で ","HR1～30 で ","HR1～99 で ","HR17～ で ","HR17～30 で ","HR17～99 で ","HR31～ で ","HR31～99 で ","HR51～ で ","HR100～ で ","GR600～ で "],
		BoukenDan = ["(上段) ","(下段) "],
		MakaTubo = [" を5分未満漬ける(白色)"," を5分以上漬ける(紫色)"," を10分以上漬ける(青色)"," を15分以上漬ける(緑色)"," を20分以上漬ける(黄色)"," を30分以上漬ける(赤色)"],
		NyakaTubo = ["を入れて 0:白 まで漬ければ ","を入れて 1：紫 まで漬ければ ","を入れて 2：青 まで漬ければ ","を入れて 3：緑 まで漬ければ ","を入れて 4：黄 まで漬ければ ","を入れて 5～：赤 まで漬ければ ","を入れて 6～：虹 まで漬ければ "];
	for (var i = 0,list = MST_Other.Cyougo[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		txt += CyougoType[list[i].charAt(0)];
		switch (list[i].charAt(0)) {
		case "0": //調合
			txt += CyougoName[list[i].charAt(1)] + list[i].substring(2) + "<br>";
			break;
		case "1": //交換
			txt += JijiMei[list[i].charAt(1)] + list[i].substring(2,list[i].length-1) + JijiMeiKoukan[list[i].charAt(list[i].length-1)] + "<br>";
			break;
		case "2": //壷
			txt += list[i].substring(1,9) + MakaTubo[list[i].charAt(9)] + "<br>";
			break;
		case "3": //ニャカ
			txt += list[i].substring(1,6) + NyakaTubo[list[i].charAt(6)] + list[i].substring(7) + "<br>";
			break;
		case "4": //花園
			txt += GardenName[list[i].charAt(1)] + BoukenRank[list[i].substring(2,4)-0] + list[i].substring(4) + "<br>";
			break;
		case "5": //ギャラリー
			txt += GalleryName[list[i].charAt(1)] + GalleryPont[list[i].charAt(2)] + list[i].substring(3) + "<br>";
			break;
		case "6": //冒険
			txt += BoukenName[list[i].substring(1,3)-0] + BoukenDan[list[i].charAt(3)] + list[i].substring(4) + "<br>";
			break;
		default:
			txt += list[i].substring(1) + "<br>";
			break;
		}
	}
	document.getElementById("cyougou").innerHTML = txt.replace(/\|[0-9A-F]{4}/g, function(s1){return " <a href=\"../sozai/sozai.htm?" + s1.substring(1) + "\">" + MST_Item[s1.substring(1)][0] + "</a> "}).replace(/K\d+\%/g, function(s1){return "個 (" + s1.substring(1) + ")"}).replace(/K/g,"個 ");
}
if (MST_Quest.Lot[item_id]) { //くじ
	for (var i = 0,list = MST_Quest.Lot[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		var w = MST_Quest.Name[list[i].substring(0,4)].split(","),hosyu = list[i].substring(6).split("%");
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(3) ? " class="+w[1].charAt(3) : "") + ">" + MST_Quest.Btype[parseInt(w[1].charAt(0),36)] + Quest_Season[w[1].charAt(1)] + Quest_Time[w[1].charAt(2)] + "：" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> " + MST_Quest.Htype[parseInt(list[i].substring(4,6),16)] + " で " + (hosyu.length === 1 ? hosyu[0] + "個" : hosyu[0] + "個 (" + hosyu[1] + "%)") + "<br>";
	}
	document.getElementById("cyougou").innerHTML = (MST_Other.Cyougo[item_id] ? document.getElementById("cyougou").innerHTML : "") + txt.replace(/HR\D/g,"SR");
}
//------------------------------------その他の利用----------
if (MST_Other.Riyou[item_id]) {
	for (var i = 0,list = MST_Other.Riyou[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		txt += CyougoType[list[i].charAt(0)].replace("?","：");
		switch (list[i].charAt(0)) {
		case "0": //調合
			txt += CyougoName[list[i].charAt(1)] + list[i].substring(2) + "作成<br>";
			break;
		case "1": //交換
			txt += JijiMei[list[i].charAt(1)] + list[i].substring(2) + "と交換可能<br>";
			break;
		case "7": //他
			txt += list[i].substring(1) + "<br>";
			break;
		default:
			txt += list[i].substring(1) + "が入手可能<br>";
			break;
		}
	}
	document.getElementById("riyou").innerHTML = txt.replace(/\|[0-9A-F]{4}/g, function(s1){return " <a href=\"../sozai/sozai.htm?" + s1.substring(1) + "\">" + MST_Item[s1.substring(1)][0] + "</a> "}).replace(/K\d+\%/g, function(s1){return "個 (" + s1.substring(1) + ")"}).replace(/K/g,"個 ").replace(/M/g,"調合して ");
}
if (MST_Quest.Riyou[item_id]) { //任務
	for (var i = 0,list = MST_Quest.Riyou[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		var w = MST_Quest.Name[list[i].substring(0,4)].split(",");
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(3) ? " class="+w[1].charAt(3) : "") + ">" + MST_Quest.Btype[parseInt(w[1].charAt(0),36)] + Quest_Season[w[1].charAt(1)] + Quest_Time[w[1].charAt(2)] + "：" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> で" + list[i].substring(5) + "個 " +(list[i].charAt(4) === "N" ? "納品<br>" : "受注で消費<br>");
	}
	document.getElementById("riyou").innerHTML = (MST_Other.Riyou[item_id] ? document.getElementById("riyou").innerHTML : "") + txt.replace(/HR\D/g,"SR");
}

//------------------------------------採取MAP表示----------
var showMap = function (evt){
	/*@if (@_jscript_version < 9)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	if (t.tagName === "SPAN") {
		var txt = (t.id || t.parentNode.id).split(".");
		document.getElementById("sai_map").src = "../img/saisyu/" + txt[0] + ".png";
		document.getElementById("sai_link").href = "../saisyu/"+ txt[1]+".htm#l"+ txt[2];
		document.getElementById("sai_link").style.display = "";
	}
}
//活動セット
var addEvent = function (elm, type, func) {
	//追加
	elm./*@if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
	//アンロードで削除
	window./*@if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ "unload",
		function(){
			elm./*@if (@_jscript_version < 9) detachEvent ('on' + @else@*/ removeEventListener (/*@end@*/ type,func,false);
		}
		,false);
};
addEvent(document.getElementById("sai_kaion"),"click",showMap);
addEvent(document.getElementById("sai_kaikan"),"click",showMap);
addEvent(document.getElementById("sai_kaihan"),"click",showMap);
addEvent(document.getElementById("sai_zyouion"),"click",showMap);
addEvent(document.getElementById("sai_zyouikan"),"click",showMap);
addEvent(document.getElementById("sai_zyouihan"),"click",showMap);
addEvent(document.getElementById("sai_sugoon"),"click",showMap);
addEvent(document.getElementById("sai_sugokan"),"click",showMap);
addEvent(document.getElementById("sai_sugohan"),"click",showMap);
addEvent(document.getElementById("sai_gon"),"click",showMap);
addEvent(document.getElementById("sai_gkan"),"click",showMap);
addEvent(document.getElementById("sai_ghan"),"click",showMap);

//ボタン
if (location.search.charAt(5) === "W") {
	document.getElementById("b_back").value = "閉じる";
	addEvent(document.getElementById("b_back"),"click",function () {window.close();});
} else {
	addEvent(document.getElementById("b_back"),"click",function () {history.back();});
}
MST_Item = MST_Quest = MST_Saisyu = MST_Mos = MST_Other =null;

//武器防具
addEvent(document.getElementById("b_yt"),"click",function () {
var BouguName = {"h":"頭防具","b":"胴防具","a":"腕防具","w":"腰防具","l":"脚防具","d":"装飾品","c":"カフ","s":"紋章","n":"貓","H":"Ｐ頭","B":"Ｐ胴"},
	BouguId = {"h":"head","b":"body","a":"arm","w":"wst","l":"leg","d":"deco","c":"deco","n":"deco","s":"sigil","H":"head_pertnya","B":"body_pertnya"},
	BukiName = {0:"大劍",1:"重弩",2:"大錘",3:"長槍",4:"單手劍",5:"輕弩",6:"雙劍",7:"太刀",8:"狩獵笛",9:"銃槍","A":"弓","B":"穿龍棍","C":"Ｐ大劍","E":"Ｐ大錘"},
	BukiId = {0:"taiken",1:"heavy",2:"hammer",3:"lance",4:"katate",5:"right",6:"souken",7:"tachi",8:"horn",9:"gunlance","A":"yumi","B":"tonfa","C":"taiken_partnya","E":"hammer_partnya"},
	Craft = {0:"生産",1:"強化",2:"G生産",3:"G強化",4:"G確定"},
	MST_Equip = setBuki();
if (MST_Equip.Sozai[item_id]) {
	var txt = "<table><tr><th style=\"width:7em;\">武器種類</th><th style=\"width:10em;\">武器名</th><th style=\"width:2.5em;\">製作</th><th style=\"width:2em;\">数</th></tr>";
	for (var i = 0,su_sum = 0,list = MST_Equip.Sozai[item_id].split(","),m = list.length; i < m; i++) {
		var eq_rui = list[i].charAt(0),
			eq_id = list[i].substring(1,5),
			eq_cra = list[i].charAt(5),
			su = list[i].substring(6),
			eq_name = MST_Equip.Name[eq_rui+eq_id],
			sp = "",
			lv = "";
		if (eq_cra === "2" || eq_cra === "3" || eq_cra === "4") { //G武器
			sp = "_g";
			if (eq_cra === "4") {
				lv = +list[i].substring(6,8);
				su = list[i].substring(8);
			}
		} else if (MST_Equip.SP.indexOf(eq_rui+eq_id) !== -1) { //SP武器
			sp = "_sp";
		} else if (MST_Equip.Neko.indexOf(eq_rui+eq_id) !== -1) { //剛ねこ武器
			sp = "_n";
		} else if (MST_Equip.Sinka.indexOf(eq_rui+eq_id) !== -1) { //進化武器
			sp = "_s";
		}
		txt += "<tr><td>" + BukiName[eq_rui] + "</td><td><a href='../buki/" + BukiId[eq_rui] + sp + ".htm#l" + eq_id + lv + "'>" + eq_name + "</a></td><td>" + Craft[eq_cra] + lv + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
		su_sum += +su;
	}
	document.getElementById("tblBuki").innerHTML = txt + "<tr><td colspan=4 style=\"text-align:right;\">" + su_sum + "</td></tr></table>";
}
MST_Equip = setBougu();
if (MST_Equip.Sozai[item_id]) {
	var txt = "<table><tr><th style=\"width:4em;\">部位</th><th style=\"width:10em;\">防具名</th><th style=\"width:1.5em;\">LV</th><th style=\"width:2em;\">数</th></tr>";
	var txts = "<table><tr><th style=\"width:4em;\">装飾品</th><th style=\"width:10em;\">装飾名</th><th style=\"width:2em;\">数</th></tr>";
	for (var i = 0,su_sum = 0,list = MST_Equip.Sozai[item_id].split(","),m = list.length; i < m; i++) {
		var eq_rui = list[i].charAt(0),
			eq_id = list[i].substring(1,5),
			lv = list[i].charAt(5),
			su = list[i].substring(6),
			eq_name = MST_Equip.Name[eq_rui+eq_id],
			sp = "";
		if (eq_rui === "d" || eq_rui === "s") {
			//装飾品カフ
			if (eq_name.lastIndexOf("貓の") !== -1) {
				sp = "nk",eq_rui = "n";
			} else if (eq_name.lastIndexOf("カフ") !== -1) {
				sp = "cf",eq_rui = "c";
			} else if (eq_name.lastIndexOf("ＳＰ") !== -1) {
				sp = "sp";
			}
			txts += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/" + BouguId[eq_rui] + sp + ".htm#l" + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:right;\">" + su + "</td></tr>";
		} else {
			//防具
			if (eq_name.lastIndexOf("SP") !== -1) {
				txt += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/" + BouguId[eq_rui] +  "sp.htm#l" + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:center;\">" + lv.replace("0","生") + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
			} else {
				txt += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/_tree.htm#" + BouguId[eq_rui].charAt(0) + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:center;\">" + lv.replace("0","生") + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
			}
		su_sum += +su;
		}
	}
	if (su_sum) document.getElementById("tblBougu").innerHTML = txt + "<tr><td colspan=4 style=\"text-align:right;\">" + su_sum + "</td></tr></table>";
	document.getElementById("tblDec").innerHTML = txts + "<tr><td colspan=4 style=\"text-align:right;\"></td></tr></table>";
}
MST_Equip = setBuki = setBougu = null;
document.getElementById("b_yt").disabled = true;
});

document.getElementsByTagName("table")[0].style.width = "auto";
document.getElementById("loading").style.display="none";
document.getElementById("b_yt").disabled = false;

//アンロード退避
addEvent(window,"unload",function () {
document.cookie = "item=" + [item_id,Number(document.getElementById("b_yt").disabled),document.documentElement.scrollTop].join(":");
});
//オンロード
var w = document.cookie;
if (w.indexOf("item=" + item_id) !== -1) {
	w = w.split("item=")[1].split(":");
	if (w[1] === "1") {
		/*@if (@_jscript_version < 9) 
		document.getElementById("b_yt").fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", false, true);
		document.getElementById("b_yt").dispatchEvent(evt);
		/*@end@*/
	}
	window.scrollTo(0,parseInt(w[2]));
};

})(document);
