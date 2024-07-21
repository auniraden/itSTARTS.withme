<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResourceController extends Controller
{
    public function index()
    {
        $resources = Auth::user()->resources;
        return response()->json($resources);
    }

    public function store(Request $request)
    {
        $request->validate([
            'link' => 'required|url',
        ]);

        $resource = new Resource([
            'link' => $request->link,
            'student_id' => Auth::id(),
        ]);

        $resource->save();

        return response()->json($resource, 201);
    }
}
