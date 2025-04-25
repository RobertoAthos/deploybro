import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, GitBranch, MoreHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function DeployHistoryItem() {
  return (
    <tr className="bg-background border-b">
      <td className="px-4 py-3">Iterar ness componente</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <GitBranch className="h-3.5 w-3.5" />
          <span>main</span>
        </div>
      </td>
      <td className="px-4 py-3">Produção</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>18/04/2023, 14:30</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          <Check className="h-3.5 w-3.5 mr-1" /> Sucesso
        </Badge>
      </td>
      <td className="px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8" variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Ações</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            <DropdownMenuItem>Repetir deploy</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
