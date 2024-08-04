"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export function DueDate({ handleDate } : {
    handleDate: any
}) {
  const [date, setDate] = React.useState<Date>()
  const datttt = (e: any)=> {
    setDate(e);
   
    handleDate((prev : any) => ({
        ...prev,
        projectDueDate: e
    }))
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " flex justify-between text-left font-normal w-full",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>mm/dd/yyy</span>}
          <CalendarIcon className="mr-2 h-4 w-4 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={datttt}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
