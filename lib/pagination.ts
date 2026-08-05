export function getPagination(
  currentPage: number,
  totalPages: number,
): (number | "...")[] {
  const pages = new Set<number>();

  // أول وآخر صفحة
  pages.add(1);
  pages.add(totalPages);

  if (currentPage === 1) {
    pages.add(2);
    pages.add(3);
  } else if (currentPage === totalPages) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
  } else {
    pages.add(currentPage - 1);
    pages.add(currentPage);
    pages.add(currentPage + 1);
  }

  // حذف الأرقام خارج الرينج
  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const result: (number | "...")[] = [];

  for (let i = 0; i < sortedPages.length; i++) {
    const current = sortedPages[i];

    if (i === 0) {
      result.push(current);
      continue;
    }

    const previous = sortedPages[i - 1];
    const diff = current - previous;

    if (diff === 2) {
      // مخفى رقم واحد
      result.push(previous + 1);
    } else if (diff > 2) {
      // مخفى رقمين أو أكتر
      result.push("...");
    }

    result.push(current);
  }

  return result;
}
