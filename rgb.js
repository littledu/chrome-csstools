;(function(){
    function $(id){
        return document.getElementById(id);
    }

    var inputr = $('inputr'),
        inputg = $('inputg'),
        inputb = $('inputb'),
        inputsix = $('inputsix'),
        changer = $('changer'),
        changel = $('changel'),
        tip = $('tip'),
        rgb = $('rgb'),
        six = $('six'),

        sixReg = /^#([0-9a-fA-F]{3}){1,2}$/;

    changer.addEventListener('click', function(){
        var vr = +inputr.value,
            vg = +inputg.value,
            vb = +inputb.value,
            result;

        if(!checkRGB(vr) || !checkRGB(vg) || !checkRGB(vb)) return;

        result = toColorSix(vr, vg, vb);
        inputsix.value = result;
        six.style.background = result;
        inputsix.select();
        tip.innerHTML = '';
    });

    changel.addEventListener('click', function(){
        var vsix = inputsix.value,
            result;

        if(!checkSix(vsix)) return;

        result = toColorRGB(vsix);
        inputr.value = result.r;
        inputg.value = result.g;
        inputb.value = result.b;
        rgb.style.background = vsix;
        inputr.select();
        tip.innerHTML = '';
    });

    function toColorRGB(val){
        var length = val.length,
            r, g, b;

        if(length === 7){
            r = parseInt(val.slice(1, 3), 16);
            g = parseInt(val.slice(3, 5), 16);
            b = parseInt(val.slice(5, 7), 16);
        }else{
            r = val.substr(1, 1);
            g = val.substr(2, 1);
            b = val.substr(3, 1);

            r = parseInt(r + r, 16);
            g = parseInt(g + g, 16);
            b = parseInt(b + b, 16);
        }

        return {
            r: r,
            g: g,
            b: b
        }
    }

    function toColorSix(vr, vg, vb){
        var r, g, b;

        r = vr.toString(16);
        g = vg.toString(16);
        b = vb.toString(16);

        if(r.length === 1) r = '0' + r;
        if(g.length === 1) g = '0' + g;
        if(b.length === 1) b = '0' + b;

        return '#' + r + g + b;
    }

    function checkSix(val){
        if(!sixReg.test(val)){
            tip.innerHTML = '骚年，16进制只能是0-9a-fA-F字符且只能是3位或者6位哦！';
            inputr.value = '';
            inputg.value = '';
            inputb.value = '';
            return false;
        }

        return true;
    }

    function checkRGB(val){

        if(val == ''){
            tip.innerHTML = '骚年，RGB要填完整哦！';
            inputsix.value = '';
            return false;
        }

        if(isNaN(val)){
            tip.innerHTML = '骚年，大小只能是数字哦！';
            inputsix.value = '';
            return false;
        }

        if(val < 0 || val > 255){
            tip.innerHTML = '骚年，RGB值只能在0-255之间哦！';
            inputsix.value = '';
            return false;
        }

        return true;
    }
})();