/*Zepto v1.2.0*/
/* 1-939 */
/*整体上的自调用匿名函数，是避免与其他模块变量/方法 污染。降低与其他模块的耦合度。‘高内聚，低耦合’的设计
尽量在prototype上定义变量和方法，让每个Zepto对象继承，大幅降低每个Zepto对象的内存。*/
(function(global, factory) {

}(this, function(window){
	// 构建Zepto
	var Zepto = (function(){

	})();
	/* 941 挂载Zepto到window上*/
	window.Zepto = Zepto;

	/* 942 如果$未定义则挂载到window上 */
	window.$ === undefined && ( window.$ = Zepto);

	/* 944-1214 */
	;(function($){

	})(Zepto)

	/* 1216-1594 */
	;(function($){

	})(Zepto)

	/* 1596-1631 */
	;(function($){

	})(Zepto)

	/* 1633-1650 ???*/
	;(function($){

	})()
	return Zepto;
})();

