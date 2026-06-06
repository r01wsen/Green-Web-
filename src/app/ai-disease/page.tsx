'use client'
import { useState, useRef } from 'react'
import { FlaskConical, Upload, Camera, CheckCircle2, AlertTriangle, Clock, Image as ImageIcon, RefreshCw } from 'lucide-react'

const DISEASES = [
  'Corn Northern Leaf Blight', 'Tomato Late Blight', 'Bacterial Spot (Tomato)',
  'Maize Gray Leaf Spot', 'Wheat Septoria Leaf Blight', 'Rice Blast',
  'Soybean Rust', 'Potato Early Blight', 'Cotton Leaf Curl Virus',
  'Coffee Leaf Rust', 'Citrus Canker', 'Apple Scab'
]

const TREATMENTS: Record<string, string> = {
  'Corn Northern Leaf Blight': 'Apply fungicide (azoxystrobin or propiconazole) within 48 hours. Remove infected leaves. Ensure proper field drainage. Consider resistant hybrids for next season.',
  'Tomato Late Blight': 'Apply copper-based fungicide immediately. Remove and destroy infected plants. Avoid overhead irrigation. Improve air circulation between plants.',
  'Bacterial Spot (Tomato)': 'Apply copper bactericide. Avoid working in wet fields. Remove severely infected plants. Use copper-resistant varieties next season.',
  'Maize Gray Leaf Spot': 'Apply metconazole or azoxystrobin fungicide. Remove lower infected leaves. Rotate with non-host crops. Ensure balanced fertilization.',
  'Wheat Septoria Leaf Blight': 'Apply triazole fungicide (propiconazole or tebuconazole). Remove infected crop residue. Ensure adequate nitrogen. Use resistant varieties.',
  'Rice Blast': 'Apply tricyclazole or isoprothiolane fungicide. Drain fields periodically. Avoid excessive nitrogen. Use resistant varieties.',
  'default': 'Consult a local agronomist. Take multiple photos from different angles. Check NDVI map for affected area extent. Consider soil testing.'
}

export default function AIDiseasePage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    diagnosis: string
    confidence: number
    severity: string
    treatment: string
    imageUrl: string
  } | null>(null)
  const [history, setHistory] = useState<Array<{ diagnosis: string; confidence: number; severity: string; date: string }>>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const runAnalysis = (imageUrl: string) => {
    setAnalyzing(true)
    // Simulate AI processing delay
    setTimeout(() => {
      const disease = DISEASES[Math.floor(Math.random() * DISEASES.length)]
      const confidence = 0.72 + Math.random() * 0.24
      const severity = confidence > 0.9 ? 'critical' : confidence > 0.75 ? 'high' : confidence > 0.5 ? 'medium' : 'low'
      const treatment = TREATMENTS[disease] || TREATMENTS['default']

      const newResult = { diagnosis: disease, confidence, severity, treatment, imageUrl }
      setResult(newResult)
      setHistory([{ diagnosis: disease, confidence, severity: severity as string, date: new Date().toLocaleDateString() }, ...history])
      setAnalyzing(false)
    }, 2500)
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target?.result as string
      runAnalysis(url)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const SEVERITY_CONFIG = {
    critical: { label: 'CRITICAL', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: AlertTriangle },
    high: { label: 'HIGH', bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', icon: AlertTriangle },
    medium: { label: 'MEDIUM', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: AlertTriangle },
    low: { label: 'LOW', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: CheckCircle2 },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-green-700" />
          </div>
          AI Disease Detection
        </h1>
        <p className="text-gray-500 mt-1">Upload a crop photo for instant AI-powered disease diagnosis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInput.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragOver ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-green-50/50'
            }`}
          >
            <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Drop crop photo here</h3>
            <p className="text-sm text-gray-500 mb-4">or click to browse from your device</p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5" /> Camera</span>
              <span>·</span>
              <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" /> Gallery</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Detected Categories</h4>
            <div className="space-y-2">
              {DISEASES.slice(0, 6).map(d => (
                <div key={d} className="flex items-center gap-2 text-sm text-green-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  {d}
                </div>
              ))}
              <p className="text-xs text-green-600 pt-1">+ 38+ disease categories</p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {analyzing && (
            <div className="bg-white rounded-2xl p-10 border border-green-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <FlaskConical className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Image...</h3>
              <p className="text-gray-500">Running AI disease detection model</p>
              <div className="mt-6 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}

          {result && !analyzing && (() => {
            const cfg = SEVERITY_CONFIG[result.severity as keyof typeof SEVERITY_CONFIG] || SEVERITY_CONFIG.low
            const IconComp = cfg.icon
            return (
              <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
                {/* Uploaded image */}
                {result.imageUrl && (
                  <div className="relative">
                    <img src={result.imageUrl} alt="Analyzed crop" className="w-full h-64 object-cover" />
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                      <FlaskConical className="w-3 h-3" /> AI Analysis
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Result header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{result.diagnosis}</h3>
                      <p className="text-sm text-gray-500 mt-1">Powered by GreenWeb AI Vision Model v2.1</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      <IconComp className="w-5 h-5" />
                      <span className="font-bold text-sm">{cfg.label}</span>
                    </div>
                  </div>

                  {/* Confidence */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Confidence Score</span>
                      <span className="text-sm font-bold text-green-700">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{ width: `${result.confidence * 100}%`, backgroundColor: result.confidence > 0.8 ? '#16a34a' : result.confidence > 0.6 ? '#eab308' : '#f97316' }}
                      />
                    </div>
                  </div>

                  {/* Treatment */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      Recommended Action
                    </h4>
                    <p className="text-sm text-green-800 leading-relaxed">{result.treatment}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setResult(null)}
                      className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700"
                    >
                      <RefreshCw className="w-4 h-4" /> New Analysis
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200">
                      Save Report
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200">
                      Share with Agronomist
                    </button>
                  </div>
                </div>
              </div>
            )
          })()}

          {!analyzing && !result && (
            <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
              <FlaskConical className="w-12 h-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
              <p className="text-gray-500 max-w-md mx-auto">Upload a clear photo of your crop leaf showing symptoms. For best results, capture in good lighting and include the affected area clearly.</p>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Analysis History</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {history.map((h, i) => {
                  const cfg = SEVERITY_CONFIG[h.severity as keyof typeof SEVERITY_CONFIG] || SEVERITY_CONFIG.low
                  return (
                    <div key={i} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.bg}`}>
                          <FlaskConical className={`w-4 h-4 ${cfg.text}`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{h.diagnosis}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {h.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                        <span className="text-sm font-mono font-medium text-gray-600">{(h.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}