// 全局存储pack.mcmeta配置Blob
let packMcmetaBlob = null;

function generatePack() {
    var versionSelect = document.getElementById('version');
    // 将选中的字符串值转换为数字类型
    const selectedValue = Number(versionSelect.value);
    var fontStyleSelect = document.getElementById('fontstyle');
    const FontStylevalue = fontStyleSelect.options[fontStyleSelect.selectedIndex].id;
    
    console.log('当前选中的value值:', selectedValue);
    console.log('当前选中的字体样式值:', "§" + FontStylevalue + document.getElementById('description').value);
    
    const config = {
        "pack": {
            // 此时selectedValue是数字，JSON序列化后不会带引号
            "pack_format": selectedValue,
            "description": "§" + FontStylevalue + document.getElementById('description').value
        }
    };
    
    // 生成配置文件Blob并保存到全局
    packMcmetaBlob = new Blob([JSON.stringify(config, null, 2)], { type: "text/plain;charset=utf-8" });
    alert('配置文件已生成！');
}