# Project: Europe-Travel-Watch-Duty-Free-Calculator（欧洲旅行手表免税计算器）

零构建静态站，三语（zh/en/de）。**仓库名是混合大小写**（`Europe-Travel-Watch-Duty-Free-Calculator`），
跟家族里其他仓库的小写连字符命名不一致——这是用户明确指定的名称/URL，不要"规范化"改名。

用户选购表所在国（法国/意大利/德国/瑞士/西班牙，或自定义），计算器基于该国官方增值税率和典型现金退税比例
估算离境退税金额，再提示回国后可能产生的关税（超出个人免税额度的部分）。所有数字都明确标注为估算，
不是精确结算单——`script.js` 里已有"不是税务/法律建议"的免责声明，改动时保持这个措辞。

## 去重历史（不要重新拆出博客内嵌副本）
这个工具曾经同时存在独立仓库和 `watch-guide-blog/static/tools/duty-free-calculator/` 的博客内嵌副本，
2026-07-24 已经去重合并为**只在这一个仓库维护**，博客那边的内嵌副本已删除，
`watch-guide-blog/content/tools/_index.md` 的入口也已经改成指向这个独立仓库的 GitHub Pages URL。
**如果被要求"更新这个工具"，只改这一个仓库，不要重新在博客里建一份内嵌副本。**

## 数据模型
没有单独的 `data.js`——国家增值税率/退税率数据内嵌在 `script.js` 里（`countryNames` 等），
预设国家：法国 (fr)、意大利 (it)、德国 (deu)、瑞士 (ch，非欧盟单独退税体系)、西班牙 (es)，加一个"自定义"选项。
英国 (uk) 选项保留但标注"已取消离境退税"。

## 明确禁止的事
- 不要把这个仓库的名字改成小写连字符风格去"对齐"其他仓库——用户明确要求了这个确切的名称
- 不要删除或弱化"仅供估算参考，不是税务/法律建议"这类免责声明
- 不要重新创建博客内嵌副本——已经明确去重为单一维护点

## Commands
- 无构建/测试命令
- 本地预览：共享配置 `C:\Users\junpi\.claude\.claude\launch.json`

## 部署流程
- 改完直接 commit + push 到 `main`
- Commit 作者身份：`Junping Koch <junping.koch@gmail.com>`，仓库单独设置

## 持续维护
每次你需要重复纠正 Claude 同一件事三次以上，就把结论补进这个文件对应章节。
