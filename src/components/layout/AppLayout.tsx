"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";
import CreatePostModal from "../feed/CreatePostModal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased font-body-md overflow-x-hidden">
      <Header onOpenCreatePost={() => setIsCreatePostOpen(true)} />

      <div className="flex flex-1 w-full relative">
        <Sidebar onOpenCreatePost={() => setIsCreatePostOpen(true)} />
        
        <main className="flex-1 w-full min-h-screen pb-20 lg:pb-0 overflow-y-auto">
          {children}
        </main>
      </div>

      <BottomNav />

      {/* Global Create Post Modal */}
      {isCreatePostOpen && (
        <CreatePostModal
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
          onPostCreated={() => {
            setIsCreatePostOpen(false);
            window.dispatchEvent(new Event("posts-updated"));
          }}
        />
      )}
    </div>
  );
}
