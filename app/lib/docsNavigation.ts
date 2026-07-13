export interface SectionPosition {
  id: string;
  top: number;
}

export function getActiveSectionId(sections: SectionPosition[], anchorY: number, atPageEnd = false): string {
  if (sections.length === 0) return "";
  if (atPageEnd) return sections[sections.length - 1].id;

  let activeId = sections[0].id;

  for (const section of sections) {
    if (section.top > anchorY) break;
    activeId = section.id;
  }

  return activeId;
}
