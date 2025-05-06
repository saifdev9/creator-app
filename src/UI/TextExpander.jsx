import { Button } from "@/components/ui/button";
import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shownText = !isExpanded
    ? children
    : children.split(" ").slice(0, 5).join(" ") + "...";

  return (
    <p className="line-clamp-4 text-foreground">
      {shownText}{" "}
      {children.split(" ").length > 5 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </p>
  );
}

export default TextExpander;
