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

window.onload = function() {
	var oUL = document.getElementById('playimages');
	var oBtnPrev = getByClass(oUL, 'prev')[0];
	var oBtnNext = getByClass(oUL, 'next')[0];
	var oDivPics = getByClass(oUL, 'pics')[0];
	var aPicsLi = oDivPics.getElementsByTagName('li');
	var oPicContent = document.getElementById('picContent');
	var oLPic = getByClass(oPicContent, 'Lpic')[0];
	var oMaskLayer = getByClass(oPicContent, 'maskLayer')[0];

	var nowZIndex = 2;

	var now = 0;

	function bgToPrev() {
		now --;
		if(now < 0) {
			now = aPicsLi.length - 1;
		}
		aPicsLi[now].style.zIndex = nowZIndex ++;

		//  aPicsLi[now].style.opacity = 0;
		//  aPicsLi[now].style.filter = 'alpha(opacity: 0)';
		// startMove(aPicsLi[now], 'opacity', 100, 20);

		aPicsLi[now].style.left = '1280px';
		startMove(aPicsLi[now], 'left', 0, 6);
	}

	function bgToNext() {
		now = (now+1) % aPicsLi.length;
		aPicsLi[now].style.zIndex = nowZIndex ++;

		// aPicsLi[now].style.opacity = 0;
		// aPicsLi[now].style.filter = 'alpha(opacity: 0)';
		// startMove(aPicsLi[now], 'opacity', 100, 20);

		aPicsLi[now].style.left = '-1280px';
		startMove(aPicsLi[now], 'left', 0, 6);
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
		bgToPrev();
	}, 5000);

	oBtnPrev.onclick = function () {
		bgToPrev();
	}

	oBtnNext.onclick = function () {
		bgToNext();
	}

	oMaskLayer.onmouseover  = function () {
		startMove(oMaskLayer, 'opacity', 50, 15);
	}
	oMaskLayer.onmouseout  = function () {
		startMove(oMaskLayer, 'opacity', 0, 15);
	}


}