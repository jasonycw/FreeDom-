/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
var SkillForm = (function (document){
//ヴァージョンチェック
if (document.getElementById("version").firstChild.nodeValue !== "20140429") alert("正常に動作しない可能性があります。リ領主するか、キャッシュを消してください。");
//固定
var CK_IE6 = typeof document.documentElement.style.maxHeight === "undefined";
var CK_IE9 = false;
/*@if (@_jscript_version == 10) //IE10
	CK_IE9 = true;
@elif (@_jscript_version == 9) //IE9
	CK_IE9 = true;
@elif (@_jscript_version == 5.8) //IE8
	CK_IE9 = false;
@else
	CK_IE9 = false;
@end
@*/

var CK_MAC = navigator.userAgent.toUpperCase().indexOf("MAC") !== -1;
var I_bNAME = 0,I_bSEX = 1,I_bTYPE = 2,I_bRARE = 3,I_bGR = 4,I_bF = 5,I_bW = 6,I_bT = 7,I_bD = 8,I_bI = 9,I_bSN1 = 10,I_bSP1 = 11,I_bSN2 = 12,I_bSP2 = 13,I_bSN3 = 14,I_bSP3 = 15,I_bSN4 = 16,I_bSP4 = 17,I_bSN5 = 18,I_bSP5 = 19,I_bUPGBACK = 20,I_bRECIPE1 = 21,I_bHR1 = 22,I_bLVUPPTN = 23,I_bLVMAX = 24,I_bZENY = 25,I_bDEF = 26,I_bSLOT1 = 27,I_bSLOT7 = 28,I_bZENYPTN = 29,I_bDEFPTN = 30,I_bSLOTPTN = 31,I_bUPGCNT = 32,I_bKIND = 33,I_bCLASS = 34,I_bDOC = 35,I_bIMG = 36;
var I_sID = 0,I_sLV = 1,I_sS1 = 2,I_sS2 = 3,I_sS3 = 4;
var BUINAME = ["head","body","arm","wst","leg","deco"];
var MAKENAME = {"":"",1:"",2:"獵團",3:"網咖",4:"課金",5:"特典","-":"",i:"活動",m:"獵人祭",g:"扭蛋",k:"套裝",t:"韋駄天",p:"產包"};
var CLASSTYPE = {"":" ",G:"剛種",T:"天嵐",H:"覇種",I:"G覇種",R:"烈種",Z:"Ｇ級",C:"ＨＣ",D:"狩護",E:"G狩護",P:"ＳＰ"};
var TYPENAME = ["共用","劍士","槍手"];
var SEXNAME = ["男女","男限定","女限定"];
var MST_Equip = {},MST_Item = {},MST_Series_List = [],MST_Deco_List = [],MST_Item = setItem();
setItem = null;
var MST_Skill_List = [
["攻撃系",[161/*剛撃*/,21/*攻撃*/,155/*一匹狼*/,169/*一閃*/,18/*達人*/,173/*痛撃*/,190/*劇物の心得*/,65/*底力*/,47/*特殊攻擊*/,81/*砲術師*/,50/*爆彈強化*/,111/*火屬性攻擊*/,112/*水屬性攻擊*/,113/*雷屬性攻擊*/,114/*冰屬性攻擊*/,115/*龍屬性攻擊*/,142/*屬性攻擊*/,91/*体術*/,170/*逆境*/,165/*怒*/,116/*断食*/,128/*蓄力縮短*/,179/*蓄力威力*/,141/*武器技術*/,154/*得意*/,184/*適應擊*/]],
["防御系",[164/*生命力*/,157/*反射*/,56/*防御*/,5/*防禦性能*/,4/*自動防禦*/]],
["体力·耐力系",[31/*体力*/,7/*回復速度*/,51/*飢餓*/,6/*回復*/,183/*吸血*/,186/*藥草學*/,67/*耐力*/,143/*氣力回復*/,71/*食事*/,16/*大食王*/]],
["劍士系",[45/*研磨師*/,15/*銳利度*/,194/*巧流*/,159/*刀匠*/,32/*匠*/,147/*劍術*/,118/*爆擊劍*/,120/*猛毒劍*/,121/*麻痺劍*/,122/*睡眠劍*/,123/*火炎劍*/,124/*水激劍*/,125/*雷神劍*/,126/*冰結劍*/,127/*龍王劍*/,129/*單手劍技*/,130/*雙劍技*/,131/*大劍技*/,132/*太刀技*/,133/*鎚技*/,134/*狩獵笛技*/,135/*槍技*/,136/*銃槍技*/,187/*穿龍棍技*/]],
["槍手系",[171/*射手*/,38/*通常彈強化*/,11/*貫通彈強化*/,23/*散彈強化*/,39/*通常彈追加*/,12/*貫通彈追加*/,24/*散彈追加*/,60/*榴彈追加*/,8/*擴散彈追加*/,68/*裝填數*/,28/*装填*/,52/*反動*/,160/*速射*/,62/*連射*/,34/*子彈調合*/,176/*扇射*/,69/*精密射擊*/,108/*毒瓶追加*/,109/*麻痺瓶追加*/,110/*睡眠瓶追加*/,172/*装着*/,180/*子彈節約術*/,137/*重銃技*/,138/*輕銃技*/,139/*弓技*/]],
["状態異常系",[46/*毒*/,57/*麻痺*/,25/*睡眠*/,148/*耐狀態異常*/,13/*氣絶*/,74/*脱臭*/,75/*耐雪*/,79/*声帯*/,146/*對防禦DOWN*/,149/*耐酔*/,151/*磁力耐性*/,150/*結晶耐性*/]],
["耐性系",[26/*全耐性ＵＰ*/,53/*火耐性*/,58/*水耐性*/,76/*冰耐性*/,10/*雷耐性*/,59/*龍耐性*/]],
["保護系",[156/*三界的守護*/,36/*聽覺保護*/,54/*風圧*/,77/*耐震*/,64/*迴避性能*/,178/*迴避距離*/,30/*耐暑*/,29/*耐寒*/,152/*警戒*/,49/*偷竊無效*/,73/*地形*/,9/*審判*/,95/*守勢*/,90/*遁逃*/,102/*根性*/,191/*絶対防御*/]],
["道具·調合系",[174/*調合師*/,78/*廣域*/,66/*效果持續*/,14/*反覆無常*/,92/*強肩*/,44/*投擲*/,175/*獵人*/,80/*採掘*/,40/*釣魚*/,37/*調合成功率*/,61/*鍊金術*/,162/*鼓舞*/,85/*吹笛名人*/,140/*高速設置*/,166/*鉄腕*/,144/*飛刀手*/]],
["MAP探知系",[35/*地圖*/,27/*千里眼*/,17/*氣配*/,188/*煽動*/]],
["採取運搬系",[3/*運搬*/,63/*高速收集*/,22/*採取*/,72/*剝取*/,192/*平常心*/]],
["報酬系",[2/*運氣*/,70/*魔物*/,104/*圧力*/]],
["その他系",[167/*育成*/,100/*絆*/,105/*捕獲高手*/,94/*靈光一現*/,153/*救援*/,145/*慰勞*/,181/*移動速度*/,182/*喝*/,195/*支援*/,163/*恩寵*/,158/*代償*/,185/*黑之命脈*/,189/*炎寵*/]]];
var MST_Skill = [
["沒有",	,,									],
["受身",	0,,									],
["運氣",	117,1,	,-20,161	,-10,160	,10,158	,20,159					],
["運搬",	103,,	,10,97								],
["自動防禦",	80,,	,10,44								],
["防禦性能",	79,1,	,-15,43	,-10,42	,10,40	,20,41					],
["回復",	120,,	,-10,166	,10,165							],
["回復速度",	74,1,	,-20,30	,-10,29	,10,27	,20,28					],
["擴散彈追加",	92,,	,10,68	,15,69	,20,70						],
["審判",	99,1,	,-20,91	,-10,90	,10,88	,20,89					],
["雷耐性",	108,1,	,-20,127	,-15,126	,-10,125	,10,122	,15,123	,20,124			],
["貫通彈強化",	86,,	,10,55								],
["貫通彈追加",	89,,	,10,59	,15,60	,20,61						],
["氣絶",	68,1,	,-10,9	,10,7	,20,8						],
["反覆無常",	116,1,	,-15,157	,-10,156	,10,154	,15,155					],
["銳利度",	75,1,	,-10,32	,10,31	,20,293						],
["大食王",	96,,	,10,77	,15,78							],
["氣配",	72,,	,-10,20	,10,19							],
["達人",	77,1,	,10,35	,15,36	,20,37	,35,284	,50,285				],
["廣域回復",	0,,									],
["廣域解毒",	0,,									],
["攻撃",	97,1,	,10,79	,15,80	,25,81	,50,286	,80,287				],
["採取",	114,1,	,-15,152	,-10,151	,10,149	,15,150					],
["散彈強化",	87,,	,10,56								],
["散彈追加",	90,,	,10,62	,15,63	,20,64						],
["睡眠",	67,1,	,-10,6	,10,4	,20,5						],
["全耐性ＵＰ",	104,,	,-20,103	,-15,102	,-10,101	,10,98	,15,99	,20,100			],
["千里眼",	119,1,	,10,163	,15,164							],
["装填",	82,1,	,-10,49	,10,46	,15,47	,20,48					],
["耐寒",	111,1,	,-20,143	,-10,142	,10,139	,15,140	,25,297				],
["耐暑",	110,1,	,-20,138	,-10,137	,10,134	,15,135	,25,296				],
["体力",	73,1,	,-20,26	,-15,25	,-10,24	,10,21	,15,22	,20,23	,30,291	,40,292	],
["匠",	76,,	,10,33								],
["種廣域化",	0,,									],
["子彈調合",	122,,	,10,172								],
["地圖",	113,,	,10,147								],
["聽覺保護",	100,1,	,10,92	,15,93	,25,288						],
["調合成功率",	121,1,	,-10,170	,10,167	,15,168	,20,169					],
["通常彈強化",	85,,	,10,54								],
["通常彈追加",	88,,	,10,57	,15,58							],
["釣魚",	118,,	,10,162								],
["------",	0,,									],
["------",	0,,									],
["------",	0,,									],
["投擲",	81,,	,10,45								],
["研磨師",	78,1,	,-10,39	,10,38	,20,398						],
["毒",	69,1,	,-10,12	,10,10	,20,11						],
["特殊攻擊",	93,,	,10,71								],
["肉",	0,,									],
["偷竊無效",	101,,	,10,94								],
["爆彈強化",	94,,	,10,72								],
["飢餓",	95,1,	,-15,76	,-10,75	,10,73	,15,74					],
["反動",	84,1,	,10,52	,15,53							],
["火耐性",	105,1,	,-20,109	,-15,108	,-10,107	,10,104	,15,105	,20,106			],
["風圧",	112,1,	,10,144	,15,145	,20,146	,30,349					],
["笛",	0,,									],
["防御",	98,1,	,-20,87	,-15,86	,-10,85	,10,82	,15,83	,25,84	,35,294	,45,295	],
["麻痺",	66,1,	,-10,3	,10,1	,20,2						],
["水耐性",	106,1,	,-20,115	,-15,114	,-10,113	,10,110	,15,111	,20,112			],
["龍耐性",	109,1,	,-20,133	,-15,132	,-10,131	,10,128	,15,129	,20,130			],
["榴彈追加",	91,,	,10,65	,15,66	,20,67						],
["鍊金術",	123,,	,10,173								],
["連射",	83,,	,10,51								],
["高速收集",	115,,	,10,153								],
["迴避性能",	124,1,	,10,177	,20,178							],
["底力",	125,,	,-15,181	,10,179	,15,180	,21,179	,30,181				],
["效果持續",	126,,	,-10,183	,10,182							],
["耐力",	127,1,	,-10,185	,10,184	,20,289						],
["裝填數",	128,,	,10,186								],
["精密射擊",	129,1,	,-10,188	,10,187	,20,290						],
["魔物",	130,,	,10,189								],
["食事",	131,,	,-10,191	,10,190							],
["剝取",	132,,	,15,192								],
["地形",	133,1,	,-15,196	,-10,195	,10,193	,15,194					],
["脱臭",	70,,	,10,13								],
["耐雪",	71,,	,10,16								],
["冰耐性",	107,1,	,-20,121	,-15,120	,-10,119	,10,116	,15,117	,20,118			],
["耐震",	134,1,	,15,197	,25,350							],
["廣域",	102,1,	,-10,385	,10,95	,20,96	,30,384					],
["声帯",	135,1,	,10,198	,15,199							],
["採掘",	136,1,	,-10,202	,10,200	,15,201						],
["砲術師",	137,1,	,10,203	,20,298	,35,299						],
["------",	0,,									],
["------",	0,,									],
["------",	0,,									],
["吹笛名人",	138,,	,10,212								],
["------",	0,,									],
["------",	0,,									],
["------",	0,,									],
["------",	0,,									],
["遁逃",	139,,	,10,218								],
["体術",	140,1,	,10,219	,20,359							],
["強肩",	141,1,	,10,220	,20,360							],
["------",	0,,									],
["靈光一現",	142,,	,10,222								],
["守勢",	143,,	,10,223								],
["------",	0,,									],
["------",	0,,									],
["------",	0,,									],
["------",	0,,									],
["絆",	145,,	,10,228								],
["------",	0,,									],
["根性",	59,1,	,10,230	,20,231	,30,232						],
["------",	0,,									],
["圧力",	144,1,	,10,234	,20,300							],
["捕獲高手",	146,1,	,10,235	,20,301							],
["------",	0,,									],
["------",	0,,									],
["毒瓶追加",	147,,	,10,238								],
["麻痺瓶追加",	148,,	,10,239								],
["睡眠瓶追加",	149,,	,10,240								],
["火屬性攻擊",	150,1,	,10,241	,20,242							],
["水屬性攻擊",	151,1,	,10,243	,20,244							],
["雷屬性攻擊",	152,1,	,10,245	,20,246							],
["冰屬性攻擊",	153,1,	,10,247	,20,248							],
["龍屬性攻擊",	154,1,	,10,249	,20,250							],
["断食",	155,,	,10,251	,20,252							],
["----",	0,,									],
["爆擊劍",	156,1,	,10,254	,15,255	,20,256						],
["強擊劍",	0,,	,10,257	,15,258	,20,259						],
["猛毒劍",	157,1,	,10,260	,15,261	,20,262						],
["麻痺劍",	158,1,	,10,263	,15,264	,20,265						],
["睡眠劍",	159,1,	,10,266	,15,267	,20,268						],
["火炎劍",	160,1,	,10,269	,15,270	,20,271						],
["水激劍",	161,1,	,10,272	,15,273	,20,274						],
["雷神劍",	162,1,	,10,278	,15,279	,20,280						],
["冰結劍",	163,1,	,10,275	,15,276	,20,277						],
["龍王劍",	164,1,	,10,281	,15,282	,20,283						],
["蓄力縮短",	165,1,	,-10,304	,10,303	,20,302						],
["單手劍技",	1,,	,-10,308	,10,307	,20,306	,30,305					],
["雙劍技",	2,,	,-10,312	,10,311	,20,310	,30,309					],
["大劍技",	3,,	,-10,316	,10,315	,20,314	,30,313					],
["太刀技",	4,,	,-10,320	,10,319	,20,318	,30,317					],
["鎚技",	5,,	,-10,324	,10,323	,20,322	,30,321					],
["狩獵笛技",	6,,	,-10,328	,10,327	,20,326	,30,325					],
["槍技",	7,,	,-10,332	,10,331	,20,330	,30,329					],
["銃槍技",	8,,	,-10,336	,10,335	,20,334	,30,333					],
["重銃技",	9,,	,-10,340	,10,339	,20,338	,30,337					],
["輕銃技",	11,,	,-10,344	,10,343	,20,342	,30,341					],
["弓技",	12,,	,-10,348	,10,347	,20,346	,30,345					],
["高速設置",	60,1,	,10,351	,20,352							],
["武器技術",	56,,	,10,353								],
["屬性攻擊",	57,,	,-10,355	,10,354							],
["氣力回復",	58,1,	,-10,358	,10,357	,20,356						],
["飛刀手",	63,1,	,10,361	,20,362							],
["慰勞",	64,,	,10,363	,25,364	,45,365						],
["對防禦DOWN",	65,,	,10,366								],
["劍術",	62,1,	,10,367	,20,368							],
["耐狀態異常",	61,1,	,-10,371	,10,369	,20,370						],
["耐酔",	37,,1	,-10,387	,10,386							],
["結晶耐性",	38,,1	,-10,389	,10,388							],
["磁力耐性",	39,,1	,-10,391	,10,390							],
["警戒",	29,,1	,10,392								],
["救援",	35,,1	,10,393								],
["得意",	27,,1	,15,394								],
["一匹狼",	28,,1	,10,395								],
["三界的守護",	21,,1	,10,399	,15,400	,20,401						],
["反射",	22,,1	,10,402	,15,403	,20,404						],
["代償",	19,,1	,10,396								],
["刀匠",	17,,1	,10,405	,15,406	,20,407						],
["速射",	20,,1	,15,397								],
["剛撃",	13,,1	,10,408	,15,409	,20,410	,30,411	,40,412				],
["鼓舞",	23,,1	,10,413	,20,414							],
["恩寵",	16,,1	,10,415	,20,416	,30,417						],
["生命力",	30,,1	,-10,421	,10,418	,15,419	,30,420					],
["怒",	31,,1	,15,422	,20,423							],
["鉄腕",	32,,1	,10,424	,20,425							],
["育成",	33,,1	,10,426								],
["相殺",	0,,									],
["一閃",	14,,1	,10,429	,20,430	,30,431						],
["逆境",	34,,1	,10,432	,20,433							],
["射手",	24,,1	,15,434								],
["装着",	25,,1	,10,435	,20,436	,30,437						],
["痛撃",	15,,1	,-10,440	,20,439							],
["調合師",	26,,1	,-10,444	,10,441	,15,442	,20,443					],
["獵人",	36,,	,10,445	,20,446							],
["扇射",	18,,1	,10,447	,15,448	,20,449						],
["連擊(刪除)",	0,,									],
["迴避距離",	40,,1	,20,457								],
["蓄力威力",	41,,1	,10,455	,20,456							],
["子彈節約術",	42,,1	,10,453	,20,454							],
["移動速度",	43,,1	,10,451	,20,452							],
["喝",	44,,1	,-10,459	,10,458							],
["吸血",	45,,1	,10,460	,20,461							],
["適應擊",	46,,	,10,462	,20,463							],
["黑之命脈",	47,,1	,20,464								],
["藥草學",	48,,1	,10,465								],
["穿龍棍技",	10,,	,-10,469	,10,468	,20,467	,30,466					],
["煽動",	49,,	,10,471								],
["炎寵",	50,,1	,10,472	,15,473							],
["劇物の心得",	51,,1	,10,474								],
["絶対防御",	53,,	,20,475								],
["平常心",	55,1,	,-10,478	,10,477	,15,476						],
["採集の極み",	0,,									],
["巧流",	52,,1	,15,480								],
["支援",	54,,	,10,481								]
];
MST_Skill[""] = [""];
MST_Skill["-"] = [""];
var MST_Skill_Exe = [
"無技能","麻痺減半","麻痺無效","麻痺加倍","睡眠減半","睡眠無效","睡眠加倍","暈眩機率減半","暈眩無效","暈眩加倍","中毒減半","中毒無效","中毒加倍","脱臭","脱臭","------","耐雪","耐雪","------","隠密","挑発","體力+10","體力+20","體力+30","體力-10","體力-20","體力-30","傷害回復速度+1","傷害回復速度+2","傷害回復速度-1","傷害回復速度-2","利刃+1","鈍化","銳利度等級+1","------","看破+1","看破+2","看破+3","砥石使用高速化","砥石性能減半","防禦性能+1","防禦性能+2","防禦性能-1","防禦性能-2","自動防禦","投擲技術UP","裝填速度+1","裝填速度+2","裝填速度+3","裝填速度-1","------","連射","反動減輕+1","反動減輕+2","通常彈?連射箭威力UP","貫通彈?貫通箭威力UP","散彈?擴散箭威力UP","通常彈ＬＶ１追加","通常彈全等級追加","貫通彈ＬＶ１追加","貫通彈ＬＶ１&2追加","貫通彈全等級追加","散彈ＬＶ１追加","散彈ＬＶ１&2追加","散彈全等級追加","徹甲榴彈ＬＶ１追加","徹甲榴彈ＬＶ１&2追加","徹甲榴彈全等級追加","擴散彈ＬＶ１追加","擴散彈ＬＶ１&2追加","擴散彈全等級追加","狀態異常攻擊強化","炸彈客","飢餓減半","飢餓無效","飢餓加倍【小】","飢餓加倍【大】","まんぷく","撿食","攻擊力UP【小】","攻擊力UP【中】","攻擊力UP【大】","防禦+20","防禦+30","防禦+60","防禦-20","防禦-30","防禦-40","女神的赦免","女神的擁抱","死神的制裁","死神的擁抱","耳栓","高級耳塞","偷竊無效","廣域化+1","廣域化+2","搬運達人","各耐性+5","各耐性+10","各耐性+20","各耐性-5","各耐性-10","各耐性-20","火耐性+10","火耐性+20","火耐性+30","火耐性-10","火耐性-20","火耐性-30","水耐性+10","水耐性+20","水耐性+30","水耐性-10","水耐性-20","水耐性-30","冰耐性+10","冰耐性+20","冰耐性+30","冰耐性-10","冰耐性-20","冰耐性-30","雷耐性+10","雷耐性+20","雷耐性+30","雷耐性-10","雷耐性-20","雷耐性-30","龍耐性+10","龍耐性+20","龍耐性+30","龍耐性-10","龍耐性-20","龍耐性-30","炎暑減半","炎暑無效","炎暑無效","炎暑加倍【小】","炎暑加倍【大】","寒冷減半","寒冷無效","寒冷無效","寒冷加倍【小】","寒冷加倍【大】","風壓【小】無效","風壓【大】無效","龍風壓無效","地圖常備","------","採集+1","採集+2","採集-1","採集-2","高速剝取＆採集","精靈的反覆無常","神的反覆無常","惡靈的反覆無常","惡魔的反覆無常","幸運","激運","不運","災難","釣魚名人","探知","自動記號","體力回復道具強化","體力回復道具弱化","調合成功率+10%","調合成功率+15%","調合成功率+30%","調合成功率-5%","調合成功率-15%","最大值子彈生產","鍊金術","------","------","------","迴避性能+1","迴避性能+2","火場怪力+1","火場怪力+2","憂心","道具使用強化","道具使用弱化","跑者","鈍足","裝填數UP","偏移量DOWN","偏移量UP","大魔物放馬來吧！","快吃","散漫生活","剝取名人","地形傷害減【小】","地形傷害減【大】","地形傷害增【小】","地形傷害增【大】","耐震+1","聲帶麻痺毒減半","聲帶麻痺毒無效","採掘名人","採掘大師","自稱?採掘名人","砲術師","------","------","------","------","------","------","------","------","吹笛名人","------","------","------","------","------","遁逃","体術","強力投手+1","------","靈光一現","守勢","------","------","------","------","絆","------","根性","堅毅力","超強毅力","------","壓力【小】","捕獲高手","------","------","毒瓶追加","麻痺瓶追加","睡眠瓶追加","火屬性攻擊強化【小】","火屬性攻擊強化【大】","水屬性攻擊強化【小】","水屬性攻擊強化【大】","雷屬性攻擊強化【小】","雷屬性攻擊強化【大】","冰屬性攻擊強化【小】","冰屬性攻擊強化【大】","龍屬性攻擊強化【小】","龍屬性攻擊強化【大】","餓狼+1","餓狼+2","--------","爆擊劍+1","爆擊劍+2","爆擊劍+3","強擊劍+1","強擊劍+2","強擊劍+3","猛毒劍+1","猛毒劍+2","猛毒劍+3","麻痺劍+1","麻痺劍+2","麻痺劍+3","睡眠劍+1","睡眠劍+2","睡眠劍+3","火炎劍+1","火炎劍+2","火炎劍+3","水激劍+1","水激劍+2","水激劍+3","冰結劍+1","冰結劍+2","冰結劍+3","雷神劍+1","雷神劍+2","雷神劍+3","龍王劍+1","龍王劍+2","龍王劍+3","看破+4","看破+5","攻擊力UP【特大】","攻擊力UP【絕大】","超高級耳塞","絶倫","狙擊","體力+40","體力+50","利刃+2","防禦+90","防禦+120","夏男夏女","冬將軍","砲術王","砲術神","壓力【大】","捕獲名人","集中+2","集中+1","雑念","單手劍技【劍聖】","單手劍技【皆傳】","單手劍技【達人】","單手劍技【未熟】","雙劍技【雙龍】","雙劍技【皆傳】","雙劍技【達人】","雙劍技【未熟】","大劍技【劍王】","大劍技【皆傳】","大劍技【達人】","大劍技【未熟】","太刀技【刀神】","太刀技【皆傳】","太刀技【達人】","太刀技【未熟】","大錘技【鈍器獸】","大錘技【皆傳】","大錘技【達人】","大錘技【未熟】","狩獵笛技【奏帝】","狩獵笛技【皆傳】","狩獵笛技【達人】","狩獵笛技【未熟】","槍技【天槍】","槍技【皆傳】","槍技【達人】","槍技【未熟】","銃槍技【砲皇】","銃槍技【皆傳】","銃槍技【達人】","銃槍技【未熟】","重銃技【銃仙】","重銃技【皆傳】","重銃技【達人】","重銃技【未熟】","輕銃技【銃傑】","輕銃技【皆傳】","輕銃技【達人】","輕銃技【未熟】","弓技【弓鬼】","弓技【皆傳】","弓技【達人】","弓技【未熟】","暴風壓無效","耐震+2","罠師","罠匠","武器技術","屬性攻擊強化","屬性攻擊弱化","耐力急速回復【大】","耐力急速回復【小】","耐力回復遲緩","格鬥王","強力投手+2","飛刀+1","飛刀+2","慰勞+1","慰勞+2","慰勞+3","厚皮","劍術+1","劍術+2","狀態異常減半","狀態異常無效","狀態異常加倍","單手劍技【大劍聖】","雙劍技【大雙龍】","大劍技【大劍王】","太刀技【大刀神】","錘技【大鈍器獸】","狩獵笛技【大奏帝】","槍技【大天槍】","銃槍技【大砲皇】","重銃技【大銃仙】","輕銃技【大銃傑】","弓技【大弓鬼】","守勢+1","廣域化+3","廣域化-1","酒豪","醉鬼","結晶耐性","結晶弱點","磁力耐性","磁力弱點","警戒","救援","得意","一匹狼","代償","速射","砥匠","豪放+1","豪放+2","豪放+3","反射+1","反射+2","反射+3","真打+1","真打+2","真打+3","剛擊+1","剛擊+2","剛擊+3","剛擊+4","剛擊+5","激勵+1","激勵+2","恩寵+1","恩寵+2","恩寵+3","生命力+1","生命力+2","生命力+3","生命力-1","逆鱗","怒氣衝天","鐵臂+1","鐵臂+2","育成","反擊+1","反擊+2","一閃+1","一閃+2","一閃+3","不屈","不屈不撓","剛弾","裝著+1","裝著+2","裝著+3","痛撃","弱點特效","不擅弱點","調合師+1","調合師+2","調合師+3","調合師-1","獵人生活","獵人享受","扇射+1","扇射+2","扇射+3","迴避性能+3","移動速度UP+1","移動速度UP+2","節約名人","節約達人","蓄力威力+1","蓄力威力+2","迴避距離UP","赤魂","青魂","吸血+1","吸血+2","適應擊+1","適應擊+2","最終的閃黑","藥仙人","穿龍棍技【穿凰】","穿龍棍技【皆伝】","穿龍棍技【達人】","穿龍棍技【未熟】","穿龍棍技【大穿凰】","煽動","紅焔の威光+1","紅焔の威光+2","劇物取扱皆伝","絶対防御態勢","盤石の構え","万全の備え","油断大敵","採集の極み","巧流","支援"
];

var setRep = function (w){
	var d = w.c_color.checked ? "d" : "";
	var t = "1-" + d;
		if (!w.c_repi.style.backgroundColor) t += "1i" + d;
		if (!w.c_rept.style.backgroundColor) t += "1t" + d;
	if (!w.c_rep2.style.backgroundColor) {
		t += "2-" + d;
		if (!w.c_repi.style.backgroundColor) t += "2i" + d;
		if (!w.c_rept.style.backgroundColor) t += "2t" + d;
	}
	if (!w.c_rep3.style.backgroundColor) {
		t += "3-" + d;
		if (!w.c_repi.style.backgroundColor) t += "3i" + d;
		if (!w.c_repg.style.backgroundColor) t += "3g" + d;
		if (!w.c_rept.style.backgroundColor) t += "3t" + d;
	}
	if (!w.c_repm.style.backgroundColor) t += "2m" + d;
	if (!w.c_repg.style.backgroundColor) t += "4g" + d;
	if (!w.c_repk.style.backgroundColor) t += "4k" + d;
	if (!w.c_rep5.style.backgroundColor) t += "5-" + d;
	if (!w.c_repp.style.backgroundColor) t += "5p" + d;
	return t;
};
var getSozai = function (eq){
	if (eq[I_bLVUPPTN]) {
		var list = MST_Equip.sozai[parseInt(eq[I_bLVUPPTN],16)].split(",");
		//生産の場合の素材を変更
		if (eq[I_bRECIPE1]) list[0] = eq[I_bRECIPE1];
		//HR調整
		list[7+0] = eq[I_bHR1];
		for (var i = 0;i < 6 && +list[7+i+1] < +list[7+i]; list[7+i+1] = list[7+i],i++); //1つ先が小さい場合入れ替え
		return list;
	} else { //装飾品
		return [eq[I_bRECIPE1],"","","","","","",eq[I_bHR1],"","","","","",""];
	}
};
var getZeny = function (eq){
	if (eq[I_bLVUPPTN]) {
		var zeny = +eq[I_bZENY],ptncd = eq[I_bZENYPTN],ptn = MST_Equip.zeny[parseInt(ptncd,16)].split(",");
		var list = [zeny];
		for (var i = 1;i < 7; i++) {
			if (zeny === 0 ||
				ptn[i] % 25 === 0 || 
				ptn[i] === "280" || ptn[i] === "180" || ptn[i] === "8" || ptn[i] === "115" || ptn[i] === "220" ||
				(ptncd === "04" && ptn[i] === "10" && (zeny === 10875 || zeny === 1125)) ||
				(ptncd === "05" && ptn[i] === "420" && (zeny === 1000 || zeny === 1100 || zeny === 1200 || zeny === 4100 || zeny === 8000 || zeny === 8800)) ||
				(ptncd === "08" && (ptn[i] === "5" || ptn[i] === "15") && (zeny === 17250 || zeny === 21250))) {
				list[i] = zeny * ptn[i] / 100|0;
			} else {
				list[i] = (zeny * ptn[i] / 100|0) - 1;
			}
		}
		//生産の場合の半額に
		if (eq[I_bRECIPE1] && eq[I_bRECIPE1].indexOf("店賣") === -1) list[0] = zeny / 2|0;
		return list;
	} else { //装飾品
		return [eq[I_bZENY],"","","","","",""];
	}
};
var getDef = function (eq){
	if (eq[I_bLVUPPTN]) {
		var def = +eq[I_bDEF],ptncd = eq[I_bDEFPTN],ptn = MST_Equip.def[parseInt(ptncd,16)].split(",");
		var list = [def];
		for (var i = 1;i < 7; i++) {
			if (ptn[i] === "100" ||
				ptncd === "05" && ptn[i] === "102" && def === 51 ||
				(ptn[i] * def) % 100 === 0 &&
				!(ptn[i] === "120" && (def === 25 || def === 45 || def === 50 || def === 90 || def === 100)) &&
				!(ptn[i] === "108" && (def === 25))) {
				def = def * ptn[i] / 100|0;
			} else {
				def = (def * ptn[i] / 100|0) + 1;
			}
			list[i] = def;
		}
		return list;
	} else { //装飾品
		return ["","","","","","",""];
	}
};
var getSlot = function (eq){
	if (eq[I_bLVUPPTN]) {
		var slot = +eq[I_bSLOT1],slotmax = +eq[I_bSLOT7],ptn = MST_Equip.slot[parseInt(eq[I_bSLOTPTN],16)].split(",");
		var list = [slot + +ptn[0],slot + +ptn[1],slot + +ptn[2],slot + +ptn[3],slot + +ptn[4],slot + +ptn[5],slot + +ptn[6]];
		for (var i = 0;i < 7; i++) {
			if (list[i] >= slotmax) list[i] = slotmax;
		}
		return list;
	} else { //装飾品
		return [+eq[I_bSLOT7],"","","","","",""];
	}
};

var global = {
//------------------------------------初期化----------
Init : function(){
//条件
this.c_sex = document.getElementById("c_sex");
this.c_type = document.getElementById("c_type");
this.c_rui = document.getElementById("c_rui");
this.c_series = document.getElementById("c_series");
this.c_skill1 = document.getElementById("c_skill1");
this.c_skill2 = document.getElementById("c_skill2");
this.c_skill3 = document.getElementById("c_skill3");
this.c_andor = document.getElementById("c_andor");
this.c_rare = document.getElementById("c_rare");
this.c_rep2 = document.getElementById("c_rep2");
this.c_rep3 = document.getElementById("c_rep3");
this.c_rep5 = document.getElementById("c_rep5");
this.c_rept = document.getElementById("c_rept");
this.c_repi = document.getElementById("c_repi");
this.c_repg = document.getElementById("c_repg");
this.c_repk = document.getElementById("c_repk");
this.c_repp = document.getElementById("c_repp");
this.c_repm = document.getElementById("c_repm");

this.c_slot = document.getElementById("c_slot");
this.c_minus = document.getElementById("c_minus");
this.c_color = document.getElementById("c_color");
this.c_upg = document.getElementById("c_upg");
this.c_hr = document.getElementById("c_hr");
this.c_cuff_lm = document.getElementById("c_cuff_lm");

this.c_series_data = this.c_skill1_data = this.c_skill2_data = this.c_skill3_data = "";

//防具
this.b_cuff = document.getElementById("b_cuff");
this.b_buki = document.getElementById("b_buki");
this.b_head = document.getElementById("b_head");
this.b_body = document.getElementById("b_body");
this.b_arm = document.getElementById("b_arm");
this.b_wst = document.getElementById("b_wst");
this.b_leg = document.getElementById("b_leg");
this.b_headLv = document.getElementById("b_headLv");
this.b_bodyLv = document.getElementById("b_bodyLv");
this.b_armLv = document.getElementById("b_armLv");
this.b_wstLv = document.getElementById("b_wstLv");
this.b_legLv = document.getElementById("b_legLv");
for (var i = 1; i < 4; i++){
	this["b_cuffS"+i] = document.getElementById("b_cuffS"+i);
	this["b_bukiS"+i] = document.getElementById("b_bukiS"+i);
	this["b_headS"+i] = document.getElementById("b_headS"+i);
	this["b_bodyS"+i] = document.getElementById("b_bodyS"+i);
	this["b_armS"+i] = document.getElementById("b_armS"+i);
	this["b_wstS"+i] = document.getElementById("b_wstS"+i);
	this["b_legS"+i] = document.getElementById("b_legS"+i);
	this["b_cuffS"+i+"_data"] = this["b_bukiS"+i+"_data"] = this["b_headS"+i+"_data"] = this["b_bodyS"+i+"_data"] = this["b_armS"+i+"_data"] = this["b_wstS"+i+"_data"] = this["b_legS"+i+"_data"] = "O";
}
this.b_cuffS3.value = "-"
this.b_cuffS3_data = ""
this.b_head.selectedIndex = this.b_body.selectedIndex = this.b_arm.selectedIndex = this.b_wst.selectedIndex = this.b_leg.selectedIndex = this.b_headLv.selectedIndex = this.b_bodyLv.selectedIndex = this.b_armLv.selectedIndex = this.b_wstLv.selectedIndex = this.b_legLv.selectedIndex = 0;
for (var i = 1; i < 6; i++){
	this["b_headSn"+i] = document.getElementById("b_headSn"+i);
	this["b_bodySn"+i] = document.getElementById("b_bodySn"+i);
	this["b_armSn"+i] = document.getElementById("b_armSn"+i);
	this["b_wstSn"+i] = document.getElementById("b_wstSn"+i);
	this["b_legSn"+i] = document.getElementById("b_legSn"+i);
	this["b_headSp"+i] = document.getElementById("b_headSp"+i);
	this["b_bodySp"+i] = document.getElementById("b_bodySp"+i);
	this["b_armSp"+i] = document.getElementById("b_armSp"+i);
	this["b_wstSp"+i] = document.getElementById("b_wstSp"+i);
	this["b_legSp"+i] = document.getElementById("b_legSp"+i);
}
this.b_headDef = document.getElementById("b_headDef");
this.b_bodyDef = document.getElementById("b_bodyDef");
this.b_armDef  = document.getElementById("b_armDef");
this.b_wstDef  = document.getElementById("b_wstDef");
this.b_legDef  = document.getElementById("b_legDef");
this.b_headGR = 1;
this.b_bodyGR = 1;
this.b_armGR  = 1;
this.b_wstGR  = 1;
this.b_legGR  = 1;
this.b_Def_Sum   = document.getElementById("b_Def_Sum");
this.b_headFp = document.getElementById("b_headFp");
this.b_bodyFp = document.getElementById("b_bodyFp");
this.b_armFp  = document.getElementById("b_armFp");
this.b_wstFp  = document.getElementById("b_wstFp");
this.b_legFp  = document.getElementById("b_legFp");
this.b_Fp_Sum   = document.getElementById("b_Fp_Sum");
this.b_headWp = document.getElementById("b_headWp");
this.b_bodyWp = document.getElementById("b_bodyWp");
this.b_armWp  = document.getElementById("b_armWp");
this.b_wstWp  = document.getElementById("b_wstWp");
this.b_legWp  = document.getElementById("b_legWp");
this.b_Wp_Sum   = document.getElementById("b_Wp_Sum");
this.b_headTp = document.getElementById("b_headTp");
this.b_bodyTp = document.getElementById("b_bodyTp");
this.b_armTp  = document.getElementById("b_armTp");
this.b_wstTp  = document.getElementById("b_wstTp");
this.b_legTp  = document.getElementById("b_legTp");
this.b_Tp_Sum   = document.getElementById("b_Tp_Sum");
this.b_headIp = document.getElementById("b_headIp");
this.b_bodyIp = document.getElementById("b_bodyIp");
this.b_armIp  = document.getElementById("b_armIp");
this.b_wstIp  = document.getElementById("b_wstIp");
this.b_legIp  = document.getElementById("b_legIp");
this.b_Ip_Sum   = document.getElementById("b_Ip_Sum");
this.b_headDp = document.getElementById("b_headDp");
this.b_bodyDp = document.getElementById("b_bodyDp");
this.b_armDp  = document.getElementById("b_armDp");
this.b_wstDp  = document.getElementById("b_wstDp");
this.b_legDp  = document.getElementById("b_legDp");
this.b_Dp_Sum   = document.getElementById("b_Dp_Sum");
this.b_skillP = document.getElementById("b_skillP");
this.b_skillT = document.getElementById("b_skillT");
this.b_skill = document.getElementById("b_skill");
this.b_effectT = document.getElementById("b_effectT");

this.d_mei = document.getElementById("d_mei");
this.d_doc = document.getElementById("d_doc");
this.d_Fp = document.getElementById("d_Fp");
this.d_Wp = document.getElementById("d_Wp");
this.d_Tp = document.getElementById("d_Tp");
this.d_Ip = document.getElementById("d_Ip");
this.d_Dp = document.getElementById("d_Dp");
this.d_type = document.getElementById("d_type");
this.d_sex = document.getElementById("d_sex");
this.d_rep1 = document.getElementById("d_rep1");
this.d_rep2 = document.getElementById("d_rep2");
this.d_rui = document.getElementById("d_rui");
for (var i = 1; i < 6; i++){
	this["d_sn"+i] = document.getElementById("d_sn"+i);
	this["d_sp"+i] = document.getElementById("d_sp"+i);
}
this.d_MF = document.getElementById("d_MF");
this.d_MB = document.getElementById("d_MB");
this.d_FF = document.getElementById("d_FF");
this.d_FB = document.getElementById("d_FB");
this.d_lv = [];
this.d_def = [];
this.d_zeny = [];
this.d_sozai = [];
for (var i = 1; i < 8; i++) {
	this.d_lv[i] = document.getElementById("d_lv"+i);
	this.d_def[i] = document.getElementById("d_def"+i);
	this.d_zeny[i] = document.getElementById("d_zeny"+i);
	this.d_sozai[i] = document.getElementById("d_sozai"+i);
}
this.d_zenyAll = document.getElementById("d_zenyA");
this.d_sozaiAll = document.getElementById("d_sozaiA");
//搜索結果
this.s_headCK = document.getElementById("s_headCK");
this.s_headZK = document.getElementById("s_headZK");
this.s_headYA = document.getElementById("s_headYA");
this.s_head = document.getElementById("s_head");
this.s_bodyCK = document.getElementById("s_bodyCK");
this.s_bodyZK = document.getElementById("s_bodyZK");
this.s_bodyYA = document.getElementById("s_bodyYA");
this.s_body = document.getElementById("s_body");
this.s_armCK = document.getElementById("s_armCK");
this.s_armZK = document.getElementById("s_armZK");
this.s_armYA = document.getElementById("s_armYA");
this.s_arm = document.getElementById("s_arm");
this.s_wstCK = document.getElementById("s_wstCK");
this.s_wstZK = document.getElementById("s_wstZK");
this.s_wstYA = document.getElementById("s_wstYA");
this.s_wst = document.getElementById("s_wst");
this.s_legCK = document.getElementById("s_legCK");
this.s_legZK = document.getElementById("s_legZK");
this.s_legYA = document.getElementById("s_legYA");
this.s_leg = document.getElementById("s_leg");
this.s_decoCK = document.getElementById("s_decoCK");
this.s_decoZK = document.getElementById("s_decoZK");
this.s_decoYA = document.getElementById("s_decoYA");
this.s_deco = document.getElementById("s_deco");
//this.s_cuffCK = document.getElementById("s_cuffCK");
//this.s_cuffZK = document.getElementById("s_cuffZK");
this.s_cuffYA = document.getElementById("s_cuffYA");
this.s_cuff = document.getElementById("s_cuff");
//子画面
this.sub_Win_Style = document.getElementById("sub_Win").style;
this.sub_Win_id = "";
this.sub_Win_scroll = ["",0];
this.sub_WinBody = document.getElementById("sub_WinBody");

//ボタン
this.sub_WinClear_B_Style = document.getElementById("sub_WinClear_B").style;

//防御シミュ
this.b_gousyuB = document.getElementById("b_gousyuB");
this.def_Box = document.getElementById("def_Box");
this.c_gohu = document.getElementById("c_gohu");
this.c_tume = document.getElementById("c_tume");
this.c_soko = document.getElementById("c_soko");
this.c_mesi = document.getElementById("c_mesi");
this.c_sr = document.getElementById("c_sr");
this.c_tane = document.getElementById("c_tane");
this.c_drink = document.getElementById("c_drink");
this.c_fueDEF = document.getElementById("c_fueDEF");
this.c_fueDEFup = document.getElementById("c_fueDEFup");
this.c_fueTAI = document.getElementById("c_fueTAI");
this.c_buki = document.getElementById("c_buki");
this.c_G_Que = document.getElementById("c_G_Que");
this.c_G_Fit = document.getElementById("c_G_Fit");
this.c_kizuna = document.getElementById("c_kizuna");
this.c_katsu = document.getElementById("c_katsu");
this.c_soko.value = 60; //底力初期値
this.b_headDef.value = 0;
this.b_bodyDef.value = 0;
this.b_armDef.value = 0;
this.b_wstDef.value = 0;
this.b_legDef.value = 0;
this.b_Def_Sum.value = 1;
this.b_Fp_Sum.value = 0;
this.b_Wp_Sum.value = 0;
this.b_Tp_Sum.value = 0;
this.b_Ip_Sum.value = 0;
this.b_Dp_Sum.value = 0;
}
//------------------------------------データセット----------
,setSeriesList : function (data){
MST_Series_List = data;
}
,setDecoList : function (data){
MST_Deco_List = data;
}
,setEquip : function (name,data){
MST_Equip[name] = data;
}
,setEquipSplit : function (){
for (var i = 0; i < 6; i++) {
	var eqlist = MST_Equip[BUINAME[i]];
	for (var eqid in eqlist) eqlist[eqid] = eqlist[eqid].split(",");
}
}
//------------------------------------技能列表表示----------
,dispSkillList : function (buttonid){
this.c_series.value = "-",this.sub_WinBody./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = this.c_series_data = "",this.c_andor.disabled = this.c_slot.disabled = this.c_minus.disabled = this.c_upg.disabled = false;

var df = document.createDocumentFragment(),dt = document.createElement("dt"),dd = document.createElement("dd"),input = document.createElement("input");
input.type = "button",input.style.marginRight = "1px", input.style.padding = "0 1px 0 1px";
if (CK_IE9) input.style.margin = "1px", input.style.padding = "2px";

for (var i = 0,m = MST_Skill_List.length; i < m; i++) {
	df.appendChild(dt.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(MST_Skill_List[i][0]));
	df.appendChild(dd.cloneNode(false));
	for (var j = 0,dfL = df.lastChild,list = MST_Skill_List[i][1],n = list.length; j < n; j++) {
		input.value = MST_Skill[list[j]][0];
		input.name = "miniW" + list[j];
		input.style.color = MST_Skill[list[j]][3] ? "#0040FF" : "";
		dfL.appendChild(input.cloneNode(false));
	}
}
this.sub_WinBody.appendChild(df);
this.sub_WinClear_B_Style.visibility = "visible";
this.sub_Win_id = buttonid;
if (CK_IE6) this.c_rare.style.visibility = this.c_slot.style.visibility = this.c_hr.style.visibility = this.s_head.style.visibility = this.s_body.style.visibility = this.s_arm.style.visibility = this.s_wst.style.visibility = this.s_leg.style.visibility = this.c_cuff_lm.style.visibility = this.c_mesi.style.visibility = this.c_sr.style.visibility = this.c_tane.style.visibility = this.c_drink.style.visibility = this.c_fueDEF.style.visibility = this.c_fueTAI.style.visibility = "hidden";

this.sub_Win_Style.top = "30px",this.sub_Win_Style.left = (20 + +buttonid.charAt(7)) + "em",this.sub_Win_Style.display = "block";
//this.sub_Win_Style.right = (18-buttonid.charAt(7)) + "%";
//スクロール位置再現
this.sub_WinBody.scrollTop = this.sub_Win_scroll[0] === this.sub_Win_id ? this.sub_Win_scroll[1] : 0;
}
//------------------------------------系列列表表示----------
,dispSeriesList : function (buttonid){
this.c_skill1.value = this.c_skill2.value = this.c_skill3.value = "-",this.sub_WinBody./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = this.c_skill1_data = this.c_skill2_data = this.c_skill3_data = "",this.c_andor.disabled = this.c_slot.disabled = this.c_minus.disabled = this.c_upg.disabled = true;

var df = document.createDocumentFragment(),dt = document.createElement("dt"),dd = document.createElement("dd"),dtG = dt.cloneNode(false),ddG = dd.cloneNode(false),input = document.createElement("input");
dt.style.fontWeight = "bold",dtG.style.marginLeft = "1em",ddG.style.marginLeft = "2em";
input.type = "button",input.style.marginRight = "1px", input.style.padding = "0 1px 0 1px";
if (CK_IE9) input.style.margin = "1px", input.style.padding = "2px";

for (var i = 0,m = MST_Series_List.length; i < m; i++) {
	df.appendChild(dt.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(MST_Series_List[i][0]));
	df.appendChild(dd.cloneNode(false));
	for (var j = 1,n = MST_Series_List[i].length; j < n; j++) {
		input.name = "miniW" + i + j;
		if (typeof MST_Series_List[i][j][1] === "object") { //ヘッダー有り
			df.appendChild(dtG.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(MST_Series_List[i][j][0]));
			df.appendChild(ddG.cloneNode(false));
			var list = MST_Series_List[i][j][1];
		} else {
			var list = MST_Series_List[i][j];
		}
		for (var k = 0,dfL = df.lastChild,l = list.length; k < l; k++) {
			input.value = list[k];
			dfL.appendChild(input.cloneNode(false));
		}
	}
}
this.sub_WinBody.appendChild(df);
this.sub_WinClear_B_Style.visibility = "hidden";
this.sub_Win_id = buttonid;
if (CK_IE6) this.c_rare.style.visibility = this.c_slot.style.visibility = this.c_hr.style.visibility = this.s_head.style.visibility = this.s_body.style.visibility = this.s_arm.style.visibility = this.s_wst.style.visibility = this.s_leg.style.visibility = this.c_cuff_lm.style.visibility = this.c_mesi.style.visibility = this.c_sr.style.visibility = this.c_tane.style.visibility = this.c_drink.style.visibility = this.c_fueDEF.style.visibility = this.c_fueTAI.style.visibility = "hidden";

this.sub_Win_Style.top = "30px",this.sub_Win_Style.left = "13em",this.sub_Win_Style.display = "block";
//this.sub_Win_Style.left = "auto";
//スクロール位置再現
this.sub_WinBody.scrollTop = this.sub_Win_scroll[0] === this.sub_Win_id ? this.sub_Win_scroll[1] : 0;

}
//------------------------------------インプット----------
,dispInput : function (){
this.sub_Win_Style.display = "none";
this.c_skill1.value = this.c_skill2.value = this.c_skill3.value = "-"
var i = prompt("防具名を入力してください。先頭一致で搜索します。","");
if (i) {
	this.c_series.value = i;
	this.c_series_data = "9";
	this.search();
}
}
//------------------------------------装飾品列表表示----------
,dispDecoList : function (buttonid){
if (this[buttonid].value === "●" || this[buttonid].value === "-") return false;
this.sub_WinBody./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = "";

var slot_no = buttonid.charAt(buttonid.length-1),slot_name = buttonid.substring(0,buttonid.length-2);
//ck_type=0:共用 1:劍士 2:ガンナ 3:カフ,lm_slot=最大洞数,ck_sp=SP防具,ck_cuff=カフ
var ck_type = "",lm_slot = 0,lm_cuff = 0,ck_sp = false,ck_cuff = false,ck_minus = this.c_minus.checked,high_hr = +this.c_hr.value,ck_rep = setRep(this);
switch (slot_name) {
case "b_buki":
	ck_type = "0";
	lm_slot = 4 - slot_no;
	break;
case "b_cuff":
	ck_type = "3";
	lm_slot = 3 - slot_no;
	ck_cuff = true
	lm_cuff = +this.c_cuff_lm.value;
	break;
default:
	var eq = MST_Equip[slot_name.substring(2)][this[slot_name].value.split(",")[0]];
	ck_type = eq[I_bTYPE];
	var slot_data = getSlot(eq);
	lm_slot = slot_data[this[slot_name+"Lv"].value-1] - slot_no + 1;
	ck_sp = eq[I_bNAME].lastIndexOf("SP") !== -1;
}

var df = document.createDocumentFragment(),dt = document.createElement("dt"),dd = document.createElement("dd"),input = document.createElement("input");
input.type = "button",input.style.marginRight = "1px", input.style.padding = "0 1px 0 1px";
if (CK_IE9) input.style.margin = "1px", input.style.padding = "2px";

for (var i = 0,m = MST_Deco_List.length; i < m; i++) {
	if (MST_Deco_List[i][0] === "希望系") {
		if (ck_cuff) {
			break;
		} else {
			df.appendChild(document.createElement("hr")),df.appendChild(document.createTextNode("ＧＲ")),df.appendChild(document.createElement("hr"));
		}
	}
	df.appendChild(dt.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(MST_Deco_List[i][0]));
	df.appendChild(dd.cloneNode(false));
	for (var j = 0,dfL = df.lastChild,list = MST_Deco_List[i][1],n = list.length; j < n; j++) {
		var eq = MST_Equip.deco[list[j]];
		if ((ck_type === "0" || eq[I_bTYPE] === "0" || eq[I_bTYPE] === ck_type) &&
			eq[I_bSLOT7] <= lm_slot && +eq[I_bHR1] <= high_hr &&
			ck_rep.indexOf(eq[I_bKIND]) !== -1) {

			var eqname = eq[I_bNAME];
			if (eqname.lastIndexOf("珠ＳＰ") !== -1) { //SP珠か
				if (!ck_sp) continue;
				eqname = eqname.replace("珠ＳＰ","SP");
				input.style.color = "crimson";
			} else if (eqname.lastIndexOf("カフ") !== -1) { //カフか
				if (!ck_cuff) continue;
				if (ck_minus) {
					if (!(eq[I_bSP1] >= lm_cuff || eq[I_bSP1] <= lm_cuff * -1 ||
						eq[I_bSP2] >= lm_cuff || eq[I_bSP2] <= lm_cuff * -1 ||
						eq[I_bSP3] >= lm_cuff || eq[I_bSP3] <= lm_cuff * -1 ||
						eq[I_bSP4] >= lm_cuff || eq[I_bSP4] <= lm_cuff * -1 ||
						eq[I_bSP5] >= lm_cuff || eq[I_bSP5] <= lm_cuff * -1)) continue;
				} else {
					if (!(eq[I_bSP1] >= lm_cuff ||
						eq[I_bSP2] >= lm_cuff ||
						eq[I_bSP3] >= lm_cuff ||
						eq[I_bSP4] >= lm_cuff ||
						eq[I_bSP5] >= lm_cuff)) continue;
				}
//				input.style.backgroundColor = eqname.lastIndexOf("Ｐ") !== -1 ? "#E0E0E0" : ""
				input.style.color = eqname.lastIndexOf("Ａ") !== -1 ? "#0040FF" : eqname.lastIndexOf("Ｂ") !== -1 ? "blue" : ""
				eqname = eqname.substring(0,eqname.length-3).replace("カフ","") + String.fromCharCode(eqname.charCodeAt(eqname.length-3) - 65248) + String.fromCharCode(eqname.charCodeAt(eqname.length-2) - 65248) + String.fromCharCode(eqname.charCodeAt(eqname.length-1) - 65248);
			} else {
				if (ck_cuff) continue;
				if (eqname.lastIndexOf("珠Ｇ") !== -1) {
					eqname = eqname.replace("珠ＧＸ","GX").replace("珠ＧＦ","GF").replace("珠Ｇ","G");
					input.style.color = "blue";
				} else {
					input.style.color = "";
				}
			}

			input.value = eqname;
			input.name = "miniW" + list[j];
			dfL.appendChild(input.cloneNode(false));
		}
	}
}
this.sub_WinBody.appendChild(df);
this.sub_WinClear_B_Style.visibility = "visible";
this.sub_Win_id = buttonid;

switch (slot_name) {
case "b_cuff":
case "b_buki":
	this.sub_Win_Style.top = "125px";
	break;
case "b_head":
	this.sub_Win_Style.top = "145px";
	break;
case "b_body":
	this.sub_Win_Style.top = "165px";
	break;
case "b_arm":
	this.sub_Win_Style.top = "185px";
	break;
case "b_wst":
	this.sub_Win_Style.top = "205px";
	break;
case "b_leg":
	this.sub_Win_Style.top = "225px";
	break;
}
this.sub_Win_Style.right = "auto",this.sub_Win_Style.left = (13 + (slot_no-1)*3 + (slot_name !== "b_cuff" ? 0 : 5)) + "em",this.sub_Win_Style.display = "block";
//スクロール位置再現
this.sub_WinBody.scrollTop = this.sub_Win_scroll[0] === this.sub_Win_id ? this.sub_Win_scroll[1] : 0;
}
//------------------------------------メインにセット----------
,setInput : function (eqid,eqname){
this[this.sub_Win_id].value = eqname;
this[this.sub_Win_id+"_data"] = eqid;

if (this.sub_Win_id === "c_series") {
	this.c_series_data = eqid;
	this.search();
} else if (this.sub_Win_id.lastIndexOf("S1") !== -1 || this.sub_Win_id.lastIndexOf("S2") !== -1 || this.sub_Win_id.lastIndexOf("S3") !== -1) {
	this.dispData(eqid,"deco",1);
	this.cngSlot(eqid,this.sub_Win_id);
	this.calc();
}

}
//------------------------------------子画面クリア----------
,clearSubWin : function (){
if (this.sub_Win_id.lastIndexOf("S1") !== -1 || this.sub_Win_id.lastIndexOf("S2") !== -1 || this.sub_Win_id.lastIndexOf("S3") !== -1) {
	this.cngSlot("O",this.sub_Win_id);
	this.calc();
} else {
	this[this.sub_Win_id].value = "-";
	this[this.sub_Win_id+"_data"] = "";
}
}
//------------------------------------子画面クローズ----------
,closeSubWin : function (){
if (this.sub_Win_Style.display === "none") return;
//スクロール位置保存
this.sub_Win_scroll = [this.sub_Win_id,this.sub_WinBody.scrollTop];
this.sub_Win_Style.display = "none";
if (CK_IE6) this.c_rare.style.visibility = this.c_slot.style.visibility = this.c_hr.style.visibility = this.s_head.style.visibility = this.s_body.style.visibility = this.s_arm.style.visibility = this.s_wst.style.visibility = this.s_leg.style.visibility = this.c_cuff_lm.style.visibility = this.c_mesi.style.visibility = this.c_sr.style.visibility = this.c_tane.style.visibility = this.c_drink.style.visibility = this.c_fueDEF.style.visibility = this.c_fueTAI.style.visibility = "visible";
}
//------------------------------------防具搜索----------
,search : function (){
// 設定
var ck_disp = [,,,,,];
if (this.s_headCK.checked) this.s_head.length = 0,ck_disp[0] = true;
if (this.s_bodyCK.checked) this.s_body.length = 0,ck_disp[1] = true;
if (this.s_armCK.checked)  this.s_arm.length = 0,ck_disp[2] = true;
if (this.s_wstCK.checked)  this.s_wst.length = 0,ck_disp[3] = true;
if (this.s_legCK.checked)  this.s_leg.length = 0,ck_disp[4] = true;
if (this.s_decoCK.checked) this.s_deco.length = 0,this.s_cuff.length = 0,ck_disp[5] = true;

// 条件取得
var ck_s1 = this.c_skill1_data+"",ck_s2 = this.c_skill2_data+"",ck_s3 = this.c_skill3_data+"",ck_sex = this.c_sex.value,ck_type = this.c_type.value,
	ck_rui = this.c_rui.value,lm_slot = this.c_slot.value,ck_rep = setRep(this),lm_rare = +this.c_rare.value,low_hr = 0,high_hr = +this.c_hr.value,ck_gr = lm_rare === 99 ? "9" : "",
	ck_series = this.setSeries(this.c_series_data,this.c_series.value),
	s_list = [ck_s1,ck_s2,ck_s3],ck_minus = this.c_minus.checked ? -100 : 0,
	ck_andor = this.c_andor.value === "or" || (ck_s1 === "" && ck_s2 === "" && ck_s3 === "") ? 1 : 3 - (ck_s1 === "") - (ck_s2 === "") - (ck_s3 === ""),
	t_ck = MST_Skill[ck_s1][0]+"."+MST_Skill[ck_s2][0]+"."+MST_Skill[ck_s3][0];
var list = [],upgList = [],df = document.createDocumentFragment(),dfC = document.createDocumentFragment(),o = document.createElement("option");
if (ck_series) { //系列別
	if (ck_series.low_hr) low_hr = ck_series.low_hr; //下限
	if (ck_series.high_hr && high_hr > 2001) high_hr = ck_series.high_hr; //上限

	var f_series = function(){return true},t = "";
	for (var i = 0,m = ck_series.F1.length,_f1 = []; i < m; i++) { //前方一致
		_f1[i] = "t.indexOf(\"" + ck_series.F1[i] + "\") === 0"
	}
	for (var i = 0,m = ck_series.F2.length,_f2 = []; i < m; i++) { //前方一致 AND 一部一致
		_f2[i] = "t.indexOf(\"" + ck_series.F2[i] + "\") !== -1"
	}
	for (var i = 0,m = ck_series.R.length,_r = []; i < m; i++) { //不一致
		_r[i] = "t.indexOf(\"" + ck_series.R[i] + "\") === -1"
	}
	if (ck_series.F1.length > 0) {
		if (ck_series.F2.length > 0) {
			t = "((" + _f1.join(" || ") + ") && (" + _f2.join(" || ") + "))";
		} else {
			t = "(" + _f1.join(" || ") + ")";
		}
	}
	if (ck_series.S) t += (t ? " || (" : "(") + "t.indexOf(\"" + ck_series.S + "\") !== -1)";
	if (ck_series.R.length > 0) {
		if (t) {
			 t = "(" + t + " && ("  + _r.join(" && ") + "))";
		} else {
			 t = "(" + t + _r.join(" && ") + ")";
		}
	}
	if (t) eval("f_series = function(t){return " + t + ";}");
}
for (var i = 0; i < 6; i++) {
	if (!ck_disp[i]) continue;
	
	list.length = 0,upgList.length = 0;
	var eqlist = MST_Equip[BUINAME[i]];
	if (ck_series) { //系列別
		for (var eqid in eqlist) {
			var eq = eqlist[eqid];
			//if (typeof eq === "string") eq = MST_Equip[BUINAME[i]][eqid] = MST_Equip[BUINAME[i]][eqid].split(",");
			if ((f_series(eq[I_bNAME])) &&
			    (ck_series.C1 === "9" || eq[I_bKIND].indexOf(ck_series.C1) === 0 || eq[I_bKIND].indexOf(ck_series.C2) === 0) && 
			    (ck_sex === "0" || eq[I_bSEX] === "0" || ck_sex === eq[I_bSEX]) &&
			    (ck_type === "3" || eq[I_bTYPE] === "0" || ck_type === eq[I_bTYPE]) && 
			    (ck_rep.indexOf(eq[I_bKIND]) !== -1) && 
			    (ck_rui === "A" || ck_rui === eq[I_bCLASS]) && 
			    (+eq[I_bRARE] <= lm_rare) && 
			    (eq[I_bGR] <= ck_gr) && 
			    (+eq[I_bHR1]  <= high_hr && +eq[I_bHR1] >= low_hr)) {
				//list[list.length] = [eq[I_bNAME],[eq[I_bSLOT1],eq[I_bSLOT2],eq[I_bSLOT3],eq[I_bSLOT4],eq[I_bSLOT5],eq[I_bSLOT6],eq[I_bSLOT7]].sort()[6],[+eq[I_bDEF1],_+eq[I_bDEF2],+eq[I_bDEF3],+eq[I_bDEF4],+eq[I_bDEF5],+eq[I_bDEF6],+eq[I_bDEF7]].sort()[6],eqid];
				list[list.length] = [eq[I_bUPGCNT],eq[I_bNAME],eq[I_bSLOT7],eqid];
			}
		}
		if (i !== 5) {
			list.sort(function (a, b) {
							return +a[0] < +b[0] ? 1 : -1;
						});
		} else {
			list.sort(function (a, b) {
							return a[1] > b[1] ? 1 : -1;
						});
		}
		for (var j = 0,n = list.length; j < n; j++) o.setAttribute("value", list[j][3]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(list[j][1]+" ["+list[j][2]+"]"));
		this["s_"+BUINAME[i]].appendChild(df);
		this["s_"+BUINAME[i]+"ZK"].value = "";
		if (i === 5) break;
	} else { //技能別
		for (var eqid in eqlist) {
			var eq = eqlist[eqid];
			//if (typeof eq === "string") eq = MST_Equip[BUINAME[i]][eqid] = MST_Equip[BUINAME[i]][eqid].split(",");
			if (
				(+(ck_s1 + ck_s2 + ck_s3 + eq[I_bSN1] === "" && eq[I_bNAME].indexOf("SP") === -1) + /* 技能沒有を搜索するのに回避*/
				  (eq[I_bSN1] && (eq[I_bSN1] === ck_s1 || eq[I_bSN1] === ck_s2 || eq[I_bSN1] === ck_s3) && eq[I_bSP1] > ck_minus) + 
				  (eq[I_bSN2] && (eq[I_bSN2] === ck_s1 || eq[I_bSN2] === ck_s2 || eq[I_bSN2] === ck_s3) && eq[I_bSP2] > ck_minus) + 
				  (eq[I_bSN3] && (eq[I_bSN3] === ck_s1 || eq[I_bSN3] === ck_s2 || eq[I_bSN3] === ck_s3) && eq[I_bSP3] > ck_minus) + 
				  (eq[I_bSN4] && (eq[I_bSN4] === ck_s1 || eq[I_bSN4] === ck_s2 || eq[I_bSN4] === ck_s3) && eq[I_bSP4] > ck_minus) + 
				  (eq[I_bSN5] && (eq[I_bSN5] === ck_s1 || eq[I_bSN5] === ck_s2 || eq[I_bSN5] === ck_s3) && eq[I_bSP5] > ck_minus) >= ck_andor
				  ) && 
			    (ck_sex === "0" || eq[I_bSEX] === "0" || ck_sex === eq[I_bSEX]) &&
			    (ck_type === "3" || eq[I_bTYPE] === "0" || ck_type === eq[I_bTYPE]) && 
			    (ck_rep.indexOf(eq[I_bKIND]) !== -1) && 
			    (ck_rui === "A" || ck_rui === eq[I_bCLASS]) && 
			    (+eq[I_bRARE] <= lm_rare && eq[I_bGR] < ck_gr) && 
			    (eq[I_bCLASS] !== ck_gr) && 
			    (+eq[I_bHR1]  <= high_hr) &&
			    (eq[I_bSLOT7]  >= lm_slot)
			   ) {
				for (var j = 0,w = []; j < 3; j++) {
					if (s_list[j] !== "") {
						w[w.length] = eq[I_bSN1] === s_list[j] ? eq[I_bSP1] : 
										eq[I_bSN2] === s_list[j] ? eq[I_bSP2] : 
										eq[I_bSN3] === s_list[j] ? eq[I_bSP3] : 
										eq[I_bSN4] === s_list[j] ? eq[I_bSP4] : 
										eq[I_bSN5] === s_list[j] ? eq[I_bSP5] : "0";
					}
				}
				list[list.length] = [w.join("."),eq[I_bNAME],eq[I_bSLOT7],eqid];
				upgList[upgList.length] = eq[I_bUPGBACK];
			}
		}
		list.sort(function (a, b) {
					if (a[0] === b[0]) {
						return a[2] < b[2] ? 1 : -1;
					} else {
						return +a[0] < +b[0] ? 1 : -1;
					}});
		if (i === 5) { //装飾品
			for (var j = 0,n = list.length; j < n; j++) {
				var w = list[j][1].lastIndexOf("カフ") !== -1 ? dfC : df;
				o.setAttribute("value",list[j][3]),w.appendChild(o.cloneNode(false)),w.lastChild.appendChild(document.createTextNode(list[j][0]+" "+list[j][1]+" ["+list[j][2]+"]"));
			}
			this.s_deco.appendChild(df);
			this.s_cuff.appendChild(dfC);
			//this["s_decoZK"].value = t_ck;
			//this["s_cuffZK"].value = t_ck;
		} else {
			var upg = this.c_upg.checked ? upgList.join(",") : "";
			for (var j = 0,n = list.length; j < n; j++) {
				if (upg.indexOf(list[j][3]) === -1) o.setAttribute("value",list[j][3]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(list[j][0]+" "+list[j][1]+" ["+list[j][2]+"]"));
			}
			this["s_"+BUINAME[i]].appendChild(df);
		}
		this["s_"+BUINAME[i]+"ZK"].value = t_ck;
	}
}
}
//------------------------------------情報表示----------
,dispData : function (eqid,bui,lv){
if (eqid.length !== 4) return;
if (bui === "cuff") bui = "deco";
var eq = MST_Equip[bui][eqid];
//以下オミット　LV変えた時に素材が変更されない。。
//if (this.d_mei.innerHTML === eq[I_bNAME]) return;

//if (typeof eq === "string") eq = MST_Equip[bui][eqid] = MST_Equip[bui][eqid].split(",");
//詳細
this.d_mei.firstChild.nodeValue = eq[I_bNAME];
this.d_doc.firstChild.nodeValue = eq[I_bDOC] || "";
this.d_Fp.firstChild.nodeValue = eq[I_bF];
this.d_Wp.firstChild.nodeValue = eq[I_bW];
this.d_Tp.firstChild.nodeValue = eq[I_bT];
this.d_Ip.firstChild.nodeValue = eq[I_bI];
this.d_Dp.firstChild.nodeValue = eq[I_bD];
this.d_sn1.firstChild.nodeValue = MST_Skill[eq[I_bSN1]][0];
this.d_sp1.firstChild.nodeValue = eq[I_bSP1];
this.d_sn2.firstChild.nodeValue = MST_Skill[eq[I_bSN2]][0];
this.d_sp2.firstChild.nodeValue = eq[I_bSP2];
this.d_sn3.firstChild.nodeValue = MST_Skill[eq[I_bSN3]][0];
this.d_sp3.firstChild.nodeValue = eq[I_bSP3];
this.d_sn4.firstChild.nodeValue = MST_Skill[eq[I_bSN4]][0];
this.d_sp4.firstChild.nodeValue = eq[I_bSP4];
this.d_sn5.firstChild.nodeValue = MST_Skill[eq[I_bSN5]][0];
this.d_sp5.firstChild.nodeValue = eq[I_bSP5];
this.d_type.firstChild.nodeValue = TYPENAME[eq[I_bTYPE]];
this.d_sex.firstChild.nodeValue = SEXNAME[eq[I_bSEX]];
this.d_rep1.firstChild.nodeValue = MAKENAME[eq[I_bKIND].charAt(0)];
this.d_rep2.firstChild.nodeValue = MAKENAME[eq[I_bKIND].charAt(1)];
this.d_rui.firstChild.nodeValue = CLASSTYPE[eq[I_bCLASS]]+ (eq[I_bGR] ? "[GR"+eq[I_bGR]+"]":"");

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
var zeny_sum = 0, gzeny_sum = 0, sozai_pool = [], upg_txt = "", reci_data = getSozai(eq), zeny_data = getZeny(eq), def_data = getDef(eq), slot_data = getSlot(eq);
for (var i = 1,j = 0; j < eq[I_bLVMAX]; i++,j++) {
	if (+reci_data[7+j] >= 10000) {
		this.d_lv[i].firstChild.nodeValue = "未";
	} else if (+reci_data[7+j] >= 3000) {
		this.d_lv[i].firstChild.nodeValue = "Lv"+i+"：GSR" + (reci_data[7+j]-3000);
	} else if (+reci_data[7+j] >= 2000) {
		this.d_lv[i].firstChild.nodeValue = "Lv"+i+"：GR" + (reci_data[7+j]-2000);
	} else if (+reci_data[7+j] >= 1000) {
		this.d_lv[i].firstChild.nodeValue = "Lv"+i+"：SR" + (reci_data[7+j]-1000);
	} else {
		this.d_lv[i].firstChild.nodeValue = "Lv"+i+"：HR" + reci_data[7+j];
	}
	this.d_lv[i].style.backgroundColor = +reci_data[7+j] <= +this.c_hr.value ? "white" : "gray";
	this.d_def[i].firstChild.nodeValue = def_data[j] + "：" + slot_data[j];
	this.d_zeny[i].firstChild.nodeValue = zeny_data[j] + (+reci_data[7+j] >= 2000 ? "Gz" : "z");
	this.d_sozai[i].innerHTML = sozaiHtml(reci_data[j]);
	if (i <= lv && reci_data[j]) {
		if (+reci_data[7+j] >= 2000) {
			gzeny_sum += +zeny_data[j];
		} else {
			zeny_sum += +zeny_data[j];
		}
		sozai_pool[sozai_pool.length] = reci_data[j];
	}
}
//あまりをクリア
for (; i <= 7; i++) {
	this.d_lv[i].style.backgroundColor = "gray";
	this.d_lv[i].firstChild.nodeValue = 
	this.d_def[i].firstChild.nodeValue = 
	this.d_zeny[i].firstChild.nodeValue = 
	this.d_sozai[i].innerHTML = "";
}
//強化元があるのに生産素材もある
if (eq[I_bUPGBACK] && eq[I_bRECIPE1]){
	this.d_sozai[1].innerHTML = sozaiHtml(MST_Equip.sozai[parseInt(eq[I_bLVUPPTN],16)].split(",")[0]) + "<br>---生産---<br>" + this.d_sozai[1].innerHTML;
}
//強化元走査
if (eq[I_bUPGBACK]) {
	var hasei_lv = eq[I_bUPGBACK].charAt(4), hasei_eq = MST_Equip[bui][eq[I_bUPGBACK].substring(0,4)], reci_data = getSozai(hasei_eq), zeny_data = getZeny(hasei_eq);
	upg_txt = hasei_eq[I_bNAME] + "LV" + hasei_lv;
	this.d_sozai[1].innerHTML = upg_txt + "<br>" + this.d_sozai[1].innerHTML;
	do {
		for (var i = 1,j = 0; i <= hasei_lv; i++,j++){
			if (+reci_data[7+j] >= 2000) {
				gzeny_sum += +zeny_data[j];
			} else {
				zeny_sum += +zeny_data[j];
			}
			sozai_pool[sozai_pool.length] = reci_data[j];
		}
		if (hasei_eq[I_bUPGBACK] && !hasei_eq[I_bRECIPE1]) {
			hasei_lv = hasei_eq[I_bUPGBACK].charAt(4), hasei_eq = MST_Equip[bui][hasei_eq[I_bUPGBACK].substring(0,4)], reci_data = getSozai(hasei_eq), zeny_data = getZeny(hasei_eq);
			upg_txt = hasei_eq[0] + "LV" + hasei_lv + "→" + upg_txt
		} else {
			hasei_lv = 0;
		}
	} while (hasei_lv);
	upg_txt += "→<br>";
}

this.d_zenyAll.innerHTML = (zeny_sum || !gzeny_sum ? zeny_sum + "z<br>" : "") + (gzeny_sum ? gzeny_sum + "Gz" : "");

//素材合計
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
this.d_sozaiAll.innerHTML = upg_txt + toku + "<span>" + sozaiHtml(sozai_sum.join(" ")).replace(/<br>/g,"</span>,<span>") + "</span>";
//尾晶蠍限定処理
if (!eq[I_bNAME].indexOf("尾晶蠍") && eq[I_bCLASS] !== "Z" && eq[I_bNAME].indexOf("バレッタ") === -1) this.d_sozaiAll.innerHTML = "※色により素材が異なる※<br>" + this.d_sozaiAll.innerHTML
//画像
if (eq[I_bIMG] && this.d_MF.style.display === "") {
	var ss = MST_Equip.jpg[parseInt(eq[I_bIMG],16)].split(" ");
	if (ss[1] > "0") {
		this.d_MF.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss[0]+"MF"+ss[1]+"_s.jpg";
		this.d_MB.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss[0]+"MB"+ss[1]+"_s.jpg";
		this.d_FF.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss[0]+"FF"+ss[1]+"_s.jpg";
		this.d_FB.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss[0]+"FB"+ss[1]+"_s.jpg";
	} else {
		this.d_MF.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss+"MF"+"_s.jpg";
		this.d_MB.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss+"MB"+"_s.jpg";
		this.d_FF.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss+"FF"+"_s.jpg";
		this.d_FB.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss+"FB"+"_s.jpg";
	}
	this.d_MF.style.visibility = this.d_MB.style.visibility = this.d_FF.style.visibility = this.d_FB.style.visibility = "visible"
} else {
//	this.d_MF.src = this.d_MB.src = this.d_FF.src = this.d_FB.src = "../img/w.jpg"
	this.d_MF.style.visibility = this.d_MB.style.visibility = this.d_FF.style.visibility = this.d_FB.style.visibility = "hidden"
}
}
//------------------------------------防具セット----------
,setData : function (eqid,bui) {
if (!eqid) return;
switch (bui) {
case "cuff": //カフ
	var eq = MST_Equip.deco[eqid];
	for (var j = 1; j < 4 ; j++) {
		if ( this["b_cuffS"+j+"_data"] === "O" &&
			(eq[I_bSLOT7] === "2" && j === 1 && this["b_cuffS2_data"].length !== 4 || eq[I_bSLOT7] === "1")) {
			this.cngSlot(eqid,"b_cuffS"+j);
			this.calc();
			return;
		}
	}
	break;
case "deco": //装飾品
	var eq = MST_Equip.deco[eqid];
	for (var i = 0; i < 5; i++) { //部位別
		for (var j = 1; j < 4 ; j++) {
			if ( this["b_"+BUINAME[i]+"S"+j+"_data"] === "O" &&
				(eq[I_bNAME].lastIndexOf("ＳＰ") === -1 || eq[I_bNAME].lastIndexOf("ＳＰ") !== -1 && MST_Equip[BUINAME[i]][this["b_"+BUINAME[i]].value.split(",")[0]][I_bNAME].lastIndexOf("SP") !== -1) &&
				(eq[I_bSLOT7] === "3" && j === 1 && this["b_"+BUINAME[i]+"S2_data"].length !== 4 && this["b_"+BUINAME[i]+"S3_data"].length !== 4 ||
				 eq[I_bSLOT7] === "2" && j <= 2 && this["b_"+BUINAME[i]+"S"+(j+1)+"_data"].length !== 4 ||
				 eq[I_bSLOT7] === "1")) {
				this.cngSlot(eqid,"b_"+BUINAME[i]+"S"+j);
				this.calc();
				return;
			}
		}
	}
	break;
default: //防具
	//既にあるかチェック
	for (var i = 0,m = this["b_"+bui].length; i < m; i++) {
		if (this["b_"+bui][i].value.split(",")[0] === eqid) {
			this["b_"+bui].selectedIndex = i;
			this.cngData(bui);
			this.calc();
			return;
		}
	}
	var eq = MST_Equip[bui][eqid],reci_data = getSozai(eq), slot_data = getSlot(eq);
	//データ追加(名稱:eqid,LV,スロ1,スロ2,スロ3)
	//LVを制限
	for (var i = 0; i < eq[I_bLVMAX] && +reci_data[7+i] <= +this.c_hr.value; i++);
	var lv = i--,o = document.createElement("option");
	o.setAttribute("value", eqid+","+lv+"," + (slot_data[i] > 0 ? "O,":",") + (slot_data[i] > 1 ? "O,":",") + (slot_data[i] > 2 ? "O":""));
	o.setAttribute("selected","selected");
	o.appendChild(document.createTextNode(eq[I_bNAME]));
	this["b_"+bui].appendChild(o);
	this.cngData(bui);
	this.calc();
}
}
//------------------------------------データ入れ替え----------
,cngData : function (bui) {
var w = this["b_"+bui].value.split(","), eq = MST_Equip[bui][w[I_sID]], reci_data = getSozai(eq), def_data = getDef(eq), slot_data = getSlot(eq);
//if (typeof eq === "string") eq = MST_Equip[bui][w[0]] = MST_Equip[bui][w[0]].split(",");
//LVを制限
for (var i = 0; i < eq[I_bLVMAX] && +reci_data[7+i] <= +this.c_hr.value; i++);
var lv = i--;
if (this["b_"+bui+"Lv"].length !== lv) {
	this["b_"+bui+"Lv"].length = 0;
	var df = document.createDocumentFragment(),o = document.createElement("option");
	for (var i = 1; i <= lv; i++) o.setAttribute("value",i),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(i));
	this["b_"+bui+"Lv"].appendChild(df);
	if (lv < w[I_sLV]) w[I_sLV] = lv;
	if (CK_IE6) this["b_"+bui+"Lv"][w[I_sLV]-1].setAttribute("selected","selected");
}
this["b_"+bui+"Lv"].selectedIndex = w[I_sLV]-1;

//詳細
this["b_"+bui+"GR"] = eq[I_bGR] ? eq[I_bGR] : 1;
this["b_"+bui+"Def"].firstChild.nodeValue = def_data[w[1]-1];
this["b_"+bui+"Def"].value = def_data[w[1]-1];
this["b_"+bui+"Fp"].firstChild.nodeValue = eq[I_bF];
this["b_"+bui+"Wp"].firstChild.nodeValue = eq[I_bW];
this["b_"+bui+"Tp"].firstChild.nodeValue = eq[I_bT];
this["b_"+bui+"Ip"].firstChild.nodeValue = eq[I_bI];
this["b_"+bui+"Dp"].firstChild.nodeValue = eq[I_bD];
this["b_"+bui+"Sn1"].firstChild.nodeValue = MST_Skill[eq[I_bSN1]][0];
this["b_"+bui+"Sp1"].firstChild.nodeValue = eq[I_bSP1];
this["b_"+bui+"Sn2"].firstChild.nodeValue = MST_Skill[eq[I_bSN2]][0];
this["b_"+bui+"Sp2"].firstChild.nodeValue = eq[I_bSP2];
this["b_"+bui+"Sn3"].firstChild.nodeValue = MST_Skill[eq[I_bSN3]][0];
this["b_"+bui+"Sp3"].firstChild.nodeValue = eq[I_bSP3];
this["b_"+bui+"Sn4"].firstChild.nodeValue = MST_Skill[eq[I_bSN4]][0];
this["b_"+bui+"Sp4"].firstChild.nodeValue = eq[I_bSP4];
this["b_"+bui+"Sn5"].firstChild.nodeValue = MST_Skill[eq[I_bSN5]][0];
this["b_"+bui+"Sp5"].firstChild.nodeValue = eq[I_bSP5];
//洞
switch (slot_data[w[I_sLV]-1]) {
case 0:
	this["b_"+bui+"S1"].disabled = this["b_"+bui+"S2"].disabled = this["b_"+bui+"S3"].disabled = 1;
 	this["b_"+bui+"S1"].value = this["b_"+bui+"S2"].value = this["b_"+bui+"S3"].value = "-";
 	this["b_"+bui+"S1_data"]  = this["b_"+bui+"S2_data"]  = this["b_"+bui+"S3_data"]  = "";
	break;
case 1:
	this["b_"+bui+"S1"].disabled = 0;
	this["b_"+bui+"S2"].disabled = this["b_"+bui+"S3"].disabled = 1;
 	this["b_"+bui+"S1"].value = "○";
 	this["b_"+bui+"S1_data"]  = "O";
	this["b_"+bui+"S2"].value = this["b_"+bui+"S3"].value = "-";
	this["b_"+bui+"S2_data"]  = this["b_"+bui+"S3_data"]  = "";
	break;
case 2:
	this["b_"+bui+"S1"].disabled = this["b_"+bui+"S2"].disabled = 0;
	this["b_"+bui+"S3"].disabled = 1;
 	this["b_"+bui+"S1"].value = this["b_"+bui+"S2"].value = "○";
 	this["b_"+bui+"S1_data"]  = this["b_"+bui+"S2_data"]  = "O";
	this["b_"+bui+"S3"].value = "-";
	this["b_"+bui+"S3_data"]  = "";
	break;
case 3:
	this["b_"+bui+"S1"].disabled = this["b_"+bui+"S2"].disabled = this["b_"+bui+"S3"].disabled = 0;
 	this["b_"+bui+"S1"].value = this["b_"+bui+"S2"].value = this["b_"+bui+"S3"].value = "○";
 	this["b_"+bui+"S1_data"]  = this["b_"+bui+"S2_data"]  = this["b_"+bui+"S3_data"]  = "O";
	break;
}
//装飾品
for (var i = 1; i <= slot_data[w[I_sLV]-1]; this.cngSlot(w[I_sS1+i-1],"b_"+bui+"S"+i,i++));

this.dispData(w[0],bui,w[1]);
}
//------------------------------------防具等級変更----------
,cngLv : function (bui) {
var tag=this["b_"+bui], w = tag.value.split(",");
w[I_sLV] = this["b_"+bui+"Lv"].value;
tag.options[tag.selectedIndex].value = w.join(",");
}
//------------------------------------洞状態変更----------
,cngSlot : function (eqid,buttonid) {
if (eqid === "X") return; //●だったら何もしない
//alert(eqid+":"+no+":"+buttonid);
//洞を変更
var no = buttonid.charAt(buttonid.length-1),tag = this[buttonid.substring(0,buttonid.length-2)],w = tag.value.split(",");
var eqslot = MST_Equip.deco[eqid][I_bSLOT7],eqname = MST_Equip.deco[eqid][I_bNAME],slot1 = buttonid.substring(0,buttonid.length-1)+"1",slot2 = buttonid.substring(0,buttonid.length-1)+"2",slot3 = buttonid.substring(0,buttonid.length-1)+"3";
if (no === "1") {
	switch (eqslot) {
	case "":
	case "0":
	case "1":
		if (this[slot2].value === "●") {
			this[slot2].disabled = 0;
			this[slot2].value = "○";
			w[I_sS2] = this[slot2+"_data"] = "O";
			if (this[slot3].value === "●") {
				this[slot3].disabled = 0;
				this[slot3].value = "○";
				w[I_sS3] = this[slot3+"_data"] = "O";
			}
		}
		break;
	case "2":
		if (this[slot2].value === "-") return;
		this[slot2].disabled = 1;
		this[slot2].value = "●";
		w[I_sS2] = this[slot2+"_data"] = "X";
		if (this[slot3].value === "●") {
			this[slot3].disabled = 0;
			this[slot3].value = "○";
			w[I_sS3] = this[slot3+"_data"] = "O";
		}
		break;
	case "3":
		if (this[slot2].value === "-" || this[slot3].value === "-") return;
		this[slot3].disabled = this[slot2].disabled = 1;
		this[slot3].value = this[slot2].value = "●";
		w[I_sS3] = w[I_sS2] = this[slot3+"_data"] = this[slot2+"_data"] = "X";
		break;
	}
} else if (no === "2" && this[slot2].value !== "●") {
	switch (eqslot) {
	case "":
	case "0":
	case "1":
		if (this[slot3].value === "●") {
			this[slot3].disabled = 0;
			this[slot3].value = "○";
			w[I_sS3] = this[slot3+"_data"] = "O";
		}
		break;
	case "2":
		if (this[slot3].value === "-") return;
		this[slot3].disabled = 1;
		this[slot3].value = "●";
		w[I_sS3] = this[slot3+"_data"] = "X";
		break;
	}
}
//セット
w[+no+1] = this[buttonid+"_data"] = eqid;
if (eqname.lastIndexOf("珠ＳＰ") !== -1) { //SP珠か
	this[buttonid].value = eqname.replace("珠ＳＰ","SP");
} else if (eqname.lastIndexOf("カフ") !== -1) {
	this[buttonid].value = eqname.substring(0,eqname.length-3).replace("カフ","") + String.fromCharCode(eqname.charCodeAt(eqname.length-3) - 65248) + String.fromCharCode(eqname.charCodeAt(eqname.length-2) - 65248) + String.fromCharCode(eqname.charCodeAt(eqname.length-1) - 65248);
} else {
	this[buttonid].value = eqname.replace("珠Ｇ","G");
}
if (buttonid.lastIndexOf("buki") !== -1 || buttonid.lastIndexOf("cuff") !== -1) {
	tag.value = w.join(",");
} else {
	tag.options[tag.selectedIndex].value = w.join(",");
}
}
//------------------------------------発動技能計算----------
,calc : function () {
//GRの変動
for (var i = 0; i < 5 ;i++) {
	if (this["b_"+BUINAME[i]+"GR"] < this.c_G_Fit.value && this["b_"+BUINAME[i]+"Def"].value > 0) {
		this["b_"+BUINAME[i]+"Def"].firstChild.nodeValue = +this["b_"+BUINAME[i]+"Def"].value + (this.c_G_Fit.value - this["b_"+BUINAME[i]+"GR"]) * 20;
	} else {
		this["b_"+BUINAME[i]+"Def"].firstChild.nodeValue = this["b_"+BUINAME[i]+"Def"].value;
	}
}

this.b_Def_Sum.value = +this.b_headDef.firstChild.nodeValue + +this.b_bodyDef.firstChild.nodeValue + +this.b_armDef.firstChild.nodeValue + +this.b_wstDef.firstChild.nodeValue + +this.b_legDef.firstChild.nodeValue + 1;
this.b_Fp_Sum.value = +this.b_headFp.firstChild.nodeValue + +this.b_bodyFp.firstChild.nodeValue + +this.b_armFp.firstChild.nodeValue + +this.b_wstFp.firstChild.nodeValue + +this.b_legFp.firstChild.nodeValue;
this.b_Wp_Sum.value = +this.b_headWp.firstChild.nodeValue + +this.b_bodyWp.firstChild.nodeValue + +this.b_armWp.firstChild.nodeValue + +this.b_wstWp.firstChild.nodeValue + +this.b_legWp.firstChild.nodeValue;
this.b_Tp_Sum.value = +this.b_headTp.firstChild.nodeValue + +this.b_bodyTp.firstChild.nodeValue + +this.b_armTp.firstChild.nodeValue + +this.b_wstTp.firstChild.nodeValue + +this.b_legTp.firstChild.nodeValue;
this.b_Ip_Sum.value = +this.b_headIp.firstChild.nodeValue + +this.b_bodyIp.firstChild.nodeValue + +this.b_armIp.firstChild.nodeValue + +this.b_wstIp.firstChild.nodeValue + +this.b_legIp.firstChild.nodeValue;
this.b_Dp_Sum.value = +this.b_headDp.firstChild.nodeValue + +this.b_bodyDp.firstChild.nodeValue + +this.b_armDp.firstChild.nodeValue + +this.b_wstDp.firstChild.nodeValue + +this.b_legDp.firstChild.nodeValue;
//技能點數計算
var point = [], gou = 0, sp = 0, hc = 0, tr = 0, hs = 0, sg = 0, g = 0, gsg = 0, r = 0;
for (var i = 0,m=MST_Skill.length; i < m; point[i++] = 0);
for (var i = 0; i < 5; i++) { //部位別
	for (var k = 0,eq = MST_Equip[BUINAME[i]][this["b_" + BUINAME[i]].value.substring(0,4)]; k < 5; point[eq[I_bSN1+2*k]] += +eq[I_bSP1+2*k] ,k++);
	switch (eq[I_bCLASS]) { //防具チェック
	case "":
		break;
	case "P": //SP
		sp++;
		break;
	case "E": //G狩護
		g++;
	case "D": //狩護
		sg++;
	case "C": //HC
		hc++;
		break;
	case "R": //烈種
		r++;
	case "I": //G覇種
	case "H": //覇種
		hs++;
	case "T": //天嵐
		tr++;
	case "G": //剛種
		gou++;
		break;
	case "Z": //G
		g++;
		break;
	}
	for (var j = 1; j < 4; j++) { //洞
		if (this["b_" + BUINAME[i] + "S" + j+"_data"].length === 4) {
			for (var k = 0,eq = MST_Equip.deco[this["b_" + BUINAME[i] + "S" + j+"_data"]]; k < 4; point[eq[I_bSN1+2*k]] += +eq[I_bSP1+2*k] ,k++);
		}
	}
}
for (var j = 1; j < 4; j++) {
	if (this["b_bukiS" + j+"_data"].length === 4) { //武器洞
		for (var k = 0,eq = MST_Equip.deco[this["b_bukiS" + j+"_data"]]; k < 4; point[eq[I_bSN1+2*k]] += +eq[I_bSP1+2*k] ,k++);
	}
	if (this["b_cuffS" + j+"_data"].length === 4) { //カフ洞
		for (var k = 0,eq = MST_Equip.deco[this["b_cuffS" + j+"_data"]]; k < 4; point[eq[I_bSN1+2*k]] += +eq[I_bSP1+2*k], k++);
	}
}
this.b_effectT.innerHTML = "<div>" + (g>2 ? "G級任務時武器倍率+30" : "") + "</div>" +
							"<div>" + (hs ? (hs*33+(tr-hs)*6 >= 100 || r ? "常時技能級別UP" : "体力" + (100-hs*33-(tr-hs)*6) + "%以上時技能級別UP")
										  : ["","体力100%で技能級別UP","体力90%以上時技能級別UP,","体力83%以上時技能級別UP","体力76%以上時技能級別UP","体力70%以上時技能級別UP"][gou]) + "</div>" +
							"<div>" + ["","剛種/覇種/G級任務時武器倍率+15[剛/天/覇]","剛種/覇種/G級任務時武器倍率+30[剛/天/覇]","剛種/覇種/G級任務時武器倍率+45[剛/天/覇]","剛種/覇種/G級任務時武器倍率+60[剛/天/覇]","剛種/覇種/G級任務時武器倍率+80[剛/天/覇]"][tr] + "</div>" +
							"<div>" + ["","剛種/覇種/G級任務時属性2%UP[剛/天/覇]","剛種/覇種/G級任務時属性4%UP[剛/天/覇]","剛種/覇種/G級任務時属性6%UP[剛/天/覇]","剛種/覇種/G級任務時属性8%UP[剛/天/覇]","剛種/覇種/G級任務時属性10%UP[剛/天/覇]"][hs] + "</div>" +
							"<div>" + (tr>1 ? "剛種/覇種/G級任務時武器性能UP[天/覇]" : "") + "</div>" +
							"<div>" + ["","HC任務時耐力150で8秒毎回復","HC任務時耐力125で4秒毎回復","HC任務時耐力100で2秒毎回復","HC任務時耐力75で1.5秒毎回復","HC任務時耐力50で1秒毎回復"][hc] + "</div>" +
							"<div>" + ["","SR100以降任務時傷害10%減[HC/天/覇]","SR100以降任務時傷害17%減[HC/天/覇]","SR100以降任務時傷害24%減[HC/天/覇]","SR100以降任務時傷害27%減[HC/天/覇]","SR100以降任務時傷害30%減[HC/天/覇]"][sg] + "</div>" +
							"<div>" + ["","SR100以降任務時傷害10%減[G]","SR100以降任務時傷害17%減[G]","SR100以降任務時傷害24%減[G]","SR100以降任務時傷害27%減[G]","SR100以降任務時傷害30%減[G]"][gsg] + "</div>" +
							"<div>" + ["","HC/覇種/G級任務時防禦+20[HC/天/覇]","HC/覇種/G級任務時防御+40[HC/天/覇]","HC/覇種/G級任務時防禦+60[HC/天/覇]","HC/覇種/G級任務時防御+80[HC/天/覇]","HC/覇種/G級任務時防御+100[HC/天/覇]"][sg] + "</div>" +
							"<div>" + ["","HC/覇種/G級任務時防禦+20[G]","HC/覇種/G級任務時防御+40[G]","HC/覇種/G級任務時防禦+60[G]","HC/覇種/G級任務時防御+80[G]","HC/覇種/G級任務時防御+100[G]"][gsg] + "</div>" +
							"<div>" + (sp ? "HR100以降任務時防御+100" : "") + "</div>";
this.b_gousyuB.style.display = gou ? "" : "none";
if (this.b_gousyuB.value !== "級別UPあり") gou = 0;
//技能
for (var i = 0, list = [], exe = [], m=MST_Skill.length; i < m; i++) {
	if (point[i] === 0) continue;
	//技能點數列表
	list[list.length] = [MST_Skill[i][0],point[i]]; //技能名,點數
	//発動技能
	for (var j = 4,ck = 0,n = MST_Skill[i].length; j < n; j++) {
		if (MST_Skill[i][j] < 0) {
			//マイナス発動(発動したら出る)
			if (MST_Skill[i][j] >= point[i]) {
				ck = j;
				if (gou && MST_Skill[i][2] && 3 <= j - 2) ck -= 2;
				break;
			}
		} else {
			//プラス発動(足りない場合出る)
			if (MST_Skill[i][j] <= point[i]) {
				ck = j;
				if (gou && MST_Skill[i][2] && MST_Skill[i].length > j + 2) ck += 2;
			} else {
				break;
			}
		}
		j++
	}
	if (ck) exe[exe.length] = [MST_Skill[i][1],MST_Skill_Exe[MST_Skill[i][ck+1]],i,point[i]]; //発動順,発動技能,技能ID,點數
}
//技能列表
list.sort(function(a, b) {return b[1] - a[1]});
this.b_skillP.innerHTML = list.join("<br>").replace(/,/g," ");
//発動技能
exe.sort(function(a, b) {return a[0]-b[0]});
var exemax = g === 5 ? 12 : g >= 3 ? 11 : 10;
var exelm = exe.slice(0,exemax);
exelm.sort(function(a, b) {
		if (a[3] === b[3]) {
			return a[2] - b[2];
		} else {
			return b[3] - a[3];
		}});
this.c_soko.value = 60; //底力初期値
for (var i = 0,t = ""; i < exelm.length; i++) {
	t += exelm[i][1] + "<br>";
	switch (exelm[i][1].substring(0,3)) {
	case "防御+":
	case "防御-":
		this.b_Def_Sum.value += +exelm[i][1].substring(2);
		break;
	case "火耐性":
		this.b_Fp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "水耐性":
		this.b_Wp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "雷耐性":
		this.b_Tp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "冰耐性":
		this.b_Ip_Sum.value += +exelm[i][1].substring(3);
		break;
	case "龍耐性":
		this.b_Dp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "各耐性":
		this.b_Fp_Sum.value += +exelm[i][1].substring(3);
		this.b_Wp_Sum.value += +exelm[i][1].substring(3);
		this.b_Tp_Sum.value += +exelm[i][1].substring(3);
		this.b_Ip_Sum.value += +exelm[i][1].substring(3);
		this.b_Dp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "憂心":
		this.c_soko.value = 42;
		break;
	case "火事場":
		this.c_soko.value = 90;
		break;
	case "生命力":
		switch (exelm[i][1].charAt(4)) {
		case "1":
			this.b_Def_Sum.value += 15;
			break;
		case "2":
			this.b_Def_Sum.value += 45;
			break;
		case "3":
			this.b_Def_Sum.value += 90;
			break;
		}
		break;
	}
}
//上限突破
if (exe.length > exemax) {
	t +=  "<small>(";
	for (var i = exemax; i < exe.length; t += exe[i++][1]) + "<br>";
	t +=  ")</small>";
}
this.calcDef();
this.b_skillT.innerHTML = t;
}
//------------------------------------笛の旋律変更----------
,cngFueExe : function (){
if (this.c_G_Que.selectedIndex) {
	var i = this.c_fueDEF.selectedIndex;
	this.c_fueDEF.selectedIndex = 0;
	this.c_fueDEF.style.display = "none";
	this.c_fueDEFup.style.display = "inline";
	this.c_fueDEFup.selectedIndex = i;
} else {
	var i = this.c_fueDEFup.selectedIndex;
	if (i > 0 || this.c_fueDEFup.style.display != "none") {
		this.c_fueDEFup.selectedIndex = 0;
		this.c_fueDEFup.style.display = "none";
		this.c_fueDEF.style.display = "inline";
		this.c_fueDEF.selectedIndex = i;
	}
}
}
//------------------------------------防御耐性----------
,calcDef : function (){
var b_Def_Sum = +this.b_Def_Sum.value,sr_defCut = 100,sr_defAdd = 0;
var tai = {	"b_Fp_Sum" : +this.b_Fp_Sum.value,
			"b_Wp_Sum" : +this.b_Wp_Sum.value,
			"b_Tp_Sum" : +this.b_Tp_Sum.value,
			"b_Ip_Sum" : +this.b_Ip_Sum.value,
			"b_Dp_Sum" : +this.b_Dp_Sum.value};
//防御
b_Def_Sum += (this.c_gohu.checked ? 16 : 0) + (this.c_tume.checked ? 24 : 0) + (this.c_soko.checked ? +this.c_soko.value : 0) + +this.c_mesi.value + +this.c_tane.value + +this.c_buki.value;

if (this.c_drink.value !== "0") { //飲料
	tai["b_" + this.c_drink.value.charAt(0) + "p_Sum"] += +this.c_drink.value.substring(1);
}
if (this.c_fueTAI.value !== "0") { //笛
	tai["b_" + this.c_fueTAI.value.charAt(0) + "p_Sum"] += +this.c_fueTAI.value.substring(1);
}
if (this.c_sr.value !== "0") { //SR
	switch (this.c_sr.value.charAt(0)) {
	case "S":
		sr_defCut = 100-this.c_sr.value.substring(1,3);
		tai["b_Fp_Sum"] -= this.c_sr.value.substring(3);
		tai["b_Wp_Sum"] -= this.c_sr.value.substring(3);
		tai["b_Tp_Sum"] -= this.c_sr.value.substring(3);
		tai["b_Ip_Sum"] -= this.c_sr.value.substring(3);
		tai["b_Dp_Sum"] -= this.c_sr.value.substring(3);
		break;
	case "B":
		sr_defAdd = +this.c_sr.value.substring(1);
		break;
	case "A":
		tai["b_Fp_Sum"] += +this.c_sr.value.substring(1);
		tai["b_Wp_Sum"] += +this.c_sr.value.substring(1);
		tai["b_Tp_Sum"] += +this.c_sr.value.substring(1);
		tai["b_Ip_Sum"] += +this.c_sr.value.substring(1);
		tai["b_Dp_Sum"] += +this.c_sr.value.substring(1);
		break;
	default:
		tai["b_" + this.c_sr.value.charAt(0) + "p_Sum"] += +this.c_sr.value.substring(1);
	}
}
b_Def_Sum = Math.floor(b_Def_Sum * this.c_fueDEF.value * sr_defCut / 10000) + sr_defAdd+ (this.c_kizuna.checked ? 40 : 0) + +this.c_katsu.value + +this.c_fueDEFup.value - 150 * this.c_G_Que.value;
if (b_Def_Sum < 1) b_Def_Sum = 1;

this.b_Def_Sum.firstChild.nodeValue = b_Def_Sum
this.b_Fp_Sum.firstChild.nodeValue = tai["b_Fp_Sum"];
this.b_Wp_Sum.firstChild.nodeValue = tai["b_Wp_Sum"];
this.b_Tp_Sum.firstChild.nodeValue = tai["b_Tp_Sum"];
this.b_Ip_Sum.firstChild.nodeValue = tai["b_Ip_Sum"];
this.b_Dp_Sum.firstChild.nodeValue = tai["b_Dp_Sum"];
}
//------------------------------------テキスト出力----------
,creText : function (){
var sp = "　　　　　　　　　　";
var w = this.b_cuff.value.split(",");
var t = "カフ：　　　　　　　　　　　　　　　　　　 "+MST_Equip.deco[w[2]][I_bNAME]+" "+MST_Equip.deco[w[3]][I_bNAME]+"\n";
var w = this.b_buki.value.split(",");
t += "武：　　　　　　　　　　　　　　　　　　 "+MST_Equip.deco[w[2]][I_bNAME]+" "+MST_Equip.deco[w[3]][I_bNAME]+" "+MST_Equip.deco[w[4]][I_bNAME]+"\n";
if (this.b_head.value === "0000,1,,,") {
	t += "頭：沒有\n";
} else {
	var w = this.b_head.value.split(",");
	t += "頭："+(MST_Equip.head[w[0]][I_bNAME]+sp).substring(0,13)+"Lv"+w[1]+"　"+("  "+this.b_headDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_headS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_headS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_headS3_data][I_bNAME]+"\n";
}
if (this.b_body.value === "0000,1,,,") {
	t += "胴：沒有\n"
} else {
	var w = this.b_body.value.split(",");
	t += "胴："+(MST_Equip.body[w[0]][I_bNAME]+sp).substring(0,13)+"Lv"+w[1]+"　"+("  "+this.b_bodyDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_bodyS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_bodyS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_bodyS3_data][I_bNAME]+"\n";
}
if (this.b_arm.value === "0000,1,,,") {
	t += "腕：沒有\n"
} else {
	var w = this.b_arm.value.split(",");
	t += "腕："+(MST_Equip.arm[w[0]][I_bNAME]+sp).substring(0,13)+"Lv"+w[1]+"　"+("  "+this.b_armDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_armS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_armS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_armS3_data][I_bNAME]+"\n";
}
if (this.b_wst.value === "0000,1,,,") {
	t += "腰：沒有\n"
} else {
	var w = this.b_wst.value.split(",");
	t += "腰："+(MST_Equip.wst[w[0]][I_bNAME]+sp).substring(0,13)+"Lv"+w[1]+"　"+("  "+this.b_wstDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_wstS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_wstS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_wstS3_data][I_bNAME]+"\n";
}
if (this.b_leg.value === "0000,1,,,") {
	t += "脚：沒有\n"
} else {
	var w = this.b_leg.value.split(",");
	t += "脚："+(MST_Equip.leg[w[0]][I_bNAME]+sp).substring(0,13)+"Lv"+w[1]+"　"+("  "+this.b_legDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_legS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_legS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_legS3_data][I_bNAME]+"\n";
}
t += "\n";
t += "防御力："+this.b_Def_Sum.firstChild.nodeValue;
t += " 火耐性："+this.b_Fp_Sum.firstChild.nodeValue;
t += " 水耐性："+this.b_Wp_Sum.firstChild.nodeValue;
t += " 雷耐性："+this.b_Tp_Sum.firstChild.nodeValue;
t += " 冰耐性："+this.b_Ip_Sum.firstChild.nodeValue;
t += " 龍耐性："+this.b_Dp_Sum.firstChild.nodeValue+"\n";
t += "\n";
t += "発動技能\n";
t += this.b_skillT.innerHTML.replace(/<br>/ig,",");
if (CK_MAC) {
	t = t.replace("Ⅰ","I");
	t = t.replace("Ⅱ","II");
	t = t.replace("Ⅲ","III");
	t = t.replace("Ⅳ","IV");
	t = t.replace("Ⅴ","V");
	t = t.replace("Ⅵ","VI");
	t = t.replace("Ⅶ","VII");
	t = t.replace("Ⅷ","VIII");
	t = t.replace("Ⅸ","IX");
	t = t.replace("Ⅹ","X");
}
return t;
}
//------------------------------------ファイル読み込み----------
,getFile : function (data){
//読み込み
//実行開始(防具展開を中止し即実行)
clearTimeout(TimeId);
for (var i = 0; i < 6; i++) for (var eqid in MST_Equip[BUINAME[i]]) if (typeof MST_Equip[BUINAME[i]][eqid] === "string") MST_Equip[BUINAME[i]][eqid] = MST_Equip[BUINAME[i]][eqid].split(",");
//仕変(先頭１桁をなくした)対応
for (var s = 0; s < 6; s++) {
	for (var i = 0,w = data[s].split(","),m = w.length; i < m; i++) w[i] = (w[i].length === 5) ? w[i].substring(1,5) : w[i];
	data[s] = w.join(",");
}
//
this.b_buki.value = data[0];
for (var i = 1,w = data[0].split(",");i < 4;this.cngSlot(w[1+i],"b_bukiS"+i), i++);

if (data[6]){
	this.b_cuff.value = data[6];
	for (var i = 1,w = data[6].split(",");i < 4;this.cngSlot(w[1+i],"b_cuffS"+i), i++);
}
for (var i = 0; i < 5; i++) {
	var eqid = data[i+1].split(",")[0];
	if (eqid === "0000") continue;

	var o = document.createElement("option");
	o.setAttribute("value", data[i+1]);
	o.appendChild(document.createTextNode(MST_Equip[BUINAME[i]][eqid][I_bNAME]));
	this["b_" + BUINAME[i]].appendChild(o);
	this["b_" + BUINAME[i]].selectedIndex = 1;
	this.cngData(BUINAME[i]);
}
this.calc();
}

}//グローバル
global.Init();
global.Init=null;
return global;
})(document);

