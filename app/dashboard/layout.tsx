import Link from "next/link";
import { LayoutDashboard, History, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background text-zinc-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-zinc-900/30 hidden md:flex flex-col p-4">
                <div className="text-xl font-bold tracking-tight text-white mb-8 px-2">GRAVITYLESS</div>

                <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-white/5 text-white">
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        Dashboard
                    </Link>
                    <Link href="/dashboard/history" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                        <History className="w-5 h-5" />
                        History
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>
                </nav>

                <div className="mt-auto pt-4 border-t border-white/5">
                    <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors w-full">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm sticky top-0 z-10 md:hidden">
                    <div className="font-bold">GRAVITYLESS</div>
                    {/* Mobile menu trigger would go here */}
                </header>
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
