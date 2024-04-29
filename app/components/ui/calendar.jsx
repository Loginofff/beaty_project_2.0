import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "/lib/utils";
import { buttonVariants } from "../ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDayClick = (day) => {
    // Если дата уже выбрана, снимаем ее выбор
    if (selectedDate && selectedDate.getTime() === day.getTime()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(day);
    }
  };

  // Функция для проверки, является ли день прошедшим
  const isPastDay = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  // Настройка для всех прошедших дней как неактивных
  const disabledDays = { before: new Date() };

  return (
    <div className="relative">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-neutral-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-neutral-400",
          row: "flex w-full mt-2",
          cell: cn(
            "h-9 w-9 text-center p-0 relative cursor-pointer",
            "hover:bg-green-600 hover:text-white border rounded-full text-center",
            "first:rounded-l-full last:rounded-r-full"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-green-600 text-white border-green-600 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white",
          day_today: "bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50",
          day_outside:
            "day-outside text-neutral-500 opacity-50 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400",
          day_disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
          day_range_middle:
            "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        selected={selectedDate}
        onDayClick={handleDayClick}
        disabledDays={disabledDays} // Делаем все прошедшие дни недоступными по умолчанию
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