//------------------------------------活動貼り付け----------
(function(){
//活動セット
var addEvent = function (elm, type, func) {
	//追加
	elm./*@cc_on @if (true) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
	//アン領主で削除
	window./*@cc_on @if (true) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ "unload",
		function(){
			elm./*@cc_on @if (true) detachEvent ('on' + @else@*/ removeEventListener (/*@end@*/ type,func,false);
		}
		,false);
};
addEvent(window,"resize",
function () {
	document.getElementById("f_search").style.height = document.getElementById("f_bougu").style.height = (Number(window.innerHeight) || document.documentElement.clientHeight || document.body.clientHeight) - 85 + "px";
});
addEvent(window,"load",
function () {
//		this.onresize();
	document.getElementById("f_search").style.height = document.getElementById("f_bougu").style.height = (Number(window.innerHeight) || document.documentElement.clientHeight || document.body.clientHeight) - 85 + "px";

	var w = location.search.substring(1).split("|");
	if (w.length !== 6 && w.length !== 7) return;
	SkillForm.getFile(w);
});
addEvent(document,"dblclick",
function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	if (t.id.substring(0,5) === "c_rep") {t.style.backgroundColor = t.style.backgroundColor ? "" : "gray";}
	else if (t.id === "s_head" || t.id === "s_body" || t.id === "s_arm" || t.id === "s_wst" || t.id === "s_leg" || t.id === "s_deco" || t.id === "s_cuff") SkillForm.setData(t.value,t.title);
	/*@if (true)
	@else@*/
	if (t.tagName.toUpperCase() === "OPTION") {
		var p = t.parentNode;
		if (p.id === "s_head" || p.id === "s_body" || p.id === "s_arm" || p.id === "s_wst" || p.id === "s_leg" || p.id === "s_deco" || p.id === "s_cuff") SkillForm.setData(p.value,p.title);
	}
	/*@end@*/
});
addEvent(document,"click",
function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	switch (t.id) {
	case "c_input":
		SkillForm.dispInput();
		break;
	case "c_series":
		SkillForm.dispSeriesList(t.id);
		break;
	case "c_skill1":
	case "c_skill2":
	case "c_skill3":
		SkillForm.dispSkillList(t.id);
		break;
	case "c_minus":
		for (var i=0;i<7;SkillForm.c_cuff_lm.options[i++].text = (t.checked ? "±" : "+") + i);
		break;
	case "search_B":
		SkillForm.search();
		break;
	case "s_head":
	case "s_body":
	case "s_arm":
	case "s_wst":
	case "s_leg":
	case "s_deco":
	case "s_cuff":
		SkillForm.dispData(t.value,t.title,7);
		break;
	case "s_headYA":
	case "s_bodyYA":
	case "s_armYA":
	case "s_wstYA":
	case "s_legYA":
	case "s_decoYA":
	case "s_cuffYA":
		var w = t.id.substring(0,t.id.length-2);
		SkillForm.setData(SkillForm[w].value,SkillForm[w].title);
		break;
	case "sub_WinClear_B":
		SkillForm.clearSubWin();
		SkillForm.closeSubWin();
		break;
	case "sub_WinClose_B":
		SkillForm.closeSubWin();
		break;
	case "b_defimg":
		if (t.value === "防御耐性"){
			t.value = "画像";
			SkillForm.d_MF.style.display = SkillForm.d_MB.style.display = SkillForm.d_FF.style.display = SkillForm.d_FB.style.display = "none";
			SkillForm.def_Box.style.display = "";
		} else {
			t.value = "防御耐性";
			SkillForm.def_Box.style.display = "none";
			SkillForm.d_MF.style.display = SkillForm.d_MB.style.display = SkillForm.d_FF.style.display = SkillForm.d_FB.style.display = "";
		}
		break;
	case "b_gousyuB":
		t.value = t.value === "級別UPあり" ? "級別UP沒有" : "級別UPあり";
		SkillForm.calc();
		break;
	case "b_head":
	case "b_body":
	case "b_arm":
	case "b_wst":
	case "b_leg":
		SkillForm.dispData(t.value.substring(0,4),t.id.substring(2),t.value.substring(5,6));
		break;
	case "b_headLv":
	case "b_bodyLv":
	case "b_armLv":
	case "b_wstLv":
	case "b_legLv":
		SkillForm.dispData(SkillForm["b_"+t.title].value.substring(0,4),SkillForm["b_"+t.title].id.substring(2),SkillForm["b_"+t.title].value.substring(5,6));
		break;
	case "b_save":
		SkillForm.b_skill.value = SkillForm.creText().replace(/<br>/g,"\n");
		var tg = document.getElementById("f3");
		tg.action = "http://hpcgi2.nifty.com/ferias/download.cgi";
		tg.encoding = "application/x-www-form-urlencoded";
		tg=null;
		break;
	case "b_text":
		var f4=window.open("","");
		f4.document.open("text/html; charset=Shift_JIS");
		f4.document.write("<font face='ＭＳ 哥德'><pre>");
		f4.document.write(SkillForm.creText());
		f4.document.write("</pre>");
		f4.document.close();
		f4=null;
		break;
	case "c_gohu":
	case "c_tume":
	case "c_soko":
	case "c_kizuna":
		SkillForm.calcDef();
		break;
	case "c_buki":
		t.select();
		break;
	default:
		if (t.id.substring(0,5) === "c_rep") {
			t.style.backgroundColor = t.style.backgroundColor ? "" : "gray";
		} else if (t.id.lastIndexOf("S1") !== -1 || t.id.lastIndexOf("S2") !== -1 || t.id.lastIndexOf("S3") !== -1) {
			if (t.disabled) return;
			SkillForm.dispData(SkillForm[t.id+"_data"],"deco",1);
			SkillForm.dispDecoList(t.id);
		} else if (t.tagName.toUpperCase() === "INPUT" && t.type.toUpperCase() === "BUTTON") {
//				ボタンなのになにも処理がないなら小画面
			SkillForm.setInput(t.name.substring(5),t.value);
			SkillForm.closeSubWin();
		} else {
			SkillForm.closeSubWin();
		}
		/*@if (true)
		@else@*/
		if (t.tagName.toUpperCase() === "OPTION") {
			var p = t.parentNode;
			if (p.id === "s_head" || p.id === "s_body" || p.id === "s_arm" || p.id === "s_wst" || p.id === "s_leg" || p.id === "s_deco" || p.id === "s_cuff") SkillForm.dispData(p.value,p.title,7);
		}
		/*@end@*/
	}
});
var change_event = function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
//			SkillForm.change_event(t.id);
	switch (t.id) {
	case "c_hr":
		if (SkillForm.b_head.length > 1) SkillForm.cngData("head");
		if (SkillForm.b_body.length > 1) SkillForm.cngData("body");
		if (SkillForm.b_arm.length > 1) SkillForm.cngData("arm");
		if (SkillForm.b_wst.length > 1) SkillForm.cngData("wst");
		if (SkillForm.b_leg.length > 1) SkillForm.cngData("leg");
		if (+SkillForm.c_hr.value <=50){
			SkillForm.cngSlot("O","b_cuffS1");
			SkillForm.cngSlot("O","b_cuffS2");
			SkillForm.calc();
			SkillForm.b_cuffS1.disabled = SkillForm.b_cuffS2.disabled = 1;
		} else {
			SkillForm.b_cuffS1.disabled = SkillForm.b_cuffS2.disabled = 0;
		}
		break;
	case "b_head":
	case "b_body":
	case "b_arm":
	case "b_wst":
	case "b_leg":
		SkillForm.cngData(t.id.substring(2));
		SkillForm.calc();
		break;
	case "b_headLv":
	case "b_bodyLv":
	case "b_armLv":
	case "b_wstLv":
	case "b_legLv":
		SkillForm.cngLv(t.title);
		SkillForm.cngData(t.title);
		SkillForm.calc();
		break;
	case "b_read":
		var tg = document.getElementById("f3");
		tg.action = "http://hpcgi2.nifty.com/ferias/upload.cgi";
		tg.encoding = "multipart/form-data";
		tg.submit();
		tg=null;
		break;
	case "c_G_Que":
		SkillForm.cngFueExe();
	case "c_G_Fit":
		SkillForm.calc();
	case "c_mesi":
	case "c_sr":
	case "c_tane":
	case "c_drink":
	case "c_fueDEF":
	case "c_fueDEFup":
	case "c_fueTAI":
	case "c_buki":
	case "c_katsu":
		SkillForm.calcDef();
		break;
	}
}
addEvent(document.getElementById("c_hr"),"change",change_event);
addEvent(document.getElementById("b_head"),"change",change_event);
addEvent(document.getElementById("b_body"),"change",change_event);
addEvent(document.getElementById("b_arm"),"change",change_event);
addEvent(document.getElementById("b_wst"),"change",change_event);
addEvent(document.getElementById("b_leg"),"change",change_event);
addEvent(document.getElementById("b_headLv"),"change",change_event);
addEvent(document.getElementById("b_bodyLv"),"change",change_event);
addEvent(document.getElementById("b_armLv"),"change",change_event);
addEvent(document.getElementById("b_wstLv"),"change",change_event);
addEvent(document.getElementById("b_legLv"),"change",change_event);
addEvent(document.getElementById("b_read"),"change",change_event);

