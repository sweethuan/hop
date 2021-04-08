const picCop = (id,widths,fn) => {
    var oInput = document.getElementById(id)
    // var oImg = document.getElementById("img");
    oInput.onchange = function () {
        var fileData = oInput.files[0];
        if(oInput.files.length==0){//监听没有选择文件事件（点击取消事件）
            body.removeChild(oInput);
        }else{
            base64(fileData, function (base64Data) {
                //base64Data:处理成功返回的图片base64
                // console.log(base64Data)
                fn(base64Data)
                // return base64Data
                // oImg.setAttribute("src", base64Data);
                let body=document.getElementsByTagName('body')[0]
              
            });
        }
       
    }

    function base64(file, backData) {
        /*
         * file:input上传图片
         * backData：处理完成回调函数
         * */
        var reader = new FileReader();
        var image = new Image();
        var canvas = createCanvas();
        var ctx = canvas.getContext("2d");
        reader.onload = function () { // 文件加载完处理
            var result = this.result;
            image.onload = function () { // 图片加载完处理
                var imgScale = imgScaleW(widths, this.width, this.height);
                canvas.width = imgScale.width;
                canvas.height = imgScale.height;
                ctx.drawImage(image, 0, 0, imgScale.width, imgScale.height);
                var dataURL = canvas.toDataURL('image/jpeg'); // 图片base64
                ctx.clearRect(0, 0, imgScale.width, imgScale.height); // 清除画布
                // console.log(dataURL)
                backData(dataURL); //dataURL:处理成功返回的图片base64
            }
            image.src = result;
        };
 
        reader.readAsDataURL(file);
    }

    function createCanvas() { // 创建画布
        var canvas = document.getElementById('canvas');
        if (!canvas) {
            var canvasTag = document.createElement('canvas');
            canvasTag.setAttribute('id', 'canvas');
            canvasTag.setAttribute('style', 'display:none;');//隐藏画布
            document.body.appendChild(canvasTag);
            canvas = document.getElementById('canvas');
        }
        return canvas;
    }

    function imgScaleW(maxWidth, width, height) {
        /* maxWidth:宽度或者高度最大值
         * width：宽度
         * height：高度
         * */
        var imgScale = {};
        var w = 0;
        var h = 0;
        if (width <= maxWidth && height <= maxWidth) { // 如果图片宽高都小于限制的最大值,不用缩放
            imgScale = {
                width: width,
                height: height
            }
        } else {
            if (width >= height) { // 如果图片宽大于高
                w = maxWidth;
                h = Math.ceil(maxWidth * height / width);
            } else {     // 如果图片高大于宽
                h = maxWidth;
                w = Math.ceil(maxWidth * width / height);
            }
            imgScale = {
                width: w,
                height: h
            }
        }
        return imgScale;
    }

}

export default picCop;