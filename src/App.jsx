
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity, AlertTriangle, ShieldCheck, TrendingUp,
  ArrowUpRight, Menu, X, Database, BarChart3,
  MapPin, Layers, CheckCircle2, Car
} from "lucide-react";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, LineChart, Line
} from "recharts";
import { severityData as heatmapSeverityData, years } from "./roadData";
import Heatmap from "./Heatmap";
import KMeansChart from "./KMeansChart";
import AccidentComparison from "./AccidentComparison";
import DeathRateComparison from "./DeathRateComparison";
const severityData = [
  { state: "Bihar", value: 82.4 },
  { state: "Punjab", value: 77.5 },
  { state: "Jharkhand", value: 75.3 },
  { state: "Tamil Nadu", value: 28 },
  { state: "Kerala", value: 10 },
];

const trendData = [
  { year: "2020", Bihar: 77.5 },
  { year: "2021", Bihar: 80.2 },
  { year: "2022", Bihar: 82.4 },
];

const qualityData = [
  { name: "Completeness", before: 96.4, after: 100 },
  { name: "Validity", before: 37.4, after: 100 },
  { name: "Continuity", before: 94.6, after: 100 },
  { name: "Agreement", before: 100, after: 100 },
];

const clusters = [
  {
    number: "01",
    title: "High Severity",
    color: "border-red-400",
    description: "Approximately 70 deaths per 100 accidents.",
    states: "Bihar, Jharkhand, Punjab, Meghalaya, Uttarakhand and Arunachal Pradesh."
  },
  {
    number: "02",
    title: "Higher Accident Volume",
    color: "border-blue-400",
    description: "Approximately 33 deaths per 100 accidents.",
    states: "21 states and UTs, including Uttar Pradesh, Maharashtra, Tamil Nadu, Karnataka and Kerala."
  },
  {
    number: "03",
    title: "Smaller Data Groups",
    color: "border-purple-400",
    description: "Changes influenced by smaller accident numbers.",
    states: "Manipur, Mizoram, Sikkim, Tripura, A & N Islands, Chandigarh and D & N Haveli."
  }
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-10">
      <p className="text-indigo-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>
      <p className="text-slate-400 mt-3 max-w-2xl leading-7">
        {description}
      </p>
    </div>
  );
}

