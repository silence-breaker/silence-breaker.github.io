---
title: '关于win11系统更新导致的WSL错误'
date: 2025-01-27 20:58:59
categories: WSL相关问题
---

# win11系统出现的问题

[WSL文件夹从文件资源管理器中消失](https://img.sosoos.com/i/2025/01/27/821909.webp)

[无法打开WSL命令行窗口，并且从其他命令行也无法正常实行WSL相关语句](https://img.sosoos.com/i/2025/01/27/951926.webp)

# 解决方案

1. 找到C:\Windows.old\WINDOWS\System32\lxss\tools， 应该是能看到bzlImage文件，将该文件路径复制替换掉原来的.wslconfig文件中的bzlimage路径
2. 以管理员权限打开powershell输入以下指令重新安装WSL

```
wsl --install -d <你的linux系统版本>
```

# 原理解释

window11系统更新新建了一个windows.old文件夹并将一部分的旧文件挪到了这里，导致WSL的内核文件路径与原来设定的不吻合，因而无法打开wsl
