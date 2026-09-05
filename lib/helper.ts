import { DateRange } from "react-day-picker";

export function formateDeadline(date: string | undefined) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatCreatedAt(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export const formatDateForInput = (date: string) => {
  return date.slice(0, 10);
};

export function formatDateForApi(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

export const buildRedirectUrl = (path: string, redirectTo: string) => {
  return `${path}?redirect=${encodeURIComponent(redirectTo)}`;
};

export function getCurrentWeek(): DateRange {
  // التاريخ الحالي
  const today = new Date();

  // رقم اليوم في الأسبوع
  // Sunday = 0
  // Monday = 1
  // ...
  // Saturday = 6
  const day = today.getDay();

  // حساب عدد الأيام التي نحتاج الرجوع بها للوصول إلى Monday
  //
  // لو Sunday:
  // نرجع 6 أيام
  //
  // باقي الأيام:
  // Monday = 1 -> 0
  // Tuesday = 2 -> -1
  // Wednesday = 3 -> -2
  // ...
  const diffToMonday = day === 0 ? -6 : 1 - day;

  // نعمل نسخة من today
  const monday = new Date(today);

  // نرجع من today إلى Monday
  monday.setDate(today.getDate() + diffToMonday);

  // نعمل نسخة من Monday
  const sunday = new Date(monday);

  // Sunday بعد Monday بـ 6 أيام
  sunday.setDate(monday.getDate() + 6);

  // React DayPicker mode="range"
  // يتوقع from و to
  return {
    from: monday,
    to: sunday,
  };
}

export function formatDateRange(range: DateRange | undefined) {
  if (!range?.from || !range?.to) return "";

  const from = range.from.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const to = range.to.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const year = range.to.getFullYear();

  return `${from} - ${to}, ${year}`;
}