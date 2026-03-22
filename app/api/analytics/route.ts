import { NextResponse } from 'next/server';

// Simple in-memory analytics storage (in production, use a database)
const analytics = {
  pageViews: 0,
  projectViews: {} as Record<string, number>,
  contactSubmissions: 0,
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
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

    console.log('Analytics updated:', { type, data, timestamp: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: 'Analytics recorded',
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record analytics' },
      { status: 500 }
    );
  }
}
