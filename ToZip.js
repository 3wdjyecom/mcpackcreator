// 核心打包函数
async function tozip() {
    // 2. 先生成配置文件
    generatePack();
    if (!packMcmetaBlob) {
        alert('配置文件生成失败，请检查输入！');
        return;
    }

    try {
        // 3. 初始化JSZip实例
        const zip = new JSZip();
        // 创建资源包目录结构：assets/minecraft/sounds/records
        const recordsFolder = zip.folder("assets/minecraft/sounds/records");
        
        // 4. 添加pack.mcmeta到ZIP根目录
        zip.file("pack.mcmeta", packMcmetaBlob);

        // 5. 添加封面图片（MC资源包封面标准命名为pack.png）
        zip.file("pack.png", coverImageBlob);

        // 6. 添加OGG文件到records文件夹（如果有选中的话）
        if (selectedOggFiles.length > 0) {
            for (let i = 0; i < selectedOggFiles.length; i++) {
                const oggFile = selectedOggFiles[i];
                // 将OGG文件添加到records文件夹，保留原文件名
                recordsFolder.file(oggFile.name, oggFile);
            }
            console.log(`已添加 ${selectedOggFiles.length} 个OGG文件到 records 目录`);
        } else {
            // 可选：如果没有OGG文件，添加空占位文件避免文件夹被忽略
            recordsFolder.file(".placeholder", "");
            console.log("未选择OGG文件，已添加占位文件到 records 目录");
        }

        // 7. 生成ZIP文件并下载
        const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }
});
// 2. 安全取值 + 规范命名 + 兜底默认值
const packNameInput = document.getElementById('packname'); // 修正ID匹配问题
const packName = packNameInput ? packNameInput.value.trim() : "";
const finalPackName = packName || "MC唱片资源包";

// 3. 触发下载（确保 saveAs 已引入，比如依赖 FileSaver.js）
try {
  saveAs(zipBlob, `${finalPackName}.zip`);
  // 4. 优化提示，告知用户具体的文件名
  alert(`资源包打包完成！文件名将为：${finalPackName}.zip`);
} catch (error) {
  // 5. 增加错误捕获，避免下载失败时无提示
  alert(`打包失败：${error.message}`);
  console.error("下载出错：", error);
}
        // 8. 清理缓存
        coverImageBlob = null;
        packMcmetaBlob = null;
        selectedOggFiles = [];
        document.getElementById('oggFileList').innerText = "";
        document.getElementById('fileInput').value = "";
        document.getElementById('oggFiles').value = "";
    } catch (error) {
        console.error('打包失败：', error);
        alert('资源包打包失败，请检查控制台日志！');
    }
}
console.log("绫地宁宁可爱捏");