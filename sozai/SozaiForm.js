/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
(function (document){
//�̶�
var item_id = location.search.substring(1,5).toUpperCase(),
	MST_Item = setItem(),
	MST_Quest = setQuest(),
	MST_Saisyu = setSaisyu(),
	MST_Mos = setMonster(),
	MST_Other = setOther(),
	Quest_Season = ["","����ů��","����ֳ��","��������"],
	Quest_Time = ["","/��","/ҹ"],
	Saisyu_Name = ["����","����","ɰĮ","�ӵ�","ѩɽ","��ɽ","ɭ��","��", "�亣","ӭ�Ē���",	"��",	"��",	"�Q���","�L������","Ͽ��","�~�u","�ߵ�","���u","�O��","�ڈ�","���x"],
	Saisyu_Id	= ["",	"mitu","saba","numa","yuki","kaza","mori","tou","zyu", "def",		"toride","siro","kessen","tougi",	"kyou","sima","kou", "shio","kyoku","hiroba","hana"];
setItem = setQuest = setSaisyu = setMonster = setOther = null;

//------------------------------------�h��----------
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

//------------------------------------��ȡ----------
var creSaiLink = function (data,obj,rank,season) {
	if (!data) return;
	for (var i = 0,list = data.split(","),m = list.length,txt = ""; i < m; i++) {
		var w = list[i].split("|"),
			map_id = Saisyu_Id[w[0]] + "-";
		txt += Saisyu_Name[w[0]] + " �^��" +
				(w[3].indexOf("h") !== -1	? w[3].replace("h"," <span id=\"" + map_id + w[1] + "." + map_id + rank + "." + w[2] + "." + season + i + "\"><span class=h>��</span> ")
											: w[3].replace("y"," <span id=\"" + map_id + w[1] + "." + map_id + rank + "." + w[2] + "." + season + i + "\"><span class=y>ҹ</span> ")
				) + "%</span>" +
				(w.length > 4	? " <span id=\"" + map_id + w[4] + "." + map_id + rank + "." + w[5] + "." + season + i + "\"><span class=y>ҹ</span> " + w[6] + "%</span><br>"
								: "<br>");
	}
	obj.innerHTML = txt.replace(/s /g,"��� ").replace(/m /g,"��W ").replace(/t /g,"��~ ");
	if (m > 4) {
		obj.style.height = "5em";
		obj.style.overflow = "auto";
	}
}
//��λ
if (MST_Saisyu.Kai[item_id]) {
	var sai = MST_Saisyu.Kai[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_kaion"),"kai","on");
	creSaiLink(sai[1],document.getElementById("sai_kaikan"),"kai","kan");
	creSaiLink(sai[2],document.getElementById("sai_kaihan"),"kai","han");
}
//��λ
if (MST_Saisyu.Zyoui[item_id]) {
	var sai = MST_Saisyu.Zyoui[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_zyouion"),"zyoui","on");
	creSaiLink(sai[1],document.getElementById("sai_zyouikan"),"zyoui","kan");
	creSaiLink(sai[2],document.getElementById("sai_zyouihan"),"zyoui","han");
}
//����
if (MST_Saisyu.Sugo[item_id]) {
	var sai = MST_Saisyu.Sugo[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_sugoon"),"sugo","on");
	creSaiLink(sai[1],document.getElementById("sai_sugokan"),"sugo","kan");
	creSaiLink(sai[2],document.getElementById("sai_sugohan"),"sugo","han");
}
//G��
if (MST_Saisyu.G[item_id]) {
	var sai = MST_Saisyu.G[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_gon"),"g","on");
	creSaiLink(sai[1],document.getElementById("sai_gkan"),"g","kan");
	creSaiLink(sai[2],document.getElementById("sai_ghan"),"g","han");
}
//------------------------------------ħ��----------
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
//------------------------------------�΄�----------
var creQueLink = function (data,obj) {
	if (!data) return;
	for (var i = 0,list = data.split(","),m = list.length,txt = ""; i < m; i++) {
		var w = MST_Quest.Name[list[i].substring(0,4)].split(","),hosyu = list[i].substring(6).split("%");
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(3) ? " class="+w[1].charAt(3) : "") + ">" + MST_Quest.Btype[parseInt(w[1].charAt(0),36)] + Quest_Season[w[1].charAt(1)] + Quest_Time[w[1].charAt(2)] + "��" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> " + MST_Quest.Htype[parseInt(list[i].substring(4,6),16)] + " �� " + (hosyu.length === 1 ? hosyu[0] + "��" : hosyu[0] + "�� (" + hosyu[1] + "%)") + "<br>";
	}
	obj.innerHTML = txt;
}
creQueLink(MST_Quest.Kai[item_id],document.getElementById("que_kai"));
creQueLink(MST_Quest.Zyoui[item_id],document.getElementById("que_zyoui"));
creQueLink(MST_Quest.Sugo[item_id],document.getElementById("que_sugo"));
creQueLink(MST_Quest.G[item_id],document.getElementById("que_g"));
//------------------------------------���u----------
if (MST_Other.Shop[item_id]) {
	var ShopName = ["�t�ϣ�������","�t�ϣ�������","�t�ϣ����ӥ�","�t�ϣ����ߣ�","�t�ϣ����L���ᣩ","�t�ϣ��j؛��","�t�ϣ�����ؕ��P���Q��","ʳ����","�{����","���","ߡ��؈","�f�܈@���j؛��","�W������å�","��������","������","���������","�C�F�ܸ�","��ӑ��������"];
	for (var i = 0,list = MST_Other.Shop[item_id].split(","),m = list.length,txt = ""; i < m; txt += ShopName[+list[i].substring(0,2)] + list[i++].substring(2) + "��؜��<br>");
	document.getElementById("shop").innerHTML = txt;
}
//------------------------------------�{��----------
var CyougoType = ["","","Ħ���Z��?","�����Z�أ�","���@��","","�f�܈@��ð��ݣ�",""],
	CyougoName = ["�{�ϣ�","�f�܈@���{�ϣ�LV","CP�{�ϣ�","ؕ��P�{�ϣ�","�؄e�{�ϣ�"],
	JijiMei = ["����/�亣����","ɭ�𠔣�","�ӵؠ���","ɰĮ����","ѩɽ����","Ͽ�Ƞ���","�ߵؠ���","���u����","�O������","���ְ²�����","����"];
if (MST_Other.Cyougo[item_id]) {
	var JijiMeiKoukan = [" �Ƚ��Q���زء��Ǹߴ_��"," �Ƚ��Q������Ǹߴ_��"," �Ƚ��Q �ɤ���Ǥ�ߴ_��"," �Ƚ��Q �ɤ���Ǥ�ʹ_��"," �Ƚ��Q"],
		GalleryName = ["������`��᣺","������`���ǣ�"],
		GalleryPont =["1999�c�����¤��pƷ ","2000�c�����Ϥ��pƷ ","10000�c�����Ϥ��pƷ ","20000�c�����Ϥ��pƷ ","40000�c�����Ϥ��pƷ ","60000�c�����Ϥ��pƷ ","60000�c�����Ϥ��pƷ ","80000�c�����Ϥ��pƷ ","90000�c�����Ϥ��pƷ ","100000�c�����Ϥ��pƷ "],
		GardenName = ["��ˮ","���","���","���","���","�l����","�䤷��؈"],
		BoukenName = ["Lv1 ��������","Lv1 ����Y���ɰĮ��ƽ��","Lv1 �F�Β줫�ä�ʪ��","Lv1 �v������ï�ä�ƽ��","Lv2 ���줤�ʺ���","Lv2 �z�E��Ҋ�������","Lv2 Σꓤʶ����ӵ�","Lv2 ��ľ�Τ�����v��ƽ��","Lv2 ��������붴��","Lv3 �z�E�Ȥʤä�����","Lv3 �u�Ĥ���䤹������","Lv3 ��ѩ����ɽ�","Lv3 ���h�����ޤ줽���ʈ���","Lv3 �᤹�����ڸ���"," (ϡ�˳��F) ����äȤ�������������"," (ϡ�˳��F) �޷�Ύz"," (ϡ�˳��F) �Τ��Ύz"," (ϡ�˳��F) ���L��������"," (ϡ�˳��F) ���ܤΒi��Ѩ","LV3 ���ס���ʯע���ƽ��","Lv3 �L�����������ι�","Lv3 ������꤬����ˮ�x","(SR��ϡ�˳��F) �L��ꓤ�����","GR ��򽹤����Ƶ�","GR �v�N����ˮ�x","GR �x������ζ�Ѩ","GR ���椬�������","(GR��ϡ�˳��F) �ʤ����Τ����ԭ"],
		BoukenRank = [" ����� ","��1 ����� ","��2 ����� ","��3(HR31) ����� ","HR1��10 ����� ","HR11��20 ����� ","HR21��30 ����� ","HR31�� ����� ","HR100�� ����� ","HR1�� �� ","HR1��16 �� ","HR1��30 �� ","HR1��99 �� ","HR17�� �� ","HR17��30 �� ","HR17��99 �� ","HR31�� �� ","HR31��99 �� ","HR51�� �� ","HR100�� �� ","GR600�� �� "],
		BoukenDan = ["(�϶�) ","(�¶�) "],
		MakaTubo = [" ��5��δ���n����(��ɫ)"," ��5�����ϝn����(��ɫ)"," ��10�����ϝn����(��ɫ)"," ��15�����ϝn����(�vɫ)"," ��20�����ϝn����(��ɫ)"," ��30�����ϝn����(��ɫ)"],
		NyakaTubo = ["������ 0:�� �ޤǝn����� ","������ 1���� �ޤǝn����� ","������ 2���� �ޤǝn����� ","������ 3���v �ޤǝn����� ","������ 4���� �ޤǝn����� ","������ 5������ �ޤǝn����� ","������ 6������ �ޤǝn����� "];
	for (var i = 0,list = MST_Other.Cyougo[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		txt += CyougoType[list[i].charAt(0)];
		switch (list[i].charAt(0)) {
		case "0": //�{��
			txt += CyougoName[list[i].charAt(1)] + list[i].substring(2) + "<br>";
			break;
		case "1": //���Q
			txt += JijiMei[list[i].charAt(1)] + list[i].substring(2,list[i].length-1) + JijiMeiKoukan[list[i].charAt(list[i].length-1)] + "<br>";
			break;
		case "2": //��
			txt += list[i].substring(1,9) + MakaTubo[list[i].charAt(9)] + "<br>";
			break;
		case "3": //�˥㥫
			txt += list[i].substring(1,6) + NyakaTubo[list[i].charAt(6)] + list[i].substring(7) + "<br>";
			break;
		case "4": //���@
			txt += GardenName[list[i].charAt(1)] + BoukenRank[list[i].substring(2,4)-0] + list[i].substring(4) + "<br>";
			break;
		case "5": //������`
			txt += GalleryName[list[i].charAt(1)] + GalleryPont[list[i].charAt(2)] + list[i].substring(3) + "<br>";
			break;
		case "6": //ð�
			txt += BoukenName[list[i].substring(1,3)-0] + BoukenDan[list[i].charAt(3)] + list[i].substring(4) + "<br>";
			break;
		default:
			txt += list[i].substring(1) + "<br>";
			break;
		}
	}
	document.getElementById("cyougou").innerHTML = txt.replace(/\|[0-9A-F]{4}/g, function(s1){return " <a href=\"../sozai/sozai.htm?" + s1.substring(1) + "\">" + MST_Item[s1.substring(1)][0] + "</a> "}).replace(/K\d+\%/g, function(s1){return "�� (" + s1.substring(1) + ")"}).replace(/K/g,"�� ");
}
if (MST_Quest.Lot[item_id]) { //����
	for (var i = 0,list = MST_Quest.Lot[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		var w = MST_Quest.Name[list[i].substring(0,4)].split(","),hosyu = list[i].substring(6).split("%");
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(3) ? " class="+w[1].charAt(3) : "") + ">" + MST_Quest.Btype[parseInt(w[1].charAt(0),36)] + Quest_Season[w[1].charAt(1)] + Quest_Time[w[1].charAt(2)] + "��" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> " + MST_Quest.Htype[parseInt(list[i].substring(4,6),16)] + " �� " + (hosyu.length === 1 ? hosyu[0] + "��" : hosyu[0] + "�� (" + hosyu[1] + "%)") + "<br>";
	}
	document.getElementById("cyougou").innerHTML = (MST_Other.Cyougo[item_id] ? document.getElementById("cyougou").innerHTML : "") + txt.replace(/HR\D/g,"SR");
}
//------------------------------------������������----------
if (MST_Other.Riyou[item_id]) {
	for (var i = 0,list = MST_Other.Riyou[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		txt += CyougoType[list[i].charAt(0)].replace("?","��");
		switch (list[i].charAt(0)) {
		case "0": //�{��
			txt += CyougoName[list[i].charAt(1)] + list[i].substring(2) + "����<br>";
			break;
		case "1": //���Q
			txt += JijiMei[list[i].charAt(1)] + list[i].substring(2) + "�Ƚ��Q����<br>";
			break;
		case "7": //��
			txt += list[i].substring(1) + "<br>";
			break;
		default:
			txt += list[i].substring(1) + "�����ֿ���<br>";
			break;
		}
	}
	document.getElementById("riyou").innerHTML = txt.replace(/\|[0-9A-F]{4}/g, function(s1){return " <a href=\"../sozai/sozai.htm?" + s1.substring(1) + "\">" + MST_Item[s1.substring(1)][0] + "</a> "}).replace(/K\d+\%/g, function(s1){return "�� (" + s1.substring(1) + ")"}).replace(/K/g,"�� ").replace(/M/g,"�{�Ϥ��� ");
}
if (MST_Quest.Riyou[item_id]) { //�΄�
	for (var i = 0,list = MST_Quest.Riyou[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		var w = MST_Quest.Name[list[i].substring(0,4)].split(",");
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(3) ? " class="+w[1].charAt(3) : "") + ">" + MST_Quest.Btype[parseInt(w[1].charAt(0),36)] + Quest_Season[w[1].charAt(1)] + Quest_Time[w[1].charAt(2)] + "��" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> ��" + list[i].substring(5) + "�� " +(list[i].charAt(4) === "N" ? "�{Ʒ<br>" : "��ע�����M<br>");
	}
	document.getElementById("riyou").innerHTML = (MST_Other.Riyou[item_id] ? document.getElementById("riyou").innerHTML : "") + txt.replace(/HR\D/g,"SR");
}

//------------------------------------��ȡMAP��ʾ----------
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
//��ӥ��å�
var addEvent = function (elm, type, func) {
	//׷��
	elm./*@if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
	//�����`�ɤ�����
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

//�ܥ���
if (location.search.charAt(5) === "W") {
	document.getElementById("b_back").value = "�]����";
	addEvent(document.getElementById("b_back"),"click",function () {window.close();});
} else {
	addEvent(document.getElementById("b_back"),"click",function () {history.back();});
}
MST_Item = MST_Quest = MST_Saisyu = MST_Mos = MST_Other =null;

//��������
addEvent(document.getElementById("b_yt"),"click",function () {
var BouguName = {"h":"�^����","b":"�ط���","a":"�����","w":"������","l":"�ŷ���","d":"װ�Ʒ","c":"����","s":"�y��","n":"؈","H":"���^","B":"����"},
	BouguId = {"h":"head","b":"body","a":"arm","w":"wst","l":"leg","d":"deco","c":"deco","n":"deco","s":"sigil","H":"head_pertnya","B":"body_pertnya"},
	BukiName = {0:"��",1:"����",2:"���N",3:"�L��",4:"���ք�",5:"�p��",6:"�p��",7:"̫��",8:"���C��",9:"�|��","A":"��","B":"������","C":"�д�","E":"�д��N"},
	BukiId = {0:"taiken",1:"heavy",2:"hammer",3:"lance",4:"katate",5:"right",6:"souken",7:"tachi",8:"horn",9:"gunlance","A":"yumi","B":"tonfa","C":"taiken_partnya","E":"hammer_partnya"},
	Craft = {0:"���b",1:"����",2:"G���b",3:"G����",4:"G�_��"},
	MST_Equip = setBuki();
if (MST_Equip.Sozai[item_id]) {
	var txt = "<table><tr><th style=\"width:7em;\">�����N�</th><th style=\"width:10em;\">������</th><th style=\"width:2.5em;\">�u��</th><th style=\"width:2em;\">��</th></tr>";
	for (var i = 0,su_sum = 0,list = MST_Equip.Sozai[item_id].split(","),m = list.length; i < m; i++) {
		var eq_rui = list[i].charAt(0),
			eq_id = list[i].substring(1,5),
			eq_cra = list[i].charAt(5),
			su = list[i].substring(6),
			eq_name = MST_Equip.Name[eq_rui+eq_id],
			sp = "",
			lv = "";
		if (eq_cra === "2" || eq_cra === "3" || eq_cra === "4") { //G����
			sp = "_g";
			if (eq_cra === "4") {
				lv = +list[i].substring(6,8);
				su = list[i].substring(8);
			}
		} else if (MST_Equip.SP.indexOf(eq_rui+eq_id) !== -1) { //SP����
			sp = "_sp";
		} else if (MST_Equip.Neko.indexOf(eq_rui+eq_id) !== -1) { //���ͤ�����
			sp = "_n";
		} else if (MST_Equip.Sinka.indexOf(eq_rui+eq_id) !== -1) { //�M������
			sp = "_s";
		}
		txt += "<tr><td>" + BukiName[eq_rui] + "</td><td><a href='../buki/" + BukiId[eq_rui] + sp + ".htm#l" + eq_id + lv + "'>" + eq_name + "</a></td><td>" + Craft[eq_cra] + lv + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
		su_sum += +su;
	}
	document.getElementById("tblBuki").innerHTML = txt + "<tr><td colspan=4 style=\"text-align:right;\">" + su_sum + "</td></tr></table>";
}
MST_Equip = setBougu();
if (MST_Equip.Sozai[item_id]) {
	var txt = "<table><tr><th style=\"width:4em;\">��λ</th><th style=\"width:10em;\">������</th><th style=\"width:1.5em;\">LV</th><th style=\"width:2em;\">��</th></tr>";
	var txts = "<table><tr><th style=\"width:4em;\">װ�Ʒ</th><th style=\"width:10em;\">װ���</th><th style=\"width:2em;\">��</th></tr>";
	for (var i = 0,su_sum = 0,list = MST_Equip.Sozai[item_id].split(","),m = list.length; i < m; i++) {
		var eq_rui = list[i].charAt(0),
			eq_id = list[i].substring(1,5),
			lv = list[i].charAt(5),
			su = list[i].substring(6),
			eq_name = MST_Equip.Name[eq_rui+eq_id],
			sp = "";
		if (eq_rui === "d" || eq_rui === "s") {
			//װ�Ʒ����
			if (eq_name.lastIndexOf("؈��") !== -1) {
				sp = "nk",eq_rui = "n";
			} else if (eq_name.lastIndexOf("����") !== -1) {
				sp = "cf",eq_rui = "c";
			} else if (eq_name.lastIndexOf("�ӣ�") !== -1) {
				sp = "sp";
			}
			txts += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/" + BouguId[eq_rui] + sp + ".htm#l" + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:right;\">" + su + "</td></tr>";
		} else {
			//����
			if (eq_name.lastIndexOf("SP") !== -1) {
				txt += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/" + BouguId[eq_rui] +  "sp.htm#l" + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:center;\">" + lv.replace("0","��") + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
			} else {
				txt += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/_tree.htm#" + BouguId[eq_rui].charAt(0) + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:center;\">" + lv.replace("0","��") + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
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

//�����`���˱�
addEvent(window,"unload",function () {
document.cookie = "item=" + [item_id,Number(document.getElementById("b_yt").disabled),document.documentElement.scrollTop].join(":");
});
//�����`��
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
