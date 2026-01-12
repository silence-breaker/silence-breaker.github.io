# 图片本地化工具

这个脚本可以帮助您将文章中的外部图床图片下载到本地。

## 使用方法

### 方案1: 使用Node.js脚本(推荐)

1. 安装依赖:
```bash
npm install
```

2. 运行下载脚本:
```bash
node scripts/download-images.js
```

脚本会:
- 扫描所有Markdown文件
- 找出外部图片链接(img.sosoos.com, img.picui.cn等)
- 下载图片到 `public/images/` 文件夹
- 自动更新Markdown文件中的图片路径

### 方案2: 手动下载

1. 在浏览器中打开外部图片链接
2. 右键保存图片到 `public/images/` 文件夹
3. 手动修改Markdown文件中的路径为 `/images/图片名.jpg`

## 图片路径规则

在Astro中,`public` 文件夹中的文件可以直接通过根路径访问:

- `public/picture/头像.jpg` → `/picture/头像.jpg`
- `public/images/screenshot.png` → `/images/screenshot.png`

## 注意事项

- 下载的图片会保存在 `public/images/` 目录
- 原始外部链接会被注释保留,方便对比
- 建议定期备份图片文件
