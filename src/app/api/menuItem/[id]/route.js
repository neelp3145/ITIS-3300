import { menuItemController } from '@/lib/domains/menuItem/controller.js';

export async function GET(request, { params }) {
  try {
    const req = { params };
    const res = {
      json: (data) => data,
      status: (code) => ({ json: (data) => ({ ...data, status: code }) })
    };

    const result = await menuItemController.getMenuItemById(req, res);
    return Response.json(result, { status: result.status || 200 });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    return Response.json({
      ok: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();

    const req = {
      params,
      body
    };
    const res = {
      status: (code) => ({
        json: (data) => ({ ...data, status: code })
      }),
      json: (data) => data
    };

    const result = await menuItemController.updateMenuItem(req, res);
    return Response.json(result, { status: result.status || 200 });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return Response.json({
      ok: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const req = { params };
    const res = {
      status: (code) => ({
        json: (data) => ({ ...data, status: code })
      }),
      json: (data) => data
    };

    const result = await menuItemController.deleteMenuItem(req, res);
    return Response.json(result, { status: result.status || 200 });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return Response.json({
      ok: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}