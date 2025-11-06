"use client";

import Toast from "./Toast";

export default function Notification({
  showCopySuccess,
  showCreateSuccess,
  showUpdateSuccess,
  showDeleteSuccess,
  onCloseCopy,
  onCloseCreate,
  onCloseUpdate,
  onCloseDelete,
}) {
  return (
    <>
      <Toast
        show={showCopySuccess}
        message="Copied API Key to clipboard"
        bgColor="bg-green-600"
        onClose={onCloseCopy}
      />
      <Toast
        show={showCreateSuccess}
        message="API Key created successfully"
        bgColor="bg-green-600"
        onClose={onCloseCreate}
      />
      <Toast
        show={showUpdateSuccess}
        message="API Key updated successfully"
        bgColor="bg-green-600"
        onClose={onCloseUpdate}
      />
      <Toast
        show={showDeleteSuccess}
        message="API Key deleted successfully"
        bgColor="bg-red-600"
        onClose={onCloseDelete}
      />
    </>
  );
}
