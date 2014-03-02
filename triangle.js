;(function(){
    function $(id){
        return document.getElementById(id);
    }

    var size = $('size'),
        bgColor = $('bgColor'),
        fgColor = $('fgColor'),
        direction = $('direction'),
        btn = document.getElementsByClassName('btn'),
        showTri = $('showTri'),
        codeAreaH = $('codeAreaH'),
        codeAreaC = $('codeAreaC'),
        ch1 = '<i class="bor-c"></i>',
        ch2 = '<i class="bor-c"><span class="bor-i"></span></i>',
        borC = $('borC'),
        borI = $('borI'),
        tip = $('tip'),

        triCommonCss = 'width:0; height:0; font-size:0; display:inline-block; position:absolute;',
        bgCSS = '',
        fgCSS = '',
        sizeVal = 10,
        bgColorVal = '#000',
        fgColorVal = '#000',
        directionVal = 'up',
        isBorder = false,

        colorReg = /^#([0-9a-fA-F]{3}){1,2}$/,

        updateCss = function(){
            isBorder = bgColor.value;
            triWidth = 'border-width:' + sizeVal + 'px;';

            if(directionVal === 'up'){
                bgCSS = 'border-color:transparent transparent ' + bgColorVal + ' transparent; border-style: dashed dashed solid dashed; left: 0px; top: 0px;';
                fgCSS = 'border-color:transparent transparent ' + fgColorVal + ' transparent; border-style: dashed dashed solid dashed; left: ' + -sizeVal + 'px; top: ' + (-sizeVal+1) + 'px;';
            }else if(directionVal === 'down'){
                bgCSS = 'border-color:' + bgColorVal + ' transparent transparent transparent; border-style:solid dashed dashed dashed; left: 0px; top: 0px;';
                fgCSS = 'border-color:' + fgColorVal + ' transparent transparent transparent; border-style:solid dashed dashed dashed; left: ' + -sizeVal + 'px; top: ' + (-sizeVal-1) + 'px;';
            }else if(directionVal === 'left'){
                bgCSS = 'border-color: transparent ' + bgColorVal + ' transparent transparent; border-style: dashed solid dashed dashed; left: 0px; top: 0px;';
                fgCSS = 'border-color: transparent ' + fgColorVal + ' transparent transparent; border-style: dashed solid dashed dashed; left: ' + (-sizeVal+1) + 'px; top: ' + -sizeVal + 'px;';
            }else{
                bgCSS = 'border-color:transparent transparent transparent ' + bgColorVal + '; border-style: dashed dashed dashed solid; left: 0px; top: 0px;';
                fgCSS = 'border-color:transparent transparent transparent ' + fgColorVal + '; border-style: dashed dashed dashed solid; left: ' + (-sizeVal-1) + 'px; top: ' + -sizeVal + 'px;';
            }
        };

    direction.onchange = function(){
        reset();
        directionVal = this.value;
        create();
    }

    size.onchange = function(){
        reset();
        if(!checkSize() ) return;
        create();
    }

    bgColor.onchange = function(){
        reset();
        bgColorVal = bgColor.value;
        bgColorVal = bgColorVal ?  '#' + bgColorVal : '#000';

        if(!checkColor(bgColorVal)) return;
        create();
    }

    fgColor.onchange = function(){
        reset();
        fgColorVal = fgColor.value;

        if(fgColorVal == ''){
            tip.innerHTML = '骚年，三角不能没有颜色哦！';
            return;
        }
        fgColorVal = '#' + fgColorVal;

        if(!checkColor(fgColorVal)) return;
        create();
    }

    function checkSize(){
        sizeVal = +size.value;

        if(isNaN(sizeVal)){
            tip.innerHTML = '骚年，大小只能是数字哦！';
            return false;
        }

        if(sizeVal > 100 && sizeVal <= 200){
            tip.innerHTML = '嘿哟，骚年，这个三角有够大的哦！';
        }else if(sizeVal > 200 && sizeVal <= 250){
            tip.innerHTML = '可以了孩子，三角够大了！';
        }if(sizeVal > 250){
            showTri.style.cssText = '';
            tip.innerHTML = '设这么大？你是来捣乱的吧，信不信我抽你！';
            return false;
        }

        return true;
    }

    function checkColor(val){
        if(!colorReg.test(val)){
            showTri.style.cssText = '';
            tip.innerHTML = '骚年，颜色只能是0-9a-fA-F字符且只能是3位或者6位哦！';
            return false;
        }

        return true;
    }

    for(var i = 0, len = btn.length; i < len; i++){
        (function(i){
            btn[i].onclick = function(){
                this.nextSibling.select();
            }
        })(i);
    }

    function reset(){
        showTri.style.cssText = '';
        borC.style.cssText = '';
        borI.style.cssText = '';
        tip.innerHTML = '';
        codeAreaC.value = '';
    }

    function create(){
        
        updateCss();

        if(isBorder){
            codeAreaH.value = ch2;

            codeAreaC.value = '.bor-c{' + triCommonCss + bgCSS + triWidth + '}\n.bor-i{' +  triCommonCss + fgCSS + triWidth + '}';
            borC.style.cssText = triCommonCss + bgCSS + triWidth;
            borI.style.cssText = triCommonCss + fgCSS + triWidth;
        }else{
            codeAreaH.value = ch1;

            fgCSS = fgCSS.replace(/left:(.*)px; top: (.*)px/, 'left: 0px; top: 0px;');
            codeAreaC.value = '.bor-c{' + triCommonCss + fgCSS + triWidth + '}';
            showTri.style.cssText = triCommonCss + fgCSS + triWidth + 'left: 0px; top: 0px';
        }
        
    }

    create();
})();