# 2026 肥胖评估

基于 2026 年 ADA 最新指南的肥胖评估工具。通过 BMI、腰围和腰高比（WHtR）进行综合诊断，支持移动端，亚裔专用标准，开源 Web App。

## 特性

- 3 个字段（身高 / 体重 / 腰围）即可出结果
- 默认采用 2026 ADA 新标准（亚裔切点）
- 独立的"2026 新标准解读"长文页
- 中英文 / 移动端 + 桌面端响应式
- 暗色模式自适应
- 零后端，纯静态，GitHub Pages 部署

## 本地开发

```bash
npm install
npm run dev
```

## 测试

```bash
npm test           # 跑一次
npm run test:watch # 监听
npm run check      # 类型检查
```

## 构建

```bash
npm run build
npm run preview
```

## 部署

项目配置了 GitHub Actions：push 到 `main` 自动跑测试 + 构建 + 部署到 GitHub Pages。

**首次部署前置条件**：在 GitHub 仓库 Settings → Pages → Source 选择 "GitHub Actions"。

部署完成后访问 `https://<username>.github.io/obesity-calculator/`。

## 测算逻辑

见 [设计文档](docs/superpowers/specs/2026-06-11-obesity-calculator-design.md) 第 6-7 节。

## 免责

本工具仅作参考，不构成医疗建议。如有疑虑，请咨询专业医生。

## License

MIT
