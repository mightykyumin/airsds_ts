import { useEffect, useMemo, useState } from "react"
import { DayPicker } from "react-day-picker"
import { CalendarIcon } from "lucide-react"
import { format, isAfter, isBefore, isSameDay, startOfToday } from "date-fns"
import type { DateRange, DayClickEventHandler } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import type { Props } from "@/data/types"

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Check-in — Check-out",
  className
}: Props) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<DateRange | undefined>(value)
  const [calendarKey, setCalendarKey] = useState(0)
  const today = startOfToday()

  useEffect(() => {
    if (open) setDraft(value)
  }, [open])

  const label = useMemo(() => {
    if (!value?.from) return placeholder
    if (value.to) return `${format(value.from, "yyyy-MM-dd")} — ${format(value.to, "yyyy-MM-dd")}`
    return `${format(value.from, "yyyy-MM-dd")} —`
  }, [value, placeholder])

  const hardResetCalendar = () => setCalendarKey(k => k + 1)

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (modifiers.disabled) return

    // 아무것도 선택 안 된 상태
    if (!draft?.from && !draft?.to) {
      setDraft({ from: day, to: undefined })
      return
    }

    // 시작만 선택된 상태
    if (draft?.from && !draft?.to) {
      if (isBefore(day, draft.from)) {
        // 더 이른 날짜를 클릭 → 시작일 재설정 + 잔상 제거
        setDraft({ from: day, to: undefined })
        hardResetCalendar()
        return
      }
      if (isSameDay(day, draft.from)) {
        const complete = { from: day, to: day }
        setDraft(complete)
        onChange(complete)
        setOpen(false)
        return
      }
      if (isAfter(day, draft.from)) {
        const complete = { from: draft.from, to: day }
        setDraft(complete)
        onChange(complete)
        setOpen(false)
        return
      }
    }

    // 범위 완성 상태에서 클릭 → 전체 초기화 후 새 시작일 + 잔상 제거
    onChange(undefined)
    setDraft({ from: day, to: undefined })
    hardResetCalendar()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full min-w-[260px] justify-start whitespace-nowrap text-left font-normal ${className || ""}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[660px] max-w-[calc(100vw-1rem)] overflow-auto"
        align="start"
      >
        <div className="p-2">
          <DayPicker
            key={calendarKey}
            mode="range"
            selected={draft}
            onDayClick={handleDayClick}
            numberOfMonths={2}
            weekStartsOn={1}
            defaultMonth={draft?.from ?? value?.from ?? today}
            fromMonth={today}
            disabled={{ before: today }}
            modifiersStyles={{
              disabled: { opacity: 0.45, cursor: "not-allowed", textDecoration: "line-through" }
            }}
            styles={{
              months: { display: "flex", flexWrap: "nowrap" }
            }}
            footer={
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDraft(undefined)
                    onChange(undefined)
                    hardResetCalendar() // Clear 시에도 잔상 제거
                  }}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (draft?.from) {
                      onChange(draft)
                      if (draft.to) setOpen(false)
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
