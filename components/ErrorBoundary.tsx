"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="size-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Waduh, ada kesalahan!</h1>
                        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                            Sepertinya aplikasi mengalami kendala teknis. Jangan khawatir, kamu bisa mencoba menyegarkan halaman atau kembali ke Beranda.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md shadow-blue-500/20"
                            >
                                <RefreshCcw size={18} />
                                Segarkan Halaman
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition-all"
                            >
                                <Home size={18} />
                                Kembali ke Beranda
                            </button>
                        </div>

                        {process.env.NODE_ENV !== "production" && (
                            <div className="mt-8 pt-6 border-t border-slate-100 text-left">
                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">Debug Info:</p>
                                <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-rose-700 overflow-auto max-h-32">
                                    {this.state.error?.toString()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
