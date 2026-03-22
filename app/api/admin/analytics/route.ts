import { NextResponse } from 'next/server';

// Simple admin authentication (in production, use proper auth)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-secret-token';

const analytics = {
  pageViews: 0,
  projectViews: {} as Record<string, number>,
  contactSubmissions: 0,
  lastUpdated: new Date().toISOString(),
};

function authenticate(request: Request) {
  const authHeader = request.headers.get('Authorization');
  return authHeader === `Bearer ${ADMIN_TOKEN}`;
}

export async function GET(request: Request) {
  if (!authenticate(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!authenticate(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case 'page_view':
        analytics.pageViews += 1;
        analytics.lastUpdated = new Date().toISOString();
        break;
      
      case 'project_view':
        const projectId = data.projectId;
        analytics.projectViews[projectId] = (analytics.projectViews[projectId] || 0) + 1;
        analytics.lastUpdated = new Date().toISOString();
        break;
      
      case 'contact_submission':
        analytics.contactSubmissions += 1;
        analytics.lastUpdated = new Date().toISOString();
        break;
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid analytics type' },
          { status: 400 }
        );
    }

    console.log('Admin Analytics updated:', { type, data, timestamp: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: 'Analytics recorded',
    });
  } catch (error) {
    console.error('Admin Analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record analytics' },
      { status: 500 }
    );
  }
}
