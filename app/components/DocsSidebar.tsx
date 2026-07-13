"use client";

import { type ReactElement, useEffect, useMemo, useState } from "react";

import { getActiveSectionId, type SectionPosition } from "../lib/docsNavigation";

export interface DocsNavGroup {
  label: string;
  items: Array<{ id: string; label: string }>;
}

interface DocsSidebarProps {
  groups: DocsNavGroup[];
}

export function DocsSidebar({ groups }: DocsSidebarProps): ReactElement {
  const sectionIds = useMemo(() => groups.flatMap((group) => group.items.map((item) => item.id)), [groups]);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    let frameId: number | null = null;

    function updateActiveSection(): void {
      frameId = null;

      const sections = sectionIds.flatMap<SectionPosition>((id) => {
        const element = document.getElementById(id);
        return element ? [{ id, top: element.getBoundingClientRect().top }] : [];
      });
      const scrollPaddingTop = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const atPageEnd = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 1;
      const nextActiveId = getActiveSectionId(sections, scrollPaddingTop + 1, atPageEnd);

      setActiveId(nextActiveId);
    }

    function requestUpdate(): void {
      if (frameId === null) frameId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, [sectionIds]);

  return (
    <nav className="docs-sidebar" aria-label="Documentation sections">
      {groups.map((group) => (
        <div key={group.label} className="docs-sidebar-group">
          <div className="docs-sidebar-label">{group.label}</div>
          {group.items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="docs-sidebar-link"
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(item.id)}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
