import React from 'react';
import KnowledgeCard from '@/components/KnowledgeCard';
import Myths from '@/components/Myths';
import DataBar from '@/components/DataBar';

// 科普文章内容数据（示例，后续可换 MDX 或接入 CMS）
export interface Topic {
  slug: string;
  title: string;
  category: string;       // 场景分类
  tag: string;            // 标签
  difficulty: '基础' | '进阶';
  readTime: string;
  cover: string;          // emoji 用作占位图标
  summary: string;
  ref?: string;           // 参考来源
  content: React.ReactNode;
}

export const topics: Topic[] = [
  {
    slug: 'cervical-pose',
    title: '低头族自救指南：颈椎为什么会痛',
    category: '学习坐姿',
    tag: '脊柱',
    difficulty: '基础',
    readTime: '5分钟',
    cover: '🦴',
    summary: '每天低头看手机，颈椎承受的压力究竟有多大？一文讲清原理，附正确姿势对照。',
    ref: '《颈椎病的诊治与预防》中华医学会骨科学分会',
    content: (
      <>
        <h2>一、低头几度，颈椎多重？</h2>
        <p>当你低头看手机时，头部前倾角度越大，颈椎椎间盘承受的负荷呈指数级增长。头部正常重量约 4-5 公斤：</p>
        <DataBar bars={[
          { label: '0° 正位', value: 5, unit: ' kg' },
          { label: '15° 低头', value: 12, unit: ' kg' },
          { label: '30° 低头', value: 18, unit: ' kg' },
          { label: '60° 低头', value: 27, unit: ' kg', highlight: true },
        ]} />
        <blockquote>关键结论：低头角度每增加一点，颈椎承受的等效重量可能翻倍。这就是"低头族"颈椎痛的力学根源。</blockquote>

        <h2>二、日常哪些姿势在"偷"你的颈椎？</h2>
        <ul>
          <li>窝在沙发里刷手机</li>
          <li>趴桌上写作业</li>
          <li>电脑屏幕太低，不自觉地前伸脖子</li>
          <li>睡觉枕头过高（约一拳头以上）</li>
        </ul>

        <h2>三、怎么纠正？</h2>
        <ol>
          <li><strong>屏幕举高</strong>：屏幕顶端与视线平齐，不用低头</li>
          <li><strong>定时提醒</strong>：每 30-45 分钟抬头活动一下</li>
          <li><strong>做颈椎保健操</strong>：见"康复动作库"中的颈椎系列</li>
          <li><strong>换枕头</strong>：选择能贴合颈部曲线的枕头</li>
        </ol>

        <div className="disclaimer">
          ⚠️ 本文为健康科普，仅用于了解相关医学知识，不构成医疗建议。如出现持续颈痛、上肢麻木、头晕等症状，请及时就医。
        </div>
      </>
    ),
  },
  {
    slug: 'eye-protection',
    title: '眼睛的"休息术"：20-20-20 法则',
    category: '视力保护',
    tag: '视觉',
    difficulty: '基础',
    readTime: '3分钟',
    cover: '👁️',
    summary: '为什么盯着屏幕久了眼睛会酸？一个简单的 20-20-20 法则，帮你看清休息的科学。',
    ref: '美国眼科学会（AAO）屏幕使用建议',
    content: (
      <>
        <h2>为什么眼睛会累？</h2>
        <p>长时间盯近处（手机、书本、屏幕），睫状肌持续紧张调节焦距，加上眨眼次数减少（正常每分钟 15-20 次，专注时降至 5-7 次），就会出现酸胀、干涩、视力模糊。</p>

        <h2>20-20-20 法则</h2>
        <p>每用眼 <strong>20 分钟</strong>，看 <strong>20 英尺（约 6 米）</strong> 外的物体，至少 <strong>20 秒</strong>。让睫状肌有机会放松。</p>
        <ul>
          <li>📱 设定一个 20 分钟的番茄钟</li>
          <li>👀 起身远眺窗外，或者看远处风景</li>
          <li>😊 主动用力眨眼 10 次，滋润眼球</li>
        </ul>

        <h2>额外加分项</h2>
        <ul>
          <li>屏幕亮度与环境光匹配，不要过亮或过暗</li>
          <li>开夜览/护眼模式减少蓝光刺激</li>
          <li>每天至少 1 小时户外活动（自然光有助于近视防控）</li>
        </ul>

        <div className="disclaimer">
          ⚠️ 本文仅供参考。如出现持续眼干、视物模糊、头痛等症状，请前往眼科就诊。
        </div>
      </>
    ),
  },
  {
    slug: 'ankle-sprain',
    title: '运动扭伤后，别再揉！正确急救姿势',
    category: '运动损伤',
    tag: '急救',
    difficulty: '进阶',
    readTime: '6分钟',
    cover: '🩹',
    summary: '扭伤后该热敷还是冷敷？该揉还是别动？用 RICE 原则快速判断并处理踝关节扭伤。',
    ref: '美国骨科医师学会（AAOS）踝关节扭伤处理指南',
    content: (
      <>
        <h2>扭伤后的黄金原则：RICE</h2>
        <KnowledgeCard points={[
          { num: 'R', title: 'Rest 休息', desc: '立即停止运动，不再用力踩地。', icon: '⏸️' },
          { num: 'I', title: 'Ice 冰敷', desc: '前 48 小时冰敷，每次 15-20 分钟，间隔 2 小时以上。', icon: '🧊' },
          { num: 'C', title: 'Compression 加压', desc: '用弹性绷带适度包裹减轻肿胀，不要过紧。', icon: '🩹' },
          { num: 'E', title: 'Elevation 抬高', desc: '把脚抬到高于心脏位置，促进静脉回流。', icon: '⬆️' },
        ]} />

        <blockquote>❗ 误区：扭伤后揉、按摩、热敷——这些都会加重出血和肿胀，前 48 小时绝对不要做。</blockquote>

        <h2>什么时候必须去医院？</h2>
        <ul>
          <li>完全无法承重走路</li>
          <li>变形明显或听到"咔嚓"声</li>
          <li>肿胀在 48 小时内持续加重</li>
          <li>出现麻木或脚趾发紫</li>
        </ul>

        <div className="disclaimer">
          ⚠️ 本文仅作急救科普参考。严重扭伤、骨折、韧带撕裂等需就医处理，本文不构成诊疗建议。
        </div>
      </>
    ),
  },
  {
    slug: 'oral-health',
    title: '巴氏刷牙法：90 秒搞定全口清洁',
    category: '口腔健康',
    tag: '口腔',
    difficulty: '基础',
    readTime: '4分钟',
    cover: '🦷',
    summary: '刷牙 5 分钟还是蛀牙？巴氏刷牙法（Bass Method）被牙科界公认的高效刷牙方式，跟着学。',
    ref: '美国牙科协会（ADA）刷牙方法指南',
    content: (
      <>
        <h2>巴氏刷牙法（Bass Method）</h2>
        <p>重点清洁<strong>牙龈与牙齿交界处</strong>——这里最容易藏食物残渣和菌斑。</p>
        <ol>
          <li>牙刷与牙齿成 <strong>45° 角</strong>，对准牙龈沟</li>
          <li>小幅度来回颤动 10-20 次（不是大横扫！）</li>
          <li>每次刷 2-3 颗牙，依次推进</li>
          <li>外侧面 → 内侧面 → 咬合面都要刷到</li>
          <li>刷舌面，去除异味细菌</li>
        </ol>
        <p>总时长至少 <strong>2-3 分钟</strong>，每天早晚各一次。电动牙刷可以节省时间，但手法同样重要。</p>

        <div className="disclaimer">
          ⚠️ 本文仅供口腔健康科普。牙龈出血、持续疼痛、牙齿敏感等问题建议定期看牙医。
        </div>
      </>
    ),
  },
  {
    slug: 'nutrition-basics',
    title: '三餐吃什么：营养搭配的底层逻辑',
    category: '日常营养',
    tag: '营养',
    difficulty: '基础',
    readTime: '5分钟',
    cover: '🥗',
    summary: '别只看热量。了解碳水、蛋白质、脂肪的真正角色，才知道怎么吃才科学。',
    ref: '《中国居民膳食指南（2022）》',
    content: (
      <>
        <h2>三大宏量营养素的分工</h2>
        <ul>
          <li><strong>碳水化合物</strong>：主要能量来源。选全谷类（糙米、燕麦）优于精制糖</li>
          <li><strong>蛋白质</strong>：构建和修复组织。鱼、蛋、豆制品、瘦肉每天都不能少</li>
          <li><strong>脂肪</strong>：不是敌人。选坚果、橄榄油、深海鱼这类优质脂肪</li>
        </ul>
        <p>搭配口诀：<strong>"一半果蔬、四分之一谷物、四分之一蛋白"</strong>，用一个盘子就能摆出来。</p>

        <div className="disclaimer">
          ⚠️ 本文为营养科普。特殊疾病（糖尿病、肾病等）患者的饮食需遵医嘱。
        </div>
      </>
    ),
  },
  {
    slug: 'posture-check',
    title: '坐姿自测：你的脊柱健康吗？',
    category: '学习坐姿',
    tag: '自测',
    difficulty: '基础',
    readTime: '4分钟',
    cover: '📐',
    summary: '三招快速检查自己的坐姿、屏幕高度、枕头高度是否在伤害颈椎。',
    ref: '美国物理治疗协会（APTA）姿势评估建议',
    content: (
      <>
        <h2>自测三件事</h2>
        <ol>
          <li><strong>屏幕高度</strong>：坐直后，屏幕上沿是否与你的视线平齐？低了就会不自觉前倾。</li>
          <li><strong>肩颈放松</strong>：放松双肩，锁骨到肩膀有没有紧绷感？肩胛骨有没有不自觉前扣？</li>
          <li><strong>枕头高度</strong>：平躺时，脖子和胸椎之间有没有空隙？侧躺时，头是否与脊柱在同一水平线？</li>
        </ol>
        <blockquote>如果你的答案都是"否"，颈椎已经在长期承受额外负荷了。</blockquote>
        <div className="disclaimer">⚠️ 自测仅用于日常姿势评估，不能替代医疗诊断。持续颈痛、上肢麻木请就医。</div>
      </>
    ),
  },
  {
    slug: 'myopia-facts',
    title: '近视防控五大真相',
    category: '视力保护',
    tag: '近视',
    difficulty: '基础',
    readTime: '5分钟',
    cover: '🔍',
    summary: '"戴眼镜会让度数加深？"这些你听到过的近视"常识"，哪些是真的，哪些是假的？',
    ref: '《儿童青少年近视防控专家共识》《中国学龄儿童近视眼病防控指南》',
    content: (
      <>
        <Myths items={[
          { myth: '戴合适的眼镜会让近视加深', truth: '看不清时眯眼、用力看反而加快度数。验光配镜是医学共识。' },
          { myth: '"护眼模式"能有效保护视力', truth: '关键是控制用眼时长和距离，不是切换模式。' },
          { myth: '电子产品是导致近视的主因', truth: '户外活动不足、用眼距离过近才是核心因素。' },
          { myth: '近视可以通过训练恢复正常', truth: '近视无法"恢复正常"，但规范防控可以减缓增长速度。' },
          { myth: '补叶黄素就能预防近视', truth: '叶黄素对视网膜健康有益，但没有证据表明可以预防近视。' },
        ]} />
        <div className="disclaimer">⚠️ 本文仅做近视知识科普。视力变化、度数快速增长等请及时到眼科就诊。</div>
      </>
    ),
  },
  {
    slug: 'sports-injury-prevention',
    title: '运动前热身和运动后拉伸，各做多久？',
    category: '运动损伤',
    tag: '运动',
    difficulty: '基础',
    readTime: '4分钟',
    cover: '🏃',
    summary: '运动前后各有专属流程，做错了反而增加受伤风险。',
    ref: '美国运动医学会（ACSM）运动热身与整理建议',
    content: (
      <>
        <h2>运动前：动态热身 5-10 分钟</h2>
        <ul>
          <li>慢跑、开合跳等轻度有氧 3-5 分钟，提升体温</li>
          <li>关节活动度：颈、肩、髋、膝、踝各绕环 10 次</li>
          <li>动态拉伸（不是静态拉长），让肌肉进入工作状态</li>
        </ul>
        <h2>运动后：静态拉伸 5-10 分钟</h2>
        <ul>
          <li>针对本次运动用到的主要肌群，每个动作保持 20-30 秒</li>
          <li>呼吸均匀，不要憋气</li>
          <li>如有 soreness（延迟性肌肉酸痛），次日轻度活动优于完全不动</li>
        </ul>
        <div className="disclaimer">⚠️ 本文仅做运动防护科普。如有旧伤或慢性疼痛，请咨询运动康复师。</div>
      </>
    ),
  },
  {
    slug: 'fracture-child',
    title: '孩子骨折后怎么办？',
    category: '运动损伤',
    tag: '急救',
    difficulty: '进阶',
    readTime: '5分钟',
    cover: '🦴',
    summary: '从现场判断到就医前处理，家长必须知道的急救流程。',
    ref: '《儿童常见骨折的诊断与处理》《儿科急诊诊疗规范》',
    content: (
      <>
        <h2>第一步：判断有没有骨折</h2>
        <p>出现以下信号要高度怀疑骨折：剧痛、变形、无法活动、听到骨断声、局部迅速肿胀。</p>
        <h2>第二步：现场处理</h2>
        <ol>
          <li>保持受伤部位不动，不要试图"掰正"</li>
          <li>用衣物、木板或硬纸板做临时固定，范围包括骨折上下两个关节</li>
          <li>可以冷敷减轻肿胀（每次不超过 20 分钟）</li>
          <li>尽快送医，途中避免晃动</li>
        </ol>
        <blockquote>❗ 绝对不要按摩、揉搓、热敷受伤部位。</blockquote>
        <div className="disclaimer">⚠️ 本文仅做骨折急救科普，不构成诊疗建议。受伤后请立即就医。</div>
      </>
    ),
  },
  {
    slug: 'wound-antiseptic',
    title: '小伤口怎么处理？碘伏、酒精、双氧水怎么选？',
    category: '日常护理',
    tag: '护理',
    difficulty: '基础',
    readTime: '4分钟',
    cover: '🩹',
    summary: '家庭常备消毒品的正确用法，选错了反而影响愈合。',
    ref: '《皮肤外用药使用指南》中华医学会皮肤性病学分会',
    content: (
      <>
        <h2>常用消毒剂对比</h2>
        <ul>
          <li><strong>碘伏</strong>：首选，刺激性小、杀菌广谱，适合大多数皮肤小伤口</li>
          <li><strong>75% 酒精</strong>：适合完整皮肤表面消毒（打针前），不适合直接用于开放伤口</li>
          <li><strong>双氧水</strong>：适合较脏、有坏死组织的伤口清洗，但会损伤正常组织，不宜频繁使用</li>
        </ul>
        <h2>处理流程</h2>
        <ol>
          <li>流动清水冲洗伤口，冲掉表面污物</li>
          <li>用碘伏从伤口中心向外圈涂抹</li>
          <li>覆盖无菌纱布，每日更换</li>
          <li>出现持续红肿热痛、脓液等感染迹象，及时就医</li>
        </ol>
        <div className="disclaimer">⚠️ 本文仅做家庭伤口护理科普。较深、较大、出血不止的伤口请直接就医。</div>
      </>
    ),
  },
  {
    slug: 'sleep-teen',
    title: '学生睡够几小时才够？',
    category: '青少年健康',
    tag: '睡眠',
    difficulty: '基础',
    readTime: '4分钟',
    cover: '😴',
    summary: '小学生、初中生、高中生，睡眠时长需求各不相同。',
    ref: '中国睡眠研究会《中国睡眠研究报告》《中小学生健康管理规范》',
    content: (
      <>
        <h2>各年龄段睡眠推荐</h2>
        <DataBar bars={[
          { label: '6-11 岁', value: 11, unit: ' h' },
          { label: '12-14 岁', value: 10, unit: ' h' },
          { label: '15-18 岁', value: 9, unit: ' h' },
        ]} />
        <p>注意：以上为推荐睡眠时长的上限。小学生需要 9-11 小时，取中间值约 10 小时。</p>
        <h2>睡不够的信号</h2>
        <ul>
          <li>上课频繁走神、打哈欠</li>
          <li>情绪易烦躁、容易发脾气</li>
          <li>记忆力下降、注意力不集中</li>
        </ul>
        <h2>提高睡眠质量三件事</h2>
        <ul>
          <li>固定入睡和起床时间，周末也别差太多</li>
          <li>睡前 1 小时不看手机、不开亮屏</li>
          <li>卧室温度保持在 18-22°C，光线尽量暗</li>
        </ul>
        <div className="disclaimer">⚠️ 本文仅做睡眠科普。长期严重失眠或白天极度困倦请就医评估。</div>
      </>
    ),
  },
  {
    slug: 'growth-teen',
    title: '长高的关键期，你把握了吗？',
    category: '青少年健康',
    tag: '发育',
    difficulty: '基础',
    readTime: '5分钟',
    cover: '📏',
    summary: '骨骼发育有窗口期，了解原理，抓住机会。',
    ref: '《儿童青少年生长发育指南》中华医学会儿科学分会',
    content: (
      <>
        <h2>长高的关键窗口</h2>
        <ul>
          <li><strong>出生后第一年</strong>：快速生长期</li>
          <li><strong>青春期前 1-2 年</strong>：第二生长高峰</li>
          <li><strong>女孩月经初潮后、男孩变声后</strong>：生长减速，骨骺线逐渐闭合</li>
        </ul>
        <h2>影响身高的四大因素</h2>
        <ul>
          <li><strong>遗传</strong>：占 60-80%，但其他因素仍可影响 20-40%</li>
          <li><strong>睡眠</strong>：生长激素主要在深睡眠中分泌</li>
          <li><strong>营养</strong>：蛋白质、钙、维生素 D 是骨骼发育必需</li>
          <li><strong>运动</strong>：跳绳、篮球等纵向运动对骨骺有刺激作用</li>
        </ul>
        <div className="disclaimer">⚠️ 本文仅做生长发育科普。身高异常或发育迟缓请至儿科或内分泌科就诊。</div>
      </>
    ),
  },
  {
    slug: 'mental-anxiety',
    title: '考前焦虑怎么缓解？',
    category: '心理健康',
    tag: '心理',
    difficulty: '基础',
    readTime: '4分钟',
    cover: '🧠',
    summary: '大脑告诉你"考不好就完了"时，你其实可以这样想。',
    ref: '《青少年常见心理问题的家庭识别与应对》《儿童青少年精神障碍防治指南》',
    content: (
      <>
        <h2>焦虑是正常的</h2>
        <p>适度的紧张有助于集中注意力，但过度焦虑会影响发挥。关键在于识别身体信号：心慌、手抖、失眠、脑子一片空白。</p>
        <h2>现场可用的小技巧</h2>
        <KnowledgeCard points={[
          { num: '1', title: '4-7-8 呼吸法', desc: '吸气 4 秒，屏住 7 秒，慢慢呼出 8 秒，重复 3-5 轮。', icon: '🫁' },
          { num: '2', title: '接地练习', desc: '说出你能看到的 5 样东西、听到的 4 种声音、能摸到的 3 样东西。', icon: '🌍' },
          { num: '3', title: '重新定义', desc: '"我很焦虑"改成"我的身体在帮我集中注意力"。', icon: '💭' },
        ]} />
        <h2>什么时候需要求助</h2>
        <p>如果焦虑持续超过 2 周，影响到饮食、睡眠、学习，或出现想伤害自己的念头，请告诉信任的成年人或寻求专业帮助。</p>
        <div className="disclaimer">⚠️ 本文仅做心理健康科普，不能替代专业诊疗。如有自伤或自杀念头，请立即拨打心理援助热线或前往医院。</div>
      </>
    ),
  },
  {
    slug: 'backpack-load',
    title: '书包多重合适？背错姿势的后果',
    category: '学习坐姿',
    tag: '负重',
    difficulty: '基础',
    readTime: '3分钟',
    cover: '🎒',
    summary: '书包超过体重的 10%，脊柱就要付出代价。',
    ref: '美国儿科学会（AAP）儿童负重背包建议',
    content: (
      <>
        <h2>书包重量的黄金比例</h2>
        <p>书包重量不应超过孩子体重的 <strong>10-15%</strong>。超过这个比例，长期背负会导致：</p>
        <ul>
          <li>含胸驼背、圆肩</li>
          <li>下背痛、腰肌劳损</li>
          <li>脊柱侧弯风险增加</li>
        </ul>
        <h2>正确背法</h2>
        <ul>
          <li>双肩带一起用，不要单肩背</li>
          <li>肩带调到腋下略上方，书包贴合后背</li>
          <li>重物放靠近背部的一侧</li>
        </ul>
        <div className="disclaimer">⚠️ 本文仅做负重科普。如出现持续下背痛或姿势异常请就医评估。</div>
      </>
    ),
  },
  {
    slug: 'fever-handling',
    title: '孩子发烧了，怎么处理？',
    category: '日常护理',
    tag: '急救',
    difficulty: '进阶',
    readTime: '5分钟',
    cover: '🌡️',
    summary: '物理降温、吃药、就医，不同情况各有边界。',
    ref: '《中国儿童发热与热性惊厥诊断治疗指南》',
    content: (
      <>
        <h2>先看精神状态，而不是只看体温</h2>
        <p>发烧是症状不是疾病本身。孩子精神状态好、能玩能吃，通常不必过度焦虑。</p>
        <KnowledgeCard points={[
          { num: '01', title: '38.5°C 以下', desc: '多喝水、少穿衣服散热，密切观察。', icon: '🌡️' },
          { num: '02', title: '38.5°C 以上且精神差', desc: '可使用退热药（对乙酰氨基酚或布洛芬，按体重给量）。', icon: '💊' },
          { num: '03', title: '3 个月以下婴儿发烧', desc: '立即就医，不做家庭处理。', icon: '👶' },
          { num: '04', title: '持续高热超 72 小时', desc: '就医，查病因。', icon: '🏥' },
        ]} />
        <blockquote>❗ 不推荐酒精擦身、捂汗、冰水擦浴等旧方法，可能有害。</blockquote>
        <div className="disclaimer">⚠️ 本文仅做发热处理科普，不构成诊疗建议。具体用药和就医判断请遵循医嘱。</div>
      </>
    ),
  },
  {
    slug: 'sun-protection',
    title: '防晒不是美白：儿童与青少年科学防护指南',
    category: '皮肤护理',
    tag: '防晒',
    difficulty: '基础',
    readTime: '5分钟',
    cover: '☀️',
    summary: 'SPF 30 够了，别再迷信 SPF 100。儿童防晒用物理防晒，晒伤后千万别敷牙膏。',
    ref: '中华医学会《防晒指南》/ 中国疾控中心 / WHO紫外线致癌物分类',
    content: (
      <>
        <h2>紫外线分三档，只有两档伤害皮肤</h2>
        <p>UVC（波长最短）被臭氧层吸收，几乎不接触地面。真正需要防的是另外两种，它们对皮肤的伤害机制完全不同：</p>
        <ul>
          <li><strong>UVB</strong>（280-320nm）：作用于表皮层，导致晒红、灼痛——短期可逆，但反复刺激导致 DNA 损伤</li>
          <li><strong>UVA</strong>（320-400nm）：穿透力强，直达真皮层，导致光老化、色斑、皮肤松弛——长期累积不可逆</li>
        </ul>
        <blockquote>📌 世界卫生组织已将紫外线辐射列为<strong>一类致癌物</strong>。防晒不是审美需求，是医学防护手段。</blockquote>

        <h2>SPF 数值到底意味着什么</h2>
        <DataBar bars={[
          { label: 'SPF 15', value: 93, unit: '%', highlight: false },
          { label: 'SPF 30', value: 97, unit: '%', highlight: true },
          { label: 'SPF 50', value: 98, unit: '%', highlight: false },
          { label: 'SPF 100', value: 99, unit: '%', highlight: false },
        ]} />
        <p>SPF 衡量的是对 UVB 的阻挡率。SPF 30 到 SPF 50 之间只差 1 个百分点——多花的钱买到的是心理安慰，不是实质防护。</p>
        <p>但 SPF 有个盲区：它<strong>不衡量 UVA</strong>。UVA 虽不会让你立刻变红脸，却是导致光老化和皮肤癌前病变的元凶。购买时要确认产品标注"广谱"（broad spectrum），并同时查看 PA 等级。</p>

        <h2>怎么选、怎么用</h2>
        <KnowledgeCard points={[
          { num: '01', title: '日常通勤', desc: 'SPF 30、PA++ 足够。SPF 50+ 没有额外实质收益。', icon: '🏙️' },
          { num: '02', title: '户外运动 / 夏季', desc: 'SPF 30 以上、PA+++，每 2 小时补涂一次。', icon: '🏃' },
          { num: '03', title: '游泳 / 日光浴', desc: 'SPF 60+、PA++++，游泳后立即补涂。', icon: '🏊' },
          { num: '04', title: '儿童 / 敏感肌', desc: '选物理防晒剂（氧化锌、二氧化钛），不被皮肤吸收，刺激性小。', icon: '👶' },
        ]} />
        <blockquote>❗ 6 个月以下婴儿不应直接暴露在阳光下。1-6 个月皮肤极薄，防晒霜吸收风险高，以衣物遮挡和遮阳帽为主。</blockquote>

        <h2>晒伤后：让皮肤自己恢复</h2>
        <p>晒伤通常在日晒后 12-24 小时症状达峰，红斑持续约 1 周后消退、脱屑、色素沉着。严重时可出现水疱，甚至发热、头痛、恶心等全身反应。</p>
        <ol>
          <li>凉水湿敷患处，每次 15-20 分钟——帮助降低局部温度</li>
          <li>补充大量水分，预防脱水</li>
          <li>出现水疱时<strong>不要挑破</strong>，自行破裂即可</li>
          <li>全身反应（高热、寒战、严重脱水）立即就医</li>
          <li>新露出的皮肤层很薄，需要数周保护才能恢复</li>
        </ol>
        <blockquote>⚠️ 儿童时期反复严重晒伤，是成年后黑色素瘤和皮肤鳞癌的主要致病因素。这不是远期风险——是几十年后真实发生的。</blockquote>

        <Myths items={[
          { myth: '阴天不需要防晒', truth: '约 80% 的 UVB 可穿透云层，阴天仍会造成皮肤损伤。' },
          { myth: '涂一次防晒管一整天', truth: '出汗、摩擦、紫外线降解都会破坏防护层，每 2 小时必须补涂。' },
          { myth: 'SPF 100 比 SPF 30 好很多', truth: 'SPF 30 阻挡 97%，SPF 50 阻挡 98%，差距极小。SPF 30 以上已属过度。' },
          { myth: '晒伤后用冰块敷', truth: '冰块会冻伤已受损皮肤，加重组织损伤，应使用凉水而非冰水。' },
          { myth: '晒伤脱皮可以撕掉', truth: '脱皮是皮肤自我修复的过程，撕皮会暴露新生薄嫩皮肤层，延长愈合时间。' },
          { myth: '儿童用成人防晒霜就行', truth: '儿童皮肤吸收率高，应使用专门标注儿童适用的物理防晒霜。' },
        ]} />
        <div className="disclaimer">⚠️ 本文仅做防晒科普，不构成诊疗建议。出现水疱、高热、意识模糊等严重晒伤症状请立即就医。</div>
      </>
    ),
  },
  {
    slug: 'heat-illness',
    title: '中暑不是小事：分级识别与"移降补送"四步急救法',
    category: '高温急救',
    tag: '急救',
    difficulty: '进阶',
    readTime: '5分钟',
    cover: '🌡️',
    summary: '先兆中暑、轻症中暑、重症中暑——识别越早，干预效果越好。热射病死亡率可达 20-30%。',
    ref: '《中国中暑预防与急救指南》/ 国家应急广播 / 泉州市卫生健康委员会',
    content: (
      <>
        <h2>中暑的定义与核心机制</h2>
        <p>中暑是指人体在高温和/或高湿环境下，由于水和电解质丢失过多、散热功能衰竭，引起的以中枢神经系统和心血管系统功能障碍为主要表现的热损伤性疾病。</p>
        <blockquote>📌 核心指标：当环境温度 ≥ 32°C 且相对湿度 ≥ 60% 时，人体散热效率显著下降，中暑风险急剧升高。</blockquote>

        <h2>三级分级：识别越早，干预越有效</h2>
        <KnowledgeCard points={[
          { num: '01', title: '先兆中暑', desc: '口渴、乏力、多汗、头晕、注意力不集中。体温正常或略高，通常 < 38°C。立即脱离高温环境，补充含盐饮料，休息后即可恢复。', icon: '💧' },
          { num: '02', title: '轻症中暑', desc: '体温 ≥ 38°C，面色潮红或苍白，恶心呕吐，脉搏加快，血压偏低，心率加快。及时降温可阻止进展。', icon: '🥵' },
          { num: '03', title: '重症中暑（含热射病）', desc: '高热、痉挛、惊厥、休克、昏迷。核心体温可超 40°C，皮肤干燥无汗。属医疗急症，必须立即拨打 120。', icon: '🚑' },
        ]} />
        <blockquote>⚠️ 热射病是中暑最严重形式，重症患者死亡率可达 20-30%。但关键在中暑前或先兆阶段就干预——阻断发展为热射病是完全可行的，且主要发生现场处置环节。</blockquote>

        <h2>"移、降、补、送"四步急救法</h2>
        <ol>
          <li><strong>移</strong>：迅速转移到阴凉通风处，脱去紧身衣物。若患者昏迷，侧卧位防止呕吐物堵塞呼吸道</li>
          <li><strong>降</strong>：用凉水（非冰水）擦拭全身，重点冷敷颈部、腋窝、腹股沟等大血管区域；配合风扇加速蒸发散热。目标：30 分钟内将核心体温降至 38.5°C 以下</li>
          <li><strong>补</strong>：意识清醒者可少量多次饮用淡盐水或含电解质饮料，避免一次性大量饮水引发呕吐</li>
          <li><strong>送</strong>：重度中暑必须立即拨打 120。轻度中暑症状缓解后也建议就医，排查隐匿性器官损害</li>
        </ol>

        <h2>五个常见致命误区</h2>
        <Myths items={[
          { myth: '掐人中能救中暑', truth: '掐人中仅起疼痛刺激作用，对中暑体温调节失衡毫无帮助，甚至可能因疼痛刺激引发误吸窒息。' },
          { myth: '猛喝凉水能降温', truth: '大量喝凉水会稀释体内钠和钾，引发低钠血症（“水中毒”），加重乏力，反而恶化病情。' },
          { myth: '吃退烧药能退烧', truth: '对乙酰氨基酚、布洛芬针对感染性发热，对中暑引起的体温调节紊乱无效，还可能加重肝肾负担。' },
          { myth: '酒精擦浴能加速散热', truth: '酒精通过皮肤吸收会导致中毒，儿童、老人皮肤屏障脆弱，吸收风险更高，且酒精会导致血管收缩，反而阻碍散热。' },
          { myth: '大量用藿香正气水', truth: '藿香正气水含 40%-50% 酒精，高温下大量饮用会导致酒精大量吸收，引发不良反应，且无法替代科学补液。' },
          { myth: '中暑后立刻进空调房吹最冷', truth: '如果立即进入 22°C 以下低温空调房，会导致毛孔闭合，散热反而受阻，可能加重病情。建议降至 26°C 左右。' },
        ]} />

        <h2>不同人群的防护重点</h2>
        <ul>
          <li><strong>户外工作者</strong>：避开 10:00-16:00 高温时段；每工作 1 小时去阴凉处休息 15 分钟；穿透气浅色棉质衣物</li>
          <li><strong>儿童</strong>：避免长时间户外玩耍；外出戴遮阳帽、穿防晒衣；定时补充含电解质饮料</li>
          <li><strong>老年人 / 慢性病患者</strong>：体温调节能力弱，中暑风险高；室内保持通风，空调调至 26°C，避免直吹</li>
          <li><strong>孕妇</strong>：避免闷热环境；出现头晕、乏力立即停下休息</li>
        </ul>
        <blockquote>❗ 不只是户外——关着窗的闷热厨房、暴晒后的车内，同样存在巨大隐患。切勿仅凭气温判断中暑风险。</blockquote>
        <div className="disclaimer">⚠️ 本文仅做中暑科普，不构成诊疗建议。出现高热（≥40°C）、无汗、意识模糊、抽搐、昏迷等症状请立即拨打 120。</div>
      </>
    ),
  },
];