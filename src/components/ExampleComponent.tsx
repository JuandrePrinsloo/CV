import { useState } from 'react'
import { Button } from '@/components/ui/button'

/**
 * Example component showing how to use hooks and components
 * This is a template you can copy and modify
 */
export function ExampleComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Example Component</h2>
      <p className="mt-2 text-muted-foreground">
        Count: <span className="font-bold text-foreground">{count}</span>
      </p>
      <Button
        onClick={() => setCount(count + 1)}
        className="mt-4"
      >
        Increment
      </Button>
    </div>
  )
}

