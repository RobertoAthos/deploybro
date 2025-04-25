import { Rocket } from "lucide-react";
import React from "react";

export default function BranchItem({
    branch,
    deployName,
    enviroment
}:{
    deployName: string;
    enviroment: string;
    branch: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
        <Rocket className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="font-medium">{deployName}</div>
        <div className="text-sm text-muted-foreground">
          {enviroment} • {branch}
        </div>
      </div>
    </div>
  );
}
