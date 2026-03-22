import { NextResponse } from 'next/server';

const projectsData = [
  {
    id: 1,
    title: 'InterviewLY',
    description: 'AI-powered interview preparation platform with real-time feedback, mock interviews, and personalized coaching using advanced NLP and machine learning algorithms.',
    tech: ['Next.js', 'TypeScript', 'OpenAI API', 'TailwindCSS'],
    gradient: 'from-blue-500 to-purple-500',
    demoUrl: 'https://interviewly-demo.vercel.app',
    githubUrl: 'https://github.com/unnatikadam/interviewly',
    features: ['Real-time AI feedback', 'Mock interviews', 'Personalized coaching', 'NLP analysis'],
    status: 'completed',
  },
  {
    id: 2,
    title: 'HealthML',
    description: 'Machine learning system for disease prediction using medical datasets with 94% accuracy. Implements random forest, SVM, and deep learning models for healthcare analytics.',
    tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas'],
    gradient: 'from-green-500 to-teal-500',
    demoUrl: 'https://healthml-demo.vercel.app',
    githubUrl: 'https://github.com/unnatikadam/healthml',
    features: ['94% accuracy', 'Multiple ML models', 'Medical data analysis', 'Real-time predictions'],
    status: 'completed',
  },
  {
    id: 3,
    title: 'UrjaAI',
    description: 'Energy consumption prediction system using LSTM networks and time series analysis. Optimizes energy usage for smart buildings with real-time monitoring and alerts.',
    tech: ['Python', 'PyTorch', 'FastAPI', 'React'],
    gradient: 'from-orange-500 to-red-500',
    demoUrl: 'https://urjaai-demo.vercel.app',
    githubUrl: 'https://github.com/unnatikadam/urjaai',
    features: ['LSTM networks', 'Time series analysis', 'Real-time monitoring', 'Smart building optimization'],
    status: 'completed',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: projectsData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, action } = body;

    if (action === 'track_view') {
      console.log(`Project ${projectId} viewed`);
      return NextResponse.json({ success: true, message: 'View tracked' });
    }

    if (action === 'track_click') {
      console.log(`Project ${projectId} clicked`);
      return NextResponse.json({ success: true, message: 'Click tracked' });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
