import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  TrendingDown
} from "lucide-react";

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  // Basic redirection based on role
  if (session.user.role === "superAdmin") {
    redirect("/dashboard/eco");
  }

  if (session.user.role === "admin") {
    redirect("/dashboard/business");
  }

  // Admin Dashboard Content
  const stats = [
    { label: "Ventas del Mes", value: "$4.5M", change: "+12.5%", icon: BarChart3, trend: "up" },
    { label: "Nuevos Clientes", value: "28", change: "+5.2%", icon: Users, trend: "up" },
    { label: "Stock Bajo", value: "12", change: "Alertas", icon: Package, trend: "down" },
    { label: "Ventas Hoy", value: "8", change: "+2", icon: ShoppingBag, trend: "up" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-navy mb-2">Resumen General</p>
        <h1 className="text-4xl font-black text-primary tracking-tight">
          Hola, {session.user.name} 👋
        </h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-background border border-foreground/5 p-6 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-navy/5 rounded-2xl group-hover:bg-navy group-hover:text-white transition-colors">
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                stat.trend === 'up' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-secondary text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-primary">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Content Sections (Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-background border border-foreground/5 p-8 rounded-[40px] h-[400px]">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-primary tracking-tight">Ventas Recientes</h3>
                <button className="text-xs font-black uppercase tracking-widest text-navy hover:underline">Ver todas</button>
            </div>
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40">
                <div className="p-4 bg-foreground/5 rounded-full">
                    <BarChart3 size={40} />
                </div>
                <p className="font-bold">Aún no hay ventas registradas hoy</p>
            </div>
        </div>

        <div className="bg-navy text-white p-8 rounded-[40px] shadow-2xl shadow-navy/20 flex flex-col justify-between">
            <div className="space-y-4">
                 <div className="bg-white/10 w-fit p-3 rounded-2xl">
                    <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-black tracking-tight leading-tight">
                    Escala tu negocio al siguiente nivel con analíticas avanzadas.
                </h3>
            </div>
            <button className="bg-white text-navy w-full py-4 rounded-2xl font-black tracking-tight flex items-center justify-center group">
                Explorar KODA Pro
                <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
}