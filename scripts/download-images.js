import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const IMAGES_DIR = path.join(__dirname, '../public/images');

// 创建images目录
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 下载图片
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✓ 下载成功: ${path.basename(filepath)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            console.error(`✗ 下载失败: ${url}`);
            reject(err);
        });
    });
}

// 处理Markdown文件
async function processMarkdownFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const imageRegex = /!\[([^\]]*)\]\((https?:\/\/[^\)]+)\)/g;

    let newContent = content;
    let match;
    let downloadCount = 0;

    while ((match = imageRegex.exec(content)) !== null) {
        const [fullMatch, alt, imageUrl] = match;

        // 只处理外部图床链接
        if (imageUrl.includes('img.sosoos.com') || imageUrl.includes('img.picui.cn')) {
            try {
                // 从URL提取文件名
                const urlParts = imageUrl.split('/');
                const filename = urlParts[urlParts.length - 1];
                const localPath = path.join(IMAGES_DIR, filename);
                const webPath = `/images/${filename}`;

                // 下载图片
                await downloadImage(imageUrl, localPath);

                // 替换链接,保留原链接作为注释
                newContent = newContent.replace(
                    fullMatch,
                    `![${alt}](${webPath})\n<!-- 原图床链接: ${imageUrl} -->`
                );

                downloadCount++;
            } catch (error) {
                console.error(`处理图片失败: ${imageUrl}`, error);
            }
        }
    }

    // 如果有更改,写回文件
    if (downloadCount > 0) {
        fs.writeFileSync(filepath, newContent, 'utf-8');
        console.log(`\n更新文件: ${path.basename(filepath)} (${downloadCount}张图片)\n`);
    }
}

// 主函数
async function main() {
    console.log('开始处理图片本地化...\n');

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

    for (const file of files) {
        const filepath = path.join(POSTS_DIR, file);
        console.log(`处理: ${file}`);
        await processMarkdownFile(filepath);
    }

    console.log('\n✓ 所有图片处理完成!');
}

main().catch(console.error);
