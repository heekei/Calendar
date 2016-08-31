//国际节假日数组obj_Ftv=["日期","节日名"] 数据来源：网络
var sFtv = new Array("0101,元旦节","0202,湿地日","0210,气象节","0214,情人节","0301,海豹日","0303,全国爱耳日","0305,雷锋纪念日","0308,妇女节","0312,植树节","0314,警察日","0315,消费者权益日","0317,中国国医节","0321,森林日,消除种族歧视日","0322,水日","0323,气象日","0324,防治结核病日","0325,安全教育日","0401,愚人节","0407,卫生日","0422,地球日","0423,图书版权日","0501,劳动节","0504,青年节","0505,碘缺乏病日","0508,红十字日","0512,护士节","0515,家庭日","0517,电信日","0518,博物馆日","0523,牛奶日","0531,无烟日","0601,儿童节","0605,环保日","0606,爱眼日","0617,干旱日","0623,奥林匹克日","0625,土地日","0626,禁毒日","0701,建党节","0702,体育记者日","0707,抗日战争","0711,人口日","0801,建军节","0808,父亲节","0815,抗日胜利","0908,扫盲日","0909,毛泽东纪念日","0910,中国教师节","0914,清洁地球日","0916,臭氧层保护日","0918,九·一八","0920,爱牙日","0927,旅游日","0928,孔子诞辰","1001,国庆节","1002,和平日","1004,动物日","1006,老人节","1008,视觉日","1009,邮政日","1010,辛亥革命","1013,保健日","1014,标准日","1015,盲人日","1016,粮食日","1017,消除贫困日","1022,传统医药日","1024,联合国日","1031,勤俭日","1108,中国记者日","1109,消防安全日","1111,光棍节","1112,孙中山诞辰","1114,糖尿病日","1117,大学生节","1120,彝族年","1121,问候日","1201,艾滋病日","1203,残疾人日","1205,志愿者日","1208,儿童电视日","1209,足球日","1210,人权日","1212,西安事变","1213,南京大屠杀","1220,澳门回归","1221,篮球日","1224,平安夜","1225,圣诞节","1226,毛泽东诞辰");
var obj_Ftv = new Array(sFtv.length);
for(var i=0;i<obj_Ftv.length;i++){obj_Ftv[i]=new Array(2)}
for(var i=0;i<sFtv.length;i++){
	obj_Ftv[i]= sFtv[i].split(",");
}


