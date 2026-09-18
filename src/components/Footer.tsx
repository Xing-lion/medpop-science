export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)] mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-bold text-[var(--primary-dark)] mb-2">
              <span className="text-xl">🩺</span>
              <span>医知百科</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-sm">
              面向中小学生及大众的医学、康复类科普平台，让健康知识看得懂、用得上。
            </p>
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            <p className="font-medium text-[var(--text)] mb-1">免责声明</p>
            <p>本站内容仅供科普参考，不构成医疗诊断或治疗建议。如出现不适症状，请及时前往正规医疗机构就诊。</p>
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} 医知百科 · MedPop Science · All rights reserved.
          <br />
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            鲁ICP备2026053417号-1
          </a>
        </div>
      </div>
    </footer>
  );
}