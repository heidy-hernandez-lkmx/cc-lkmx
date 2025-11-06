"use client";

import { useState } from "react";
import Notification from "@/app/components/Notification";
import Sidebar from "@/app/components/Sidebar";
import DashboardContent from "./DashboardContent";

export default function Dashboards() {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCopySuccess = () => {
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false);
    }, 3000);
  };

  const handleCreateSuccess = () => {
    setShowCreateSuccess(true);
    setTimeout(() => {
      setShowCreateSuccess(false);
    }, 3000);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateSuccess(true);
    setTimeout(() => {
      setShowUpdateSuccess(false);
    }, 3000);
  };

  const handleDeleteSuccess = () => {
    setShowDeleteSuccess(true);
    setTimeout(() => {
      setShowDeleteSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Componente de notificaciones */}
      <Notification
        showCopySuccess={showCopySuccess}
        showCreateSuccess={showCreateSuccess}
        showUpdateSuccess={showUpdateSuccess}
        showDeleteSuccess={showDeleteSuccess}
        onCloseCopy={() => setShowCopySuccess(false)}
        onCloseCreate={() => setShowCreateSuccess(false)}
        onCloseUpdate={() => setShowUpdateSuccess(false)}
        onCloseDelete={() => setShowDeleteSuccess(false)}
      />

      {/* Sidebar izquierdo */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Contenido del dashboard */}
      <DashboardContent
        onCopySuccess={handleCopySuccess}
        onCreateSuccess={handleCreateSuccess}
        onUpdateSuccess={handleUpdateSuccess}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
