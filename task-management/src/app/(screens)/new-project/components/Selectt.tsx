import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Selectt({ handleSelect }: {
  handleSelect: any
}) {
  const handleValueChange = (e: any)=>{
    // console.log(e)
    handleSelect((prev: any)=>({
      ...prev,
      projectCategory: e
    }))
  }
  
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select.." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel></SelectLabel> */}
          <SelectItem value="development">Development</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          {/* <SelectItem value="pineapple"></SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
