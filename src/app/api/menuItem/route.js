import { menuItemController } from '@/lib/domains/menuItem/controller.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const available = searchParams.get('available');
    const search = searchParams.get('search');

    if (search) {
      const req = { query: { q: search } };
      const res = {
        json: (data) => data,
        status: (code) => ({ json: (data) => ({ ...data, status: code }) })
      };

      const result = await menuItemController.searchMenuItems(req, res);
      return Response.json(result, { status: result.status || 200 });
    }

    const req = {
      query: {
        ...(category && { category }),
        ...(available && { available })
      }
    };

    const res = {
      json: (data) => data,
      status: (code) => ({ json: (data) => ({ ...data, status: code }) })
    };

    const result = await menuItemController.getAllMenuItems(req, res);
    return Response.json(result, { status: result.status || 200 });
  } catch (error) {
    console.error('Error in menu API route:', error);
    return Response.json({
      ok: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const req = { body };
    const res = {
      status: (code) => ({
        json: (data) => ({ ...data, status: code })
      }),
      json: (data) => data
    };

    const result = await menuItemController.createMenuItem(req, res);
    return Response.json(result, { status: result.status || 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return Response.json({
      ok: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}