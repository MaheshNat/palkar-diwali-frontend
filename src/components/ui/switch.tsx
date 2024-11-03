import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const switchVariants = cva("", {
  variants: {
    size: {
      default: "h-6 w-11",
      sm: "h-5 w-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const switchThumbVariants = cva("", {
  variants: {
    size: {
      default: "size-5 data-[state=checked]:translate-x-5",
      sm: "size-4 data-[state=checked]:translate-x-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> &
  VariantProps<typeof switchVariants> & {
    asChild?: boolean;
  };

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      switchVariants({
        size: size,
        className:
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-background data-[state=unchecked]:bg-input",
      })
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        switchThumbVariants({
          size: size,
          className:
            "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
        })
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
