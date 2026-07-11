# Simple Tools

一个轻量、实用的在线网页工具集合。项目使用原生 HTML、CSS 和 JavaScript 编写，无需后端服务或构建工具，克隆后即可本地运行。

## 工具列表

- **Steam Market Ratio Calculator**：计算 Steam 市场卖出到账、手续费与挂刀比例。
- **WIDE Evo Print Quality Unlock**：在浏览器本地处理照片，生成适用于 WIDE Evo TF 卡打印的文件。
- **iRacing Safety Rating Risk Estimator**：根据执照等级、场次类型、圈数和事故点估算安全分风险。
- **Base64 Encoder & Decoder**：在浏览器本地进行文本 Base64 编码与解码。

## 项目特点

- 原生前端实现，无需安装依赖
- 支持中文和英文界面
- 响应式布局，适配桌面和移动设备
- 多数数据仅在浏览器本地处理
- 每个工具独立存放，便于维护和扩展

## 本地运行

```bash
git clone https://github.com/Moskic/simple-tools.git
cd simple-tools
python3 -m http.server 8000
```

然后在浏览器访问：

```text
http://localhost:8000
```

也可以直接打开根目录下的 `index.html`，但使用本地 HTTP 服务可以避免部分浏览器的本地文件限制。

## 项目结构

```text
simple-tools/
├── index.html
├── styles.css
├── tools.js
├── steam_ratio_calculator/
├── wide_evo_print_quality_unlock/
├── iracing_safety_rating_estimator/
└── base64_encode_decode/
```

## 添加新工具

1. 在根目录中新建一个独立的工具文件夹。
2. 添加该工具需要的 `index.html`、样式和脚本文件。
3. 在 `tools.js` 的 `tools` 数组中添加名称、说明和访问路径。
4. 在本地检查中英文界面及移动端显示效果。

## 注意事项

部分页面会通过 CDN 加载图标或第三方库，因此相关功能可能需要网络连接。各工具的计算结果仅供参考，请根据实际情况使用。
