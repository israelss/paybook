const getScrolledParent = (el: HTMLElement | null): HTMLElement | null => {
  if (el === null || el.parentElement === null) return null
  if (el.parentElement.scrollTop > 0) return el.parentElement
  return getScrolledParent(el.parentElement)
}

export const scroll = (id: string, isMobile: boolean): void => {
  const selectedElement = document.getElementById(id)
  selectedElement?.scrollIntoView()
  if (isMobile) {
    const scrolledParent = getScrolledParent(selectedElement)
    if (scrolledParent === null) return
    const scrolledParentScrollTop = scrolledParent.scrollTop
    scrolledParent.scrollTop = scrolledParentScrollTop - 138
  }
  if (!id.startsWith('details-')) scroll(`details-${id}`, isMobile)
}
