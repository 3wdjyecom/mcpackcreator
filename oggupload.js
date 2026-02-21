// 全局存储选中的OGG文件列表
let selectedOggFiles = [];

// 定义允许的文件名白名单（去掉后缀，不区分大小写，自动处理空格）
const ALLOWED_FILE_NAMES = [
    "5", "11", "13", "cat", "blocks", "chirp", "far", "mall", 
    "mellohi", "stal", "strad", "ward", "wait", "Pigstep", 
    "otherside", "Relic", "Precipice", "Creator", "Creator (八音盒)", 
    "Tears", "Lava Chicken"
];

// 处理OGG文件选择（接收<input type="file">的onchange事件）
function oggupload(event) {
    // 此时event.target是<input type="file">元素，能正确获取files
    const files = event.target.files;
    if (files.length === 0) {
        selectedOggFiles = [];
        document.getElementById('oggFileList').innerText = "";
        return;
    }

    // 先统一转小写并去空格，方便校验（白名单也转小写去空格）
    const allowedNamesLower = ALLOWED_FILE_NAMES.map(name => name.toLowerCase().replace(/\s+/g, ""));

    // 验证文件类型和文件名
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        
        // 1. 验证文件类型（仅允许OGG）
        if (!fileName.endsWith('.ogg')) {
            alert(`文件 ${fileName} 不是OGG格式，请重新选择！`);
            event.target.value = "";
            selectedOggFiles = [];
            document.getElementById('oggFileList').innerText = "";
            return;
        }

        // 2. 提取文件名（去掉.ogg后缀，处理空格/大小写）
        const fileNameWithoutExt = fileName.replace(/\.ogg$/i, "") // 去掉.ogg后缀（不区分大小写）
                                           .toLowerCase()          // 转小写
                                           .replace(/\s+/g, "");   // 去掉所有空格

        // 3. 验证文件名是否在白名单中
        if (!allowedNamesLower.includes(fileNameWithoutExt)) {
            alert(`文件 ${fileName} 名称不合法！
允许的文件名：${ALLOWED_FILE_NAMES.join('; ')}`);
            event.target.value = "";
            selectedOggFiles = [];
            document.getElementById('oggFileList').innerText = "";
            return;
        }
    }

    // 存储选中的OGG文件
    selectedOggFiles = Array.from(files);
    
    // 显示已选文件列表（提升用户体验）
    let fileListText = `已选择 ${files.length} 个OGG文件：`;
    for (let i = 0; i < files.length; i++) {
        fileListText += ` ${files[i].name}`;
        if (i < files.length - 1) fileListText += '、';
    }
    document.getElementById('oggFileList').innerText = fileListText;
}
console.log("假屋和奏也可爱捏");