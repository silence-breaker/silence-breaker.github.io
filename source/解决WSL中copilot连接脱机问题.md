---
title: 解决WSL中copilot连接脱机问题
date: 2025-02-06 22:20:31
categories: WSL相关问题
---
# 出现问题
windows环境下可以使用copilot但是wsl中显示脱机无法使用copilot
# 原因分析
WSL2和Windows主机网络不互通，IP地址不同，所以显示脱机
# 解决方法
在C:/users/.wslconfig中写入以下内容并保存
```shell
autoMemoryReclaim=gradual # 可以在 gradual 、dropcache 、disabled 之间选择
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
sparseVhd=true
```
# 参考链接
[彻底解决网络问题](https://zhuanlan.zhihu.com/p/657110386)