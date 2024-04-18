import dayjs from 'dayjs';

export interface WorkDay {
  day: string;
  openTime: dayjs.Dayjs | null | undefined;
  closeTime: dayjs.Dayjs | null | undefined;
  breakTime: dayjs.Dayjs | null | undefined;
  breakOffTime: dayjs.Dayjs | null | undefined;
}

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
  key: string;
}
