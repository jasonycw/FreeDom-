//setTimeout
(function (){
/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
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
//列表セット
var selectSet = function(e,v) {
	var m = v.length;
	/*@if (@_jscript_version < 9)
	e.options.length = m;
	for (var i = 0;i < m;e.options[i].value = e.options[i].text = v[i++]);
	@else@*/
	e.length = 0;
	for (var i = 0,o;i < m;i++){
		o = document.createElement("option");
		o.setAttribute("value", v[i]);
		o.appendChild(document.createTextNode(v[i]));
		e.appendChild(o.cloneNode(true));
	}
	/*@end@*/
};
var selectSet2 = function(e,t,v) {
	var m = v.length;
	/*@if (@_jscript_version < 9)
	e.options.length = m;
	for (var i = 0;i < m;e.options[i].value = v[i],e.options[i].text = t[i++]);
	@else@*/
	e.length = 0;
	for (var i = 0,o;i < m;i++){
		o = document.createElement("option");
		o.setAttribute("value", v[i]);
		o.appendChild(document.createTextNode(t[i]));
		e.appendChild(o.cloneNode(true));
	}
	/*@end@*/
};

//初期設定
var treeCK = document.getElementById("gun") === null
	ckG = location.pathname.indexOf("_g") !== -1 ? 0 : 1,
	col = 4;

//HTMLにボタン追加
var tH = document.getElementsByTagName("thead")[0].rows[0],
	dt = document.createElement("div"),
	i = document.createElement("input"),
	s = document.createElement("select");
i.type = "button";
//名称ソート
i.value = "名稱",i.title = "按名稱排序";
dt.appendChild(i.cloneNode(false));
//攻撃ソート
i.value = "攻撃",i.title = "按攻擊排序";
dt.appendChild(i.cloneNode(false));
//属性ソート
if (treeCK){
	i.value = "属性",i.title = "按屬性排序"; //,i.disabled = true
	dt.appendChild(i.cloneNode(false));
}
if (ckG) {
	//レア制限
	s.title = "選擇RARE";
	selectSet(s,["レア","12","11","10","9","8","7","6","5","4","3","2","1"]);
	s.selectedIndex = 0;
	dt.appendChild(s.cloneNode(true));
	var ckRare_F = function (e) {
		return e === "レア" ? function(){return true} : function (cell) {return +cell.firstChild.nodeValue <= e && !cell.firstChild.nextSibling;};
	};
} else {
	//LV制限
	s.title = "選擇LV";
	selectSet(s,["Lv",50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]);
	s.selectedIndex = 0;
	dt.appendChild(s.cloneNode(true));
	var ckRare_F = function (e) {
		return e === "Lv" ? function(){return true} : function (cell) {return cell.lastChild.firstChild.nodeValue === "Lv" + e;};
	};
}
tH.cells[0].appendChild(dt);
if (treeCK){ //剣士弓
	if (location.pathname.indexOf("yumi") === -1) {
		//状態異常
		s.title = "選擇異常狀態";
		selectSet(s,["状態","無","麻痺","睡眠","毒"]);
		dt.appendChild(s.cloneNode(true));
		var ckIzyo_F = function (e) {
			return	e === "状態" ? function(){return true} :
					e === "無"	? function (cell) {return !(/[麻睡毒]/).test(cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/);}
								: function (cell) {	return cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/.lastIndexOf(e) !== -1;};
		};
	} else {
		//曲射
		s.title = "選擇曲射";
		selectSet(s,["曲射","放散","集中","爆裂","切断"]);
		dt.appendChild(s.cloneNode(true));
		var ckIzyo_F = function (e) {
			return	e === "曲射" ? function(){return true} :
					e === "無"	? function (cell) {return !(/[散集裂断]/).test(cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/);}
								: function (cell) {return cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/.lastIndexOf(e) !== -1;};
		};
	}
	//属性
	s.style.display = "block",s.title = "選擇屬性";
	selectSet(s,["属性","無","火","水","雷","龍","氷","炎","光","雷極","天翔","熾凍","黒焔","奏","闇","紅魔","風","響"]);
	tH.cells[2].appendChild(s.cloneNode(true));
	tH.cells[2].childNodes.item(1).style.marginLeft = "0.5em";
	var ckZoku_F = function (e) {
		return	e === "属性" ? function(){return true} :
				e === "無"	? function (cell) {return !(/[火水雷龍氷炎光天熾焔奏闇紅]/).test(cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/);}
							: function (cell) {return cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/.lastIndexOf(e) !== -1;};
	};
	if (location.pathname.indexOf("gunlance") !== -1) {
		//銃槍
		s.title = "選擇砲擊類型";
		selectSet(s,["砲撃","通常型","放射型","拡散型"]);
		var ckKobetu_F = function (e) {
			return e === "砲撃" ? function(){return true} : function (cell) {return cell.lastChild.firstChild.nodeValue.indexOf(e) !== -1;};
		};
	} else if (location.pathname.indexOf("horn") !== -1) {
		//狩獵笛
		s.title = "選擇旋律";
		selectSet2(s,["旋律","白黄赤","白黄空","白青赤","白青黄","白緑赤","白緑黄","白緑青","白緑空","白空赤","白空青","紫黄赤","紫黄空","紫青赤","紫青黄","紫緑赤","紫緑黄","紫緑青","紫緑空","紫空赤","紫空青"],
					["旋律","321","327","341","342","351","352","354","357","371","374","621","627","641","642","651","652","654","657","671","674"]);
		var ckKobetu_F = function (e) {
			return e === "旋律" ? function(){return true} : function (cell) {return cell.lastChild.href.lastIndexOf(e) !== -1;};
		};
	} else if (location.pathname.indexOf("yumi") !== -1) {
		//弓
		s.title = "選擇箭矢";
		selectSet(s,["矢","1:連射","1:拡散","1:貫通","2:連射","2:拡散","2:貫通","3:連射","3:拡散","3:貫通","4:連射","4:拡散","4:貫通"]);
		col = 5; //位置補正用
		var ckKobetu_F = function (e) {
			return e === "矢" ? function(){return true} : function (cell) {return cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/.lastIndexOf(e) !== -1;};
		};
	} else {
		s.title = "選擇長度";
		selectSet(s,["リーチ","極長","長","中","短","極短","特殊"]);
		var ckKobetu_F = function (e) {
			e = "："+e;
			return	e === "：リーチ" ? function(){return true} :
					e === "：中" ? function (cell) {return cell.lastChild./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ === "";}
								: function (cell) {return cell.lastChild./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/.indexOf(e) !== -1;};
		};
	}
	tH.cells[3].appendChild(s.cloneNode(true));
} else { //ガン
	dt = document.createElement("div");
	s.title = "選擇裝填速度"
	selectSet2(s,["装填","慢","較慢","普通","較快","快"],["0","0","1","2","3","4"]);
	dt.appendChild(s.cloneNode(true));
	s.title = "選擇反動"
	selectSet2(s,["反動","最大","中","較小","小"],["0","0","1","2","3"]);
	dt.appendChild(s.cloneNode(true));
	s.title = "選擇彈速"
	selectSet2(s,["彈速","慢","較慢","較快","快"],["0","1","2","3","4"]);
	dt.appendChild(s.cloneNode(true));
	dt.appendChild(document.createElement("br"));
	var ckGun_F = function (e1,e2,e3) {
		if (e1 === "0" && e2 === "0" && e3 === "0") {
			return function(){return true};
		} else {
			var wR = ["(慢|較慢|普通|較快|快)","(較慢|普通|較快|快)","(普通|較快|快)","(較快|快)","快"],
				wK = ["(最大|中|較小|小)","(中|較小|小)","(較小|小)","小"],
				wS = ["(慢|較慢|較快|快)","慢","較慢","較快","快"],
				reg = new RegExp("^" + wR[e1] + /*@if (@_jscript_version < 9) "\r\n" + /*@end@*/ wK[e2] + /*@if (@_jscript_version < 9) "\r\n" + /*@end@*/ wS[e3],"i");
			return function (cell) {return reg.test(cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/);};
		}
	};
	s.title = "選擇彈"
	selectSet(s,["弾","通常1","通常1","通常2","通常3","貫通1","貫通2","貫通3","散弾1","散弾2","散弾3","徹甲1","徹甲2","徹甲3","拡散1","拡散2","拡散3","毒弾1","毒弾2","麻痺1","麻痺2","睡眠1","睡眠2","火炎","水冷","電撃","氷結","滅龍","ペ弾","回復","鬼人","硬化"]);
	dt.appendChild(s.cloneNode(true));
	dt.appendChild(s.cloneNode(true));
	tH.cells[4].appendChild(dt);
	var ckTama_F = function (e1,e2) {
		if (e1 === "弾" && e2 === "弾") {
			return function(){return true};
		} else {
			var wT = [,"[0-9]+","(<u>|)([0-9]+|-)(</u>|)/[0-9]+","(<u>|)[0-9]+(</u>|)/(<u>|)[0-9]+(</u>|)/[0-9]"],
				reg1,reg2;
			if (e1 !== "弾") reg1 = e1.length === 2 ? new RegExp(e1 + "：" + wT[1]) : new RegExp(e1.substring(0,2) + "：" + wT[e1.substring(2,3)],"i");
			if (e2 !== "弾") reg2 = e2.length === 2 ? new RegExp(e2 + "：" + wT[1]) : new RegExp(e2.substring(0,2) + "：" + wT[e2.substring(2,3)],"i");

			if (e1 !== "弾" && e2 !== "弾") {
				return function (cell) {return reg1.test(cell.innerHTML) && reg2.test(cell.innerHTML);};
			} else if (e1 !== "弾") {
				return function (cell) {return reg1.test(cell.innerHTML);};
			} else {
				return function (cell) {return reg2.test(cell.innerHTML);};
			}
		}
	};
	col = 5; //位置補正用
	s.style.display="block";
}
//スロ制限
s.title = "選擇洞";
selectSet(s,["スロ","3","2","1"]);
tH.cells[col].removeChild(tH.cells[col].lastChild);
tH.cells[col].appendChild(s.cloneNode(true));
tH.cells[col].lastChild.style.marginTop = "0.2em";
var ckSlot_F = function (e) {
	return e === "スロ" ? function(){return true} : function (cell) {return cell.firstChild.nodeValue >= e;};
};

/*@if (@_jscript_version >=  9)@*/
tH.cells[col].lastChild.style.position = "relative";
tH.cells[col].lastChild.style.right = "1.8em";
/*@end@*/

//解除
i.value = "解除",i.title = "選擇解除",i.style.display = "block";
tH.cells[col+3].appendChild(i.cloneNode(true));
tH.cells[col+3].style.marginRight = "auto";

tH=dt=i=s=null;

//フィルター
if (treeCK){
	//剣士弓
	var filter = function () {
		var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),
			tr = document.getElementsByTagName("tbody")[0].rows,
			N = tr.length;
			w_col1 = col,
			w_col2 = col + 1,
			ckRare = ckRare_F(s[0].value),
			ckIzyo = ckIzyo_F(s[1].value),
			ckZoku = ckZoku_F(s[2].value),
			ckSlot = ckSlot_F(s[4].value),
			ckKobetu = ckKobetu_F(s[3].value);
		for (var i = 0,cel; i < N; i++) cel = tr[i].cells,tr[i].style.display = ckRare(cel[ckG]) && ckIzyo(cel[2]) && ckZoku(cel[2]) && ckKobetu(cel[3]) && ckSlot(cel[w_col1]) ? "" : "none";
	}
} else {
	//ガン
	var filter = function () {
		var tr = document.getElementsByTagName("tbody")[0].rows, N = tr.length,s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");
		var cel,ckRare = ckRare_F(s[0].value),ckGun = ckGun_F(s[1].value,s[2].value,s[3].value),ckTama = ckTama_F(s[4].value,s[5].value),ckSlot = ckSlot_F(s[6].value);
		for (var i = 0; i<N; i++) cel=tr[i].cells,tr[i].style.display = ckRare(cel[ckG]) && ckGun(cel[3]) && ckTama(cel[4]) && ckSlot(cel[5]) ? "" : "none";
	}
}

var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");
for (var i = 0,max = s.length; i<max; addEvent(s[i++],"change",filter));
s=null;

var IsMouseDown = false;
//線可変
addEvent(document.getElementById("line"),"mousedown",
function (evt) {
	/*@if (@_jscript_version < 9)
	var e = window.event;
	@else@*/
	var e = evt;
	/*@end@*/
	if (e.button <= 1) {
		IsMouseDown = true;
		document.getElementById("line").style.position = "absolute";
		document.getElementById("line").style.left = (e.clientX -4)  + "px";
	}
});
addEvent(document,"mouseup",
function (evt) {
	if (IsMouseDown) {
		/*@if (@_jscript_version < 9)
		var e = window.event;
		@else@*/
		var e = evt;
		/*@end@*/
		document.getElementById("data").style.width = (document.documentElement.scrollWidth - e.clientX - 20) + "px";
		document.getElementById("tree").style.width = (e.clientX -5) + "px";
		document.getElementById("bar").style.left = e.clientX + "px";
		document.getElementById("line").style.left = (e.clientX -1) + "px";
		IsMouseDown = false;
	}
});
addEvent(document,"mousemove",
function (evt) {
	if (IsMouseDown) {
		/*@if (@_jscript_version < 9)
		var e = window.event;
		e.returnValue = false;
		@else@*/
		var e = evt;
		window.getSelection().removeAllRanges();
		/*@end@*/
		document.getElementById("line").style.left = (e.clientX -4) + "px";
	}
});

//ツリー
addEvent(document.getElementById("tree"),"click",
function (evt) {
	/*@if (@_jscript_version < 9)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	if (t.tagName === "SPAN" && t.id !== ""){
		if (location.pathname.indexOf("_partnya.") === -1) {
			switch (t.id) {
			case "t3": //SP
				if (location.pathname.indexOf("_sp.") === -1) {
					var w = location.pathname.split(".")[0].split("_")[0];
					location.href = w + "_sp.htm#" + t.id;
				}
				break;
			case "t5": //進化
				if (location.pathname.indexOf("_s.") === -1) {
					var w = location.pathname.split(".")[0].split("_")[0];
					location.href = w + "_s.htm#" + t.id;
				}
				break;
			case "t6": //剛猫
				if (location.pathname.indexOf("_n.") === -1) {
					var w = location.pathname.split(".")[0].split("_")[0];
					location.href = w + "_n.htm#" + t.id;
				}
				break;
			case "t8": //G
				if (location.pathname.indexOf("_g.") === -1) {
					var w = location.pathname.split(".")[0].split("_")[0];
					location.href = w + "_g.htm#" + t.id;
				}
				break;
			default : //通常
				if (location.pathname.indexOf("_") !== -1) {
					var w = location.pathname.split(".")[0].split("_")[0];
					location.href = w + ".htm#" + t.id;
				}
			}
		} else {
			location.href = "#" + t.id;
		}
		var cre = document.getElementById("tree").getElementsByTagName("span"),creB = document.getElementById("tree").getElementsByTagName("div");
		for (var i=0,m=cre.length; i<m; cre[i].style.color = "",creB[i++].style.display = "none");
		document.getElementById(t.id).style.color = "red";
		document.getElementById(t.id+"L").style.display = "block";
	}
});
if (treeCK && location.pathname.indexOf("yumi") === -1) {
	var GaugeType = {
"000":"80,110,220,320,380,400,400,400",
"001":"90,130,240,310,370,400,400,400",
"002":"130,140,200,330,370,400,400,400",
"003":"180,200,270,340,380,400,400,400",
"004":"120,230,280,320,400,400,400,400",
"005":"50,80,170,310,370,400,400,400",
"006":"30,100,280,320,360,400,400,400",
"007":"160,190,210,300,370,400,400,400",
"008":"110,110,110,110,110,400,400,400",
"009":"10,90,150,280,340,400,400,400",
"00A":"40,130,170,320,370,380,400,400",
"00B":"50,90,110,200,360,390,400,400",
"00C":"30,40,100,210,330,400,400,400",
"00D":"60,130,140,260,330,370,400,400",
"00E":"40,50,60,250,270,400,400,400",
"00F":"90,140,150,260,260,320,400,400",
"010":"70,90,100,190,400,400,400,400",
"011":"50,100,150,300,360,370,400,400",
"012":"10,20,30,310,360,380,400,400",
"013":"40,90,160,240,320,380,400,400",
"014":"80,120,150,170,180,200,400,400",
"015":"70,150,190,310,340,370,400,400",
"016":"70,90,100,190,370,370,400,400",
"017":"20,20,20,180,230,330,400,400",
"018":"70,135,195,245,290,330,400,400",
"019":"250,250,250,250,330,380,400,400",
"01A":"0,0,0,0,400,400,400,400",
"01B":"40,60,110,110,270,270,400,400",
"01C":"60,110,200,260,360,400,400,400",
"01D":"70,150,180,290,340,400,400,400",
"01E":"200,220,280,280,340,390,390,400",
"01F":"0,0,0,0,0,400,400,400",
"020":"0,0,50,50,180,390,400,400",
"021":"0,0,0,0,290,340,380,400",
"022":"10,10,190,190,210,210,210,400",
"023":"200,200,200,200,200,200,400,400",
"024":"60,120,175,230,285,340,395,400",
"025":"0,0,50,50,50,300,300,400",
"026":"0,0,230,230,230,230,400,400",
"027":"30,60,90,340,340,340,340,400",
"028":"40,40,40,40,40,180,400,400",
"029":"60,120,175,230,285,340,395,400",
"02A":"0,150,150,150,200,300,370,400",
"02B":"120,240,290,290,290,350,370,400",
"02C":"100,270,315,315,315,355,400,400",
"02D":"0,80,80,320,320,320,370,400",
"200":"90,110,240,310,360,400,400,400",
"201":"50,90,230,330,370,400,400,400",
"202":"140,180,240,310,350,400,400,400",
"203":"190,210,260,330,370,400,400,400",
"204":"80,150,220,330,380,400,400,400",
"205":"100,110,140,310,370,400,400,400",
"206":"30,50,220,340,380,400,400,400",
"207":"60,100,180,300,360,400,400,400",
"208":"120,140,240,310,335,385,400,400",
"209":"50,70,90,240,350,400,400,400",
"20A":"40,130,160,260,340,400,400,400",
"20B":"70,80,100,170,360,400,400,400",
"20C":"50,70,130,270,330,370,400,400",
"20D":"70,100,180,280,300,400,400,400",
"20E":"130,150,160,160,270,350,400,400",
"20F":"90,150,190,310,380,380,400,400",
"210":"40,40,40,320,320,400,400,400",
"211":"60,150,270,300,350,370,400,400",
"212":"120,130,130,160,180,380,400,400",
"213":"40,90,160,240,320,380,400,400",
"214":"100,150,180,230,280,370,400,400",
"215":"70,170,200,260,350,390,400,400",
"216":"130,140,200,320,380,380,400,400",
"217":"20,20,20,200,290,340,400,400",
"218":"90,170,240,290,340,385,400,400",
"219":"250,250,250,250,330,380,400,400",
"21A":"55,100,145,185,235,280,400,400",
"21B":"50,80,140,140,270,320,400,400",
"21C":"40,60,110,110,210,210,400,400",
"21D":"100,180,190,250,360,400,400,400",
"21E":"90,160,190,270,330,400,400,400",
"21F":"200,230,280,280,320,380,380,400",
"220":"0,0,0,0,400,400,400,400",
"221":"0,0,0,0,0,400,400,400",
"222":"0,0,0,0,290,340,380,400",
"223":"10,10,190,190,210,210,210,400",
"224":"200,200,200,200,200,200,400,400",
"225":"60,120,175,230,285,340,395,400",
"226":"0,0,230,230,230,230,400,400",
"227":"30,60,90,340,340,340,340,400",
"228":"40,40,40,40,40,180,400,400",
"229":"0,150,150,150,200,300,370,400",
"22A":"120,230,230,230,230,340,360,400",
"22B":"50,170,220,220,220,250,375,400",
"300":"50,100,190,320,370,400,400,400",
"301":"90,140,230,330,380,400,400,400",
"302":"30,70,240,310,360,400,400,400",
"303":"160,210,250,340,380,400,400,400",
"304":"70,110,260,320,360,400,400,400",
"305":"50,120,170,330,380,400,400,400",
"306":"30,100,140,300,370,400,400,400",
"307":"110,190,240,320,370,400,400,400",
"308":"50,70,80,120,150,400,400,400",
"309":"230,240,250,280,355,380,400,400",
"30A":"30,50,60,240,350,400,400,400",
"30B":"70,100,130,160,290,360,400,400",
"30C":"170,190,200,200,200,200,400,400",
"30D":"20,100,180,280,320,400,400,400",
"30E":"60,80,90,290,340,380,400,400",
"30F":"140,140,140,140,220,400,400,400",
"310":"100,130,140,270,310,400,400,400",
"311":"50,110,150,260,330,380,400,400",
"312":"90,150,170,280,340,400,400,400",
"313":"40,90,160,240,320,380,400,400",
"314":"70,180,230,320,340,400,400,400",
"315":"20,20,20,380,380,380,400,400",
"316":"10,160,200,280,350,390,400,400",
"317":"10,10,10,250,280,380,400,400",
"318":"55,100,145,185,235,280,400,400",
"319":"70,135,195,245,290,330,400,400",
"31A":"250,250,250,250,330,380,400,400",
"31B":"40,60,110,110,260,360,400,400",
"31C":"90,110,180,180,300,300,400,400",
"31D":"20,20,20,20,370,370,400,400",
"31E":"100,180,200,240,360,400,400,400",
"31F":"80,160,200,270,330,400,400,400",
"320":"200,230,280,280,320,380,380,400",
"321":"0,0,0,0,400,400,400,400",
"322":"0,0,0,0,0,400,400,400",
"323":"0,0,0,0,290,340,380,400",
"324":"10,10,190,190,210,210,210,400",
"325":"200,200,200,200,200,200,400,400",
"326":"60,115,170,225,280,335,390,400",
"327":"0,0,230,230,230,230,400,400",
"328":"30,70,140,140,180,250,400,400",
"329":"0,0,0,160,200,260,400,400",
"32A":"30,60,90,340,340,340,340,400",
"32B":"40,40,40,40,40,180,400,400",
"32C":"0,150,150,150,200,300,370,400",
"32D":"0,110,170,170,280,360,360,400",
"32E":"0,120,200,200,200,250,375,400",
"400":"80,100,190,310,380,400,400,400",
"401":"50,80,210,330,390,400,400,400",
"402":"20,70,250,300,370,400,400,400",
"403":"200,210,240,340,390,400,400,400",
"404":"70,120,210,320,380,400,400,400",
"405":"130,140,170,330,390,400,400,400",
"406":"10,30,60,310,380,400,400,400",
"407":"100,190,270,300,340,400,400,400",
"408":"110,160,180,280,340,360,400,400",
"409":"100,160,190,220,260,400,400,400",
"40A":"40,70,85,150,350,380,400,400",
"40B":"100,130,130,130,280,350,400,400",
"40C":"0,0,0,0,400,400,400,400",
"40D":"30,40,50,280,350,380,400,400",
"40E":"40,110,200,220,260,320,400,400",
"40F":"30,250,250,250,290,360,400,400",
"410":"100,180,220,300,350,370,400,400",
"411":"110,160,180,260,320,360,400,400",
"412":"40,60,110,110,240,300,400,400",
"413":"40,90,160,240,320,380,400,400",
"414":"10,10,10,160,300,370,400,400",
"415":"90,170,240,290,340,385,400,400",
"416":"30,80,180,250,340,400,400,400",
"417":"20,70,180,260,310,400,400,400",
"418":"200,220,270,270,300,370,370,400",
"419":"0,0,0,0,0,400,400,400",
"41A":"0,0,0,0,290,330,370,400",
"41B":"10,10,190,190,210,210,210,400",
"41C":"200,200,200,200,200,200,400,400",
"41D":"60,115,170,225,280,335,390,400",
"41E":"0,0,230,230,230,230,400,400",
"41F":"30,60,90,340,340,340,340,400",
"420":"40,40,40,40,40,180,400,400",
"421":"0,150,150,150,200,300,370,400",
"422":"130,260,310,310,310,340,360,400",
"423":"200,275,275,275,275,275,375,400",
"600":"30,100,250,320,370,400,400,400",
"601":"70,100,180,310,360,400,400,400",
"602":"90,170,250,320,360,400,400,400",
"603":"150,180,270,340,380,400,400,400",
"604":"120,170,220,320,400,400,400,400",
"605":"70,120,170,330,380,400,400,400",
"606":"90,100,130,300,350,400,400,400",
"607":"80,210,270,310,340,400,400,400",
"608":"40,70,90,100,400,400,400,400",
"609":"0,0,0,400,400,400,400,400",
"60A":"80,100,110,310,360,390,400,400",
"60B":"70,110,260,340,370,370,400,400",
"60C":"50,140,220,320,350,390,400,400",
"60D":"50,140,170,360,360,360,400,400",
"60E":"0,0,0,0,400,400,400,400",
"60F":"0,0,0,0,0,400,400,400",
"610":"40,70,90,110,130,400,400,400",
"611":"10,10,190,190,210,210,210,400",
"612":"0,0,0,0,0,400,400,400",
"613":"40,90,160,240,320,380,400,400",
"614":"55,100,145,185,235,280,400,400",
"615":"0,0,0,0,0,400,400,400",
"616":"100,160,190,220,260,400,400,400",
"617":"20,70,190,240,360,400,400,400",
"618":"20,70,190,270,320,400,400,400",
"619":"200,220,290,290,320,370,370,400",
"61A":"0,0,0,0,290,340,380,400",
"61B":"250,250,250,250,250,250,400,400",
"61C":"50,50,50,120,170,310,400,400",
"61D":"0,0,0,120,240,260,400,400",
"61E":"100,100,140,140,140,340,400,400",
"61F":"0,0,230,230,230,230,400,400",
"620":"30,60,90,340,340,340,340,400",
"621":"40,40,40,40,40,180,400,400",
"622":"60,115,170,225,280,335,390,400",
"623":"0,150,150,150,200,300,370,400",
"624":"0,0,0,140,280,360,360,400",
"625":"0,50,50,50,50,170,400,400",
"1100":"30,80,110,160,260,340,400,400",
"1101":"100,140,170,270,320,350,400,400",
"1102":"50,50,50,120,170,310,400,400",
"1103":"0,0,0,120,240,260,400,400",
"1104":"100,100,140,140,140,340,400,400",
"1105":"40,110,160,160,260,350,400,400",
"1106":"0,0,0,0,0,360,380,400",
"1107":"0,0,0,0,300,320,390,400",
"1108":"300,300,300,300,300,350,385,400",
"1109":"60,115,170,225,280,335,390,400",
"110A":"200,200,200,200,200,200,400,400",
"110B":"20,100,180,260,260,400,400,400",
"110C":"40,120,180,270,300,340,400,400",
"110D":"40,120,180,270,300,370,400,400",
"110E":"0,0,0,0,0,400,400,400",
"110F":"160,180,220,220,270,375,375,400",
"1110":"0,0,0,0,270,320,385,400",
"1111":"55,100,145,185,235,280,400,400",
"1112":"20,20,20,180,230,330,400,400",
"1113":"10,10,190,190,210,210,210,400",
"1114":"185,185,185,185,370,370,370,400",
"1115":"0,0,0,0,0,400,400,400",
"1116":"100,160,190,220,260,400,400,400",
"1117":"20,70,190,240,360,400,400,400",
"1118":"20,70,190,270,320,400,400,400",
"1119":"200,220,290,290,320,370,370,400",
"111A":"0,0,0,0,290,340,380,400",
"111B":"250,250,250,250,250,250,400,400",
"111C":"70,120,170,330,380,400,400,400",
"111D":"0,0,230,230,230,230,400,400",
"111E":"0,0,0,120,240,260,400,400"
	};
	addEvent(document,"mouseover",
	function (evt) {
		/*@if (@_jscript_version < 9)
		var t = evt.srcElement;
		@else@*/
		var t = evt.target;
		/*@end@*/
		if (t.tagName === "UL"){
			var Gr = false;
			if (!t.title) t = t.previousSibling;
			if (!t.title) t = t.previousSibling,Gr = true;
			if (t.title.charAt(1) <= "9") {
				var MaxSharp = location.pathname.indexOf("tonfa") !== -1 ? +t.title.substring(4,7) : +t.title.substring(3,6);
				//通常
				var wkSharp = MaxSharp,Gauge = GaugeType[location.pathname.indexOf("tonfa") !== -1 ? t.title.substring(0,4) : t.title.substring(0,3)].split(","),wkGauge = [];
				for (var i = 0;i<8;i++) wkGauge[i] = +Gauge[i] > wkSharp ? wkSharp : Gauge[i];
				var wkT = "長さ:" + wkSharp + " ";
				if (wkGauge[0]-0 > 0) wkT += "赤:" + wkGauge[0];
				if (wkGauge[1]-wkGauge[0] > 0) wkT += "橙:" + (wkGauge[1]-wkGauge[0]);
				if (wkGauge[2]-wkGauge[1] > 0) wkT += "黄:" + (wkGauge[2]-wkGauge[1]);
				if (wkGauge[3]-wkGauge[2] > 0) wkT += "緑:" + (wkGauge[3]-wkGauge[2]);
				if (wkGauge[4]-wkGauge[3] > 0) wkT += "青:" + (wkGauge[4]-wkGauge[3]);
				if (wkGauge[5]-wkGauge[4] > 0) wkT += "白:" + (wkGauge[5]-wkGauge[4]);
				if (wkGauge[6]-wkGauge[5] > 0) wkT += "紫:" + (wkGauge[6]-wkGauge[5]);
				if (wkSharp-wkGauge[6] > 0) wkT += "空:" + (wkSharp-wkGauge[6]);
				t.title = wkT;
				//銳利度＋１
				wkSharp = MaxSharp >= 350 ? 400 : MaxSharp + 50,wkGauge = [];
				for (var i = 0;i<8;i++) wkGauge[i] = +Gauge[i] > wkSharp ? wkSharp : Gauge[i];
				wkT = "長さ:" + wkSharp + " ";
				if (wkGauge[0]-0 > 0) wkT += "赤:" + wkGauge[0];
				if (wkGauge[1]-wkGauge[0] > 0) wkT += "橙:" + (wkGauge[1]-wkGauge[0]);
				if (wkGauge[2]-wkGauge[1] > 0) wkT += "黄:" + (wkGauge[2]-wkGauge[1]);
				if (wkGauge[3]-wkGauge[2] > 0) wkT += "緑:" + (wkGauge[3]-wkGauge[2]);
				if (wkGauge[4]-wkGauge[3] > 0) wkT += "青:" + (wkGauge[4]-wkGauge[3]);
				if (wkGauge[5]-wkGauge[4] > 0) wkT += "白:" + (wkGauge[5]-wkGauge[4]);
				if (wkGauge[6]-wkGauge[5] > 0) wkT += "紫:" + (wkGauge[6]-wkGauge[5]);
				if (wkSharp-wkGauge[6] > 0) wkT += "空:" + (wkSharp-wkGauge[6]);
				t.nextSibling.title = wkT;
				//GR
				if (Gr) {
					wkSharp = MaxSharp >= 350 ? 400 : MaxSharp + 100,wkGauge = [];
					for (var i = 0;i<8;i++) wkGauge[i] = +Gauge[i] > wkSharp ? wkSharp : Gauge[i];
					wkT = "長さ:" + wkSharp + " ";
					if (wkGauge[0]-0 > 0) wkT += "赤:" + wkGauge[0];
					if (wkGauge[1]-wkGauge[0] > 0) wkT += "橙:" + (wkGauge[1]-wkGauge[0]);
					if (wkGauge[2]-wkGauge[1] > 0) wkT += "黄:" + (wkGauge[2]-wkGauge[1]);
					if (wkGauge[3]-wkGauge[2] > 0) wkT += "緑:" + (wkGauge[3]-wkGauge[2]);
					if (wkGauge[4]-wkGauge[3] > 0) wkT += "青:" + (wkGauge[4]-wkGauge[3]);
					if (wkGauge[5]-wkGauge[4] > 0) wkT += "白:" + (wkGauge[5]-wkGauge[4]);
					if (wkGauge[6]-wkGauge[5] > 0) wkT += "紫:" + (wkGauge[6]-wkGauge[5]);
					if (wkSharp-wkGauge[6] > 0) wkT += "空:" + (wkSharp-wkGauge[6]);
					t.nextSibling.nextSibling.title = wkT;
				}
			}
		}
	});
}
addEvent(document,"click",
function (evt) {
	/*@if (@_jscript_version < 9)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	if (t.tagName === "INPUT"){
		var marker = document.createElement("tbody"),
			tB = document.getElementsByTagName("tbody")[0],
			tr = tB.rows,
			N = tr.length,
			x = [];
		switch (t.title) {
		case "按名稱排序":
			marker.id = "N"+tB.id.substring(0,2);
			var Fulltohalf = (function (){
				var han = "0123456789.,-+ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ&#65382;ンアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ&#65382;ンァァィィゥゥェェォォッッャャュュョョカキクケコサシスセソタチツテトハヒフヘホハヒフヘホカキクケコサシスセソタチツテトハヒフヘホハヒフヘホウ";
				var zen = "０１２３４５６７８９．，－＋ＡＢＣＤＥＦＪＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁァぃィぅゥぇェぉォっッゃャゅュょョがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽガギグゲゴザジズゼゾダジヅデドバビブベボパピプペポヴ";
				return function (strVal) {
					for (var i = 0,str = "",m = strVal.length,c,n; i<m; i++){
						c = strVal.charAt(i),n = zen.indexOf(c,0);
						str += n >= 0 ? han.charAt(n) : "“" + c;
					}
					return str;
				}
			})();
			for (var i = 0; i<N; x[i] = [Fulltohalf(tr[i].cells[0].firstChild.nodeValue)], x[i].row = tr[i++]);
			x.sort();
			for (var i = 0; i<N; marker.appendChild(x[i++].row));
			tB.parentNode.replaceChild( marker,tB );
			break;
		case "按攻擊排序":
			marker.id = "A"+tB.id.substring(0,2);
			for (var i = 0; i<N; x[i] = [tr[i].cells[2].firstChild.nodeValue.split(" ")[0]], x[i].row = tr[i++]);
			x.sort(function(a, b){return b - a});
			for (var i = 0; i<N; marker.appendChild(x[i++].row));
			tB.parentNode.replaceChild( marker,tB );
			break;
		case "按屬性排序":
			marker.id = "Z"+tB.id.substring(0,2);
			var s1 = document.getElementsByTagName("thead")[0].getElementsByTagName("select")[2].value,
				s2 = document.getElementsByTagName("thead")[0].getElementsByTagName("select")[1].value;
			for (var i = 0; i < N; i++) {
				if (tr[i].style.display === "") {
					x[i] = [0];
					var wcell = tr[i].cells[2].childNodes;
					for (var k = wcell.length; k--;) {
						var t = wcell[k].nodeValue || "";
						if (s1 !== "属性" && s1 !== "無" && t.indexOf(s1) !== -1 ||
							s2 !== "状態" && s2 !== "無" && t.indexOf(s2) !== -1) {
							x[i] = [+wcell[k].nodeValue.split(" ")[1]];
							break;
						}
					}
				} else {
					x[i] = [0];
				}
				x[i].row = tr[i];
			}
			x.sort(function(a, b){return b - a});
			for (var i=0; i<N; marker.appendChild(x[i++].row));
			tB.parentNode.replaceChild( marker,tB );
			break;
		case "選擇解除":
			var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");
			for (var i = 0,m = s.length; i  <m; s[i++].selectedIndex = 0);
			if (document.getElementById("top")) {
				var s = document.getElementById("top").getElementsByTagName("span");
				for (var i = 0,m = s.length; i < m; s[i++].style.color = "");
			}
			filter();
			break;
		}
	}
});
//G級リンク改善
if (!ckG) {
	addEvent(document.getElementById("tree"),"click",
	function (evt) {
		/*@if (@_jscript_version < 9)
		var t = evt.srcElement;
		@else@*/
		var t = evt.target;
		/*@end@*/
		if (t.tagName === "A"){
			var s = document.getElementsByTagName("select")[0];
			if (+s.value > 1) {
				location.hash = t.href.split("#")[1] + s.value;
				return false;
			}
		}
	});
}
//アンロード退避
if (treeCK){ //剣士弓
	addEvent(window,"unload",function () {
	var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),cre = document.getElementById("tree").getElementsByTagName("span");
	var dispflg = "";
	for (var i = 0,m = cre.length; i < m; i++) {
		if (cre[i].style.color !== "") {
			dispflg = cre[i].id.substring(1);
			break;
		}
	}
	document.cookie = "buki=" + [location.pathname+location.hash,s[0].selectedIndex,s[1].selectedIndex,s[2].selectedIndex,s[3].selectedIndex,s[4].selectedIndex,document.getElementsByTagName("tbody")[0].id,dispflg,document.getElementById("tree").scrollTop,document.getElementById("data").scrollTop].join("!");
	});
} else {
	addEvent(window,"unload",function () {
	var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),cre = document.getElementById("tree").getElementsByTagName("span");
	var dispflg = "";
	for (var i = 0,m = cre.length; i < m; i++) {
		if (cre[i].style.color !== "") {
			dispflg = cre[i].id.substring(1);
			break;
		}
	}
	document.cookie = "buki=" + [location.pathname+location.hash,s[0].selectedIndex,s[1].selectedIndex,s[2].selectedIndex,s[3].selectedIndex,s[4].selectedIndex,s[5].selectedIndex,document.getElementsByTagName("tbody")[0].id,dispflg,document.getElementById("tree").scrollTop,document.getElementById("data").scrollTop].join("!");
	});
}
//オンロード
var w = document.cookie;
if (w.indexOf("buki=" + location.pathname+location.hash) !== -1) {
	w = w.split("buki=")[1].split("!");
	var s=document.getElementsByTagName("thead")[0].getElementsByTagName("select");
	if (treeCK){ //剣士弓
		if (w[1]+w[2]+w[3]+w[4]+w[5] > 0) {
			s[0].selectedIndex = w[1];
			s[1].selectedIndex = w[2];
			s[2].selectedIndex = w[3];
			s[3].selectedIndex = w[4];
			s[4].selectedIndex = w[5];
			filter();
		}
		var s1 = w[6],s2 = w[7];
	} else {
		if (w[1]+w[2]+w[3]+w[4]+w[5]+w[6]+w[7] > 0) {
			s[0].selectedIndex = w[1];
			s[1].selectedIndex = w[2];
			s[2].selectedIndex = w[3];
			s[3].selectedIndex = w[4];
			s[4].selectedIndex = w[5];
			s[5].selectedIndex = w[6];
			filter();
		}
		var s1 = w[7],s2 = w[8];
	}
	//ソート
	if (s1 !== "") {
		var i = document.getElementsByTagName("thead")[0].getElementsByTagName("input");
		if (s1.length === 3) {
			/*@if (@_jscript_version < 9) 
			i[s1.charAt(2) === "N" ? 0 : s1.charAt(2) === "A" ? 1 : 2].fireEvent( "onclick" );
			@else@*/
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			i[s1.charAt(2) === "N" ? 0 : s1.charAt(2) === "A" ? 1 : 2].dispatchEvent(evt);
			/*@end@*/
		}
		if (s1.length === 2) {
			/*@if (@_jscript_version < 9) 
			i[s1.charAt(1) === "N" ? 0 : s1.charAt(1) === "A" ? 1 : 2].fireEvent( "onclick" );
			@else@*/
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			i[s1.charAt(1) === "N" ? 0 : s1.charAt(1) === "A" ? 1 : 2].dispatchEvent(evt);
			/*@end@*/
		}
		/*@if (@_jscript_version < 9) 
		i[s1.charAt(0) === "N" ? 0 : s1.charAt(0) === "A" ? 1 : 2].fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		i[s1.charAt(0) === "N" ? 0 : s1.charAt(0) === "A" ? 1 : 2].dispatchEvent(evt);
		/*@end@*/
	}
	//作成種別
	if (s2 !== "") {
		/*@if (@_jscript_version < 9) 
		document.getElementById("t"+s2).fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		document.getElementById("t"+s2).dispatchEvent(evt);
		/*@end@*/
	}
	document.getElementById("tree").scrollTop = parseInt(w[8]);
	document.getElementById("data").scrollTop = parseInt(w[9]);
} else if (location.hash.length > 4) {
	setTimeout(function (){
		var creB = document.getElementById("tree").getElementsByTagName("div");
		for (var i = 0,m = creB.length; i < m; i++){
			if (creB[i].innerHTML.indexOf(location.hash.substring(0,6)) !== -1) {
				//作成種別
				var treeId = creB[i].id.substring(0,creB[i].id.length-1);
				/*@if (@_jscript_version < 9) 
				document.getElementById(treeId).fireEvent( "onclick" );
				@else@*/
				var evt = document.createEvent("MouseEvents");
				evt.initEvent("click", true, true);
				document.getElementById(treeId).dispatchEvent(evt);
				/*@end@*/
				//
				var treeHREF = creB[i].getElementsByTagName("a");
				for (var j = 0,l = treeHREF.length; j < l; j++){
					if (treeHREF[j].href.lastIndexOf(location.hash.substring(0,6)) !== -1) {
						treeHREF[j].focus();
						break;
					}
				}
				break;
			}
		}
	}, 32);
} else if (location.hash.length > 0) {
		var cre = document.getElementById("tree").getElementsByTagName("span"),creB = document.getElementById("tree").getElementsByTagName("div");
		for (var i = 0,m = cre.length; i < m; cre[i].style.color = "",creB[i++].style.display = "none");
		document.getElementById(location.hash.substring(1)).style.color = "red";
		document.getElementById(location.hash.substring(1)+"L").style.display = "block";
};
})();
//}, 50);
