'use client';
import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
const Label = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(LabelPrimitive.Root, Object.assign({ ref: ref, className: cn(labelVariants(), className) }, props)));
});
Label.displayName = LabelPrimitive.Root.displayName;
export { Label };
//# sourceMappingURL=label.js.map