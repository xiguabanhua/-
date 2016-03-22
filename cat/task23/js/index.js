window.onload = function(){

	//用户名校验规则配置 
	var regName = new ruleMaker();
	regName.setting={
		node: document.getElementById('regName'),
		errEle:document.getElementById('regName_error'),
		type : "input",
		rules :[validateRules.isUserName,{min:4,max:20}],
		Msg:validateMsg.regName
	} 
	regName.useValidator(validator1);


	//密码校验规则配置
	var pwd = new ruleMaker();
	pwd.setting={
		node: document.getElementById('regPwd'),
		errEle:document.getElementById('regPwd_error'),
		type : "input",
		rules :[validateRules.isPwd,{min:6,max:20}],
		Msg:validateMsg.regPwd,
	}
	pwd.useValidator(validator1);

	//重复密码校验规则配置
	var rePwd = new ruleMaker();
	rePwd.setting={
		node: document.getElementById('rePwd'),
		errEle:document.getElementById('rePwd_error'),
		type : "input",
		rules :[validateRules.isPwd,{min:6,max:20},validateRules.isPwdRepeat],
		Msg:validateMsg.rePwd
	}
	rePwd.useValidator(validator3);

	// 手机号码校验配置
	var phone = new ruleMaker();
	phone.setting={
		node: document.getElementById('regPhone'),
		errEle:document.getElementById('regPhone_error'),
		type : "input",
		rules :[validateRules.isMobile,{min:11,max:11}],
		Msg:validateMsg.regPhone,
	}
	phone.useValidator(validator1);

	// 邮箱校验配置
	var mail = new ruleMaker();
	mail.setting={
		node: document.getElementById('regMail'),
		errEle:document.getElementById('regMail_error'),
		type : "input",
		rules :[validateRules.isEmail],
		Msg:validateMsg.regMail,
	}
	mail.useValidator(validator2);

	checkAll();
}
// 建立表单校验规则工厂
var factory = function(){};
factory.prototype={
	useValidator : function(validator){
		throw new Error( " Unsupported " );
	}
}

ruleMaker = function(){
	// 表单配置
	this.setting=
	{
		node: null,
		errEle:null,
		type : "input",
		rules :[],
		Msg:null,
	}
};
ruleMaker.prototype = new factory();
// 校验器选择函数
ruleMaker.prototype.useValidator=function (validator) {
	validator(this.setting);
}

// 校验规则正则表达式
var validateRegExp = {
	username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$",
    // 户名
    mobile: "^0?(13|15|18|14|17)[0-9]{9}$",
    // 手机
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
    // 邮件
    password: "^.*[A-Za-z0-9\\w_-]+.*$",
    // 密码
}

// 校验规则
var validateRules = {
	isEmtry : function(str){
		return (str == ""|| typeof str !="string");
	},
	isUserName: function(str){
		return new RegExp(validateRegExp.username).test(str);
	},
	betweenLength:function(str,min,max){
		return (str.length >= min && str.length <= max);
	},
	isPwd:function (str) {
		return new RegExp(validateRegExp.password).test(str);
	},
	isPwdRepeat: function(str1, str2) {
        return (str1 == str2);
    },
	isMobile:function (str) {
		return new RegExp(validateRegExp.mobile).test(str);
	},
	isEmail:function(str){
		return new RegExp(validateRegExp.email).test(str);
	},
}

// 每个输入栏的校验状态设置
// 检验状态分为：错误error，成功succeed,和获得焦点onFocus
var validateStatus = {
	error : {
		run: function (node,Msg) {
			node.className="error";
			node.innerHTML=Msg;
		}
	},

	succeed : {
		run:function (node) {
			node.className="succeed";
			node.innerHTML="";
		}
	},

	onFocus :{
		run:function (node,Msg) {
			node.className="focus";
			node.innerHTML=Msg;
		}
	}
}

// 校验提示信息
var validateMsg = {
	regName:{
		onFocus:"4-20位字符,支持汉字、字母、数字及\"-\"、\"_\"组合",
		succeed:"",
		isNull:"请输入用户名",
		error:{
			badFormat:"用户名只能由中文、英文、数字及\"-\"、\"_\"组成",
			badLength:"用户名长度只能在4-20位字符之间",			
		},
	},
	regPwd:{
		onFocus:"6-20位字符，建议由字母，数字和符号两种以上组合",
		succeed:"",
		isNull:"请输入密码",
		error:{
			badLength: "密码长度只能在6-20位字符之间",
            badFormat: "密码只能由英文、数字及标点符号组成",
		},
	},
	rePwd:{
		onFocus:"请再次输入密码",
		succeed:"",
		isNull:"请再次输入密码",
		error:{
			badLength: "密码长度只能在6-20位字符之间",
            badFormat: "密码只能由英文、数字及标点符号组成",
			badFormat2:"两次输入密码不一致",
		},
	},
	regMail:{
		onFocus:"输入绑定账户的邮箱",
		succeed:"",
		isNull:"邮箱不能为空",
		error:{
			badFormat:"邮箱格式不对",
		},
	},
	regPhone:{
		onFocus:"请输入您的手机号码",
		succeed:"",
		isNull:"手机号码不能为空",
		error:{
			badLength:"手机号码长度必须为11",
			badFormat:"手机号码格式有误，请输入正确的手机号",
		}
	},
}

