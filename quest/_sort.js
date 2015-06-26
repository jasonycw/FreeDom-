(function(){
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

//HTMLにボタン追加
var tH = document.getElementsByTagName("thead")[0].rows[0],
	i = document.createElement("input"),
	s = document.createElement("select");
i.type = "button",i.style.display = s.style.display = "block",
i.style.marginRight = i.style.marginLeft = s.style.marginRight = "auto";

//場所
s.title = "場所で絞り込み";
selectSet(s,["場所","密林","砂漠","沼地","雪山","火山","樹海","森丘","塔","峡谷","高地","潮島","極海","花畑","竹林","砦","拠点","城","闘技場","決戦場","絶島"]);
s.selectedIndex = 0;
tH.cells[2].appendChild(s.cloneNode(true));

//ターゲット
s.title = "ターゲットで絞り込み";
selectSet(s,["ターゲット","艾路","霸龍","尾晶蠍","灰晶蠍","獰龍","甲殼龍","草食龍","暴鋸龍","刻龍","毒猛龍","黑狼鳥","怪鳥","怪鳥亜種","熔岩龍","熔岩龍亜種","ウルキー","棘龍","棘龍亜種","棘龍希少種","稜角羚","霞龍","弩岩龍","雪鹿","水龍","水龍亜種","蛇龍","鎌蟹","雄·響狼","砂龍","巨甲蟲","氷獰龍","冰猛龍","麒麟","晶龍","鋼龍","鎧龍","鎧龍亜種","蠻龍","痺猛龍","毒怪鳥","毒怪鳥亜種","精靈鹿","鬥獣","跳緋獣","ココモア","桃毛獸","砦蟹","將軍蟹","多殻蟹","大名蟹","大雷光蟲","奇面","角龍","角龍亜種","雷轟龍","轟龍","熾凍龍","炎王龍","氷狐龍","毒猛龍王","砂龍王","痺猛龍王","野豬王","迅猛龍王","雪獅子王","冥雷龍","炎妃龍","雌·響狼","岩龍","桃毛獸王","喰血龍","吞龍","針纏龍","眠鳥","眠鳥繁殖期","眠鳥希少種","傾雷鳥","華鳳鳥","雪獅子","野豬","黑茶髦","電龍","電龍亜種","舞雷龍","凍海獣","波波","爆狼","黑龍","黑龍【紅龍】","黑龍【祖龍】","黑穿龍","梅拉露","菌豬","一角龍","一角龍亜種","盾蟹","浮岳龍","金獅子","大巌龍","老山龍","老山龍亜種","巨蜂","迅猛龍","黒狐龍","雌火龍","雌火龍亜種","雌火龍希少種","火龍","火龍亜種","火龍希少種","極龍","雷極龍"]);
tH.cells[6].appendChild(s.cloneNode(true));
var ckTtarget_F = function (e) {
	if (e === "ターゲット") {
		return function(){return true};
	} else {
		var reg = new RegExp(">"+e+"[０-９].+の|>"+e+"の");
		return function (cell) {return reg.test(">"+cell.innerHTML.replace("灰晶蠍奇種","灰晶蠍").replace("眠鳥奇種","眠鳥繁殖期").split("奇種").join("亜種").split("変種").join(""));};
	}
};
/*こっちは亜種も引っかかるので没
var ckTtarget = function (cell,s) {
		return s === "-" ? true : (cell.innerHTML.indexOf(s) === 0 || cell.innerHTML.indexOf(">"+s) >= 1);
	}
*/

//HR
s.title = "HRで絞り込み";
if (location.pathname.indexOf("_g") !== -1) {
	selectSet(s,["ＧＲ","1以上"]);
} else {
	selectSet(s,["ＨＲ","100以上","91以上","81以上","71以上","61以上","51以上","41以上","31以上","22以上","17以上","15以上","11以上","8以上","5以上","3以上","2","1"]);
}
tH.cells[7].appendChild(s.cloneNode(true));
var ckHr_F = function (e) {
	if (e === "ＨＲ" || e === "ＧＲ") {
		return function(){return true};
	} else {
		e = parseInt(e);
		return function (cell) {
			if (!cell.firstChild) return true;   //指定沒有

			var wk = cell.firstChild.nodeValue.replace("-","");

			if (wk.indexOf("以上") !== -1) {
				return parseInt(wk.substring(2))  <= e;
			} else if (wk.indexOf("以下") !== -1) {
				return parseInt(wk.substring(2))  >= e;
			} else {
				var hantei = wk.substring(2).split("～");
				return hantei[0] <= e && hantei[1] >= e;
			}
		}
	}
};

//季節
s.title = "季節で絞り込み";
selectSet(s,["季節","温暖期","寒冷期","繁殖期"]);
s.style.position = "relative",s.style.top = "0",s.style.right = "-150px";
tH.cells[1].appendChild(s.cloneNode(true));
var ckField_F = function (e1,e2) {
	if (e1 === "場所" && e2 === "季節") {
		return function(){return true};
	} else if (e1 !== "場所" && e2 !== "季節") {
		return function (cell) {return cell.firstChild.nodeValue.indexOf(e1) !== -1 && cell.childNodes[2].nodeValue === e2;};
	} else if (e1 !== "場所") {
		return function (cell) {return cell.firstChild.nodeValue.indexOf(e1) !== -1;};
	} else {
		return function (cell) {return cell.childNodes[2].nodeValue === e2;};
	}
};

//金額ソート
i.value = "金額",i.title = "金額順にソート";
tH.cells[4].appendChild(i.cloneNode(false));

//HRPソート
i.value = "點數",i.title = "點數順にソート";
tH.cells[5].appendChild(i.cloneNode(false));

tH=i=s=null;

//活動のみソートしてみる
if (location.pathname.indexOf("ev_") !== -1) {
	var marker = document.createElement("tbody"),
		tB = document.getElementsByTagName("tbody")[0],
		tr = tB.rows,
		N = tr.length,
		x = [],
		date = new Date(),
		dateTxt = (date.getFullYear() + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2));

	for (var i = 0,w = ""; i<N;) {
		w = tr[i].cells[1].lastChild.firstChild.nodeValue.split("～")[1];
		if (tr[i].className !== "h" && w < dateTxt) tr[i].className = "h";	//期間を過ぎたら非表示
		x[i] = [w + ("000" + i).slice(-3)],
		x[i].row = tr[i++];
	}
	//x.sort(function(a, b){return b < a});
	x.sort();
	for (var i = 0; i<N; marker.appendChild(x[i++].row));
	tB.parentNode.replaceChild( marker,tB );
}
//フィルター
var filter = function () {
	var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),
		tr = document.getElementsByTagName("tbody")[0].rows,
		N = tr.length;
	//状態
	if (document.getElementById("top")) {
		var sw = document.getElementById("top").getElementsByTagName("span");
		if (sw[0].style.color !== "") { //今週分のみ
			var ckLine = function (tr) {return tr.className === "" || tr.className === "e" || tr.className === "r";};
		} else if (sw[1].style.color !== "") { //全て
			var ckLine = function () {return true;};
		} else { //廃止除く
			var ckLine = function (tr) {return tr.className !== "h";};
		}
	} else {
		var ckLine = function () {return true;};
	}
	var ckField = ckField_F(s[1].value,s[0].value),ckTtarget = ckTtarget_F(s[2].value),ckHr = ckHr_F(s[3].value);
	for (var i = 0; i < N; i++ ) {
		tr[i].style.display = ckLine(tr[i]) && ckField(tr[i].cells[2]) && ckTtarget(tr[i].cells[6]) && ckHr(tr[i].cells[7]) ? "" : "none";
		/*@if (@_jscript_version <= 5.7)
		if (tr[i].style.display === "" && tr[i].cells[0].style.borderStyle === "none") {
			tr[i].cells[0].style.borderStyle = tr[i].cells[1].style.borderStyle = tr[i].cells[2].style.borderStyle = tr[i].cells[3].style.borderStyle = tr[i].cells[4].style.borderStyle = tr[i].cells[5].style.borderStyle = tr[i].cells[6].style.borderStyle = tr[i].cells[7].style.borderStyle = "ridge";
		} else if (tr[i].style.display !== "" && tr[i].cells[0].style.borderStyle !== "none") {
			tr[i].cells[0].style.borderStyle = tr[i].cells[1].style.borderStyle = tr[i].cells[2].style.borderStyle = tr[i].cells[3].style.borderStyle = tr[i].cells[4].style.borderStyle = tr[i].cells[5].style.borderStyle = tr[i].cells[6].style.borderStyle = tr[i].cells[7].style.borderStyle = "none";
		}
		/*@end@*/
	}
}

