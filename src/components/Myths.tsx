interface MythsItem {
  myth: string;
  truth: string;
}

interface Myths {
  items: MythsItem[];
  title?: string;
}

export default function Myths({ items, title = '误区 vs 真相' }: Myths) {
  return (
    <div className="my-6">
      <div className="text-lg font-bold mb-3">{title}</div>
      <div className="grid gap-3">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr] gap-3">
            <div className="bg-[var(--danger-light)] text-[var(--danger-dark)] font-bold text-sm rounded-lg px-3 py-1 flex-shrink-0 inline-flex items-center justify-center min-w-[48px]">
              ✕ 误区
            </div>
            <div className="bg-white border-l-4 border-[var(--danger)] rounded-lg p-3">
              <div className="text-sm font-medium">{item.myth}</div>
              <div className="mt-2 pt-2 border-t border-[var(--border)] grid grid-cols-[auto_1fr] gap-3">
                <div className="bg-[var(--primary-light)] text-[var(--primary-dark)] font-bold text-sm rounded-lg px-3 py-1 flex-shrink-0 inline-flex items-center justify-center min-w-[48px]">
                  ✓ 真相
                </div>
                <div className="text-sm">{item.truth}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}