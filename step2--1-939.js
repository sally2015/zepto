/*Zepto v1.2.0*/
/* 1-939 */
/*
* @param
* @global Window -- this
* @factory Function -- 使用高阶函数形式更快解析，先解析主体再解析参数的函数
*/
(function(global, factory) {

	/*主要检测是否使用了模块化,如果是则用define包裹，返回$引用*/
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return factory(gobal);
		});
	} else {
		factory(global);
	}

}(this, function(window){ // factory
	//构建Zepto对象
	var Zepto = (function(){

		/*9-17定义一些简写变量*/
		var undefined, key, $, classList,
			/*数组简写*/
			emptyArray = [],
			concat = emptyArray.concat,
			filter = emptyArray.filter,
			slice = emptyArray.slice,
			
			/*todo*/
			document = window.document,
			elementDisplay = {},
			classCache = {},
			 
			 /*设置CSS时，不用加px单位的属性*/
			cssNumber = {'colum-count': 1, 'colums': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1},
			
			/*正则表达式简写*/
			// HTML代码片断的正则, 匹配0个或多个空格 < 开始 (\w+|!)[^>]除了>的至少一个字符 *>0个或多个>结束
			fragmentRE = /^\s*<(\w+|!)[^>]*>/,  
			// (单)标签正则, 开始< (\w+)匹配多个字符并分组 \s*0个或多个空白 \/可能是单标签,(?:)组合但不记忆与该组匹配的字符，<\/\1> 相当于</ 前面匹配的第一个分组 > | 或空
			singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, 
			//匹配非单独一个闭合标签的标签，类似将<div></div>写成了<div/>, (?!负向先行断言,用以接下来的字符都不用匹配)
			tagExpanderRe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, 
			//根节点
			rootNodeRE = /^(?:body|html)$/i,
			//大写正则
			capitalRE = /[A-Z]/g,

			//需要提供get和set的方法名
    		// special attributes that should be get/set via method calls
    		mothodsAttributes = ['val', 'css', 'html','text', 'data', 'width', 'height', 'offset'],

    		//相邻节点的一些操作
    		adjacencyOperators = ['after', 'prepend', 'before', 'append'],
    		
    		//这里的用途是当需要给tr,tbody,thead,tfoot,td,th设置innerHTMl的时候，需要用其父元素作为容器来装载HTML字符串		
    		table = document.createElement('table'),
    		tableRow = document.createElement('tr'),
			containers = {
		      	'tr': document.createElement('tbody'),
		      	'tbody': table, 'thead': table, 'tfoot': table,
		      	'td': tableRow, 'th': tableRow,
		      	'*': document.createElement('div')
			},
			//当document ready的时候document会有以下三种状态的一种
			readyRE = /compelete|loaded|interactive/,
			//DOM标签正则
			simpleSelectorRE = /^[\w-]*$/,
			/*todo*/
			class2type = {},
			toString = class2type.toString,
			zepto = {},
			camelize, uniq,
			tempParent = document.createElement('div'),
			propMap = {
				'tabindex': 'tabIndex',
				'readonly': 'readOnly',
				'for': 'htmlFor',
				'class': 'className',
				'maxlength': 'maxLength',
				'cellspacing': 'cellSpacing',
				'cellpadding': 'cellPadding',
				'rowspan': 'rowSpan',
				'colspan': 'colSpan',
				'usemap': 'useMap',
				'frameborder': 'frameBorder',
				'contenteditable': 'contentEditable'
			},
			isArray = Array.isArray || function(object){ return object instanceof Array }
	
	//判断一个元素是否匹配给定的选择器, 例如element a, 是否符合a.btn,关于element.matches详见知识点matches.html
	zepto.matches = function(element, selector) {
		if (!selector || !element || element.nodeType !== 1) return false;
		//兼容matchesSelector方法
		var matchesSelector = element.matches || element.webkitMatchesSelector ||
							  element.mozMatchesSelector || element.oMatchesSelector||
							  element.matchesSelector;
		if (matchesSelector) return matchesSelector.call(element, selector);
		
		//如果浏览器不支持MatchesSelector方法，则将节点放入一个临时div节点，
    	//再通过selector来查找这个div下的节点集，再判断给定的element是否在节点集中，如果在，则返回一个非零(即非false)的数字
		var match, parent = element.parentNode, temp = !parent;

		//当element没有父节点，那么将其插入到一个临时的div里面
		if (temp) { (parent = tempParent).append(element); }

		//将parent作为上下文，来查找selector的匹配结果，并获取element在结果集的索引，不存在时为－1,再通过~-1转成0，存在时返回一个非零的值
		match = ~zepto.qsa(parent, selector).indexOf(element);

		//将插入的节点删掉
		temp && tempParent.removeChild(element);
		return match;
	}

	})(); // end Zepto 
	

})();