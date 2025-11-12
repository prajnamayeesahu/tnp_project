"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

// Custom Toaster ensuring opaque background & high z-index
const Toaster = (props: ToasterProps) => {
  const mergedToastOptions: ToasterProps["toastOptions"] = {
    ...props.toastOptions,
    classNames: {
      ...(props.toastOptions?.classNames || {}),
      toast: [
        "bg-white dark:bg-neutral-900",
        "text-foreground",
        "shadow-lg",
        "border border-border",
        "rounded-md",
        props.toastOptions?.classNames?.toast || ""
      ].join(" ").trim(),
    },
    style: {
      backdropFilter: "none", // remove any blur transparency
      ...props.toastOptions?.style,
    },
  };

  return (
    <Sonner
      position={props.position || "top-right"}
      theme={props.theme || "light"}
      toastOptions={mergedToastOptions}
      className="toaster group"
      style={{ zIndex: 10000 }}
      {...props}
    />
  );
};

export { Toaster };
