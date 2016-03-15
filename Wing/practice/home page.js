/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-06 10:55:37
 * @version $Id$
 */
function getStyle(obj, name) {
	if(obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, false)[name];
	}
}

function startMove(obj, attr, iTarget, cSpeed) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var cur = 0;
		if (attr == 'opacity') {
			cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
		} else {
			cur = parseInt(getStyle(obj, attr));
		}

		var speed = (iTarget - cur) / cSpeed;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		if (cur == iTarget) {
			clearInterval(obj.timer);
		} else {
			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
				obj.style.opacity = (cur + speed) / 100;
			} else {
				obj.style[attr] = cur+speed + 'px';
			}
		}
	}, 30);
}

function getByClass(oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	for(var i=0; i<aEle.length; i++) {
		if (aEle[i].className == sClass) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

// 提交表单时校验表单
function onSubmitCheck() {
	var oEmail = document.getElementById('iemail');
	//邮箱地址校验reg
	var filter  = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/;
	if(oEmail.value == '') {
		alert('邮箱不能为空！');
		return false;
	}
	if(!filter.test(oEmail.value)) {
		alert('邮箱格式不正确！');
		return false;
	}
	return true;
}

window.onload = function() {
	var oUL = document.getElementById('playimages');
	var oBtnPrev = getByClass(oUL, 'prev')[0];
	var oBtnNext = getByClass(oUL, 'next')[0];
	var oDivPics = getByClass(oUL, 'pics')[0];
	var aPicsLi = oDivPics.getElementsByTagName('li');
	var oPicContent = document.getElementById('picContent');
	var oLPic = getByClass(oPicContent, 'Lpic')[0];
	var oMaskLayer = getByClass(oPicContent, 'maskLayer')[0];

	var oPic_plays = document.getElementById('pic_plays');
	var oHead = getByClass(oPic_plays,'head')[0];
	var aSmallLi = oHead.getElementsByTagName('li');
	var oPictures = getByClass(oPic_plays, 'pictures')[0];
	var aBigLi = oPictures.getElementsByTagName('li');

	var oEmail = document.getElementById('iemail');
	//邮箱地址校验reg
	var mail_reg  = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/;

	// var oShare = document.getElementById('ishare');
	// var aShareLi = oShare.getElementsByTagName('li');


	var nowZIndex01 = 2;
	var nowZIndex02 = 2;

	var nowIn01 = 0;
	var nowIn02 = 0;

	function bgToPrev01() {
		nowIn01 --;
		if(nowIn01 < 0) {
			nowIn01 = aPicsLi.length - 1;
		}
		aPicsLi[nowIn01].style.zIndex = nowZIndex01 ++;
		aPicsLi[nowIn01].style.left = '1280px';
		startMove(aPicsLi[nowIn01], 'left', 0, 6);
	}

	function bgToNext01() {
		nowIn01 = (nowIn01+1) % aPicsLi.length;
		aPicsLi[nowIn01].style.zIndex = nowZIndex01 ++;
		aPicsLi[nowIn01].style.left = '-1280px';
		startMove(aPicsLi[nowIn01], 'left', 0, 6);
	}

	oBtnPrev.onmouseover = function () {
		startMove(oBtnPrev, 'left', 40, 6);
	}
	oBtnPrev.onmouseout = function () {
		startMove(oBtnPrev, 'left', 60, 6);
	}
	oBtnNext.onmouseover = function () {
		startMove(oBtnNext, 'left', 1180, 6);
	}
	oBtnNext.onmouseout = function () {
		startMove(oBtnNext, 'left', 1160, 6);
	}

	setInterval(function() {
		bgToPrev01();
	}, 5000);

	oBtnPrev.onclick = function () {
		bgToPrev01();
	}

	oBtnNext.onclick = function () {
		bgToNext01();
	}

	oMaskLayer.onmouseover  = function () {
		startMove(oMaskLayer, 'opacity', 50, 15);
	}
	oMaskLayer.onmouseout  = function () {
		startMove(oMaskLayer, 'opacity', 0, 15);
	}


	for (var i = 0; i < aSmallLi.length; i++) {
		aSmallLi[i].index = i;
		aSmallLi[i].onclick = function () {
			if(nowIn02 == this.index) {
				return;
			}
			for (var j = 0; j < aSmallLi.length; j++) {
				aSmallLi[j].className = "";
			}
			this.className = 'active';
			nowIn02 = this.index;
			aBigLi[this.index].style.zIndex = nowZIndex02 ++;
			aBigLi[this.index].style.opacity = 0;
			aBigLi[this.index].style.filter = 'alpha(opacity: 0)';
			startMove(aBigLi[this.index], 'opacity', 100, 6);
		}
		aSmallLi[i].onmouseover = function () {
			startMove(this, 'width', 11, 6);
		}
		aSmallLi[i].onmouseout = function () {
			startMove(this, 'width', 10, 6);
		}
	}

	setInterval(function () {
		nowIn02 = (nowIn02+1) % aBigLi.length;
		aBigLi[nowIn02].style.zIndex = nowZIndex02 ++;
		aBigLi[nowIn02].style.opacity = 0;
		aBigLi[nowIn02].style.filter = 'alpha(opacity: 0)';
		startMove(aBigLi[nowIn02], 'opacity', 100, 6);
		for (var j = 0; j < aSmallLi.length; j++) {
				aSmallLi[j].className = "";
		}
		aSmallLi[nowIn02].className = 'active';
	}, 5000);
	oEmail.onkeyup = function() {
		if(oEmail.value=='' || !mail_reg.test(oEmail.value)) {
			oEmail.style.border = '1px solid #f00';
		} else {
			oEmail.style.border = '1px solid #fff';
		}
	}

	// for (var i = 0; i < aShareLi.length; i++) {
	// 	aShareLi[i].onmouseover = function () {
	// 		this.style.border = '1px solid #fff';
	// 		this.style.borderRaidus = '15px'
	// 	}
	// }
}