addEvent(document.getElementById("c_mesi"),"change",change_event);
addEvent(document.getElementById("c_sr"),"change",change_event);
addEvent(document.getElementById("c_tane"),"change",change_event);
addEvent(document.getElementById("c_drink"),"change",change_event);
addEvent(document.getElementById("c_fueDEF"),"change",change_event);
addEvent(document.getElementById("c_fueDEFup"),"change",change_event);
addEvent(document.getElementById("c_G_Que"),"change",change_event);
addEvent(document.getElementById("c_G_Fit"),"change",change_event);
addEvent(document.getElementById("c_G_Fit"),"change",change_event);
addEvent(document.getElementById("c_katsu"),"change",change_event);
addEvent(document.getElementById("c_buki"),"change",change_event);

addEvent(document.getElementById("sub_WinBody"),"mouseover",
function (evt) {
	if (SkillForm.sub_Win_id.lastIndexOf("S1") !== -1 ||
		SkillForm.sub_Win_id.lastIndexOf("S2") !== -1 ||
		SkillForm.sub_Win_id.lastIndexOf("S3") !== -1) {
		/*@if (true)
		var t = evt.srcElement;
		@else@*/
		var t = evt.target;
		/*@end@*/
		if (t.tagName.toUpperCase() === "INPUT") SkillForm.dispData(t.name.substring(5),"deco",1);
	}
});
})();
