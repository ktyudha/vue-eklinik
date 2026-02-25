import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/id'

dayjs.extend(customParseFormat);

export const parseYMDToDate = (ymd: string) =>
  dayjs(ymd, "YYYY-MM-DD").toDate();

export const parseMonthValue = (value: string) => {
  const [year, month] = value.split("-");
  return {
    year: Number(year),
    month: Number(month),
  };
};

export const parseMonthAndRange = (value: string) => {
  const base = dayjs(value, ["YYYY-MM", "MM-YYYY"], true);

  return {
    year: base.year(),
    month: base.month() + 1,
    start_date: base.startOf("month").format("YYYY-MM-DD"),
    end_date: base.endOf("month").format("YYYY-MM-DD"),
  };
};

export const formatDateAsYMD = (date: Date) => dayjs(date).format("YYYY-MM-DD");
export const formatDateAsYM = (date: Date) => dayjs(date).format("YYYY-MM");
export const formatDateShort = (date: Date) => dayjs(date).locale('id').format('DD MMM YYYY')

export const formatAge = (date: Date) => {
  const now = dayjs()
  const birth = dayjs(date)

  const years = now.diff(birth, 'year')
  const months = now.diff(birth.add(years, 'year'), 'month')
  const days = now.diff(birth.add(years, 'year').add(months, 'month'), 'day')

  return `${years} th ${months} bln ${days} hr`
}

export const today = new Date();
export const todayYMDString = formatDateAsYMD(today);
export const todayYMString = formatDateAsYM(today);
