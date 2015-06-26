(function (document){
/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
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
//��������
addEvent(document.getElementById("b_search"),"click",function () {
var searchMei = document.getElementById("equip").value;
if (!searchMei) return;

var BouguName = {"h":"�^����","b":"�ط���","a":"�����","w":"������","l":"�ŷ���","d":"װ�Ʒ","c":"����","s":"�y��"},
	BouguId = {"h":"head","b":"body","a":"arm","w":"wst","l":"leg","d":"deco","c":"deco","s":"sigil"},
	BukiName = {0:"��",1:"����",2:"���N",3:"�L��",4:"���ք�",5:"�p��",6:"�p��",7:"̫��",8:"���C��",9:"�|��","A":"��","B":"������"},
	BukiId = {0:"taiken",1:"heavy",2:"hammer",3:"lance",4:"katate",5:"right",6:"souken",7:"tachi",8:"horn",9:"gunlance","A":"yumi","B":"tonfa"},
	MST_Equip = setBuki();

var txt = "<table><tr><th style=\"width:7em;\">�����N�</th><th style=\"width:10em;\">������</th></tr>";
for (var i in MST_Equip.Name) {
	if (MST_Equip.Name[i].indexOf(searchMei) !== -1) {
		var eq_rui = i.charAt(0),
			eq_id = i.substring(1,5),
			eq_name = MST_Equip.Name[i],
			sp = "";
		if (MST_Equip.G.indexOf(eq_rui+eq_id) !== -1) { //G����
			sp = "_g";
		} else if (MST_Equip.SP.indexOf(eq_rui+eq_id) !== -1) { //SP����
			sp = "_sp";
		} else if (MST_Equip.Neko.indexOf(eq_rui+eq_id) !== -1) { //���ͤ�����
			sp = "_n";
		} else if (MST_Equip.Sinka.indexOf(eq_rui+eq_id) !== -1) { //�M������
			sp = "_s";
		}
		txt += "<tr><td>" + BukiName[eq_rui] + "</td><td><a href='../buki/" + BukiId[eq_rui] + sp + ".htm#l" + eq_id + "'>" + eq_name + "</a></tr>";
	}
}
document.getElementById("tblBuki").innerHTML = txt + "<table>";

MST_Equip = setBougu();
var txt = "<table><tr><th style=\"width:4em;\">��λ</th><th style=\"width:10em;\">������</th></tr>";
var txts = "<table><tr><th style=\"width:4em;\">װ�Ʒ</th><th style=\"width:10em;\">װ���</th></tr>";
for (var i in MST_Equip.Name) {
	if (MST_Equip.Name[i].indexOf(searchMei) !== -1) {
		var eq_rui = i.charAt(0),
			eq_id = i.substring(1,5),
			eq_name = MST_Equip.Name[i],
			sp = "";
		if (eq_rui === "d" || eq_rui === "s") {
			//װ�Ʒ����
			if (eq_name.lastIndexOf("����") !== -1) {
				sp = "cf",eq_rui = "c";
			} else if (eq_name.lastIndexOf("�ӣ�") !== -1) {
				sp = "sp";
			}
			txts += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/" + BouguId[eq_rui] + sp + ".htm#l" + eq_id + "'>" + eq_name + "</a></td></tr>";
		} else {
			//����
			if (eq_name.lastIndexOf("SP") !== -1) {
				txt += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/" + BouguId[eq_rui] + "sp.htm#l" + eq_id + "'>" + eq_name + "</a></td></tr>";
			} else {
				txt += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/_tree.htm#" + BouguId[eq_rui].charAt(0) + eq_id + "'>" + eq_name + "</a></td></tr>";
			}
		}
	}
}
document.getElementById("tblBougu").innerHTML = txt + "</table>";
document.getElementById("tblDec").innerHTML = txts + "</table>";
});

document.getElementById("equip").focus();

//�����`���˱�
addEvent(window,"unload",function () {
document.cookie = "equip=" + [escape(document.getElementById("equip").value),document.documentElement.scrollTop].join(":");
});
//�����`��
var w = document.cookie;
if (w.indexOf("equip=") !== -1) {
	w = w.split("equip=")[1].split(":");
	document.getElementById("equip").value = unescape(w[0]);
	/*@if (@_jscript_version < 9) 
	document.getElementById("b_search").fireEvent("onclick");
	@else@*/
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", false, true);
	document.getElementById("b_search").dispatchEvent(evt);
	/*@end@*/
	window.scrollTo(0,parseInt(w[1]));
};

})(document);