function App() {
  const [year, setYear] = useState("2022");
  const [selectedState, setSelectedState] = useState("Bihar");
  const [menuOpen, setMenuOpen] = useState(false);

  const stateValues = {
    Bihar: { 2020: 77.5, 2021: 80.2, 2022: 82.4 },
    Punjab: { 2020: 74.9, 2022: 77.5 },
    Jharkhand: { 2020: 69.1, 2022: 75.3 },
  };

  const selectedValue = stateValues[selectedState][year];

  const navLinks = [
    ["Home", "home"],
    ["Dashboard", "dashboard"],
    ["Insights", "insights"],
    ["Data Audit", "audit"],
    ["Methodology", "methodology"],
  ];

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b1020]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Activity size={22} />
            </div>
            <div>
              <h1 className="font-extrabold tracking-wider text-lg">
                ROADSAFE<span className="text-indigo-400"> INDIA</span>
              </h1>
              <p className="text-[9px] text-slate-400 tracking-[0.2em]">
                ROAD SAFETY INTELLIGENCE
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(([label, link]) => (
              <a key={link} href={`#${link}`}
                className="text-sm text-slate-300 hover:text-indigo-400 transition">
                {label}
              </a>
            ))}
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden px-6 pb-5 flex flex-col gap-4">
            {navLinks.map(([label, link]) => (
              <a key={link} href={`#${link}`}
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400">
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-36 pb-24 px-6">
        <div className="absolute w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full -top-20 -right-20" />
        <div className="absolute w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full bottom-0 left-0" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 rounded-full text-indigo-300 text-xs font-semibold mb-7">
              <Activity size={15} />
              DATA INTELLIGENCE · INDIA 2020–2022
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.08] tracking-tight">
              Understanding
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                Road Safety
              </span>
              Across India.
            </h1>

            <p className="text-slate-400 text-lg leading-8 mt-7 max-w-xl">
              Beyond accident numbers. Explore state-wise road accident
              severity, uncover data quality issues and discover patterns
              through data analytics.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <a href="#dashboard"
                className="bg-indigo-600 hover:bg-indigo-500 px-7 py-4 rounded-xl font-semibold flex items-center gap-2 transition">
                Explore Dashboard <ArrowUpRight size={19} />
              </a>
              <a href="#methodology"
                className="border border-white/15 hover:bg-white/5 px-7 py-4 rounded-xl font-semibold transition">
                Explore Methodology
              </a>
            </div>

            <p className="text-xs text-slate-500 mt-8">
              DATA PERIOD: 2020 — 2022 · SOURCE: MoRTH
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
            <div className="relative bg-[#151d32] border border-white/10 rounded-3xl p-7 md:p-9 shadow-2xl">
              <div className="flex justify-between items-center mb-9">
                <div>
                  <p className="text-slate-400 text-sm">India at a glance</p>
                  <h3 className="text-xl font-bold mt-1">Road Safety Overview</h3>
                </div>
                <div className="bg-indigo-500/15 p-3 rounded-xl text-indigo-400">
                  <Car size={25} />
                </div>
              </div>

              <div className="space-y-7">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400 text-sm">Accidents in 2022</span>
                    <span className="font-bold">4,61,312</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400 text-sm">Deaths in 2022</span>
                    <span className="font-bold">1,68,491</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gradient-to-r from-red-500 to-orange-400 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#0b1020] p-5 rounded-2xl">
                    <TrendingUp className="text-red-400 mb-3" />
                    <p className="text-3xl font-black">36.5</p>
                    <p className="text-xs text-slate-400 mt-2">Deaths per 100 accidents</p>
                  </div>
                  <div className="bg-[#0b1020] p-5 rounded-2xl">
                    <ShieldCheck className="text-emerald-400 mb-3" />
                    <p className="text-3xl font-black">100%</p>
                    <p className="text-xs text-slate-400 mt-2">Post-cleaning quality score</p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 mt-6">
                Official figures and project audit results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Total Accidents", value: "4,61,312", icon: Car, color: "text-blue-400" },
            { label: "Total Fatalities", value: "1,68,491", icon: AlertTriangle, color: "text-red-400" },
            { label: "Deaths / 100 Accidents", value: "36.5", icon: Activity, color: "text-orange-400" },
            { label: "Quality After Cleaning", value: "100%", icon: ShieldCheck, color: "text-emerald-400" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#151d32] border border-white/10 rounded-2xl p-6 hover:border-indigo-400/50 transition"
            >
              <item.icon className={`${item.color} mb-5`} size={25} />
              <p className="text-3xl font-black">{item.value}</p>
              <p className="text-slate-400 text-sm mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="px-6 py-24 bg-[#0e1629]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="01 / Analytics"
            title="Explore the numbers."
            description="Compare road accident severity across selected Indian states and examine how the figures change over time."
          />

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#151d32] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg">Deaths per 100 accidents</h3>
              <p className="text-slate-400 text-sm mt-1 mb-7">
                Selected state comparison · 2022
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={severityData} layout="vertical" margin={{ left: 5, right: 25 }}>
                    <CartesianGrid stroke="#334155" strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} />
                    <YAxis type="category" dataKey="state" stroke="#94a3b8" width={85} />
                    <Tooltip contentStyle={{ background: "#151d32", border: "1px solid #475569", borderRadius: 12 }} />
                    <Bar dataKey="value" name="Deaths per 100" fill="#818cf8" radius={[0, 7, 7, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Kerala's value is approximate. Other displayed figures are from the project.
              </p>
            </div>

            <div className="bg-[#151d32] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg">Yearly severity trend</h3>
              <p className="text-slate-400 text-sm mt-1 mb-7">
                Explore Bihar's deaths per 100 accidents
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {Object.keys(stateValues).map(state => (
                  <button
                    key={state}
                    onClick={() => {
                      setSelectedState(state);
                      if (!stateValues[state][year]) setYear("2022");
                    }}
                    className={`px-4 py-2 rounded-lg text-sm transition ${
                      selectedState === state
                        ? "bg-indigo-600 text-white"
                        : "bg-[#0b1020] text-slate-400 hover:text-white"
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <label htmlFor="year-select" className="text-sm text-slate-400">
                  Select year:
                </label>
                <select
                  id="year-select"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="bg-[#0b1020] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {[2020, 2021, 2022].filter(y => stateValues[selectedState][y]).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="bg-[#0b1020] rounded-2xl p-7">
                <p className="text-slate-400 text-sm">
                  {selectedState} · {year}
                </p>
                <p className="text-5xl font-black text-indigo-400 mt-3">
                  {selectedValue}
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Deaths per 100 accidents
                </p>
              </div>

              {selectedState === "Bihar" && (
                <div className="h-36 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" domain={[70, 90]} />
                      <Tooltip contentStyle={{ background: "#151d32", border: "1px solid #475569" }} />
                      <Line type="monotone" dataKey="Bihar" stroke="#818cf8" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              <p className="text-xs text-slate-500 mt-3">
                The year-wise trend chart is shown for Bihar, for which all three yearly figures are available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATE INSIGHTS */}
      <section id="insights" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="02 / State insights"
            title="Not all accidents are equal."
            description="Accident volume and accident severity tell different stories. Explore some of the key findings from the analysis."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { state: "Bihar", value: "82.4", detail: "Highest among states with 500+ accidents", color: "text-red-400" },
              { state: "Punjab", value: "77.5", detail: "Among the highest severity figures", color: "text-orange-400" },
              { state: "Jharkhand", value: "75.3", detail: "High accident severity", color: "text-yellow-400" },
              { state: "Kerala", value: "~10", detail: "Among the lowest severity figures", color: "text-emerald-400" },
            ].map(item => (
              <div key={item.state} className="bg-[#151d32] border border-white/10 rounded-2xl p-6">
                <MapPin className="text-slate-400 mb-5" />
                <p className="text-slate-400">{item.state}</p>
                <p className={`text-4xl font-black mt-2 ${item.color}`}>{item.value}</p>
                <p className="text-xs text-slate-500 mt-3">Deaths per 100 accidents · 2022</p>
                <p className="text-sm text-slate-300 mt-4">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 bg-indigo-500/10 border border-indigo-400/20 rounded-2xl p-7">
            <h3 className="font-bold text-xl mb-3">Why look beyond accident counts?</h3>
            <p className="text-slate-300 leading-7">
              Tamil Nadu recorded the highest number of accidents (64,105),
              while Bihar had the highest severity among states with at least
              500 accidents. Ranking states only by accident count can hide
              where accidents are deadliest. A high ratio may also reflect
              fewer minor accidents being recorded.
            </p>
          </div>
        </div>
      </section>

      {/* DATA QUALITY */}
      <section id="audit" className="px-6 py-24 bg-[#0e1629]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="03 / Data quality audit"
            title="Trust the data. Verify the numbers."
            description="The project audited and cleaned the official state-wise accident tables before conducting statistical analysis."
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { title: "Before Cleaning", value: "82.1%", color: "text-orange-400", description: "Initial overall quality score" },
              { title: "After Cleaning", value: "100%", color: "text-emerald-400", description: "Overall score after corrections" }
            ].map(card => (
              <div key={card.title} className="bg-[#151d32] border border-white/10 p-7 rounded-2xl">
                <div className="flex justify-between items-center">
                  <p className="text-slate-400">{card.title}</p>
                  <ShieldCheck className={card.color} />
                </div>
                <p className={`text-5xl font-black mt-5 ${card.color}`}>{card.value}</p>
                <p className="text-sm text-slate-400 mt-2">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#151d32] border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="font-bold text-lg mb-7">Quality dimensions comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qualityData} margin={{ bottom: 15 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#151d32", border: "1px solid #475569", borderRadius: 12 }} />
                  <Bar dataKey="before" name="Before cleaning" fill="#f59e0b" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="after" name="After cleaning" fill="#34d399" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-5 text-sm mt-4 text-slate-400">
              <span>🟠 Before cleaning</span>
              <span>🟢 After cleaning</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
            {[
              "Corrected text-formatted numbers",
              "Removed footnote marks",
              "Handled empty cells",
              "Checked state sums against All-India totals",
              "Combined Ladakh with Jammu & Kashmir",
              "Removed empty Daman & Diu row"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#151d32] p-5 rounded-xl border border-white/5">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={19} />
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-6 leading-6">
            Note: The post-cleaning score is partly by design because cleaning
            removes the issues measured by the quality audit.
          </p>
        </div>
      </section>

      {/* K MEANS */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="04 / Machine learning"
            title="Discovering patterns with K-means."
            description="K-means clustering groups states using accident volume, changes in accident numbers and deaths per 100 accidents."
          />

          <div className="grid lg:grid-cols-3 gap-5">
            {clusters.map(cluster => (
              <div key={cluster.number} className={`bg-[#151d32] border-t-4 ${cluster.color} border-x border-b border-white/10 rounded-2xl p-7`}>
                <p className="text-slate-500 text-sm font-bold">CLUSTER {cluster.number}</p>
                <h3 className="text-xl font-bold mt-4">{cluster.title}</h3>
                <p className="text-indigo-300 text-sm font-semibold mt-4">{cluster.description}</p>
                <p className="text-slate-400 text-sm leading-7 mt-5">{cluster.states}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#151d32] border border-white/10 rounded-2xl p-7 mt-7">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="text-indigo-400" />
              <h3 className="text-xl font-bold">What is K-means?</h3>
            </div>
            <p className="text-slate-400 leading-8">
              K-means is an unsupervised machine learning algorithm that
              groups similar data points into clusters. In this project,
              three clusters were used to group states based on accident
              patterns, severity and changes over time.
            </p>
            <p className="text-xs text-slate-500 mt-4">
              Three clusters (k = 3); Lakshadweep excluded.
            </p>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="px-6 py-24 bg-[#0e1629]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="05 / Project workflow"
            title="From raw data to insights."
            description="The complete workflow followed in the road accident data analysis project."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["01", "Data Collection", "Load official MoRTH accident and death CSV files."],
              ["02", "Data Auditing", "Check text numbers, footnotes, empty cells and totals."],
              ["03", "Data Cleaning", "Correct inconsistencies and standardise state records."],
              ["04", "Quality Scoring", "Evaluate completeness, validity, continuity and agreement."],
              ["05", "Statistical Analysis", "Compare accident severity and year-wise changes."],
              ["06", "Visualisation & ML", "Create charts and group states using K-means."]
            ].map(([number, title, desc]) => (
              <div key={number} className="bg-[#151d32] p-6 rounded-2xl border border-white/10">
                <span className="text-indigo-400 text-sm font-bold">{number}</span>
                <h3 className="text-lg font-bold mt-4">{title}</h3>
                <p className="text-slate-400 text-sm leading-7 mt-3">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-indigo-300 text-sm border border-indigo-400/20 bg-indigo-500/10 px-5 py-3 rounded-full">
              <Database size={17} />
              Data Source: Ministry of Road Transport and Highways (MoRTH)
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <KMeansChart />
<AccidentComparison />
<DeathRateComparison />
<Heatmap />
      <footer className="px-6 py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="font-black tracking-wider">
              ROADSAFE<span className="text-indigo-400"> INDIA</span>
            </h2>
            <p className="text-slate-500 text-xs mt-2">
              Data Quality Auditing and Visual Analysis of State-Wise Road
              Accident Severity in India (2020–2022).
            </p>
          </div>
          <div className="text-xs text-slate-500 md:text-right">
            <p>Data Science and Visualization Project</p>
            <p className="mt-2">Based on official MoRTH data and project analysis.</p>
            <a href="#home" className="text-indigo-400 inline-block mt-3 hover:text-indigo-300">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
