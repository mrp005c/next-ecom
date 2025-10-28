"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// A custom hook for showing confirm dialogs
export function useConfirmDialog() {
  const [promise, setPromise] = useState(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = (answer) => {
    if (promise) {
      promise.resolve(answer);
      setPromise(null);
    }
  };

  const ConfirmDialog = (
    <AlertDialog open={!!promise} onOpenChange={() => handleClose(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleClose(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClose(true)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [ConfirmDialog, confirm];
}
