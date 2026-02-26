// 全局存储pack.mcmeta配置Blob

let packMcmetaBlob = null;

//创建uuid
/**
 * 生成UUID（基于浏览器原生crypto API）
 * @returns {string} 标准格式的UUID v4字符串
 */
function createUUID() {
  // 现代浏览器原生支持，生成加密安全的UUID v4
  return crypto.randomUUID();
}
// 测试使用
const uuid1 = createUUID();
const uuid2 = createUUID();
console.log("生成的UUID：", uuid1);
console.log("生成的UUID：", uuid2);

function generatePack() {
 
    if (!document.getElementById('packname').value) {
        document.getElementById('packname').value = "MC唱片资源包";
    }
    const config = { 
   "format_version" : 1,
   "header" : {
      "description" : document.getElementById('description').value,
      "name" : document.getElementById('packname').value,
      "uuid" : uuid1,
      "version" : [ 1, 2, 2 ]
   },
   "modules" : [
      {
         "description" : "资源包模块",
         "type" : "resources",
         "uuid" : uuid2,
         "version" : [ 1, 2, 2 ]
      }
   ]
    };
    
    // 生成配置文件Blob并保存到全局
    packMcmetaBlob = new Blob([JSON.stringify(config, null, 2)], { type: "text/plain;charset=utf-8" });
    alert('配置文件已生成！');
}