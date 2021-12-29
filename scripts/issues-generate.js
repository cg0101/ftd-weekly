const fs = require("fs");
const moment = require("moment");

const path = require("path");

const rootDirPath = path.join(__dirname, "../");

function buildMD(i, fileContent) {
    let fileName = "issue-" + i + ".md";
    fs.writeFileSync(
        path.join(rootDirPath, "docs", fileName),
        fileContent,
        "utf-8"
    );
}
function buildMDContent(i) {
    // let lastDate = "2021-12-24";
    let contents = [];
    let pubDate = moment("2021-12-26")
        .subtract((83 - i) * 7, "days")
        .format("YYYY年M月D日");
    contents.push(`# FTD 技术周刊第 ${i} 期：`);

    contents.push(
        `这是 「FTD 技术周刊」 第 ${i} 期，发表于：${pubDate}。本期刊开源（GitHub: [cg0101/weekly](https://github.com/cg0101/weekly)），欢迎 issue 区投稿，推荐或自荐项目。`
    );
    contents.push(`## 封面图`);
    contents.push("\n");
    contents.push(
        fs.readFileSync(
            path.join(rootDirPath, "metadata", `metadata-issues-${i}.md`),
            "utf-8"
        )
    );

    contents.push("\n");
    contents.push(`## 📅 订阅
本周刊每周日发布，同步更新在语雀 [[zhangchi1024/weekly](https://www.yuque.com/zhangchi1024/weekly)」 。`);
    contents.push('\n');
    contents.push(`微信搜索 「zhangchi_insight」 或者扫描二维码，即可订阅。
    <img src="https://cdn.nlark.com/yuque/0/2021/jpeg/132503/1640750963398-e8538e9e-6b96-46f7-abff-c93b56bdd377.jpeg?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5byg6amw%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fresize%2Cw_426%2Climit_0" style="float:left">
    
    （完）`)
    return contents.join("\n");
}
const MAX = 83;

for (let i = 1; i <= MAX; i++) {
    let fileContent = buildMDContent(i);
    buildMD(i, fileContent);
}
