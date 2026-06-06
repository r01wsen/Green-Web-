import { NextRequest, NextResponse } from 'next/server'

const DISEASES = [
  'Corn Northern Leaf Blight',
  'Tomato Late Blight',
  'Bacterial Spot (Tomato)',
  'Maize Gray Leaf Spot',
  'Wheat Septoria Leaf Blight',
  'Rice Blast',
  'Soybean Rust',
  'Potato Early Blight',
  'Cotton Leaf Curl Virus',
  'Coffee Leaf Rust',
  'Citrus Canker',
  'Apple Scab',
]

const TREATMENTS: Record<string, string> = {
  'Corn Northern Leaf Blight': 'Apply fungicide (azoxystrobin or propiconazole) within 48 hours. Remove infected leaves. Ensure proper field drainage.',
  'Tomato Late Blight': 'Apply copper-based fungicide immediately. Remove and destroy infected plants. Avoid overhead irrigation.',
  'Bacterial Spot (Tomato)': 'Apply copper bactericide. Avoid working in wet fields. Remove severely infected plants.',
  'Maize Gray Leaf Spot': 'Apply metconazole or azoxystrobin fungicide. Remove lower infected leaves. Rotate with non-host crops.',
  'Wheat Septoria Leaf Blight': 'Apply triazole fungicide (propiconazole or tebuconazole). Remove infected crop residue.',
  'Rice Blast': 'Apply tricyclazole or isoprothiolane fungicide. Drain fields periodically. Avoid excessive nitrogen.',
  'default': 'Consult a local agronomist. Take multiple photos from different angles. Check NDVI map for extent.'
}

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, fieldId, farmerId } = await req.json()

    if (!imageUrl) {
      return NextResponse.json({ error: 'imageUrl is required' }, { status: 400 })
    }

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const disease = DISEASES[Math.floor(Math.random() * DISEASES.length)]
    const confidence = 0.72 + Math.random() * 0.24
    const severity = confidence > 0.9 ? 'critical' : confidence > 0.75 ? 'high' : confidence > 0.5 ? 'medium' : 'low'
    const treatment = TREATMENTS[disease] || TREATMENTS['default']

    const result = {
      id: crypto.randomUUID(),
      farmer_id: farmerId || 'demo-farmer',
      field_id: fieldId || null,
      image_url: imageUrl,
      model_version: 'greenweb-ai-v2.1',
      model_provider: 'greenweb-vision',
      primary_diagnosis: disease,
      confidence_score: Math.round(confidence * 1000) / 1000,
      severity,
      recommended_action: treatment,
      is_confirmed: false,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}