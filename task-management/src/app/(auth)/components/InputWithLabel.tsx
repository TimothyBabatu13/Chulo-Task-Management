import { Input } from "@/components/ui/input"

const InputWithLabel = ({ type, labelText, placeholder, value, id, onChange, name, accept, className} : {
    type: 'text' | 'email' | 'password' | 'file',
    labelText: string,
    placeholder: string,
    id: string,
    onChange: (e: any)=> any,
    value?: string,
    name: string,
    accept?: string,
    className?: string
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor={id}>{labelText}</label>
        <Input className={className} accept={accept}  name={name} value={value} id={id} onChange={onChange} placeholder={placeholder} type={type}/>
    </div>
  )
}

export default InputWithLabel