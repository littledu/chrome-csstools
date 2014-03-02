;(function(){
    //.ooxx{background-color: rgba(0,0,0,.3); filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#4C000000', endColorstr='#4C000000');}
    //:root .ooxx {filter:none;     /*处理IE9浏览器中的滤镜效果*/ }
    //Math.floor(a * 255).toString(16)

    var color = document.getElementById('color'),
        opacity = document.getElementById('opacity'),
        ooxx = document.getElementById('ooxx'),

        btn = document.getElementById('btn'),
        code = document.getElementById('code'),
        tip = document.getElementById('tip'),

        nameVal = '.ooxx',
        colorVal = '#000',
        opacityVal = '0.3',
        rgb = 'rgba(0,0,0,.3)',
        frgb = '',
        rgbaCss = '';

    

    color.onchange = function(){
        if(!checkColor() ) return;

        run();
    }

    opacity.onchange = function(){
        if(!checkOpacity() ) return;

        run();
    }

    btn.onclick = function(){
        code.select();
    }

    function checkColor(){
        tip.innerHTML = '';
        var reg = /^#([0-9a-fA-F]{3}){1,2}$/;
        colorVal = '#' + color.value;

        if(!reg.test(colorVal)){
            //showTri.style.cssText = '';
            tip.innerHTML = '骚年，颜色只能是0-9a-zA-Z字符且只能是3位或者6位哦！';
            code.value = '';
            return false;
        }

        return true;
    }

    function checkOpacity(){
        tip.innerHTML = '';

        opacityVal = parseFloat(opacity.value);

        if(!opacityVal){
            tip.innerHTML = '骚年，请输入数字，且是小数！';
            code.value = '';
            return false;
        }else if(opacityVal > 1){
            tip.innerHTML = '骚年，你觉得透明度大于1有意义么！';
            code.value = '';
            return false;
        }

        return true;
    }

    function parseColor(val){
        var r, g, b;
        
        var len = val.length;

        if(len === 7){
            r = parseInt(val.slice(1, 3), 16);
            g = parseInt(val.slice(3, 5), 16);
            b = parseInt(val.slice(5), 16);
        }else if(len === 4){
            r = parseInt(val.charAt(1) + val.charAt(1), 16);
            g = parseInt(val.charAt(2) + val.charAt(2), 16);
            b = parseInt(val.charAt(3) + val.charAt(3), 16);
        }
            
        return {
            r : r,
            g : g,
            b : b
        }
    }

    function parseRGB(){
        var color,
            len = colorVal.length

        if(len === 4){
            color = colorVal.charAt(1) + colorVal.charAt(1) + colorVal.charAt(2) + colorVal.charAt(2) + colorVal.charAt(3) + colorVal.charAt(3);
        }else{
            color = colorVal.substring(1);
        }

        return color;
    }

    function run(){
        var rgbObj = parseColor(colorVal);

        rgb = 'rgba(' + rgbObj.r +',' + rgbObj.g + ',' + rgbObj.b +',' + opacityVal + ')';

        frgb = '#' + Math.floor(opacityVal * 255).toString(16) + parseRGB();
        rgbaCss = '.ooxx{background-color: ' + rgb + '; filter:progid:DXImageTransform.Microsoft.gradient(enabled=\'true\',startColorstr=\''+ frgb + '\', endColorstr=\'' + frgb + '\');}\n:root .ooxx{filter:none;}';

        code.value = rgbaCss;
        ooxx.style.cssText = 'background-color:' + rgb;
    }

    run();
})();