// 校验器一：进行非空校验，规则校验，长度校验
var validator1 = function(nodeSetting) {
	
	// 表单项失去焦点,对输入进行数据校验
	nodeSetting.node.onblur = function () {
		// 当表单输入为空，执行错误检验状态函数，将errorEle样式置为error,
		// 错误信息为regName.isNull
		if (validateRules.isEmtry(nodeSetting.node.value)) {
			validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.isNull);
		}
		// 当表单输入不为空，对输入数据进行格式校验
		else if(nodeSetting.rules[0](nodeSetting.node.value)){
			// 输入格式正确，对输入数据进行长度校验
			var min = nodeSetting.rules[1].min;
			var max = nodeSetting.rules[1].max;
			if(validateRules.betweenLength(nodeSetting.node.value,min,max))
				{
					// 输入格式正确，长度正确，判断数据检验正确
					// 执行正确检验状态函数，将errEle样式置为succeed
					validateStatus.succeed.run(nodeSetting.errEle);
				}
			// 输入数据长度错误，执行错误检验状态函数，将errorEle样式置为error,
			// 错误信息为regName.badLength
			else {
				validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.error.badLength);
				}
		}
		// 输入格式错误，执行错误检验状态函数，将errorEle样式置为error,
		// 错误信息为regName.badFormat
		else
			{
				validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.error.badFormat);
			}
	}
	// 表单获得焦点，执行聚焦状态函数，将errorEle样式置为focus
	// 提示信息为regName.onFocus
	nodeSetting.node.onfocus = function() {
		validateStatus.onFocus.run(nodeSetting.errEle,nodeSetting.Msg.onFocus);
	}

}

// 校验器二：进行非空校验，规则校验
var validator2 = function(nodeSetting) {
	
	// 表单项失去焦点,对输入进行数据校验
	nodeSetting.node.onblur = function () {
		// 当表单输入为空，执行错误检验状态函数，将errorEle样式置为error,
		// 错误信息为regName.isNull
		if (validateRules.isEmtry(nodeSetting.node.value)) {
			validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.isNull);
		}
		// 当表单输入不为空，对输入数据进行格式校验
		else if(nodeSetting.rules[0](nodeSetting.node.value))
				{
					// 输入格式正确，长度正确，判断数据检验正确
					// 执行正确检验状态函数，将errEle样式置为succeed
					validateStatus.succeed.run(nodeSetting.errEle);
				}
		// 输入格式错误，执行错误检验状态函数，将errorEle样式置为error,
		// 错误信息为regName.badFormat
		else
			{
				validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.error.badFormat);
			}
	}
	// 表单获得焦点，执行聚焦状态函数，将errorEle样式置为focus
	// 提示信息为regName.onFocus
	nodeSetting.node.onfocus = function() {
		validateStatus.onFocus.run(nodeSetting.errEle,nodeSetting.Msg.onFocus);
	}

}

// 校验器三：针对非空校验，规则校验，长度校验，重复密码校验
var validator3= function(nodeSetting) {
	
	// 表单项失去焦点,对输入进行数据校验
	nodeSetting.node.onblur = function () {
		// 当表单输入为空，执行错误检验状态函数，将errorEle样式置为error,
		// 错误信息为regName.isNull
		if (validateRules.isEmtry(nodeSetting.node.value)) {
			validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.isNull);
		}
		// 当表单输入不为空，对输入数据进行格式校验
		else if(nodeSetting.rules[0](nodeSetting.node.value)){
			// 输入格式正确，对输入数据进行长度校验
			var min = nodeSetting.rules[1].min;
			var max = nodeSetting.rules[1].max;
			if(validateRules.betweenLength(nodeSetting.node.value,min,max))
				{
					var pwd = document.getElementById('regPwd').value;
					var rePwd = document.getElementById('rePwd').value;
					if(nodeSetting.rules[2](pwd,rePwd))
					{
						validateStatus.succeed.run(nodeSetting.errEle);
					}else
					{
						validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.error.badFormat2);
					}
				}
			// 输入数据长度错误，执行错误检验状态函数，将errorEle样式置为error,
			// 错误信息为regName.badLength
			else {
				validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.error.badLength);
				}
		}
		// 输入格式错误，执行错误检验状态函数，将errorEle样式置为error,
		// 错误信息为regName.badFormat
		else
			{
				validateStatus.error.run(nodeSetting.errEle,nodeSetting.Msg.error.badFormat);
			}
	}
	// 表单获得焦点，执行聚焦状态函数，将errorEle样式置为focus
	// 提示信息为regName.onFocus
	nodeSetting.node.onfocus = function() {
		validateStatus.onFocus.run(nodeSetting.errEle,nodeSetting.Msg.onFocus);
	}

}
// 阻止事件传播
function preventDefault (event) {
	if(event && event.preventDefault)
		event.preventDefault();
	else window.returnValue=false;
}
// 表单提交时，检查所有表单
var checkAll =function () {
	var submitBtn = document.getElementById('s1');
	var inputList = document.getElementsByTagName('label');	
	submitBtn.onclick=function () {
		var flag = true;
		for(var i in inputList)
		{
			if(inputList[i].className==""||inputList[i].className=="error")
				flag=false;
		}
		if(!flag){
			preventDefault(event);
			alert("对不起，表单填写错误");
		}else{
			alert("表单填写正确！");
		}
	}
}