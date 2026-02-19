export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full" />
            </div>

            <main className="relative z-10 flex flex-col items-center gap-12 px-6 text-center">
                <div className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-[10px] tracking-[4px] uppercase text-yellow-500 font-bold mb-4 animate-pulse">
                    Darklands API Gateway
                </div>

                <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                        BACKEND
                    </h1>
                    <p className="text-zinc-500 text-lg md:text-xl max-w-lg mx-auto font-light leading-relaxed">
                        Infrastructure powering the Darklands Festival experience.
                        Real-time data synchronization and API services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
                    {[
                        { label: 'API STATUS', value: 'OPERATIONAL', color: 'text-green-500' },
                        { label: 'DATABASE', value: 'LOCAL JSON', color: 'text-yellow-500' },
                        { label: 'VERSION', value: '1.0.0', color: 'text-zinc-400' },
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/30 backdrop-blur-xl group hover:border-zinc-700 transition-all duration-500">
                            <div className="text-[10px] tracking-widest text-zinc-600 mb-2">{item.label}</div>
                            <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a
                        href="/api/events"
                        className="px-8 py-4 rounded-xl bg-yellow-500 text-black font-bold hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        TEST API ENDPOINT
                    </a>
                </div>
            </main>
        </div>
    );
}
