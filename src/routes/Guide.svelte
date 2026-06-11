<script lang="ts">
  import { push } from 'svelte-spa-router';
</script>

<article class="guide">
  <nav class="bar">
    <button class="link" type="button" onclick={() => push('/')}>← 返回测算</button>
  </nav>

  <header>
    <h1>2026 肥胖评估新标准解读</h1>
    <p class="lead">美国糖尿病协会 (ADA) / 《柳叶刀》临床肥胖症新框架</p>
  </header>

  <section>
    <h2>核心变化：从"唯 BMI"到"多维评估"</h2>
    <p>
      2026 年肥胖诊断标准的颠覆性调整，核心在于将 BMI 从"诊断标准"降级为"筛查指标"。
      旧逻辑是"BMI 达到一定数值 = 肥胖"，新逻辑要求结合脂肪量与脂肪分布综合判断，
      尤其是中心性 / 内脏性脂肪堆积——这是危害最大的类型。
    </p>
    <p>
      新指南采用"二选一"诊断逻辑：满足以下任一即可诊断为肥胖——
    </p>
    <ul>
      <li>BMI 达到相应人种的肥胖标准；或</li>
      <li>BMI 处于超重范围，但腰围（WC）或腰高比（WHtR）超标</li>
    </ul>
  </section>

  <section>
    <h2>亚裔切点更严格</h2>
    <p>亚裔在较低 BMI 下内脏脂肪风险更高，因此新标准为亚裔单独设定更低的切点：</p>
    <table>
      <thead>
        <tr><th>人群</th><th>超重（BMI）</th><th>肥胖（BMI）</th></tr>
      </thead>
      <tbody>
        <tr><td>亚裔（新标准）</td><td>≥ 23</td><td>≥ 27.5</td></tr>
        <tr><td>中国（当前标准）</td><td>24 ~ 27.9</td><td>≥ 28</td></tr>
        <tr><td>非亚裔（新标准）</td><td>≥ 25</td><td>≥ 30</td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>腰围与腰高比（WHtR）</h2>
    <p>这是"看脂肪分布"的关键指标：</p>
    <ul>
      <li>腰围超标：亚裔女 ≥ 80cm / 男 ≥ 90cm；非亚裔女 ≥ 88cm / 男 ≥ 102cm</li>
      <li>腰高比超标：腰围 ÷ 身高 ≥ 0.5（不分种族、不分性别）</li>
    </ul>
    <p>
      腰高比的优势在于"标准化"——一个 1.6m 的人腰围不应超过 80cm；
      一个 1.75m 的人腰围不应超过 87.5cm。
    </p>
    <h3>测量方法</h3>
    <ul>
      <li>用软尺，在肚脐水平线绕一圈</li>
      <li>呼气末、吸气开始时测量，不要憋气</li>
      <li>保持尺子水平，紧贴皮肤</li>
    </ul>
  </section>

  <section>
    <h2>临床前肥胖 vs 临床肥胖</h2>
    <p>新指南的另一大更新是风险分层：</p>
    <ul>
      <li>
        <strong>临床前肥胖</strong>：体脂超标，但器官功能正常。需要生活方式干预以防进展。
      </li>
      <li>
        <strong>临床肥胖</strong>：体脂超标已导致器官功能受损（如高血压、睡眠呼吸暂停、骨关节炎、脂肪肝等）。
        应作为独立的慢性疾病积极治疗。
      </li>
    </ul>
  </section>

  <section>
    <h2>与中国现行标准对照</h2>
    <table>
      <thead>
        <tr><th>分类</th><th>BMI 范围</th><th>腰围相关标准</th></tr>
      </thead>
      <tbody>
        <tr><td>偏瘦</td><td>&lt; 18.5</td><td>—</td></tr>
        <tr><td>正常</td><td>18.5 ~ 23.9</td><td>—</td></tr>
        <tr><td>超重</td><td>24.0 ~ 27.9</td><td>男 ≥ 85cm / 女 ≥ 80cm 需警惕</td></tr>
        <tr><td>肥胖</td><td>≥ 28.0</td><td>男 ≥ 90cm / 女 ≥ 85cm 为中心性肥胖</td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>行动建议</h2>
    <ol>
      <li>测量：身高 + 腰围（肚脐水平，呼气末）</li>
      <li>计算：腰高比 = 腰围 ÷ 身高（是否 ≥ 0.5？）；BMI = 体重 ÷ 身高²（是否 ≥ 23？）</li>
      <li>对照：BMI ≥ 23 或 腰高比 ≥ 0.5 或 腰围超标 → 高风险人群</li>
      <li>行动：调整饮食结构（减少精制碳水、增加蛋白质与膳食纤维），增加日常活动量，定期监测</li>
    </ol>
  </section>

  <footer>
    <h2>📖 参考资料</h2>
    <p>
      本页内容整理自 2025 年《柳叶刀》临床肥胖症定义新框架与 2026 年美国糖尿病协会（ADA）肥胖诊疗标准，
      以及公开发表的医学科普资料。内容仅作科普参考。
    </p>
    <p class="risk">⚠ 内容仅作科普参考，不构成医疗建议。如有疑虑，请前往医院体重门诊或内分泌科就诊。</p>
  </footer>
</article>

<style>
  .guide {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    line-height: 1.7;
  }
  .bar {
    display: flex;
  }
  .link {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-size: 0.95rem;
    padding: 0;
    font-family: inherit;
  }
  header h1 {
    font-size: 1.75rem;
    margin: 0 0 0.5rem;
    color: var(--fg);
  }
  .lead {
    color: var(--fg-muted);
    margin: 0;
  }
  h2 {
    font-size: 1.25rem;
    margin: 0 0 0.75rem;
    color: var(--fg);
  }
  h3 {
    font-size: 1rem;
    margin: 1rem 0 0.5rem;
    color: var(--fg);
  }
  p, ul, ol {
    color: var(--fg);
    margin: 0 0 0.75rem;
  }
  ul, ol {
    padding-left: 1.5rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.75rem 0;
    font-size: 0.9rem;
  }
  th, td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--border);
    text-align: left;
  }
  th {
    color: var(--fg-muted);
    font-weight: 500;
  }
  footer {
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
  }
  .risk {
    color: var(--fg-muted);
    font-size: 0.9rem;
  }
</style>