$(document).ready(function(e) {
	
	//加载信息
	var d= new Date();
	var weeks=new Array("周日","周一","周二","周三","周四","周五","周六");
	var solarLTime=d.getFullYear()+"年"+ (d.getMonth()+1) +"月"+ d.getDate()+"日 "+ weeks[d.getDay()];
	var lunarTime=lunar.solar2lunar(d.getFullYear(),d.getMonth()+1,d.getDate());
	document.getElementById("todayInfo").innerHTML="<div class='solarLTime'>"+solarLTime+"</div>"
													+"<div class='today_date'>"+d.getDate()+"</div>"
													+"<div class='lunarTime'>"
														+"<p>"+lunarTime.IMonthCn+lunarTime.IDayCn+"</p>"
														+"<p>"+lunarTime.gzYear+"年【"+lunarTime.Animal+"年】"+"</p>"
														+"<p>"+ lunarTime.gzMonth+"月 "+lunarTime.gzDay +"日" +"</p>"
													+"</div>";
	//载入年份选择框
	var year_start=1900;
	var year_end=2050;
	var x=document.getElementById("yearList");
	var m=document.getElementById("monthList");
	for(var i =year_start;i<=year_end;i++){
		var y=document.createElement("option");
		y.value=i;
		y.text=i+"年";
		x.add(y,null);
	}
	//载入月份选择框
	for(var i =1;i<=12;i++){
		var n=document.createElement("option");
		n.value=i;
		n.text=i+"月";
		m.add(n,null);
	}
	//载入首行 周日至周六
	var week_row=document.getElementById("week");
	var week_tr=document.createElement("tr");
	week_row.appendChild(week_tr);
	for(var i =0;i<7;i++)
	{
		var a= document.createElement("td");
		a.innerHTML=weeks[i];
		a.className="firstRow_week";
		week_tr.appendChild(a);
	}
	week_row.appendChild(week_tr);
	//画出日历
	x.selectedIndex=d.getFullYear()-year_start;
	m.selectedIndex=d.getMonth();
	Calendar(d.getFullYear(),d.getMonth()+1,d.getDate());
	
	$("#yearList,#monthList").change(function(){
		Calendar($("#yearList").val(),$("#monthList").val(),d.getDate());
	});
	$("#pre_year").click(function(){
		if(x.selectedIndex>=1) x.selectedIndex-=1;
		Calendar($("#yearList").val(),$("#monthList").val(),d.getDate());
	});
	$("#next_year").click(function(){
		if(x.selectedIndex<=x.length-2) x.selectedIndex+=1;
		Calendar($("#yearList").val(),$("#monthList").val(),d.getDate());
	});
	$("#pre_month").click(function(){
		if(m.selectedIndex>=1) m.selectedIndex-=1;
		else m.selectedIndex=m.length-1;
		Calendar($("#yearList").val(),$("#monthList").val(),d.getDate());
	});
	$("#next_month").click(function(){
		if(m.selectedIndex<=m.length-2) m.selectedIndex+=1;
		else m.selectedIndex=0;
		Calendar($("#yearList").val(),$("#monthList").val(),d.getDate());
	});
	$("#backToday").click(function(){//返回今日
		x.selectedIndex=d.getFullYear()-year_start;
		m.selectedIndex=d.getMonth();
		Calendar(d.getFullYear(),d.getMonth()+1,d.getDate());
	});
	
});
/********************************日历加载显示********************************/
function Calendar(year,month,date){
	
		/*************根据年份和月份，返回当月的天数*************/
		this.countDays=function(year, month) {
			var days_in_months = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			
			if (1 == month) {
				return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28;
			}
			else {
				return days_in_months[month];
			}
		}
		
			
		/*************判断是否为国际节日**************/
		this.IsNationalFestival=function(month,date){
			//日期补零
			var shortDate="";
			if(month.toString().length==1){month="0"+month}
			if(date.toString().length==1){date="0"+date}
			shortDate=month+""+date;
			var n=0;
			for(var i in obj_Ftv){
				if(obj_Ftv[i][0]==shortDate){
					return obj_Ftv[i][1];
				}
			}
			return "";
		}
		
		/*************根据年月日获取节气*************/
		//二十四节气数组 数据来源：网络
		var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
		var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
		this.getJQ=function(yyyy,mm,dd){
			mm = mm-1;
			var tmp1 = new Date((31556925974.7*(yyyy-1900)+sTermInfo[mm*2+1]*60000)+Date.UTC(1900,0,6,2,5));
			var tmp2 = tmp1.getUTCDate();
			var solarTerms = "";
			if (tmp2==dd)
				solarTerms = solarTerm[mm*2+1];
			tmp1 = new Date((31556925974.7*(yyyy-1900)+sTermInfo[mm*2]*60000)+Date.UTC(1900,0,6,2,5));
			tmp2= tmp1.getUTCDate();
			if (tmp2==dd) 
				solarTerms = solarTerm[mm*2];
			return solarTerms;
		}
		// 获取农历月日
		var getLunarMonthDay = function(year,month,day){
			var l=lunar.solar2lunar(year,month,day);
			var md= l.IMonthCn+l.IDayCn;
			return md;
		};
		/****************绘制日历表开始****************/
		//日历绘制前，清空日历表
		var content= document.getElementById("calendar");
		content.innerHTML="";
		var rows_len=6;
		var cols_len=7;
		var d=new Date(year,month-1,1)
		var week = new Array();
		var n=1;//表格位置
		var m=d.getDay()+1;//日期位置起点
		var l= n-m+1;//日期
		var o = countDays(year,d.getMonth());//月份天数（日期位置终点）
		/****************循环创建日历表****************/
			for(var i=1;i<=rows_len;i++){//循环创建tr
				var tr=document.createElement("tr");
				tr.className="row_style";
				for(var j=1;j<=cols_len;j++){//循环创建td
					var td=document.createElement("td");
					if(n>=m && l<=o){
						td.innerHTML="<span class=\"date\">"+l+"</span>";
						td.className="normal_day";
						//判断是否是今天，是则为td添加ID=today
							if(l==date) td.id="today";
						//td中添加农历日期span
							var lunar_span= document.createElement("span");
							lunar_span.className="lunar_span";
							lunar_span.innerHTML=getLunarMonthDay(year,month,l);
							td.appendChild(lunar_span);
						//添加节假日span
							var h=IsNationalFestival(month,l);
							if(h!=""){
								td.className="fes_day";
								var national_Festival_span= document.createElement("span");
								national_Festival_span.className="national_Festival";
								national_Festival_span.innerHTML=h;
								td.appendChild(national_Festival_span);
							}else
							{
								var national_Festival_span= document.createElement("span");
								national_Festival_span.className="national_Festival";
								national_Festival_span.innerHTML="<br />";
								td.appendChild(national_Festival_span);
							}
						//添加节气span
							var jq=getJQ(year,month,l);
							if(jq!=""){
								td.className="jq_day";
								var jq_day_span= document.createElement("span");
								jq_day_span.className="jq_Festival";
								jq_day_span.innerHTML=jq;
								td.appendChild(jq_day_span);
							}else{
								var jq_day_span= document.createElement("span");
								jq_day_span.className="jq_Festival";
								jq_day_span.innerHTML="<br />";
								td.appendChild(jq_day_span);
							}
							
						tr.appendChild(td);
					}
					// else if(l>o) td.innerHTML="";
					else tr.appendChild(td);
					l++;
					n++;
				}
				content.appendChild(tr); 
			}
			/* 绑定每个日期的单击事件 */
			var preTD=null;//定义 “前一个单击过的TD” 变量为null;
			$("td.normal_day,td.fes_day,td.jq_day").bind("click",function(){
				if(preTD!=null) preTD.removeClass("selected");
				$(this).addClass("selected");
				preTD=$(this);
				var x=document.getElementById("yearList");
				var m=document.getElementById("monthList");
				var clkDay=new Date(x.value,m.value-1,$(this).find(".date").text());
				var weeks=new Array("周日","周一","周二","周三","周四","周五","周六");
				var solarLTime=clkDay.getFullYear()+"年"+ (clkDay.getMonth()+1) +"月"+ clkDay.getDate()+"日 "+ weeks[clkDay.getDay()];
				var lunarTime=lunar.solar2lunar(clkDay.getFullYear(),clkDay.getMonth()+1,clkDay.getDate());
				document.getElementById("todayInfo").innerHTML="<div class='solarLTime'>"+solarLTime+"</div>"
																+"<div class='today_date'>"+clkDay.getDate()+"</div>"
																+"<div class='lunarTime'>"
																	+"<p>"+lunarTime.IMonthCn+lunarTime.IDayCn+"</p>"
																	+"<p>"+lunarTime.gzYear+"年【"+lunarTime.Animal+"年】"+"</p>"
																	+"<p>"+ lunarTime.gzMonth+"月 "+lunarTime.gzDay +"日" +"</p>"
																+"</div>";
			}); 
			document.getElementById("today").click();
}