var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");
for (var i = 0,max = s.length; i < max; addEvent(s[i++],"change",filter));
s=null;
if (document.getElementById("top")){
	addEvent(document.getElementById("top"),"click",
	function (evt) {
		/*@if (@_jscript_version < 9)
		var t = evt.srcElement;
		@else@*/
		var t = evt.target;
		/*@end@*/
		if (t.tagName === "SPAN"){
			var sw = document.getElementById("top").getElementsByTagName("span");
			sw[0].style.color = sw[1].style.color = sw[2].style.color = "";
			t.style.color = "red";
			filter();
			if (sw[1].style.color !== "") { //全て表示の場合
				/*@if (@_jscript_version < 9)
				document.styleSheets[0].addRule( "table#list tr.h", "display: block;");
				document.styleSheets[0].addRule( "table#list tr.h", "display: table-row;");
				@else@*/
				document.styleSheets[0].insertRule( "table#list tr.h { display: table-row;} ",document.styleSheets[0].cssRules.length );
				/*@end@*/
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
			N = tr.length
			x = [];
		x.sum = function (cell){
				return parseInt(cell.firstChild.nodeValue) + parseInt(cell.childNodes[2].nodeValue) + parseInt(cell.childNodes[4].nodeValue);
			}
		switch (t.title) {
		case "金額順にソート":
			var col = 4;
			marker.id = "Z"+tB.id.charAt(0);
			break;
		case "?????順にソート":
			var col = 5;
			marker.id = "H"+tB.id.charAt(0);
			break;
/*		case "場所順にソート":
			var col = 2;
			break;
*/		}
		for (var i = 0; i < N; x[i] = [x.sum(tr[i].cells[col])], x[i].row=tr[i++]);
		x.sort(function(a, b){return b - a});
		for (var i = 0; i < N; marker.appendChild(x[i++].row));
		tB.parentNode.replaceChild( marker,tB );
	}
});

//アンロード退避
addEvent(window,"unload",function () {
var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),
	dispflg = "";
if (document.getElementById("top")) {
	var sw = document.getElementById("top").getElementsByTagName("span");
	if (sw[0].style.color !== "") { //今週分のみ
		dispflg = 0;
	} else if (sw[1].style.color !== "") { //全て
		dispflg = 1;
	} else { //廃止除く
		//dispflg = 2;
	}
}
document.cookie = "quest=" + [location.pathname,s[0].selectedIndex,s[1].selectedIndex,s[2].selectedIndex,s[3].selectedIndex,document.getElementsByTagName("tbody")[0].id,dispflg,document.documentElement.scrollTop].join("!");
});
//オンロード
var w = document.cookie;
if (w.indexOf("quest=" + location.pathname) !== -1) {
	w = w.split("quest=")[1].split("!");
	var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");
	if (w[1]+w[2]+w[3]+w[4] > 0) {
		s[0].selectedIndex = w[1];
		s[1].selectedIndex = w[2];
		s[2].selectedIndex = w[3];
		s[3].selectedIndex = w[4];
		filter();
	}
	//ソート
	if (w[5] !== "") {
		var i = document.getElementsByTagName("thead")[0].getElementsByTagName("input");
		if (w[5].length === 2) {
			/*@if (@_jscript_version < 9) 
			i[w[5].charAt(1) === "Z" ? 0 : 1].fireEvent( "onclick" );
			@else@*/
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			i[w[5].charAt(1) === "Z" ? 0 : 1].dispatchEvent(evt);
			/*@end@*/
		}
		/*@if (@_jscript_version < 9) 
		i[w[5].charAt(0) === "Z" ? 0 : 1].fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		i[w[5].charAt(0) === "Z" ? 0 : 1].dispatchEvent(evt);
		/*@end@*/
	}
	//今週分のみなど
	if (w[6] !== "") {
		/*@if (@_jscript_version < 9) 
		document.getElementById("top").getElementsByTagName("span")[+w[6]].fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		document.getElementById("top").getElementsByTagName("span")[+w[6]].dispatchEvent(evt);
		/*@end@*/
	}
//	window.scrollTo(0,parseInt(w[7]));
};
//廃止任務
if (location.pathname.indexOf("x") !== -1) { //全て表示の場合
	/*@if (@_jscript_version < 9)
	document.styleSheets[0].addRule( "table#list tr.h", "display: block;");
	document.styleSheets[0].addRule( "table#list tr.h", "display: table-row;");
	@else@*/
	document.styleSheets[0].insertRule( "table#list tr.h { display: table-row;} ",document.styleSheets[0].cssRules.length );
	/*@end@*/
}

})();
