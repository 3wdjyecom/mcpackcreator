// 全局存储转换后的封面图片Blob
let coverImageBlob = null;

function handleFileSelect(event) {
    // 获取上传的文件
    const file = event.target.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }

    // 验证文件类型（仅允许图片）
    const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        alert('请上传有效的图片文件（JPG/PNG/BMP/GIF）');
        return;
    }

    const reader = new FileReader();
    // FileReader读取文件完成后的回调
    reader.onload = function(e) {
        const img = new Image();
        // 图片加载完成后的回调
        img.onload = function() {
            // 1. 创建Canvas并绘制图片
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // 2. 将Canvas内容转为PNG格式的Blob（核心转换步骤）
            canvas.toBlob(function(blob) {
                // 保存Blob到全局变量，供打包使用
                coverImageBlob = blob;
                alert('封面图片已转换完成！');
            }, 'image/png'); // 指定转换格式为PNG
        };
        // 设置图片源为FileReader读取的文件数据
        img.src = e.target.result;
    };
    // 以DataURL格式读取上传的文件
    reader.readAsDataURL(file);
}
console.log("椎叶䌷也可爱捏");